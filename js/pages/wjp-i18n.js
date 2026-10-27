/* ============================================================
 * wjp-i18n.js
 * WJP 法治指数地图 · 完整融合版
 * ============================================================ */
(function (global) {
  'use strict';

  var DICT = {
    zh: {
      // ★ 导航栏与品牌区（解决不翻译的问题）
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

      // ★ Hero 区（刚补的）
      'heroTitleA': '世界正义工程',
      'heroTitleB': '法治指数地图',
      'heroLedeBold': '有效的法治是和平、机会与公平的基石。',
      'heroLedeRestA': '通过全球数据量化评估各国法治实践，揭示权力约束、基本权利与司法公正的',
      'heroLedeHl': '真实维度',
      'heroLedeRestB': '。',
      'chip1': '政府权力约束',
      'chip2': '廉洁程度',
      'chip3': '基本权利',
      'chip4': '开放政府',
      'chip5': '秩序与安全',
      'chip6': '监管执法',
      'chip7': '民事与刑事司法',

      appTitle:'世界正义工程（WJP）法治指数地图',
      appSub:'有效的法治是和平、机会和公平社区的基石，跨学科合作是推动法治的最有效方式。',
      runtime:'已运行', unitDays:'天',
      btnExport:'导出排名 CSV', btnReset:'清除缓存',
      uploadLabel:'选择 WJP 法治指数数据 (.csv)',
      uploadHint:'支持拖拽 · CSV 需含 Country 与 Rank 列，其余列（Factor1 ~ Factor8）作为维度',
      overviewTitle:'📊 数据一览',
      kpiCountries:'🌍 已导入国家', kpiCountriesSub:'当前数据集覆盖',
      kpiAvg:'📊 平均法治指数', kpiAvgSub:'全部国家均值',
      kpiTop:'🏆 最高分', kpiBottom:'📉 最低分',
      mapTitle:'🗺️ 法治指数地图',
      mapLoading:'正在加载世界地图数据...',
      mapHint:'🖱️ 点击国家查看详情 · 滚轮缩放 · 拖拽平移 · 悬停/点击提亮',
      legendTitle:'法治指数',
      searchPlaceholder:'🔍 输入国家名称（中文/英文）...',
      btnSearch:'搜索', btnClear:'清除',
      locate:'📍 定位到：',
      notFound:'❌ 未找到该国家',
      rankTitle:'🏆 排行榜对比',
      topLabel:'🏆 TOP 10',
      bottomLabel:'📉 BOTTOM 10',
      metricOverall:'综合法治指数',
      colRank:'名次', colCountry:'国家', colScore:'指数',
      noData:'暂无数据，请先导入 CSV',
      noRecord:'暂无该国的 WJP 数据',
      globalRank:'🏆 全球排名',
      indexScore:'📊 法治指数',
      dimTitle:'八大因素得分',
      drawerTitle:'导航',
      navHome:'实战宝典', navUS:'美国市场', navCN:'中国市场',
      navHK:'香港市场  ↗', navMap:'法制地图',
      navOverview:'数据一览', navMapSec:'法治地图', navRank:'全球排名',
      foot1:'🔒 所有解析与计算在本地完成',
      foot2:'📌 导入 WJP 官方 CSV 即可为地图着色',
      foot3:'⚡ 自动识别国家 · 无需改代码',
      foot4:'💾 数据自动缓存',
      footSign:'世界正义工程（WJP）法治指数地图 · 杨晟琦文明公理系统',
      toastLoaded:'✅ 导入成功！共 {n} 个国家',
      toastFromCache:'📎 从缓存加载（上次导入的数据）',
      toastExported:'✅ 已导出 {n} 条国家排名',
      toastNoData:'❌ 无数据可导出',
      toastParseErr:'❌ 解析失败：',
      toastEmpty:'❌ 未解析到有效数据，请检查 CSV 格式',
      toastFileEmpty:'❌ 文件为空或格式不正确',
      toastNeedCols:'❌ CSV 必须包含 Country 与 Rank 列',
      toastReset:'确定要清除缓存数据并重置吗？',
      modalTitle:'⚖️ WJP 法治指数 · 八大因素',
      modalTh1:'因素代码', modalTh2:'维度名称', modalTh3:'含义',
      errEchartsLoad: '❌ ECharts 未加载，请检查网络。',
      errPapaLoad: '❌ PapaParse 未加载',
      errSerialize: '⚠️ 数据序列化失败：{e}',
      errQuota: '⚠️ 浏览器缓存已满，请点「清除缓存」后重试。',
      errSave: '⚠️ 数据保存失败：{e}',
      errCacheCorrupt: '⚠️ 本地缓存已损坏，请重新导入 CSV',
      errMapLoad: '❌ 地图数据加载失败，请检查网络连接。',
      errMapInit: '❌ 地图初始化失败，请查看控制台。',
      tipScore: '法治指数：<strong>{v}</strong>',
      tipRank: '全球排名：第 <strong>{r}</strong> 名',
      tipNoData: '暂无 WJP 数据',
      floatSub: 'WJP 法治指数 · 全球排名',
      floatRank: '全球排名：第 {r} 名',
      uploadTitle: '📂 数据上传',
    },
    en: {
      // ★ 导航栏与品牌区
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

      // ★ Hero 区
      'heroTitleA': 'World Justice Project',
      'heroTitleB': 'Rule of Law Index',
      'heroLedeBold': 'Effective rule of law is the foundation of peaceful, opportunity-rich and fair communities.',
      'heroLedeRestA': 'Quantifying global rule of law practices to reveal the ',
      'heroLedeHl': 'true dimensions',
      'heroLedeRestB': ' of power constraints and justice.',
      'chip1': 'Constraints on Gov Powers',
      'chip2': 'Absence of Corruption',
      'chip3': 'Fundamental Rights',
      'chip4': 'Open Government',
      'chip5': 'Order and Security',
      'chip6': 'Regulatory Enforcement',
      'chip7': 'Civil & Criminal Justice',

      appTitle:'WJP Rule of Law Index Map',
      appSub:'Effective rule of law is the foundation of peaceful, opportunity-rich and fair communities.',
      runtime:'Running', unitDays:'days',
      btnExport:'Export Ranking CSV', btnReset:'Clear Cache',
      uploadLabel:'Choose WJP data (.csv)',
      uploadHint:'Drag & drop · CSV needs Country + Rank columns, others become dimensions',
      overviewTitle:'📊 Data Overview',
      kpiCountries:'🌍 Countries', kpiCountriesSub:'In current dataset',
      kpiAvg:'📊 Average Index', kpiAvgSub:'Mean across countries',
      kpiTop:'🏆 Highest', kpiBottom:'📉 Lowest',
      mapTitle:'🗺️ Rule of Law Index Map',
      mapLoading:'Loading world map data...',
      mapHint:'🖱️ Click a country for details · scroll to zoom · drag to pan · hover/click to highlight',
      legendTitle:'Index Score',
      searchPlaceholder:'🔍 Search country (CN / EN)...',
      btnSearch:'Search', btnClear:'Clear',
      locate:'📍 Located: ',
      notFound:'❌ Country not found',
      rankTitle:'🏆 Ranking Comparison',
      topLabel:'🏆 TOP 10',
      bottomLabel:'📉 BOTTOM 10',
      metricOverall:'Overall Rule of Law Index',
      colRank:'Rank', colCountry:'Country', colScore:'Score',
      noData:'No data yet — import a CSV first',
      noRecord:'No WJP data for this country',
      globalRank:'🏆 Global Rank',
      indexScore:'📊 Index Score',
      dimTitle:'Factor Scores',
      drawerTitle:'Menu',
      navHome:'Playbook', navUS:'U.S. Market', navCN:'China Market',
      navHK:'Hong Kong ↗', navMap:'Rule of Law',
      navOverview:'Overview', navMapSec:'World Map', navRank:'Global Ranking',
      foot1:'🔒 All parsing runs locally',
      foot2:'📌 Import the official WJP CSV to color the map',
      foot3:'⚡ Countries auto-detected',
      foot4:'💾 Data cached automatically',
      footSign:'WJP Rule of Law Index Map · Yang Shengqi',
      toastLoaded:'✅ Imported! {n} countries',
      toastFromCache:'📎 Loaded from cache',
      toastExported:'✅ Exported {n} countries',
      toastNoData:'❌ Nothing to export',
      toastParseErr:'❌ Parse failed: ',
      toastEmpty:'❌ No valid data parsed, check your CSV',
      toastFileEmpty:'❌ File is empty or malformed',
      toastNeedCols:'❌ CSV must contain Country and Rank columns',
      toastReset:'Clear cached data and reset?',
      modalTitle:'⚖️ WJP Index · Eight Factors',
      modalTh1:'Factor', modalTh2:'Dimension', modalTh3:'Meaning',
      errEchartsLoad: '❌ ECharts not loaded. Check network.',
      errPapaLoad: '❌ PapaParse not loaded',
      errSerialize: '⚠️ Serialization failed: {e}',
      errQuota: '⚠️ Cache full. Please clear cache.',
      errSave: '⚠️ Save failed: {e}',
      errCacheCorrupt: '⚠️ Cache corrupted. Re-import CSV.',
      errMapLoad: '❌ Map data load failed. Check network.',
      errMapInit: '❌ Map init failed. See console.',
      tipScore: 'Rule of Law Index: <strong>{v}</strong>',
      tipRank: 'Global Rank: <strong>#{r}</strong>',
      tipNoData: 'No WJP data',
      floatSub: 'WJP Index · Global Rank',
      floatRank: 'Global Rank: #{r}',
      uploadTitle: '📂 Data Upload',
    }
  };

  var FACTOR_ZH = {
    'Factor1':'政府权力约束', 'Factor2':'廉洁程度',
    'Factor3':'政府透明度', 'Factor4':'基本权利保障',
    'Factor5':'秩序与安全', 'Factor6':'监管执法',
    'Factor7':'民事司法', 'Factor8':'刑事司法'
  };
  var FACTOR_EN = {
    'Factor1':'Constraints on Government Powers',
    'Factor2':'Absence of Corruption',
    'Factor3':'Open Government',
    'Factor4':'Fundamental Rights',
    'Factor5':'Order and Security',
    'Factor6':'Regulatory Enforcement',
    'Factor7':'Civil Justice',
    'Factor8':'Criminal Justice'
  };
  var FACTOR_DESC_ZH = {
    'Factor1':'立法、司法与独立审计对政府权力的制约程度。',
    'Factor2':'行政、司法、警察与立法机构中不存在腐败的程度。',
    'Factor3':'政府信息公开、参与与申诉机制的开放程度。',
    'Factor4':'基本权利（言论、信仰、隐私、平等）受保障的程度。',
    'Factor5':'社会治安、犯罪控制与人身安全状况。',
    'Factor6':'法规执行的公正性与有效性。',
    'Factor7':'民事纠纷解决的可及性、公正性与效率。',
    'Factor8':'刑事司法系统的公正性、有效性与廉洁度。'
  };
  var FACTOR_DESC_EN = {
    'Factor1':'Constraints on government powers by legislature, judiciary and audit.',
    'Factor2':'Absence of corruption in government, judiciary, police and legislature.',
    'Factor3':'Openness of government information, participation and complaint mechanisms.',
    'Factor4':'Protection of fundamental rights such as speech, belief, privacy and equality.',
    'Factor5':'Order, security and effective control of crime.',
    'Factor6':'Fair and effective enforcement of regulations.',
    'Factor7':'Accessibility, impartiality and efficiency of civil justice.',
    'Factor8':'Impartiality, effectiveness and integrity of the criminal justice system.'
  };

  var ALIAS_TO_FORMAL = {
    "usa":"United States","us":"United States","u.s.":"United States","u.s.a":"United States",
    "america":"United States","united states":"United States","united states of america":"United States",
    "unitedstates":"United States","canada":"Canada","mexico":"Mexico",
    "antigua and barbuda":"Antigua and Barbuda","bahamas":"Bahamas","barbados":"Barbados",
    "belize":"Belize","costa rica":"Costa Rica","cuba":"Cuba","dominica":"Dominica",
    "dominican republic":"Dominican Republic","el salvador":"El Salvador","grenada":"Grenada",
    "guatemala":"Guatemala","haiti":"Haiti","honduras":"Honduras","jamaica":"Jamaica",
    "nicaragua":"Nicaragua","panama":"Panama","st. kitts and nevis":"St. Kitts and Nevis",
    "saint kitts and nevis":"St. Kitts and Nevis","st. lucia":"St. Lucia","saint lucia":"St. Lucia",
    "st. vincent and the grenadines":"St. Vincent and the Grenadines",
    "saint vincent and the grenadines":"St. Vincent and the Grenadines",
    "trinidad and tobago":"Trinidad and Tobago",
    "argentina":"Argentina","bolivia":"Bolivia","brazil":"Brazil","chile":"Chile",
    "colombia":"Colombia","ecuador":"Ecuador","guyana":"Guyana","paraguay":"Paraguay",
    "peru":"Peru","suriname":"Suriname","uruguay":"Uruguay","venezuela":"Venezuela",
    "albania":"Albania","andorra":"Andorra","austria":"Austria","belarus":"Belarus",
    "belgium":"Belgium","bosnia and herzegovina":"Bosnia and Herzegovina","bulgaria":"Bulgaria",
    "croatia":"Croatia","cyprus":"Cyprus","czech republic":"Czechia","czechia":"Czechia",
    "denmark":"Denmark","estonia":"Estonia","finland":"Finland","france":"France",
    "germany":"Germany","greece":"Greece","hungary":"Hungary","iceland":"Iceland",
    "ireland":"Ireland","italy":"Italy","kosovo":"Kosovo","latvia":"Latvia",
    "liechtenstein":"Liechtenstein","lithuania":"Lithuania","luxembourg":"Luxembourg",
    "malta":"Malta","moldova":"Moldova","monaco":"Monaco","montenegro":"Montenegro",
    "netherlands":"Netherlands","north macedonia":"North Macedonia","norway":"Norway",
    "poland":"Poland","portugal":"Portugal","romania":"Romania","russia":"Russia",
    "russian federation":"Russia","san marino":"San Marino","serbia":"Serbia",
    "slovak republic":"Slovak Republic","slovakia":"Slovak Republic","slovenia":"Slovenia",
    "spain":"Spain","sweden":"Sweden","switzerland":"Switzerland","ukraine":"Ukraine",
    "united kingdom":"United Kingdom","uk":"United Kingdom","great britain":"United Kingdom",
    "afghanistan":"Afghanistan","armenia":"Armenia","azerbaijan":"Azerbaijan",
    "bahrain":"Bahrain","bangladesh":"Bangladesh","bhutan":"Bhutan","brunei":"Brunei",
    "cambodia":"Cambodia","china":"China","prc":"China","georgia":"Georgia",
    "hong kong":"Hong Kong","india":"India","indonesia":"Indonesia","iran":"Iran",
    "iran (islamic republic of)":"Iran","iraq":"Iraq","israel":"Israel","japan":"Japan",
    "jordan":"Jordan","kazakhstan":"Kazakhstan","kuwait":"Kuwait","kyrgyzstan":"Kyrgyzstan",
    "laos":"Laos","lao pdr":"Laos","lebanon":"Lebanon","macau":"Macau",
    "malaysia":"Malaysia","maldives":"Maldives","mongolia":"Mongolia","myanmar":"Myanmar",
    "burma":"Myanmar","nepal":"Nepal","north korea":"North Korea","oman":"Oman",
    "pakistan":"Pakistan","philippines":"Philippines","qatar":"Qatar",
    "saudi arabia":"Saudi Arabia","singapore":"Singapore","republic of singapore":"Singapore",
    "south korea":"South Korea","korea":"South Korea","republic of korea":"South Korea",
    "sri lanka":"Sri Lanka","syria":"Syria","taiwan":"Taiwan","tajikistan":"Tajikistan",
    "thailand":"Thailand","timor-leste":"Timor-Leste","turkey":"Turkey",
    "turkiye":"Turkey","türkiye":"Turkey","turkmenistan":"Turkmenistan",
    "united arab emirates":"United Arab Emirates","uae":"United Arab Emirates",
    "uzbekistan":"Uzbekistan","vietnam":"Vietnam","viet nam":"Vietnam","yemen":"Yemen",
    "algeria":"Algeria","angola":"Angola","benin":"Benin","botswana":"Botswana",
    "burkina faso":"Burkina Faso","cameroon":"Cameroon","cape verde":"Cape Verde",
    "central african republic":"Central African Republic","chad":"Chad",
    "comoros":"Comoros","congo":"Republic of the Congo","republic of the congo":"Republic of the Congo",
    "democratic republic of the congo":"Democratic Republic of the Congo",
    "dem. rep. congo":"Democratic Republic of the Congo","djibouti":"Djibouti",
    "egypt":"Egypt","equatorial guinea":"Equatorial Guinea","eritrea":"Eritrea",
    "eswatini":"Eswatini","ethiopia":"Ethiopia","gabon":"Gabon","gambia":"Gambia",
    "ghana":"Ghana","guinea":"Guinea","guinea-bissau":"Guinea-Bissau",
    "ivory coast":"Côte d'Ivoire","côte d'ivoire":"Côte d'Ivoire",
    "kenya":"Kenya","lesotho":"Lesotho","liberia":"Liberia","libya":"Libya",
    "madagascar":"Madagascar","malawi":"Malawi","mali":"Mali","mauritania":"Mauritania",
    "mauritius":"Mauritius","morocco":"Morocco","mozambique":"Mozambique",
    "namibia":"Namibia","niger":"Niger","nigeria":"Nigeria","rwanda":"Rwanda",
    "sao tome and principe":"Sao Tome and Principe","senegal":"Senegal","seychelles":"Seychelles",
    "sierra leone":"Sierra Leone","somalia":"Somalia","south africa":"South Africa",
    "south sudan":"South Sudan","sudan":"Sudan","tanzania":"Tanzania",
    "united republic of tanzania":"Tanzania","togo":"Togo","tunisia":"Tunisia",
    "uganda":"Uganda","zambia":"Zambia","zimbabwe":"Zimbabwe",
    "australia":"Australia","fiji":"Fiji","kiribati":"Kiribati",
    "marshall islands":"Marshall Islands","micronesia":"Micronesia","nauru":"Nauru",
    "new zealand":"New Zealand","palau":"Palau","papua new guinea":"Papua New Guinea",
    "samoa":"Samoa","solomon islands":"Solomon Islands","tonga":"Tonga",
    "tuvalu":"Tuvalu","vanuatu":"Vanuatu"
  };

  var ZH_TO_FORMAL = {
    "美国":"United States","英国":"United Kingdom","新加坡":"Singapore","中国":"China",
    "日本":"Japan","韩国":"South Korea","俄罗斯":"Russia","法国":"France","德国":"Germany",
    "意大利":"Italy","西班牙":"Spain","葡萄牙":"Portugal","荷兰":"Netherlands",
    "瑞士":"Switzerland","瑞典":"Sweden","挪威":"Norway","丹麦":"Denmark","芬兰":"Finland",
    "加拿大":"Canada","澳大利亚":"Australia","新西兰":"New Zealand","印度":"India",
    "巴西":"Brazil","墨西哥":"Mexico","阿根廷":"Argentina","埃及":"Egypt","南非":"South Africa",
    "尼日利亚":"Nigeria","肯尼亚":"Kenya","泰国":"Thailand","越南":"Vietnam",
    "马来西亚":"Malaysia","印尼":"Indonesia","菲律宾":"Philippines","土耳其":"Turkey",
    "希腊":"Greece","波兰":"Poland","捷克":"Czechia","阿联酋":"United Arab Emirates",
    "香港":"Hong Kong","澳门":"Macau","阿富汗":"Afghanistan","阿尔巴尼亚":"Albania",
    "阿尔及利亚":"Algeria","安道尔":"Andorra","安哥拉":"Angola",
    "安提瓜和巴布达":"Antigua and Barbuda","亚美尼亚":"Armenia","奥地利":"Austria",
    "阿塞拜疆":"Azerbaijan","巴哈马":"Bahamas","巴林":"Bahrain","孟加拉国":"Bangladesh",
    "巴巴多斯":"Barbados","白俄罗斯":"Belarus","比利时":"Belgium","伯利兹":"Belize",
    "贝宁":"Benin","不丹":"Bhutan","玻利维亚":"Bolivia",
    "波黑":"Bosnia and Herzegovina","博茨瓦纳":"Botswana","文莱":"Brunei","保加利亚":"Bulgaria",
    "布基纳法索":"Burkina Faso","布隆迪":"Burundi","柬埔寨":"Cambodia","喀麦隆":"Cameroon",
    "佛得角":"Cape Verde","中非":"Central African Republic","乍得":"Chad","智利":"Chile",
    "哥伦比亚":"Colombia","科摩罗":"Comoros","刚果（布）":"Republic of the Congo",
    "刚果（金）":"Democratic Republic of the Congo","哥斯达黎加":"Costa Rica","克罗地亚":"Croatia",
    "古巴":"Cuba","塞浦路斯":"Cyprus","吉布提":"Djibouti","多米尼克":"Dominica",
    "多米尼加":"Dominican Republic","厄瓜多尔":"Ecuador","萨尔瓦多":"El Salvador",
    "赤道几内亚":"Equatorial Guinea","厄立特里亚":"Eritrea","爱沙尼亚":"Estonia",
    "斯威士兰":"Eswatini","埃塞俄比亚":"Ethiopia","斐济":"Fiji","加蓬":"Gabon",
    "冈比亚":"Gambia","格鲁吉亚":"Georgia","加纳":"Ghana","危地马拉":"Guatemala",
    "几内亚":"Guinea","几内亚比绍":"Guinea-Bissau","圭亚那":"Guyana","海地":"Haiti",
    "洪都拉斯":"Honduras","匈牙利":"Hungary","冰岛":"Iceland","伊朗":"Iran","伊拉克":"Iraq",
    "爱尔兰":"Ireland","以色列":"Israel","牙买加":"Jamaica","约旦":"Jordan",
    "哈萨克斯坦":"Kazakhstan","基里巴斯":"Kiribati","科威特":"Kuwait",
    "吉尔吉斯斯坦":"Kyrgyzstan","老挝":"Laos","拉脱维亚":"Latvia","黎巴嫩":"Lebanon",
    "莱索托":"Lesotho","利比里亚":"Liberia","利比亚":"Libya","列支敦士登":"Liechtenstein",
    "立陶宛":"Lithuania","卢森堡":"Luxembourg","马达加斯加":"Madagascar","马拉维":"Malawi",
    "马尔代夫":"Maldives","马里":"Mali","马耳他":"Malta","毛里塔尼亚":"Mauritania",
    "毛里求斯":"Mauritius","密克罗尼西亚":"Micronesia","摩尔多瓦":"Moldova","摩纳哥":"Monaco",
    "蒙古":"Mongolia","黑山":"Montenegro","摩洛哥":"Morocco","莫桑比克":"Mozambique",
    "缅甸":"Myanmar","纳米比亚":"Namibia","瑙鲁":"Nauru","尼泊尔":"Nepal","尼加拉瓜":"Nicaragua",
    "尼日尔":"Niger","北马其顿":"North Macedonia","阿曼":"Oman","巴基斯坦":"Pakistan",
    "帕劳":"Palau","巴拿马":"Panama","巴布亚新几内亚":"Papua New Guinea","巴拉圭":"Paraguay",
    "秘鲁":"Peru","卡塔尔":"Qatar","罗马尼亚":"Romania","卢旺达":"Rwanda",
    "圣基茨和尼维斯":"St. Kitts and Nevis","圣卢西亚":"St. Lucia",
    "圣文森特":"St. Vincent and the Grenadines","萨摩亚":"Samoa","圣马力诺":"San Marino",
    "圣多美和普林西比":"Sao Tome and Principe","沙特":"Saudi Arabia","塞内加尔":"Senegal",
    "塞尔维亚":"Serbia","塞舌尔":"Seychelles","塞拉利昂":"Sierra Leone",
    "斯洛伐克":"Slovak Republic","斯洛文尼亚":"Slovenia","所罗门":"Solomon Islands",
    "索马里":"Somalia","南苏丹":"South Sudan","斯里兰卡":"Sri Lanka","苏丹":"Sudan",
    "苏里南":"Suriname","叙利亚":"Syria","台湾地区":"Taiwan","台湾":"Taiwan",
    "塔吉克斯坦":"Tajikistan","坦桑尼亚":"Tanzania","东帝汶":"Timor-Leste","多哥":"Togo",
    "汤加":"Tonga","特立尼达和多巴哥":"Trinidad and Tobago","突尼斯":"Tunisia",
    "土库曼斯坦":"Turkmenistan","图瓦卢":"Tuvalu","乌干达":"Uganda","乌克兰":"Ukraine",
    "乌拉圭":"Uruguay","乌兹别克斯坦":"Uzbekistan","瓦努阿图":"Vanuatu","梵蒂冈":"Vatican City",
    "委内瑞拉":"Venezuela","也门":"Yemen","赞比亚":"Zambia","津巴布韦":"Zimbabwe",
    "格陵兰":"Greenland","英格兰":"England","科特迪瓦":"Côte d'Ivoire",
    "朝鲜":"North Korea"
  };

  var ABBR = { "United States":"USA", "United Kingdom":"UK", "United Arab Emirates":"UAE" };

  function formalOf(name){
    if (!name) return '';
    var lower = String(name).toLowerCase().trim();
    return ALIAS_TO_FORMAL[lower] || String(name).trim();
  }
  function zhOf(formal){
    if (!formal) return '';
    for (var zh in ZH_TO_FORMAL){
      if (ZH_TO_FORMAL[zh].toLowerCase() === String(formal).toLowerCase()) return zh;
    }
    return formal;
  }
  function abbrOf(formal){ return ABBR[formal] || formal; }

  global.WJP_I18N = {
    DICT: DICT,
    FACTOR_ZH: FACTOR_ZH,
    FACTOR_EN: FACTOR_EN,
    FACTOR_DESC_ZH: FACTOR_DESC_ZH,
    FACTOR_DESC_EN: FACTOR_DESC_EN,
    ALIAS_TO_FORMAL: ALIAS_TO_FORMAL,
    ZH_TO_FORMAL: ZH_TO_FORMAL,
    ABBR: ABBR,
    formalOf: formalOf,
    zhOf: zhOf,
    abbrOf: abbrOf
  };


  // ============================================================
  // ★ 自闭环翻译引擎
  // ============================================================
  var current = 'zh';
  var STORE_KEY = 'wjp-lang';

  function applyTranslate(lang) {
    var data = DICT[lang === 'en' ? 'en' : 'zh'];
    document.querySelectorAll('[data-wjp-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-wjp-i18n');
      if (data[key]) el.textContent = data[key];
    });
    document.querySelectorAll('[data-wjp-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-wjp-i18n-ph');
      if (data[key]) el.setAttribute('placeholder', data[key]);
    });
    document.querySelectorAll('[data-wjp-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-wjp-i18n-aria');
      if (data[key]) el.setAttribute('aria-label', data[key]);
    });
  }

  function setLang(lang) {
    current = (lang === 'en') ? 'en' : 'zh';
    localStorage.setItem(STORE_KEY, current);
    document.documentElement.lang = current === 'en' ? 'en' : 'zh-CN';
    document.documentElement.setAttribute('data-lang', current);
    
    // 点亮按钮
    var z = document.querySelector('#langBtn .zh');
    var n = document.querySelector('#langBtn .en');
    if (z && n) {
      z.classList.toggle('active', current !== 'en');
      n.classList.toggle('active', current === 'en');
    }
    
    applyTranslate(current);
    // 触发地图自身的重绘事件
    document.dispatchEvent(new CustomEvent('wjp:langchange', { detail: { lang: current } }));
  }

  function init() {
    var btn = document.getElementById('langBtn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(current === 'zh' ? 'en' : 'zh');
      });
    }
    
    var saved = localStorage.getItem(STORE_KEY) || 'zh';
    setLang(saved);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  global.WJP_I18N = {
    DICT: DICT,
    FACTOR_ZH: FACTOR_ZH,
    FACTOR_EN: FACTOR_EN,
    FACTOR_DESC_ZH: FACTOR_DESC_ZH,
    FACTOR_DESC_EN: FACTOR_DESC_EN,
    ALIAS_TO_FORMAL: ALIAS_TO_FORMAL,
    ZH_TO_FORMAL: ZH_TO_FORMAL,
    ABBR: ABBR,
    formalOf: formalOf,
    zhOf: zhOf,
    abbrOf: abbrOf,
    setLang: setLang,
    getLang: function() { return current; }
  };
})(window);