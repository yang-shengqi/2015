(function() {
  const dict = {
    zh: {
      brandName: '核心工具箱',
      pageTitle: "经济数据趋势 + 真实性检验", skipLink: "跳到主内容",
      navHome: "首页", navThinking: "思维类", navThinking1: "乱世 · 生存与财富自由的实战宝典", navThinking2: "传承 · 家族后辈们的启蒙家书",
      navQuant: "量化类", navQuant1: "全球 · 市场量化工具工作台", navQuant2: "全球 · 全天候永久投资组合", navQuant3: "美国 · Charles Schwab 仪表盘",
      navDiagnose: "诊断类", navDiagnose1: "WJP · 法治指数地图", navDiagnose2: "经济数据 · 趋势与真实性检验", navDiagnose3: "思维 · 人类思维盲区诊断工具", navDiagnose4: "诊断 · 文明等级在线评分器",
      navUtility: "实用类", navUtility1: "色彩 · 色彩分析工具", navUtility2: "加密 · 网页军功级加密工具",
      timeAll: "全部", time1: "近1年", time3: "近3年", time5: "近5年",
      heroTitle1: "经济数据", heroTitle2: "趋势 + 真实性检验",
      heroLede1: "先找矛盾，再谈景气。", heroLede2: "实物量（发电/货运/水泥）做不了假；当官方 GDP 与实物锚、税收、", heroLede3: "价格长期背离时，工具会亮灯", heroLede4: "。",
      chip1: "实物锚背离", chip2: "克强指数对照", chip3: "税收-GDP 弹性", chip4: "平减指数一致性", chip5: "投资-消费背离", chip6: "货币-实体一致性",
      s1Title: "导入数据", s1Hint: "拖拽 xlsx / csv / txt，或粘贴表格",
      dropTitle: "把 Excel / CSV / TXT 文件拖到这里", dropOr: "或者", dropBtn: "选择文件", dropHint: "支持 .xlsx / .xls / .csv / .txt，表头含关键词即可识别",
      pasteOr: "或直接粘贴", pasteLabel: "粘贴表格数据",
      pastePlaceholder: "从 Excel 复制整张表粘贴到这里。表头关键词（有多少填多少）：\n\n时间  PMI  GDP同比  名义GDP同比  PPI  CPI  PPI-CPI剪刀差  M1-M2剪刀差\n发电量同比  铁路货运量同比  水泥产量同比  工业用电量同比\n税收收入同比  M2同比  社零同比  固投同比  出口同比",
      btnRun: "开始分析", btnDemo: "载入格式样板", btnClear: "清空", statusWait: "等待数据。",
      s2Title: "数据表格", s2Hint: "按年分页", colTime: "时间", noData: "暂无数据",
      s3Title: "数据总览", s3Hint: "风险区 · 分项 · 四维信号",
      s4Title: "数据趋势", s4Hint: "风险走势 · 主要 · 其它 · 实物锚 · 财政 · 悬停查看数值",
      chartMain: "主要指标", chartOther: "其它指标", chartAnchor: "实物锚（最难修饰的硬指标）", chartFiscal: "财政收支（累计同比）",
      s5Title: "矛盾指数", s5Hint: "分数越高，数据内部矛盾越多",
      s6Title: "协同性检测", s6Hint: "多项指标是否长期、同向、协同背离",
      s7Title: "综合分析", s7Hint: "参考信号 · 权重 · 传导 · 结论",
      emptyWait: "导入数据后自动生成。", footTitle: "经济数据趋势 + 真实性检验", footSub: "数据保存在浏览器本地（localStorage），不上传任何服务器。",
      
      dataInsufficient: "数据不足", needTwoPeriods: "至少需要 2 期数据", vsPrev: "较上期", vsYoY: "去年同期",
      fiscalNoData: "财政数据不足 2 期。", groupNoData: "该组指标暂无足够数据。",
      fiscalRevName: "财政收入同比", fiscalExpName: "财政支出同比", fiscalRevShort: "财政收入", fiscalExpShort: "财政支出",
      
      k_pmi: "PMI", k_gdp: "GDP同比", k_ppi: "PPI同比", k_cpi: "CPI同比",
      k_m1m2: "M1-M2剪刀差", k_tax: "税收累计同比", k_retail: "社零同比", k_fai: "固投同比", k_m2: "M2同比", k_export: "出口同比",
      k_fiscal_rev: "财政收入同比", k_fiscal_exp: "财政支出同比", k_power: "发电量同比", k_freight: "铁路货运量同比", k_cement: "水泥产量同比",
      k_nom: "名义GDP同比", k_ppi_cpi: "PPI-CPI", k_elec: "工业用电量同比", k_loan: "中长期贷款同比", unit_pp: "pp",
      
      tagOk: "自洽", tagWarn: "关注", tagFail: "异常", tagSkip: "跳过", coordTagOk: "正常", coordTagWarn: "关注", coordTagFail: "异常", coordTagSkip: "跳过",
      
      conflictHigh: "检测到多重矛盾 · 数据可信度低", conflictMid: "存在部分矛盾 · 需谨慎对待", conflictLow: "各项交叉检验基本自洽", conflictIdx: "矛盾指数",
      conflictDesc1: "基于 ", conflictDesc2: " 项交叉检验（木桶合成，短板主导，缺失项按中性计入）。", conflictDesc3: "矛盾指数 ", conflictDesc4: "/100。分数越高，官方数据内部或与实物量的矛盾越多。",
      conflictTrendTitle: "矛盾指数走势", conflictTrendDesc: "GDP 与实物量的背离强度 + 税收弹性偏离。",
      anchorTrendTitle: "实物锚背离走势", anchorTrendDesc: "纵轴 = 官方 GDP 增速 − 实物量增速。",
      anchorPos: "正值 = GDP 高于实物", anchorPosSub: "（虚报嫌疑）", anchorNeg: "负值 = GDP 低于实物", riskLow: "低风险", riskMid: "中风险", riskHigh: "高风险",
      
      checkAnchorSkip: "实物量（发电/货运/水泥）不足 6 期，无法判断。", checkAnchorFailHigh: "GDP 持续高于实物量（近 6 期均差 +{rg}，最长连续 {mx} 期）。官方增速高于发电/货运/水泥——产值虚报的典型形态。", checkAnchorWarnHigh: "GDP 略高于实物量（近 6 期均差 +{rg}），需持续观察。", checkAnchorFailLow: "GDP 持续低于实物量（近 6 期均差 {rg}，最长连续 {mx} 期）。官方增速低于实物——可能口径保守，或实物量高估，不是虚报。", checkAnchorWarnLow: "GDP 略低于实物量（近 6 期均差 {rg}）。", checkAnchorOk: "GDP 与实物量基本同步（近 6 期均差 {rg}）。", checkAnchorEv: "全期均差 {avg} ｜ 近6期 {rg} ｜ 最长连续 {mx} 期",
      checkKqSkip: "构成克强指数的指标不足（需发电量、货运量中至少两项）。", checkKqFailHigh: "GDP 与克强指数背离 {g} 个百分点。GDP 偏高。", checkKqFailLow: "GDP 与克强指数背离 {g} 个百分点。GDP 偏低。", checkKqWarn: "GDP 与克强指数差 {g} 个百分点。", checkKqOk: "GDP 与克强指数基本吻合（差 {g}）。", checkKqEv: "发电量/货运加权 ｜ 近6期差 {g}",
      checkTaxSkip: "税收或名义 GDP 数据不足（需至少 6 期）。", checkTaxFailLow: "税收弹性 {e}，严重偏离常态 [0.8, 1.2]。税收增速远低于产出——产出可能被高估。", checkTaxFailHigh: "税收弹性 {e}，严重偏离常态 [0.8, 1.2]。税收增速远超产出。", checkTaxWarn: "税收弹性 {e}，偏离常态，建议结合减税政策判断。", checkTaxOk: "税收弹性 {e}，处于正常区间。", checkTaxEv: "近6期中位弹性 = {e} ｜ 常态 [0.8, 1.2]\n逐期：{detail}",
      checkDefSkip: "需要名义GDP/实际GDP/PPI/CPI 四项。", checkDefFail: "隐含平减与 PPI/CPI 加权偏离 {g} 个百分点。", checkDefWarn: "隐含平减与价格指标偏离 {g}。", checkDefOk: "平减指数与价格指标基本一致（差 {g}）。", checkDefEv: "隐含平减 = 名义−实际 ｜ 参考 = 0.7×PPI+0.3×CPI ｜ 近6期差 {g}",
      checkIcSkip: "固投或社零数据不足。", checkIcWarnHigh: "固投持续大幅高于社零 {g} 个百分点。投资是地方虚报高发区。", checkIcWarnLow: "社零持续大幅高于固投 {g} 个百分点。", checkIcOk: "投资与消费差距 {g} 个百分点，属常态。", checkIcEv: "近6期平均 (固投−社零) = {g} 个百分点",
      checkMmSkip: "M2 或名义 GDP 数据不足。", checkMmWarn: "M2 与名义 GDP 增速差 {g} 个百分点，货币与实体脱节。", checkMmOk: "M2 与名义 GDP 增速差 {g}，大体匹配。", checkMmEv: "近6期平均 (M2−名义GDP) = {g} 个百分点",
      
      coordTitle: "协同性异常度", coordSummary: "协同性异常度 · 木桶合成 · 基于 ", coordSummary2: " / 4 项可用检测", coordVeto: "⚠ 因持续性不足（背离未扩大），总分被限制在 59 以内。", coordNote: "协同性异常 ≠ 已证实造假。但多项官方数据长期同向背离，是苏联式数据失真的典型指纹。",
      coordHeader: "📋 协同性结论", coordSysHigh: "疑似系统性背离", coordSysMid: "存在协同迹象", coordSysLow: "未发现系统性协同",
      coordDescHigh: "多个独立检验同向、持续、协同偏离，符合系统性数据失真的特征。", coordDescMid: "部分检验出现同向背离，但持续性或广度不足，需继续观察。", coordDescLow: "各项检验的偏离零散、方向不一，未见系统性协同迹象。",
      coordShortboard: "主要短板 ", coordPersist: "② 背离持续性：", coordSync: "多指标同步背离", coordPersistName: "背离持续性", coordFiscal: "财政-产出协同", coordMoney: "货币-产出协同",
      coordSyncSkip: "有效时点不足 6 个，无法判断同步背离。", coordSyncFail: "协同背离时点占比 {r}%——多项指标长期同向偏离，符合系统性失真的广度特征。", coordSyncWarn: "协同背离时点占比 {r}%，存在一定同步迹象。", coordSyncOk: "协同背离时点占比 {r}%，各项背离零散、未成系统。", coordSyncEv: "有效时点 {v} 个，其中 {h} 个命中 ≥3 项同向背离", coordSyncEvEx: "\n例：{ex}",
      coordPersistSkip: "有效时点不足 20 个，无法判断持续性。", coordPersistMsg: "近12期均差 {r} ｜ 前12期均差 {p} ｜ 趋势：{t}。",
      coordPersistExpand: "背离在扩大——系统性失真的时间特征。", coordPersistHigh: "⚠ 背离长期维持高位、不见收敛。这不是\"稳定\"，是虚报能力已经固化——比偶发虚报更难纠正。", coordPersistDown: "⚠ 背离仍处高位，但近12期略有收窄（{p} → {r}）。方向在改善，幅度还不够解除警报。", coordPersistMid: "⚠ 背离长期稳定存在。虽未扩大，但多年不动本身就是异常。", coordPersistNarrow: "⚠ 背离有所收窄，但仍处高位。改善幅度不足以判定风险解除。", coordPersistNarrowOk: "背离在收窄，未见持续恶化。", coordPersistNormal: "未见持续背离。", coordPersistEv: "近12期均差 {r} ｜ 前12期均差 {p} ｜ 最长连续背离 {m} 期",
      coordFiscalSkip: "税收或名义 GDP 数据不足 6 期。", coordFiscalFail: "近12期税收弹性中位数 {m}，严重偏离常态——{dir}，产出未获税收同步支撑。", coordFiscalWarn: "近12期税收弹性中位数 {m}，中度偏离常态 [0.7, 1.4]。", coordFiscalOk: "近12期税收弹性中位数 {m}，处于正常区间。", coordFiscalEv: "近12期弹性中位数 {m} ｜ 正常区间 [0.7, 1.4]", coordFiscalDirLow: "税收增速低于产出", coordFiscalDirHigh: "税收增速高于产出",
      coordMoneySkip: "M2 或名义 GDP 数据不足 6 期。", coordMoneyFail: "近12期平均 (M2 − 名义GDP) = {g} pp，长期单方向偏离——货币与实体脱节明显。", coordMoneyWarn: "近12期平均 (M2 − 名义GDP) = {g} pp，温和偏离。", coordMoneyOk: "近12期平均 (M2 − 名义GDP) = {g} pp，货币与实体大体匹配。", coordMoneyEv: "近12期平均 (M2 − 名义GDP) = {g} pp",
      coordConclTitle: "协同性异常度 {s}/100 —— {t}。",
      
      analysisWarnHigh: "<b>数据存在多重矛盾。</b>下方景气诊断结果仅供参考，不应作为真实经济判断的依据。", analysisWarnMid: "数据存在部分矛盾。下方结论可作参考，但需结合矛盾检测一并判断。",
      dimTitle: "四维参考信号", dimScore: "综合 ", dimNote: "模型合成评分，非真实经济数据", dimPmi: "景气度", dimGdp: "增长质量", dimPpiCpi: "利润分配", dimM1M2: "钱流预期", dimAbs: "绝对 ", dimWeight: "权重 ", dimDataMissing: "数据缺失",
      profitTitle: "💰 利润分配", profitDown: "下游", profitUp: "上游", profitDescHigh: "上游利润丰厚，下游承压，结构性矛盾突出。", profitDescMid: "上游略占优势，利润分配向上游倾斜。", profitDescNeg: "剪刀差明显为负，成本压力缓解，但需警惕通缩。", profitDescNegMid: "下游利润改善，成本压力缓解。", profitDescBal: "上下游利润均衡。",
      inflationTitle: "🌡️ 通胀 / 通缩", inflationArrow: "← 通缩 · 通胀 →", inflationPpi: "上游 PPI", inflationCpi: "下游 CPI", inflationNote1: "M1-M2 为 ", inflationNote2: "；方向性判断，不构成点预测。",
      chainTitle: "🔗 传导链条", chainPass: "传导链条基本通畅。", chainPart: "传导链条部分断裂。", chainFail: "传导链条严重断裂。", chainMean: "📋 环节含义", chainStep: " 环节", chainWish: "意愿", chainSpace: "空间", chainResult: "结果", chainLand: "落地", chainWishDesc: "M1-M2 剪刀差：反映企业愿不愿意动用资金", chainSpaceDesc: "PPI-CPI 剪刀差：反映成本端有无宽松空间", chainResultDesc: "PMI × 利润分配：反映增产是否增收", chainLandDesc: "M1-M2 边际变化：反映预期是否落到实体",
      weightTitle: "⚖️ 权重来源", weightDev: "偏离 ", weightPrior: "先验", weightNear: "权重接近等权（偏离 ", weightDevNote: "权重偏离等权 ", weightOk: "权重接近等权（偏离 {p}%）。", weightDevS: "权重偏离等权 {p}%。",
      conclTitle: "📋 自动结论", conclDataLow: "<b>数据可信度低。</b>矛盾指数 ", conclDataLow2: "/100，多项交叉检验发现系统性偏离。下面的景气判断请勿采信。", conclDataMid: "<b>数据存在部分矛盾。</b>矛盾指数 ", conclDataMid2: "/100。部分检验未通过，景气判断需谨慎。", conclDataHigh: "<b>数据交叉检验基本自洽。</b>矛盾指数 ", conclDataHigh2: "/100。",
      conclLatest: "最新一期（", conclGdp: "）GDP 同比 <b>", conclPmiAbove: "（荣枯线上）", conclPmiBelow: "（荣枯线下）", conclPpiCpi: "PPI-CPI 剪刀差 <b>", conclPpiCpiHigh: "：上游对下游挤压明显。", conclPpiCpiLow: "：下游成本压力缓解，但需防通缩。", conclPpiCpiBal: "：上下游相对均衡。", conclM1M2: "M1-M2 剪刀差 <b>", conclM1M2High: "：企业资金活化意愿较强。", conclM1M2Mid: "：资金活化偏弱，但未恶化。", conclM1M2Low: "：企业定期化倾向明显。", conclObs1: "以上结论基于 <strong>", conclObs2: "</strong> 期观测。矛盾检测看\"数据能不能信\"，四维评分看\"如果可信，处于什么状态\"——两者不可混用。",
      
      tip_pmi: "采购经理指数，对企业采购经理的月度调查。50 是荣枯线。", tip_gdp: "国内生产总值比去年同期增长了多少。", tip_ppi: "工业生产者出厂价格指数。", tip_cpi: "居民消费价格指数。", tip_m1m2: "狭义货币与广义货币增速之差。", tip_tax: "税收收入累计同比。", tip_retail: "社会消费品零售总额同比增速。", tip_m2: "广义货币供应量同比增速。", tip_power: "全国发电量同比，难造假。", tip_freight: "全国铁路货运量同比，难修饰。", tip_cement: "全国水泥产量同比。", tip_conflict_trend: "各项矛盾检验结果的 0-100 分数。", tip_anchor_trend: "官方 GDP 增速减去实物量增速。", tip_anchor: "对照官方 GDP 增速是否可信。", tip_kq: "用实物指标合成增速，与官方 GDP 对照。", tip_tax_elast: "税收增速 ÷ 名义 GDP 增速。", tip_def: "隐含平减指数一致性。", tip_ic: "固投增速与社零增速差。", tip_mm: "M2 增速与名义 GDP 增速差。",
      tip_dim_pmi: "来自 PMI，最直接的景气信号。", tip_dim_gdp: "来自 GDP 同比。", tip_dim_ppi_cpi: "来自 PPI-CPI 剪刀差。", tip_dim_m1m2: "来自 M1-M2 剪刀差。",
      overallCoverage: "覆盖范围", overallSince: " 起，共 ", overallPeriods: " 期。", overallReflect: "反映长期水平——早期的高低分都会摊进来。",
      overallRoll: "滚动窗口", overallLast: "只看最近 ", overallLastP: " 期（约 2 年）。", overallDiffHigh: "较全历史高 {d} 分，近期在恶化。", overallDiffLow: "较全历史低 {d} 分，近期在缓和。", overallDiffSame: "与全历史基本持平（差 {d} 分）。",
      overallConflict: "矛盾指数", overallCoord: "协同性检测", overallPrev: "上期 ", overallPrev2: " 分 · ", overallYear: "年", overallMonth: "月",
      overallDescRs1: " 项交叉检验中有 ", overallDescRs2: " 项异常、", overallDescRs3: " 项关注。", overallDescRs4: " 异常项：", overallDescCs1: " 项检测中 ", overallDescCs2: " 项异常。", overallDescCs3: " 多指标同步背离占比 ", overallDescCs4: "%（", overallDescCs5: " 个时点命中 ≥3 项同向）。", overallDescCs6: " 背离持续性：", overallDescCs7: " 因背离未扩大，总分已封顶。",
      overallFourD: "⚠ 四维评分反映的是\"经济景气状态\"，不是数据真伪——与上方风险区无关，请勿混用。", overallPmiUp: "荣枯线附近偏上", overallPmiDown: "荣枯线附近偏下", overallGdpHigh: "增速偏强", overallGdpMid: "增速中性", overallGdpLow: "增速偏弱", overallImbalance: "上下游失衡", overallBalanced: "相对均衡", overallCashHigh: "资金活化较强", overallCashLow: "资金活化不足",
      riskTrendTitle: "真实性风险走势", riskTrendTip: "两条线：红线 = 滚动 24 期；蓝线 = 全历史累计。", riskTrendCur: "当期风险", riskTrendHist: "全历史风险", riskTrendCurLabel: "当期风险（滚动 24 期）", riskTrendHistLabel: "全历史累计",
      statusLoaded: "已加载本地保存的", statusBuiltin: "已加载内置数据库", statusPeriods: "期数据。", statusWaitParsed: "等待解析。"
    },
    en: {
      brandName: 'Core Toolbox',
      pageTitle: "Economic Data Diagnostics", skipLink: "Skip to main content",
      navHome: "Home", navThinking: "Thinking", navThinking1: "Survival & Wealth Bible", navThinking2: "Legacy Letters",
      navQuant: "Quant", navQuant1: "Global Market Dashboard", navQuant2: "All-Weather Portfolio", navQuant3: "Charles Schwab Dashboard",
      navDiagnose: "Diagnostics", navDiagnose1: "WJP Rule of Law Map", navDiagnose2: "Economic Data Diagnostics", navDiagnose3: "Cognitive Blind Spots", navDiagnose4: "Civilization Scorer",
      navUtility: "Utilities", navUtility1: "Color Analysis", navUtility2: "HTML Encrypter",
      timeAll: "All", time1: "Last 1Y", time3: "Last 3Y", time5: "Last 5Y", heroTitle1: "Economic Data", heroTitle2: "Trends & Authenticity Check",
      heroLede1: "Find contradictions first.", heroLede2: "Physical metrics (power/freight/cement) can't lie; when official GDP deviates from physical anchors and tax, ", heroLede3: "the tool will light up", heroLede4: ".",
      chip1: "Anchor Deviation", chip2: "Keqiang Index", chip3: "Tax-GDP Elasticity", chip4: "Deflator Consistency", chip5: "Inv-Cons Deviation", chip6: "Money-Entity Consistency",
      s1Title: "Import Data", s1Hint: "Drag xlsx / csv / txt, or paste", dropTitle: "Drag Excel / CSV / TXT file here", dropOr: "OR", dropBtn: "Select File", dropHint: "Supports .xlsx / .xls / .csv / .txt with header keywords",
      pasteOr: "Or paste directly", pasteLabel: "Paste table data", pastePlaceholder: "Copy the whole table from Excel and paste here.",
      btnRun: "Analyze", btnDemo: "Load Demo", btnClear: "Clear", statusWait: "Waiting for data.",
      s2Title: "Data Table", s2Hint: "Paginated by year", colTime: "Time", noData: "No data", s3Title: "Overview", s3Hint: "Risk Zone · Breakdown · 4D Signals",
      s4Title: "Trends", s4Hint: "Risk · Main · Other · Anchor · Fiscal", chartMain: "Main Indicators", chartOther: "Other Indicators", chartAnchor: "Physical Anchors", chartFiscal: "Fiscal Revenue/Exp (YoY)",
      s5Title: "Conflict Index", s5Hint: "Higher score means more contradictions", s6Title: "Coordination Check", s6Hint: "Long-term co-deviation check", s7Title: "Comprehensive Analysis", s7Hint: "Signals · Weights · Transmission · Conclusion",
      emptyWait: "Automatically generated after data import.", footTitle: "Economic Data Diagnostics", footSub: "Data saved locally in your browser (localStorage).",
      dataInsufficient: "Insufficient data", needTwoPeriods: "At least 2 periods required", vsPrev: "vs Prev", vsYoY: "vs YoY", fiscalNoData: "Fiscal data < 2 periods.", groupNoData: "Not enough data for this group.",
      fiscalRevName: "Fiscal Rev. YoY", fiscalExpName: "Fiscal Exp. YoY", fiscalRevShort: "Fiscal Rev.", fiscalExpShort: "Fiscal Exp.",
      k_pmi: "PMI", k_gdp: "GDP YoY", k_ppi: "PPI YoY", k_cpi: "CPI YoY", k_m1m2: "M1-M2 Scissors", k_tax: "Tax Rev. YoY", k_retail: "Retail Sales YoY", k_fai: "FAI YoY", k_m2: "M2 YoY", k_export: "Export YoY",
      k_fiscal_rev: "Fiscal Rev. YoY", k_fiscal_exp: "Fiscal Exp. YoY", k_power: "Power Gen. YoY", k_freight: "Rail Freight YoY", k_cement: "Cement Output YoY", k_nom: "Nominal GDP YoY", k_ppi_cpi: "PPI-CPI", k_elec: "Ind. Electricity YoY", k_loan: "MLT Loan YoY", unit_pp: "pp",
      tagOk: "OK", tagWarn: "Warn", tagFail: "Fail", tagSkip: "Skip", coordTagOk: "Normal", coordTagWarn: "Warn", coordTagFail: "Fail", coordTagSkip: "Skip",
      conflictHigh: "Multiple Contradictions · Low Credibility", conflictMid: "Some Contradictions · Caution Advised", conflictLow: "Cross-checks Basically Consistent", conflictIdx: "Conflict Index",
      conflictDesc1: "Based on ", conflictDesc2: " cross-checks (barrel composite, bottleneck-driven, missing items neutral).", conflictDesc3: "Conflict Index ", conflictDesc4: "/100. Higher score means more internal contradictions.",
      conflictTrendTitle: "Conflict Index Trend", conflictTrendDesc: "GDP vs Physical Deviation + Tax Elasticity Deviation.", anchorTrendTitle: "Anchor Deviation Trend", anchorTrendDesc: "Y-axis = Official GDP - Physical Metrics.",
      anchorPos: "Positive = GDP > Physical", anchorPosSub: "(Fake suspicion)", anchorNeg: "Negative = GDP < Physical", riskLow: "Low Risk", riskMid: "Mid Risk", riskHigh: "High Risk",
      checkAnchorSkip: "Physical metrics < 6 periods.", checkAnchorFailHigh: "GDP consistently > physical by +{rg} (max {mx} periods). Typical overstating.", checkAnchorWarnHigh: "GDP slightly > physical (+{rg}). Keep watching.", checkAnchorFailLow: "GDP consistently < physical by {rg} (max {mx} periods).", checkAnchorWarnLow: "GDP slightly < physical ({rg}).", checkAnchorOk: "GDP and physical basically sync ({rg}).", checkAnchorEv: "All-time avg {avg} | Last 6 {rg} | Max streak {mx}",
      checkKqSkip: "Insufficient data for Keqiang.", checkKqFailHigh: "GDP vs Keqiang deviates by {g} pp. GDP high.", checkKqFailLow: "GDP vs Keqiang deviates by {g} pp. GDP low.", checkKqWarn: "GDP vs Keqiang gap {g} pp.", checkKqOk: "GDP matches Keqiang ({g}).", checkKqEv: "Power/Freight weighted | Last 6 {g}",
      checkTaxSkip: "Tax or Nominal GDP < 6 periods.", checkTaxFailLow: "Tax elasticity {e}, severely deviated. Output may be overestimated.", checkTaxFailHigh: "Tax elasticity {e}, severely deviated.", checkTaxWarn: "Tax elasticity {e}, deviated.", checkTaxOk: "Tax elasticity {e}, normal.", checkTaxEv: "6-period median {e} | Normal [0.8, 1.2]\nDetails: {detail}",
      checkDefSkip: "Needs Nominal/Real GDP/PPI/CPI.", checkDefFail: "Implied deflator vs PPI/CPI deviates by {g} pp.", checkDefWarn: "Implied deflator deviation {g}.", checkDefOk: "Deflator matches prices ({g}).", checkDefEv: "Implied = Nom - Real | Ref = 0.7*PPI+0.3*CPI | Last 6 {g}",
      checkIcSkip: "FAI or Retail insufficient.", checkIcWarnHigh: "FAI consistently > Retail by {g} pp.", checkIcWarnLow: "Retail > FAI by {g} pp.", checkIcOk: "FAI vs Retail gap {g} pp, normal.", checkIcEv: "6-period avg (FAI-Retail) = {g} pp",
      checkMmSkip: "M2 or Nominal GDP insufficient.", checkMmWarn: "M2 vs Nominal GDP gap {g} pp, decoupled.", checkMmOk: "M2 vs Nominal GDP gap {g}, matched.", checkMmEv: "6-period avg (M2-Nominal GDP) = {g} pp",
      coordTitle: "Coordination Anomaly", coordSummary: "Coordination Anomaly · Barrel Composite · Based on ", coordSummary2: " / 4 checks", coordVeto: "⚠ Score capped at 59 due to lack of persistence.", coordNote: "Coordinated anomaly ≠ proven fake. But long-term co-deviation is a typical fingerprint.",
      coordHeader: "📋 Coordination Conclusion", coordSysHigh: "Suspected Systemic Deviation", coordSysMid: "Coordinated Signs", coordSysLow: "No Systemic Coordination", coordDescHigh: "Multiple independent checks deviate persistently.", coordDescMid: "Some checks show co-deviation, but insufficient.", coordDescLow: "Deviations are scattered.", coordShortboard: "Shortboard ", coordPersist: "② Persistence: ", coordSync: "Multi-indicator Sync Dev", coordPersistName: "Deviation Persistence", coordFiscal: "Fiscal-Output Sync", coordMoney: "Money-Output Sync",
      coordSyncSkip: "Valid points < 6.", coordSyncFail: "Sync deviation ratio {r}% — systemic distortion.", coordSyncWarn: "Sync deviation ratio {r}%, some signs.", coordSyncOk: "Sync deviation ratio {r}%, scattered.", coordSyncEv: "Valid {v} points, {h} hits >=3 dimensions", coordSyncEvEx: "\nEx: {ex}",
      coordPersistSkip: "Valid points < 20.", coordPersistMsg: "Last 12 avg {r} | Prev 12 avg {p} | Trend: {t}.", coordPersistExpand: "Deviation expanding.", coordPersistHigh: "⚠ Persistent high deviation. Solidified faking.", coordPersistDown: "⚠ High but slightly narrowing ({p} → {r}).", coordPersistMid: "⚠ Stable mid deviation.", coordPersistNarrow: "⚠ Narrowing but still high.", coordPersistNarrowOk: "Narrowing, no worsening.", coordPersistNormal: "No persistent deviation.", coordPersistEv: "Last 12 avg {r} | Prev 12 avg {p} | Max streak {m}",
      coordFiscalSkip: "Tax or Nominal GDP < 6 periods.", coordFiscalFail: "Median tax elasticity {m}, severely deviated.", coordFiscalWarn: "Median tax elasticity {m}, moderately deviated.", coordFiscalOk: "Median tax elasticity {m}, normal.", coordFiscalEv: "Median {m} | Normal [0.7, 1.4]", coordFiscalDirLow: "Tax < Output", coordFiscalDirHigh: "Tax > Output",
      coordMoneySkip: "M2 or Nominal GDP < 6 periods.", coordMoneyFail: "Avg (M2 - Nominal GDP) = {g} pp, decoupled.", coordMoneyWarn: "Avg (M2 - Nominal GDP) = {g} pp, mildly deviated.", coordMoneyOk: "Avg (M2 - Nominal GDP) = {g} pp, matched.", coordMoneyEv: "Avg (M2 - Nominal GDP) = {g} pp",
      coordConclTitle: "Coordination Anomaly {s}/100 — {t}.",
      analysisWarnHigh: "<b>Multiple contradictions.</b> Diagnosis for reference only.", analysisWarnMid: "Partial contradictions exist.", dimTitle: "4D Signals", dimScore: "Overall ", dimNote: "Model score, not real data", dimPmi: "Prosperity", dimGdp: "Growth Quality", dimPpiCpi: "Profit Dist.", dimM1M2: "Cash Flow Exp.", dimAbs: "Abs ", dimWeight: "W ", dimDataMissing: "Missing",
      profitTitle: "💰 Profit Dist.", profitDown: "Down", profitUp: "Up", profitDescHigh: "Upstream fat, downstream squeezed.", profitDescMid: "Upstream slightly dominant.", profitDescNeg: "Negative scissors, cost eased, watch deflation.", profitDescNegMid: "Downstream improving.", profitDescBal: "Balanced.",
      inflationTitle: "🌡️ Inflation / Deflation", inflationArrow: "← Deflation · Inflation →", inflationPpi: "Upstream PPI", inflationCpi: "Downstream CPI", inflationNote1: "M1-M2 is ", inflationNote2: "; directional only.",
      chainTitle: "🔗 Chain", chainPass: "Chain clear.", chainPart: "Chain partially broken.", chainFail: "Chain severely broken.", chainMean: "📋 Meanings", chainStep: " Steps", chainWish: "Wish", chainSpace: "Space", chainResult: "Result", chainLand: "Land", chainWishDesc: "M1-M2: Willingness", chainSpaceDesc: "PPI-CPI: Room for easing", chainResultDesc: "PMI × Profit: Yield income?", chainLandDesc: "M1-M2 margin: Materialize?",
      weightTitle: "⚖️ Weights", weightDev: "Dev ", weightPrior: "Prior", weightNear: "Near equal (dev ", weightDevNote: "Weight deviated by ", weightOk: "Near equal weight (dev {p}%).", weightDevS: "Weight deviated by {p}%.",
      conclTitle: "📋 Conclusion", conclDataLow: "<b>Low credibility.</b> Index ", conclDataLow2: "/100. Systemic deviations found.", conclDataMid: "<b>Partial contradictions.</b> Index ", conclDataMid2: "/100. Caution.", conclDataHigh: "<b>Basically consistent.</b> Index ", conclDataHigh2: "/100.",
      conclLatest: "Latest (", conclGdp: ") GDP YoY <b>", conclPmiAbove: " (Above 50)", conclPmiBelow: " (Below 50)", conclPpiCpi: "PPI-CPI <b>", conclPpiCpiHigh: ": Upstream squeezes.", conclPpiCpiLow: ": Cost eased, watch deflation.", conclPpiCpiBal: ": Balanced.", conclM1M2: "M1-M2 <b>", conclM1M2High: ": Strong fund activation.", conclM1M2Mid: ": Weak activation.", conclM1M2Low: ": Time-deposit preference.", conclObs1: "Based on <strong>", conclObs2: "</strong> observations. Do not mix checks.",
      tip_pmi: "PMI. 50 is line.", tip_gdp: "GDP YoY.", tip_ppi: "PPI.", tip_cpi: "CPI.", tip_m1m2: "M1-M2.", tip_tax: "Tax YoY.", tip_retail: "Retail YoY.", tip_m2: "M2.", tip_power: "Power YoY.", tip_freight: "Rail freight YoY.", tip_cement: "Cement YoY.", tip_conflict_trend: "Composite score.", tip_anchor_trend: "GDP - physical.", tip_anchor: "GDP vs physical.", tip_kq: "Keqiang vs GDP.", tip_tax_elast: "Tax / Nominal GDP.", tip_def: "Deflator consistency.", tip_ic: "FAI vs Retail.", tip_mm: "M2 vs Nominal GDP.",
      tip_dim_pmi: "From PMI.", tip_dim_gdp: "From GDP.", tip_dim_ppi_cpi: "From PPI-CPI.", tip_dim_m1m2: "From M1-M2.",
      overallCoverage: "Coverage", overallSince: " since, total ", overallPeriods: " periods.", overallReflect: "Reflects long-term level.",
      overallRoll: "Rolling", overallLast: "Last ", overallLastP: " periods (~2 yrs).", overallDiffHigh: "Higher than all-time by {d}, worsening.", overallDiffLow: "Lower than all-time by {d}, easing.", overallDiffSame: "Flat vs all-time (diff {d}).",
      overallConflict: "Conflict Index", overallCoord: "Coordination", overallPrev: "Prev ", overallPrev2: " · ", overallYear: "-", overallMonth: "",
      overallDescRs1: " cross-checks: ", overallDescRs2: " fail, ", overallDescRs3: " warn.", overallDescRs4: " Fail: ", overallDescCs1: " checks: ", overallDescCs2: " fail.", overallDescCs3: " Sync ratio ", overallDescCs4: "% (", overallDescCs5: " points hit >=3).", overallDescCs6: " Persistence: ", overallDescCs7: " Score capped due to lack of expansion.",
      overallFourD: "⚠ 4D Score reflects economic state, NOT data truth.", overallPmiUp: "Above 50", overallPmiDown: "Below 50", overallGdpHigh: "Strong", overallGdpMid: "Neutral", overallGdpLow: "Weak", overallImbalance: "Imbalanced", overallBalanced: "Balanced", overallCashHigh: "Strong activation", overallCashLow: "Weak activation",
      riskTrendTitle: "Risk Trend", riskTrendTip: "Red: rolling 24. Blue: all-time.", riskTrendCur: "Current", riskTrendHist: "History", riskTrendCurLabel: "Current (Rolling 24)", riskTrendHistLabel: "All-time",
      statusLoaded: "Loaded local", statusBuiltin: "Loaded builtin", statusPeriods: " periods.", statusWaitParsed: "Waiting to parse."
    }
  };

  function applyLang(lang) {
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('co-lang', lang);

    // 桌面导航 + 移动端抽屉，两处老结构都同步高亮
    ['langBtn', 'langToggleMobile'].forEach(function(id) {
      var wrap = document.getElementById(id);
      if (!wrap) return;
      var zh = wrap.querySelector('.zh');
      var en = wrap.querySelector('.en');
      if (zh) zh.classList.toggle('active', lang === 'zh');
      if (en) en.classList.toggle('active', lang === 'en');
    });

    const d = dict[lang] || dict.zh;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (d[key]) el.textContent = d[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (d[key]) el.setAttribute('placeholder', d[key]);
    });

    const timeSelectText = document.getElementById('timeSelectText');
    if (timeSelectText) {
      const activeOpt = document.querySelector('.nm-select-option[data-idx].active');
      if (activeOpt && d[activeOpt.getAttribute('data-i18n')]) {
         timeSelectText.textContent = d[activeOpt.getAttribute('data-i18n')];
      }
    }

    if (window.App && window.App.econDiagnose && window.App.econDiagnose.triggerRender) {
      window.App.econDiagnose.triggerRender();
    }
  }

  window.I18N = {
    t: function(key) {
      var lang = localStorage.getItem('co-lang') || 'zh';
      return (dict[lang] && dict[lang][key]) || (dict['zh'] && dict['zh'][key]) || key;
    },
    lang: function() { return localStorage.getItem('co-lang') || 'zh'; },
    applyLang: applyLang
  };

  document.addEventListener('DOMContentLoaded', function() {
    // 完美双向循环，点哪切哪
    ['langBtn', 'langToggleMobile'].forEach(function(id) {
      var wrap = document.getElementById(id);
      if (!wrap) return;
      wrap.addEventListener('click', function() {
        var nextLang = (localStorage.getItem('co-lang') === 'en') ? 'zh' : 'en';
        applyLang(nextLang);
      });
    });
    
    applyLang(localStorage.getItem('co-lang') || 'zh');

    var timeText = document.getElementById('timeSelectText');
    var options = document.querySelectorAll('.nm-select-option[data-idx]');
    options.forEach(function(opt) {
      opt.addEventListener('click', function(e) {
        e.preventDefault();
        var key = this.getAttribute('data-i18n');
        timeText.textContent = window.I18N.t(key);
        options.forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        this.closest('.nav-dropdown').classList.remove('open');
        var idx = parseInt(this.getAttribute('data-idx'));
        var hiddenBtns = document.querySelectorAll('#rangeTabs button');
        if (hiddenBtns && hiddenBtns[idx]) hiddenBtns[idx].click();
      });
    });
    setTimeout(function() {
      var hiddenBtns = document.querySelectorAll('#rangeTabs button');
      if (hiddenBtns && hiddenBtns[3]) hiddenBtns[3].click(); 
    }, 100);
  });
})();