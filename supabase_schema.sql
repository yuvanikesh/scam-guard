-- AI-Dicto Database Schema
-- Run this in your Supabase SQL Editor to set up all tables, indexes, RLS, and Full Text Search.

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('student', 'developer', 'designer', 'founder', 'marketer')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. Create Tools Table
CREATE TABLE IF NOT EXISTS public.tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    website_url TEXT NOT NULL,
    logo_url TEXT,
    pricing_model TEXT NOT NULL CHECK (pricing_model IN ('free', 'freemium', 'paid', 'enterprise')),
    best_for_role TEXT[] NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    pros TEXT[] NOT NULL,
    use_cases TEXT[] NOT NULL,
    featured BOOLEAN DEFAULT FALSE NOT NULL,
    popularity_score INTEGER DEFAULT 50 CHECK (popularity_score >= 0 AND popularity_score <= 100),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. Create Tags Table
CREATE TABLE IF NOT EXISTS public.tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE
);

-- 6. Create Tool Tags (Many-to-Many Join Table)
CREATE TABLE IF NOT EXISTS public.tool_tags (
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    PRIMARY KEY (tool_id, tag_id)
);

-- 7. Create Favorites Table
CREATE TABLE IF NOT EXISTS public.favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE (user_id, tool_id)
);

-- 8. Create Searches Table
CREATE TABLE IF NOT EXISTS public.searches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    query TEXT NOT NULL,
    search_type TEXT NOT NULL CHECK (search_type IN ('keyword', 'semantic', 'voice')),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 9. Create Conversations Table (Assistant History)
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    response JSONB NOT NULL,
    recommendation_ids UUID[] NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 10. Create Recommendation Logs (Analytics Tuning)
CREATE TABLE IF NOT EXISTS public.recommendation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
    tool_id UUID REFERENCES public.tools(id) ON DELETE CASCADE NOT NULL,
    rank_position INTEGER NOT NULL,
    score NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 11. Create Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    event_name TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 12. Create High-Priority Indexes
CREATE INDEX IF NOT EXISTS idx_tools_name ON public.tools(name);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_category_id ON public.tools(category_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_searches_user_id ON public.searches(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON public.analytics_events(event_name);

-- 13. Setup PostgreSQL Full-Text Search Configuration
-- Create tsvector column or index for search performance optimization
ALTER TABLE public.tools ADD COLUMN IF NOT EXISTS search_vector tsvector;

-- Create function to update search_vector automatically
CREATE OR REPLACE FUNCTION tools_search_vector_trigger() RETURNS trigger AS $$
declare
  tags_text text;
begin
  -- Aggregate tags for the tool
  select coalesce(string_agg(t.name, ' '), '') into tags_text
  from public.tool_tags tt
  join public.tags t on t.id = tt.tag_id
  where tt.tool_id = new.id;

  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(new.use_cases, ' '), '')), 'C') ||
    setweight(to_tsvector('english', tags_text), 'D');
  return new;
end
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
    ON public.tools FOR EACH ROW EXECUTE FUNCTION tools_search_vector_trigger();

-- Index for full-text search
CREATE INDEX IF NOT EXISTS idx_tools_search_vector ON public.tools USING gin(search_vector);

-- 14. Enable Row Level Security (RLS) on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- 15. Setup RLS Policies

-- Users
CREATE POLICY "Allow public read of user profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow users to update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow users to insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- Categories (Public Read, Service/Admin Write)
CREATE POLICY "Allow public read of categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow write categories only via service role" ON public.categories FOR ALL USING (false);

-- Tools (Public Read, Service/Admin Write)
CREATE POLICY "Allow public read of tools" ON public.tools FOR SELECT USING (true);
CREATE POLICY "Allow write tools only via service role" ON public.tools FOR ALL USING (false);

-- Tags (Public Read, Service/Admin Write)
CREATE POLICY "Allow public read of tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Allow write tags only via service role" ON public.tags FOR ALL USING (false);

-- Tool Tags
CREATE POLICY "Allow public read of tool_tags" ON public.tool_tags FOR SELECT USING (true);

-- Favorites
CREATE POLICY "Allow users to view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert own favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to delete own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Searches
CREATE POLICY "Allow users to view own searches" ON public.searches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert own searches" ON public.searches FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Conversations
CREATE POLICY "Allow users to view own conversations" ON public.conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to insert own conversations" ON public.conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Analytics Events
CREATE POLICY "Allow users to insert analytics events" ON public.analytics_events FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Allow read of analytics only via service role" ON public.analytics_events FOR SELECT USING (false);
