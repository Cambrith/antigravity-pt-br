#!/usr/bin/env bash
# Inicia Antigravity com as personalizações Cambrith persistentes.
set -u

APP_DIR="${ANTIGRAVITY_APP_DIR:-}"
if [[ -z "$APP_DIR" ]]; then
    for cand in "$HOME/.local/opt/Antigravity-x64" "$HOME/.local/opt/Antigravity" "$HOME/.local/opt/antigravity" "/opt/antigravity"; do
        if [[ -x "$cand/antigravity" ]]; then
            APP_DIR="$cand"
            break
        fi
    done
fi
APP_DIR="${APP_DIR:-$HOME/.local/opt/antigravity}"
ASAR="$APP_DIR/resources/app.asar"
PATCHER="${ANTIGRAVITY_PATCHER:-$HOME/.config/Antigravity/i18n/patch-asar.js}"
LOG_DIR="$HOME/.local/state/antigravity-cambrith"
LOG_FILE="$LOG_DIR/update-guard.log"

# Sempre executar o patcher: ele sincroniza os arquivos mestres e só regrava
# app.asar quando a assinatura da versão não estiver presente.
if [[ -f "$ASAR" && -f "$PATCHER" ]]; then
    mkdir -p "$LOG_DIR"
    if ! node "$PATCHER" "--asar=$ASAR" >>"$LOG_FILE" 2>&1; then
        printf '[%s] Falha ao reaplicar as personalizações antes da abertura.\n' "$(date -Is)" >>"$LOG_FILE"
    fi
fi

launch_antigravity() {
    local binary="$1"
    shift
    # Cambrith: Garante tema escuro nativo para menus de contexto no Linux (GTK 3 / Wayland / KDE / GNOME)
    if [[ -z "${GTK_THEME:-}" ]]; then
        if [[ -d "/usr/share/themes/adw-gtk3-dark" ]]; then
            export GTK_THEME="adw-gtk3-dark"
        elif [[ -d "/usr/share/themes/Breeze-Dark" ]]; then
            export GTK_THEME="Breeze-Dark"
        fi
    fi
    for argument in "$@"; do
        if [[ "$argument" == --lang=* ]]; then
            exec "$binary" --enable-features=WebUIDarkMode --force-dark-mode "$@"
        fi
    done
    exec "$binary" --enable-features=WebUIDarkMode --force-dark-mode --lang=pt-BR "$@"
}

if [[ -x "$APP_DIR/antigravity" ]]; then
    launch_antigravity "$APP_DIR/antigravity" "$@"
fi

REAL_BIN="$(command -v antigravity || true)"
if [[ -n "$REAL_BIN" && "$REAL_BIN" != "$HOME/.local/bin/antigravity" ]]; then
    launch_antigravity "$REAL_BIN" "$@"
fi
printf 'Antigravity não foi encontrado em %s.\n' "$APP_DIR" >&2
exit 127
