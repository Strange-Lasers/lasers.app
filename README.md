# lasers.app

Landing page for [lasers.app](https://lasers.app) - the hosted apps and self-hosted tools portfolio for Strange Lasers.

Static site served via GitHub Pages, proxied through Cloudflare. A sibling of [strangelasers.com](https://strangelasers.com) (the company); this domain indexes the apps and tools.

## Catalog

An active project with public documentation at `docs.<app>.lasers.app` is eligible for a listing, including software that users install or host themselves. Keep one card per project in `index.html` and confirm its canonical public destination before adding it. Documentation aliases and retained documentation for retired implementations do not need separate cards.

- Put usable public applications in **Hosted apps** with an **Open app** action, as with Stowplan
- Put software that users run themselves in **Self-hosted tools** with a **Read docs** action; link directly to its canonical documentation, even if its product hostname redirects there
- Keep the description focused on what the project does, and make the link destination clear before the visitor follows it
- Add a GitHub icon linking to the project's public repository, with the project name in the link's accessible label; keep it separate from the app or documentation link
- Keep the sections separate even when one has a single entry; use a short section note instead of repeating hosting labels on every card

Maintainer HQ uses [docs.hq.lasers.app](https://docs.hq.lasers.app/). Cloudflare Fleet uses [docs.cloudflare-fleet.lasers.app](https://docs.cloudflare-fleet.lasers.app/), and GuildControl MCP uses [docs.guildcontrol.lasers.app](https://docs.guildcontrol.lasers.app/).

## Local verification

Serve the checkout with `python3 -m http.server 4176 --bind 127.0.0.1` and visit `http://127.0.0.1:4176/`. There is no build step or dependency installation.

Check the cards at desktop and narrow phone widths, follow each destination including the GitHub icons, and use Tab to verify visible keyboard focus on both links in each card. Confirm that documentation links say **Read docs**, that application links say **Open app**, and that the content stays usable without JavaScript. Run `git diff --check` before committing.
