#!/usr/bin/env bash
# Antigravity Persistent Localization Launcher (v3)
# Mantém a integridade da tradução pt-BR mesmo após atualizações automáticas do Antigravity

APP_DIR="${ANTIGRAVITY_APP_DIR:-$HOME/.local/opt/antigravity}"
ASAR="$APP_DIR/resources/app.asar"
I18N_RES="$APP_DIR/resources/i18n-pt-br.js"
GOLDEN_I18N="$HOME/.config/Antigravity/i18n/i18n-pt-br.js"
PATCHER="$HOME/.config/Antigravity/i18n/patch-asar.js"

# 1. Garantir que i18n-pt-br.js em resources/ esteja sempre sincronizado com o Golden Master
if [[ -f "$GOLDEN_I18N" ]]; then
    if [[ ! -f "$I18N_RES" ]] || ! cmp -s "$GOLDEN_I18N" "$I18N_RES"; then
        cp -f "$GOLDEN_I18N" "$I18N_RES" 2>/dev/null
    fi
fi

# 2. Verificar se o app.asar perdeu a injeção da tradução (ex: atualização recente do Antigravity)
if [[ -f "$ASAR" ]] && ! grep -q "Cambrith pt-BR Localization Injection v3" "$ASAR" 2>/dev/null; then
    if [[ -f "$PATCHER" ]]; then
        node "$PATCHER" --asar="$ASAR" >/dev/null 2>&1
    fi
fi

# 3. Executar o binário real do Antigravity passando argumentos e forçando idioma
if [[ -x "$APP_DIR/antigravity" ]]; then
    exec "$APP_DIR/antigravity" --lang=pt-BR "$@"
else
    # Fallback procurando no PATH
    REAL_BIN=$(which antigravity 2>/dev/null)
    if [[ -n "$REAL_BIN" && "$REAL_BIN" != "$HOME/.local/bin/antigravity" ]]; then
        exec "$REAL_BIN" --lang=pt-BR "$@"
    fi
fi
