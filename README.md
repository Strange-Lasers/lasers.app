# lasers.app

Landing page for [lasers.app](https://lasers.app) - the hosted apps and self-hosted tools portfolio for Strange Lasers.

Static site served via GitHub Pages, proxied through Cloudflare. A sibling of [strangelasers.com](https://strangelasers.com) (the company); this domain indexes the apps and tools.

## Catalog

An active project with public documentation at `docs.<app>.lasers.app` is eligible for a listing, including software that users install or host themselves. Keep one card per project in `index.html` and confirm its canonical public destination before adding it. Documentation aliases and retained documentation for retired implementations do not need separate cards.

- Put usable public applications in **Hosted apps** with an **Open app** action, as with Stowplan
- Put software that users run themselves in **Self-hosted tools** with a **Read docs** action; link directly to its canonical documentation, even if its product hostname redirects there
- Keep the description focused on what the project does, and make the link destination clear before the visitor follows it
- Add a white GitHub badge with the mark and label linking to the project's public repository, with the project name in the link's accessible label; keep it separate from the app or documentation link
- Keep the sections separate even when one has a single entry; use a short section note instead of repeating hosting labels on every card

Maintainer HQ uses [docs.hq.lasers.app](https://docs.hq.lasers.app/). Cloudflare Fleet uses [docs.cloudflare-fleet.lasers.app](https://docs.cloudflare-fleet.lasers.app/), and GuildControl MCP uses [docs.guildcontrol.lasers.app](https://docs.guildcontrol.lasers.app/).

## Branding

Brand assets come from the [Strange Lasers brand sources](https://github.com/Strange-Lasers/strangelasers.com/tree/main/brand). Copy the generated `mark.svg`, `mark-transparent.svg`, `wordmark.svg`, `logo.svg`, `icon-192.png`, and `icon-512.png`, along with `palette.css`, from the same source checkout after its brand checks pass. Keep these copies identical to the source assets; make geometry and palette changes upstream before syncing them here.

The header stacks the transparent mark and wordmark, while `logo.svg` provides the combined horizontal logo. The favicon and raster icons include their dark background tile. Keep image dimensions aligned with the source SVG viewBoxes, and update the asset version queries in `index.html` and `manifest.webmanifest` when refreshing assets so browsers request the new files.

## Local verification

Serve the checkout with `python3 -m http.server 4176 --bind 127.0.0.1` and visit `http://127.0.0.1:4176/`. There is no build step or dependency installation.

Check the cards at desktop and narrow phone widths, follow each destination including the GitHub badges, and use Tab to verify visible keyboard focus on both links in each card. Confirm that documentation links say **Read docs**, that application links say **Open app**, and that the content stays usable without JavaScript. Run `git diff --check` before committing.

After a brand sync, compare the copied assets against the source checkout, inspect the transparent mark, wordmark, and combined logo on light and dark backgrounds, and confirm that the favicon and manifest icons load with the updated design.
