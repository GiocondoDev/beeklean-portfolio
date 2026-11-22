# Engineering notes

## App structure and responsive UI

The App Router pages assemble shared Header, Footer, Hero, Services, About, directory, legal and testimonial-layout components. The stylesheet and primary visual components are carried forward from the client project. The service and contact routes use server-rendered content; the mobile menu and form use browser state. The site remains French; technical documentation is English.

The form keeps field length checks, allowed service values, normalization, accessible error focus and the generated French message. The preview and simulated confirmation stay in component state; editing any field invalidates both. There is no recipient, endpoint, storage integration, clipboard action or external messaging link. Fields have no form names, so native submission cannot serialize their contents if JavaScript is unavailable.

## Static export and Windows RSC payloads

The export uses directory index pages (`output: "export"`, `trailingSlash: true`). The custom error page should be served as the body of a true HTTP 404 by the static host. The portfolio metadata is noindex/nofollow, has no production canonical, and retains French titles, descriptions and social card metadata.

On Windows, the Next.js 16 exporter can leave segment files in nested subfolders while the browser asks for one dot-separated filename. See [the upstream issue](https://github.com/vercel/next.js/issues/92339). The Node-only npm postbuild hook reads the route and segment artifacts, checks the HTML and SHA-256 payload identities, validates all destinations, and creates only missing static copies. It stops on mismatches and keeps the nested originals. Run these commands from a single build's project root:

```sh
node scripts/fix-static-rsc.mjs --dry-run
node scripts/fix-static-rsc.mjs --check
```

When serving the export, verify the affected payload returns 200 with and without `_rsc`, and is not fallback HTML. Reassess the workaround on Next.js upgrades. No hosting-specific deployment procedure is part of the portfolio.
