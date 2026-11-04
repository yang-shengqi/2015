/* ============================================================ 
 * color-i18n.js —— 色彩工具全量词典 (深度重构版)
 * 已清理重复键，补全 HSL/LCH 及各种 Tooltip 词条。
 * ============================================================ */
(function (global) {
  'use strict';

  var STORE_KEY = 'co-lang';

  var dict = {
    zh: {
      // ==================== 全局与导航 ====================
      'navHome': '首页', 'navThinking': '思维类', 'navThinking1': '乱世 · 生存与财富自由的实战宝典', 'navThinking2': '传承 · 家族后辈们的启蒙家书', 'navQuant': '量化类', 'navQuant1': '全球 · 市场量化工具工作台', 'navQuant2': '全球 · 全天候永久投资组合', 'navQuant3': '美国 · Charles Schwab 仪表盘', 'navDiagnose': '诊断类', 'navDiagnose1': 'WJP · 法治指数地图', 'navDiagnose2': '经济 · 数据趋势与真实性检验', 'navDiagnose3': '思维 · 人类思维盲区诊断工具', 'navDiagnose4': '诊断 · 文明等级在线评分器', 'navUtility': '实用类', 'navUtility1': '专业色彩分析工具', 'navUtility2': '加密 · 网页军功级加密工具', 'brandName': '杨晟琦 · 独立思想锚点','brandNameb': '国际标准色彩分析工具',
      'pageTitle': '色彩分析工具 · 提取 / 配色 / 渐变', 'pageDesc': '基于 OKLCH 国际标准色彩空间与 WCAG 2.2 规范，在浏览器本地完成图片主色提取、专业配色生成与无障碍报告。',
      'ariaSkip': '跳到主内容', 'ariaBackTop': '返回顶部',
      'mobileNavTitle': '全站导航', 'mobileGroupThink': '思维工具', 'mobileGroupQuant': '量化工具', 'mobileGroupDiag': '诊断工具', 'mobileGroupUtil': '实用工具',
      'navNavGen': '配色方案',
      'navNavPhone': '手机预览',
      'navNavPreview': '界面预览',
      'navNavGrad': '渐变生成',
      'navNavWeb': '网页配色','labelMetric': '明度：',

      // ==================== 首屏与上传 ====================
      'heroEyebrow': 'intelligent color analysis', 'heroTitleA': '从一张图，', 'heroTitleB': '看见完整的色彩语言', 'heroLedeA': '取色、配色、转换、检测，一站完成。', 'heroLedeB': '基于国际标准的 OKLCH 色彩空间与 WCAG 2.2 规范，精准提取画面主色，生成专业级色板与无障碍配色报告。',
      'trustLocal': '浏览器本地分析', 'trustNoUpload': '图片不会上传', 'trustFree': '免费即时生成', 'trustOKLCH': 'OKLab / OKLCH 调色', 'trustWCAG': 'WCAG 2.2 对比度检测', 'trustPalette': '5 维全域色彩匹配', 'trustExport': 'ACO / ASE 工业级导出',
      'uploadHead': '上传图片开始分析', 'localTag': '本地处理', 'dropTitle': '拖入图片，立即提取配色', 'dropHint': '支持 JPG、PNG、WEBP，分析过程仅在当前设备完成', 'dropCta': '选择图片', 'dropAria': '上传图片',
      'footNoSignup': '无需注册', 'footExport': '支持导出 ACO / ASE', 'footStay': '原图不离开设备',

      // ==================== 分析结果与画布 ====================
      'resultsTitle': '色彩分析结果', 'resultsSub': '点击任意色块或数值即可复制', 'stamp': '本地分析', 'cardDist': '色彩分布', 'saveBig': '保存大图', 
      'labelBg': '背景', 'labelStroke': '描边', 'titlePaper': '纸色', 'titleWhite': '纯白', 'titleTransparent': '透明', 'ariaStrokeToggle': '显示描边', 'ariaStrokeColor': '描边颜色',
      'cardRatio': '色彩占比', 'cardHex': '蜂窝色板', 'dlAco': '下载 PS 色板 (.ACO)', 'dlAse': '下载 Adobe 通用 (.ASE)',

      // ==================== 色彩气质与指纹 ====================
      'readingMood': '色彩气质解读 ', 'readingAlgo': '算法推导', 'moodDefault': '等待图片分析', 'moodCopyDefault': '上传图片后，这里会从冷暖、明暗与饱和度三个方向描述画面的视觉气质。',
      'metricWarm': '冷暖', 'metricLight': '明度', 'metricSat': '浓度',
      'moodWarm': '暖色', 'moodCool': '冷色', 'moodBalanced': '冷暖均衡', 'moodLight': '明亮', 'moodDark': '暗沉', 'moodMidLight': '中等明度', 'moodRich': '高饱和', 'moodPale': '低饱和', 'moodMidSat': '中等饱和度',
      'moodCopyFull': '主色为 {name}，占比 {pct}%。整体画面呈现 {warm}、{light}、{sat} 的视觉感受。',
      'readingFingerprint': '色彩指纹 ', 'waitingGen': '等待生成', 'factDominant': '主色占比', 'factSpan': '色相跨度', 'factComplex': '色彩密度', 'unitColors': '色彩密度', 
      'honeyNarrow': '色相集中，适合做单色系设计', 'honeyMid': '色彩丰富，有一定的视觉层次', 'honeyWide': '色相跨度大，视觉冲击力强', 'honeyNoteDefault': '蜂窝色板生成后，这里会概括画面的色彩结构与使用建议。',

      // ==================== 配色方案生成器 ====================
      'genTitle': '配色方案生成器', 'genDesc': '选一个主色，按色相环规则生成 5 色配色。计算在 OKLCH 色彩空间里进行，同一套配色的明暗更均衡。',
      'labelMain': '主色', 'ariaMainColor': '选择主色', 'ariaMainHex': '主色色值', 'labelRule': '配色规则', 'labelLib': '色库限制', 'btnRandom': '随机',
      'ruleComp': '互补', 'ruleAnalog': '类似', 'ruleTriad': '三角', 'ruleSplit': '分裂互补', 'ruleSquare': '四方', 'ruleMono': '灰度',
      'libCn': '中式色', 'libJp': '日式色', 'libMorandi': '莫兰迪', 'libCyber': '赛博色', 'libNone': '无限制',
      'libNameCn': '中式色库', 'libNameMorandi': '莫兰迪色库', 'libNameJp': '日式色库', 'libNameCyber': '赛博色库', 'libNameNone': '无限制色库','phonePreviewTitle': '手机界面预览',
      
      // 配色衍生标签
      'labelPrimary': '主色：', 'noStandardName': '无标准名称', 'actualHue': '实', 'ruleColon': '：',
      'primaryPct': '主色占比：', 'secondaryPct': '辅色占比：', 'monoPct': '灰度：',
      'ruleCompShort': '补色', 'ruleAnalogShort': '类似', 'ruleTriadShort': '三角', 'ruleSplitShort': '分裂', 'ruleSquareShort': '四方', 'ruleMonoShort': '灰度',
      'labelPct80': '明度：80%', 'labelPct60': '明度：60%', 'labelPct40': '明度：40%', 'labelPct20': '明度：20%',
      'titleMainStripe': '主色色卡', 'titleRuleStripe': '主色衍生',

      // ==================== 色彩数值与预览 ====================
      'labelValues': '色彩数值', 'clickCopy': '点击任意数值复制', 'previewTitle': '界面预览',
      'genPreviewOrigin': '原色预览', 'genPreviewRule': '演化预览', 'appPreviewTag': '标签', 'appPreviewText': '这是一段基于当前配色的文字预览，用于展示正文阅读效果。', 'appPreviewBtnMain': '主要按钮', 'appPreviewBtnSub': '次要按钮',
      'genCssOrigin': '原色 CSS 变量', 'genCssRule': '演化 CSS 变量', 'copyOriginCss': '复制原色 CSS', 'copyOriginHex': '复制原色 HEX', 'copyRuleCss': '复制演化 CSS', 'copyRuleHex': '复制演化 HEX', 'ariaOriginCss': '原色 CSS 变量代码', 'ariaRuleCss': '演化 CSS 变量代码',

      // ==================== 对比度检测 ====================
      'contrastLeftTitle': '主色可读性检测', 'contrastRightTitle': '衍生色可读性检测', 'contrastMainVsBg': '主色 vs 背景', 'contrastStepVsBg': '色阶 {n} vs 背景', 'contrastRuleVsBg': '衍生 {n} vs 背景',
      'gradeLarge': '大字号', 'gradeFail': '不合格',

      // ==================== 渐变色生成器 ====================
      'gradTitle': '渐变色生成器', 'gradDesc': '设置 2 到 10 个颜色，生成 CSS 渐变代码或背景图。“平滑过渡”会在 OKLab 空间里补间，避免两种颜色中间出现发灰的过渡带。',
      'labelType': '类型', 'typeLinear': '线性', 'typeRadial': '径向', 'typeConic': '锥形', 'labelAngle': '角度', 'smooth': '平滑过渡（OKLab）', 'btnRandomGrad': '随机渐变',
      'stopsTitle': '色标', 'stopsPos': '位置', 'stopDel': '删除', 'addColor': '添加颜色', 'ruleStopWait': '等待演化色生成...', 'gradMainTag': '主色渐变 (联动全局)', 'gradRuleTag': '演化色渐变', 'dlPng': '下载 PNG',

      // ==================== 网页配色方案与预览 ====================
      'webTitle': '网页配色方案', 'webDesc': '从全局主色派生五个界面角色：背景、主色、强调色、正文、边框。下方预览真实组件效果，并导出可继续调整的 CSS 变量。', 
      'webRoles': '五个界面角色', 'webPreview': '真实组件预览', 'webVars': 'CSS 变量（可继续调整）', 'copyCssVars': '复制 CSS 变量', 'webCheck': '对比度自检', 'webCheckSub': 'WCAG 2.2 标准检测',
      'webRoleBg': '背景', 'webRolePrimary': '主色', 'webRoleAccent': '强调色', 'webRoleText': '正文', 'webRoleBorder': '边框',
      'contrastTextBg': '正文 / 背景', 'contrastMutedBg': '次要文字 / 背景', 'contrastAccentBg': '强调色 / 背景', 'contrastOnPrimary': '主色上的文字', 'contrastBorderBg': '边框 / 背景',
      'wpBrandName': 'BrandName', 'wpCopyright': '© 2024 Brand Inc.', 'wpAllRightsReserved': '保留所有权利。',
      'wpReq': '要求', 'wpTag': '标签', 'wpLogin': '登录', 'wpCardTitle': '卡片标题', 'wpNavHome': '首页', 'wpNavProd': '产品', 'wpNavAbout': '关于',
      'wpSandboxTip': '👀 这是一个演示沙箱，用于预览真实组件效果', 'wpHeroTitle': '让配色在真实组件里跑一遍', 'wpHeroDesc': '这上方是取自你 5 色卡生成的渐变背景。下方组件完美还原了网页中的真实占位与交互体验。', 'wpBtnPrimary': '主要操作',
      'wpConsole': '控制台', 'wpDocs': '帮助文档', 'wpSettings': '设置', 'wpUserCenter': '用户中心', 'wpVisits': '总访问量', 'wpConversion': '转化率', 'wpVsLastWeek': '较上周', 'wpFlat': '持平',
      'wpRecentRecords': '近期数据记录', 'wpExportData': '导出数据', 'wpOrderNo': '订单号', 'wpCustomer': '客户', 'wpStatus': '状态', 'wpAmount': '金额', 'wpCompleted': '已完成', 'wpCancelled': '已取消', 'wpDemoNames': '张三|李四|王五|赵六|孙七|周八', 'wpCurrency': '¥',

      // ==================== 取色器扩展面板 ====================
      'tipMainColor': '点击选择颜色 / 输入 HEX 色值',
      'tipHsl': '传统 HSL 调色 (数学亮度)',
      'tipOklch': '感知 OKLCH 调色 (视觉等亮)',
      'panelHslTitle': '传统 HSL',
      'panelOklchTitle': '感知 OKLCH',
      'btnEyeDropper': '从屏幕取色',

      // ==================== 提示与公用 ====================
      'copyTipPrefix': '点击复制 ', 'toastCopied': '已复制 {v}', 'toastCopyFail': '复制失败', 'toastPickImage': '请选择图片文件',
      'toastExportFail': '导出失败', 'toastGradDl': '渐变图已保存', 'toastWheelDl': '色轮图已保存', 'toastHexDl': '蜂窝图已保存', 'toastDelMin': '至少保留两个色标', 'toastMaxStops': '最多 10 个色标', 'toastMaxRuleStops': '衍生色标最多 10 个', 'toastRuleDlTodo': '开发中', 'toastRandomOk': '已生成随机渐变', 'toastRandomFail': '随机生成失败', 'toastPresetApplied': '已应用预设：{name}',
      'footTitle': '色彩分析工具', 'foot1': '本地解析 · 不上传图片', 'foot2': '国际标准色彩匹配', 'foot3': 'ACO / ASE 色板导出', 'footEnd': 'END OF PAGE'
    },

    en: {
      // ==================== 全局与导航 ====================
      'navHome': 'Home', 'navThinking': 'Thinking', 'navThinking1': 'Survival & Wealth Bible', 'navThinking2': 'Legacy Letters', 'navQuant': 'Quant', 'navQuant1': 'Global Market Dashboard', 'navQuant2': 'All-Weather Portfolio', 'navQuant3': 'Charles Schwab Dashboard', 'navDiagnose': 'Diagnostics', 'navDiagnose1': 'WJP Rule of Law Map', 'navDiagnose2': 'Economic Data Diagnostics', 'navDiagnose3': 'Cognitive Blind Spots', 'navDiagnose4': 'Civilization Scorer', 'navUtility': 'Utilities', 'navUtility1': 'Color Analysis', 'navUtility2': 'HTML Encrypter', 'brandName': 'Yang Shengqi · The Intellectual Anchor', 'brandNameb': 'International Standard Color Analyzer',
      'pageTitle': 'Color Analysis Tool · Extract / Palette / Gradient', 'pageDesc': 'Based on OKLCH and WCAG 2.2, extract image colors, generate palettes and gradients, and export ACO/ASE — all locally in your browser.',
      'ariaSkip': 'Skip to main', 'ariaBackTop': 'Back to top',
      'mobileNavTitle': 'Navigation', 'mobileGroupThink': 'Thinking', 'mobileGroupQuant': 'Quant', 'mobileGroupDiag': 'Diagnostics', 'mobileGroupUtil': 'Utilities',
      'navNavGen': 'Palette',
      'navNavPhone': 'Phone Preview',
      'navNavPreview': 'UI Preview',
      'navNavGrad': 'Gradient',
      'navNavWeb': 'Web Palette','labelMetric': 'Lightness: ',

      // ==================== 首屏与上传 ====================
      'heroEyebrow': 'intelligent color analysis', 'heroTitleA': 'From one image, ', 'heroTitleB': 'see the full language of color', 'heroLedeA': 'Extract, harmonize, convert and audit — all in one place.', 'heroLedeB': 'Built on the OKLCH color space and WCAG 2.2 standards, pull dominant colors and generate professional, accessible palettes.',
      'trustLocal': 'Runs in your browser', 'trustNoUpload': 'Images never uploaded', 'trustFree': 'Free and instant', 'trustOKLCH': 'OKLab / OKLCH Engine', 'trustWCAG': 'WCAG 2.2 Compliant', 'trustPalette': '5-Dimensional Color Mapping', 'trustExport': 'ACO / ASE Export',
      'uploadHead': 'Upload an image to begin', 'localTag': 'Local only', 'dropTitle': 'Drop an image to extract its palette', 'dropHint': 'JPG, PNG or WEBP. Analysis happens entirely on this device.', 'dropCta': 'Choose image', 'dropAria': 'Upload image',
      'footNoSignup': 'No sign-up', 'footExport': 'ACO / ASE export', 'footStay': 'Original never leaves',

      // ==================== 分析结果与画布 ====================
      'resultsTitle': 'Color Analysis Results', 'resultsSub': 'Click any swatch or value to copy', 'stamp': 'LOCAL ANALYSIS', 'cardDist': 'Color Distribution', 'saveBig': 'Save image', 
      'labelBg': 'Background', 'labelStroke': 'Stroke', 'titlePaper': 'Paper', 'titleWhite': 'White', 'titleTransparent': 'Transparent', 'ariaStrokeToggle': 'Show stroke', 'ariaStrokeColor': 'Stroke color',
      'cardRatio': 'Color Coverage', 'cardHex': 'Honeycomb Palette', 'dlAco': 'Download PS Swatch (.ACO)', 'dlAse': 'Download Adobe Swatch (.ASE)',

      // ==================== 色彩气质与指纹 ====================
      'readingMood': 'Color Mood ', 'readingAlgo': 'Auto Analysis', 'moodDefault': 'Waiting for an image', 'moodCopyDefault': 'Once an image is uploaded, this will describe the visual mood across temperature, lightness and saturation.',
      'metricWarm': 'Warmth', 'metricLight': 'Lightness', 'metricSat': 'Saturation',
      'moodWarm': 'Warm', 'moodCool': 'Cool', 'moodBalanced': 'Balanced', 'moodLight': 'Light', 'moodDark': 'Dark', 'moodMidLight': 'Mid Light', 'moodRich': 'Rich', 'moodPale': 'Pale', 'moodMidSat': 'Mid Sat',
      'moodCopyFull': 'Primary color is {name} ({pct}%). The overall visual mood is {warm}, {light}, and {sat}.',
      'readingFingerprint': 'Color Fingerprint ', 'waitingGen': 'Pending', 'factDominant': 'Dominant share', 'factSpan': 'Hue span', 'factComplex': 'Color density', 'unitColors': 'Color Density', 
      'honeyNarrow': 'Narrow hue range, good for monochromatic designs', 'honeyMid': 'Rich color variety with good visual hierarchy', 'honeyWide': 'Wide hue span, strong visual impact', 'honeyNoteDefault': 'After the honeycomb palette is generated, this will summarize the color structure and suggest how to use it.',

      // ==================== 配色方案生成器 ====================
      'genTitle': 'Palette Generator', 'genDesc': 'Pick a base color and build a 5-color palette from a hue-wheel rule. Computation runs in OKLCH, so lightness stays balanced across the set.',
      'labelMain': 'Base color', 'ariaMainColor': 'Choose base color', 'ariaMainHex': 'Base color value', 'labelRule': 'Harmony Rule', 'labelLib': 'Limit to library', 'btnRandom': 'Random',
      'ruleComp': 'Complementary', 'ruleAnalog': 'Analogous', 'ruleTriad': 'Triadic', 'ruleSplit': 'Split Complementary', 'ruleSquare': 'Square', 'ruleMono': 'Grayscale',
      'libCn': 'Chinese', 'libJp': 'Japanese', 'libMorandi': 'Morandi', 'libCyber': 'Cyberpunk', 'libNone': 'No Limit',
      'libNameCn': 'Chinese Palette', 'libNameMorandi': 'Morandi Palette', 'libNameJp': 'Japanese Palette', 'libNameCyber': 'Cyberpunk Palette', 'libNameNone': 'No Limit','phonePreviewTitle': 'Mobile UI Preview',
      
      // 配色衍生标签
      'labelPrimary': 'Primary: ', 'noStandardName': 'No Standard Name', 'actualHue': 'Act', 'ruleColon': ': ',
      'primaryPct': 'Primary: ', 'secondaryPct': 'Secondary: ', 'monoPct': 'Mono: ',
      'ruleCompShort': 'Comp', 'ruleAnalogShort': 'Analog', 'ruleTriadShort': 'Triad', 'ruleSplitShort': 'Split', 'ruleSquareShort': 'Square', 'ruleMonoShort': 'Mono',
      'labelPct80': 'Light 80%', 'labelPct60': 'Light 60%', 'labelPct40': 'Light 40%', 'labelPct20': 'Light 20%',
      'titleMainStripe': 'Primary Colors', 'titleRuleStripe': 'Harmony Colors',

      // ==================== 色彩数值与预览 ====================
      'labelValues': 'Color Values', 'clickCopy': 'Click any value to copy', 'previewTitle': 'UI Preview',
      'genPreviewOrigin': 'Original Preview', 'genPreviewRule': 'Harmony Preview', 'appPreviewTag': 'Tag', 'appPreviewText': 'This is a text preview based on the current palette to show the reading effect.', 'appPreviewBtnMain': 'Primary Btn', 'appPreviewBtnSub': 'Secondary Btn',
      'genCssOrigin': 'Original CSS Variables', 'genCssRule': 'Harmony CSS Variables', 'copyOriginCss': 'Copy original CSS', 'copyOriginHex': 'Copy original HEX', 'copyRuleCss': 'Copy harmony CSS', 'copyRuleHex': 'Copy harmony HEX', 'ariaOriginCss': 'Original CSS variables code', 'ariaRuleCss': 'Harmony CSS variables code',

      // ==================== 对比度检测 ====================
      'contrastLeftTitle': 'Primary Readability', 'contrastRightTitle': 'Harmony Readability', 'contrastMainVsBg': 'Primary vs Background', 'contrastStepVsBg': 'Step {n} vs Bg', 'contrastRuleVsBg': 'Rule {n} vs Bg',
      'gradeLarge': 'Large Text Only', 'gradeFail': 'Fail',

      // ==================== 渐变色生成器 ====================
      'gradTitle': 'Gradient Generator', 'gradDesc': 'Set 2 to 10 colors and generate CSS gradient code or a background image. “Smooth blending” interpolates in OKLab to avoid a muddy band between two colors.',
      'labelType': 'Type', 'typeLinear': 'Linear', 'typeRadial': 'Radial', 'typeConic': 'Conic', 'labelAngle': 'Angle', 'smooth': 'Smooth blending (OKLab)', 'btnRandomGrad': 'Random Gradient',
      'stopsTitle': 'Color Stops', 'stopsPos': 'Pos', 'stopDel': 'Delete', 'addColor': 'Add color', 'ruleStopWait': 'Waiting for harmony colors...', 'gradMainTag': 'Primary Gradient (Linked)', 'gradRuleTag': 'Harmony Gradient', 'dlPng': 'Download PNG',

      // ==================== 网页配色方案与预览 ====================
      'webTitle': 'Web Palette Scheme', 'webDesc': 'Derive five UI roles from a single base color: background, primary, accent, text and border. Preview real components below and export CSS variables you can keep tuning.', 
      'webRoles': 'Five UI Roles', 'webPreview': 'Real Component Preview', 'webVars': 'CSS Variables (tunable)', 'copyCssVars': 'Copy CSS variables', 'webCheck': 'Contrast Self-Check', 'webCheckSub': 'WCAG 2.2 compliant check',
      'webRoleBg': 'Background', 'webRolePrimary': 'Primary', 'webRoleAccent': 'Accent', 'webRoleText': 'Text', 'webRoleBorder': 'Border',
      'contrastTextBg': 'Text / Background', 'contrastMutedBg': 'Muted / Background', 'contrastAccentBg': 'Accent / Background', 'contrastOnPrimary': 'Text on Primary', 'contrastBorderBg': 'Border / Background',
      'wpBrandName': 'BrandName', 'wpCopyright': '© 2024 Brand Inc.', 'wpAllRightsReserved': 'All rights reserved.',
      'wpReq': 'Req.', 'wpTag': 'Tag', 'wpLogin': 'Log in', 'wpCardTitle': 'Card Title', 'wpNavHome': 'Home', 'wpNavProd': 'Products', 'wpNavAbout': 'About',
      'wpSandboxTip': '👀 This is a demo sandbox to preview real component effects', 'wpHeroTitle': 'Put your palette through real components', 'wpHeroDesc': 'The gradient above is generated from your 5-color palette. The components below simulate real UI interactions.', 'wpBtnPrimary': 'Primary Action',
      'wpConsole': 'Console', 'wpDocs': 'Docs', 'wpSettings': 'Settings', 'wpUserCenter': 'User center', 'wpVisits': 'Total visits', 'wpConversion': 'Conversion', 'wpVsLastWeek': 'vs last week', 'wpFlat': 'Flat',
      'wpRecentRecords': 'Recent Records', 'wpExportData': 'Export', 'wpOrderNo': 'Order No.', 'wpCustomer': 'Customer', 'wpStatus': 'Status', 'wpAmount': 'Amount', 'wpCompleted': 'Completed', 'wpCancelled': 'Cancelled', 'wpDemoNames': 'Zhang San|Li Si|Wang Wu|Zhao Liu|Sun Qi|Zhou Ba', 'wpCurrency': '$',

      // ==================== 取色器扩展面板 ====================
      'tipMainColor': 'Click to select color / Enter HEX value',
      'tipHsl': 'Traditional HSL (Mathematical Lightness)',
      'tipOklch': 'Perceptual OKLCH (Visually Uniform)',
      'panelHslTitle': 'Traditional HSL',
      'panelOklchTitle': 'Perceptual OKLCH',
      'btnEyeDropper': 'Pick from Screen',

      // ==================== 提示与公用 ====================
      'copyTipPrefix': 'Click to copy ', 'toastCopied': 'Copied {v}', 'toastCopyFail': 'Copy failed', 'toastPickImage': 'Please pick an image',
      'toastExportFail': 'Export failed', 'toastGradDl': 'Gradient saved', 'toastWheelDl': 'Wheel saved', 'toastHexDl': 'Honeycomb saved', 'toastDelMin': 'Keep at least 2 stops', 'toastMaxStops': 'Max 10 stops allowed', 'toastMaxRuleStops': 'Max 10 rule stops', 'toastRuleDlTodo': 'Under development', 'toastRandomOk': 'Random gradient generated', 'toastRandomFail': 'Random generation failed', 'toastPresetApplied': 'Preset applied: {name}',
      'footTitle': 'Color Analysis Tool', 'foot1': 'Local parsing · no uploads', 'foot2': 'Standard color matching', 'foot3': 'ACO / ASE swatch export', 'footEnd': 'END OF PAGE'
    }
  };

  function applyLang(lang) {
    lang = (lang === 'en') ? 'en' : 'zh';
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem(STORE_KEY, lang);

    ['langBtn', 'langToggleMobile'].forEach(function(id) {
      var wrap = document.getElementById(id);
      if (!wrap) return;
      var zh = wrap.querySelector('.zh');
      var en = wrap.querySelector('.en');
      if (zh) zh.classList.toggle('active', lang === 'zh');
      if (en) en.classList.toggle('active', lang === 'en');
    });

    var d = dict[lang] || dict.zh;

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

    document.querySelectorAll('[data-co-i18n-aria], [data-i18n-aria]').forEach(function(el) {
      var key = el.getAttribute('data-co-i18n-aria') || el.getAttribute('data-i18n-aria');
      if (key && d[key]) el.setAttribute('aria-label', d[key]);
    });

    document.querySelectorAll('[data-co-i18n-title]').forEach(function(el) {
      var key = el.getAttribute('data-co-i18n-title');
      if (key && d[key]) el.setAttribute('title', d[key]);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (key && d[key]) el.setAttribute('placeholder', d[key]);
    });

    if (d['pageTitle']) document.title = d['pageTitle'];
    var desc = document.querySelector('meta[name="description"]');
    if (desc && d['pageDesc']) desc.setAttribute('content', d['pageDesc']);

    document.dispatchEvent(new CustomEvent('co:langchange', { detail: { lang: lang } }));
  }

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

  document.addEventListener('DOMContentLoaded', function() {
    applyLang(localStorage.getItem(STORE_KEY) || 'zh');
  });

})(window);