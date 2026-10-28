(function () {
    'use strict';

    var STORAGE_KEY = 'bible-lang'; // 用专属 key，防止跟其他页面打架
    var lang = localStorage.getItem(STORAGE_KEY) || 'zh-CN';

    // 完整的中英文对照表（一字未删）
    var dict = {
        zh: {
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
            'brandName': '核心工具箱',
            'bible.titleA': '杨氏家族之',
            'bible.titleB': '乱世生存与财富自由的实战宝典',
            'bible.lede': '这本《The Global Wealth Bible》从认知觉醒到具体执行，构建了一套完整的个人财富进阶体系，其核心逻辑可以概括为"认知—避险—执行—配置—增长—落地—升华"。<br><br>它从宏观到微观，从理论到实操，从防守到进攻，从本土到全球，已经构建了一个非常成熟、专业且逻辑自洽的"个人/家族/机构全天候投资体系"。<br><br>它不仅仅是一份投资指南，更是一份"财富自由的施工图"，可以传承下去的全天候永续资产。<br><br>只要执行者能克服人性的弱点（追涨杀跌），严格按照这个体系配置，长期实现财富保值增值是百分之百的事件。<br><br>《The Global Wealth Bible 乱世生存与财富自由实战宝典》构成了一个完整的投资闭环，逻辑链条极其清晰的财富之路。',
            'bible.chip1': '洞察时代困局',
            'bible.chip2': '思维模式重构',
            'bible.chip3': '解构致命矛盾',
            
            // 01
            'sec01.title': '驭民术的现代变形记',
            'sec01.hint': '看清控制，才是觉醒的开始',
            'sec01.lede': '人一旦开始觉醒，你眼中的世界和生活选择将完全不同。',
            'sec01.kpi1.l': '制度', 'sec01.kpi1.t': '商鞅变法（思想控制的基础）', 'sec01.kpi1.d': '让老百姓没空想、没能力想、只能跟着走。两千多年了，换了层皮，骨子里那套没变。',
            'sec01.kpi2.l': '思维', 'sec01.kpi2.t': '辩证法（逻辑的瓦解）', 'sec01.kpi2.d': '逻辑由此被架空，是非不再重要，立场才是。辩证法被滥用成「正反都是他对」，你永远赢不了。',
            'sec01.kpi3.l': '欲望', 'sec01.kpi3.t': '奶头乐（注意力的填充）', 'sec01.kpi3.d': '再用奶头乐填满人的脑子，让你连「想不明白」这件事本身都感觉不到。',
            'sec01.kpi4.l': '收割', 'sec01.kpi4.t': '35 岁优化（经济上的收割）', 'sec01.kpi4.d': '「35 岁优化」成为社会共识，从一句商业观点演变为潜规则。推出各类网贷，提前消耗掉年轻人未来几十年收益。',
            
            // 02
            'sec02.title': '深度思考：当下困境的根源',
            'sec02.lede': '当时代的潮水退去，真正能让你活下去的，从来不是风口和运气，而是清醒的认知、扎实的能力，以及不被焦虑裹挟的长期主义。',
            'sec02.kpi1.l': '环境', 'sec02.kpi1.t': '就业冰河期', 'sec02.kpi1.d': '这一代人因为毕业于经济下行期，从此与稳定编制无缘，终身陷入低薪、临时雇佣的循环。和过去的一代人（分配工作、分配婚房）产生了巨大的差距。',
            'sec02.kpi2.l': '现状', 'sec02.kpi2.t': '「铁饭碗」幻灭', 'sec02.kpi2.d': '曾经被视为「神职」的公务员，在财政紧缩下沦为高压力、低回报的苦差事，稳定的假象被彻底戳破。',
            'sec02.kpi3.l': '事实', 'sec02.kpi3.t': '高学历贬值陷阱', 'sec02.kpi3.d': '学校创造了太多的高学历人才，但是没有企业能接收他们，让他们创造价值。最终不得不去做一些最普通的工作：外卖、快递、保安。',
            'sec02.kpi4.l': '结果', 'sec02.kpi4.t': '社会病了，不是你的错', 'sec02.kpi4.d': '当越来越多的年轻人被三十五岁这个中国斩杀线给优化掉，但却无人告诉你们，其实不是你们错了，而是社会病了。',
            
            // 03
            'sec03.title': '应对哲学：大隐隐于市，聚焦微观生存',
            'sec03.lede': '在不可控的宏观环境下，收缩防线，聚焦微观个体的生存质量。',
            'sec03.kpi1.l': '破局之法', 'sec03.kpi1.t': '主动观察（觉醒）', 'sec03.kpi1.d': '不再做那个「想不明白、甚至感觉不到自己想不明白」的人。这就是认知觉醒。你不再是被动的接收者，而是主动的观察者。',
            'sec03.kpi2.l': '第一阶段', 'sec03.kpi2.t': '防守（闭嘴）', 'sec03.kpi2.d': '既然「怎么说都有理」的辩证游戏玩不过，那么沉默就是最高级的轻蔑。切断了被操纵的接口——这是一种信息阻断术。',
            'sec03.kpi3.l': '第二阶段', 'sec03.kpi3.t': '隐身（消失）', 'sec03.kpi3.d': '不做出头鸟，不追求虚名，不被宏大的叙事裹挟，不被集体的狂热绑架，让自己成为系统眼中的「透明人」。成为一个「不可见」的节点，系统无法定位你，自然无法收割你。',
            'sec03.kpi4.l': '第三阶段', 'sec03.kpi4.t': '进攻（搞钱）', 'sec03.kpi4.d': '在逻辑被架空、信仰被解构的世界里，只有现金流和资产是真实护城河。在没有信仰、逻辑混乱的世界里，唯有真金白银是确定的。',

            // 04
            'sec04.title': '学习罗斯柴尔德家族哲学',
            'sec04.hint': '系统设计 · 风险控制 · 长期主义',
            'sec04.lede': '罗斯柴尔德家族能够穿越近三个世纪的周期，其底层逻辑并非依赖单一的技巧，而是构建了一套环环相扣、旨在实现永续生存的动态系统。',
            'sec04.kpi1.l': '生存哲学', 'sec04.kpi1.t': '绝对隐秘与风险分散', 'sec04.kpi1.d': '核心遗训：一切内部事务，对外严格保密。只要你们团结一致，你们就所向无敌；你们「分手」的那天，将是你们失去繁荣的开始。', 'sec04.kpi1.logic': '<b>底层逻辑：</b>以隐秘和分散确保生存。五个儿子五个国家的布局，本质上是主权风险对冲。当一个国家违约或者打仗，其他国家的资产依然安全，家族都有人活着。', 'sec04.kpi1.ins': '<b>现代启示：</b>构建一个「东方不亮西方亮」的反脆弱系统。不要赌国运，要对冲国运，把鸡蛋放在不同国家的篮子里。',
            'sec04.kpi2.l': '核心优势', 'sec04.kpi2.t': '构建超越时代的信息网络', 'sec04.kpi2.d': '在电报和电话尚未出现的年代，其创始人通过五个儿子分驻法兰克福、伦敦、巴黎、那不勒斯和维也纳形成跨国金融网络。', 'sec04.kpi2.logic': '<b>底层逻辑：</b>以信息优势构建竞争壁垒。在 AI 时代，信息获取成本几乎为零，噪音获取成本也几乎为零。必须学会分辨出哪些是噪音，哪些是信号。', 'sec04.kpi2.ins': '<b>现代启示：</b>「对消息的独立判断力」和「比别人快半拍的执行力」。利用信息差（时间差、认知差）进行套利，在大众恐慌时买入，在大众狂欢时卖出。',
            'sec04.kpi3.l': '传承机制', 'sec04.kpi3.t': '以制度锁死财富与权力', 'sec04.kpi3.d': '「富不过三代」的魔咒在罗斯柴尔德家族身上失效，核心在于他们用近乎冷酷的制度，将家族团结和财富集中变成了铁律。', 'sec04.kpi3.logic': '<b>底层逻辑：</b>以严苛制度保障财富传承。强行将「血缘关系」转化为「股东关系」。家族不再是亲情组织，而是一个资本增殖机器。', 'sec04.kpi3.ins': '<b>现代启示：</b>真正的传承不是钱，而是傻瓜也败不光的系统。把「家」变成「公司」，把「亲情」变成「股权」。',
            'sec04.kpi4.l': '商业模式', 'sec04.kpi4.t': '与权力共生，而非对抗', 'sec04.kpi4.d': '罗斯柴尔德家族从不追求推翻政权，而是选择成为所有政权的「银行家」。', 'sec04.kpi4.logic': '<b>底层逻辑：</b>与权力共生实现利益最大化。他们让自己成为战争、基建、贸易不可或缺的资金提供方。你消灭我，你的战争就打不下去了。', 'sec04.kpi4.ins': '<b>现代启示：</b>成为生态系统的「收税人」。让自己变得「大而不能倒」，通过掌握经济命脉，让统治者离不开你。',
            'sec04.summary': '罗斯柴尔德哲学的真谛，归根结底就是一句话：用系统锁死下限，用主动打开上限。',

            // 05
            'sec05.title': '容错率警告', 'sec05.sub': '容错率警告', 'sec05.lede': '记住：在这片土地上，你没有多少犯错的机会。', 'sec05.desc': '这套哲学，放在哪里都管用。但在你脚下的这片土地上，它不是一个可选项，是一个必选项。这里人多，路窄，坑深。一个错误的决定，一次盲目的跟随，就可能让你和你的后代，用几十年去偿还。', 'sec05.outro': '我能留给你们最好的护身符，就是让你们从骨子里认清一点：<br>你必须赢，因为你输不起。',

            // 06
            'sec06.title': '全球宏观与周期定位：美林时钟', 'sec06.lede': '美林时钟将经济周期分为：复苏（配股票）、过热（配商品）、滞胀（持有现金）、衰退（配债券）四个阶段。但是，在中国特色的市场环境下，传统的美林时钟经常失灵。当我们在全球进行分散布局时，不能只顾低头拉车，更要抬头看路。对于后辈，我引入两个传统的宏观导航工具，但要求你们必须结合现实，审慎使用。',
            'sec06.r.t': '衰退期', 'sec06.r.tag': '经济下行 ↓ + 通胀下行 ↓', 'sec06.r.d': 'GDP 增速放缓或负增长；企业盈利下降，失业率上升；需求疲软导致物价回落；货币政策转向宽松，利率下降。', 'sec06.r.a': '<b>最优资产：债券 Bonds</b>',
            'sec06.rec.t': '复苏期', 'sec06.rec.tag': '经济上行 ↑ + 通胀下行 ↓', 'sec06.rec.d': 'GDP 增速回升，经济逐步复苏；企业盈利开始改善；产能利用率较低，通胀压力温和；宽松货币政策持续发挥作用。', 'sec06.rec.a': '<b>最优资产：股票 Stocks</b>',
            'sec06.o.t': '过热期', 'sec06.o.tag': '经济上行 ↑ + 通胀上行 ↑', 'sec06.o.d': '经济增长强劲，接近或超过潜在增速；产能利用率高企；需求旺盛推动物价上涨；货币政策开始收紧，利率上升。', 'sec06.o.a': '<b>最优资产：商品 Commodities</b>',
            'sec06.s.t': '滞胀期', 'sec06.s.tag': '经济下行 ↓ + 通胀上行 ↑', 'sec06.s.d': '经济增长乏力或停滞；通胀压力持续或加剧；政策陷入两难境地；企业成本上升但需求不足。', 'sec06.s.a': '<b>最优资产：现金 Cash</b>',
            'sec06.imf': '<b>IMF 报告怎么用：</b>国际货币基金组织（IMF）作为全球宏观数据的集散地，它的年度预测报告是有价值的——不是用来指导日内交易，而是用来感受「全球资本的流向与温差」。看 IMF 报告，不看它的「精确数字」，只看它的「趋势风险」。如果 IMF 警告「滞胀风险加剧」或「地缘政治导致能源危机」，这恰好就是我们永续组合中防御型资产发挥作用的时候；如果 IMF 警告「全球衰退风险上升」，那就检查一遍你的现金储备是否充足。<br><br>切记：<b>我们是来赢的，不是来当经济学家的。</b>宏观导航仪只是辅助，真正决定胜负的，是接下来你要看到的那七个真相。',

            // 07
            'sec07.title': '从收入到财富：为什么你越忙越穷？', 'sec07.hint': '七个真相 · 上篇', 'sec07.lede': '因为你被困在了一个隐形的循环里：<b>出卖时间 → 换取工资 → 支付账单 → 继续出卖时间。</b>',
            'sec07.t1.l': '真相 01', 'sec07.t1.t': '打破「卖时间换钱」的死循环', 'sec07.t1.d': '一旦失业、生病或年老，收入立刻断流，毫无缓冲。', 'sec07.t1.logic': '<b>底层逻辑 · 人生兜底：</b>不靠体力也能有现金流，获得最基础的安全感。',
            'sec07.t2.l': '真相 02', 'sec07.t2.t': '对抗职场内卷与年龄焦虑', 'sec07.t2.d': '35 岁危机、无意义加班，单一工资让你毫无议价权，只能忍气吞声。', 'sec07.t2.logic': '<b>底层逻辑 · 选择的底气：</b>敢拒绝不合理要求，敢裸辞、敢换赛道，不必为生存出卖尊严。',
            'sec07.t3.l': '真相 03', 'sec07.t3.t': '抵消通胀，守住血汗钱', 'sec07.t3.d': '银行利息跑不赢物价，辛苦攒的钱购买力逐年缩水，越存越穷。', 'sec07.t3.logic': '<b>底层逻辑 · 资产增值：</b>让钱替你打工，用资产的收益率去对冲生活成本的上涨。',
            'sec07.t4.l': '真相 04', 'sec07.t4.t': '拿回时间自主权', 'sec07.t4.d': '人被钉在工位上，时间卖给公司，请假扣钱，生活被工作绑架。', 'sec07.t4.logic': '<b>底层逻辑 · 时间自由：</b>从「必须上班」中解放，自主支配时间去陪伴、旅行或探索热爱。',
            'sec07.t5.l': '真相 05', 'sec07.t5.t': '备好人生的「第二份社保」', 'sec07.t5.d': '意外总比计划快：重病、行业崩盘、家庭变故，抗风险能力脆弱。', 'sec07.t5.logic': '<b>底层逻辑 · 终极备胎：</b>无需遇事就求人借钱、啃老，自己就是自己最稳的靠山。',
            'sec07.t6.l': '真相 06', 'sec07.t6.t': '解锁财富的复利效应', 'sec07.t6.d': '工资是线性增长甚至停滞，一停止劳动，收入归零。', 'sec07.t6.logic': '<b>底层逻辑 · 复利曲线：</b>收入不再是线性的，而是利滚利、资产生资产，后期越赚越轻松。',
            'sec07.t7.l': '真相 07', 'sec07.t7.t': '为家庭铸造防波堤', 'sec07.t7.d': '一场大病、一次求学就能掏空家底，遇事就得精打细算、四处低头。', 'sec07.t7.logic': '<b>底层逻辑 · 家族底气：</b>让家人活得有尊严，孩子教育、老人医疗不再成为压垮生活的稻草。',
            'sec07.summary': '核心逻辑：主动收入是一根绳子，断了就摔死；被动收入是一张网，网越密越安全。',

            // 08
            'sec08.title': '打破越忙越穷，七步重构你的资本结构', 'sec08.hint': '下篇', 'sec08.lede': '从「出卖时间的雇员」到「个人主权基金的 CEO」，需要走完下面这七步。',
            'sec08.s1.l': 'STEP 01 · 锚点', 'sec08.s1.t': '认知焦点', 'sec08.s1.d': '从关注「年薪多少」转向关注「拥有多少全球真资产」。', 'sec08.s1.logic': '<b>底层逻辑：</b>年薪是「流量」，资产是「存量」。人的精力时间有限，停止出售时间的内卷游戏，转向积累资产的无限游戏。',
            'sec08.s2.l': 'STEP 02 · 定位', 'sec08.s2.t': '转变身份', 'sec08.s2.d': '从「雇员」转向「自身财富帝国的 CEO」。', 'sec08.s2.logic': '<b>底层逻辑：</b>CEO 思维是构建一个能自我造血、持续产生利润，且最终独立于你个人体力而存在的资产系统。',
            'sec08.s3.l': 'STEP 03 · 行动', 'sec08.s3.t': '思维觉醒', 'sec08.s3.d': '以「能否产生持续被动收入」为唯一标尺。', 'sec08.s3.logic': '<b>底层逻辑：</b>每一笔投入，都要问自己：是资产为我工作，还是我为负债打工？',
            'sec08.s4.l': 'STEP 04 · 燃料', 'sec08.s4.t': '积累资本', 'sec08.s4.d': '强制储蓄，截留现金流。', 'sec08.s4.logic': '<b>底层逻辑：</b>积累资本的本质是「截流和储蓄」，绝非「增加消费」。',
            'sec08.s5.l': 'STEP 05 · 护城河', 'sec08.s5.t': '隔离风险', 'sec08.s5.d': '增加「地理套利」与「身份冗余」，防止单一市场、单一货币、单一制度下的政策风险、汇率风险和极端系统性风险。', 'sec08.s5.logic': '<b>底层逻辑：</b>钱不能只在一种货币里、一种国家里、一种制度里！',
            'sec08.s6.l': 'STEP 06 · 战场', 'sec08.s6.t': '配置资产', 'sec08.s6.d': '全球布局「真资产」。', 'sec08.s6.logic': '<b>底层逻辑：</b>根据生命周期动态调整仓位：年轻时侧重权益类资产（股票、基金），成熟期侧重现金流资产（高股息、债券）。',
            'sec08.s7.l': 'STEP 07 · 终局', 'sec08.s7.t': '复利增长', 'sec08.s7.d': '收益再投资 + 动态再平衡。', 'sec08.s7.logic': '<b>底层逻辑：</b>让你的资产组合最终进化为一个「独立造血、全球配置的个人主权基金」。',
            'sec08.summary': '核心逻辑：从认知到行动，七步走完就是从「出卖时间的雇员」到「个人主权基金的 CEO」的完整进化路径。',

            // 09
            'sec09.title': '从理论到可执行的阶梯式行动指南', 'sec09.lede': '一旦付诸行动，你眼中的世界和生活选择将被彻底重塑。',
            'sec09.a1.l': '第一步', 'sec09.a1.t': '明确「不投」原则清单', 'sec09.a1.d': '🚫 不投坏制度（契约精神缺失、主权违约、资本管制之地）<br>🚫 不投无底洞（持续烧钱、难见自由现金流的耗钱资产）<br>🚫 不投靠补贴（依赖政策输血、内生造血存疑的商业模式）',
            'sec09.a2.l': '初级阶段', 'sec09.a2.t': '国内全球配置', 'sec09.a2.d': '通过 QDII 基金、跨境 ETF、港股通，在国内账户里实现初步的国别、货币、资产类别分散。',
            'sec09.a3.l': '进阶段位', 'sec09.a3.t': '全球分散配置', 'sec09.a3.d': '香港、新加坡、美国等国家与地区的离岸账户，或者考虑第二身份或海外账户。',
            'sec09.a4.l': '段位', 'sec09.a4.t': '身份与架构', 'sec09.a4.d': '设置离岸信托、家族办公室等架构，需考虑税务身份规划。',
            'sec09.summary': '<b>终局测试：</b>当你或家人停止工作 3-5 年，仅靠这套全球「真资产」组合产生的被动收入，能否维持体面生活？若答案为「是」，你的财富自由施工图才算真正竣工。',

            // 10
            'sec10.title': '投资的第一原则：法治与契约精神是投资决策的基石', 'sec10.lede': '钱只能投往尊重契约、法治完善、有流动性、有安全保障的国家和地区。',

            // 11
            'sec11.title': '全球三大证券交易市场：十三项维度对比', 'sec11.lede': '美国市场没有易会满式的「带病上市」，没有港股通的「入易出难」，没有港股的流动性枯竭，没有中国量化收割导致的「屠杀」。', 'sec11.core': '<b>核心逻辑：</b>A 股制度缺陷 → 港股通制度缺陷放大 → 香港券商开户受限 → 最终选择制度相对健全的美国市场。',

            // 12
            'sec12.title': '跨境投资的核心：摩擦成本与风险警示', 'sec12.lede': '外汇管制之下，资金进得去未必出得来。换汇、税费、汇款，每一项都在悄悄吃掉你的收益。', 'sec12.desc': '这条路本身也有代价：CRS 税务透明、资金跨境摩擦、法律保护缺失。相比在 A 股和港股被「制度性收割」，很多人觉得这个代价值得。当制度让投资者一次次失望，投资者自然会用脚投票，即使这条投票的路也不好走。', 'sec12.warn': '境外投资不是馅饼，是钢丝；境外账户不隐秘，CRS 之下它是透明的。美股遗产税对非居民免税额仅 6 万美元，账户不在信托架构内，离世时可能被拿走将近一半。<br><br>如果看完这一段，你觉得太麻烦、成本太高、睡不好觉，那就把全部资金留在 A 股的高息红利组合里，按本书的零成本奶牛策略执行，绝不丢人。<br><br><b>规则是死的，成本是刚性的；聪明人从不和规则硬刚，他们只在规则里面找到那条最优解。</b>',

            // 13
            'sec13.title': '构建反脆弱体系：全球货币配置指南', 'sec13.lede': '美元锚定价值，瑞郎日元避险，商品货币博取收益。用「大数定律」对抗「汇率黑天鹅」和对冲「单一法币风险」，在全球流动性中寻找安全锚点。', 'sec13.summary': '<b>投资的核心逻辑：全球化、分散化、多币种化、去中心化的资产拓扑结构是唯一分摊风险的策略。</b>具备全球视野，并通过科学的工具和纪律性的执行，将风险分散到不同的维度，从而在不确定的世界中寻求长期回报。'
        },
        en: {
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
            'brandName': 'Core Toolbox',
            'bible.titleA': 'Yang Family\'s ',
            'bible.titleB': 'Survival & Wealth Freedom Playbook',
            'bible.lede': 'This "The Global Wealth Bible" builds a complete personal wealth advancement system from cognitive awakening to specific execution. Its core logic can be summarized as "Cognition → Risk Aversion → Execution → Allocation → Growth → Implementation → Sublimation".<br><br>From macro to micro, from theory to practice, from defense to offense, from local to global, it has built a very mature, professional, and logically self-consistent "all-weather investment system for individuals/families/institutions".<br><br>It is not just an investment guide, but a "blueprint for wealth freedom", an all-weather perpetual asset that can be passed down.<br><br>As long as the executor can overcome human weaknesses (chasing highs and selling lows) and allocate strictly according to this system, long-term wealth preservation and appreciation is a 100% event.<br><br>The Global Wealth Bible constitutes a complete investment closed loop, a wealth path with an extremely clear logical chain.',
            'bible.chip1': 'Insight into the Era',
            'bible.chip2': 'Mindset Reconstruction',
            'bible.chip3': 'Deconstructing Fatal Contradictions',

            // 01
            'sec01.title': 'Modern Metamorphosis of Governance Techniques',
            'sec01.hint': 'Seeing through control is the beginning of awakening',
            'sec01.lede': 'Once a person begins to awaken, the world and life choices in your eyes will be completely different.',
            'sec01.kpi1.l': 'System', 'sec01.kpi1.t': 'Shang Yang Reforms (Basis of Thought Control)', 'sec01.kpi1.d': 'Keep the common people too busy to think, incapable of thinking, and only able to follow. For over two thousand years, the skin has changed, but the core remains the same.',
            'sec01.kpi2.l': 'Thinking', 'sec01.kpi2.t': 'Dialectics (Disintegration of Logic)', 'sec01.kpi2.d': 'Logic is thus rendered useless; right and wrong no longer matter, only position matters. Dialectics is abused into "both sides are right", and you can never win.',
            'sec01.kpi3.l': 'Desire', 'sec01.kpi3.t': 'Tittytainment (Filling Attention)', 'sec01.kpi3.d': 'Then use tittytainment to fill people\'s minds, so you don\'t even feel the very fact that "you can\'t figure it out".',
            'sec01.kpi4.l': 'Harvest', 'sec01.kpi4.t': '35-Year-Old Optimization (Economic Harvest)', 'sec01.kpi4.d': '"35-year-old optimization" has become a social consensus, evolving from a business viewpoint into an unspoken rule. Various online loans are launched to consume young people\'s earnings for decades to come in advance.',

            // 02
            'sec02.title': 'Deep Thinking: The Root of Current Dilemmas',
            'sec02.lede': 'When the tide of the times recedes, what truly keeps you alive is never the trend and luck, but clear cognition, solid ability, and long-termism not coerced by anxiety.',
            'sec02.kpi1.l': 'Environment', 'sec02.kpi1.t': 'Employment Ice Age', 'sec02.kpi1.d': 'This generation, having graduated during an economic downturn, is forever excluded from stable permanent positions and falls into a cycle of low wages and temporary employment. A huge gap has formed compared to the previous generation (who were assigned jobs and housing).',
            'sec02.kpi2.l': 'Status Quo', 'sec02.kpi2.t': 'Disillusionment of the "Iron Rice Bowl"', 'sec02.kpi2.d': 'Civil servants, once regarded as a "divine job", have been reduced to high-pressure, low-return hard labor under fiscal tightening, and the illusion of stability has been completely shattered.',
            'sec02.kpi3.l': 'Fact', 'sec02.kpi3.t': 'The Trap of Devalued Higher Education', 'sec02.kpi3.d': 'Schools have created too many highly educated talents, but no companies can absorb them to create value. Ultimately, they have to do the most ordinary jobs: food delivery, courier, security guard.',
            'sec02.kpi4.l': 'Result', 'sec02.kpi4.t': 'Society is Sick, It\'s Not Your Fault', 'sec02.kpi4.d': 'When more and more young people are optimized out by the Chinese kill line of thirty-five, no one tells you that it\'s not you who is wrong, but society that is sick.',

            // 03
            'sec03.title': 'Coping Philosophy: Great Hermits Hide in the City, Focus on Micro-Survival',
            'sec03.lede': 'In an uncontrollable macro environment, shrink the defense line and focus on the survival quality of micro-individuals.',
            'sec03.kpi1.l': 'Breakthrough', 'sec03.kpi1.t': 'Active Observation (Awakening)', 'sec03.kpi1.d': 'No longer being the person who "can\'t figure it out, or even can\'t feel that they can\'t figure it out". This is cognitive awakening. You are no longer a passive receiver, but an active observer.',
            'sec03.kpi2.l': 'Phase 1', 'sec03.kpi2.t': 'Defense (Shut Up)', 'sec03.kpi2.d': 'Since you can\'t win the dialectical game of "whatever you say is reasonable", silence is the highest form of contempt. Cutting off the manipulated interface—this is a technique of information blockade.',
            'sec03.kpi3.l': 'Phase 2', 'sec03.kpi3.t': 'Stealth (Disappear)', 'sec03.kpi3.d': 'Don\'t stick your neck out, don\'t pursue false fame, don\'t be coerced by grand narratives, don\'t be kidnapped by collective fanaticism, and make yourself an "invisible person" in the eyes of the system. Become an "invisible" node; if the system cannot locate you, it naturally cannot harvest you.',
            'sec03.kpi4.l': 'Phase 3', 'sec03.kpi4.t': 'Offense (Make Money)', 'sec03.kpi4.d': 'In a world where logic is rendered useless and faith is deconstructed, only cash flow and assets are the real moats. In a world without faith and with chaotic logic, only real gold and silver are certain.',

            // 04
            'sec04.title': 'Learning the Rothschild Family Philosophy',
            'sec04.hint': 'System Design · Risk Control · Long-termism',
            'sec04.lede': 'The Rothschild family has survived cycles for nearly three centuries. Their underlying logic does not rely on a single skill, but on a dynamic system linked together to achieve perpetual survival.',
            'sec04.kpi1.l': 'Philosophy', 'sec04.kpi1.t': 'Absolute Secrecy and Risk Diversification', 'sec04.kpi1.d': 'Core precept: All internal affairs are strictly confidential to the outside world. As long as you are united, you are invincible; the day you "break up" will be the beginning of your loss of prosperity.', 'sec04.kpi1.logic': '<b>Logic:</b> Ensure survival through secrecy and decentralization. The layout of five sons in five countries is essentially a sovereign risk hedge. When one country defaults or goes to war, assets in other countries remain safe, and the family still has survivors.', 'sec04.kpi1.ins': '<b>Modern Inspiration:</b> Build an anti-fragile system where "when the East is dark, the West is bright". Don\'t bet on national destiny; hedge against it, and put your eggs in different baskets.',
            'sec04.kpi2.l': 'Core Advantage', 'sec04.kpi2.t': 'Building an Information Network Beyond the Era', 'sec04.kpi2.d': 'Before the telegraph and telephone appeared, its founder formed a transnational financial network through his five sons stationed in Frankfurt, London, Paris, Naples, and Vienna.', 'sec04.kpi2.logic': '<b>Logic:</b> Build competitive barriers through information advantage. In the AI era, the cost of obtaining information is almost zero, and the cost of obtaining noise is also almost zero. You must learn to distinguish what is noise and what is signal.', 'sec04.kpi2.ins': '<b>Modern Inspiration:</b> "Independent judgment of news" and "execution half a beat faster than others". Use information gaps (time gaps, cognitive gaps) for arbitrage, buy when the public panics, and sell when the public revels.',
            'sec04.kpi3.l': 'Inheritance', 'sec04.kpi3.t': 'Locking Wealth and Power with Systems', 'sec04.kpi3.d': 'The curse of "wealth not lasting beyond three generations" has failed on the Rothschild family; the core is that they used almost ruthless systems to turn family unity and wealth concentration into iron laws.', 'sec04.kpi3.logic': '<b>Logic:</b> Guarantee wealth inheritance with strict systems. Forcibly transform "blood relations" into "shareholder relations". The family is no longer an organization of affection, but a capital proliferation machine.', 'sec04.kpi3.ins': '<b>Modern Inspiration:</b> True inheritance is not money, but a system that even a fool cannot squander. Turn "home" into "company", and "affection" into "equity".',
            'sec04.kpi4.l': 'Business Model', 'sec04.kpi4.t': 'Symbiosis with Power, Not Confrontation', 'sec04.kpi4.d': 'The Rothschild family never sought to overthrow regimes, but chose to become the "bankers" of all regimes.', 'sec04.kpi4.logic': '<b>Logic:</b> Achieve maximum benefit through symbiosis with power. They made themselves indispensable fund providers for war, infrastructure, and trade. If you eliminate me, your war cannot be fought.', 'sec04.kpi4.ins': '<b>Modern Inspiration:</b> Become the "tax collector" of the ecosystem. Make yourself "too big to fail", and by controlling the economic lifeline, make the rulers inseparable from you.',
            'sec04.summary': 'The true meaning of Rothschild philosophy is ultimately one sentence: Use the system to lock the lower limit, and use initiative to open the upper limit.',

            // 05
            'sec05.title': 'Error Tolerance Warning', 'sec05.sub': 'Error Tolerance Warning', 'sec05.lede': 'Remember: On this land, you don\'t have many chances to make mistakes.', 'sec05.desc': 'This philosophy works everywhere. But on the land beneath your feet, it is not an option, it is a necessity. Here there are many people, narrow roads, and deep pits. One wrong decision, one blind following, may cost you and your descendants decades to repay.', 'sec05.outro': 'The best amulet I can leave you is to make you recognize from the bottom of your bones: <br>You must win, because you cannot afford to lose.',

            // 06
            'sec06.title': 'Global Macro and Cycle Positioning: Merrill Lynch Clock', 'sec06.lede': 'The Merrill Lynch Clock divides the economic cycle into four stages: Recovery (allocate stocks), Overheat (allocate commodities), Stagflation (hold cash), and Recession (allocate bonds). However, in the market environment with Chinese characteristics, the traditional Merrill Lynch Clock often fails. When we diversify globally, we cannot just look down and pull the cart, but must look up and see the road. For the younger generation, I introduce two traditional macro navigation tools, but require you to use them prudently in combination with reality.',
            'sec06.r.t': 'Recession', 'sec06.r.tag': 'Economy ↓ + Inflation ↓', 'sec06.r.d': 'GDP growth slows or turns negative; corporate profits fall, unemployment rises; weak demand leads to falling prices; monetary policy turns loose, interest rates fall.', 'sec06.r.a': '<b>Best Asset: Bonds</b>',
            'sec06.rec.t': 'Recovery', 'sec06.rec.tag': 'Economy ↑ + Inflation ↓', 'sec06.rec.d': 'GDP growth rebounds, the economy gradually recovers; corporate profits begin to improve; capacity utilization is low, inflationary pressure is mild; loose monetary policy continues to work.', 'sec06.rec.a': '<b>Best Asset: Stocks</b>',
            'sec06.o.t': 'Overheat', 'sec06.o.tag': 'Economy ↑ + Inflation ↑', 'sec06.o.d': 'Strong economic growth, approaching or exceeding potential growth rate; high capacity utilization; strong demand pushes up prices; monetary policy begins to tighten, interest rates rise.', 'sec06.o.a': '<b>Best Asset: Commodities</b>',
            'sec06.s.t': 'Stagflation', 'sec06.s.tag': 'Economy ↓ + Inflation ↑', 'sec06.s.d': 'Weak or stagnant economic growth; inflation pressure continues or intensifies; policy falls into a dilemma; corporate costs rise but demand is insufficient.', 'sec06.s.a': '<b>Best Asset: Cash</b>',
            'sec06.imf': '<b>How to use IMF reports:</b> The International Monetary Fund (IMF), as a global macro data hub, has valuable annual forecast reports—not to guide intraday trading, but to feel the "flow and temperature difference of global capital". When reading IMF reports, don\'t look at the "precise numbers", only look at the "trend risks". If the IMF warns of "aggravated stagflation risks" or "geopolitical energy crises", this is exactly when the defensive assets in our perpetual portfolio come into play; if the IMF warns of "rising global recession risks", check whether your cash reserves are sufficient.<br><br>Remember: <b>We are here to win, not to be economists.</b> The macro navigator is only an auxiliary; what truly determines the outcome are the seven truths you are about to see.',

            // 07
            'sec07.title': 'From Income to Wealth: Why the Busier You Are, the Poorer You Get?', 'sec07.hint': 'Seven Truths · Part I', 'sec07.lede': 'Because you are trapped in an invisible cycle: <b>Sell time → Get paid → Pay bills → Continue selling time.</b>',
            'sec07.t1.l': 'Truth 01', 'sec07.t1.t': 'Break the "Sell Time for Money" Cycle', 'sec07.t1.d': 'Once you lose your job, get sick, or grow old, your income cuts off immediately, with no buffer.', 'sec07.t1.logic': '<b>Logic · Life Fallback:</b> Have cash flow even without physical labor, gaining the most basic sense of security.',
            'sec07.t2.l': 'Truth 02', 'sec07.t2.t': 'Combat Workplace Involution and Age Anxiety', 'sec07.t2.d': 'The age 35 crisis, meaningless overtime, and a single salary give you no bargaining power, forcing you to swallow your anger.', 'sec07.t2.logic': '<b>Logic · The Confidence to Choose:</b> Dare to refuse unreasonable demands, dare to quit naked, dare to change tracks, and don\'t have to sell your dignity for survival.',
            'sec07.t3.l': 'Truth 03', 'sec07.t3.t': 'Offset Inflation and Protect Your Hard-Earned Money', 'sec07.t3.d': 'Bank interest cannot beat prices, the purchasing power of your hard-saved money shrinks year by year, and the more you save, the poorer you get.', 'sec07.t3.logic': '<b>Logic · Asset Appreciation:</b> Let money work for you, using asset returns to hedge against rising living costs.',
            'sec07.t4.l': 'Truth 04', 'sec07.t4.t': 'Take Back Time Autonomy', 'sec07.t4.d': 'People are nailed to their workstations, time is sold to the company, taking leave deducts pay, and life is kidnapped by work.', 'sec07.t4.logic': '<b>Logic · Time Freedom:</b> Liberate yourself from "having to go to work" and autonomously control time to accompany, travel, or explore your passions.',
            'sec07.t5.l': 'Truth 05', 'sec07.t5.t': 'Prepare a "Second Social Security" for Life', 'sec07.t5.d': 'Accidents always come faster than plans: severe illness, industry collapse, family changes, and fragile risk resistance.', 'sec07.t5.logic': '<b>Logic · Ultimate Spare Tire:</b> No need to beg for loans or rely on parents when things happen; you are your own most stable backing.',
            'sec07.t6.l': 'Truth 06', 'sec07.t6.t': 'Unlock the Compound Effect of Wealth', 'sec07.t6.d': 'Salary grows linearly or even stagnates; once you stop laboring, income drops to zero.', 'sec07.t6.logic': '<b>Logic · Compound Curve:</b> Income is no longer linear, but interest rolls on interest and assets generate assets, making it easier to earn in the later stages.',
            'sec07.t7.l': 'Truth 07', 'sec07.t7.t': 'Cast a Breakwater for the Family', 'sec07.t7.d': 'A severe illness or a college education can empty the family savings; when things happen, you have to calculate carefully and bow your head everywhere.', 'sec07.t7.logic': '<b>Logic · Family Confidence:</b> Let your family live with dignity; children\'s education and elderly medical care are no longer the straw that breaks the camel\'s back.',
            'sec07.summary': 'Core Logic: Active income is a rope, if it breaks you fall to your death; passive income is a net, the denser the safer.',

            // 08
            'sec08.title': 'Break the Busier-Poorer Cycle: Seven Steps to Restructure Your Capital', 'sec08.hint': 'Part II', 'sec08.lede': 'From "an employee selling time" to "the CEO of your own sovereign fund", you need to complete the following seven steps.',
            'sec08.s1.l': 'STEP 01 · Anchor', 'sec08.s1.t': 'Cognitive Focus', 'sec08.s1.d': 'Shift from focusing on "how much annual salary" to "how many real global assets you own".', 'sec08.s1.logic': '<b>Logic:</b> Annual salary is "flow", assets are "stock". Human energy and time are limited; stop the involution game of selling time and turn to the infinite game of accumulating assets.',
            'sec08.s2.l': 'STEP 02 · Position', 'sec08.s2.t': 'Transform Identity', 'sec08.s2.d': 'Shift from "employee" to "CEO of your own wealth empire".', 'sec08.s2.logic': '<b>Logic:</b> CEO thinking is building an asset system that can self-hematopoiesis, continuously generate profits, and ultimately exist independently of your personal physical strength.',
            'sec08.s3.l': 'STEP 03 · Action', 'sec08.s3.t': 'Mindset Awakening', 'sec08.s3.d': 'Use "whether it can generate continuous passive income" as the sole criterion.', 'sec08.s3.logic': '<b>Logic:</b> For every investment, ask yourself: Is the asset working for me, or am I working for the liabilities?',
            'sec08.s4.l': 'STEP 04 · Fuel', 'sec08.s4.t': 'Accumulate Capital', 'sec08.s4.d': 'Forced savings, intercept cash flow.', 'sec08.s4.logic': '<b>Logic:</b> The essence of accumulating capital is "cutting off flow and saving", absolutely not "increasing consumption".',
            'sec08.s5.l': 'STEP 05 · Moat', 'sec08.s5.t': 'Isolate Risks', 'sec08.s5.d': 'Increase "geographic arbitrage" and "identity redundancy" to prevent policy risks, exchange rate risks, and extreme systemic risks under a single market, single currency, or single system.', 'sec08.s5.logic': '<b>Logic:</b> Money cannot only be in one currency, one country, one system!',
            'sec08.s6.l': 'STEP 06 · Battlefield', 'sec08.s6.t': 'Allocate Assets', 'sec08.s6.d': 'Global allocation of "real assets".', 'sec08.s6.logic': '<b>Logic:</b> Dynamically adjust positions according to the life cycle: focus on equity assets (stocks, funds) when young, and cash flow assets (high dividends, bonds) in maturity.',
            'sec08.s7.l': 'STEP 07 · Endgame', 'sec08.s7.t': 'Compound Growth', 'sec08.s7.d': 'Reinvest returns + dynamic rebalancing.', 'sec08.s7.logic': '<b>Logic:</b> Let your asset portfolio ultimately evolve into an "independently hematopoiesis, globally allocated personal sovereign fund".',
            'sec08.summary': 'Core Logic: From cognition to action, the seven steps complete the full evolutionary path from "an employee selling time" to "the CEO of a personal sovereign fund".',

            // 09
            'sec09.title': 'Step-by-Step Action Guide from Theory to Execution', 'sec09.lede': 'Once put into action, the world and life choices in your eyes will be completely reshaped.',
            'sec09.a1.l': 'Step 1', 'sec09.a1.t': 'Clarify the "Do Not Invest" Principle List', 'sec09.a1.d': '🚫 Don\'t invest in bad systems (where the spirit of contract is missing, sovereign default, capital controls) <br>🚫 Don\'t invest in bottomless pits (money-burning assets that continuously burn cash and rarely see free cash flow) <br>🚫 Don\'t invest in subsidies (business models that rely on policy blood transfusions and have questionable endogenous hematopoiesis)',
            'sec09.a2.l': 'Primary Stage', 'sec09.a2.t': 'Domestic Global Allocation', 'sec09.a2.d': 'Through QDII funds, cross-border ETFs, and Stock Connect, achieve initial country, currency, and asset class diversification within domestic accounts.',
            'sec09.a3.l': 'Advanced Stage', 'sec09.a3.t': 'Global Diversified Allocation', 'sec09.a3.d': 'Offshore accounts in countries and regions such as Hong Kong, Singapore, and the United States, or consider a second identity or overseas accounts.',
            'sec09.a4.l': 'High Stage', 'sec09.a4.t': 'Identity and Structure', 'sec09.a4.d': 'Set up offshore trusts, family offices, and other structures, requiring consideration of tax identity planning.',
            'sec09.summary': '<b>Endgame Test:</b> When you or your family stop working for 3-5 years, can you maintain a decent life solely relying on the passive income generated by this global "real assets" portfolio? If the answer is "yes", your wealth freedom blueprint is truly completed.',

            // 10
            'sec10.title': 'The First Principle of Investment: Rule of Law and Contract Spirit are the Cornerstones of Investment Decisions', 'sec10.lede': 'Money can only be invested in countries and regions that respect contracts, have a sound rule of law, have liquidity, and have security guarantees.',

            // 11
            'sec11.title': 'Top Three Global Stock Markets: Thirteen Dimension Comparison', 'sec11.lede': 'The US market does not have Yi Huiman-style "sick listings", does not have the "easy entry but difficult exit" of Stock Connect, does not have the liquidity depletion of Hong Kong stocks, and does not have the "slaughter" caused by Chinese quantitative harvesting.', 'sec11.core': '<b>Core Logic:</b> A-share system flaws → Amplified Stock Connect flaws → Restricted HK broker account opening → Final choice of the relatively sound US market.',

            // 12
            'sec12.title': 'The Core of Cross-border Investment: Friction Costs and Risk Warnings', 'sec12.lede': 'Under foreign exchange controls, funds that go in may not necessarily come out. Currency exchange, taxes, and remittances are all quietly eating away your returns.', 'sec12.desc': 'This path itself has a cost: CRS tax transparency, cross-border capital friction, and lack of legal protection. Compared to being "institutionally harvested" in A-shares and HK stocks, many people feel this cost is worth it. When the system disappoints investors time and again, investors will naturally vote with their feet, even if the path of voting is also difficult.', 'sec12.warn': 'Overseas investment is not a pie, it is a tightrope; overseas accounts are not secret, they are transparent under CRS. The US estate tax exemption for non-residents is only $60,000; if the account is not within a trust structure, nearly half may be taken away upon death.<br><br>If after reading this paragraph, you feel it is too troublesome, the cost is too high, and you can\'t sleep well, then leave all your funds in the A-share high-yield dividend portfolio and execute according to the zero-cost cow strategy in this book. It is absolutely not shameful.<br><br><b>Rules are dead, costs are rigid; smart people never confront rules head-on, they only find the optimal solution within the rules.</b>',

            // 13
            'sec13.title': 'Building an Anti-Fragile System: Global Currency Allocation Guide', 'sec13.lede': 'The US dollar anchors value, the Swiss franc and Japanese yen hedge risks, and commodity currencies seek returns. Use the "law of large numbers" to fight "exchange rate black swans" and hedge "single fiat currency risks", finding a safe anchor in global liquidity.', 'sec13.summary': '<b>Core Logic of Investment: A globalized, decentralized, multi-currency, non-custodial asset topology is the only strategy to spread risk.</b> Have a global perspective, and through scientific tools and disciplined execution, spread risks to different dimensions to seek long-term returns in an uncertain world.'
        }
    };

    // 页面加载后执行一次翻译和点亮
    document.addEventListener('DOMContentLoaded', function() {
        applyTranslate(lang);
        updateBtnActive(lang);
    });

    // 监听点击
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('#langBtn');
        if (btn) {
            lang = (lang === 'zh-CN') ? 'en' : 'zh-CN';
            localStorage.setItem(STORAGE_KEY, lang);
            document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN');
            updateBtnActive(lang);
            applyTranslate(lang);
        }
    });

    // 点亮按钮
    function updateBtnActive(currentLang) {
        var btn = document.getElementById('langBtn');
        if (!btn) return;
        var z = btn.querySelector('.zh');
        var n = btn.querySelector('.en');
        if (z && n) {
            z.classList.toggle('active', currentLang !== 'en');
            n.classList.toggle('active', currentLang === 'en');
        }
    }

    // 核心翻译
    function applyTranslate(currentLang) {
        var data = dict[currentLang === 'en' ? 'en' : 'zh'];
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            if (data[key]) el.innerHTML = data[key];
        });
    }
})();