import { describe, expect, test } from 'vitest';
import { TRANSLATIONS, getI18n } from './i18n.js';
import indexHtml from '../index.html?raw';
const LANGS = ['sv', 'tr', 'en'];
const htmlI18nKeys = [...indexHtml.matchAll(/data-i18n="([^"]+)"/g)].map((m) => m[1]);

describe('i18n translations', () => {
  test('all languages expose identical key sets', () => {
    // Arrange
    const [svKeys, trKeys, enKeys] = LANGS.map((l) => Object.keys(TRANSLATIONS[l]).sort());

    // Act & Assert
    expect(trKeys).toEqual(svKeys);
    expect(enKeys).toEqual(svKeys);
  });

  test('every data-i18n key used in index.html exists in all languages', () => {
    // Arrange & Act & Assert
    expect(htmlI18nKeys.length).toBeGreaterThan(0);
    for (const key of htmlI18nKeys) {
      for (const lang of LANGS) {
        expect(TRANSLATIONS[lang][key], `${lang}.${key}`).toBeDefined();
      }
    }
  });

  test('getI18n falls back to Swedish for unknown languages', () => {
    // Arrange & Act
    const fallback = getI18n('xx');

    // Assert
    expect(fallback).toBe(TRANSLATIONS.sv);
  });

  test('indicator and confirm helpers interpolate their arguments', () => {
    // Arrange
    const t = getI18n('sv');

    // Act
    const indicator = t.tagIndicator(2, 5, 8);
    const confirmDelete = t.confirmDeleteTag('Oxfilé');

    // Assert
    expect(indicator).toBe('Lapp #2 av 5 (max 8)');
    expect(confirmDelete).toContain('Oxfilé');
  });
});
