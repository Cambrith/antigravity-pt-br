(() => {
  const install = () => {
    if (!document.body || !window.electronNative) return false;
    if (document.getElementById('cambrith-window-controls')) return true;

    const icons = {
      minimize: '<svg width="18" height="18" viewBox="0 0 18 18" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M4 12H14"/></svg>',
      maximize: '<svg width="18" height="18" viewBox="0 0 18 18" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect x="4.25" y="4.25" width="9.5" height="9.5" rx="1"/></svg>',
      restore: '<svg width="18" height="18" viewBox="0 0 18 18" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M7 3.5H13L14.5 5V10.5"/><rect x="3.5" y="7" width="8" height="7.5" rx="0.8"/></svg>',
      close: '<svg width="18" height="18" viewBox="0 0 18 18" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="m5 5 8 8M13 5l-8 8"/></svg>'
    };

    const style = document.createElement('style');
    style.id = 'cambrith-window-controls-style';
    style.textContent = `
      #cambrith-window-drag-region {
        position: fixed; top: 0; left: 320px; right: 116px; height: 30px;
        z-index: 2147483000; -webkit-app-region: drag; app-region: drag;
      }
      #cambrith-window-controls {
        position: fixed; top: 2px; right: 6px; height: 30px; display: flex;
        align-items: center; gap: 2px; z-index: 2147483001;
        -webkit-app-region: no-drag; app-region: no-drag;
      }
      #cambrith-window-controls button {
        box-sizing: border-box; width: 34px; height: 30px; padding: 0;
        display: grid; place-items: center; border: 1px solid transparent; border-radius: 7px;
        color: #e8e8e8; background: transparent; cursor: default;
        transition: background-color 120ms ease, color 120ms ease;
        -webkit-app-region: no-drag; app-region: no-drag;
      }
      #cambrith-window-controls button:hover { background: rgba(255,255,255,.11); border-color: rgba(255,255,255,.18); }
      #cambrith-window-controls button:active { background: rgba(255,255,255,.18); }
      #cambrith-window-controls button[data-action="close"]:hover { background: #c9363e; color: #fff; }
      #cambrith-window-controls button[data-action="close"]:active { background: #a9232b; }
      #cambrith-window-controls svg {
        display: block !important; width: 18px !important; height: 18px !important;
        min-width: 18px; max-width: 18px; min-height: 18px; max-height: 18px;
        flex: 0 0 18px; transform: none !important; margin: 0; padding: 0;
        fill: none; stroke: currentColor;
        stroke-width: 1.55; stroke-linecap: round; stroke-linejoin: round;
        pointer-events: none;
      }
      @media (prefers-reduced-motion: reduce) {
        #cambrith-window-controls button { transition: none; }
      }
    `;
    document.head.appendChild(style);

    const dragRegion = document.createElement('div');
    dragRegion.id = 'cambrith-window-drag-region';
    dragRegion.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dragRegion);

    const controls = document.createElement('div');
    controls.id = 'cambrith-window-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Controles da janela');
    controls.innerHTML = `
      <button type="button" data-action="minimize" aria-label="Minimizar" title="Minimizar">${icons.minimize}</button>
      <button type="button" data-action="maximize" aria-label="Maximizar" title="Maximizar">${icons.maximize}</button>
      <button type="button" data-action="close" aria-label="Fechar" title="Fechar">${icons.close}</button>
    `;
    document.body.appendChild(controls);

    const maximizeButton = controls.querySelector('[data-action="maximize"]');
    const refreshMaximizeIcon = async () => {
      try {
        const maximized = await window.electronNative.isMaximized();
        maximizeButton.innerHTML = maximized ? icons.restore : icons.maximize;
        maximizeButton.setAttribute('aria-label', maximized ? 'Restaurar' : 'Maximizar');
        maximizeButton.title = maximized ? 'Restaurar' : 'Maximizar';
      } catch (_) {}
    };
    controls.addEventListener('click', async (event) => {
      const button = event.target.closest('button[data-action]');
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      const action = button.dataset.action;
      try {
        if (action === 'minimize') await window.electronNative.minimize();
        if (action === 'close') await window.electronNative.close();
        if (action === 'maximize') {
          if (await window.electronNative.isMaximized()) {
            await window.electronNative.unmaximize();
          } else {
            await window.electronNative.maximize();
          }
          window.setTimeout(refreshMaximizeIcon, 80);
        }
      } catch (_) {}
    });
    window.addEventListener('resize', refreshMaximizeIcon, { passive: true });
    window.addEventListener('focus', refreshMaximizeIcon, { passive: true });
    window.setInterval(refreshMaximizeIcon, 700);
    void refreshMaximizeIcon();
    return true;
  };

  if (install()) return;
  let attempts = 0;
  const retry = window.setInterval(() => {
    attempts += 1;
    if (install() || attempts >= 40) window.clearInterval(retry);
  }, 250);
})();
