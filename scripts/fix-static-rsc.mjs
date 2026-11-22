import { createHash } from 'node:crypto';
import { constants } from 'node:fs';
import { copyFile, lstat, readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';

const root = process.cwd();
const out = join(root, 'out');
const app = join(root, '.next', 'server', 'app');
const suffix = '.segment.rsc';

async function inspect(path) {
  const parts = relative(root, path).split(sep);
  if (resolve(root, ...parts) !== path || parts.some((part) => !part || part === '..')) {
    throw new Error(`Path outside project: ${path}`);
  }
  let current = root;
  let stats;
  for (const [index, part] of parts.entries()) {
    current = join(current, part);
    stats = await lstat(current).catch((error) => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    if (!stats) return null;
    if (stats.isSymbolicLink() || (index < parts.length - 1 && !stats.isDirectory())) {
      throw new Error(`Unsafe path: ${relative(root, current)}`);
    }
  }
  return stats;
}

async function read(path, optional = false) {
  const stats = await inspect(path);
  if (!stats && optional) return null;
  if (!stats?.isFile()) throw new Error(`Expected a regular file: ${relative(root, path)}`);
  return readFile(path);
}

async function hash(path, optional = false) {
  const bytes = await read(path, optional);
  return bytes === null ? null : createHash('sha256').update(bytes).digest('hex');
}

async function* files(directory) {
  if (!(await inspect(directory))?.isDirectory()) {
    throw new Error(`Expected a directory: ${relative(root, directory)}`);
  }
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name);
    if (item.isDirectory()) yield* files(path);
    else if (item.isFile()) yield path;
    else throw new Error(`Unexpected entry: ${relative(root, path)}`);
  }
}

async function plan() {
  const { config } = JSON.parse(await read(join(root, '.next', 'required-server-files.json')));
  if (config?.output !== 'export' || config.trailingSlash !== true) {
    throw new Error('Expected a build with output: export and trailingSlash: true.');
  }
  const { routes, notFoundRoutes } = JSON.parse(await read(join(root, '.next', 'prerender-manifest.json')));
  const destinations = new Set();
  const knownPayloads = new Set();
  const pending = [];
  for (const route of Object.keys(routes).sort()) {
    if (route === '/_global-error' || notFoundRoutes.includes(route)) continue;
    if (!/^\/(?:[\w-]+(?:\/[\w-]+)*)?$/.test(route)) {
      throw new Error(`Unsupported exported route: ${route}`);
    }
    // Match Next's prerender artifact naming, including its special /index prefix.
    const page = route === '/' ? 'index' : route.replace(/^\/index(?=\/|$)/, '/index/index').slice(1);
    const directory = join(out, route.slice(1));
    const artifact = join(app, page);
    if (await hash(join(directory, 'index.html')) !== await hash(`${artifact}.html`)) {
      throw new Error(`HTML does not match the build for ${route}`);
    }
    let count = 0;
    const segments = `${artifact}.segments`;
    for await (const source of files(segments)) {
      if (!source.endsWith(suffix)) continue;
      count++;
      const parts = relative(segments, source).slice(0, -suffix.length).split(sep);
      if (parts.some((part) => !/^[a-zA-Z0-9_.$!%-]+$/.test(part) || part === '.' || part === '..')) {
        throw new Error(`Unsupported segment: ${relative(segments, source)}`);
      }
      const target = join(directory, `__next.${parts.join('.')}.txt`);
      const nested = join(directory, `__next.${parts.join(sep)}.txt`);
      const key = target.toLowerCase();
      if (destinations.has(key)) throw new Error(`Conflicting destination: ${relative(out, target)}`);
      destinations.add(key);
      knownPayloads.add(target);
      knownPayloads.add(nested);

      const expected = await hash(source);
      const actual = await hash(target, true);
      const original = nested === target ? actual : await hash(nested, true);
      if ((actual !== null && actual !== expected) || (original !== null && original !== expected)) {
        throw new Error(`Payload hash mismatch: ${relative(out, target)}`);
      }
      if (actual === null) {
        if (original === null) throw new Error(`Missing exported payload: ${relative(out, target)}`);
        pending.push({ nested, target, expected });
      }
    }
    if (!count) throw new Error(`No segment artifacts for ${route}`);
  }
  if (!destinations.size) throw new Error('No exported App Router segments found.');
  for await (const path of files(out)) {
    if (path.endsWith('.txt') && relative(out, path).split(sep).some((part) => part.startsWith('__next.'))) {
      if (!knownPayloads.has(path)) throw new Error(`Unexpected payload: ${relative(out, path)}`);
    }
  }
  return pending;
}

async function main() {
  const [mode, ...extra] = process.argv.slice(2);
  if (extra.length || !['--dry-run', '--apply', '--check'].includes(mode)) {
    throw new Error('Usage: node scripts/fix-static-rsc.mjs --dry-run|--apply|--check');
  }
  const pending = await plan();
  for (const { nested, target } of pending) console.log(`${relative(out, nested)} -> ${relative(out, target)}`);
  if (mode === '--apply') {
    for (const { nested, target, expected } of pending) {
      if (!(await inspect(dirname(target)))?.isDirectory() || await hash(nested) !== expected) {
        throw new Error(`Export changed during apply: ${relative(out, nested)}`);
      }
      await copyFile(nested, target, constants.COPYFILE_EXCL);
      if (await hash(target) !== expected) throw new Error(`Copy failed verification: ${relative(out, target)}`);
    }
    if ((await plan()).length) throw new Error('Corrections remain after apply.');
    console.log(`RSC export: ${pending.length} copied, 0 pending.`);
  } else {
    console.log(`RSC export: ${pending.length} pending.`);
    if (mode === '--check' && pending.length) process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`RSC export: ${error.message}`);
  process.exitCode = 1;
});
