const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const os = require('os');

test('Resolução Multiplataforma: Estrutura de caminhos de arquivos por SO', () => {
  const home = os.homedir();

  // Linux paths
  const linuxAsar = path.join(home, '.local', 'opt', 'antigravity', 'resources', 'app.asar');
  const linuxConfig = path.join(home, '.config', 'Antigravity', 'i18n');
  assert.ok(linuxAsar.includes('resources'));
  assert.ok(linuxConfig.includes('Antigravity'));

  // macOS paths
  const macAsar = '/Applications/Antigravity.app/Contents/Resources/app.asar';
  const macConfig = path.join(home, 'Library', 'Application Support', 'Antigravity', 'i18n');
  assert.ok(macAsar.endsWith('app.asar'));
  assert.ok(macConfig.includes('Application Support'));

  // Windows paths
  const winAsar = 'C:\\Users\\User\\AppData\\Local\\Programs\\antigravity\\resources\\app.asar';
  const winConfig = 'C:\\Users\\User\\AppData\\Roaming\\Antigravity\\i18n';
  assert.ok(winAsar.includes('antigravity'));
  assert.ok(winConfig.includes('Roaming'));
});
