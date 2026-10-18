#!/usr/bin/env node
/**
 * Antigravity Mobile Bridge & PWA Gateway (pt-BR)
 * -------------------------------------------------------------
 * Permite controlar o Google Antigravity pelo celular via PWA no Google Chrome
 * de qualquer lugar (4G, 5G ou Wi-Fi externo) com 100% da interface traduzida
 * para o Português do Brasil (pt-BR).
 *
 * Características:
 * - Zero dependências npm externas (Node.js nativo puro: http, https, crypto, child_process, fs, path, os)
 * - Auto-detecção inteligente da porta e CSRF do Antigravity Desktop
 * - Injeção transparente do i18n-pt-br.js e manifesto PWA
 * - Túnel criptografado HTTPS gratuito via Cloudflare Tunnel (cloudflared)
 * - Autenticação por PIN/Token para acesso seguro fora de casa
 * - Exibição de QR Code no terminal para conexão instantânea pela câmera do smartphone
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { spawn, execSync } = require('child_process');
const readline = require('readline');

// Importa gerador de QR Code
const { xLb } = require('./qr-engine.js');

// 1. Argumentos e Configuração
const ARGS = process.argv.slice(2);
function getArg(name, def) {
  for (let i = 0; i < ARGS.length; i++) {
    const a = ARGS[i];
    if (a.startsWith(`--${name}=`)) return a.split('=', 2)[1];
    if (a === `--${name}`) {
      if (i + 1 < ARGS.length && !ARGS[i + 1].startsWith('--')) {
        return ARGS[i + 1];
      }
      return true;
    }
  }
  return def;
}

const LOCAL_PORT = parseInt(getArg('port', '4444'), 10);
const USE_TUNNEL = !ARGS.includes('--no-tunnel');
const USER_PIN = getArg('pin', null) || Math.floor(100000 + Math.random() * 900000).toString();
const REPO_DIR = __dirname;
const I18N_FILE = path.join(REPO_DIR, 'i18n-pt-br.js');
const ICON_FILE = path.join(REPO_DIR, 'icon.png');

// Cache em memória
let cachedI18n = null;
let cachedIcon = null;

try {
  if (fs.existsSync(I18N_FILE)) cachedI18n = fs.readFileSync(I18N_FILE, 'utf8');
  if (fs.existsSync(ICON_FILE)) cachedIcon = fs.readFileSync(ICON_FILE);
} catch (_) {}

// 2. Detecção Automática do Language Server do Antigravity
function detectLsPort() {
  const home = os.homedir();
  let logPath = '';
  if (process.platform === 'win32') {
    logPath = path.join(process.env.APPDATA || path.join(home, 'AppData', 'Roaming'), 'Antigravity', 'logs', 'language_server.log');
  } else if (process.platform === 'darwin') {
    logPath = path.join(home, 'Library', 'Application Support', 'Antigravity', 'logs', 'language_server.log');
  } else {
    logPath = path.join(home, '.config', 'Antigravity', 'logs', 'language_server.log');
  }

  if (fs.existsSync(logPath)) {
    try {
      const content = fs.readFileSync(logPath, 'utf8');
      const matches = [...content.matchAll(/listening on random port at (\d+) for HTTPS/gi)];
      if (matches.length > 0) {
        return parseInt(matches[matches.length - 1][1], 10);
      }
    } catch (_) {}
  }

  // Fallback: verificar portas ativas via ss/lsof no Linux
  if (process.platform === 'linux') {
    try {
      const out = execSync('ss -tulpn 2>/dev/null | grep language_server || true', { encoding: 'utf8' });
      const m = out.match(/127\.0\.0\.1:(\d+)/);
      if (m) return parseInt(m[1], 10);
    } catch (_) {}
  }
  return 0;
}

// 3. Renderizador de QR Code ASCII no Terminal
function renderQrTerminal(text) {
  try {
    const matrix = xLb(text);
    const size = matrix.length;
    const pad = 2;
    const lines = [];

    // Linha superior de preenchimento
    lines.push('  ' + '▄'.repeat((size + pad * 2)));

    for (let r = 0; r < size; r += 2) {
      let line = '  ██';
      for (let c = 0; c < size; c++) {
        const top = matrix[r][c];
        const bot = r + 1 < size ? matrix[r + 1][c] : false;
        if (top && bot) line += ' ';
        else if (top && !bot) line += '▄';
        else if (!top && bot) line += '▀';
        else line += '█';
      }
      line += '██';
      lines.push(line);
    }

    // Linha inferior de preenchimento
    lines.push('  ' + '▀'.repeat((size + pad * 2)));
    return lines.join('\n');
  } catch (err) {
    return `[QR Code não disponível: ${err.message}]`;
  }
}

// 4. Download Automático do cloudflared
async function ensureCloudflared() {
  // 1. Verificar se está no PATH
  try {
    execSync('cloudflared --version', { stdio: 'ignore' });
    return 'cloudflared';
  } catch (_) {}

  // 2. Verificar em ~/.local/bin/cloudflared
  const home = os.homedir();
  const localBin = path.join(home, '.local', 'bin');
  const binExt = process.platform === 'win32' ? '.exe' : '';
  const localTarget = path.join(localBin, `cloudflared${binExt}`);

  if (fs.existsSync(localTarget)) {
    return localTarget;
  }

  // 3. Baixar binário oficial
  console.log('⬇️  cloudflared não encontrado. Baixando binário oficial seguro da Cloudflare...');
  fs.mkdirSync(localBin, { recursive: true });

  const platform = process.platform;
  const arch = os.arch();
  let downloadUrl = '';

  if (platform === 'linux') {
    downloadUrl = arch === 'arm64'
      ? 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64'
      : 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64';
  } else if (platform === 'darwin') {
    downloadUrl = 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64';
  } else if (platform === 'win32') {
    downloadUrl = 'https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe';
  } else {
    throw new Error(`Plataforma não suportada para auto-download: ${platform}`);
  }

  await new Promise((resolve, reject) => {
    function fetchUrl(url) {
      https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          fetchUrl(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Falha ao baixar cloudflared (HTTP ${res.statusCode})`));
          return;
        }
        const file = fs.createWriteStream(localTarget);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          if (platform !== 'win32') {
            fs.chmodSync(localTarget, 0o755);
          }
          resolve();
        });
      }).on('error', reject);
    }
    fetchUrl(downloadUrl);
  });

  console.log('✅ cloudflared instalado com sucesso em ' + localTarget);
  return localTarget;
}

// 5. Início do Servidor Mobile Bridge
async function main() {
  console.clear();
  console.log('\x1b[1m\x1b[36m===============================================================\x1b[0m');
  console.log('\x1b[1m\x1b[32m  🚀 Antigravity Mobile PWA - Controle Remoto Seguro (pt-BR)  \x1b[0m');
  console.log('\x1b[1m\x1b[36m===============================================================\x1b[0m\n');

  const lsPort = detectLsPort();
  if (!lsPort) {
    console.error('\x1b[31m❌ Erro: O Google Antigravity não parece estar em execução no computador.\x1b[0m');
    console.error('Abra o aplicativo Antigravity no seu computador e tente novamente.\n');
    process.exit(1);
  }

  console.log(`📡 Conectado ao Antigravity local na porta: \x1b[1m\x1b[33m${lsPort}\x1b[0m`);
  console.log(`🔒 PIN de Acesso Seguro: \x1b[1m\x1b[32m${USER_PIN}\x1b[0m`);

  // HTML da tela de autenticação
  const LOGIN_HTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Acesso Seguro - Antigravity Mobile</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #121214;
      color: #e1e1e6;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      background: #202024;
      border: 1px solid #29292e;
      border-radius: 16px;
      padding: 32px 24px;
      width: 100%;
      max-width: 360px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      text-align: center;
    }
    .logo {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      border-radius: 12px;
    }
    h1 { font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #fff; }
    p { font-size: 14px; color: #a8a8b3; margin-bottom: 24px; line-height: 1.4; }
    input {
      width: 100%;
      background: #121214;
      border: 1px solid #323238;
      border-radius: 8px;
      padding: 14px;
      color: #fff;
      font-size: 20px;
      text-align: center;
      letter-spacing: 6px;
      outline: none;
      margin-bottom: 16px;
      transition: border-color 0.2s;
    }
    input:focus { border-color: #00875f; }
    button {
      width: 100%;
      background: #00875f;
      color: #fff;
      border: none;
      border-radius: 8px;
      padding: 14px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    button:hover { background: #00b37e; }
  </style>
</head>
<body>
  <div class="card">
    <img src="/icon.png" alt="Antigravity" class="logo">
    <h1>Antigravity Remoto</h1>
    <p>Digite o PIN de 6 dígitos exibido no terminal do seu computador para conectar.</p>
    <form method="GET" action="/">
      <input type="password" name="pin" maxlength="6" inputmode="numeric" placeholder="••••••" autofocus required>
      <button type="submit">Conectar</button>
    </form>
  </div>
</body>
</html>`;

  // Criação do Servidor HTTP Proxy
  const server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const cookies = req.headers.cookie || '';
    const hasAuthCookie = cookies.includes(`ag_pin=${USER_PIN}`);

    // Checagem de PIN via query string ?pin=... ou ?key=...
    const queryPin = urlObj.searchParams.get('pin') || urlObj.searchParams.get('key');
    if (queryPin === USER_PIN) {
      res.writeHead(302, {
        'Set-Cookie': `ag_pin=${USER_PIN}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
        'Location': '/'
      });
      res.end();
      return;
    }

    // Rota: Ícone Oficial
    if (urlObj.pathname === '/icon.png') {
      if (cachedIcon) {
        res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' });
        res.end(cachedIcon);
      } else {
        res.writeHead(404);
        res.end();
      }
      return;
    }

    // Rota: Manifesto PWA
    if (urlObj.pathname === '/manifest.json' || urlObj.pathname === '/manifest.webmanifest') {
      const manifest = {
        name: 'Google Antigravity',
        short_name: 'Antigravity',
        description: 'Antigravity Mobile Companion em Português do Brasil',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#121214',
        theme_color: '#121214',
        icons: [
          { src: '/icon.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      };
      res.writeHead(200, { 'Content-Type': 'application/manifest+json; charset=utf-8' });
      res.end(JSON.stringify(manifest, null, 2));
      return;
    }

    // Rota: Arquivo de Tradução pt-BR
    if (urlObj.pathname === '/i18n-pt-br.js') {
      if (!cachedI18n && fs.existsSync(I18N_FILE)) {
        cachedI18n = fs.readFileSync(I18N_FILE, 'utf8');
      }
      res.writeHead(200, {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache'
      });
      res.end(cachedI18n || '/* i18n not found */');
      return;
    }

    // Se não estiver autenticado e tentar acessar rotas principais, mostra tela de PIN
    if (!hasAuthCookie && (urlObj.pathname === '/' || urlObj.pathname === '/index.html')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(LOGIN_HTML);
      return;
    }

    // Repassar requisição para o Language Server local
    const headers = { ...req.headers };
    headers.host = `127.0.0.1:${lsPort}`;
    delete headers['accept-encoding']; // Facilita injeção no HTML puro

    const proxyReq = https.request({
      hostname: '127.0.0.1',
      port: lsPort,
      path: req.url,
      method: req.method,
      headers: headers,
      rejectUnauthorized: false
    }, (proxyRes) => {
      const isHtml = (proxyRes.headers['content-type'] || '').includes('text/html');

      if (isHtml && proxyRes.statusCode === 200) {
        let body = '';
        proxyRes.setEncoding('utf8');
        proxyRes.on('data', chunk => body += chunk);
        proxyRes.on('end', () => {
          // Injeção de Meta Tags PWA
          const pwaMeta = `
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/png" href="/icon.png">
    <link rel="apple-touch-icon" href="/icon.png">
    <meta name="theme-color" content="#121214">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Antigravity">
          `;
          body = body.replace('</head>', `${pwaMeta}\n</head>`);

          // Injeção da Tradução em pt-BR
          body = body.replace('</body>', `<script src="/i18n-pt-br.js"></script>\n</body>`);

          const outHeaders = { ...proxyRes.headers };
          delete outHeaders['content-length'];
          outHeaders['content-type'] = 'text/html; charset=utf-8';
          res.writeHead(200, outHeaders);
          res.end(body);
        });
      } else {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
      }
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`Erro de comunicação com o Language Server: ${err.message}`);
    });

    req.pipe(proxyReq);
  });

  // Proxy de WebSockets (streaming bidirecional em tempo real)
  server.on('upgrade', (req, socket, head) => {
    const headers = { ...req.headers };
    headers.host = `127.0.0.1:${lsPort}`;

    const proxyReq = https.request({
      hostname: '127.0.0.1',
      port: lsPort,
      path: req.url,
      method: req.method,
      headers: headers,
      rejectUnauthorized: false
    });

    proxyReq.on('upgrade', (proxyRes, proxySocket, proxyHead) => {
      socket.write(`HTTP/1.1 101 Switching Protocols\r\n` +
        Object.keys(proxyRes.headers).map(k => `${k}: ${proxyRes.headers[k]}`).join('\r\n') +
        '\r\n\r\n');
      if (proxyHead && proxyHead.length) socket.write(proxyHead);
      proxySocket.pipe(socket);
      socket.pipe(proxySocket);
    });

    proxyReq.on('error', () => {
      socket.destroy();
    });

    proxyReq.end();
  });

  // Iniciar servidor local
  server.listen(LOCAL_PORT, '127.0.0.1', async () => {
    console.log(`🌐 Servidor Bridge ativo localmente em: \x1b[36mhttp://127.0.0.1:${LOCAL_PORT}\x1b[0m\n`);

    if (!USE_TUNNEL) {
      console.log('ℹ️  Modo local ativado (--no-tunnel). Use o IP da sua rede Wi-Fi para conectar.');
      return;
    }

    try {
      const cloudflaredBin = await ensureCloudflared();
      console.log('🚇 Abrindo túnel seguro Cloudflare...');

      const tunnelProc = spawn(cloudflaredBin, ['tunnel', '--url', `http://127.0.0.1:${LOCAL_PORT}`], {
        stdio: ['ignore', 'pipe', 'pipe']
      });

      let tunnelUrl = '';
      const rlOut = readline.createInterface({ input: tunnelProc.stdout });
      const rlErr = readline.createInterface({ input: tunnelProc.stderr });

      function handleLine(line) {
        const match = line.match(/https:\/\/[a-zA-Z0-9-]+\.trycloudflare\.com/);
        if (match && !tunnelUrl) {
          tunnelUrl = match[0];
          const fullMobileUrl = `${tunnelUrl}/?pin=${USER_PIN}`;

          console.log('\n\x1b[1m\x1b[32m✅ Túnel Cloudflare Criado com Sucesso!\x1b[0m');
          console.log('\x1b[1m\x1b[33m---------------------------------------------------------------\x1b[0m');
          console.log('📱 Acesse no Google Chrome do seu celular (4G, 5G ou Wi-Fi):');
          console.log(`\x1b[1m\x1b[36m👉 ${fullMobileUrl}\x1b[0m\n`);

          console.log('📲 Escaneie o QR Code abaixo com a câmera do celular:');
          console.log(renderQrTerminal(fullMobileUrl));

          console.log('\n\x1b[1m📌 Como instalar o PWA no celular:\x1b[0m');
          console.log('1. Abra a URL acima no Google Chrome.');
          console.log('2. O Chrome exibirá automaticamente o aviso ou toque nos 3 pontinhos.');
          console.log('3. Selecione "\x1b[1mInstalar aplicativo\x1b[0m" ou "\x1b[1mAdicionar à tela inicial\x1b[0m".');
          console.log('4. Pronto! O Antigravity abrirá como app em tela cheia e em português!');
          console.log('\x1b[1m\x1b[33m---------------------------------------------------------------\x1b[0m');
          console.log('Pressione \x1b[1mCtrl+C\x1b[0m para encerrar o túnel móvel a qualquer momento.\n');
        }
      }

      rlOut.on('line', handleLine);
      rlErr.on('line', handleLine);

      // Limpeza ao sair
      process.on('SIGINT', () => {
        console.log('\n🛑 Encerrando túnel e servidor móvel...');
        tunnelProc.kill();
        server.close();
        process.exit(0);
      });

      process.on('SIGTERM', () => {
        tunnelProc.kill();
        server.close();
        process.exit(0);
      });

    } catch (err) {
      console.error('\x1b[31m❌ Falha ao iniciar túnel Cloudflare:\x1b[0m', err.message);
      console.log('Você ainda pode usar o serviço localmente ou na mesma rede Wi-Fi.');
    }
  });
}

main().catch(err => {
  console.error('Erro fatal:', err);
  process.exit(1);
});
