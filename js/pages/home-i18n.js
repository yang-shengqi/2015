/* ============================================================ 
 * home-i18n.js —— 首页 + 全局导航 完整词典（最终修复版）
 * ============================================================ */
(function (global) {
  'use strict';

  var homeDict = {
    zh: {
      /* ================= 1. 全局导航 & 页脚 ================= */
      "brandName": "杨晟琦 · 独立思想锚点",
      "navHome": "首页",
      "navThinking": "思维类",
      "navThinking1": "乱世 · 生存与财富自由的实战宝典",
      "navThinking2": "传承 · 家族后辈们的启蒙家书",
      "navQuant": "量化类",
      "navQuant1": "全球 · 市场量化工具工作台",
      "navQuant2": "全球 · 全天候永久投资组合",
      "navQuant3": "美国 · Charles Schwab 仪表盘",
      "navDiagnose": "诊断类",
      "navDiagnose1": "WJP · 法治指数地图",
      "navDiagnose2": "经济 · 数据趋势与真实性检验",
      "navDiagnose3": "思维 · 人类思维盲区诊断工具",
      "navDiagnose4": "诊断 · 文明等级在线评分器",
      "navUtility": "实用类",
      "navUtility1": "色彩 · 色彩分析工具",
      "navUtility2": "加密 · 网页军功级加密工具",
      "navUtilityMarkdown": "文字 · Markdown 编辑器",

      /* ================= 2. Hero 首屏 ================= */
      "home_badge": "杨晟琦的核心工具箱 · 独立思想锚点",
      "home_hero_title": "Yang Shengqi's Core Toolbox<br><span class='text-indigo'>The Intellectual Anchor.</span>",
      "home_hero_desc1": "本站从宏观到微观，从理论到实操，从防守到进攻，从本土到全球，已经构建了一个非常成熟、专业且逻辑自洽的\"个人/家族/机构全天候投资体系\"。",
      "home_hero_desc2": "其核心逻辑可以概括为\"认知—避险—执行—配置—增长—落地—升华\"。",
      "home_hero_desc3": "它不仅仅是一份投资指南，更是一份\"财富自由的施工图\"，可以传承下去的全天候永续资产。",
      "home_btn_explore": "Explore Portfolio ➔",
      "home_btn_read": "Read the Legacy ➔",

      /* ================= 3. 亮点卡片区 ================= */
      "home_hl1_title": "思维类",
      "home_hl1_desc": "从认知觉醒到具体执行，其核心逻辑可以概括为\"认知—避险—执行—配置—增长—落地—升华\"。",
      "home_hl2_title": "量化类",
      "home_hl2_desc": "量化类主要指利用数学、统计和计算机技术进行金融市场分析和交易的策略、基金及职业方向。",
      "home_hl3_title": "诊断类",
      "home_hl3_desc": "通过量化指标和模型对系统进行体检，识别潜在风险与盲区，为决策提供客观的数据支撑。",
      "home_hl4_title": "实用类",
      "home_hl4_desc": "提供极简高效的日常实用工具，包括色彩提取、文本编辑与隐私加密，让工作更加得心应手。",

      /* ================= 4. 思维与宏观诊断 ================= */
      "home_diag_title": "底层逻辑 · 思维与宏观诊断",
      "home_diag_desc1": "财富只是认知的副产品。比财富更底层的，是你解码世界的方式。",
      "home_diag_desc2": "向内审视，打破禁锢你的思维盲区；向外丈量，看透系统运转的真实骨架。",
      
      "home_diag1_badge": "向内探寻 · 认知系统",
      "home_diag1_title": "人类思维盲区诊断",
      "home_diag1_tag1": "38 个元认知问题",
      "home_diag1_tag2": "6 维度交叉验证",
      "home_diag1_desc1": "你以为的独立思考，真的是独立思考吗？深度扫描你的思维习惯，撕开思维的隐秘盲区。你的认知框架，是否正在将你囚禁？",
      "home_diag1_desc2": "通过 38 个关于“底层思维架构”的深度诘问，对你的认知防御机制进行外科手术式的扫描。采用 6维度 × 3层次 交叉验证矩阵，输出具有学术级颗粒度的解构报告。",
      "home_diag1_action": "开始诊断 <span>➔</span>",

      "home_diag2_badge": "向外丈量 · 系统检验",
      "home_diag2_title": "文明等级在线评分器",
      "home_diag2_tag1": "三大基石门禁",
      "home_diag2_tag2": "四大要素量化",
      "home_diag2_desc1": "你的社会真的走在文明演化的正轨上吗？透视体制运转的真实底色，剥离宏大叙事的数据粉饰。你所在的生存系统，究竟卡在了哪一层阶段？",
      "home_diag2_desc2": "通过三大基石门禁实行一票否决，对四大要素下的 18 个子项进行精准量化。《文明等级在线评分器》引入司法纠错机制的折扣惩罚，最终输出一份不带滤镜的文明等级诊断报告。",
      "home_diag2_action": "开始评分 <span>➔</span>",

      "home_diag3_badge": "数据地图 · 全球视野",
      "home_diag3_title": "WJP · 法治指数地图",
      "home_diag3_tag1": "八维度评估",
      "home_diag3_tag2": "全球交互地图",
      "home_diag3_desc1": "权力是否被关进笼子？法治建设水平不仅关乎正义，更关乎资产与人身安全的制度底色。",
      "home_diag3_desc2": "基于世界正义工程（WJP）数据，将全球各国家与地区的政府权力约束、基本权利保障、司法公正等八大维度进行可视化量化评估，直观透视国家间的制度落差。",
      "home_diag3_action": "查看数据地图 <span>➔</span>",

      "home_diag4_badge": "真实检验 · 数据打假",
      "home_diag4_title": "经济数据 · 趋势与真实性",
      "home_diag4_tag1": "实物锚背离",
      "home_diag4_tag2": "克强指数对照",
      "home_diag4_desc1": "官方的增长数据，是否经得起实物与常识的检验？当纸面繁荣与底层体感发生严重撕裂，真相在哪里？",
      "home_diag4_desc2": "当官方 GDP 与实物锚、税收、价格长期背离时，工具会亮灯。通过克强指数对照、税收-GDP 弹性、平减指数一致性等核心指标交叉比对，戳破宏观数据的幻象。",
      "home_diag4_action": "查看趋势数据 <span>➔</span>",

      /* ================= 5. 倒计时、辖区、货币 ================= */
      "home_countdown_title": "最终防御 · 战略窗口期",
      "home_countdown_desc1": "宏观叙事的转折往往悄无声息，当规则开始重构，留给个人构建反脆弱系统的时间，已经屈指可数。",
      "home_countdown_desc2": "历史不会简单重复，但总是押着相同的韵脚。失去历史纵深的思维，注定会在周期交替时被无情收割。",
      
      "home_region_title": "法治基石 · 司法管辖区架构",
      "home_region_desc1": "法治与契约精神是投资决策的基石，钱只能投往尊重契约、法治完善、有流动性、有安全保障的国家和地区。",
      "home_region_desc2": "全球法治状况的持续恶化，归因于对政府权力的制约、开放政府、基本权利以及司法公正等方面的不断削弱。",
      "home_region1_name": "香港 / 新加坡",
      "home_region1_role": "主投资平台 · 定投执行 · 大额出金通道",
      "home_region2_name": "美国",
      "home_region2_role": "底层资产托管 · 全球前十资管产品",
      "home_region3_name": "卢森堡",
      "home_region3_role": "UCITS 基金架构 · 欧盟监管框架",

      "home_currency_title": "风险对冲 · 反脆弱货币篮子",
      "home_currency_desc1": "单一法币 + 单一市场 + 单一配置，构成一个三元共振的脆弱系统。",
      "home_currency_desc2": "当危机来临，汇率贬值、市场崩盘、资产缩值往往不是先后发生，而是同时爆发并相互强化。这时，损失不是三项相加，而是“三项相乘”。",
      "home_curr_usd": "美元 · 储备核心",
      "home_curr_eur": "欧元 · 区域霸主",
      "home_curr_jpy": "日元 · 套利避险",
      "home_curr_chf": "瑞郎 · 绝对避险",
      "home_curr_gbp": "英镑 · 风险敏感",
      "home_curr_cad": "加元 · 商品货币",
      "home_curr_aud": "澳元 · 商品货币",
      "home_curr_sgd": "新加坡元 · 稳健",
      "home_curr_cny": "人民币 · 政策驱动",
      "home_curr_hkd": "港元（并入美元）",
      "home_currency_note": "💡 美元锚定价值，瑞郎日元避险，商品货币博取收益。<strong>用“大数定律”对抗“汇率黑天鹅”，对冲“单一法币风险”。</strong>",

      /* ================= 6. 核心配置架构 ================= */
      "home_config_title": "绝对纪律 · 核心配置架构",
      "home_config_desc1": "它不仅仅是一份投资指南，更是一份\"财富自由的施工图\"，可以传承下去的全天候永续资产。",
      "home_config_desc2": "只要执行者能克服人性的弱点（追涨杀跌），严格按照这个体系配置，长期实现财富保值增值是百分之百的事件。",
      "home_config_split_title": "分红 70% / 不分红 30%",
      "home_config_split_status": "合规（偏差 ≤5%）",
      "home_config_split_dividend": "分红 70.00%",
      "home_config_split_accumulate": "不分红 30.00%",
      "home_config_asset_summary": "债券 60% / 股票 35% / 现金及其它 5%",
      "home_config_asset_sub": "长期目标战略基准（Target Weights）",
      "home_config_asset_stock": "股票",
      "home_config_asset_bond": "债券",
      "home_config_asset_cash": "现金",
      "home_config_asset_other": "其它",

      /* ================= 7. 交易终端 / 图表 / 色彩库 / 编辑器 / 加密 ================= */
      "home_install_title": "量化实操 · 构建个人交易终端",
      "home_install_desc1": "所有精妙的宏观推演与量化模型，最终都需要在真实的交易系统中落地执行。",
      "home_install_desc2": "从底层全局数据的下载、主副图指标的精准安装，到多维度选股器的层层嵌套，严格遵守操作顺序，杜绝执行偏差。",
      "home_install_action": "Enter Full Version ➔",
      "home_install_card1_title": "📈 安装主系统 / 分时系统",
      "home_install_card1_sub": "全局数据 · 下载本地 · 自动量化",
      "home_install_card1_row1": "安装系统主图 + 副图（合计2个）",
      "home_install_card1_row2": "安装分时主图 + 副图（合计3个）",
      "home_install_card1_row3": "安装全局因子（合计1个）",
      "home_install_card1_row4": "下载全局数据",
      "home_install_card2_title": "📈 安装量化选股器",
      "home_install_card2_sub": "总共八层 · 层层嵌套 · 禁止跳跃",
      "home_install_card2_row1": "安装基础选股器",
      "home_install_card2_row2": "安装小多选股器",
      "home_install_card2_row3": "安装中多选器",
      "home_install_card2_row4": "下面有详细步骤",

      "home_chart_title": "量化引擎 · 数据驱动的交易闭环",
      "home_chart_desc1": "现代投资不再依赖直觉，而是依赖对全局数据的严密计算与模型验证。从深度量化分析到全天候资产配置，数据是决策的最底层逻辑。",
      "home_chart_desc2": "用<span class='text-hl'>色彩</span>透视复杂的数据图表，用<span class='text-hl'>编辑器</span>沉淀硬核的量化研报，用<span class='text-hl'>加密工具</span>守护核心交易策略。从分析到执行，打造你专属的量化工作台。",
      "home_chart_action": "Enter Full Version ➔",
      "home_chart_donut_title": "资产占比模拟",
      "home_chart_donut_sub": "虚拟配置权重 · 当前状态",
      "home_chart_bar_title": "个股已实现盈亏模拟",
      "home_chart_bar_sub": "今年以来绝对收益 (美元)",

      "home_color_title": "视觉分析 · 看见完整的色彩语言",
      "home_color_desc1": "基于 OKLCH 现代色彩空间的纯前端分析工具，从精准取色到多格式导出，一站式搞定。",
      "home_color_desc2": "只需一张图，即可生成色彩分布、蜂窝色板与全套 CSS 渐变方案，无缝导出 ACO / ASE 工业级格式。",
      "home_color_action": "Enter Full Version ➔",
      "home_color_tab1": "莫兰迪色库",
      "home_color_tab2": "中式色库",
      "home_color_tab3": "日式色库",
      "home_color_tab4": "赛博色库",
      "home_color_tab5": "无限制色库",
      "home_color_morandi_h3": "莫兰迪色库 · 高级灰",
      "home_color_morandi_p1": "源自意大利画家乔治·莫兰迪的静物画。低饱和、灰调、柔和的色彩组合，彼此之间没有强烈对比，像被岁月磨平的棱角，呈现出一种克制的朦胧美。",
      "home_color_morandi_p2": "这种自带治愈感的高级灰，极其耐看且不喧宾夺主。非常适合需要沉静气质的界面设计、家居空间以及极简主义的美学表达。",

      "home_md_title": "满血内核 · Markdown · 专业级编辑器",
      "home_md_desc1": "原生支持 KaTeX 数学公式与 Mermaid 图表，毫秒级极速渲染，数据纯本地离线存储。所见即所得的双屏编辑体验。",
      "home_md_desc2": "无需网络、无需注册，所有代码与文本绝不离开你的设备。为极客打造纯粹、安全且没有任何后顾之忧的创作环境。",
      "home_md_action": "Enter Full Version ➔",
      "home_md_src": "源码区",
      "home_md_preview": "预览区",
      "home_md_footer_src": "行数: 26 | 字数: 112",
      "home_md_footer_preview": "实时渲染已就绪 · 12ms",

      "home_encrypt_title": "隐私防线 · 网页军功级加密",
      "home_encrypt_desc1": "你的宏观推演、量化策略、甚至是私人资产配置截图，不该裸奔在公网。",
      "home_encrypt_desc2": "全程在浏览器本地加密，密码不离开你的设备；生成一个带密码提示框的独立 HTML 文件，上传到任何静态托管即可使用。",
      "home_encrypt_action": "Enter Full Version ➔",
      "home_encrypt_badge": "StatiCrypt: 纯前端资产与隐私保护",
      "home_encrypt_h1": "给你的核心策略加一道 <span class='text-accent'>密码锁</span>",
      "home_encrypt_p1": "没有云端服务器，没有可被扫描的后台漏洞。",
      "home_encrypt_p2": "你的核心量化参数、家族资产的底层逻辑，将被封装进一个只有持有密钥才能打开的专属保险箱。无需后端，无需配置，生成即用，真正的极客安全，是对核心数据主权进行物理级别的绝对掌控。",
      "home_encrypt_tag1": "AES-256-CBC 硬件级加密",
      "home_encrypt_tag2": "PBKDF2 58.5万次防爆破",
      "home_encrypt_tag3": "HMAC-SHA256 防篡改校验",
      "home_encrypt_tag4": "纯本地 / 零网络请求"
    },
    
    en: {
      /* ================= 1. 全局导航 & 页脚 ================= */
      "brandName": "Yang Shengqi's · The Intellectual Anchor",
      "navHome": "Home",
      "navThinking": "Thinking",
      "navThinking1": "Survival & Wealth Bible",
      "navThinking2": "Legacy Letters",
      "navQuant": "Quant",
      "navQuant1": "Global Market Dashboard",
      "navQuant2": "All-Weather Portfolio",
      "navQuant3": "Charles Schwab Dashboard",
      "navDiagnose": "Diagnostics",
      "navDiagnose1": "WJP Rule of Law Map",
      "navDiagnose2": "Economic Data Diagnostics",
      "navDiagnose3": "Cognitive Blind Spots",
      "navDiagnose4": "Civilization Scorer",
      "navUtility": "Utilities",
      "navUtility1": "Color Analysis",
      "navUtility2": "HTML Encrypter",
      "navUtilityMarkdown": "Markdown Editor",

      /* ================= 2. Hero 首屏 ================= */
      "home_badge": "Yang Shengqi's Core Toolbox · The Intellectual Anchor",
      "home_hero_title": "Yang Shengqi's Core Toolbox<br><span class='text-indigo'>The Intellectual Anchor.</span>",
      "home_hero_desc1": "From macro to micro, theory to practice, defense to offense, local to global, a mature and professional all-weather investment system.",
      "home_hero_desc2": "The core logic: Cognition — Risk Aversion — Execution — Allocation — Growth — Landing — Sublimation.",
      "home_hero_desc3": "Not just a guide, but a blueprint for wealth freedom and a perpetual, inheritable asset.",
      "home_btn_explore": "Explore Portfolio ➔",
      "home_btn_read": "Read the Legacy ➔",

      /* ================= 3. 亮点卡片区 ================= */
      "home_hl1_title": "Thinking",
      "home_hl1_desc": "From cognitive awakening to concrete execution: Cognition — Risk Aversion — Execution — Allocation — Growth — Landing — Sublimation.",
      "home_hl2_title": "Quant",
      "home_hl2_desc": "Using math, statistics, and computer science for financial market analysis, trading strategies, funds, and career directions.",
      "home_hl3_title": "Diagnostics",
      "home_hl3_desc": "System checkups using quantitative metrics and models to identify risks and blind spots, providing objective data for decisions.",
      "home_hl4_title": "Utilities",
      "home_hl4_desc": "Minimalist and efficient daily tools including color extraction, text editing, and privacy encryption to make work smoother.",

      /* ================= 4. 思维与宏观诊断 ================= */
      "home_diag_title": "Underlying Logic · Cognitive & Macro Diagnostics",
      "home_diag_desc1": "Wealth is a byproduct of cognition. More fundamental than wealth is how you decode the world.",
      "home_diag_desc2": "Look inward to break through cognitive blind spots; look outward to see the true skeleton of system operations.",
      
      "home_diag1_badge": "Inward · Cognitive System",
      "home_diag1_title": "Cognitive Blind Spot Diagnostic",
      "home_diag1_tag1": "38 Metacognitive Questions",
      "home_diag1_tag2": "6-Dimensional Cross-Validation",
      "home_diag1_desc1": "Is your independent thinking truly independent? Deeply scan your thinking habits and tear open hidden blind spots. Is your cognitive framework imprisoning you?",
      "home_diag1_desc2": "Through 38 deep inquiries into your underlying cognitive architecture, perform a surgical scan of your cognitive defense mechanisms using a 6-dimension × 3-level matrix, outputting an academic-grade deconstruction report.",
      "home_diag1_action": "Start Diagnostics <span>➔</span>",

      "home_diag2_badge": "Outward · System Check",
      "home_diag2_title": "Civilization Level Scorer",
      "home_diag2_tag1": "Three Cornerstone Gates",
      "home_diag2_tag2": "Four Elements Quantified",
      "home_diag2_desc1": "Is your society really on the right track of civilizational evolution? See the true colors of institutional operations, stripping away grand narrative whitewashing. Which stage is your survival system stuck in?",
      "home_diag2_desc2": "With three cornerstone gates applying a veto, precisely quantify 18 sub-items under four elements. The scorer introduces a discount penalty for judicial correction mechanisms, ultimately outputting a filter-free civilization level diagnostic report.",
      "home_diag2_action": "Start Scoring <span>➔</span>",

      "home_diag3_badge": "Data Map · Global Vision",
      "home_diag3_title": "WJP · Rule of Law Index Map",
      "home_diag3_tag1": "Eight-Dimension Assessment",
      "home_diag3_tag2": "Global Interactive Map",
      "home_diag3_desc1": "Is power in a cage? The level of rule of law relates not just to justice, but to the institutional foundation of asset and personal safety.",
      "home_diag3_desc2": "Based on WJP data, visually quantify and evaluate eight dimensions including constraints on government power, fundamental rights, and judicial justice across countries, intuitively revealing institutional gaps.",
      "home_diag3_action": "View Data Map <span>➔</span>",

      "home_diag4_badge": "Authenticity Check · Data Audit",
      "home_diag4_title": "Economic Data · Trends & Authenticity",
      "home_diag4_tag1": "Physical Anchor Divergence",
      "home_diag4_tag2": "Keqiang Index Comparison",
      "home_diag4_desc1": "Can official growth data withstand tests of physical reality and common sense? When paper prosperity tears apart from grassroots experience, where is the truth?",
      "home_diag4_desc2": "When official GDP diverges from physical anchors, taxes, and prices long-term, the tool alerts. Cross-compare core indicators like the Keqiang Index, tax-GDP elasticity, and deflator consistency to pierce the illusion.",
      "home_diag4_action": "View Trend Data <span>➔</span>",

      /* ================= 5. 倒计时、辖区、货币 ================= */
      "home_countdown_title": "Final Defense · Strategic Window",
      "home_countdown_desc1": "Macro narrative turns are silent. As rules restructure, time to build an anti-fragile system is running out.",
      "home_countdown_desc2": "History doesn't repeat, but rhymes. Thinking without historical depth will be harvested in cycle transitions.",
      
      "home_region_title": "Legal Foundation · Jurisdictional Architecture",
      "home_region_desc1": "Rule of law and contract spirit are foundations. Capital goes to countries and regions with contracts, rule of law, liquidity, and security.",
      "home_region_desc2": "The continuous deterioration of global rule of law is due to weakening constraints on government, open government, fundamental rights, and judicial justice.",
      "home_region1_name": "Hong Kong / Singapore",
      "home_region1_role": "Main Platform · DCA · Large Withdrawal Channels",
      "home_region2_name": "United States",
      "home_region2_role": "Underlying Asset Custody · Global Top 10 Asset Products",
      "home_region3_name": "Luxembourg",
      "home_region3_role": "UCITS Fund Structure · EU Regulatory Framework",

      "home_currency_title": "Risk Hedge · Anti-Fragile Currency Basket",
      "home_currency_desc1": "Single fiat + single market + single allocation forms a triple-resonance fragile system.",
      "home_currency_desc2": "When crisis hits, currency depreciation, market crashes, and asset shrinkage don't happen sequentially, but simultaneously. Losses aren't added, but multiplied.",
      "home_curr_usd": "USD · Reserve Core",
      "home_curr_eur": "EUR · Regional Hegemon",
      "home_curr_jpy": "JPY · Arbitrage Haven",
      "home_curr_chf": "CHF · Absolute Haven",
      "home_curr_gbp": "GBP · Risk Sensitive",
      "home_curr_cad": "CAD · Commodity Currency",
      "home_curr_aud": "AUD · Commodity Currency",
      "home_curr_sgd": "SGD · Steady",
      "home_curr_cny": "CNY · Policy Driven",
      "home_curr_hkd": "HKD (Pegged to USD)",
      "home_currency_note": "💡 USD anchors value, CHF/JPY hedge risk, commodity currencies gain yield. <strong>Use the 'Law of Large Numbers' against 'Exchange Rate Black Swans' to hedge 'Single Fiat Risks'.</strong>",

      /* ================= 6. 核心配置架构 ================= */
      "home_config_title": "Absolute Discipline · Core Allocation Architecture",
      "home_config_desc1": "It's not just a guide, but a \"blueprint for wealth freedom,\" a perpetual, inheritable asset.",
      "home_config_desc2": "As long as executors overcome human weaknesses (chasing highs, selling lows) and strictly follow this system, long-term wealth preservation and appreciation is guaranteed.",
      "home_config_split_title": "Distributing 70% / Accumulating 30%",
      "home_config_split_status": "Compliant (Deviation ≤5%)",
      "home_config_split_dividend": "Distributing 70.00%",
      "home_config_split_accumulate": "Accumulating 30.00%",
      "home_config_asset_summary": "Bonds 60% / Stocks 35% / Cash & Others 5%",
      "home_config_asset_sub": "Long-term Target Weights",
      "home_config_asset_stock": "Stocks",
      "home_config_asset_bond": "Bonds",
      "home_config_asset_cash": "Cash",
      "home_config_asset_other": "Others",

      /* ================= 7. 交易终端 / 图表 / 色彩库 / 编辑器 / 加密 ================= */
      "home_install_title": "Quant Practice · Build Your Trading Terminal",
      "home_install_desc1": "All macro deductions and quant models must be executed in real trading systems.",
      "home_install_desc2": "From downloading global data, installing main/sub chart indicators, to nesting multi-dimensional stock screeners. Follow the order strictly to avoid execution deviation.",
      "home_install_action": "Enter Full Version ➔",
      "home_install_card1_title": "📈 Install Main / Intraday System",
      "home_install_card1_sub": "Global Data · Local Download · Auto Quant",
      "home_install_card1_row1": "Install system main + sub charts (2 total)",
      "home_install_card1_row2": "Install intraday main + sub charts (3 total)",
      "home_install_card1_row3": "Install global factors (1 total)",
      "home_install_card1_row4": "Download global data",
      "home_install_card2_title": "📈 Install Quant Screener",
      "home_install_card2_sub": "8 Layers · Nested · No Skipping",
      "home_install_card2_row1": "Install base screener",
      "home_install_card2_row2": "Install minor screener",
      "home_install_card2_row3": "Install median screener",
      "home_install_card2_row4": "Detailed steps below",

      "home_chart_title": "Quant Engine · Data-Driven Trading Loop",
      "home_chart_desc1": "Modern investing relies on rigorous calculation and model validation, not intuition. From deep quant analysis to all-weather allocation, data is the underlying logic.",
      "home_chart_desc2": "Use <span class='text-hl'>Color</span> to see through complex data charts, <span class='text-hl'>Editor</span> to precipitate hardcore quant research, and <span class='text-hl'>Encryption Tools</span> to guard your core trading strategies. From analysis to execution, build your exclusive quant workstation.",
      "home_chart_action": "Enter Full Version ➔",
      "home_chart_donut_title": "Asset Allocation Simulation",
      "home_chart_donut_sub": "Virtual Weights · Current Status",
      "home_chart_bar_title": "Stock Realized P&L Simulation",
      "home_chart_bar_sub": "YTD Absolute Return (USD)",

      "home_color_title": "Visual Analysis · See the Full Language of Color",
      "home_color_desc1": "Pure frontend analysis tool based on modern OKLCH color space, from precise color extraction to multi-format export.",
      "home_color_desc2": "Just one image to generate color distribution, honeycomb palettes, full CSS gradient schemes, and seamlessly export ACO/ASE industrial formats.",
      "home_color_action": "Enter Full Version ➔",
      "home_color_tab1": "Morandi Palette",
      "home_color_tab2": "Chinese Palette",
      "home_color_tab3": "Japanese Palette",
      "home_color_tab4": "Cyberpunk Palette",
      "home_color_tab5": "Unlimited Palette",
      "home_color_morandi_h3": "Morandi Palette · Premium Gray",
      "home_color_morandi_p1": "Derived from Italian painter Giorgio Morandi's still lifes. Low saturation, gray tones, soft combinations without strong contrast, presenting a restrained, hazy beauty.",
      "home_color_morandi_p2": "This healing premium gray is enduring and never steals the show. Perfect for quiet interface designs, home spaces, and minimalist aesthetic expressions.",

      "home_md_title": "Full Blooded · Markdown · Pro Editor",
      "home_md_desc1": "Native KaTeX math and Mermaid diagram support, millisecond rendering, pure local offline storage. WYSIWYG dual-screen experience.",
      "home_md_desc2": "No network, no registration, all code and text never leave your device. A pure, secure, and worry-free creative environment for geeks.",
      "home_md_action": "Enter Full Version ➔",
      "home_md_src": "Source Code",
      "home_md_preview": "Preview",
      "home_md_footer_src": "Lines: 26 | Words: 112",
      "home_md_footer_preview": "Ready · 12ms",

      "home_encrypt_title": "Privacy Defense · Military-Grade HTML Encryption",
      "home_encrypt_desc1": "Your macro deductions, quant strategies, or private asset screenshots shouldn't be running naked on the public web.",
      "home_encrypt_desc2": "Encrypted locally in the browser, password never leaves your device; generates an independent HTML file with a password prompt, ready for any static hosting.",
      "home_encrypt_action": "Enter Full Version ➔",
      "home_encrypt_badge": "StatiCrypt: Pure Frontend Asset & Privacy Protection",
      "home_encrypt_h1": "Add a <span class='text-accent'>Password Lock</span> to Your Core Strategy",
      "home_encrypt_p1": "No cloud servers, no backend vulnerabilities to be scanned.",
      "home_encrypt_p2": "Your core quant parameters and underlying logic of family assets will be sealed in an exclusive safe that only the key holder can open. No backend, no config, generate and use. True geek security is absolute physical control over core data sovereignty.",
      "home_encrypt_tag1": "AES-256-CBC Hardware Encryption",
      "home_encrypt_tag2": "PBKDF2 585k Iterations Anti-Brute Force",
      "home_encrypt_tag3": "HMAC-SHA256 Anti-Tamper",
      "home_encrypt_tag4": "Pure Local / Zero Network Requests"
    }
  };

  // 将词典合并进你的主引擎
  if (global.CO_I18N && global.CO_I18N.DICT) {
    Object.assign(global.CO_I18N.DICT.zh, homeDict.zh);
    Object.assign(global.CO_I18N.DICT.en, homeDict.en);
  }

  // 渲染逻辑
  function applyHomeLang(lang) {
    var d = homeDict[lang] || homeDict.zh;
    
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (d[key]) el.innerHTML = d[key]; 
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-html');
      if (d[key]) el.innerHTML = d[key];
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    var currentLang = localStorage.getItem('co-lang') || 'zh';
    applyHomeLang(currentLang);
    
    document.addEventListener('co:langchange', function(e) {
      applyHomeLang(e.detail.lang);
    });
  });

})(window);