# Upstream Sync (Shopify/horizon)

Upstream has **no releases/tags** — `main` moves ~weekly and may use unreleased Liquid
APIs (see upstream `README.md` warning). Changes are documented in upstream
`release-notes.md`.

Fork point: `upstream-base-68760d9` (Horizon v4.1.1).

## Monthly procedure

```sh
git fetch upstream
git checkout -b sync/upstream-$(date +%Y-%m) main
git merge upstream/main        # plain merge — never squash sync branches
```

1. Read upstream `release-notes.md` diff first.
2. Conflict policy: `config/settings_data.json` and `templates/*.json` are **always ours**;
   then manually reconcile any *new* upstream settings/defaults.
3. Re-apply/verify fenced edits (`KONBINI:start` markers) in:
   `layout/theme.liquid`, `snippets/stylesheets.liquid`, `snippets/scripts.liquid`,
   `config/settings_schema.json`, locale files.
4. Diff `locales/pl.json` vs `en.default.json` for untranslated new keys.
5. Full regression: CI green + `shopify theme dev` manual sweep (header, home, PLP, PDP,
   cart, search) + Lighthouse.
6. PR → plain merge to `main`.

## Active compatibility patches

- **Static color defaults** (`scripts/compat-static-color-defaults.sh`): the store's
  Theme API rejects `color_palette` references as color-setting defaults
  (documented on shopify.dev but not yet rolled out to this shop, as of 2026-07).
  The patch replaces 79 dynamic defaults across 17 upstream files with static
  hexes (`#000000`/`#FFFFFF` — white uppercase as a revert sentinel).
  **Re-run `apply` after every upstream sync. Run `revert` (after reading the
  script's caveats) once a scratch-theme push accepts dynamic defaults.**

## Danger zones

- `_`-prefixed private blocks/snippets are internal API — upstream renames freely.
  Any KONBINI reference to a private upstream block must be listed here:
  - (none yet)
- Never fork `assets/component.js`, `events.js`, `morph.js`, `section-renderer.js` —
  forking ends upstream JS syncs.
