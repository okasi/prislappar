# Prislappar

En modern, webbaserad generator för butiks- och charkprislappar anpassad för **A4-ark (210 × 297 mm)**. Skapad med inspiration från [timemark-replica](https://github.com/okasi/timemark-replica), med ett elegant mörkt glassmorphism-gränssnitt och en exakt visuell återskapning av den laminerade charkskylten (t.ex. *Kalvframdel Litauen 69:90/kg*).

---

## Egenskaper

- **A4 Rutnätslayout**: Standard **2 × 4 (8 st prislappar per ark)** i exakt proportion (105 × 74.25 mm per lapp, perfekt för kyldiskar och hyllkanter). Även stöd för 2×3, 2×2 (A6), 1×2 (A5) och 1×1 (hel poster).
- **Autentisk Design från Bilden**:
  - **Produktnamn**: Stor, kraftfull rubrik (*Kalvframdel*) i mörkt vinrött.
  - **Ursprungsland & Flagga**: Landets namn (*Litauen*, *Sverige*, etc.) med valbar flagga (emoji/SVG).
  - **Halal-stämpel**: Äkta oval stämpel med arabisk kalligrafi `حلال` och `HALAL`-text (kan slås av/på och bytas mellan klassisk svart, guld och grön).
  - **Butiksbranding**: Gyllene kungakrona med 5 spetsar, butiksnamn (*KÖTTHALLEN*) och guldbanderoll, eller egen uppladdad logotyp.
  - **Prisexplosion**: Comic-starburst med strålar, rasterpunkter (halftone) och gigantiska gula siffror med mörk kontur och skugga (*69:90/kg*).
  - **Bakgrund**: Fräsch delikatess-isblå gradient, ren vit, butiksgul eller chark-kraftpapper.
- **Interaktiv Redigering**:
  - Klicka direkt på valfri prislapp i A4-arket för att redigera den.
  - Välj mellan kort 1–8 via flikarna i sidopanelen.
  - **Kopiera till alla**: Applicera aktuell produkt på hela arket med ett klick.
  - **Branding till alla**: Sprid butiksnamn och logo till samtliga 8 lappar utan att skriva över produktnamn och priser.
  - **Chark-exempel**: Ladda in autentiska charkprodukter (*Kalvframdel, Högrev, Oxfilé, Entrecôte, Kycklingfilé, Lammstek, Nötfärs, Ryggbiff*).
- **Skriv Ut & Exportera**:
  - **Direktutskrift (Print to A4 / PDF)**: Optimerad `@media print` och `@page { size: A4 portrait; margin: 0; }` för kantfri utskrift på exakt 1 sida utan vita överloppssidor.
  - **Streckade klipplinjer**: Valbara klippanvisningar för enkel tillskärning med sax eller skärmaskin.
  - **PNG-export**: Exportera hela A4-arket eller enstaka lappar i hög upplösning (300+ DPI).
- **Lokal & Snabb**: All data sparas automatiskt i din webbläsare via `localStorage`. Inga servrar, 100% privat.

---

## Installation & Körning

### 1. Installera beroenden

```bash
npm install
```

### 2. Starta utvecklingsservern

```bash
npm run dev
```

Öppna länken i webbläsaren (t.ex. `http://localhost:5173`).

### 3. Bygg för produktion

```bash
npm run build
```

Filerna skapas i `dist/` med relativa sökvägar (`base: './'`), redo för GitHub Pages eller valfri statisk hosting.

---

## Utskriftstips för Bästa Resultat

1. Klicka på knappen **"SKRIV UT A4 (PRINT / PDF)"**.
2. I webbläsarens utskriftsdialog:
   - **Mål / Skrivare**: Välj din skrivare eller *Spara som PDF*.
   - **Pappersstorlek**: Välj **A4**.
   - **Marginaler**: Välj **Inga** (*None* eller *Minimum*).
   - **Alternativ**: Se till att kryssrutan **Bakgrundsgrafik** (*Background graphics*) är **ikryssad** så att färger och gradienter skrivs ut.
3. Skriv ut och laminera eller sätt i skylthållare!

---

## Licens

MIT
