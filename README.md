# lasers.app

Landing page for [lasers.app](https://lasers.app) - the hosted apps and self-hosted tools portfolio for Strange Lasers.

Static site built with [Eleventy](https://www.11ty.dev/) for Cloudflare Workers Static Assets. A sibling of [strangelasers.com](https://strangelasers.com) (the company); this domain indexes the apps and tools.

## Development

Install Node.js 22 or newer, then restore the locked dependencies and start the preview:

```bash
npm ci
npm start
```

Open the URL printed by Eleventy, normally `http://localhost:8080/`. `npm start` and `npm run dev` run the same preview server, rebuilding and updating the browser when source files change. Use `npm run dev -- --port=8081` to request another port.

For a preview without a server, run `npm run build` and open `_site/index.html` directly. On macOS, `open -a "Google Chrome" _site/index.html` selects Chrome without changing the default application for HTML files. `npm run watch` rebuilds on edits without serving HTTP; refresh the browser after each rebuild.

- `src/index.njk` defines the catalog page and its title and description
- `src/_includes/base.njk` defines the shared page layout, branding, and metadata
- `src/_includes/card.njk` defines the reusable card macro and its GitHub badge
- `src/_data/catalog.json` provides the ordered `hosted.projects` and `selfHosted.projects` arrays, with an `action` label for each group
- `public/` holds static assets copied unchanged into the output directory

Edit source files and commit those changes. Eleventy generates `_site/`, which is ignored by Git. `node_modules/`, `.wrangler/`, and `.vite/` are also ignored; Eleventy does not use Vite's cache.

Templates use Nunjucks with HTML escaping enabled. Missing values referenced by a rendered expression fail the build, so keep catalog entries complete and use ordinary `{{ value }}` expressions for data. The layout's `content | safe` inserts the HTML produced by the page template.

## Catalog

An active project with public documentation at `docs.<app>.lasers.app` is eligible for a listing, including software that users install or host themselves. Keep one entry per project in `src/_data/catalog.json` and confirm its canonical public destination before adding it. Documentation aliases and retained documentation for retired implementations do not need separate cards.

Each project supplies `name`, plain-text `description`, public `url`, `github` repository URL, local `icon` filename, and the icon's intrinsic `width` and `height`. Put the icon in `public/` and use its filename in the data so the built page can also open directly from disk.

- Put usable public applications in **Hosted apps** with an **Open app** action, as with Stowplan
- Put software that users run themselves in **Self-hosted tools** with a **Read docs** action; link directly to its canonical documentation, even if its product hostname redirects there
- Keep the description focused on what the project does, and make the link destination clear before the visitor follows it
- Add a white GitHub badge with the mark and label linking to the project's public repository, with the project name in the link's accessible label; keep it separate from the app or documentation link
- Keep the sections separate even when one has a single entry; use a short section note instead of repeating hosting labels on every card

Maintainer HQ uses [docs.hq.lasers.app](https://docs.hq.lasers.app/). Cloudflare Fleet uses [docs.cloudflare-fleet.lasers.app](https://docs.cloudflare-fleet.lasers.app/), and GuildControl MCP uses [docs.guildcontrol.lasers.app](https://docs.guildcontrol.lasers.app/).

## Branding

Brand assets come from the [Strange Lasers brand sources](https://github.com/Strange-Lasers/strangelasers.com/tree/main/brand). Copy the generated `mark.svg`, `mark-transparent.svg`, `wordmark.svg`, `logo.svg`, `icon-192.png`, and `icon-512.png`, along with `palette.css`, into `public/` from the same source checkout after its brand checks pass. Keep these copies identical to the source assets; make geometry and palette changes upstream before syncing them here.

The header stacks the transparent mark and wordmark, while `logo.svg` provides the combined horizontal logo. The favicon and raster icons include their dark background tile. Keep image dimensions aligned with the source SVG viewBoxes, and update the asset version queries in `src/_includes/base.njk` and `public/manifest.webmanifest` when refreshing assets so browsers request the new files.

Use each project's published icon for its catalog card. The self-hosted tool icons below are copied from their project repositories. Keep these copies identical to the source assets so the catalog serves them without depending on external image hosts:

| Catalog asset | Project source |
| --- | --- |
| `public/guildcontrol-icon.png` | [GuildControl `assets/guildcontrol-icon.png`](https://github.com/j-256/guildcontrol/blob/main/assets/guildcontrol-icon.png) |
| `public/cloudflare-fleet-icon.svg` | [Cloudflare Fleet `docs/favicon.svg`](https://github.com/j-256/cloudflare-fleet/blob/main/docs/favicon.svg) |
| `public/maintainer-hq-icon.svg` | [Maintainer HQ `site/public/favicon.svg`](https://github.com/j-256/maintainer-hq/blob/main/site/public/favicon.svg) |

Keep card icons decorative with empty alt text because the adjacent project name labels the link.

## Local verification

Run `npm run check` to render the templates without writing output, then `npm run build` to verify the complete site and asset copies. Inspect `_site/index.html` directly or use the development server.

Check the cards at desktop and narrow phone widths, follow each destination including the GitHub badges, and use Tab to verify visible keyboard focus on both links in each card. Confirm that documentation links say **Read docs**, that application links say **Open app**, and that the content stays usable without JavaScript. Run `git diff --check` before committing.

After a project icon update, compare the copied assets with their project sources and confirm that every card icon loads and stays legible at its displayed size.

After a brand sync, compare the copied assets against the source checkout, inspect the transparent mark, wordmark, and combined logo on light and dark backgrounds, and confirm that the favicon and manifest icons load with the updated design.

## Publishing

Cloudflare Workers Static Assets is the deployment target. `wrangler.jsonc` names the Worker `lasers-app` and uploads only `_site/`. It has no Worker script or runtime bindings. `workers.dev` and preview URLs are disabled.

The workflow in `.github/workflows/deploy.yml` installs locked dependencies and runs `npm run deploy:check` on pull requests, pushes to `main`, and manual runs. This builds the site and validates the assets-only deployment with Wrangler's dry run. Successful pushes and manual runs on `main` also deploy through the `production` GitHub environment. Deployments are serialized, and pull requests receive no Cloudflare credentials.

Create the `production` GitHub environment, restrict its deployment branches to `main`, and configure:

- Variable `CLOUDFLARE_ACCOUNT_ID` for the owning Cloudflare account
- Secret `CLOUDFLARE_API_TOKEN` with permission to deploy Worker assets in that account

Manage the `lasers.app` Custom Domain and the HTTP 308 redirect from `www.lasers.app` to the matching apex path and query in Cloudflare. The Wrangler configuration omits `route` and `routes`, so routine asset deployments leave that routing configuration unchanged. See [Wrangler's source-of-truth behavior](https://developers.cloudflare.com/workers/wrangler/configuration/#source-of-truth).

For the initial move from GitHub Pages, deploy the Worker assets, attach `lasers.app` as its Custom Domain through Cloudflare Fleet, and verify the apex and `www` redirect before disabling GitHub Pages. Preserve the redirect and replace only the catalog's old origin. A Pages `CNAME` file is not part of the Worker bundle.

For local validation or an authorized manual deployment:

```bash
npm ci
npm run deploy:check
npm run deploy
```

Only the final command publishes. It uses `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from the environment. A clone restores the build and deployment configuration; it does not recreate GitHub environment values, the Custom Domain, DNS, or redirect rules. Use Cloudflare's deployment history to roll back Worker assets.

The site requires no paid Cloudflare feature. [Static asset requests are free and unlimited](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/); asset upload limits still apply. The bundle contains only the generated page and public assets, with no server-side code. Check its size against the [Workers Free static-asset limits](https://developers.cloudflare.com/workers/platform/limits/#static-assets) when expanding the catalog.
