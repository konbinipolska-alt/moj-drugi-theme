# KONBINI 2.0 — Agent Guide

Custom Shopify theme for **KONBINI.pl** (Polish pan-Asian grocery store), forked from
[Shopify/horizon](https://github.com/Shopify/horizon). Also read `.cursor/rules/*.mdc`
(upstream Horizon conventions — they apply here) and `docs/` for deep dives.

## Project identity

- **Design**: wabi-sabi Japanese minimalism. Paper `#ffffff`, ink cobalt `#0b00b5`,
  generous *ma* (間) whitespace, washi textures, restrained micro-interactions.
- **Tone of voice**: visuals are quiet; Polish copy stays warm and playful
  ("Kluchy", "Zupoteka", "Melanż past" are brand assets, not bugs).
- **Mobile-first**, CWV/SEO/CRO/a11y are release gates (Lighthouse mobile perf ≥ 85, a11y ≥ 95).
- **Agentic-commerce ready**: JSON-LD everywhere it makes sense, semantic HTML,
  metafields-backed product data, never break accelerated checkout.

## Hard rules

1. **Namespace everything we own**: `blocks/konbini-*.liquid`, `blocks/_konbini-*.liquid`
   (static/private), `sections/konbini-*`, `snippets/konbini-*`, `assets/konbini-*`.
   Never heavily edit upstream files in place.
2. **Fenced edits only** in upstream files we must touch
   (`layout/theme.liquid`, `snippets/stylesheets.liquid`, `snippets/scripts.liquid`,
   `config/settings_schema.json`, locale files). Wrap every insertion:
   `{% comment %} KONBINI:start {% endcomment %}` … `{% comment %} KONBINI:end {% endcomment %}`.
3. **Tokens only, no raw hexes** in custom code. Consume `--k-*`
   (from `snippets/konbini-tokens.liquid`) or Horizon `--color-*`/font vars.
   Audit: `grep -rn '#0b00b5' blocks/ sections/ snippets/ assets/ | grep -v konbini-tokens` → must be empty.
4. **Zero hardcoded strings**: every storefront string is a `t:` key in `locales/en.default.json`
   (+ `pl.json` translation in the same PR), editor strings in `*.schema.json`.
   All KONBINI keys live under a top-level `"konbini"` object.
5. **Settings design**: settings expose content, layout variants, and *ma* density
   (`compact|balanced|spacious`) — never free color pickers or raw px sliders.
   Brand constants (hexes, easings, radii, type stacks) are fixed tokens.
6. **JS**: custom elements extending `Component` from `assets/component.js`; register in the
   importmap in `snippets/scripts.liquid` as `@konbini/<name>`. Never fork
   `component.js`, `events.js`, `morph.js`, `section-renderer.js`.
7. **Merge-safety on upstream sync**: `config/settings_data.json` and `templates/*.json`
   are always "ours"; see `docs/06-upstream-sync.md`.
8. **License**: this fork is licensed for the KONBINI store only — never reuse, resell,
   or redistribute. Keep `LICENSE.md` intact.

## Workflow

- Branches: `feat/<sub-project>` → PR → CI green (theme-check + Lighthouse) → squash-merge.
  Upstream syncs: `sync/upstream-YYYY-MM`, plain merge (no squash).
- Conventional commits (`feat(pdp): …`, `fix(cart): …`, `chore(sync): …`).
- Plan before committing; push immediately after committing.
- Local preview: `shopify theme dev --store <store>.myshopify.com` (real catalog, safe).
  Draft deploys: `shopify theme push --theme <draft-theme-id>`.
- Do NOT connect the Shopify GitHub integration before Phase 7 (see roadmap in docs).
- Log user-facing changes in `release-notes-konbini.md` (upstream's `release-notes.md` is theirs).

## Store facts

- Live store, Polish, PLN. ~30 tag-driven smart collections; products have no
  `productType`/metafields yet — **all metafield reads must fail gracefully to nothing
  (or tag-based fallbacks)** via `snippets/konbini-product-meta.liquid`.
- Locale order: pl (primary) → en → ja → ko → uk. CJK typography rules in `docs/04-i18n.md`.
