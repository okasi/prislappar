import { describe, expect, test, vi } from 'vitest';
import { fitPriceArtwork } from './priceLayout.js';

function fixture(zoom, { size = 1, priceWidth = 120 } = {}) {
  document.body.innerHTML = `<div class="price-card"><div class="card-inner">
    <div class="card-right-column"><div class="starburst-container">
      <svg class="starburst-graphic"></svg><div class="price-display"></div>
    </div></div></div></div>`;
  const card = document.querySelector('.price-card');
  const column = card.querySelector('.card-right-column');
  const badge = card.querySelector('.starburst-container');
  const svg = card.querySelector('svg');
  const rect = (x, y, width, height) => ({ left: x * zoom, top: y * zoom,
    right: (x + width) * zoom, bottom: (y + height) * zoom, width: width * zoom, height: height * zoom });
  card.getBoundingClientRect = () => rect(10, 20, 240, 180);
  const inner = card.querySelector('.card-inner');
  Object.defineProperty(inner, 'offsetWidth', { value: 240 });
  inner.getBoundingClientRect = () => rect(10, 20, 240, 180);
  Object.defineProperty(svg, 'viewBox', { value: { baseVal: { x: 0, y: 0, width: 320, height: 280 } } });
  // Rays extend beyond the viewport; they must still fit inside the paper.
  svg.getBBox = () => ({ x: -20, y: -20, width: 360, height: 320 });
  svg.getScreenCTM = vi.fn(() => { throw new Error('Safari CTM is unreliable'); });
  const centered = (width, height) => {
    const scale = size * Number(badge.style.getPropertyValue('--price-fit-scale') || 1);
    const x = parseFloat(column.style.getPropertyValue('--price-shift-x')) || 0;
    const y = parseFloat(column.style.getPropertyValue('--price-shift-y')) || 0;
    return rect(180 + x - width * scale / 2, 110 + y - height * scale / 2, width * scale, height * scale);
  };
  svg.getBoundingClientRect = () => centered(160, 140);
  card.querySelector('.price-display').getBoundingClientRect = () => centered(priceWidth, 60);
  return { card, column, badge, svg };
}

const result = ({ column, badge }) => [
  Number(badge.style.getPropertyValue('--price-fit-scale')),
  parseFloat(column.style.getPropertyValue('--price-shift-x')),
  parseFloat(column.style.getPropertyValue('--price-shift-y'))
];

describe('fitPriceArtwork', () => {
  test.each([0.22, 0.47, 1, 1.8])('keeps fitting independent of preview zoom %s without Safari CTM', (zoom) => {
    const normal = fixture(1, { size: 1.5 });
    fitPriceArtwork(normal.card);
    const expected = result(normal);
    const scaled = fixture(zoom, { size: 1.5 });
    fitPriceArtwork(scaled.card);
    result(scaled).forEach((value, i) => expect(value).toBeCloseTo(expected[i], 6));
    expect(scaled.svg.getScreenCTM).not.toHaveBeenCalled();
    expect(result(scaled)[0]).toBeGreaterThan(0);
    expect(result(scaled)[0]).toBeLessThan(1);
    // Repeat fitting after a zoom/edit: previous corrections must not accumulate.
    fitPriceArtwork(scaled.card);
    result(scaled).forEach((value, i) => expect(value).toBeCloseTo(expected[i], 6));
  });

  test('fits long price text as well as the background illustration', () => {
    const elements = fixture(0.3, { priceWidth: 300 });
    fitPriceArtwork(elements.card);
    const price = elements.card.querySelector('.price-display').getBoundingClientRect();
    const card = elements.card.getBoundingClientRect();
    expect(price.left).toBeGreaterThan(card.left);
    expect(price.right).toBeLessThan(card.right);
    expect(result(elements)[0]).toBeLessThan(1);
  });

  test('defers measuring while the mobile preview is hidden', () => {
    const elements = fixture(0);
    elements.svg.getBBox = vi.fn();
    fitPriceArtwork(elements.card);
    expect(elements.svg.getBBox).not.toHaveBeenCalled();
    expect(elements.badge.style.getPropertyValue('--price-fit-scale')).toBe('');
  });
});
