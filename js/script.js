/* =========================================================
   For Leya, My Love 💗 — 1st Monthsarry gift
   Flow: Intro → Eat → Study → Sleep → Dream → Letter → Memories → Final
   Plain JavaScript, no libraries, no backend.
   ========================================================= */

// ---------- Easy-to-edit settings ----------

// Put a legally obtained copy of "Na Para Bang" here. If it's missing the site still works.
const MUSIC_SRC = 'assets/audio/love-song.mp3';

// Optional: set this to a transparent PNG/WebP (e.g. 'assets/character/leya.png')
// to replace the drawn anime Leya with your own illustration.
const CHARACTER_IMAGE = '';

// Memory montage. Add/remove/reorder freely. type: 'image' or 'video'.
// pos = which part of the photo to keep in frame (CSS object-position).
const MEMORIES = [
  { type: 'image', src: 'assets/memories/memory-01.jpg', caption: 'Golden hour, pero mas glowing ka pa rin. 🌅', pos: '50% 35%' },
  { type: 'image', src: 'assets/memories/memory-02.jpg', caption: 'Beach girl ko. 🌊 Yung ngiti mo dito, grabe.', pos: '50% 35%' },
  { type: 'image', src: 'assets/memories/memory-03.jpg', caption: 'Ang cute mo dito sa cap mo, love. 🧢' },
  { type: 'image', src: 'assets/memories/memory-04.jpg', caption: 'Yung flower sa buhok mo, bagay na bagay. 🌺', pos: '45% 50%' },
  { type: 'video', src: 'assets/clips/clip-01.mp4', caption: 'Ikaw lang talaga, love. 💗' },
  { type: 'image', src: 'assets/memories/memory-05.jpg', caption: 'Kahit nakatalikod ka, alam kong ikaw yan. Hehehe.', pos: '35% 50%' },
  { type: 'image', src: 'assets/memories/memory-06.jpg', caption: 'Chill lang si love dito. 💙' },
  { type: 'image', src: 'assets/memories/memory-07.jpg', caption: 'Yung pose na \'to. 😌💗' },
  { type: 'image', src: 'assets/memories/memory-08.jpg', caption: 'Night out ni love. ✨', pos: '55% 40%' },
  { type: 'image', src: 'assets/memories/memory-09.jpg', caption: 'Yung pout na \'to, ang hirap tanggihan. 🥺', pos: '50% 40%' },
  { type: 'image', src: 'assets/memories/memory-10.jpg', caption: 'Mirror selfie queen. 📱', pos: '62% 50%' },
  { type: 'image', src: 'assets/memories/memory-11.jpg', caption: 'Isa pa. Hindi ako magsasawa. Hehehe.', pos: '62% 50%' },
  { type: 'image', src: 'assets/memories/memory-12.jpg', caption: 'Simple lang, pero ang ganda pa rin.' },
  { type: 'video', src: 'assets/clips/clip-02.mp4', caption: 'Mga ganitong moments mo, love. 🎥' },
  { type: 'image', src: 'assets/memories/memory-13.jpg', caption: 'Kahit walang effort, ganda pa rin. 💜', pos: '45% 40%' },
  { type: 'image', src: 'assets/memories/memory-14.jpg', caption: 'Spider-Love. 🕷️❤️ Ang galing mo dito.' },
  { type: 'image', src: 'assets/memories/memory-15.jpg', caption: 'Yung mga video call natin. 📞💗' },
  { type: 'image', src: 'assets/memories/memory-16.jpg', caption: 'Kahit malabo yung cam, cute ka pa rin. Hehehe. ✌️', pos: '35% 50%' },
];

const SLIDE_MS = 5500;   // how long each photo stays
const LOW = 35;          // energy level where she "needs" something

// ---------- Messages ----------
const MSG = {
  eat: {
    idle: ['Hi love! 💗', 'Hello love! Kamusta araw mo? 😊'],
    low: ['Love, kumain ka na diyan?', 'Kumain ka na ba, love?', 'Love, wag kang magpapagutom ha.', 'Please eat something muna, love.', 'Alagaan mo rin sarili mo, okay?', 'Kain ka muna diyan, love.'],
    doing: ['Nom nom nom... 😋', 'Sarap ba, love? Hehehe'],
    done: 'Ayan, kumain na. ❤️',
  },
  study: {
    idle: ['Okay, aral time na si love 📚', 'Ano pinag-aaralan mo ngayon, love?'],
    low: ['Wag ka magpaka-stress masyado diyan, love ha?', 'Study well, love.', 'Take a little break din.', "Don't push yourself too hard.", 'Kaya mo yan, love.', 'Wag mong kalimutang magpahinga.', 'Nandito lang ako, okay?'],
    doing: ['Kaya mo yan, love! 💪', 'Galing galing naman ng love ko ✨'],
    done: 'Ayan, tapos na! Proud ako sayo, love. 💗',
  },
  sleep: {
    idle: ['Hala, gabi na pala 🌙', 'Ang late na, love...'],
    low: ['Matulog ka na diyan, love.', 'Inaantok na si love oh 🥱', 'Tama na cellphone, love. Tulog na 😴', 'Pahinga ka na, love. Bukas ulit.'],
    goodnight: ['Goodnight love, sleep well. 🌙', 'I love youuuu. ❤️'],
  },
};

// What she says if you press the "wrong" button for the current stage
const HINTS = {
  eat:   { study: 'Kain muna bago aral, love 🥺', sleep: 'Wag matulog nang gutom, love. Kain muna 🍱' },
  study: { eat: 'Kakakain mo lang, love. Hehehe 😆', sleep: 'Konting aral muna, then tulog na 📚' },
  sleep: { eat: 'Busog ka pa, love. Tulog na 😴', study: 'Bukas na yan, love. Pahinga na 💤' },
};

const STAGES = {
  eat:   { area: 'kitchen', lowMood: 'hungry',   thought: '🍙' },
  study: { area: 'study',   lowMood: 'stressed', thought: '📚' },
  sleep: { area: 'bedroom', lowMood: 'sleepy',   thought: '💤' },
};

const FINAL_DREAM_DELAY = 1500;

// ---------- Game state (only lives during this visit) ----------
const gameState = {
  eatEnergy: 100,
  studyEnergy: 100,
  sleepEnergy: 100,
  currentStage: 'eat',
  busy: false,
  sleeping: false,
  dreamUnlocked: false,
};

// ---------- Helpers ----------
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (a, b) => a + Math.random() * (b - a);

// Every async flow checks runId so "Play Again" can cancel everything cleanly.
let runId = 0;
const CANCELLED = Symbol('cancelled');
function wait(ms) {
  const id = runId;
  return new Promise((resolve, reject) =>
    setTimeout(() => (id === runId ? resolve() : reject(CANCELLED)), ms));
}
function run(fn) {
  return fn().catch((e) => { if (e !== CANCELLED) console.error(e); });
}

// Keep a correct "vh" on mobile browsers with moving toolbars
function setVh() { document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`); }
setVh();
window.addEventListener('resize', setVh);

let toastTimer;
function toast(text, ms = 3200) {
  const t = $('#toast');
  t.textContent = text;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

function showScreen(id) {
  $$('.screen').forEach((s) => s.classList.toggle('active', s.id === id));
  startAmbient(id);
}

// Fade the whole screen out, do something, fade back in
async function curtain(fn, color = '#ffe6ef', hold = 150) {
  const c = $('#curtain');
  c.style.background = color;
  c.classList.add('on');
  await wait(700);
  fn();
  await wait(hold);
  c.classList.remove('on');
  await wait(600);
}

// ---------- Effects ----------
const HEARTS = ['💗', '💕', '💖', '💓', '❤️', '✨'];

let ambientTimer = null;
function startAmbient(screenId) {
  clearInterval(ambientTimer);
  const layer = $(`#${screenId} .hearts-layer`);
  if (!layer) return;
  const spawn = () => {
    const h = document.createElement('span');
    h.className = 'float-heart';
    h.textContent = pick(HEARTS);
    h.style.left = `${rand(0, 100)}%`;
    h.style.fontSize = `${rand(14, 30)}px`;
    h.style.animationDuration = `${rand(7, 12)}s`;
    h.style.setProperty('--drift', `${rand(-60, 60)}px`);
    h.style.setProperty('--rot', `${rand(-40, 40)}deg`);
    h.addEventListener('animationend', () => h.remove());
    layer.appendChild(h);
  };
  for (let i = 0; i < 4; i++) setTimeout(spawn, i * 300);
  ambientTimer = setInterval(spawn, screenId === 'dream' ? 650 : 900);
}

function centerOf(el, yRatio = 0.5) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height * yRatio };
}

function burstHearts(el, count = 12, yRatio = 0.4) {
  const { x, y } = centerOf(el, yRatio);
  const fx = $('#fx');
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'burst';
    s.textContent = pick(HEARTS);
    const angle = (Math.PI * 2 * i) / count + rand(-0.3, 0.3);
    const dist = rand(60, 130);
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    s.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    s.style.setProperty('--rot', `${rand(-60, 60)}deg`);
    s.addEventListener('animationend', () => s.remove());
    fx.appendChild(s);
  }
}

function floatText(text, el, yRatio = 0.3) {
  const { x, y } = centerOf(el, yRatio);
  const s = document.createElement('span');
  s.className = 'float-text';
  s.textContent = text;
  s.style.left = `${x + rand(-40, 40)}px`;
  s.style.top = `${y}px`;
  s.style.setProperty('--dx', `${rand(-30, 30)}px`);
  s.addEventListener('animationend', () => s.remove());
  $('#fx').appendChild(s);
}

function spawnZ(el, yRatio = 0.15) {
  const { x, y } = centerOf(el, yRatio);
  const z = document.createElement('span');
  z.className = 'z';
  z.textContent = pick(['Z', 'z', 'Z']);
  z.style.left = `${x + rand(10, 40)}px`;
  z.style.top = `${y}px`;
  z.style.fontSize = `${rand(18, 30)}px`;
  z.addEventListener('animationend', () => z.remove());
  $('#fx').appendChild(z);
}

// ---------- Character ----------
const leya = $('#leya');

function setMood(state) {
  leya.dataset.state = state;
  leya.classList.remove('yawn');
}

function setProp(kind) {
  const prop = $('#prop');
  prop.dataset.prop = kind;
  prop.classList.toggle('show', !!kind);
  const icons = { eat: ['🍚', '🥄'], study: ['📖', '✏️'] }[kind] || ['', ''];
  $('.prop-main', prop).textContent = icons[0];
  $('.prop-tool', prop).textContent = icons[1];
}

function showThought(icon) {
  const t = $('#thought');
  t.textContent = icon || '';
  t.classList.toggle('show', !!icon);
}

let lastMsg = '';
function say(text) {
  const b = $('#bubble');
  b.textContent = text;
  b.classList.remove('pop');
  void b.offsetWidth; // restart the pop animation
  b.classList.add('show', 'pop');
}
function sayRandom(list) {
  let m;
  do { m = pick(list); } while (list.length > 1 && m === lastMsg);
  lastMsg = m;
  say(m);
}
function hideBubble() { $('#bubble').classList.remove('show', 'pop'); }

function yawn() {
  leya.classList.add('yawn');
  setTimeout(() => leya.classList.remove('yawn'), 1400);
}

// Swap the drawn SVG for a custom image if one is configured
if (CHARACTER_IMAGE) {
  const img = new Image();
  img.onload = () => {
    img.className = 'leya-svg';
    img.alt = 'Leya';
    $('#leyaSvg').replaceWith(img);
  };
  img.src = CHARACTER_IMAGE;
}

// ---------- Scene ----------
function setArea(name) {
  $('#scene').dataset.area = name;
  $$('.area').forEach((a) => a.classList.toggle('active', a.dataset.area === name));
}

function setNight(level) {
  $('#night').style.setProperty('--night', level);
  $('#scene').classList.toggle('dark', level > 0.3);
}

function renderNeeds() {
  for (const k of ['eat', 'study', 'sleep']) {
    const v = gameState[`${k}Energy`];
    $(`#need-${k} .fill`).style.width = `${v}%`;
    $(`#need-${k}`).classList.toggle('low', v <= LOW);
  }
}

function renderButtons() {
  $$('.action').forEach((b) => {
    const s = b.dataset.action;
    const isCurrent = s === gameState.currentStage && !gameState.busy;
    b.classList.toggle('current', isCurrent);
    b.classList.toggle('ready', isCurrent && gameState[`${s}Energy`] <= LOW);
  });
}

// ---------- Stages ----------
let decayTimer = null;
let chatTimer = null;
let zzzTimer = null;

function stopTimers() {
  clearInterval(decayTimer);
  clearInterval(chatTimer);
  clearInterval(zzzTimer);
}

function startStage(stage) {
  const cfg = STAGES[stage];
  const key = `${stage}Energy`;
  stopTimers();
  gameState.currentStage = stage;
  gameState.busy = false;
  setArea(cfg.area);
  setMood('idle');
  setProp('');
  showThought('');
  sayRandom(MSG[stage].idle);

  let wentLow = false;
  decayTimer = setInterval(() => {
    gameState[key] = Math.max(15, gameState[key] - 1.2);
    if (stage === 'sleep') setNight(((100 - gameState.sleepEnergy) / 100) * 0.62);

    if (!wentLow && gameState[key] <= LOW) {
      wentLow = true;
      setMood(cfg.lowMood);
      showThought(cfg.thought);
      sayRandom(MSG[stage].low);
      chatTimer = setInterval(() => {
        sayRandom(MSG[stage].low);
        if (stage === 'sleep') yawn();
      }, 3600);
      if (stage === 'sleep') zzzTimer = setInterval(() => spawnZ(leya), 1000);
    }
    if (gameState[key] <= 15) clearInterval(decayTimer);
    renderNeeds();
    renderButtons();
  }, 80);

  renderNeeds();
  renderButtons();
}

function beginAction() {
  gameState.busy = true;
  stopTimers();
  showThought('');
  renderButtons();
}

// Smoothly fill an energy bar back to 100
function refill(key, ms) {
  const id = runId;
  const start = gameState[key];
  const t0 = performance.now();
  return new Promise((resolve, reject) => {
    const step = (t) => {
      if (id !== runId) return reject(CANCELLED);
      const p = Math.min(1, (t - t0) / ms);
      gameState[key] = start + (100 - start) * p;
      renderNeeds();
      if (p < 1) requestAnimationFrame(step); else resolve();
    };
    requestAnimationFrame(step);
  });
}

// 🍱 EAT
async function doEat() {
  beginAction();
  setMood('eating');
  setProp('eat');
  say(MSG.eat.doing[0]);
  const nom = setInterval(() => floatText(pick(['nom', 'nom nom', '😋']), leya, 0.35), 650);
  try {
    await refill('eatEnergy', 1400);
    say(MSG.eat.doing[1]);
    await wait(1400);
  } finally {
    clearInterval(nom);
  }
  setProp('');
  setMood('happy');
  say(MSG.eat.done);
  burstHearts(leya);
  await wait(2600);
  await curtain(() => startStage('study'));
}

// 📚 STUDY
async function doStudy() {
  beginAction();
  setMood('studying');
  setProp('study');
  say(MSG.study.doing[0]);
  const sparkle = setInterval(() => floatText(pick(['✏️', '✨', '📝', '💡']), leya, 0.4), 700);
  try {
    await refill('studyEnergy', 1500);
    say(MSG.study.doing[1]);
    await wait(1500);
  } finally {
    clearInterval(sparkle);
  }
  setProp('');
  setMood('happy');
  say(MSG.study.done);
  burstHearts(leya);
  await wait(2400);
  say('Pahinga ka rin ha? 💗');
  await wait(2000);
  await curtain(() => startStage('sleep'), '#3b2a5c');
}

// 😴 SLEEP → DREAM
async function doSleep() {
  beginAction();
  gameState.sleeping = true;
  setMood('sleepy');
  say(MSG.sleep.goodnight[0]);
  await wait(2600);
  setMood('happy');
  say(MSG.sleep.goodnight[1]);
  burstHearts(leya, 14);
  await wait(2600);

  // lights off, she goes to bed
  hideBubble();
  setNight(0.88);
  leya.classList.add('to-bed');
  await wait(1200);
  $('#sleeper').classList.add('show');
  const sleeper = $('#sleeper');
  zzzTimer = setInterval(() => spawnZ(sleeper, 0.3), 750);
  refill('sleepEnergy', 4000).catch(() => {});
  await wait(1600);
  $('#zzzBig').classList.add('show');
  await wait(2800);

  // into the dream
  stopTimers();
  gameState.dreamUnlocked = true;
  await curtain(() => showScreen('dream'), '#ffffff', 500);
  await startDream();
}

const ACTIONS = { eat: doEat, study: doStudy, sleep: doSleep };

$$('.action').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (gameState.busy || gameState.sleeping) return;
    const action = btn.dataset.action;
    if (action !== gameState.currentStage) {
      say(HINTS[gameState.currentStage][action]);
      btn.classList.remove('nope');
      void btn.offsetWidth;
      btn.classList.add('nope');
      return;
    }
    run(ACTIONS[action]);
  });
});

// ---------- Dream ----------
async function showLine(el, text, ms) {
  el.textContent = text;
  el.classList.add('show');
  await wait(ms);
  el.classList.remove('show');
  await wait(900);
}

async function startDream() {
  music.start();
  const t = $('#dreamText');
  await wait(600);
  await showLine(t, 'Nakatulog na si Love... 😴', 2600);
  await showLine(t, '...at nanaginip siya. ✨', 2600);
  $('#envelopeWrap').classList.add('show');
}

let letterSkip = false;
$('#envelopeBtn').addEventListener('click', () => {
  burstHearts($('#envelopeBtn'), 16, 0.5);
  $('#envelopeWrap').classList.remove('show');
  $('#letter').classList.add('show');
  run(revealLetter);
});

async function revealLetter() {
  letterSkip = false;
  const body = $('.letter-body');
  body.scrollTop = 0;
  const parts = $$('.letter-body > *');
  for (const p of parts) {
    if (letterSkip) break;
    p.classList.add('shown');
    // keep the newest paragraph in view
    const bottom = p.offsetTop + p.offsetHeight - body.clientHeight + 30;
    if (bottom > body.scrollTop) body.scrollTop = bottom;
    await wait(p.tagName === 'H2' ? 1400 : 2600);
  }
  parts.forEach((p) => p.classList.add('shown'));
  $('#letterHint').style.opacity = 0;
  $('#toMemories').classList.add('show');
}

$('.letter-body').addEventListener('click', () => { letterSkip = true; });

$('#toMemories').addEventListener('click', () => {
  $('#letter').classList.remove('show');
  openMemories();
});

// ---------- Memory montage ----------
const KB = ['kb-in', 'kb-out', 'kb-left', 'kb-right'];
let mIndex = 0;
let mTimer = null;
let mPaused = false;

function openMemories() {
  mPaused = false;
  $('#mPause').textContent = '⏸';
  $('#montage').classList.remove('paused');
  $('#montage').classList.add('show');
  $('#progress').innerHTML = MEMORIES.map(() => '<i></i>').join('');
  showMemory(0);
}

function currentVideo() { return $('#montageFrame .slide.show video'); }

function showMemory(i) {
  clearTimeout(mTimer);
  if (i >= MEMORIES.length) { endMemories(); return; }
  i = Math.max(0, i);
  mIndex = i;
  const m = MEMORIES[i];
  const frame = $('#montageFrame');
  const old = $$('.slide', frame);

  const slide = document.createElement('div');
  slide.className = 'slide';
  let media;
  if (m.type === 'video') {
    media = document.createElement('video');
    media.muted = true;
    media.playsInline = true;
    media.setAttribute('playsinline', '');
    media.autoplay = true;
    media.addEventListener('ended', () => { if (mIndex === i && !mPaused) showMemory(i + 1); });
    media.addEventListener('error', () => { if (mIndex === i) showMemory(i + 1); });
    media.src = m.src;
    // safety net in case "ended" never fires
    mTimer = setTimeout(() => { if (mIndex === i && !mPaused) showMemory(i + 1); }, 30000);
  } else {
    media = new Image();
    media.alt = m.caption;
    media.className = `kb ${pick(KB)}`;
    media.onerror = () => { if (mIndex === i) showMemory(i + 1); };
    media.src = m.src;
    $('#montageBg').style.backgroundImage = `url("${m.src}")`;
    scheduleNext();
  }
  if (m.pos) media.style.objectPosition = m.pos;
  slide.appendChild(media);
  frame.appendChild(slide);
  setTimeout(() => slide.classList.add('show'), 30);
  old.forEach((o) => { o.classList.remove('show'); setTimeout(() => o.remove(), 1200); });

  $('#clipSound').classList.toggle('show', m.type === 'video');
  $('#clipSound').textContent = '🔇 Tap for sound';

  const cap = $('#caption');
  cap.classList.remove('show');
  setTimeout(() => {
    if (mIndex !== i) return;
    cap.textContent = m.caption;
    cap.classList.add('show');
  }, 600);

  $$('#progress i').forEach((dot, n) => dot.classList.toggle('on', n === i));
  setTimeout(() => burstHearts(frame, 8, 0.9), 400);
}

function scheduleNext() {
  clearTimeout(mTimer);
  if (!mPaused) mTimer = setTimeout(() => showMemory(mIndex + 1), SLIDE_MS);
}

$('#mNext').addEventListener('click', () => showMemory(mIndex + 1));
$('#mPrev').addEventListener('click', () => showMemory(mIndex - 1));
$('#mPause').addEventListener('click', () => {
  mPaused = !mPaused;
  $('#mPause').textContent = mPaused ? '▶' : '⏸';
  $('#montage').classList.toggle('paused', mPaused);
  const v = currentVideo();
  if (mPaused) { clearTimeout(mTimer); if (v) v.pause(); }
  else if (v) v.play().catch(() => {});
  else scheduleNext();
});
$('#clipSound').addEventListener('click', () => {
  const v = currentVideo();
  if (!v) return;
  v.muted = !v.muted;
  $('#clipSound').textContent = v.muted ? '🔇 Tap for sound' : '🔊 Sound on';
  music.duck(!v.muted);
});

function endMemories() {
  clearTimeout(mTimer);
  music.duck(false);
  $('#montage').classList.remove('show');
  $('#clipSound').classList.remove('show');
  $$('#montageFrame .slide').forEach((s) => s.remove());
  run(showFinale);
}

async function showFinale() {
  const fin = $('#finale');
  fin.classList.add('show');
  await wait(600);
  for (const p of $$('p', fin)) {
    p.classList.add('shown');
    await wait(p.classList.contains('big') ? 2200 : FINAL_DREAM_DELAY);
  }
  burstHearts(fin, 18, 0.5);
  $('#toFinal').classList.add('show');
}

$('#toFinal').addEventListener('click', () => {
  run(() => curtain(() => showScreen('final')));
});

// ---------- Music ----------
const music = {
  el: $('#bgm'),
  missing: false,
  volume: 0.7,
  fadeTimer: null,
  ducked: false,

  init() {
    this.el.addEventListener('error', () => this.markMissing());
    this.el.addEventListener('play', () => this.render());
    this.el.addEventListener('pause', () => this.render());
    this.el.src = MUSIC_SRC;
    this.el.volume = 0;
    this.render();
  },

  markMissing() {
    if (this.missing) return;
    this.missing = true;
    this.render();
  },

  // iOS/Safari only allow audio that was first started by a tap, so "unlock" it on Start
  unlock() {
    if (this.missing) return;
    const a = this.el;
    a.muted = true;
    a.play().then(() => { a.pause(); a.currentTime = 0; a.muted = false; })
      .catch(() => { a.muted = false; });
  },

  async start() {
    if (this.missing) { toast('🎵 Wala pang song file, pero okay lang. Tuloy lang tayo! 💗'); return; }
    try {
      this.el.muted = false;
      this.el.volume = 0;
      await this.el.play();
      this.fadeTo(this.ducked ? this.volume * 0.25 : this.volume, 3000);
    } catch (e) {
      if (this.missing) return;
      // autoplay blocked: gently point at the music button
      $('#music').classList.add('nudge');
      toast('Tap the 🎵 button para sa music, love');
    }
  },

  play() {
    if (this.missing) return;
    $('#music').classList.remove('nudge');
    this.el.play().then(() => this.fadeTo(this.volume, 800)).catch(() => {});
  },

  pause() { this.fadeTo(0, 500, () => this.el.pause()); },

  stop() {
    this.fadeTo(0, 700, () => { this.el.pause(); try { this.el.currentTime = 0; } catch (e) { /* ignore */ } });
  },

  duck(on) {
    this.ducked = on;
    if (!this.el.paused) this.fadeTo(on ? this.volume * 0.25 : this.volume, 500);
  },

  fadeTo(target, ms, done) {
    clearInterval(this.fadeTimer);
    const start = this.el.volume;
    const t0 = performance.now();
    this.fadeTimer = setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / ms);
      this.el.volume = Math.min(1, Math.max(0, start + (target - start) * p));
      if (p >= 1) { clearInterval(this.fadeTimer); if (done) done(); }
    }, 40);
  },

  render() {
    const playing = !this.el.paused && !this.missing;
    $('#music').classList.toggle('playing', playing);
    const btn = $('#musicPlay');
    btn.textContent = playing ? '⏸ Pause' : '▶ Play';
    btn.disabled = this.missing;
    $('#musicVol').disabled = this.missing;
    $('#musicStatus').textContent = this.missing
      ? 'Wala pang song file 🥺 (add assets/audio/love-song.mp3)'
      : '🎶 Na Para Bang';
  },
};

music.init();

$('#musicBtn').addEventListener('click', () => {
  $('#music').classList.toggle('open');
  $('#music').classList.remove('nudge');
});
$('#musicPlay').addEventListener('click', () => {
  if (music.el.paused) music.play(); else music.pause();
});
$('#musicVol').addEventListener('input', (e) => {
  music.volume = parseFloat(e.target.value);
  clearInterval(music.fadeTimer);
  music.el.volume = music.ducked ? music.volume * 0.25 : music.volume;
});
// close the music panel when tapping elsewhere
document.addEventListener('click', (e) => {
  if (!e.target.closest('#music')) $('#music').classList.remove('open');
});

// ---------- Start / Play Again ----------
$('#startBtn').addEventListener('click', () => {
  music.unlock();
  run(() => curtain(() => {
    showScreen('game');
    startStage('eat');
  }));
});

function resetAll() {
  runId++; // cancels any running flow
  stopTimers();
  clearTimeout(mTimer);
  Object.assign(gameState, {
    eatEnergy: 100, studyEnergy: 100, sleepEnergy: 100,
    currentStage: 'eat', busy: false, sleeping: false, dreamUnlocked: false,
  });
  setNight(0);
  setMood('idle');
  setProp('');
  showThought('');
  hideBubble();
  setArea('kitchen');
  leya.classList.remove('to-bed');
  $('#sleeper').classList.remove('show');
  $('#zzzBig').classList.remove('show');
  $('#dreamText').classList.remove('show');
  $('#envelopeWrap').classList.remove('show');
  $('#letter').classList.remove('show');
  $$('.letter-body > *').forEach((p) => p.classList.remove('shown'));
  $('#letterHint').style.opacity = '';
  $('#toMemories').classList.remove('show');
  $('#montage').classList.remove('show');
  $('#clipSound').classList.remove('show');
  $$('#montageFrame .slide').forEach((s) => s.remove());
  $('#caption').classList.remove('show');
  $('#finale').classList.remove('show');
  $$('#finale p').forEach((p) => p.classList.remove('shown'));
  $('#toFinal').classList.remove('show');
  $('#fx').innerHTML = '';
  music.duck(false);
  music.stop();
  renderNeeds();
  renderButtons();
}

$('#againBtn').addEventListener('click', () => {
  resetAll(); // hidden screens reset first; resetting bumps runId, so do it before the curtain
  run(() => curtain(() => showScreen('intro')));
});

// ---------- Boot ----------
renderNeeds();
startAmbient('intro');
