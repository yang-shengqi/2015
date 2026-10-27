/* js/pages/blind-spot-diagnosis-main.js —— 智库级高阶版页面逻辑（最终版） */
(function () {
  'use strict';

  function T(key) {
    return (window.CO_I18N && window.CO_I18N.t) ? window.CO_I18N.t(key) : key;
  }

  // ================= 维度 / 层次 =================
  const DIM_MAP = {
    source:    { icon: '🛡️', get label() { return T('dimSource'); } },
    facts:     { icon: '📊', get label() { return T('dimFacts'); } },
    logic:     { icon: '🧠', get label() { return T('dimLogic'); } },
    interests: { icon: '🎭', get label() { return T('dimInterests'); } },
    emotion:   { icon: '🌋', get label() { return T('dimEmotion'); } },
    cost:      { icon: '⚖️', get label() { return T('dimCost'); } }
  };
  const LAYER_MAP = {
    step1: { get label() { return T('layer1Label'); }, get sub() { return T('layer1Sub'); }, badge: 's1' },
    step2: { get label() { return T('layer2Label'); }, get sub() { return T('layer2Sub'); }, badge: 's2' },
    step3: { get label() { return T('layer3Label'); }, get sub() { return T('layer3Sub'); }, badge: 's3' }
  };
  const DIM_ORDER = ['source', 'facts', 'logic', 'interests', 'emotion', 'cost'];

  // ================= 题目结构 =================
  const QUESTIONS_STRUCTURE = [
    { dim: 'source', layer: 'step1', scores: [0, 1, 2, 4, 3] },
    { dim: 'source', layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'source', layer: 'step2', scores: [0, 1, 2, 3, 4] },
    { dim: 'source', layer: 'step2', scores: [0, 1, 2, 3, 4] },
    { dim: 'source', layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'source', layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'facts',  layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'facts',  layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'facts',  layer: 'step2', scores: [0, 1, 2, 3, 4] },
    { dim: 'facts',  layer: 'step2', scores: [0, 1, 2, 3, 4] },
    { dim: 'facts',  layer: 'step3', scores: [0, 1, 2, 4, 3] },
    { dim: 'facts',  layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'logic',  layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'logic',  layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'logic',  layer: 'step2', scores: [0, 1, 4, 2, 3] },
    { dim: 'logic',  layer: 'step2', scores: [0, 1, 2, 3, 4] },
    { dim: 'logic',  layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'logic',  layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'interests', layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'interests', layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'interests', layer: 'step2', scores: [0, 1, 2, 3, 4] },
    { dim: 'interests', layer: 'step2', scores: [1, 2, 4, 2, 0] },
    { dim: 'interests', layer: 'step2', scores: [4, 3, 2, 1, 0] },
    { dim: 'interests', layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'interests', layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'emotion', layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'emotion', layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'emotion', layer: 'step2', scores: [1, 2, 4, 2, 0] },
    { dim: 'emotion', layer: 'step2', scores: [4, 3, 2, 1, 0] },
    { dim: 'emotion', layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'emotion', layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'cost',   layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'cost',   layer: 'step1', scores: [0, 1, 2, 3, 4] },
    { dim: 'cost',   layer: 'step2', scores: [3, 4, 2, 1, 0] },
    { dim: 'cost',   layer: 'step2', scores: [4, 3, 2, 1, 0] },
    { dim: 'cost',   layer: 'step2', scores: [4, 3, 2, 1, 0] },
    { dim: 'cost',   layer: 'step3', scores: [0, 1, 2, 3, 4] },
    { dim: 'cost',   layer: 'step3', scores: [0, 1, 2, 3, 4] }
  ];

  const TOTAL = QUESTIONS_STRUCTURE.length;
  let state = { questions: [], answers: {}, shuffledIndices: [], currentStep: 0, isActive: false, timerStarted: false };
  let timerSeconds = 0, timerInterval = null;
  let historyRecords = [];

  const exportImages = { radar: null };

  function toast(msg, type) {
    if (window.App && App.utils && App.utils.toast) App.utils.toast(msg, type || 'ok');
    else console.log('[toast]', msg);
  }
  function shuffleArray(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

  function saveState() {
    try { localStorage.setItem('cqd_pure_state', JSON.stringify({ questions: state.questions, answers: state.answers, shuffledIndices: state.shuffledIndices, currentStep: state.currentStep, isActive: state.isActive, timerSeconds, timerStarted: state.timerStarted })); } catch (e) {}
  }
  function loadState() {
    try { localStorage.removeItem('cqd_pure_state'); initQuestions(); } catch (e) { initQuestions(); }
  }
  function loadHistory() { try { const r = localStorage.getItem('cqd_pure_history'); if (r) historyRecords = JSON.parse(r); } catch (e) { historyRecords = []; } }
  function saveHistory() { try { localStorage.setItem('cqd_pure_history', JSON.stringify(historyRecords)); } catch (e) {} }

  function buildQuestions() {
    const qs = window.CO_I18N ? window.CO_I18N.getQuestions() : [];
    return QUESTIONS_STRUCTURE.map((s, i) => {
      const q = qs[i] || { p: '', t: '', o: ['', '', '', '', ''] };
      return {
        dim: s.dim, layer: s.layer,
        purpose: q.p, text: q.t,
        options: s.scores.map((score, j) => ({ text: q.o[j] || '', score: score }))
      };
    });
  }

  function initQuestions() {
    state.questions = buildQuestions();
    state.shuffledIndices = Array.from({ length: TOTAL }, (_, i) => i);
    shuffleArray(state.shuffledIndices);
    state.answers = {}; state.currentStep = 0; state.isActive = false; state.timerStarted = false; timerSeconds = 0;
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    updateTimerDisplay(); saveState();
  }

  function startTimer() { if (timerInterval) return; state.timerStarted = true; timerInterval = setInterval(() => { timerSeconds++; updateTimerDisplay(); }, 1000); saveState(); }
  function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } state.timerStarted = false; saveState(); }
  function updateTimerDisplay() { const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0'), s = String(timerSeconds % 60).padStart(2, '0'); const el = document.getElementById('timerDisplay'); if (el) el.textContent = T('timerPrefix') + m + ':' + s; }
  function resetTimer() { stopTimer(); timerSeconds = 0; state.timerStarted = false; updateTimerDisplay(); saveState(); }

  function showDiagnosis() {
    document.getElementById('startArea').classList.add('is-hidden');
    document.getElementById('diagnosisArea').classList.remove('is-hidden');
    document.getElementById('totalCount').textContent = TOTAL;
    renderStep();
  }
  function updateDimScanProgress(currentDim) {
    const idx = DIM_ORDER.indexOf(currentDim);
    let next = T('nextDimDone');
    if (idx !== -1 && idx + 1 < DIM_ORDER.length) next = DIM_MAP[DIM_ORDER[idx + 1]].label;
    const el = document.getElementById('nextDimLabel'); if (el) el.textContent = next;
  }

  function renderStep() {
    const total = TOTAL, done = Object.keys(state.answers).length;
    document.getElementById('progressFill').style.width = (done / total) * 100 + '%';
    document.getElementById('answeredCount').textContent = done;
    document.getElementById('totalCount').textContent = total;

    if (done === total) {
      stopTimer();
      const lastDim = state.questions[state.shuffledIndices[state.shuffledIndices.length - 1]]?.dim || 'source';
      updateDimScanProgress(lastDim);
      document.getElementById('stepContainer').innerHTML = '<div class="step-card nm-card-sm complete-msg"><div class="icon">🎯</div><div class="title">' + T('completeTitle') + '</div><div class="sub">' + T('completeSubPre') + total + T('completeSubMid') + '</div><div class="btn-group"><button class="btn btn-primary" id="generateReportBtn">' + T('genReportBtn') + '</button><button class="btn btn-danger" id="resetFromCompleteBtn">' + T('resetFromCom') + '</button></div></div>';
      document.getElementById('generateReportBtn').addEventListener('click', function () { generateReport(true); }, { once: true });
      document.getElementById('resetFromCompleteBtn').addEventListener('click', function () { fullReset(); }, { once: true });
      return;
    }

    let step = 0;
    for (let i = 0; i < total; i++) { const ridx = state.shuffledIndices[i]; if (!state.answers['q_' + ridx]) { step = i; break; } }
    if (step >= total) return renderStep();

    const realIdx = state.shuffledIndices[step], q = state.questions[realIdx];
    if (!q) return renderStep();

    updateDimScanProgress(q.dim);

    const dimIndices = state.shuffledIndices.filter(idx => state.questions[idx].dim === q.dim);
    const dimTotal = dimIndices.length;
    let dimAnswered = 0; dimIndices.forEach(idx => { if (state.answers['q_' + idx]) dimAnswered++; });

    const dim = DIM_MAP[q.dim] || { icon: '📌', label: '维度' };
    const layer = LAYER_MAP[q.layer] || { label: '思考', sub: '追问', badge: 's1' };
    const stepNum = step + 1, ans = state.answers['q_' + realIdx];

    const rawOpts = q.options.map((opt, idx) => ({ ...opt, origIdx: idx }));
    const shuffledOpts = shuffleArray([...rawOpts]);
    shuffledOpts.forEach((opt, idx) => { opt.label = String.fromCharCode(65 + idx); });

    let optsHtml = '';
    shuffledOpts.forEach((opt, idx) => {
      const isSelected = ans && ans.origIdx === opt.origIdx;
      optsHtml += '<label class="' + (isSelected ? 'selected' : '') + '"><input type="radio" name="q_' + step + '" value="' + idx + '" data-origidx="' + opt.origIdx + '"' + (isSelected ? ' checked' : '') + '><span class="option-label">' + opt.label + '</span><span>' + opt.text + '</span></label>';
    });

    let hasPrev = false;
    for (let i = step - 1; i >= 0; i--) { const ridx = state.shuffledIndices[i]; if (state.answers['q_' + ridx]) { hasPrev = true; break; } }

    const purposeHtml = q.purpose ? '<div class="purpose-tag">' + T('purposePrefix') + q.purpose + '</div>' : '';

    document.getElementById('stepContainer').innerHTML = '<div class="step-card nm-card-sm"><div class="step-header"><div class="step-title"><span class="dim">' + dim.icon + ' ' + dim.label + ' <span class="dim-progress">（' + dimAnswered + '/' + dimTotal + '）</span></span></div><div class="step-badge ' + layer.badge + '">' + layer.label + ' · ' + layer.sub + ' <span>' + stepNum + ' / ' + total + '</span></div></div><div class="question-block">' + purposeHtml + '<div class="q-text"><span class="q-num">' + T('qNumPrefix') + stepNum + '.</span> ' + q.text + '</div><div class="q-options">' + optsHtml + '</div></div><div class="step-footer"><div class="step-status ' + (ans ? 'done' : 'active') + '">' + (ans ? T('statusDone') : T('statusChoose')) + '</div><button class="btn-back" id="backBtn"' + (hasPrev ? '' : ' disabled') + '>' + T('backPrev') + '</button></div></div>';

    document.getElementById('backBtn').addEventListener('click', function () {
      for (let i = step - 1; i >= 0; i--) {
        const ridx = state.shuffledIndices[i];
        if (state.answers['q_' + ridx]) { delete state.answers['q_' + ridx]; saveState(); renderStep(); return; }
      }
    });

    document.querySelectorAll('#stepContainer input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', function () {
        if (!this.checked) return;
        const origIdx = parseInt(this.dataset.origidx, 10);
        const selectedOpt = shuffledOpts.find(o => o.origIdx === origIdx);
        if (!selectedOpt) return;
        state.answers['q_' + realIdx] = { origIdx: origIdx, score: selectedOpt.score };
        saveState();
        const labels = this.closest('.q-options').querySelectorAll('label');
        labels.forEach(l => l.classList.remove('selected'));
        this.closest('label').classList.add('selected');
        const status = document.querySelector('.step-status');
        if (status) { status.className = 'step-status done'; status.textContent = T('statusAutoNext'); }
        const doneNow = Object.keys(state.answers).length;
        document.getElementById('progressFill').style.width = (doneNow / total) * 100 + '%';
        document.getElementById('answeredCount').textContent = doneNow;
        setTimeout(renderStep, 350);
      });
    });
  }

  function generateReport(saveToHistory, customAnswers) {
    exportImages.radar = null;
    const answers = customAnswers || state.answers;
    window.__lastReportAnswers = answers;

    let totalEarned = 0; const totalMax = TOTAL * 4;
    const dimScores = {}, layerScores = { step1: { earned: 0, total: 0 }, step2: { earned: 0, total: 0 }, step3: { earned: 0, total: 0 } };

    state.shuffledIndices.forEach(realIdx => {
      const q = state.questions[realIdx]; if (!q) return;
      const ans = answers['q_' + realIdx]; const score = ans ? ans.score : 0;
      totalEarned += score;
      if (!dimScores[q.dim]) dimScores[q.dim] = { earned: 0, total: 0 };
      dimScores[q.dim].earned += score; dimScores[q.dim].total += 4;
      if (layerScores[q.layer]) { layerScores[q.layer].earned += score; layerScores[q.layer].total += 4; }
    });

    const totalPct = totalMax > 0 ? (totalEarned / totalMax) * 100 : 0;
    let level, levelLabel, levelDesc;
    if (totalPct >= 80) { level = 5; levelLabel = T('level5'); levelDesc = T('level5Desc'); }
    else if (totalPct >= 60) { level = 4; levelLabel = T('level4'); levelDesc = T('level4Desc'); }
    else if (totalPct >= 40) { level = 3; levelLabel = T('level3'); levelDesc = T('level3Desc'); }
    else if (totalPct >= 20) { level = 2; levelLabel = T('level2'); levelDesc = T('level2Desc'); }
    else { level = 1; levelLabel = T('level1'); levelDesc = T('level1Desc'); }

    const dimResults = Object.keys(DIM_MAP).map(dimId => {
      const data = dimScores[dimId] || { earned: 0, total: 0 };
      const pct = data.total > 0 ? (data.earned / data.total) * 100 : 0;
      return { id: dimId, icon: DIM_MAP[dimId].icon, label: DIM_MAP[dimId].label, pct, earned: data.earned, total: data.total };
    });
    
    const layerResults = ['step1', 'step2', 'step3'].map(key => {
      const data = layerScores[key]; const pct = data.total > 0 ? (data.earned / data.total) * 100 : 0;
      let statusText, cls;
      if (pct >= 70) { statusText = '✅ ' + T('layerPass'); cls = 'pass'; }
      else if (pct >= 45) { statusText = '⚠️ ' + T('layerWarn'); cls = 'warn'; }
      else { statusText = '❌ ' + T('layerFail'); cls = 'fail'; }
      return { key, label: LAYER_MAP[key].label, sub: LAYER_MAP[key].sub, pct, earned: data.earned, total: data.total, statusText, cls };
    });

    const strongestDim = dimResults.reduce((a, b) => a.pct > b.pct ? a : b);
    const weakestDim = dimResults.reduce((a, b) => a.pct < b.pct ? a : b);
    const weakestLayer = layerResults.reduce((a, b) => a.pct < b.pct ? a : b);
    
    const adviceText = totalPct >= 80 ? T('adviceHigh')
      : totalPct >= 60 ? T('adviceMid').replace('{layer}', '<strong>' + weakestLayer.label + '</strong>')
      : T('adviceLow');

    const headerHtml = '<div class="report-card nm-card-sm report-head-card"><div class="eyebrow">' + T('reportEyebrow') + '</div><div class="headline">' + T('reportHeadline') + '</div><div class="byline">' + T('reportBylinePre') + '杨晟琦' + T('reportBylineSuf') + '</div><div class="chip" style="margin-top:12px;">' + T('reportChipPre') + Math.round(totalPct) + T('reportChipMid') + levelLabel + '</div></div>';

    // 👇 修复了百分号排版，直接作为文本拼接，不再用 span 干预行高
    const getGauge = function(pct, colorClass) {
      var r = 42, c = 2 * Math.PI * r, offset = c - (pct / 100) * c;
      return '<div class="summary-gauge"><svg viewBox="0 0 100 100"><circle class="bgc" cx="50" cy="50" r="' + r + '"/><circle class="fgc ' + colorClass + '" cx="50" cy="50" r="' + r + '" stroke-dasharray="' + c + '" stroke-dashoffset="' + offset + '"/></svg><div class="val">' + Math.round(pct) + '%</div></div>';
    };

    const summaryHtml = '<div class="report-card nm-card-sm"><div class="card-title">' + T('summaryTitle') + '</div><div class="card-content"><div class="summary-cards-wrap">' +
        '<div class="summary-card"><div class="summary-card-title">' + T('strongest') + strongestDim.label + '</div>' + getGauge(strongestDim.pct, 'ok') + '<div class="summary-status-bar">' + T('scoreLabel') + strongestDim.earned + '/' + strongestDim.total + '</div></div>' +
        '<div class="summary-card"><div class="summary-card-title">' + T('weakest') + weakestDim.label + '</div>' + getGauge(weakestDim.pct, 'warn') + '<div class="summary-status-bar">' + T('scoreLabel') + weakestDim.earned + '/' + weakestDim.total + '</div></div>' +
        '<div class="summary-card"><div class="summary-card-title">' + T('priority') + weakestLayer.label + '</div>' + getGauge(weakestLayer.pct, 'accent') + '<div class="summary-status-bar">' + T('scoreLabel') + weakestLayer.earned + '/' + weakestLayer.total + '</div></div>' +
      '</div><div class="summary-advice" style="text-align:center;margin-top:24px;font-size:14px;color:var(--nm-text-2);">' + (totalPct >= 60 ? T('summaryAdviceGood') : T('summaryAdviceBad')) + '</div></div></div>';

    const layerNodeSubs = [T('layerNodeSub1'), T('layerNodeSub2'), T('layerNodeSub3')];
    const layerProgressHtml = '<div class="layer-progress">' + layerResults.map((r, i) => 
      '<div class="layer-node ' + r.cls + '"><div class="layer-node-badge ' + r.cls + '">' + r.statusText.replace('✅ ', '').replace('⚠️ ', '').replace('❌ ', '') + '</div><div class="layer-node-icon">' + (i === 0 ? '🛡️' : i === 1 ? '🧠' : '🌱') + '</div><div class="layer-node-label">' + r.label + '</div><div class="layer-node-sub">' + layerNodeSubs[i] + '</div><div class="layer-node-score-bar">' + Math.round(r.pct) + '% · ' + r.earned + '/' + r.total + '</div></div>' + (i < 2 ? '<div class="layer-arrow">→</div>' : '')
    ).join('') + '</div>';

    const radarHtml = '<div class="radar-container"><canvas id="radarCanvas" width="400" height="400"></canvas></div><div class="radar-note">' + T('radarNote') + '</div>';
    const dimProgressHtml = '<div class="report-card nm-card-sm"><div class="card-title">' + T('dimSection') + '</div><div class="dim-progress-wrap">' + dimResults.map(d => '<div class="dim-progress-item"><span class="dim-label">' + d.label + '</span><div class="nm-bar-track"><div class="nm-bar-fill" style="width:' + Math.round(d.pct) + '%"></div></div><span class="dim-pct">' + Math.round(d.pct) + '%</span><span class="dim-score">' + d.earned + '/' + d.total + '</span></div>').join('') + '</div></div>';
    
    const whatIsB1 = T('whatIsB1');
    const whatIsB2 = T('whatIsB2');
    const whatIsB3 = T('whatIsB3');
    
    // 👇 终极修复：在 table 中加入 table-layout: fixed; 强制均分
    const combinedBottomHtml = '<div class="report-card nm-card-sm">' +
      '<div class="level-light" style="margin-bottom:24px;padding-bottom:20px;border-bottom:2px solid var(--nm-line);"><div class="level-badge"><span class="level-stars">' + '⭐'.repeat(level) + '</span><span class="level-label">' + levelLabel + '</span></div><div class="level-desc">' + levelDesc + '</div></div>' +
      '<div style="font-size:15px;font-weight:700;color:var(--nm-text);margin-bottom:16px;text-align:center;">' + adviceText + '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-bottom:16px;">' +
        '<div style="background:var(--nm-bg);box-shadow:var(--nm-out-sm);border-radius:var(--nm-r-md);padding:16px;"><div style="font-size:14px;font-weight:700;color:var(--nm-accent);margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--nm-line);">' + T('practice1Title') + '</div><div style="font-size:13px;color:var(--nm-text-2);line-height:1.7;">' + T('practice1Desc') + '</div></div>' +
        '<div style="background:var(--nm-bg);box-shadow:var(--nm-out-sm);border-radius:var(--nm-r-md);padding:16px;"><div style="font-size:14px;font-weight:700;color:var(--nm-accent);margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--nm-line);">' + T('practice2Title') + '</div><div style="font-size:13px;color:var(--nm-text-2);line-height:1.7;">' + T('practice2Desc') + '</div></div>' +
        '<div style="background:var(--nm-bg);box-shadow:var(--nm-out-sm);border-radius:var(--nm-r-md);padding:16px;"><div style="font-size:14px;font-weight:700;color:var(--nm-accent);margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid var(--nm-line);">' + T('practice3Title') + '</div><div style="font-size:13px;color:var(--nm-text-2);line-height:1.7;">' + T('practice3Desc') + '</div></div>' +
      '</div>' +
      '<div style="text-align:center;font-size:13px;color:var(--nm-text-3);padding-top:8px;">' + T('practiceTip') + '</div>' +
      '<div style="margin-top:24px;padding:20px;border-radius:var(--nm-r-md);box-shadow:var(--nm-in-sm);background:var(--nm-bg);">' +
        '<div style="font-size:15px;font-weight:700;color:var(--nm-text);margin-bottom:12px;">' + T('whatIsTitle') + '</div>' +
        '<table style="width:100%; table-layout:fixed; border-collapse:collapse; margin-bottom:12px;">' +
          '<tr>' +
            '<td style="width:50%; vertical-align:top; padding:4px 0; font-size:13.5px; color:var(--nm-text-2);">' +
              '<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--nm-accent); margin-right:6px; vertical-align:middle;"></span>' + whatIsB1 + 
            '</td>' +
            '<td style="width:50%; vertical-align:top; padding:4px 0; font-size:13.5px; color:var(--nm-text-2);">' +
              '<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--nm-accent); margin-right:6px; vertical-align:middle;"></span>' + whatIsB2 + 
            '</td>' +
          '</tr>' +
          '<tr>' +
            '<td colspan="2" style="vertical-align:top; padding:4px 0; font-size:13.5px; color:var(--nm-text-2);">' +
              '<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--nm-accent); margin-right:6px; vertical-align:middle;"></span>' + whatIsB3 + 
            '</td>' +
          '</tr>' +
        '</table>' +
        '<div style="margin-top:12px;font-size:13px;color:var(--nm-text-2);">' + T('whatIsDescPre') + '</div>' +
      '</div>' +
    '</div>';

    const threeCardsHtml = '<div class="three-cards"><div class="report-card nm-card-sm"><h3>' + T('cardEarth') + '</h3><p>' + T('cardEarthDesc') + '</p></div><div class="report-card nm-card-sm"><h3>' + T('cardNation') + '</h3><p>' + T('cardNationDesc') + '</p></div><div class="report-card nm-card-sm"><h3>' + T('cardPerson') + '</h3><p>' + T('cardPersonDesc') + '</p></div></div>';
    
    const footerHtml = '<div class="qr-wrapper"><div class="qr-label">' + T('footBrand') + '</div><div class="qr-footer">' + T('footCredit1') + '<br>' + T('footCredit2') + '<br>' + T('footCreditEn') + '<br><span class="highlight">' + T('footCC') + '</span></div></div>';

    document.getElementById('reportBody').innerHTML = '<div class="report-inner">' + headerHtml + summaryHtml + '<div class="report-card nm-card-sm"><div class="card-title">' + T('layerSection') + '</div><div class="card-content">' + layerProgressHtml + '</div></div><div class="report-card nm-card-sm"><div class="card-title">' + T('radarSection') + '</div><div class="card-content">' + radarHtml + '</div></div>' + dimProgressHtml + combinedBottomHtml + threeCardsHtml + footerHtml + '</div>';

    document.getElementById('diagnosisArea').classList.add('is-hidden');
    document.getElementById('resultBox').classList.remove('is-hidden');

    requestAnimationFrame(() => drawRadar(dimResults));
    document.getElementById('resultBox').scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (saveToHistory) {
      const record = { id: Date.now(), timestamp: new Date().toISOString(), totalEarned: Math.round(totalEarned), totalMax, totalPct: Math.round(totalPct), level, levelLabel, answers: JSON.parse(JSON.stringify(answers)) };
      historyRecords.unshift(record);
      if (historyRecords.length > 50) historyRecords = historyRecords.slice(0, 50);
      saveHistory(); renderHistory();
    }
  }

  function drawRadar(dimResults) {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2;
    const radius = Math.min(w, h) * 0.38, dims = dimResults.length, angleStep = (Math.PI * 2) / dims;
    ctx.clearRect(0, 0, w, h);
    const lineColor = '#d0d7de', labelColor = '#5b6270';
    for (let lv = 1; lv <= 5; lv++) {
      const r = (radius / 5) * lv; ctx.beginPath();
      for (let i = 0; i < dims; i++) { const a = -Math.PI / 2 + i * angleStep, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.closePath(); ctx.strokeStyle = lineColor; ctx.lineWidth = 0.8; ctx.stroke();
    }
    for (let i = 0; i < dims; i++) {
      const a = -Math.PI / 2 + i * angleStep;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + radius * Math.cos(a), cy + radius * Math.sin(a));
      ctx.strokeStyle = lineColor; ctx.lineWidth = 1; ctx.stroke();
      const lx = cx + (radius + 28) * Math.cos(a), ly = cy + (radius + 28) * Math.sin(a);
      ctx.fillStyle = labelColor; ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(dimResults[i].label, lx, ly);
    }
    const pcts = dimResults.map(d => d.pct / 100);
    ctx.beginPath();
    for (let i = 0; i < dims; i++) { const r = radius * Math.min(pcts[i], 1), a = -Math.PI / 2 + i * angleStep; const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.closePath(); ctx.fillStyle = 'rgba(109,93,252,0.25)'; ctx.fill(); ctx.strokeStyle = '#6d5dfc'; ctx.lineWidth = 2.5; ctx.stroke();
    for (let i = 0; i < dims; i++) { const r = radius * Math.min(pcts[i], 1), a = -Math.PI / 2 + i * angleStep; const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a); ctx.beginPath(); ctx.arc(x, y, 4, 0, 2 * Math.PI); ctx.fillStyle = '#6d5dfc'; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); }

    try { exportImages.radar = canvas.toDataURL('image/png'); } catch (e) { exportImages.radar = null; }
  }

  // ================= 截图导出逻辑 =================
  function exportPngReport() {
    const btn = document.getElementById('copyImageBtn');
    if (btn.disabled) return;
    btn.disabled = true;
    btn.innerHTML = T('loadingBtnText');
    toast(T('loadingImage'));

    setTimeout(async () => {
      const resultBodyEl = document.getElementById('reportBody');
      if (!resultBodyEl) { btn.disabled = false; btn.innerHTML = T('exportPng'); return; }

      const clone = resultBodyEl.cloneNode(true);
      const cloneRadar = clone.querySelector('#radarCanvas');
      if (cloneRadar && cloneRadar.parentNode && exportImages.radar) {
        const img = document.createElement('img');
        img.src = exportImages.radar;
        img.style.cssText = 'width:100%;height:auto;display:block;margin:auto;';
        cloneRadar.parentNode.replaceChild(img, cloneRadar);
      }

      const FIXED_WIDTH = 820;
      const container = document.createElement('div');
      container.className = 'screenshot-container';
      container.style.cssText = 'width:' + FIXED_WIDTH + 'px;padding:40px 30px;background:#e0e5ec;box-sizing:border-box;font-family:sans-serif;line-height:1.7;overflow:visible;height:auto;';

      const innerClone = clone.querySelector('.report-inner');
      if (innerClone) { innerClone.style.cssText += 'margin:0 auto;width:100%;max-width:820px;box-sizing:border-box;overflow:visible;height:auto;'; }

      container.appendChild(clone);
      const tempContainer = document.createElement('div');
      tempContainer.style.cssText = 'position:fixed;left:0;top:0;z-index:-9999;opacity:0;pointer-events:none;width:' + FIXED_WIDTH + 'px;';
      tempContainer.appendChild(container);
      document.body.appendChild(tempContainer);

      await new Promise(r => setTimeout(r, 400));

      try {
        const totalHeight = container.scrollHeight;
        const pageHeight = 1500;
        const pageCount = Math.ceil(totalHeight / pageHeight);

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = FIXED_WIDTH * 2;
        finalCanvas.height = totalHeight * 2;
        const ctx = finalCanvas.getContext('2d');
        ctx.fillStyle = '#e0e5ec';
        ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

        for (let i = 0; i < pageCount; i++) {
          const y = i * pageHeight;
          const h = Math.min(pageHeight, totalHeight - y);

          const canvasChunk = await html2canvas(container, {
            scale: 2, backgroundColor: '#e0e5ec', useCORS: true, allowTaint: true, logging: false, width: FIXED_WIDTH, height: h, windowHeight: totalHeight, y: y, scrollY: 0,
            onclone: function (doc) {
              const style = doc.createElement('style');
              style.innerHTML = `
                * {
                  --nm-accent: #6d5dfc !important;
                  --nm-text: #333333 !important;
                  --nm-text-2: #666666 !important;
                  --nm-text-3: #999999 !important;
                  --nm-bg: #e0e5ec !important;
                  --nm-line: #cccccc !important;
                  --nm-line-soft: #d0d7de !important;
                  box-shadow: none !important;
                  filter: none !important;
                }
              `;
              doc.head.appendChild(style);

              doc.querySelectorAll('*').forEach(el => {
                el.style.overflow = 'visible'; 
                el.style.maxHeight = 'none'; 
                el.style.boxShadow = 'none';
                el.style.textShadow = 'none';
                
                const computed = window.getComputedStyle(el);
                if (computed.color && computed.color.includes('color(')) el.style.color = '#333333';
                if (computed.backgroundColor && computed.backgroundColor.includes('color(')) el.style.backgroundColor = 'transparent';
                if (computed.borderColor && computed.borderColor.includes('color(')) el.style.borderColor = '#b8bcc2';
                if (computed.fill && computed.fill.includes('color(')) el.style.fill = '#6d5dfc';
              });

              doc.querySelectorAll('.level-badge').forEach(el => {
                el.style.cssText = 'display: flex !important; align-items: center !important; justify-content: center !important; flex-direction: row !important; gap: 8px !important; padding: 8px 20px !important; border: 2px solid #6d5dfc !important; border-radius: 99px !important; background-color: #ffffff !important; margin: 0 auto 16px auto !important; width: fit-content !important; box-sizing: border-box !important;';
              });

              doc.querySelectorAll('.level-stars').forEach(el => {
                el.style.cssText = 'display: inline-block !important; color: #eab308 !important; font-size: 20px !important; letter-spacing: 2px !important; line-height: 1 !important;';
              });

              doc.querySelectorAll('.level-label').forEach(el => {
                el.style.cssText = 'display: inline-block !important; color: #333333 !important; font-weight: bold !important; font-size: 16px !important; line-height: 1 !important;';
              });
            }
          });
          ctx.drawImage(canvasChunk, 0, y * 2);
        }

        document.body.removeChild(tempContainer);
        finalCanvas.toBlob(blob => {
          const link = document.createElement('a');
          const dateStr = new Date().toISOString().slice(0, 10);
          link.download = (CO_I18N.getLang() === 'en' ? 'Cognitive_Audit_' : '认知审计报告_') + dateStr + '.png';
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
          toast(T('downloaded'), 'ok');
        }, 'image/png');

      } catch (err) {
        console.error('截图渲染报错:', err);
        if (tempContainer.parentNode) document.body.removeChild(tempContainer);
        toast(T('screenshotFail'), 'fail');
      } finally {
        btn.disabled = false;
        btn.innerHTML = T('exportPng');
      }
    }, 100);
  }

  function sharePngReport() { toast(T('callingExport')); exportPngReport(); }

  function renderHistory() {
    const list = document.getElementById('historyList'), empty = document.getElementById('historyEmpty'), area = document.getElementById('historyArea');
    if (!list) return;
    if (area) area.classList.remove('is-hidden');
    if (historyRecords.length === 0) { list.innerHTML = ''; if (empty) empty.style.display = 'block'; return; }
    if (empty) empty.style.display = 'none';
    
    list.innerHTML = historyRecords.map(rec => {
      const date = new Date(rec.timestamp).toLocaleString(CO_I18N.getLang() === 'en' ? 'en-US' : 'zh-CN');
      const cls = rec.totalPct >= 80 ? 'var(--nm-ok)' : rec.totalPct >= 60 ? 'var(--nm-accent)' : rec.totalPct >= 40 ? 'var(--nm-warn)' : 'var(--nm-fail)';
      const levelName = rec.level ? T('level' + rec.level) : (rec.levelLabel || '⭐');
      return '<div class="history-item nm-card-sm" data-id="' + rec.id + '"><span class="h-topic">' + T('historyTopic') + '</span><span class="h-meta">' + date + '</span><span class="h-level" style="color:' + cls + '">' + levelName + '</span><div class="history-actions"><span class="history-view-btn">' + T('historyView') + '</span><button class="history-del-btn" title="' + T('historyDelete') + '">✕</button></div></div>';
    }).join('');
    
    list.querySelectorAll('.history-item').forEach(item => {
      const id = parseInt(item.dataset.id, 10);
      const view = () => {
        const rec = historyRecords.find(r => r.id === id);
        if (rec && rec.answers) { generateReport(false, rec.answers); toast(T('historyLoaded'), 'ok'); }
        else toast(T('noAnswerData'), 'fail');
      };
      item.addEventListener('click', e => { if (!e.target.classList.contains('history-del-btn')) view(); });
      item.querySelector('.history-view-btn').addEventListener('click', e => { e.stopPropagation(); view(); });
      item.querySelector('.history-del-btn').addEventListener('click', e => {
        e.stopPropagation();
        if (confirm(T('confirmDelete'))) {
          historyRecords = historyRecords.filter(r => r.id !== id);
          saveHistory(); renderHistory(); toast(T('deleted'), 'ok');
        }
      });
    });
  }

  function fullReset() {
    stopTimer(); resetTimer(); initQuestions(); state.isActive = false; saveState();
    document.getElementById('diagnosisArea').classList.add('is-hidden');
    document.getElementById('resultBox').classList.add('is-hidden');
    document.getElementById('stepContainer').innerHTML = '';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('startArea').classList.remove('is-hidden');
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('answeredCount').textContent = '0';
    document.getElementById('nextDimLabel').textContent = T('dimFacts');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast(T('resetDone'), 'ok');
  }

  document.addEventListener('co:langchange', function () {
    renderHistory();
    if (!document.getElementById('resultBox').classList.contains('is-hidden') && window.__lastReportAnswers) {
      generateReport(false, window.__lastReportAnswers);
    } else if (state.isActive && !document.getElementById('diagnosisArea').classList.contains('is-hidden')) {
      renderStep();
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    loadHistory(); loadState(); renderHistory();

    document.getElementById('startBtn').addEventListener('click', function () {
      initQuestions();
      state.isActive = true; timerSeconds = 0; state.timerStarted = true;
      updateTimerDisplay(); startTimer(); saveState(); showDiagnosis();
    });

    document.getElementById('resetFromResultBtn').addEventListener('click', fullReset);
    document.getElementById('closeResultBtn').addEventListener('click', function () { document.getElementById('resultBox').classList.add('is-hidden'); });
    document.getElementById('copyImageBtn').addEventListener('click', exportPngReport);
    document.getElementById('shareImageBtn').addEventListener('click', sharePngReport);
  });
})();