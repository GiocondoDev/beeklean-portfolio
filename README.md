# BeKlean — Professional cleaning website redesign

A portfolio edition of a real client project: a French-language redesign for BeKlean, a professional cleaning company. The project translates a WordPress/Elementor site into a static Next.js application while retaining the company identity and the approved Premium Corporate Light design.

**Official website:** [beeklean.be](https://beeklean.be). This repository is a separately prepared demonstration, not the official website, its deployment source or a live quote channel. The link identifies the real business; it does not imply that the portfolio build is deployed there.

## What the project demonstrates

- Reusable Next.js 16 App Router components written in TypeScript, with React 19, Tailwind CSS 4 and shared design tokens.
- The original page structure, responsive breakpoints, typography, motion behavior, navigation, service cards, image layouts and custom French 404.
- Accessible mobile navigation and a quote form with explicit labels, field validation, first-error focus, a read-only message preview and an announced confirmation. The demo simulates sending locally; use fictitious inputs.
- Route-level French metadata, social metadata and branded icons. The demo opts out of indexing and does not claim the official site's canonical URLs.
- Static export with trailing slashes and no Next.js server in production. Local WebP variants keep responsive image delivery independent of a server-side image optimizer.

## Engineering decisions

| Challenge | Implementation |
| --- | --- |
| Keep visual fidelity across screens | Shared color tokens, the original stylesheet, responsive image selection and breakpoint-specific layout rules. |
| Preserve a useful quote flow in a static app | Validate and normalize the input and build a readable draft in the browser. The portfolio retains those steps and replaces the external messaging handoff with local state. |
| Ship a reliable Windows static export | The postbuild step checks the generation manifests and SHA-256 payloads, then copies missing static RSC segments to the names the browser requests. It never overwrites the originals. |
| Make the demo safe to explore | Live recipients, identifiers, private records and real testimonials are omitted. The directory and testimonial cards remain as clearly marked layout demonstrations. |

See [technical notes](docs/engineering-notes.md) and [asset credits and rights](docs/asset-credits.md).

## Run locally

Use a supported Node.js LTS version compatible with Next.js 16 (Node.js 20.9+ minimum), then run:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To check and export:

```sh
npm run lint
npx --no-install tsc --noEmit --incremental false
npm run build
node scripts/fix-static-rsc.mjs --check
```

Serve the generated `out/` from the root of a static server with directory indexes and real HTTP 404 handling. The four content routes are `/`, `/contact/`, `/mentions-legales/` and `/politique-de-confidentialite/`.

## Rights and project scope

The name, wordmark and brand icons are included with the client's permission for this portfolio showcase. Third-party assets retain their own terms. This repository does not grant a general open-source or asset redistribution license. No deployment or performance claims are made for this portfolio edition.
