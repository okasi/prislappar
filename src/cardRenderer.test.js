import { describe, expect, test } from 'vitest';
import { DEFAULT_CARD } from './presets.js';
import {
  getPriceIllustrationSvg,
  getHalalBadgeSvg,
  getTitleFontSizeStyle,
  renderCardHtml
} from './cardRenderer.js';

const card = (overrides = {}) => ({ ...DEFAULT_CARD, ...overrides });

describe('renderCardHtml', () => {
  test('renders the default card with ice-blue theme, sunburst shape and slot badge', () => {
    // Arrange & Act
    const html = renderCardHtml(card(), 0, false, false);

    // Assert
    expect(html).toContain('class="price-card bg-ice-blue  "');
    expect(html).toContain('id="card-item-0"');
    expect(html).toContain('data-card-index="0"');
    expect(html).toContain('shape-sunburst');
    expect(html).toContain('card-slot-badge">#1');
    expect(html).toContain('>Kalvframdel<');
    expect(html).toContain('price-theme-yellow');
  });

  test('marks the selected card with is-selected', () => {
    // Arrange & Act
    const html = renderCardHtml(card(), 2, true, false);

    // Assert
    expect(html).toContain('is-selected');
    expect(html).toContain('card-slot-badge">#3');
  });

  test('switches to monochrome theme in global monochrome mode', () => {
    // Arrange & Act
    const html = renderCardHtml(card({ burstColor: 'red' }), 0, false, true);

    // Assert
    expect(html).toContain('bg-monochrome');
    expect(html).toContain('is-monochrome');
    expect(html).toContain('price-theme-white-on-black');
    expect(html).not.toContain('price-theme-yellow');
  });

  test('scales price typography for 3 and 4 digit prices', () => {
    // Arrange & Act
    const threeDigits = renderCardHtml(card({ priceInt: '119' }), 0, false, false);
    const fourDigits = renderCardHtml(card({ priceInt: '1199' }), 0, false, false);

    // Assert
    expect(threeDigits).toContain('price-digits-3');
    expect(fourDigits).toContain('price-digits-4');
  });

  test('shows the halal stamp only when enabled and honours the chosen style', () => {
    // Arrange & Act
    const classic = renderCardHtml(card(), 0, false, false);
    const gold = renderCardHtml(card({ halalStyle: 'gold' }), 0, false, false);
    const off = renderCardHtml(card({ showHalal: false }), 0, false, false);

    // Assert
    expect(classic).toContain('halal-stamp style-classic');
    expect(gold).toContain('halal-stamp style-gold');
    expect(off).toContain('halal-spacer');
    expect(off).not.toContain('halal-stamp');
  });

  test('shows the flag only when enabled', () => {
    // Arrange & Act
    const withFlag = renderCardHtml(card({ showFlag: true }), 0, false, false);
    const noFlag = renderCardHtml(card({ showFlag: false }), 0, false, false);

    // Assert
    expect(withFlag).toContain('origin-flag');
    expect(noFlag).not.toContain('origin-flag');
  });

  test('falls back to placeholders for missing title, origin and company', () => {
    // Arrange & Act
    const html = renderCardHtml(
      card({ title: '', origin: '', companyName: '', logoType: 'none' }),
      0,
      false,
      false
    );

    // Assert
    expect(html).toContain('>Produktnamn<');
    expect(html).toContain('Ursprung saknas');
    expect(html).toContain('BUTIKENS NAMN');
    expect(html).not.toContain('company-logo-slot');
  });

  test('renders the company sub banner only when a subtitle exists', () => {
    // Arrange & Act
    const withSub = renderCardHtml(card({ companySub: 'KVALITETSKÖTT' }), 0, false, false);
    const noSub = renderCardHtml(card(), 0, false, false);

    // Assert
    expect(withSub).toContain('company-sub-banner');
    expect(noSub).not.toContain('company-sub-banner');
  });

  test('embeds a custom logo image only when a URL exists', () => {
    // Arrange & Act
    const withLogo = renderCardHtml(card({ logoType: 'custom', customLogoUrl: 'data:image/png;base64,AAA' }), 0, false, false);
    const withoutUrl = renderCardHtml(card({ logoType: 'custom', customLogoUrl: '' }), 0, false, false);

    // Assert
    expect(withLogo).toContain('<img src="data:image/png;base64,AAA"');
    expect(withoutUrl).not.toContain('<img');
  });
});

describe('getTitleFontSizeStyle', () => {
  test('returns the standard 22pt style by default', () => {
    // Arrange & Act & Assert
    expect(getTitleFontSizeStyle('Kalvframdel', '22pt')).toContain('font-size: 22pt');
    expect(getTitleFontSizeStyle('Kalvframdel')).toContain('font-size: 22pt');
  });

  test('auto mode scales the font down as the title grows', () => {
    // Arrange & Act
    const short = getTitleFontSizeStyle('Kött', 'auto');
    const medium = getTitleFontSizeStyle('Lammframdel', 'auto');
    const veryLong = getTitleFontSizeStyle('Färsblandning med tryffel', 'auto');

    // Assert
    expect(short).toContain('font-size: 20pt');
    expect(medium).toContain('font-size: 16.5pt');
    expect(veryLong).toContain('font-size: 11.5pt');
  });
});

describe('getPriceIllustrationSvg', () => {
  test('renders an SVG for every supported shape', () => {
    // Arrange
    const shapes = ['sunburst', 'starburst', 'burst-sharp', 'seal', 'octagon', 'badge', 'diamond', 'circle'];

    // Act & Assert
    for (const shape of shapes) {
      expect(getPriceIllustrationSvg(shape), shape).toContain('<svg');
    }
  });

  test('falls back gracefully for unknown and legacy shape ids', () => {
    // Arrange & Act
    const unknown = getPriceIllustrationSvg('mystery-shape');
    const legacyShield = getPriceIllustrationSvg('shield');

    // Assert
    expect(unknown).toContain('<svg');
    expect(legacyShield).toBe(getPriceIllustrationSvg('octagon'));
  });

  test('honours burst colors and tolerates unknown colors', () => {
    // Arrange & Act
    const red = getPriceIllustrationSvg('sunburst', 'red');
    const invalid = getPriceIllustrationSvg('sunburst', 'not-a-color');

    // Assert
    expect(red).toContain('<svg');
    expect(invalid).toContain('<svg');
  });
});

describe('getHalalBadgeSvg', () => {
  test('defaults to the classic oval stamp with Arabic calligraphy', () => {
    // Arrange & Act & Assert
    expect(getHalalBadgeSvg()).toContain('halal-stamp style-classic');
    expect(getHalalBadgeSvg()).toContain('حلال');
    expect(getHalalBadgeSvg('gold')).toContain('style-gold');
    expect(getHalalBadgeSvg('nonsense')).toContain('style-classic');
  });
});
