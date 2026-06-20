10_DEPLOYMENT_ARCHITECTURE.md

AI-Dicto

Deployment & Infrastructure Architecture

Version: 1.0

Status: Approved

Dependencies:

* 01_PRD.md
* 07_DATABASE_SCHEMA.md
* 08_RECOMMENDATION_ENGINE.md
* 09_DATASET_SPEC.md

Deployment Platform:

Microsoft Azure

Application Type:

Full-Stack AI-Powered Web Application

⸻

1. Purpose

This document defines:

* Production Infrastructure
* Hosting Strategy
* Runtime Stack
* Environment Variables
* CI/CD Pipeline
* Security Standards
* Monitoring
* Logging
* Performance Targets

This document acts as the infrastructure source of truth.

⸻

2. Infrastructure Philosophy

Goals:

✓ Simple

✓ Scalable

✓ Cost Efficient

✓ Challenge Ready

✓ Production Ready

⸻

Avoid:

* Microservices
* Kubernetes
* Docker Complexity
* Custom Servers
* Unnecessary Infrastructure

⸻

3. System Architecture

User
↓
Azure Static Web Apps
↓
Next.js 15 Application
│
├── Supabase
│    ├── Auth
│    ├── PostgreSQL
│    └── Storage
│
├── OpenRouter
│    └── Nemotron
│
└── Sarvam AI
     └── Speech-To-Text

⸻

4. Runtime Stack

Frontend

Framework:

Next.js 15

⸻

Language:

TypeScript

⸻

UI:

Shadcn/UI

⸻

Styling:

Tailwind CSS

⸻

Animation:

Framer Motion

⸻

State:

Zustand

TanStack Query

⸻

5. Backend Architecture

Backend Type:

BaaS (Backend as a Service)

⸻

Provider:

Supabase

⸻

Responsibilities:

* Authentication
* Database
* Storage
* Analytics
* User Management

⸻

6. Hosting Architecture

Provider:

Microsoft Azure

⸻

Service:

Azure Static Web Apps

⸻

Responsibilities:

* Frontend Hosting
* Global CDN
* SSL
* CI/CD Integration

⸻

7. Why Azure Static Web Apps

Advantages:

✓ Fast deployment

✓ Low maintenance

✓ Free SSL

✓ GitHub integration

✓ Global distribution

✓ Works well with Next.js

⸻

8. Next.js Architecture

Use:

App Router

⸻

Structure:

src/
│
├── app/
├── components/
├── services/
├── hooks/
├── store/
├── types/
├── utils/
└── lib/

⸻

9. API Layer

Use:

Next.js Route Handlers

⸻

Location:

src/app/api/

⸻

Endpoints

/api/recommend
/api/compare
/api/search
/api/voice
/api/analytics

⸻

10. AI Infrastructure

Provider:

OpenRouter

⸻

Primary Model:

Nemotron

⸻

Responsibilities:

* Recommendation explanations
* Tool comparisons
* Recommendation reasoning

⸻

Never:

* Query database directly
* Retrieve tools directly

⸻

11. AI Request Flow

User Query
↓
API Route
↓
Database Retrieval
↓
Top Candidates
↓
Nemotron
↓
Explanation
↓
UI

⸻

12. Fallback Model

Provider:

Gemini Flash

⸻

Trigger:

Nemotron unavailable

Rate limits exceeded

Timeouts

⸻

13. Voice Infrastructure

Provider:

Sarvam AI

⸻

Responsibilities:

Speech To Text

⸻

Pipeline:

Microphone
↓
Sarvam STT
↓
Text Query
↓
Recommendation Engine

⸻

14. Speech Output

Provider:

Browser Speech Synthesis

⸻

Reason:

No additional infrastructure

No additional cost

Fast implementation

⸻

15. Environment Variables

Development

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENROUTER_API_KEY=
SARVAM_API_KEY=

⸻

Production

Stored in:

Azure Environment Settings

⸻

Never:

* Commit to Git
* Store in code
* Store in documentation

⸻

16. Supabase Architecture

Services Used:

Authentication
PostgreSQL
Storage
Row Level Security

⸻

17. Authentication

Methods:

Google OAuth

Email OTP

⸻

Disabled:

* Password login
* Anonymous login
* Social providers beyond Google

⸻

18. Storage

Bucket:

tool-logos

⸻

Purpose:

* Tool logos
* Static assets

⸻

19. Search Infrastructure

Version 1

Use:

PostgreSQL Full Text Search

⸻

Fields:

name
description
tags
use_cases

⸻

20. Future Search Architecture

Version 2

Add:

pgvector

⸻

Purpose:

Semantic retrieval

⸻

Not required for challenge.

⸻

21. Analytics Architecture

Source:

Application Events

⸻

Tracked Events:

search_performed
voice_started
voice_completed
recommendation_generated
recommendation_clicked
tool_opened
tool_compared
tool_favorited

⸻

Storage:

analytics_events table

⸻

22. Logging Strategy

Log:

✓ API failures

✓ Recommendation failures

✓ Voice failures

✓ Search failures

✓ Authentication failures

⸻

Do Not Log:

✗ Passwords

✗ API Keys

✗ Sensitive User Data

⸻

23. Monitoring

Monitor:

Application Availability

API Errors

Search Latency

Recommendation Latency

Voice Latency

⸻

24. Performance Targets

Landing Page

< 3 seconds

⸻

Search

< 500ms

⸻

Recommendation

< 2 seconds

⸻

Voice Flow

< 4 seconds

⸻

25. Lighthouse Targets

Performance

90+

⸻

Accessibility

95+

⸻

Best Practices

95+

⸻

SEO

90+

⸻

26. Security Standards

API Keys

Never exposed to frontend.

⸻

AI Calls

Must go through backend route handlers.

⸻

Database Access

Protected by RLS.

⸻

HTTPS

Required.

⸻

27. CI/CD Pipeline

Source Control:

GitHub

⸻

Repository:

AI-Dicto

⸻

Pipeline:

GitHub Push
↓
Azure Build
↓
Deploy
↓
Verify

⸻

28. Branch Strategy

Main

production

⸻

Develop

development

⸻

Feature Branches

feature/*

⸻

29. Deployment Environments

Development

Local machine

⸻

Staging

Optional

⸻

Production

Azure Static Web Apps

⸻

30. Error Handling Strategy

If Search Fails

Show:

Unable to search.
Try again.

⸻

If Recommendation Fails

Fallback:

Top ranked tools.

⸻

If Voice Fails

Fallback:

Text Input

⸻

31. Backup Strategy

Database

Supabase automated backups

⸻

Assets

Supabase storage backups

⸻

32. Production Readiness Checklist

Infrastructure Ready When:

✓ Azure configured

✓ Supabase connected

✓ Authentication works

✓ Search works

✓ Recommendation engine works

✓ Voice works

✓ Analytics enabled

✓ Environment variables configured

✓ SSL active

✓ Lighthouse targets achieved

⸻

33. Future Scaling Plan

Phase 2

pgvector
Semantic Search
Tool Expansion

⸻

Phase 3

Automated Tool Discovery
Advanced Analytics

⸻

Phase 4

Personalized Recommendations
Behavior-Based Ranking

⸻

Final Statement

The AI-Dicto infrastructure is intentionally lightweight, scalable, and maintainable. Azure Static Web Apps, Supabase, OpenRouter, and Sarvam AI provide a modern architecture capable of supporting challenge requirements and future growth without introducing unnecessary operational complexity.
