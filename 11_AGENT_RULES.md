11_AGENT_RULES.md

AI-Dicto

Agent Operating System (Agent Rules + SkillOps-Inspired Development Framework)

Version: 1.0

Status: Mandatory

Applies To:

* Cursor
* Windsurf
* Claude Code
* GitHub Copilot Agent
* Roo Code
* Cline
* Lovable
* Bolt
* Future AI Development Agents

Dependencies:

All project documentation.

01_PRD.md
02_BRAND_GUIDE.md
03_FIGMA_ARCHITECTURE.md
04_SCREEN_SPECS.md
05_DESIGN_SYSTEM.md
06_MOTION_SYSTEM.md
07_DATABASE_SCHEMA.md
08_RECOMMENDATION_ENGINE.md
09_DATASET_SPEC.md
10_DEPLOYMENT_ARCHITECTURE.md

⸻

1. Purpose

This document governs how AI agents must design, implement, validate, and evolve AI-Dicto.

Inspired by:

Microsoft SkillOpt Principles

Key Concepts Adopted:

* Skill Decomposition
* Explicit Planning
* Capability Isolation
* Validation Loops
* Structured Execution
* Iterative Optimization
* Tool-Aware Reasoning

The AI agent is not allowed to operate as a “generate everything at once” system.

The agent must operate as a structured engineering team.

⸻

2. Project North Star

AI-Dicto is:

A Premium AI Concierge

AI-Dicto is NOT:

An AI Directory
A SaaS Dashboard
A Chatbot
A Marketplace

Every implementation decision must reinforce:

Conversation
→
Recommendation
→
Decision

⸻

3. Core Agent Philosophy

Before implementing anything:

Agent must answer:

Why does this exist?
How does it support discovery?
How does it support recommendations?
How does it improve decision-making?

If no answer exists:

Do not build it.

⸻

4. Skill-Based Execution Model

Following SkillOpt principles:

Every task must be decomposed into skills.

⸻

Example:

Building Search

Wrong:

Build search system.

Correct:

Skill 1
Search UI
Skill 2
Search State
Skill 3
Search API
Skill 4
Search Retrieval
Skill 5
Search Ranking
Skill 6
Search Analytics

Agent must complete skills individually.

⸻

5. Development Order

Mandatory.

Never violate.

⸻

Phase 1

Design Tokens

⸻

Phase 2

Shared Components

⸻

Phase 3

Static Pages

⸻

Phase 4

Responsive Layouts

⸻

Phase 5

Authentication

⸻

Phase 6

Database Integration

⸻

Phase 7

Search

⸻

Phase 8

Recommendation Engine

⸻

Phase 9

Voice Assistant

⸻

Phase 10

Admin Dashboard

⸻

Phase 11

Deployment

⸻

6. Architecture Rules

Never introduce:

Redux
Express
NestJS
MongoDB
Firebase
Custom Backend Servers

⸻

Approved Stack:

Next.js 15
TypeScript
Tailwind
Shadcn
Framer Motion
Supabase
OpenRouter
Sarvam AI
Zustand
TanStack Query

⸻

7. Skill Registry

Agent should think in reusable skills.

⸻

Approved Skills:

Authentication Skill

Responsibilities:

Login
Session
Role Selection

⸻

Search Skill

Responsibilities:

Input
Retrieval
Filtering
Ranking

⸻

Recommendation Skill

Responsibilities:

Candidate Retrieval
Scoring
Explanation

⸻

Voice Skill

Responsibilities:

STT
Query Processing
Speech Output

⸻

Analytics Skill

Responsibilities:

Tracking
Aggregation
Visualization

⸻

8. Context Management Rules

Agent must load:

PRD
Design System
Database Schema
Recommendation Spec

Before implementing.

⸻

Never assume requirements.

⸻

Never invent requirements.

⸻

9. UI Governance

Must follow:

05_DESIGN_SYSTEM.md

Exactly.

⸻

Never invent:

* Colors
* Typography
* Layout systems
* Spacing systems

⸻

Only approved design tokens allowed.

⸻

10. Motion Governance

Must follow:

06_MOTION_SYSTEM.md

Exactly.

⸻

Allowed Motion Families:

Fade
Parallax
Morph

⸻

Forbidden:

Bounce
Flip
Spin
Elastic

⸻

11. Component Rules

Every component must:

✓ Be reusable

✓ Be typed

✓ Be responsive

✓ Support accessibility

✓ Support loading states

✓ Support error states

⸻

Never build:

One-off components

⸻

12. Data Rules

Source of Truth:

Supabase

⸻

Never:

Hardcode tool data

⸻

Never:

Store recommendations in frontend

⸻

Always:

Query database

⸻

13. Recommendation Rules

Must follow:

08_RECOMMENDATION_ENGINE.md

⸻

Recommendations must:

✓ Come from database

✓ Use ranking formula

✓ Respect role context

✓ Respect conversation context

⸻

Never:

Invent tools

⸻

14. Search Rules

Pipeline:

Keyword
↓
Category
↓
Tag
↓
Full Text Search
↓
Ranking

⸻

Do not skip stages.

⸻

15. Voice Rules

Pipeline:

Voice
↓
Sarvam STT
↓
Recommendation Engine
↓
Speech Output

⸻

No custom voice infrastructure.

⸻

16. Accessibility Rules

Must satisfy:

WCAG AA

⸻

Requirements:

Keyboard Navigation
Screen Readers
Touch Targets > 44px
Visible Focus States

⸻

Accessibility is not optional.

⸻

17. Responsive Rules

Follow:

Universal Ratio System

From Design System.

⸻

Never:

Design desktop first then shrink.

⸻

Design:

Core Experience
↓
Adaptive Layout
↓
Device Optimization

⸻

18. Testing Rules

Every skill must include:

Happy Path

Error Path

Empty State

Loading State

⸻

No implementation is complete without all four.

⸻

19. Validation Loop (SkillOpt Inspired)

Before marking a task complete:

Agent must execute:

Build
↓
Validate
↓
Refine
↓
Retest
↓
Approve

⸻

Never:

Build
↓
Done

⸻

20. Self-Review Loop

Before submitting code:

Agent must verify:

Architecture

Correct?

Responsive

Correct?

Accessibility

Correct?

Performance

Correct?

Security

Correct?

⸻

21. Security Rules

Never expose:

API Keys
Service Keys
Secrets

⸻

All AI requests must go through:

Next.js Route Handlers

⸻

Never call OpenRouter directly from frontend.

⸻

22. Performance Rules

Targets:

Landing

< 3 seconds

⸻

Search

< 500ms

⸻

Recommendation

< 2 seconds

⸻

Voice

< 4 seconds

⸻

23. Logging Rules

Track:

search_performed
recommendation_generated
tool_opened
tool_favorited
tool_compared
voice_started
voice_completed

⸻

Never log:

Sensitive user data.

⸻

24. Git Rules

Commit Format:

feat:
fix:
refactor:
docs:
test:

⸻

Example:

feat: add recommendation retrieval service

⸻

25. Documentation Rules

Every major feature requires:

Purpose

Architecture

Dependencies

Limitations

Future Improvements

⸻

26. Agent Decision Framework

Before implementing a feature:

Ask:

Does it support recommendations?
Does it support discovery?
Does it improve decision quality?

If all answers are:

No

Then reject feature.

⸻

27. Challenge Scope Protection

Avoid:

Reviews
Comments
Communities
Feeds
Collections
Complex Social Features

⸻

Reason:

Low value for challenge.

⸻

28. Production Readiness Checklist

Before deployment:

✓ Auth Works

✓ Search Works

✓ Recommendation Works

✓ Voice Works

✓ Favorites Work

✓ Analytics Work

✓ Mobile Works

✓ Accessibility Passes

✓ Lighthouse > 90

⸻

29. Agent Success Criteria

Agent succeeds when:

Users can:

Describe Goal
↓
Receive Recommendations
↓
Compare Options
↓
Choose Tool
↓
Save Tool

Within:

60 seconds

⸻

30. Final Commandment

The Voice Assistant is the product.

The Recommendation Engine is the intelligence.

The Dataset is the source of truth.

The Design System is law.

The PRD is the contract.

When conflicts occur:

PRD
↓
Design System
↓
Database Schema
↓
Implementation

in that order.

Never optimize for code generation.

Always optimize for product quality.
