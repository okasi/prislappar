# 🏷️ Prislappar — A4 Price Tag Generator for Shops & Butchers

**Prislappar is a browser-based price tag maker for creating printable A4 retail labels, butcher shop signs, and deli price cards.** Edit product names, prices, units, and store branding in a live preview, then print your sheet or save it as a PDF through your browser.

“Prislappar” means “price tags” in Swedish. The app includes **English, Swedish, and Turkish** interface options and runs as a static website without an application backend or account registration.

## ✨ Features

- **Live A4 preview:** Click a price tag to edit it, add new tags, or remove existing ones. Mobile users can switch between editing and preview views.
- **Flexible sheet layouts:** Choose eight price tags, three wide signs, two larger signs, or one full-page poster. Switch between portrait and landscape orientation.
- **Product and price controls:** Customize product names, text sizes, whole prices, decimals, and units such as `/kg`, `/st` (per item), `/hg`, and `/förp` (per package).
- **Price badge designs:** Choose sunburst, comic explosion, sharp star, seal, octagon, plaque, diamond, or circle shapes, with orange, green, blue, or monochrome colors.
- **Origin details:** Add country-of-origin text and an optional national flag.
- **Optional halal artwork:** Display a halal stamp in black, gold, or green.
- **Store branding:** Add a company name, ribbon text, a crown icon, or your own logo image.
- **Batch editing:** Copy a tag across the sheet, apply branding to all tags, or load sample Swedish meat products.
- **Print and PDF:** Use the browser’s print dialog to print A4 sheets or save a PDF. Toggle cut lines to help trim your labels.
- **Saved settings and shareable links:** Settings are stored in your browser, and the page URL updates to include your sheet configuration.

## 🚀 How to create printable price tags

1. Open the app and select **EN** for the English interface.
2. Choose a sheet layout and page orientation.
3. Select a tag in the preview or sidebar, then enter its product name, price, unit, and origin.
4. Adjust the price badge, optional flag or halal artwork, and store branding.
5. Add more tags, or use **Copy to all** to repeat the current tag.
6. Click **PRINT A4 (PRINT / PDF)** to print or save your sheet as a PDF.

The app starts with one sample tag in an eight-slot layout. Sample product names remain in Swedish when you change the interface language; you can replace them with your own text.

## A4 price tag layouts

The layout selector offers these options on an **A4 sheet (210 × 297 mm)**:

| Layout | Maximum tags per sheet | Typical use |
| --- | --- | --- |
| 2 × 4 | 8 | Small retail price cards and deli labels |
| 1 × 3 | 3 | Wide product signs |
| 1 × 2 | 2 | Larger counter or display signs |
| 1 × 1 | 1 | Full-page promotional poster |

Tag dimensions depend on the layout, orientation, and sheet spacing. You can leave unused slots empty.

## 🖨️ Printing and saving as PDF

For a color A4 sheet:

1. Click **PRINT A4 (PRINT / PDF)**.
2. Select your printer or **Save as PDF** in the browser’s print dialog.
3. Choose **A4** paper and match the app’s portrait or landscape orientation.
4. Use **100% / actual size** where available, disable browser headers and footers, and select no margins if your printer supports it.
5. Enable **Background graphics** so the badge colors and gradients appear.
6. Check the print preview before printing, then cut the tags along the guides if enabled.

Printers with non-printable edges may require margins or scaling. PDF output uses the browser’s print function; there is no dedicated PNG export in the current interface.

## 💻 Local development

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173), or the URL shown by Vite if that port is busy.

### Build and preview

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`. Vite uses relative asset paths (`base: './'`), allowing deployment to GitHub Pages or another static web host.

### Run tests

```bash
npm test
npm run test:coverage
```

The project uses JavaScript, CSS, Vite, and Vitest.

## ❓ Frequently asked questions

### What is Prislappar used for?

Prislappar creates printable price tags and product signs for retail shops, butcher counters, and delis. It combines editable product information with price badges and store branding on A4 sheets.

### Can I make price tags in English?

Yes. Select **EN** to use the English interface and enter your own English product names. Swedish and Turkish interfaces are also available.

### Can I save price tags as a PDF?

Yes. Click the print button and choose **Save as PDF** in your browser’s print dialog. Select A4 paper and enable background graphics for colored signs.

### How many price tags fit on one A4 sheet?

The default 2 × 4 layout holds up to eight price tags. The visible layout controls also offer three, two, or one tag per sheet.

### Do I need an account or server?

No account or application backend is required. The editor runs in your browser and saves settings in `localStorage`. Clearing browser storage removes those locally saved settings.

### How do I share a price tag sheet?

Copy the current page URL after editing. The URL contains encoded sheet settings that the app can restore when opened. These settings are readable by anyone with the link. Custom logo data of 3,000 characters or more is omitted from shared URLs, so larger logos may need to be added again.

## License

MIT.
