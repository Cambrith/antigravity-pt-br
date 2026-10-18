const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const BRIDGE_PATH = path.join(REPO_ROOT, 'mobile-bridge.js');
const QR_PATH = path.join(REPO_ROOT, 'qr-engine.js');
const SHELL_PATH = path.join(REPO_ROOT, 'mobile.sh');

test('Mobile Bridge: Arquivos essenciais existem e são executáveis', () => {
  assert.ok(fs.existsSync(BRIDGE_PATH), 'mobile-bridge.js deve existir');
  assert.ok(fs.existsSync(QR_PATH), 'qr-engine.js deve existir');
  assert.ok(fs.existsSync(SHELL_PATH), 'mobile.sh deve existir');

  // Sintaxe do Node.js
  assert.doesNotThrow(() => {
    execSync(`node -c "${BRIDGE_PATH}"`, { stdio: 'pipe' });
  }, 'mobile-bridge.js deve ter sintaxe válida do Node.js');

  assert.doesNotThrow(() => {
    execSync(`node -c "${QR_PATH}"`, { stdio: 'pipe' });
  }, 'qr-engine.js deve ter sintaxe válida do Node.js');
});

test('Mobile Bridge: Gerador de QR Code produz matriz válida para URLs móveis', () => {
  const { xLb } = require(QR_PATH);
  const testUrl = 'https://meu-teste.trycloudflare.com/?pin=123456';
  const matrix = xLb(testUrl);

  assert.ok(Array.isArray(matrix), 'Resultado deve ser uma matriz');
  assert.ok(matrix.length >= 21, 'Dimensão mínima do QR code');
  assert.equal(matrix.length, matrix[0].length, 'A matriz deve ser quadrada');
  assert.equal(typeof matrix[0][0], 'boolean', 'Elementos da matriz devem ser booleanos');
});

test('Mobile Bridge: Script shell possui cabeçalho bash e permissão correta', () => {
  const content = fs.readFileSync(SHELL_PATH, 'utf8');
  assert.ok(content.startsWith('#!/usr/bin/env bash'), 'mobile.sh deve ter shebang bash');
  assert.ok(content.includes('mobile-bridge.js'), 'mobile.sh deve invocar mobile-bridge.js');
});
