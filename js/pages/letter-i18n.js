/* ============================================================
 * letter-i18n.js —— 家书页面专属词典
 * ============================================================ */
(function (global) {
  'use strict';

  var DICT = {
    zh: {
      'skipLink': '跳到主内容',
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
      'mobileGroupThink': '思维工具',
      'mobileGroupQuant': '量化工具',
      'mobileGroupDiag': '诊断工具',
      'mobileGroupUtil': '实用工具',

      'heroTitleA': '杨昕玉：你父亲给你 <em>未来的人生生存战略方案</em>',
      'heroLedeBold': '我和你八字不合，寅申冲；不适合做亲密陪伴，只适合做远距离战略支点。',
      'heroLedeRest': '我在为你铺一条可以合法、安全、体面地退出国内系统的路。 不依赖婚姻，不依赖体制，不依赖任何人施舍。 28 岁的时候就能拥有每年 7 万港元的被动收入，你可以<span class="hl">重启你的所有梦想！</span>',
      'heroChip1': '学英语', 'heroChip2': '学金融', 'heroChip3': '出国', 'heroChip4': '工作',

      'cdTitle': '家书已投递 · 正计时',
      'cdBadge': '⏳ 2026年7月3日起计时',
      'cdDate': '从 2026 年 7 月 3 日 至今',
      'cdSub': '每年生日读一遍家书，每天积累你的自由资产。',
      'cdD': '天', 'cdH': '时', 'cdM': '分', 'cdS': '秒',
      'cdElapsed': '已流逝', 'cdLive': '实时',

      'introTitle': '写在前面的话',
      'introP1': '这个国度已经结构性锁死、结构性收缩了；学艺术是死路，学金融必须结合境外实操。',
      'introP2': '没有钱就没有选择权，钱在国内不安全，必须变成境外合法资产。',
      'introP3': '你需要活着，活得从容，活得不被这个系统收割。',

      'ruleTitle': '中国 VS 香港 · WJP 法治数据 2024 对比',
      'ruleP1': '法治指数是衡量国家或地区法治建设水平的量化评估体系，由“世界正义工程”（WJP）提出，旨在通过标准化指标评估法治实践成效。',
      'ruleThDim': '维度', 'ruleThRank': '全球法治排名', 'ruleThIndex': '法治指数',
      'ruleChina': '中国', 'ruleChinaRank': '第 94 名', 'ruleHK': '香港', 'ruleHKRank': '第 23 名',
      'ruleP2': '该体系涵盖政府权力约束、廉洁程度、政府透明度、基本权利保障、秩序与安全、监管执法、民事司法、刑事司法等<strong>八个</strong>维度，结合调查统计与专家评审方式形成综合评分。',
      'ruleThDim2': '维度', 'ruleChina2': '中国', 'ruleHK2': '香港', 'ruleThGap': '具体差距与风险解读',
      'ruleD1': '政府权力约束', 'ruleD1Gap': '香港领先 <strong>75%</strong>（0.56 ÷ 0.32）。内地权力制衡机制薄弱，政策易受个人意志影响，存在“朝令夕改”风险。资产留在内地，可能因一纸文件而缩水；香港普通法下，政府行为受司法制约，政策可预期性更高。',
      'ruleD2': '廉洁程度', 'ruleD2Gap': '香港领先 <strong>55.6%</strong>（0.84 ÷ 0.54）。内地腐败风险意味着“灰色支出”是隐性成本；香港廉政公署（ICAC）的独立执法权使其廉洁度在全球前列，合法收入不会因“潜规则”被侵蚀。',
      'ruleD3': '政府透明度', 'ruleD3Gap': '香港领先 <strong>68.3%</strong>（0.69 ÷ 0.41）。内地信息不透明导致政策走向难以预判；香港的《公开资料守则》让公民有权查阅政府文件，可提前获知影响资产的政策变动。',
      'ruleD4': '基本权利保障', 'ruleD4Gap': '香港领先 <strong>136%</strong>（0.59 ÷ 0.25）。这是差距最大的维度之一。内地个体在面对公权力时缺乏有效申诉通道；香港的《人权法案条例》为居民提供司法救济渠道。',
      'ruleD5': '秩序与安全', 'ruleD5Gap': '香港领先 <strong>13.6%</strong>（0.92 ÷ 0.81）。这是两地差距最小的维度，内地社会治安确实是少有的优势项。但内地的高“秩序”建立在高强度监控和维稳之上，与香港的法治型秩序有本质区别。',
      'ruleD6': '监管执法', 'ruleD6Gap': '香港领先 <strong>60%</strong>（0.80 ÷ 0.50）。内地存在“选择性执法”和“运动式监管”，合规成本极不确定；香港监管机构独立性强，执法标准统一。',
      'ruleD7': '民事司法', 'ruleD7Gap': '香港领先 <strong>36.5%</strong>（0.71 ÷ 0.52）。内地合同纠纷解决周期长，地方保护主义可能干扰判决执行；香港普通法体系下，法院判决可在多个普通法地区承认和执行。',
      'ruleD8': '刑事司法', 'ruleD8Gap': '香港领先 <strong>51.1%</strong>（0.68 ÷ 0.45）。内地刑事程序中的“取保候审难”“羁押率高”等问题，使涉企案件中的个人极易被强制措施拖垮；香港坚持无罪推定与司法独立。',
      'ruleSummary': '💡 差距最大的是“基本权利保障”（+136%）和“政府权力约束”（+75%），这正是内地资产“不安全”的制度根源。香港的普通法体系，是未来资金安全、人身自由、契约执行的“制度防火墙”。',

      'langTitle': '语言范围',
      'langP1': '按主权国家（联合国成员国及普遍承认的国家）口径统计如下：',
      'langThLang': '语言', 'langThRegion': '国家 / 地区', 'langThRemark': '备注',
      'langZh': '中文', 'langZhCount': '2 个', 'langZhDetail': '中国（普通话）与新加坡（华语，与英语 / 马来语 / 泰米尔语并列）。',
      'langEn': '英语', 'langEnCount': '88 个', 'langEnDetail': '在 193 个联合国成员国中，约 58 个国家以英语为官方语言（含唯一官方或并列官方）。',
      'langSummary': '💡 英语是世界上官方语言覆盖国家最多的语言。在全球 142 个国家中，英语被列入国民教育体系的必修科目。',

      'fragTitle': '警告：单一结构系统的脆弱性',
      'fragP1': '单一法币 + 单一市场 + 单一配置，构成一个三元共振的脆弱系统。',
      'fragP2': '当危机来临，汇率贬值、市场崩盘、资产缩值往往不是先后发生，而是同时爆发并相互强化。',
      'fragP3': '这时，损失不是三项相加，而是“三项相乘”。',
      'fragSummary': '💡 法治与契约精神是投资决策的基石，钱只能投往尊重契约、法治完善、有流动性、有安全保障的国家和地区。',

      'currTitle': '反脆弱体系：最佳货币篮子组合',
      'currP1': '核心逻辑：全球化、分散化、多币种化、去中心化的资产拓扑结构，是唯一分摊风险的策略。',
      'currUsd': '美元 · 储备核心', 'currEur': '欧元 · 区域霸主', 'currJpy': '日元 · 套利避险', 'currChf': '瑞郎 · 绝对避险',
      'currGbp': '英镑 · 风险敏感', 'currCad': '加元 · 商品货币', 'currAud': '澳元 · 商品货币', 'currSgd': '新加坡元 · 稳健',
      'currCny': '人民币 · 政策驱动', 'currHkd': '港元（并入美元）',
      'currSummary': '💡 美元锚定价值，瑞郎日元避险，商品货币博取收益。<strong>用“大数定律”对抗“汇率黑天鹅”，对冲“单一法币风险”。</strong>',

      'pathTitle': '我给你的路',
      'pathP1': '四阶段执行表：',
      'pathP2': '这是你人生中唯一一段：没有房贷、没有家庭责任、没有 35 岁红线的时间。',
      'pathP3': '16 岁到毕业，是唯一一个你可以用最低代价、最高密度输入知识与技能的时间窗口。',
      'pathP4': '如果你错过了：23 岁之后，你的时间将被工作、通勤、租房合约、社保缴纳年限、以及“稳定”的幻觉占据。',
      'pathP5': '届时你再想学英语、学粤语、学金融、办签证，成本将是现在的 <strong>5～10 倍</strong>，而成功率只有现在的 <strong>1/3</strong>。',

      'freedomTitle': '“随时可以说不”是所有自由的基础',
      'freedomP1': '自由是文明的前提，规则是自由的边界，而规则的唯一合法性来自公平、公正、公开。',
      'freedomTh1': '维度', 'freedomTh2': '内地系统多数人的困境', 'freedomTh3': '你 28 岁时的状态',
      'freedomD1': '财务', 'freedomD1a': '房贷、35 岁红线、社保年限、稳定的幻觉', 'freedomD1b': '125 万+ 境外合法资产，7 万被动收入 / 年，不受外汇管制',
      'freedomD2': '身份与空间', 'freedomD2a': '户口绑定、体制依赖、从众压力', 'freedomD2b': '香港工作签证 + 三语能力 + 5 年香港生存经验',
      'freedomD3': '选择权', 'freedomD3a': '说不的成本极高，足以摧毁现有生活', 'freedomD3b': '平静地说“不”，无需计算后果，转身即另一条路',
      'freedomD4': '人生剧本', 'freedomD4a': '单行道，被制度收走选择权', 'freedomD4b': '开放地图，随时重新规划路线',
      'freedomSummary': '💡 你只需要转身，走向另一条路，这才是<strong>真正的自由</strong>。',

      'legalTitle': '“合法”这两个字，比什么都重要',
      'legalP1': '你的钱在香港<strong>普通法体系下受到保护</strong>，你的身份有合法签证支撑，你的<strong>未来有一条清晰可追溯的轨迹</strong>。',
      'legalTh1': '行动环节', 'legalTh2': '合法保障',
      'legalD1': '工作签证 → 居留', 'legalD1a': '合法居留权',
      'legalD2': '工资存入 → 收入', 'legalD2a': '合法收入来源',
      'legalD3': '银行开户 → 账户', 'legalD3a': '合法账户，受香港普通法保护',
      'legalD4': '复利增长 → 收益', 'legalD4a': '合法投资收益，不受内地外汇管制穿透',
      'legalD5': '信托架构 → 传承', 'legalD5a': '合法传承路径',
      'legalSummary': '💡 你的钱在内地不一定属于你。',

      'futureTitle': '未来太多选择，这才是“重启”的真正含义',
      'futureP1': '你不需要在 28 岁就决定“这辈子干什么”；你可以试错，可以绕路，可以停下来。',
      'futureP2': '因为你的被动收入在持续产生现金流，你的本金在持续复利增长，你的身份在持续有效。',
      'futureTh1': '选择维度', 'futureTh2': '你拥有的选项',
      'futureD1': '地理', 'futureD1a': '香港 / 大湾区 / 东南亚 / 加拿大 / 新加坡 / 低消费城市',
      'futureD2': '职业', 'futureD2a': '继续打工 / 自由职业 / 轻创业 / 不工作吃息',
      'futureD3': '生活方式', 'futureD3a': '都市 / 小镇 / 旅居 / 半退休',
      'futureD4': '人生节奏', 'futureD4a': '快 / 慢 / 停 / 重启',
      'futureSummary': '💡 你的人生不是一条单行道，它是一个可以随时重新规划路线的开放地图。',

      'rareTitle': '这种自由，是内地 99% 的人一辈子都得不到的',
      'rareP1': '你只需要：',
      'rareS1': '毕业去办证', 'rareS2': '拿证去香港', 'rareS3': '每个月存钱', 'rareS4': '存钱开始理财', 'rareS5': '28 岁重启人生',
      'rareSummary': '💡 然后，你就拥有了内地大部分人奋斗一辈子都换不来的东西，那就是对生活说“不”的权利。',

      'viewTitle': '我的看法',
      'viewP1': '就业、薪资、福利、保障、晋升通道、养老、医疗、住房、死亡补助。',
      'viewP2': '你可以用“体制内 VS 体制外的差距”这九个结构去问 AI，问完你就明白我之前说的“结构性锁死”是什么意思了。',
      'viewSummary': '💡 注意：要用国内 AI / 国外 AI 的回答来进行交叉对比，你才能分清楚真相是什么。',

      'giftTitle': '我最终想给你的东西',
      'giftP1': '一位中国父亲已经在认知阶层做到了极致，剩下的是你<strong>自己的人生新起点</strong>。',
      'giftTh1': '项目', 'giftTh2': '内地', 'giftTh3': '香港',
      'giftD1': '语言范围', 'giftD1a': '中文 2 个国家使用。', 'giftD1b': '英文 88 个以上国家使用。',
      'giftD2': '政府权力约束', 'giftD2a': '内地权力制衡机制薄弱，政策易受个人意志影响，存在“朝令夕改”风险。', 'giftD2b': '香港普通法下，政府行为受司法制约，政策可预期性更高。',
      'giftD3': '基础税赋', 'giftD3a': '月薪 2 万人民币，实际每年需缴个税约 8,280 元至 1.9 万元。', 'giftD3b': '月薪 2 万港元，实际每年只缴约 3,760 港元薪俸税。',
      'giftD4': '外汇管制', 'giftD4a': '每人每年 5 万美元结汇 / 购汇额度。', 'giftD4b': '完全自由，无额度限制。',
      'giftD5': '投资市场', 'giftD5a': '只能交易内地股市，受限投资全球，常年无额度摩擦耗损大。', 'giftD5b': '可自由交易全球主要股市，资金进出自由，无外汇管制。',
      'giftD6': '投资产品', 'giftD6a': '常年 7% 的投资产品没有。', 'giftD6b': '常年 7% 的投资产品很多。',
      'giftD7': '股息分红', 'giftD7a': '持股 &gt; 1 年免征，否则 10%–20%。', 'giftD7b': '免征股息税。',

      'noticeTitle': '重要提示',
      'noticeP1': '2026 年 5 月 22 日 ~ 2026 年 7 月 24 日，内地多部委联合香港金管局对内地居民及实体在境外的金融资产、账户、证券投资、对外投资及离岸信托收益实行全面封锁。',
      'noticeTh1': '时间 / 发布日期', 'noticeTh2': '政策文件 / 监管措施',
      'noticeD1': '香港金管局致所有认可机构的《监管通函》',
      'noticeD2': '中国证监会等八部门《综合整治非法跨境证券期货基金经营活动实施方案》',
      'noticeD3': '国务院《国务院关于对外投资的规定》（国务院令第 837 号）',
      'noticeD4': '国务院《国务院关于出境入境管理的规定》（国务院令第 841 号）',
      'noticeD5': '国家税务总局《关于离岸信托个人所得税有关征管事项的公告》',
      'noticeD6': '财政部、国家税务总局《关于离岸信托个人所得税有关事项的公告》',
      'noticeSummary': '💡 我给你的是人生选择权，不是剧本，不是要求，你可以选择走这条路，也可以不走。',

      'calcTitle': '复利计算器',
      'calcP1': '快速测算定投或单笔投资在复利作用下的终值，辅助你的财富规划。',
      'calcDcaTitle': '定投复利计算器',
      'calcDcaLabel1': '每月定投金额（港元）', 'calcDcaLabel2': '年化收益率（%）', 'calcDcaLabel3': '定投年数',
      'calcResultLabel': '📌 期末总资产',
      'calcTotalInput': '总投入：<span class="val" id="totalInput">--</span> 港元 &nbsp;|&nbsp; 总收益：<span class="val" id="totalProfit">--</span> 港元',
      'calcLumpTitle': '单笔复利计算器',
      'calcLumpLabel1': '初始本金（港元）', 'calcLumpLabel2': '年化收益率（%）', 'calcLumpLabel3': '持有年数',
      'calcTotalProfit': '总收益：<span class="val" id="totalProfitS">--</span> 港元',
      'calcSummary': '💡 调整任意参数，结果自动更新。定投按月度复利，单笔按年复利。',

      'conclusionTitle': '结语',
      'conclusionP1': '我在你 10 岁开始为你铺这条路，迁移户口至大湾区广州，这离香港最近，物理位置又属于南方（火）。',
      'conclusionP2': '我在你 16 岁的时候，2026 年 7 月 3 日替你把“自由”放在一个你伸手就能够到的地方。（此家书）',
      'conclusionP3': '你接不接，是你的事，但我放好了。',
      'conclusionP4': '仅需要五年的付出，就能换取未来真正属于你自己的“自由权”和“选择权”，这是内地一辈子都无法达到的。',
      'conclusionSummary': '不管听还是不听，<strong>等你 28 岁那天回头看，自然会明白我做的这一切是什么。</strong>'
    },
    en: {
      'skipLink': 'Skip to main content',
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
      'mobileGroupThink': 'Thinking Tools',
      'mobileGroupQuant': 'Quant Tools',
      'mobileGroupDiag': 'Diagnostic Tools',
      'mobileGroupUtil': 'Utilities',

      'heroTitleA': 'Yang Xinyu: Your Father\'s <em>Life Survival Strategy Plan</em> for Your Future',
      'heroLedeBold': 'Our birth charts clash (Yin-Shen); we are not suited for close companionship — only a long-range strategic anchor.',
      'heroLedeRest': 'I am paving for you a path to exit the domestic system legally, safely, and with dignity. It does not depend on marriage, on the system, or on anyone\'s charity. By the age of 28, with an annual passive income of HKD 70,000, you can <span class="hl">restart all your dreams!</span>',
      'heroChip1': 'Learn English', 'heroChip2': 'Learn Finance', 'heroChip3': 'Go Abroad', 'heroChip4': 'Work',

      'cdTitle': 'Letter Delivered · Counting Up',
      'cdBadge': '⏳ Counting from Jul 3, 2026',
      'cdDate': 'Since July 3, 2026',
      'cdSub': 'Read this letter once every year on your birthday, and accumulate your freedom assets every day.',
      'cdD': 'Days', 'cdH': 'Hrs', 'cdM': 'Min', 'cdS': 'Sec',
      'cdElapsed': 'Elapsed', 'cdLive': 'Live',

      'introTitle': 'A Few Words at the Beginning',
      'introP1': 'This country has been structurally locked down and structurally contracted; studying arts is a dead end, while studying finance must be combined with overseas practice.',
      'introP2': 'Without money, you have no choice — money is not safe inside the country and must be converted into legal overseas assets.',
      'introP3': 'You need to live, live with ease, and live without being harvested by this system.',

      'ruleTitle': 'China vs Hong Kong · WJP Rule of Law Index 2024',
      'ruleP1': 'The Rule of Law Index is a quantitative assessment framework that measures the level of rule of law in a country or region. It was proposed by the World Justice Project (WJP) and aims to assess the effectiveness of rule of law practices using standardized indicators.',
      'ruleThDim': 'Dimension', 'ruleThRank': 'Global Ranking', 'ruleThIndex': 'WJP Index',
      'ruleChina': 'China', 'ruleChinaRank': 'Rank 94', 'ruleHK': 'Hong Kong', 'ruleHKRank': 'Rank 23',
      'ruleP2': 'This system covers <strong>eight</strong> key dimensions: constraints on government powers, absence of corruption, open government, fundamental rights, order and security, regulatory enforcement, civil justice, and criminal justice. It combines survey statistics and expert reviews to generate an overall score.',
      'ruleThDim2': 'Dimension', 'ruleChina2': 'China', 'ruleHK2': 'HK', 'ruleThGap': 'Gap Analysis &amp; Risk Interpretation',
      'ruleD1': 'Constraints on Gov. Powers', 'ruleD1Gap': 'Hong Kong leads by <strong>75%</strong> (0.56 ÷ 0.32). The mainland\'s power-balancing mechanism is weak; policies are easily influenced by personal will, with the risk of "orders changing overnight." Assets kept in the mainland may shrink due to a single document; under Hong Kong\'s common law, government actions are subject to judicial constraints, and policy predictability is higher.',
      'ruleD2': 'Absence of Corruption', 'ruleD2Gap': 'Hong Kong leads by <strong>55.6%</strong> (0.84 ÷ 0.54). Corruption risk in the mainland means "grey expenses" are a hidden cost; Hong Kong\'s Independent Commission Against Corruption (ICAC) has independent enforcement powers, placing its integrity at the forefront globally. Your legal income will not be eroded by "unspoken rules."',
      'ruleD3': 'Open Government', 'ruleD3Gap': 'Hong Kong leads by <strong>68.3%</strong> (0.69 ÷ 0.41). Information opacity in the mainland makes policy direction hard to predict; Hong Kong\'s Code on Access to Information gives citizens the right to inspect government documents, allowing early awareness of policy changes affecting assets.',
      'ruleD4': 'Fundamental Rights', 'ruleD4Gap': 'Hong Kong leads by <strong>136%</strong> (0.59 ÷ 0.25). This is one of the largest gaps. Individuals in the mainland lack effective appeal channels against public power; Hong Kong\'s Bill of Rights Ordinance provides judicial remedies for residents.',
      'ruleD5': 'Order &amp; Security', 'ruleD5Gap': 'Hong Kong leads by <strong>13.6%</strong> (0.92 ÷ 0.81). This is the smallest gap. The mainland\'s social security is indeed a rare advantage. However, the mainland\'s high "order" is built on intensive surveillance and stability maintenance — fundamentally different from Hong Kong\'s rule-of-law-based order.',
      'ruleD6': 'Regulatory Enforcement', 'ruleD6Gap': 'Hong Kong leads by <strong>60%</strong> (0.80 ÷ 0.50). The mainland has "selective enforcement" and "campaign-style regulation," making compliance costs highly uncertain; Hong Kong\'s regulators are highly independent with unified enforcement standards.',
      'ruleD7': 'Civil Justice', 'ruleD7Gap': 'Hong Kong leads by <strong>36.5%</strong> (0.71 ÷ 0.52). Contract dispute resolution in the mainland takes long, and local protectionism may interfere with judgment enforcement; under Hong Kong\'s common law system, court judgments can be recognized and enforced in multiple common law jurisdictions.',
      'ruleD8': 'Criminal Justice', 'ruleD8Gap': 'Hong Kong leads by <strong>51.1%</strong> (0.68 ÷ 0.45). Problems in mainland criminal procedure such as "difficulty in obtaining release on bail" and "high detention rates" make individuals in enterprise-related cases extremely vulnerable to being crushed by coercive measures; Hong Kong upholds the presumption of innocence and judicial independence.',
      'ruleSummary': 'The largest gaps are in "Fundamental Rights" (+136%) and "Constraints on Gov. Powers" (+75%) — these are exactly the institutional roots of asset insecurity in the mainland. Hong Kong\'s common law system is the "institutional firewall" for your future financial safety, personal freedom, and contract enforcement.',

      'langTitle': 'Language Scope',
      'langP1': 'Statistics based on sovereign states (UN member states and generally recognized countries):',
      'langThLang': 'Language', 'langThRegion': 'Countries / Regions', 'langThRemark': 'Remarks',
      'langZh': 'Chinese', 'langZhCount': '2', 'langZhDetail': 'China (Mandarin) and Singapore (Chinese, alongside English, Malay, and Tamil).',
      'langEn': 'English', 'langEnCount': '88', 'langEnDetail': 'Among the 193 UN member states, about 58 countries have English as an official language (sole or co-official).',
      'langSummary': 'English has the widest official-language coverage of any language in the world and is the most globally distributed. In 142 countries worldwide, English is a compulsory subject in the national education system.',

      'fragTitle': 'Warning: The Fragility of a Single-Structure System',
      'fragP1': 'A single fiat currency + a single market + a single allocation — together they form a fragile, triply-resonant system.',
      'fragP2': 'When a crisis hits, currency depreciation, market collapse, and asset devaluation often do not occur sequentially — they erupt simultaneously and reinforce one another.',
      'fragP3': 'At that point, the loss is not the sum of the three, but the "product of the three."',
      'fragSummary': 'The rule of law and the spirit of contract are the cornerstones of investment decisions. Money should only be invested in countries and regions that respect contracts, have a sound rule of law, offer liquidity, and provide security guarantees.',

      'currTitle': 'Anti-Fragile System: The Optimal Currency Basket Portfolio',
      'currP1': 'Core logic: a globally distributed, decentralized, multi-currency, non-centralized asset topology is the only viable strategy for spreading risk.',
      'currUsd': 'Reserve Core', 'currEur': 'Regional Anchor', 'currJpy': 'Carry &amp; Safe Haven', 'currChf': 'Ultimate Safe Haven',
      'currGbp': 'Risk-Sensitive', 'currCad': 'Commodity Currency', 'currAud': 'Commodity Currency', 'currSgd': 'Stable',
      'currCny': 'Policy-Driven', 'currHkd': 'Pegged to USD',
      'currSummary': 'The dollar anchors value; the Swiss franc and yen provide refuge; commodity currencies capture upside. Use the <strong>"law of large numbers" against "currency black swans"</strong> and hedge against "single fiat currency risk."',

      'pathTitle': 'The Path I Give You',
      'pathP1': 'Four-Stage Execution Table:',
      'pathP2': 'This is the only period in your life without a mortgage, without family obligations, and without the 35-year-old career red line.',
      'pathP3': 'From 16 to graduation is your only window to acquire knowledge and skills at minimal cost and maximum density.',
      'pathP4': 'If you miss it: after 23, your time will be swallowed by work, commuting, rent, social-security contributions, and the illusion of "stability."',
      'pathP5': 'By then, learning English, Cantonese, or finance, or applying for a visa, will cost you <strong>5 to 10 times</strong> more, with only <strong>one-third</strong> the success rate.',

      'freedomTitle': 'The Right to Say "No" Is the Foundation of All Freedom',
      'freedomP1': 'Freedom is the premise of civilization; rules are the boundary of freedom. The only legitimacy of rules comes from fairness, justice, and openness.',
      'freedomTh1': 'Dimension', 'freedomTh2': 'The Trap for Most on the Mainland', 'freedomTh3': 'You at Age 28',
      'freedomD1': 'Finance', 'freedomD1a': 'Mortgage, the 35-year-old red line, social-security years, the illusion of stability', 'freedomD1b': 'HKD 1.25M+ in legal overseas assets, HKD 70K passive income/year, free from forex controls',
      'freedomD2': 'Identity &amp; Space', 'freedomD2a': 'Hukou binding, dependence on the system, conformity pressure', 'freedomD2b': 'Hong Kong work visa + trilingual ability + 5 years of Hong Kong survival experience',
      'freedomD3': 'The Right to Choose', 'freedomD3a': 'The cost of saying no is extremely high — enough to destroy your current life', 'freedomD3b': 'Calmly say "no" without calculating the consequences; turn around and there is another path',
      'freedomD4': 'Life Script', 'freedomD4a': 'A one-way street; your choice is taken away by the system', 'freedomD4b': 'An open map; replan the route at any time',
      'freedomSummary': 'You just need to turn around and walk another path — that is <strong>true freedom</strong>.',

      'legalTitle': '"Legal" — Above All Else',
      'legalP1': 'Your money is <strong>protected under Hong Kong\'s common law system</strong>, your identity is backed by a legal visa, and your <strong>future has a clear, traceable trajectory</strong>.',
      'legalTh1': 'Action Step', 'legalTh2': 'Legal Guarantee',
      'legalD1': 'Work Visa → Residence', 'legalD1a': 'Legal right of residence',
      'legalD2': 'Salary Deposit → Income', 'legalD2a': 'A legal source of income',
      'legalD3': 'Bank Account Opening → Account', 'legalD3a': 'A legal account protected by Hong Kong common law',
      'legalD4': 'Compound Growth → Returns', 'legalD4a': 'Legal investment returns, not subject to penetration by mainland forex controls',
      'legalD5': 'Trust Structure → Succession', 'legalD5a': 'A legal path for succession',
      'legalSummary': 'Your money in the mainland may not necessarily belong to you.',

      'futureTitle': 'So Many Choices Ahead — The True Meaning of "Restart"',
      'futureP1': 'You don\'t need to decide "what to do with your whole life" at 28; you can experiment, take detours, and pause.',
      'futureP2': 'Because your passive income keeps generating cash flow, your principal keeps compounding, and your status remains valid.',
      'futureTh1': 'Dimension', 'futureTh2': 'Your Options',
      'futureD1': 'Geography', 'futureD1a': 'Hong Kong / Greater Bay Area / Southeast Asia / Canada / Singapore / low-cost cities',
      'futureD2': 'Career', 'futureD2a': 'Continue employment / freelance / light entrepreneurship / live on interest',
      'futureD3': 'Lifestyle', 'futureD3a': 'Big city / small town / travel-living / semi-retirement',
      'futureD4': 'Life Rhythm', 'futureD4a': 'Fast / slow / stop / restart',
      'futureSummary': 'Your life is not a one-way street — it is an open map whose route can be replanned at any time.',

      'rareTitle': 'A Freedom That 99% of Mainlanders Never Obtain',
      'rareP1': 'All you need to do is:',
      'rareS1': 'Get your documents ready after graduation', 'rareS2': 'Get your work visa and go to Hong Kong', 'rareS3': 'Save money every month', 'rareS4': 'Start saving and investing', 'rareS5': 'Restart your life at 28',
      'rareSummary': 'Then you will have something most people on the mainland struggle their whole lives to obtain — the right to say "no" to life.',

      'viewTitle': 'My View',
      'viewP1': 'Employment, salary, benefits, social security, promotion pathways, pensions, healthcare, housing, and death benefits.',
      'viewP2': 'You can ask an AI about these nine structures — "the gap between inside vs outside the system" — and once you do, you\'ll understand what I meant by "structural lock-in."',
      'viewSummary': '<strong>Note: cross-reference answers from both domestic and foreign AI to discern the truth.</strong>',

      'giftTitle': 'What I Ultimately Want to Give You',
      'giftP1': 'A Chinese father has reached the pinnacle of what cognition alone can offer; what remains is your <strong>own new starting point in life</strong>.',
      'giftTh1': 'Item', 'giftTh2': 'Mainland China', 'giftTh3': 'Hong Kong',
      'giftD1': 'Language Reach', 'giftD1a': 'Chinese is used in 2 countries.', 'giftD1b': 'English is used in 88+ countries.',
      'giftD2': 'Constraints on Gov. Powers', 'giftD2a': 'Weak power-balancing mechanism; policies are easily influenced by personal will, with the risk of "orders changing overnight."', 'giftD2b': 'Under Hong Kong common law, government actions are subject to judicial constraints, with higher policy predictability.',
      'giftD3': 'Salaries Tax', 'giftD3a': 'At a monthly salary of RMB 20,000, actual annual income tax is about RMB 8,280–19,000.', 'giftD3b': 'At a monthly salary of HKD 20,000, actual annual salaries tax is about HKD 3,760.',
      'giftD4': 'Capital Controls', 'giftD4a': 'USD 50,000 annual forex settlement/purchase quota per person.', 'giftD4b': 'Completely free, with no quota limits.',
      'giftD5': 'Investment Markets', 'giftD5a': 'Can only trade mainland stocks; global investing is restricted; chronic quota friction creates large losses.', 'giftD5b': 'Freely trade the world\'s major stock markets; free capital flow; no forex controls.',
      'giftD6': 'Investment Products', 'giftD6a': 'There are no consistent 7% products.', 'giftD6b': 'There are plenty of consistent 7% products.',
      'giftD7': 'Dividends', 'giftD7a': 'Exempt if held &gt; 1 year; otherwise 10%–20%.', 'giftD7b': 'Dividend tax is exempt.',

      'noticeTitle': 'Important Notice',
      'noticeP1': 'From May 22, 2026 to July 24, 2026, multiple mainland ministries and commissions, in coordination with the Hong Kong Monetary Authority (HKMA), imposed comprehensive restrictions on the overseas financial assets, accounts, securities investments, outbound investments, and offshore trust income of mainland residents and entities.',
      'noticeTh1': 'Date', 'noticeTh2': 'Policy Document / Regulatory Measure',
      'noticeD1': 'HKMA supervisory circular to all authorized institutions',
      'noticeD2': 'CSRC and seven other departments\' implementation plan for comprehensive rectification of illegal cross-border securities, futures, and fund business activities',
      'noticeD3': 'State Council Regulations on Outbound Investment (State Council Order No. 837)',
      'noticeD4': 'State Council Regulations on Exit and Entry Administration (State Council Order No. 841)',
      'noticeD5': 'STA announcement on individual income tax administration for offshore trusts',
      'noticeD6': 'MOF and STA announcement on individual income tax matters for offshore trusts',
      'noticeSummary': 'What I give you is the right to choose your life — not a script, not a demand. You can take this path or not.',

      'calcTitle': 'Compound Interest Calculator',
      'calcP1': 'Quickly calculate the future value of fixed-investment or lump-sum investment under compound interest, to assist your wealth planning.',
      'calcDcaTitle': 'Fixed Investment',
      'calcDcaLabel1': 'Monthly Investment (HKD)', 'calcDcaLabel2': 'Annual Return (%)', 'calcDcaLabel3': 'Investment Years',
      'calcResultLabel': '📌 Final Total Assets',
      'calcTotalInput': 'Total Input: <span class="val" id="totalInput">--</span> HKD &nbsp;|&nbsp; Total Profit: <span class="val" id="totalProfit">--</span> HKD',
      'calcLumpTitle': 'Lump-Sum Investment',
      'calcLumpLabel1': 'Initial Principal (HKD)', 'calcLumpLabel2': 'Annual Return (%)', 'calcLumpLabel3': 'Holding Years',
      'calcTotalProfit': 'Total Profit: <span class="val" id="totalProfitS">--</span> HKD',
      'calcSummary': '💡 Adjust any parameter and the result updates automatically. Monthly compounding for fixed investment; annual compounding for lump sum.',

      'conclusionTitle': "A Father's Gift",
      'conclusionP1': 'I started paving this path for you when you were 10 — moving your household registration to Guangzhou in the Greater Bay Area, the closest to Hong Kong and, geographically, in the south (the Fire element).',
      'conclusionP2': 'On your 16th birthday — July 3, 2026 — I placed "freedom" within arm\'s reach. (This letter from your father.)',
      'conclusionP3': 'Whether you take it or not is up to you — but I have placed it there.',
      'conclusionP4': 'Just five years of effort can secure, for your future, the liberty and the power of choice that are truly your own — something unattainable in a lifetime on the mainland.',
      'conclusionSummary': 'Whether you listen or not, <strong>when you look back on your 28th birthday, you will naturally understand what all of this means.</strong>'
    }
  };

  function renderPage(lang) {
    var isEn = (lang === 'en');
    var data = DICT[isEn ? 'en' : 'zh'];

    // 1. 统一切换 HTML 根节点的状态
    document.documentElement.setAttribute('data-lang', isEn ? 'en' : 'zh');
    document.documentElement.lang = isEn ? 'en' : 'zh-CN';

    // 2. 老老实实只翻正文
    document.querySelectorAll('[data-i18n], [data-co-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n') || el.getAttribute('data-co-i18n');
      if (data[key]) {
        el.innerHTML = data[key]; 
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = localStorage.getItem('co-lang') || 'zh';
    renderPage(saved);

    document.addEventListener('co:langchange', function (e) {
      renderPage(e.detail.lang);
    });
  });

})(window);