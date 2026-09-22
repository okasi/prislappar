import { DEFAULT_CARD } from './presets.js';

/**
 * UTF-8 safe base64url encoding
 */
export function toBase64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  const len = bytes.length;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * UTF-8 safe base64url decoding
 */
export function fromBase64Url(base64url) {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Serialize application state into a ultra-compact URL query param string
 */
export function encodeStateToParam(state) {
  if (!state || !Array.isArray(state.cards)) return '';

  const payload = {
    v: 1,
    g: state.gridType || '2x4',
    m: state.sheetMargin || '5mm',
    p: state.sheetGap || '0mm',
    cl: state.showCutLines ? 1 : 0,
    mg: state.showMarginsGuide ? 1 : 0,
    bw: state.globalMonochrome ? 1 : 0,
    ai: typeof state.activeCardIndex === 'number' ? state.activeCardIndex : 0,
    l: state.lang || 'sv',
    c: state.cards.map((c, idx) => {
      const item = {};
      if (c.title) item.t = c.title;
      if (c.titleSize && c.titleSize !== '22pt') item.ts = c.titleSize;
      if (c.origin) item.o = c.origin;
      if (c.showFlag) item.f = 1;
      if (c.flagEmoji && c.flagEmoji !== '🇱🇹') item.fe = c.flagEmoji;
      if (c.showHalal === false) item.h = 0;
      if (c.halalStyle && c.halalStyle !== 'classic') item.hs = c.halalStyle;
      if (c.priceInt) item.pi = c.priceInt;
      if (c.priceDec) item.pd = c.priceDec;
      if (c.unit && c.unit !== '/kg') item.u = c.unit;
      if (c.companyName && c.companyName !== 'KÖTTHALLEN') item.cn = c.companyName;
      if (c.companySub) item.cs = c.companySub;
      if (c.logoType && c.logoType !== 'crown') item.lt = c.logoType;
      // Truncate customLogoUrl if it is an excessively huge base64 data URI (> 3KB)
      if (c.customLogoUrl && c.customLogoUrl.length < 3000) item.lu = c.customLogoUrl;
      if (c.burstColor && c.burstColor !== 'orange') item.bc = c.burstColor;
      if (c.priceShape && c.priceShape !== 'sunburst') item.ps = c.priceShape;
      if (c.bgTheme && c.bgTheme !== 'ice-blue') item.bg = c.bgTheme;
      return item;
    })
  };

  return toBase64Url(JSON.stringify(payload));
}

/**
 * Parse and restore application state from URL query param string
 */
export function decodeStateFromParam(encodedStr) {
  if (!encodedStr || typeof encodedStr !== 'string') return null;

  try {
    let jsonStr;
    try {
      jsonStr = fromBase64Url(encodedStr.trim());
    } catch {
      try {
        jsonStr = decodeURIComponent(encodedStr.trim());
      } catch {
        jsonStr = encodedStr.trim();
      }
    }

    const data = JSON.parse(jsonStr);

    // Compact schema (v: 1, c: cards array)
    if (data.c && Array.isArray(data.c)) {
      const cards = data.c.map((item, idx) => ({
        id: Date.now() + idx,
        title: item.t !== undefined ? item.t : DEFAULT_CARD.title,
        titleSize: item.ts || DEFAULT_CARD.titleSize || '22pt',
        origin: item.o !== undefined ? item.o : DEFAULT_CARD.origin,
        showFlag: item.f === 1,
        flagEmoji: item.fe || (item.f ? '🇸🇪' : DEFAULT_CARD.flagEmoji),
        showHalal: item.h !== undefined ? item.h === 1 : DEFAULT_CARD.showHalal,
        halalStyle: item.hs || DEFAULT_CARD.halalStyle,
        priceInt: item.pi !== undefined ? item.pi : DEFAULT_CARD.priceInt,
        priceDec: item.pd !== undefined ? item.pd : DEFAULT_CARD.priceDec,
        unit: item.u || DEFAULT_CARD.unit,
        companyName: item.cn !== undefined ? item.cn : DEFAULT_CARD.companyName,
        companySub: item.cs !== undefined ? item.cs : DEFAULT_CARD.companySub,
        logoType: item.lt || DEFAULT_CARD.logoType,
        customLogoUrl: item.lu || '',
        burstColor: item.bc || DEFAULT_CARD.burstColor,
        priceShape: item.ps || DEFAULT_CARD.priceShape || 'sunburst',
        bgTheme: item.bg || DEFAULT_CARD.bgTheme
      }));

      return {
        gridType: data.g || '2x4',
        sheetMargin: data.m || '5mm',
        sheetGap: data.p || '0mm',
        showCutLines: data.cl !== undefined ? data.cl === 1 : true,
        showMarginsGuide: data.mg !== undefined ? data.mg === 1 : false,
        globalMonochrome: data.bw !== undefined ? data.bw === 1 : false,
        activeCardIndex: typeof data.ai === 'number' ? data.ai : 0,
        lang: data.l || 'sv',
        cards
      };
    }

    // Direct cards array or raw state schema fallback
    if (Array.isArray(data.cards) && data.cards.length > 0) {
      return {
        gridType: data.gridType || '2x4',
        sheetMargin: data.sheetMargin || '5mm',
        sheetGap: data.sheetGap || '0mm',
        showCutLines: data.showCutLines ?? true,
        showMarginsGuide: data.showMarginsGuide ?? false,
        globalMonochrome: data.globalMonochrome ?? false,
        activeCardIndex: typeof data.activeCardIndex === 'number' ? data.activeCardIndex : 0,
        lang: data.lang || 'sv',
        cards: data.cards
      };
    }

    return null;
  } catch (err) {
    console.warn('Could not decode state from URL parameter:', err);
    return null;
  }
}
