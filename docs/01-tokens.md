# Design Tokens

Three layers; custom code consumes tokens only — never raw values.

## Layer 1 — Merchant settings (`config/settings_schema.json` + `settings_data.json`)

- Horizon `color_palette`: background `#ffffff` (paper), foreground near-black ink,
  cobalt `#0b00b5` as primary button/accent color.
- Four font roles (body / subheading / heading / accent) from Shopify-hosted fonts.
- A saved preset **"KONBINI Wabi-Sabi"** in `settings_data.json` so the design
  survives "reset to defaults".

## Layer 2 — Horizon-generated CSS vars

`snippets/color-palette.liquid` (computed hover/contrast colors) and
`snippets/theme-styles-variables.liquid` (typography). **Never fork these snippets.**
Watch: with a very dark cobalt, the smart-contrast logic can flip hover colors —
button states must be explicitly tested (Phase 1 checklist).

## Layer 3 — `snippets/konbini-tokens.liquid` (ours)

Rendered from `layout/theme.liquid` right after `color-palette` (fenced single line).

The snippet is the source of truth. Final palette (all WCAG-AA verified; no
textures — client decision, quiet comes from space and type):

| Token | Value | Role | Contrast |
|---|---|---|---|
| `--k-color-ink` | `#0b00b5` | brand cobalt, CTA, links | 12.5:1 on white |
| `--k-color-sumi` | `#1c1c1e` | text | 17:1 on white |
| `--k-color-kaki` | `#b23c0e` | persimmon — sale/promo | 5.9:1 vs white (both ways) |
| `--k-color-moss` | `#3d6b50` | moss — success/in-stock | 6.2:1 on white |
| `--k-color-mist` | `#efeef9` | cobalt-tinted subtle bg | 14.8:1 with sumi |
| `--k-color-paper-warm` | `#faf8f4` | warm bg alternative | 16:1 with sumi |

Plus the *ma* spacing scale (`--k-space-1..6`, fibonacci-like), motion tokens
(`--k-ease-out`, `--k-duration-micro/reveal` — zeroed under
`prefers-reduced-motion`), and `--k-color-ink-soft` via `color-mix`.
Hover states are computed by Horizon's palette logic — verified: cobalt hovers
to `#1202ff` with white text (8.4:1), no contrast flip.

## Rules

- Brand constants are **fixed tokens**, not settings.
- Block settings may offer *ma* density (`compact|balanced|spacious`) mapping to
  `--k-space-*` steps — never raw px sliders, never free color pickers.
- Audit: `grep -rn '#0b00b5' blocks/ sections/ snippets/ assets/ | grep -v konbini-tokens` → empty.
