/**
 * Color map shared across all price background illustrations
 */
const COLOR_MAP = {
  orange: {
    primary: '#ff7700',
    secondary: '#ff3700',
    border: '#a61c00',
    dots: '#ffaa00',
    innerCore: '#ffea00',
    rayColor: '#ff3700'
  },
  red: {
    primary: '#e61919',
    secondary: '#a30000',
    border: '#570000',
    dots: '#ff6666',
    innerCore: '#ffea00',
    rayColor: '#a30000'
  },
  yellow: {
    primary: '#ffd000',
    secondary: '#ff9900',
    border: '#8f4f00',
    dots: '#ffe875',
    innerCore: '#ffffff',
    rayColor: '#ff9900'
  },
  green: {
    primary: '#10b981',
    secondary: '#047857',
    border: '#064e3b',
    dots: '#34d399',
    innerCore: '#a7f3d0',
    rayColor: '#047857'
  },
  blue: {
    primary: '#0284c7',
    secondary: '#0369a1',
    border: '#0c4a6e',
    dots: '#38bdf8',
    innerCore: '#bae6fd',
    rayColor: '#0369a1'
  },
  mono: { // Ultra high-contrast dark burst with brilliant white price
    primary: '#15171c',
    secondary: '#000000',
    border: '#000000',
    dots: '#3e4450',
    innerCore: '#282c35',
    rayColor: '#000000'
  },
  'mono-white': { // Pure white burst with crisp black contour & black price
    primary: '#ffffff',
    secondary: '#ffffff',
    border: '#000000',
    dots: '#94a3b8',
    innerCore: '#ffffff',
    rayColor: '#000000'
  }
};

/**
 * 1. Comic Starburst Explosion (Default / Original Photo)
 */
function getStarburstSvgContent(colors, burstColor, isWhite) {
  return `
    <svg class="starburst-graphic" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="burst-grad-${burstColor}" cx="50%" cy="50%" r="50%" fx="45%" fy="45%">
          <stop offset="0%" stop-color="${isWhite ? '#ffffff' : (burstColor === 'mono' ? '#3d4350' : '#fff066')}" />
          <stop offset="40%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />
        </radialGradient>
        <pattern id="halftone-${burstColor}" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2.2" fill="${colors.dots}" opacity="0.75" />
        </pattern>
      </defs>

      <!-- Radiating action rays -->
      <g class="action-rays" opacity="0.85">
        <polygon points="160,140 20,-10 40,-20" fill="${colors.rayColor}" opacity="0.6"/>
        <polygon points="160,140 100,-25 125,-25" fill="${colors.rayColor}" opacity="0.7"/>
        <polygon points="160,140 190,-25 215,-25" fill="${colors.rayColor}" opacity="0.65"/>
        <polygon points="160,140 280,-15 310,-5" fill="${colors.rayColor}" opacity="0.75"/>
        <polygon points="160,140 335,60 345,85" fill="${colors.rayColor}" opacity="0.6"/>
        <polygon points="160,140 340,160 345,190" fill="${colors.rayColor}" opacity="0.7"/>
        <polygon points="160,140 320,240 300,265" fill="${colors.rayColor}" opacity="0.65"/>
        <polygon points="160,140 220,295 190,300" fill="${colors.rayColor}" opacity="0.7"/>
        <polygon points="160,140 120,300 95,290" fill="${colors.rayColor}" opacity="0.6"/>
        <polygon points="160,140 15,260 0,230" fill="${colors.rayColor}" opacity="0.75"/>
        <polygon points="160,140 -20,160 -25,130" fill="${colors.rayColor}" opacity="0.6"/>
        <polygon points="160,140 -20,60 -10,35" fill="${colors.rayColor}" opacity="0.7"/>
      </g>

      <!-- Halftone Aura -->
      <polygon 
        points="160,12 184,65 240,32 225,90 288,88 250,136 308,172 248,190 282,246 220,228 210,278 160,240 110,278 100,228 38,246 72,190 12,172 70,136 32,88 95,90 80,32 136,65" 
        fill="url(#halftone-${burstColor})" 
        transform="scale(1.08) translate(-12, -10)"
      />

      <!-- Jagged Outline -->
      <polygon 
        points="160,15 182,68 238,36 224,94 286,92 248,140 306,176 246,194 280,250 218,232 208,278 160,242 112,278 102,232 40,250 74,194 14,176 72,140 34,92 96,94 82,36 138,68" 
        fill="url(#burst-grad-${burstColor})" 
        stroke="${colors.border}" 
        stroke-width="${isWhite ? '5' : '4.5'}" 
        stroke-linejoin="round"
      />

      <!-- Inner Core Accent -->
      <polygon 
        points="160,35 176,80 220,55 210,102 258,102 228,142 272,170 226,184 252,228 204,215 196,250 160,222 124,250 116,215 68,228 94,184 48,170 92,142 62,102 110,102 100,55 144,80" 
        fill="${colors.innerCore}" 
        opacity="${isWhite ? '0.15' : '0.28'}"
      />
    </svg>
  `;
}

/**
 * 2. Butcher Stamp / Scalloped Rosette Seal (Slaktarsigill)
 */
function getSealSvgContent(colors, burstColor, isWhite) {
  // Scalloped circular rosette with 24 teeth - enlarged for snug price nesting
  let points = '';
  const cx = 160, cy = 140, rOuter = 130, rInner = 114;
  for (let i = 0; i < 48; i++) {
    const angle = (i * Math.PI) / 24;
    const r = i % 2 === 0 ? rOuter : rInner;
    const x = Math.round(cx + r * Math.cos(angle));
    const y = Math.round(cy + r * Math.sin(angle));
    points += `${x},${y} `;
  }

  return `
    <svg class="starburst-graphic" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="seal-grad-${burstColor}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${isWhite ? '#ffffff' : (burstColor === 'mono' ? '#404552' : '#fffa80')}" />
          <stop offset="60%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />
        </radialGradient>
      </defs>

      <!-- Outer Shadow Drop -->
      <polygon points="${points}" fill="#000000" opacity="0.18" transform="translate(3, 4)" />

      <!-- Main Scalloped Seal -->
      <polygon points="${points}" fill="url(#seal-grad-${burstColor})" stroke="${colors.border}" stroke-width="4.5" stroke-linejoin="round" />

      <!-- Inner Circular Stitch Line -->
      <circle cx="160" cy="140" r="102" fill="none" stroke="${isWhite ? '#000000' : '#ffffff'}" stroke-width="2.2" stroke-dasharray="6,4" opacity="0.85" />
      <circle cx="160" cy="140" r="95" fill="none" stroke="${colors.border}" stroke-width="1.2" opacity="0.5" />
    </svg>
  `;
}

/**
 * 3. Retro Sunburst Rays (Solstrålar)
 */
function getSunburstSvgContent(colors, burstColor, isWhite) {
  let rays = '';
  for (let i = 0; i < 16; i++) {
    const a1 = (i * 22.5 * Math.PI) / 180;
    const a2 = ((i * 22.5 + 11.25) * Math.PI) / 180;
    const x1 = Math.round(160 + 160 * Math.cos(a1));
    const y1 = Math.round(140 + 160 * Math.sin(a1));
    const x2 = Math.round(160 + 160 * Math.cos(a2));
    const y2 = Math.round(140 + 160 * Math.sin(a2));
    rays += `<polygon points="160,140 ${x1},${y1} ${x2},${y2}" fill="${colors.rayColor}" opacity="${i % 2 === 0 ? '0.7' : '0.45'}" />`;
  }

  return `
    <svg class="starburst-graphic" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sun-badge-grad-${burstColor}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${isWhite ? '#ffffff' : (burstColor === 'mono' ? '#3d4350' : '#fffa80')}" />
          <stop offset="70%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />
        </radialGradient>
      </defs>

      <!-- Radiating Sunburst Wedges -->
      <g class="sunburst-rays">${rays}</g>

      <!-- Center Rounded Sun Badge -->
      <ellipse cx="160" cy="140" rx="126" ry="105" fill="url(#sun-badge-grad-${burstColor})" stroke="${colors.border}" stroke-width="4.5" />
      <ellipse cx="160" cy="140" rx="115" ry="94" fill="none" stroke="${isWhite ? '#000000' : '#ffffff'}" stroke-width="2" opacity="0.6" />
    </svg>
  `;
}

/**
 * 4. 16-Point Symmetrical Discount Star (Tagging Stjärna)
 */
function getBurstSharpSvgContent(colors, burstColor, isWhite) {
  let outerPoints = '';
  let innerPoints = '';
  const cx = 160, cy = 140;
  for (let i = 0; i < 32; i++) {
    const angle = (i * Math.PI) / 16 - Math.PI / 2;
    const rOuter = i % 2 === 0 ? 134 : 108;
    const rInner = i % 2 === 0 ? 118 : 96;
    const xo = Math.round(cx + rOuter * Math.cos(angle));
    const yo = Math.round(cy + rOuter * Math.sin(angle));
    const xi = Math.round(cx + rInner * Math.cos(angle));
    const yi = Math.round(cy + rInner * Math.sin(angle));
    outerPoints += `${xo},${yo} `;
    innerPoints += `${xi},${yi} `;
  }

  return `
    <svg class="starburst-graphic" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sharp-grad-${burstColor}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${isWhite ? '#ffffff' : (burstColor === 'mono' ? '#3d4350' : '#fff580')}" />
          <stop offset="55%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />
        </radialGradient>
      </defs>

      <!-- Drop Shadow -->
      <polygon points="${outerPoints}" fill="#000000" opacity="0.18" transform="translate(3, 4)" />

      <!-- Main 16-Point Sharp Star -->
      <polygon 
        points="${outerPoints}" 
        fill="url(#sharp-grad-${burstColor})" 
        stroke="${colors.border}" 
        stroke-width="${isWhite ? '5' : '4.5'}" 
        stroke-linejoin="round"
      />

      <!-- Inner Crisp Contour -->
      <polygon 
        points="${innerPoints}" 
        fill="none" 
        stroke="${isWhite ? '#000000' : '#ffffff'}" 
        stroke-width="2" 
        stroke-linejoin="round"
        opacity="0.8"
      />

      <!-- Center Accent Ring -->
      <circle cx="160" cy="140" r="82" fill="none" stroke="${colors.border}" stroke-width="1.5" stroke-dasharray="5,4" opacity="0.55" />
    </svg>
  `;
}

/**
 * 5. Supermarket Stop Sign Price Badge (Prisoktagon)
 */
function getOctagonSvgContent(colors, burstColor, isWhite) {
  let outerPoints = '';
  let innerPoints = '';
  const cx = 160, cy = 140;
  for (let i = 0; i < 8; i++) {
    const angle = ((i * 45 + 22.5) * Math.PI) / 180;
    const xo = Math.round(cx + 134 * Math.cos(angle));
    const yo = Math.round(cy + 118 * Math.sin(angle));
    const xi = Math.round(cx + 122 * Math.cos(angle));
    const yi = Math.round(cy + 106 * Math.sin(angle));
    outerPoints += `${xo},${yo} `;
    innerPoints += `${xi},${yi} `;
  }

  return `
    <svg class="starburst-graphic" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="octagon-grad-${burstColor}" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stop-color="${isWhite ? '#ffffff' : (burstColor === 'mono' ? '#3d4350' : '#fff580')}" />
          <stop offset="60%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />
        </radialGradient>
      </defs>

      <!-- Drop Shadow -->
      <polygon points="${outerPoints}" fill="#000000" opacity="0.18" transform="translate(3, 4)" />

      <!-- Main Octagon -->
      <polygon 
        points="${outerPoints}" 
        fill="url(#octagon-grad-${burstColor})" 
        stroke="${colors.border}" 
        stroke-width="5" 
        stroke-linejoin="round"
      />

      <!-- Inner Accent Rim -->
      <polygon 
        points="${innerPoints}" 
        fill="none" 
        stroke="${isWhite ? '#000000' : '#ffffff'}" 
        stroke-width="2.5" 
        stroke-linejoin="round"
        opacity="0.85"
      />

      <!-- Fine Inner Double Line -->
      <ellipse cx="160" cy="140" rx="100" ry="86" fill="none" stroke="${colors.border}" stroke-width="1.2" stroke-dasharray="6,4" opacity="0.5" />
    </svg>
  `;
}

/**
 * 6. Classic Retail Plaque / Lozenge (Prisplakett)
 */
function getBadgeSvgContent(colors, burstColor, isWhite) {
  return `
    <svg class="starburst-graphic" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="badge-grad-${burstColor}" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stop-color="${isWhite ? '#ffffff' : (burstColor === 'mono' ? '#3d4350' : '#fff799')}" />
          <stop offset="55%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />
        </radialGradient>
      </defs>

      <!-- Drop Shadow -->
      <rect x="23" y="47" width="274" height="186" rx="34" ry="34" fill="#000000" opacity="0.18" />

      <!-- Main Rounded Plaque -->
      <rect 
        x="20" 
        y="44" 
        width="274" 
        height="186" 
        rx="34" 
        ry="34" 
        fill="url(#badge-grad-${burstColor})" 
        stroke="${colors.border}" 
        stroke-width="4.5" 
      />

      <!-- Inner Stitched Border -->
      <rect 
        x="32" 
        y="56" 
        width="250" 
        height="162" 
        rx="24" 
        ry="24" 
        fill="none" 
        stroke="${isWhite ? '#000000' : '#ffffff'}" 
        stroke-width="2.2" 
        stroke-dasharray="6,4" 
        opacity="0.85" 
      />

      <!-- Decorative Accent Rivets -->
      <circle cx="48" cy="137" r="3.5" fill="${colors.border}" />
      <circle cx="48" cy="137" r="2" fill="${isWhite ? '#000000' : '#ffffff'}" />
      <circle cx="272" cy="137" r="3.5" fill="${colors.border}" />
      <circle cx="272" cy="137" r="2" fill="${isWhite ? '#000000' : '#ffffff'}" />
    </svg>
  `;
}

/**
 * 7. Retail Diamond / Rhombus Tag (Diamant)
 */
function getDiamondSvgContent(colors, burstColor, isWhite) {
  return `
    <svg class="starburst-graphic" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="diamond-grad-${burstColor}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${isWhite ? '#ffffff' : (burstColor === 'mono' ? '#3d4350' : '#fff580')}" />
          <stop offset="60%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />
        </radialGradient>
      </defs>

      <!-- Drop Shadow -->
      <polygon points="160,28 304,144 160,258 16,144" fill="#000000" opacity="0.18" />

      <!-- Main Faceted Diamond -->
      <polygon 
        points="160,24 304,140 160,254 16,140" 
        fill="url(#diamond-grad-${burstColor})" 
        stroke="${colors.border}" 
        stroke-width="5" 
        stroke-linejoin="round"
      />

      <!-- Inner Accent Ring -->
      <polygon 
        points="160,38 284,140 160,240 36,140" 
        fill="none" 
        stroke="${isWhite ? '#000000' : '#ffffff'}" 
        stroke-width="2.5" 
        stroke-linejoin="round"
        opacity="0.85"
      />

      <!-- Inner Stitch Line -->
      <polygon 
        points="160,50 268,140 160,228 52,140" 
        fill="none" 
        stroke="${colors.border}" 
        stroke-width="1.5" 
        stroke-dasharray="5,4" 
        stroke-linejoin="round"
        opacity="0.55"
      />
    </svg>
  `;
}

/**
 * 8. Minimal Clean Retail Disc (Cirkel)
 */
function getCircleSvgContent(colors, burstColor, isWhite) {
  return `
    <svg class="starburst-graphic" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="circle-grad-${burstColor}" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stop-color="${isWhite ? '#ffffff' : (burstColor === 'mono' ? '#3d4350' : '#fffa80')}" />
          <stop offset="60%" stop-color="${colors.primary}" />
          <stop offset="100%" stop-color="${colors.secondary}" />
        </radialGradient>
      </defs>

      <!-- Drop Shadow -->
      <ellipse cx="163" cy="144" rx="136" ry="116" fill="#000000" opacity="0.18" />

      <!-- Outer Disc -->
      <ellipse cx="160" cy="140" rx="134" ry="114" fill="url(#circle-grad-${burstColor})" stroke="${colors.border}" stroke-width="4.5" />

      <!-- Inner Clean Ring -->
      <ellipse cx="160" cy="140" rx="122" ry="102" fill="none" stroke="${isWhite ? '#000000' : '#ffffff'}" stroke-width="2.5" opacity="0.75" />
    </svg>
  `;
}

/**
 * Main dispatcher for price illustrations based on shape & color
 */
export function getPriceIllustrationSvg(shape = 'starburst', burstColor = 'orange') {
  const colors = COLOR_MAP[burstColor] || COLOR_MAP.orange;
  const isWhite = burstColor === 'mono-white';

  switch (shape) {
    case 'burst-sharp':
      return getBurstSharpSvgContent(colors, burstColor, isWhite);
    case 'seal':
      return getSealSvgContent(colors, burstColor, isWhite);
    case 'sunburst':
      return getSunburstSvgContent(colors, burstColor, isWhite);
    case 'octagon':
      return getOctagonSvgContent(colors, burstColor, isWhite);
    case 'badge':
      return getBadgeSvgContent(colors, burstColor, isWhite);
    case 'diamond':
      return getDiamondSvgContent(colors, burstColor, isWhite);
    case 'circle':
      return getCircleSvgContent(colors, burstColor, isWhite);
    case 'shield': // Graceful fallback for cached state
      return getOctagonSvgContent(colors, burstColor, isWhite);
    case 'splash': // Graceful fallback for cached state
      return getBadgeSvgContent(colors, burstColor, isWhite);
    case 'starburst':
    default:
      return getStarburstSvgContent(colors, burstColor, isWhite);
  }
}

/**
 * Backward compatibility alias
 */
export function getStarburstSvg(burstColor = 'orange') {
  return getPriceIllustrationSvg('starburst', burstColor);
}

/**
 * Dynamic Font Size Calculation so names like "Lammframdel" NEVER break lines!
 */
export function getTitleFontSizeStyle(title = '', sizePref = 'auto') {
  const len = (title || '').trim().length;

  if (sizePref === 'xlarge') return 'font-size: 24pt; letter-spacing: -0.025em;';
  if (sizePref === 'large') return 'font-size: 20pt; letter-spacing: -0.02em;';

  // Fallbacks for legacy/stored configurations
  if (sizePref === 'medium' || sizePref === 'small') return 'font-size: 20pt; letter-spacing: -0.02em;';

  // Auto sizing algorithm tuned specifically so "Lammframdel", "Kalvframdel", etc. fit in 1 line
  if (len <= 8) return 'font-size: 20pt; letter-spacing: -0.02em;';
  if (len <= 11) return 'font-size: 16.5pt; letter-spacing: -0.03em;'; // Perfect for "Lammframdel" (11 chars)
  if (len <= 14) return 'font-size: 14.5pt; letter-spacing: -0.035em;';
  if (len <= 18) return 'font-size: 13pt; letter-spacing: -0.04em;';
  return 'font-size: 11.5pt; letter-spacing: -0.04em;';
}

/**
 * Returns the Crown SVG matching the KÖTTHALLEN logo from the photo.
 */
export function getCrownLogoSvg(isMonochrome = false) {
  if (isMonochrome) {
    return `
      <svg class="crown-svg crown-mono" viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg">
        <path d="M12,48 C30,55 70,55 88,48 L84,54 C68,60 32,60 16,54 Z" fill="#000000" />
        <path d="M14,46 L10,22 L30,36 L50,12 L70,36 L90,22 L86,46 C68,52 32,52 14,46 Z" fill="#000000" />
        <circle cx="10" cy="21" r="3.2" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
        <circle cx="30" cy="35" r="2.8" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
        <circle cx="50" cy="11" r="4.2" fill="#ffffff" stroke="#000000" stroke-width="1.8" />
        <circle cx="70" cy="35" r="2.8" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
        <circle cx="90" cy="21" r="3.2" fill="#ffffff" stroke="#000000" stroke-width="1.5" />
      </svg>
    `;
  }

  return `
    <svg class="crown-svg" viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crown-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff194" />
          <stop offset="45%" stop-color="#f5c227" />
          <stop offset="85%" stop-color="#be850c" />
          <stop offset="100%" stop-color="#805303" />
        </linearGradient>
        <linearGradient id="crown-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#996a09" />
          <stop offset="100%" stop-color="#4d3300" />
        </linearGradient>
      </defs>
      <path d="M12,48 C30,55 70,55 88,48 L84,54 C68,60 32,60 16,54 Z" fill="url(#crown-gold)" stroke="url(#crown-stroke)" stroke-width="1.5" />
      <path d="M14,46 L10,22 L30,36 L50,12 L70,36 L90,22 L86,46 C68,52 32,52 14,46 Z" fill="url(#crown-gold)" stroke="url(#crown-stroke)" stroke-width="1.8" stroke-linejoin="round" />
      <circle cx="10" cy="21" r="3.2" fill="#fff5ab" stroke="#734900" stroke-width="1" />
      <circle cx="30" cy="35" r="2.8" fill="#fff5ab" stroke="#734900" stroke-width="1" />
      <circle cx="50" cy="11" r="4.2" fill="#ffffff" stroke="#734900" stroke-width="1" />
      <circle cx="70" cy="35" r="2.8" fill="#fff5ab" stroke="#734900" stroke-width="1" />
      <circle cx="90" cy="21" r="3.2" fill="#fff5ab" stroke="#734900" stroke-width="1" />
      <path d="M38,48 C42,42 58,42 62,48 Z" fill="#ffffff" opacity="0.6"/>
    </svg>
  `;
}

/**
 * Returns alternative Meat Cleaver / Butcher SVG logo.
 */
export function getMeatLogoSvg(isMonochrome = false) {
  return `
    <svg class="meat-svg ${isMonochrome ? 'meat-mono' : ''}" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
      <path d="M15,15 L50,15 C58,15 65,22 65,30 L65,40 C65,44 60,45 55,43 L15,35 Z" fill="${isMonochrome ? '#000000' : '#991b1b'}" stroke="#000000" stroke-width="2"/>
      <rect x="5" y="32" width="14" height="6" rx="2" fill="${isMonochrome ? '#666666' : '#ca8a04'}" stroke="#000000" stroke-width="1"/>
    </svg>
  `;
}

/**
 * Returns the Halal Stamp SVG with authentic Arabic calligraphy and HALAL text.
 */
export function getHalalBadgeSvg(style = 'classic', isMonochrome = false) {
  if (isMonochrome || style === 'classic') {
    return `
      <div class="halal-stamp style-classic">
        <div class="halal-oval">
          <span class="halal-arabic">حلال</span>
          <span class="halal-text">HALAL</span>
        </div>
      </div>
    `;
  }
  if (style === 'gold') {
    return `
      <div class="halal-stamp style-gold">
        <div class="halal-oval">
          <span class="halal-arabic">حلال</span>
          <span class="halal-text">HALAL</span>
        </div>
      </div>
    `;
  }
  if (style === 'green') {
    return `
      <div class="halal-stamp style-green">
        <div class="halal-oval">
          <span class="halal-arabic">حلال</span>
          <span class="halal-text">HALAL</span>
        </div>
      </div>
    `;
  }
  return `
    <div class="halal-stamp style-classic">
      <div class="halal-oval">
        <span class="halal-arabic">حلال</span>
        <span class="halal-text">HALAL</span>
      </div>
    </div>
  `;
}

/**
 * Render a complete price card HTML element.
 */
export function renderCardHtml(card, index = 0, isSelected = false, globalMonochrome = false) {
  const isMono = globalMonochrome || card.burstColor === 'mono' || card.burstColor === 'mono-white' || card.bgTheme === 'monochrome';
  const bgClass = isMono ? 'bg-monochrome' : `bg-${card.bgTheme || 'ice-blue'}`;
  const selectedClass = isSelected ? 'is-selected' : '';
  const monoClass = isMono ? 'is-monochrome' : '';
  const burstColor = globalMonochrome ? (card.burstColor === 'mono-white' ? 'mono-white' : 'mono') : (card.burstColor || 'orange');
  const priceColorClass = burstColor === 'mono' ? 'price-theme-white-on-black' : (burstColor === 'mono-white' ? 'price-theme-black-on-white' : 'price-theme-yellow');
  const priceShape = card.priceShape || 'starburst';

  // Determine logo HTML
  let logoHtml = '';
  if (card.logoType === 'crown') {
    logoHtml = getCrownLogoSvg(isMono);
  } else if (card.logoType === 'meat') {
    logoHtml = getMeatLogoSvg(isMono);
  } else if (card.logoType === 'custom' && card.customLogoUrl) {
    logoHtml = `<img src="${card.customLogoUrl}" class="custom-logo-img ${isMono ? 'logo-grayscale' : ''}" alt="Store Logo" />`;
  }

  // Format price decimals & unit
  const decText = card.priceDec ? `:${card.priceDec}` : '';
  const unitText = card.unit || '/kg';

  // Dynamic font size style to ensure "Lammframdel" never line breaks!
  const titleStyle = getTitleFontSizeStyle(card.title, card.titleSize);

  // Digits count for optical price scaling without affecting shape dimensions
  const digitsCount = (card.priceInt || '').length;
  const digitsClass = digitsCount >= 4 ? 'price-digits-4' : (digitsCount === 3 ? 'price-digits-3' : '');

  return `
    <div class="price-card ${bgClass} ${selectedClass} ${monoClass}" data-card-index="${index}" id="card-item-${index}">
      <div class="card-inner">
        
        <!-- Left Section: Header, Origin, Halal, Branding -->
        <div class="card-left-column">
          
          <!-- Item Title (Now with guaranteed no-wrap) -->
          <div class="item-title-wrap">
            <h2 class="item-title" style="${titleStyle}" title="${card.title || 'Produktnamn'}">${card.title || 'Produktnamn'}</h2>
          </div>

          <!-- Origin & Flag -->
          <div class="item-origin-row">
            ${card.showFlag && card.flagEmoji ? `<span class="origin-flag ${isMono ? 'flag-mono' : ''}">${card.flagEmoji}</span>` : ''}
            <span class="origin-name">${card.origin || 'Ursprung saknas'}</span>
          </div>

          <!-- Halal Seal -->
          <div class="halal-wrapper">
            ${card.showHalal ? getHalalBadgeSvg(card.halalStyle, isMono) : '<div class="halal-spacer"></div>'}
          </div>

          <!-- Store / Company Branding -->
          <div class="company-branding">
            ${logoHtml ? `<div class="company-logo-slot">${logoHtml}</div>` : ''}
            <div class="company-name-text">${card.companyName || 'BUTIKENS NAMN'}</div>
            ${card.companySub ? `
              <div class="company-sub-banner">
                <span class="company-sub-text">${card.companySub}</span>
              </div>
            ` : ''}
          </div>

        </div>

        <!-- Right Section: Selected Illustration & Massive Price -->
        <div class="card-right-column">
          <div class="starburst-container shape-${priceShape}">
            ${getPriceIllustrationSvg(priceShape, burstColor)}
            
            <!-- Price Overlay inside the chosen shape -->
            <div class="price-display ${priceColorClass} ${digitsClass}">
              <span class="price-integer">${card.priceInt || '0'}</span>
              <div class="price-fraction-wrap">
                <span class="price-decimals">${decText}</span>
                <span class="price-unit">${unitText}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Quick card edit badge indicator in UI -->
      <div class="card-slot-badge">#${index + 1}</div>
    </div>
  `;
}
