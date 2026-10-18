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
if [ -f "$SCRIPT_DIR/cambrith-window-controls.js" ]; then
    cp "$SCRIPT_DIR/cambrith-window-controls.js" "$CONFIG_I18N_DIR/cambrith-window-controls.js"
fi
if [ -f "$SCRIPT_DIR/generate_i18n.py" ]; then
    cp "$SCRIPT_DIR/generate_i18n.py" "$CONFIG_I18N_DIR/generate_i18n.py"
fi

# 3.1 Configurar regras globais de pensamento e comportamento do agente (pt-BR)
GEMINI_CONFIG_DIR="$HOME/.gemini/config"
mkdir -p "$GEMINI_CONFIG_DIR"
if [ -f "$SCRIPT_DIR/AGENTS.md" ]; then
    cp "$SCRIPT_DIR/AGENTS.md" "$GEMINI_CONFIG_DIR/AGENTS.md"
    cp "$SCRIPT_DIR/AGENTS.md" "$GEMINI_CONFIG_DIR/GEMINI.md"
    echo "🤖 Diretrizes do agente (pensamentos, ações e respostas em pt-BR) configuradas em $GEMINI_CONFIG_DIR."
elif [ -f "$SCRIPT_DIR/../AGENTS.md" ]; then
    cp "$SCRIPT_DIR/../AGENTS.md" "$GEMINI_CONFIG_DIR/AGENTS.md"
    cp "$SCRIPT_DIR/../AGENTS.md" "$GEMINI_CONFIG_DIR/GEMINI.md"
    echo "🤖 Diretrizes do agente (pensamentos, ações e respostas em pt-BR) configuradas em $GEMINI_CONFIG_DIR."
fi

# 4. Executar patch no app.asar
echo "🔧 Aplicando tradução no app.asar..."
node "$CONFIG_I18N_DIR/patch-asar.js" --asar="$ASAR_PATH" --force

# 5. Configurar inicializador persistente (Launcher)
# 5.1 Vigiar atualizações do app.asar (somente instalação padrão no perfil do usuário)
if [ "$ASAR_PATH" = "$HOME/.local/opt/antigravity/resources/app.asar" ] && command -v systemctl >/dev/null 2>&1 && systemctl --user show-environment >/dev/null 2>&1; then
    USER_CONFIG_DIR="$HOME/.config/systemd/user"
    mkdir -p "$USER_CONFIG_DIR"
    cp "$SCRIPT_DIR/linux/patch-after-update.sh" "$CONFIG_I18N_DIR/patch-after-update.sh"
    chmod +x "$CONFIG_I18N_DIR/patch-after-update.sh"
    cp "$SCRIPT_DIR/linux/systemd/antigravity-patch-after-update.path" "$USER_CONFIG_DIR/antigravity-patch-after-update.path"
    cp "$SCRIPT_DIR/linux/systemd/antigravity-patch-after-update.service" "$USER_CONFIG_DIR/antigravity-patch-after-update.service"
    systemctl --user daemon-reload
    systemctl --user enable --now antigravity-patch-after-update.path
    echo "🛡️ Proteção contra atualizações ativada para o Antigravity."
fi

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
