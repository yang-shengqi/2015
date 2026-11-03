/* ============================================================ 
 * color-generator.js —— 纯净全适配版（无粘连版）
 * ============================================================ */
(function (global) {
  'use strict';
  
  function t(key) {
    if (global.CO_I18N && typeof global.CO_I18N.t === 'function') {
      return global.CO_I18N.t(key);
    }
    return key;
  }
  
  var C = global.CO_Color;
  var H = global.CO_Harmony;
  var hexToRgb = C.hexToRgb;
  var matchColorInPalette = global.CO_Filter.matchColorInPalette;

  function generateTints(baseRgb) {
    var b = C.rgbToOklch(baseRgb);
    var steps = [80, 60, 50, 40, 20];
    return steps.map(function(pct) {
      var L, Cc;
      if (pct > 50) {
        var t = (pct - 50) / 50;
        L = b.L + (0.95 - b.L) * t;
        Cc = b.C * (1 - t * 0.8);
      } else if (pct < 50) {
        var t = (50 - pct) / 50;
        L = b.L - (b.L - 0.15) * t;
        Cc = b.C * (1 - t * 0.2);
      } else {
        L = b.L; Cc = b.C;
      }
      return C.oklchToRgb({ L: L, C: Cc, h: b.h });
    });
  }

  function generateRows(state, palette, ruleName) {
    var baseColorsRgb = [];
    var mainRgbForRule = state.mainRgb;
    
    var realTotalPixels = 1;
    if (state.hasImage && state.extracted && state.extracted.total) {
      realTotalPixels = state.extracted.total;
    }

    if (state.hasImage && state.baseImageColors && state.baseImageColors.length > 0) {
      baseColorsRgb = state.baseImageColors.map(function(c) { return hexToRgb(c.hex); });
      if (baseColorsRgb.length > 0) mainRgbForRule = baseColorsRgb[0];
    } else {
      baseColorsRgb = generateTints(state.mainRgb); 
      mainRgbForRule = state.mainRgb;
    }

    var genColors = [], genNames = [];
    var ruleColors = [], ruleNames = [];
    var cssNames = [], cssRuleNames = [];
    var namePool = palette || global.CO_Names.CN_PALETTE;

    var libChecked = document.querySelector('input[name="lib"]:checked');
    var libVal = libChecked ? libChecked.value : 'none';
    var libNameMap = {
      'cn': t('libNameCn'), 'morandi': t('libNameMorandi'),
      'jp': t('libNameJp'), 'cyber': t('libNameCyber'), 'none': t('libNameNone')
    };
    var currentLibName = libNameMap[libVal] || t('libNameNone');
    var usedNames = new Set();

    var ruleShortMap = {
      'comp': t('ruleCompShort'), 'analog': t('ruleAnalogShort'), 'triad': t('ruleTriadShort'),
      'split': t('ruleSplitShort'), 'square': t('ruleSquareShort'), 'mono': t('ruleMonoShort')
    };

    // ==========================================
    // 渲染第一层（真实占比 vs 明度阶梯）
    // ==========================================
    baseColorsRgb.forEach(function(rgb, idx) {
      var finalRgb = rgb; 
      if (idx === 2 && !state.hasImage) finalRgb = state.mainRgb;
      
      genColors.push(finalRgb);
      
      var match = matchColorInPalette(finalRgb, namePool, usedNames);
      var finalName = t('noStandardName');
      
      if (match && match.name !== t('noStandardName') && match.name !== '未知') {
        finalName = match.name;
        if (match.isDuplicate) {
           finalName += ' (' + match.similarity + ')';
        }
        usedNames.add(match.name); 
      }
      
      var labelText = '';
      var hueStr = Math.round(C.rgbToOklch(finalRgb).h) || 0;
      
      if (state.hasImage) {
        var cData = state.baseImageColors[idx];
        var pctVal = cData && cData.count ? (cData.count / realTotalPixels * 100) : 0;
        var pctStr = pctVal.toFixed(1) + '%';
        
        if (idx === 0) {
          labelText = t('primaryPct') + pctStr; 
        } else {
          labelText = t('secondaryPct') + pctStr;
        }
      } else {
        var fixedLabels = [
          t('labelPct80'), 
          t('labelPct60'), 
          t('labelPrimary'), 
          t('labelPct40'), 
          t('labelPct20')
        ];
        labelText = fixedLabels[idx] || '';
        if (labelText) labelText += ' ( ' + t('actualHue') + ' ' + hueStr + '° )';
      }
      
      genNames.push(labelText + '<br>' + finalName + ' - ' + currentLibName);
      cssNames.push(labelText + ' ' + finalName + ' - ' + currentLibName);
    });

    // ==========================================
    // 渲染第二层（衍生色卡 & 灰度）
    // ==========================================
    var ruleGenerated = H.generateColors(mainRgbForRule, ruleName); 
    
    var monoPcts = [98, 75, 50, 30, 5];

    ruleGenerated.forEach(function(ruleRgb, index) {
      var finalRgb = ruleRgb; 
      var finalName = t('noStandardName');
      
      var isMain = (ruleName === 'mono' && index === 2) || (ruleName !== 'mono' && index === 0);

      var matchObj = matchColorInPalette(finalRgb, namePool, isMain ? null : usedNames);
      if (matchObj && matchObj.name !== t('noStandardName') && matchObj.name !== '未知') {
        finalName = matchObj.name;
        if (matchObj.isDuplicate) {
           finalName += ' (' + matchObj.similarity + ')';
        }
        if (!isMain) usedNames.add(matchObj.name);
      }

      var currentHue = Math.round(C.rgbToOklch(finalRgb).h) || 0;
      var labelPrefix = '';

      if (ruleName === 'mono') {
        labelPrefix = t('monoPct') + monoPcts[index] + '%';
      } else {
        if (isMain) {
          labelPrefix = t('labelPrimary') + ' ( ' + t('actualHue') + ' ' + currentHue + '° )';
        } else {
          var offsetStr = '';
          if (ruleName === 'comp') offsetStr = '+180°';
          else if (ruleName === 'analog') offsetStr = '+30°';
          else if (ruleName === 'triad') offsetStr = index === 1 ? '+120°' : '+240°';
          else if (ruleName === 'split') offsetStr = index === 1 ? '+150°' : '+210°';
          else if (ruleName === 'square') {
            if (index === 1) offsetStr = '+90°';
            else if (index === 2) offsetStr = '+180°';
            else if (index === 3) offsetStr = '+270°';
          }
          
          // 中英文冒号由词典提供
          labelPrefix = ruleShortMap[ruleName] + t('ruleColon') + offsetStr + ' ( ' + t('actualHue') + ' ' + currentHue + '° )';
        }
      }

      finalName = labelPrefix + '<br>' + finalName + ' - ' + currentLibName;
      cssRuleNames.push(labelPrefix + ' ' + finalName + ' - ' + currentLibName);
      
      ruleColors.push(finalRgb);
      ruleNames.push(finalName);
    });

    return { 
      genColors: genColors, genNames: genNames, 
      ruleColors: ruleColors, ruleNames: ruleNames,
      cssNames: cssNames, cssRuleNames: cssRuleNames 
    };
  }

  global.CO_Generator = { generateRows: generateRows };
})(window);