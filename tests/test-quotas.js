const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function setupSandbox() {
  const i18nPath = path.join(__dirname, '..', 'i18n-pt-br.js');
  const code = fs.readFileSync(i18nPath, 'utf8');

  const sandbox = {
    document: {
      title: "",
      body: { innerHTML: "", appendChild: () => {} },
      head: { appendChild: () => {} },
      createTreeWalker: () => ({ nextNode: () => null }),
      querySelectorAll: () => [],
      addEventListener: () => {},
      getElementById: () => null,
      createElement: () => ({ setAttribute: () => {}, style: {}, addEventListener: () => {} })
    },
    window: {
      addEventListener: () => {}
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

test('Tradução de Cotas: Limite semanal com opção de upgrade e créditos provisórios', () => {
  const sandbox = setupSandbox();
  const input = "You have hit your weekly limit, it refreshes in 4 days, 8 hours. If on a supported paid plan, you can use AI credits in the interim or upgrade to a higher tier.";
  const expected = "Você atingiu o seu limite semanal; ele será renovado em 4 dias, 8 horas. Se estiver em um plano pago compatível, você poderá usar créditos de IA nesse período ou fazer upgrade para um plano superior.";
  
  const res = sandbox.window.__CAMBRITH_TRANSLATE_STR__(input);
  assert.equal(res, expected);
});

test('Tradução de Cotas: Limite semanal com limite secundário desativado', () => {
  const sandbox = setupSandbox();
  const input = "You have hit your weekly limit, the 5-hour limit does not currently apply. Your weekly limit will fully refresh in 4 days, 8 hours.";
  const expected = "Você atingiu o seu limite semanal, portanto o limite de 5 horas não se aplica no momento. Seu limite semanal será totalmente renovado em 4 dias, 8 horas.";
  
  const res = sandbox.window.__CAMBRITH_TRANSLATE_STR__(input);
  assert.equal(res, expected);
});

test('Tradução de Cotas: Limite parcial usado (semanal e 5 horas)', () => {
  const sandbox = setupSandbox();
  const inWeekly = "You have used some of your weekly limit, it will fully refresh in 4 days, 8 hours.";
  const expWeekly = "Você usou parte do seu limite semanal; ele será totalmente renovado em 4 dias, 8 horas.";
  assert.equal(sandbox.window.__CAMBRITH_TRANSLATE_STR__(inWeekly), expWeekly);

  const in5h = "You have used some of your 5-hour limit, it will fully refresh in 3 hours, 38 minutes.";
  const exp5h = "Você usou parte do seu limite de 5 horas; ele será totalmente renovado em 3 horas, 38 minutos.";
  assert.equal(sandbox.window.__CAMBRITH_TRANSLATE_STR__(in5h), exp5h);
});

test('Tradução de Créditos de IA e Alerta de Cota do Modelo', () => {
  const sandbox = setupSandbox();
  const input = "You need at least 50 AI Credits to send messages. To continue using Claude Sonnet 4.6 (Thinking) now, purchase more AI Credits. Your plan's baseline quota will refresh on 18/10/2026, 17:26:38.";
  const expected = "Você precisa de pelo menos 50 créditos de IA para enviar mensagens. Para continuar usando Claude Sonnet 4.6 (Raciocínio) agora, compre mais créditos de IA. A cota básica do seu plano será renovada em 18/10/2026, 17:26:38.";
  
  const res = sandbox.window.__CAMBRITH_TRANSLATE_STR__(input);
  assert.equal(res, expected);
});
