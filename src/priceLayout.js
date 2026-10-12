// Include the SVG's actual painted geometry: sunburst rays extend past its viewBox.
function artworkBounds(card) {
  const svg = card.querySelector('.starburst-graphic');
  const viewport = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;
  const box = svg.getBBox();
  if (!viewport.width || !viewport.height || !viewBox.width || !viewBox.height || !box.width || !box.height) return null;
  // All badge SVGs use xMidYMid meet and their ancestors only scale/translate.
  // Safari's getScreenCTM can omit ancestor CSS scaling. Use the rendered
  // viewport to keep SVG geometry and price text in the same coordinate space.
  const scale = Math.min(viewport.width / viewBox.width, viewport.height / viewBox.height);
  const left = viewport.left + (viewport.width - viewBox.width * scale) / 2;
  const top = viewport.top + (viewport.height - viewBox.height * scale) / 2;
  const price = card.querySelector('.price-display').getBoundingClientRect();
  return {
    left: Math.min(price.left, left + (box.x - viewBox.x) * scale),
    right: Math.max(price.right, left + (box.x + box.width - viewBox.x) * scale),
    top: Math.min(price.top, top + (box.y - viewBox.y) * scale),
    bottom: Math.max(price.bottom, top + (box.y + box.height - viewBox.y) * scale)
  };
}

export function fitPriceArtwork(card) {
  const bounds = card.getBoundingClientRect();
  const inner = card.querySelector('.card-inner');
  const column = card.querySelector('.card-right-column');
  const badge = card.querySelector('.starburst-container');
  if (!bounds.width || !bounds.height || !inner.offsetWidth) return;

  column.style.removeProperty('--price-shift-x');
  column.style.removeProperty('--price-shift-y');
  badge.style.setProperty('--price-fit-scale', 1);
  const artwork = artworkBounds(card);
  if (!artwork) return;

  // Reserve space for strokes and shadows, and shrink only when paper limits demand it.
  const padding = Math.min(bounds.width, bounds.height) * 0.035;
  const fit = Math.min(1,
    (bounds.width - padding * 2) / (artwork.right - artwork.left),
    (bounds.height - padding * 2) / (artwork.bottom - artwork.top));
  badge.style.setProperty('--price-fit-scale', fit);
  const fitted = artworkBounds(card);
  const units = inner.getBoundingClientRect().width / inner.offsetWidth;
  if (!fitted || !Number.isFinite(units) || units <= 0) return;
  const shiftX = Math.min(Math.max(0, bounds.left + padding - fitted.left),
    bounds.right - padding - fitted.right);
  const shiftY = Math.min(Math.max(0, bounds.top + padding - fitted.top),
    bounds.bottom - padding - fitted.bottom);
  column.style.setProperty('--price-shift-x', `${shiftX / units}px`);
  column.style.setProperty('--price-shift-y', `${shiftY / units}px`);
}
