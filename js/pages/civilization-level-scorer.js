/* js/pages/civilization-level-scorer.js —— 页面专属入口 */
(function () {
  'use strict';

  // ================= 配置数据 =================
  const categories = [
    { nameKey:'cat1Title', id:'cat1', items:['c1s1','c1s2','c1s3','c1s4'], scoreId:'cat1_score' },
    { nameKey:'cat2Title', id:'cat2', items:['c2s1','c2s2','c2s3','c2s4','c2s5','c2s6'], scoreId:'cat2_score' },
    { nameKey:'cat3Title', id:'cat3', items:['c3s1','c3s2','c3s3','c3s4'], scoreId:'cat3_score' },
    { nameKey:'cat4Title', id:'cat4', items:['c4s1','c4s2','c4s3','c4s4'], scoreId:'cat4_score' }
  ];
  const judgeItems = ['j1','j2','j3'];

  const questionsData = {
    cat1: [ { id:'c1s1' }, { id:'c1s2' }, { id:'c1s3' }, { id:'c1s4' } ],
    cat2: [ { id:'c2s1' }, { id:'c2s2' }, { id:'c2s3' }, { id:'c2s4' }, { id:'c2s5' }, { id:'c2s6' } ],
    cat3: [ { id:'c3s1' }, { id:'c3s2' }, { id:'c3s3' }, { id:'c3s4' } ],
    cat4: [ { id:'c4s1' }, { id:'c4s2' }, { id:'c4s3' }, { id:'c4s4' } ],
    judge: [ { id:'j1' }, { id:'j2' }, { id:'j3' } ]
  };

  const nineSteps = [
    { max:19, labelKey:'step1_label', descKey:'step1_desc' },
    { max:29, labelKey:'step2_label', descKey:'step2_desc' },
    { max:39, labelKey:'step3_label', descKey:'step3_desc' },
    { max:49, labelKey:'step4_label', descKey:'step4_desc' },
    { max:59, labelKey:'step5_label', descKey:'step5_desc' },
    { max:69, labelKey:'step6_label', descKey:'step6_desc' },
    { max:79, labelKey:'step7_label', descKey:'step7_desc' },
    { max:89, labelKey:'step8_label', descKey:'step8_desc' },
    { max:100, labelKey:'step9_label', descKey:'step9_desc' }
  ];

  const densityConstraints = [
    { max:0.5, score:10, labelKey:'density1' },
    { max:1.0, score:8, labelKey:'density2' },
    { max:2.0, score:6, labelKey:'density3' },
    { max:5.0, score:4, labelKey:'density4' },
    { max:Infinity, score:1, labelKey:'density5' }
  ];

  function getScoringArea() {
    return document.getElementById('s-scoring');
  }

  // ================= 渲染 DOM =================
  function renderDOM() {
    function buildQuestionHTML(q) {
      const lang = CIV_I18N.getLang();
      const meaningsArr = CIV_I18N.DICT[lang]['q_' + q.id + '_meanings'] || [];
      const t = CIV_I18N.t;

      let ticksHtml = '', labelsHtml = '';
      for (let i = 0; i <= 10; i++) {
        let pct = (i / 10) * 100;
        ticksHtml += `<div class="slider-tick" style="left: ${pct}%"></div>`;
        labelsHtml += `<span style="left: ${pct}%">${i}</span>`;
      }

      return `
        <div class="slider-group">
          <label>${t('q_'+q.id+'_t')} <span class="score" id="${q.id}_val">0</span></label>
          <div class="example">${t('q_'+q.id+'_ex')}</div>
          <div class="meaning" id="${q.id}_mean">${meaningsArr[0] || ''}</div>
          <div class="anchor"><span>${t('q_'+q.id+'_a1')}</span><span>${t('q_'+q.id+'_a2')}</span><span>${t('q_'+q.id+'_a3')}</span></div>
          
          <div class="slider-wrap" id="${q.id}_wrap" data-id="${q.id}" data-val="0">
            <div class="slider-track">${ticksHtml}</div>
            <div class="slider-thumb" style="left: 0%;"></div>
            <div class="slider-labels">${labelsHtml}</div>
          </div>
        </div>
      `;
    }

    categories.forEach(cat => {
      const container = document.getElementById(cat.id);
      if (!container) return;
      let html = '';
      questionsData[cat.id].forEach(q => { html += buildQuestionHTML(q); });
      container.innerHTML = html;
    });

    const judgeContainer = document.getElementById('judgeArea');
    if (judgeContainer) {
      let jHtml = '';
      questionsData.judge.forEach(q => { jHtml += buildQuestionHTML(q); });
      judgeContainer.innerHTML = jHtml;
    }
  }

  // ================= 自定义滑块交互 =================
  function initSliders() {
    document.querySelectorAll('.slider-wrap').forEach(wrap => {
      const track = wrap.querySelector('.slider-track');
      const thumb = wrap.querySelector('.slider-thumb');
      const qId = wrap.dataset.id;

      function updateFromEvent(e) {
        thumb.classList.add('is-active');

        const rect = track.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let x = clientX - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        let val = Math.round((x / rect.width) * 10);
        
        wrap.dataset.val = val;
        thumb.style.left = (val / 10) * 100 + '%';
        
        const valEl = document.getElementById(qId + '_val');
        if (valEl) valEl.textContent = val;
        
        const meanEl = document.getElementById(qId + '_mean');
        if (meanEl) {
          const lang = CIV_I18N.getLang();
          const meaningsArr = CIV_I18N.DICT[lang]['q_' + qId + '_meanings'] || [];
          meanEl.textContent = meaningsArr[val] || '';
        }
        
        updateUIOnly();
      }

      track.addEventListener('mousedown', updateFromEvent);
      track.addEventListener('touchstart', updateFromEvent, { passive: true });

      let isDragging = false;
      const onMove = (e) => { if (isDragging) updateFromEvent(e); };
      const onEnd = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };

      track.addEventListener('mousedown', () => {
        isDragging = true;
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
      });
      track.addEventListener('touchstart', () => {
        isDragging = true;
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
      }, { passive: true });
    });
  }

  // ================= 历史记录 =================
  function getHistory() {
    try { 
      const h = JSON.parse(localStorage.getItem('civ_public_v4_history'));
      return Array.isArray(h) ? h : []; 
    } catch { return []; }
  }

  function saveHistory(snapshot) {
    let hist = getHistory();
    if (hist.length > 0 && hist[hist.length - 1].score === snapshot.score) return;
    hist.push({ ...snapshot, time: Date.now() });
    if (hist.length > 10) hist = hist.slice(-10);
    localStorage.setItem('civ_public_v4_history', JSON.stringify(hist));
  }

  function clearHistory() {
    localStorage.removeItem('civ_public_v4_history');
    renderHistory();
    if (window.App && App.utils) App.utils.toast(CIV_I18N.t('toastClear'), 'ok');
  }

  function renderHistory() {
    const hist = getHistory();
    // 强制只取最近 10 条，并倒序
    const recent = hist.slice(-10).reverse(); 
    
    const countEl = document.getElementById('historyCount');
    if (countEl) countEl.textContent = CIV_I18N.t('historyCount').replace('{n}', hist.length);
    
    const container = document.getElementById('historyAccList');
    if (!container) return;
    
    if (recent.length === 0) {
      container.innerHTML = `<div class="history-empty">${CIV_I18N.t('historyEmpty')}</div>`;
      return;
    }
    
    let html = '';
    
    recent.forEach((entry, idx) => {
      const timeStr = new Date(entry.time).toLocaleString(CIV_I18N.getLang()==='en'?'en-US':'zh-CN');
      const scoreColor = entry.score <= 39 ? 'var(--nm-fail)' : (entry.score <= 79 ? 'var(--nm-warn)' : 'var(--nm-ok)');
      const numLabel = idx + 1;
      
      // ★ 关键修复：实时翻译历史记录里的等级
      const displayLevel = CIV_I18N.t(entry.levelKey || 'levelLow');
      
      html += `
        <div class="history-acc-item" id="hist-item-${idx}">
          <button class="history-acc-btn" type="button" aria-expanded="false">
            <span class="history-acc-num">${numLabel}</span>
            <div class="history-acc-info">
              <span class="history-acc-time">${timeStr}</span>
              <span class="history-acc-score" style="color:${scoreColor};">${entry.score} <span class="denom">/100</span></span>
              <span class="history-acc-level">${displayLevel}</span>
            </div>
            <i class="history-acc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            </i>
          </button>
          <div class="history-acc-panel">
            <div class="history-acc-inner"></div>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
    
    // 绑定手风琴点击事件
    container.querySelectorAll('.history-acc-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const item = this.closest('.history-acc-item');
        const isOpen = item.classList.contains('open');
        const idx = parseInt(item.id.replace('hist-item-', ''), 10);
        
        if (isOpen) {
          item.classList.remove('open');
          this.setAttribute('aria-expanded', 'false');
        } else {
          const inner = item.querySelector('.history-acc-inner');
          if (!inner.innerHTML.trim()) {
            inner.innerHTML = buildHistoryDetailHTML(recent[idx]);
          }
          item.classList.add('open');
          this.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function buildHistoryDetailHTML(entry) {
    let html = `<div class="history-detail-grid">`;
    entry.catScores.forEach((s, i) => {
      html += `
        <div class="history-detail-item">
          <span>${CIV_I18N.t(categories[i].nameKey)}</span>
          <span class="val">${s.toFixed(1)} <span>/ 25</span></span>
        </div>
      `;
    });
    html += `</div>`;
    
    if (entry.judgeAvg !== undefined) {
      html += `
        <div class="history-judge-row">
          <strong>${CIV_I18N.t('historyJudgeAvg')}:</strong> ${entry.judgeAvg.toFixed(1)}
        </div>
      `;
    }
    return html;
  }

  // ================= 业务逻辑 =================
  function computeDensity() {
    const cases = parseFloat(document.getElementById('compCases').value) || 0;
    const pop = parseFloat(document.getElementById('compPop').value) || 0;
    const densityDisplay = document.getElementById('densityDisplay');
    const constraintDisplay = document.getElementById('constraintLevel');
    
    if (cases <= 0 || pop <= 0) {
      densityDisplay.textContent = '—';
      constraintDisplay.textContent = '—';
      return { density:0, maxScore:10, labelKey:'density1' };
    }
    const density = cases / pop;
    densityDisplay.textContent = density.toFixed(4);
    let maxScore = 10, labelKey = 'density1';
    for (const c of densityConstraints) {
      if (density <= c.max) { maxScore = c.score; labelKey = c.labelKey; break; }
    }
    constraintDisplay.textContent = CIV_I18N.t(labelKey) + ' (≤' + maxScore + ')';
    return { density, maxScore, labelKey };
  }

  function checkGate() {
    const g1 = document.getElementById('g1').checked;
    const g2 = document.getElementById('g2').checked;
    const g3 = document.getElementById('g3').checked;
    const allChecked = g1 && g2 && g3;
    
    const gateStatus = document.getElementById('gateStatus');
    const scoringArea = getScoringArea();
    
    if (allChecked) {
      gateStatus.className = 'gate-status unblocked';
      gateStatus.innerHTML = CIV_I18N.t('gateUnblocked');
      if (scoringArea) scoringArea.classList.remove('disabled');
      return true;
    } else {
      gateStatus.className = 'gate-status blocked';
      let missing = [];
      if (!g1) missing.push(CIV_I18N.getLang() === 'zh' ? '文明基石' : 'Civilization');
      if (!g2) missing.push(CIV_I18N.getLang() === 'zh' ? '社会基石' : 'Society');
      if (!g3) missing.push(CIV_I18N.getLang() === 'zh' ? '治理基石' : 'Governance');
      
      gateStatus.innerHTML = CIV_I18N.t('gateBlockedPrefix') + missing.join('、') + CIV_I18N.t('gateBlockedSuffix');
      if (scoringArea) scoringArea.classList.add('disabled');
      renderResultNotEntered(missing);
      return false;
    }
  }

  function renderResultNotEntered(missing) {
    const t = CIV_I18N.t;
    document.getElementById('resultContent').innerHTML = `
      <div class="verdict">
        <div class="vring">
          <svg viewBox="0 0 120 120">
            <circle class="bgc" cx="60" cy="60" r="45"></circle>
            <circle class="fgc" cx="60" cy="60" r="45" stroke-dasharray="282.7" stroke-dashoffset="282.7"></circle>
          </svg>
          <div class="vl">
            <div class="n" style="color:var(--nm-text-3);">—</div>
            <div class="l">/ 100</div>
          </div>
        </div>
        <div class="vtxt">
          <div class="ti level-low">${t('resultNotEnteredTitle')}</div>
          <div class="de">${t('resultDiagWeak').replace('{cat}', '—').replace('{score}', '0')}</div>
        </div>
      </div>

      <div class="diag-section">
        <div class="section-title">${t('resultDiagTitle')}</div>
        <div class="section-body">
          ${t('resultNotEnteredDesc').replace('{missing}', missing.join('、'))}
        </div>
      </div>
    `;
  }

  function renderResultEntered(baseTotal, catScores, judgeAvg, densityInfo, hasLowBucket) {
    const t = CIV_I18N.t;
    const densityMax = densityInfo ? densityInfo.maxScore : 10;
    const judgeFinal = Math.min(judgeAvg, densityMax);
    const discount = 0.8 + (judgeFinal / 10) * 0.2;
    const finalScore = Math.round(baseTotal * discount);
    
    let levelKey, levelClass;
    if (hasLowBucket) { levelKey = 'levelLowBucket'; levelClass = 'level-low'; }
    else if (finalScore <= 39) { levelKey = 'levelLow'; levelClass = 'level-low'; }
    else if (finalScore <= 79) { levelKey = 'levelMid'; levelClass = 'level-mid'; }
    else { levelKey = 'levelHigh'; levelClass = 'level-high'; }

    let minIdx = 0, minVal = catScores[0];
    catScores.forEach((s, i) => { if (s < minVal) { minVal = s; minIdx = i; } });
    const weakestCat = t(categories[minIdx].nameKey);

    let step = nineSteps.find(s => finalScore <= s.max) || nineSteps[nineSteps.length - 1];
    let diagText = hasLowBucket 
      ? t('diagBucketText').replace('{cat}', weakestCat).replace('{step}', t(step.labelKey)).replace('{desc}', t(step.descKey))
      : t('diagNormalText').replace('{step}', t(step.labelKey)).replace('{desc}', t(step.descKey));

    let densityStr = densityInfo.density > 0 ? densityInfo.density.toFixed(4) : t('resultJudgeDensityNone');
    let densityHtml = t('resultJudgeDensity').replace('{density}', densityStr).replace('{max}', densityMax);

    const rTop = 45;
    const circTop = 2 * Math.PI * rTop;
    const offsetTop = circTop - (finalScore / 100) * circTop;

    const rHalf = 40;
    const circHalf = Math.PI * rHalf;
    
    let dimGridHtml = '';
    catScores.forEach((s, i) => {
      const pct = Math.min(s / 25, 1);
      const offsetHalf = circHalf - (pct * circHalf);
      
      dimGridHtml += `
        <div class="dim-cell">
          <div class="dim-cell-title">${t(categories[i].nameKey)}</div>
          <div class="dim-half-gauge">
            <svg viewBox="0 0 100 55">
              <path class="bgc" d="M 10 50 A 40 40 0 0 1 90 50"></path>
              <path class="fgc" d="M 10 50 A 40 40 0 0 1 90 50" 
                    stroke-dasharray="${circHalf}" 
                    stroke-dashoffset="${offsetHalf}"></path>
            </svg>
            <div class="vl">${s.toFixed(1)}<span>/25</span></div>
          </div>
          <div class="dim-bar"><i style="width: ${pct * 100}%"></i></div>
        </div>
      `;
    });

    document.getElementById('resultContent').innerHTML = `
      <div class="verdict">
        <div class="vring">
          <svg viewBox="0 0 120 120">
            <circle class="bgc" cx="60" cy="60" r="${rTop}"></circle>
            <circle class="fgc" cx="60" cy="60" r="${rTop}" stroke-dasharray="${circTop}" stroke-dashoffset="${offsetTop}"></circle>
          </svg>
          <div class="vl">
            <div class="n">${finalScore}</div>
            <div class="l">/ 100</div>
          </div>
        </div>
        <div class="vtxt">
          <div class="ti ${levelClass}">${t(levelKey)}</div>
          <div class="de">${t('resultDiagWeak').replace('{cat}', weakestCat).replace('{score}', minVal.toFixed(1))}</div>
        </div>
      </div>

      <div class="dim-grid">
        ${dimGridHtml}
      </div>

      <div class="judge-wrap">
        <div class="judge-row">
          <div class="judge-item">
            <div class="k">${t('resultJudgeScore')}</div>
            <div class="v">${judgeFinal.toFixed(1)}</div>
          </div>
          <div class="judge-item">
            <div class="k">${t('resultJudgeDiscount')}</div>
            <div class="v">${discount.toFixed(2)}</div>
          </div>
          <div class="judge-item" style="flex: 2;">
            <div class="k">${t('densityRateLabel')}</div>
            <div class="v" style="font-size: 14px; font-weight: 400; line-height: 1.5;">${densityHtml}</div>
          </div>
        </div>
        
        <div class="diag-inner">
          <div class="diag-title">${t('resultDiagTitle')}</div>
          <div class="diag-text">${t('resultDiagStep').replace('{diag}', diagText)}</div>
        </div>
      </div>
    `;

    // 把当前算好的结果暂存到全局
    window._currentDiagnosis = { score: finalScore, catScores: catScores, judgeAvg: judgeAvg, levelKey: levelKey };
  }

  function updateUIOnly() {
    if (!checkGate()) return;

    let catScores = [];
    categories.forEach(cat => {
      let sum = 0;
      cat.items.forEach(id => {
        const wrap = document.getElementById(id + '_wrap');
        sum += wrap ? parseInt(wrap.dataset.val, 10) || 0 : 0;
      });
      const catScore = (sum / cat.items.length) * 2.5;
      const scoreEl = document.getElementById(cat.scoreId);
      if (scoreEl) scoreEl.textContent = catScore.toFixed(1);
      catScores.push(catScore);
    });
    const baseTotal = catScores.reduce((a,b) => a + b, 0);
    const hasLowBucket = catScores.some(s => s <= 5);

    let judgeSum = 0;
    judgeItems.forEach(id => {
      const wrap = document.getElementById(id + '_wrap');
      judgeSum += wrap ? parseInt(wrap.dataset.val, 10) || 0 : 0;
    });
    const judgeAvg = judgeItems.length > 0 ? judgeSum / judgeItems.length : 0;
    const densityInfo = computeDensity();

    let hasAnyScore = false;
    document.querySelectorAll('.slider-wrap').forEach(w => {
      if (parseInt(w.dataset.val, 10) > 0) hasAnyScore = true;
    });
    if (!hasAnyScore && getHistory().length === 0) {
      document.getElementById('resultContent').innerHTML = `<div class="result-main"><div class="placeholder">${CIV_I18N.t('resultPlaceholder')}</div></div>`;
      return;
    }
    
    renderResultEntered(baseTotal, catScores, judgeAvg, densityInfo, hasLowBucket);
  }

  // ================= 语言切换 =================
  document.addEventListener('civ:langchange', () => {
    renderDOM();
    initSliders();
    // 为了保留滑块的值，需要在重绘后重新打上 is-active 并更新位置
    const hist = getHistory();
    if (hist.length > 0) {
       // 由于不做持久化联动，这里简单刷新即可
    }
    updateUIOnly();
    renderHistory(); // 让历史记录也实时切换语言
  });

  // ================= 初始化 =================
  document.addEventListener('DOMContentLoaded', () => {
    renderDOM();
    renderHistory();
    initSliders();

    document.querySelectorAll('.gate-checkbox input').forEach(cb => cb.addEventListener('change', updateUIOnly));
    document.getElementById('compCases').addEventListener('input', updateUIOnly);
    document.getElementById('compPop').addEventListener('input', updateUIOnly);
    
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    
    // ★ 确认按钮的点击事件
    const confirmBtn = document.getElementById('confirmDiagnosisBtn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (!checkGate()) {
          if (window.App && App.utils) App.utils.toast('请先确认三大基石！', 'fail');
          return;
        }
        
        if (window._currentDiagnosis) {
          saveHistory({ 
            score: window._currentDiagnosis.score, 
            catScores: window._currentDiagnosis.catScores, 
            judgeAvg: window._currentDiagnosis.judgeAvg, 
            levelKey: window._currentDiagnosis.levelKey, // ★ 存 Key，不存文字
            time: Date.now() 
          });
          
          renderHistory();
          
          if (window.App && App.utils) {
            App.utils.toast(CIV_I18N.getLang() === 'zh' ? '✅ 诊断结果已保存' : '✅ Diagnosis saved', 'ok');
          }
        }
      });
    }
    
    // 重置所有分数
    document.getElementById('resetAllBtn').addEventListener('click', () => {
      if (!confirm(CIV_I18N.t('confirmReset'))) return;
      document.querySelectorAll('.slider-wrap').forEach(wrap => {
        wrap.dataset.val = 0;
        const thumb = wrap.querySelector('.slider-thumb');
        thumb.style.left = '0%';
        thumb.classList.remove('is-active');
        
        const qId = wrap.dataset.id;
        document.getElementById(qId + '_val').textContent = '0';
        
        const lang = CIV_I18N.getLang();
        const meaningsArr = CIV_I18N.DICT[lang]['q_' + qId + '_meanings'] || [];
        document.getElementById(qId + '_mean').textContent = meaningsArr[0] || '';
      });
      
      document.getElementById('compCases').value = '';
      document.getElementById('compPop').value = '';
      updateUIOnly();
      if (window.App && window.App.utils) window.App.utils.toast(CIV_I18N.t('toastReset'), 'ok');
    });

    document.getElementById('dataRefToggle').addEventListener('click', function() {
      const box = document.getElementById('dataRefBox');
      box.classList.toggle('open');
      this.textContent = box.classList.contains('open') ? CIV_I18N.t('densityToggleOpen') : CIV_I18N.t('densityToggleClose');
    });

    updateUIOnly();
  });
})();