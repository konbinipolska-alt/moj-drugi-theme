# KONBINI Release Notes

Changelog for KONBINI-specific changes. Upstream Horizon changes live in `release-notes.md`.

## Unreleased

### Phase 0 — Repo bootstrap
- Forked Shopify/horizon at v4.1.1 (`upstream-base-68760d9`).
- Added tooling: theme-check config, prettier (+ Liquid plugin), GitHub Actions CI
  (theme-check + Lighthouse mobile gates).
- Added agent guide (`CLAUDE.md`) and architecture docs (`docs/00`–`06`).
- Compat patch: replaced dynamic `color_palette` setting defaults with static hexes
  (store API rollout gap; reversible via `scripts/compat-static-color-defaults.sh`).
- First deploy: unpublished draft theme "KONBINI 2.0 [draft]" (#193815085402),
  verified rendering on the live catalog via `shopify theme dev`.

### Phase 1 — Design foundations
- KONBINI design tokens (`snippets/konbini-tokens.liquid`): cobalt ink `#0b00b5`,
  sumi text, complementary accents (kaki `#b23c0e`, moss `#3d6b50`, mist `#efeef9`),
  *ma* spacing scale, motion tokens. All WCAG-AA verified. No textures (client decision).
- `assets/konbini-overrides.css`: CJK typography groundwork (`:lang(ja|ko)` stacks,
  keep-all, latin-scoped tracking/uppercase), reduced-motion support.
- Palette + preset "KONBINI Wabi-Sabi" in settings: paper/sumi/brand/kaki/moss keys,
  cobalt primary buttons (hover verified — no contrast flip), Lora headings over Inter body.
- Organization + WebSite/SearchAction JSON-LD on home page; KONBINI settings group
  (social profiles for `sameAs`) translated across all 20 schema locales.

### Phase 2 — Header/nav + footer
- Hybrid navigation on new admin menu `konbini-main` (live store's menu untouched):
  Market (full mega menu) + promoted Zupoteka & Szybka micha, Słodycze i przekąski,
  Dla ciała i ducha, Mystery Box. Footer SEO menu `konbini-categories`.
- Per-category mega menu media: collection metafield `konbini.menu_media`
  (text / collection_images / featured_products / featured_collections) read via a
  fenced override in `blocks/_header-menu.liquid`; global default = text (wabi-sabi).
- Rotating announcement bar (3 messages, PL).
- New blocks: `konbini-spotify` (click-to-load playlist embed facade, CWV-safe;
  plain-custom-element per upstream accordion-custom precedent) and
  `konbini-local-store` (address/hours from KONBINI settings) — both also fenced
  into the mobile nav drawer (`snippets/header-drawer.liquid`).
- Footer recomposed: brand note (コンビニ), categories + info menus, PL newsletter,
  local store + Spotify; light paper background.
- Store JSON-LD node (LocalBusiness-style) added to the Organization graph,
  fed by the same local-store settings.
- Storefront strings translated across all 31 locales; editor labels EN+PL
  (other editor languages fall back to English — documented).
