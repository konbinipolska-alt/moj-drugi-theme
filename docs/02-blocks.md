# Blocks & Sections

## Naming

- `blocks/konbini-*.liquid` — merchant-addable KONBINI blocks.
- `blocks/_konbini-*.liquid` — private/static blocks rendered via
  `{% content_for 'block', type: '_konbini-x', id: '...' %}` (not deletable/reorderable
  by the merchant, don't count toward `max_blocks`).
- Same prefix for sections, snippets, assets. The prefix is the upstream-merge-safety mechanism.

## Planned custom blocks (MVP)

| Block | Purpose | Phase |
|---|---|---|
| `konbini-washi-divider` | textured section divider (ma rhythm) | 3 |
| `konbini-story-strip` | brand/editorial strip for home | 3 |
| `_konbini-breadcrumbs` | semantic breadcrumbs (Horizon has none) + BreadcrumbList JSON-LD | 4 |
| `konbini-origin-badge` | country-of-origin badge (metafield, tag fallback) | 5 |
| `konbini-allergen-list` | EU-14 allergens from metafield | 5 |
| `konbini-usage-pairing` | how-to-use + pairings cross-sell (CRO) | 5 |
| `konbini-faq` | PDP FAQ from metaobjects + FAQPage JSON-LD | 5 |
| `konbini-free-shipping-bar` | cart drawer threshold progress (CRO) | 6 |

## Settings design guidelines

- Every setting label/help text is a `t:` key in `locales/en.default.schema.json` + `pl.schema.json`.
- Use `"blocks": [{ "type": "@theme" }, …]` with recommended KONBINI blocks first in section schemas.
- Expose: content, media, layout variants (column counts, media ratios), ma density select,
  palette-role selects. Never expose: raw colors, raw px, brand constants.

## JS

Custom elements extending Horizon's `Component`; files `assets/konbini-*.js`; registered
in the importmap (fenced edit in `snippets/scripts.liquid`) as `@konbini/<name>`.
Use the `assets/events.js` bus for cross-component communication.
Progressive enhancement only — Liquid renders the source of truth.
