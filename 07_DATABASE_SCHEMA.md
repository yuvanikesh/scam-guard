07_DATABASE_SCHEMA.md

AI-Dicto

Database Architecture & Supabase Schema

Version: 1.0

Status: Approved

Dependencies:

* 01_PRD.md
* 04_SCREEN_SPECS.md
* 05_DESIGN_SYSTEM.md

Database Provider:

Supabase PostgreSQL

⸻

1. Purpose

This document defines:

* Database Architecture
* Table Structure
* Relationships
* Row Level Security
* Search Infrastructure
* Analytics Events
* Future Vector Search Support

This document acts as the source of truth for backend implementation.

⸻

2. Database Principles

Principle 1

Database Is Source Of Truth

No hardcoded tool data.

⸻

Principle 2

Recommendations Use Database First

LLM should only explain results.

LLM should not invent tools.

⸻

Principle 3

Authentication Controls Access

Favorites

Conversations

User Preferences

⸻

Principle 4

Analytics Are Event Based

All user actions are logged.

⸻

3. Entity Relationship Diagram

users
│
├── favorites
├── searches
├── conversations
└── analytics_events
tools
│
├── favorites
├── tool_tags
├── recommendation_logs
└── tool_categories

⸻

4. users Table

Purpose:

Registered users.

⸻

Columns

Column	Type	Required
id	uuid	Yes
email	text	Yes
role	text	Yes
avatar_url	text	No
created_at	timestamptz	Yes
updated_at	timestamptz	Yes

⸻

Allowed Roles

student
developer
designer
founder
marketer

⸻

Indexes

email
role

⸻

5. tools Table

Purpose:

Core AI tool dataset.

⸻

Columns

Column	Type
id	uuid
slug	text
name	text
description	text
category_id	uuid
website_url	text
logo_url	text
pricing_model	text
best_for_role	text[]
difficulty	text
pros	text[]
use_cases	text[]
featured	boolean
popularity_score	integer
created_at	timestamptz
updated_at	timestamptz

⸻

Difficulty Values

beginner
intermediate
advanced

⸻

Pricing Values

free
freemium
paid
enterprise

⸻

Indexes

slug
name
pricing_model
featured

⸻

6. categories Table

Purpose:

Tool organization.

⸻

Columns

Column	Type
id	uuid
name	text
slug	text
description	text
icon	text
created_at	timestamptz

⸻

Default Categories

Writing
Coding
Video
Research
Marketing
Design
Automation
Productivity

⸻

7. tags Table

Purpose:

Semantic discovery.

⸻

Columns

Column	Type
id	uuid
name	text
slug	text

⸻

Examples

ai-writing
code-generation
video-editing
seo
automation

⸻

8. tool_tags Table

Purpose:

Many-to-many relationship.

⸻

Columns

Column	Type
tool_id	uuid
tag_id	uuid

⸻

Composite Index

(tool_id, tag_id)

⸻

9. favorites Table

Purpose:

User saved tools.

⸻

Columns

Column	Type
id	uuid
user_id	uuid
tool_id	uuid
created_at	timestamptz

⸻

Indexes

user_id
tool_id

⸻

10. searches Table

Purpose:

Track user search activity.

⸻

Columns

Column	Type
id	uuid
user_id	uuid
query	text
search_type	text
created_at	timestamptz

⸻

Search Types

keyword
semantic
voice

⸻

11. conversations Table

Purpose:

Store assistant interactions.

⸻

Columns

Column	Type
id	uuid
user_id	uuid
query	text
response	jsonb
recommendation_ids	uuid[]
created_at	timestamptz

⸻

Purpose

Context memory.

Analytics.

Recommendation tuning.

⸻

12. recommendation_logs Table

Purpose:

Track recommendation output.

⸻

Columns

Column	Type
id	uuid
user_id	uuid
conversation_id	uuid
tool_id	uuid
rank_position	integer
score	numeric
created_at	timestamptz

⸻

13. analytics_events Table

Purpose:

Event-driven analytics.

⸻

Columns

Column	Type
id	uuid
user_id	uuid
event_name	text
metadata	jsonb
created_at	timestamptz

⸻

14. Event Types

Track:

search_performed
voice_started
voice_completed
tool_opened
tool_favorited
tool_compared
recommendation_generated
recommendation_clicked
category_viewed
website_clicked

⸻

15. Search Architecture

Pipeline

Keyword Search
↓
Category Match
↓
Tag Match
↓
Full Text Search
↓
Result Ranking

⸻

16. PostgreSQL Full Text Search

Columns Included

name
description
use_cases
tags

⸻

Search Vector

tsvector

⸻

Purpose

Fast search without vector database.

⸻

17. Future Semantic Search

Version 2

Use:

pgvector

⸻

New Column

embedding vector

⸻

Embedding Source

OpenAI

NVIDIA

OpenRouter

⸻

18. Recommendation Architecture

Input

role
query
conversation context

⸻

Retrieval

Top 10 tools.

⸻

Ranking Formula

40% Semantic Match
30% Role Match
20% Category Match
10% Popularity

⸻

Output

Top 5 tools.

⸻

19. Admin Permissions

Admin Role Only

Can:

manage tools
manage categories
view analytics
view recommendation logs

⸻

Cannot:

modify user data

without authorization.

⸻

20. Row Level Security

RLS Required.

⸻

users

Users can:

read own data
update own data

⸻

favorites

Users can:

read own favorites
create favorites
delete favorites

⸻

Cannot access:

Other users’ favorites.

⸻

conversations

Users can:

read own conversations

⸻

Cannot read:

Other users’ conversations.

⸻

searches

Users can:

read own searches

⸻

analytics_events

Only admins.

⸻

tools

Public Read

Admin Write

⸻

categories

Public Read

Admin Write

⸻

tags

Public Read

Admin Write

⸻

21. Supabase Storage

Bucket:

tool-logos

⸻

Purpose

Store:

* Tool Logos
* Brand Assets

⸻

Public Access

Read Only

⸻

22. Dataset Import Pipeline

Source:

tools.csv

⸻

Process

CSV
↓
Validation
↓
Transform
↓
Insert
↓
Verify

⸻

Validation Rules

Must Have:

name
description
category
website_url

⸻

Reject:

duplicates
missing websites
empty descriptions

⸻

23. Index Strategy

High Priority Indexes

tools(name)
tools(slug)
tools(category_id)
searches(user_id)
favorites(user_id)
recommendation_logs(user_id)

⸻

24. Audit & Monitoring

Track:

failed logins
recommendation failures
api failures
search latency
voice latency

⸻

Store in:

analytics_events

⸻

25. Performance Targets

Search Response

< 500ms

⸻

Recommendation Retrieval

< 1 second

⸻

Database Queries

< 200ms

⸻

26. Future Expansion

Planned Tables

tool_reviews
tool_updates
tool_versions
collections

⸻

Not included in V1.

⸻

27. Completion Criteria

Database Layer Complete When:

✓ Tables Created

✓ RLS Configured

✓ Search Configured

✓ Dataset Imported

✓ Analytics Enabled

✓ Recommendation Logs Enabled

✓ Storage Bucket Created

⸻

Final Statement

The AI-Dicto database architecture prioritizes structured discovery, recommendation quality, scalability, and security. The database acts as the single source of truth, while AI models are responsible only for reasoning and explanation. All recommendations must originate from curated tool data stored within the platform.
