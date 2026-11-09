let rafId = null;
let canvas, ctx;
let start = 0;

const TAU = Math.PI * 2;
const DUR = 12000;

const CODE = [
  'struct group_info {',
  '  atomic_t usage;  atomic_t nblocks;',
  '  kgid_t small_block[NGROUPS_SMALL];',
  '  kgid_t *blocks[0];',
  '};',
  'void groups_free(struct group_info *gi) {',
  '  int i;',
  '  if (gi->blocks[0] != &gi->small_block[0])',
  '    for (i = 0; i < gi->nblocks; i++)',
  '      kfree(gi->blocks[i]);',
  '  kfree(gi->blocks);  kfree(gi);',
  '}',
  'int groups_search(struct group_info *gi, kgid_t grp) {',
  '  unsigned int left, right;',
  '  if (!gi) return 0;  left = 0; right = gi->nblocks;',
  '  while (left < right) {',
  '    unsigned int mid = left + (right - left) / 2;',
  '    if (grp > gi->blocks[mid][0]) left = mid + 1;',
  '    else if (grp < gi->blocks[mid][0]) right = mid;',
  '    else return 1;',
  '  }  return 0;',
  '}',
  'void set_groups_info(struct group_info *gi) {',
  '  int i;  atomic_set(&gi->usage, 1);',
  '  for (i = 0; i < gi->nblocks; i++)',
  '    kgid_sort(gi->blocks[i], gi->nblocks);',
  '}',
  'static int copy_groups_from_user(',
  '    struct group_info *gi, void __user *ugidset,',
  '    int ngids) {',
  '  int i;',
  '  for (i = 0; i < ngids; i++)',
  '    if (copy_from_user(&gi->blocks[i][0],',
  '        ugidset, sizeof(kgid_t))) return -EFAULT;',
  '  return 0;',
  '}',
  'asmlinkage long sys_getgroups(int gidsetsize,',
  '    kgid_t __user *grouplist) {',
  '  struct group_info *gi = get_current_groups();',
  '  atomic_init(&gi->usage, 1);',
  '  if (gi->blocks[0] == NULL) return -EINVAL;',
  '  return gi->nblocks;',
  '}',
];

function light() { return document.documentElement.dataset.theme === 'light'; }
function W() { return canvas.width / (devicePixelRatio || 1); }
function H() { return canvas.height / (devicePixelRatio || 1); }
function mob() { return W() < 600; }
function tab() { return W() >= 600 && W() < 900; }

// smooth envelope: 0 → 1 → 0 across [lo, hi] with blend width b
function env(t, lo, hi, b) {
  if (lo > hi) return env(t, lo, 1, b) + env(t, 0, hi, b);
  const e = (x) => { const u = Math.max(0, Math.min(1, x)); return u * u * (3 - 2 * u); };
  const into = e((t - (lo - b)) / (2 * b || 1));
  const out = e(((hi + b) - t) / (2 * b || 1));
  return Math.min(1, Math.max(0, t < lo ? into : t > hi ? out : Math.min(1, into * out)));
}
function e2(x) { const u = Math.max(0, Math.min(1, x)); return u * u * (3 - 2 * u); }

// --- DRAW HELPERS ---

let codeScroll = 0;

function drawCode(t) {
  const alpha = env(t, 0, 0.12, 0.04) * 0.7 + env(t, 0.7, 0.9, 0.04) * 0.85 + 0.08;
  const blurAmt = env(t, 0, 0.12, 0.04) * 8 + env(t, 0.7, 0.9, 0.04) * 2 + 2;
  codeScroll += mob() ? 0.15 : tab() ? 0.2 : 0.25;
  if (alpha < 0.01) return;
  const L = light();
  ctx.save();
  ctx.font = mob() ? '10px "JetBrains Mono", Consolas, monospace' : tab() ? '11px "JetBrains Mono", Consolas, monospace' : '12px "JetBrains Mono", Consolas, monospace';
  ctx.textBaseline = 'top';
  const lh = mob() ? 13 : tab() ? 14 : 16;
  const off = codeScroll % (CODE.length * lh);
  ctx.globalAlpha = alpha;
  const cols = mob() ? 1 : tab() ? Math.max(1, Math.floor(W() / 300)) : Math.max(1, Math.floor(W() / 340));
  for (let c = 0; c < cols; c++) {
    const bx = 10 + c * 340;
    for (let i = 0; i <= Math.ceil(H() / lh) + 2; i++) {
      const idx = Math.floor((i * lh + off) / lh) % CODE.length;
      const ly = i * lh - (off % lh);
      if (ly + 14 < 0 || ly > H()) continue;
      const line = CODE[idx];
      if (!line) continue;
      if (blurAmt > 1) ctx.shadowBlur = blurAmt * 1.5;
      ctx.shadowColor = L ? 'rgba(45,27,105,0.15)' : 'rgba(255,255,255,0.3)';
      ctx.fillStyle = L ? `rgba(45,27,105,${alpha * 0.6})` : `rgba(200,200,210,${alpha * 0.6})`;
      ctx.fillText(line, bx, ly);
      ctx.shadowBlur = 0;
    }
  }
  ctx.restore();
}

function drawGrid() {
  const L = light();
  ctx.save();
  ctx.globalAlpha = L ? 0.06 : 0.04;
  ctx.strokeStyle = L ? '#2d1b69' : '#fff';
  ctx.lineWidth = 0.5;
  const s = 50;
  for (let x = s; x < W(); x += s) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H()); ctx.stroke(); }
  for (let y = s; y < H(); y += s) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W(), y); ctx.stroke(); }
  ctx.restore();
}

function drawWaveform(t) {
  const alpha = env(t, 0, 0.15, 0.04) * 0.4 + 0.08;
  const L = light();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = L ? '#2d1b69' : '#fff';
  ctx.lineWidth = 1;
  for (let b = 0; b < 3; b++) {
    ctx.beginPath();
    const freq = 0.008 + b * 0.002;
    const amp = 5 + b * 3;
    const phase = t * TAU + b * 1.5;
    for (let x = 0; x < W(); x += 2) {
      const y = H() * 0.45 + Math.sin(x * freq + phase) * amp * Math.sin(x * 0.002 + t * 3);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function drawDial(cx, cy, r, val, alpha) {
  if (alpha < 0.01) return;
  const L = light();
  ctx.save();
  ctx.globalAlpha = alpha;
  const pct = val / 100;
  const sweep = Math.PI * 1.5 + Math.sin(Date.now() * 0.001) * Math.PI * 0.1;
  const start = -Math.PI * 0.75;
  ctx.strokeStyle = L ? 'rgba(45,27,105,0.1)' : 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
  ctx.strokeStyle = L ? '#2d1b69' : '#fff';
  ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(cx, cy, r, start, start + sweep * pct); ctx.stroke();
  ctx.fillStyle = L ? '#2d1b69' : '#fff';
  ctx.font = `bold ${r * 0.6}px "JetBrains Mono", Consolas, monospace`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(String(val), cx, cy + r * 0.05);
  ctx.restore();
}

function drawECG(t) {
  const alpha = env(t, 0.1, 0.65, 0.04) * 0.5;
  if (alpha < 0.01) return;
  const L = light();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = L ? '#2d1b69' : '#fff';
  ctx.lineWidth = 1.2;
  const x0 = W() * 0.06, y0 = H() * 0.52, w = W() * 0.28;
  ctx.beginPath();
  for (let i = 0; i < w; i++) {
    const p = (i + Date.now() * 0.06) % 100;
    let dy = 0;
    if (p > 35 && p < 38) dy = -4;
    else if (p > 38 && p < 43) dy = 20;
    else if (p > 43 && p < 46) dy = -8;
    else if (p > 46 && p < 50) dy = 2;
    const px = x0 + i, py = y0 + dy;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

function drawBarChart(t) {
  const alpha = env(t, 0.1, 0.45, 0.04) * 0.5;
  if (alpha < 0.01) return;
  const L = light();
  ctx.save();
  ctx.globalAlpha = alpha;
  const x0 = W() * 0.06, y0 = H() * 0.35, w2 = 60, h2 = H() * 0.12;
  const bars = 7, bh = h2 / bars;
  for (let i = 0; i < bars; i++) {
    const v = (Math.sin(Date.now() * 0.0015 + i * 0.9) + 1) / 2;
    const bw = w2 * (0.25 + v * 0.75);
    ctx.fillStyle = i % 2 === 0
      ? (L ? 'rgba(45,27,105,0.35)' : 'rgba(255,255,255,0.5)')
      : (L ? 'rgba(45,27,105,0.12)' : 'rgba(255,255,255,0.2)');
    ctx.fillRect(x0, y0 + i * bh, bw, bh - 1);
  }
  ctx.restore();
}

function drawPadlock(t) {
  const alpha = env(t, 0.22, 0.55, 0.04) * 0.85 + env(t, 0.85, 1.05, 0.035) * 0.35;
  if (alpha < 0.01) return;
  const L = light();
  const cx = W() * (mob() ? 0.7 : tab() ? 0.82 : 0.85);
  const cy = H() * 0.52;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.globalAlpha = alpha;
  const sc = mob() ? 0.6 : tab() ? 0.8 : 1.0;
  ctx.scale(sc, sc);
  const bob = Math.sin(Date.now() * 0.0008) * 2;
  ctx.translate(0, bob);
  const bw = 76, bh = 62;

  const bg = ctx.createLinearGradient(-bw / 2, 0, bw / 2, 0);
  if (L) { bg.addColorStop(0,'#bbb'); bg.addColorStop(0.3,'#e0e0e0'); bg.addColorStop(0.5,'#eee'); bg.addColorStop(0.7,'#e0e0e0'); bg.addColorStop(1,'#bbb'); }
  else { bg.addColorStop(0,'#333'); bg.addColorStop(0.3,'#777'); bg.addColorStop(0.5,'#aaa'); bg.addColorStop(0.7,'#777'); bg.addColorStop(1,'#333'); }
  ctx.fillStyle = bg;
  ctx.beginPath(); ctx.roundRect(-bw/2, 0, bw, bh, 5); ctx.fill();
  ctx.strokeStyle = L ? '#888' : '#555'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(-bw/2, 0, bw, bh, 5); ctx.stroke();

  const sr = 14;
  const sg = ctx.createLinearGradient(-sr, -10, sr, -10);
  if (L) { sg.addColorStop(0,'#888'); sg.addColorStop(0.3,'#ccc'); sg.addColorStop(0.5,'#e0e0e0'); sg.addColorStop(0.7,'#ccc'); sg.addColorStop(1,'#888'); }
  else { sg.addColorStop(0,'#555'); sg.addColorStop(0.3,'#bbb'); sg.addColorStop(0.5,'#eee'); sg.addColorStop(0.7,'#bbb'); sg.addColorStop(1,'#555'); }
  ctx.strokeStyle = sg; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(0, 3, sr, Math.PI+0.3, -0.3); ctx.stroke();

  ctx.fillStyle = L ? '#777' : '#1a1a1a';
  ctx.beginPath(); ctx.arc(0, bh*0.44, 7, 0, TAU); ctx.fill();
  ctx.strokeStyle = L ? '#999' : '#444'; ctx.lineWidth = 1.5; ctx.stroke();

  if (alpha > 0.2 && !mob() && !tab()) {
    ctx.strokeStyle = L ? 'rgba(45,27,105,0.2)' : 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 3, sr-2, Math.PI+0.5, -0.5); ctx.stroke();
  }
  ctx.restore();
}

function drawVertScale(t) {
  const alpha = env(t, 0.38, 0.7, 0.04) * 0.45;
  if (alpha < 0.01) return;
  const L = light();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = L ? '#2d1b69' : '#fff'; ctx.lineWidth = 0.8;
  const x0 = W() * (mob() ? 0.42 : tab() ? 0.38 : 0.35);
  const h = H() * 0.75, y0 = H() * 0.12;
  const n = Math.floor(h / 10);
  for (let i = 0; i <= n; i++) {
    const ty = y0 + i * 10; const big = i % 5 === 0;
    ctx.beginPath(); ctx.moveTo(x0, ty); ctx.lineTo(x0 + (big ? 12 : 5), ty); ctx.stroke();
  }
  const mark = y0 + (Date.now() * 0.015 % h);
  ctx.fillStyle = L ? '#2d1b69' : '#fff';
  ctx.beginPath(); ctx.moveTo(x0-3, mark); ctx.lineTo(x0+1, mark-2); ctx.lineTo(x0+1, mark+2); ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawWire(t) {
  const alpha = env(t, 0.38, 0.65, 0.04) * 0.25;
  if (alpha < 0.01) return;
  const L = light();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = L ? '#2d1b69' : '#fff'; ctx.lineWidth = 0.6;
  const sides = 6; const rot = Date.now() * 0.0007;
  const cx = W()*0.5, cy = mob() ? H()*0.88 : tab() ? H()*0.87 : H()*0.86, r = mob() ? 14 : tab() ? 17 : 20;
  ctx.beginPath();
  for (let i = 0; i <= sides; i++) {
    const a = (TAU/sides)*i + rot; const px = cx+Math.cos(a)*r, py = cy+Math.sin(a)*r;
    i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
  }
  ctx.stroke();
  ctx.beginPath();
  for (let i = 0; i <= sides; i++) {
    const a = (TAU/sides)*i + rot + Math.PI/sides; const px = cx+Math.cos(a)*r*0.55, py = cy+Math.sin(a)*r*0.55;
    i===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
  }
  ctx.stroke();
  ctx.restore();
}

function drawCrosses(t) {
  const alpha = env(t, 0.25, 1.05, 0.04) * 0.2;
  if (alpha < 0.01) return;
  const L = light();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = L ? '#2d1b69' : '#fff'; ctx.lineWidth = 0.5;
  const pts = [[W()*0.5, H()*0.5, 24], [W()*0.28, H()*0.28, 16], [W()*0.76, H()*0.2, 14], [W()*0.3, H()*0.8, 18], [W()*0.7, H()*0.6, 15]];
  for (const [cx, cy, sz] of pts) {
    ctx.beginPath(); ctx.moveTo(cx-sz, cy); ctx.lineTo(cx+sz, cy);
    ctx.moveTo(cx, cy-sz); ctx.lineTo(cx, cy+sz); ctx.stroke();
  }
  ctx.restore();
}

function drawSerial(t) {
  const alpha = env(t, 0.85, 1.05, 0.03) * 0.5;
  if (alpha < 0.01) return;
  const L = light();
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = '10px "JetBrains Mono", Consolas, monospace';
  ctx.fillStyle = L ? 'rgba(45,27,105,0.4)' : 'rgba(255,255,255,0.5)';
  ctx.textAlign = 'left'; ctx.textBaseline = 'top';
  ctx.fillText('UT2380-0X5A', W()*0.06, H()*0.92);
  ctx.restore();
}

function draw(timestamp) {
  if (!canvas || !ctx) return;
  if (!start) start = timestamp;
  const t = ((timestamp - start) % DUR) / DUR;
  const W_ = W(), H_ = H();

  ctx.clearRect(0, 0, W_, H_);
  ctx.fillStyle = light() ? '#f5f0ff' : '#000';
  ctx.fillRect(0, 0, W_, H_);

  drawGrid();
  drawCode(t);
  drawWaveform(t);

  if (mob()) {
    drawDial(W_*0.5, H_*0.08, 14, 58, env(t,0.1,0.35,0.04)*0.8 + env(t,0.85,1.05,0.035)*0.8);
    drawDial(W_*0.78, H_*0.15, 12, 98, env(t,0.12,0.35,0.04)*0.8);
    drawDial(W_*0.15, H_*0.12, 10, 8, env(t,0.52,0.72,0.04)*0.8);
    drawECG(t);
    drawBarChart(t);
    drawVertScale(t);
    drawWire(t);
    drawPadlock(t);
  } else if (tab()) {
    drawDial(W_*0.85, H_*0.18, 18, 58, env(t,0.1,0.35,0.04)*0.85 + env(t,0.85,1.05,0.035)*0.85);
    drawDial(W_*0.92, H_*0.35, 15, 98, env(t,0.12,0.35,0.04)*0.85);
    drawDial(W_*0.12, H_-50, 12, 8, env(t,0.52,0.72,0.04)*0.85);
    drawECG(t);
    drawBarChart(t);
    drawVertScale(t);
    drawWire(t);
    drawPadlock(t);
  } else {
    drawDial(W_*0.88, H_*0.15, 22, 58, env(t,0.1,0.35,0.04)*0.85 + env(t,0.85,1.05,0.035)*0.85);
    drawDial(W_*0.94, H_*0.32, 18, 98, env(t,0.12,0.35,0.04)*0.85);
    drawDial(W_*0.12, H_-55, 12, 8, env(t,0.52,0.72,0.04)*0.85);
    drawECG(t);
    drawBarChart(t);
    drawVertScale(t);
    drawWire(t);
    drawPadlock(t);
  }

  drawCrosses(t);
  drawSerial(t);

  rafId = requestAnimationFrame(draw);
}

function resize() {
  if (!canvas) return;
  const dpr = devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
}

export function initBackground() {
  canvas = document.querySelector('.section__bg-canvas');
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
  start = 0;
  rafId = requestAnimationFrame(draw);
}

export function destroyBackground() {
  if (rafId) cancelAnimationFrame(rafId);
  window.removeEventListener('resize', resize);
}
