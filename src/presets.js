// Country definitions with flags and standard local names
export const COUNTRIES = [
  { code: 'LT', name: 'Litauen', flag: '🇱🇹' },
  { code: 'SE', name: 'Sverige', flag: '🇸🇪' },
  { code: 'DK', name: 'Danmark', flag: '🇩🇰' },
  { code: 'IE', name: 'Irland', flag: '🇮🇪' },
  { code: 'PL', name: 'Polen', flag: '🇵🇱' },
  { code: 'DE', name: 'Tyskland', flag: '🇩🇪' },
  { code: 'NL', name: 'Nederländerna', flag: '🇳🇱' },
  { code: 'ES', name: 'Spanien', flag: '🇪🇸' },
  { code: 'FR', name: 'Frankrike', flag: '🇫🇷' },
  { code: 'IT', name: 'Italien', flag: '🇮🇹' },
  { code: 'NZ', name: 'Nya Zeeland', flag: '🇳🇿' },
  { code: 'BR', name: 'Brasilien', flag: '🇧🇷' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'AU', name: 'Australien', flag: '🇦🇺' },
  { code: 'GB', name: 'Storbritannien', flag: '🇬🇧' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'NO', name: 'Norge', flag: '🇳🇴' },
  { code: 'CUSTOM', name: 'Annat / Valfritt', flag: '🏳️' }
];

export const DEFAULT_BRANDING = {
  companyName: 'KÖTTHALLEN',
  companySub: '',
  logoType: 'crown', // 'crown', 'meat', 'custom', 'none'
  customLogoUrl: ''
};

export const PRICE_SHAPES = [
  { id: 'starburst', name: '💥 Comic Explosion (Stjärna)', icon: '💥' },
  { id: 'burst-sharp', name: '⚡ Tagging Stjärna (16-Uddig)', icon: '⚡' },
  { id: 'seal', name: '🏷️ Slaktarsigill (Rund Rosett)', icon: '🏷️' },
  { id: 'sunburst', name: '☀️ Solstrålar (Retro Sunburst)', icon: '☀️' },
  { id: 'octagon', name: '🛑 Prisoktagon (Stoppskylt)', icon: '🛑' },
  { id: 'badge', name: '🎖️ Prisplakett (Klassisk Plakett)', icon: '🎖️' },
  { id: 'diamond', name: '💠 Diamant (Romb)', icon: '💠' },
  { id: 'circle', name: '⚪ Minimal Cirkel (Ren Disc)', icon: '⚪' }
];

export const DEFAULT_CARD = {
  id: 1,
  title: 'Kalvframdel',
  titleSize: 'auto',
  origin: 'Litauen',
  showFlag: false,
  flagEmoji: '🇱🇹',
  showHalal: true,
  halalStyle: 'classic', // 'classic', 'gold', 'green'
  priceInt: '69',
  priceDec: '90',
  unit: '/kg',
  companyName: 'KÖTTHALLEN',
  companySub: '',
  logoType: 'crown',
  customLogoUrl: '',
  burstColor: 'orange', // 'orange', 'red', 'yellow', 'green', 'blue', 'mono', 'mono-white'
  priceShape: 'starburst', // 'starburst', 'seal', 'sunburst', 'shield', 'splash', 'circle'
  bgTheme: 'ice-blue' // 'ice-blue', 'clean-white', 'warm-yellow', 'kraft'
};

// By default, only ONE price tag exists out of total slots!
export const INITIAL_CARDS = [
  { ...DEFAULT_CARD }
];

export const DEMO_PRESET_ITEMS = [
  { ...DEFAULT_CARD },
  {
    id: 2,
    title: 'Högrev',
    origin: 'Sverige',
    showFlag: true,
    flagEmoji: '🇸🇪',
    showHalal: true,
    halalStyle: 'classic',
    priceInt: '119',
    priceDec: '00',
    unit: '/kg',
    companyName: 'KÖTTHALLEN',
    companySub: '',
    logoType: 'crown',
    customLogoUrl: '',
    burstColor: 'orange',
    bgTheme: 'ice-blue'
  },
  {
    id: 3,
    title: 'Oxfilé',
    origin: 'Sverige',
    showFlag: true,
    flagEmoji: '🇸🇪',
    showHalal: true,
    halalStyle: 'classic',
    priceInt: '299',
    priceDec: '00',
    unit: '/kg',
    companyName: 'KÖTTHALLEN',
    companySub: '',
    logoType: 'crown',
    customLogoUrl: '',
    burstColor: 'red',
    bgTheme: 'ice-blue'
  },
  {
    id: 4,
    title: 'Entrecôte',
    origin: 'Irland',
    showFlag: true,
    flagEmoji: '🇮🇪',
    showHalal: true,
    halalStyle: 'classic',
    priceInt: '249',
    priceDec: '00',
    unit: '/kg',
    companyName: 'KÖTTHALLEN',
    companySub: '',
    logoType: 'crown',
    customLogoUrl: '',
    burstColor: 'orange',
    bgTheme: 'ice-blue'
  },
  {
    id: 5,
    title: 'Kycklingfilé',
    origin: 'Danmark',
    showFlag: false,
    flagEmoji: '🇩🇰',
    showHalal: true,
    halalStyle: 'classic',
    priceInt: '89',
    priceDec: '90',
    unit: '/kg',
    companyName: 'KÖTTHALLEN',
    companySub: '',
    logoType: 'crown',
    customLogoUrl: '',
    burstColor: 'orange',
    bgTheme: 'ice-blue'
  },
  {
    id: 6,
    title: 'Lammstek',
    origin: 'Nya Zeeland',
    showFlag: false,
    flagEmoji: '🇳🇿',
    showHalal: true,
    halalStyle: 'classic',
    priceInt: '169',
    priceDec: '00',
    unit: '/kg',
    companyName: 'KÖTTHALLEN',
    companySub: '',
    logoType: 'crown',
    customLogoUrl: '',
    burstColor: 'orange',
    bgTheme: 'ice-blue'
  },
  {
    id: 7,
    title: 'Blandfärs',
    origin: 'Sverige',
    showFlag: true,
    flagEmoji: '🇸🇪',
    showHalal: true,
    halalStyle: 'classic',
    priceInt: '79',
    priceDec: '90',
    unit: '/kg',
    companyName: 'KÖTTHALLEN',
    companySub: '',
    logoType: 'crown',
    customLogoUrl: '',
    burstColor: 'orange',
    bgTheme: 'ice-blue'
  },
  {
    id: 8,
    title: 'Ryggbiff',
    origin: 'Sverige',
    showFlag: true,
    flagEmoji: '🇸🇪',
    showHalal: true,
    halalStyle: 'classic',
    priceInt: '199',
    priceDec: '00',
    unit: '/kg',
    companyName: 'KÖTTHALLEN',
    companySub: '',
    logoType: 'crown',
    customLogoUrl: '',
    burstColor: 'orange',
    bgTheme: 'ice-blue'
  }
];

export const GRID_CONFIGS = {
  '2x4': { cols: 2, rows: 4, count: 8, name: '2 × 4 (8 st - Standard Prislapp)' },
  '1x3': { cols: 1, rows: 3, count: 3, name: '1 × 3 (3 st - Breda Skyltar)' },
  '2x3': { cols: 2, rows: 3, count: 6, name: '2 × 3 (6 st - Mellanstora)' },
  '2x2': { cols: 2, rows: 2, count: 4, name: '2 × 2 (4 st - A6 Format)' },
  '1x2': { cols: 1, rows: 2, count: 2, name: '1 × 2 (2 st - A5 Skylt)' },
  '1x1': { cols: 1, rows: 1, count: 1, name: '1 × 1 (1 st - Hel A4 Poster)' }
};

export const MARGIN_PRESETS = {
  'safe-5': { margin: '5mm', label: '5 mm (Skrivarsäker - Rekommenderas för laserskrivare)' },
  'none-0': { margin: '0mm', label: '0 mm (Kantfri / Full bleed för fotoskrivare)' },
  'extra-8': { margin: '8mm', label: '8 mm (Extra bred skrivarmarginal)' },
  'large-10': { margin: '10mm', label: '10 mm (Generös marginal)' }
};

export const GAP_PRESETS = {
  'gap-0': { gap: '0mm', label: '0 mm (Delad klipplinje - snabb tillskärning)' },
  'gap-2': { gap: '2mm', label: '2 mm (Tydlig distans mellan kort)' },
  'gap-4': { gap: '4mm', label: '4 mm (Rymlig distans)' }
};
