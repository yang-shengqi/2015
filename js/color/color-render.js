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

    var mainBtnBg   = mainRgb || (colors && colors[0]) || { r: 47, g: 111, b: 143 };
    var mainBtnText = textOn(mainBtnBg);
    
    var ruleBtnBg   = (ruleColors && ruleColors[0]) || mainBtnBg;
    var ruleBtnText = textOn(ruleBtnBg);

    function buildSandbox(colorSet, titleText, defaultBtnBg, defaultBtnText, isRulePreview) {
      if (!colorSet || !colorSet.length) return '';
      
      var stripesHtml = '<div style="display:flex;width:100%;height:1px;overflow:hidden;">';
      colorSet.forEach(function (c) { 
        stripesHtml += '<div style="flex:1;min-width:0;background:' + rgbToHex(c) + ';"></div>'; 
      });
      stripesHtml += '</div>';

      var sorted = colorSet.slice().sort(function (a, b) { return luminance(b) - luminance(a); });
      var lightest = pushLight(sorted[0], 0.92);
      var darkest = pushDark(sorted[sorted.length - 1], 0.22);
      
      var tagBg = isRulePreview ? colorSet[0] : (colorSet.length >= 4 ? colorSet[3] : colorSet[0]);
      
      var buttonsHtml = '';
      if (isRulePreview && colorSet.length > 0) {
        colorSet.forEach(function(c) {
          buttonsHtml += '<button style="padding:6px 12px;border-radius:4px;border:none;font-size:10px;font-weight:600;background:' + rgbToHex(c) + ';color:' + textOn(c) + ';margin-right:4px;">' + t('appPreviewBtnMain') + '</button>';
        });
      } else {
        buttonsHtml = 
          '<button style="padding:6px 12px;border-radius:4px;border:none;font-size:10px;font-weight:600;background:' + rgbToHex(defaultBtnBg) + ';color:' + defaultBtnText + ';">' + t('appPreviewBtnMain') + '</button>' +
          '<button style="padding:6px 12px;border-radius:4px;border:1px solid ' + rgbToHex(darkest) + ';font-size:10px;font-weight:600;background:transparent;color:' + rgbToHex(darkest) + ';">' + t('appPreviewBtnSub') + '</button>';
      }

      var uiHtml =
        '<div style="background:' + rgbToHex(lightest) + ';color:' + textOn(lightest) + ';padding:16px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">' +
          '<div>' +
            '<div style="margin-bottom:10px;"><span style="display:inline-block;background:' + rgbToHex(tagBg) + ';color:' + textOn(tagBg) + ';padding:3px 8px;border-radius:10px;font-size:10px;font-weight:600;">' + t('appPreviewTag') + '</span></div>' +
            '<p style="font-size:11px;line-height:1.5;margin:0 0 12px 0;opacity:0.85;">' + t('appPreviewText') + '</p>' +
          '</div>' +
          '<div style="display:flex;gap:6px;flex-wrap:wrap;">' +
            buttonsHtml +
          '</div>' +
        '</div>';

      return '<div style="flex:1;min-width:0;display:flex;flex-direction:column;border-radius:8px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.04);background:#fff;">' +
        '<div style="background:' + rgbToHex(darkest) + ';color:' + textOn(darkest) + ';padding:10px 16px;font-size:12px;font-weight:700;">' + titleText + '</div>' +
        stripesHtml + uiHtml +
      '</div>';
    }

    el.innerHTML = '<div style="display:flex;gap:16px;align-items:stretch;width:100%;box-sizing:border-box;">' +
      buildSandbox(colors, t('genPreviewOrigin'), mainBtnBg, mainBtnText, false) +
      buildSandbox(ruleColors, t('genPreviewRule'), ruleBtnBg, ruleBtnText, true) +
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
      
      return '<div class="co-data-row" style="margin-bottom: 8px;">' +
        '<div class="co-data-label" style="width: 130px;">' +
          '<div class="co-data-swatch" style="background:' + rgbToHex(p.fg) + ';color:' + textOn(p.fg) + ';display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;border:1px solid rgba(0,0,0,.08);border-radius: 6px; width: 28px; height: 28px;">Aa</div>' +
          '<span class="co-data-name" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + p.label + '</span>' +
        '</div>' +
        '<div class="co-data-values" style="flex: 1; min-width: 0;">' +
          '<div class="co-data-item" style="flex: 1;"><span class="co-data-text">' + r.toFixed(2) + ':1</span></div>' +
          '<div class="co-data-item" style="flex: 1;"><span class="co-contrast-badge ' + cls + '">' + label + '</span></div>' +
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

    Canvas.drawWheel(ctxW, set.colors.slice(0, 24), state.wheelConfig);
    Canvas.drawHex(ctxH, set.colors, state.hexConfig);

    var total = set.total || set.colors.reduce(function (s, c) { return s + (c.count || 1); }, 0);

    var libChecked = document.querySelector('input[name="lib"]:checked');
    var lib = libChecked ? libChecked.value : 'none';
    var palette = null;
    if (lib === 'cn') palette = window.CO_Names.CN_PALETTE;
    else if (lib === 'morandi') palette = window.CO_Names.MORANDI_PALETTE;
    else if (lib === 'jp') palette = window.CO_Names.JP_PALETTE;
    else if (lib === 'cyber') palette = window.CO_Names.CYBER_PALETTE;
    
    var namePool = palette || window.CO_Names.CN_PALETTE;
    var usedNamesForList = new Set();

    var list = $('ratioList');
    if (list) {
      list.innerHTML = set.colors.slice(0, 12).map(function (c, idx) {
        var pct = (c.count || 1) / total * 100, barW = Math.max(pct, 0.6);
        var label = pct < 0.6 ? '&lt;0.6' : pct.toFixed(1);
        
        var match = window.CO_Filter.matchColorInPalette(c, namePool, usedNamesForList);
        var cName = match.name;
        if (usedNamesForList.has(cName)) cName = cName + "·" + (idx + 1);
        usedNamesForList.add(cName);

        return '<div class="co-ratio co-tip" data-copy="' + c.hex + '" data-tip="' + copyTip(c.hex) + '">' +
          '<div class="co-ratio-info">' +
            '<div class="co-ratio-name">' + cName + '</div>' +
            '<div class="co-ratio-hex">' + c.hex + '</div>' +
          '</div>' +
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