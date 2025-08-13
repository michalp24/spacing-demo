# NVIDIA Spacing Prototype - Reference Guide

## Layout Gap Formulas

### Section Title Layout Gaps
- **Above Title**: `(computedSectionTitleFontSize * 1.25) * (1.25 / 4)`
- **Below Title**: `computedSectionTitleFontSize * 1.25`
- **Below Subtitle**: `computedSectionTitleFontSize * 1.25`

### Card Layout Gaps
- **Above Title**: `32px` (fixed)
- **Below Title**: `64px` (fixed)

### Line Height Multiplier
- **Default**: `1.25` (125% line height)
- **Section Description**: `1.75` (175% line height)

## Inner Padding (Card Padding)

### Spacing Options
- **Small**: `8px`
- **Medium**: `20px` 
- **Large**: `32px`

### Visual Guide
- **Color**: `#ff69b4` (Pink) at 20% opacity
- **Style**: Dashed border around card content
- **Toggle**: "Inner Padding (Pink)" in controls

## Section Padding

### Formula
- **Height**: `calc(var(--section-title-size, 32px) * 1.25 * 2)`
- **Multiplier**: 2x the headline height (including line-height)

### Visual Guide
- **Color**: `#2290C7` (Blue) at 20% opacity
- **Position**: Top and bottom of section
- **Toggle**: "Section Padding (Blue)" in controls

## Typography Scale

### Section Titles
- **Desktop (1350px+)**: `32px` (default)
- **Tablet (1024px-1349px)**: `28px`
- **Mobile (640px-1023px)**: `24px`
- **Small Mobile (320px-639px)**: `24px`

### Section Pretitles
- **Desktop**: `20px`
- **Tablet**: `18px`
- **Mobile**: `16px`
- **Small Mobile**: `16px`

### Section Descriptions
- **Desktop**: `22px` with 175% line-height
- **Tablet**: `16px`
- **Mobile**: `15px` with horizontal padding
- **Small Mobile**: `15px` with horizontal padding

### Card Titles
- **Small**: `20px` (Desktop) → `18px` (Tablet) → `16px` (Mobile)
- **Medium**: `24px` (Desktop) → `20px` (Tablet) → `18px` (Mobile)
- **Large**: `28px` (Desktop) → `24px` (Tablet) → `20px` (Mobile)

### Card Pretitles
- **Desktop**: `0.95rem`
- **Large Variant**: `18px` (Desktop) → `16px` (Mobile)

### Card Descriptions
- **Size**: `0.98rem`
- **Color**: `#444`

## Component Styles

### Media Teaser Tiles (Cards)
```css
.card {
  background: #F7F7F7;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  border-radius: 12px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: padding 0.3s;
  overflow: hidden;
  min-height: 320px;
}
```

### Card Grid Layout
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* Responsive Breakpoints */
/* Small spacing: 4 columns */
.card-section[data-spacing='small'] .card-grid {
  grid-template-columns: repeat(4, 1fr);
}

/* Large spacing: 2 columns, max-width 1068px */
.card-section[data-spacing='large'] {
  max-width: 1068px;
  margin: 0 auto;
}
.card-section[data-spacing='large'] .card-grid {
  grid-template-columns: repeat(2, 1fr);
}
```

### Teaser Tiles (Alternate Cards)
```css
.card-section-alt .card {
  padding: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}

.card-grid-alt {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  row-gap: 30px;
}
```

### Section Structure
```css
.card-section {
  min-width: 900px;
}

.card-section-centered {
  display: flex;
  justify-content: center;
  width: 100%;
}

.text-section-centered {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 90px;
}

.text-section {
  max-width: 1068px;
  margin: 0 auto;
  text-align: center;
}
```

## Visual Guides

### Layout Gap Guide (Teal)
```css
.guide--teal {
  border-top: 2px dashed #1de9b6;
}

.section-layout-gap {
  width: 100%;
  background: rgba(22, 255, 208, 0.2);
  display: block;
}
```

### Inner Padding Guide (Pink)
```css
.guide--pink {
  border: 2px dashed #ff69b4;
  border-radius: 10px;
  background: rgba(209, 42, 139, 0.2);
}
```

### Section Padding Guide (Blue)
```css
.section-padding-top,
.section-padding-bottom {
  width: 100%;
  background: rgba(34, 144, 199, 0.2);
  transition: opacity 0.3s;
}
```

## Responsive Breakpoints

### Desktop (1350px+)
- Section title: 32px
- Card grid: 3 columns (default), 4 columns (small), 2 columns (large)
- Max width: 1350px for media section, 1068px for text section

### Tablet (1024px-1349px)
- Section title: 28px
- Card grid: 3 columns (medium), 4 columns (small), 2 columns (large)
- Section description: 16px

### Mobile (640px-1023px)
- Section title: 24px
- Card grid: 2 columns
- Section description: 15px with 20px horizontal padding

### Small Mobile (320px-639px)
- Section title: 24px
- Card grid: 1 column
- Section description: 15px with 16px horizontal padding

## Dark Mode Styles

### Colors
- **Background**: `#000000`
- **Text**: `#f3f4f6`
- **Cards**: Transparent background
- **Guides**: Maintain opacity but with dark background

### Component Overrides
```css
.dark .card {
  background: #000000;
}

.dark .section-title,
.dark .section-desc {
  color: #f3f4f6;
}

.dark .card-desc-style,
.dark .card-tags {
  color: #f3f4f6;
}
```

## CSS Custom Properties

### Font Size Variables
```css
:root {
  --section-title-size: 32px; /* Dynamically set via JavaScript */
}
```

### Usage in Calculations
```css
.section-padding-top {
  height: calc(var(--section-title-size, 32px) * 1.25 * 2);
}
```

## JavaScript Integration

### Font Size Calculation
```javascript
const getSectionTitleFontSize = () => {
  if (window.innerWidth > 1349) return 32;
  if (window.innerWidth > 1023) return 28;
  return 24;
};
```

### Dynamic Updates
- Font sizes update on window resize
- CSS custom properties update after render
- Layout gaps recalculate based on computed font sizes

## Component Architecture

### Card Component Props
- `spacing`: Spacing option (small/medium/large)
- `showLayoutGap`: Toggle layout gap guides
- `showInnerPadding`: Toggle inner padding guides
- `showImage`: Toggle image display
- `showTags`: Toggle tags display
- `showPretitle`: Toggle pretitle display
- `showIcons`: Toggle icons display
- `manualCardTitleFontSize`: Override card title font size
- `maxHeight`: Dynamic height calculation for equal card heights

### Controls Panel
- Card spacing selector
- Guide toggles (Layout Gap, Inner Padding, Section Padding)
- Layout toggles (Image, Tags, Pretitle, Icons)
- Manual font size inputs
- Dark mode toggle
- Responsive mobile menu

This reference guide captures all the spacing formulas, typography scales, component styles, and responsive behaviors used in the NVIDIA spacing prototype. 