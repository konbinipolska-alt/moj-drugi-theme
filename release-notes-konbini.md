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
