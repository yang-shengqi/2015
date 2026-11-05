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
  var rgbToHex = C.rgbToHex;
  var matchColorInPalette = global.CO_Filter.matchColorInPalette;

  function generateTints(baseRgb) {
    var b = C.rgbToOklch(baseRgb);
    var baseC = b.C;
    var baseH = b.h;
    var baseL = b.L;

    var L1 = Math.min(baseL + 0.35, 0.97);
    var L2 = Math.min(baseL + 0.15, 0.85);
    
    // 防倒挂补丁 1
    if (L2 <= baseL) {
      L2 = baseL + (L1 - baseL) * 0.5;
    }

    var L4 = Math.max(baseL - 0.15, 0.25);
    var L5 = Math.max(baseL - 0.35, 0.15);

    // 防倒挂补丁 2
    if (L4 >= baseL) {
      L4 = baseL - (baseL - L5) * 0.5;
    }

    return [
      { L: L1, C: baseC * 0.3, h: baseH },
      { L: L2, C: baseC * 0.6, h: baseH },
      { L: baseL, C: baseC, h: baseH },
      { L: L4, C: baseC * 0.8, h: baseH },
      { L: L5, C: baseC * 0.5, h: baseH }
    ].map(function(o) {
      return C.oklchToRgb(o);
    });
  }

  function generateRows(state, palette, ruleName) {
    var baseColorsRgb = [];
    var displayColors = []; // 用于第一行显示的完整数据（含占比）
    var realTotalPixels = 1;
    if (state.hasImage && state.extracted && state.extracted.total) {
      realTotalPixels = state.extracted.total;
    }

    var genColors = [], genNames = [];
    var ruleColors = [], ruleNames = [];
    var cssNames = [], cssRuleNames = [];
    
    // 无限制模式下，把 4 个库合并，全库找名字
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
    // 1. 定死全局主色
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
    // 2. 准备第一行色卡（核心防崩、防错乱逻辑）
    // ==========================================
    if (state.hasImage && state.baseImageColors && state.baseImageColors.length > 0) {
      var raw = state.baseImageColors;
      
      if (raw.length >= 5) {
        // 正常情况：颜色足够，生成重排副本，主色移至第三格 (index 2)
        displayColors = [raw[1], raw[2], raw[0], raw[3], raw[4]];
      } else {
        // 🔥 兜底：单色/少色图，直接以第一主色生成5个明度阶梯补齐
        var mainRgb = hexToRgb(raw[0].hex);
        var fallbackTints = generateTints(mainRgb);
        
        // 重新构建用于显示的数组，确保不报错
        displayColors = fallbackTints.map(function(rgb, idx) {
          var cnt = (idx === 2) ? (raw[0].count || 1) : Math.max(1, Math.floor((raw[0].count || 1) * 0.1));
          return { hex: rgbToHex(rgb), count: cnt };
        });
      }
      baseColorsRgb = displayColors.map(function(c) { return hexToRgb(c.hex); });
      
    } else {
      // 无图片模式
      baseColorsRgb = generateTints(mainBaseColor); 
      if (baseColorsRgb.length >= 3) baseColorsRgb[2] = mainBaseColor; 
      
      displayColors = baseColorsRgb.map(function(rgb) {
          return { hex: rgbToHex(rgb), count: 1 };
      });
    }

    // ==========================================
    // 3. 渲染第一层（标签已修复，第三格是主色）
    // ==========================================
    baseColorsRgb.forEach(function(rgb, idx) {
      var finalRgb = rgb; 
      var finalName = t('noStandardName');
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
        var cData = displayColors[idx]; 
        var pctVal = cData && cData.count ? (cData.count / realTotalPixels * 100) : 0;
        var pctStr = pctVal.toFixed(1) + '%';
        
        // 🔥 第三格才是主色
        if (idx === 2) {
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
    // 4. 渲染第二层（加入终极防崩兜底）
    // ==========================================
    var trueMainColor = genColors[2] || genColors[0] || state.mainRgb; 
    var baseOklch = C.rgbToOklch(trueMainColor);
    var generatedColors = [];

    if (ruleName === 'mono') {
        // 灰度：直接读取上面第一行的 5 个颜色，把彩度清零
        generatedColors = baseColorsRgb.map(function(rgb) {
            var o = C.rgbToOklch(rgb);
            return C.oklchToRgb({ L: o.L, C: 0, h: o.h });
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

    // 非灰度模式下，强制第一个色卡等于主色（三向焊死）
    if (ruleName !== 'mono') {
        generatedColors[0] = trueMainColor; 
    }

    generatedColors.forEach(function(ruleRgb, index) {
      var finalRgb = ruleRgb; 
      var finalName = t('noStandardName');
      
      var isMain = (ruleName === 'mono' && index === 2) || (ruleName !== 'mono' && index === 0);

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
        var actualL = C.rgbToOklch(finalRgb).L;
        var actualGrayPct = Math.round((1 - actualL) * 100);
        labelPrefix = t('monoPct') + actualGrayPct + '%';
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

      var pureName = finalName;
      finalName = labelPrefix + '<br>' + pureName + ' - ' + currentLibName;
      cssRuleNames.push(labelPrefix + ' ' + pureName + ' - ' + currentLibName);
      
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