const root = document.querySelector('#game');
const start = document.querySelector('#start');
const pause = document.querySelector('#pause');
const name = document.querySelector('#game-name');
const status = document.querySelector('#game-status');
const hint = document.querySelector('#hint');
const touchControls = document.querySelector('#touch-controls');
const leftControl = document.querySelector('#move-left');
const rightControl = document.querySelector('#move-right');

let cleanup = () => {};
let togglePause = () => {};
const games = {
  reflex: { title: 'NEON REFLEX', hint: 'Toque no núcleo rosa antes que ele desapareça.', run: neonReflex },
  dodge: { title: 'PIXEL DODGE', hint: 'Use ◀ ▶, A/D ou as setas para desviar das ameaças.', run: pixelDodge },
  memory: { title: 'MEMORY PULSE', hint: 'Encontre todos os pares de energia com o menor número de tentativas.', run: memoryPulse },
};

function buzz(ms = 12) { if (navigator.vibrate) navigator.vibrate(ms); }
function reset() { cleanup(); cleanup = () => {}; root.replaceChildren(); pause.disabled = true; pause.textContent = 'PAUSAR'; touchControls.hidden = true; }
function overlay(text) { const element = document.createElement('div'); element.className = 'game-overlay'; element.innerHTML = `<span>${text}</span>`; root.append(element); return element; }
function setGame(key) {
  const game = games[key]; reset(); name.textContent = game.title; hint.textContent = game.hint; status.textContent = 'toque em iniciar';
  document.querySelectorAll('[data-game]').forEach(button => button.classList.toggle('active', button.dataset.game === key));
  start.textContent = 'INICIAR';
  start.onclick = () => { reset(); cleanup = game.run(); pause.disabled = key === 'memory'; start.textContent = 'REINICIAR'; };
  pause.onclick = () => togglePause();
}

function neonReflex() {
  let score = 0, time = 15, alive = true, paused = false, spawnTimeout = null;
  const update = () => status.textContent = `tempo ${time}s · pontos ${score}`;
  update();
  const timer = setInterval(() => { if (!alive || paused) return; time--; update(); if (time <= 0) finish(); }, 1000);
  function finish() { alive = false; clearInterval(timer); clearTimeout(spawnTimeout); root.replaceChildren(); overlay(`FIM · ${score} PONTOS`); status.textContent = `rota concluída · ${score} pontos`; pause.disabled = true; }
  function spawn() {
    if (!alive || paused) return;
    const target = document.createElement('button'); target.className = 'orb'; target.setAttribute('aria-label', 'Tocar no alvo para marcar um ponto');
    target.style.left = `${7 + Math.random() * 74}%`; target.style.top = `${8 + Math.random() * 70}%`;
    target.onpointerdown = event => { event.preventDefault(); if (!alive || paused) return; score++; buzz(); target.classList.add('hit'); update(); clearTimeout(spawnTimeout); setTimeout(() => { target.remove(); spawn(); }, 90); };
    root.append(target); spawnTimeout = setTimeout(() => { target.remove(); spawn(); }, 900);
  }
  togglePause = () => { if (!alive) return; paused = !paused; pause.textContent = paused ? 'RETOMAR' : 'PAUSAR'; if (paused) { clearTimeout(spawnTimeout); overlay('PAUSADO'); } else { root.querySelector('.game-overlay')?.remove(); spawn(); } };
  spawn();
  return () => { alive = false; clearInterval(timer); clearTimeout(spawnTimeout); togglePause = () => {}; };
}

function pixelDodge() {
  let x = 46, score = 0, alive = true, paused = false, lastFrame = performance.now(), spawnElapsed = 0;
  touchControls.hidden = false;
  const ship = document.createElement('div'); ship.className = 'ship'; root.append(ship);
  const hazards = []; const draw = () => { ship.style.left = `${x}%`; };
  const move = delta => { if (!alive || paused) return; x = Math.min(91, Math.max(0, x + delta)); draw(); };
  const keyMove = event => { if (['ArrowLeft', 'a', 'A'].includes(event.key)) { event.preventDefault(); move(-8); } if (['ArrowRight', 'd', 'D'].includes(event.key)) { event.preventDefault(); move(8); } };
  const startHold = delta => event => { event.preventDefault(); clearInterval(hold); move(delta); hold = setInterval(() => move(delta), 95); };
  const stopHold = () => clearInterval(hold); let hold = null;
  const leftHold = startHold(-8); const rightHold = startHold(8); const releaseEvents = ['pointerup', 'pointercancel', 'pointerleave'];
  document.addEventListener('keydown', keyMove); leftControl.addEventListener('pointerdown', leftHold); rightControl.addEventListener('pointerdown', rightHold); releaseEvents.forEach(type => { leftControl.addEventListener(type, stopHold); rightControl.addEventListener(type, stopHold); });
  draw(); status.textContent = 'sobreviveu 0s';
  function spawnHazard() { const hazard = document.createElement('div'); hazard.className = 'hazard'; hazard.style.left = `${Math.random() * 88}%`; hazard.style.top = '-42px'; root.append(hazard); hazards.push({ el: hazard, y: -42, speed: 190 + Math.random() * 85 }); }
  function finish() { alive = false; hazards.forEach(h => h.el.remove()); overlay(`FIM · ${score}s`); status.textContent = `fim · ${score}s sobrevividos`; pause.disabled = true; }
  function loop(now) {
    const delta = Math.min(40, now - lastFrame); lastFrame = now;
    if (alive && !paused) { spawnElapsed += delta; if (spawnElapsed > 720) { spawnElapsed = 0; spawnHazard(); score++; status.textContent = `sobreviveu ${score}s`; }
      hazards.forEach((hazard, index) => { hazard.y += hazard.speed * delta / 1000; hazard.el.style.top = `${hazard.y}px`; const a = hazard.el.getBoundingClientRect(), b = ship.getBoundingClientRect(); if (a.left < b.right && a.right > b.left && a.bottom > b.top && a.top < b.bottom) { buzz(55); finish(); } if (hazard.y > root.clientHeight + 50) { hazard.el.remove(); hazards.splice(index, 1); } }); }
    if (alive) requestAnimationFrame(loop);
  }
  togglePause = () => { if (!alive) return; paused = !paused; pause.textContent = paused ? 'RETOMAR' : 'PAUSAR'; if (paused) overlay('PAUSADO'); else root.querySelector('.game-overlay')?.remove(); };
  requestAnimationFrame(loop);
  return () => { alive = false; clearInterval(hold); document.removeEventListener('keydown', keyMove); leftControl.removeEventListener('pointerdown', leftHold); rightControl.removeEventListener('pointerdown', rightHold); releaseEvents.forEach(type => { leftControl.removeEventListener(type, stopHold); rightControl.removeEventListener(type, stopHold); }); togglePause = () => {}; };
}

function memoryPulse() {
  const values = ['✦','◈','◉','△','✦','◈','◉','△'].sort(() => Math.random() - .5);
  const grid = document.createElement('div'); grid.className = 'memory-grid'; root.append(grid);
  let open = [], matches = 0, attempts = 0, locked = false;
  status.textContent = 'pares 0/4 · tentativas 0';
  values.forEach(value => { const card = document.createElement('button'); card.className = 'memory-card'; card.textContent = value; card.setAttribute('aria-label', 'Carta virada para baixo'); card.onpointerdown = event => { event.preventDefault(); if (locked || card.classList.contains('open') || card.classList.contains('matched')) return; buzz(8); card.classList.add('open'); card.setAttribute('aria-label', `Carta ${value}`); open.push({ card, value }); if (open.length === 2) { attempts++; locked = true; const [first, second] = open; if (first.value === second.value) { setTimeout(() => { first.card.classList.replace('open', 'matched'); second.card.classList.replace('open', 'matched'); matches++; open = []; locked = false; status.textContent = `pares ${matches}/4 · tentativas ${attempts}`; if (matches === 4) { status.textContent = `rota concluída · ${attempts} tentativas`; overlay(`4/4 · ${attempts} TENTATIVAS`); } }, 170); } else { setTimeout(() => { first.card.classList.remove('open'); second.card.classList.remove('open'); first.card.setAttribute('aria-label', 'Carta virada para baixo'); second.card.setAttribute('aria-label', 'Carta virada para baixo'); open = []; locked = false; status.textContent = `pares ${matches}/4 · tentativas ${attempts}`; }, 720); } } }; grid.append(card); });
  togglePause = () => {}; pause.disabled = true; return () => { togglePause = () => {}; };
}

document.querySelectorAll('[data-game]').forEach(button => button.onclick = () => setGame(button.dataset.game));
document.addEventListener('keydown', event => { if (event.key.toLowerCase() === 'p' && !pause.disabled) { event.preventDefault(); togglePause(); } });
setGame('reflex');
