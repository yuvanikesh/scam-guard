08_RECOMMENDATION_ENGINE.md

AI-Dicto

Recommendation Engine & Conversational Intelligence Architecture

Version: 1.0

Status: Approved

Dependencies:

* 01_PRD.md
* 07_DATABASE_SCHEMA.md

AI Provider:

OpenRouter

Primary Model:

Nemotron

Fallback Model:

Gemini Flash

⸻

1. Purpose

This document defines:

* Recommendation Architecture
* Retrieval Pipeline
* Ranking Strategy
* Voice Intelligence
* Context Management
* Prompt Engineering
* Hallucination Prevention
* Cost Optimization
* Fallback Logic

This is the core intelligence layer of AI-Dicto.

⸻

2. Product Goal

Users should not need to know:

ChatGPT
Claude
Cursor
Perplexity
Midjourney

Users only need to describe:

their goal

The recommendation engine determines:

best tools
best fit
best use case

⸻

3. Recommendation Philosophy

AI-Dicto is NOT:

* a chatbot
* a search engine
* an AI directory

AI-Dicto is:

an AI concierge

The system should:

Recommend

Explain

Compare

Guide

⸻

4. Recommendation Pipeline

User Input
↓
Intent Detection
↓
Query Enrichment
↓
Candidate Retrieval
↓
Scoring
↓
Top 10 Candidates
↓
Nemotron Reasoning
↓
Top 5 Recommendations
↓
UI Display

⸻

5. Input Sources

Source 1

Text Search

Example:

I need help studying mathematics.

⸻

Source 2

Voice Query

Example:

Recommend tools for creating YouTube videos.

⸻

Source 3

Follow-up Conversation

Example:

I want something free.

⸻

6. Intent Detection

Purpose:

Understand what the user is trying to achieve.

⸻

Input:

raw query

⸻

Output:

{
  "goal": "study mathematics",
  "category": "research",
  "role": "student",
  "constraints": ["free"]
}

⸻

7. Query Enrichment

Purpose:

Expand vague requests.

⸻

Example

Input:

Help me code.

⸻

Expanded:

coding assistant
code generation
debugging
developer productivity

⸻

8. Candidate Retrieval

Purpose:

Retrieve possible tools.

⸻

Source:

Database Only

⸻

Never:

invent tools
recommend unknown tools
search internet

⸻

Maximum Candidates:

10

⸻

9. Retrieval Filters

Match:

* category
* tags
* use_cases
* role
* pricing
* popularity

⸻

10. Scoring Formula

Final Score:

40% Semantic Match
30% Role Match
20% Category Match
10% Popularity

⸻

Maximum Score:

100

⸻

11. Semantic Match

Measures:

Query relevance.

⸻

Sources:

description
use_cases
tags

⸻

Weight:

40%

⸻

12. Role Match

Measures:

Alignment with:

student
developer
designer
founder
marketer

⸻

Weight:

30%

⸻

13. Category Match

Measures:

Alignment with selected category.

⸻

Weight:

20%

⸻

14. Popularity Weight

Measures:

Tool adoption.

⸻

Sources:

popularity_score
featured

⸻

Weight:

10%

⸻

15. Candidate Selection

After scoring:

Select:

Top 10

⸻

Send to:

Nemotron

⸻

16. Nemotron Responsibilities

Nemotron does NOT:

* retrieve tools
* search internet
* create rankings

⸻

Nemotron ONLY:

explain
reorder slightly
generate reasoning
generate comparisons

⸻

17. Recommendation Output

Always Return:

Top 5

⸻

Structure:

{
  "tool": "",
  "why_it_fits": "",
  "best_use_case": "",
  "confidence": 0
}

⸻

18. Recommendation Confidence

Range:

0 - 100

⸻

Display:

Best Match
Strong Match
Good Match

⸻

Never expose raw score.

⸻

19. Recommendation Explanation Rules

Explanations must:

✓ Be concise

✓ Be practical

✓ Mention use case

⸻

Avoid:

marketing language
buzzwords
hype

⸻

20. System Prompt

Base Prompt:

You are AI-Dicto.
You are an AI tool recommender.
Only recommend tools provided in the candidate list.
Never invent tools.
Never search the internet.
Return exactly five recommendations.
For each recommendation:
- Tool Name
- Why It Fits
- Best Use Case
Be concise and practical.

⸻

21. Candidate Injection Format

Provided To Model:

[
  {
    "name": "",
    "description": "",
    "category": "",
    "use_cases": []
  }
]

⸻

22. Hallucination Prevention

Rule 1

Only candidate tools allowed.

⸻

Rule 2

No external knowledge required.

⸻

Rule 3

Reject unknown tool names.

⸻

Rule 4

Recommendation output validated.

⸻

23. Validation Layer

After LLM response:

Verify:

tool exists
tool active
tool returned from retrieval

⸻

If failed:

Regenerate.

⸻

24. Conversation Context

Store:

previous query
role
constraints
recommendations

⸻

Purpose:

Follow-up recommendations.

⸻

25. Example Context

User:

I need AI for coding.

⸻

Follow-up:

Only free tools.

⸻

System should refine.

Not restart.

⸻

26. Constraint Detection

Supported Constraints:

free
paid
beginner
advanced
open source
fast
easy

⸻

Apply before ranking.

⸻

27. Voice Recommendation Flow

Pipeline:

Voice
↓
Sarvam STT
↓
Text Query
↓
Recommendation Engine
↓
Response
↓
Speech Synthesis

⸻

28. Voice Response Rules

Voice responses:

Maximum:

3 recommendations

⸻

Reason:

Reduce cognitive load.

⸻

Desktop UI may still show:

Top 5

⸻

29. Compare Engine

Purpose:

Tool comparison.

⸻

Input:

Tool A
Tool B

⸻

Output:

{
  "strengths": [],
  "weaknesses": [],
  "best_for": ""
}

⸻

30. Compare Prompt

Compare both tools objectively.
Focus on:
Use Cases
Strengths
Weaknesses
Pricing
Best For

⸻

31. Follow-up Questions

If confidence low:

Ask:

What is your role?
What's your budget?
What are you trying to build?

⸻

Maximum:

2 follow-up questions

⸻

32. Cold Start Logic

If user role unknown:

Recommend:

general tools

⸻

Prompt role selection.

⸻

33. Recommendation Analytics

Track:

recommendation_generated
recommendation_clicked
recommendation_saved
recommendation_compared

⸻

34. Feedback Loop

Future Version:

Collect:

accepted recommendation
rejected recommendation

⸻

Not required in V1.

⸻

35. Cost Optimization

Nemotron used ONLY for:

recommendations
comparisons
reasoning

⸻

Avoid:

Chat-style conversations.

⸻

Maximum Context:

10 messages

⸻

Older messages summarized.

⸻

36. Fallback Strategy

If Nemotron unavailable:

Use:

Gemini Flash

⸻

Same prompt structure.

⸻

37. Error Handling

If AI fails:

Return:

top tools by score

Without explanation.

⸻

System must never block discovery.

⸻

38. Performance Targets

Retrieval:

< 500ms

⸻

Recommendation:

< 2s

⸻

Voice Recommendation:

< 4s

⸻

39. AI Governance Rules

AI must:

✓ Recommend from database

✓ Explain clearly

✓ Respect constraints

✓ Use concise language

⸻

AI must never:

✗ Invent tools

✗ Search web

✗ Recommend unavailable tools

✗ Ignore role context

⸻

40. Completion Criteria

Recommendation Engine Complete When:

✓ Candidate retrieval works

✓ Ranking works

✓ Nemotron explanations work

✓ Voice flow works

✓ Comparison works

✓ Validation layer works

✓ Analytics tracking works

⸻

Final Statement

The recommendation engine is the intelligence layer of AI-Dicto. Its responsibility is not to generate answers but to guide users toward the most suitable AI tools using structured retrieval, ranking, contextual reasoning, and concise explanations. Every recommendation must originate from verified platform data and reinforce AI-Dicto’s identity as a trusted AI concierge rather than a generic chatbot.
