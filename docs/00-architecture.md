# Architecture Overview

KONBINI 2.0 is a fork of [Shopify Horizon](https://github.com/Shopify/horizon)
(fork point: tag `upstream-base-68760d9`, Horizon v4.1.1).

## Why Horizon

- Native **theme blocks** architecture: every section is composed of merchant-addable
  blocks with settings — the core requirement of this project.
- Build-free: ES modules via importmap (`snippets/scripts.liquid`), custom elements
  extending `Component` (`assets/component.js`), server-rendered Liquid as source of truth.
- Strong accessibility, performance, and settings foundations maintained by Shopify.

## Layering strategy

| Layer | What | Where |
|---|---|---|
| Upstream | Horizon code, untouched wherever possible | everything without `konbini` in the name |
| Fenced edits | Minimal marked insertions in a short list of upstream files | `layout/theme.liquid`, `snippets/stylesheets.liquid`, `snippets/scripts.liquid`, `config/settings_schema.json`, `locales/*` |
| KONBINI | Everything we own | `blocks/konbini-*`, `blocks/_konbini-*`, `sections/konbini-*`, `snippets/konbini-*`, `assets/konbini-*` |

Customization decision tree (in order): **configure** Horizon settings → **restyle**
via tokens/`assets/konbini-overrides.css` → **compose** (nest Horizon blocks with
`{% content_for 'block' %}`) → **copy-and-rename** to `konbini-*` as last resort.

## Sub-projects

Header/nav + footer are shared, superior projects — their settings freeze after Phase 2.
Each page template (home, collection, product, cart, search, …) is then an independent
sub-project composed of blocks. Roadmap and phase gates: see the project plan.

## Phase-2 seam: AI concierge

Horizon ships `snippets/chat-drawer.liquid` rendered from `layout/theme.liquid` — the
future AI concierge mounts there (`sections/konbini-concierge.liquid` +
`assets/konbini-concierge.js`, importmap `@konbini/concierge`). Nothing in MVP may
block this seam. Its knowledge substrate is the metafields + JSON-LD layer
(`docs/03-metafields.md`, `docs/05-structured-data.md`).
