---
name: Graphic Narrative
colors:
  surface: '#fcf8f9'
  surface-dim: '#dcd9da'
  surface-bright: '#fcf8f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f4'
  surface-container: '#f0edee'
  surface-container-high: '#eae7e8'
  surface-container-highest: '#e5e2e3'
  on-surface: '#1b1b1c'
  on-surface-variant: '#4c4732'
  inverse-surface: '#303031'
  inverse-on-surface: '#f3f0f1'
  outline: '#7d775f'
  outline-variant: '#cfc6ab'
  surface-tint: '#6d5e00'
  primary: '#6d5e00'
  on-primary: '#ffffff'
  primary-container: '#ffde00'
  on-primary-container: '#716200'
  inverse-primary: '#e3c600'
  secondary: '#0040e0'
  on-secondary: '#ffffff'
  secondary-container: '#2e5bff'
  on-secondary-container: '#efefff'
  tertiary: '#ba1c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffd5cd'
  on-tertiary-container: '#c01e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe24a'
  primary-fixed-dim: '#e3c600'
  on-primary-fixed: '#211b00'
  on-primary-fixed-variant: '#524600'
  secondary-fixed: '#dde1ff'
  secondary-fixed-dim: '#b8c3ff'
  on-secondary-fixed: '#001356'
  on-secondary-fixed-variant: '#0035be'
  tertiary-fixed: '#ffdad3'
  tertiary-fixed-dim: '#ffb4a5'
  on-tertiary-fixed: '#3e0400'
  on-tertiary-fixed-variant: '#8e1300'
  background: '#fcf8f9'
  on-background: '#1b1b1c'
  surface-variant: '#e5e2e3'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 80px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Work Sans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
  caption:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
spacing:
  unit: 4px
  gutter: 24px
  margin: 40px
  container-max: 1280px
  border-thick: 3px
  border-thin: 1px
---

## Brand & Style

This design system blends the high-energy visual language of Silver Age comic books with a structured, professional portfolio framework. The brand personality is authoritative yet expressive, designed to showcase creative work with "heroic" impact. 

The aesthetic draws heavily from **Brutalism** and **High-Contrast** movements, utilizing heavy ink-like strokes, dramatic scale shifts, and rhythmic halftone textures. The goal is to evoke the excitement of a graphic novel while maintaining the rigor of a grid-based editorial layout, ensuring the user's work remains the focal point within a high-octane frame.

## Colors

The palette is rooted in a high-contrast foundation of "Inking Black" (Deep Charcoal) and "Page White." This provides a neutral stage for the vibrant, CMYK-inspired accents.

- **Primary (Action Yellow):** Used for critical calls to action and highlighting key achievements. It demands immediate attention.
- **Secondary (Hero Blue):** Used for interactive elements, links, and supporting brand moments.
- **Tertiary (Impact Red):** Reserved for destructive actions, alerts, or high-intensity "pow" moments in the layout.
- **Neutral (Charcoal & White):** Defines the structural grid. Use the charcoal for thick borders and the white for card surfaces to ensure maximum legibility of portfolio content.

## Typography

The typography system relies on a dramatic contrast between technical, geometric display faces and highly readable sans-serifs.

- **Headlines:** Use **Space Grotesk** at massive scales. Headlines should feel "blocky" and heavy. For primary section titles, apply a slight italic skew (8 degrees) to simulate motion.
- **Body:** **Work Sans** provides a grounded, neutral balance to the aggressive headlines, ensuring long-form case studies remain professional and easy to digest.
- **Labels:** **Lexend** is utilized for functional UI elements and "meta" information, set in all-caps to mimic the hand-lettered style of comic dialogue balloons without sacrificing clarity.

## Layout & Spacing

This design system uses a **Fixed Grid** model. The layout is structured on a 12-column grid that acts as the "panel" system of the page. 

Spacing is intentional and rigid. Use large margins to separate "story arcs" (content sections). Gutters are wide to allow the thick charcoal borders of adjacent elements to breathe. Elements should often "break the gutter" slightly or overlap via negative margins to create a dynamic, layered comic-book feel while maintaining the underlying alignment of the text.

## Elevation & Depth

Depth is achieved through **Bold Borders** and **Offset Shadows** rather than realistic lighting.

- **Hard Shadows:** Use 100% opacity charcoal offsets (e.g., 4px down, 4px right) for buttons and cards. Avoid soft blurs.
- **Halftone Overlays:** Apply a subtle dot-matrix pattern to background sections or secondary surfaces to create texture without adding visual weight.
- **Layering:** Components should appear "stacked" like cut paper. Use the primary accent colors as a back-layer that peeks out from behind the white main containers.
- **Speech Bubble Callouts:** Important quotes or testimonials should use a container with a small triangular "tail" pointing to the source, framed by a thick 3px border.

## Shapes

The shape language is strictly **Sharp**. In keeping with the brutalist-comic aesthetic, all corners are 90-degree angles. This reinforces the "panel" metaphor and provides a high-strength, architectural feel to the portfolio.

The only exceptions are "Impact Badges" (burst shapes) and the directional tails on speech bubbles, which should also utilize sharp, angular lines rather than curves.

## Components

### Buttons
Buttons are the "Action" of the system. They feature a thick 3px charcoal border, a primary color fill (Yellow or Blue), and a hard offset shadow. On hover, the shadow should disappear as the button "depresses" into the page.

### Cards (Panels)
Cards act as comic panels. They must have a 3px charcoal border. Content within the card should have generous padding. Use a halftone pattern in the card's header or footer to distinguish metadata from content.

### Chips & Tags
Set in **Lexend** all-caps, these are small rectangular blocks with a thin 1px border. Use the accent colors (Yellow/Blue/Red) as background fills to categorize project types or skills.

### Inputs
Text fields are simple white boxes with a 2px charcoal border. The focus state should change the border color to Hero Blue and increase the border weight to 4px.

### "Action" Overlays
For portfolio navigation or highlight reels, use "Impact Badges"—angled, non-orthogonal shapes that sit on top of the grid, containing short, punchy labels like "NEW" or "FEATURED."