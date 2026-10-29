/* ============================================================
 * civilization-level-scorer-i18n.js
 * 文明等级评分器 · 全量中英词典 (含 234 条全量释义)
 * 导出：window.CIV_I18N
 * ============================================================ */
(function (global) {
  'use strict';

  var STORE_KEY = 'civ-lang';

  var DICT = {
    zh: {
      brandName: '核心工具箱',
      pageTitle: '文明等级评分器 · 杨晟琦文明公理系统',
      navHome: '首页',
      navThinking: '思维类',
      navThinking1: '乱世 · 生存与财富自由的实战宝典',
      navThinking2: '传承 · 家族后辈们的启蒙家书',
      navQuant: '量化类',
      navQuant1: '全球 · 市场量化工具工作台',
      navQuant2: '全球 · 全天候永久投资组合',
      navQuant3: '美国 · Charles Schwab 仪表盘',
      navDiagnose: '诊断类',
      navDiagnose1: 'WJP · 法治指数地图',
      navDiagnose2: '经济数据 · 趋势与真实性检验',
      navDiagnose3: '思维 · 人类思维盲区诊断工具',
      navDiagnose4: '诊断 · 文明等级在线评分器',
      navUtility: '实用类',
      navUtility1: '色彩 · 色彩分析工具',
      navUtility2: '加密 · 网页军功级加密工具',
      
      navGate: '基石门禁',
      navScoring: '要素打分',
      navResult: '结果诊断',
      navMenu: '导航菜单',
      menuOpen: '打开菜单',
      langAria: '切换语言',

      heroTag: '元框架量化 · 独立思想锚点',
      heroTitleA: '文明等级',
      heroTitleB: '在线评分器',
      heroLedeA: '你的社会处于文明演化的哪一步？',
      heroLedeB: '通过三大基石门禁、四大要素 18 个子项打分，以及司法验证的折扣计算，量化生成学术级的文明诊断报告。',
      heroChip1: '基石否决 · 一票否决',
      heroChip2: '体感优先 · 拒绝数据粉饰',
      heroChip3: '木桶效应 · 锁死系统上限',
      orcid: 'ORCID:',
      globalRelease: '全球首发:',
      encapsulated: '封装完成: 2026年7月',

      gateTitle: '第一层：三大基石',
      gateTitleEn: 'Layer 1: The Three Cornerstones',
      gateDesc: '三大基石是文明系统的前提条件，缺一不可！全部确认后方可进入打分。缺任何一条，系统直接判定为<strong>“未进入文明等级”</strong>。',
      
      g1Title: '基石一：文明的基石',
      g1Detail: '自由是文明的前提，规则是自由的边界，而规则的唯一合法性来自公平、公正、公开。个体拥有自主选择的权利，不被工具化；规则面前人人平等，制定透明，执行无偏。',
      g2Title: '基石二：社会的基石',
      g2Detail: '正义是底层百姓唯一的压舱石，利益是得利者唯一的压舱石。当两者碰撞时，系统必须倾听直觉报警，而非用“程序合规”宣判直觉无效。底层百姓唯一拥有的是基于生存经验的“公平直觉”。',
      g3Title: '基石三：治理的基石',
      g3Detail: '判决书未出，任何公民和财产受完全保护，不可被提前处置；司法系统的所有系统性代价由系统自身承担，不转嫁给个体。权力可以被行使，但必须在每一个普通人的注视下行使。',

      gateBlockedPrefix: '⛔ 基石未全部确认：缺失「',
      gateBlockedSuffix: '」。请勾选全部三项后进入打分。',
      gateUnblocked: '✅ 三大基石已全部确认。可进入打分。',
      gatePreview: '✓ 确认后，下方打分区将自动解锁 ',

      scoringTitle: '第二层：四大要素 · 十八个子项',
      scoringDesc: '每个子项滑动打分（0-10分）。大类得分为子项平均分 × 2.5（满分25）。滑动时自动显示含义。',
      resetBtn: '↺ 重置所有分数',
      catScore: '大类得分',
      
      cat1Title: '一、生存与劳动保障',
      cat2Title: '二、劳动价值平等',
      cat3Title: '三、收入分配公平',
      cat4Title: '四、言论与精神自由',
      
      judgeTitle: '第三层：司法验证',
      judgeDesc: '治理基石的三条硬条件被独立验证。司法维度不参与正向加分，只做减法。得分作为折扣系数（0.8-1.0）。',

      densityTitle: '系统“认错记录”密度（硬约束）',
      densityDesc: '密度越高，司法维度被锁定的上限越低。',
      densityCasesLabel: '累计“认错”记录数',
      densityCasesPlaceholder: '输入累计记录数',
      densityPopLabel: '总人口（万人）',
      densityPopPlaceholder: '输入人口',
      densityRateLabel: '记录密度',
      densityLevelLabel: '约束等级',
      densityToggleOpen: '📊 收起参照',
      densityToggleClose: '📊 查看密度约束参照',
      
      resultTitle: '第四层：评分结果与诊断',
      resultPlaceholder: '调整滑块后自动生成结果',
      resultNotEnteredTitle: '未进入文明等级',
      resultNotEnteredDesc: '三大基石未全部确认。缺失项：<strong class="c-fail">{missing}</strong>。<br><br>文明的前提是三大基石同时成立。缺一则系统不具备被评估为“文明”的基本资格。请返回顶部确认全部基石后，再进行打分。',
      
      resultDimsTitle: '四大要素得分明细',
      resultJudgeTitle: '司法验证与折扣',
      resultJudgeScore: '司法维度综合得分',
      resultJudgeDiscount: '司法折扣系数',
      resultJudgeDensity: '记录密度：{density} 件/万人 | 约束上限：≤{max}分',
      resultJudgeDensityNone: '未输入',
      resultDiagTitle: '诊断定位',
      resultDiagStep: '<strong>九式路径定位：</strong> {diag}',
      resultDiagWeak: '<strong>最薄弱维度：</strong> {cat}（{score} 分）',
      
      levelLow: '低级文明',
      levelMid: '中级文明',
      levelHigh: '高级文明',
      levelLowBucket: '低级文明（最短木桶律触发）',
      diagBucketText: '⛔ 最短木桶律已触发：核心要素「{cat}」得分≤5，总分锁死低级文明。当前处于「{step}」阶段。{desc}',
      diagNormalText: '当前系统处于「{step}」阶段。{desc}',

      confirmDiagBtn: '✔ 确认并保存诊断',

      historyTitle: '最近10次评分趋势',
      historyHint: '（灰色：无记录 · 亮色：有记录 · 大圆点：当前）',
      historyEmpty: '暂无历史记录，完成打分后自动保存',
      historyClearBtn: '清空历史',
      historyCount: '记录数: {n}',
      historyDetailTitle: '📋 {time} 明细',
      historyJudgeAvg: '司法验证综合',
      historyLevel: '等级',
      
      toastClear: '历史记录已清空',
      toastReset: '所有分数已重置',
      confirmReset: '确定要重置所有分数吗？当前评分结果将丢失。',
      
      refRow1: '密度 ≤ 0.5 件/万人', refVal1: '无约束（上限 ≤ 10 分）',
      refRow2: '密度 ≤ 1.0 件/万人', refVal2: '轻度约束（上限 ≤ 8 分）',
      refRow3: '密度 ≤ 2.0 件/万人', refVal3: '中度约束（上限 ≤ 6 分）',
      refRow4: '密度 ≤ 5.0 件/万人', refVal4: '重度约束（上限 ≤ 4 分）',
      refRow5: '密度 > 5.0 件/万人', refVal5: '极度约束（上限 ≤ 1 分）',

      footerTitle: '杨晟琦文明公理系统 · 独立思想锚点',
      footerSub1: 'Yang Shengqi Civilizational Axiomatic System · Independent Thought Anchor',
      footerSub2: '封装完成: 2026年7月 · Encapsulation Completed: July 2026',
      footerLicense: '所有内容以 <a href="https://creativecommons.org/licenses/by-nd/4.0/deed.zh" target="_blank">CC BY-ND 4.0</a> 协议发布 · All content released under CC BY-ND 4.0',

      // 子项数据（包含全量 13 档 meanings，直接映射数组）
      q_c1s1_t: '① 基本生存保障', q_c1s1_ex: '失业后能撑多久？大病会不会放弃治疗？', q_c1s1_a1: '0分：撑不过1个月', q_c1s1_a2: '5分：撑3-6个月', q_c1s1_a3: '10分：撑24个月以上',
      q_c1s1_meanings: ['0分：失业即断粮，撑不过1个月；大病直接放弃治疗，不敢去医院','1分：失业后1-2个月内靠借钱度日；大病“能救就救”，但会掏空全家','2分：失业后能撑2-3个月，靠亲友接济；大病需举债，但“能救就救”','3分：失业后能撑3-4个月，有少量积蓄和亲友帮补；大病需消耗大部分积蓄','4分：失业后能撑4-6个月，有基础储蓄和亲友帮补；大病会消耗大部分积蓄但不会立刻返贫','5分：失业后能撑6-9个月，有失业保险和基本储蓄；大病个人负担不超过年收入的20%','6分：失业后能撑9-12个月，有失业保险和基本储蓄；大病个人负担不超过年收入的15%','7分：失业后能撑12-15个月，有充分的失业保险；大病个人负担不超过年收入的10%','8分：失业后能撑15-18个月，有充分的失业保险和家庭支持；大病个人负担不超过年收入的8%','9分：失业后能撑18-24个月，有完善的社会保障安全网；大病个人负担不超过年收入的5%','10分：失业后能撑24个月以上，有充分的社会保障安全网；大病全覆盖，个人负担几乎为零'],

      q_c1s2_t: '② 劳动安全与健康', q_c1s2_ex: '工作环境安全吗？工伤有保障吗？职业病防治是否有效？', q_c1s2_a1: '0分：危险无保障', q_c1s2_a2: '5分：基本保护存在', q_c1s2_a3: '10分：制度性底线',
      q_c1s2_meanings: ['0分：工作环境等于“搏命”，天天担心出事故；工伤没人管，自己扛','1分：工作环境危险，工伤无保障；出事只能自己解决','2分：有基本劳动保护但形同虚设；工伤赔付周期漫长，耗不起','3分：劳动保护存在，但执行弱；安全培训走过场','4分：基本保护有，但过劳严重；工伤赔付流程复杂','5分：制度存在但执行弱；长期加班，身体被透支','6分：制度基本落实；职业病有定期检查，但覆盖率不高','7分：工作环境安全，工伤有保障；职业病防治基本到位','8分：工作环境安全健康；工伤能拿到合理赔偿，流程透明','9分：劳动安全是制度性保障；工伤赔付及时，职业病有效防控','10分：劳动安全是制度性底线；工伤保障完善，职业病零容忍'],

      q_c1s3_t: '③ 基本收入水平', q_c1s3_ex: '最低工资能养活自己吗？普通劳动者能否体面生活？', q_c1s3_a1: '0分：只够吃饭和房租', q_c1s3_a2: '5分：温饱有余，应急不足', q_c1s3_a3: '10分：支撑完整生活计划',
      q_c1s3_meanings: ['0分：收入只够吃饭和房租，别的什么都别想；不敢生病不敢休息','1分：收入勉强够基本生存，没有任何余裕','2分：能吃饱，但存不下钱；有任何意外支出就崩盘','3分：能覆盖基本温饱，但无余裕应对突发支出','4分：温饱有余，但储蓄增长极慢；遇到失业或大病就扛不住','5分：能存下一点钱，但非常有限；应急能力不足','6分：能覆盖基本温饱，有一定应急能力','7分：体面生活，能存钱；有应对突发支出的能力','8分：不仅能温饱，还能规划未来；有积蓄、有保险、有选择','9分：收入充裕，能支撑完整的生活计划；生活有尊严、有安全感','10分：收入足以支撑完整的生活计划；有充分积累、保险和选择自由'],

      q_c1s4_t: '④ 劳动权利的制度保护', q_c1s4_ex: '劳动法是否被严格执行？劳动者是否有组织化的集体谈判权？', q_c1s4_a1: '0分：不存在或无效', q_c1s4_a2: '5分：有框架但无效', q_c1s4_a3: '10分：严格执行，真实有效',
      q_c1s4_meanings: ['0分：劳动法不存在或无效，劳动者没有任何组织化权利','1分：劳动法形同虚设，维权成本极高，普通人耗不起','2分：有劳动法但执行弱；维权流程漫长，劳动者无话语权','3分：劳动法存在，但集体谈判形同虚设','4分：有工会但基本无效；工人声音传不上去','5分：有集体谈判框架但效果有限','6分：劳动法基本被执行；维权渠道存在但效率低','7分：劳动法被执行；劳动者有维权渠道，虽然不完美但能用','8分：劳动法被严格执行；劳动者有真实有效的维权途径','9分：劳动权利受制度性保护；集体谈判权基本有效','10分：劳动法被严格执行，集体谈判权真实有效'],

      q_c2s1_t: '① 同工同酬', q_c2s1_ex: '同样岗位，性别、户籍、年龄、身份背景是否影响收入？', q_c2s1_a1: '0分：身份决定收入', q_c2s1_a2: '5分：法律好看，执行打折', q_c2s1_a3: '10分：同工同酬铁律',
      q_c2s1_meanings: ['0分：你身边到处是同工不同酬，性别/身份决定收入','1分：同工不同酬是普遍现象，大家已经习惯了','2分：女同事干同样的活工资少一截；外地人工龄不算数','3分：差距明显，但已经习惯了，没人较真','4分：身份因素仍然显著影响收入','5分：法律写得好看，执行层面照样打折','6分：同工同酬有规定，但执行不彻底','7分：身份因素影响很小；同样岗位基本同酬','8分：身份不再是决定性因素；同工同酬基本实现','9分：同工同酬被严格执行；违规会被追责','10分：同工同酬是铁律，没人敢破；身份完全不影响收入'],

      q_c2s2_t: '② 职业稳定性与年龄歧视', q_c2s2_ex: '35岁后还能有体面工作吗？年龄是否成为职业的硬性门槛？', q_c2s2_a1: '0分：35岁即“死期”', q_c2s2_a2: '5分：45岁后很困难', q_c2s2_a3: '10分：任何年龄公平机会',
      q_c2s2_meanings: ['0分：35岁是道坎，过了就没戏；招聘都写“35岁以下”','1分：35岁后简历投出去石沉大海','2分：35岁后机会骤减，年龄成为硬性门槛','3分：40岁前还行，过了就开始慌','4分：40岁后明显感到门槛在变高','5分：45岁后很吃力，随时可能被优化','6分：45岁后机会很少，但还有一线可能','7分：年龄是参考，不是硬门槛','8分：中年换工作也正常，45岁以上仍有公平机会','9分：经验被尊重，年龄不影响职业发展','10分：任何年龄都有公平机会；经验与年龄被合理尊重'],

      q_c2s3_t: '③ 社会保障平等性', q_c2s3_ex: '你的工作有完整的五险一金吗？灵活就业者是否有同等保障？', q_c2s3_a1: '0分：灵活就业者“裸奔”', q_c2s3_a2: '5分：全覆盖但水平有差异', q_c2s3_a3: '10分：社保无死角、无差异',
      q_c2s3_meanings: ['0分：灵活就业者就是“裸奔”，完全没有社保','1分：灵活就业者几乎无保障，只有极少数例外','2分：有社保但不完整；有医保没养老，有工伤没失业','3分：社保覆盖存在，但缺口明显','4分：有基础社保，但保障水平低，覆盖不完整','5分：基本全覆盖，但灵活就业者和正式工的保障水平差一截','6分：社保体系完整，但灵活就业者保障偏低','7分：社保体系相对完善，差异不大','8分：社保体系完整，差距可控','9分：所有劳动者享有完整保障，基本无差异','10分：社保无死角、无差异；所有劳动者保障平等'],

      q_c2s4_t: '④ 劳动尊严与离线权', q_c2s4_ex: '你能拒绝不合理加班吗？下班后能不理工作消息吗？', q_c2s4_a1: '0分：24小时待命', q_c2s4_a2: '5分：有补偿但拒绝仍有压力', q_c2s4_a3: '10分：下班即离线，法律保障',
      q_c2s4_meanings: ['0分：24小时待命，手机一响就紧张，拒绝即开除','1分：随时可能被工作消息打断，无边界可言','2分：下班后照样被工作消息轰炸；不回复就扣钱','3分：加班是常态，拒绝加班压力很大','4分：加班有补偿，但拒绝加班仍有压力','5分：加班有约定，但边界模糊；紧急时候逃不掉','6分：加班有限度，离线权基本被尊重','7分：工作时间边界清晰，加班有明确补偿','8分：离线权被尊重，非紧急情况不会被打扰','9分：下班时间属于自己；离线权有制度保障','10分：下班即离线，法律铁打；谁敢非工作时间打扰谁担责'],

      q_c2s5_t: '⑤ 代际公平与社会流动', q_c2s5_ex: '你的孩子靠努力能改变阶层吗？机会是否被出身锁定？', q_c2s5_a1: '0分：出身决定命运', q_c2s5_a2: '5分：有机会但通道收窄', q_c2s5_a3: '10分：社会流动性强',
      q_c2s5_meanings: ['0分：出身决定命运，你是什么阶层孩子基本还是什么阶层','1分：上升通道几乎关闭，努力改变不了出身','2分：有希望但极难；需要极其优秀的个人努力才能突破','3分：有机会突破，但概率极低','4分：你的孩子要考进最好的学校才能勉强够到你现在的起点','5分：有机会但通道收窄；竞争异常激烈','6分：上升通道存在，但大多数人在半路被挤掉','7分：努力能看到回报；社会流动性尚可','8分：只要肯努力，就有机会改变处境','9分：社会流动性强；机会相对平等','10分：社会流动性极强；出生不再是决定性因素'],

      q_c2s6_t: '⑥ 职业选择自由', q_c2s6_ex: '个体是否因出身、性别、种姓等先天因素而遭受职业限制？', q_c2s6_a1: '0分：被先天身份锁定', q_c2s6_a2: '5分：能选但空间有限', q_c2s6_a3: '10分：完全自由',
      q_c2s6_meanings: ['0分：职业被你的出身锁死了，你想做什么不由你决定','1分：职业选择几乎为零，被先天身份锁定','2分：法律上自由，但实际上有看不见的门槛','3分：制度废除了限制，但现实中有看不见的墙','4分：能选，但选择空间有限','5分：职业自由是相对的，总有东西在框着你','6分：选择空间在扩大，但仍然有限','7分：自由度高，限制极少','8分：职业主要看能力和兴趣，身份因素基本不干预','9分：职业选择几乎完全自由','10分：完全自由，只受能力限制'],

      q_c3s1_t: '① 收入差距', q_c3s1_ex: '你身边的贫富差距大吗？底层与顶层的收入倍数是多少？', q_c3s1_a1: '0分：相差百倍', q_c3s1_a2: '5分：差距明显但底层有保障', q_c3s1_a3: '10分：差距小，有公平感',
      q_c3s1_meanings: ['0分：一个天一个地，底层跟顶层隔了百倍，你认识的人里有穷到卖血的，也有富到买楼的','1分：贫富差距极其悬殊，你随时能感受到阶级的鸿沟','2分：差距非常扎眼，但还不至于绝望','3分：你身边贫富差距明显，富人和穷人生活在两个世界','4分：差距明显，但底层有基本保障，不至于饿死','5分：差距明显但底层有保障，穷人至少不至于绝望','6分：贫富差距可控，普通人也能看到希望','7分：差距适中，劳动能追上资本','8分：收入差距有，但普通人的努力能跟上社会的脚步','9分：差距小，社会有公平感','10分：收入差距很小，劳动收入可以和资本收入抗衡'],

      q_c3s2_t: '② 财富积累机会', q_c3s2_ex: '普通人靠劳动能存下钱、积累资产、获得财产性收入吗？', q_c3s2_a1: '0分：存不下钱', q_c3s2_a2: '5分：长期奋斗可积累', q_c3s2_a3: '10分：劳动就能积累资产',
      q_c3s2_meanings: ['0分：存不下钱，永远在负债，财富积累跟你没关系','1分：月月光，甚至倒欠，没有任何积累','2分：能活着，但攒不下什么；任何大额支出都会把你打回原形','3分：有基本生存，但积累极少','4分：能存一点钱，但速度极慢','5分：长期奋斗可积累基础财富，你身边有人通过十年以上劳动终于攒下一套房','6分：财富积累需要很长时间，但有可能','7分：劳动能存钱，但速度不算快','8分：普通人通过劳动能积累资产，过程辛苦但有可能','9分：财富积累渠道相对畅通','10分：劳动就能积累资产；普通人也能有稳定的财产性收入'],

      q_c3s3_t: '③ 再分配机制', q_c3s3_ex: '税收和公共支出是否在向低收入者倾斜？是否有效缩小差距？', q_c3s3_a1: '0分：都在帮富人', q_c3s3_a2: '5分：有调节但力度不足', q_c3s3_a3: '10分：有效托底',
      q_c3s3_meanings: ['0分：税收福利都在帮富人，富人有各种避税手段，穷人缴税比例反而更高','1分：再分配机制严重失灵，穷人在承担更多负担','2分：福利政策存在，但大多数需要帮助的人拿不到','3分：有福利，但门槛高、流程复杂','4分：有调节作用但力度不足，效果有限','5分：能缓和一点差距，但起不到决定性作用','6分：再分配有一定效果，但不够','7分：福利向低收入倾斜，效果明显','8分：税收和支出在主动缩小差距，效果肉眼可见','9分：再分配机制有效托底，没有人被落下','10分：再分配机制完整且有效，显著缩小差距'],

      q_c3s4_t: '④ 劳动所得 vs 资本所得', q_c3s4_ex: '劳动所得是否被权力或资本截留？劳动收入与资本收入是否失衡？', q_c3s4_a1: '0分：劳动是被收割', q_c3s4_a2: '5分：劳动能活，资本能富', q_c3s4_a3: '10分：劳动与资本基本平衡',
      q_c3s4_meanings: ['0分：劳动是给资本打工，越干越穷，劳动者被系统性收割','1分：干活的钱永远追不上资产增值的钱','2分：劳动收入被系统性截留，资本占绝对优势','3分：你身边靠资产赚钱的人比靠劳动赚钱的人过得好太多','4分：资本收益远高于劳动收益','5分：劳动收入可以维持体面生活，但财富积累主要靠资产','6分：劳动能活，资本能富，差距在缩小','7分：劳动与资本基本平衡','8分：劳动者享有合理份额；劳动不再是“被收割”的代名词','9分：劳动所得与资本所得相对公平','10分：劳动所得与资本所得公平分配；不存在系统性失衡'],

      q_c4s1_t: '① 言论表达自由', q_c4s1_ex: '你能公开批评制度、政策或官员而不被报复吗？', q_c4s1_a1: '0分：言论即风险', q_c4s1_a2: '5分：说话要绕弯子', q_c4s1_a3: '10分：公开批评不受报复',
      q_c4s1_meanings: ['0分：说错一句话，人生就完蛋，任何批评都被视为“攻击”','1分：言论即风险，没人敢说话','2分：技术性讨论可以，政治话题绝对不行','3分：说天气可以，说政策不行；边界模糊，你不知道哪句话越界','4分：你可以说，但不能直说；自我审查是日常操作','5分：说话要绕弯子，风险依然存在','6分：批评被容忍，但不被欢迎','7分：言论边界清晰，批评不会招致毁灭性打击','8分：公开批评可以，但仍有隐性压力','9分：言论自由受法律保护且实际有效','10分：公开批评不被报复；公共讨论是正常的'],

      q_c4s2_t: '② 信息获取自由', q_c4s2_ex: '你能自由获取多元的信息来源吗？信息是否被过滤？', q_c4s2_a1: '0分：只能看到官方信息', q_c4s2_a2: '5分：多元存在但获取有成本', q_c4s2_a3: '10分：自由流通，无审查',
      q_c4s2_meanings: ['0分：只能看到官方想让你看到的，外部世界跟你无关','1分：信息被严格过滤，外部世界跟你无关','2分：能看见一些不同的声音，但不完整','3分：偶尔能接触到多元信息，但关键部分被拦截','4分：多元信息存在，但获取有成本','5分：信息流通不顺畅，需要技巧才能看到不同的声音','6分：多元信息可获取，但有少量限制','7分：信息流通基本自由，有少量限制但不构成根本障碍','8分：多元信息可自由获取','9分：信息自由流通，无审查','10分：信息完全自由流通，无审查、无壁垒'],

      q_c4s3_t: '③ 精神文化自由', q_c4s3_ex: '你的信仰、艺术创作、生活方式受限制吗？边缘文化是否被允许？', q_c4s3_a1: '0分：精神世界被管制', q_c4s3_a2: '5分：有空间但不敢越界', q_c4s3_a3: '10分：所有文化表达享有空间',
      q_c4s3_meanings: ['0分：精神世界被管制，你喜欢的乐队、画家大部分在国内看不到','1分：你能看到的东西都是被筛选过的','2分：主流文化自由，边缘文化被压制','3分：你能看到主流的东西，非主流的东西会被“消失”','4分：文化表达有边界，你知道什么能碰什么不能碰','5分：有一定空间，但不敢越界','6分：精神文化多元，但有隐形红线','7分：大多数表达是自由的，少数话题仍有风险','8分：精神文化表达相对自由','9分：所有文化表达享有空间，边缘文化也被允许存在','10分：法律同等保护，文化表达完全自由'],

      q_c4s4_t: '④ 学术与媒体独立', q_c4s4_ex: '艺术、学术、媒体是否拥有独立探索的空间？是否服务于权力？', q_c4s4_a1: '0分：学术=宣传', q_c4s4_a2: '5分：学术有空间，媒体有边界', q_c4s4_a3: '10分：完全独立',
      q_c4s4_meanings: ['0分：学术=宣传，媒体=喇叭，什么能研究、能报道都有明确的“政治正确”','1分：学术和媒体完全服务于权力','2分：技术性讨论有自由，政治议题没有','3分：科学研究可以谈方法，但不能碰结论','4分：媒体可以报小事，但不能报大事','5分：学术有空间，媒体有边界','6分：学术空间相对宽松，媒体在红线之内自由','7分：学术与媒体基本独立','8分：独立研究是常态，媒体报道有公信力','9分：学术与媒体独立性强','10分：学术与媒体完全独立，自由探索成为常态'],

      q_j1_t: '① 判决前不可触碰人身财产', q_j1_ex: '判决书出来之前，权力能否随意冻结资产、限制人身自由？', q_j1_a1: '0分：想抓就抓', q_j1_a2: '5分：大部分情况不能碰', q_j1_a3: '10分：绝对不可触碰',
      q_j1_meanings: ['0分：权力想抓就抓，想封就封，没有判决书人也抓了钱也冻了','1分：程序形同虚设，权力想绕过就能绕过','2分：法律说不行，但权力有办法绕开','3分：程序上有规定，但实践中经常被绕过','4分：大部分情况下有程序约束，但例外很多','5分：大部分情况不能碰，但存在例外','6分：制度约束有效，少数特殊情况会绕过程序','7分：制度规定严格，执行比较到位','8分：除非极其特殊情况，否则不敢提前触碰','9分：制度硬约束，违规会被追责','10分：判决前绝对不可触碰，谁敢违规谁担责'],

      q_j2_t: '② 系统性代价由系统承担', q_j2_ex: '如果司法系统错了、拖延了、不可追溯了——代价由谁承担？', q_j2_a1: '0分：受害者自己扛', q_j2_a2: '5分：赔偿存在但金额低', q_j2_a3: '10分：承担全部代价',
      q_j2_meanings: ['0分：错就错了，受害者自己扛，系统连道歉都没有','1分：系统不承担任何责任，受害者孤立无援','2分：有赔偿但极难拿到，流程漫长到你耗不起','3分：制度上写着可以赔，但基本拿不到','4分：能拿到赔偿，但流程折腾两三年','5分：赔偿存在但金额低、周期长','6分：赔偿机制存在，效率不高但能走通','7分：系统会认真赔偿，不会赖账','8分：赔偿机制健全，流程透明','9分：系统愿意承担后果，赔偿及时','10分：系统承担全部代价，设滞纳金和熔断机制'],

      q_j3_t: '③ 不公感知必须响应', q_j3_ex: '当你觉得“这不公平”时，系统会认真听吗？', q_j3_a1: '0分：不能说', q_j3_a2: '5分：有反馈但少实质解决', q_j3_a3: '10分：自动受理、公开响应',
      q_j3_meanings: ['0分：“不公平”这三个字都不能说，任何质疑都会被压制','1分：你觉得自己被欺负了，但没人会听你说','2分：有渠道反映，但基本石沉大海','3分：你可以去投诉，但99%不会得到任何回应','4分：投诉有回应，但都是官话套话','5分：有反馈但很少实质解决','6分：你提交的问题会有人接，但解决不了实质问题','7分：不公感知会被认真受理','8分：你的不公感知会被系统接住，能看到处理进展','9分：不公感知被认真处理，有明确的解决路径','10分：不公感知自动受理、公开响应、限期解决']
    },

    en: {
        brandName: 'Core Toolbox',
      pageTitle: 'Civilization Level Scorer · Yang Shengqi Axiomatic System',
        navHome: 'Home',
        navThinking: 'Thinking',
        navThinking1: 'The Global Wealth Bible',
        navThinking2: 'Inheritance Letter',
        navQuant: 'Quantitative',
        navQuant1: 'Global Quantitative Workbench',
        navQuant2: 'All-Weather Portfolio',
        navQuant3: 'Charles Schwab Dashboard',
        navDiagnose: 'Diagnostics',
        navDiagnose1: 'WJP Rule of Law Map',
        navDiagnose2: 'Economic Data Diagnostics',
        navDiagnose3: 'Cognitive Blind Spot',
        navDiagnose4: 'Civilization Level Scorer',
        navUtility: 'Utility',
        navUtility1: 'Color Analysis',
        navUtility2: 'HTML Encrypt',
      
      navGate: 'Cornerstones',
      navScoring: 'Scoring',
      navResult: 'Diagnosis',
      navMenu: 'Menu',
      menuOpen: 'Open Menu',
      langAria: 'Switch Language',

      heroTag: 'Meta-Framework Quantification · Independent Thought',
      heroTitleA: 'Civilization Level',
      heroTitleB: 'Online Scorer',
      heroLedeA: 'Where does your society stand in civilizational evolution?',
      heroLedeB: 'Quantify an academic-grade diagnostic report via three cornerstones, 4 dimensions / 18 sub-items, and a judicial validation discount.',
      heroChip1: 'Veto by Cornerstone',
      heroChip2: 'Experience First · No Whitewashing',
      heroChip3: 'Cannikin Law · System Ceiling',
      orcid: 'ORCID:',
      globalRelease: 'Global Release:',
      encapsulated: 'Encapsulated: July 2026',

      gateTitle: 'Layer 1: Three Cornerstones',
      gateTitleEn: '',
      gateDesc: 'The three cornerstones are prerequisites. All must be confirmed to enter scoring. Missing any one means the system is <strong>“Not a Civilization”</strong>.',
      
      g1Title: 'Cornerstone I: Civilization',
      g1Detail: 'Freedom is the premise; rules are boundaries; legitimacy comes from fairness, justice, and openness. Individuals are not instrumentalized; rules apply equally to all, formulated transparently and executed impartially.',
      g2Title: 'Cornerstone II: Society',
      g2Detail: 'Justice is the only ballast for the vulnerable; interests for the privileged. When they collide, the system must listen to intuitive alarms, not invalidate intuition with “procedural compliance”.',
      g3Title: 'Cornerstone III: Governance',
      g3Detail: 'Before judgment, citizens and property are fully protected and cannot be disposed of early. All systemic costs of the justice system are borne by itself, not transferred to individuals. Power is exercised under the watch of ordinary people.',

      gateBlockedPrefix: '⛔ Cornerstones missing: 「',
      gateBlockedSuffix: '」. Please check all three to enter scoring.',
      gateUnblocked: '✅ All three cornerstones confirmed. Ready to score.',
      gatePreview: '✓ Scoring area unlocks after confirmation ',

      scoringTitle: 'Layer 2: 4 Dimensions · 18 Sub-items',
      scoringDesc: 'Slide to score each sub-item (0-10). Category score = average × 2.5 (max 25). Meanings display upon sliding.',
      resetBtn: '↺ Reset All Scores',
      catScore: 'Category Score',
      
      cat1Title: 'I. Survival & Labor Protection',
      cat2Title: 'II. Equality of Labor Value',
      cat3Title: 'III. Income Distribution Fairness',
      cat4Title: 'IV. Freedom of Speech & Spirit',
      
      judgeTitle: 'Layer 3: Judicial Validation',
      judgeDesc: 'The three hard conditions of governance are independently validated. Judicial dimension does not add points, only subtracts. Score acts as a discount factor (0.8-1.0).',

      densityTitle: '“Error Admission” Density (Hard Constraint)',
      densityDesc: 'Higher density means lower ceiling for the judicial dimension.',
      densityCasesLabel: 'Cumulative “Admissions”',
      densityCasesPlaceholder: 'Enter records',
      densityPopLabel: 'Total Population (10k)',
      densityPopPlaceholder: 'Enter population',
      densityRateLabel: 'Density',
      densityLevelLabel: 'Constraint Level',
      densityToggleOpen: '📊 Collapse Reference',
      densityToggleClose: '📊 View Density Reference',
      
      resultTitle: 'Layer 4: Scoring Results & Diagnosis',
      resultPlaceholder: 'Adjust sliders to generate results',
      resultNotEnteredTitle: 'Not a Civilization',
      resultNotEnteredDesc: 'Cornerstones not all confirmed. Missing: <strong class="c-fail">{missing}</strong>.<br><br>Civilization requires all three. Missing one disqualifies the system from being evaluated. Please confirm all cornerstones at the top.',
      
      resultDimsTitle: 'Dimension Score Breakdown',
      resultJudgeTitle: 'Judicial Validation & Discount',
      resultJudgeScore: 'Judicial Composite Score',
      resultJudgeDiscount: 'Judicial Discount Factor',
      resultJudgeDensity: 'Density: {density} /10k | Ceiling: ≤{max}',
      resultJudgeDensityNone: 'Not entered',
      resultDiagTitle: 'Diagnostic Positioning',
      resultDiagStep: '<strong>Nine-Step Positioning:</strong> {diag}',
      resultDiagWeak: '<strong>Weakest Dimension:</strong> {cat} ({score} pts)',
      
      levelLow: 'Low Civilization',
      levelMid: 'Mid Civilization',
      levelHigh: 'High Civilization',
      levelLowBucket: 'Low Civilization (Shortest Plank Triggered)',
      diagBucketText: '⛔ Shortest plank triggered: core element 「{cat}」 scored ≤5, total locked to Low Civilization. Currently at 「{step}」 stage. {desc}',
      diagNormalText: 'System is currently at 「{step}」 stage. {desc}',

      confirmDiagBtn: '✔ Save Diagnosis',

      historyTitle: 'Recent 10 Scoring Trends',
      historyHint: '(Grey: None · Bright: Has Data · Large Dot: Current)',
      historyEmpty: 'No history yet, auto-saved after scoring',
      historyClearBtn: 'Clear History',
      historyCount: 'Records: {n}',
      historyDetailTitle: '📋 {time} Details',
      historyJudgeAvg: 'Judicial Validation',
      historyLevel: 'Level',
      
      toastClear: 'History cleared',
      toastReset: 'All scores reset',
      confirmReset: 'Are you sure you want to reset all scores? Current results will be lost.',
      
      refRow1: 'Density ≤ 0.5 /10k', refVal1: 'No constraint (Ceiling ≤ 10)',
      refRow2: 'Density ≤ 1.0 /10k', refVal2: 'Mild constraint (Ceiling ≤ 8)',
      refRow3: 'Density ≤ 2.0 /10k', refVal3: 'Moderate constraint (Ceiling ≤ 6)',
      refRow4: 'Density ≤ 5.0 /10k', refVal4: 'Severe constraint (Ceiling ≤ 4)',
      refRow5: 'Density > 5.0 /10k', refVal5: 'Extreme constraint (Ceiling ≤ 1)',

      footerTitle: 'Yang Shengqi Civilizational Axiomatic System',
      footerSub1: 'Independent Thought Anchor',
      footerSub2: 'Encapsulated: July 2026',
      footerLicense: 'All content released under <a href="https://creativecommons.org/licenses/by-nd/4.0/deed.en" target="_blank">CC BY-ND 4.0</a>',

      // 英文子项数据（全量 234 条）
      q_c1s1_t: '① Basic Survival', q_c1s1_ex: 'How long can you survive unemployment? Would you give up treatment?', q_c1s1_a1: '0: <1 month', q_c1s1_a2: '5: 3-6 months', q_c1s1_a3: '10: 24+ months',
      q_c1s1_meanings: ['0: No food if unemployed, survive <1 month; give up medical treatment, afraid to go to hospital','1: Rely on borrowing within 1-2 months of unemployment; treat major illness if possible but drains savings','2: Survive 2-3 months on relatives; borrow for major illness but still try to treat','3: Survive 3-4 months with small savings and family help; major illness consumes most savings','4: Survive 4-6 months with basic savings; major illness consumes most savings but no immediate poverty','5: Survive 6-9 months with unemployment insurance and basic savings; major illness out-of-pocket <= 20% of annual income','6: Survive 9-12 months; out-of-pocket <= 15%','7: Survive 12-15 months with sufficient insurance; out-of-pocket <= 10%','8: Survive 15-18 months with insurance and family support; out-of-pocket <= 8%','9: Survive 18-24 months with solid safety net; out-of-pocket <= 5%','10: Survive 24+ months with solid safety net; full medical coverage, almost zero out-of-pocket'],

      q_c1s2_t: '② Labor Safety & Health', q_c1s2_ex: 'Is the environment safe? Are injuries compensated? Is occupational disease prevented?', q_c1s2_a1: '0: Danger, no protection', q_c1s2_a2: '5: Basic protection exists', q_c1s2_a3: '10: Institutional bottom line',
      q_c1s2_meanings: ['0: Work environment is life-threatening; injuries ignored, bear it yourself','1: Dangerous environment, no injury protection; solve it yourself if accidents happen','2: Basic protection exists in name only; injury compensation takes forever','3: Protection exists but weakly enforced; safety training is a formality','4: Basic protection exists but severe overwork; injury compensation is complex','5: System exists but weakly enforced; long-term overtime, body drained','6: System basically implemented; occupational disease checks exist but low coverage','7: Safe environment, injury protection exists; disease prevention basically in place','8: Safe and healthy environment; reasonable injury compensation, transparent process','9: Safety is institutionally guaranteed; timely compensation, effective disease prevention','10: Safety is the institutional bottom line; perfect compensation, zero tolerance for disease'],

      q_c1s3_t: '③ Basic Income Level', q_c1s3_ex: 'Can minimum wage sustain you? Can ordinary workers live decently?', q_c1s3_a1: '0: Food & rent only', q_c1s3_a2: '5: Subsistence met, no emergency buffer', q_c1s3_a3: '10: Full life plan supported',
      q_c1s3_meanings: ['0: Income only covers food and rent; afraid of illness or rest','1: Barely covers basic survival, no surplus','2: Can eat, but cannot save; any unexpected expense crashes you','3: Covers basic subsistence, but no buffer for emergencies','4: Subsistence met, but savings grow extremely slowly; cannot handle unemployment or illness','5: Can save a little, but very limited; weak emergency capacity','6: Covers basic subsistence with some emergency capacity','7: Decent life, can save; can handle unexpected expenses','8: Not just subsistence, can plan for the future; savings, insurance, choices','9: Ample income, supports a full life plan; dignity and security','10: Income supports full life plan; full accumulation, insurance, and freedom of choice'],

      q_c1s4_t: '④ Institutional Protection of Labor', q_c1s4_ex: 'Is labor law strictly enforced? Is there organizational collective bargaining power?', q_c1s4_a1: '0: Non-existent or void', q_c1s4_a2: '5: Framework exists but ineffective', q_c1s4_a3: '10: Strictly enforced, truly effective',
      q_c1s4_meanings: ['0: Labor law non-existent or void; workers have no organizational rights','1: Labor law is a dead letter; cost of rights protection is too high','2: Labor law exists but weakly enforced; long process, no voice for workers','3: Labor law exists, but collective bargaining is a formality','4: Unions exist but basically ineffective; workers voices not heard','5: Collective bargaining framework exists but limited effect','6: Labor law basically enforced; channels exist but inefficient','7: Labor law enforced; workers have channels, imperfect but usable','8: Labor law strictly enforced; real and effective channels for workers','9: Labor rights institutionally protected; collective bargaining basically effective','10: Labor law strictly enforced, collective bargaining truly effective'],

      q_c2s1_t: '① Equal Pay', q_c2s1_ex: 'Do gender, hukou, age, or background affect income for the same role?', q_c2s1_a1: '0: Identity determines income', q_c2s1_a2: '5: Law looks good, execution fails', q_c2s1_a3: '10: Iron rule of equal pay',
      q_c2s1_meanings: ['0: Unequal pay everywhere; gender/identity determines income','1: Unequal pay is common, people are used to it','2: Female colleagues earn less for the same job; non-local workers seniority not counted','3: Gap is obvious, but used to it, no one cares','4: Identity factors still significantly affect income','5: Law looks good, but execution is discounted','6: Equal pay regulations exist, but enforcement is incomplete','7: Identity factors have little impact; basically equal pay','8: Identity no longer decisive; equal pay basically achieved','9: Equal pay strictly enforced; violations punished','10: Equal pay is an iron rule; identity completely irrelevant'],

      q_c2s2_t: '② Stability & Ageism', q_c2s2_ex: 'Can you have a decent job after 35? Is age a hard threshold?', q_c2s2_a1: '0: 35 is a death sentence', q_c2s2_a2: '5: Very hard after 45', q_c2s2_a3: '10: Fair chance at any age',
      q_c2s2_meanings: ['0: 35 is the threshold, no chance after; job ads say "under 35"','1: Resume disappears after 35','2: Opportunities plunge after 35, age becomes a hard threshold','3: Fine before 40, panic after','4: Threshold clearly rises after 40','5: Very tough after 45, may be optimized out anytime','6: Very few chances after 45, but still a glimmer','7: Age is a reference, not a hard threshold','8: Mid-life career change is normal, fair chances for 45+','9: Experience is respected, age does not affect career','10: Fair chance at any age; experience and age reasonably respected'],

      q_c2s3_t: '③ Social Security Equality', q_c2s3_ex: 'Do you have full insurance? Do flexible workers have equal protection?', q_c2s3_a1: '0: Flexible workers unprotected', q_c2s3_a2: '5: Full coverage but levels differ', q_c2s3_a3: '10: No blind spots, no difference',
      q_c2s3_meanings: ['0: Flexible workers are unprotected, no social security at all','1: Flexible workers have almost no protection, only rare exceptions','2: Social security is incomplete; medical but no pension, injury but no unemployment','3: Coverage exists, but gaps are obvious','4: Basic social security exists, but low level and incomplete coverage','5: Basically full coverage, but flexible workers lag far behind formal workers','6: Complete system, but flexible workers have low protection','7: System relatively complete, gap is small','8: Complete system, gap controllable','9: All workers enjoy full protection, basically no difference','10: No blind spots, no difference; all workers equal protection'],

      q_c2s4_t: '④ Labor Dignity & Right to Disconnect', q_c2s4_ex: 'Can you refuse unreasonable overtime? Ignore messages after work?', q_c2s4_a1: '0: 24/7 on-call', q_c2s4_a2: '5: Compensated but pressure remains', q_c2s4_a3: '10: Disconnect after work, legal right',
      q_c2s4_meanings: ['0: On call 24/7, nervous at every message, refusing = fired','1: Can be interrupted anytime, no boundaries','2: Bombarded by work messages after hours; not replying means pay cut','3: Overtime is normal, high pressure to refuse','4: Overtime compensated, but still pressure to refuse','5: Overtime agreed upon, but boundaries blurry; cannot escape in emergencies','6: Limited overtime, right to disconnect basically respected','7: Clear time boundaries, clear compensation for overtime','8: Right to disconnect respected, not disturbed except emergencies','9: Off-work time belongs to you; right to disconnect institutionally guaranteed','10: Disconnect after work, iron law; anyone disturbing bears responsibility'],

      q_c2s5_t: '⑤ Intergenerational Equity & Mobility', q_c2s5_ex: 'Can your child change class through effort? Is opportunity locked by birth?', q_c2s5_a1: '0: Birth determines fate', q_c2s5_a2: '5: Opportunity exists but narrowing', q_c2s5_a3: '10: High social mobility',
      q_c2s5_meanings: ['0: Birth determines fate; child stays in same class','1: Upward channel almost closed, effort cannot change birth','2: Hope exists but extremely hard; needs outstanding personal effort','3: Chance to break through, but probability extremely low','4: Child must enter best schools to barely reach your current starting point','5: Opportunity exists but narrowing; fierce competition','6: Upward channel exists, but most are squeezed out halfway','7: Effort sees returns; social mobility fair','8: If willing to work hard, can change circumstances','9: High social mobility; relative equality of opportunity','10: Extremely high mobility; birth no longer decisive'],

      q_c2s6_t: '⑥ Freedom of Career Choice', q_c2s6_ex: 'Are careers restricted by birth, gender, caste, or other innate factors?', q_c2s6_a1: '0: Locked by innate identity', q_c2s6_a2: '5: Can choose but limited', q_c2s6_a3: '10: Completely free',
      q_c2s6_meanings: ['0: Career locked by birth, you do not decide','1: Career choices almost zero, locked by innate identity','2: Legally free, but invisible barriers in reality','3: System abolished restrictions, but invisible walls remain','4: Can choose, but limited space','5: Career freedom is relative, always something framing you','6: Choice space expanding, but still limited','7: High freedom, minimal restrictions','8: Career mainly based on ability and interest, identity rarely intervenes','9: Career choice almost completely free','10: Completely free, limited only by ability'],

      q_c3s1_t: '① Income Gap', q_c3s1_ex: 'Is the wealth gap large? What is the multiple between bottom and top?', q_c3s1_a1: '0: 100x difference', q_c3s1_a2: '5: Gap clear but bottom protected', q_c3s1_a3: '10: Small gap, fairness felt',
      q_c3s1_meanings: ['0: Huge gap, bottom and top differ 100x; people you know sell blood, others buy buildings','1: Extremely huge gap, you constantly feel the class chasm','2: Gap is glaring, but not yet desperate','3: Wealth gap obvious around you, rich and poor live in two worlds','4: Gap obvious, but bottom has basic protection, not starving','5: Gap obvious but bottom protected, poor at least not desperate','6: Gap controllable, ordinary people see hope','7: Moderate gap, labor can catch up with capital','8: Income gap exists, but ordinary effort keeps pace with society','9: Small gap, society has fairness','10: Very small income gap, labor income rivals capital income'],

      q_c3s2_t: '② Wealth Accumulation', q_c3s2_ex: 'Can ordinary people save, accumulate assets, and earn property income?', q_c3s2_a1: '0: Can never save', q_c3s2_a2: '5: Long-term struggle accumulates', q_c3s2_a3: '10: Labor builds assets',
      q_c3s2_meanings: ['0: Cannot save, always in debt, wealth accumulation irrelevant','1: Living paycheck to paycheck, or in debt, no accumulation','2: Can survive, but save nothing; any large expense ruins you','3: Basic survival, minimal accumulation','4: Can save a little, but extremely slow','5: Long-term struggle accumulates basic wealth, someone you know saved for a house after 10+ years','6: Accumulation takes long, but possible','7: Labor can save, but not fast','8: Ordinary people can accumulate assets through labor, hard but possible','9: Accumulation channels relatively smooth','10: Labor builds assets; ordinary people also earn stable property income'],

      q_c3s3_t: '③ Redistribution Mechanism', q_c3s3_ex: 'Do taxes and public spending favor low-income groups and narrow the gap?', q_c3s3_a1: '0: Helping the rich', q_c3s3_a2: '5: Regulates but insufficient', q_c3s3_a3: '10: Effective safety net',
      q_c3s3_meanings: ['0: Taxes and welfare help the rich; rich have tax avoidance, poor pay higher rates','1: Redistribution severely failing, poor bear more burden','2: Welfare policies exist, but most in need cannot get them','3: Welfare exists, but high threshold, complex process','4: Regulates but weak, limited effect','5: Eases the gap slightly, but not decisive','6: Redistribution has some effect, but not enough','7: Welfare favors low income, obvious effect','8: Taxes and spending actively narrow the gap, visible effect','9: Redistribution provides effective safety net, no one left behind','10: Redistribution complete and effective, significantly narrows gap'],

      q_c3s4_t: '④ Labor vs Capital Income', q_c3s4_ex: 'Is labor income intercepted by power or capital? Is it imbalanced?', q_c3s4_a1: '0: Labor is harvested', q_c3s4_a2: '5: Labor survives, capital thrives', q_c3s4_a3: '10: Balanced',
      q_c3s4_meanings: ['0: Labor works for capital, poorer the more you work, systematically harvested','1: Wage growth never catches up with asset appreciation','2: Labor income systematically intercepted, capital has absolute advantage','3: Asset earners live far better than labor earners around you','4: Capital returns far higher than labor returns','5: Labor income sustains decent life, but wealth mainly from assets','6: Labor survives, capital thrives, gap narrowing','7: Labor and capital basically balanced','8: Workers get a reasonable share; labor no longer synonymous with "harvested"','9: Labor and capital income relatively fair','10: Labor and capital fairly distributed; no systemic imbalance'],

      q_c4s1_t: '① Freedom of Speech', q_c4s1_ex: 'Can you openly criticize the system, policies, or officials without retaliation?', q_c4s1_a1: '0: Speech is risk', q_c4s1_a2: '5: Must speak in circles', q_c4s1_a3: '10: No retaliation for criticism',
      q_c4s1_meanings: ['0: One wrong word ruins your life; any criticism seen as "attack"','1: Speech is risk, no one dares speak','2: Technical discussion okay, political topics absolutely not','3: Can talk weather, not policy; boundaries blurry, you never know','4: Can speak, but not directly; self-censorship is daily','5: Must speak in circles, risk remains','6: Criticism tolerated, but not welcomed','7: Speech boundaries clear, criticism does not cause devastating blow','8: Open criticism possible, but hidden pressure remains','9: Freedom of speech legally protected and practically effective','10: Open criticism no retaliation; public discussion normal'],

      q_c4s2_t: '② Freedom of Information', q_c4s2_ex: 'Can you freely access diverse sources? Is information filtered?', q_c4s2_a1: '0: Only official info', q_c4s2_a2: '5: Diversity exists but costs', q_c4s2_a3: '10: Free flow, no censorship',
      q_c4s2_meanings: ['0: Only see what official wants you to see, outside world irrelevant','1: Information strictly filtered, outside world irrelevant','2: Can see some different voices, but incomplete','3: Occasionally access diverse info, but key parts blocked','4: Diverse info exists, but costs to access','5: Flow is not smooth, need tricks to see different voices','6: Diverse info accessible, with minor restrictions','7: Flow basically free, minor restrictions not fundamental barriers','8: Diverse info freely accessible','9: Information flows freely, no censorship','10: Completely free flow, no censorship, no barriers'],

      q_c4s3_t: '③ Cultural & Spiritual Freedom', q_c4s3_ex: 'Are your beliefs, art, and lifestyle restricted? Is marginal culture allowed?', q_c4s3_a1: '0: Spirit controlled', q_c4s3_a2: '5: Space exists, dare not cross', q_c4s3_a3: '10: All expressions have space',
      q_c4s3_meanings: ['0: Spirit controlled, favorite bands/artists invisible domestically','1: Only see filtered content','2: Mainstream culture free, marginal suppressed','3: Can see mainstream, non-mainstream "disappears"','4: Cultural expression has boundaries, you know what to touch','5: Some space, but dare not cross line','6: Diverse culture, but invisible red lines','7: Most expression free, minority topics still risky','8: Cultural expression relatively free','9: All expression has space, marginal culture allowed to exist','10: Equal legal protection, cultural expression completely free'],

      q_c4s4_t: '④ Academic & Media Independence', q_c4s4_ex: 'Do art, academia, and media have independent space? Do they serve power?', q_c4s4_a1: '0: Academia = propaganda', q_c4s4_a2: '5: Academia has space, media has borders', q_c4s4_a3: '10: Completely independent',
      q_c4s4_meanings: ['0: Academia = propaganda, media = megaphone, "political correctness" dictates research/reporting','1: Academia and media completely serve power','2: Technical discussion free, political issues not','3: Science can discuss methods, but not conclusions','4: Media can report small things, not big things','5: Academia has space, media has borders','6: Academic space relatively loose, media free within red lines','7: Academia and media basically independent','8: Independent research normal, media reports credible','9: Strong independence in academia and media','10: Completely independent, free exploration normal'],

      q_j1_t: '① Untouchable Before Judgment', q_j1_ex: 'Before a verdict, can power arbitrarily freeze assets or restrict freedom?', q_j1_a1: '0: Arrest at will', q_j1_a2: '5: Mostly untouchable', q_j1_a3: '10: Absolutely untouchable',
      q_j1_meanings: ['0: Power arrests and freezes at will, without verdict','1: Procedures are a sham, power bypasses at will','2: Law says no, but power finds ways around','3: Procedures exist, but often bypassed in practice','4: Mostly procedurally constrained, but many exceptions','5: Mostly untouchable, but exceptions exist','6: Institutional constraints effective, rare bypasses','7: Strict rules, decent enforcement','8: Except extreme cases, no early touching','9: Hard institutional constraints, violations punished','10: Absolutely untouchable before verdict, violators bear responsibility'],

      q_j2_t: '② System Bears Systemic Cost', q_j2_ex: 'If the justice system errs, delays, or is untraceable—who bears the cost?', q_j2_a1: '0: Victim bears it', q_j2_a2: '5: Compensation exists but low', q_j2_a3: '10: Bears full cost',
      q_j2_meanings: ['0: Errors happen, victim bears it, system doesn\'t even apologize','1: System bears no responsibility, victim isolated','2: Compensation exists but hard to get, process unbearably long','3: System says compensation possible, but basically unobtainable','4: Can get compensation, but process takes 2-3 years','5: Compensation exists but low, long cycle','6: Compensation mechanism exists, inefficient but works','7: System compensates seriously, no dodging','8: Sound compensation mechanism, transparent process','9: System willing to bear consequences, timely compensation','10: System bears full cost, with late fees and circuit breakers'],

      q_j3_t: '③ Respond to Perceived Injustice', q_j3_ex: 'When you feel “this is unfair”, does the system listen seriously?', q_j3_a1: '0: Cannot say it', q_j3_a2: '5: Feedback but little resolution', q_j3_a3: '10: Auto-accept, public response',
      q_j3_meanings: ['0: Cannot even say "unfair", any doubt suppressed','1: Feel bullied, but no one listens','2: Channels exist, but basically thrown into the sea','3: Can complain, but 99% no response','4: Complaints get responses, but empty official talk','5: Feedback exists but rarely resolves substance','6: Problems get received, but cannot resolve core issues','7: Perceived injustice seriously accepted','8: System catches perceived injustice, progress visible','9: Perceived injustice seriously handled, clear resolution path','10: Perceived injustice auto-accepted, public response, resolved within deadline']
    }
  };

  var current = 'zh';

  function t(key) {
    var pack = DICT[current] || DICT.zh;
    if (Object.prototype.hasOwnProperty.call(pack, key)) return pack[key];
    if (Object.prototype.hasOwnProperty.call(DICT.zh, key)) return DICT.zh[key];
    return key;
  }

  function getLang() { return current; }

  function applyText() {
    var i, el, key;

    var plain = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < plain.length; i++) {
      el = plain[i];
      key = el.getAttribute('data-i18n');
      if (el.hasAttribute('data-i18n-html')) el.innerHTML = t(key);
      else el.textContent = t(key);
    }

    var ariaList = document.querySelectorAll('[data-i18n-aria]');
    for (i = 0; i < ariaList.length; i++) {
      el = ariaList[i];
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    }
  }

  // ============================================================
  // 标准渲染引擎：只负责翻译 DOM
  // ============================================================
  function renderPage(lang) {
    current = (lang === 'en') ? 'en' : 'zh';
    document.documentElement.lang = (current === 'en') ? 'en' : 'zh-CN';
    document.documentElement.setAttribute('data-lang', current);

    applyText(); // 调用你原本写好的翻译函数
    document.title = t('pageTitle');

    // 点亮按钮高亮
    var btn = document.getElementById('langBtn');
    if (btn) {
      var btnZh = btn.querySelector('.zh');
      var btnEn = btn.querySelector('.en');
      if (btnZh && btnEn) {
        btnZh.classList.toggle('active', current === 'zh');
        btnEn.classList.toggle('active', current === 'en');
      }
    }

    // 通知页面自己的业务逻辑（比如重绘分数雷达图）
    document.dispatchEvent(new CustomEvent('civ:langchange', {
      detail: { lang: current }
    }));
  }

  // ============================================================
  // 系统层接管：初始化 & 监听
  // ============================================================
  function init() {
    // 1. 统一读取全局状态
    var saved = localStorage.getItem('co-lang') || 'zh';
    
    // 首次渲染
    setTimeout(function () {
      renderPage(saved);
    }, 0);

    // 2. 监听核心层广播（如果总控没刷新页面的话）
    document.addEventListener('co:langchange', function (e) {
      renderPage(e.detail.lang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 暴露给全局
  global.CIV_I18N = {
    DICT: DICT,
    t: t,
    getLang: function() { return current; },
    setLang: renderPage,
    apply: renderPage,
    toggle: function () { renderPage(current === 'zh' ? 'en' : 'zh'); }
  };
})(window);