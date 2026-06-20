---
version: alpha
name: "Elva Dark Cinematic"
description: "Typography baseline relies on Neue Haas Grotesk Display Pro for largest hero display text, full-bleed background text treatment."
colors:
  near-black: "#141414"
  pure-black: "#000000"
  surface-black: "#131313"
  mid-gray: "#b3b3b3"
  pure-white: "#ffffff"
  dark-gray: "#4d4d4d"
  light-gray: "#d9d9d9"
typography:
  display-hero:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "104px"
    fontWeight: "400"
    lineHeight: "93.6px"
    letterSpacing: "-3.12px"
  display-large:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "42px"
    fontWeight: "400"
    lineHeight: "38px"
    letterSpacing: "-0.84px"
  display-medium:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "43px"
    fontWeight: "400"
    lineHeight: "47.3px"
  heading-2:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "28px"
    fontWeight: "400"
    lineHeight: "28px"
  body:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "20.8px"
  caption-label:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "13px"
    fontWeight: "400"
  small-body:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "19.6px"
  nav-label:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "16px"
    fontWeight: "500"
    letterSpacing: "-0.32px"
rounded:
  sm: "4px"
  md: "15px"
  lg: "16px"
  xl: "28px"
  2xl: "31px"
  phone-mockup: "42px"
  pill: "120px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  base: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "28px"
  3xl: "32px"
  4xl: "35px"
  5xl: "40px"
  6xl: "42px"
  7xl: "80px"
components:
  agency-credit-badge:
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.near-black}"
    textColor: "{colors.mid-gray}"
    fontSize: "13px"
    padding: "8px 16px"
  app-icon-button:
    rounded: "{rounded.pill}"
    backgroundColor: "{colors.pure-black}"
    textColor: "{colors.pure-white}"
    width: "{spacing.6xl}"
    height: "{spacing.6xl}"
  background-display-text:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "104px"
    fontWeight: "400"
    lineHeight: "93.6px"
    letterSpacing: "-3.12px"
    textColor: "{colors.pure-white}"
    opacity: "0.5"
  hero-headline:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "42px"
    fontWeight: "400"
    lineHeight: "38px"
    letterSpacing: "-0.84px"
    textColor: "{colors.pure-white}"
    textAlign: "center"
  hero-subheadline:
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "20.8px"
    textColor: "{colors.mid-gray}"
    textAlign: "center"
  logo-badge:
    backgroundColor: "{colors.pure-black}"
    textColor: "{colors.pure-white}"
    rounded: "{rounded.lg}"
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "16px"
    padding: "12px 16px"
  nav-cta-button:
    textColor: "{colors.pure-white}"
    fontFamily: "Neue Haas Grotesk Display Pro"
    fontSize: "16px"
    fontWeight: "500"
    letterSpacing: "-0.32px"
    backgroundColor: "transparent"
  phone-mockup-hero-background-bleed:
    opacity: "0.5"
    filter: "blur"
    rounded: "{rounded.phone-mockup}"
  phone-mockup-hero:
    rounded: "{rounded.phone-mockup}"
    backgroundColor: "{colors.pure-black}"
    overflow: "hidden"
    aspectRatio: "portrait"
---

## Overview

Typography baseline relies on Neue Haas Grotesk Display Pro for largest hero display text, full-bleed background text treatment.

This system uses a 4px base grid with scale values 4, 8, 12, 16, 20, 24, 28, 32, 40, 80.

**Signature traits:**
- Core token rhythm: Token evidence indicates consistent color, spacing, and radius rhythm across visible UI.

## Colors

The palette uses 7 validated color tokens across 1 theme profile. Semantic roles stay attached to observed usage so generation agents can choose accents without inventing new color meaning.

**Semantic naming:**
- **surface-background** maps to `surface-black`: Role "background" is grounded by usage context "Primary page background, deep dark surface behind hero content".
- **action-text** maps to `pure-white`: Role "text" is grounded by usage context "Primary headline text, body copy on dark backgrounds, nav labels, CTA text".
- **content-text** maps to `mid-gray`: Role "text" is grounded by usage context "Secondary body text, captions, supporting descriptive copy".
- **border-border** maps to `dark-gray`: Role "border" is grounded by usage context "Subtle dividers, border accents, muted UI elements".

### Text Scale
- **Mid Gray** (#b3b3b3): Secondary body text, captions, supporting descriptive copy. Role: text.
- **Pure White** (#ffffff): Primary headline text, body copy on dark backgrounds, nav labels, CTA text. Role: text.

### Interactive
- **Dark Gray** (#4d4d4d): Subtle dividers, border accents, muted UI elements. Role: border.
- **Light Gray** (#d9d9d9): Light border strokes, subtle separators. Role: border.

### Surface & Shadows
- **Near Black** (#141414): Card and section surface fills, slightly lighter than primary background. Role: background.
- **Pure Black** (#000000): Deep black fills, overlay backgrounds, logo badge background. Role: background.
- **Surface Black** (#131313): Primary page background, deep dark surface behind hero content. Role: background.

## Typography

Typography uses Neue Haas Grotesk Display Pro across extracted hierarchy roles. Keep hierarchy mapped to these token rows before adding decorative type styles.

Uses Neue Haas Grotesk Display Pro throughout for a uniform feel. Weight range spans regular, medium. Sizes range from 13px to 104px.

### Font Roles
- **Headline Font**: Neue Haas Grotesk Display Pro
- **Body Font**: Neue Haas Grotesk Display Pro

### Type Scale Evidence
| Role | Font | Size | Weight | Line Height | Letter Spacing | Stack / Features | Notes |
|------|------|------|--------|-------------|----------------|------------------|-------|
| Largest hero display text, full-bleed background text treatment | Neue Haas Grotesk Display Pro | 104px | 400 | 93.6px | -3.12px | Neue Haas Grotesk Display Pro, sans-serif | Extracted token |
| Primary hero headline inside phone mockup, section headings | Neue Haas Grotesk Display Pro | 42px | 400 | 38px | -0.84px | Neue Haas Grotesk Display Pro, sans-serif | Extracted token |
| Section-level headings, feature titles | Neue Haas Grotesk Display Pro | 43px | 400 | 47.3px | normal | Neue Haas Grotesk Display Pro, sans-serif | Extracted token |
| Card titles, sub-section headings | Neue Haas Grotesk Display Pro | 28px | 400 | 28px | normal | Neue Haas Grotesk Display Pro, sans-serif | Extracted token |
| Body copy, descriptive text, navigation labels | Neue Haas Grotesk Display Pro | 16px | 400 | 20.8px | normal | Neue Haas Grotesk Display Pro, sans-serif | Extracted token |
| Small labels, badges, footer micro-text | Neue Haas Grotesk Display Pro | 13px | 400 | normal | normal | Neue Haas Grotesk Display Pro, sans-serif | Extracted token |
| Secondary body text, supporting descriptions | Neue Haas Grotesk Display Pro | 14px | 400 | 19.6px | normal | Neue Haas Grotesk Display Pro, sans-serif | Extracted token |
| Navigation CTA, interactive label text | Neue Haas Grotesk Display Pro | 16px | 500 | normal | -0.32px | Neue Haas Grotesk Display Pro, sans-serif | Extracted token |

## Layout

Responsive system uses 1 breakpoint tier(s): mobile.

### Responsive Strategy
- **mobile (<= 1280px)**: Constrain layout for small viewports and prioritize vertical stacking.

### Spacing System
| Token | Value | Px | Notes |
|------|-------|----|-------|
| xs | 4px | 4 | Extracted spacing token |
| sm | 8px | 8 | Extracted spacing token |
| md | 12px | 12 | Extracted spacing token |
| base | 16px | 16 | Extracted spacing token |
| lg | 20px | 20 | Extracted spacing token |
| xl | 24px | 24 | Extracted spacing token |
| 2xl | 28px | 28 | Extracted spacing token |
| 3xl | 32px | 32 | Extracted spacing token |
| 4xl | 35px | 35 | Extracted spacing token |
| 5xl | 40px | 40 | Extracted spacing token |
| 6xl | 42px | 42 | Extracted spacing token |
| 7xl | 80px | 80 | Extracted spacing token |

## Elevation & Depth

Keep depth flat unless validated shadow or interaction evidence appears in the extraction payload. Do not invent shadows beyond this evidence boundary.

### Shadow Evidence
| Shadow Token | Layers | Details |
|--------------|--------|---------|
| n/a | 0 | No validated shadow payload |

### Interaction Signals
| Theme | Signal | Evidence |
|-------|--------|----------|
| Light | backdrop-filter | blur(10px) saturate(1.8) ; blur(20px) saturate(1.8) |
| Light | outline-color | rgb(255, 255, 255) ; rgb(179, 179, 179) ; rgb(0, 0, 0) |
| Light | outline-width | 3px |
| Light | outline-offset | 0px |
| Light | transform | matrix(1, 0, 0, 1, -116.75, -240) ; matrix(1, 0, 0, 1, 0, -9.5) ; matrix(1, 0, 0, 1, -200, 0) |

## Shapes

Shape language maps directly to rounded tokens. Keep component corners consistent with the role mapping below before introducing bespoke geometry.

### Radius Roles
| Token | Value | Px | Role Mapping |
|------|-------|----|--------------|
| sm | 4px | 4 | Subtle corner |
| md | 15px | 15 | Card corner |
| lg | 16px | 16 | Card corner |
| xl | 28px | 28 | Large surface corner |
| 2xl | 31px | 31 | Large surface corner |
| phone-mockup | 42px | 42 | Large surface corner |
| pill | 120px | 120 | Large surface corner |

### Geometry Evidence
| Radius Token | Shape | Units |
|--------------|-------|-------|
| sm | 4px | px |
| md | 15px | px |
| lg | 16px | px |
| xl | 28px | px |
| 2xl | 31px | px |
| phone-mockup | 42px | px |
| pill | 120px | px |

## Components

Components should be recreated from token references first, then tuned with variant notes and probe-backed state guidance.
- **Logo Badge**: Rounded square badge containing the brand wordmark 'elva' in white on a near-black background, positioned top-left in the navigation bar.
- **Nav CTA Button**: Minimal navigation call-to-action link 'Try Yourself' with a small bullet/dot separator, positioned top-right. Lightweight text-only treatment.
- **Phone Mockup Hero**: Central hero element: a realistic phone device frame with large rounded corners containing a full-bleed video/image background, app UI chrome (status bar, nav icons), and overlaid headline + subheadline text.
- **Hero Headline**: Large display headline inside the phone mockup: 'Meet Elva. A filmmaking crew in your phone.' Set in Neue Haas Grotesk Display Pro at ~42px, white, centered.
- **Hero Subheadline**: Supporting body copy beneath the hero headline: 'The first AI agent that edits, directs, and shapes your memories.' Smaller, gray-toned, centered.
- **Background Display Text**: Full-bleed oversized text rendered behind the phone mockup at very large scale (~104px+), creating a typographic texture layer. Appears blurred/dimmed as a cinematic backdrop.
- **App Icon Button**: Circular icon buttons within the phone mockup UI (search, profile). Dark semi-transparent pill shape with white icon.
- **Agency Credit Badge**: Small pill-shaped badge in the bottom-left corner crediting 'Lazarev Agency — Product Design for AI SF, CA'. Subtle, low-contrast treatment.

### Agency Credit Badge

**Default**
- rounded: 120px
- backgroundColor: #141414
- textColor: #b3b3b3
- fontSize: 13px
- padding: 8px 16px

### App Icon Button

**Default**
- rounded: 120px
- backgroundColor: #000000
- textColor: #ffffff
- width: 42px
- height: 42px

### Background Display Text

**Default**
- fontFamily: Neue Haas Grotesk Display Pro
- fontSize: 104px
- fontWeight: 400
- lineHeight: 93.6px
- letterSpacing: -3.12px
- textColor: #ffffff
- opacity: 0.5

### Hero Headline

**Default**
- fontFamily: Neue Haas Grotesk Display Pro
- fontSize: 42px
- fontWeight: 400
- lineHeight: 38px
- letterSpacing: -0.84px
- textColor: #ffffff
- textAlign: center

### Hero Subheadline

**Default**
- fontFamily: Neue Haas Grotesk Display Pro
- fontSize: 16px
- fontWeight: 400
- lineHeight: 20.8px
- textColor: #b3b3b3
- textAlign: center

### Logo Badge

**Default**
- backgroundColor: #000000
- textColor: #ffffff
- rounded: 16px
- fontFamily: Neue Haas Grotesk Display Pro
- fontSize: 16px
- padding: 12px 16px

### Nav CTA Button

**Default**
- textColor: #ffffff
- fontFamily: Neue Haas Grotesk Display Pro
- fontSize: 16px
- fontWeight: 500
- letterSpacing: -0.32px
- backgroundColor: transparent

### Phone Mockup Hero

**Background Bleed**
- opacity: 0.5
- filter: blur
- rounded: 42px
- State guidance: The phone mockup is flanked by blurred/ghosted versions of itself at reduced opacity, creating a depth-of-field cinematic effect.

**Default**
- rounded: 42px
- backgroundColor: #000000
- overflow: hidden
- aspectRatio: portrait

## Do's and Don'ts

Guardrails protect Core token rhythm without adding unsupported visual claims.

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
| Mobile | <= 480px | (max-width: 480px) |
| Mobile | <= 526px | (max-width: 526px) |
| Mobile | <= 628px | (max-width: 628px) |
| Mobile | <= 640px | (max-width: 640px) |
| Breakpoint 5 | <= 768px | (max-width: 768px) |
| Breakpoint 6 | <= 824px | (max-width: 824px) |
| Breakpoint 7 | <= 1024px | (max-width: 1024px) |
| Breakpoint 8 | <= 1280px | (max-width: 1280px) |

## Agent Prompt Guide

### Example Component Prompts
- Create Agency Credit Badge variant that preserves Small pill-shaped badge in the bottom-left corner crediting 'Lazarev Agency — Product Design for AI SF, CA'. Subtle, low-contrast treatment..
- Create App Icon Button variant that preserves Circular icon buttons within the phone mockup UI (search, profile). Dark semi-transparent pill shape with white icon..
- Create Background Display Text variant that preserves Full-bleed oversized text rendered behind the phone mockup at very large scale (~104px+), creating a typographic texture layer. Appears blurred/dimmed as a cinematic backdrop..

### Iteration Guide
1. Start with extracted palette and typography roles only.
2. Map spacing and radius directly from token tables before visual polish.
3. Apply component patterns one section at a time and compare against source intent.
4. Keep elevation claims tied to explicit evidence in output.
5. Iterate with smallest diffs and re-check section hierarchy after each change.
