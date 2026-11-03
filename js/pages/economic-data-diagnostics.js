(function (App) {
'use strict';
const t = function(k) { return window.I18N ? window.I18N.t(k) : k; };
const tr = function(k, map) {
  var str = t(k);
  if (map) { Object.keys(map).forEach(function(mk) { str = str.replace(new RegExp('\\{' + mk + '\\}', 'g'), map[mk]); }); }
  return str;
};

var BUCKET_P = 0.5;
var CRED = { ok:100, warn:50, fail:0, skip:75 };
function bucketMean(items){
  if(!items || !items.length) return null;
  var sw = 0, acc = 0;
  items.forEach(function(it){
    var w = it.w; if(!(w > 0)) return;
    var v = App.utils.clamp(it.v, 0, 100) / 100;
    sw += w; acc += w * Math.pow(v, BUCKET_P);
  });
  if(sw <= 0) return null;
  return Math.pow(acc / sw, 1 / BUCKET_P) * 100;
}
var LS_KEY = 'econ_v4_data';

var badgeTipEl = null;
function badge(text){ if(!text) return ''; return '<span class="info-badge" data-tip="'+App.utils.escapeHTML(text)+'" tabindex="0" role="button" aria-label="说明">?</span>'; }
function closestBadge(t){ while(t && t !== document){ if(t.classList && t.classList.contains('info-badge')) return t; t = t.parentNode; } return null; }
function showBadgeTip(el){
  var text = el.getAttribute('data-tip'); if(!text) return;
  if(!badgeTipEl) badgeTipEl = document.getElementById('badgeTip'); if(!badgeTipEl) return;
  badgeTipEl.textContent = text; badgeTipEl.classList.add('show');
  var r = el.getBoundingClientRect(); var tw = badgeTipEl.offsetWidth, th = badgeTipEl.offsetHeight;
  var left = r.left + r.width/2 - tw/2; var top = r.top - th - 10;
  if(left < 8) left = 8; if(left + tw > window.innerWidth - 8) left = window.innerWidth - tw - 8;
  if(top < 8) top = r.bottom + 10;
  badgeTipEl.style.left = left + 'px'; badgeTipEl.style.top  = top + 'px';
}
function hideBadgeTip(){ if(badgeTipEl) badgeTipEl.classList.remove('show'); }

var TIPS = {};
function initTips() {
  TIPS = {
    pmi: t('tip_pmi'), gdp: t('tip_gdp'), ppi: t('tip_ppi'), cpi: t('tip_cpi'),
    m1m2: t('tip_m1m2'), tax: t('tip_tax'), retail: t('tip_retail'), fai: t('tip_fai'),
    m2: t('tip_m2'), export: t('tip_export'), power: t('tip_power'), freight: t('tip_freight'),
    cement: t('tip_cement'), fiscal_rev: t('tip_fiscal_rev'), fiscal_exp: t('tip_fiscal_exp'),
    elec: t('tip_elec'), loan: t('tip_loan'), nom: t('tip_nom'), ppi_cpi: t('tip_ppi_cpi'),
    conflict_trend: t('tip_conflict_trend'), anchor_trend: t('tip_anchor_trend'),
    anchor: t('tip_anchor'), kq: t('tip_kq'), tax_elast: t('tip_tax_elast'),
    def: t('tip_def'), ic: t('tip_ic'), mm: t('tip_mm'),
    dim_pmi: t('tip_dim_pmi'), dim_gdp: t('tip_dim_gdp'), dim_ppi_cpi: t('tip_dim_ppi_cpi'), dim_m1m2: t('tip_dim_m1m2')
  };
}

var MAIN = [], OTHER = [], FISCAL = [], ANCHOR = [], ALL = [];
function initFields() {
  MAIN = [ {k:'pmi', n:t('k_pmi'), good:'up', unit:''}, {k:'gdp', n:t('k_gdp'), good:'up', unit:'%'}, {k:'ppi', n:t('k_ppi'), good:null, unit:'%'}, {k:'cpi', n:t('k_cpi'), good:null, unit:'%'} ];
  OTHER = [ {k:'m1m2', n:t('k_m1m2'), good:'up', unit:t('unit_pp')}, {k:'tax', n:t('k_tax'), good:'up', unit:'%'}, {k:'retail', n:t('k_retail'), good:'up', unit:'%'}, {k:'fai', n:t('k_fai'), good:'up', unit:'%'}, {k:'m2', n:t('k_m2'), good:null, unit:'%'}, {k:'export', n:t('k_export'), good:'up', unit:'%'} ];
  FISCAL = [ {k:'fiscal_rev', n:t('k_fiscal_rev'), good:null, unit:'%'}, {k:'fiscal_exp', n:t('k_fiscal_exp'), good:null, unit:'%'} ];
  ANCHOR = [ {k:'power', n:t('k_power'), good:'up', unit:'%'}, {k:'freight', n:t('k_freight'), good:'up', unit:'%'}, {k:'cement', n:t('k_cement'), good:'up', unit:'%'} ];
  ALL = MAIN.concat(OTHER, ANCHOR, FISCAL, [ {k:'nom', n:t('k_nom'), good:null, unit:'%'}, {k:'ppi_cpi', n:t('k_ppi_cpi'), good:null, unit:t('unit_pp')}, {k:'elec', n:t('k_elec'), good:'up', unit:'%'}, {k:'loan', n:t('k_loan'), good:'up', unit:'%'} ]);
  [MAIN, OTHER, ANCHOR, FISCAL].forEach(function(group){ group.forEach(function(d){ if(TIPS[d.k]) d.tip = TIPS[d.k]; }); });
}

var HDR = { pmi:/pmi/i, gdp:/gdp|国内生产总值/i, nom:/名义|nominal/i, m1m2:/m1\s*[-–—]\s*m2|m1m2/i, ppi_cpi:/ppi\s*[-–—]\s*cpi|cpi\s*[-–—]\s*ppi/i, fiscal_rev:/财政收入|财政预算收入/i, fiscal_exp:/财政支出|财政预算支出/i, power:/发电/i, elec:/用电|电力消费/i, freight:/货运|铁路/i, cement:/水泥/i, tax:/税收|财政/i, loan:/中长期贷款/i, m2:/^m2|货币供应/i, retail:/社零|社会消费品|零售/i, fai:/固投|固定资产投资/i, export:/出口|进出口/i, ppi:/ppi/i, cpi:/cpi/i };
function fieldOf(h){
  var s = String(h||'').trim(); if(!s) return null;
  if(/时间|月份|日期|^date$|^month$|季度|time/i.test(s)) return 'time';
  var order = ['nom','m1m2','ppi_cpi','fiscal_rev','fiscal_exp','power','elec','freight','cement','tax','loan','m2','retail','fai','export','pmi','gdp','ppi','cpi'];
  for(var i=0;i<order.length;i++){ var k = order[i]; if(HDR[k] && HDR[k].test(s)) return k; }
  return null;
}
function mapCols(cells){ var m={}, used={}; cells.forEach(function(h,i){ var f = fieldOf(h); if(f && !used[f]){ m[i]=f; used[f]=1; } }); return m; }

function detectSep(lines){ var t=0,c=0,p=0; lines.slice(0,6).forEach(function(l){ t+=(l.match(/\t/g)||[]).length; c+=(l.match(/,/g)||[]).length; p+=(l.match(/\|/g)||[]).length; }); if(t>=c && t>=p && t>0) return '\t'; if(p>=c && p>0) return '|'; return ','; }
function splitRow(line, sep){
  if(sep==='\t') return line.split('\t').map(function(x){ return x.trim(); });
  if(sep==='|'){ var s = line.trim(); if(s.charAt(0)==='|') s = s.slice(1); if(s.charAt(s.length-1)==='|') s = s.slice(0,-1); return s.split('|').map(function(x){ return x.trim(); }); }
  var out=[], cur='', q=false;
  for(var i=0;i<line.length;i++){ var ch = line[i]; if(ch==='"'){ q=!q; continue; } if(ch===',' && !q){ out.push(cur); cur=''; continue; } cur += ch; }
  out.push(cur); return out.map(function(x){ return x.trim(); });
}
function normTime(s){
  if(s==null) return '';
  if(typeof s === 'number' && s > 20000 && s < 80000){ var d = new Date((s - 25569) * 86400000); if(!isNaN(d.getTime())) return d.getUTCFullYear()+'-'+App.utils.padZero(d.getUTCMonth()+1, 2); }
  var str = String(s).trim(); var m2 = str.match(/^(\d{4})[-\/.](\d{1,2})/); if(m2) return m2[1]+'-'+App.utils.padZero(m2[2], 2);
  var m3 = str.match(/(\d{4})\s*年\s*(\d{1,2})/); if(m3) return m3[1]+'-'+App.utils.padZero(m3[2], 2);
  var m4 = str.match(/^(\d{4})(\d{2})$/); if(m4) return m4[1]+'-'+m4[2]; return '';
}
function parse(text){
  var lines = text.split(/\r?\n/).filter(function(l){ return l.trim()!==''; }); if(lines.length < 2) throw new Error('没有数据行');
  var sep = detectSep(lines); var hi=0, hm={}, hc=0;
  for(var i=0;i<Math.min(lines.length,6);i++){ var m = mapCols(splitRow(lines[i], sep)); var c = Object.keys(m).length; if(c > hc){ hi=i; hm=m; hc=c; } }
  if(hc < 2) throw new Error('表头识别失败');
  var rows=[], skip=0;
  for(var j=hi+1;j<lines.length;j++){
    var cs = splitRow(lines[j], sep); if(cs.every(function(c){ return c===''; })) continue;
    var r = {time:''}; ALL.forEach(function(d){ r[d.k] = null; });
    Object.keys(hm).forEach(function(k){
      var idx = Number(k), f = hm[k], raw = cs[idx]; if(raw===undefined||raw===''||raw==='—'||raw==='-'||raw==='/') return;
      if(f==='time'){ r.time = normTime(raw); return; }
      var v = parseFloat(String(raw).replace(/[%（）(),]/g,'')); if(!isNaN(v)) r[f] = v;
    });
    if(r.time) rows.push(r); else skip++;
  }
  if(!rows.length) throw new Error('没有有效数据行');
  rows.sort(function(a,b){ return a.time < b.time ? -1 : 1; });
  rows.forEach(function(r){ if(!App.utils.isEmpty(r.ppi_cpi) && !App.utils.isEmpty(r.ppi) && !App.utils.isEmpty(r.cpi)) r.ppi_cpi = +(r.ppi - r.cpi).toFixed(1); });
  return {rows:rows, skip:skip};
}

var DATA=[], YEAR='', YPAGE=0, YPER=5;
function save(){ try { App.storage.setJSON(LS_KEY, DATA); } catch(e){} }
function load(){ try { return App.storage.getJSON(LS_KEY) || []; } catch(e){ return []; } }

var RANGE = 'all';
var RANGES = [ {k:'1y', n:'time1', years:1}, {k:'3y', n:'time3', years:3}, {k:'5y', n:'time5', years:5}, {k:'all', n:'timeAll', years:null} ];
function rangeRows(rows){
  var def = RANGES.filter(function(r){ return r.k===RANGE; })[0]; if(!def || !def.years) return rows; if(!rows.length) return rows;
  var lastT = rows[rows.length-1].time; var lastY = parseInt(lastT.slice(0,4),10); var minY = lastY - def.years + 1;
  return rows.filter(function(r){ return parseInt(r.time.slice(0,4),10) >= minY; });
}

function latestYear(){ var y = ''; DATA.forEach(function(r){ var t=r.time.slice(0,4); if(t>y) y=t; }); return y || ''; }
function renderTable(){
  var cols = MAIN.concat(OTHER, ANCHOR);
  App.$('#tbl thead').innerHTML = '<tr><th>'+t('colTime')+'</th>' + cols.map(function(d){ return '<th>'+App.utils.escapeHTML(d.n)+(d.unit?'('+d.unit+')':'')+'</th>'; }).join('') + '</tr>';
  if(!DATA.length){ App.$('#tbl tbody').innerHTML = '<tr><td colspan="'+(cols.length+1)+'" class="na" style="text-align:center;padding:30px;">'+t('noData')+'</td></tr>'; App.$('#ytabs').innerHTML = ''; return; }
  if(!YEAR) YEAR = latestYear();
  var list = DATA.filter(function(r){ return r.time.slice(0,4)===YEAR; });
  App.$('#tbl tbody').innerHTML = list.slice().reverse().map(function(r){ return '<tr><td>'+App.utils.escapeHTML(r.time)+'</td>' + cols.map(function(d){ return !App.utils.isEmpty(r[d.k]) ? '<td>'+App.utils.formatNumber(r[d.k])+'</td>' : '<td class="na">—</td>'; }).join('') + '</tr>'; }).join('');
  renderYTabs();
}
function renderYTabs(){
  var box = App.$('#ytabs'); if(!box) return; var ys={}, list=[];
  DATA.forEach(function(r){ var y=r.time.slice(0,4); if(!ys[y]){ ys[y]=1; list.push(y); } }); list.sort().reverse();
  if(!list.length){ box.innerHTML=''; return; } if(list.indexOf(YEAR) === -1) YEAR = list[0];
  box.innerHTML = App.pagination.renderYearPager(list, YEAR, YPAGE, YPER);
  App.pagination.bindYearPager(box, function(y){ YEAR = y; YPAGE = Math.floor(list.indexOf(y) / YPER); renderTable(); }, function(dir){ var pages = Math.ceil(list.length / YPER); if(dir === 'p' && YPAGE > 0) YPAGE--; if(dir === 'n' && YPAGE < pages - 1) YPAGE++; renderYTabs(); });
}

function deltaClass(good, diff){ if(diff===0 || diff===null) return 'fl'; if(!good) return 'fl'; if(good==='up') return diff>0?'up':'dn'; if(good==='down') return diff<0?'up':'dn'; return 'fl'; }
var trendTipEl = null; function getTrendTip(){ if(!trendTipEl) trendTipEl = document.getElementById('tooltip'); return trendTipEl; }
function bindTrendHover(container){
  var tip = getTrendTip(); if(!tip) return; var root = container || document;
  App.$$('.chart-card, .big, .risk-trend', root).forEach(function(card){
    if(card.__hoverBound) return; var svg = card.querySelector('svg'); if(!svg) return;
    var dots = App.$$('circle[data-time]', svg); if(dots.length < 1) return; card.__hoverBound = true;
    var vb = (svg.getAttribute('viewBox')||'0 0 700 200').split(/\s+/).map(Number); var vbW = vb[2] || 700;
    var pts = dots.map(function(d){ return { el: d, cx: parseFloat(d.getAttribute('cx')), time: d.getAttribute('data-time')||'', val: d.getAttribute('data-val')||'', label: d.getAttribute('data-label')||'', unit: d.getAttribute('data-unit')||'', val2: d.getAttribute('data-val2')||'', label2: d.getAttribute('data-label2')||'', unit2: d.getAttribute('data-unit2')||'' }; });
    var hide = function(){ tip.classList.remove('show'); card.classList.remove('is-hovering'); };
    card.addEventListener('mousemove', function(e){
      var rect = svg.getBoundingClientRect(); if(!rect.width) return; var mx = (e.clientX - rect.left) / rect.width * vbW;
      var best = null, bestD = Infinity; for(var i=0;i<pts.length;i++){ var dd = Math.abs(pts[i].cx - mx); if(dd < bestD){ bestD = dd; best = pts[i]; } }
      if(!best){ hide(); return; }
      var label = best.label.replace(/\s*%\s*$/,''); var num = Number(best.val); var valStr = isNaN(num) ? best.val : num.toFixed(1); var unit = best.unit || '';
      if(!App.utils.isEmpty(best.val2)){
        tip.innerHTML = '<b>'+App.utils.escapeHTML(best.time)+'</b><br>'+App.utils.escapeHTML(label)+'：'+valStr+unit+'<br>'+App.utils.escapeHTML(best.label2)+'：'+Number(best.val2).toFixed(1)+(best.unit2||'');
      } else {
        tip.innerHTML = '<b>'+App.utils.escapeHTML(best.time)+'</b> · '+App.utils.escapeHTML(label)+'：'+valStr+unit;
      }
      tip.classList.add('show'); card.classList.add('is-hovering');
      var tw = tip.offsetWidth; var left = e.clientX + 14; if(left + tw > window.innerWidth - 8) left = e.clientX - tw - 14; if(left < 8) left = 8;
      var top = e.clientY - 34; if(top < 8) top = e.clientY + 20;
      tip.style.left = left + 'px'; tip.style.top  = top + 'px';
    });
    card.addEventListener('mouseleave', hide); card.addEventListener('blur', hide);
  });
}

function renderTrendCard(def, rows, container){
  var pts = rows.filter(function(r){ return !App.utils.isEmpty(r[def.k]); }).map(function(r){ return {t:r.time, v:r[def.k]}; });
  var card = document.createElement('div'); card.className = 'chart-card'; var titleHtml = App.utils.escapeHTML(def.n) + badge(def.tip);
  if(pts.length < 2){ card.innerHTML = '<div class="ct"><span>'+titleHtml+'</span><span class="range">'+t('dataInsufficient')+'</span></div><div style="font-size:12px;color:var(--nm-text-3);padding:10px 0;">'+t('needTwoPeriods')+'</div>'; container.appendChild(card); return; }
  var vals = pts.map(function(p){return p.v;}); var mn = Math.min.apply(null, vals), mx = Math.max.apply(null, vals);
  var pad = (mx-mn)<0.01 ? 1 : (mx-mn)*0.15; var y0 = mn-pad, y1 = mx+pad;
  var W=700, H=200, pl=56, pr=16, pt=16, pb=34, iw = W-pl-pr, ih = H-pt-pb, n = pts.length;
  var xo = function(i){ return pl + (i/(n-1))*iw; }; var yo = function(v){ return pt + (1-(v-y0)/(y1-y0))*ih; };
  var d = pts.map(function(p,i){ return (i===0?'M':'L') + xo(i).toFixed(1) + ',' + yo(p.v).toFixed(1); }).join(' ');
  var showDots = n<=40; var dots = pts.map(function(p,i){ var cx = xo(i).toFixed(1), cy = yo(p.v).toFixed(1); var attrs = ' data-time="'+App.utils.escapeHTML(p.t)+'" data-val="'+p.v+'" data-label="'+App.utils.escapeHTML(def.n)+'" data-unit="'+App.utils.escapeHTML(def.unit||'')+'"'; return showDots ? '<circle cx="'+cx+'" cy="'+cy+'" r="3.2" fill="var(--nm-accent)"'+attrs+'/>' : '<circle cx="'+cx+'" cy="'+cy+'" r="10" fill="transparent"'+attrs+'/>'; }).join('');
  var gl = ''; [0,0.5,1].forEach(function(f){ var v = y1-f*(y1-y0), y = pt+f*ih; gl += '<line x1="'+pl+'" y1="'+y+'" x2="'+(W-pr)+'" y2="'+y+'" stroke="var(--nm-line)" stroke-width="1"/><text x="'+(pl-8)+'" y="'+(y+4)+'" font-size="11" fill="var(--nm-text-3)" text-anchor="end">'+v.toFixed(1)+'</text>'; });
  var li=[], ly='', yc=0; pts.forEach(function(p,i){ var y = p.t.slice(0,4); if(i===0 || y!==ly){ if(yc%2===0) li.push(i); yc++; ly=y; } });
  var xl = li.map(function(i){ return '<text x="'+xo(i).toFixed(1)+'" y="'+(H-8)+'" font-size="11" fill="var(--nm-text-3)" text-anchor="middle">'+pts[i].t.slice(0,4)+'</text>'; }).join('');
  var last = pts[pts.length-1], prev = pts[pts.length-2]; var d1 = last.v - prev.v, c1 = deltaClass(def.good, d1);
  var yAgo = null; var ty = String(parseInt(last.t.slice(0,4),10)-1) + '-' + last.t.slice(5); for(var k=pts.length-1;k>=0;k--){ if(pts[k].t===ty){ yAgo=pts[k]; break; } }
  var d2 = yAgo ? last.v - yAgo.v : null; var c2 = yAgo ? deltaClass(def.good, d2) : 'fl';
  function arrow(v){ return v>0?'↑':(v<0?'↓':'−'); } function pct(v){ return v===null ? '—' : (Math.abs(v).toFixed(1) + (def.unit||'')); }
  card.innerHTML = '<div class="ct"><span>'+titleHtml+'</span><span class="range">'+mn.toFixed(1)+' ~ '+mx.toFixed(1)+'</span></div>'
    + '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">'+gl + '<path d="'+d+'" fill="none" stroke="var(--nm-accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>' + dots + xl + '</svg>'
    + '<div style="display:flex;gap:8px;font-size:12px;">'
    + '<div class="delta-box"><span style="color:var(--nm-text-3);font-size:11.5px;">'+t('vsPrev')+'</span><span class="'+c1+'" style="font-weight:600;">'+arrow(d1)+' '+pct(d1)+'</span></div>'
    + '<div class="delta-box"><span style="color:var(--nm-text-3);font-size:11.5px;">'+t('vsYoY')+'</span><span class="'+c2+'" style="font-weight:600;">'+(d2===null?'—':arrow(d2)+' '+pct(d2))+'</span></div>'
    + '</div>';
  container.appendChild(card);
}

function renderFiscalChart(boxId, rows){
  var box = App.$('#'+boxId); if(!box) return; box.innerHTML = '';
  var pts = rows.filter(function(r){ return !App.utils.isEmpty(r.fiscal_rev) || !App.utils.isEmpty(r.fiscal_exp); }).map(function(r){ return { t: r.time, rev: !App.utils.isEmpty(r.fiscal_rev) ? r.fiscal_rev : null, exp: !App.utils.isEmpty(r.fiscal_exp) ? r.fiscal_exp : null }; });
  if(pts.length < 2){ box.innerHTML = '<div class="empty" style="grid-column:1/-1;">'+t('fiscalNoData')+'</div>'; return; }
  var card = document.createElement('div'); card.className = 'chart-card'; card.style.gridColumn = '1/-1';
  var allVals = []; pts.forEach(function(p){ if(p.rev!==null) allVals.push(p.rev); if(p.exp!==null) allVals.push(p.exp); });
  var mn = Math.min.apply(null, allVals), mx = Math.max.apply(null, allVals); var pad = (mx-mn)<0.01 ? 1 : (mx-mn)*0.15; var y0 = mn-pad, y1 = mx+pad;
  var W=1360, H=280, pl=64, pr=24, pt=20, pb=40, iw = W-pl-pr, ih = H-pt-pb, n = pts.length;
  var xo = function(i){ return pl + (i/(n-1))*iw; }; var yo = function(v){ return pt + (1-(v-y0)/(y1-y0))*ih; };
  var revPts = []; pts.forEach(function(p,i){ if(p.rev!==null) revPts.push({i:i, v:p.rev}); }); var dRev = revPts.map(function(p,idx){ return (idx===0?'M':'L') + xo(p.i).toFixed(1) + ',' + yo(p.v).toFixed(1); }).join(' ');
  var expPts = []; pts.forEach(function(p,i){ if(p.exp!==null) expPts.push({i:i, v:p.exp}); }); var dExp = expPts.map(function(p,idx){ return (idx===0?'M':'L') + xo(p.i).toFixed(1) + ',' + yo(p.v).toFixed(1); }).join(' ');
  var dotsRev = revPts.map(function(p){ return '<circle cx="'+xo(p.i).toFixed(1)+'" cy="'+yo(p.v).toFixed(1)+'" r="7" fill="transparent" data-time="'+App.utils.escapeHTML(pts[p.i].t)+'" data-val="'+p.v+'" data-label="'+t('fiscalRevName')+'" data-unit="%" style="cursor:pointer"></circle>'; }).join('');
  var dotsExp = expPts.map(function(p){ return '<circle cx="'+xo(p.i).toFixed(1)+'" cy="'+yo(p.v).toFixed(1)+'" r="7" fill="transparent" data-time="'+App.utils.escapeHTML(pts[p.i].t)+'" data-val="'+p.v+'" data-label="'+t('fiscalExpName')+'" data-unit="%" style="cursor:pointer"></circle>'; }).join('');
  var gl = ''; [0, 0.25, 0.5, 0.75, 1].forEach(function(f){ var v = y1-f*(y1-y0), y = pt+f*ih; gl += '<line x1="'+pl+'" y1="'+y+'" x2="'+(W-pr)+'" y2="'+y+'" stroke="var(--nm-line)" stroke-width="1"/><text x="'+(pl-10)+'" y="'+(y+4)+'" font-size="12" fill="var(--nm-text-3)" text-anchor="end">'+v.toFixed(1)+'</text>'; });
  var zeroY = yo(0); if(zeroY >= pt && zeroY <= pt+ih){ gl += '<line x1="'+pl+'" y1="'+zeroY.toFixed(1)+'" x2="'+(W-pr)+'" y2="'+zeroY.toFixed(1)+'" stroke="var(--nm-text-3)" stroke-width="1.5" stroke-dasharray="4 4" opacity=".6"/>'; }
  var li=[], ly='', yrc=0; pts.forEach(function(p,i){ var y = p.t.slice(0,4); if(i===0||y!==ly){ if(yrc%2===0) li.push(i); yrc++; ly=y; } });
  var xl = li.map(function(i){ return '<text x="'+xo(i).toFixed(1)+'" y="'+(H-10)+'" font-size="12" fill="var(--nm-text-3)" text-anchor="middle">'+pts[i].t.slice(0,4)+'</text>'; }).join('');
  function calcDelta(key){ var series = pts.filter(function(p){ return p[key]!==null; }); if(series.length < 2) return {d1:null, d2:null}; var lastP = series[series.length-1]; var prevP = series[series.length-2]; var d1 = lastP[key] - prevP[key]; var ty = String(parseInt(lastP.t.slice(0,4),10)-1) + '-' + lastP.t.slice(5); var yAgo = null; for(var i=series.length-1;i>=0;i--){ if(series[i].t === ty){ yAgo = series[i]; break; } } return {d1:d1, d2: yAgo ? lastP[key] - yAgo[key] : null}; }
  var revDelta = calcDelta('rev'), expDelta = calcDelta('exp');
  function deltaRow(name, delta){
    function arrow(v){ return v===null ? '—' : (v>0 ? '↑' : (v<0 ? '↓' : '−')); } function cls(v){ return v===null ? 'fl' : (v>0 ? 'up' : (v<0 ? 'dn' : 'fl')); } function txt(v){ return v===null ? '—' : (Math.abs(v).toFixed(1) + '%'); }
    return '<div style="display:flex;gap:8px;font-size:12px;"><div class="delta-box"><span style="color:var(--nm-text-3);font-size:11.5px;">'+App.utils.escapeHTML(name)+' · '+t('vsPrev')+'</span><span class="'+cls(delta.d1)+'" style="font-weight:600;">'+arrow(delta.d1)+' '+txt(delta.d1)+'</span></div><div class="delta-box"><span style="color:var(--nm-text-3);font-size:11.5px;">'+App.utils.escapeHTML(name)+' · '+t('vsYoY')+'</span><span class="'+cls(delta.d2)+'" style="font-weight:600;">'+arrow(delta.d2)+' '+txt(delta.d2)+'</span></div></div>';
  }
  card.innerHTML = '<div class="ct" style="display:flex;align-items:center;justify-content:space-between;"><div style="display:flex;align-items:center;gap:18px;font-size:12.5px;font-weight:500;color:var(--nm-text-2);"><span style="display:inline-flex;align-items:center;gap:5px;"><i style="width:14px;height:3px;border-radius:2px;background:var(--nm-fail);"></i>'+t('fiscalRevName')+'</span><span style="display:inline-flex;align-items:center;gap:5px;"><i style="width:14px;height:3px;border-radius:2px;background:var(--nm-c1);"></i>'+t('fiscalExpName')+'</span></div><span class="range">'+(mn.toFixed(1))+' ~ '+(mx.toFixed(1))+'</span></div>'
    + '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="xMidYMid meet">'+gl + '<path d="'+dRev+'" fill="none" stroke="var(--nm-fail)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/><path d="'+dExp+'" fill="none" stroke="var(--nm-c1)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>' + dotsRev + dotsExp + xl + '</svg>'
    + '<div style="display:flex;flex-direction:column;gap:6px;margin-top:10px;">' + deltaRow(t('fiscalRevShort'), revDelta) + deltaRow(t('fiscalExpShort'), expDelta) + '</div>';
  box.appendChild(card); bindTrendHover(box);
}
function renderTrendGroup(defs, boxId, rows){
  var box = App.$('#'+boxId); if(!box) return; box.innerHTML = '';
  var shown = rows.length>120 ? rows.slice(-120) : rows; var any = false;
  defs.forEach(function(d){ var has = shown.filter(function(r){ return !App.utils.isEmpty(r[d.k]); }).length; if(has < 2) return; any = true; renderTrendCard(d, shown, box); });
  if(!any){ box.innerHTML = '<div class="empty" style="grid-column:1/-1;">'+t('groupNoData')+'</div>'; return; }
  bindTrendHover(box);
}

var CHECK_W = { anchor: 0.25, tax: 0.20, def: 0.16, ic: 0.15, kq: 0.12, mm: 0.12 };
function pairGap(rows, a, b){ var o=[]; rows.forEach(function(r){ if(!App.utils.isEmpty(r[a]) && !App.utils.isEmpty(r[b])) o.push({t:r.time, gap:r[a]-r[b], a:r[a], b:r[b]}); }); return o; }

function checkAnchor(rows){
  var pts=[]; rows.forEach(function(r){ if(App.utils.isEmpty(r.gdp)) return; var a=[]; if(!App.utils.isEmpty(r.power)) a.push(r.power); if(!App.utils.isEmpty(r.freight)) a.push(r.freight); if(!App.utils.isEmpty(r.cement)) a.push(r.cement); if(!a.length) return; var m = a.reduce(function(x,y){return x+y;},0)/a.length; pts.push({t:r.time, gdp:r.gdp, anchor:m, gap:r.gdp-m}); });
  if(pts.length < 6) return {k:'anchor', n:t('chip1'), lv:'skip', msg:t('checkAnchorSkip')};
  var gaps = pts.map(function(p){ return p.gap; }); var rg = gaps.slice(-6).reduce(function(s,x){return s+x;},0)/Math.min(6, gaps.length);
  var pers=0, mx=0, dir=0; gaps.forEach(function(g){ if(Math.abs(g)>2){ var d = g>0 ? 1 : -1; if(d===dir) pers++; else pers=1; dir=d; if(pers>mx) mx=pers; } else { pers=0; dir=0; } });
  var lv='ok', msg='';
  if(rg > 3 && mx >= 4){ lv='fail'; msg = tr('checkAnchorFailHigh', {rg: rg.toFixed(1), mx: mx}); }
  else if(rg > 2){ lv='warn'; msg = tr('checkAnchorWarnHigh', {rg: rg.toFixed(1)}); }
  else if(rg < -3 && mx >= 4){ lv='warn'; msg = tr('checkAnchorFailLow', {rg: rg.toFixed(1), mx: mx}); }
  else if(rg < -2){ lv='warn'; msg = tr('checkAnchorWarnLow', {rg: rg.toFixed(1)}); }
  else { msg = tr('checkAnchorOk', {rg: rg.toFixed(1)}); }
  return {k:'anchor', n:t('chip1'), lv:lv, msg:msg, ev: tr('checkAnchorEv', {avg: (gaps.reduce(function(s,x){return s+x;},0)/gaps.length).toFixed(1), rg: rg.toFixed(1), mx: mx}), pts:pts};
}
function checkKeqiang(rows){
  var pts=[]; rows.forEach(function(r){ if(App.utils.isEmpty(r.gdp)) return; var a=[], w=[]; if(!App.utils.isEmpty(r.power)){ a.push(r.power); w.push(.40); } if(!App.utils.isEmpty(r.freight)){ a.push(r.freight); w.push(.25); } if(!App.utils.isEmpty(r.loan)){ a.push(r.loan); w.push(.35); } if(a.length < 2) return; var ws = w.reduce(function(x,y){return x+y;},0); var kq = a.reduce(function(s,v,i){ return s + v*w[i]; },0)/ws; pts.push({t:r.time, gap:r.gdp-kq}); });
  if(pts.length < 6) return {k:'kq', n:t('chip2'), lv:'skip', msg:t('checkKqSkip')};
  var g = pts.slice(-6).reduce(function(s,p){return s+p.gap;},0)/Math.min(6,pts.length); var lv='ok', msg='';
  if(Math.abs(g) > 2.5){ lv='fail'; msg = g>0 ? tr('checkKqFailHigh', {g: g.toFixed(1)}) : tr('checkKqFailLow', {g: Math.abs(g).toFixed(1)}); }
  else if(Math.abs(g) > 1.5){ lv='warn'; msg = tr('checkKqWarn', {g: g.toFixed(1)}); }
  else msg = tr('checkKqOk', {g: g.toFixed(1)});
  return {k:'kq', n:t('chip2'), lv:lv, msg:msg, ev: tr('checkKqEv', {g: g.toFixed(1)}), pts:pts};
}
function checkTax(rows){
  var pts=[]; rows.forEach(function(r){ if(!App.utils.isEmpty(r.tax) && !App.utils.isEmpty(r.nom)){ if(Math.abs(r.nom) > 50 || Math.abs(r.nom) < 0.5) return; pts.push({t:r.time, e:r.tax/r.nom, tax:r.tax, nom:r.nom}); } });
  if(pts.length < 6) return {k:'tax', n:t('chip3'), lv:'skip', msg:t('checkTaxSkip')};
  var recent = pts.slice(-6); var sorted = recent.map(function(p){ return p.e; }).sort(function(a,b){ return a-b; });
  var mid = Math.floor(sorted.length / 2); var e = (sorted.length % 2 === 0) ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  var detail = recent.map(function(p){ return p.t+': '+p.tax.toFixed(1)+'/'+p.nom.toFixed(1)+'='+p.e.toFixed(2); }).join(' ｜ ');
  var lv='ok', msg='';
  if(e < 0.5 || e > 1.6){ lv='fail'; msg = e < 0.5 ? tr('checkTaxFailLow', {e: e.toFixed(2)}) : tr('checkTaxFailHigh', {e: e.toFixed(2)}); }
  else if(e < 0.8 || e > 1.2){ lv='warn'; msg = tr('checkTaxWarn', {e: e.toFixed(2)}); }
  else { msg = tr('checkTaxOk', {e: e.toFixed(2)}); }
  return {k:'tax', n:t('chip3'), lv:lv, msg:msg, ev: tr('checkTaxEv', {e: e.toFixed(2), detail: detail})};
}
function checkDeflator(rows){
  var pts=[]; rows.forEach(function(r){ if(!App.utils.isEmpty(r.gdp) && !App.utils.isEmpty(r.nom) && !App.utils.isEmpty(r.ppi) && !App.utils.isEmpty(r.cpi)){ var imp = r.nom - r.gdp, ref = r.ppi*.7 + r.cpi*.3; pts.push({t:r.time, gap:imp-ref}); } });
  if(pts.length < 6) return {k:'def', n:t('chip4'), lv:'skip', msg:t('checkDefSkip')};
  var g = pts.slice(-6).reduce(function(s,p){return s+p.gap;},0)/Math.min(6,pts.length); var lv='ok', msg='';
  if(Math.abs(g) > 2.5){ lv='fail'; msg = tr('checkDefFail', {g: g.toFixed(1)}); }
  else if(Math.abs(g) > 1.5){ lv='warn'; msg = tr('checkDefWarn', {g: g.toFixed(1)}); }
  else msg = tr('checkDefOk', {g: g.toFixed(1)});
  return {k:'def', n:t('chip4'), lv:lv, msg:msg, ev: tr('checkDefEv', {g: g.toFixed(1)})};
}
function checkInvCons(rows){
  var pts = pairGap(rows, 'fai', 'retail'); if(pts.length < 6) return {k:'ic', n:t('chip5'), lv:'skip', msg:t('checkIcSkip')};
  var g = pts.slice(-6).reduce(function(s,p){return s+p.gap;},0)/Math.min(6,pts.length); var lv='ok', msg='';
  if(g > 8){ lv='warn'; msg = tr('checkIcWarnHigh', {g: g.toFixed(1)}); }
  else if(g < -8){ lv='warn'; msg = tr('checkIcWarnLow', {g: Math.abs(g).toFixed(1)}); }
  else msg = tr('checkIcOk', {g: g.toFixed(1)});
  return {k:'ic', n:t('chip5'), lv:lv, msg:msg, ev: tr('checkIcEv', {g: g.toFixed(1)})};
}
function checkMoney(rows){
  var pts = pairGap(rows, 'm2', 'nom'); if(pts.length < 6) return {k:'mm', n:t('chip6'), lv:'skip', msg:t('checkMmSkip')};
  var g = pts.slice(-6).reduce(function(s,p){return s+p.gap;},0)/Math.min(6,pts.length); var lv='ok', msg='';
  if(Math.abs(g) > 6){ lv='warn'; msg = tr('checkMmWarn', {g: g.toFixed(1)}); }
  else msg = tr('checkMmOk', {g: g.toFixed(1)});
  return {k:'mm', n:t('chip6'), lv:lv, msg:msg, ev: tr('checkMmEv', {g: g.toFixed(1)})};
}
function runChecks(rows){ return [checkAnchor(rows), checkKeqiang(rows), checkTax(rows), checkDeflator(rows), checkInvCons(rows), checkMoney(rows)]; }

function riskScore(checks){
  if(!checks || !checks.length) return {score:null, lv:'unknown', n:0, total:0};
  var anchorC = checks.filter(function(c){ return c.k==='anchor'; })[0]; var anchorFail = !!(anchorC && anchorC.lv === 'fail');
  var items = checks.map(function(c){ var lv = c.lv; if(anchorFail && c.k === 'kq' && lv === 'fail') lv = 'warn'; return { v: (CRED[lv] != null) ? CRED[lv] : CRED.skip, w: CHECK_W[c.k] || (1 / checks.length) }; });
  var cred = bucketMean(items); if(cred === null) return {score:null, lv:'unknown', n:0, total:checks.length};
  var s = Math.round(100 - cred); var n = checks.filter(function(c){ return c.lv !== 'skip'; }).length;
  return { score: s, lv: s>=60 ? 'high' : (s>=25 ? 'mid' : 'low'), n: n, total: checks.length };
}

function conflictSeries(rows){
  var out=[]; for(var t=5;t<rows.length;t++){ var sub = rows.slice(Math.max(0,t-11), t+1); var sc=[];
    ['power','freight','cement'].forEach(function(k){ var a = pairGap(sub, 'gdp', k); if(a.length>=3) sc.push(Math.abs(a.reduce(function(s,x){return s+x.gap;},0)/a.length)); });
    var tx=[]; sub.forEach(function(r){ if(!App.utils.isEmpty(r.tax) && !App.utils.isEmpty(r.nom) && Math.abs(r.nom)>0.5) tx.push(Math.abs(r.tax/r.nom - 1)); });
    if(tx.length>=3) sc.push((tx.reduce(function(s,x){return s+x;},0)/tx.length)*3);
    if(!sc.length) continue; var v = App.utils.clamp((sc.reduce(function(s,x){return s+x;},0)/sc.length)*20, 0, 100); out.push({t:rows[t].time, v:v});
  } return out;
}

var CHECK_TIPS = {}; function initCheckTips() { CHECK_TIPS = { anchor: TIPS.anchor, kq: TIPS.kq, tax: TIPS.tax_elast, def: TIPS.def, ic: TIPS.ic, mm: TIPS.mm }; }

function renderConflict(rows, checks, risk){
  var box = App.$('#conflictBox'); var col = {fail:'var(--nm-fail)', warn:'var(--nm-warn)', ok:'var(--nm-ok)', skip:'var(--nm-text-3)'};
  var st = risk.lv==='high' ? col.fail : (risk.lv==='mid' ? col.warn : col.ok); var circ = 2*Math.PI*50; var off = risk.score==null ? circ : circ*(1-risk.score/100);
  var title = risk.lv==='high' ? t('conflictHigh') : risk.lv==='mid' ? t('conflictMid') : risk.lv==='low' ? t('conflictLow') : t('dataInsufficient');
  var desc = risk.score==null ? t('emptyWait') : t('conflictDesc1') + risk.total + t('conflictDesc2') + t('conflictDesc3') + risk.score + t('conflictDesc4');
  var html = '<div class="card" style="margin-bottom:16px;"><div class="verdict"><div class="vring"><svg viewBox="0 0 120 120"><circle class="bgc" cx="60" cy="60" r="50"/><circle class="fgc" cx="60" cy="60" r="50" stroke="'+st+'" stroke-dasharray="'+circ+'" stroke-dashoffset="'+circ+'" data-off="'+off+'"/></svg><div class="vl"><span class="n" style="color:'+st+';">'+(risk.score==null?'—':risk.score)+'</span><span class="l">'+t('conflictIdx')+'</span></div></div><div class="vtxt"><div class="ti" style="color:'+st+';">'+title+'</div><div class="de">'+desc+'</div></div></div></div>';
  html += '<div class="nm-grid-2 big-grid">';
  var cs = conflictSeries(rows);
  if(cs.length >= 3){
    var W=560,H=200,pl=42,pr=14,pt=14,pb=26, iw=W-pl-pr, ih=H-pt-pb, n=cs.length; var xo = function(i){ return pl + (i/(n-1))*iw; }; var yo = function(v){ return pt + (1-v/100)*ih; };
    var d = cs.map(function(p,i){ return (i===0?'M':'L') + xo(i).toFixed(1) + ',' + yo(p.v).toFixed(1); }).join(' ');
    var dots = cs.map(function(p,i){ var c = p.v>=60 ? 'var(--nm-fail)' : (p.v>=25 ? 'var(--nm-warn)' : 'var(--nm-ok)'); return '<circle cx="'+xo(i).toFixed(1)+'" cy="'+yo(p.v).toFixed(1)+'" r="3" fill="'+c+'" data-time="'+App.utils.escapeHTML(p.t)+'" data-val="'+p.v+'" data-label="'+t('conflictIdx')+'" data-unit=""></circle>'; }).join('');
    var gl = ''; [0,25,50,75,100].forEach(function(v){ var y = yo(v); gl += '<line x1="'+pl+'" y1="'+y+'" x2="'+(W-pr)+'" y2="'+y+'" stroke="var(--nm-line)" stroke-width="1"/><text x="'+(pl-6)+'" y="'+(y+3)+'" font-size="10" fill="var(--nm-text-3)" text-anchor="end">'+v+'</text>'; });
    var yl='', ly=''; cs.forEach(function(p,i){ var y = p.t.slice(0,4); if(i===0||y!==ly){ yl += '<text x="'+xo(i).toFixed(1)+'" y="'+(H-8)+'" font-size="10" fill="var(--nm-text-3)" text-anchor="middle">'+y+'</text>'; ly=y; } });
    html += '<div class="big card"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;"><div style="font-size:14px;font-weight:600;color:var(--nm-text);">'+t('conflictTrendTitle') + badge(TIPS.conflict_trend) + '</div></div><div style="font-size:12px;color:var(--nm-text-3);line-height:1.6;margin-bottom:10px;">'+t('conflictTrendDesc')+'</div><svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none">'+gl+'<path d="'+d+'" fill="none" stroke="var(--nm-accent)" stroke-width="2" stroke-linejoin="round"/>'+ dots + yl + '</svg><div class="chart-legend"><span class="lg-item"><i class="lg-dot ok"></i>'+t('riskLow')+' &lt; 25</span><span class="lg-sep">·</span><span class="lg-item"><i class="lg-dot warn"></i>'+t('riskMid')+' 25 – 60</span><span class="lg-sep">·</span><span class="lg-item"><i class="lg-dot fail"></i>'+t('riskHigh')+' ≥ 60</span></div></div>';
  }
  var ac = checks.filter(function(c){ return c.k==='anchor'; })[0];
  if(ac && ac.pts && ac.pts.length >= 3){
    var W2=560,H2=200,pl2=42,pr2=14,pt2=14,pb2=26, iw2=W2-pl2-pr2, ih2=H2-pt2-pb2, n2=ac.pts.length; var vs = ac.pts.map(function(p){return p.gap;});
    var mn2 = Math.min.apply(null, vs.concat([-3])), mx2 = Math.max.apply(null, vs.concat([3])); var pd = (mx2-mn2)*.15; mn2 -= pd; mx2 += pd;
    var xo2 = function(i){ return pl2 + (i/(n2-1))*iw2; }; var yo2 = function(v){ return pt2 + (1-(v-mn2)/(mx2-mn2))*ih2; };
    var d2 = ac.pts.map(function(p,i){ return (i===0?'M':'L') + xo2(i).toFixed(1) + ',' + yo2(p.gap).toFixed(1); }).join(' ');
    var dots2 = ac.pts.map(function(p,i){ var c = Math.abs(p.gap)>2.5 ? 'var(--nm-fail)' : (Math.abs(p.gap)>1.5 ? 'var(--nm-warn)' : 'var(--nm-ok)'); return '<circle cx="'+xo2(i).toFixed(1)+'" cy="'+yo2(p.gap).toFixed(1)+'" r="3" fill="'+c+'" data-time="'+App.utils.escapeHTML(p.t)+'" data-val="'+p.gap+'" data-label="'+t('chip1')+'" data-unit="'+t('unit_pp')+'"></circle>'; }).join('');
    var gl2 = ''; [mn2,(mn2+mx2)/2,mx2].forEach(function(v){ var y = yo2(v); gl2 += '<line x1="'+pl2+'" y1="'+y+'" x2="'+(W2-pr2)+'" y2="'+y+'" stroke="var(--nm-line)" stroke-width="1"/><text x="'+(pl2-6)+'" y="'+(y+3)+'" font-size="10" fill="var(--nm-text-3)" text-anchor="end">'+v.toFixed(1)+'</text>'; });
    gl2 += '<line x1="'+pl2+'" y1="'+yo2(0)+'" x2="'+(W2-pr2)+'" y2="'+yo2(0)+'" stroke="var(--nm-accent)" stroke-dasharray="4 4" stroke-width="1.2" opacity=".5"/>';
    var yl2='', ly2=''; ac.pts.forEach(function(p,i){ var y = p.t.slice(0,4); if(i===0||y!==ly2){ yl2 += '<text x="'+xo2(i).toFixed(1)+'" y="'+(H2-8)+'" font-size="10" fill="var(--nm-text-3)" text-anchor="middle">'+y+'</text>'; ly2=y; } });
    html += '<div class="big card"><div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;"><div style="font-size:14px;font-weight:600;color:var(--nm-text);">'+t('anchorTrendTitle') + badge(TIPS.anchor_trend) + '</div></div><div style="font-size:12px;color:var(--nm-text-3);line-height:1.6;margin-bottom:10px;">'+t('anchorTrendDesc')+'</div><svg viewBox="0 0 '+W2+' '+H2+'" preserveAspectRatio="none">'+gl2+'<path d="'+d2+'" fill="none" stroke="var(--nm-accent)" stroke-width="2" stroke-linejoin="round"/>'+ dots2 + yl2 + '</svg><div class="chart-legend"><span class="lg-item"><i class="lg-dot fail"></i>'+t('anchorPos')+'<span class="lg-sub">'+t('anchorPosSub')+'</span></span><span class="lg-item"><i class="lg-dot ok"></i>'+t('anchorNeg')+'</span></div></div>';
  }
  html += '</div>';
  html += '<div class="nm-grid-2 check-grid">';
  checks.forEach(function(c){ var lv = c.lv; var tag = lv==='ok' ? t('tagOk') : (lv==='warn' ? t('tagWarn') : (lv==='fail' ? t('tagFail') : t('tagSkip'))); var titleHtml = '<span class="dot ' + lv + '"></span>' + App.utils.escapeHTML(c.n) + badge(CHECK_TIPS[c.k]); html += '<div class="check card"><div class="ch"><span class="cn">' + titleHtml + '</span><span class="tag '+lv+'">'+tag+'</span></div><div class="cm">'+App.utils.escapeHTML(c.msg)+'</div>' + (c.ev ? '<div class="ce">'+App.utils.escapeHTML(c.ev)+'</div>' : '') + '</div>'; });
  html += '</div>';
  box.innerHTML = html; bindTrendHover(box);
  triggerRingAnimations(box);
}

var COORD_W = { sync: 0.35, persist: 0.30, fiscal: 0.20, money: 0.15 };
function coordCred(c){ return c.lv==='skip'?CRED.skip:(c.score != null?c.score:(CRED[c.lv]!=null?CRED[c.lv]:CRED.skip)); }
function coordAggregate(checks){
  var veto = false; var syncC = checks.filter(function(c){ return c.k==='sync'; })[0]; var syncFail = !!(syncC && syncC.lv === 'fail');
  var cred = bucketMean(checks.map(function(c){ if(c.k === 'persist' && c.veto) veto = true; var v = coordCred(c); if(syncFail && c.k === 'persist' && c.lv === 'fail') v = CRED.warn; return { v: v, w: COORD_W[c.k] || 0 }; }));
  if(cred === null) return {total:null, vetoed:false}; var total = Math.round(100 - cred); var vetoed = false;
  if(veto && total > 59){ total = 59; vetoed = true; } return {total:total, vetoed:vetoed};
}
function coordSync(rows){
  var hits = []; var valid = 0;
  rows.forEach(function(r){
    var flags = [];
    if(!App.utils.isEmpty(r.gdp) && !App.utils.isEmpty(r.power)) flags.push({k:'D1', on:(r.gdp - r.power) > 2.0});
    if(!App.utils.isEmpty(r.gdp) && !App.utils.isEmpty(r.freight)) flags.push({k:'D2', on:(r.gdp - r.freight) > 2.0});
    if(!App.utils.isEmpty(r.tax) && !App.utils.isEmpty(r.nom) && Math.abs(r.nom) > 0.5) flags.push({k:'D3', on:(r.tax / r.nom) < 0.6});
    if(!App.utils.isEmpty(r.nom) && !App.utils.isEmpty(r.m2)) flags.push({k:'D4', on:(r.nom - r.m2) > 2.0});
    if(flags.length < 3) return; valid++;
    var on = flags.filter(function(f){ return f.on; }); if(on.length >= 3){ hits.push({ t:r.time, dims:on.map(function(f){ return f.k; }).join('、') }); }
  });
  if(valid < 6) return {k:'sync', n:t('coordSync'), lv:'skip', msg:t('coordSyncSkip')};
  var ratio = hits.length / valid; var lv, score;
  if(ratio >= 0.25){ lv='fail'; score=0; } else if(ratio >= 0.10){ lv='warn'; score=50; } else { lv='ok'; score=100; }
  var msg = lv==='fail' ? tr('coordSyncFail', {r: Math.round(ratio*100)}) : lv==='warn' ? tr('coordSyncWarn', {r: Math.round(ratio*100)}) : tr('coordSyncOk', {r: Math.round(ratio*100)});
  var ev = tr('coordSyncEv', {v: valid, h: hits.length});
  if(hits.length){ ev += tr('coordSyncEvEx', {ex: hits.slice(-4).map(function(h){ return h.t + ' 命中 ' + h.dims; }).join(' ｜ ')}); }
  return {k:'sync', n:t('coordSync'), lv:lv, msg:msg, ev:ev, score:score};
}
function coordPersist(rows){
  var pts = []; rows.forEach(function(r){ var g = []; if(!App.utils.isEmpty(r.gdp) && !App.utils.isEmpty(r.power)) g.push(Math.abs(r.gdp - r.power)); if(!App.utils.isEmpty(r.gdp) && !App.utils.isEmpty(r.freight)) g.push(Math.abs(r.gdp - r.freight)); if(!g.length) return; pts.push({ t:r.time, v:(g.reduce(function(s,x){return s+x;},0)/g.length) }); });
  if(pts.length < 20) return {k:'persist', n:t('coordPersistName'), lv:'skip', msg:t('coordPersistSkip'), veto:true};
  var recent = pts.slice(-12); var prev = pts.slice(-24, -12); var rAvg = recent.reduce(function(s,p){return s+p.v;},0)/recent.length; var pAvg = prev.length ? (prev.reduce(function(s,p){return s+p.v;},0)/prev.length) : rAvg;
  var run = 0, maxRun = 0; pts.forEach(function(p){ if(p.v > 2.0){ run++; if(run > maxRun) maxRun = run; } else run = 0; });
  var lv, score, trend, veto=false;
  if(rAvg > 2.0 && rAvg > pAvg + 0.5){ lv='fail'; score=0; trend='Expand'; }
  else if(rAvg > 2.0 && rAvg <= pAvg - 0.5){ lv='warn'; score=30; trend='HighNarrow'; }
  else if(rAvg > 2.0 && rAvg < pAvg - 0.1){ lv='fail'; score=20; trend='HighDown'; }
  else if(rAvg > 2.0){ lv='fail'; score=10; trend='High'; }
  else if(rAvg > 1.2 && Math.abs(rAvg - pAvg) < 0.5){ lv='warn'; score=50; trend='Mid'; }
  else if(rAvg < pAvg - 0.5){ lv='ok'; score=80; trend='Narrow'; if(rAvg < 1.2) veto=true; }
  else { lv='ok'; score=100; trend='Normal'; veto=true; }
  var tName = trend==='Expand' ? (window.I18N.lang()==='en'?'Expanding':'扩大') : trend==='HighNarrow' ? (window.I18N.lang()==='en'?'High Narrowing':'高位收窄') : trend==='HighDown' ? (window.I18N.lang()==='en'?'High Slight Down':'高位微降') : trend==='High' ? (window.I18N.lang()==='en'?'High Stable':'稳态高位') : trend==='Mid' ? (window.I18N.lang()==='en'?'Mid Stable':'稳态中等背离') : trend==='Narrow' ? (window.I18N.lang()==='en'?'Narrowing':'收窄') : (window.I18N.lang()==='en'?'Normal':'正常');
  var msg = tr('coordPersistMsg', {r: rAvg.toFixed(1), p: pAvg.toFixed(1), t: tName});
  if(trend==='Expand'){ msg += t('coordPersistExpand'); } else if(trend==='High'){ msg += t('coordPersistHigh'); } else if(trend==='HighDown'){ msg += tr('coordPersistDown', {p: pAvg.toFixed(1), r: rAvg.toFixed(1)}); } else if(trend==='Mid'){ msg += t('coordPersistMid'); } else if(trend==='HighNarrow'){ msg += t('coordPersistNarrow'); } else if(trend==='Narrow'){ msg += t('coordPersistNarrowOk'); } else { msg += t('coordPersistNormal'); }
  var ev = tr('coordPersistEv', {r: rAvg.toFixed(1), p: pAvg.toFixed(1), m: maxRun});
  return {k:'persist', n:t('coordPersistName'), lv:lv, msg:msg, ev:ev, score:score, trend:trend, veto:veto};
}
function coordFiscal(rows){
  var pts = []; rows.forEach(function(r){ if(!App.utils.isEmpty(r.tax) && !App.utils.isEmpty(r.nom) && Math.abs(r.nom) > 0.5){ pts.push({ t:r.time, e:r.tax / r.nom }); } });
  if(pts.length < 6) return {k:'fiscal', n:t('coordFiscal'), lv:'skip', msg:t('coordFiscalSkip')};
  var recent = pts.slice(-12).map(function(p){ return p.e; }); var sorted = recent.slice().sort(function(a,b){ return a-b; }); var mid = Math.floor(sorted.length/2); var med = (sorted.length % 2 === 0) ? (sorted[mid-1] + sorted[mid]) / 2 : sorted[mid];
  var lv, score;
  if(med < 0.4 || med > 1.8){ lv='fail'; score=0; } else if(med < 0.7 || med > 1.4){ lv='warn'; score=50; } else { lv='ok'; score=100; }
  var dir = med < 1 ? t('coordFiscalDirLow') : t('coordFiscalDirHigh'); var msg = lv==='fail' ? tr('coordFiscalFail', {m: med.toFixed(2), dir: dir}) : lv==='warn' ? tr('coordFiscalWarn', {m: med.toFixed(2)}) : tr('coordFiscalOk', {m: med.toFixed(2)});
  return {k:'fiscal', n:t('coordFiscal'), lv:lv, msg:msg, ev: tr('coordFiscalEv', {m: med.toFixed(2)}), score:score};
}
function coordMoney(rows){
  var pts = []; rows.forEach(function(r){ if(!App.utils.isEmpty(r.m2) && !App.utils.isEmpty(r.nom)) pts.push({ t:r.time, gap:r.m2 - r.nom }); });
  if(pts.length < 6) return {k:'money', n:t('coordMoney'), lv:'skip', msg:t('coordMoneySkip')};
  var recent = pts.slice(-12); var g = recent.reduce(function(s,p){return s+p.gap;},0)/recent.length; var abs = Math.abs(g); var lv, score;
  if(abs > 6){ lv='fail'; score=0; } else if(abs > 3){ lv='warn'; score=50; } else { lv='ok'; score=100; }
  var msg = lv==='fail' ? tr('coordMoneyFail', {g: g.toFixed(1)}) : lv==='warn' ? tr('coordMoneyWarn', {g: g.toFixed(1)}) : tr('coordMoneyOk', {g: g.toFixed(1)});
  return {k:'money', n:t('coordMoney'), lv:lv, msg:msg, ev: tr('coordMoneyEv', {g: g.toFixed(1)}), score:score};
}

function computeCoordChecks(rows){ return [ coordSync(rows), coordPersist(rows), coordFiscal(rows), coordMoney(rows) ]; }
function renderCoord(rows){
  var box = App.$('#coordBox'); if(!box) return;
  if(!rows.length){ box.innerHTML = '<div class="empty">'+t('emptyWait')+'</div>'; return; }
  var checks = computeCoordChecks(rows); var agg = coordAggregate(checks); var total = agg.total; var vetoed = agg.vetoed;
  var lv, title, color;
  if(total === null){ lv='skip'; title=t('dataInsufficient'); color='var(--nm-text-3)'; }
  else if(total >= 60){ lv='fail'; title=t('coordSysHigh'); color='var(--nm-fail)'; }
  else if(total >= 25){ lv='warn'; title=t('coordSysMid'); color='var(--nm-warn)'; }
  else { lv='ok'; title=t('coordSysLow'); color='var(--nm-ok)'; }
  var desc = total === null ? t('emptyWait') : (total >= 60 ? t('coordDescHigh') : total >= 25 ? t('coordDescMid') : t('coordDescLow'));
  var circ = 2 * Math.PI * 50; var off = total === null ? circ : circ * (1 - total / 100);
  var html = '<div class="coord-summary-card card"><div class="coord-gauge-wrap"><div class="coord-gauge"><svg viewBox="0 0 120 120"><circle class="cg-bg" cx="60" cy="60" r="50"/><circle class="cg-fg" cx="60" cy="60" r="50" stroke="'+color+'" stroke-dasharray="'+circ+'" stroke-dashoffset="'+circ+'" data-off="'+off+'"/></svg><div class="cg-val"><span class="n" style="color:'+color+';">'+(total === null ? '—' : total)+'</span><span class="l">'+t('coordTitle')+'</span></div></div></div>'
    + '<div class="coord-summary-main"><div class="coord-summary-title '+lv+'">'+title+'</div><div class="coord-summary-sub">'+t('coordSummary') + checks.filter(function(c){return c.lv!=='skip';}).length + t('coordSummary2')+'</div><div class="coord-summary-desc">'+desc + (vetoed ? '<br><span style="color:var(--nm-warn);">'+t('coordVeto')+'</span>' : '') + '</div><div class="coord-note">'+t('coordNote')+'</div></div></div>';
  html += '<div class="nm-grid-2 check-grid">';
  checks.forEach(function(c){ var lvv = c.lv; var tag = lvv==='ok' ? t('coordTagOk') : (lvv==='warn' ? t('coordTagWarn') : (lvv==='fail' ? t('coordTagFail') : t('coordTagSkip'))); var titleHtml = '<span class="dot ' + lvv + '"></span>' + App.utils.escapeHTML(c.n) + badge(TIPS[c.k]); html += '<div class="check card"><div class="ch"><span class="cn">' + titleHtml + '</span><span class="tag '+lvv+'">'+tag+'</span></div><div class="cm">'+App.utils.escapeHTML(c.msg)+'</div>' + (c.ev ? '<div class="ce">'+App.utils.escapeHTML(c.ev)+'</div>' : '') + '</div>'; });
  html += '</div>';
  var concl = [];
  if(total === null){ concl.push({c:'warn', t:t('dataInsufficient')}); } else {
    var top = checks.filter(function(c){ return c.lv!=='skip'; }).sort(function(a,b){ return (a.score||0)-(b.score||0); })[0];
    concl.push({c: lv==='fail'?'fail':(lv==='warn'?'warn':'ok'), t: tr('coordConclTitle', {s: total, t: title}) });
    if(top) concl.push({c:'info', t:t('coordShortboard') + '<strong>'+App.utils.escapeHTML(top.n)+'</strong>：'+App.utils.escapeHTML(top.msg)});
    var p = checks.filter(function(c){ return c.k==='persist'; })[0]; if(p && p.lv!=='skip'){ var pc = p.lv==='fail' ? 'fail' : (p.lv==='warn' ? 'warn' : 'info'); concl.push({c:pc, t:t('coordPersist')+App.utils.escapeHTML(p.msg)}); }
    if(vetoed) concl.push({c:'warn', t:t('coordVeto')});
  }
  concl.push({c:'info', t:t('coordNote')});
  html += '<div class="concl card" style="margin-top:16px;"><h3>'+t('coordHeader')+'</h3><ul>' + concl.map(function(c){ return '<li class="i-'+c.c+'">'+c.t+'</li>'; }).join('') + '</ul></div>';
  box.innerHTML = html;
  triggerRingAnimations(box);
}

function pickLast(rows, key){ for(var i=rows.length-1;i>=0;i--){ if(!App.utils.isEmpty(rows[i][key])) return {v:rows[i][key], t:rows[i].time}; } return {v:null, t:''}; }
function buildAnalysis(rows){
  if(!rows.length) return null; var last = rows[rows.length-1]; var pmi = pickLast(rows,'pmi').v; var gdp = pickLast(rows,'gdp').v; var ppi = pickLast(rows,'ppi').v; var cpi = pickLast(rows,'cpi').v; var m1m2 = pickLast(rows,'m1m2').v; var nom = pickLast(rows,'nom').v;
  var ppi_cpi = (!App.utils.isEmpty(ppi) && !App.utils.isEmpty(cpi)) ? +(ppi-cpi).toFixed(1) : pickLast(rows,'ppi_cpi').v;
  function anchorScore(def, v){ if(App.utils.isEmpty(v) || !def) return null; if(def.t==='lin') return App.utils.clamp((v-def.lo)/(def.hi-def.lo)*100, 0, 100); return null; }
  var dims = [ {k:'pmi', n:t('dimPmi'), c:'var(--nm-c1)', prior:.30, v:pmi, a:{t:'lin',lo:40,hi:60}}, {k:'gdp', n:t('dimGdp'), c:'var(--nm-c2)', prior:.25, v:gdp, a:{t:'lin',lo:-2,hi:8}}, {k:'ppi_cpi', n:t('dimPpiCpi'), c:'var(--nm-c3)', prior:.25, v:ppi_cpi, a:null}, {k:'m1m2', n:t('dimM1M2'), c:'var(--nm-c4)', prior:.20, v:m1m2, a:{t:'lin',lo:-6,hi:6}} ];
  var totalW = 0; dims.forEach(function(d){ if(App.utils.isEmpty(d.v)){ d.val = null; return; } var s = d.a ? anchorScore(d.a, d.v) : (d.k==='ppi_cpi' ? App.utils.clamp(100 - Math.abs(d.v)*25, 0, 100) : 50); d.val = App.utils.clamp(s, 0, 100); totalW += d.prior; });
  if(totalW > 0){ dims.forEach(function(d){ d.showW = d.val!==null ? Math.round((d.prior/totalW)*100) : 0; }); } else dims.forEach(function(d){ d.showW = 0; });
  var comp=0, ws=0; dims.forEach(function(d){ if(d.val!==null){ comp += d.val*d.prior; ws += d.prior; } }); comp = ws ? Math.round(comp/ws) : null;
  var wDev = dims.filter(function(d){ return d.val!==null; }).map(function(d){ return Math.abs(d.prior-0.25); }); var devPct = wDev.length ? Math.round((wDev.reduce(function(s,x){return s+x;},0)/wDev.length)*100) : null;
  return { last:last, pmi:pmi, gdp:gdp, ppi:ppi, cpi:cpi, ppi_cpi:ppi_cpi, m1m2:m1m2, nom:nom, dims:dims, comp:comp, devPct:devPct };
}
var DIM_TIPS = {}; function initDimTips() { DIM_TIPS = { pmi: TIPS.dim_pmi, gdp: TIPS.dim_gdp, ppi_cpi: TIPS.dim_ppi_cpi, m1m2: TIPS.dim_m1m2 }; }

function renderAnalysis(rows, checks, risk){
  var box = App.$('#analysisBox'); var a = buildAnalysis(rows);
  if(!a){ box.innerHTML = '<div class="empty">'+t('emptyWait')+'</div>'; return; }
  var html = '';
  if(risk.lv==='high'){ html += '<div class="warn-banner card"><span class="ic">⚠</span><div>'+t('analysisWarnHigh')+'</div></div>'; }
  else if(risk.lv==='mid'){ html += '<div class="warn-banner card"><span class="ic">⚑</span><div>'+t('analysisWarnMid')+'</div></div>'; }
  var circ = Math.PI*40; var DIM_THRESH = { pmi: 50, gdp: 60, ppi_cpi: 75, m1m2: 50 };
  var dimsHtml = a.dims.map(function(d){
    var labelHtml = App.utils.escapeHTML(d.n) + badge(DIM_TIPS[d.k]); var markHtml = '';
    if(DIM_THRESH[d.k] != null){ var ang = Math.PI * (1 - DIM_THRESH[d.k]/100); var xi = (50 + 36*Math.cos(ang)).toFixed(2); var yi = (50 - 36*Math.sin(ang)).toFixed(2); var xj = (50 + 44*Math.cos(ang)).toFixed(2); var yj = (50 - 44*Math.sin(ang)).toFixed(2); markHtml = '<line x1="'+xi+'" y1="'+yi+'" x2="'+xj+'" y2="'+yj+'" stroke="var(--nm-text-3)" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>'; }
    if(d.val===null){ return '<div class="dim"><div class="ring"><svg viewBox="0 0 100 56"><path class="rbg" d="M 10 50 A 40 40 0 0 1 90 50"/>' + markHtml + '</svg><div class="vl" style="font-size:14px;color:var(--nm-text-3);">—</div></div><div class="lb">'+labelHtml+'</div><div class="sc">'+t('dimDataMissing')+'</div></div>'; }
    var off = circ*(1-d.val/100); var adj = d.a ? App.utils.clamp((d.v-d.a.lo)/(d.a.hi-d.a.lo)*100, 0, 100) : 50;
    return '<div class="dim"><div class="ring"><svg viewBox="0 0 100 56"><path class="rbg" d="M 10 50 A 40 40 0 0 1 90 50"/><path class="rfg" d="M 10 50 A 40 40 0 0 1 90 50" stroke="'+d.c+'" stroke-dasharray="'+circ+'" stroke-dashoffset="'+circ+'" data-off="'+off+'"/>' + markHtml + '</svg><div class="vl">'+Math.round(d.val)+'</div></div><div class="lb">'+labelHtml+'</div><div class="sc">'+t('dimAbs')+Math.round(adj)+' · '+t('dimWeight')+d.showW+'%</div></div>';
  }).join('');
  html += '<div class="card" style="margin-bottom:16px;"><div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:16px;flex-wrap:wrap;"><div style="font-size:14px;font-weight:600;">'+t('dimTitle')+(a.comp!==null ? ' · '+t('dimScore')+a.comp : '')+'</div><div style="font-size:12px;color:var(--nm-text-3);">'+t('dimNote')+'</div></div><div class="dims">'+dimsHtml+'</div></div>';
  var pval = a.ppi_cpi; var ppiPct = !App.utils.isEmpty(pval) ? App.utils.clamp(50 + pval*12, 4, 96) : 50;
  var pdesc = App.utils.isEmpty(pval) ? t('dimDataMissing') : pval>1.5 ? t('profitDescHigh') : pval>0.5 ? t('profitDescMid') : pval<-1 ? t('profitDescNeg') : pval<-0.5 ? t('profitDescNegMid') : t('profitDescBal');
  var c1 = App.utils.isEmpty(a.m1m2) ? {s:'warn',t:t('dimDataMissing')} : (a.m1m2>0 ? {s:'ok',t:window.I18N.lang()==='en'?'Turned Positive':'已转正'} : (a.m1m2>-0.5 ? {s:'warn',t:window.I18N.lang()==='en'?'Narrowing':'收窄中'} : {s:'fail',t:window.I18N.lang()==='en'?'Not Improved':'未改善'}));
  var c2 = App.utils.isEmpty(pval) ? {s:'warn',t:t('dimDataMissing')} : (pval<0 ? {s:'ok',t:window.I18N.lang()==='en'?'Turned Negative':'已转负'} : (pval<0.5 ? {s:'warn',t:window.I18N.lang()==='en'?'Narrowing':'收窄中'} : {s:'fail',t:window.I18N.lang()==='en'?'Not Improved':'未改善'}));
  var c3 = (!App.utils.isEmpty(a.pmi)&&!App.utils.isEmpty(pval)&&a.pmi>52&&pval<0.5) ? {s:'ok',t:window.I18N.lang()==='en'?'Profit Outpaces':'利润跑赢产出'} : ((!App.utils.isEmpty(a.pmi)&&!App.utils.isEmpty(pval)&&a.pmi>52&&pval>=0.5) ? {s:'fail',t:window.I18N.lang()==='en'?'No Profit Growth':'增产不增收'} : {s:'warn',t:window.I18N.lang()==='en'?'TBD':'待判断'});
  var c4 = App.utils.isEmpty(a.m1m2) ? {s:'warn',t:t('dimDataMissing')} : (a.m1m2>-0.5 ? {s:'ok',t:window.I18N.lang()==='en'?'Exp Improved':'预期改善'} : {s:'fail',t:window.I18N.lang()==='en'?'Exp Weak':'预期偏弱'});
  var pass = [c1,c2,c3,c4].filter(function(c){ return c.s==='ok'; }).length;
  var chain = [{n:1,name:t('chainWish'),s:c1.s,t:c1.t},{n:2,name:t('chainSpace'),s:c2.s,t:c2.t},{n:3,name:t('chainResult'),s:c3.s,t:c3.t},{n:4,name:t('chainLand'),s:c4.s,t:c4.t}];
  var chainNodes = chain.map(function(it,i){ var line = i<3 ? '<span class="cl-line '+(it.s==='ok'?'ok':'')+'"></span>' : ''; return '<div class="cn '+it.s+'"><span class="cd">'+it.n+'</span><span class="cl">'+it.name+'</span></div>'+line; }).join('');
  var chainMeaning = { [t('chainWish')]: t('chainWishDesc'), [t('chainSpace')]: t('chainSpaceDesc'), [t('chainResult')]: t('chainResultDesc'), [t('chainLand')]: t('chainLandDesc') };
  var chainRight = chain.map(function(it){ return '<div class="cr-row cr-'+it.s+'"><span class="cr-num">'+it.n+'</span><span class="cr-body"><span class="cr-name">'+App.utils.escapeHTML(it.name)+'：'+App.utils.escapeHTML(it.t)+'</span><span class="cr-desc">'+App.utils.escapeHTML(chainMeaning[it.name]||'')+'</span></span></div>'; }).join('');
  var pfRow = function(label, v){ if(App.utils.isEmpty(v)) return '<div class="pf-row"><span class="k">'+label+'</span><div style="flex:1;font-size:12px;color:var(--nm-text-3);">'+t('dimDataMissing')+'</div></div>'; var p = App.utils.clamp((v+6)/12*100, 3, 97); var col = v>2 ? 'var(--nm-fail)' : (v>0 ? 'var(--nm-warn)' : (v>-2 ? 'var(--nm-text-3)' : 'var(--nm-c1)')); return '<div class="pf-row"><span class="k">'+label+'</span><div class="tr"><i class="z" style="left:50%"></i><i class="d" style="left:'+p+'%;background:'+col+';"></i></div><span class="v">'+v.toFixed(1)+'%</span></div>'; };
  html += '<div class="nm-grid-2 grid3" style="margin-bottom:16px; align-items: stretch;">'
    + '<div class="panel card" style="display: flex; flex-direction: column; height: 100%;"><div class="ph"><span class="pt">'+t('profitTitle')+'</span><span class="pm">'+(App.utils.isEmpty(pval)?'—':pval.toFixed(1)+'pp')+'</span></div><div class="pb" style="flex: 1; display: flex; flex-direction: column; justify-content: center;"><div style="padding:12px 14px;border-radius:12px;box-shadow:var(--nm-in-sm);margin-bottom:12px;"><div style="display:flex;justify-content:space-between;font-size:12px;color:var(--nm-text-3);margin-bottom:6px;"><span>'+t('profitDown')+'</span><span>'+t('profitUp')+'</span></div><div style="position:relative;height:6px;border-radius:3px;background:var(--nm-bg);box-shadow:var(--nm-in-sm);"><i style="position:absolute;left:50%;top:-3px;width:2px;height:12px;margin-left:-1px;background:var(--nm-text-3);opacity:.5;"></i><i style="position:absolute;top:50%;transform:translate(-50%,-50%);left:'+ppiPct+'%;width:13px;height:13px;border-radius:50%;background:'+(pval>1.5?'var(--nm-fail)':(pval>.5?'var(--nm-warn)':(pval<-.5?'var(--nm-ok)':'var(--nm-text-3)')))+';border:2px solid var(--nm-bg);"></i></div></div><div style="font-size:13px;line-height:1.65;">'+App.utils.escapeHTML(pdesc)+'</div></div></div>'
    + '<div class="panel card" style="display: flex; flex-direction: column; height: 100%;"><div class="ph"><span class="pt">'+t('inflationTitle')+'</span><span class="pm">'+(!App.utils.isEmpty(a.ppi)&&!App.utils.isEmpty(a.cpi)?'OK':'—')+'</span></div><div class="pb" style="flex: 1; display: flex; flex-direction: column; justify-content: center;"><div style="padding:12px 14px;border-radius:12px;box-shadow:var(--nm-in-sm);margin-bottom:12px;"><div style="font-size:12px;color:var(--nm-text-3);text-align:center;letter-spacing:.06em;margin-bottom:8px;">'+t('inflationArrow')+'</div>'+ pfRow(t('inflationPpi'), a.ppi) + pfRow(t('inflationCpi'), a.cpi) + '</div><div style="font-size:13px;line-height:1.65;">'+t('inflationNote1')+(App.utils.isEmpty(a.m1m2)?'—':a.m1m2.toFixed(1))+t('inflationNote2')+'</div></div></div>'
    + '</div>'
    + '<div class="nm-grid-2 grid3" style="margin-bottom:16px; align-items: stretch;">'
      + '<div class="panel panel-vcenter card" style="display: flex; flex-direction: column; height: 100%;"><div class="ph"><span class="pt">'+t('chainTitle')+'</span><span class="pm">'+pass+'/4</span></div><div class="pb pb-center" style="flex: 1; display: flex; flex-direction: column; justify-content: center;"><div class="chain-verdict" style="margin-bottom:16px;">'+(pass>=3 ? t('chainPass') : (pass>=2 ? t('chainPart') : t('chainFail')))+'</div><div class="chain">'+chainNodes+'</div></div></div>'
      + '<div class="panel card" style="display: flex; flex-direction: column; height: 100%;"><div class="ph"><span class="pt">'+t('chainMean')+'</span><span class="pm">4'+t('chainStep')+'</span></div><div class="pb" style="flex: 1; display: flex; flex-direction: column; justify-content: center;"><div class="chain-right">'+chainRight+'</div></div></div>'
    + '</div>';
  var wtHtml = a.dims.filter(function(d){ return d.val!==null; }).map(function(d){ return '<div class="wt"><span class="n">'+App.utils.escapeHTML(d.n)+'</span><span class="b"><i style="width:'+d.showW+'%"></i></span><span class="v">'+d.showW+'%</span></div>'; }).join('');
  var wtNote = a.devPct===null ? t('weightPrior') : (a.devPct<12 ? tr('weightOk', {p: a.devPct}) : tr('weightDevS', {p: a.devPct}));
  html += '<div class="panel card" style="margin-bottom:16px;"><div class="ph"><span class="pt">'+t('weightTitle')+'</span><span class="pm">'+(a.devPct===null?t('weightPrior'):t('weightDev')+a.devPct+'%')+'</span></div><div class="pb">'+wtHtml+'<div class="note">'+App.utils.escapeHTML(wtNote)+'</div></div></div>';
  var concl = [];
  if(risk.lv==='high'){ concl.push({c:'fail', t:t('conclDataLow') + risk.score + t('conclDataLow2')}); }
  else if(risk.lv==='mid'){ concl.push({c:'warn', t:t('conclDataMid') + risk.score + t('conclDataMid2')}); }
  else if(risk.lv==='low'){ concl.push({c:'ok', t:t('conclDataHigh') + risk.score + t('conclDataHigh2')}); }
  if(a.gdp!==null){ concl.push({c:'info', t:t('conclLatest')+App.utils.escapeHTML(a.last.time)+t('conclGdp')+a.gdp.toFixed(1)+'%</strong>' + (!App.utils.isEmpty(a.pmi) ? '，PMI '+a.pmi.toFixed(1)+(a.pmi>=50?t('conclPmiAbove'):t('conclPmiBelow')) : '') + '。'}); }
  if(!App.utils.isEmpty(a.ppi_cpi)){ concl.push({c:Math.abs(a.ppi_cpi)>1.5?'warn':'info', t:t('conclPpiCpi')+a.ppi_cpi.toFixed(1)+'pp</strong>' + (a.ppi_cpi>1.5 ? t('conclPpiCpiHigh') : (a.ppi_cpi<-1 ? t('conclPpiCpiLow') : t('conclPpiCpiBal')))}); }
  if(!App.utils.isEmpty(a.m1m2)){ concl.push({c:a.m1m2>-0.5?'ok':'warn', t:t('conclM1M2')+a.m1m2.toFixed(1)+'pp</strong>' + (a.m1m2>0 ? t('conclM1M2High') : (a.m1m2>-0.5 ? t('conclM1M2Mid') : t('conclM1M2Low')))}); }
  concl.push({c:'info', t:t('conclObs1')+rows.length+t('conclObs2')});
  html += '<div class="concl card"><h3>'+t('conclTitle')+'</h3><ul>' + concl.map(function(c){ return '<li class="i-'+c.c+'">'+c.t+'</li>'; }).join('') + '</ul></div>';
  box.innerHTML = html;
  triggerRingAnimations(box);
}

var RISK_WIN = 24;
function riskTotal(rows, fullHistory){
  var checks = runChecks(rows); var risk = riskScore(checks); var coords = computeCoordChecks(rows);
  if(fullHistory && fullHistory !== rows){ var pFull = coordPersist(fullHistory); coords = coords.map(function(c){ return c.k === 'persist' ? pFull : c; }); }
  var agg = coordAggregate(coords); var rs = risk.score; var cs = agg.total; var total;
  if(rs == null && cs == null) total = null; else if(rs == null) total = cs; else if(cs == null) total = rs; else total = Math.round(rs * 0.55 + cs * 0.45);
  return { risk: risk, riskScore: rs, coordScore: cs, coordVetoed: agg.vetoed, total: total, checks: checks, coords: coords };
}
function riskSeries(rows){
  var out = []; if(rows.length < 14) return out;
  for(var t = 11; t < rows.length; t++){ var subWin = rows.slice(Math.max(0, t - RISK_WIN + 1), t + 1); var subAll = rows.slice(0, t + 1); out.push({ t: rows[t].time, total: riskTotal(subWin, subAll).total, cum: riskTotal(subAll).total }); } return out;
}
function riskTrendHtml(series){
  if(!series || series.length < 3) return ''; var W = 1360, H = 250, pl = 54, pr = 24, pt = 16, pb = 36; var iw = W - pl - pr, ih = H - pt - pb, n = series.length;
  var xo = function(i){ return pl + (n === 1 ? iw / 2 : (i / (n - 1)) * iw); }; var yo = function(v){ return pt + (1 - App.utils.clamp(v, 0, 100) / 100) * ih; };
  var svg = ''; [0, 25, 60, 100].forEach(function(v){ var y = yo(v); svg += '<line x1="' + pl + '" y1="' + y.toFixed(1) + '" x2="' + (W - pr) + '" y2="' + y.toFixed(1) + '" stroke="var(--nm-line)" stroke-width="1"/><text x="' + (pl - 8) + '" y="' + (y + 4).toFixed(1) + '" font-size="11" fill="var(--nm-text-3)" text-anchor="end">' + v + '</text>'; });
  function pathOf(key){ var d = '', pen = false; series.forEach(function(p, i){ if(p[key] == null){ pen = false; return; } d += (pen ? 'L' : 'M') + xo(i).toFixed(1) + ',' + yo(p[key]).toFixed(1) + ' '; pen = true; }); return d; }
  var xl = '', ly = '', lastLabelX = -1e9;
  series.forEach(function(p, i){ var y = p.t.slice(0, 4); if(y !== ly){ var x = xo(i); if(x - lastLabelX >= 32){ xl += '<text x="' + x.toFixed(1) + '" y="' + (H - 12) + '" font-size="11" fill="var(--nm-text-3)" text-anchor="middle">' + y + '</text>'; lastLabelX = x; } ly = y; } });
  var dots = series.map(function(p, i){ if(p.total == null) return ''; var cx = xo(i).toFixed(1), cy = yo(p.total).toFixed(1); return '<circle cx="' + cx + '" cy="' + cy + '" r="10" fill="transparent" data-time="' + App.utils.escapeHTML(p.t) + '" data-val="' + p.total + '" data-label="'+t('riskTrendCur')+'" data-unit=" (24)" data-val2="' + (p.cum == null ? '' : p.cum) + '" data-label2="'+t('riskTrendHist')+'" data-unit2=" (All)"></circle>'; }).join('');
  var last = series[series.length - 1]; var lc = last.total == null ? 'var(--nm-text-3)' : (last.total >= 60 ? 'var(--nm-fail)' : (last.total >= 25 ? 'var(--nm-warn)' : 'var(--nm-ok)')); var lcum = 'var(--nm-c1)';
  return '<div class="risk-trend card"><div class="risk-trend-head"><span class="t">'+t('riskTrendTitle') + badge(t('riskTrendTip')) + '</span><span class="v">'+t('riskTrendCur')+' <b style="color:' + lc + ';">' + (last.total == null ? '—' : last.total) + '</b>/100 · '+t('riskTrendHist')+' <b style="color:' + lcum + ';">' + (last.cum == null ? '—' : last.cum) + '</b>/100</span></div>'
    + '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet">' + svg + '<path d="' + pathOf('cum') + '" fill="none" stroke="var(--nm-c1)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" opacity=".85"/><path d="' + pathOf('total') + '" fill="none" stroke="var(--nm-fail)" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>' + dots + xl + '</svg>'
    + '<div class="chart-legend"><span class="lg-item"><i style="width:14px;height:3px;border-radius:2px;background:var(--nm-fail);"></i>'+t('riskTrendCurLabel')+'</span><span class="lg-item"><i style="width:14px;height:3px;border-radius:2px;background:var(--nm-c1);"></i>'+t('riskTrendHistLabel')+'</span><span class="lg-sep">·</span><span class="lg-item"><i class="lg-dot ok"></i>'+t('riskLow')+' &lt; 25</span><span class="lg-sep">·</span><span class="lg-item"><i class="lg-dot warn"></i>'+t('riskMid')+' 25 – 60</span><span class="lg-sep">·</span><span class="lg-item"><i class="lg-dot fail"></i>'+t('riskHigh')+' ≥ 60</span></div></div>';
}
function renderRiskTrend(boxId, rows){ var box = App.$('#'+boxId); if(!box) return; if(!rows.length){ box.innerHTML = ''; return; } var series = riskSeries(rows); box.innerHTML = riskTrendHtml(series); bindTrendHover(box); }

function renderOverview(rows){
  var box = App.$('#overviewBox'); if(!box) return;
  if(!rows.length){ box.innerHTML = '<div class="empty">'+t('emptyWait')+'</div>'; return; }
  var rt = riskTotal(rows); var total = rt.total; var circ = 2 * Math.PI * 50; var winRows = rows.length > RISK_WIN ? rows.slice(rows.length - RISK_WIN) : rows;
  var rtWin = riskTotal(winRows, rows); var curScore = rtWin.total;
  var lv, title, color;
  if(total === null){ lv = 'skip'; title = t('dataInsufficient'); color = 'var(--nm-text-3)'; } else if(total >= 60){ lv = 'fail'; title = t('riskHigh'); color = 'var(--nm-fail)'; } else if(total >= 25){ lv = 'warn'; title = t('riskMid'); color = 'var(--nm-warn)'; } else { lv = 'ok'; title = t('riskLow'); color = 'var(--nm-ok)'; }
  var curTitle, curColor;
  if(curScore === null){ curTitle = t('dataInsufficient'); curColor = 'var(--nm-text-3)'; } else if(curScore >= 60){ curTitle = t('riskHigh'); curColor = 'var(--nm-fail)'; } else if(curScore >= 25){ curTitle = t('riskMid'); curColor = 'var(--nm-warn)'; } else { curTitle = t('riskLow'); curColor = 'var(--nm-ok)'; }
  var off = total === null ? circ : circ * (1 - total / 100); var offCur = curScore === null ? circ : circ * (1 - curScore / 100);
  var dotPos = total === null ? 0 : App.utils.clamp(total, 0, 100); var dotPosCur = curScore === null ? 0 : App.utils.clamp(curScore, 0, 100);
  var diffTxt = ''; if(curScore != null && total != null){ var d = curScore - total; if(d > 2) diffTxt = tr('overallDiffHigh', {d: Math.abs(d)}); else if(d < -2) diffTxt = tr('overallDiffLow', {d: Math.abs(d)}); else diffTxt = tr('overallDiffSame', {d: Math.abs(d)}); }
  var spanStart = rows.length ? rows[0].time : ''; var winN = Math.min(RISK_WIN, rows.length);
  var prevTotal = null, prevCur = null, prevTime = '', prevRs = null, prevCs = null;
  if(rows.length > 1){ var prevRows = rows.slice(0, -1); var prevWin = prevRows.length > RISK_WIN ? prevRows.slice(prevRows.length - RISK_WIN) : prevRows; prevCur = riskTotal(prevWin, prevRows).total; prevTime = prevRows[prevRows.length-1].time; var prevRT = riskTotal(prevRows); prevTotal = prevRT.total; prevRs = prevRT.riskScore; prevCs = prevRT.coordScore; }
  function timeStr(tm){ return App.utils.escapeHTML(tm.slice(0,4)) + t('overallYear') + parseInt(tm.slice(5),10) + t('overallMonth'); }
  var html = '<div class="nm-grid-2 ov-row ov-row-2">';
  html += '<div class="ov-cell card"><div class="ov-cell-title" style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;"><span>'+t('riskTrendHistLabel')+'</span>' + (prevTotal != null ? '<span style="font-size:12.5px;font-weight:500;color:var(--nm-text-3);">'+t('overallPrev') + prevTotal + t('overallPrev2') + timeStr(prevTime) + '</span>' : '') + '</div><div class="ov-cell-gauge-wrap"><div class="ov-cell-gauge"><svg viewBox="0 0 120 120"><circle class="cg-bg" cx="60" cy="60" r="50"/><circle class="cg-fg" cx="60" cy="60" r="50" stroke="'+color+'" stroke-dasharray="'+circ+'" stroke-dashoffset="'+circ+'" data-off="'+off+'"/></svg><div class="cg-val"><span class="n" style="color:'+color+';">'+(total === null ? '—' : total)+'</span><span class="l">'+App.utils.escapeHTML(title)+'</span></div></div></div><div class="ov-cell-note"><b>'+t('overallCoverage')+'</b>：' + App.utils.escapeHTML(spanStart) + t('overallSince') + rows.length + t('overallPeriods') + '<br>'+t('overallReflect')+'</div><div class="ov-slider" style="margin-top:14px;"><i class="tick" style="left:25%;"></i><i class="tick" style="left:60%;"></i><i class="dot" style="left:'+dotPos+'%;background:'+color+';"></i></div><div class="ov-slider-ticks"><span>0</span><span>25</span><span>60</span><span>100</span></div></div>';
  html += '<div class="ov-cell card"><div class="ov-cell-title" style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;"><span>'+t('riskTrendCurLabel')+'</span>' + (prevCur != null ? '<span style="font-size:12.5px;font-weight:500;color:var(--nm-text-3);">'+t('overallPrev') + prevCur + t('overallPrev2') + timeStr(prevTime) + '</span>' : '') + '</div><div class="ov-cell-gauge-wrap"><div class="ov-cell-gauge"><svg viewBox="0 0 120 120"><circle class="cg-bg" cx="60" cy="60" r="50"/><circle class="cg-fg" cx="60" cy="60" r="50" stroke="'+curColor+'" stroke-dasharray="'+circ+'" stroke-dashoffset="'+circ+'" data-off="'+offCur+'"/></svg><div class="cg-val"><span class="n" style="color:'+curColor+';">'+(curScore === null ? '—' : curScore)+'</span><span class="l">'+App.utils.escapeHTML(curTitle)+'</span></div></div></div><div class="ov-cell-note"><b>'+t('overallRoll')+'</b>：'+t('overallLast') + winN + t('overallLastP') + '<br>' + App.utils.escapeHTML(diffTxt) + '</div><div class="ov-slider" style="margin-top:14px;"><i class="tick" style="left:25%;"></i><i class="tick" style="left:60%;"></i><i class="dot" style="left:'+dotPosCur+'%;background:'+curColor+';"></i></div><div class="ov-slider-ticks"><span>0</span><span>25</span><span>60</span><span>100</span></div></div>';
  html += '</div>';
  var rs = rt.riskScore; var cs = rt.coordScore; function duoColor(score){ if(score == null) return 'var(--nm-text-3)'; if(score >= 60) return 'var(--nm-fail)'; if(score >= 25) return 'var(--nm-warn)'; return 'var(--nm-ok)'; } var rsColor = duoColor(rs), csColor = duoColor(cs);
  var doneChecks = rt.checks.filter(function(c){ return c.lv !== 'skip'; }); var failChecks = doneChecks.filter(function(c){ return c.lv === 'fail'; }); var warnChecks = doneChecks.filter(function(c){ return c.lv === 'warn'; }); var failNames = failChecks.map(function(c){ return c.n; }).join('、');
  var rsDesc;
  if(rs == null) rsDesc = t('dataInsufficient'); else { rsDesc = doneChecks.length + t('overallDescRs1') + failChecks.length + t('overallDescRs2') + warnChecks.length + t('overallDescRs3'); if(failNames) rsDesc += t('overallDescRs4') + failNames + t('overallPeriods'); }
  var doneCoords = rt.coords.filter(function(c){ return c.lv !== 'skip'; }); var failCoords = doneCoords.filter(function(c){ return c.lv === 'fail'; }); var syncC = rt.coords.filter(function(c){ return c.k === 'sync'; })[0]; var persistC = rt.coords.filter(function(c){ return c.k === 'persist'; })[0];
  var csDesc;
  if(cs == null) csDesc = t('dataInsufficient'); else {
    csDesc = doneCoords.length + t('overallDescCs1') + failCoords.length + t('overallDescCs2');
    if(syncC && syncC.lv !== 'skip' && syncC.ev){ var mRatio = syncC.ev.match(/其中 (\d+) 个/); var mValid = syncC.ev.match(/有效时点 (\d+) 个/); if(mRatio && mValid){ var ratio = Math.round(parseInt(mRatio[1],10) / parseInt(mValid[1],10) * 100); csDesc += t('overallDescCs3') + ratio + t('overallDescCs4') + mRatio[1] + t('overallDescCs5'); } }
    if(persistC && persistC.trend){ var tflag = (persistC.trend==='High' || persistC.trend==='Mid' || persistC.trend==='HighNarrow' || persistC.trend==='HighDown') ? '⚠ ' : ''; csDesc += t('overallDescCs6') + tflag + persistC.trend + t('overallPeriods'); }
    if(rt.coordVetoed) csDesc += t('overallDescCs7');
  }
  html += '<div class="nm-grid-2 ov-row ov-row-2">';
  html += '<div class="ov-cell card"><div class="ov-cell-title" style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;"><span>'+t('overallConflict')+'</span>' + (prevRs != null ? '<span style="font-size:12.5px;font-weight:500;color:var(--nm-text-3);">'+t('overallPrev') + prevRs + t('overallPrev2') + timeStr(prevTime) + '</span>' : '') + '</div><div class="ov-cell-gauge-wrap"><div class="ov-cell-half" style="max-width:150px;"><svg viewBox="0 0 100 56"><path class="rbg" d="M 10 50 A 40 40 0 0 1 90 50"/><path class="rfg" d="M 10 50 A 40 40 0 0 1 90 50" stroke="'+rsColor+'" stroke-dasharray="'+(Math.PI*40)+'" stroke-dashoffset="'+(Math.PI*40)+'" data-off="'+(Math.PI*40*(1-(rs==null?0:rs)/100))+'"/></svg><div class="vl" style="color:'+rsColor+';">'+(rs == null ? '—' : rs)+'<span style="font-size:12px;color:var(--nm-text-2);font-weight:500;margin-left:1px;">/100</span></div></div></div><div class="ov-cell-note">'+App.utils.escapeHTML(rsDesc)+'</div><div class="ov-slider" style="margin-top:14px;"><i class="tick" style="left:25%;"></i><i class="tick" style="left:60%;"></i>' + (rs != null ? '<i class="dot" style="left:'+App.utils.clamp(rs,0,100)+'%;background:'+rsColor+';"></i>' : '') + '</div><div class="ov-slider-ticks"><span>0</span><span>25</span><span>60</span><span>100</span></div></div>';
  html += '<div class="ov-cell card"><div class="ov-cell-title" style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;"><span>'+t('overallCoord')+'</span>' + (prevCs != null ? '<span style="font-size:12.5px;font-weight:500;color:var(--nm-text-3);">'+t('overallPrev') + prevCs + t('overallPrev2') + timeStr(prevTime) + '</span>' : '') + '</div><div class="ov-cell-gauge-wrap"><div class="ov-cell-half" style="max-width:150px;"><svg viewBox="0 0 100 56"><path class="rbg" d="M 10 50 A 40 40 0 0 1 90 50"/><path class="rfg" d="M 10 50 A 40 40 0 0 1 90 50" stroke="'+csColor+'" stroke-dasharray="'+(Math.PI*40)+'" stroke-dashoffset="'+(Math.PI*40)+'" data-off="'+(Math.PI*40*(1-(cs==null?0:cs)/100))+'"/></svg><div class="vl" style="color:'+csColor+';">'+(cs == null ? '—' : cs)+'<span style="font-size:12px;color:var(--nm-text-2);font-weight:500;margin-left:1px;">/100</span></div></div></div><div class="ov-cell-note">'+App.utils.escapeHTML(csDesc)+'</div><div class="ov-slider" style="margin-top:14px;"><i class="tick" style="left:25%;"></i><i class="tick" style="left:60%;"></i>' + (cs != null ? '<i class="dot" style="left:'+App.utils.clamp(cs,0,100)+'%;background:'+csColor+';"></i>' : '') + '</div><div class="ov-slider-ticks"><span>0</span><span>25</span><span>60</span><span>100</span></div></div>';
  html += '</div>';
  var a = buildAnalysis(rows);
  if(a){
    var dimsCirc = Math.PI * 40; var DIM_THRESH = { pmi: 50, gdp: 60, ppi_cpi: 75, m1m2: 50 };
    html += '<div class="ov-row ov-row-4">';
    a.dims.forEach(function(d){
      var cellColor = d.c; var markHtml = '';
      if(DIM_THRESH[d.k] != null){ var ang = Math.PI * (1 - DIM_THRESH[d.k]/100); var xi = (50 + 36*Math.cos(ang)).toFixed(2); var yi = (50 - 36*Math.sin(ang)).toFixed(2); var xj = (50 + 44*Math.cos(ang)).toFixed(2); var yj = (50 - 44*Math.sin(ang)).toFixed(2); markHtml = '<line x1="'+xi+'" y1="'+yi+'" x2="'+xj+'" y2="'+yj+'" stroke="var(--nm-text-3)" stroke-width="1.6" stroke-linecap="round" opacity=".75"/>'; }
      var halfHtml;
      if(d.val === null){ halfHtml = '<div class="ov-cell-half"><svg viewBox="0 0 100 56"><path class="rbg" d="M 10 50 A 40 40 0 0 1 90 50"/>' + markHtml + '</svg><div class="vl" style="font-size:14px;color:var(--nm-text-3);">—</div></div>'; }
      else { var doff = dimsCirc * (1 - d.val/100); halfHtml = '<div class="ov-cell-half"><svg viewBox="0 0 100 56"><path class="rbg" d="M 10 50 A 40 40 0 0 1 90 50"/><path class="rfg" d="M 10 50 A 40 40 0 0 1 90 50" stroke="'+cellColor+'" stroke-dasharray="'+dimsCirc+'" stroke-dashoffset="'+dimsCirc+'" data-off="'+doff+'"/>' + markHtml + '</svg><div class="vl">'+Math.round(d.val)+'</div></div>'; }
      var shortNote = '';
      if(d.val !== null){ if(d.k === 'pmi'){ shortNote = d.v >= 50 ? t('overallPmiUp') : t('overallPmiDown'); } else if(d.k === 'gdp'){ shortNote = d.v >= 6 ? t('overallGdpHigh') : (d.v >= 4 ? t('overallGdpMid') : t('overallGdpLow')); } else if(d.k === 'ppi_cpi'){ shortNote = Math.abs(d.v) > 1.5 ? t('overallImbalance') : t('overallBalanced'); } else if(d.k === 'm1m2'){ shortNote = d.v > 0 ? t('overallCashHigh') : t('overallCashLow'); } } else { shortNote = t('dimDataMissing'); }
      html += '<div class="ov-cell card"><div class="ov-cell-gauge-wrap">' + halfHtml + '<div class="ov-cell-title" style="margin-top:8px;margin-bottom:0;text-align:center;">'+App.utils.escapeHTML(d.n)+'</div></div><div class="ov-cell-note">'+App.utils.escapeHTML(shortNote)+'</div></div>';
    });
    html += '</div><div class="ov-bare-note">' + t('overallFourD') + '</div>';
  }
  box.innerHTML = html;
  triggerRingAnimations(box);
}

function renderRangeTabs(){
  var box = document.getElementById('rangeTabs'); if(!box) return;
  box.innerHTML = RANGES.map(function(r){ return '<button data-r="'+r.k+'" class="'+(RANGE===r.k?'active':'')+'">'+t(r.n)+'</button>'; }).join('');
  App.$$('button', box).forEach(function(b){ b.addEventListener('click', function(){ RANGE = b.getAttribute('data-r'); analyze(DATA); b.blur(); }); });
}

function analyze(rows){
  initFields(); initTips(); initTips(); initCheckTips(); initDimTips();
  var checks = runChecks(rows); var risk = riskScore(checks);
  renderTable(); renderRangeTabs(); renderOverview(rows); var r = rangeRows(rows);
  renderRiskTrend('gRisk', rows); renderTrendGroup(MAIN, 'gMain', r); renderTrendGroup(OTHER, 'gOther', r); renderTrendGroup(ANCHOR, 'gAnchor', r); renderFiscalChart('gFiscal', r);
  renderConflict(rows, checks, risk); renderCoord(rows); renderAnalysis(rows, checks, risk); return risk;
}

/* ==========================================
   万能环滚动监听触发（新加的核心逻辑）
   ========================================== */
/* ==========================================
   万能环滚动监听触发（加强版：可反复滚动触发 + 悬停重播）
   ========================================== */
function triggerRingAnimations(box) {
  if(!box) return;
  // 找到所有的彩色圆环轨道
  var rings = box.querySelectorAll('.rfg, .vring .fgc, .coord-gauge .cg-fg, .ov-cell-gauge .cg-fg');
  if(!rings.length) return;

  // 1. 定义滚动进出视口的监听器
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      var ring = entry.target;
      
      // 如果进入视口，播放动画
      if (entry.isIntersecting) {
        var targetOffset = ring.getAttribute('data-off');
        if (targetOffset) {
          // 稍微给一丁点延迟，让它画得更有节奏
          setTimeout(function() {
            ring.style.strokeDashoffset = targetOffset;
          }, 100);
        }
      } else {
        // ★ 关键：如果滚出视口，瞬间把进度条退回 0
        var circ = ring.getAttribute('stroke-dasharray') || 314; 
        ring.style.strokeDashoffset = circ;
      }
    });
  }, { threshold: 0.1 }); // 露出 10% 就触发

  // 2. 遍历所有圆环
  rings.forEach(function(ring) {
    var circ = ring.getAttribute('stroke-dasharray') || 314; 
    
    // 每次重新生成 DOM，先把 offset 重置为最大（全隐藏），为动画做准备
    ring.style.strokeDashoffset = circ;
    
    // 让滚动监听器监视它
    observer.observe(ring);

    // ★ 关键：加上鼠标悬停交互，悬停哪个就重播哪个！
    // 先解绑旧的（防止重复绑定导致多次闪烁），再绑定
    var parent = ring.closest('.vring, .coord-gauge, .ov-cell-gauge, .dim .ring');
    if (parent) {
      parent.onmouseenter = function() {
        var targetOffset = ring.getAttribute('data-off');
        if (targetOffset) {
          // 瞬间归零
          ring.style.transition = 'none';
          ring.style.strokeDashoffset = circ;
          
          // 强制重绘
          void ring.offsetWidth;
          
          // 恢复过渡并画出来
          requestAnimationFrame(function(){
            ring.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
            ring.style.strokeDashoffset = targetOffset;
          });
        }
      };
    }
  });
}

function bindEvents(){
  var loading = null;
  function loadXLSX() { if (window.XLSX) return Promise.resolve(); if (!loading) { loading = new Promise(function (resolve, reject) { var s = document.createElement('script'); s.src = 'js/xlsx.full.min.js'; s.onload = resolve; s.onerror = reject; document.head.appendChild(s); }); } return loading; }
  document.addEventListener('click', function (e) { var btn = e.target && e.target.closest && e.target.closest('#run'); if (btn) loadXLSX(); }, true);
  document.addEventListener('dragover', function (e) { if (e.dataTransfer && e.dataTransfer.types.indexOf('Files') !== -1) loadXLSX(); }, true);
  document.addEventListener('drop', function (e) { if (e.dataTransfer && e.dataTransfer.types.indexOf('Files') !== -1) loadXLSX(); }, true);
  App.$('#run').addEventListener('click', function(){
    var t = App.$('#paste').value, st = App.$('#status');
    if(!t.trim()){ st.innerHTML = '<span class="err">请先粘贴数据</span>'; return; }
    try{
      var res = parse(t); DATA = res.rows; YEAR = ''; YPAGE = 0; save(); var risk = analyze(DATA);
      st.innerHTML = '<span class="ok">已解析 '+res.rows.length+' 期数据</span>' + (res.skip ? '（跳过 '+res.skip+' 行）' : '') + (risk.score!==null ? ' · 矛盾指数 '+risk.score+'/100' : '');
      App.utils.toast('已解析 '+res.rows.length+' 期数据'); App.$('#s-table').scrollIntoView({behavior:'smooth', block:'start'});
    }catch(e){ st.innerHTML = '<span class="err">'+App.utils.escapeHTML(e.message||String(e))+'</span>'; }
  });
  App.$('#demo').addEventListener('click', function(){ if(typeof BUILTIN === 'string' && BUILTIN){ App.$('#paste').value = BUILTIN; App.$('#run').click(); } });
  App.$('#clear').addEventListener('click', function(){
    if(!confirm('清空所有数据？')) return;
    DATA = []; YEAR = ''; YPAGE = 0; save(); App.$('#paste').value = ''; App.$('#status').textContent = '已清空。';
    renderTable(); ['gRisk','gMain','gOther','gAnchor','gFiscal'].forEach(function(id){ App.$('#'+id).innerHTML=''; });
    App.$('#overviewBox').innerHTML = '<div class="empty">'+t('emptyWait')+'</div>';
    App.$('#conflictBox').innerHTML = '<div class="empty">'+t('emptyWait')+'</div>';
    App.$('#coordBox').innerHTML = '<div class="empty">'+t('emptyWait')+'</div>';
    App.$('#analysisBox').innerHTML = '<div class="empty">'+t('emptyWait')+'</div>';
    App.utils.toast('已清空');
  });
  App.$('#fileInput').addEventListener('change', function(e){ if(e.target.files[0]) readFile(e.target.files[0]); e.target.value = ''; });
  var dz = App.$('#dropZone');
  if(dz){ ['dragenter','dragover'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); e.stopPropagation(); dz.classList.add('over'); }); }); ['dragleave','drop'].forEach(function(ev){ dz.addEventListener(ev, function(e){ e.preventDefault(); e.stopPropagation(); dz.classList.remove('over'); }); }); dz.addEventListener('drop', function(e){ var f = e.dataTransfer.files[0]; if(f) readFile(f); }); dz.addEventListener('click', function(e){ if(e.target.closest('label')) return; App.$('#fileInput').click(); }); }
  document.addEventListener('mouseover', function(e){ var el = closestBadge(e.target); if(el) showBadgeTip(el); }); document.addEventListener('mouseout', function(e){ var el = closestBadge(e.target); if(el) hideBadgeTip(); }); document.addEventListener('focusin', function(e){ var el = closestBadge(e.target); if(el) showBadgeTip(el); }); document.addEventListener('focusout', function(e){ var el = closestBadge(e.target); if(el) hideBadgeTip(); }); window.addEventListener('scroll', hideBadgeTip, { passive:true });
}

function readFile(file){
  var st = App.$('#status'); var name = (file.name||'').toLowerCase(); st.innerHTML = '正在读取 <b>'+App.utils.escapeHTML(file.name)+'</b>…';
  if(/\.(xlsx|xls)$/.test(name)){
    if(typeof XLSX === 'undefined'){ st.innerHTML = '<span class="err">SheetJS 未加载。</span>'; return; }
    var reader = new FileReader(); reader.onload = function(e){
      try{
        var data = new Uint8Array(e.target.result); var wb = XLSX.read(data, { type:'array', cellDates:false }); var ws = wb.Sheets[wb.SheetNames[0]];
        if(!ws) throw new Error('工作簿无工作表'); var matrix = XLSX.utils.sheet_to_json(ws, { header:1, raw:true, defval:'', blankrows:false });
        if(!matrix.length) throw new Error('工作表为空'); var headerRow = 0;
        for(var i=0;i<Math.min(matrix.length,8);i++){ var row = matrix[i].map(function(c){ return String(c==null?'':c); }); if(row.some(function(c){ return /时间|月份|日期|^date|^month/i.test(c); })){ headerRow = i; break; } }
        var lines = []; for(var r=headerRow; r<matrix.length; r++){ var cells = matrix[r].map(function(c){ if(c===null || c===undefined) return ''; if(typeof c === 'number'){ if(c > 18262 && c < 80000){ var d = new Date((c - 25569) * 86400000); if(!isNaN(d.getTime())) return d.getUTCFullYear()+'-'+App.utils.padZero(d.getUTCMonth()+1, 2); } return String(c); } return String(c).replace(/\t/g,' '); }); while(cells.length && cells[cells.length-1]==='') cells.pop(); if(cells.length) lines.push(cells.join('\t')); }
        App.$('#paste').value = lines.join('\n'); App.$('#run').click();
      }catch(err){ st.innerHTML = '<span class="err">Excel 解析失败：'+App.utils.escapeHTML(err.message||String(err))+'</span>'; }
    }; reader.onerror = function(){ st.innerHTML = '<span class="err">文件读取失败</span>'; }; reader.readAsArrayBuffer(file); return;
  }
  var tr = new FileReader(); tr.onload = function(e){ App.$('#paste').value = e.target.result; App.$('#run').click(); }; tr.onerror = function(){ st.innerHTML = '<span class="err">文件读取失败</span>'; }; tr.readAsText(file, 'utf-8');
}

App.econDiagnose = {
  init: function () {
    initFields(); initTips(); initCheckTips(); initDimTips(); bindEvents();
    var saved = load();
    if(saved.length){ DATA = saved; analyze(DATA); App.$('#status').innerHTML = '<span class="ok">'+t('statusLoaded')+' '+DATA.length+' '+t('statusPeriods')+'</span>'; }
    else if(typeof BUILTIN === 'string' && BUILTIN){ try{ var res = parse(BUILTIN); DATA = res.rows; YEAR = ''; YPAGE = 0; analyze(DATA); App.$('#status').innerHTML = '<span class="info">'+t('statusBuiltin')+' '+DATA.length+' '+t('statusPeriods')+'</span>'; }catch(e){ renderTable(); } }
    else { renderTable(); }
  },
  triggerRender: function() { if(DATA && DATA.length) analyze(DATA); else renderTable(); },
  analyze: analyze
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () { App.econDiagnose.init(); });
} else {
  App.econDiagnose.init();
}

})(window.App = window.App || {});