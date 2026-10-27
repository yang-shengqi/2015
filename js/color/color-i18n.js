/* ============================================================ 
 * color-i18n.js —— 色彩分析工具 · 最终定稿版
 * ============================================================ */
(function (global) {
  'use strict';

  var STORE_KEY = 'co-lang';

  var DICT = {
    // ============================================================
    // 你自己的原版词典，我一个字都没改！！！
    // ============================================================
    zh: {
      'navHome': '首页', 'navThinking': '思维类', 'navThinking1': '乱世 · 生存与财富自由的实战宝典', 'navThinking2': '传承 · 家族后辈们的启蒙家书', 'navQuant': '量化类', 'navQuant1': '全球 · 市场量化工具工作台', 'navQuant2': '全球 · 全天候永久投资组合', 'navQuant3': '美国 · Charles Schwab 仪表盘', 'navDiagnose': '诊断类', 'navDiagnose1': 'WJP · 法治指数地图', 'navDiagnose2': '经济数据 · 趋势与真实性检验', 'navDiagnose3': '思维 · 人类思维盲区诊断工具', 'navDiagnose4': '诊断 · 文明等级在线评分器', 'navUtility': '实用类', 'navUtility1': '色彩 · 色彩分析工具', 'navUtility2': '加密 · 网页军功级加密工具', 'brandName': '核心工具箱',
      'pageTitle': '色彩分析工具 · 提取 / 配色 / 渐变', 'pageDesc': '从图片提取配色、生成配色方案与渐变，支持中国传统色匹配与 ACO / ASE 导出，全部在浏览器本地完成。',
      'heroEyebrow': 'intelligent color analysis', 'heroTitleA': '从一张图，', 'heroTitleB': '看见完整的色彩语言', 'heroLedeA': '取色、配色、转换、检测，一站完成。', 'heroLedeB': '提取画面主色、分析占比并匹配中国传统色名，几秒生成蜂窝色板与专业配色报告。',
      'trustLocal': '浏览器本地分析', 'trustNoUpload': '图片不会上传', 'trustFree': '免费即时生成', 'uploadHead': '上传图片开始分析', 'localTag': '本地处理', 'dropTitle': '拖入图片，立即提取配色', 'dropHint': '支持 JPG、PNG、WEBP，分析过程仅在当前设备完成', 'dropCta': '选择图片', 'dropAria': '上传图片',
      'footNoSignup': '无需注册', 'footExport': '支持导出 ACO / ASE', 'footStay': '原图不离开设备', 'resultsTitle': '色彩分析结果', 'resultsSub': '点击任意色块或数值即可复制', 'stamp': '本地分析', 'cardDist': '色彩分布', 'saveBig': '保存大图', 'labelBg': '背景', 'labelStroke': '描边',
      'titlePaper': '纸色', 'titleWhite': '纯白', 'titleTransparent': '透明', 'ariaStrokeToggle': '显示描边', 'ariaStrokeColor': '描边颜色', 'readingMood': '色彩气质解读 ', 'readingAlgo': '算法推导', 'moodDefault': '等待图片分析',
      'moodCopyDefault': '上传图片后，这里会从冷暖、明暗与饱和度三个方向描述画面的视觉气质。', 'metricWarm': '冷暖', 'metricLight': '明度', 'metricSat': '浓度', 'cardRatio': '色彩占比', 'cardHex': '蜂窝色板', 'readingFingerprint': '色彩指纹 ', 'waitingGen': '等待生成',
      'factDominant': '主色占比', 'factSpan': '色相跨度', 'factComplex': '色彩密度', 'honeyNoteDefault': '蜂窝色板生成后，这里会概括画面的色彩结构与使用建议。', 'dlAco': '下载 PS 色板 (.ACO)', 'dlAse': '下载 Adobe 通用 (.ASE)',
      'genTitle': '配色方案生成器', 'genDesc': '选一个主色，按色相环规则生成 5 色配色。计算在 OKLCH 色彩空间里进行，同一套配色的明暗更均衡。', 'labelMain': '主色', 'ariaMainColor': '选择主色', 'ariaMainHex': '主色色值', 'labelRule': '配色规则',
      'ruleComp': '互补', 'ruleAnalog': '类似', 'ruleTriad': '三角', 'ruleSplit': '分裂互补', 'ruleSquare': '四方', 'ruleMono': '单色', 'labelLib': '色库限制', 'libCn': '中式色', 'libJp': '日式色', 'libMorandi': '莫兰迪', 'libCyber': '赛博色', 'libNone': '无限制',
      'btnRandom': '随机', 'labelValues': '色彩数值', 'clickCopy': '点击任意数值复制', 'checkTitle': '可读性检测', 'wcag': 'WCAG 2.1', 'previewTitle': '界面预览', 'contrastText': '正文对比度', 'contrastPrimaryPaper': '主色 vs 纸色', 'contrastPrimaryWhite': '主色 vs 纯白',
      'contrastInverse': '反色对比度', 'gradeLarge': '大字及格', 'gradeFail': '不达标', 'genPreviewOrigin': '原色预览', 'genPreviewRule': '演化预览', 'appPreviewTag': '标签', 'appPreviewText': '这是一段基于当前配色的文字预览，用于展示正文阅读效果。', 'appPreviewBtnMain': '主要按钮', 'appPreviewBtnSub': '次要按钮',
      'stopsPos': '位置', 'stopDel': '删除', 'ruleStopWait': '等待演化色生成...', 'toastPresetApplied': '已应用预设：{name}', 'gradTitle': '渐变色生成器', 'gradDesc': '设置 2 到 10 个颜色，生成 CSS 渐变代码或背景图。“平滑过渡”会在 OKLab 空间里补间，避免两种颜色中间出现发灰的过渡带。',
      'labelType': '类型', 'typeLinear': '线性', 'typeRadial': '径向', 'typeConic': '锥形', 'labelAngle': '角度', 'smooth': '平滑过渡（OKLab）', 'stopsTitle': '色标', 'addColor': '添加颜色', 'gradMainTag': '主色渐变 (联动全局)', 'gradRuleTag': '演化色渐变',
      'btnRandomGrad': '随机渐变', 'dlPng': '下载 PNG', 'webTitle': '网页配色方案', 'webDesc': '从全局主色派生五个界面角色：背景、主色、强调色、正文、边框。下方预览真实组件效果，并导出可继续调整的 CSS 变量。', 'webRoles': '五个界面角色', 'webPreview': '真实组件预览', 'webVars': 'CSS 变量（可继续调整）', 'copyCssVars': '复制 CSS 变量',
      'webCheck': '对比度自检', 'webCheckSub': 'WCAG 2.1 · 不达标的已自动修正', 'footTitle': '色彩分析工具', 'foot1': '本地解析 · 不上传图片', 'foot2': '中国传统色匹配', 'foot3': 'ACO / ASE 色板导出', 'footEnd': 'END OF PAGE',
      'genCssOrigin': '原色 CSS 变量', 'genCssRule': '演化 CSS 变量', 'copyOriginCss': '复制原色 CSS', 'copyOriginHex': '复制原色 HEX', 'copyRuleCss': '复制演化 CSS', 'copyRuleHex': '复制演化 HEX', 'ariaOriginCss': '原色 CSS 变量代码', 'ariaRuleCss': '演化 CSS 变量代码',
      'moodWarm': '冷暖', 'moodMidLight': '明度', 'moodMidSat': '浓度', 'moodCopyFull': '上传图片后，这里会从冷暖、明暗与饱和度三个方向描述画面的视觉气质。', 'unitColors': '色彩密度', 'honeyWide': '色彩结构'
    },
    en: {
      'navHome': 'Home', 'navThinking': 'Thinking', 'navThinking1': 'Survival & Wealth Bible', 'navThinking2': 'Legacy Letters', 'navQuant': 'Quant', 'navQuant1': 'Global Market Dashboard', 'navQuant2': 'All-Weather Portfolio', 'navQuant3': 'Charles Schwab Dashboard', 'navDiagnose': 'Diagnostics', 'navDiagnose1': 'WJP Rule of Law Map', 'navDiagnose2': 'Economic Data Diagnostics', 'navDiagnose3': 'Cognitive Blind Spots', 'navDiagnose4': 'Civilization Scorer', 'navUtility': 'Utilities', 'navUtility1': 'Color Analysis', 'navUtility2': 'HTML Encrypter', 'brandName': 'Core Toolbox',
      'pageTitle': 'Color Analysis Tool · Extract / Palette / Gradient', 'pageDesc': 'Extract palettes from images, generate color schemes and gradients, match Chinese traditional colors, and export ACO / ASE — all in your browser.',
      'heroEyebrow': 'intelligent color analysis', 'heroTitleA': 'From one image, ', 'heroTitleB': 'see the full language of color', 'heroLedeA': 'Extract, harmonize, convert and audit — all in one place.', 'heroLedeB': 'Pull dominant colors, measure coverage, match traditional Chinese color names, and generate a honeycomb palette plus a professional color report in seconds.',
      'trustLocal': 'Runs in your browser', 'trustNoUpload': 'Images never uploaded', 'trustFree': 'Free and instant', 'uploadHead': 'Upload an image to begin', 'localTag': 'Local only', 'dropTitle': 'Drop an image to extract its palette', 'dropHint': 'JPG, PNG or WEBP. Analysis happens entirely on this device.', 'dropCta': 'Choose image', 'dropAria': 'Upload image',
      'footNoSignup': 'No sign-up', 'footExport': 'ACO / ASE export', 'footStay': 'Original never leaves', 'resultsTitle': 'Color Analysis Results', 'resultsSub': 'Click any swatch or value to copy', 'stamp': 'LOCAL ANALYSIS', 'cardDist': 'Color Distribution', 'saveBig': 'Save image', 'labelBg': 'Background', 'labelStroke': 'Stroke',
      'titlePaper': 'Paper', 'titleWhite': 'White', 'titleTransparent': 'Transparent', 'ariaStrokeToggle': 'Show stroke', 'ariaStrokeColor': 'Stroke color', 'readingMood': 'Color Mood ', 'readingAlgo': 'Auto Analysis', 'moodDefault': 'Waiting for an image',
      'moodCopyDefault': 'Once an image is uploaded, this will describe the visual mood across temperature, lightness and saturation.', 'metricWarm': 'Warmth', 'metricLight': 'Lightness', 'metricSat': 'Saturation', 'cardRatio': 'Color Coverage', 'cardHex': 'Honeycomb Palette', 'readingFingerprint': 'Color Fingerprint ', 'waitingGen': 'Pending',
      'factDominant': 'Dominant share', 'factSpan': 'Hue span', 'factComplex': 'Color density', 'honeyNoteDefault': 'After the honeycomb palette is generated, this will summarize the color structure and suggest how to use it.', 'dlAco': 'Download PS Swatch (.ACO)', 'dlAse': 'Download Adobe Swatch (.ASE)',
      'genTitle': 'Palette Generator', 'genDesc': 'Pick a base color and build a 5-color palette from a hue-wheel rule. Computation runs in OKLCH, so lightness stays balanced across the set.', 'labelMain': 'Base color', 'ariaMainColor': 'Choose base color', 'ariaMainHex': 'Base color value', 'labelRule': 'Harmony rule',
      'ruleComp': 'Complementary', 'ruleAnalog': 'Analogous', 'ruleTriad': 'Triadic', 'ruleSplit': 'Split', 'ruleSquare': 'Square', 'ruleMono': 'Monochrome', 'labelLib': 'Limit to library', 'libCn': 'Chinese', 'libJp': 'Japanese', 'libMorandi': 'Morandi', 'libCyber': 'Cyberpunk', 'libNone': 'No Limit',
      'btnRandom': 'Random', 'labelValues': 'Color Values', 'clickCopy': 'Click any value to copy', 'checkTitle': 'Readability Check', 'wcag': 'WCAG 2.1', 'previewTitle': 'UI Preview', 'genPreviewOrigin': 'Original Preview', 'genPreviewRule': 'Harmony Preview', 'appPreviewTag': 'Tag', 'appPreviewText': 'This is a text preview based on the current palette to show the reading effect.', 'appPreviewBtnMain': 'Primary Btn', 'appPreviewBtnSub': 'Secondary Btn',
      'contrastText': 'Text Contrast', 'contrastPrimaryPaper': 'Primary vs Paper', 'contrastPrimaryWhite': 'Primary vs White', 'contrastInverse': 'Inverse Contrast', 'gradeLarge': 'Large Text Only', 'gradeFail': 'Fail', 'stopsPos': 'Pos', 'stopDel': 'Delete', 'ruleStopWait': 'Waiting for harmony colors...', 'toastPresetApplied': 'Preset applied: {name}',
      'gradTitle': 'Gradient Generator', 'gradDesc': 'Set 2 to 10 colors and generate CSS gradient code or a background image. “Smooth blending” interpolates in OKLab to avoid a muddy band between two colors.', 'labelType': 'Type', 'typeLinear': 'Linear', 'typeRadial': 'Radial', 'typeConic': 'Conic', 'labelAngle': 'Angle', 'smooth': 'Smooth blending (OKLab)', 'stopsTitle': 'Color Stops', 'addColor': 'Add color', 'gradMainTag': 'Primary Gradient (Linked)', 'gradRuleTag': 'Harmony Gradient', 'btnRandomGrad': 'Random Gradient', 'dlPng': 'Download PNG',
      'webTitle': 'Web Palette Scheme', 'webDesc': 'Derive five UI roles from a single base color: background, primary, accent, text and border. Preview real components below and export CSS variables you can keep tuning.', 'webRoles': 'Five UI Roles', 'webPreview': 'Real Component Preview', 'webVars': 'CSS Variables (tunable)', 'copyCssVars': 'Copy CSS variables', 'webCheck': 'Contrast Self-Check', 'webCheckSub': 'WCAG 2.1 · failing pairs auto-corrected',
      'footTitle': 'Color Analysis Tool', 'foot1': 'Local parsing · no uploads', 'foot2': 'Chinese traditional color matching', 'foot3': 'ACO / ASE swatch export', 'footEnd': 'END OF PAGE', 'genCssOrigin': 'Original CSS Variables', 'genCssRule': 'Harmony CSS Variables', 'copyOriginCss': 'Copy original CSS', 'copyOriginHex': 'Copy original HEX', 'copyRuleCss': 'Copy harmony CSS', 'copyRuleHex': 'Copy harmony HEX', 'ariaOriginCss': 'Original CSS variables code', 'ariaRuleCss': 'Harmony CSS variables code',
      'moodWarm': 'Warmth', 'moodMidLight': 'Lightness', 'moodMidSat': 'Saturation', 'moodCopyFull': 'Once an image is uploaded, this will describe the visual mood across temperature, lightness and saturation.', 'unitColors': 'Color Density', 'honeyWide': 'Color Structure'
    }
  };

  var current = 'zh';

  function t(key, vars) {
    var pack = DICT[current] || DICT.zh;
    var val = pack[key] || DICT.zh[key] || key;
    if (vars && typeof val === 'string') {
      val = val.replace(/\{(\w+)\}/g, function (m, k) {
        return vars[k] != null ? String(vars[k]) : m;
      });
    }
    return val;
  }

  function getLang() { return current; }

  function applyText() {
    document.querySelectorAll('[data-co-i18n]').forEach(function(el) {
      el.textContent = t(el.getAttribute('data-co-i18n'));
    });
    document.querySelectorAll('[data-co-i18n-text]').forEach(function(el) {
      var key = el.getAttribute('data-co-i18n-text');
      var val = t(key);
      var nodes = el.childNodes;
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeType === 3 && nodes[i].nodeValue.trim()) {
          var lead = (nodes[i].nodeValue.match(/^\s*/) || [''])[0];
          var trail = (nodes[i].nodeValue.match(/\s*$/) || [''])[0];
          nodes[i].nodeValue = lead + val + trail;
          break;
        }
      }
    });
    document.querySelectorAll('[data-co-i18n-aria]').forEach(function(el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-co-i18n-aria')));
    });
    document.querySelectorAll('[data-co-i18n-title]').forEach(function(el) {
      el.setAttribute('title', t(el.getAttribute('data-co-i18n-title')));
    });
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (!val || val === key) return;
      var childNodes = el.childNodes;
      var replaced = false;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 3 && childNodes[i].nodeValue.trim()) {
          childNodes[i].nodeValue = val;
          replaced = true;
          break;
        }
      }
      if (!replaced && el.children.length === 0) {
        el.textContent = val;
      }
    });
  }

  function applyMeta() {
    document.title = t('pageTitle');
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t('pageDesc'));
  }

  function translatePalettes(lang) {
    if (!global.CO_Names) return;
    var keys = ['CN_PALETTE', 'JP_PALETTE', 'MORANDI_PALETTE', 'CYBER_PALETTE'];
    for (var i = 0; i < keys.length; i++) {
      var pal = global.CO_Names[keys[i]];
      if (!pal) continue;
      for (var j = 0; j < pal.length; j++) {
        var c = pal[j];
        if (!c._zh) c._zh = c.name;
        c.name = (lang === 'en') ? (c._en || c._zh) : c._zh;
      }
    }
  }

  function apply(lang, opts) {
    current = (lang === 'en') ? 'en' : 'zh';
    var root = document.documentElement;
    root.lang = (current === 'en') ? 'en' : 'zh-CN';
    root.setAttribute('data-lang', current);
    
    translatePalettes(current);
    applyText();
    applyMeta();
    
    if (!opts || !opts.silent) { 
      try { localStorage.setItem(STORE_KEY, current); } catch (e) {} 
    }
    
    document.dispatchEvent(new CustomEvent('co:langchange', { detail: { lang: current } }));
  }

  // ============================================================
  // ★ 最终完全自洽逻辑，只依赖自己
  // ============================================================
  var lang = (document.documentElement.lang || 'zh').toLowerCase().indexOf('en') === 0 ? 'en' : 'zh';

  function applyLang(next) {
    lang = next;
    current = next;
    document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN';

    // 1. 翻译文字
    translatePalettes(current);
    applyText();
    applyMeta();

    // 2. 点亮按钮（你原本的 CSS 里就是用 .active 点亮的）
    var zhEl = document.querySelector('#langBtn .zh');
    var enEl = document.querySelector('#langBtn .en');
    if (zhEl && enEl) {
      zhEl.classList.toggle('active', next === 'zh');
      enEl.classList.toggle('active', next === 'en');
    }

    try { localStorage.setItem(STORE_KEY, next); } catch (e) {}
  }

  // 3. 完美双向循环，点哪切哪，不需要判断
  var langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = lang === 'zh' ? 'en' : 'zh';
      applyLang(next);
    });
  }

  // 4. 初始化
  applyLang(lang);

  global.CO_I18N = {
    DICT: DICT, t: t, getLang: function() { return lang; }, setLang: function(l){ applyLang(l); },
    toggle: function(){ applyLang(lang === 'zh' ? 'en' : 'zh'); },
    apply: function(l) { applyLang(l); }
  };
})(window);