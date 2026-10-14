#!/usr/bin/env bash
set -euo pipefail

# Restaura apenas quando os hashes do backup e do aplicativo coincidirem.
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PATCHER="$ROOT/patch-asar.js"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js é necessário para validar o backup." >&2
  exit 1
fi
if pgrep -x antigravity >/dev/null 2>&1 || pgrep -x Antigravity >/dev/null 2>&1; then
  echo "Feche o Antigravity antes de restaurar." >&2
  exit 1
fi

CANDIDATES=(
  "$HOME/.local/opt/antigravity/resources"
  "/opt/antigravity/resources"
  "/Applications/Antigravity.app/Contents/Resources"
  "$HOME/Applications/Antigravity.app/Contents/Resources"
)
restored=0
for res in "${CANDIDATES[@]}"; do
  [[ -f "$res/app.asar.bak-original" ]] || continue
  echo "Validando backup em: $res"
  node "$PATCHER" --restore --asar="$res/app.asar" || {
    echo "Restauração recusada: backup não associado à instalação atual." >&2
    exit 1
  }
  restored=1
  app_dir="${res%/resources}"
  # Preservar lançadores que não pertençam a este projeto.
  launcher="$HOME/.local/bin/antigravity"
  if [[ -L "$launcher" ]]; then
    echo "Launcher é um link simbólico; preservado para revisão manual." >&2
  elif [[ -f "$launcher" ]] && grep -qF 'Antigravity Persistent Localization Launcher' "$launcher"; then
    if [[ -x "$app_dir/antigravity" ]]; then
      # Preservar o script que existia antes da restauração, sem sobrescrever cópias anteriores.
      snapshot="${launcher}.cambrith-uninstall-$(date +%Y%m%d%H%M%S).bak"
      cp -p -- "$launcher" "$snapshot"
      printf '#!/usr/bin/env bash\nexec "%s" "$@"\n' "$app_dir/antigravity" > "$launcher"
      chmod +x "$launcher"
      echo "Launcher original salvo em $snapshot; inicializador agora aponta ao app sem tradução."
    else
      echo "Launcher preservado; verifique manualmente o atalho após restaurar." >&2
    fi
  fi
done

if [[ "$restored" -eq 0 ]]; then
  echo "Nenhum backup verificável encontrado; nada foi alterado." >&2
  exit 1
fi
echo "Restauração segura concluída."
