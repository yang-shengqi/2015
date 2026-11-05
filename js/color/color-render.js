/* ============================================================
 * color-render.js —— 全量渲染与图片提取（完整修复版）
 * ============================================================ */
(function (global) {
  'use strict';
  var C = global.CO_Color, U = global.CO_Util, Canvas = global.CO_Canvas, $ = U.$;
  var hexToRgb = C.hexToRgb, rgbToHex = C.rgbToHex, textOn = C.textOn, luminance = C.luminance;
  var rgbToHsl = C.rgbToHsl, rgbToCmyk = C.rgbToCmyk, rgbToOklch = C.rgbToOklch, oklchToRgb = C.oklchToRgb;
  var clamp = C.clamp, pushLight = C.pushLight, pushDark = C.pushDark;
  var ChineseColors = global.CO_Names.ChineseColors;

  function t(key, vars) {
    var val = null;
    if (global.CO_I18N && typeof global.CO_I18N.t === 'function') val = global.CO_I18N.t(key);
    if (val == null || val === key) return key;
    if (vars && typeof val === 'string' && val.indexOf('{') !== -1) {
      val = val.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? String(vars[k]) : m; });
    }
    return val;
  }
  function copyTip(text) { return t('copyTipPrefix') + text; }

  /* ---------- 色块条 ---------- */
  function renderStripes(colors, names, containerId) {
    var el = $(containerId); if (!el) return;
    el.innerHTML = colors.map(function (c, i) {
      var h = rgbToHex(c);
      return '<button type="button" class="co-stripe co-tip" style="--stripe-bg:' + h + ';--stripe-text:' + textOn(c) + ';" data-action="copy-stripe" data-hex="' + h + '" data-tip="' + copyTip(h) + '">' +
        '<span>' + h + '</span>' + (names[i] ? '<small>' + names[i] + '</small>' : '') + '</button>';
    }).join('');
  }

  /* ---------- 明度阶梯 ---------- */
  function renderToneScale(baseRgb) {
    var el = $('toneScale'); if (!el) return;
    var base = rgbToOklch(baseRgb), html = '';
    for (var i = 1; i <= 9; i++) {
      var pct = i * 10, L, Cc;
      if (pct <= 50) { var t1 = pct / 50; L = 0.95 - t1 * (0.95 - base.L); Cc = t1 * base.C; }
      else { var t2 = (pct - 50) / 50; L = base.L - t2 * (base.L - 0.25); Cc = base.C - t2 * (base.C * 0.7); }
      var rgb = oklchToRgb({ L: L, C: Cc, h: base.h }), hex = rgbToHex(rgb);
      html += '<div class="co-tone-block co-tip" style="--tone-bg:' + hex + ';--tone-text:' + textOn(rgb) + ';" data-action="copy-tone" data-hex="' + hex + '" data-tip="' + copyTip(hex) + '"><span>' + hex + '</span></div>';
    }
    el.innerHTML = html;
  }

/* ---------- 界面预览 ---------- */
  function renderPreview(colors, ruleColors, mainRgb) {
    var el = $('pv'); if (!el) return;

    function safeHexToRgba(hex, alpha) {
      try {
        if (typeof hex !== 'string' || hex.length !== 7 || hex[0] !== '#') return 'transparent';
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);
        if (isNaN(r) || isNaN(g) || isNaN(b)) return 'transparent';
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
      } catch (e) { return 'transparent'; }
    }

    // 统一的现代化几何 SVG
    var unifiedSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>';

    var fontFam = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

    function buildFeatureCard(buttonColors, titleText, isRulePreview, baseBgColor, mainHighlightColor) {
      if (!buttonColors || !buttonColors.length) return '';
      
      var bgRgb = pushLight(baseBgColor, 0.94);
      var bgHex = rgbToHex(bgRgb);
      
      var textHex = textOn(bgRgb);
      var textMutedHex = safeHexToRgba(textHex, 0.6);
      var mainHex = rgbToHex(mainHighlightColor);
      
      // 修复：这里之前写错了变量名
      var englishSubtitle = isRulePreview ? 'DERIVED COLORS' : 'PRIMARY COLORS';

      var buttonsHtml = '';
      buttonColors.forEach(function(c) {
        var hex = rgbToHex(c);
        var btnText = textOn(c); 
        
        // 按钮样式
        buttonsHtml += `
          <button style="
            background-color: ${hex} !important;
            color: ${btnText} !important;
            height: 40px;
            padding: 0 20px;
            border-radius: var(--nm-r-sm) !important;
            border: 1px solid rgba(0,0,0,0.08);
            font-size: 14px;
            font-weight: 400 !important;
            font-family: ${fontFam} !important;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.04);
            transition: all 0.2s ease-in-out;
          "
          onmouseover="this.style.filter='brightness(1.15)'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 12px rgba(0,0,0,0.12)';"
          onmouseout="this.style.filter='none'; this.style.transform='none'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.04)';"
          >
            Button
          </button>
        `;
      });

      return `
        <div style="
          flex: 1; 
          background:#FFFFFF; 
          border-radius: 16px; 
          overflow:hidden; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.05);
          font-family:${fontFam};
          display: flex;
          flex-direction: column;
        ">
          
          <div style="height: 40px; background: ${mainHex} !important; border-bottom: 1px solid rgba(0,0,0,0.08); padding: 0 20px; display: flex; align-items: center; gap: 6px; flex-shrink: 0;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #FF5F56;"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #FFBD2E;"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #27C93F;"></div>
          </div>

          <div style="background:${bgHex}; padding: 40px; flex: 1; display: flex; flex-direction: column;">
            
            <div style="display: flex; align-items: center; margin-bottom: 24px; width: 100%;">
              <div style="width: 52px; height: 52px; border-radius: var(--nm-r-md) !important; background-color: ${mainHex} !important; display: flex; align-items: center; justify-content: center; margin-right: 16px; flex-shrink: 0;">
                ${unifiedSvg}
              </div>
              
              <div style="display: flex; flex-direction: column; justify-content: center;">
                <div style="font-size: 12px; font-weight: 700; color: ${textMutedHex}; letter-spacing: 1px;">${englishSubtitle}</div>
                <div style="font-size: 18px; font-weight: 700; color: ${textHex}; margin-bottom: 4px; line-height: 1.1;">${titleText}</div>
              </div>
            </div>

            <div style="font-size: 15px; line-height: 1.6; font-weight: 400; color: ${textMutedHex}; margin-bottom: 32px; width: 100%;">
              ${t('appPreviewText')}
            </div>
            
            <!-- 这里的 gap 控制按钮间距，改成你想要的数值即可 -->
            <div style="display: flex; flex-wrap: wrap; gap: 12px; width: 100%; margin-top: auto;">
              ${buttonsHtml}
            </div>

          </div>
        </div>
      `;
    }

    var leftBgBase = colors && colors.length > 0 ? colors[0] : {r:255,g:255,b:255};
    var leftIconMain = mainRgb || (colors && colors.length >= 3 ? colors[2] : leftBgBase);

    var rightBgBase = ruleColors && ruleColors.length > 1 ? ruleColors[1] : (ruleColors && ruleColors.length > 0 ? ruleColors[0] : leftBgBase);
    var rightIconMain = rightBgBase; 

    el.innerHTML = '<div style="display:flex;gap:24px;align-items:stretch;width:100%;box-sizing:border-box;">' +
      buildFeatureCard(colors, t('genPreviewOrigin'), false, leftBgBase, leftIconMain) +
      buildFeatureCard(ruleColors, t('genPreviewRule'), true, rightBgBase, rightIconMain) +
    '</div>';
  }
  /* ---------- 色彩数值表 ---------- */
  function renderColorTable(colors, names) {
    var wrap = $('colorDataWrap'); if (!wrap || !colors) return;
    wrap.innerHTML = colors.map(function (c, i) {
      var hsl = rgbToHsl(c.r, c.g, c.b), cmyk = rgbToCmyk(c.r, c.g, c.b), hex = rgbToHex(c);
      var name = names[i] || ChineseColors.name(hex);
      return '<div class="co-data-row">' +
        '<div class="co-data-label">' +
          '<div class="co-data-swatch" style="background:' + hex + ';"></div>' +
          '<span class="co-data-name">' + name + '</span>' +
        '</div>' +
        '<div class="co-data-values">' +
          '<div class="co-data-item co-tip" data-copy="' + hex + '" data-tip="' + copyTip('HEX') + '"><span class="co-data-text"><strong>HEX</strong>' + hex + '</span></div>' +
          '<div class="co-data-item co-tip" data-copy="' + c.r + ',' + c.g + ',' + c.b + '" data-tip="' + copyTip('RGB') + '"><span class="co-data-text"><strong>RGB</strong>' + c.r + ',' + c.g + ',' + c.b + '</span></div>' +
          '<div class="co-data-item co-tip" data-copy="' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%" data-tip="' + copyTip('HSL') + '"><span class="co-data-text"><strong>HSL</strong>' + hsl.h + ',' + hsl.s + '%,' + hsl.l + '%</span></div>' +
          '<div class="co-data-item co-tip" data-copy="' + cmyk.c + ',' + cmyk.m + ',' + cmyk.y + ',' + cmyk.k + '" data-tip="' + copyTip('CMYK') + '"><span class="co-data-text"><strong>CMYK</strong>' + cmyk.c + ',' + cmyk.m + ',' + cmyk.y + ',' + cmyk.k + '</span></div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ---------- CSS 变量导出 ---------- */
  function renderCssCode(colors, names) {
    var el = $('code'); if (!el) return;
    el.value = ':root {\n' + colors.map(function (c, i) {
      var h = rgbToHex(c), name = names[i] || ChineseColors.name(h);
      var o = C.rgbToOklch(c); // 👈 增加转换
      var okl = 'oklch(' + (o.L * 100).toFixed(1) + '% ' + o.C.toFixed(3) + ' ' + o.h.toFixed(1) + ')'; // 👈 生成现代语法
      return '  --palette-' + (i + 1) + ': ' + h + ';\n' +
             '  --palette-' + (i + 1) + '-oklch: ' + okl + '; /* ' + name + ' */';
    }).join('\n') + '\n}';
  }

  function renderRuleCssCode(colors, names) {
    var el = $('ruleCode'); if (!el) return;
    el.value = ':root {\n' + colors.map(function (c, i) {
      var h = rgbToHex(c), name = names[i] || ChineseColors.name(h);
      var o = C.rgbToOklch(c); // 👈 增加转换
      var okl = 'oklch(' + (o.L * 100).toFixed(1) + '% ' + o.C.toFixed(3) + ' ' + o.h.toFixed(1) + ')'; // 👈 生成现代语法
      return '  --rule-' + (i + 1) + ': ' + h + ';\n' +
             '  --rule-' + (i + 1) + '-oklch: ' + okl + '; /* ' + name + ' */';
    }).join('\n') + '\n}';
  }

  /* ---------- 对比度检测（双容器版） ---------- */
function renderContrast(genColors, ruleColors) {
  var listLeft = $('contrastListLeft'); 
  var listRight = $('contrastListRight');
  if (!listLeft || !listRight || !genColors || !genColors.length) return;

  // 👇 新增：读取当前实际背景色
  var state = global.__co_state;
  var bgHex = (state && state.wheelConfig && state.wheelConfig.bg) || '#e0e5ec';
  if (bgHex === 'transparent') bgHex = '#e0e5ec';  // 透明背景退回纸色
  var bgRgb = hexToRgb(bgHex);

  var pairsLeft = genColors.map(function(c, i) {
    var label = (i === 2) ? t('contrastMainVsBg') : t('contrastStepVsBg', { n: i + 1 });
    return { label: label, fg: c, bg: bgRgb };  // 👈 改这里
  });

  var pairsRight = ruleColors.map(function(c, i) {
    var label = (i === 0) ? t('contrastMainVsBg') : t('contrastRuleVsBg', { n: i });
    return { label: label, fg: c, bg: bgRgb };  // 👈 改这里
  });

    function buildRow(p) {
      var r = C.contrastRatio(p.fg, p.bg);
      var cls = r >= 4.5 ? 'ok' : r >= 3 ? 'warn' : 'fail';
      var label = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? t('gradeLarge') : t('gradeFail');
      
      // 🔥 纯净化：不加任何 width、flex 等行内硬编码
      return '<div class="co-data-row">' +
        '<div class="co-data-label">' +
          '<div class="co-data-swatch" style="background:' + rgbToHex(p.fg) + ';color:' + textOn(p.fg) + ';">Aa</div>' +
          '<span class="co-data-name">' + p.label + '</span>' +
        '</div>' +
        '<div class="co-data-values">' +
          '<div class="co-data-item"><span class="co-data-text">' + r.toFixed(2) + ':1</span></div>' +
          '<div class="co-data-item"><span class="co-contrast-badge ' + cls + '">' + label + '</span></div>' +
        '</div>' +
      '</div>';
    }

    listLeft.innerHTML = pairsLeft.map(buildRow).join('');
    listRight.innerHTML = pairsRight.map(buildRow).join('');
  }

  /* ---------- 气质指标 ---------- */
  function setMetric(id, v, mainRgb) {
    v = clamp(v, 0, 1);
    var dot = $(id + 'Metric'), out = $(id + 'Output');
    if (dot) {
      dot.style.left = (v * 100).toFixed(1) + '%';
      dot.style.transform = 'translate(-50%, -50%)';
      
      if (mainRgb) {
        var hex = rgbToHex(mainRgb);
        dot.style.setProperty('background', hex, 'important');
        dot.style.setProperty('background-color', hex, 'important');
        dot.style.setProperty('border', '1px solid rgba(0,0,0,0.15)', 'important');
        dot.style.setProperty('box-shadow', '0 2px 5px rgba(0,0,0,0.15)', 'important');
      }
    }
    if (out) out.textContent = Math.round(v * 100) + '%';
  }

  function computeMood(colors) {
    var total = 0, warmSum = 0, lightSum = 0, satSum = 0;
    colors.forEach(function (c) {
      var w = c.count || 1;
      var hue = (c.h || 0) * 360;
      var warm = (1 + Math.cos((hue - 30) * Math.PI / 180)) / 2;
      warmSum += warm * w;
      lightSum += (c.l != null ? c.l : 0.5) * w;
      satSum += (c.s != null ? c.s : 0.5) * w;
      total += w;
    });
    if (!total) return null;
    return { warm: warmSum / total, light: lightSum / total, sat: satSum / total };
  }

  function hueSpanOf(colors) {
    var chromatic = colors.filter(function (c) {
      return (c.s || 0) > 0.15 && (c.l || 0) > 0.08 && (c.l || 0) < 0.95;
    });
    var src = chromatic.length >= 2 ? chromatic : colors;
    if (src.length < 2) return 0;
    var hues = src.map(function (c) { return (c.h || 0) * 360; }).sort(function (a, b) { return a - b; });
    var maxGap = 0;
    for (var i = 1; i < hues.length; i++) maxGap = Math.max(maxGap, hues[i] - hues[i - 1]);
    maxGap = Math.max(maxGap, 360 - hues[hues.length - 1] + hues[0]);
    return Math.max(0, 360 - maxGap);
  }

  function moodWord(v, lowCut, highCut, lowKey, midKey, highKey) {
    if (v < lowCut) return t(lowKey);
    if (v > highCut) return t(highKey);
    return t(midKey);
  }

  /* ---------- 分析总渲染 ---------- */
  function renderAnalysis(state, ctxW, ctxH) {
    var set = state.hasImage ? state.extracted : state.derived;
    if (!set || !set.colors || !set.colors.length) return;

    Canvas.drawWheel(ctxW, set.colors.slice(0, 12), state.wheelConfig);
    Canvas.drawHex(ctxH, set.colors, state.hexConfig);

    var total = set.total || set.colors.reduce(function (s, c) { return s + (c.count || 1); }, 0);

    var libChecked = document.querySelector('input[name="lib"]:checked');
    var lib = libChecked ? libChecked.value : 'none';
    var palette = null;
    if (lib === 'cn') palette = window.CO_Names.CN_PALETTE;
    else if (lib === 'morandi') palette = window.CO_Names.MORANDI_PALETTE;
    else if (lib === 'jp') palette = window.CO_Names.JP_PALETTE;
    else if (lib === 'cyber') palette = window.CO_Names.CYBER_PALETTE;
    
    var namePool = palette;
    if (!namePool) {
        namePool = [];
        if (window.CO_Names.CN_PALETTE) namePool = namePool.concat(window.CO_Names.CN_PALETTE);
        if (window.CO_Names.JP_PALETTE) namePool = namePool.concat(window.CO_Names.JP_PALETTE);
        if (window.CO_Names.MORANDI_PALETTE) namePool = namePool.concat(window.CO_Names.MORANDI_PALETTE);
        if (window.CO_Names.CYBER_PALETTE) namePool = namePool.concat(window.CO_Names.CYBER_PALETTE);
    }
    var usedNamesForList = new Set();

    var list = $('ratioList');
    if (list) {
      list.innerHTML = set.colors.slice(0, 12).map(function (c, idx) {
        var pct = (c.count || 1) / total * 100, barW = Math.max(pct, 0.6);
        var label = pct < 0.6 ? '&lt;0.6' : pct.toFixed(1);
        
        var match = window.CO_Filter.matchColorInPalette(c, namePool, usedNamesForList);
        var cName = match.name;
        
        // 🔥 新增：如果匹配到了颜色，且不是“无标准名称”，就拼上相似度
        if (cName !== t('noStandardName') && cName !== '未知') {
          if (match.isDuplicate || parseFloat(match.similarity) < 100) {
            cName += ' (' + match.similarity + ')';
          }
        }

        // 去重逻辑（放在拼接后缀之后，避免同名但不同相似度被误判）
        if (usedNamesForList.has(cName)) cName = cName + "·" + (idx + 1);
        usedNamesForList.add(cName);

        return '<div class="co-ratio co-tip" data-copy="' + c.hex + '" data-tip="' + copyTip(c.hex) + '">' +
          '<div class="co-ratio-info">' +
            '<div class="co-ratio-name">' + cName + '</div>' +
            '<div class="co-ratio-hex">' + c.hex + '</div>' +
          '</div>' +
          // ... 下面代码不动 ...
          '<div class="nm-bar-track"><div class="nm-bar-fill" style="width:' + barW.toFixed(1) + '%;background:' + c.hex + ';"></div></div>' +
          '<div class="co-ratio-percent">' + label + '%</div>' +
        '</div>';
      }).join('');
    }

    var main = set.colors.slice().sort(function (a, b) { return (b.count || 0) - (a.count || 0); })[0];
    
    var mainMatch = main ? window.CO_Filter.matchColorInPalette(main, namePool, new Set()) : null;
    var mainName = mainMatch ? mainMatch.name : '—';
    var mainPct = main ? Math.round((main.count || 1) / total * 100) : 0;
    
    if (main) {
      if ($('wheelColorName')) $('wheelColorName').textContent = mainName;
      if ($('wheelColorHex')) $('wheelColorHex').textContent = main.hex;
    }
    if ($('dominantFact')) $('dominantFact').textContent = mainPct + '%';

    var mood = computeMood(set.colors);
    if (mood) {
      setMetric('warm', mood.warm, state.mainRgb);
      setMetric('light', mood.light, state.mainRgb);
      setMetric('sat', mood.sat, state.mainRgb);

      var warmWord = moodWord(mood.warm, 0.38, 0.62, 'moodCool', 'moodBalanced', 'moodWarm');
      var lightWord = moodWord(mood.light, 0.34, 0.66, 'moodDark', 'moodMidLight', 'moodLight');
      var satWord = moodWord(mood.sat, 0.22, 0.55, 'moodPale', 'moodMidSat', 'moodRich');

      if ($('colorMood')) $('colorMood').textContent = [warmWord, lightWord, satWord].join(' · ');
      if ($('colorMoodCopy')) {
        $('colorMoodCopy').textContent = t('moodCopyFull', {
          warm: warmWord, light: lightWord, sat: satWord, name: mainName, pct: mainPct
        });
      }
    }

    if ($('complexityFact')) $('complexityFact').textContent = t('unitColors', { n: set.colors.length });
    var span = hueSpanOf(set.colors);
    if ($('spanFact')) $('spanFact').textContent = Math.round(span) + '°';
    if ($('honeyNote')) {
      $('honeyNote').textContent = span < 60 ? t('honeyNarrow') : span < 180 ? t('honeyMid') : t('honeyWide');
    }

    if ($('fingerprintStrip')) {
      $('fingerprintStrip').innerHTML = set.colors.slice(0, 12).map(function (c) {
        return '<i style="background:' + c.hex + ';"></i>';
      }).join('');
    }
    if ($('fingerprintCode')) {
      $('fingerprintCode').textContent = set.colors.slice(0, 4).map(function (c) {
        return c.hex.slice(1, 4);
      }).join(' · ');
    }
  }

  /* ---------- 图片提取 ---------- */
  function extractImage(file, onSuccess) {
    if (!file.type || file.type.indexOf('image/') !== 0) {
      U.toast(t('toastPickImage'), 'fail');
      return;
    }
    var ext = new window.CO_Extract.ColorExtractor();
    var reader = new FileReader();
    reader.onload = function (ev) {
      var img = new Image();
      img.onload = function () {
        var preview = $('preview-bg'); if (preview) preview.src = img.src;
        var drop = $('dropZone'); if (drop) drop.classList.add('has-image');
        onSuccess(ext.extract(img, 128));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  }

  global.CO_Render = {
    renderToneScale: renderToneScale,
    renderStripes: renderStripes,
    renderPreview: renderPreview,
    renderColorTable: renderColorTable,
    renderCssCode: renderCssCode,
    renderRuleCssCode: renderRuleCssCode,
    renderContrast: renderContrast,
    renderAnalysis: renderAnalysis,
    extractImage: extractImage
  };
})(window);