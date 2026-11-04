/* ============================================================ 
 * color-generator.js —— 纯净全适配版（终极联动修复版）
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
    var baseC = b.C;
    var baseH = b.h;
    var baseL = b.L;

    // 动态计算，保证视觉舒服，且不会彻底变黑
    return [
      { L: Math.min(baseL + 0.35, 0.95), C: baseC * 0.3, h: baseH },  // 90% 附近
      { L: Math.min(baseL + 0.15, 0.85), C: baseC * 0.6, h: baseH },  // 70% 附近
      { L: baseL, C: baseC, h: baseH },                               // 主色
      { L: Math.max(baseL - 0.15, 0.25), C: baseC * 0.8, h: baseH },  // 30% 附近
      { L: Math.max(baseL - 0.35, 0.15), C: baseC * 0.5, h: baseH }   // 10% 附近
    ].map(function(o) {
      return C.oklchToRgb(o);
    });
  }

  function generateRows(state, palette, ruleName) {
    var baseColorsRgb = [];
    var realTotalPixels = 1;
    if (state.hasImage && state.extracted && state.extracted.total) {
      realTotalPixels = state.extracted.total;
    }

    var genColors = [], genNames = [];
    var ruleColors = [], ruleNames = [];
    var cssNames = [], cssRuleNames = [];
    // 无限制模式下，把 4 个库合并，全库找名字！
    var namePool = palette;
    if (!namePool) {
        namePool = [];
        if (global.CO_Names.CN_PALETTE) namePool = namePool.concat(global.CO_Names.CN_PALETTE);
        if (global.CO_Names.JP_PALETTE) namePool = namePool.concat(global.CO_Names.JP_PALETTE);
        if (global.CO_Names.MORANDI_PALETTE) namePool = namePool.concat(global.CO_Names.MORANDI_PALETTE);
        if (global.CO_Names.CYBER_PALETTE) namePool = namePool.concat(global.CO_Names.CYBER_PALETTE);
    }

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
    // 👇 1. 定死全局主色（有库匹配库，无库用原色）
    // ==========================================
    var rawMainColor = state.mainRgb;
    if (state.hasImage && state.baseImageColors && state.baseImageColors.length > 0) {
      rawMainColor = hexToRgb(state.baseImageColors[0].hex);
    }

    var mainBaseColor = rawMainColor;
    if (palette && palette.length > 0) {
        var mainMatch = matchColorInPalette(rawMainColor, palette, null);
        if (mainMatch && mainMatch.name !== t('noStandardName') && mainMatch.name !== '未知') {
            mainBaseColor = mainMatch.rgb; 
        } else {
            mainBaseColor = palette[0].rgb;
        }
    }

    // ==========================================
    // 👇 2. 准备第一行色卡
    // ==========================================
    if (state.hasImage && state.baseImageColors && state.baseImageColors.length > 0) {
      baseColorsRgb = state.baseImageColors.map(function(c) { return hexToRgb(c.hex); });
      baseColorsRgb[0] = mainBaseColor; 
      if (baseColorsRgb.length >= 3) baseColorsRgb[2] = mainBaseColor; 
    } else {
      baseColorsRgb = generateTints(mainBaseColor); 
      if (baseColorsRgb.length >= 3) baseColorsRgb[2] = mainBaseColor; 
    }

    // ==========================================
    // 👇 3. 渲染第一层
    // ==========================================
    baseColorsRgb.forEach(function(rgb, idx) {
      var finalRgb = rgb; 
      // 🔥 删除了强制改回 state.mainRgb 的烂代码，死死绑定库里的颜色
      
      var finalName = t('noStandardName');

      // 🔥 放开拦截，全库找名字
      var match = matchColorInPalette(finalRgb, namePool, usedNames);
      if (match && match.name !== t('noStandardName') && match.name !== '未知') {
        finalName = match.name;
        if (match.isDuplicate || parseFloat(match.similarity) < 100) {
           finalName += ' (' + match.similarity + ')';
        }
        usedNames.add(match.name); 
      }
      
      genColors.push(finalRgb);
      
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
        var displayL = Math.round(C.rgbToOklch(finalRgb).L * 100);
        
        if (idx === 2) {
            labelText = t('labelPrimary') + displayL + '%';
        } else {
            labelText = t('labelMetric') + displayL + '%';
        }
        
        if (labelText) labelText += ' ( ' + t('actualHue') + ' ' + hueStr + '° )';
      }
      
      genNames.push(labelText + '<br>' + finalName + ' - ' + currentLibName);
      cssNames.push(labelText + ' ' + finalName + ' - ' + currentLibName);
    });

    // ==========================================
    // 👇 4. 渲染第二层（绑定第一行中间的主色）
    // ==========================================
    var trueMainColor = genColors[2]; 
    var baseOklch = C.rgbToOklch(trueMainColor);
    var generatedColors = [];
    var monoPcts = [98, 75, 50, 30, 5];

    if (ruleName === 'mono') {
        generatedColors = monoPcts.map(function(pct) {
            var L = C.clamp(baseOklch.L + (50 - pct) / 100, 0.05, 0.95);
            return C.oklchToRgb({ L: L, C: 0, h: baseOklch.h });
        });
    } else {
        var offsets = [];
        if (ruleName === 'comp') offsets = [0, 180];
        else if (ruleName === 'analog') offsets = [0, 30];
        else if (ruleName === 'triad') offsets = [0, 120, 240];
        else if (ruleName === 'split') offsets = [0, 150, 210];
        else if (ruleName === 'square') offsets = [0, 90, 180, 270];
        
        generatedColors = offsets.map(function(offset) {
            var newHue = (baseOklch.h + offset + 360) % 360;
            return C.oklchToRgb({ L: baseOklch.L, C: baseOklch.C, h: newHue });
        });
    }

    if (ruleName !== 'mono') {
        generatedColors[0] = trueMainColor; 
    }

    generatedColors.forEach(function(ruleRgb, index) {
      var finalRgb = ruleRgb; 
      var finalName = t('noStandardName');
      
      var isMain = (ruleName === 'mono' && index === 2) || (ruleName !== 'mono' && index === 0);

      // 🔥 放开拦截，全库找名字
      var matchObj = matchColorInPalette(finalRgb, namePool, usedNames);
      if (matchObj && matchObj.name !== t('noStandardName') && matchObj.name !== '未知') {
        finalName = matchObj.name;
        if (matchObj.isDuplicate || parseFloat(matchObj.similarity) < 100) {
           finalName += ' (' + matchObj.similarity + ')';
        }
        usedNames.add(matchObj.name);
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