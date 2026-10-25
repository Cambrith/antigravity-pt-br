#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${ANTIGRAVITY_APP_DIR:-}"
if [[ -z "$APP_DIR" ]]; then
    for cand in "$HOME/.local/opt/Antigravity-x64" "$HOME/.local/opt/Antigravity" "$HOME/.local/opt/antigravity" "/opt/antigravity"; do
        if [[ -f "$cand/resources/app.asar" ]]; then
            APP_DIR="$cand"
            break
        fi
    done
fi
APP_DIR="${APP_DIR:-$HOME/.local/opt/antigravity}"
ASAR="$APP_DIR/resources/app.asar"
PATCHER="${ANTIGRAVITY_PATCHER:-$HOME/.config/Antigravity/i18n/patch-asar.js}"

[[ -f "$ASAR" && -f "$PATCHER" ]] || exit 0

# Garante que PATH contenha ~/.local/bin e o executável do Node.js (inclusive sob systemd/cron)
export PATH="$HOME/.local/bin:${PATH:-}"
for cand_node_dir in "$HOME/.nvm/versions/node/"*"/bin" "/usr/local/bin" "/opt/bin"; do
    if [[ -d "$cand_node_dir" ]]; then
        export PATH="$cand_node_dir:$PATH"
    fi
done

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
