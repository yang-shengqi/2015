/* ============================================================
 * wjp-app.js —— WJP 法治指数地图 · 主逻辑（拟物风）
 * 依赖：core.js、wjp-i18n.js、ECharts、PapaParse（均在前）
 * ============================================================ */
(function () {
  'use strict';

  var App = window.App;
  var I18N = window.WJP_I18N;
  var DICT = I18N.DICT;
  var FACTOR_ZH = I18N.FACTOR_ZH;
  var FACTOR_EN = I18N.FACTOR_EN;
  var FACTOR_DESC_ZH = I18N.FACTOR_DESC_ZH;
  var FACTOR_DESC_EN = I18N.FACTOR_DESC_EN;
  var ALIAS_TO_FORMAL = I18N.ALIAS_TO_FORMAL;
  var ZH_TO_FORMAL = I18N.ZH_TO_FORMAL;
  var ABBR = I18N.ABBR;
  var formalOf = I18N.formalOf;
  var zhOf = I18N.zhOf;

  var root = document.documentElement;
  var PREF_KEY = 'wjp-prefs';
  var DATA_KEY = 'wjp-data';

  if (typeof echarts === 'undefined') {
    var mapEl = App.$('.map-canvas');
    if (mapEl) showMapError('❌ ECharts 未加载，请检查网络。');
  }
  if (typeof Papa === 'undefined') { console.warn('⚠️ PapaParse 未加载'); }

  /* ================= 偏好 ================= */
  App.storage.migrate('wjp_map_prefs_v2');
  App.storage.migrate('wjp_map_data_v2');

  var prefs = App.storage.getJSON(PREF_KEY, { lang: 'zh', metric: 'score' });
  var lang = prefs.lang || 'zh';
  var currentMetric = prefs.metric || 'score';
  function savePrefs() { App.storage.setJSON(PREF_KEY, { lang: lang, metric: currentMetric }); }

  /* ================= i18n ================= */
  function T(k) {
    var d = DICT[lang] || DICT.zh;
    return (d[k] !== undefined) ? d[k] : (DICT.zh[k] !== undefined ? DICT.zh[k] : k);
  }
  function fmt(s, o) {
    return String(s).replace(/\{(\w+)\}/g, function (m, key) {
      return (o && o[key] !== undefined) ? o[key] : m;
    });
  }
  function fmtNum(v, d) {
    d = (d === undefined) ? 2 : d;
    if (v === null || v === undefined || isNaN(v)) return '--';
    return Number(v).toFixed(d);
  }
  function metricLabel(key) {
    if (key === 'score') return T('metricOverall');
    return (lang === 'zh') ? (FACTOR_ZH[key] || key) : (FACTOR_EN[key] || key);
  }

  function toTitleCase(str) {
    return String(str || '')
      .toLowerCase()
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function displayName(formal) {
    if (!formal) return '—';
    var zh = zhOf(formal);
    var suffix = ABBR[formal] || formal;
    return (lang === 'zh') ? (zh + ' (' + suffix + ')') : toTitleCase(formal);
  }

  /* ================= 数据状态 ================= */
  var wjpData = {};
  var countries = [];
  var dimKeys = [];

  function rebuildIndex() {
    wjpData = {};
    countries.forEach(function (item) {
      wjpData[item.country] = { rankNumber: item.rankNumber, score: item.score, dims: item.dims };
      var c = item.country;
      if (c === 'united states') {
        wjpData['usa'] = wjpData[c];
        wjpData['us'] = wjpData[c];
        wjpData['america'] = wjpData[c];
      }
      if (c === 'united kingdom') { wjpData['uk'] = wjpData[c]; }
      if (c === 'united arab emirates') { wjpData['uae'] = wjpData[c]; }
    });
  }

  function findData(mapName) {
    if (!mapName) return null;
    var lower = String(mapName).toLowerCase().trim();
    if (wjpData[lower]) return wjpData[lower];
    var formal = ALIAS_TO_FORMAL[lower];
    if (formal && wjpData[formal.toLowerCase()]) return wjpData[formal.toLowerCase()];
    for (var key in wjpData) {
      if (key.indexOf(lower) !== -1 || lower.indexOf(key) !== -1) return wjpData[key];
    }
    return null;
  }

  /* ================= 缓存 ================= */
  function saveCache() {
    var payload = { countries: countries, dimKeys: dimKeys, savedAt: Date.now(), v: 2 };
    var json;
    try { json = JSON.stringify(payload); }
    catch (e) { App.utils.toast('⚠️ 数据序列化失败：' + (e.message || e.name), 5000); return false; }
    try { App.storage.set(DATA_KEY, json); return true; }
    catch (e) {
      var isQuota = e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014);
      App.utils.toast(isQuota ? '⚠️ 浏览器缓存已满，请点「清除缓存」后重试。' : '⚠️ 数据保存失败：' + (e.message || e.name), 6000);
      return false;
    }
  }
  function loadCache() {
    var raw = App.storage.get(DATA_KEY, null);
    if (!raw) return null;
    try {
      var d = JSON.parse(raw);
      if (d && d.countries && d.countries.length) return d;
    } catch (e) {
      App.utils.toast('⚠️ 本地缓存已损坏，请重新导入 CSV', 5000);
      App.storage.remove(DATA_KEY);
    }
    return null;
  }
  function clearCache() { App.storage.remove(DATA_KEY); }

  /* ================= 主题色（彻底走系统层） ================= */
  function themeColors() {
    var v = App.cssVars([
      '--nm-accent', '--nm-text', '--nm-text-2', '--nm-text-3', 
      '--nm-bg', '--nm-line', '--nm-dark'
    ]);
    return {
      c1: v['--nm-accent'] || '#6d5dfc',
      text: v['--nm-text'] || '#333333',
      text2: v['--nm-text-2'] || '#6b7280',
      text3: v['--nm-text-3'] || '#9ca3af',
      accent: v['--nm-accent'] || '#6d5dfc',
      bg: v['--nm-bg'] || '#e0e5ec',
      line: v['--nm-line'] || '#b8bcc2',
      dark: v['--nm-dark'] || '#b8bcc2'
    };
  }

  /* ================= 颜色工具 ================= */
  function hexToRgb(hex) {
    var h = String(hex || '').trim();
    if (h.charAt(0) === '#') h = h.slice(1);
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    if (h.length !== 6) return null;
    var r = parseInt(h.slice(0, 2), 16);
    var g = parseInt(h.slice(2, 4), 16);
    var b = parseInt(h.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r: r, g: g, b: b };
  }
  function rgbaOf(hex, a) {
    var c = hexToRgb(hex);
    if (!c) return hex;
    return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + a + ')';
  }
  function boostColor(hex, alpha, k) {
    var c = hexToRgb(hex);
    if (!c) return rgbaOf(hex, 1);
    var mw = 0.30 * k;
    var r = Math.round(c.r + (255 - c.r) * mw);
    var g = Math.round(c.g + (255 - c.g) * mw);
    var b = Math.round(c.b + (255 - c.b) * mw);
    var a = Math.min(1, alpha + (1 - alpha) * 0.85 * k);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a.toFixed(3) + ')';
  }

  var LEVEL_ALPHA = [0.94, 0.68, 0.44, 0.22];

  /* ================= 四档分档 ================= */
  function getScale() {
    var scores = countries.map(function (c) { return c.score; }).filter(function (v) { return typeof v === 'number' && isFinite(v); });
    if (!scores.length) return null;
    var mn = Math.min.apply(null, scores);
    var mx = Math.max.apply(null, scores);
    if (mx === mn) mx = mn + 0.01;
    var step = (mx - mn) / 4;
    return { mn: mn, mx: mx, t: [mn + step, mn + 2 * step, mn + 3 * step] };
  }
  function levelOf(score, sc) {
    if (score >= sc.t[2]) return 0;
    if (score >= sc.t[1]) return 1;
    if (score >= sc.t[0]) return 2;
    return 3;
  }

  /* ================= 世界地图加载（全走 CDN 避免 CORS） ================= */
  var MIRRORS = [
    'https://cdn.jsdelivr.net/gh/holtzy/D3-graph-gallery@master/DATA/world.geojson',
    'https://cdn.jsdelivr.net/npm/world-geojson@3.4.0/countries.geojson'
  ];

  var myChart = null;
  var worldData = null;
  var countryCenter = {};
  var mapNames = [];

  function showMapError(msg) {
    var el = App.$('.map-canvas');
    if (!el) return;
    el.innerHTML = '';
    var p = document.createElement('div');
    p.className = 'map-loading';
    p.textContent = msg;
    el.appendChild(p);
    var ld = App.$('#mapLoading');
    if (ld) ld.classList.add('is-hidden');
  }

  function calcCenter(feature) {
    var geom = feature.geometry;
    if (!geom) return null;
    var coords = null;
    if (geom.type === 'Polygon') coords = geom.coordinates[0];
    else if (geom.type === 'MultiPolygon') coords = geom.coordinates[0][0];
    else return null;
    if (!coords || coords.length < 3) return null;
    var lats = 0, lons = 0, count = 0;
    for (var i = 0; i < coords.length; i++) {
      var lon = coords[i][0], lat = coords[i][1];
      if (isFinite(lon) && isFinite(lat)) { lons += lon; lats += lat; count++; }
    }
    return count ? [lons / count, lats / count] : null;
  }

  function tryLoadMirror(index) {
    if (index >= MIRRORS.length) { showMapError('❌ 地图数据加载失败，请检查网络连接。'); return; }
    fetch(MIRRORS[index])
      .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
      .then(function (data) {
        worldData = data;
        if (!worldData.features || !worldData.features.length) throw new Error('数据为空');
        initMap();
      })
      .catch(function (err) {
        console.warn('地图镜像加载失败：', MIRRORS[index], err);
        tryLoadMirror(index + 1);
      });
  }

  /* ================= 地图配色 ================= */
  function buildSeriesData() {
    var tc = themeColors();
    var sc = getScale();
    var border = rgbaOf(tc.text3, .6);
    var arr = [];
    if (!worldData) return arr;

    worldData.features.forEach(function (f) {
      var nm = f.properties.name || f.properties.NAME || '';
      if (!nm) return;
      var d = findData(nm);

      if (sc && d && typeof d.score === 'number') {
        var lv = levelOf(d.score, sc);
        var a = LEVEL_ALPHA[lv];
        arr.push({
          name: nm, value: d.score,
          itemStyle: { areaColor: rgbaOf(tc.c1, a), borderColor: border, borderWidth: .7 },
          emphasis: { itemStyle: { areaColor: boostColor(tc.c1, a, 0.62), borderColor: rgbaOf(tc.text, .55), borderWidth: 1.2 } },
          select: { itemStyle: { areaColor: boostColor(tc.c1, a, 1.0), borderColor: tc.accent, borderWidth: 1.6 } }
        });
      } else {
        arr.push({
          name: nm, value: null,
          emphasis: { itemStyle: { areaColor: rgbaOf(tc.c1, .42), borderColor: rgbaOf(tc.text, .45), borderWidth: 1.1 } },
          select: { itemStyle: { areaColor: rgbaOf(tc.c1, .62), borderColor: tc.accent, borderWidth: 1.4 } }
        });
      }
    });
    return arr;
  }

  function buildFullOption() {
    var tc = themeColors();
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var nm = params.name;
          if (!nm) return '';
          var formal = formalOf(nm);
          var d = findData(nm);
          var head = '<strong>' + zhOf(formal) + '</strong> <span style="color:' + tc.text3 + ';">(' + (ABBR[formal] || formal) + ')</span>';
          if (d && typeof d.score === 'number') {
            return head + '<br/>法治指数：<strong>' + Number(d.score).toFixed(2) + '</strong>'
                 + '<br/>全球排名：第 <strong>' + d.rankNumber + '</strong> 名';
          }
          return head + '<br/><span style="color:' + tc.text3 + ';">暂无 WJP 数据</span>';
        },
        backgroundColor: rgbaOf(tc.bg, .96),
        borderColor: rgbaOf(tc.text3, .85),
        borderWidth: 1, padding: [6, 12],
        textStyle: { color: tc.text, fontSize: 13, fontFamily: 'Microsoft YaHei, PingFang SC, sans-serif' },
        extraCssText: 'border-radius:12px; box-shadow:4px 4px 10px ' + rgbaOf(tc.dark, 0.6) + ', -4px -4px 10px ' + rgbaOf('#ffffff', 0.9) + ';'
      },
      series: [{
        type: 'map', map: 'world', roam: true, selectedMode: 'single', zoom: 1.15, label: { show: false },
        itemStyle: { areaColor: rgbaOf(tc.text3, .28), borderColor: rgbaOf(tc.text3, .6), borderWidth: .7 },
        emphasis: { itemStyle: { areaColor: rgbaOf(tc.c1, .62), borderWidth: 0 }, label: { show: false } },
        select: { itemStyle: { areaColor: rgbaOf(tc.c1, .88), borderWidth: 0 }, label: { show: false } },
        data: buildSeriesData()
      }]
    };
  }

  function refreshMap() {
    if (!myChart) return;
    var tc = themeColors();
    myChart.setOption({
      series: [{
        itemStyle: { areaColor: rgbaOf(tc.text3, .28), borderColor: rgbaOf(tc.text3, .6), borderWidth: .7 },
        emphasis: { itemStyle: { areaColor: rgbaOf(tc.c1, .62), borderWidth: 0 }, label: { show: false } },
        select: { itemStyle: { areaColor: rgbaOf(tc.c1, .88), borderWidth: 0 }, label: { show: false } },
        data: buildSeriesData()
      }]
    });
    renderLegend();
  }

  /* ================= 图例 ================= */
  function renderLegend() {
    var box = App.$('#mapLegend');
    if (!box) return;
    var sc = getScale();
    if (!sc) { box.classList.add('is-hidden'); return; }
    var tc = themeColors();
    var labels = [
      sc.t[2].toFixed(2) + ' +',
      sc.t[1].toFixed(2) + ' – ' + sc.t[2].toFixed(2),
      sc.t[0].toFixed(2) + ' – ' + sc.t[1].toFixed(2),
      '< ' + sc.t[0].toFixed(2)
    ];
    var html = '<div class="lg-title">' + T('legendTitle') + '</div>';
    for (var i = 0; i < 4; i++) {
      html += '<div class="lg-row">'
           +   '<span class="lg-swatch" style="background:' + rgbaOf(tc.c1, LEVEL_ALPHA[i]) + '"></span>'
           +   '<span class="lg-txt">' + labels[i] + '</span>'
           +  '</div>';
    }
    box.innerHTML = html;
    box.classList.remove('is-hidden');
  }

  /* ================= 浮层 ================= */
  var infoFloat, ifName, ifSub, ifRank, ifDims;

  function positionFloat(x, y) {
    if (!infoFloat) return;
    var w = 300, h = 320;
    var vw = window.innerWidth, vh = window.innerHeight;
    var left = x || 100, top = (y || 100) + 22;
    if (left + w > vw - 10) left = vw - w - 10;
    if (left < 10) left = 10;
    if (top + h > vh - 10) top = (y || 100) - h - 22;
    if (top < 10) top = 10;
    infoFloat.style.left = left + 'px';
    infoFloat.style.top = top + 'px';
  }

  function showCountryInfo(mapName, x, y) {
    if (!infoFloat) return;
    var formal = formalOf(mapName);
    ifName.textContent = displayName(formal);
    var d = findData(mapName);

    if (d) {
      ifSub.textContent = (lang === 'zh' ? 'WJP 法治指数 · 全球排名' : 'WJP Rule of Law Index · Global Rank');
      ifRank.innerHTML =
        '<span class="if-chip">' + T('globalRank') + '：第 ' + d.rankNumber + ' 名</span>' +
        '<span class="if-chip alt">' + T('indexScore') + '：' + fmtNum(d.score) + '</span>';

      var html = '<div class="if-dims-title" style="font-size:11.5px;color:var(--nm-text-3);margin-bottom:6px;letter-spacing:.4px;">'
               + T('dimTitle').toUpperCase() + '</div>';
      var hasDim = false;
      for (var k in d.dims) {
        var val = d.dims[k];
        if (val === null || val === undefined || isNaN(val)) continue;
        hasDim = true;
        var label = (lang === 'zh') ? (FACTOR_ZH[k] || k) : (FACTOR_EN[k] || k);
        var pct = Math.max(0, Math.min(1, Number(val))) * 100;
        html += '<div class="dim-row">'
             +    '<span class="lbl">' + label + '</span>'
             +    '<span class="bar"><i style="width:' + pct.toFixed(1) + '%"></i></span>'
             +    '<span class="val">' + fmtNum(val) + '</span>'
             +  '</div>';
      }
      if (!hasDim) html += '<div class="if-empty">—</div>';
      ifDims.innerHTML = html;
    } else {
      ifSub.textContent = 'World Justice Project';
      ifRank.innerHTML = '';
      ifDims.innerHTML = '<div class="if-empty">' + T('noRecord') + '</div>';
    }

    positionFloat(x, y);
    infoFloat.classList.remove('is-hidden');
  }

  function hideFloat() {
    if (infoFloat) infoFloat.classList.add('is-hidden');
  }

  /* ================= 地图初始化 ================= */
  function initMap() {
    try {
      infoFloat = App.$('#infoFloat');
      ifName = App.$('#ifName');
      ifSub = App.$('#ifSub');
      ifRank = App.$('#ifRank');
      ifDims = App.$('#ifDims');
      if (App.$('#ifClose')) App.$('#ifClose').addEventListener('click', hideFloat);

      if (!worldData._patched) {
        worldData._patched = true;
        worldData.features.push({
          type: 'Feature', properties: { name: 'Singapore' },
          geometry: { type: 'Polygon', coordinates: [[
            [103.8198,1.3521],[103.8586,1.3448],[103.8944,1.3332],[103.9214,1.3219],
            [103.9397,1.3054],[103.9476,1.2896],[103.9444,1.2725],[103.9297,1.2578],
            [103.9061,1.2489],[103.8765,1.2461],[103.8486,1.2507],[103.8273,1.2619],
            [103.8123,1.2773],[103.8054,1.2934],[103.8054,1.3102],[103.8123,1.3255],
            [103.8198,1.3521]
          ]]}
        });
        worldData.features.push({
          type: 'Feature', properties: { name: 'Hong Kong' },
          geometry: { type: 'Polygon', coordinates: [[
            [113.80,22.10],[114.40,22.10],[114.40,22.60],[113.80,22.60],[113.80,22.10]
          ]]}
        });
        worldData.features.push({
          type: 'Feature', properties: { name: 'Macau' },
          geometry: { type: 'Polygon', coordinates: [[
            [113.52,22.10],[113.60,22.10],[113.60,22.22],[113.52,22.22],[113.52,22.10]
          ]]}
        });
      }

      var el = App.$('.map-canvas');
      myChart = echarts.init(el);
      echarts.registerMap('world', worldData);

      mapNames = [];
      countryCenter = {};
      worldData.features.forEach(function (f) {
        var rawName = f.properties.name || f.properties.NAME || '';
        if (rawName) {
          mapNames.push(rawName);
          countryCenter[rawName] = calcCenter(f);
        }
      });

      myChart.setOption(buildFullOption());

      if (typeof ResizeObserver !== 'undefined') {
        var ro = new ResizeObserver(function () { if (myChart) myChart.resize(); });
        ro.observe(el);
      }
      window.addEventListener('resize', function () { if (myChart) myChart.resize(); });

      myChart.on('click', function (params) {
        if (!params || !params.name) return;
        var ev = params.event && params.event.event;
        var x = ev ? ev.clientX : (window.innerWidth / 2);
        var y = ev ? ev.clientY : 160;
        showCountryInfo(params.name, x, y);
      });

      myChart.getZr().on('click', function (e) {
        if (e.target) return;
        hideFloat();
      });

      document.addEventListener('click', function (e) {
        if (!infoFloat || infoFloat.classList.contains('is-hidden')) return;
        if (infoFloat.contains(e.target)) return;
        if (e.target && e.target.tagName === 'CANVAS') return;
        hideFloat();
      });

      App.a11y.closeOnEsc(hideFloat);

      App.$('#mapLoading').classList.add('is-hidden');
      renderLegend();
    } catch (err) {
      console.error('初始化地图出错：', err);
      if (myChart) {
        try { myChart.dispose(); } catch(e){}
        myChart = null;
      }
      showMapError('❌ 地图初始化失败，请查看控制台。');
    }
  }

  /* ================= 搜索定位 ================= */
  function cleanStr(str) { return String(str).replace(/[^a-z0-9]/g, ''); }

  function focusCountry(query, formalName) {
    if (!myChart) return false;
    var target = formalName || query;
    if (!target) return false;
    var targetLower = String(target).toLowerCase().trim();
    var targetClean = cleanStr(targetLower);
    var originalName = null;

    for (var i = 0; i < mapNames.length; i++) {
      if (mapNames[i].toLowerCase() === targetLower) { originalName = mapNames[i]; break; }
    }
    if (!originalName) {
      for (var j = 0; j < mapNames.length; j++) {
        var kl = mapNames[j].toLowerCase();
        if (kl.indexOf(targetLower) !== -1 || targetLower.indexOf(kl) !== -1) { originalName = mapNames[j]; break; }
      }
    }
    if (!originalName && targetClean) {
      for (var k = 0; k < mapNames.length; k++) {
        var kc = cleanStr(mapNames[k].toLowerCase());
        if (kc && (kc.indexOf(targetClean) !== -1 || targetClean.indexOf(kc) !== -1)) { originalName = mapNames[k]; break; }
      }
    }
    if (!originalName) {
      var std = ALIAS_TO_FORMAL[targetLower] || target;
      var stdLower = String(std).toLowerCase();
      for (var m = 0; m < mapNames.length; m++) {
        var keyLower = mapNames[m].toLowerCase();
        var keyStd = ALIAS_TO_FORMAL[keyLower] || mapNames[m];
        if (String(keyStd).toLowerCase() === stdLower) { originalName = mapNames[m]; break; }
      }
    }
    if (!originalName) return false;

    var opt = myChart.getOption();
    var seriesData = opt.series && opt.series[0] ? opt.series[0].data : null;
    if (seriesData) {
      seriesData.forEach(function (d) {
        if (d.name) myChart.dispatchAction({ type: 'unselect', seriesIndex: 0, name: d.name });
      });
    }
    myChart.dispatchAction({ type: 'mapSelect', seriesIndex: 0, name: originalName });
    var center = countryCenter[originalName];
    if (center) myChart.setOption({ series: [{ center: center, zoom: 4 }] });
    return true;
  }

  /* ================= KPI ================= */
  function renderStats() {
    var n = countries.length;
    App.$('#kpiCountries').textContent = n;
    var avgEl = App.$('#kpiAvg');
    var topEl = App.$('#kpiTop');
    var botEl = App.$('#kpiBottom');
    var topSub = App.$('#kpiTopSub');
    var botSub = App.$('#kpiBottomSub');

    if (!n) {
      avgEl.textContent = '--';
      topEl.textContent = '--';
      botEl.textContent = '--';
      topSub.textContent = '—';
      botSub.textContent = '—';
      return;
    }
    var sum = 0, top = null, bottom = null;
    countries.forEach(function (c) {
      sum += c.score;
      if (!top || c.score > top.score) top = c;
      if (!bottom || c.score < bottom.score) bottom = c;
    });
    avgEl.textContent = fmtNum(sum / n);
    topEl.textContent = fmtNum(top.score);
    botEl.textContent = fmtNum(bottom.score);
    topSub.textContent = displayName(formalOf(top.country));
    botSub.textContent = displayName(formalOf(bottom.country));
  }

  /* ================= 下拉框 ================= */
  function buildMetricOptions() {
    var sel = App.$('#metricSelect');
    if (!sel) return;
    var keys = dimKeys && dimKeys.length ? dimKeys.slice() : [];
    keys.sort(function (a, b) { return String(a).localeCompare(String(b)); });
    var html = '<option value="score">' + T('metricOverall') + '</option>';
    keys.forEach(function (k) {
      html += '<option value="' + k + '">' + metricLabel(k) + '</option>';
    });
    sel.innerHTML = html;
    var exists = (currentMetric === 'score') || keys.indexOf(currentMetric) !== -1;
    if (!exists) currentMetric = 'score';
    sel.value = currentMetric;
  }

  /* ================= 排行榜 ================= */
  function renderRank() {
    var topBox = App.$('#topRank');
    var botBox = App.$('#bottomRank');
    if (!topBox || !botBox) return;

    var key = currentMetric;
    var isOverall = (key === 'score');

    if (!countries.length) {
      var empty = '<table class="rank-table"><tbody><tr class="empty-row"><td colspan="3">'
                + T('noData') + '</td></tr></tbody></table>';
      topBox.innerHTML = empty;
      botBox.innerHTML = empty;
      return;
    }

    var list = [];
    countries.forEach(function (c) {
      var v = isOverall ? c.score : (c.dims ? c.dims[key] : null);
      if (v === null || v === undefined || isNaN(v)) return;
      list.push({ c: c, v: Number(v) });
    });

    if (!list.length) {
      var empty2 = '<table class="rank-table"><tbody><tr class="empty-row"><td colspan="3">'
                 + T('noData') + '</td></tr></tbody></table>';
      topBox.innerHTML = empty2;
      botBox.innerHTML = empty2;
      return;
    }

    list.sort(function (a, b) {
      var d = b.v - a.v;
      if (d !== 0) return d;
      return a.c.rankNumber - b.c.rankNumber;
    });

    var ranked = [];
    var rk = 0, prev = null;
    list.forEach(function (item, i) {
      if (item.v !== prev) { rk = i + 1; prev = item.v; }
      ranked.push({ c: item.c, v: item.v, rank: rk });
    });

    var colLabel = metricLabel(key);
    var head = '<thead><tr><th class="idx">' + T('colRank') + '</th><th>' + T('colCountry') + '</th>'
             + '<th class="num">' + colLabel + '</th></tr></thead>';

    var escapeHTML = (App.utils && App.utils.escapeHTML) ? App.utils.escapeHTML : function(s) {
      return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    };

    function rows(arr, cls) {
      return arr.map(function (o) {
        return '<tr><td class="idx">' + o.rank + '</td>'
             + '<td class="symbol">' + escapeHTML(displayName(formalOf(o.c.country))) + '</td>'
             + '<td class="amount ' + cls + '">' + fmtNum(o.v) + '</td></tr>';
      }).join('');
    }

    topBox.innerHTML = '<table class="rank-table">' + head
                     + '<tbody>' + rows(ranked.slice(0, 10), 'positive') + '</tbody></table>';
    botBox.innerHTML = '<table class="rank-table">' + head
                     + '<tbody>' + rows(ranked.slice(-10).reverse(), 'negative') + '</tbody></table>';
  }

  function renderAll() {
    renderStats();
    renderRank();
    renderLegend();
    refreshMap();
    var exp = App.$('#exportBtn');
    if (exp) exp.classList.toggle('is-hidden', !countries.length);
  }

  /* ================= CSV 导入 ================= */
  function handleFile(file) {
    if (typeof Papa === 'undefined') { App.utils.toast('❌ PapaParse 未加载'); return; }
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        var data = results.data;
        if (!data || !data.length) { App.utils.toast(T('toastFileEmpty')); return; }
        var headers = results.meta.fields || [];
        if (headers.indexOf('Country') === -1 || headers.indexOf('Rank') === -1) {
          App.utils.toast(T('toastNeedCols'), 4200);
          return;
        }
        var dims = headers.filter(function (h) {
          return h !== 'Country' && h !== 'Rank' && h !== 'Score';
        });

        var list = [];
        data.forEach(function (row) {
          var country = row['Country'];
          if (!country) return;
          var score = parseFloat(row['Rank']); // 这里 WJP 的 Rank 实际上是分数
          if (isNaN(score)) return;
          var dimObj = {};
          dims.forEach(function (key) {
            var val = parseFloat(row[key]);
            dimObj[key] = isNaN(val) ? null : val;
          });
          list.push({ country: String(country).toLowerCase().trim(), score: score, dims: dimObj });
        });

        if (!list.length) { App.utils.toast(T('toastEmpty')); return; }

        list.sort(function (a, b) { return b.score - a.score; });
        var rank = 0, prev = null;
        list.forEach(function (item, index) {
          if (item.score !== prev) { rank = index + 1; prev = item.score; }
          item.rankNumber = rank;
        });

        countries = list;
        dimKeys = dims;
        rebuildIndex();
        saveCache();

        App.$('#fileName').textContent = '📎 ' + file.name;
        buildMetricOptions();
        renderAll();
        App.utils.toast(fmt(T('toastLoaded'), { n: countries.length }));
      },
      error: function (err) { App.utils.toast(T('toastParseErr') + err.message); }
    });
  }

  /* ================= 导出 ================= */
  function exportCSV() {
    if (!countries.length) { App.utils.toast(T('toastNoData')); return; }
    var sorted = countries.slice().sort(function (a, b) { return a.rankNumber - b.rankNumber; });
    var dimCols = dimKeys.length ? dimKeys
                : ['Factor1','Factor2','Factor3','Factor4','Factor5','Factor6','Factor7','Factor8'];
    var headers = ['Rank','Country','Score'].concat(dimCols);
    var lines = [headers.join(',')];
    sorted.forEach(function (c) {
      var row = [c.rankNumber, '"' + formalOf(c.country).replace(/"/g, '""') + '"', c.score];
      dimCols.forEach(function (k) {
        var v = c.dims[k];
        row.push((v === null || v === undefined || isNaN(v)) ? '' : v);
      });
      lines.push(row.join(','));
    });
    var csv = '\uFEFF' + lines.join('\n');
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'WJP_Rule_of_Law_' + new Date().toISOString().slice(0, 10) + '.csv';
    a.click();
    URL.revokeObjectURL(a.href);
    App.utils.toast(fmt(T('toastExported'), { n: countries.length }));
  }

  /* ================= 弹窗 ================= */
  var modal = App.$('#factorModal');
  var modalBox = modal ? modal.querySelector('.modal__box') : null;
  var modalRelease = null;

  function openModal() {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    App.utils.lockScroll();
    if (modalBox) {
      modalRelease = App.a11y.trapFocus(modalBox, {
        onEscape: closeModal,
        initialFocus: '#modalCloseBtn'
      });
    }
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    App.utils.unlockScroll();
    if (modalRelease) { modalRelease(); modalRelease = null; }
  }
  if (modal) {
    App.$('#helpBtn').addEventListener('click', openModal);
    App.$('#modalCloseBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  }

  function renderModal() {
    var keys = ['Factor1','Factor2','Factor3','Factor4','Factor5','Factor6','Factor7','Factor8'];
    var body = App.$('#modalBody');
    if (!body) return;
    body.innerHTML = keys.map(function (k) {
      var name = (lang === 'zh') ? FACTOR_ZH[k] : FACTOR_EN[k];
      var desc = (lang === 'zh') ? FACTOR_DESC_ZH[k] : FACTOR_DESC_EN[k];
      return '<tr><td><span class="tag">' + k + '</span></td>'
           + '<td>' + App.utils.escapeHTML(name) + '</td>'
           + '<td>' + App.utils.escapeHTML(desc) + '</td></tr>';
    }).join('');
  }

  /* ================= 语言 ================= */
  function applyI18n() {
    var d = DICT[lang] || DICT.zh;
    App.$$('[data-wjp-i18n]').forEach(function (el) {
      var v = d[el.dataset.wjpI18n];
      if (v !== undefined) el.textContent = v;
    });
    App.$$('[data-wjp-i18n-ph]').forEach(function (el) {
      var v = d[el.dataset.wjpI18nPh];
      if (v !== undefined) el.setAttribute('placeholder', v);
    });
    root.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
    renderModal();
    buildMetricOptions();
    renderStats();
    renderRank();
    renderLegend();
  }

  function setLang(next) {
    lang = next;
    prefs.lang = next;
    savePrefs();
    applyI18n();
    refreshMap();
    if (infoFloat && !infoFloat.classList.contains('is-hidden')) hideFloat();
  }

  var langBtn = App.$('#langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      setLang(lang === 'zh' ? 'en' : 'zh');
    });
  }

  /* ================= 下拉框交互 ================= */
  var metricSelect = App.$('#metricSelect');
  if (metricSelect) {
    metricSelect.addEventListener('change', function () {
      currentMetric = this.value || 'score';
      prefs.metric = currentMetric;
      savePrefs();
      renderRank();
    });
  }

  /* ================= 上传交互 ================= */
  var fileInput = App.$('#fileInput');
  var uploadArea = App.$('#uploadArea');

  if (fileInput) {
    fileInput.addEventListener('change', function (e) {
      var f = e.target.files[0];
      if (f) handleFile(f);
      this.value = '';
    });
  }
  if (uploadArea) {
    uploadArea.addEventListener('dragover', function (e) {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', function () {
      uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', function (e) {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      var f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    });
    uploadArea.addEventListener('click', function (e) {
      if (e.target.tagName !== 'LABEL' && e.target.tagName !== 'INPUT') {
        if (fileInput) fileInput.click();
      }
    });
  }

  if (App.$('#resetBtn')) {
    App.$('#resetBtn').addEventListener('click', function () {
      if (confirm(T('toastReset'))) {
        clearCache();
        location.reload();
      }
    });
  }
  if (App.$('#exportBtn')) {
    App.$('#exportBtn').addEventListener('click', exportCSV);
  }

  /* ================= 搜索交互 ================= */
  var searchInput = App.$('#searchInput');
  var searchBtn = App.$('#searchBtn');
  var searchClear = App.$('#searchClear');
  var locateHint = App.$('#locateHint');

  function doSearch() {
    var query = searchInput.value.trim();
    if (!query) return;
    var lower = query.toLowerCase();
    var formal = ZH_TO_FORMAL[query] || ALIAS_TO_FORMAL[lower] || null;

    if (!formal) {
      for (var i = 0; i < mapNames.length; i++) {
        var kl = mapNames[i].toLowerCase();
        if (kl.indexOf(lower) !== -1 || lower.indexOf(kl) !== -1) {
          formal = ALIAS_TO_FORMAL[kl] || mapNames[i];
          break;
        }
      }
    }
    if (!formal) {
      for (var zh in ZH_TO_FORMAL) {
        if (zh.indexOf(query) !== -1 || query.indexOf(zh) !== -1) {
          formal = ZH_TO_FORMAL[zh];
          break;
        }
      }
    }

    var ok = focusCountry(query, formal);
    if (ok) {
      searchClear.classList.remove('is-hidden');
      locateHint.textContent = T('locate') + displayName(formal || query);
      hideFloat();
    } else {
      searchClear.classList.add('is-hidden');
      locateHint.textContent = T('notFound');
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      clearTimeout(this._timer);
      this._timer = setTimeout(doSearch, 320);
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); doSearch(); }
    });
  }
  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (searchClear) {
    searchClear.addEventListener('click', function () {
      searchInput.value = '';
      searchClear.classList.add('is-hidden');
      locateHint.textContent = '';
      hideFloat();
      if (myChart) {
        var opt = myChart.getOption();
        var data = opt.series && opt.series[0] ? opt.series[0].data : null;
        if (data) {
          data.forEach(function (d) {
            if (d.name) myChart.dispatchAction({ type: 'unselect', seriesIndex: 0, name: d.name });
          });
        }
        myChart.setOption({ series: [{ center: undefined, zoom: 1.15 }] });
      }
      searchInput.focus();
    });
  }

  /* ================= 返回顶部 ================= */
  (function initToTop() {
    var btn = App.$('#toTop');
    var ring = App.$('#ringFill');
    if (!btn) return;
    var R = 21;
    var C = 2 * Math.PI * R;
    if (ring) {
      ring.style.strokeDasharray = C + ' ' + C;
      ring.style.strokeDashoffset = C;
    }
    var ticking = false;
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? window.scrollY / h : 0;
      if (ring) ring.style.strokeDashoffset = C * (1 - p);
      btn.classList.toggle('on', window.scrollY > 300);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
    btn.addEventListener('click', function () {
      App.utils.scrollTo(0);
    });
  })();

  /* ================= 启动 ================= */
  var cached = loadCache();
  if (cached) {
    countries = cached.countries;
    dimKeys = cached.dimKeys || [];
    rebuildIndex();
    App.$('#fileName').textContent = T('toastFromCache');
  }

  buildMetricOptions();
  applyI18n();
  renderAll();
  tryLoadMirror(0);

})();