---
version: alpha
name: "Units Student Homes"
description: "Units is a student accommodation brand with a bold, youthful design system. The interface pairs a near-black (#000000) dominant base with vivid accent colors. coral-orange (#ff5c38), amber (#ffb200), purple (#ab54f7), and warm cream (#f4e9e1). to create an energetic, editorial feel. Typography is anchored by Bunch (a heavy display face at weight 850) for headlines and Aeonik Pro for all body and UI text. Geometry is characterized by generous pill-shaped radii (33.3px dominant, 100px for tags/badges) and a flat, shadow-free elevation system. The layout uses a sidebar navigation with numbered section cards and a modal booking form with a vivid orange header panel."
colors:
  amber-yellow: "#ffb200"
  black-base: "#000000"
  coral-orange: "#ff5c38"
  vivid-purple: "#ab54f7"
  warm-cream: "#f4e9e1"
  white-surface: "#ffffff"
  deep-blue: "#004e9b"
  near-black: "#101010"
  light-gray: "#f5f5f5"
typography:
  display-hero:
    fontFamily: "Bunch"
    fontSize: "36px"
    fontWeight: "850"
    lineHeight: "39.6px"
  display-large:
    fontFamily: "Bunch"
    fontSize: "29.34px"
    fontWeight: "850"
    lineHeight: "29.34px"
  display-medium:
    fontFamily: "Bunch"
    fontSize: "22.67px"
    fontWeight: "850"
    lineHeight: "22.67px"
  display-small:
    fontFamily: "Bunch"
    fontSize: "12px"
    fontWeight: "850"
    lineHeight: "12px"
  body-default:
    fontFamily: "Aeonik Pro"
    fontSize: "16px"
    fontWeight: "400"
  body-small:
    fontFamily: "Aeonik Pro"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "16.8px"
  label-bold:
    fontFamily: "Aeonik Pro"
    fontSize: "12px"
    fontWeight: "700"
    lineHeight: "14.4px"
  body-bold:
    fontFamily: "Aeonik Pro"
    fontSize: "14px"
    fontWeight: "700"
    lineHeight: "16.8px"
  ui-default-bold:
    fontFamily: "Aeonik Pro"
    fontSize: "16px"
    fontWeight: "700"
    lineHeight: "19.2px"
  utility-small:
    fontFamily: "Roboto"
    fontSize: "11px"
    fontWeight: "400"
rounded:
  pill-default: "33.3px"
  rounded-md: "20px"
  rounded-sm: "10px"
  full-circle: "100px"
  pill-large: "66.7px"
  subtle: "5px"
  none: "0px"
spacing:
  xs: "5px"
  sm: "6px"
  md-sm: "10px"
  md: "12px"
  md-lg: "15px"
  lg: "20px"
  xl: "25px"
  2xl: "30px"
  3xl: "32px"
  4xl: "40px"
  inner-wrap: "26.7px"
---

## Overview

Units is a student accommodation brand with a bold, youthful design system. The interface pairs a near-black (#000000) dominant base with vivid accent colors. coral-orange (#ff5c38), amber (#ffb200), purple (#ab54f7), and warm cream (#f4e9e1). to create an energetic, editorial feel. Typography is anchored by Bunch (a heavy display face at weight 850) for headlines and Aeonik Pro for all body and UI text. Geometry is characterized by generous pill-shaped radii (33.3px dominant, 100px for tags/badges) and a flat, shadow-free elevation system. The layout uses a sidebar navigation with numbered section cards and a modal booking form with a vivid orange header panel.

**Signature traits:**
- Dual typeface system: Pairs Bunch and Aeonik Pro across the type hierarchy.
- Soft, rounded geometry: Generous corner rounding up to 100px.

## Colors

The palette uses 9 validated color tokens across 1 theme profile. Semantic roles stay attached to observed usage so generation agents can choose accents without inventing new color meaning.

**Semantic naming:**
- **surface-background** maps to `black-base`: Role "background" is grounded by usage context "Dominant page background, sidebar cards, overlays, and primary text throughout".
- **action-background** maps to `coral-orange`: Role "background" is grounded by usage context "CTA button backgrounds, booking form header panel, key interactive highlights".
- **surface-text** maps to `near-black`: Role "text" is grounded by usage context "Body text and UI label color on light surfaces".
- **action-text** maps to `deep-blue`: Role "text" is grounded by usage context "Decorative arrow/icon elements, link states".

### Text Scale
- **Deep Blue** (#004e9b): Decorative arrow/icon elements, link states. Role: text. {authored: rgb(0, 78, 155), space: rgb}
- **Near Black** (#101010): Body text and UI label color on light surfaces. Role: text. {authored: rgba(16, 16, 16, 0.3), space: rgb, alpha: 0.3}

### Interactive
- **Light Gray** (#f5f5f5): Subtle dividers and input underline borders on light surfaces. Role: border. {authored: rgb(245, 245, 245), space: rgb}

### Surface & Shadows
- **Amber Yellow** (#ffb200): Section accent color, link highlights, and decorative surface fills. Role: background. {authored: rgb(255, 178, 0), space: rgb}
- **Black Base** (#000000): Dominant page background, sidebar cards, overlays, and primary text throughout. Role: background. {authored: rgb(0, 0, 0), space: rgb, alpha: 0.8}
- **Coral Orange** (#ff5c38): CTA button backgrounds, booking form header panel, key interactive highlights. Role: background. {authored: rgb(255, 92, 56), space: rgb}
- **Vivid Purple** (#ab54f7): Button backgrounds (Book your Unit CTA in sidebar), accent surface fills. Role: background. {authored: rgb(171, 84, 247), space: rgb}
- **Warm Cream** (#f4e9e1): Hero and section background tint, warm off-white surface areas. Role: background. {authored: rgb(244, 233, 225), space: rgb}
- **White Surface** (#ffffff): Modal/form card background, input fields, and light surface panels. Role: background. {authored: rgb(255, 255, 255), space: rgb}

## Typography

Typography uses Bunch, Aeonik Pro, Roboto across extracted hierarchy roles. Keep hierarchy mapped to these token rows before adding decorative type styles.

Mixes Bunch and Aeonik Pro and Roboto for visual contrast. Weight range spans bold, regular. Sizes range from 11px to 36px.

### Font Roles
- **Headline Font**: Bunch
- **Body Font**: Bunch

### Type Scale Evidence
| Role | Font | Size | Weight | Line Height | Letter Spacing | Stack / Features | Notes |
|------|------|------|--------|-------------|----------------|------------------|-------|
| Hero section headline, largest display text | Bunch | 36px | 850 | 39.6px | normal | Bunch, arial | Extracted token |
| Section headings and modal panel titles | Bunch | 29.34px | 850 | 29.34px | normal | Bunch, arial | Extracted token |
| Card headings and sub-section titles | Bunch | 22.67px | 850 | 22.67px | normal | Bunch, arial | Extracted token |
| Small display labels and badges | Bunch | 12px | 850 | 12px | normal | Bunch, arial | Extracted token |
| Primary body text, navigation items, form labels | Aeonik Pro | 16px | 400 | normal | normal | Aeonik Pro, arial | Extracted token |
| Secondary body text, captions, form helper text | Aeonik Pro | 14px | 400 | 16.8px | normal | Aeonik Pro, arial | Extracted token |
| UI labels, tags, numbered section indicators | Aeonik Pro | 12px | 700 | 14.4px | normal | Aeonik Pro, arial | Extracted token |
| Emphasized body text, button labels, form section headings | Aeonik Pro | 14px | 700 | 16.8px | normal | Aeonik Pro, arial | Extracted token |
| CTA button text, strong UI labels | Aeonik Pro | 16px | 700 | 19.2px | normal | Aeonik Pro, arial | Extracted token |
| Third-party widget text, map labels, utility micro-text | Roboto | 11px | 400 | normal | normal | Roboto, Arial, sans-serif | Extracted token |

## Layout

Responsive system uses 4 breakpoint tier(s): mobile, tablet, desktop, wide.

This system uses a 5px base grid with scale values 5, 6, 10, 12, 15, 20, 25, 30, 32, 40.

### Responsive Strategy
- **mobile (480-2499px)**: Constrain layout for small viewports and prioritize vertical stacking.
- **tablet (>= 768px)**: Increase spacing and column structure for medium-width viewports.
- **desktop (>= 1024px)**: Expand layout density and horizontal composition for wide viewports.
- **wide (>= 2500px)**: Stretch composition with generous gutters and wider layout spans.

### Spacing System
| Token | Value | Px | Notes |
|------|-------|----|-------|
| xs | 5px | 5 | Extracted spacing token |
| sm | 6px | 6 | Extracted spacing token |
| md-sm | 10px | 10 | Extracted spacing token |
| md | 12px | 12 | Extracted spacing token |
| md-lg | 15px | 15 | Extracted spacing token |
| lg | 20px | 20 | Extracted spacing token |
| xl | 25px | 25 | Extracted spacing token |
| inner-wrap | 26.7px | 26.7 | Extracted spacing token |
| 2xl | 30px | 30 | Extracted spacing token |
| 3xl | 32px | 32 | Extracted spacing token |
| 4xl | 40px | 40 | Extracted spacing token |

## Elevation & Depth

Keep depth flat unless validated shadow or interaction evidence appears in the extraction payload. Do not invent shadows beyond this evidence boundary.

### Shadow Evidence
| Shadow Token | Layers | Details |
|--------------|--------|---------|
| n/a | 0 | No validated shadow payload |

### Interaction Signals
| Theme | Signal | Evidence |
|-------|--------|----------|
| Light | backdrop-filter | blur(40px) |
| Light | outline-color | rgb(0, 0, 0) ; rgb(255, 255, 255) ; rgba(16, 16, 16, 0.3) |
| Light | outline-width | 3px |
| Light | outline-offset | 0px ; 3px |
| Light | transform | matrix(1, 0, 0, 1, 0, 0) ; matrix(1, 0, 0, 1, 0, -65.2344) ; matrix(1, 0, 0, 1.0011, 0, -0.17651) |

## Shapes

Shape language maps directly to rounded tokens. Keep component corners consistent with the role mapping below before introducing bespoke geometry.

### Radius Roles
| Token | Value | Px | Role Mapping |
|------|-------|----|--------------|
| none | 0px | 0 | Hairline corner |
| subtle | 5px | 5 | Subtle corner |
| rounded-sm | 10px | 10 | Control corner |
| rounded-md | 20px | 20 | Card corner |
| pill-default | 33.3px | 33.3 | Large surface corner |
| pill-large | 66.7px | 66.7 | Large surface corner |
| full-circle | 100px | 100 | Large surface corner |

### Geometry Evidence
| Radius Token | Shape | Units |
|--------------|-------|-------|
| pill-default | 33.3px | px |
| rounded-md | 20px | px |
| rounded-sm | 10px | px |
| full-circle | 100px | px |
| pill-large | 66.7px | px |
| subtle | 5px | px |
| none | 0px | px |

## Components

(none detected)

## Do's and Don'ts

Guardrails protect Dual typeface system, Soft, rounded geometry without adding unsupported visual claims.

| Do | Don't |
|----|---------|
| Do maintain consistent spacing using the base grid | Don't make unsupported claims about absent visual features |
| Do maintain WCAG AA contrast ratios (4.5:1 for normal text) | Don't mix rounded and sharp corners in the same view |
| Do use the primary color only for the single most important action per screen |  |
| Do verify evidence before writing new design-system guidance |  |

## Responsive Evidence

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <= 549px | only screen and (max-width: 549px) |
| Mobile | <= 575.98px | (max-width: 575.98px) |
| Mobile | <= 600px | screen and (max-width: 600px) |
| Mobile | <= 767px | (max-width: 767px) |
| Breakpoint 5 | <= 767.98px | (max-width: 767.98px) |
| Breakpoint 6 | <= 991.98px | (max-width: 991.98px) |
| Breakpoint 7 | <= 1023px | only screen and (max-width: 1023px) |
| Breakpoint 8 | <= 1199.98px | (max-width: 1199.98px) |
| Breakpoint 9 | <= 1280px | only screen and (max-width: 1280px) |
| Breakpoint 10 | <= 2499px | only screen and (max-width: 2499px) |
| Mobile | >= 480px | (min-width: 480px) |
| Mobile | >= 550px | (min-width: 550px) |
| Tablet | >= 768px | (min-width: 768px) |
| Desktop | >= 1024px | (min-width: 1024px) |
| Desktop | >= 1281px | (min-width: 1281px) |
| Desktop | >= 2500px | (min-width: 2500px) |
| Breakpoint 17 | Unknown | (hover: hover) |

## Agent Prompt Guide

### Example Component Prompts
- Create button component using validated primary color role and spacing tokens.
- Create card component with mapped radius role and evidence-backed elevation.
- Create form input component using inferred typography hierarchy and border roles.

### Iteration Guide
1. Start with extracted palette and typography roles only.
2. Map spacing and radius directly from token tables before visual polish.
3. Apply component patterns one section at a time and compare against source intent.
4. Keep elevation claims tied to explicit evidence in output.
5. Iterate with smallest diffs and re-check section hierarchy after each change.
