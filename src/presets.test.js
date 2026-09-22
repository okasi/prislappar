import { describe, expect, test } from 'vitest';
import {
  COUNTRIES,
  DEFAULT_BRANDING,
  DEFAULT_CARD,
  DEMO_PRESET_ITEMS,
  GAP_PRESETS,
  GRID_CONFIGS,
  MARGIN_PRESETS,
  PRICE_SHAPES
} from './presets.js';

describe('presets data integrity', () => {
  test('every grid config count matches cols × rows', () => {
    // Arrange
    const configs = Object.entries(GRID_CONFIGS);

    // Act & Assert
    for (const [id, cfg] of configs) {
      expect(cfg.count, `grid ${id}`).toBe(cfg.cols * cfg.rows);
      expect(cfg.rows, `grid ${id}`).toBeGreaterThan(0);
    }
  });

  test('country codes are unique and include the CUSTOM entry', () => {
    // Arrange
    const codes = COUNTRIES.map((c) => c.code);

    // Act & Assert
    expect(new Set(codes).size).toBe(codes.length);
    expect(codes).toContain('CUSTOM');
    for (const country of COUNTRIES) {
      expect(country.name.length, country.code).toBeGreaterThan(0);
      expect(country.flag.length, country.code).toBeGreaterThan(0);
    }
  });

  test('demo presets provide 8 items with titles and prices', () => {
    // Arrange & Act
    const items = DEMO_PRESET_ITEMS;

    // Assert
    expect(items).toHaveLength(8);
    for (const item of items) {
      expect(item.title.length).toBeGreaterThan(0);
      expect(item.priceInt).toMatch(/^\d+$/);
      expect(item.priceDec).toMatch(/^\d{2}$/);
    }
  });

  test('default card is a valid sunburst 22pt card with branding', () => {
    // Arrange & Act
    const card = DEFAULT_CARD;

    // Assert
    expect(card.titleSize).toBe('22pt');
    expect(card.priceShape).toBe('sunburst');
    expect(card.bgTheme).toBe('ice-blue');
    expect(card.companyName).toBe(DEFAULT_BRANDING.companyName);
    expect(GRID_CONFIGS['2x4'].count).toBeGreaterThanOrEqual(DEMO_PRESET_ITEMS.length);
  });

  test('margin and gap presets map to mm values', () => {
    // Arrange
    const margins = Object.values(MARGIN_PRESETS);
    const gaps = Object.values(GAP_PRESETS);

    // Act & Assert
    for (const preset of margins) expect(preset.margin).toMatch(/^\d+mm$/);
    for (const preset of gaps) expect(preset.gap).toMatch(/^\d+mm$/);
    expect(PRICE_SHAPES.length).toBeGreaterThanOrEqual(8);
    for (const shape of PRICE_SHAPES) expect(shape.id.length).toBeGreaterThan(0);
  });
});
