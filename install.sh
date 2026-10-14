#!/usr/bin/env bash
set -e

# ========================================================
# Instalador da Tradução Antigravity pt-BR (Linux)
# ========================================================

echo "========================================================"
echo "   Instalador da Tradução do Antigravity (pt-BR)"
echo "========================================================"
echo ""

# 1. Verificar se Node.js está instalado
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Erro: Node.js não foi encontrado no sistema."
    echo "Instale o Node.js para continuar (ex: sudo apt install nodejs ou via nvm)."
    exit 1
fi

NODE_VER=$(node -v)
echo "✅ Node.js detectado: $NODE_VER"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_I18N_DIR="$HOME/.config/Antigravity/i18n"
LOCAL_BIN="$HOME/.local/bin"

# 2. Localizar app.asar
ASAR_PATH=""
CANDIDATES=(
    "$HOME/.local/opt/antigravity/resources/app.asar"
    "/opt/antigravity/resources/app.asar"
    "/usr/lib/antigravity/resources/app.asar"
    "/usr/share/antigravity/resources/app.asar"
    "$HOME/.var/app/com.google.Antigravity/data/antigravity/resources/app.asar"
)

for p in "${CANDIDATES[@]}"; do
    if [ -f "$p" ]; then
        ASAR_PATH="$p"
        break
    fi
done

if [ -z "$ASAR_PATH" ]; then
    echo "⚠️ app.asar não encontrado automaticamente nos caminhos padrão."
    read -rp "Digite o caminho completo para o seu app.asar: " USER_INPUT_ASAR
    if [ -f "$USER_INPUT_ASAR" ]; then
        ASAR_PATH="$USER_INPUT_ASAR"
    else
        echo "❌ Arquivo não encontrado: $USER_INPUT_ASAR"
        exit 1
    fi
fi

echo "✅ Antigravity localizado em: $ASAR_PATH"

# 3. Criar diretório persistente e copiar arquivos mestre
echo "📦 Configurando arquivos permanentes em $CONFIG_I18N_DIR..."
mkdir -p "$CONFIG_I18N_DIR"
cp "$SCRIPT_DIR/i18n-pt-br.js" "$CONFIG_I18N_DIR/i18n-pt-br.js"
cp "$SCRIPT_DIR/patch-asar.js" "$CONFIG_I18N_DIR/patch-asar.js"
chmod +x "$CONFIG_I18N_DIR/patch-asar.js"
if [ -f "$SCRIPT_DIR/generate_i18n.py" ]; then
    cp "$SCRIPT_DIR/generate_i18n.py" "$CONFIG_I18N_DIR/generate_i18n.py"
fi

# 4. Executar patch no app.asar
echo "🔧 Aplicando tradução no app.asar..."
if pgrep -x antigravity >/dev/null 2>&1; then
    echo "❌ Feche o Antigravity antes de modificar seus arquivos." >&2
    exit 1
fi
node "$CONFIG_I18N_DIR/patch-asar.js" --asar="$ASAR_PATH"

# 5. Configurar inicializador persistente (Launcher)
if [ -d "$LOCAL_BIN" ] && [ -f "$SCRIPT_DIR/launcher/antigravity-launcher.sh" ]; then
    echo "🚀 Configurando inicializador automático em $LOCAL_BIN/antigravity..."
    cp "$SCRIPT_DIR/launcher/antigravity-launcher.sh" "$LOCAL_BIN/antigravity"
    chmod +x "$LOCAL_BIN/antigravity"
fi

# 6. Atualizar atalho .desktop se existir
DESKTOP_FILE="$HOME/.local/share/applications/google-antigravity.desktop"
if [ -f "$DESKTOP_FILE" ]; then
    if ! grep -q -- "--lang=pt-BR" "$DESKTOP_FILE"; then
        sed -i 's|Exec=\(.*\)|\Exec=\1 --lang=pt-BR|g' "$DESKTOP_FILE"
        echo "✅ Atalho do menu desktop atualizado com suporte pt-BR."
    fi
fi

echo ""
echo "========================================================"
echo "🎉 Tradução aplicada com sucesso!"
echo "Abra ou reinicie o Antigravity para aproveitar a interface 100% em Português."
echo "========================================================"
