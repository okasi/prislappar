import { describe, expect, test } from 'vitest';
import { DEFAULT_CARD } from './presets.js';
import { decodeStateFromParam, encodeStateToParam } from './stateSharing.js';

const stateWith = (overrides = {}) => ({
  gridType: '2x4',
  sheetMargin: '5mm',
  sheetGap: '0mm',
  showCutLines: true,
  showMarginsGuide: false,
  globalMonochrome: true,
  activeCardIndex: 0,
  lang: 'sv',
  cards: [{ ...DEFAULT_CARD, ...overrides }]
});

describe('stateSharing URL param codec', () => {
  test('round-trips a full card without losing fields', () => {
    // Arrange
    const state = stateWith({
      title: 'Oxfilé',
      origin: 'Sverige',
      showFlag: true,
      flagEmoji: '🇸🇪',
      priceInt: '299',
      burstColor: 'red',
      priceShape: 'seal',
      companySub: 'KVALITETSKÖTT'
    });

    // Act
    const encoded = encodeStateToParam(state);
    const decoded = decodeStateFromParam(encoded);

    // Assert
    expect(encoded).not.toContain('+');
    expect(encoded).not.toContain('/');
    expect(decoded.gridType).toBe('2x4');
    expect(decoded.lang).toBe('sv');
    expect(decoded.cards[0]).toMatchObject({
      title: 'Oxfilé',
      origin: 'Sverige',
      showFlag: true,
      flagEmoji: '🇸🇪',
      priceInt: '299',
      burstColor: 'red',
      priceShape: 'seal',
      companySub: 'KVALITETSKÖTT'
    });
  });

  test('round-trips a data-URI logo with base64 special characters', () => {
    // Arrange
    const state = stateWith({ logoType: 'custom', customLogoUrl: 'data:image/png;base64,iVBOR+KG/x8A==' });

    // Act
    const decoded = decodeStateFromParam(encodeStateToParam(state));

    // Assert
    expect(decoded.cards[0].customLogoUrl).toBe('data:image/png;base64,iVBOR+KG/x8A==');
  });

  test('returns empty string for states without a cards array', () => {
    // Arrange & Act & Assert
    expect(encodeStateToParam(null)).toBe('');
    expect(encodeStateToParam({})).toBe('');
  });

  test('returns null for missing, malformed or non-JSON input', () => {
    // Arrange & Act & Assert
    expect(decodeStateFromParam(null)).toBeNull();
    expect(decodeStateFromParam('')).toBeNull();
    expect(decodeStateFromParam('not-json-at-all')).toBeNull();
    expect(decodeStateFromParam('{"no":"cards"}')).toBeNull();
  });

  test('returns null when decoded cards array is empty', () => {
    // Arrange
    const encoded = encodeStateToParam({ ...stateWith(), cards: [] });

    // Act
    const decoded = decodeStateFromParam(encoded);

    // Assert
    expect(decoded).toBeNull();
  });
});
