import { COUNTRIES, DEFAULT_BRANDING, INITIAL_CARDS, GRID_CONFIGS, DEMO_PRESET_ITEMS, DEFAULT_CARD } from './presets.js';
import { renderCardHtml } from './cardRenderer.js';
import { printSheet, exportSingleCard, exportFullSheet } from './exportUtils.js';
import { getI18n } from './i18n.js';
import { encodeStateToParam, decodeStateFromParam } from './stateSharing.js';

// Application State
const state = {
  lang: localStorage.getItem('butcher_lang') || 'sv',
  gridType: '2x4',
  activeCardIndex: 0,
  showCutLines: true,
  showMarginsGuide: false,
  sheetMargin: '5mm',
  sheetGap: '0mm',
  globalMonochrome: false,
  zoom: 0.85,
  cards: []
};

// DOM Elements
const appContainer = document.getElementById('app-container');
const tabBtnEditor = document.getElementById('tab-btn-editor');
const tabBtnPreview = document.getElementById('tab-btn-preview');
const a4Sheet = document.getElementById('a4-sheet');
const a4SheetWrapper = document.getElementById('a4-sheet-wrapper');
const slotPillsContainer = document.getElementById('slot-pills-container');
const activeSlotIndicator = document.getElementById('active-slot-indicator');
const btnAddCard = document.getElementById('btn-add-card');
const btnDeleteCard = document.getElementById('btn-delete-card');
const btnLayout2x4 = document.getElementById('btn-layout-2x4');
const btnLayout1x3 = document.getElementById('btn-layout-1x3');

// Inputs
const inputTitle = document.getElementById('input-title');
const selectTitleSize = document.getElementById('select-title-size');
const inputPriceInt = document.getElementById('input-price-int');
const inputPriceDec = document.getElementById('input-price-dec');
const inputUnit = document.getElementById('input-unit');
const selectPriceShape = document.getElementById('select-price-shape');
const burstColorOptions = document.getElementById('burst-color-options');

const selectCountry = document.getElementById('select-country');
const inputOrigin = document.getElementById('input-origin');
const toggleFlag = document.getElementById('toggle-flag');
const flagPreviewBadge = document.getElementById('flag-preview-badge');

const toggleHalal = document.getElementById('toggle-halal');
const selectHalalStyle = document.getElementById('select-halal-style');
const halalStyleRow = document.getElementById('halal-style-row');

const inputCompanyName = document.getElementById('input-company-name');
const inputCompanySub = document.getElementById('input-company-sub');
const selectLogoType = document.getElementById('select-logo-type');
const customLogoRow = document.getElementById('custom-logo-row');
const inputCustomLogo = document.getElementById('input-custom-logo');

const selectGridType = document.getElementById('select-grid-type');
const selectSheetMargin = document.getElementById('select-sheet-margin');
const selectSheetGap = document.getElementById('select-sheet-gap');
const selectBgTheme = document.getElementById('select-bg-theme');
const toggleGlobalMono = document.getElementById('toggle-global-mono');
const toggleCutLines = document.getElementById('toggle-cut-lines');
const toggleShowMargins = document.getElementById('toggle-show-margins');

// Action Buttons
const btnCopyToAll = document.getElementById('btn-copy-to-all');
const btnApplyBrandingAll = document.getElementById('btn-apply-branding-all');
const btnFillPresets = document.getElementById('btn-fill-presets');
const btnResetCards = document.getElementById('btn-reset-cards');

const btnPrintSheet = document.getElementById('btn-print-sheet');
const btnExportSheet = document.getElementById('btn-export-sheet');
const btnExportSingle = document.getElementById('btn-export-single');

// Zoom & Toolbar Elements
const btnZoomIn = document.getElementById('btn-zoom-in');
const btnZoomOut = document.getElementById('btn-zoom-out');
const btnZoomFit = document.getElementById('btn-zoom-fit');
const zoomPercentage = document.getElementById('zoom-percentage');
const btnToggleGuides = document.getElementById('btn-toggle-guides');
const btnToggleMono = document.getElementById('btn-toggle-mono');

/** Silently update the browser URL to reflect current state — no page reload */
function syncUrlParam() {
  try {
    const encoded = encodeStateToParam(state);
    const url = new URL(window.location.href);
    url.searchParams.set('s', encoded);
    url.searchParams.delete('nocache');
    history.replaceState(null, '', url.toString());
  } catch {
    // Non-critical — ignore if replaceState fails (e.g. cross-origin)
  }
}

/**
 * Initialize state from URL query param (?s=...) or localStorage or defaults.
 * URL param takes highest priority so shared links always reproduce exact setup.
 */
function initCardsState() {
  // --- Priority 1: URL query param ?s=... ---
  const urlParams = new URLSearchParams(window.location.search);
  const urlState = urlParams.get('s');
  if (urlState) {
    const decoded = decodeStateFromParam(urlState);
    if (decoded && Array.isArray(decoded.cards) && decoded.cards.length > 0) {
      state.gridType = decoded.gridType || '2x4';
      state.sheetMargin = decoded.sheetMargin || '5mm';
      state.sheetGap = decoded.sheetGap || '0mm';
      state.showCutLines = decoded.showCutLines ?? true;
      state.showMarginsGuide = decoded.showMarginsGuide ?? false;
      state.globalMonochrome = decoded.globalMonochrome ?? false;
      state.activeCardIndex = decoded.activeCardIndex ?? 0;
      state.lang = decoded.lang || 'sv';
      state.cards = decoded.cards;
      // Clamp active index
      if (state.activeCardIndex >= state.cards.length) state.activeCardIndex = 0;
      return; // Done — skip localStorage
    }
  }

  // --- Priority 2: localStorage ---
  const versionKey = 'butcher_v5_no_halal_company';
  const hasV5 = localStorage.getItem(versionKey);

  if (!hasV5) {
    // Cleanly initialize with 1 card without halal on company branding
    state.cards = [ JSON.parse(JSON.stringify(DEFAULT_CARD)) ];
    state.gridType = '2x4';
    localStorage.setItem(versionKey, 'true');
    persistState();
    return;
  }

  const saved = localStorage.getItem('butcher_cards_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state.gridType = parsed.gridType || '2x4';
      state.showCutLines = parsed.showCutLines ?? true;
      state.showMarginsGuide = parsed.showMarginsGuide ?? false;
      state.sheetMargin = parsed.sheetMargin || '5mm';
      state.sheetGap = parsed.sheetGap || '0mm';
      state.globalMonochrome = parsed.globalMonochrome ?? false;
      if (Array.isArray(parsed.cards) && parsed.cards.length > 0) {
        state.cards = parsed.cards.map(card => ({
          ...card,
          titleSize: card.titleSize || '22pt',
          priceShape: card.priceShape || 'sunburst',
          companySub: card.companySub === 'حلال' ? '' : (card.companySub || '')
        }));
      } else {
        state.cards = [ JSON.parse(JSON.stringify(DEFAULT_CARD)) ];
      }
    } catch {
      state.cards = [ JSON.parse(JSON.stringify(DEFAULT_CARD)) ];
    }
  } else {
    state.cards = [ JSON.parse(JSON.stringify(DEFAULT_CARD)) ];
  }

  // Ensure card count is clamped to grid capacity
  const maxCount = GRID_CONFIGS[state.gridType]?.count || 8;
  if (state.cards.length > maxCount) {
    state.cards = state.cards.slice(0, maxCount);
  }
  if (state.activeCardIndex >= state.cards.length) {
    state.activeCardIndex = 0;
  }

  // Migration for v7: ensure 22pt text size & sunburst shape are default for all cards
  const v7Key = 'prislappar_v7_22pt_sunburst';
  const hasV7 = localStorage.getItem(v7Key);
  if (!hasV7) {
    state.cards = state.cards.map(c => ({
      ...c,
      titleSize: '22pt',
      priceShape: 'sunburst'
    }));
    localStorage.setItem(v7Key, 'true');
    persistState();
  }
}

/**
 * Save state to localStorage and silently sync URL param
 */
function persistState() {
  localStorage.setItem('butcher_cards_state', JSON.stringify({
    gridType: state.gridType,
    showCutLines: state.showCutLines,
    showMarginsGuide: state.showMarginsGuide,
    sheetMargin: state.sheetMargin,
    sheetGap: state.sheetGap,
    globalMonochrome: state.globalMonochrome,
    cards: state.cards
  }));
  syncUrlParam();
}

/**
 * Add a new card one-by-one with + button
 */
function addNewCard() {
  const maxCount = GRID_CONFIGS[state.gridType]?.count || 8;
  if (state.cards.length >= maxCount) {
    return;
  }

  // Inherit store branding, halal, burst color and shape from active card
  const activeCard = state.cards[state.activeCardIndex] || DEFAULT_CARD;
  // Get next preset for authentic Swedish cut example
  const presetIndex = state.cards.length % DEMO_PRESET_ITEMS.length;
  const demoItem = DEMO_PRESET_ITEMS[presetIndex] || DEFAULT_CARD;

  const newCard = {
    ...JSON.parse(JSON.stringify(demoItem)),
    id: Date.now(),
    companyName: activeCard.companyName || DEFAULT_CARD.companyName,
    companySub: activeCard.companySub || DEFAULT_CARD.companySub,
    logoType: activeCard.logoType || DEFAULT_CARD.logoType,
    customLogoUrl: activeCard.customLogoUrl || '',
    showHalal: activeCard.showHalal ?? true,
    halalStyle: activeCard.halalStyle || 'classic',
    bgTheme: activeCard.bgTheme || 'ice-blue',
    titleSize: activeCard.titleSize || '22pt',
    priceShape: activeCard.priceShape || 'sunburst',
    burstColor: activeCard.burstColor || 'orange'
  };

  state.cards.push(newCard);
  state.activeCardIndex = state.cards.length - 1;

  persistState();
  renderSheet();
  renderSlotPills();
  syncFormFromActiveCard();
}

/**
 * Delete active card
 */
function deleteActiveCard() {
  if (state.cards.length <= 1) {
    return;
  }

  const current = state.cards[state.activeCardIndex];
  const t = getI18n(state.lang);
  const title = current?.title || 'Produkt';

  if (!confirm(t.confirmDeleteTag(title))) {
    return;
  }

  state.cards.splice(state.activeCardIndex, 1);
  if (state.activeCardIndex >= state.cards.length) {
    state.activeCardIndex = Math.max(0, state.cards.length - 1);
  }

  persistState();
  renderSheet();
  renderSlotPills();
  syncFormFromActiveCard();
}

/**
 * Switch Grid Layout (2x4, 1x3, etc.)
 */
function setGridType(type) {
  if (!GRID_CONFIGS[type]) return;
  state.gridType = type;

  // Sync quick toggle buttons
  document.querySelectorAll('.layout-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-grid') === type);
  });

  // Sync Section 5 select
  if (selectGridType) {
    selectGridType.value = type;
  }

  const maxCount = GRID_CONFIGS[type].count;
  // Clamp cards array to max slots if needed
  if (state.cards.length > maxCount) {
    state.cards = state.cards.slice(0, maxCount);
  }
  if (state.activeCardIndex >= state.cards.length) {
    state.activeCardIndex = Math.max(0, state.cards.length - 1);
  }

  persistState();
  renderSheet();
  renderSlotPills();
  syncFormFromActiveCard();
}

/**
 * Populate Country Select Dropdown
 */
function populateCountryDropdown() {
  selectCountry.innerHTML = COUNTRIES.map(c => 
    `<option value="${c.code}" data-flag="${c.flag}">${c.flag} ${c.name}</option>`
  ).join('');
}

/**
 * Render the A4 Sheet and cards (including empty slots)
 */
function renderSheet() {
  const config = GRID_CONFIGS[state.gridType] || GRID_CONFIGS['2x4'];
  const maxCount = config.count;
  const t = getI18n(state.lang);

  // Set CSS grid variables for responsive margins & gaps
  a4Sheet.style.setProperty('--sheet-margin', state.sheetMargin);
  a4Sheet.style.setProperty('--sheet-gap', state.sheetGap);
  a4Sheet.style.setProperty('--grid-cols', config.cols);
  a4Sheet.style.setProperty('--grid-rows', config.rows);

  // Update sheet classes
  const classes = [
    `grid-${state.gridType}`,
    state.showCutLines ? 'show-cut-lines' : '',
    state.showMarginsGuide ? 'show-margins' : '',
    state.globalMonochrome ? 'sheet-monochrome' : ''
  ].filter(Boolean);

  a4Sheet.className = classes.join(' ');

  let html = '';
  for (let i = 0; i < maxCount; i++) {
    if (i < state.cards.length) {
      // Configured price tag
      const cardData = state.cards[i];
      const isSelected = i === state.activeCardIndex;
      html += renderCardHtml(cardData, i, isSelected, state.globalMonochrome);
    } else {
      // Empty placeholder slot
      html += `
        <div class="empty-card-slot" data-empty-index="${i}" title="${t.clickToAdd}">
          <div class="empty-card-plus">+</div>
          <div class="empty-card-text">${t.addTag} #${i + 1}</div>
        </div>
      `;
    }
  }

  a4Sheet.innerHTML = html;

  // Add click listeners to cards on sheet
  const cardElements = a4Sheet.querySelectorAll('.price-card');
  cardElements.forEach(el => {
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-card-index'), 10);
      setActiveCardIndex(idx);
      if (window.innerWidth <= 880) {
        setMobileView('editor');
      }
    });
  });

  // Add click listeners to empty slots on sheet to add card
  const emptySlots = a4Sheet.querySelectorAll('.empty-card-slot');
  emptySlots.forEach(el => {
    el.addEventListener('click', () => {
      addNewCard();
      if (window.innerWidth <= 880) {
        setMobileView('editor');
      }
    });
  });
}

/**
 * Render slot selector pills in sidebar
 */
function renderSlotPills() {
  const config = GRID_CONFIGS[state.gridType] || GRID_CONFIGS['2x4'];
  const maxCount = config.count;
  const currentCount = state.cards.length;
  const t = getI18n(state.lang);

  let html = '';
  for (let i = 0; i < currentCount; i++) {
    const isActive = i === state.activeCardIndex;
    html += `<button type="button" class="slot-btn ${isActive ? 'active' : ''}" data-slot-index="${i}">#${i + 1}</button>`;
  }
  slotPillsContainer.innerHTML = html;

  slotPillsContainer.querySelectorAll('.slot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-slot-index'), 10);
      setActiveCardIndex(idx);
    });
  });

  // Indicator: "Lapp #1 av 1 (max 8)"
  activeSlotIndicator.textContent = t.tagIndicator(state.activeCardIndex + 1, currentCount, maxCount);

  // Show/Hide Add button
  if (btnAddCard) {
    if (currentCount < maxCount) {
      btnAddCard.style.display = 'inline-flex';
      btnAddCard.title = `${t.addTag} (#${currentCount + 1})`;
    } else {
      btnAddCard.style.display = 'none';
    }
  }

  // Show/Hide Delete button (only when > 1 card exists)
  if (btnDeleteCard) {
    btnDeleteCard.style.display = currentCount > 1 ? 'inline-flex' : 'none';
  }
}

/**
 * Set active card and synchronize form inputs
 */
function setActiveCardIndex(idx) {
  state.activeCardIndex = idx;
  renderSlotPills();
  syncFormFromActiveCard();

  const cards = a4Sheet.querySelectorAll('.price-card');
  cards.forEach((c, i) => {
    if (i === idx) {
      c.classList.add('is-selected');
      c.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      c.classList.remove('is-selected');
    }
  });
}

/**
 * Update form inputs to match active card's state
 */
function syncFormFromActiveCard() {
  const card = state.cards[state.activeCardIndex];
  if (!card) return;

  inputTitle.value = card.title || '';
  selectTitleSize.value = card.titleSize || '22pt';
  inputPriceInt.value = card.priceInt || '';
  inputPriceDec.value = card.priceDec || '';
  inputUnit.value = card.unit || '/kg';
  selectPriceShape.value = card.priceShape || 'sunburst';

  // Burst color
  burstColorOptions.querySelectorAll('.color-chip').forEach(chip => {
    if (chip.getAttribute('data-color') === (card.burstColor || 'orange')) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  // Country & origin
  inputOrigin.value = card.origin || '';
  toggleFlag.checked = !!card.showFlag;
  flagPreviewBadge.textContent = card.flagEmoji || '🇱🇹';

  const matchedCountry = COUNTRIES.find(c => c.name.toLowerCase() === (card.origin || '').toLowerCase());
  if (matchedCountry) {
    selectCountry.value = matchedCountry.code;
  } else {
    selectCountry.value = 'CUSTOM';
  }

  // Halal
  toggleHalal.checked = !!card.showHalal;
  selectHalalStyle.value = card.halalStyle || 'classic';
  halalStyleRow.style.display = card.showHalal ? 'flex' : 'none';

  // Branding
  inputCompanyName.value = card.companyName || DEFAULT_BRANDING.companyName;
  inputCompanySub.value = card.companySub || DEFAULT_BRANDING.companySub;
  selectLogoType.value = card.logoType || 'crown';
  customLogoRow.style.display = card.logoType === 'custom' ? 'flex' : 'none';

  // Theme, Margins & Grid (if present)
  if (selectBgTheme) selectBgTheme.value = card.bgTheme || 'ice-blue';
  if (selectGridType) selectGridType.value = state.gridType;
  if (selectSheetMargin) selectSheetMargin.value = state.sheetMargin;
  if (selectSheetGap) selectSheetGap.value = state.sheetGap;
  if (toggleGlobalMono) toggleGlobalMono.checked = state.globalMonochrome;
  if (toggleCutLines) toggleCutLines.checked = state.showCutLines;
  if (toggleShowMargins) toggleShowMargins.checked = state.showMarginsGuide;

  btnToggleGuides.classList.toggle('active', state.showCutLines);
  btnToggleMono.classList.toggle('active', state.globalMonochrome);
}

/**
 * Update current active card from form inputs
 */
function updateActiveCard(changes) {
  const card = state.cards[state.activeCardIndex];
  if (!card) return;

  Object.assign(card, changes);
  persistState();

  // Re-render single card element in DOM
  const oldElement = document.getElementById(`card-item-${state.activeCardIndex}`);
  if (oldElement) {
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = renderCardHtml(card, state.activeCardIndex, true, state.globalMonochrome);
    const newElement = tempContainer.firstElementChild;
    oldElement.replaceWith(newElement);

    newElement.addEventListener('click', () => {
      setActiveCardIndex(state.activeCardIndex);
    });
  } else {
    renderSheet();
  }
}

/**
 * Setup event listeners for all form controls
 */
function setupEventListeners() {
  // Item & Pricing
  inputTitle.addEventListener('input', (e) => updateActiveCard({ title: e.target.value }));
  selectTitleSize.addEventListener('change', (e) => updateActiveCard({ titleSize: e.target.value }));
  inputPriceInt.addEventListener('input', (e) => updateActiveCard({ priceInt: e.target.value }));
  inputPriceDec.addEventListener('input', (e) => updateActiveCard({ priceDec: e.target.value }));
  inputUnit.addEventListener('change', (e) => updateActiveCard({ unit: e.target.value }));
  selectPriceShape.addEventListener('change', (e) => updateActiveCard({ priceShape: e.target.value }));

  // Burst color options
  burstColorOptions.querySelectorAll('.color-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      burstColorOptions.querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      updateActiveCard({ burstColor: chip.getAttribute('data-color') });
    });
  });

  // Country select
  selectCountry.addEventListener('change', (e) => {
    const countryCode = e.target.value;
    const country = COUNTRIES.find(c => c.code === countryCode);

    if (country && countryCode !== 'CUSTOM') {
      inputOrigin.value = country.name;
      flagPreviewBadge.textContent = country.flag;
      updateActiveCard({
        origin: country.name,
        flagEmoji: country.flag
      });
    }
  });

  inputOrigin.addEventListener('input', (e) => {
    updateActiveCard({ origin: e.target.value });
  });

  toggleFlag.addEventListener('change', (e) => {
    updateActiveCard({ showFlag: e.target.checked });
  });

  // Halal
  toggleHalal.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    halalStyleRow.style.display = isChecked ? 'flex' : 'none';
    updateActiveCard({ showHalal: isChecked });
  });

  selectHalalStyle.addEventListener('change', (e) => {
    updateActiveCard({ halalStyle: e.target.value });
  });

  // Branding
  inputCompanyName.addEventListener('input', (e) => updateActiveCard({ companyName: e.target.value }));
  inputCompanySub.addEventListener('input', (e) => updateActiveCard({ companySub: e.target.value }));

  selectLogoType.addEventListener('change', (e) => {
    const val = e.target.value;
    customLogoRow.style.display = val === 'custom' ? 'flex' : 'none';
    updateActiveCard({ logoType: val });
  });

  inputCustomLogo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateActiveCard({
          customLogoUrl: event.target.result,
          logoType: 'custom'
        });
      };
      reader.readAsDataURL(file);
    }
  });

  // Margins, Gaps, Theme & Grid
  if (selectSheetMargin) {
    selectSheetMargin.addEventListener('change', (e) => {
      state.sheetMargin = e.target.value;
      persistState();
      renderSheet();
    });
  }

  if (selectSheetGap) {
    selectSheetGap.addEventListener('change', (e) => {
      state.sheetGap = e.target.value;
      persistState();
      renderSheet();
    });
  }

  if (selectBgTheme) {
    selectBgTheme.addEventListener('change', (e) => {
      updateActiveCard({ bgTheme: e.target.value });
    });
  }

  if (selectGridType) {
    selectGridType.addEventListener('change', (e) => {
      setGridType(e.target.value);
    });
  }

  // Quick Layout Switcher Buttons (2x4 vs 1x3)
  if (btnLayout2x4) {
    btnLayout2x4.addEventListener('click', () => setGridType('2x4'));
  }
  if (btnLayout1x3) {
    btnLayout1x3.addEventListener('click', () => setGridType('1x3'));
  }

  // Add Card & Delete Card
  if (btnAddCard) {
    btnAddCard.addEventListener('click', addNewCard);
  }
  if (btnDeleteCard) {
    btnDeleteCard.addEventListener('click', deleteActiveCard);
  }

  if (toggleGlobalMono) {
    toggleGlobalMono.addEventListener('change', (e) => {
      state.globalMonochrome = e.target.checked;
      if (btnToggleMono) btnToggleMono.classList.toggle('active', state.globalMonochrome);
      persistState();
      renderSheet();
    });
  }

  if (btnToggleMono) {
    btnToggleMono.addEventListener('click', () => {
      state.globalMonochrome = !state.globalMonochrome;
      if (toggleGlobalMono) toggleGlobalMono.checked = state.globalMonochrome;
      btnToggleMono.classList.toggle('active', state.globalMonochrome);
      persistState();
      renderSheet();
    });
  }

  if (toggleCutLines) {
    toggleCutLines.addEventListener('change', (e) => {
      state.showCutLines = e.target.checked;
      if (btnToggleGuides) btnToggleGuides.classList.toggle('active', state.showCutLines);
      persistState();
      renderSheet();
    });
  }

  if (btnToggleGuides) {
    btnToggleGuides.addEventListener('click', () => {
      state.showCutLines = !state.showCutLines;
      if (toggleCutLines) toggleCutLines.checked = state.showCutLines;
      btnToggleGuides.classList.toggle('active', state.showCutLines);
      persistState();
      renderSheet();
    });
  }

  if (toggleShowMargins) {
    toggleShowMargins.addEventListener('change', (e) => {
      state.showMarginsGuide = e.target.checked;
      persistState();
      renderSheet();
    });
  }

  // Language switcher pills
  document.querySelectorAll('.lang-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  // Batch actions
  btnCopyToAll.addEventListener('click', () => {
    const active = state.cards[state.activeCardIndex];
    const t = getI18n(state.lang);
    if (confirm(t.confirmCopyAll(active.title || 'Produkt'))) {
      state.cards = state.cards.map((c, i) => ({
        ...JSON.parse(JSON.stringify(active)),
        id: i + 1
      }));
      persistState();
      renderSheet();
    }
  });

  btnApplyBrandingAll.addEventListener('click', () => {
    const active = state.cards[state.activeCardIndex];
    const t = getI18n(state.lang);
    state.cards.forEach(card => {
      card.companyName = active.companyName;
      card.companySub = active.companySub;
      card.logoType = active.logoType;
      card.customLogoUrl = active.customLogoUrl;
      card.showHalal = active.showHalal;
      card.halalStyle = active.halalStyle;
      card.bgTheme = active.bgTheme;
    });
    persistState();
    renderSheet();
    alert(t.brandingApplied);
  });

  btnFillPresets.addEventListener('click', () => {
    const t = getI18n(state.lang);
    if (confirm(t.confirmFillPresets)) {
      const maxCount = GRID_CONFIGS[state.gridType]?.count || 8;
      state.cards = DEMO_PRESET_ITEMS.slice(0, maxCount).map((item, idx) => ({
        ...JSON.parse(JSON.stringify(item)),
        id: idx + 1
      }));
      state.activeCardIndex = 0;
      persistState();
      renderSheet();
      renderSlotPills();
      syncFormFromActiveCard();
    }
  });

  btnResetCards.addEventListener('click', () => {
    const t = getI18n(state.lang);
    if (confirm(t.confirmReset)) {
      localStorage.removeItem('butcher_cards_state');
      localStorage.removeItem('butcher_v4_single_card');
      localStorage.removeItem('butcher_v5_no_halal_company');
      localStorage.removeItem('prislappar_v7_22pt_sunburst');
      initCardsState();
      renderSheet();
      renderSlotPills();
      syncFormFromActiveCard();
    }
  });

  // Print & Export
  btnPrintSheet.addEventListener('click', () => {
    printSheet();
  });

  btnExportSheet.addEventListener('click', async () => {
    try {
      btnExportSheet.disabled = true;
      btnExportSheet.textContent = 'Sparar...';
      await exportFullSheet(`A4-prislappar-${Date.now()}.png`);
    } catch (err) {
      console.error(err);
      alert('Kunde inte exportera hela arket: ' + err.message);
    } finally {
      btnExportSheet.disabled = false;
      btnExportSheet.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Hela A4 (PNG)</span>
      `;
    }
  });

  btnExportSingle.addEventListener('click', async () => {
    try {
      const card = state.cards[state.activeCardIndex];
      const filename = `prislapp-${(card.title || 'vara').toLowerCase().replace(/\s+/g, '-')}.png`;
      btnExportSingle.disabled = true;
      btnExportSingle.textContent = 'Sparar...';
      await exportSingleCard(state.activeCardIndex, filename);
    } catch (err) {
      console.error(err);
      alert('Kunde inte exportera vald prislapp: ' + err.message);
    } finally {
      btnExportSingle.disabled = false;
      btnExportSingle.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <span>Vald lapp (PNG)</span>
      `;
    }
  });

  // Zoom Toolbar
  btnZoomIn.addEventListener('click', () => setZoom(state.zoom + 0.1));
  btnZoomOut.addEventListener('click', () => setZoom(state.zoom - 0.1));
  btnZoomFit.addEventListener('click', autoFitZoom);

  // Mobile Navigation Tabs
  if (tabBtnEditor && tabBtnPreview) {
    tabBtnEditor.addEventListener('click', () => setMobileView('editor'));
    tabBtnPreview.addEventListener('click', () => setMobileView('preview'));
  }

  // Handle window resizing
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 880) {
      if (appContainer.classList.contains('view-preview')) {
        autoFitZoom();
      }
    } else {
      autoFitZoom();
    }
  });
}

/**
 * Mobile View Switcher (Editor vs Preview)
 */
function setMobileView(view) {
  if (view === 'editor') {
    appContainer.classList.remove('view-preview');
    appContainer.classList.add('view-editor');
    if (tabBtnEditor) tabBtnEditor.classList.add('active');
    if (tabBtnPreview) tabBtnPreview.classList.remove('active');
  } else {
    appContainer.classList.remove('view-editor');
    appContainer.classList.add('view-preview');
    if (tabBtnEditor) tabBtnEditor.classList.remove('active');
    if (tabBtnPreview) tabBtnPreview.classList.add('active');
    // Re-calculate zoom when switching to preview
    setTimeout(autoFitZoom, 40);
  }
}

/**
 * Switch Application Language ('sv', 'tr', 'en')
 * Note: Price label examples remain in Swedish as requested.
 */
function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('butcher_lang', lang);

  const t = getI18n(lang);

  // Translate all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // Update language switcher active pill
  document.querySelectorAll('.lang-pill-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  btnCopyToAll.title = t.tipCopyToAll;
  btnApplyBrandingAll.title = t.tipApplyBranding;
  btnFillPresets.title = t.tipFillPresets;
  btnResetCards.title = t.tipReset;
  inputTitle.placeholder = t.productPlaceholder;

  // Re-render slot pills and sheet for localized empty slot text and indicators
  renderSlotPills();
  renderSheet();
}

/**
 * Apply Zoom to preview stage
 */
function setZoom(newZoom) {
  state.zoom = Math.min(Math.max(newZoom, 0.2), 1.8);
  document.documentElement.style.setProperty('--preview-zoom', state.zoom);
  zoomPercentage.textContent = `${Math.round(state.zoom * 100)}%`;
}

/**
 * Fit A4 Sheet to available window viewport (calculates both width & height)
 */
function autoFitZoom() {
  const viewport = document.getElementById('viewport-stage');
  if (!viewport) return;

  const approxA4HeightPx = 1122; // 297mm @ 96 DPI
  const approxA4WidthPx = 794;   // 210mm @ 96 DPI

  const availableHeight = Math.max((viewport.clientHeight || window.innerHeight - 80) - 70, 200);
  const availableWidth = Math.max((viewport.clientWidth || window.innerWidth) - 20, 260);

  const scaleH = availableHeight / approxA4HeightPx;
  const scaleW = availableWidth / approxA4WidthPx;

  // On narrow screens (like 320px), scaleW governs the fit!
  const calculatedZoom = Math.min(scaleH, scaleW, 1.05);
  setZoom(Math.max(calculatedZoom, 0.22));
}

/**
 * Application Bootstrapper
 */
function main() {
  populateCountryDropdown();
  initCardsState();
  renderSheet();
  renderSlotPills();
  syncFormFromActiveCard();
  setupEventListeners();

  // Apply saved or default language
  setLanguage(state.lang);

  // Set initial mobile view
  if (window.innerWidth <= 880) {
    setMobileView('editor');
  }

  autoFitZoom();
}

// Start app
window.addEventListener('DOMContentLoaded', main);

