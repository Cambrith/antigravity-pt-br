const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function setupEnvironment() {
  const i18nPath = path.join(__dirname, '..', 'i18n-pt-br.js');
  const code = fs.readFileSync(i18nPath, 'utf8');

  const sandbox = {
    document: {
      title: "",
      body: { innerHTML: "", appendChild: () => {} },
      head: { appendChild: () => {} },
      createTreeWalker: () => ({ nextNode: () => null }),
      querySelectorAll: () => [],
      querySelector: () => null,
      addEventListener: () => {},
      getElementById: () => null,
      createElement: () => ({ setAttribute: () => {}, style: {}, addEventListener: () => {} })
    },
    window: {
      addEventListener: () => {},
      Notification: function MockNotification() {}
    },
    screen: { height: 1080 },
    MutationObserver: function() { return { observe: () => {}, disconnect: () => {} }; },
    NodeFilter: { SHOW_TEXT: 4 },
    setInterval: () => {},
    setTimeout: () => {},
    clearTimeout: () => {}
  };

  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox;
}

test('Início Rápido: Nomes em Português do Brasil são interceptados e gerados com sucesso', () => {
  const sandbox = setupEnvironment();
  const win = sandbox.window;

  assert.ok(Array.isArray(win.__ANTIGRAVITY_PTBR_ADJETIVOS__), 'Lista de adjetivos pt-BR deve existir');
  assert.ok(Array.isArray(win.__ANTIGRAVITY_PTBR_SUBSTANTIVOS__), 'Lista de substantivos pt-BR deve existir');
  assert.ok(win.__ANTIGRAVITY_PTBR_ADJETIVOS__.length > 20, 'Deve ter lista rica de adjetivos');
  assert.ok(win.__ANTIGRAVITY_PTBR_SUBSTANTIVOS__.length > 20, 'Deve ter lista rica de substantivos');

  // Simula a divisão nativa original de adjetivos e cientistas do Antigravity
  const testAdjStr = "adventurous agitated amazing beautiful blissful bold brave busy calm charming clever cool dazzling delightful eager elegant epic excited fearless fervent focused friendly gallant goofy happy hopeful intelligent jolly joyful keen kind lively lucid magical modest mysterious nifty noble optimistic peaceful proud quick quirky radiant resilient serene sharp silly splendid valiant vibrant wise wonderful zealous";
  const testSubStr = "archimedes babbage bardeen bell bohr borg bose brahmagupta carson chandrasekhar curie darwin davinci einstein euclid faraday fermi franklin galileo goodall hawking heisenberg hertz hopper hubble hypatia kepler lavoisier lovelace maxwell meitner mendel mendeleev newton nobel noether oppenheimer pascal pasteur planck pythagoras raman rutherford salk shannon tesla turing volta";

  const adjResult = vm.runInContext(`"${testAdjStr}".split(" ")`, sandbox);
  const subResult = vm.runInContext(`"${testSubStr}".split(" ")`, sandbox);

  assert.deepEqual(adjResult, win.__ANTIGRAVITY_PTBR_ADJETIVOS__);
  assert.deepEqual(subResult, win.__ANTIGRAVITY_PTBR_SUBSTANTIVOS__);

  // Testa a geração de um nome completo
  const nomeGerado = win.__ANTIGRAVITY_GERAR_NOME_PTBR__();
  assert.match(nomeGerado, /^[a-z-]+-[a-z-]+$/);
  const [adj, ...rest] = nomeGerado.split('-');
  assert.ok(win.__ANTIGRAVITY_PTBR_ADJETIVOS__.includes(adj), `Adjetivo "${adj}" deve pertencer à lista pt-BR`);
});

test('Criar Projeto: Modal utiliza pasta Documentos e suporta bridge nativa', () => {
  const i18nCode = fs.readFileSync(path.join(__dirname, '..', 'i18n-pt-br.js'), 'utf8');
  assert.ok(i18nCode.includes('~/Documentos/antigravity/...'), 'Template inicial deve exibir Documentos');
  assert.ok(!i18nCode.includes('~/Documents/antigravity/...'), 'Não deve conter Documents hardcoded no preview');

  const patchCode = fs.readFileSync(path.join(__dirname, '..', 'patch-asar.js'), 'utf8');
  assert.ok(patchCode.includes('getDocsFolder:'), 'Bridge nativa deve conter getDocsFolder');
  assert.ok(patchCode.includes("'Documentos', 'antigravity', folderName"), 'createReadme deve verificar Documentos');
});
