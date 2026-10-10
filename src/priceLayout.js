// Include the SVG's actual painted geometry: sunburst rays extend past its viewBox.
function artworkBounds(card) {
  const svg = card.querySelector('.starburst-graphic');
  const matrix = svg.getScreenCTM();
  const box = svg.getBBox();
  if (!matrix || !box.width || !box.height) return null;
  const corners = [
    [box.x, box.y], [box.x + box.width, box.y],
    [box.x, box.y + box.height], [box.x + box.width, box.y + box.height]
  ].map(([x, y]) => ({
    x: matrix.a * x + matrix.c * y + matrix.e,
    y: matrix.b * x + matrix.d * y + matrix.f
  }));
  const price = card.querySelector('.price-display').getBoundingClientRect();
  return {
    left: Math.min(price.left, ...corners.map(p => p.x)),
    right: Math.max(price.right, ...corners.map(p => p.x)),
    top: Math.min(price.top, ...corners.map(p => p.y)),
    bottom: Math.max(price.bottom, ...corners.map(p => p.y))
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
  const shiftX = Math.min(Math.max(0, bounds.left + padding - fitted.left),
    bounds.right - padding - fitted.right);
  const shiftY = Math.min(Math.max(0, bounds.top + padding - fitted.top),
    bounds.bottom - padding - fitted.bottom);
  column.style.setProperty('--price-shift-x', `${shiftX / units}px`);
  column.style.setProperty('--price-shift-y', `${shiftY / units}px`);
}
