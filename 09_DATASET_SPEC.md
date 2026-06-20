09_DATASET_SPEC.md

AI-Dicto

Dataset Architecture & Knowledge Base Specification

Version: 1.0

Status: Approved

Dependencies:

* 01_PRD.md
* 07_DATABASE_SCHEMA.md
* 08_RECOMMENDATION_ENGINE.md

⸻

1. Purpose

The dataset is the foundation of AI-Dicto.

Recommendation quality depends primarily on:

Dataset Quality

not model size.

This document defines:

* Dataset Structure
* Data Sources
* Metadata Standards
* Category Rules
* Tag Taxonomy
* Validation Rules
* Import Pipeline
* Future Expansion Strategy

⸻

2. Dataset Philosophy

Prioritize:

Quality > Quantity

⸻

Preferred:

150 curated tools

over:

1000 low-quality tools

⸻

3. Dataset Scope

Target:

150–200 AI tools

⸻

Coverage:

Writing
Coding
Video
Research
Marketing
Design
Automation
Productivity

⸻

4. Source of Truth

Source of Truth:

tools.csv

Imported into:

Supabase

⸻

All recommendations originate from:

database records only

⸻

5. Approved Data Sources

Source Type 1

AI Directories

Examples:

* Futurepedia
* Toolify
* There’s An AI For That

Purpose:

Discovery

⸻

Source Type 2

Official Product Websites

Purpose:

Description

Pricing

Use Cases

⸻

Source Type 3

Vendor Documentation

Purpose:

Feature Validation

⸻

Source Type 4

Manual Curation

Purpose:

Quality Assurance

⸻

6. Prohibited Sources

Do not use:

* Random blogs
* Unverified AI lists
* Affiliate websites
* Unknown directories

⸻

7. Dataset Categories

Exactly 8 Categories.

⸻

Writing

Examples:

ChatGPT

Claude

Jasper

Copy.ai

Writesonic

⸻

Coding

Examples:

Cursor

GitHub Copilot

Codeium

Windsurf

Replit AI

⸻

Video

Examples:

Runway

Pika

Synthesia

Descript

CapCut AI

⸻

Research

Examples:

Perplexity

Elicit

Consensus

Scite

ResearchRabbit

⸻

Marketing

Examples:

AdCreative

Ocoya

Predis

HubSpot AI

Jasper Marketing

⸻

Design

Examples:

Midjourney

Canva AI

Adobe Firefly

Galileo

Figma AI

⸻

Automation

Examples:

Zapier

Make

n8n

Relay

Bardeen

⸻

Productivity

Examples:

Notion AI

Motion

Mem AI

Taskade

ClickUp AI

⸻

8. Target Distribution

Writing

15–25 Tools

⸻

Coding

20–30 Tools

⸻

Video

15–25 Tools

⸻

Research

15–25 Tools

⸻

Marketing

15–25 Tools

⸻

Design

20–30 Tools

⸻

Automation

15–25 Tools

⸻

Productivity

15–25 Tools

⸻

9. CSV Schema

Required Columns

id
name
slug
description
category
website_url
logo_url
pricing_model
best_for_role
difficulty
pros
use_cases
tags
featured
popularity_score

⸻

10. Example Record

1,
cursor,
cursor,
AI-first code editor,
coding,
https://cursor.com,
https://...,
freemium,
developer,
intermediate,
"fast workflow|great autocomplete",
"coding|debugging|refactoring",
"code-editor|developer-tools|ai-coding",
true,
95

⸻

11. Required Fields

Every tool must include:

✓ name

✓ description

✓ category

✓ website_url

✓ tags

⸻

12. Optional Fields

logo_url

difficulty

popularity_score

featured

⸻

13. Description Standards

Length:

50–160 characters

⸻

Good Example:

AI-powered code editor focused on development productivity and intelligent code generation.

⸻

Bad Example:

Best coding tool ever made.

⸻

14. Pricing Model Standards

Allowed Values:

free
freemium
paid
enterprise

⸻

No custom values.

⸻

15. Difficulty Standards

Allowed Values:

beginner
intermediate
advanced

⸻

16. Best Role Standards

Allowed Values:

student
developer
designer
founder
marketer

⸻

Multiple roles allowed.

⸻

17. Tag Taxonomy

Tags improve discovery.

⸻

Examples

Writing

copywriting
content
blogging
seo

⸻

Coding

coding
debugging
refactoring
agent

⸻

Research

academic
citations
research
papers

⸻

Marketing

ads
social-media
seo
campaigns

⸻

18. Tag Rules

Each tool:

Minimum:

3 tags

⸻

Maximum:

10 tags

⸻

19. Use Case Standards

Minimum:

2 use cases

⸻

Maximum:

6 use cases

⸻

Example

Cursor

Code Generation
Debugging
Refactoring

⸻

20. Pros Standards

Minimum:

2 pros

⸻

Maximum:

5 pros

⸻

Example

Fast
Easy to use
Developer focused

⸻

21. Featured Tool Rules

Only:

10–15%

of tools may be featured.

⸻

Purpose:

Trending Sections

Landing Page

⸻

22. Popularity Score

Range:

1–100

⸻

Used In:

Recommendation Ranking

Trending Tools

⸻

23. Data Quality Rules

Every tool must:

✓ Have official website

✓ Have category

✓ Have description

✓ Have tags

⸻

24. Duplicate Prevention

Duplicates determined by:

name
website_url

⸻

Reject duplicates.

⸻

25. Inactive Tool Policy

Remove:

* Dead websites
* Abandoned products
* Deprecated services

⸻

26. Validation Pipeline

Raw Data
↓
Validation
↓
Normalization
↓
Enrichment
↓
Import

⸻

27. Enrichment Pipeline

Generate:

* tags
* difficulty
* best_for_role
* use_cases

⸻

Using:

LLM Assistance

⸻

Human verification required.

⸻

28. Import Pipeline

Source

tools.csv

⸻

Process

CSV
↓
Validator
↓
Transformer
↓
Supabase

⸻

29. Recommendation Metadata

Most important fields:

best_for_role
difficulty
tags
use_cases

⸻

These directly influence ranking.

⸻

30. Search Metadata

Most important fields:

name
description
tags
category
use_cases

⸻

31. Future Dataset Expansion

Phase 2

Add:

300–500 tools

⸻

Phase 3

Automated discovery.

⸻

32. Future Scraping Architecture

Pipeline

Directory Sources
↓
Crawler
↓
Validation
↓
Enrichment
↓
Approval
↓
Database

⸻

Human approval required.

⸻

33. Dataset Governance

Changes allowed only through:

Admin Dashboard

or

Approved Import Pipeline

⸻

34. AI Constraints

LLM may:

✓ Explain tools

✓ Compare tools

✓ Rank tools

⸻

LLM may not:

✗ Invent tools

✗ Create fake metadata

✗ Recommend unavailable tools

⸻

35. Completion Criteria

Dataset Ready When:

✓ 150–200 tools imported

✓ Categories assigned

✓ Tags assigned

✓ Roles assigned

✓ Pricing assigned

✓ Validation completed

✓ Search indexing completed

⸻

Final Statement

The AI-Dicto dataset is the platform’s knowledge base and competitive advantage. Recommendation quality, search quality, and conversational relevance all depend on the completeness, accuracy, and consistency of this dataset. Every recommendation shown to users must originate from validated, curated records stored within the platform.
