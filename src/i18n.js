/**
 * Internationalization (i18n) translations for Swedish, Turkish, and English.
 * Note: Price label product examples (e.g. Kalvframdel, Högrev) remain Swedish as requested.
 */
export const TRANSLATIONS = {
  sv: {
    // Header & App Brand
    brandTitle: 'PRISLAPPAR',
    brandTag: 'A4 MALL',
    langSelectorLabel: 'Språk',

    // Slot selector & layout
    selectTagToEdit: 'Prislappar',
    tagIndicator: (active, total, max) => max ? `Lapp #${active} av ${total} (max ${max})` : `Lapp #${active} av ${total}`,
    addTag: 'Lägg till lapp',
    deleteTag: 'Ta bort lapp',
    clickToAdd: 'Klicka för att lägga till prislapp',
    layoutLabel: 'Layout & Format',
    grid1x3: '1 × 3 (3 st - Breda Skyltar)',
    confirmDeleteTag: (title) => `Vill du ta bort prislappen "${title}"?`,

    // Mobile nav
    tabEdit: 'Redigera',
    tabPreview: 'A4 Förhandsvisning',

    // Section 1: Produkt & Pris
    secProductPrice: 'Produkt & Pris',
    productName: 'Produktnamn',
    productPlaceholder: 't.ex. Kalvframdel',
    fontSize: 'Textstorlek',
    fontSizeHint: 'Auto no-wrap',
    size22: 'Standard (22pt)',
    sizeAuto: 'Auto (No-wrap)',
    sizeXLarge: 'Extra stor (24pt)',
    sizeLarge: 'Stor (20pt)',
    priceKr: 'Pris (kr)',
    cents: 'Ören',
    unit: 'Enhet',
    priceShape: 'Form på prisbakgrund (Illustration)',
    shapeStarburst: '💥 Comic Explosion (Klassisk stjärna)',
    shapeBurstSharp: '⚡ Tagging Stjärna (16-Uddig)',
    shapeSeal: '🏷️ Slaktarsigill (Rund Rosett)',
    shapeSunburst: '☀️ Solstrålar (Retro Sunburst)',
    shapeOctagon: '🛑 Prisoktagon (Stoppskylt)',
    shapeBadge: '🎖️ Prisplakett (Klassisk Plakett)',
    shapeDiamond: '💠 Diamant (Romb)',
    shapeCircle: '⚪ Minimal Cirkel (Ren Disc)',
    priceBgColor: 'Prisbakgrund färg & stil',

    // Section 2: Ursprung & Flagga
    secOrigin: 'Ursprung & Flagga',
    selectCountryQuick: 'Välj Land (Snabbval)',
    originText: 'Ursprungstext på skylt',
    showFlag: 'Visa nationalflagga',

    // Section 3: Halal
    secHalal: 'Halal Certifiering',
    showHalal: 'Visa Halal stämpel',
    stampStyle: 'Stämpelstil',
    stampClassic: 'Klassisk Svart Oval',
    stampGold: 'Gyllene Emblem',
    stampGreen: 'Grön Certifierad',

    // Section 4: Företagsnamn & Logo
    secCompany: 'Företagsnamn & Logo',
    companyName: 'Företagsnamn',
    companySub: 'Underrubrik / Ribbon text',
    logoType: 'Logotyp ikon',
    logoCrown: 'Gyllene Kungakrona',
    logoMeat: 'Köttöxa / Charkikon',
    logoCustom: 'Egen uppladdad logotyp...',
    logoNone: 'Ingen ikon',
    uploadLogo: 'Ladda upp logotyp (PNG/JPG)',

    // Section 5: Format & Marginaler
    secFormat: 'Format & Marginaler',
    gridType: 'A4 Rutnät & Antal',
    grid2x4: '2 × 4 (8 st prislappar - Standard A4)',
    grid2x3: '2 × 3 (6 st prislappar)',
    grid2x2: '2 × 2 (4 st - A6 format)',
    grid1x2: '1 × 2 (2 st - A5 skyltar)',
    grid1x1: '1 × 1 (1 st - Hel A4 poster)',
    sheetMargin: 'Sidmarginal',
    marginSafeHint: 'Skrivarsäker',
    margin5: '5 mm (Säker standard)',
    margin0: '0 mm (Kantfri / Bleed)',
    margin8: '8 mm (Extra säker)',
    margin10: '10 mm (Bred)',
    sheetGap: 'Klippmarginal',
    gapHint: 'Mellanrum',
    gap0: '0 mm (Delad linje)',
    gap2: '2 mm (Distans)',
    gap4: '4 mm (Rymlig)',
    bgTheme: 'Bakgrundston',
    bgIceBlue: 'Isblå Delikatess',
    bgWhite: 'Klassisk Ren Vit',
    bgYellow: 'Varm Butiksgul',
    bgKraft: 'Charkpapper Kraft',
    bgMono: 'Ren Svartvit (Laser / B&W)',
    monoPrint: 'Svartvit / Monokrom utskrift',
    monoHint: 'Optimerad kontrast',
    showCutLines: 'Visa streckade klipplinjer',
    showSafetyMargin: 'Visa säker skrivarmarginal',

    // Batch Actions
    btnCopyToAll: 'Kopiera till alla',
    btnApplyBranding: 'Branding alla',
    btnFillPresets: 'Fyll chark',
    btnReset: 'Återställ',
    tipCopyToAll: 'Kopiera nuvarande lapps inställningar till alla platser',
    tipApplyBranding: 'Tillämpa butiksnamn och logo på alla lappar',
    tipFillPresets: 'Fyll alla platser med vanliga charkartiklar',
    tipReset: 'Återställ till standard',

    // Footer actions
    btnPrint: 'SKRIV UT A4 (PRINT)',
    btnExportSheet: 'Hela A4 (PNG)',
    btnExportSingle: 'Vald lapp (PNG)',
    btnShareLink: 'Dela länk',
    linkCopied: 'Delningslänk kopierad till urklipp! 📋',
    savingText: 'Sparar...',

    // Toolbar
    btnMono: 'Svartvit',
    btnCutLines: 'Klipplinjer',

    // Dialogs
    confirmCopyAll: (name) => `Vill du kopiera "${name}" till alla prislappar på A4-arket?`,
    brandingApplied: 'Butiksbranding och stil applicerades på alla prislappar!',
    confirmFillPresets: 'Fyll alla prislappar med autentiska svenska charkartiklar?',
    confirmReset: 'Återställ alla ändringar till standardmallen?'
  },

  tr: {
    // Header & App Brand
    brandTitle: 'PRISLAPPAR',
    brandTag: 'A4 ŞABLONU',
    langSelectorLabel: 'Dil',

    // Slot selector & layout
    selectTagToEdit: 'Etiketler',
    tagIndicator: (active, total, max) => max ? `Etiket #${active} / ${total} (maks ${max})` : `Etiket #${active} / ${total}`,
    addTag: 'Etiket Ekle',
    deleteTag: 'Etiketi Sil',
    clickToAdd: 'Fiyat etiketi eklemek için tıklayın',
    layoutLabel: 'Düzen & Format',
    grid1x3: '1 × 3 (3 adet - Geniş Tabela)',
    confirmDeleteTag: (title) => `"${title}" etiketini silmek istiyor musunuz?`,

    // Mobile nav
    tabEdit: 'Düzenle',
    tabPreview: 'A4 Önizleme',

    // Section 1: Produkt & Pris
    secProductPrice: 'Ürün ve Fiyat',
    productName: 'Ürün Adı',
    productPlaceholder: 'ör. Lammframdel',
    fontSize: 'Yazı Boyutu',
    fontSizeHint: 'Oto satır bölme yok',
    size22: 'Standart (22pt)',
    sizeAuto: 'Otomatik (No-wrap)',
    sizeXLarge: 'Çok Büyük (24pt)',
    sizeLarge: 'Büyük (20pt)',
    priceKr: 'Fiyat (kr)',
    cents: 'Kuruş',
    unit: 'Birim',
    priceShape: 'Fiyat Arka Plan Şekli (İllüstrasyon)',
    shapeStarburst: '💥 Çizgi Roman Patlaması (Yıldız)',
    shapeBurstSharp: '⚡ Sivri İndirim Yıldızı (16 Köşeli)',
    shapeSeal: '🏷️ Kasap Mührü (Yuvarlak Rozet)',
    shapeSunburst: '☀️ Güneş Işınları (Retro Sunburst)',
    shapeOctagon: '🛑 Fiyat Sekizgeni (Dur Tabelası)',
    shapeBadge: '🎖️ Fiyat Plaketi (Klasik Rozet)',
    shapeDiamond: '💠 Elmas (Baklava Dilimi)',
    shapeCircle: '⚪ Minimal Daire (Sade Disk)',
    priceBgColor: 'Fiyat Arka Plan Rengi ve Stili',

    // Section 2: Ursprung & Flagga
    secOrigin: 'Menşei ve Bayrak',
    selectCountryQuick: 'Ülke Seç (Hızlı Seçim)',
    originText: 'Etiketteki menşei metni',
    showFlag: 'Ülke bayrağını göster',

    // Section 3: Halal
    secHalal: 'Helal Sertifikası',
    showHalal: 'Helal damgasını göster',
    stampStyle: 'Damga Stili',
    stampClassic: 'Klasik Siyah Oval',
    stampGold: 'Altın Amblem',
    stampGreen: 'Yeşil Sertifikalı',

    // Section 4: Företagsnamn & Logo
    secCompany: 'Şirket / Kasap Adı ve Logo',
    companyName: 'Firma / Kasap Adı',
    companySub: 'Alt Başlık / Şerit Metni',
    logoType: 'Logo Simgesi',
    logoCrown: 'Altın Kral Tacı',
    logoMeat: 'Kasap Satırı / Et Simgesi',
    logoCustom: 'Özel logo yükle...',
    logoNone: 'Simge yok',
    uploadLogo: 'Logo Yükle (PNG/JPG)',

    // Section 5: Format & Marginaler
    secFormat: 'Format ve Kenar Boşlukları',
    gridType: 'A4 Izgara ve Adet',
    grid2x4: '2 × 4 (8 adet etiket - Standart A4)',
    grid2x3: '2 × 3 (6 adet etiket)',
    grid2x2: '2 × 2 (4 adet - A6 boyutu)',
    grid1x2: '1 × 2 (2 adet - A5 tabela)',
    grid1x1: '1 × 1 (1 adet - Tam A4 afiş)',
    sheetMargin: 'Sayfa Kenar Boşluğu',
    marginSafeHint: 'Yazıcı Güvenli',
    margin5: '5 mm (Standart Güvenli)',
    margin0: '0 mm (Kenarlıksız / Bleed)',
    margin8: '8 mm (Ekstra Güvenli)',
    margin10: '10 mm (Geniş)',
    sheetGap: 'Kesim Boşluğu',
    gapHint: 'Aralık',
    gap0: '0 mm (Ortak kesim çizgisi)',
    gap2: '2 mm (Aralıklı)',
    gap4: '4 mm (Geniş aralık)',
    bgTheme: 'Arka Plan Tonu',
    bgIceBlue: 'Buz Mavisi Şarküteri',
    bgWhite: 'Klasik Saf Beyaz',
    bgYellow: 'Sıcak Mağaza Sarısı',
    bgKraft: 'Kasap Kraft Kağıdı',
    bgMono: 'Saf Siyah-Beyaz (Lazer / B&W)',
    monoPrint: 'Siyah-Beyaz / Monokrom Baskı',
    monoHint: 'Optimize kontrast',
    showCutLines: 'Kesikli kesim çizgilerini göster',
    showSafetyMargin: 'Yazıcı güvenlik kenarlığını göster',

    // Batch Actions
    btnCopyToAll: 'Tümüne Kopyala',
    btnApplyBranding: 'Markayı Uygula',
    btnFillPresets: 'Örnekleri Doldur',
    btnReset: 'Sıfırla',
    tipCopyToAll: 'Mevcut etiketi A4 üzerindeki tüm yuvalara kopyala',
    tipApplyBranding: 'Mağaza adını ve logosunu tüm etiketlere uygula',
    tipFillPresets: 'Tüm etiketleri standart İsveç kasap ürünleriyle doldur',
    tipReset: 'Standart ayarlara geri dön',

    // Footer actions
    btnPrint: 'A4 YAZDIR (PRINT / PDF)',
    btnExportSheet: 'Tüm A4 (PNG)',
    btnExportSingle: 'Seçili Etiket (PNG)',
    btnShareLink: 'Linki Paylaş',
    linkCopied: 'Paylaşım linki panoya kopyalandı! 📋',
    savingText: 'Kaydediliyor...',

    // Toolbar
    btnMono: 'Siyah-Beyaz',
    btnCutLines: 'Kesim Çizgileri',

    // Dialogs
    confirmCopyAll: (name) => `"${name}" etiketini A4 sayfasındaki tüm etiketlere kopyalamak istiyor musunuz?`,
    brandingApplied: 'Mağaza markası ve stil tüm etiketlere başarıyla uygulandı!',
    confirmFillPresets: 'Tüm etiketleri örnek İsveç et ürünleriyle doldurmak istiyor musunuz?',
    confirmReset: 'Tüm değişiklikleri varsayılan şablona sıfırlamak istiyor musunuz?'
  },

  en: {
    // Header & App Brand
    brandTitle: 'PRISLAPPAR',
    brandTag: 'A4 TEMPLATE',
    langSelectorLabel: 'Language',

    // Slot selector & layout
    selectTagToEdit: 'Price Tags',
    tagIndicator: (active, total, max) => max ? `Tag #${active} of ${total} (max ${max})` : `Tag #${active} of ${total}`,
    addTag: 'Add Tag',
    deleteTag: 'Delete Tag',
    clickToAdd: 'Click to add price tag',
    layoutLabel: 'Layout & Format',
    grid1x3: '1 × 3 (3 tags - Wide Signs)',
    confirmDeleteTag: (title) => `Do you want to delete the price tag "${title}"?`,

    // Mobile nav
    tabEdit: 'Edit',
    tabPreview: 'A4 Preview',

    // Section 1: Produkt & Pris
    secProductPrice: 'Product & Price',
    productName: 'Product Name',
    productPlaceholder: 'e.g. Kalvframdel',
    fontSize: 'Font Size',
    fontSizeHint: 'Auto no-wrap',
    size22: 'Standard (22pt)',
    sizeAuto: 'Auto (No-wrap)',
    sizeXLarge: 'Extra Large (24pt)',
    sizeLarge: 'Large (20pt)',
    priceKr: 'Price (kr)',
    cents: 'Cents',
    unit: 'Unit',
    priceShape: 'Price Background Shape (Illustration)',
    shapeStarburst: '💥 Comic Explosion (Classic Starburst)',
    shapeBurstSharp: '⚡ Sharp Discount Star (16-Point)',
    shapeSeal: '🏷️ Butcher Stamp (Round Rosette)',
    shapeSunburst: '☀️ Sunburst Rays (Retro Wedges)',
    shapeOctagon: '🛑 Price Octagon (Stop Sign Badge)',
    shapeBadge: '🎖️ Retail Plaque (Classic Badge)',
    shapeDiamond: '💠 Diamond (Rhombus Tag)',
    shapeCircle: '⚪ Minimal Circle (Clean Disc)',
    priceBgColor: 'Price Background Color & Style',

    // Section 2: Ursprung & Flagga
    secOrigin: 'Origin & Flag',
    selectCountryQuick: 'Select Country (Quick pick)',
    originText: 'Origin text on price tag',
    showFlag: 'Show national flag',

    // Section 3: Halal
    secHalal: 'Halal Certification',
    showHalal: 'Show Halal stamp',
    stampStyle: 'Stamp Style',
    stampClassic: 'Classic Black Oval',
    stampGold: 'Golden Emblem',
    stampGreen: 'Green Certified',

    // Section 4: Företagsnamn & Logo
    secCompany: 'Company Name & Logo',
    companyName: 'Company Name',
    companySub: 'Subtitle / Ribbon text',
    logoType: 'Logo Icon',
    logoCrown: 'Golden Royal Crown',
    logoMeat: 'Meat Cleaver / Butcher Icon',
    logoCustom: 'Upload custom logo...',
    logoNone: 'No icon',
    uploadLogo: 'Upload Logo (PNG/JPG)',

    // Section 5: Format & Marginaler
    secFormat: 'Format & Margins',
    gridType: 'A4 Grid & Count',
    grid2x4: '2 × 4 (8 tags - Standard A4)',
    grid2x3: '2 × 3 (6 tags)',
    grid2x2: '2 × 2 (4 tags - A6 size)',
    grid1x2: '1 × 2 (2 tags - A5 sign)',
    grid1x1: '1 × 1 (1 tag - Full A4 poster)',
    sheetMargin: 'Sheet Margin',
    marginSafeHint: 'Printer-safe',
    margin5: '5 mm (Safe Standard)',
    margin0: '0 mm (Borderless / Bleed)',
    margin8: '8 mm (Extra Safe)',
    margin10: '10 mm (Wide)',
    sheetGap: 'Cut Gap',
    gapHint: 'Spacing',
    gap0: '0 mm (Shared cut line)',
    gap2: '2 mm (Spaced)',
    gap4: '4 mm (Wide gap)',
    bgTheme: 'Background Tone',
    bgIceBlue: 'Ice Blue Deli',
    bgWhite: 'Classic Pure White',
    bgYellow: 'Warm Retail Yellow',
    bgKraft: 'Butcher Kraft Paper',
    bgMono: 'Pure Black & White (Laser / B&W)',
    monoPrint: 'Black & White / Monochrome Print',
    monoHint: 'Optimized contrast',
    showCutLines: 'Show dashed cut lines',
    showSafetyMargin: 'Show printer safety boundary',

    // Batch Actions
    btnCopyToAll: 'Copy to All',
    btnApplyBranding: 'Apply Branding',
    btnFillPresets: 'Fill Presets',
    btnReset: 'Reset',
    tipCopyToAll: 'Copy current tag settings to all slots on A4 sheet',
    tipApplyBranding: 'Apply shop name and logo to all price tags',
    tipFillPresets: 'Fill all slots with authentic Swedish butcher products',
    tipReset: 'Reset all changes to standard template',

    // Footer actions
    btnPrint: 'PRINT A4 (PRINT / PDF)',
    btnExportSheet: 'Full A4 (PNG)',
    btnExportSingle: 'Selected Tag (PNG)',
    btnShareLink: 'Share Link',
    linkCopied: 'Share link copied to clipboard! 📋',
    savingText: 'Saving...',

    // Toolbar
    btnMono: 'B&W',
    btnCutLines: 'Cut Lines',

    // Dialogs
    confirmCopyAll: (name) => `Do you want to copy "${name}" to all price tags on the A4 sheet?`,
    brandingApplied: 'Store branding and style applied to all price tags!',
    confirmFillPresets: 'Fill all price tags with authentic Swedish meat cuts?',
    confirmReset: 'Reset all changes to default template?'
  }
};

/**
 * Get translation dictionary for given language code ('sv', 'tr', 'en')
 */
export function getI18n(lang = 'sv') {
  return TRANSLATIONS[lang] || TRANSLATIONS.sv;
}
