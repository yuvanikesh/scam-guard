01_PRD.md

AI-Dicto

Product Requirements Document (PRD)

Version: 1.0

Status: Approved for Design Phase

Project Type: Nexora Frontend Development Challenge

Author: YUVA

⸻

1. Executive Summary

Product Name

AI-Dicto

Tagline

Get the Right One.

Brand Story

Where AI tools pile up, but ideas shouldn’t.

AI-Dicto helps users discover the most suitable AI tools through conversation instead of overwhelming directories and endless browsing.

⸻

2. Vision Statement

AI-Dicto is an AI Tool Discovery & Recommendation Platform that reduces decision fatigue through conversational recommendations.

Instead of browsing hundreds of AI tools, users simply describe what they want to achieve.

AI-Dicto identifies and recommends the most relevant tools for that goal.

⸻

3. Problem Statement

The AI ecosystem grows daily.

Users face:

* Too many tools
* Information overload
* Analysis paralysis
* Poor recommendation quality
* Difficulty choosing the correct tool

Most users know:

“I want to accomplish something.”

They do not know:

“What tool should I use?”

Current AI directories focus on:

* Search
* Browse
* Filter

AI-Dicto focuses on:

* Intent
* Conversation
* Recommendation
* Decision

⸻

4. Product Mission

Help users discover the right AI tool in under 60 seconds.

⸻

5. Product Positioning

Existing Platforms

Examples:

* Futurepedia
* Toolify
* There’s An AI For That

These platforms solve:

Search
Browse
Filter

⸻

AI-Dicto Solves

Intent
→ Conversation
→ Recommendation
→ Decision

⸻

6. Target Users

Primary Audience

1. Students
2. Developers
3. Designers
4. Founders
5. Marketers

⸻

User Expertise Levels

* Beginners
* Intermediate Users
* Power Users

⸻

7. User Personas

Student

Needs:

* Study assistants
* Research tools
* Writing support

Goals:

* Learn faster
* Improve productivity

⸻

Developer

Needs:

* Coding assistants
* Debugging tools
* Documentation tools

Goals:

* Build software faster

⸻

Designer

Needs:

* Design tools
* Image generation
* UI inspiration

Goals:

* Improve creative workflow

⸻

Founder

Needs:

* Productivity tools
* Marketing tools
* Business automation

Goals:

* Scale efficiently

⸻

Marketer

Needs:

* Content generation
* Social media tools
* Campaign support

Goals:

* Produce better marketing assets

⸻

8. Success Metrics

Product Metrics

User finds suitable tool within:

≤ 60 seconds

Recommendation relevance:

≥ 80%

Tool recommendation flow:

≤ 3 interactions

⸻

Engagement Metrics

Voice assistant usage:

≥ 40%

Comparison usage:

≥ 15%

Average session duration:

≥ 2 minutes

⸻

Technical Metrics

Lighthouse:

≥ 90

First Contentful Paint:

≤ 3 seconds

Mobile Performance:

≥ 90

⸻

9. Core Value Proposition

Users no longer need to know:

* ChatGPT
* Claude
* Cursor
* Perplexity
* Midjourney

Users only need to know:

“What am I trying to accomplish?”

AI-Dicto handles the rest.

⸻

10. Product Scope

Included in V1

Conversational Recommendations

Text-based recommendations

Voice-based recommendations

Role-aware recommendations

⸻

AI Tool Discovery

Search

Browse

Filter

Categories

⸻

Tool Comparison

Side-by-side comparison

⸻

Favorites

User-specific saved tools

⸻

Admin Dashboard

Analytics

Tool insights

Category insights

⸻

11. Out of Scope

Not included in V1:

* User reviews
* Community features
* Social feeds
* Public profiles
* Tool collections
* Advanced personalization
* Team workspaces

⸻

12. User Journey

First-Time User

Landing Page

↓

Google Login

↓

Role Selection

↓

Home Page

↓

Discovery Experience

⸻

Returning User

Login

↓

Dashboard

↓

Continue Discovery

⸻

13. User Roles

During onboarding:

Users select:

* Student
* Developer
* Designer
* Founder
* Marketer

This role influences recommendations.

⸻

14. Core Features

Feature 1

AI Tool Directory

Displays:

* Name
* Description
* Category
* Website
* Tags

⸻

Feature 2

Hybrid Search

Traditional Search

Examples:

ChatGPT

Claude

Cursor

⸻

Semantic Search

Examples:

“I need AI for Instagram marketing.”

“I want help studying mathematics.”

⸻

Feature 3

Voice Assistant

Primary product differentiator.

Supports:

* Voice input
* Text input
* Follow-up questions
* Recommendations

⸻

Feature 4

Tool Comparison

Compare:

* Use Cases
* Strengths
* Weaknesses
* Pricing

⸻

Feature 5

Favorites

Save tools

Sync across devices

Accessible after login

⸻

Feature 6

Admin Dashboard

Track:

* Searches
* Recommendations
* Favorites
* Users
* Category popularity

⸻

15. Data Acquisition Strategy

Launch Dataset

Target:

100–150 curated AI tools

⸻

Categories

Writing

Coding

Video

Research

Marketing

Design

Automation

Productivity

⸻

Data Sources

AI Directories

* Futurepedia
* Toolify
* There’s An AI For That

Official Product Websites

Primary source of truth.

AI-Assisted Metadata Generation

Used for:

* Tags
* Categories
* Recommendation metadata

Never for inventing tools.

⸻

16. Tool Metadata Schema

Required:

* Name
* Description
* Category
* Website
* Tags

Additional:

* Pros
* Use Cases
* Pricing Model
* Best Role
* Difficulty

⸻

17. Recommendation Engine

Inputs

Role

Query

Conversation Context

⸻

Retrieval

Semantic Search

↓

Top 10 Candidates

⸻

Ranking Formula

40% Semantic Match

30% Role Match

20% Category Match

10% Popularity Weight

⸻

LLM Layer

Model:

Nemotron

Responsibilities:

* Explain recommendations
* Rank results
* Generate reasoning

⸻

Output

Top 5 Tools

Each includes:

* Tool Name
* Why It Fits
* Best Use Case

⸻

18. Search Architecture

Pipeline:

Keyword Search

↓

Category Match

↓

Tag Match

↓

Semantic Search

↓

Ranking

↓

Results

⸻

19. Conversational Assistant Lifecycle

State 1

Hero Assistant

Center Screen

Prompt:

“Tell me what you want to create.”

Options:

* Speak
* Type
* Skip

⸻

State 2

Conversation Mode

User describes goal

AI retrieves recommendations

⸻

State 3

Floating Companion

Assistant moves to bottom-right

Persistent access

⸻

State 4

Expanded Recommendation View

Comparison

Explanations

Recommendations

⸻

20. Technical Stack

Frontend

Next.js 15

TypeScript

Tailwind CSS

Shadcn/UI

Framer Motion

⸻

Backend

Supabase

Services:

* Auth
* Database
* Storage
* Analytics

⸻

AI

Primary:

OpenRouter

Nemotron

Fallback:

Gemini Flash

⸻

Voice

Sarvam AI STT

Browser Speech Synthesis

⸻

Deployment

Azure Static Web Apps

⸻

21. State Management

Local State:

React State

Global State:

Zustand

Server State:

TanStack Query

Persistence:

Supabase

⸻

22. Responsive Experience Strategy

Objective

Maintain consistent experience across:

* Mobile
* Tablet
* Laptop
* Desktop

⸻

Hero Layout

Desktop:

60% Content

40% Visual

Tablet:

70% Content

30% Visual

Mobile:

100% Content

⸻

Category Grid

Desktop:

4 Columns

Tablet:

2 Columns

Mobile:

1 Column

⸻

Tool Grid

Desktop:

4 Cards

Laptop:

3 Cards

Tablet:

2 Cards

Mobile:

1 Card

⸻

Voice Assistant

Always visible.

Never hidden.

Always accessible within one tap.

⸻

23. Accessibility Requirements

WCAG AA Compliance

Keyboard Navigation

Screen Reader Support

Touch Targets > 44px

Contrast Ratio > 4.5:1

⸻

24. Security Requirements

Authentication:

Google OAuth

Email OTP

⸻

User data isolation via RLS.

No API keys exposed to frontend.

All AI calls routed through backend.

⸻

25. Analytics Requirements

Track:

* Searches
* Recommendations
* Favorites
* Category Usage
* Voice Usage
* Tool Clicks

⸻

26. Challenge-Winning Features

Feature 1

Voice Assistant

Primary Differentiator

⸻

Feature 2

Semantic Search

Natural Language Discovery

⸻

Feature 3

Tool Comparison

Decision Support

⸻

Feature 4

Role-Aware Recommendations

Contextual Recommendations

⸻

27. Risks

Risk 1

Too many tools

Mitigation:

Use curated dataset

⸻

Risk 2

Poor recommendations

Mitigation:

Metadata enrichment

Role-based ranking

⸻

Risk 3

Voice complexity

Mitigation:

Use Sarvam STT only

Avoid custom voice infrastructure

⸻

28. Roadmap

Phase 1

PRD

⸻

Phase 2

Figma Architecture

⸻

Phase 3

Screen Specifications

⸻

Phase 4

Design System

⸻

Phase 5

Database Schema

⸻

Phase 6

Authentication

⸻

Phase 7

Tool Directory

⸻

Phase 8

Search Engine

⸻

Phase 9

Recommendation Engine

⸻

Phase 10

Voice Assistant

⸻

Phase 11

Admin Dashboard

⸻

Phase 12

Deployment

⸻

29. Final Product Statement

AI-Dicto combines conversational AI, semantic search, and intelligent recommendations to help users discover the right AI tool for their goals. Instead of overwhelming users with hundreds of choices, AI-Dicto guides them toward the most relevant solution through a premium, conversation-first experience.
