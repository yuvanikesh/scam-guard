03_FIGMA_ARCHITECTURE.md

AI-Dicto

Figma Architecture & Information Architecture Blueprint

Version: 1.0

Status: Approved for Design

Prerequisites:

* 01_PRD.md
* 02_BRAND_GUIDE.md

⸻

1. Purpose

This document defines:

* Figma File Structure
* Page Hierarchy
* User Flows
* Navigation Architecture
* Component Architecture
* Design Dependencies

This document serves as the single source of truth before visual design begins.

⸻

2. Figma File Structure

Create a single Figma file:

AI-Dicto

Inside the file:

01 Cover
02 Design System
03 Landing Page
04 Authentication
05 Home Dashboard
06 Search Experience
07 Category Explorer
08 Tool Modal
09 Compare Modal
10 Favorites
11 Voice Assistant
12 Admin Dashboard
13 Responsive Views
14 Prototype Flows
15 Archive

⸻

3. Information Architecture

Landing Page
│
├── Voice Assistant
├── Search
├── Categories
├── Trending Tools
└── Authentication
     │
     └── Dashboard
          │
          ├── Search
          ├── Categories
          ├── Favorites
          ├── Tool Detail
          ├── Compare
          └── Voice Assistant

⸻

4. Navigation Structure

Public Navigation

Navbar

Logo
Categories
Trending
Search
Login
Ask With Voice

⸻

Authenticated Navigation

Navbar

Logo
Search
Categories
Favorites
Profile
Voice Assistant

⸻

5. Core User Flow

Flow 1

First Time Visitor

Landing
↓
Voice CTA
↓
Login
↓
Role Selection
↓
Dashboard

⸻

Flow 2

Search Discovery

Dashboard
↓
Search
↓
Results
↓
Tool Modal
↓
Favorite

⸻

Flow 3

Voice Discovery

Landing
↓
Voice Assistant
↓
Conversation
↓
Recommendations
↓
Tool Modal

⸻

Flow 4

Comparison Flow

Tool
↓
Compare
↓
Comparison Modal
↓
Decision

⸻

6. Landing Page Architecture

Frame:

Desktop Landing

Sections:

Navbar
Hero
How It Works
Categories
Trending Tools
Comparison Demo
Footer

⸻

7. Hero Architecture

Purpose:

Introduce value proposition within 5 seconds.

⸻

Layout:

Background Typography
Voice Orb
Headline
Subheadline
Primary CTA
Secondary CTA

⸻

Visual Hierarchy:

Voice Orb
↓
Headline
↓
CTA
↓
Background Depth

⸻

8. Hero Scroll System

Inspired by:

Elva

⸻

Layers:

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

Scroll Behavior:

Background moves slower
Orb scales
Cards separate
Content fades

⸻

9. Voice Assistant Architecture

Most important screen.

⸻

State 1

Hero Mode

Center Screen
Prompt:
Tell me what you want to create.

Actions:

Speak
Type
Skip

⸻

State 2

Listening

Wave Animation
Glow Effect
Microphone Active

⸻

State 3

Thinking

Loading State
Recommendation Processing

⸻

State 4

Results

Top 5 Tools
Explanations
Actions

⸻

State 5

Floating Companion

Bottom Right
Persistent

⸻

10. Authentication Architecture

Frames:

Login
Role Selection

⸻

Login Methods:

Google
Email OTP

⸻

Role Selection

Cards:

Student
Developer
Designer
Founder
Marketer

⸻

11. Home Dashboard Architecture

Purpose:

Primary discovery workspace.

⸻

Structure:

Navbar
Search Bar
Category Explorer
Trending Tools
Favorites
Voice Assistant

⸻

12. Search Experience Architecture

Frame:

Search Experience

⸻

Components:

Search Input
Filters
Suggestions
Results
Voice Trigger

⸻

Search Types:

Traditional

Semantic

⸻

13. Category Explorer Architecture

Inspired by:

Units

⸻

Desktop Layout

Left Sidebar
Right Content Area

⸻

Left

Writing
Coding
Video
Research
Marketing
Design
Automation
Productivity

⸻

Right

Tool Grid

⸻

Transition

Smooth

No Page Refresh

⸻

14. Tool Detail Architecture

Interaction:

Modal

Not separate page.

⸻

Sections:

Overview
Description
Pros
Use Cases
Website
Compare
Favorite

⸻

Actions:

Visit Website
Favorite
Compare

⸻

15. Compare Modal Architecture

Purpose:

Decision support.

⸻

Layout:

Tool A
VS
Tool B

⸻

Rows:

Description
Use Cases
Strengths
Weaknesses
Pricing
Best For

⸻

Desktop

Horizontal

⸻

Mobile

Scrollable

⸻

16. Favorites Architecture

Purpose:

Saved tools.

⸻

Components:

Favorites Grid
Search
Remove

⸻

Layout:

Tool Cards

⸻

17. Admin Dashboard Architecture

Sections:

Analytics

Tools

Users

Categories

⸻

Analytics Cards

Total Users
Searches
Recommendations
Favorites

⸻

Charts

Most Searched
Most Recommended
Category Popularity

⸻

18. Responsive Frame Structure

Create separate frames:

Desktop 1440
Laptop 1280
Tablet 768
Mobile 390

⸻

Every screen must exist in:

Desktop
Tablet
Mobile

⸻

19. Component Inventory

Global Components

Navbar
Footer
Buttons
Inputs
Search Bar
Voice Orb
Cards
Tags
Modals
Tool Cards

⸻

Recommendation Components

Recommendation Card
Reason Badge
Role Badge
Tool Match Score

⸻

20. Design Dependencies

Design System

↓

Components

↓

Pages

↓

Prototype

⸻

Never create pages before components.

Never create components before design tokens.

⸻

21. Prototype Flows

Create clickable prototypes for:

Flow 1

Landing → Login → Dashboard

⸻

Flow 2

Search → Tool Modal

⸻

Flow 3

Voice Assistant → Results

⸻

Flow 4

Compare Flow

⸻

22. Figma Naming Convention

Frames

LP_Hero
LP_Categories
DB_Search
DB_Favorites
VM_Listening
VM_Thinking

⸻

Components

BTN_Primary
CARD_Tool
MODAL_Compare
ORB_Voice

⸻

23. Figma Completion Criteria

The architecture phase is complete when:

✓ All pages exist

✓ All flows exist

✓ Component inventory exists

✓ Responsive frames exist

✓ Prototype flows exist

✓ Design system references are linked

⸻

Final Statement

The Figma architecture should prioritize conversational discovery over traditional navigation. The voice assistant must be treated as the primary product object and should receive greater visual priority than search, categories, or tool listings. Every screen should reinforce the idea that AI-Dicto is an intelligent guide rather than a directory.
