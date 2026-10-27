/* ============================================================ 
 * color-i18n.js —— 照抄 economic-data-diagnostics 风格的稳定版
 * ============================================================ */
(function (global) {
  'use strict';

  var STORE_KEY = 'co-lang';

  var dict = {
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
      'moodWarm': '冷暖', 'moodMidLight': '明度', 'moodMidSat': '浓度', 'moodCopyFull': '上传图片后，这里会从冷暖、明暗与饱和度三个方向描述画面的视觉气质。', 'unitColors': '色彩密度', 'honeyWide': '色彩结构',
      
      // —— 真实组件预览（Dashboard）新增翻译 ——
      'demoBrandName': 'BrandName', 'demoDashboard': '控制台', 'demoDocs': '帮助文档', 'demoLogin': '登录',
      'demoHome': '首页', 'demoProducts': '产品', 'demoAbout': '关于', 'demoSettings': '设置',
      'demoHeroTitle': '让配色在真实组件里跑一遍', 'demoHeroDesc': '这上方是取自你 5 色卡生成的渐变背景。下方组件完美还原了网页中的真实占位与交互体验。',
      'demoStat1Title': '总访问量', 'demoStat1Val': '84,254', 'demoStat1Trend': '↑ 12.5% 较上周',
      'demoStat2Title': '卡片标题', 'demoStat2Val': '1,204', 'demoStat2Trend': '↑ 4.2% 较上周',
      'demoStat3Title': '转化率', 'demoStat3Val': '3.84%', 'demoStat3Trend': '持平',
      'demoTableTitle': '近期数据记录', 'demoExportBtn': '导出数据',
      'demoThOrder': '订单号', 'demoThCustomer': '客户', 'demoThStatus': '状态', 'demoThAmount': '金额',
      'demoName1': '张三', 'demoName2': '李四', 'demoStatus1': '已完成',
      'demoCopyright': '© 2024 Brand Inc.', 'demoRights': '保留所有权利。',
      // —— Web 真实组件预览字典 ——
      'wpBrandName': 'BrandName', 'wpCopyright': '© 2024 Brand Inc.', 'wpAllRightsReserved': '保留所有权利。',
      'webRoleBg': '背景', 'webRolePrimary': '主色', 'webRoleAccent': '强调色', 'webRoleText': '正文', 'webRoleBorder': '边框',
      'wpReq': '要求', 'wpTag': '标签', 'wpLogin': '登录', 'wpCardTitle': '卡片标题',
      'wpNavHome': '首页', 'wpNavProd': '产品', 'wpNavAbout': '关于',
      'wpSandboxTip': '👀 这是一个演示沙箱，用于预览真实组件效果',
      'wpHeroTitle': '让配色在真实组件里跑一遍',
      'wpHeroDesc': '这上方是取自你 5 色卡生成的渐变背景。下方组件完美还原了网页中的真实占位与交互体验。',
      'wpBtnPrimary': '主要操作',
      'wpConsole': '控制台', 'wpDocs': '帮助文档', 'wpSettings': '设置', 'wpUserCenter': '用户中心',
      'wpVisits': '总访问量', 'wpConversion': '转化率', 'wpVsLastWeek': '较上周', 'wpFlat': '持平',
      'wpRecentRecords': '近期数据记录', 'wpExportData': '导出数据',
      'wpOrderNo': '订单号', 'wpCustomer': '客户', 'wpStatus': '状态', 'wpAmount': '金额',
      'wpCompleted': '已完成', 'wpCancelled': '已取消',
      'wpDemoNames': '张三|李四|王五|赵六|孙七|周八', 'wpCurrency': '¥',
      'contrastTextBg': '正文 / 背景', 'contrastMutedBg': '次要文字 / 背景', 'contrastAccentBg': '强调色 / 背景', 'contrastOnPrimary': '主色上的文字', 'contrastBorderBg': '边框 / 背景',
      'copyTipPrefix': '点击复制 ', 'gradeLarge': '大字号', 'gradeFail': '不合格',
      'toastCopied': '已复制 {v}', 'toastCopyFail': '复制失败'
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
      'moodWarm': 'Warmth', 'moodMidLight': 'Lightness', 'moodMidSat': 'Saturation', 'moodCopyFull': 'Once an image is uploaded, this will describe the visual mood across temperature, lightness and saturation.', 'unitColors': 'Color Density', 'honeyWide': 'Color Structure',
      
      // —— 真实组件预览（Dashboard）新增翻译 ——
      'demoBrandName': 'BrandName', 'demoDashboard': 'Dashboard', 'demoDocs': 'Docs', 'demoLogin': 'Log in',
      'demoHome': 'Home', 'demoProducts': 'Products', 'demoAbout': 'About', 'demoSettings': 'Settings',
      'demoHeroTitle': 'Run the palette through real components', 'demoHeroDesc': 'The gradient background above is generated from your 5-color palette. The components below perfectly restore the layout and interactions of a real webpage.',
      'demoStat1Title': 'Total Visits', 'demoStat1Val': '84,254', 'demoStat1Trend': '↑ 12.5% vs last week',
      'demoStat2Title': 'Card Title', 'demoStat2Val': '1,204', 'demoStat2Trend': '↑ 4.2% vs last week',
      'demoStat3Title': 'Conversion Rate', 'demoStat3Val': '3.84%', 'demoStat3Trend': 'Flat',
      'demoTableTitle': 'Recent Records', 'demoExportBtn': 'Export Data',
      'demoThOrder': 'Order No.', 'demoThCustomer': 'Customer', 'demoThStatus': 'Status', 'demoThAmount': 'Amount',
      'demoName1': 'John Doe', 'demoName2': 'Jane Smith', 'demoStatus1': 'Completed',
      'demoCopyright': '© 2024 Brand Inc.', 'demoRights': 'All rights reserved.',
      // —— Web 真实组件预览字典 ——
      'wpBrandName': 'BrandName', 'wpCopyright': '© 2024 Brand Inc.', 'wpAllRightsReserved': 'All rights reserved.',
      'webRoleBg': 'Background', 'webRolePrimary': 'Primary', 'webRoleAccent': 'Accent', 'webRoleText': 'Text', 'webRoleBorder': 'Border',
      'wpReq': 'Req.', 'wpTag': 'Tag', 'wpLogin': 'Log in', 'wpCardTitle': 'Card Title',
      'wpNavHome': 'Home', 'wpNavProd': 'Products', 'wpNavAbout': 'About',
      'wpSandboxTip': '👀 This is a demo sandbox to preview real component effects',
      'wpHeroTitle': 'Put your palette through real components',
      'wpHeroDesc': 'The gradient above is generated from your 5-color palette. The components below simulate real UI interactions.',
      'wpBtnPrimary': 'Primary Action',
      'wpConsole': 'Console', 'wpDocs': 'Docs', 'wpSettings': 'Settings', 'wpUserCenter': 'User center',
      'wpVisits': 'Total visits', 'wpConversion': 'Conversion', 'wpVsLastWeek': 'vs last week', 'wpFlat': 'Flat',
      'wpRecentRecords': 'Recent Records', 'wpExportData': 'Export',
      'wpOrderNo': 'Order No.', 'wpCustomer': 'Customer', 'wpStatus': 'Status', 'wpAmount': 'Amount',
      'wpCompleted': 'Completed', 'wpCancelled': 'Cancelled',
      'wpDemoNames': 'Zhang San|Li Si|Wang Wu|Zhao Liu|Sun Qi|Zhou Ba', 'wpCurrency': '$',
      'contrastTextBg': 'Text / Background', 'contrastMutedBg': 'Muted / Background', 'contrastAccentBg': 'Accent / Background', 'contrastOnPrimary': 'Text on Primary', 'contrastBorderBg': 'Border / Background',
      'copyTipPrefix': 'Click to copy ', 'gradeLarge': 'Large text', 'gradeFail': 'Fail',
      'toastCopied': 'Copied {v}', 'toastCopyFail': 'Copy failed'
    }
  };

  function applyLang(lang) {
    lang = (lang === 'en') ? 'en' : 'zh';
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(STORE_KEY, lang);

    // 切换按钮高亮
    ['langBtn', 'langToggleMobile'].forEach(function(id) {
      var wrap = document.getElementById(id);
      if (!wrap) return;
      var zh = wrap.querySelector('.zh');
      var en = wrap.querySelector('.en');
      if (zh) zh.classList.toggle('active', lang === 'zh');
      if (en) en.classList.toggle('active', lang === 'en');
    });

    var d = dict[lang] || dict.zh;

    // 1. 处理 data-co-i18n / data-i18n
    document.querySelectorAll('[data-co-i18n], [data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-co-i18n') || el.getAttribute('data-i18n');
      if (!key || !d[key]) return;
      var val = d[key];
      
      var childNodes = el.childNodes;
      var replaced = false;
      for (var i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 3 && childNodes[i].nodeValue.trim()) {
          var lead = (childNodes[i].nodeValue.match(/^\s*/) || [''])[0];
          var trail = (childNodes[i].nodeValue.match(/\s*$/) || [''])[0];
          childNodes[i].nodeValue = lead + val + trail;
          replaced = true;
          break;
        }
      }
      if (!replaced && el.children.length === 0) {
        el.textContent = val;
      }
    });

    // 2. 处理 data-co-i18n-text
    document.querySelectorAll('[data-co-i18n-text]').forEach(function(el) {
      var key = el.getAttribute('data-co-i18n-text');
      if (!key || !d[key]) return;
      var val = d[key];
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

    // 3. 处理 aria-label
    document.querySelectorAll('[data-co-i18n-aria], [data-i18n-aria]').forEach(function(el) {
      var key = el.getAttribute('data-co-i18n-aria') || el.getAttribute('data-i18n-aria');
      if (key && d[key]) el.setAttribute('aria-label', d[key]);
    });

    // 4. 处理 title
    document.querySelectorAll('[data-co-i18n-title]').forEach(function(el) {
      var key = el.getAttribute('data-co-i18n-title');
      if (key && d[key]) el.setAttribute('title', d[key]);
    });

    // 5. 处理 placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key && d[key]) el.setAttribute('placeholder', d[key]);
    });

    // 页面标题
    if (d['pageTitle']) document.title = d['pageTitle'];
    var desc = document.querySelector('meta[name="description"]');
    if (desc && d['pageDesc']) desc.setAttribute('content', d['pageDesc']);

    // 通知其他动态组件（如渐变、色板预览）刷新文本
    document.dispatchEvent(new CustomEvent('co:langchange', { detail: { lang: lang } }));
  }

  // 兼容原有模块的调用方式，但内部逻辑已完全统一
  global.CO_I18N = {
    DICT: dict, 
    t: function(key, vars) {
      var lang = localStorage.getItem(STORE_KEY) || 'zh';
      var pack = dict[lang] || dict.zh;
      var val = pack[key] || dict.zh[key] || key;
      if (vars && typeof val === 'string') {
        val = val.replace(/\{(\w+)\}/g, function (m, k) {
          return vars[k] != null ? String(vars[k]) : m;
        });
      }
      return val;
    },
    getLang: function() { return localStorage.getItem(STORE_KEY) || 'zh'; },
    setLang: function(l){ applyLang(l); },
    toggle: function(){ applyLang((localStorage.getItem(STORE_KEY)||'zh') === 'zh' ? 'en' : 'zh'); },
    apply: function(l) { applyLang(l); }
  };
  
  global.I18N = {
    t: global.CO_I18N.t,
    lang: global.CO_I18N.getLang,
    applyLang: applyLang
  };

  // 统一使用 DOMContentLoaded 初始化，和 economic-data 保持一致
  document.addEventListener('DOMContentLoaded', function() {
    ['langBtn', 'langToggleMobile'].forEach(function(id) {
      var wrap = document.getElementById(id);
      if (!wrap) return;
      wrap.addEventListener('click', function() {
        var nextLang = (localStorage.getItem(STORE_KEY) === 'en') ? 'zh' : 'en';
        applyLang(nextLang);
      });
    });
    
    applyLang(localStorage.getItem(STORE_KEY) || 'zh');
  });

})(window);