export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  role: UserRole;
  created_at: string;
}

export interface WasteAnalysis {
  id: string;
  user_id?: string;
  image_url: string;
  detected_material: string;
  waste_category: string;
  confidence: number;
  possible_reusable_materials?: string[];
  created_at: string;
}

export interface Idea {
  id: string;
  analysis_id?: string;
  product_name: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  materials: string[];
  tools: string[];
  instructions: string[];
  estimated_time: string;
  cost: number;
  selling_price: number;
  profit: number;
  tutorial_url?: string;
  created_at?: string;
}

export interface BusinessAnalysisResult {
  production_cost: number;
  additional_cost: number;
  suggested_selling_price: number;
  estimated_profit: number;
  profit_margin: number;
  market_demand: 'High' | 'Moderate' | 'Niche';
  potential_buyers: string[];
  product_ideas: Idea[];
}

export interface Product {
  id: string;
  seller_id: string;
  seller?: Partial<Profile>;
  product_name: string;
  description: string;
  category: string;
  waste_material: string;
  image_url: string;
  cost: number;
  selling_price: number;
  quantity: number;
  location: string;
  contact_information: string;
  status: 'available' | 'sold';
  created_at: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  donor?: Partial<Profile>;
  material_name: string;
  material_type: string;
  quantity: string;
  condition: string;
  description: string;
  image_url: string;
  location: string;
  contact_information: string;
  status: 'available' | 'claimed';
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  user?: Partial<Profile>;
  comment: string;
  created_at: string;
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  user?: Partial<Profile>;
  product_name?: string;
  description: string;
  image_url: string;
  waste_material?: string;
  likes_count?: number;
  comments_count?: number;
  is_liked_by_user?: boolean;
  comments?: Comment[];
  created_at: string;
}

export interface DashboardStats {
  wasteAnalyzed: number;
  productsCreated: number;
  productsListed: number;
  donationsMade: number;
  communityPosts: number;
  estimatedRevenue: number;
  wasteReusedKg: number;
}
