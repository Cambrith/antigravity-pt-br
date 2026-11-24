#!/usr/bin/env bash
set -u

echo "========================================================"
echo "   Desinstalador da Tradução do Antigravity (pt-BR)"
echo "========================================================"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [[ "$(uname -s)" == "Darwin" ]]; then
    CONFIG_I18N_DIR="$HOME/Library/Application Support/Antigravity/i18n"
else
    CONFIG_I18N_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/Antigravity/i18n"
fi
LAUNCHER="$HOME/.local/bin/antigravity"
LAUNCHER_BACKUP="$LAUNCHER.antes-pt-br"
LAUNCHER_MARKER="personalizações Cambrith persistentes"
SIGNATURE="Cambrith pt-BR Localization Injection"

# 1. Desliga o monitor que reaplica a tradução depois de atualizações (senão ela volta sozinha).
if command -v systemctl >/dev/null 2>&1 && systemctl --user show-environment >/dev/null 2>&1; then
    if systemctl --user list-unit-files antigravity-patch-after-update.path >/dev/null 2>&1; then
        systemctl --user disable --now antigravity-patch-after-update.path >/dev/null 2>&1 || true
        rm -f "$HOME/.config/systemd/user/antigravity-patch-after-update.path" \
              "$HOME/.config/systemd/user/antigravity-patch-after-update.service"
        systemctl --user daemon-reload >/dev/null 2>&1 || true
        echo "✅ Monitor de atualizações desativado."
    fi
fi

# 2. Restaura o app.asar original, mas só se o backup for o original da MESMA versão instalada
#    (a validação é feita pelo patcher; um backup antigo nunca é copiado sobre um app novo).
PATCHER=""
for p in "$CONFIG_I18N_DIR/patch-asar.js" "$SCRIPT_DIR/../patch-asar.js" "$SCRIPT_DIR/patch-asar.js"; do
    if [[ -f "$p" ]]; then PATCHER="$p"; break; fi
done

CANDIDATES=(
    "$HOME/.local/opt/Antigravity-x64/resources"
    "$HOME/.local/opt/Antigravity/resources"
    "$HOME/.local/opt/antigravity/resources"
    "/opt/antigravity/resources"
    "/usr/lib/antigravity/resources"
    "/usr/share/antigravity/resources"
    "$HOME/.var/app/com.google.Antigravity/data/antigravity/resources"
    "/Applications/Antigravity.app/Contents/Resources"
    "$HOME/Applications/Antigravity.app/Contents/Resources"
)

FAILED=0
FOUND=0
for res in "${CANDIDATES[@]}"; do
    asar="$res/app.asar"
    [[ -f "$asar" ]] || continue
    grep -qaF "$SIGNATURE" "$asar" || continue
    FOUND=1
    if [[ -z "$PATCHER" ]] || ! command -v node >/dev/null 2>&1; then
        echo "❌ $asar está traduzido, mas o Node.js ou o patch-asar.js não foram encontrados para validar o backup."
        FAILED=1
        continue
    fi
    echo "Restaurando o original em $asar..."
    if node "$PATCHER" --restore-original "--asar=$asar" && ! grep -qaF "$SIGNATURE" "$asar"; then
        rm -f "$res/i18n-pt-br.js" "$res/cambrith-window-controls.js"
        echo "✅ Original restaurado."
    else
        echo "❌ Não foi possível restaurar $asar com segurança. Reinstale o Antigravity para voltar ao original."
        FAILED=1
    fi
done

if [[ "$FOUND" -eq 0 ]]; then
    echo "ℹ️ Nenhuma instalação traduzida foi encontrada nos caminhos padrão."
fi

# 3. Remove o launcher apenas se foi este projeto que o instalou; devolve o que existia antes.
if [[ -f "$LAUNCHER" && ! -L "$LAUNCHER" ]] && grep -qF "$LAUNCHER_MARKER" "$LAUNCHER"; then
    rm -f "$LAUNCHER"
    echo "✅ Launcher da tradução removido."
    if [[ -e "$LAUNCHER_BACKUP" || -L "$LAUNCHER_BACKUP" ]]; then
        mv "$LAUNCHER_BACKUP" "$LAUNCHER"
        echo "✅ Launcher anterior restaurado em $LAUNCHER."
    fi
elif [[ -e "$LAUNCHER" ]]; then
    echo "ℹ️ $LAUNCHER não foi criado por este projeto; mantido."
fi

if [[ "$FAILED" -ne 0 ]]; then
    echo "Desinstalação concluída com avisos (veja acima)."
    exit 1
fi
echo "Desinstalação concluída. Reinicie o Antigravity."
