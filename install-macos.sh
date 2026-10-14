#!/usr/bin/env bash
set -e

# ========================================================
# Instalador da Tradução Antigravity pt-BR (macOS)
# ========================================================

echo "========================================================"
echo "   Instalador da Tradução do Antigravity (pt-BR) - macOS"
echo "========================================================"
echo ""

# 1. Verificar se Node.js está instalado
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Erro: Node.js não foi encontrado no sistema."
    echo "Instale o Node.js para continuar (ex: brew install node ou via nvm)."
    exit 1
fi

NODE_VER=$(node -v)
echo "✅ Node.js detectado: $NODE_VER"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_I18N_DIR="$HOME/Library/Application Support/Antigravity/i18n"

# 2. Localizar app.asar no macOS
ASAR_PATH=""
CANDIDATES=(
    "/Applications/Antigravity.app/Contents/Resources/app.asar"
    "$HOME/Applications/Antigravity.app/Contents/Resources/app.asar"
)

for p in "${CANDIDATES[@]}"; do
    if [ -f "$p" ]; then
        ASAR_PATH="$p"
        break
    fi
done

if [ -z "$ASAR_PATH" ]; then
    echo "⚠️ Antigravity.app não encontrado nos caminhos padrão de aplicativos."
    read -rp "Digite o caminho completo para o app.asar do Antigravity: " USER_INPUT_ASAR
    if [ -f "$USER_INPUT_ASAR" ]; then
        ASAR_PATH="$USER_INPUT_ASAR"
    else
        echo "❌ Arquivo não encontrado: $USER_INPUT_ASAR"
        exit 1
    fi
fi

echo "✅ Antigravity localizado em: $ASAR_PATH"

# 3. Criar diretório permanente e sincronizar arquivos
echo "📦 Configurando arquivos permanentes em $CONFIG_I18N_DIR..."
mkdir -p "$CONFIG_I18N_DIR"
cp "$SCRIPT_DIR/i18n-pt-br.js" "$CONFIG_I18N_DIR/i18n-pt-br.js"
cp "$SCRIPT_DIR/patch-asar.js" "$CONFIG_I18N_DIR/patch-asar.js"
chmod +x "$CONFIG_I18N_DIR/patch-asar.js"

# 4. Executar patch
echo "🔧 Aplicando tradução no app.asar..."
APP_BUNDLE="${ASAR_PATH%/Contents/Resources/app.asar}"
if pgrep -x Antigravity >/dev/null 2>&1; then
    echo "❌ Encerre o Antigravity antes da instalação." >&2
    exit 1
fi
if command -v codesign >/dev/null 2>&1 && codesign -dv "$APP_BUNDLE" >/dev/null 2>&1; then
    echo "❌ Instalação interrompida: bundle macOS assinado. Alterar app.asar invalida a assinatura." >&2
    echo "Esta versão ainda não possui fluxo de reassinatura e teste em macOS validado." >&2
    exit 1
fi
node "$CONFIG_I18N_DIR/patch-asar.js" --asar="$ASAR_PATH"

echo ""
echo "========================================================"
echo "🎉 Tradução aplicada com sucesso no macOS!"
echo "Abra ou reinicie o Antigravity para aproveitar a interface em Português."
echo "========================================================"
