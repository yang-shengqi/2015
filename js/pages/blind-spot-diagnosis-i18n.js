/* ============================================================ 
 * blind-spot-diagnosis-i18n.js
 * 思维盲区诊断 · 完整修复版（中英文正式版）
 * ============================================================ */
(function (global) {
  'use strict';

  var STORE_KEY = 'co-lang';

  /* ---------------- 静态 UI 词典 ---------------- */
  var DICT = {
    zh: {
      // ★ 补全导航栏与品牌区
      'brandName': '核心工具箱',
      'navHome': '首页',
      'navThinking': '思维类',
      'navThinking1': '乱世 · 生存与财富自由的实战宝典',
      'navThinking2': '传承 · 家族后辈们的启蒙家书',
      'navQuant': '量化类',
      'navQuant1': '全球 · 市场量化工具工作台',
      'navQuant2': '全球 · 全天候永久投资组合',
      'navQuant3': '美国 · Charles Schwab 仪表盘',
      'navDiagnose': '诊断类',
      'navDiagnose1': 'WJP · 法治指数地图',
      'navDiagnose2': '经济数据 · 趋势与真实性检验',
      'navDiagnose3': '思维 · 人类思维盲区诊断工具',
      'navDiagnose4': '诊断 · 文明等级在线评分器',
      'navUtility': '实用类',
      'navUtility1': '色彩 · 色彩分析工具',
      'navUtility2': '加密 · 网页军功级加密工具',

      pageTitle:      '人类认知盲区 · 高阶解构诊断',
      skipLink:       '跳到主内容',
      menuOpen:       '打开菜单',
      langAria:       '切换语言',
      closeAria:      '关闭',

      heroTagx:       '元认知框架 · 智库级思维审计',
      heroTitleA:     '人类认知盲区 ',
      heroTitleB:     '深度解构工具',
      heroLedeBold:   '你的认知框架，是否正在将你囚禁？',
      heroLedeRest:   '通过 38 个关于“底层思维架构”的深度诘问，对你的认知防御机制进行外科手术式的扫描。采用 <span class="hl">6维度 × 3层次</span> 交叉验证矩阵，输出具有学术级颗粒度的解构报告。',
      chip1:          '解构忽悠 · 外部溯源',
      chip2:          '自我觉醒 · 内部证伪',
      chip3:          '范式转移 · 心智重构',
      orcidLabel:     'ORCID:',
      firstPubLabel:  '全球首发:',
      packDateLabel:  '封装完成: ',
      packDateValue:  '2026年7月',

      startTitle:     '准备好解构你的认知架构了吗？',
      startBtn:       '启动底层认知审计',
      startHint:      '全程约 10 分钟。请抛弃虚荣，保持极度坦诚。',
      estTime:        '预估答题时间：约 10 ~ 12 分钟',
      answeredPre:    '已解构 ',
      answeredMid:    ' / ',
      answeredSuf:    ' 项',
      nextDimPrefix:  '当前解构维度：',
      nextDimDone:    '全域解构完成 🎯',

      exportPng:      '🖼️ 导出认知审计报告（PNG）',
      sharePng:       '📋 复制审计报告（PNG）',
      closeReport:    '关闭报告',
      resetBtn:       '↻ 重新启动审计',

      historyTitle:   '📜 认知审计档案',
      historyEmpty:   '暂无历史审计记录',
      historyTopic:   '认知解构',
      historyView:    '调阅',
      historyDelete:  '销毁',

      footTitle:      '杨晟琦文明公理系统 · 独立思想锚点',
      footSubEn:      'Yang Shengqi Civilizational Axiomatic System',
      footSubDate:    '封装完成: 2026年7月',
      footLicense:    '所有内容以 <a href="https://creativecommons.org/licenses/by-nd/4.0/deed.zh" target="_blank">CC BY-ND 4.0</a> 协议发布 · All content released under CC BY-ND 4.0',
      noscript:       '请开启 JavaScript 以使用完整功能。',

      dimSource:      '信源与信息过滤',
      dimFacts:       '事实与数据素养',
      dimLogic:       '逻辑与前提解构',
      dimInterests:   '利益与动机透视',
      dimEmotion:     '情绪与认知偏差',
      dimCost:        '代价与决策矩阵',

      layer1Label:    '外部溯源',
      layer1Sub:      '信息防污染',
      layer2Label:    '内部证伪',
      layer2Sub:      '认知除偏见',
      layer3Label:    '心智重构',
      layer3Sub:      '决策系统化',

      layerNodeSub1:  '剥离表象',
      layerNodeSub2:  '自我审视',
      layerNodeSub3:  '系统迭代',

      layerPass:      '高度清醒',
      layerWarn:      '部分遮蔽',
      layerFail:      '重度盲区',

      purposePrefix:  '解构靶向：',
      qNumPrefix:     'Q',
      statusDone:     '✅ 已记录',
      statusChoose:   '☑️ 请做出你的判断',
      statusAutoNext: '✅ 已记录，进入下一解构维度...',
      backPrev:       '↩ 修改上一题',
      completeTitle:  '全域认知解构完毕',
      completeSubPre: '你已完成全部 ',
      completeSubMid: ' 项底层逻辑的审计，请提取你的心智档案。',
      genReportBtn:   '📋 生成深度解构报告',
      resetFromCom:   '↻ 重置系统',
      timerPrefix:    '⏱️ ',

      reportEyebrow:  'Cognitive Deconstruction Matrix',
      reportHeadline: '一份极其冷酷的认知解构模型',
      reportBylinePre:'作者：',
      reportBylineSuf: '  ORCID: 0009-0008-3755-8960',
      reportChipPre:  '架构成熟度：',
      reportChipMid:  '%  |  范式评级：',

      summaryTitle:   '📌 核心结论摘要',
      strongest:      '✅ 核心优势域：',
      weakest:        '⚠️ 脆弱断裂带：',
      priority:       '💡 优先重构项：',
      scoreLabel:     '得分 ',

      summaryAdviceGood: '💬 你的认知架构具备强韧性，请继续维持高频的自我证伪。',
      summaryAdviceBad:  '💬 警告：你的认知防线存在结构性漏洞，建议立即启动最弱维度的刻意训练。',

      layerSection:   '📊 三层心智防御机制诊断',
      radarSection:   '📡 六维认知结构雷达',
      radarNote:      '* 各维度得分百分比，映射该认知维度的防穿透强度。',
      dimSection:     '📊 认知维度穿透率',

      practice1Title: '① 每日证伪',
      practice1Desc:  '抽离一条主流信息，强制质问：<br>“信源动机是什么？数据是否孤立？逻辑链是否闭环？”',
      practice2Title: '② 每周对冲',
      practice2Desc:  '主动寻找一篇极度违背你直觉的异见文章，写下令你产生“生理性不适”的三个点，强迫自己代入推演。',
      practice3Title: '③ 每月复盘',
      practice3Desc:  '重新执行本解构矩阵，比对雷达图形变，死盯你的最弱断裂带。',
      practiceTip:    '💡 认知进化 = 持续的证伪痛苦 + 残酷的自我解剖',

      whatIsTitle:    '❓ 什么是“认知盲区”？',
      whatIsB1:       '盲从权威与光环（信源降维）',
      whatIsB2:       '先入为主，结论倒推（证实偏差）',
      whatIsB3:       '被多巴胺与情绪劫持（情绪裹挟）',
      whatIsDescPre:  '本工具将冷酷地 <strong>量化</strong> 这些认知缺陷，并强制生成补丁。',

      cardEarth:      '🌍 普适性',
      cardEarthDesc:  '这套诊断不依赖任何文化传统、不预设任何教育背景、不要求任何专业知识。',
      cardNation:     '🏛️ 独立性',
      cardNationDesc: '权力无法干预结果，因为答案只存在于个体内部，不经过任何中间机构。',
      cardPerson:     '🧑 个人',
      cardPersonDesc: '一个普通人不需要任何前置培训，就能独立完成这份自我对话；他获得的是对自己思维结构的第一次看见。',

      footBrand:      '杨晟琦文明公理系统 · 独立思想锚点',
      footCredit1:    '思维盲区诊断模型 · 杨晟琦文明公理系统',
      footCredit2:    '杨晟琦文明公理系统 · 独立思想锚点 · 首发于2026年',
      footCreditEn:   "Yang Shengqi's Axiomatic System of Civilization · Independent Intellectual Anchor · First published in 2026",
      footCC:         '所有内容以 CC BY-ND 4.0 协议发布',

      level1: '认知沉睡者 (Passive Receiver)',
      level1Desc: '你的系统默认处于“低能耗接收模式”，几乎不启动任何信息过滤与证伪机制。你极易被叙事裹挟、被利益操纵。你需要从最基础的“信源绝缘”开始重构认知防火墙。',
      level2: '受控思考者 (Guided Thinker)',
      level2Desc: '你具备初步的怀疑，但缺乏系统性的解构框架。你在多数时候依赖直觉与外部投喂，容易被表面的逻辑自洽所蒙蔽。你需要建立一套结构化的批判性思维算法。',
      level3: '觉醒探索者 (Exploring Thinker)',
      level3Desc: '你的认知雷达已经开机，但在高强度的信息战与情绪战中仍会宕机。你能看到盲区，但往往缺乏穿透盲区的手术刀。继续加强逆向推演与利益透视。',
      level4: '独立解构者 (Independent Thinker)',
      level4Desc: '你拥有强韧的认知防御体系，能常态化地进行剥离表象与自我证伪。在复杂的博弈环境中，你能保持惊人的冷静与清醒。只差最后一步：将这套体系化为肌肉记忆。',
      level5: '绝对清醒者 (Clear-Headed Thinker)',
      level5Desc: '你已进入“上帝视角”。你的思维如同精密的手术刀，能瞬间洞穿权威光环、道德绑架与逻辑谬误。你不仅能免疫操控，甚至能看透那些试图操控你的人底层的恐惧与贪婪。',

      adviceHigh: '你的认知闭环极其坚固。请继续保持“万物皆可疑”的底层态度，警惕傲慢带来的新盲区。',
      adviceMid:  '你的系统存在局部漏洞。建议针对最弱的一层（{layer}）进行外科手术式的专项切除与重建。',
      adviceLow:  '危险！你的认知防线千疮百孔。请立即停止盲目接收，从“信源切断与溯源”开始，建立最基础的怀疑能力。',

      loadingImage:   '⏳ 正在渲染认知影像，请稍候...',
      downloaded:     '✅ 审计报告影像已落盘！',
      screenshotFail: '❌ 渲染失败',
      callingExport:  '📥 调用渲染引擎...',
      historyLoaded:  '📋 历史档案已调取',
      noAnswerData:   '⚠️ 档案数据残缺',
      deleted:        '已销毁',
      confirmDelete:  '确定要永久销毁此条认知档案吗？',
      resetDone:      '系统已重置，随时可重新审计',
      loadingBtnText: '⏳ 渲染中...'
    },

    en: {
      // ★ 补全导航栏与品牌区
      'brandName': 'Core Toolbox',
      'navHome': 'Home',
      'navThinking': 'Thinking',
      'navThinking1': 'Survival & Wealth Bible',
      'navThinking2': 'Legacy Letters',
      'navQuant': 'Quant',
      'navQuant1': 'Global Market Dashboard',
      'navQuant2': 'All-Weather Portfolio',
      'navQuant3': 'Charles Schwab Dashboard',
      'navDiagnose': 'Diagnostics',
      'navDiagnose1': 'WJP Rule of Law Map',
      'navDiagnose2': 'Economic Data Diagnostics',
      'navDiagnose3': 'Cognitive Blind Spots',
      'navDiagnose4': 'Civilization Scorer',
      'navUtility': 'Utilities',
      'navUtility1': 'Color Analysis',
      'navUtility2': 'HTML Encrypter',

      pageTitle:      'Human Cognitive Blind Spots: Advanced Deconstruction',
      skipLink:       'Skip to main content',
      menuOpen:       'Open menu',
      langAria:       'Switch language',
      closeAria:      'Close',

      heroTagx:       'Metacognitive Framework · Think-Tank Level Audit',
      heroTitleA:     'Human Cognitive Blind Spots ',
      heroTitleB:     'Advanced Deconstruction Tool',
      heroLedeBold:   'Is your cognitive framework holding you captive?',
      heroLedeRest:   'Through 38 profound inquiries into your underlying cognitive architecture, this tool performs a surgical scan of your defensive mechanisms. Utilizing a <span class="hl">6-Dimension × 3-Layer</span> cross-validation matrix, it generates an academically granular deconstruction report.',
      chip1:          'Deconstruct Deception · Source Tracing',
      chip2:          'Self-Awakening · Internal Falsification',
      chip3:          'Paradigm Shift · Cognitive Restructuring',
      orcidLabel:     'ORCID:',
      firstPubLabel:  'First published:',
      packDateLabel:  'Packaged: ',
      packDateValue:  'July 2026',

      startTitle:     'Ready to deconstruct your cognitive architecture?',
      startBtn:       'Initiate Cognitive Audit',
      startHint:      'Approx. 10 minutes. Discard vanity and maintain absolute candor.',
      estTime:        'Estimated time: ~10–12 min',
      answeredPre:    'Deconstructed ',
      answeredMid:    ' / ',
      answeredSuf:    '',
      nextDimPrefix:  'Current dimension: ',
      nextDimDone:    'Deconstruction Complete 🎯',

      exportPng:      '🖼️ Export Audit Report (PNG)',
      sharePng:       '📋 Copy Audit Report (PNG)',
      closeReport:    'Close Report',
      resetBtn:       '↻ Re-initiate Audit',

      historyTitle:   '📜 Audit Archives',
      historyEmpty:   'No historical archives',
      historyTopic:   'Cognitive Audit',
      historyView:    'Retrieve',
      historyDelete:  'Destroy',

      footTitle:      'Yang Shengqi Civilizational Axiomatic System · Independent Anchor',
      footSubEn:      'Yang Shengqi Civilizational Axiomatic System',
      footSubDate:    'Packaged: July 2026',
      footLicense:    'All content released under <a href="https://creativecommons.org/licenses/by-nd/4.0/deed.en" target="_blank">CC BY-ND 4.0</a>',
      noscript:       'Please enable JavaScript for full functionality.',

      dimSource:      'Source & Filtration',
      dimFacts:       'Facts & Data Literacy',
      dimLogic:       'Logic & Premise',
      dimInterests:   'Interests & Motivation',
      dimEmotion:     'Emotion & Bias',
      dimCost:        'Cost & Decision Matrix',

      layer1Label:    'Source Tracing',
      layer1Sub:      'Anti-Pollution',
      layer2Label:    'Internal Falsification',
      layer2Sub:      'De-biasing',
      layer3Label:    'Cognitive Restructuring',
      layer3Sub:      'Systemization',

      layerNodeSub1:  'Strip Illusions',
      layerNodeSub2:  'Self-Examination',
      layerNodeSub3:  'Iterate System',

      layerPass:      'Highly Lucid',
      layerWarn:      'Partially Obscured',
      layerFail:      'Severe Blindness',

      purposePrefix:  'Target Bias: ',
      qNumPrefix:     'Q',
      statusDone:     '✅ Recorded',
      statusChoose:   '☑️ Make your judgment',
      statusAutoNext: '✅ Recorded, proceeding...',
      backPrev:       '↩ Previous question',
      completeTitle:  'Global Deconstruction Complete',
      completeSubPre: 'You have completed all ',
      completeSubMid: ' logical audits. Please extract your cognitive profile.',
      genReportBtn:   '📋 Generate Deconstruction Report',
      resetFromCom:   '↻ Reset System',
      timerPrefix:    '⏱️ ',

      reportEyebrow:  'Cognitive Deconstruction Matrix',
      reportHeadline: 'A relentlessly objective cognitive deconstruction model',
      reportBylinePre:'Author: ',
      reportBylineSuf: '  ORCID: 0009-0008-3755-8960',
      reportChipPre:  'Maturity: ',
      reportChipMid:  '%  |  Paradigm: ',

      summaryTitle:   '📌 Executive Summary',
      strongest:      '✅ Core Advantage: ',
      weakest:        '⚠️ Fragile Fault Line: ',
      priority:       '💡 Priority Restructuring: ',
      scoreLabel:     'Score ',

      summaryAdviceGood: '💬 Your cognitive architecture is robust. Maintain high-frequency self-falsification.',
      summaryAdviceBad:  '💬 WARNING: Structural vulnerabilities detected in your cognitive defense. Initiate targeted training immediately.',

      layerSection:   '📊 Three-Layer Defense Diagnostic',
      radarSection:   '📡 Six-Dimensional Cognitive Radar',
      radarNote:      '* Percentage scores map the penetration resistance of each dimension.',
      dimSection:     '📊 Cognitive Dimension Penetration Rates',

      practice1Title: '① Daily Falsification',
      practice1Desc:  'Isolate one piece of mainstream information and interrogate it: <br>"What is the source\'s motive? Is the data isolated? Is the logic sound?"',
      practice2Title: '② Weekly Hedging',
      practice2Desc:  'Seek out an opposing view that triggers "physiological discomfort." Document three points that unsettle you and force yourself to simulate them.',
      practice3Title: '③ Monthly Review',
      practice3Desc:  'Re-execute this matrix, compare the radar topology, and fixate on your weakest fault line.',
      practiceTip:    '💡 Cognitive Evolution = Sustained pain of falsification + Ruthless self-dissection',

      whatIsTitle:    '❓ What constitutes a "Cognitive Blind Spot"?',
      whatIsB1:       'Blind deference to authority (Source Disarmament)',
      whatIsB2:       'Conclusion-first reasoning (Confirmation Bias)',
      whatIsB3:       'Hijacked by dopamine & emotion (Emotional Capture)',
      whatIsDescPre:  'This tool ruthlessly <strong>quantifies</strong> these deficiencies and mandates cognitive patches.',

      cardEarth:      '🌍 Universality',
      cardEarthDesc:  'This diagnosis depends on no cultural tradition, presupposes no educational background, and requires no prior expertise.',
      cardNation:     '🏛️ Independence',
      cardNationDesc: 'No state can interfere with the results, because the answers live only inside the individual, with no intermediary involved.',
      cardPerson:     '🧑 Individual',
      cardPersonDesc: 'An ordinary person can complete this self-dialogue without any training; what they gain is the first sight of their own thinking structure.',

      footBrand:      'Yang Shengqi Civilizational Axiomatic System · Independent Anchor',
      footCredit1:    'Cognitive Blind Spot Diagnostic Model · Yang Shengqi Civilizational Axiomatic System',
      footCredit2:    'Yang Shengqi Civilizational Axiomatic System · Independent Anchor · First published 2026',
      footCreditEn:   "Yang Shengqi's Axiomatic System of Civilization · Independent Intellectual Anchor · First published in 2026",
      footCC:         'All content released under CC BY-ND 4.0',

      level1: 'Passive Receiver',
      level1Desc: 'Your system defaults to low-energy reception, rarely initiating filtration or falsification. You are highly susceptible to narrative capture and interest manipulation. You must rebuild your cognitive firewall starting from fundamental source insulation.',
      level2: 'Guided Thinker',
      level2Desc: 'You possess rudimentary skepticism but lack a systematic framework for deconstruction. You rely heavily on intuition and external inputs, easily blinded by superficial logical consistency. A structured critical thinking algorithm is required.',
      level3: 'Exploring Thinker',
      level3Desc: 'Your cognitive radar is online, but it still crashes under high-intensity information and emotional warfare. You can perceive blind spots but lack the scalpel to penetrate them. Intensify reverse simulation and incentive insight.',
      level4: 'Independent Deconstructor',
      level4Desc: 'You possess a resilient cognitive defense system, capable of routine illusion-stripping and self-falsification. You maintain remarkable composure in complex games. Only one step remains: turning this system into muscle memory.',
      level5: 'Clear-Headed Thinker',
      level5Desc: 'You have achieved a God\'s-eye view. Your mind operates as a precision scalpel, instantly cutting through authority halos, moral blackmail, and logical fallacies. You are immune to manipulation, seeing through the underlying fears and greed of those who attempt to control you.',

      adviceHigh: 'Your cognitive loop is incredibly solid. Maintain the fundamental stance that "everything is suspect" and beware of new blind spots born from arrogance.',
      adviceMid:  'Local vulnerabilities detected. Execute surgical excision and reconstruction targeting your weakest layer ({layer}).',
      adviceLow:  'DANGER. Your cognitive defense is riddled with holes. Cease passive reception immediately and establish basic skepticism through "source isolation."',

      loadingImage:   '⏳ Rendering cognitive imagery, please wait...',
      downloaded:     '✅ Audit report rendered successfully!',
      screenshotFail: '❌ Rendering failed',
      callingExport:  '📥 Invoking rendering engine...',
      historyLoaded:  '📋 Historical archives retrieved',
      noAnswerData:   '⚠️ Incomplete archive data',
      deleted:        'Destroyed',
      confirmDelete:  'Permanently destroy this cognitive archive?',
      resetDone:      'System reset. Ready for new audit.',
      loadingBtnText: '⏳ Rendering...'
    }
  };

  /* ---------------- 题目数据 ---------------- */
  var QUESTIONS_DATA = {
    zh: [
      { p: '信源降维（Source Disarmament）', t: '面对一则未经核实的资讯，你的第一反应是接受其表意，还是习惯性地穿透传播链路，溯源其原初的发布节点与利益立场？', o: ['经验主义盲从，默认接收外界投喂的信息', '偶有疑虑，但止步于表层的逻辑自洽', '具备基础的溯源意识，但缺乏结构化查证的执行力', '习惯剥离二手叙事，直击第一手信源与数据底座', '绝对的“零信任”底层逻辑，无条件执行多源交叉验证'] },
      { p: '权威祛魅（Authority Demystification）', t: '在评估某一论断时，你的信任权重是倾斜于发言者的“社会光环（头衔/地位）”，还是完全臣服于其底层的推演逻辑与事实密度？', o: ['权力与光环崇拜，将头衔等同于真理', '极易被权威背书所震慑，缺乏独立判断的勇气', '能在光环与内容间做权衡，但易受潜意识的晕轮效应干扰', '对权威保持审慎的审视，以逻辑自洽为最高标尺', '绝对的逻辑本位，一切权威皆可被证伪，只认事实框架'] },
      { p: '证实偏差（Confirmation Bias）', t: '当面对极度契合你既有认知、甚至能提供巨大情绪抚慰的叙事时，你是否能克服“多巴胺陷阱”，对其真实性启动最严苛的证伪程序？', o: ['认知茧房囚徒，只摄取能印证自身偏见的养料', '容易陷入“信息同温层”，对顺耳的信息丧失免疫力', '知晓证实偏差的存在，但在实操中仍难以克服情绪偏倚', '拥有高度的智识警觉，越是顺理成章，越要逆向审视', '奉行“自我证伪”机制，将挑战自身认知视为最高级的智力训练'] },
      { p: '信源歧视（Source Discrimination）', t: '当某条具备客观价值的信息源自于你极度厌恶、或预设了敌对立场的媒介时，你是否能做到“敌营取真经”，让事实剥离并凌驾于立场偏见之上？', o: ['立场先行，直接因信源的“道德瑕疵”抹杀信息价值', '容易产生连带厌恶，很难做到客观剥离', '能够意识到偏见的存在，但无法完全剔除信源带来的心理不适', '具备“政见分离”的素养，能冷静萃取异见媒体中的有效信息', '纯粹的信息实用主义，抛弃所有道德滤镜，只做榨取式阅读'] },
      { p: '信任拓扑（Trust Topology）', t: '你的信息摄入网络，是碎片化、随机的随机游走，还是经过精密设计与动态迭代的“信任拓扑结构”（即拥有严格的信源白名单与淘汰机制）？', o: ['信息杂食且毫无壁垒，算法喂什么就吃什么', '依赖少数偶然接触的媒体，缺乏结构化的信源管理', '有初步的信息筛选偏好，但未形成动态的汰换机制', '建立了成体系的信源矩阵，并定期进行降权与升级', '打造了闭环的“情报级”信息过滤系统，精确到对不同信源的信任颗粒度'] },
      { p: '认知对冲（Cognitive Hedging）', t: '你是否会主动进行“认知对冲”——刻意去搜寻、研读那些与你核心立场水火不容的顶级异见，以此来刺穿自身的逻辑盲区与信息茧房？', o: ['极度自恋，排斥一切异端，沉溺于绝对自洽的幻觉', '仅在遭遇现实重创时，才勉强去了解对手的逻辑', '偶尔看异见，但往往带着找茬和批判的防御性心态', '擅长“换位推演”，能理解并拆解对立面的底层合理性', '精神上的“无国界者”，主动吞噬异见，利用对立的观点重塑认知防线'] },

      { p: '事实与叙事剥离（Fact-Narrative Disassociation）', t: '在激烈的争论或复杂的决策中，你是否具备一种冷酷的剥离能力——将“情绪的宣泄”、“道德的审判”与“客观的存在”进行彻底的切割？', o: ['完全受制于情绪，将主观感受等同于客观事实', '容易被道德叙事绑架，难以触及事实核心', '能识别情绪与事实，但在高压下仍会混淆', '具备冷静的实证精神，习惯将主观好恶搁置', '化身无情的“事实机器”，只认数据和证据，彻底剥离情感滤镜'] },
      { p: '数据素养（Data Literacy）', t: '面对一份极其精美、看似无懈可击的数据图表，你是否会本能地警惕其“样本偏差”、“幸存者偏差”或“坐标轴操纵”等统计学陷阱？', o: ['全盘接受，认为数字绝对不会骗人', '很少怀疑，除非数据离谱到违背常理', '偶尔会关注数据的采集方法，但通常不深究', '具备系统的数据核查能力，能识破常见的统计谬误', '绝对的“数据警犬”，能瞬间反向推导出数据生成者的造假逻辑'] },
      { p: '先验预设（A Priori Assumptions）', t: '在进行逻辑推演时，你是让证据引导结论（客观归纳），还是潜意识里先锚定了一个期望的结果，然后再去进行选择性搜证（证实偏好）？', o: ['结论先行，只寻找能支持自己的证据', '容易受先验观念影响，导致推演过程变形', '有一定的实证意识，但难以彻底摆脱先验偏见', '坚持“证据至上”，结论必须完全由数据推导', '具备极强的“白纸心态”，随时准备推翻自己，让事实自己说话'] },
      { p: '认知失调（Cognitive Dissonance）', t: '当残酷的现实与你深信不疑的信念发生剧烈冲突时，你的第一反应是承认系统的错误并修正自身，还是陷入防御机制，甚至攻击现实的真实性？', o: ['完全拒绝承认冲突，自欺欺人', '极力寻找借口，维护自己原本的信念', '经历痛苦后，勉强接受部分事实', '能理性面对认知失调，迅速完成自我纠错', '期待认知失调的到来，视其为打破心智边界的绝佳契机'] },
      { p: '证伪机制（Falsification Engine）', t: '对于你引以为傲的核心决策或观点，你是否会刻意、无情地对其进行“压力测试”，寻找可能让其一败涂地的极端反例？', o: ['极度自信，从不寻找反例', '偶尔想想，但害怕面对失败的可能', '能接受他人提出反例，但自己很少主动寻找', '经常主动寻找反例，以此优化自己的决策', '将“证伪”奉为圭臬，找不到反例绝不轻易做出决策'] },
      { p: '行为内化（Behavioral Internalization）', t: '“先看证据，再下结论”这一准则，在你的日常行为中是作为一项需要消耗意志力的“任务”，还是已经内化为无需思考的“底层肌肉记忆”？', o: ['从未想过，完全凭直觉行事', '知道这个道理，但执行起来极其困难', '大部分时候能刻意提醒自己去做', '已经形成习惯，能自动过滤无稽之谈', '已化为本能，甚至能瞬间识别出他人的逻辑缺失'] },

      { p: '前提解构（Premise Deconstruction）', t: '任何宏大的结论都建立在隐性的假设之上。你是否具备排查这些前置条件的警觉？如果地基坍塌，你亲手构建的逻辑大厦是否依然成立？', o: ['只看结论，从未思考过结论背后的前提', '极少考虑前提假设，默认一切不变', '能发现明显的前提漏洞，但缺乏系统排查能力', '善于拆解结论背后的假设，并验证其真伪', '具备“归零推演”的能力，能直接审视公理的合理性'] },
      { p: '逆向推演（Reverse Engineering）', t: '面对一个你笃信的观点，你是否能在大脑中完美地构建出“反对方”的顶级逻辑闭环，并找出其合理性（而非简单的情绪宣泄）？', o: ['完全无法理解对方，认为对方非蠢即坏', '尝试过，但很容易陷入情绪对立', '能听懂对方的逻辑，但难以独立还原', '擅长换位思考，能构建对立面的最优解', '可以在对立的两极逻辑中自由穿梭，游刃有余'] },
      { p: '从众偏差（Bandwagon Bias）', t: '当身处群体狂欢或集体恐慌之中，你的独立判断系统是否会被“数量即为真理”的错觉所淹没，从而丧失对逻辑本身的审视？', o: ['极易被群体裹挟，丧失独立思考能力', '看到大家都这样，就会放弃自己的怀疑', '能保持一定距离，但偶尔会被感染', '具备强烈的反群体倾向，越狂热越警惕', '彻底免疫群体催眠，永远将群体共识视为检验对象'] },
      { p: '愉悦谬误（Pleasure Fallacy）', t: '当一段逻辑推演极其顺滑，让你产生强烈的“智力愉悦感”或情感共鸣时，你是否会下意识地放松警惕，忽略了它可能隐藏的诡辩陷阱？', o: ['顺从人性的弱点，只接受听感舒适的叙事', '容易被精致的包装带偏，难以察觉逻辑漏洞', '能感知到舒服背后的隐患，但难以抗拒', '保持警醒，对“顺耳之言”进行反向审视', '如同雷达一般，越是无懈可击的完美逻辑，越要寻找其隐秘裂缝'] },
      { p: '范式转移（Paradigm Shift）', t: '你是否愿意周期性地推翻自己苦心经营的知识体系，迎接全新的认知范式？哪怕这会让你短期内陷入巨大的虚无与迷茫。', o: ['极度恐惧变化，死守陈旧观念', '很难接受新事物，除非被迫改变', '愿意接受新知识，但不愿意重构底层框架', '具备较强的迭代能力，能主动进行范式升级', '享受“破而后立”的快感，将自我重构视为进化的必经之路'] },
      { p: '谬误捕获（Fallacy Capture）', t: '在日常沟通或政策解读中，你能否瞬间识别出“偷换概念”、“诉诸权威”、“稻草人谬误”等逻辑硬伤，并直接切断对方的洗脑输出？', o: ['完全没有识别能力，经常被诡辩绕晕', '偶尔觉得不对劲，但说不出哪里有问题', '能识别明显的逻辑谬误，但反应速度较慢', '具备敏锐的谬误雷达，能快速拆解对方的逻辑陷阱', '降维打击，不仅能识破谬误，还能反向利用对方的逻辑漏洞进行反击'] },

      { p: '利益透视（Incentive Insight）', t: '当面对一种与你相左、且看似“大义凛然”或极具煽动性的叙事时，你是否具备一种本能的警觉，去剥离其道德外壳，审视这场声量背后真实的利益结构与核心受益者？', o: ['沉溺于叙事表面的情绪逻辑，极少触发对潜在动机的审视', '偶有疑虑，但极易被情绪裹挟，事后复盘才察觉端倪', '能意识到可能存在利益动机，但缺乏解构利益链条的框架', '具备较强的透视能力，能迅速识别叙事背后的利益导向', '拥有近乎本能的“动机解构”能力，瞬间洞穿利益博弈的底层逻辑'] },
      { p: '动机解构（Motivation Deconstruction）', t: '当面对持有你完全无法理解的极端立场的人时，你能否抛弃“非黑即白”的评判，冷酷地剖析出支撑其立场的核心利益链条与生存处境？', o: ['将他们全部归为愚蠢或被洗脑', '隐约觉得他们有目的，但不愿深究', '能猜出部分动机，但容易被自身的道德优越感干扰', '能够客观剥离出对方的利益诉求和生存逻辑', '具备顶级心理学家的视野，能像看透明标本一样看透对方的心智机制'] },
      { p: '错误归因（Error Attribution）', t: '当你的判断被事实无情证伪时，你的第一反应是迅速启动“合理化防御机制”推卸责任，还是坦然承认自己的认知缺陷并立刻纠偏？', o: ['绝不承认错误，错的永远是别人或环境', '内心承认，但嘴上依然死扛', '能在私下承认，但需要很长时间消化挫败感', '能够迅速、坦荡地承认错误，并复盘原因', '视错误为最高级的导师，闻过则喜，瞬间完成系统升级'] },
      { p: '风险校准（Risk Calibration）', t: '你在面对未知的决策时，是经常被“极度乐观”的幸存者偏差所蒙蔽，还是被“极度悲观”的灾难化想象所瘫痪？你的风险评估曲线是否偏离了客观概率？', o: ['完全不具备风险意识，盲目下注', '容易走极端，要么盲目乐观，要么极度恐慌', '有一定评估能力，但容易被情绪左右判断', '具备科学的概率思维，能理性量化风险收益比', '能够精确校准恐惧与贪婪，在极度不确定中做出最优解'] },
      { p: '自我解离（Self-Image Dissociation）', t: '你的观点和决策，在多大程度上是为了维护你那个“聪明、正义、有品位”的自我人设？你是否被自己虚构的完美形象绑架了客观判断？', o: ['完全没有意识到“人设”的存在，活在自己编织的幻觉中', '容易被面子绑架，为了维护形象而扭曲事实', '清楚自己有虚荣心，但很难在关键时刻放下', '能剥离自我形象，以“无我”的状态进行独立判断', '拥有完全自洽的底层自信，根本不需要任何外在人设来证明自己'] },
      { p: '底线权衡（Bottom Line Trade-off）', t: '当追求真相的代价是——失去巨大的现实利益、得罪不可一世的强权，甚至身败名裂时，你内心是否还存在一条不可逾越的逻辑底线？', o: ['利益至上，真相是可以随时被交易和妥协的', '底线非常模糊，取决于价码的高低', '在安全范围内坚持真相，触碰底线时会退让', '内心有极为坚定的原则，面临巨大压力也不会轻易妥协', '拥有殉道者般的纯粹，为了真理可以放弃一切世俗的筹码'] },
      { p: '利益自省（Interest Introspection）', t: '在进行任何重大的价值判断时，你是否具备一种近乎残忍的“自我审丑”能力，去挖掘并承认那些潜藏在崇高道德外衣下的隐秘私心？', o: ['坚信自己大公无私，全凭良知发声', '偶尔反思，但很容易滑入自我感动的陷阱', '知道自己有私心，但很少将其与宏大叙事剥离', '具备强烈的自我审视能力，时刻警惕认知的私心', '能像外科手术一样精准切除自己的利益滤镜，只留纯粹的逻辑'] },

      { p: '情绪觉察（Emotional Awareness）', t: '在极度愤怒、狂喜或恐惧的瞬间，你是否拥有一个“第三只眼”，能够冷冷地悬停在半空，看着被情绪劫持的自己和正在变形的判断？', o: ['完全被情绪吞噬，毫无觉知能力', '事后才知道自己上头了，当场控制不住', '偶尔能觉察到情绪在干扰，但无力摆脱', '具备较强的临场觉察力，能迅速将情绪与事实隔离', '拥有大师级的情绪剥离能力，能利用情绪作为决策的雷达而非绊脚石'] },
      { p: '不适与真实（Discomfort vs. Truth）', t: '当一条信息让你感受到强烈的“生理性不适”或认知撕裂感时，你的第一反应是出于防御而否定其真实性，还是意识到这恰恰是打破你认知边界的真理之光？', o: ['极度抗拒不适感，直接抹杀信息的价值', '容易因情绪反弹而拒绝接受', '需要经过一段时间的消化，才能理性看待', '能克服心理不适，敏锐捕捉其中有价值的真相', '主动拥抱认知撕裂感，因为那是认知跃迁的阵痛'] },
      { p: '失败厌恶（Failure Aversion）', t: '面对一项高风险、高收益、但存在极大变数的博弈时，你是否会因为对“失败”的极度恐惧，而宁愿放弃机会，缩在舒适区里维持可悲的安全感？', o: ['极度害怕失败，绝对不敢冒任何风险', '极其保守，必须看到100%的确定才敢行动', '风险承受能力一般，稍微遇到波折就会退缩', '能理性评估失败概率，只要期望值为正就敢于下注', '具备极强的反脆弱性，能从失败中榨取最大的剩余价值'] },
      { p: '尊严管理（Ego Management）', t: '承认自己的愚蠢、短视和无能，对你来说意味着什么？为了维持脆弱的自尊，你是否曾经在错误的方向上死磕到底，最终付出了惨痛的代价？', o: ['绝不认错，尊严大于一切', '极度害怕丢脸，宁愿将错就错', '内心承认，但表面很难拉下脸', '能大大方方地承认自己的无知，迅速止损', '已经彻底戒掉了“面子”这种低级情绪，只追求客观的赢'] },
      { p: '冲动控制（Impulse Control）', t: '在面临极致的挑衅或极具诱惑的陷阱时，你是否能够强行使自己的系统“降频”，切断即时的应激反应，等待大脑恢复冷思考后再降维打击？', o: ['一点就炸，完全凭本能行事', '反应极快，但往往是不理智的冲动', '能憋住，但往往忍出内伤，无法理智思考', '懂得按下暂停键，冷静复盘后再做定夺', '达到“泰山崩于前而色不变”的境界，情绪反应与决策完全解耦'] },
      { p: '触发机制（Trigger Mechanism）', t: '你是否已为自己的认知系统建立了一份“雷区地图”，清晰地标记出哪些特定的词汇、场景或人群最容易引发你的情绪失控与理智降级？', o: ['完全不知道自己什么时候会崩溃', '大概知道，但从未想过提前预防', '有意识，但在触发时依然难以控制', '清楚自己的雷区，能在即将踩雷时提前绕道', '不仅能完美排雷，还能利用反向触发机制，让他人露出破绽'] },

      { p: '底线思维（Bottom Line Thinking）', t: '在启动重大决策前，你是否会冷酷地推演“最坏情况”，并确认哪怕最极端的黑天鹅事件发生，你和你背后的系统依然具备存续能力？', o: ['从来不考虑最坏情况，总觉得自己运气好', '害怕面对最坏的结果，刻意回避思考', '能想到，但往往抱有侥幸心理', '严格践行底线思维，确保系统能抵抗极限冲击', '能在危机中寻找机会，甚至利用极端的黑天鹅进行反向收割'] },
      { p: '机会成本（Opportunity Cost）', t: '当你面临抉择时，你的视线是仅仅盯着眼前的直接收益，还是能居高临下地审视另外一条被放弃的道路（隐形损失）以及两者的期望值差异？', o: ['只看得到眼前的得失，完全没有机会成本意识', '粗略比较一下，但经常算错账', '知道有机会成本，但无法精确量化', '能精确计算双盲测试下的期望值，并做出最优解', '具备全景视角，能在多维度的复杂博弈中，瞬间算出最优路径'] },
      { p: '完美主义（Perfectionism）', t: '你是为了追求“绝对正确”而迟迟无法行动的决策瘫痪者，还是深谙“灰度思维”、能够在信息极度贫乏的情况下做出“相对最优解”的实用主义者？', o: ['极度纠结，为了完美错过所有时机', '总是想要收集到100%的信息才敢动手', '能做决定，但经常因为犹豫而贻误战机', '深谙灰度决策的精髓，在迷雾中果断下注', '成为概率的掌控者，所有的决策只是为了积累“胜率”而非苛求完美'] },
      { p: '决策后效（Post-Decision Dissonance）', t: '当你的重大决策被事实证明是彻底的失败，你是花费大量时间在懊悔和自我否定中内耗，还是能迅速剥离沉没成本，面无表情地开启下一局的博弈？', o: ['陷入长期的懊悔中，无法自拔', '被沉没成本绑架，死守失败的残局', '虽然能止损，但需要很长的心理建设期', '能够迅速割肉，复盘后立刻重新出发', '达到“无情无我”的境界，过去的一切皆为序章，永远只看概率与未来'] },
      { p: '阵营焦虑（Camp Anxiety）', t: '在面对扑朔迷离的复杂局势时，如果你不立刻站队、保持绝对的中立，你是否会因为害怕被双方抛弃的强烈恐惧，而迫于压力做出违心的判断？', o: ['极度害怕落单，必须马上找个主子站队', '很容易被两边的情绪裹挟，被迫表态', '能坚持一阵子，但顶不住长期的孤立', '具备极强的心智定力，坚持到真相浮出水面', '享受绝对的孤独，视中立和旁观为最高维度的降维打击'] },
      { p: '容错机制（Fault Tolerance）', t: '你是否能在承受巨大的现实代价、甚至遭遇众叛亲离的境地时，依然能够依靠内心的逻辑底座，忍受“与全世界为敌”的孤独感？', o: ['完全无法承受压力，立刻屈服', '只要代价一高，就会放弃底线', '能坚持一段时间，但终会向现实妥协', '具备强大的反脆弱心理，能扛住极端的孤独与打压', '拥有殉道者的狂热与绝对理性的结合，在真理面前，全世界不过是个背景板'] },
      { p: '决策矩阵（Decision Matrix）', t: '你的重大人生或投资决策，是基于一套不断进化、带有多维权重计算的“决策算法矩阵”，还是仅仅依赖于拍脑门的直觉和随波逐流的运气？', o: ['完全是随机游走，凭感觉乱做决策', '偶尔做复盘，但没有固定的决策框架', '大脑里有一些散落的框架，但不够系统', '建立了一套完善的决策SOP，并严格执行', '已将决策系统升维为精密算法，能像AI一样无情且精确地执行'] }
    ],
    en: [
      { p: 'Source Disarmament', t: 'When encountering unverified information, is your first instinct to accept the surface meaning, or do you habitually trace the transmission chain back to its original node and underlying interests?', o: ['Habitual acceptance without scrutiny; default to being spoon-fed.', 'Occasional doubt, but halted by superficial logical consistency.', 'Basic tracing awareness, but lacks the execution for structured verification.', 'Habitually strips second-hand narratives to strike primary sources.', 'Absolute "zero-trust" logic; unconditionally executes multi-source cross-validation.'] },
      { p: 'Authority Demystification', t: 'When evaluating a proposition, is your trust weighted towards the speaker\'s "social halo (title/status)," or does it entirely submit to their underlying deductive logic and factual density?', o: ['Awe of power and halo; equates titles with absolute truth.', 'Highly intimidated by authority endorsements; lacks independent judgment.', 'Weighs halo against content, but susceptible to subconscious halo effects.', 'Maintains cautious scrutiny of authority, prioritizing logical coherence.', 'Absolute logical supremacy; all authority is falsifiable; only recognizes frameworks of fact.'] },
      { p: 'Confirmation Bias', t: 'When facing a narrative that perfectly aligns with your existing cognition and offers immense emotional comfort, can you overcome the "dopamine trap" and initiate the most rigorous falsification protocols?', o: ['Prisoner of the echo chamber; only ingests nutrients that validate biases.', 'Easily trapped in the "information homosphere," losing immunity to pleasing news.', 'Cognizant of the bias, but struggles to overcome emotional partiality in practice.', 'Possesses high intellectual vigilance; the more coherent it seems, the more it demands reverse scrutiny.', 'Enforces "self-falsification"; regards challenging one\'s own cognition as the highest intellectual discipline.'] },
      { p: 'Source Discrimination', t: 'When objectively valuable information originates from media you deeply despise or have pre-designated as hostile, can you extract the "truth from the enemy\'s camp," allowing facts to supersede stance prejudice?', o: ['Stance-first; nullifies information value due to the source\'s "moral flaw."', 'Prone to associative disgust; struggles to objectively isolate the fact.', 'Aware of the prejudice, but unable to completely eliminate the psychological discomfort from the source.', 'Possesses "politics-fact separation" literacy; calmly extracts valid data from dissenting media.', 'Pure informational pragmatism; discards all moral filters for extractive reading.'] },
      { p: 'Trust Topology', t: 'Is your information intake network a fragmented, random walk, or a "trust topology" (featuring strict source whitelists and elimination mechanisms) crafted through precision design and dynamic iteration?', o: ['Omnivorous and utterly barrier-free; consumes whatever the algorithm feeds.', 'Relies on a few incidentally encountered media; lacks structured source management.', 'Initial screening preferences exist, but no dynamic elimination mechanism.', 'Established a systematic source matrix, routinely downgrading and upgrading.', 'Built a closed-loop, "intelligence-grade" filtration system, precise to the granularity of trust per source.'] },
      { p: 'Cognitive Hedging', t: 'Do you actively execute "cognitive hedging"—deliberately seeking and studying top-tier dissenting opinions diametrically opposed to your core stance, to pierce your logical blind spots and echo chambers?', o: ['Extreme narcissism; rejects all heresy, wallowing in absolute self-consistency.', 'Only minimally seeks the opponent\'s logic when reality inflicts severe trauma.', 'Occasionally reviews dissent, but with a defensive, fault-finding mentality.', 'Skilled in "reverse simulation"; comprehends and deconstructs the adversary\'s foundational rationale.', 'A mental "stateless actor"; actively devours dissent, utilizing opposing views to reconstruct cognitive defenses.'] },

      { p: 'Fact-Narrative Disassociation', t: 'In intense debates or complex decisions, do you possess a ruthless capacity to dissociate—completely severing "emotional venting," "moral judgment," and "objective existence"?', o: ['Completely governed by emotion; equates subjective feeling with objective fact.', 'Easily kidnapped by moral narratives; unable to reach the factual core.', 'Can distinguish emotion from fact, but conflates them under high pressure.', 'Possesses calm empiricism; habitually suspends subjective likes and dislikes.', 'An emotionless "fact machine"; only recognizes data and evidence, entirely stripping the emotional filter.'] },
      { p: 'Data Literacy', t: 'When presented with exquisite, seemingly impenetrable data charts, do you instinctively guard against statistical traps such as "sample bias," "survivorship bias," or "axis manipulation"?', o: ['Total acceptance; believes numbers never lie.', 'Rarely doubts unless the data is absurdly counter-intuitive.', 'Occasionally considers collection methods, but rarely digs deep.', 'Possesses systematic data verification; detects common statistical fallacies.', 'An absolute "data bloodhound"; instantly reverse-engineers the deception logic of the data generator.'] },
      { p: 'A Priori Assumptions', t: 'In logical deduction, do you allow evidence to guide the conclusion (objective induction), or do you subconsciously anchor to a desired outcome first, then conduct selective search (confirmation preference)?', o: ['Conclusion-first; only seeks evidence that supports personal views.', 'Easily influenced by a priori concepts, distorting the deduction process.', 'Possesses empirical awareness, but struggles to entirely abandon a priori bias.', 'Insists on "evidence supremacy"; conclusions must be wholly derived from data.', 'Possesses an extreme "tabula rasa" mindset; prepared to overturn oneself at any moment, letting facts speak.'] },
      { p: 'Cognitive Dissonance', t: 'When harsh reality violently clashes with a deeply held belief, is your primary reflex to admit the systemic error and self-correct, or to enter defensive mechanisms—even attacking the reality itself?', o: ['Absolute refusal to acknowledge the clash; self-deception.', 'Desperately seeks excuses to preserve the original belief.', 'Accepts partial facts only after a painful struggle.', 'Confronts dissonance rationally; rapidly completes self-correction.', 'Anticipates cognitive dissonance, viewing it as a prime opportunity to shatter cognitive boundaries.'] },
      { p: 'Falsification Engine', t: 'Regarding your proudest core decisions or beliefs, do you deliberately and ruthlessly subject them to "stress testing," searching for extreme counterexamples that could utterly demolish them?', o: ['Extreme overconfidence; never seeks counterexamples.', 'Occasionally considers it, but fears the possibility of failure.', 'Accepts counterexamples from others, but rarely initiates the search.', 'Actively seeks counterexamples frequently to optimize personal decisions.', 'Reveres "falsification"; refuses to make a decision unless counterexamples are exhausted.'] },
      { p: 'Behavioral Internalization', t: 'Is the maxim "evidence first, conclusions second" a "task" requiring willpower in your daily behavior, or has it been internalized into an unconscious "baseline muscle memory"?', o: ['Never considered it; operates entirely on intuition.', 'Understands the principle, but execution is extremely arduous.', 'Deliberately reminds oneself most of the time.', 'Has formed a habit; automatically filters out baseless claims.', 'Internalized as instinct; can instantly identify logical deficits in others.'] },

      { p: 'Premise Deconstruction', t: 'Every grand conclusion is built on implicit assumptions. Do you possess the vigilance to investigate these preconditions? If the foundation collapses, does the logical edifice you built still hold?', o: ['Observes conclusions only; never contemplates underlying premises.', 'Rarely considers premises; assumes everything remains static.', 'Can identify obvious premise flaws, but lacks systematic troubleshooting.', 'Skilled at deconstructing assumptions behind conclusions and verifying their validity.', 'Possesses "zero-based deduction"; directly scrutinizes the rationality of axioms.'] },
      { p: 'Reverse Engineering', t: 'Facing a viewpoint you firmly believe in, can you perfectly construct the adversary\'s top-tier logical loop in your mind and identify its rationality (rather than mere emotional venting)?', o: ['Utterly unable to comprehend the opposition; views them as foolish or evil.', 'Has tried, but easily falls into emotional antagonism.', 'Comprehends the opponent\'s logic, but struggles to independently reconstruct it.', 'Skilled in empathy; can construct the optimal solution of the opposing side.', 'Moves fluidly between opposing polarities of logic with absolute mastery.'] },
      { p: 'Bandwagon Bias', t: 'When immersed in collective euphoria or panic, is your independent judgment system drowned out by the illusion that "quantity equals truth," thereby losing scrutiny of the logic itself?', o: ['Highly susceptible to group capture; loses independent thought.', 'Abandons personal doubts upon seeing the crowd\'s behavior.', 'Maintains some distance, but is occasionally infected.', 'Possesses strong anti-herd tendencies; the more fanatical, the more vigilant.', 'Totally immune to group hypnosis; perpetually subjects group consensus to examination.'] },
      { p: 'Pleasure Fallacy', t: 'When a logical deduction is incredibly smooth, evoking intense "intellectual pleasure" or emotional resonance, do you subconsciously relax your guard and overlook its hidden sophistic traps?', o: ['Yields to human weakness; only accepts narratives that sound comfortable.', 'Easily misled by exquisite packaging; fails to detect logical flaws.', 'Perceives the hidden peril behind comfort, but struggles to resist it.', 'Remains alert; conducts reverse scrutiny of "pleasing words."', 'Akin to radar; the more impeccable and flawless the logic, the harder you search for its hidden fractures.'] },
      { p: 'Paradigm Shift', t: 'Are you willing to periodically overthrow the knowledge system you painstakingly built to embrace a novel cognitive paradigm, even if it plunges you into immense short-term nihilism and confusion?', o: ['Extreme fear of change; clings fiercely to obsolete concepts.', 'Struggles with novelty unless forced to change.', 'Willing to accept new knowledge, but refuses to reconstruct the underlying framework.', 'Possesses strong iteration capacity; proactively initiates paradigm upgrades.', 'Savoring the ecstasy of "destruction preceding construction," viewing self-restructuring as the obligatory path of evolution.'] },
      { p: 'Fallacy Capture', t: 'In daily communication or policy interpretation, can you instantaneously identify logical hard flaws—such as "equivocation," "appeal to authority," or "straw man fallacies"—and sever the opponent\'s brainwashing output?', o: ['Zero identification capability; frequently baffled by sophistry.', 'Occasionally senses something is off, but cannot articulate the flaw.', 'Can identify obvious logical fallacies, but reaction time is sluggish.', 'Possesses an acute fallacy radar; rapidly deconstructs the opponent\'s logical traps.', 'Dimensional strike; not only detects fallacies but reverses them to counter-attack exploiting the opponent\'s logical flaws.'] },

      { p: 'Incentive Insight', t: 'When confronted with a narrative contrary to your stance that appears "righteous" or highly inflammatory, do you possess an instinctive vigilance to strip away its moral shell and scrutinize the authentic interest structure and core beneficiaries behind the volume?', o: ['Wallows in the surface emotional logic; rarely triggers scrutiny of underlying motives.', 'Occasional doubt, but easily captured by emotion; perceives clues only retrospectively.', 'Recognizes potential interest motives, but lacks a framework to deconstruct the interest chain.', 'Possesses strong insight; rapidly identifies interest orientations behind narratives.', 'Wields an almost instinctual "motive deconstruction," instantly piercing the foundational logic of interest games.'] },
      { p: 'Motivation Deconstruction', t: 'When faced with individuals holding extreme stances you fundamentally cannot comprehend, can you discard "black-and-white" judgments and ruthlessly dissect the core interest chain and survival context underpinning their stance?', o: ['Categorizes them entirely as stupid or brainwashed.', 'Vaguely senses they have motives, but refuses to dig deeper.', 'Can guess partial motives, but easily distracted by moral superiority.', 'Can objectively isolate the opponent\'s interest demands and survival logic.', 'Possesses a top-tier psychologist\'s vision; perceives their mental mechanisms as if viewing transparent specimens.'] },
      { p: 'Error Attribution', t: 'When your judgment is ruthlessly falsified by facts, is your first reaction to rapidly initiate "rationalization defense mechanisms" to shirk responsibility, or to candidly admit your cognitive deficits and instantly recalibrate?', o: ['Absolutely never admits fault; the blame always lies with others or the environment.', 'Internally acknowledges, but verbally digs in heels.', 'Admits privately, but requires immense time to digest the defeat.', 'Admits errors swiftly and magnanimously, subsequently reviewing the causes.', 'Regards error as the supreme mentor; rejoices upon hearing of flaws, instantly completing a system upgrade.'] },
      { p: 'Risk Calibration', t: 'When facing unknown decisions, are you frequently blinded by "extreme optimism" survivorship bias, or paralyzed by "extreme pessimism" catastrophizing? Does your risk assessment curve deviate from objective probabilities?', o: ['Utterly devoid of risk awareness; bets blindly.', 'Prone to extremes: either blindly optimistic or extremely panicked.', 'Has some assessment capability, but judgment is easily swayed by emotion.', 'Possesses scientific probabilistic thinking; rationally quantifies risk-reward ratios.', 'Precisely calibrates fear and greed, deriving the optimal solution amidst extreme uncertainty.'] },
      { p: 'Self-Image Dissociation', t: 'To what extent are your viewpoints and decisions driven by the need to maintain your "smart, righteous, and tasteful" self-persona? Are you held hostage by your own fabricated flawless image, compromising objective judgment?', o: ['Completely oblivious to the "persona"; lives within self-woven illusions.', 'Easily held hostage by "face"; distorts facts to maintain image.', 'Aware of personal vanity, but struggles to relinquish it at critical moments.', 'Can dissociate from self-image, rendering independent judgments in a "selfless" state.', 'Possesses fully self-consistent foundational confidence, requiring no external persona for validation.'] },
      { p: 'Bottom Line Trade-off', t: 'When the price of pursuing truth is the loss of immense tangible interests, offending insurmountable power, or even total ruin, does an impassable logical bottom line still exist within your core?', o: ['Interests supreme; truth is a tradable, compromise-ready commodity.', 'Bottom line is exceedingly blurry; contingent on the offered price.', 'Upholds truth within safe parameters; retreats when the line is touched.', 'Possesses exceptionally firm internal principles; unyielding under immense pressure.', 'Wields martyr-like purity; abandons all secular leverage for the sake of veracity.'] },
      { p: 'Interest Introspection', t: 'When making any major value judgment, do you possess an almost cruel "self-uglification" capacity—to excavate and acknowledge the hidden selfish motives lurking beneath the noble cloak of morality?', o: ['Firmly believes in personal selflessness; speaks purely from conscience.', 'Occasionally reflects, but easily slips into the trap of self-moving.', 'Knows personal selfishness exists, but rarely dissociates it from grand narratives.', 'Possesses potent self-examination, perpetually vigilant against cognitive selfishness.', 'Excises personal interest filters with surgical precision, leaving only pure logic.'] },

      { p: 'Emotional Awareness', t: 'In moments of extreme anger, ecstasy, or terror, do you possess a "third eye" capable of coldly hovering above, observing your emotionally hijacked self and your rapidly deforming judgment?', o: ['Totally consumed by emotion; devoid of awareness.', 'Realizes it only after the fact; incapable of on-the-spot control.', 'Occasionally aware of emotional interference, but powerless to escape.', 'Possesses strong in-situ awareness; rapidly isolates emotion from fact.', 'Wields master-level emotional dissociation; utilizes emotion as a decision radar rather than a stumbling block.'] },
      { p: 'Discomfort vs. Truth', t: 'When information evokes intense "physiological discomfort" or cognitive tearing, is your first reflex to deny its veracity out of defense, or to recognize it as the precise light of truth shattering your cognitive boundaries?', o: ['Extreme resistance to discomfort; outright nullifies the information\'s value.', 'Prone to rejecting it due to emotional backlash.', 'Requires a period of digestion before viewing it rationally.', 'Overcomes psychological discomfort; acutely captures valuable truth within.', 'Actively embraces cognitive tearing, recognizing it as the labor pains of cognitive ascension.'] },
      { p: 'Failure Aversion', t: 'When facing a high-risk, high-reward game fraught with immense variables, do you abandon the opportunity out of an extreme fear of "failure," cowering in the comfort zone to preserve pitiful security?', o: ['Extreme fear of failure; absolutely refuses any risk.', 'Ultra-conservative; demands 100% certainty before acting.', 'Average risk tolerance; retreats at the slightest setback.', 'Rationally assesses failure probabilities; willing to bet as long as the expected value is positive.', 'Possesses immense anti-fragility; extracts maximum residual value from defeat.'] },
      { p: 'Ego Management', t: 'What does admitting your own stupidity, short-sightedness, and incompetence mean to you? To maintain fragile self-esteem, have you ever stubbornly persisted in a wrong direction, ultimately paying a catastrophic price?', o: ['Absolutely never admits fault; ego above all.', 'Extreme fear of losing face; prefers to perpetuate errors.', 'Internally acknowledges, but struggles to bow publicly.', 'Candidly admits ignorance, executing immediate stop-loss.', 'Completely detoxified from the primitive emotion of "face"; pursues only objective victory.'] },
      { p: 'Impulse Control', t: 'When facing extreme provocation or highly seductive traps, can you forcibly "downclock" your system, severing immediate stress responses, awaiting the restoration of cold cognition before executing a dimensional strike?', o: ['Detonates instantly; acts entirely on instinct.', 'Reacts rapidly, but usually with irrational impulse.', 'Can suppress it, but endures internal injury, incapable of rational thought.', 'Knows to hit the pause button; makes decisions only after calm review.', 'Attains the realm of "unchanged before a collapsing mountain"; emotional response is fully decoupled from decision-making.'] },
      { p: 'Trigger Mechanism', t: 'Have you established a "minefield map" for your cognitive system, explicitly marking which specific words, scenarios, or demographics are most likely to trigger your emotional dysregulation and cognitive degradation?', o: ['Utterly unaware of when personal collapse will occur.', 'Vaguely aware, but never considered proactive prevention.', 'Conscious of it, but struggles to control it when triggered.', 'Knows personal minefields; proactively detours before stepping on a mine.', 'Not only defuses mines perfectly, but utilizes reverse-trigger mechanisms to expose vulnerabilities in others.'] },

      { p: 'Bottom Line Thinking', t: 'Before launching a major decision, do you ruthlessly simulate the "worst-case scenario," confirming that even in the event of an extreme black swan, you and your backing system retain survivability?', o: ['Never considers the worst-case; always trusts in personal luck.', 'Fears confronting the worst outcome; deliberately avoids thinking about it.', 'Can conceive of it, but frequently harbors a fluke mentality.', 'Strictly implements bottom-line thinking, ensuring system resistance to extreme impacts.', 'Seeks opportunity within crisis; even exploits extreme black swans for reverse harvesting.'] },
      { p: 'Opportunity Cost', t: 'When facing a choice, is your vision fixed solely on immediate direct returns, or can you survey the abandoned path (invisible loss) from a higher vantage point and calculate the difference in expected values?', o: ['Only perceives immediate gains and losses; zero awareness of opportunity cost.', 'Roughly compares, but frequently miscalculates.', 'Aware of opportunity cost, but incapable of precise quantification.', 'Accurately calculates expected values under double-blind tests, deriving the optimal solution.', 'Possesses a panoramic perspective; instantly calculates optimal paths within complex multi-dimensional games.'] },
      { p: 'Perfectionism', t: 'Are you a paralyzed decision-maker pursuing "absolute correctness," or a pragmatist well-versed in "gray thinking," capable of executing the "relatively optimal solution" amidst extreme information scarcity?', o: ['Extremely agonizing; misses every window for perfection.', 'Always requires 100% information before daring to act.', 'Can decide, but frequently delays the decisive moment through hesitation.', 'Proficient in the essence of gray decisions; decisively bets in the fog.', 'Becomes the master of probability; all decisions aim to accumulate "win rates" rather than demanding perfection.'] },
      { p: 'Post-Decision Dissonance', t: 'When your major decision is proven an utter failure by reality, do you expend immense time in internal friction, regret, and self-negation, or do you instantly sever sunk costs and expressionlessly initiate the next game?', o: ['Plunges into long-term regret; utterly unable to extricate oneself.', 'Held hostage by sunk costs; stubbornly guards the failed endgame.', 'Although capable of stop-loss, requires an extensive period of psychological construction.', 'Can ruthlessly cut losses; immediately restarts after reviewing.', 'Attains a "ruthless and selfless" state; the past is merely prologue, forever focusing solely on probability and the future.'] },
      { p: 'Camp Anxiety', t: 'When facing a perplexing, complex situation, if you refrain from immediately taking sides and maintain absolute neutrality, do you yield to pressure and make a coerced judgment out of the intense fear of being abandoned by both sides?', o: ['Extreme fear of isolation; must immediately find a master to serve.', 'Easily captured by both sides\' emotions; coerced into statements.', 'Can persist for a while, but cannot withstand prolonged isolation.', 'Possesses immense cognitive stability; persists until the truth surfaces.', 'Savoring absolute solitude; viewing neutrality and observation as the supreme dimensional strike.'] },
      { p: 'Fault Tolerance', t: 'Can you withstand immense tangible costs, or even the desertion of all allies, still relying on your inner logical foundation to endure the loneliness of "being at war with the entire world"?', o: ['Totally incapable of bearing pressure; capitulates instantly.', 'Yields bottom lines the moment the price rises.', 'Can persist temporarily, but eventually compromises with reality.', 'Possesses formidable anti-fragile psychology; endures extreme isolation and suppression.', 'Harbors the fusion of a martyr\'s fanaticism and absolute rationality; before truth, the entire world is merely a backdrop.'] },
      { p: 'Decision Matrix', t: 'Are your major life or investment decisions based on a continuously evolving "decision algorithm matrix" with multi-dimensional weight calculations, or merely reliant on intuitive brain-storming and drifting luck?', o: ['Entirely a random walk; decisions made purely on feeling.', 'Occasionally reviews, but no fixed decision framework.', 'Scattered frameworks exist in the mind, but un-systematized.', 'Established a comprehensive decision SOP, strictly executed.', 'Elevated the decision system into a precision algorithm, executing ruthlessly and accurately like an AI.'] }
    ]
  };

  var current = 'zh';

  function t(key) {
    var pack = DICT[current] || DICT.zh;
    if (Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
    if (Object.prototype.hasOwnProperty.call(DICT.zh, key)) return DICT.zh[key];
    return key;
  }

  function getQuestions() { return QUESTIONS_DATA[current] || QUESTIONS_DATA.zh; }
  function getLang() { return current; }

  function applyText() {
    document.querySelectorAll('[data-bs-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-bs-i18n');
      if (k === 'footLicense' || k === 'heroLedeRest' || k === 'whatIsDescPre') {
        el.innerHTML = t(k);
      } else {
        el.textContent = t(k);
      }
    });

    document.querySelectorAll('[data-bs-i18n-aria]').forEach(function (el) {
      el.setAttribute('aria-label', t(el.getAttribute('data-bs-i18n-aria')));
    });
    
    // 兼容全局导航
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key);
      if (val !== key && val !== undefined) {
        if (el.children.length > 0) {
          for (var i = 0; i < el.childNodes.length; i++) {
            if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.trim()) {
              el.childNodes[i].nodeValue = val;
              break;
            }
          }
        } else {
          el.textContent = val;
        }
      }
    });
  }

  function apply(lang, opts) {
    current = (lang === 'en') ? 'en' : 'zh';
    document.documentElement.lang = (current === 'en') ? 'en' : 'zh-CN';

    applyText();
    document.title = t('pageTitle');

    var btn = document.getElementById('langBtn');
    if (btn) {
      var z = btn.querySelector('.zh'), e = btn.querySelector('.en');
      if (z && e) {
        z.classList.toggle('active', current === 'zh');
        e.classList.toggle('active', current === 'en');
      }
    }

    if (!opts || !opts.silent) {
      try { localStorage.setItem('lang', current); } catch (err) { }
    }

    document.dispatchEvent(new CustomEvent('co:langchange', { detail: { lang: current } }));
  }

  function setLang(lang) { apply(lang); }
  function toggle() { apply(current === 'zh' ? 'en' : 'zh'); }

  function init() {
    var btn = document.getElementById('langBtn');
    if (btn) {
      btn.addEventListener('click', function() {
        toggle(); 
      });
    }

    var saved = null;
    try { saved = localStorage.getItem('lang'); } catch (e) { saved = null; }

    setTimeout(function () {
      apply(saved === 'en' ? 'en' : 'zh', { silent: true });
    }, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.CO_I18N = {
    DICT: DICT,
    QUESTIONS_DATA: QUESTIONS_DATA,
    t: t,
    getQuestions: getQuestions,
    getLang: getLang,
    setLang: setLang,
    toggle: toggle,
    apply: apply
  };
})(window);