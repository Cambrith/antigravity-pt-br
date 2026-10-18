#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${ANTIGRAVITY_APP_DIR:-$HOME/.local/opt/antigravity}"
ASAR="$APP_DIR/resources/app.asar"
PATCHER="${ANTIGRAVITY_PATCHER:-$HOME/.config/Antigravity/i18n/patch-asar.js}"

[[ -f "$ASAR" && -f "$PATCHER" ]] || exit 0

# Aguarda a substituição atômica ou a gravação do atualizador terminar.
previous=""
stable=0
for _ in $(seq 1 180); do
    [[ -f "$ASAR" ]] || { sleep 1; continue; }
    current="$(stat -c '%s:%Y' "$ASAR" 2>/dev/null || true)"
    if [[ -n "$current" && "$current" == "$previous" ]]; then
        ((stable += 1))
        if ((stable >= 4)); then
            exec node "$PATCHER" "--asar=$ASAR"
        fi
    else
        stable=0
        previous="$current"
    fi
    sleep 1
done

printf '[%s] app.asar não estabilizou após atualização; o launcher tentará reaplicar o patch.\n' "$(date -Is)" >&2
exit 0
