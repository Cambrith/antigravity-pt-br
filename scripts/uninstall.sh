#!/usr/bin/env bash
set -e

echo "========================================================"
echo "   Desinstalador da Tradução do Antigravity (pt-BR)"
echo "========================================================"

CANDIDATES=(
    "$HOME/.local/opt/antigravity/resources"
    "/opt/antigravity/resources"
    "/Applications/Antigravity.app/Contents/Resources"
    "$HOME/Applications/Antigravity.app/Contents/Resources"
)

RESTORED=0
for res in "${CANDIDATES[@]}"; do
    if [ -f "$res/app.asar.bak-original" ]; then
        echo "Restaurando backup original em $res/app.asar..."
        cp -f "$res/app.asar.bak-original" "$res/app.asar"
        rm -f "$res/i18n-pt-br.js"
        RESTORED=1
        echo "✅ Backup original restaurado com sucesso."
    fi
done

if [ "$RESTORED" -eq 0 ]; then
    echo "⚠️ Nenhum arquivo de backup app.asar.bak-original foi localizado automaticamente."
fi

# Remover launcher customizado se existir
if [ -f "$HOME/.local/bin/antigravity" ]; then
    rm -f "$HOME/.local/bin/antigravity"
    echo "✅ Launcher personalizado removido."
fi

echo "Desinstalação concluída. Reinicie o Antigravity."
