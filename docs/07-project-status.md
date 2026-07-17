# Project status, environment & decisions

Living record of the KONBINI 2.0 build: what exists, where, why, and what's next.
Companion to `docs/design-language.md` (visual system) and `CLAUDE.md` (conventions).
**Update this file when state changes** — it is the handover document.

Last updated: 2026-07-15.

---

## 1. Context & goal

KONBINI.pl is a live Polish store (Shopify plan, PLN) selling Japanese/Korean
groceries — hundreds of products, ~30 tag-driven smart collections. The goal is a
custom theme that is mobile-first, fast (CWV), SEO/CRO-solid, accessible,
**agentic-commerce ready**, built from theme blocks with rich settings, and
carrying a distinctive KONBINI identity.

Client-agreed framing (interview, 2026-07-14):
- Base: **fork of Shopify Horizon** (native theme blocks).
- Deployment: **unpublished draft theme on the live store** — parallel, zero risk.
- Header/nav + footer are **shared superior projects**; each page is its own sub-project.
- Locales: **pl primary**, structure ready for en → ja → ko → uk.
- Agentic foundation in MVP; **in-store AI concierge is Phase 2** (seam reserved in
  Horizon's `chat-drawer` — never block it).
- Docs in English, conversation in Polish.

---

## 2. Environment & identifiers

| What | Value |
|---|---|
| Store | `9znfby-6j.myshopify.com` (konbini.pl), PLN, Europe/Warsaw |
| **Draft theme (ours)** | **"KONBINI 2.0 [draft]" — id `193815085402`, unpublished** |
| Live theme (untouched) | a Dawn copy — id `185848201562` |
| Repo | `konbinipolska-alt/moj-drugi-theme`, branch `main` |
| Upstream | `Shopify/horizon`; fork point tag **`upstream-base-68760d9`** (Horizon v4.1.1) |
| Commit identity | authored as `konbinipolska-alt` (repo-local git config) |
| CI | GitHub Actions: theme-check + Lighthouse mobile (perf ≥ .85, a11y ≥ .95) |

**Local preview:** `shopify theme dev --store 9znfby-6j.myshopify.com`
**Deploy to draft:** `shopify theme push --theme 193815085402 --store 9znfby-6j.myshopify.com`

> ⚠️ Run Shopify CLI commands **from the theme directory**. A push from the wrong
> cwd once wiped the draft (recovered by a full re-push) — always verify remote
> state after pushing.

**Shopify GitHub integration is deliberately NOT connected** until Phase 7 — the
theme editor auto-commits and would race with agent commits. Until then, capture
editor experiments with `shopify theme pull --only config/settings_data.json --only templates/*.json`.

---

## 3. Data created in the Shopify admin (via API — lives outside this repo)

Recreate these if the store is ever rebuilt:

- **Menu `konbini-main`** — hybrid navigation: `Market` (full category tree) +
  promoted: Zupoteka & Szybka micha, Słodycze i przekąski, Dla ciała i ducha,
  Mystery Box. *(The live store's own `main-menu` is untouched.)*
- **Menu `konbini-categories`** — footer SEO column.
- **Collection metafield definition `konbini.menu_media`** — single-line text,
  choices: `text` / `collection_images` / `featured_products` /
  `featured_collections`; Storefront read enabled. Lets a merchant pick the mega-menu
  panel style per category.
- **Theme settings filled** (KONBINI brand group): logo
  (`konbini-logo-kobalt.svg`, already in shop Files), socials, local-store address
  and hours, Spotify playlist URL.

---

## 4. Store facts (verified, used by the theme)

- **Physical store:** ul. Szybka 1b/B, 50-421 Wrocław · **codziennie 10:01 – 21:12**
  · pet-friendly. Feeds the header bar, footer and the `Store` JSON-LD node.
  > ⚠️ konbini.pl/pages/contact still says "Wkrótce otwarcie" — **outdated**, the
  > store has been open ~a year. Client to fix on the live site.
- **Socials:** instagram/facebook/tiktok/youtube — `@konbinipolska`. Wired to
  settings → `sameAs` in Organization JSON-LD + footer icons.
- **Spotify playlist:** `68q7TYjLgjswOnGRgcsSEq`.
- **Catalogue reality:** products have **no `productType` and no metafields** —
  everything is tags; smart collections are tag-driven. All metafield reads must
  degrade gracefully. Tag→metafield backfill is a **separate data workstream**.
- Long product titles (e.g. "OCEAN BOMB x Dragon Ball GT Cherry … 330 ml") dominate
  the shelf → a short **display-name metafield** is proposed (Phase 5).

---

## 5. Roadmap & status

| Phase | Scope | Status |
|---|---|---|
| 0 | Fork, remotes, fork-point tag, theme-check, prettier, CI, `CLAUDE.md`, docs, first draft push | ✅ |
| 1 | Design tokens, palette, preset, typography, Organization + WebSite JSON-LD | ✅ (#1) |
| 2 | Header/nav + footer: `konbini-main`, per-category mega menu, rotating announcements, footer, Spotify + local store | ✅ (#2–#5) |
| 3 | Home page — **search-first** (giant predictive search + phrase chips), Market grid, category shelves, utility quick-links | ✅ (#6, #9) |
| 4 | Breadcrumbs + BreadcrumbList JSON-LD; collection font fix | ✅ (#7, #8) |
| — | Japanese expression layer (ma rhythm, kanji kickers, tategaki, micro-motion); Market grid reverted to 1:1 tiles | ✅ (#10, #11) |
| — | **Design language** documented + product-card rules | ✅ (#12, #13) |
| **→ next** | **Token recalibration** to the agreed language, then home re-skin | ⏳ blocked on client picks (§7) |
| 5 | PDP + metafields (origin, display name, allergens, usage, pairings), cross-sell, sticky ATC, FAQ JSON-LD | ⬜ |
| 6 | Cart drawer + free-shipping bar; verify accelerated checkout | ⬜ |
| 7 | Search pages; **connect Shopify GitHub integration**; hand editor to client | ⬜ |
| 8 | Static pages, blog, 404, account, QA sweep, publish checklist | ⬜ |

**Important:** the theme still runs the *interim* look (Lora/Inter, kaki/moss
accents, mist tiles). The agreed design language in `docs/design-language.md` is
**not yet implemented in tokens** — that's the next build step once §7 is decided.

---

## 6. Compatibility patches & gotchas

- **`scripts/compat-static-color-defaults.sh`** — this store's Theme API rejects
  `color_palette` references as colour-setting defaults (documented on shopify.dev,
  not yet rolled out here). The patch swaps 79 dynamic defaults across 17 upstream
  files for static hexes. **Re-run `apply` after every upstream sync**; `revert`
  once a scratch-theme push accepts dynamic defaults. See `docs/06-upstream-sync.md`.
- **theme-check baseline** — 10 pre-existing upstream offenses are ignored per-path
  in `.theme-check.yml`. Our code must stay clean. Revisit on each sync.
- **`{% stylesheet %}` must be top-level** in a liquid file — nesting it inside tags
  fails upload validation.
- **Locale discipline is enforced by CI** — adding a `konbini.*` key means adding it
  to *all* schema locales (20) and storefront locales (31), or theme-check fails.
- **Flag SVGs** (circle-flags) all ship `id="a"` → namespace ids per flag when
  inlining, or masks collide. Never use emoji flags (Windows doesn't render them).

---

## 7. Open decisions — the build is waiting on these

1. **Origin marker placement** on the product card: flag-on-photo / **code above the
   name (recommended)** / flat flag inline / CJK sign.
2. **Typeface lock** — IBM Plex Sans + Mono (+JP/KR) proposed, replaces Lora/Inter.
3. **Exact orange** — 朱 `#E0451F` / warm `#EA5B24` / bright `#FF5C00`.
4. **Display weight** — tokenized, to be dialled in.
5. **"Niebawem dostępne" scope** — restocking items only? (recommended — otherwise
   it promises a return that may never come).
6. **Short display-name metafield** for the shelf (full title stays for SEO).

Review artifacts (client-private):
[type/colour specimen](https://claude.ai/code/artifact/36b1e43d-edf9-4a3c-90e4-fce7a1645c5c) ·
[product-card variants A–F, preview + wireframe](https://claude.ai/code/artifact/288a62a0-541d-402f-ae3c-d67d2e93eac9)

---

## 8. Working agreements

- Branch per sub-project (`feat/…`), PR, **CI green → squash-merge** (client
  authorised self-merge). Upstream syncs: `sync/upstream-YYYY-MM`, **plain merge**.
- Conventional commits; plan before committing; push right after committing.
- **Never invent brand copy.** Use the client's published words. Say
  "japońsko-koreański", never "azjatycki" as the primary descriptor; never
  "mały sklep". Playful collection names (Kluchy, Zupoteka) are brand assets.
  Treat anything scraped from konbini.pl as possibly outdated.
- On design/strategy: go aspect by aspect, propose with a recommendation, let the
  client decide — don't rush to implementation.
