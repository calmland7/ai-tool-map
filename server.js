'use strict';

const path = require('path');
const express = require('express');
const catalog = require('./data/catalog');

const app = express();
const PORT = process.env.PORT || 3000;

app.disable('x-powered-by');
app.use(express.json({ limit: '32kb' }));

// 아주 가벼운 요청 로그
app.use((req, _res, next) => {
  if (req.path.startsWith('/api')) console.log(`${req.method} ${req.originalUrl}`);
  next();
});

const byId = new Map(catalog.tools.map((t) => [t.id, t]));
const lineById = new Map(catalog.lines.map((l) => [l.id, l]));

function decorate(tool) {
  const line = lineById.get(tool.line);
  return { ...tool, lineName: line ? line.name : null, lineColor: line ? line.color : null };
}

// ── API ───────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, uptimeSec: Math.round(process.uptime()) });
});

app.get('/api/meta', (_req, res) => {
  res.json({
    baseDate: catalog.BASE_DATE,
    lineCount: catalog.lines.length,
    toolCount: catalog.tools.length,
    freeCount: catalog.tools.filter((t) => t.free).length,
    notice: '모델명·버전·요금은 분기 단위로 바뀝니다. 사용 전 공식 페이지에서 확인하세요.'
  });
});

app.get('/api/lines', (_req, res) => {
  res.json(
    catalog.lines.map((l) => ({
      ...l,
      toolCount: catalog.tools.filter((t) => t.line === l.id).length
    }))
  );
});

app.get('/api/tools', (req, res) => {
  const { line, q, free, tag } = req.query;
  let result = catalog.tools;

  if (line) result = result.filter((t) => t.line === line);
  if (tag) result = result.filter((t) => t.tags.includes(tag));
  if (free === 'true') result = result.filter((t) => t.free);

  if (q) {
    const needle = String(q).trim().toLowerCase();
    result = result.filter((t) =>
      [t.name, t.vendor, t.tagline, t.why, t.caveat, t.tags.join(' '), t.bestFor.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    );
  }

  res.json({ count: result.length, items: result.map(decorate) });
});

app.get('/api/tools/:id', (req, res) => {
  const tool = byId.get(req.params.id);
  if (!tool) return res.status(404).json({ error: 'not_found', message: '해당 도구를 찾을 수 없습니다.' });
  res.json(decorate(tool));
});

app.get('/api/stacks', (_req, res) => {
  res.json(
    catalog.stacks.map((s) => ({
      ...s,
      picks: s.picks
        .map((p) => {
          const tool = byId.get(p.tool);
          return tool ? { id: tool.id, name: tool.name, vendor: tool.vendor, note: p.note } : null;
        })
        .filter(Boolean)
    }))
  );
});

app.get('/api/guide', (_req, res) => {
  res.json({ principles: catalog.principles, risks: catalog.risks, workshop: catalog.workshop });
});

/**
 * 간단 추천기.
 * body: { role?: string, needs?: string[], freeOnly?: boolean }
 * needs 는 노선 id 배열입니다. (chat/research/code/image/video/audio/docs/agent/korea)
 */
app.post('/api/recommend', (req, res) => {
  const { role, needs, freeOnly } = req.body || {};

  if (needs && !Array.isArray(needs)) {
    return res.status(400).json({ error: 'bad_request', message: 'needs 는 배열이어야 합니다.' });
  }

  const stack = role ? catalog.stacks.find((s) => s.id === role) : null;
  const wanted = (needs && needs.length ? needs : stack ? [...new Set(stack.picks.map((p) => byId.get(p.tool).line))] : ['chat', 'research', 'docs']);

  const picks = wanted
    .map((lineId) => {
      const line = lineById.get(lineId);
      if (!line) return null;
      let pool = catalog.tools.filter((t) => t.line === lineId);
      if (freeOnly) {
        const freePool = pool.filter((t) => t.free);
        if (freePool.length) pool = freePool;
      }
      // 스택에 이미 지정된 도구가 있으면 우선
      const preferred = stack && stack.picks.map((p) => p.tool).find((id) => pool.some((t) => t.id === id));
      const chosen = preferred ? byId.get(preferred) : pool[0];
      return chosen ? { line: line.name, lineColor: line.color, ...decorate(chosen) } : null;
    })
    .filter(Boolean);

  res.json({
    role: stack ? stack.role : '직접 선택',
    freeOnly: Boolean(freeOnly),
    count: picks.length,
    picks,
    reminder: '추천은 출발점일 뿐입니다. 두 주 써 보고 남는 것만 결제하세요.'
  });
});

// ── 정적 파일 ─────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));

app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'not_found', message: '없는 엔드포인트입니다.' });
  }
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'server_error', message: '서버에서 문제가 발생했습니다.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI 노선도 서버 실행 중 · http://0.0.0.0:${PORT}`);
});
