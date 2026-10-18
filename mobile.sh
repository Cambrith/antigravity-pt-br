#!/usr/bin/env bash
# Antigravity Mobile PWA Runner (pt-BR)
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
node "$DIR/mobile-bridge.js" "$@"
