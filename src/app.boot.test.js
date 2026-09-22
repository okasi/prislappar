import { beforeEach, describe, expect, test, vi } from 'vitest';
import indexHtml from '../index.html?raw';
const bodyHtml = indexHtml
  .match(/<body>([\s\S]*)<\/body>/)[1]
  .replace(/<script[^>]*><\/script>/g, '');

/**
 * Boot the real application module against the real index.html markup.
 * main.js registers its entry point on DOMContentLoaded, so we dispatch it
 * manually after the module import. Old app instances from earlier tests are
 * unregistered first so every test runs against exactly one app instance.
 */
const domContentLoadedListeners = [];
const originalAddEventListener = window.addEventListener.bind(window);
window.addEventListener = (type, listener, ...rest) => {
  if (type === 'DOMContentLoaded') domContentLoadedListeners.push(listener);
  return originalAddEventListener(type, listener, ...rest);
};

async function bootApp({ width = 1024 } = {}) {
  // Arrange
  vi.resetModules();
  localStorage.clear();
  history.replaceState(null, '', '/'); // drop ?s= state from earlier tests
  while (domContentLoadedListeners.length) {
    window.removeEventListener('DOMContentLoaded', domContentLoadedListeners.pop());
  }
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
  document.body.innerHTML = bodyHtml;

  // Act
  await import('./main.js');
  window.dispatchEvent(new Event('DOMContentLoaded'));
}

const app = () => document.getElementById('app-container');
const cardElements = () => document.querySelectorAll('.price-card');
const emptySlots = () => document.querySelectorAll('.empty-card-slot');
const indicator = () => document.getElementById('active-slot-indicator').textContent;

beforeEach(() => {
  vi.restoreAllMocks();
  Element.prototype.scrollIntoView = () => {}; // jsdom does not implement scrolling
});

describe('application boot', () => {
  test('renders one card and seven empty slots on the default 2×4 sheet', async () => {
    // Arrange & Act
    await bootApp();

    // Assert
    expect(cardElements()).toHaveLength(1);
    expect(emptySlots()).toHaveLength(7);
    expect(document.getElementById('a4-sheet').className).toBe('grid-2x4 show-cut-lines sheet-monochrome');
    expect(indicator()).toBe('Lapp #1 av 1 (max 8)');
    expect(document.getElementById('input-title').value).toBe('Kalvframdel');
  });

  test('attaches all toolbar listeners (zoom buttons work)', async () => {
    // Arrange
    await bootApp();
    const label = document.getElementById('zoom-percentage');
    const before = parseInt(label.textContent, 10);

    // Act
    document.getElementById('btn-zoom-in').click();

    // Assert
    expect(parseInt(label.textContent, 10)).toBe(before + 10);
  });
});

describe('card management', () => {
  test('adds a card when the add button is clicked', async () => {
    // Arrange
    await bootApp();

    // Act
    document.getElementById('btn-add-card').click();

    // Assert
    expect(cardElements()).toHaveLength(2);
    expect(indicator()).toBe('Lapp #2 av 2 (max 8)');
    expect(document.getElementById('input-title').value).toBe('Högrev');
  });

  test('adds a card when an empty sheet slot is clicked', async () => {
    // Arrange
    await bootApp();

    // Act
    document.querySelector('.empty-card-slot[data-empty-index="1"]').click();

    // Assert
    expect(cardElements()).toHaveLength(2);
    expect(emptySlots()).toHaveLength(6);
  });

  test('selects a card when it is clicked on the sheet', async () => {
    // Arrange
    await bootApp();
    document.getElementById('btn-add-card').click();

    // Act
    document.getElementById('card-item-0').click();

    // Assert
    expect(document.getElementById('card-item-0').className).toContain('is-selected');
    expect(document.getElementById('card-item-1').className).not.toContain('is-selected');
    expect(indicator()).toBe('Lapp #1 av 2 (max 8)');
  });

  test('deletes the active card after confirmation and keeps it on cancel', async () => {
    // Arrange
    await bootApp();
    document.getElementById('btn-add-card').click();
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    // Act
    document.getElementById('btn-delete-card').click();

    // Assert
    expect(confirmSpy).toHaveBeenCalledOnce();
    expect(cardElements()).toHaveLength(2);

    // Act (accept this time)
    confirmSpy.mockReturnValue(true);
    document.getElementById('btn-delete-card').click();

    // Assert
    expect(cardElements()).toHaveLength(1);
    expect(indicator()).toBe('Lapp #1 av 1 (max 8)');
    expect(document.getElementById('btn-delete-card').style.display).toBe('none');
  });

  test('edits propagate from the form to the rendered sheet', async () => {
    // Arrange
    await bootApp();
    const titleInput = document.getElementById('input-title');

    // Act
    titleInput.value = ' entrecôte ';
    titleInput.dispatchEvent(new Event('input'));

    // Assert
    expect(document.querySelector('#card-item-0 .item-title').textContent).toBe(' entrecôte ');
  });

  test('copies the active card to all existing slots after confirmation', async () => {
    // Arrange
    await bootApp();
    document.getElementById('btn-add-card').click(); // active is now #2 "Högrev"
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    // Act
    document.getElementById('btn-copy-to-all').click();

    // Assert
    expect(cardElements()).toHaveLength(2);
    expect(document.querySelector('#card-item-0 .item-title').textContent).toBe('Högrev');
    expect(document.querySelector('#card-item-1 .item-title').textContent).toBe('Högrev');
  });

  test('applies branding to every card without touching prices', async () => {
    // Arrange
    await bootApp();
    document.getElementById('btn-add-card').click();
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    const nameInput = document.getElementById('input-company-name');
    nameInput.value = 'GRILLD';
    nameInput.dispatchEvent(new Event('input'));

    // Act
    document.getElementById('btn-apply-branding-all').click();

    // Assert
    const names = [...document.querySelectorAll('.company-name-text')].map((el) => el.textContent);
    expect(names).toEqual(['GRILLD', 'GRILLD']);
    expect(document.querySelector('#card-item-0 .item-title').textContent).toBe('Kalvframdel');
    expect(document.querySelector('#card-item-1 .item-title').textContent).toBe('Högrev');
  });

  test('fills the sheet with the butcher presets after confirmation', async () => {
    // Arrange
    await bootApp();
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    // Act
    document.getElementById('btn-fill-presets').click();

    // Assert
    expect(cardElements()).toHaveLength(8);
    expect(emptySlots()).toHaveLength(0);
    expect(document.querySelector('#card-item-7 .item-title').textContent).toBe('Ryggbiff');
  });

  test('switches layout to 1×3 and clamps overflowing cards', async () => {
    // Arrange
    await bootApp();
    document.getElementById('btn-add-card').click();
    document.getElementById('btn-add-card').click();
    document.getElementById('btn-add-card').click();

    // Act
    document.getElementById('btn-layout-1x3').click();

    // Assert
    expect(document.getElementById('a4-sheet').className).toContain('grid-1x3');
    expect(cardElements()).toHaveLength(3);
    expect(indicator()).toBe('Lapp #3 av 3 (max 3)'); // active clamps to the last surviving card
  });

  test('prints the sheet through the browser print dialog', async () => {
    // Arrange
    await bootApp();
    const printSpy = vi.spyOn(window, 'print').mockImplementation(() => {});

    // Act
    document.getElementById('btn-print-sheet').click();

    // Assert
    expect(printSpy).toHaveBeenCalledOnce();
  });
});

describe('mobile experience', () => {
  test('boots into the editor view on a 320px screen', async () => {
    // Arrange & Act
    await bootApp({ width: 320 });

    // Assert
    expect(app().className).toBe('view-editor');
    expect(getComputedStyle(document.getElementById('app-sidebar')).display).not.toBe('none');
  });

  test('switches to the preview tab and back to the editor when a card is tapped', async () => {
    // Arrange
    await bootApp({ width: 320 });

    // Act
    document.getElementById('tab-btn-preview').click();

    // Assert
    expect(app().className).toBe('view-preview');
    expect(document.getElementById('app-sidebar').style.display).not.toBe('flex');

    // Act (tap the card in the preview)
    document.getElementById('card-item-0').click();

    // Assert
    expect(app().className).toBe('view-editor');
  });

  test('re-fits the zoom when switching to the preview tab', async () => {
    // Arrange
    await bootApp({ width: 320 });
    document.getElementById('btn-zoom-in').click();
    document.getElementById('btn-zoom-in').click();
    document.getElementById('btn-zoom-in').click();
    const label = document.getElementById('zoom-percentage');
    const zoomedIn = parseInt(label.textContent, 10);

    // Act
    document.getElementById('tab-btn-preview').click();
    await new Promise((resolve) => setTimeout(resolve, 60));

    // Assert
    expect(zoomedIn).toBeGreaterThan(0);
    expect(parseInt(label.textContent, 10)).toBeLessThan(zoomedIn);
  });
});

describe('settings & language', () => {
  test('translates the UI when a language pill is clicked', async () => {
    // Arrange
    await bootApp();

    // Act
    document.querySelector('.lang-pill-btn[data-lang="en"]').click();

    // Assert
    expect(document.querySelector('#tab-btn-preview [data-i18n="tabPreview"]').textContent).toBe('A4 Preview');
    expect(indicator()).toBe('Tag #1 of 1 (max 8)');

    // Act (back to Swedish)
    document.querySelector('.lang-pill-btn[data-lang="sv"]').click();

    // Assert
    expect(document.querySelector('#tab-btn-preview [data-i18n="tabPreview"]').textContent).toBe('A4 Förhandsvisning');
  });

  test('switches to monochrome via the B&W color chip and toggles cut lines', async () => {
    // Arrange
    await bootApp();
    const sheet = document.getElementById('a4-sheet');

    // Act
    document.getElementById('btn-toggle-guides').click();

    // Assert
    expect(sheet.className).not.toContain('show-cut-lines');

    // Act (the mono chip forces black & white rendering)
    document.querySelector('.color-chip.chip-mono').click();

    // Assert
    expect(sheet.className).toContain('sheet-monochrome');
    expect(document.querySelector('#card-item-0').className).toContain('is-monochrome');
    expect(document.querySelector('#card-item-0 .price-display').className).toContain('price-theme-white-on-black');
  });

  test('updates origin and flag badge via the country quick-select', async () => {
    // Arrange
    await bootApp();
    const countrySelect = document.getElementById('select-country');

    // Act
    countrySelect.value = 'SE';
    countrySelect.dispatchEvent(new Event('change'));

    // Assert
    expect(document.getElementById('input-origin').value).toBe('Sverige');
    expect(document.getElementById('flag-preview-badge').textContent).toBe('🇸🇪');
    expect(document.querySelector('#card-item-0 .origin-name').textContent).toBe('Sverige');
  });

  test('toggles the halal style row with the halal switch', async () => {
    // Arrange
    await bootApp();
    const halalToggle = document.getElementById('toggle-halal');
    const styleRow = document.getElementById('halal-style-row');

    // Act
    halalToggle.checked = false;
    halalToggle.dispatchEvent(new Event('change'));

    // Assert
    expect(styleRow.style.display).toBe('none');
    expect(document.querySelector('#card-item-0 .halal-spacer')).not.toBeNull();

    // Act (back on)
    halalToggle.checked = true;
    halalToggle.dispatchEvent(new Event('change'));

    // Assert
    expect(styleRow.style.display).toBe('flex');
  });
});
