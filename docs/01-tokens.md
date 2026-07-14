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

```css
:root {
  /* ink & paper */
  --k-color-ink: #0b00b5;
  --k-color-ink-soft: color-mix(in oklch, var(--k-color-ink) 72%, white);
  --k-color-paper: #ffffff;
  --k-color-paper-warm: #faf8f4;   /* washi undertone */
  --k-color-sumi: #1c1c1e;         /* near-black text */
  /* complementary accents derived from #0b00b5 in oklch */
  --k-color-kaki: /* persimmon — sale/promo */;
  --k-color-moss: /* moss green — in stock / success */;
  /* ma 間 spacing (approx. fibonacci rhythm) */
  --k-space-1: 0.5rem; --k-space-2: 0.8125rem; --k-space-3: 1.3125rem;
  --k-space-4: 2.125rem; --k-space-5: 3.4375rem; --k-space-6: 5.5625rem;
  /* motion */
  --k-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --k-duration-micro: 180ms; --k-duration-reveal: 420ms;
}
```

Final accent values are fixed in Phase 1 (contrast-checked; cobalt on white = 8.6:1 AA/AAA).

## Rules

- Brand constants are **fixed tokens**, not settings.
- Block settings may offer *ma* density (`compact|balanced|spacious`) mapping to
  `--k-space-*` steps — never raw px sliders, never free color pickers.
- Audit: `grep -rn '#0b00b5' blocks/ sections/ snippets/ assets/ | grep -v konbini-tokens` → empty.
