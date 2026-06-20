05_DESIGN_SYSTEM.md

AI-Dicto

Design System Specification

Version: 1.0

Status: Approved

Dependencies:

* 01_PRD.md
* 02_BRAND_GUIDE.md
* 03_FIGMA_ARCHITECTURE.md
* 04_SCREEN_SPECS.md

⸻

1. Purpose

This design system establishes:

* Visual consistency
* Component consistency
* Responsive governance
* Accessibility standards
* AI implementation constraints

Every design and code implementation must reference this document.

⸻

2. Design Philosophy

AI-Dicto combines:

Elva

* Cinematic depth
* Premium atmosphere
* Large typography
* Layered storytelling

Units

* Structured discovery
* Category navigation
* Information architecture

Apple

* Minimalism
* Restraint
* Clarity

Perplexity

* Conversational workflows
* AI-first interaction

⸻

3. Design Principles

Principle 1

Conversation Before Navigation

⸻

Principle 2

Recommendation Before Exploration

⸻

Principle 3

Clarity Before Decoration

⸻

Principle 4

Accessibility Before Animation

⸻

Principle 5

Premium Before Trendy

⸻

4. Color System

Background

Background Primary

#050505

Usage:

* Main application background

⸻

Background Secondary

#0A0A0A

Usage:

* Alternate sections

⸻

Background Tertiary

#121212

Usage:

* Layered surfaces

⸻

5. Surface Colors

Surface Primary

#171717

Cards

Panels

⸻

Surface Secondary

#1E1E1E

Hover states

Modals

⸻

6. Text Colors

Primary Text

#FFFFFF

⸻

Secondary Text

#B8B8B8

⸻

Muted Text

#6B7280

⸻

7. Accent Colors

Reserved for:

* Voice Assistant
* AI States
* Recommendations

⸻

Indigo

#6366F1

⸻

Violet

#8B5CF6

⸻

Gradient

linear-gradient(
135deg,
#6366F1 0%,
#8B5CF6 100%
)

⸻

8. Semantic Colors

Success

#22C55E

⸻

Warning

#F59E0B

⸻

Error

#EF4444

⸻

Info

#3B82F6

⸻

9. Typography

Display Font

General Sans

⸻

Body Font

Inter

⸻

Fallback

Geist

⸻

10. Typography Scale

Desktop

Hero

72px

Weight: 600

Line Height: 1.1

⸻

H1

48px

Weight: 600

⸻

H2

40px

Weight: 600

⸻

H3

32px

Weight: 600

⸻

Card Title

24px

Weight: 600

⸻

Body

16px

Weight: 400

⸻

Caption

14px

Weight: 400

⸻

11. Mobile Typography

Hero

40px

⸻

H1

28px

⸻

H2

24px

⸻

Card Title

20px

⸻

Body

16px

⸻

12. Spacing System

Use 8-point grid only.

Allowed values:

4
8
16
24
32
48
64
96

Never use arbitrary spacing.

⸻

13. Border Radius

Small

8px

⸻

Medium

16px

⸻

Large

24px

⸻

Extra Large

32px

⸻

Pill

999px

⸻

14. Shadows

Minimal usage.

⸻

Card

0 2px 12px rgba(0,0,0,0.15)

⸻

Modal

0 8px 30px rgba(0,0,0,0.25)

⸻

15. Grid System

Desktop

12 Columns

⸻

Tablet

8 Columns

⸻

Mobile

4 Columns

⸻

16. Breakpoints

Mobile

320–767px

⸻

Tablet

768–1023px

⸻

Desktop

1024–1439px

⸻

Large Desktop

1440px+

⸻

17. Layout Ratios

Hero

Desktop

60% Content
40% Visual

⸻

Tablet

70% Content
30% Visual

⸻

Mobile

100% Content

⸻

18. Category Grid

Desktop

4 Columns

⸻

Tablet

2 Columns

⸻

Mobile

1 Column

⸻

19. Tool Grid

Desktop

4 Cards

⸻

Laptop

3 Cards

⸻

Tablet

2 Cards

⸻

Mobile

1 Card

⸻

20. Buttons

Primary Button

Purpose:

Main action

⸻

Style

Background:

Gradient Accent

Text:

White

Radius:

16px

Height:

48px

⸻

Secondary Button

Purpose:

Alternative action

⸻

Style

Transparent

Border

White

⸻

21. Search Bar

Height:

56px

⸻

Contains:

Search Icon

Input

Voice Trigger

⸻

Radius:

16px

⸻

22. Voice Orb

Primary product object.

⸻

Size

Desktop:

120px

⸻

Tablet:

100px

⸻

Mobile:

80px

⸻

States:

Idle

Listening

Thinking

Results

⸻

Gradient:

Voice Gradient

⸻

23. Tool Card

Structure:

Logo

Name

Description

Category

Actions

⸻

Aspect Ratio

4:3

⸻

Radius

16px

⸻

24. Category Card

Structure:

Icon

Title

Description

⸻

Aspect Ratio

1:1

⸻

Radius

24px

⸻

25. Recommendation Card

Structure:

Tool

Match Score

Reason

Best Use Case

Actions

⸻

Radius

24px

⸻

26. Modal Design

Tool Modal

Compare Modal

⸻

Desktop

Centered

⸻

Mobile

Bottom Sheet

⸻

Radius

24px

⸻

27. Navigation

Height

72px

⸻

Contents

Logo

Navigation

Actions

⸻

Sticky

Enabled

⸻

28. Forms

Input Height

48px

⸻

Radius

12px

⸻

Validation

Inline

⸻

Error

Below Input

⸻

29. Empty States

Must contain:

Illustration

Message

Action

⸻

Never show blank screens.

⸻

30. Loading States

Use:

Skeleton Loaders

⸻

Avoid:

Spinners for large sections

⸻

31. Accessibility

WCAG AA Required

⸻

Minimum Contrast

4.5:1

⸻

Touch Targets

44px+

⸻

Keyboard Accessible

Required

⸻

Focus States

Visible

⸻

32. Design Constraints

Never:

* Introduce new colors
* Introduce new fonts
* Use glassmorphism extensively
* Use excessive blur
* Use neon effects

⸻

Always:

* Maintain hierarchy
* Preserve readability
* Prioritize content

⸻

33. Component Governance

Every component must:

✓ Have desktop version

✓ Have tablet version

✓ Have mobile version

✓ Have hover state

✓ Have active state

✓ Have disabled state

⸻

34. AI Implementation Rules

Design agents must:

* Use design tokens only
* Use existing spacing values
* Follow responsive ratios
* Reuse components

Do not create one-off designs.

⸻

35. Final Statement

The AI-Dicto design system prioritizes clarity, conversation, and decision-making. Every element should support the user’s journey from intent to recommendation while maintaining a premium, minimal, and AI-native experience.
