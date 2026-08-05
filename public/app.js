'use strict';

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const state = { lines: [], activeLine: null, q: '', freeOnly: false };

async function api(pathname, options) {
  const res = await fetch(pathname, options);
  if (!res.ok) throw new Error(`${res.status} ${pathname}`);
  return res.json();
}

/* ── 초기 로드 ─────────────────────────────── */
async function boot() {
  try {
    const [meta, lines, guide] = await Promise.all([
      api('/api/meta'), api('/api/lines'), api('/api/guide')
    ]);
    state.lines = lines;
    renderMeta(meta);
    renderLinebar(lines);
    renderFilters(lines);
    renderPrinciples(guide.principles);


    await loadTools();
  } catch (err) {
    console.error(err);
    $('#metastrip').innerHTML = '<span>데이터를 불러오지 못했습니다. 새로고침해 보세요.</span>';
  }
}

function renderMeta(meta) {
  $('#baseDate').textContent = meta.baseDate;
  $('#footDate').textContent = meta.baseDate;
  $('#metastrip').innerHTML = [
    `${meta.lineCount}개 노선 · ${meta.toolCount}개 도구`,
    `무료로 시작 가능 ${meta.freeCount}개`,
    meta.notice
  ].map((t) => `<span>${esc(t)}</span>`).join('');
}

function renderLinebar(lines) {
  $('#linebar').innerHTML = lines
    .map((l) => `<span style="background:${esc(l.color)}" title="${esc(l.name)}"></span>`).join('');
}

function renderFilters(lines) {
  const all = `<button class="fchip" data-line="" aria-pressed="true" style="background:#0E1620;color:#fff">전체</button>`;
  $('#filters').innerHTML = all + lines.map((l) => `
    <button class="fchip" data-line="${esc(l.id)}" data-color="${esc(l.color)}" aria-pressed="false">
      <span class="dot" style="background:${esc(l.color)}"></span>${esc(l.no)} ${esc(l.name)} (${l.toolCount})
    </button>`).join('');

  $('#filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.fchip');
    if (!btn) return;
    state.activeLine = btn.dataset.line || null;
    [...$('#filters').children].forEach((b) => {
      const on = b === btn;
      b.setAttribute('aria-pressed', String(on));
      const color = b.dataset.color || '#0E1620';
      b.style.background = on ? color : 'var(--card)';
      b.style.color = on ? '#fff' : 'var(--ink-soft)';
    });
    loadTools();
  });
}

function renderPrinciples(list) {
  $('#principles-grid').innerHTML = list.map((p) => `
    <div>
      <span class="num">${esc(p.no)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.body)}</p>
    </div>`).join('');
}



/* ── 도구 목록 ─────────────────────────────── */
async function loadTools() {
  const params = new URLSearchParams();
  if (state.activeLine) params.set('line', state.activeLine);
  if (state.q) params.set('q', state.q);
  if (state.freeOnly) params.set('free', 'true');

  try {
    const data = await api(`/api/tools?${params.toString()}`);
    $('#resultline').textContent = `${data.count}개 도구`;
    $('#tools').innerHTML = data.items.length
      ? data.items.map(toolCard).join('')
      : `<p class="empty">조건에 맞는 도구가 없습니다. 검색어를 줄이거나 노선을 전체로 바꿔 보세요.</p>`;
  } catch (err) {
    console.error(err);
    $('#tools').innerHTML = `<p class="empty">목록을 불러오지 못했습니다.</p>`;
  }
}

function toolCard(t) {
  const tags = [
    t.free ? '<span class="tag free">무료 시작 가능</span>' : '',
    ...t.tags.map((x) => `<span class="tag">${esc(x)}</span>`)
  ].join('');
  return `
    <article class="stop" style="border-left-color:${esc(t.lineColor)}">
      <h3>${esc(t.name)}</h3>
      <span class="role">${esc(t.vendor)} · ${esc(t.lineName)}</span>
      <p class="tagline">${esc(t.tagline)}</p>
      <p>${esc(t.why)}</p>
      <p class="verdict"><b>이럴 때</b>${esc(t.bestFor.join(' / '))}</p>
      <p class="verdict"><b>주의</b>${esc(t.caveat)}</p>
      <div class="tags">${tags}</div>
    </article>`;
}

let searchTimer;
$('#search').addEventListener('input', (e) => {
  clearTimeout(searchTimer);
  const v = e.target.value;
  searchTimer = setTimeout(() => { state.q = v.trim(); loadTools(); }, 220);
});
$('#freeOnly').addEventListener('change', (e) => {
  state.freeOnly = e.target.checked;
  loadTools();
});


boot();
