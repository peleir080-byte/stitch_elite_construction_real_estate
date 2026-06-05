---
name: Premium African Modern Engineering
colors:
  surface: '#f9f9fc'
  surface-dim: '#dadadc'
  surface-bright: '#f9f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f6'
  surface-container: '#eeeef0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e2e2e5'
  on-surface: '#1a1c1e'
  on-surface-variant: '#43474f'
  inverse-surface: '#2f3133'
  inverse-on-surface: '#f0f0f3'
  outline: '#737780'
  outline-variant: '#c3c6d0'
  surface-tint: '#3e5f90'
  primary: '#001836'
  on-primary: '#ffffff'
  primary-container: '#002d5b'
  on-primary-container: '#7696ca'
  inverse-primary: '#a7c8ff'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fd8b00'
  on-secondary-container: '#603100'
  tertiary: '#16191c'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a2e30'
  on-tertiary-container: '#929598'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#254776'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#e0e3e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#44474a'
  background: '#f9f9fc'
  on-background: '#1a1c1e'
  surface-variant: '#e2e2e5'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style
This design system establishes a high-end, professional aesthetic for the modern African engineering and construction landscape. The brand personality is authoritative yet visionary, combining the structural reliability of civil engineering with the refined elegance of luxury architectural design.

The style is a fusion of **Corporate Modern** and **Minimalism**. It emphasizes structural integrity through clean lines and a disciplined grid, while utilizing generous white space to evoke a sense of premium quality and "breathability" often found in high-end real estate and modern infrastructure. The emotional response should be one of absolute trust, technological advancement, and architectural sophistication.

## Colors
The palette is rooted in a foundation of reliability and precision. 

- **Primary (Deep Blue):** Used for headers, primary actions, and navigational elements to establish authority.
- **Secondary (Accent Orange):** Inspired by construction safety and the warmth of the African sun. It is used sparingly for high-priority calls to action, status indicators, and subtle highlights.
- **Surface (Light Gray & White):** The primary canvas colors, ensuring a lightweight, fast-loading visual feel.
- **Neutral:** A deep near-black used for body text to ensure maximum legibility and a professional finish.

## Typography
The typography strategy pairs the geometric confidence of **Montserrat** for headings with the systematic clarity of **Inter** for functional text. 

Headings should be set with tight letter-spacing to feel "built" and solid. Labels and small caps should utilize increased letter-spacing to maintain a premium, editorial feel even at small scales. All type must prioritize legibility against high-quality architectural photography and technical documentation.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop and a **Fluid Grid** on mobile. 

- **Desktop:** A 12-column grid with a 1280px max-width. Large section gaps (120px) are used to separate major narrative blocks, reinforcing the premium, minimalist aesthetic.
- **Tablet:** 8-column grid with 32px margins.
- **Mobile:** 4-column grid with 16px margins. 

The rhythm is intentionally generous. Component-level spacing follows an 8px base unit. In photography-heavy sections, margins should increase to allow the high-quality imagery of African infrastructure to dominate the visual field without feeling cluttered.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines** rather than heavy shadows. This maintains a lightweight and modern performance profile.

- **Level 0 (Base):** White (#FFFFFF) or Light Gray (#F5F7FA) background.
- **Level 1 (Cards/Surface):** White surface with a 1px border in #E2E8F0. No shadow.
- **Level 2 (Hover/Active):** Very subtle, highly diffused ambient shadow (0px 4px 20px rgba(0, 45, 91, 0.05)).
- **Overlays:** Simple 40% black scrim for modals to keep focus on technical content.

## Shapes
The shape language is disciplined and "Soft" (0.25rem). This slight rounding provides a modern, approachable feel while maintaining the structural, "straight-edge" associations of engineering blue-prints and modern construction. 

Avoid fully circular buttons (except for floating action buttons or simple icons). Use standard rectangular forms with the defined soft corners for all inputs, cards, and primary buttons.

## Components
- **Buttons:** Primary buttons use the Deep Blue background with White text. Secondary buttons use a Deep Blue 1px outline. Accent buttons for "Inquire" or "Urgent" actions use the Accent Orange.
- **Thin-Line Icons:** Use 1px or 1.5px stroke weight icons. They should never be filled unless indicating an active state.
- **Input Fields:** Use a simple bottom border or a very light 4-sided stroke. Focus states are indicated by a 2px Deep Blue bottom border.
- **Cards:** Used for project portfolios. They should feature full-bleed imagery at the top with a minimal text area below. 
- **Progress Indicators:** Linear, thin bars using the Primary Blue to track project phases or loading states.
- **Data Tables:** High-density, minimal borders, using Inter for maximum clarity in engineering specifications.
- **Project Stats:** Large Montserrat numbers with Inter labels to highlight project scale (e.g., "500+ Hectares").