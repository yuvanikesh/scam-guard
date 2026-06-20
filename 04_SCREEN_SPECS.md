04_SCREEN_SPECS.md

AI-Dicto

Screen Specifications Document

Version: 1.0

Status: Approved

Prerequisites:

* 01_PRD.md
* 02_BRAND_GUIDE.md
* 03_FIGMA_ARCHITECTURE.md

⸻

1. Purpose

This document defines:

* Screen Purpose
* Layout Structure
* Components
* States
* User Interactions
* Validation Rules
* Responsive Behavior
* Acceptance Criteria

Every screen must be designed and implemented according to these specifications.

⸻

SCREEN 01

Landing Page

Screen ID

LP-001

⸻

Purpose

Introduce AI-Dicto and immediately communicate:

Conversation → Recommendation → Decision

⸻

Success Criteria

User understands:

* What AI-Dicto does
* Why it is different
* How to start

Within:

≤ 5 seconds

⸻

Components

Navbar

Contains:

* Logo
* Categories
* Trending
* Login
* Voice CTA

⸻

Hero Section

Contains:

* Background Typography
* Voice Orb
* Headline
* Subheadline
* Primary CTA
* Secondary CTA

⸻

How It Works

Cards:

1. Describe Goal
2. AI Understands
3. Get Recommendations

⸻

Categories

Grid:

* Writing
* Coding
* Design
* Marketing
* Video
* Research
* Automation
* Productivity

⸻

Trending Tools

Tool Cards

⸻

Comparison Demo

Sample Comparison

⸻

Footer

Links

Legal

Social

⸻

Primary Actions

Ask With Voice

Explore Tools

⸻

Responsive

Desktop

Hero 60/40

Tablet

Hero 70/30

Mobile

Single Column

⸻

Acceptance Criteria

✓ Voice CTA visible

✓ Search accessible

✓ Categories visible

✓ Mobile optimized

⸻

SCREEN 02

Login Screen

Screen ID

AUTH-001

⸻

Purpose

Authenticate user.

⸻

Components

Logo

Headline

Google Login

Email OTP

⸻

Actions

Continue with Google

Continue with Email

⸻

Validation

Email format valid

OTP required

⸻

Acceptance Criteria

✓ Authentication success

✓ Redirect to Role Selection

⸻

SCREEN 03

Role Selection

Screen ID

AUTH-002

⸻

Purpose

Capture user profile.

⸻

Options

Student

Developer

Designer

Founder

Marketer

⸻

Layout

Card Grid

⸻

Action

Continue

⸻

Validation

Exactly one role selected

⸻

Acceptance Criteria

✓ Role stored in database

✓ Redirect to Dashboard

⸻

SCREEN 04

Home Dashboard

Screen ID

DB-001

⸻

Purpose

Primary discovery workspace.

⸻

Layout

Navbar

Search

Categories

Trending Tools

Favorites Preview

Voice Assistant

⸻

Components

Search Bar

Category Cards

Tool Grid

Voice Orb

⸻

Actions

Search

Browse

Favorite

Compare

Open Voice

⸻

Acceptance Criteria

✓ Fast discovery workflow

✓ Recommendations accessible

⸻

SCREEN 05

Search Experience

Screen ID

SEARCH-001

⸻

Purpose

Allow users to discover tools.

⸻

Search Types

Traditional

Semantic

⸻

Example Queries

ChatGPT

Claude

Cursor

⸻

Semantic

“I need AI for marketing”

“I want coding help”

⸻

Components

Search Input

Suggestions

Filters

Results

⸻

Filters

Category

Role

Pricing

⸻

Result Card

Logo

Name

Description

Category

Favorite

Compare

⸻

Empty State

Message:

“No matching tools found.”

⸻

Acceptance Criteria

✓ Results under 2 seconds

✓ Semantic queries supported

⸻

SCREEN 06

Category Explorer

Screen ID

CAT-001

⸻

Purpose

Structured discovery.

⸻

Layout

Desktop

Left Navigation

Right Results

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

Actions

Switch Category

Open Tool

Favorite Tool

Compare Tool

⸻

Acceptance Criteria

✓ Category switching smooth

✓ No page refresh

⸻

SCREEN 07

Tool Detail Modal

Screen ID

TOOL-001

⸻

Purpose

Display tool details.

⸻

Trigger

Tool Card Click

⸻

Sections

Overview

Description

Pros

Use Cases

Website

Compare

Favorite

⸻

Actions

Visit Website

Favorite

Compare

Close

⸻

Modal Behavior

Desktop

Centered

⸻

Mobile

Full Height Bottom Sheet

⸻

Acceptance Criteria

✓ Easy comparison access

✓ Website accessible

⸻

SCREEN 08

Compare Modal

Screen ID

COMPARE-001

⸻

Purpose

Decision support.

⸻

Trigger

Compare Button

⸻

Layout

Tool A

VS

Tool B

⸻

Rows

Description

Use Cases

Strengths

Weaknesses

Pricing

Best For

⸻

Mobile

Horizontal Scroll

⸻

Acceptance Criteria

✓ Comparison readable

✓ Mobile optimized

⸻

SCREEN 09

Favorites

Screen ID

FAV-001

⸻

Purpose

Saved tools.

⸻

Components

Search

Favorites Grid

Remove Action

⸻

Empty State

“No saved tools yet.”

⸻

Acceptance Criteria

✓ Sync across devices

✓ Fast access

⸻

SCREEN 10

Voice Assistant

Screen ID

VOICE-001

⸻

Purpose

Primary product differentiator.

⸻

STATE 1

Hero Mode

Prompt:

Tell me what you want to create.

Actions:

Speak

Type

Skip

⸻

STATE 2

Listening

Visual

Wave Animation

Glow Effect

Microphone Active

⸻

STATE 3

Thinking

Processing

Recommendation Generation

⸻

STATE 4

Results

Top 5 Recommendations

Reasoning

Actions

⸻

STATE 5

Floating Companion

Bottom Right

Persistent

⸻

Acceptance Criteria

✓ Accessible everywhere

✓ One-tap access

✓ Voice interaction works

⸻

SCREEN 11

Recommendation Results

Screen ID

REC-001

⸻

Purpose

Present ranked recommendations.

⸻

Components

Recommendation Cards

Match Score

Reason Badge

Tool Details

⸻

Card Structure

Tool Name

Why It Fits

Best Use Case

Action Buttons

⸻

Actions

View Tool

Compare

Favorite

⸻

Acceptance Criteria

✓ Clear reasoning

✓ Easy comparison

⸻

SCREEN 12

Admin Dashboard

Screen ID

ADMIN-001

⸻

Purpose

Platform monitoring.

⸻

Sections

Analytics

Users

Tools

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

Voice Usage

⸻

Acceptance Criteria

✓ Analytics accurate

✓ Mobile accessible

⸻

Global States

Loading

Skeleton Components

⸻

Error

Friendly Error Message

Retry Action

⸻

Empty

Context-Specific Empty State

⸻

Responsive Rules

Mobile

320–767px

Single Column

⸻

Tablet

768–1023px

Two Column

⸻

Desktop

1024px+

Multi Column

⸻

Universal Acceptance Rules

Every Screen Must:

✓ Pass Accessibility Requirements

✓ Support Keyboard Navigation

✓ Support Mobile Devices

✓ Maintain Voice Assistant Visibility

✓ Follow Design System

✓ Follow Motion System

✓ Load within performance targets

⸻

Final Statement

Every screen in AI-Dicto must reinforce the core product promise:

Users should discover the right AI tool through conversation, recommendation, and intelligent guidance rather than traditional directory browsing.
