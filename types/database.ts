export type UserRole = 'user' | 'admin';

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  role: UserRole;
  eco_points?: number;
  created_at: string;
}

export interface WasteDNA {
  material: string;
  category: string;
  reusability: 'HIGH' | 'MEDIUM' | 'LOW';
  transformationPotential: number; // 0-100%
  difficulty: 'Easy' | 'Easy–Medium' | 'Medium' | 'Medium–Hard' | 'Hard';
  possibleProductCategories: string[];
  potentialValueMin: number; // in INR (₹)
  potentialValueMax: number; // in INR (₹)
  isEstimated: boolean;
}

export interface WasteRescueScoreCriteria {
  recyclability: number; // max 25
  structuralIntegrity: number; // max 25
  processingEase: number; // max 25
  environmentalBenefit: number; // max 25
}

export interface WasteRescueScore {
  score: number; // 0 - 100
  level: 'HIGH RESCUE POTENTIAL' | 'MODERATE RESCUE POTENTIAL' | 'BASIC RECYCLING ONLY';
  tagline: string;
  criteria: WasteRescueScoreCriteria;
}

export interface WasteAnalysis {
  id: string;
  user_id?: string;
  image_url: string;
  detected_material: string;
  waste_category: string;
  confidence: number;
  possible_reusable_materials: string[];
  waste_dna: WasteDNA;
  rescue_score: WasteRescueScore;
  created_at: string;
}

export interface TutorialVideo {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration?: string;
  category: string;
  url: string;
  videoId?: string;
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
  waste_material?: string;
  image_url?: string;
  tutorial_url?: string;
  tutorials?: TutorialVideo[];
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

export interface CombinedWastePart {
  wasteMaterial: string;
  function: string;
  preparationNote: string;
}

export interface CombinationLabResult {
  productName: string;
  tagline: string;
  conceptDescription: string;
  partsMapping: CombinedWastePart[];
  requiredTools: string[];
  additionalMaterials: string[];
  steps: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  estimatedCost: number;
  suggestedSellingPrice: number;
  estimatedProfit: number;
  profitMargin: number;
  targetCustomers: string[];
  synergyScore: number; // 0 - 100
  tutorials?: TutorialVideo[];
}

export interface Challenge {
  id: string;
  user_id?: string;
  title: string;
  waste_materials: string[];
  quantity: string;
  budget_inr: number;
  time_limit_minutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string[];
  success_criteria: string[];
  safety_guidance: string[];
  points_reward: number;
  badge_reward?: string;
  created_at: string;
}

export interface ChallengeAttempt {
  id: string;
  challenge_id: string;
  user_id: string;
  result_image_url: string;
  ai_evaluation: {
    passed: boolean;
    confidence: number;
    feedback: string;
    points_awarded: number;
    badge_unlocked?: string;
  };
  status: 'pending' | 'completed' | 'failed';
  completed_at: string;
}

export interface TransformationStory {
  id: string;
  user_id: string;
  waste_material: string;
  product_name: string;
  before_image_url: string;
  after_image_url: string;
  stages: {
    stage: string;
    title: string;
    description: string;
  }[];
  story_text: string;
  published_to_community: boolean;
  post_id?: string;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  seller?: Partial<Profile>;
  product_name: string;
  description: string;
  category: 'Home Decor' | 'Accessories' | 'Stationery' | 'Fashion' | 'Gifts' | 'Eco Products' | 'Others';
  waste_material: string;
  image_url: string;
  cost: number;
  selling_price: number;
  quantity: number;
  location: string;
  contact_information: string;
  status: 'available' | 'sold';
  views?: number;
  is_wishlisted?: boolean;
  created_at: string;
}

export type OrderStatus = 'pending' | 'accepted' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  product_id: string;
  product?: Product;
  buyer_id: string;
  buyer?: Partial<Profile>;
  seller_id: string;
  seller?: Partial<Profile>;
  quantity: number;
  total_amount: number;
  status: OrderStatus;
  delivery_address: string;
  contact_phone: string;
  notes?: string;
  status_history?: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  donor_id: string;
  donor?: Partial<Profile>;
  material_name: string;
  material_type: 'Plastic' | 'Newspaper' | 'Cardboard' | 'Fabric' | 'Glass' | 'Coconut shells' | 'Agricultural waste' | 'Finished upcycled products' | 'Others';
  quantity: string;
  condition: 'Brand New' | 'Gently Used' | 'Clean Scrap' | 'Raw Waste' | 'Washed / Sterilized';
  description: string;
  image_url: string;
  location: string;
  contact_information: string;
  status: 'available' | 'requested' | 'accepted' | 'completed';
  requester_id?: string;
  requester?: Partial<Profile>;
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
  before_image_url?: string;
  waste_material?: string;
  likes_count: number;
  comments_count: number;
  is_liked_by_user?: boolean;
  is_saved_by_user?: boolean;
  comments?: Comment[];
  created_at: string;
}

export interface CollectionItem {
  id: string;
  collection_id: string;
  item_type: 'idea' | 'post' | 'product';
  reference_id: string;
  title: string;
  image_url: string;
  waste_material?: string;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  cover_image?: string;
  item_count?: number;
  items?: CollectionItem[];
  created_at: string;
}

export type NotificationType =
  | 'like'
  | 'comment'
  | 'order_request'
  | 'order_update'
  | 'donation_request'
  | 'donation_accepted'
  | 'badge_unlocked'
  | 'challenge_completed';

export interface Notification {
  id: string;
  user_id: string;
  actor_id?: string;
  actor?: Partial<Profile>;
  type: NotificationType;
  title: string;
  message: string;
  reference_type?: 'post' | 'product' | 'order' | 'donation' | 'challenge' | 'badge';
  reference_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface EcoPoint {
  id: string;
  user_id: string;
  action_type: 'waste_analyzed' | 'product_created' | 'product_sold' | 'donation_made' | 'challenge_completed' | 'post_created' | 'community_participation';
  points: number;
  reference_id?: string;
  description: string;
  created_at: string;
}

export interface Badge {
  key: 'beginner_recycler' | 'upcycling_explorer' | 'waste_transformer' | 'eco_creator' | 'green_entrepreneur' | 'revibe_champion';
  name: string;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Emerald' | 'Platinum' | 'Diamond';
  icon: string;
  description: string;
  criteria: string;
  required_points?: number;
  unlocked?: boolean;
  unlocked_at?: string;
}

export interface ImpactEvent {
  id: string;
  user_id: string;
  event_type: 'waste_analyzed' | 'product_created' | 'product_sold' | 'donation_made' | 'challenge_completed' | 'post_created';
  waste_material: string;
  quantity: number;
  estimated_weight_kg: number;
  estimated_water_saved_liters: number;
  estimated_co2_saved_kg: number;
  estimated_value_inr: number;
  created_at: string;
}

export interface DashboardStats {
  wasteAnalyzed: number;
  itemsReused: number;
  productsCreated: number;
  productsListed: number;
  productsSold: number;
  donationsMade: number;
  communityPosts: number;
  ecoScore: number;
  wasteDivertedKg: number;
  waterSavedLiters: number;
  co2SavedKg: number;
  potentialValueCreatedInr: number;
}
