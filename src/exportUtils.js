import html2canvas from 'html2canvas';

/**
 * Triggers standard browser print dialog for the A4 sheet.
 */
export function printSheet() {
  window.print();
}

/**
 * Helper to download a data URL or blob as a file.
 */
function downloadFile(dataUrl, filename) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export a single price card as high-resolution PNG.
 */
export async function exportSingleCard(cardIndex = 0, filename = 'prislapp.png') {
  const cardElement = document.getElementById(`card-item-${cardIndex}`);
  if (!cardElement) {
    throw new Error(`Card #${cardIndex + 1} not found`);
  }

  // Clone or capture directly with html2canvas at scale 3 for print sharpness
  const canvas = await html2canvas(cardElement, {
    scale: 3.5, // Crisp 300+ DPI
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    ignoreElements: (element) => element.classList.contains('card-slot-badge')
  });

  const dataUrl = canvas.toDataURL('image/png');
  downloadFile(dataUrl, filename);
}

/**
 * Export the whole A4 sheet as a high-resolution PNG.
 */
export async function exportFullSheet(filename = 'A4-prislappar.png') {
  const sheetElement = document.getElementById('a4-sheet');
  if (!sheetElement) {
    throw new Error('A4 Sheet element not found');
  }

  // Capture whole A4 sheet at high resolution (scale 2.5 ~ 2500x3500px)
  const canvas = await html2canvas(sheetElement, {
    scale: 2.5,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    ignoreElements: (element) => element.classList.contains('card-slot-badge')
  });

  const dataUrl = canvas.toDataURL('image/png');
  downloadFile(dataUrl, filename);
}
