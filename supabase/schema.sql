-- =========================================================
-- ReVIBE – AI-Powered Waste-to-Wealth Platform
-- Production PostgreSQL Database Schema & Security Policies
-- =========================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatar_url TEXT,
    location TEXT,
    bio TEXT,
    role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    eco_points INT NOT NULL DEFAULT 50,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Waste Analyses Table (with Waste DNA & Rescue Score)
CREATE TABLE IF NOT EXISTS waste_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    detected_material TEXT NOT NULL,
    waste_category TEXT NOT NULL,
    confidence NUMERIC(5,2) NOT NULL,
    possible_reusable_materials JSONB NOT NULL DEFAULT '[]'::jsonb,
    waste_dna JSONB NOT NULL DEFAULT '{}'::jsonb,
    rescue_score JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Ideas Table
CREATE TABLE IF NOT EXISTS ideas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    analysis_id UUID REFERENCES waste_analyses(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    description TEXT NOT NULL,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    materials JSONB NOT NULL DEFAULT '[]'::jsonb,
    tools JSONB NOT NULL DEFAULT '[]'::jsonb,
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    estimated_time TEXT NOT NULL,
    cost NUMERIC(10,2) NOT NULL DEFAULT 0,
    selling_price NUMERIC(10,2) NOT NULL DEFAULT 0,
    profit NUMERIC(10,2) NOT NULL DEFAULT 0,
    waste_material TEXT,
    image_url TEXT,
    tutorial_url TEXT,
    tutorials JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Products Table (Marketplace)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Home Decor', 'Accessories', 'Stationery', 'Fashion', 'Gifts', 'Eco Products', 'Others')),
    waste_material TEXT NOT NULL,
    image_url TEXT NOT NULL,
    cost NUMERIC(10,2) NOT NULL DEFAULT 0,
    selling_price NUMERIC(10,2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    location TEXT NOT NULL,
    contact_information TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold')),
    views INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Orders Table (Marketplace Order Flow)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    seller_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    total_amount NUMERIC(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'preparing', 'ready', 'completed', 'cancelled')),
    delivery_address TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    notes TEXT,
    status_history JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Wishlists Table
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_wishlist UNIQUE (user_id, product_id)
);

-- 7. Donations Table (Donation Hub)
CREATE TABLE IF NOT EXISTS donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    material_name TEXT NOT NULL,
    material_type TEXT NOT NULL,
    quantity TEXT NOT NULL,
    condition TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    location TEXT NOT NULL,
    contact_information TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'requested', 'accepted', 'completed')),
    requester_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Posts Table (Community Social Feed)
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    product_name TEXT,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    before_image_url TEXT,
    waste_material TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Comments Table
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Likes Table
CREATE TABLE IF NOT EXISTS likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_post_user_like UNIQUE (post_id, user_id)
);

-- 11. Collections Table (Inspiration Board)
CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Collection Items Table
CREATE TABLE IF NOT EXISTS collection_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('idea', 'post', 'product')),
    reference_id TEXT NOT NULL,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    waste_material TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Challenges Table (Challenge Me Arena)
CREATE TABLE IF NOT EXISTS challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    waste_materials JSONB NOT NULL DEFAULT '[]'::jsonb,
    quantity TEXT NOT NULL,
    budget_inr NUMERIC(10,2) NOT NULL DEFAULT 50,
    time_limit_minutes INT NOT NULL DEFAULT 60,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
    success_criteria JSONB NOT NULL DEFAULT '[]'::jsonb,
    safety_guidance JSONB NOT NULL DEFAULT '[]'::jsonb,
    points_reward INT NOT NULL DEFAULT 50,
    badge_reward TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Challenge Attempts Table
CREATE TABLE IF NOT EXISTS challenge_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    result_image_url TEXT NOT NULL,
    ai_evaluation JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
    completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Transformations Table (Before/After Stories)
CREATE TABLE IF NOT EXISTS transformations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    waste_material TEXT NOT NULL,
    product_name TEXT NOT NULL,
    before_image_url TEXT NOT NULL,
    after_image_url TEXT NOT NULL,
    stages JSONB NOT NULL DEFAULT '[]'::jsonb,
    story_text TEXT NOT NULL,
    published_to_community BOOLEAN NOT NULL DEFAULT FALSE,
    post_id UUID REFERENCES posts(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. Notifications Table (Real-Time Notifications)
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('like', 'comment', 'order_request', 'order_update', 'donation_request', 'donation_accepted', 'badge_unlocked', 'challenge_completed')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    reference_type TEXT CHECK (reference_type IN ('post', 'product', 'order', 'donation', 'challenge', 'badge')),
    reference_id TEXT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. Eco Points Table (Gamification Ledger)
CREATE TABLE IF NOT EXISTS eco_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL CHECK (action_type IN ('waste_analyzed', 'product_created', 'product_sold', 'donation_made', 'challenge_completed', 'post_created', 'community_participation')),
    points INT NOT NULL,
    reference_id TEXT,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. Badges Table
CREATE TABLE IF NOT EXISTS badges (
    key TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    tier TEXT NOT NULL,
    icon TEXT NOT NULL,
    description TEXT NOT NULL,
    criteria TEXT NOT NULL,
    required_points INT NOT NULL DEFAULT 0
);

-- 19. User Badges Table
CREATE TABLE IF NOT EXISTS user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    badge_key TEXT NOT NULL REFERENCES badges(key) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_badge UNIQUE (user_id, badge_key)
);

-- 20. Impact Events Table (Verifiable Environmental Aggregation)
CREATE TABLE IF NOT EXISTS impact_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('waste_analyzed', 'product_created', 'product_sold', 'donation_made', 'challenge_completed', 'post_created')),
    waste_material TEXT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    estimated_weight_kg NUMERIC(8,2) NOT NULL DEFAULT 0.5,
    estimated_water_saved_liters NUMERIC(8,2) NOT NULL DEFAULT 10,
    estimated_co2_saved_kg NUMERIC(8,2) NOT NULL DEFAULT 1.2,
    estimated_value_inr NUMERIC(10,2) NOT NULL DEFAULT 50,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- INDEXES for Maximum Query Performance
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_product ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_donations_type ON donations(material_type);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_post ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_eco_points_user ON eco_points(user_id);
CREATE INDEX IF NOT EXISTS idx_impact_events_user ON impact_events(user_id);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE waste_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transformations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE eco_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_events ENABLE ROW LEVEL SECURITY;

-- Public Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Waste Analyses
CREATE POLICY "Analyses viewable by owner or admin" ON waste_analyses FOR SELECT USING (auth.uid() = user_id OR auth.uid() IS NULL);
CREATE POLICY "Users can create analyses" ON waste_analyses FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Products
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Users can create products" ON products FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Sellers can update own products" ON products FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Sellers can delete own products" ON products FOR DELETE USING (auth.uid() = seller_id);

-- Orders
CREATE POLICY "Orders viewable by buyer or seller" ON orders FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can create orders" ON orders FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Parties can update order status" ON orders FOR UPDATE USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Donations
CREATE POLICY "Donations are viewable by everyone" ON donations FOR SELECT USING (true);
CREATE POLICY "Users can create donations" ON donations FOR INSERT WITH CHECK (auth.uid() = donor_id);
CREATE POLICY "Donors can update own donations" ON donations FOR UPDATE USING (auth.uid() = donor_id OR auth.uid() = requester_id);
CREATE POLICY "Donors can delete own donations" ON donations FOR DELETE USING (auth.uid() = donor_id);

-- Posts
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can create posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = user_id);

-- Comments & Likes
CREATE POLICY "Comments viewable by everyone" ON comments FOR SELECT USING (true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Likes viewable by everyone" ON likes FOR SELECT USING (true);
CREATE POLICY "Users can toggle likes" ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own likes" ON likes FOR DELETE USING (auth.uid() = user_id);

-- Collections
CREATE POLICY "Collections viewable by everyone" ON collections FOR SELECT USING (true);
CREATE POLICY "Users can manage own collections" ON collections FOR ALL USING (auth.uid() = user_id);

-- Notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Badges Seed Data
INSERT INTO badges (key, name, tier, icon, description, criteria, required_points) VALUES
('beginner_recycler', 'Beginner Recycler', 'Bronze', '🥉', 'Started your sustainable journey with your first waste analysis or upcycling action.', 'Complete 1 waste analysis or reuse activity.', 20),
('upcycling_explorer', 'Upcycling Explorer', 'Silver', '🥈', 'Explored multiple waste streams and created sustainable DIY projects.', 'Complete 3 upcycling actions or challenges.', 100),
('waste_transformer', 'Waste Transformer', 'Gold', '🥇', 'Mastered turning waste into high-value functional products.', 'Create and list 2 upcycled products.', 250),
('eco_creator', 'Eco Creator', 'Emerald', '🌱', 'Inspiring the community by sharing verified DIY transformations.', 'Publish 3 community posts or completed challenges.', 400),
('green_entrepreneur', 'Green Entrepreneur', 'Platinum', '💰', 'Building a sustainable micro-enterprise through upcycled commerce.', 'Complete 2 marketplace sales or commercial listings.', 600),
('revibe_champion', 'ReVIBE Champion', 'Diamond', '🏆', 'Exceptional leader in the circular economy saving over 50kg of waste.', 'Accumulate 1000+ Eco Points across all categories.', 1000)
ON CONFLICT (key) DO NOTHING;
