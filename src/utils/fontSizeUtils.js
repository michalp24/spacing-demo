// Helper to get section title font size based on viewport
export function getSectionTitleFontSize() {
  const width = window.innerWidth;
  if (width <= 639) return 24;
  if (width <= 1023) return 24;
  if (width <= 1349) return 28;
  return 36;
}

// Helper to get card title font size based on cardSpacing and viewport
export function getCardTitleFontSize(cardSpacing) {
  const width = window.innerWidth;
  if (cardSpacing === 'small') {
    if (width <= 1023) return 16;
    if (width <= 1349) return 18;
    return 20;
  }
  if (cardSpacing === 'medium') {
    if (width <= 1023) return 18;
    if (width <= 1349) return 20;
    return 24;
  }
  if (cardSpacing === 'large') {
    if (width <= 1023) return 20;
    if (width <= 1349) return 24;
    return 28;
  }
  return 20;
} 