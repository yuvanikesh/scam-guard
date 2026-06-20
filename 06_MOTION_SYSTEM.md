06_MOTION_SYSTEM.md

AI-Dicto

Motion & Interaction System Specification

Version: 1.0

Status: Approved

Dependencies:

* 01_PRD.md
* 02_BRAND_GUIDE.md
* 03_FIGMA_ARCHITECTURE.md
* 04_SCREEN_SPECS.md
* 05_DESIGN_SYSTEM.md

⸻

1. Purpose

This document defines:

* Motion Principles
* Animation Rules
* Voice Orb States
* Page Transitions
* Micro-interactions
* Framer Motion Constraints
* Performance Standards

Motion exists to:

Guide attention.
Provide feedback.
Support understanding.

Motion must never exist purely for decoration.

⸻

2. Motion Philosophy

Inspired By:

Elva

Provides:

* Cinematic depth
* Layer separation
* Scroll immersion

⸻

Apple

Provides:

* Precision
* Restraint
* Natural movement

⸻

Perplexity

Provides:

* Functional interactions
* Conversational transitions

⸻

3. Motion Principles

Principle 1

Motion Must Explain

Every animation should answer:

What changed?

⸻

Principle 2

Motion Must Guide

Every transition should help users understand:

Where am I going?

⸻

Principle 3

Motion Must Be Fast

Never slow down interaction.

⸻

Principle 4

Motion Must Respect Content

Content always wins.

⸻

4. Allowed Motion Families

Only 3 animation families allowed.

⸻

Family 1

Fade

Usage:

* Cards
* Sections
* Results

Duration:

200–300ms

⸻

Family 2

Parallax

Usage:

Hero Only

⸻

Family 3

Morph

Usage:

Voice Assistant

Center
→
Floating Companion

⸻

5. Forbidden Motion

Never use:

* Bounce
* Flip
* Spin
* Elastic effects
* Excessive scaling
* Random floating objects
* Neon particle systems

⸻

6. Timing Scale

Fast

150ms

Used for:

Hover

⸻

Standard

250ms

Used for:

Cards

Buttons

⸻

Medium

400ms

Used for:

Modal transitions

⸻

Hero

600ms

Used for:

Hero reveal

⸻

7. Easing Standards

Primary

cubic-bezier(0.22,1,0.36,1)

⸻

Secondary

ease-out

⸻

Do not create custom easings.

⸻

8. Hero Motion Architecture

Inspired by Elva.

⸻

Layers

Layer 1

Background Typography

⸻

Layer 2

Blurred Category Cards

⸻

Layer 3

Voice Orb

⸻

Layer 4

Content

⸻

9. Hero Scroll Behavior

Background Text

Speed:

40%

⸻

Category Cards

Speed:

70%

⸻

Voice Orb

Speed:

100%

⸻

Content

Speed:

100%

⸻

Result:

Depth without distraction.

⸻

10. Background Typography Motion

Text:

DISCOVER
AI TOOLS

⸻

Behavior

Slow parallax

Opacity variation

⸻

Range

0.2 → 0.5

⸻

11. Voice Orb Motion System

Primary product object.

⸻

STATE 1

Idle

⸻

Behavior

Subtle breathing effect.

⸻

Scale

1 → 1.03

⸻

Duration

4s

⸻

Repeat

Infinite

⸻

STATE 2

Hover

⸻

Behavior

Glow increase

Scale

1 → 1.05

⸻

Duration

150ms

⸻

STATE 3

Listening

⸻

Behavior

Audio-reactive rings

Wave expansion

Gradient glow

⸻

Scale

1 → 1.08

⸻

STATE 4

Thinking

⸻

Behavior

Rotating gradient halo

Pulse

⸻

No spinner.

⸻

STATE 5

Results

⸻

Behavior

Expand

Reveal cards

⸻

Cards appear:

Staggered

⸻

Delay

50ms each

⸻

12. Orb Morph Animation

Most important interaction.

⸻

Trigger

First successful conversation.

⸻

Transition

Center Hero Orb

↓

Shrink

↓

Move

↓

Dock

↓

Floating Assistant

⸻

Duration

600ms

⸻

Easing

Primary Easing

⸻

13. Search Interaction Motion

Input Focus

⸻

Border Highlight

150ms

⸻

Voice Button

Glow

150ms

⸻

Results

Fade + Slide Up

250ms

⸻

14. Category Explorer Motion

Category Change

⸻

Old Grid

Fade Out

⸻

New Grid

Fade In

⸻

Duration

250ms

⸻

No page refresh effect.

⸻

15. Tool Card Motion

Hover

⸻

Translate

-4px

⸻

Duration

150ms

⸻

Shadow Increase

Subtle

⸻

16. Recommendation Card Motion

Reveal

⸻

Fade

Slide Up

⸻

Duration

250ms

⸻

Stagger

50ms

⸻

17. Modal Motion

Tool Modal

Compare Modal

⸻

Desktop

Scale

0.95 → 1

Fade

⸻

Duration

300ms

⸻

Mobile

Bottom Sheet

Slide Up

⸻

Duration

300ms

⸻

18. Page Transitions

Usage

Route changes.

⸻

Animation

Fade

Only

⸻

Duration

250ms

⸻

No slide transitions between pages.

⸻

19. Navigation Motion

Navbar

Sticky

⸻

On Scroll

Background Blur

Opacity Increase

⸻

Duration

250ms

⸻

20. Favorites Interaction

Save Tool

⸻

Heart Fill

200ms

⸻

Success Feedback

Subtle

⸻

21. Compare Interaction

Add To Compare

⸻

Button Highlight

150ms

⸻

Compare Modal

300ms

⸻

22. Loading States

Use:

Skeletons

⸻

Fade In

200ms

⸻

Avoid:

Long spinners

⸻

23. Empty States

Fade In

⸻

Duration

250ms

⸻

24. Error States

Shake animations

Not Allowed

⸻

Use:

Color

Message

Action

⸻

25. Accessibility Motion Rules

Respect:

prefers-reduced-motion

⸻

When enabled:

Disable:

* Parallax
* Orb breathing
* Layer motion

⸻

Keep:

Fade

Only

⸻

26. Framer Motion Rules

Allowed

* AnimatePresence
* Motion Div
* Layout Animations

⸻

Avoid

Heavy timelines

Complex physics

Excessive spring chains

⸻

27. Performance Budget

Maximum Animation Duration

600ms

⸻

Target FPS

60fps

⸻

Animation CPU Usage

Minimal

⸻

Avoid

Continuous expensive animations.

⸻

28. AI Agent Motion Rules

Agents must:

✓ Use existing timing tokens

✓ Use existing easing tokens

✓ Use approved motion families

✓ Respect reduced motion

⸻

Agents must not:

✗ Invent new animation systems

✗ Add decorative motion

✗ Introduce gaming-style effects

⸻

29. Motion Hierarchy

Highest Motion Priority

1. Voice Orb

⸻

Second Priority

2. Recommendations

⸻

Third Priority

3. Hero Depth

⸻

Fourth Priority

4. Cards

⸻

Lowest Priority

5. Navigation

⸻

30. Final Statement

Motion in AI-Dicto should feel intelligent, restrained, and purposeful. Users should perceive depth, responsiveness, and guidance without becoming aware of the animation itself. The Voice Assistant remains the central motion object and should receive the highest level of attention, while all other motion exists to support understanding and decision-making.
