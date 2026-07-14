#!/bin/sh
# Compatibility patch for stores where the Theme API does not yet accept
# color_palette references as color-setting defaults (Horizon upstream uses
# `"default": "{{ settings.color_palette.foreground }}"` — documented on
# shopify.dev, but rejected by this store's API as of 2026-07: rollout gap).
#
# `apply`  replaces palette-reference defaults with the palette's own static
#          hex values (visually identical defaults; merchant-set values in
#          settings_data.json are unaffected either way).
# `revert` restores the upstream dynamic references — run once the store
#          accepts them (retest with a push to a scratch draft theme first).
#
# Sentinels: white is written as UPPERCASE `#FFFFFF` so revert can't touch
# legitimate upstream lowercase `#ffffff` defaults (e.g. product-hotspots).
# Black `#000000` has no case marker (digits only) — verified absent as a
# static default at fork point upstream-base-68760d9. BEFORE reverting after
# an upstream sync, re-verify no legitimate `"default": "#000000"` or
# `"default": "#FFFFFF"` entries were introduced upstream:
#   git grep -nE '"default": "#(000000|FFFFFF)"' upstream/main -- blocks sections snippets config
#
# Keep this patch applied before every push/dev until revert day.
# Tracked in docs/06-upstream-sync.md (re-run `apply` after upstream syncs).

set -eu
cd "$(dirname "$0")/.."

case "${1:-}" in
  apply)
    grep -rlE '"default": "\{\{ settings\.color_palette\.(foreground|background) \}\}"' \
      blocks sections snippets config 2>/dev/null | while read -r f; do
      sed -i '' \
        -e 's/"default": "{{ settings\.color_palette\.foreground }}"/"default": "#000000"/g' \
        -e 's/"default": "{{ settings\.color_palette\.background }}"/"default": "#FFFFFF"/g' \
        "$f"
    done
    echo "Applied. Remaining dynamic color defaults (should be 0):"
    grep -rE '"default": "\{\{ settings\.color_palette\.' blocks sections snippets config 2>/dev/null | wc -l
    ;;
  revert)
    grep -rlE '"default": "#(000000|FFFFFF)"' \
      blocks sections snippets config 2>/dev/null | while read -r f; do
      sed -i '' \
        -e 's/"default": "#000000"/"default": "{{ settings.color_palette.foreground }}"/g' \
        -e 's/"default": "#FFFFFF"/"default": "{{ settings.color_palette.background }}"/g' \
        "$f"
    done
    echo "Reverted to dynamic palette references."
    ;;
  *)
    echo "usage: $0 apply|revert" >&2
    exit 1
    ;;
esac
