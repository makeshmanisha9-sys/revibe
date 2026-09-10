import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import {
  Product,
  Donation,
  Post,
  Comment,
  Profile,
  WasteAnalysis,
  Idea,
  DashboardStats,
  Order,
  OrderStatus,
  Challenge,
  ChallengeAttempt,
  TransformationStory,
  Collection,
  CollectionItem,
  Notification,
  EcoPoint,
  Badge,
  ImpactEvent,
  CombinationLabResult,
} from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('your-supabase-project') &&
    !supabaseAnonKey.includes('your-supabase-anon-key')
);

export const supabaseClient = isConfigured
  ? createSupabaseJsClient(supabaseUrl, supabaseAnonKey)
  : null;

const DB_STORAGE_KEY = 'revibe_database_v2';

export const INITIAL_BADGES: Badge[] = [
  {
    key: 'beginner_recycler',
    name: 'Beginner Recycler',
    tier: 'Bronze',
    icon: '🥉',
    description: 'Awarded for taking your first step in waste identification and sustainable reuse.',
    criteria: 'Complete 1 waste analysis or reuse activity.',
    required_points: 20,
    unlocked: true,
    unlocked_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    key: 'upcycling_explorer',
    name: 'Upcycling Explorer',
    tier: 'Silver',
    icon: '🥈',
    description: 'Awarded for completing multiple upcycling activities across diverse materials.',
    criteria: 'Complete 3 upcycling actions or challenges.',
    required_points: 100,
    unlocked: true,
    unlocked_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    key: 'waste_transformer',
    name: 'Waste Transformer',
    tier: 'Gold',
    icon: '🥇',
    description: 'Mastered turning waste into high-value functional products.',
    criteria: 'Create and list 2 upcycled products.',
    required_points: 250,
    unlocked: false,
  },
  {
    key: 'eco_creator',
    name: 'Eco Creator',
    tier: 'Emerald',
    icon: '🌱',
    description: 'Inspiring the community by sharing verified DIY transformations.',
    criteria: 'Publish 3 community posts or completed challenges.',
    required_points: 400,
    unlocked: false,
  },
  {
    key: 'green_entrepreneur',
    name: 'Green Entrepreneur',
    tier: 'Platinum',
    icon: '💰',
    description: 'Building a sustainable micro-enterprise through upcycled commerce.',
    criteria: 'Complete 2 marketplace sales or commercial listings.',
    required_points: 600,
    unlocked: false,
  },
  {
    key: 'revibe_champion',
    name: 'ReVIBE Champion',
    tier: 'Diamond',
    icon: '🏆',
    description: 'Exceptional leader in the circular economy saving over 50kg of waste.',
    criteria: 'Accumulate 1000+ Eco Points across all categories.',
    required_points: 1000,
    unlocked: false,
  },
];

export interface LocalDatabase {
  profiles: Profile[];
  products: Product[];
  donations: Donation[];
  posts: Post[];
  comments?: Comment[];
  orders: Order[];
  challenges: Challenge[];
  challenge_attempts: ChallengeAttempt[];
  transformations: TransformationStory[];
  collections?: Collection[];
  collection_items?: CollectionItem[];
  notifications: Notification[];
  eco_points: EcoPoint[];
  impact_events: ImpactEvent[];
  analyses: WasteAnalysis[];
  ideas: Idea[];
  badges: Badge[];
}

const INITIAL_DEMO_DATA: LocalDatabase = {
  profiles: [
    {
      id: 'demo-user-1',
      name: 'Aanya Sharma',
      email: 'aanya@revibe.eco',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      location: 'Bengaluru, India',
      bio: 'Upcycling designer passionate about transforming glass & plastic waste into functional home aesthetics.',
      role: 'user' as const,
      eco_points: 340,
      created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
    {
      id: 'admin-user-1',
      name: 'ReVIBE Team',
      email: 'admin@revibe.eco',
      avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
      location: 'Global Platform',
      bio: 'ReVIBE Platform Moderator & Sustainability Lead',
      role: 'admin' as const,
      eco_points: 1250,
      created_at: new Date(Date.now() - 86400000 * 60).toISOString(),
    },
  ],
  products: [
    {
      id: 'prod-1',
      seller_id: 'demo-user-1',
      seller: {
        id: 'demo-user-1',
        name: 'Aanya Sharma',
        location: 'Bengaluru, India',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      },
      product_name: 'Geometric Recycled Plastic Bottle Lamp',
      description: 'Handcrafted ambient desk lamp constructed with 100% heat-formed PET plastic bottles with warm LED lighting and a polished wooden base.',
      category: 'Home Decor' as const,
      waste_material: 'Plastic Bottle',
      image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      cost: 120,
      selling_price: 650,
      quantity: 4,
      location: 'Bengaluru, India',
      contact_information: 'aanya@revibe.eco | +91 98765 43210',
      status: 'available' as const,
      views: 142,
      is_wishlisted: false,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'prod-2',
      seller_id: 'demo-user-1',
      seller: {
        id: 'demo-user-1',
        name: 'Aanya Sharma',
        location: 'Bengaluru, India',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      },
      product_name: 'Upcycled Denim Multi-Pocket Tote',
      description: 'Heavy-duty tote bag crafted from repurposed denim jeans with organic cotton webbed shoulder handles and waterproof lining.',
      category: 'Fashion' as const,
      waste_material: 'Waste Cloth',
      image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      cost: 90,
      selling_price: 490,
      quantity: 7,
      location: 'Bengaluru, India',
      contact_information: 'aanya@revibe.eco',
      status: 'available' as const,
      views: 89,
      is_wishlisted: true,
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: 'prod-3',
      seller_id: 'admin-user-1',
      seller: {
        id: 'admin-user-1',
        name: 'ReVIBE Team',
        location: 'Mumbai, India',
        avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
      },
      product_name: 'Coconut Shell Hanging Succulent Planter',
      description: 'Polished natural coconut shell planter finished with natural beeswax and fitted with durable jute macramé hanger.',
      category: 'Home Decor' as const,
      waste_material: 'Coconut Shell',
      image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      cost: 60,
      selling_price: 320,
      quantity: 12,
      location: 'Mumbai, India',
      contact_information: 'crafts@revibe.eco',
      status: 'available' as const,
      views: 210,
      is_wishlisted: false,
      created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
  ],
  orders: [
    {
      id: 'ord-101',
      product_id: 'prod-1',
      buyer_id: 'demo-user-1',
      buyer: { name: 'Aanya Sharma', email: 'aanya@revibe.eco' },
      seller_id: 'admin-user-1',
      seller: { name: 'ReVIBE Team', email: 'admin@revibe.eco' },
      quantity: 1,
      total_amount: 320,
      status: 'preparing' as OrderStatus,
      delivery_address: 'Flat 402, Green Meadows, Indiranagar, Bengaluru, 560038',
      contact_phone: '+91 98765 43210',
      notes: 'Please pack with eco-friendly paper wrap.',
      status_history: [
        { status: 'pending' as OrderStatus, timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), note: 'Order placed by buyer' },
        { status: 'accepted' as OrderStatus, timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), note: 'Seller confirmed order' },
        { status: 'preparing' as OrderStatus, timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(), note: 'Handcrafting packaging' },
      ],
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      updated_at: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    },
  ] as Order[],
  donations: [
    {
      id: 'don-1',
      donor_id: 'demo-user-1',
      donor: { id: 'demo-user-1', name: 'Aanya Sharma', location: 'Bengaluru, India' },
      material_name: 'Clean Heavy Corrugated Cardboard Boxes',
      material_type: 'Cardboard' as const,
      quantity: '25 kg batch (15 boxes)',
      condition: 'Clean Scrap' as const,
      description: 'Double-wall clean corrugated packing boxes, ideal for upcycling into organizers, pet houses, or packaging.',
      image_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      location: 'Bengaluru, India (Indiranagar)',
      contact_information: 'aanya@revibe.eco | Available for pickup weekdays',
      status: 'available' as const,
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
      id: 'don-2',
      donor_id: 'admin-user-1',
      donor: { id: 'admin-user-1', name: 'ReVIBE Team', location: 'Delhi, India' },
      material_name: 'Assorted Washed Glass Bottles & Jars',
      material_type: 'Glass' as const,
      quantity: '40 bottles',
      condition: 'Washed / Sterilized' as const,
      description: 'Sorted amber and clear glass beverage bottles and jars ready for candle pouring, lamps, or terrariums.',
      image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      location: 'Delhi, India (Vasant Kunj)',
      contact_information: 'donations@revibe.eco',
      status: 'available' as const,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
  ] as Donation[],
  posts: [
    {
      id: 'post-1',
      user_id: 'demo-user-1',
      user: {
        id: 'demo-user-1',
        name: 'Aanya Sharma',
        avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      },
      product_name: 'Upcycled Glass Bottle Terrarium',
      description: 'Turned an empty wine bottle into a lush self-sustaining miniature moss terrarium! Simple 45-minute DIY project with gravel and active charcoal. 🌿✨',
      image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      before_image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      waste_material: 'Glass Bottle',
      likes_count: 38,
      comments_count: 4,
      is_liked_by_user: true,
      is_saved_by_user: true,
      comments: [
        {
          id: 'comm-1',
          post_id: 'post-1',
          user_id: 'admin-user-1',
          user: {
            name: 'ReVIBE Team',
            avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
          },
          comment: 'Fantastic execution! The drainage layer with gravel prevents root rot brilliantly.',
          created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
        },
      ],
      created_at: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    },
  ] as Post[],
  collections: [
    {
      id: 'col-1',
      user_id: 'demo-user-1',
      name: 'Glass & Bottle Upcycles',
      description: 'Inspiring glass bottle transformations, planters, and ambient lamps.',
      cover_image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      item_count: 3,
      items: [
        {
          id: 'ci-1',
          collection_id: 'col-1',
          item_type: 'idea' as const,
          reference_id: 'idea-glass-1',
          title: 'Hanging Wine Bottle Planter',
          image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
          waste_material: 'Glass Bottle',
          created_at: new Date().toISOString(),
        },
      ],
      created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    },
    {
      id: 'col-2',
      user_id: 'demo-user-1',
      name: 'High Profit Eco Ideas',
      description: 'Commercial ideas with >70% profit margin.',
      cover_image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      item_count: 2,
      items: [],
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
  ] as Collection[],
  challenges: [
    {
      id: 'chal-1',
      user_id: 'admin-user-1',
      title: '60-Minute Hanging Planter Challenge',
      waste_materials: ['2 Plastic Bottles', 'Jute Rope'],
      quantity: '2 units',
      budget_inr: 50,
      time_limit_minutes: 60,
      difficulty: 'Beginner' as const,
      instructions: [
        'Cut 2 plastic bottles in half horizontally.',
        'Invert top neck section into bottom reservoir base.',
        'Punch 4 symmetrical holes and thread jute hanging rope.',
        'Add soil, succulent, and fill reservoir with water.',
      ],
      success_criteria: [
        'Secure knotting able to hold 500g of weight.',
        'Functional self-watering drainage wick.',
        'Smooth safe edges without sharp burrs.',
      ],
      safety_guidance: [
        'Use scissors with safety grip.',
        'Lightly sand cut edges or use masking tape.',
      ],
      points_reward: 50,
      badge_reward: 'eco_creator',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
  ] as Challenge[],
  challenge_attempts: [] as ChallengeAttempt[],
  transformations: [] as TransformationStory[],
  notifications: [
    {
      id: 'notif-1',
      user_id: 'demo-user-1',
      actor_id: 'admin-user-1',
      actor: { name: 'ReVIBE Team', avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80' },
      type: 'like' as const,
      title: 'Post Liked ❤️',
      message: 'ReVIBE Team loved your Upcycled Glass Bottle Terrarium.',
      reference_type: 'post' as const,
      reference_id: 'post-1',
      is_read: false,
      created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    },
    {
      id: 'notif-2',
      user_id: 'demo-user-1',
      actor_id: 'admin-user-1',
      actor: { name: 'ReVIBE Team' },
      type: 'order_update' as const,
      title: 'Order Status Update 📦',
      message: 'Your order #ord-101 is now Preparing.',
      reference_type: 'order' as const,
      reference_id: 'ord-101',
      is_read: false,
      created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
    {
      id: 'notif-3',
      user_id: 'demo-user-1',
      actor_id: 'admin-user-1',
      actor: { name: 'ReVIBE System' },
      type: 'badge_unlocked' as const,
      title: 'New Badge Unlocked! 🥈',
      message: 'You earned the Upcycling Explorer badge (+50 Eco Points).',
      reference_type: 'badge' as const,
      reference_id: 'upcycling_explorer',
      is_read: true,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ] as Notification[],
  eco_points: [
    {
      id: 'ep-1',
      user_id: 'demo-user-1',
      action_type: 'waste_analyzed' as const,
      points: 20,
      description: 'Analyzed Glass Bottle with Vision AI',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 'ep-2',
      user_id: 'demo-user-1',
      action_type: 'product_created' as const,
      points: 50,
      description: 'Created & listed Recycled Plastic Bottle Lamp',
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'ep-3',
      user_id: 'demo-user-1',
      action_type: 'post_created' as const,
      points: 30,
      description: 'Shared Upcycled Glass Bottle Terrarium to Community',
      created_at: new Date(Date.now() - 86400000 * 1.5).toISOString(),
    },
  ] as EcoPoint[],
  impact_events: [
    {
      id: 'imp-1',
      user_id: 'demo-user-1',
      event_type: 'waste_analyzed' as const,
      waste_material: 'Glass Bottle',
      quantity: 3,
      estimated_weight_kg: 1.2,
      estimated_water_saved_liters: 15,
      estimated_co2_saved_kg: 1.8,
      estimated_value_inr: 150,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
    {
      id: 'imp-2',
      user_id: 'demo-user-1',
      event_type: 'product_created' as const,
      waste_material: 'Plastic Bottle',
      quantity: 5,
      estimated_weight_kg: 2.5,
      estimated_water_saved_liters: 35,
      estimated_co2_saved_kg: 4.2,
      estimated_value_inr: 650,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
    {
      id: 'imp-3',
      user_id: 'demo-user-1',
      event_type: 'donation_made' as const,
      waste_material: 'Cardboard',
      quantity: 15,
      estimated_weight_kg: 12.0,
      estimated_water_saved_liters: 120,
      estimated_co2_saved_kg: 14.5,
      estimated_value_inr: 300,
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
  ] as ImpactEvent[],
  analyses: [] as WasteAnalysis[],
  ideas: [] as Idea[],
  badges: INITIAL_BADGES,
};

function getLocalDB(): LocalDatabase {
  if (typeof window === 'undefined') return INITIAL_DEMO_DATA;
  try {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_DATA));
      return INITIAL_DEMO_DATA;
    }
    const parsed = JSON.parse(raw);
    return { ...INITIAL_DEMO_DATA, ...parsed };
  } catch (e) {
    return INITIAL_DEMO_DATA;
  }
}

function saveLocalDB(data: LocalDatabase) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('revibe_db_updated'));
  } catch (e) {
    console.error('Failed to save to local DB', e);
  }
}

export const dataStore = {
  // Products
  async getProducts(): Promise<Product[]> {
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Product[];
    }
    const db = getLocalDB();
    return db.products || [];
  },

  async getProductById(id: string): Promise<Product | null> {
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) return data as Product;
    }
    const db = getLocalDB();
    return db.products.find((p: Product) => p.id === id) || null;
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: 'prod-' + Date.now(),
      views: 0,
      is_wishlisted: false,
      created_at: new Date().toISOString(),
    };
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('products')
        .insert([newProduct])
        .select()
        .single();
      if (!error && data) return data as Product;
    }
    const db = getLocalDB();
    db.products.unshift(newProduct);
    saveLocalDB(db);

    // Award Eco Points & Record Impact
    await this.awardEcoPoints(product.seller_id, 'product_created', 50, newProduct.id, `Listed product: ${product.product_name}`);
    await this.recordImpactEvent({
      user_id: product.seller_id,
      event_type: 'product_created',
      waste_material: product.waste_material,
      quantity: product.quantity,
      estimated_weight_kg: product.quantity * 0.8,
      estimated_water_saved_liters: product.quantity * 15,
      estimated_co2_saved_kg: product.quantity * 1.5,
      estimated_value_inr: product.selling_price * product.quantity,
    });

    return newProduct;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (supabaseClient) {
      await supabaseClient.from('products').delete().eq('id', id);
    }
    const db = getLocalDB();
    db.products = db.products.filter((p: Product) => p.id !== id);
    saveLocalDB(db);
    return true;
  },

  async toggleWishlist(productId: string): Promise<boolean> {
    const db = getLocalDB();
    const product = db.products.find((p: Product) => p.id === productId);
    if (!product) return false;
    product.is_wishlisted = !product.is_wishlisted;
    saveLocalDB(db);
    return Boolean(product.is_wishlisted);
  },

  // Orders Flow
  async getOrders(userId?: string): Promise<Order[]> {
    if (supabaseClient && userId) {
      const { data, error } = await supabaseClient
        .from('orders')
        .select('*')
        .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
        .order('created_at', { ascending: false });
      if (!error && data) return data as Order[];
    }
    const db = getLocalDB();
    if (!userId) return db.orders || [];
    return (db.orders || []).filter((o: Order) => o.buyer_id === userId || o.seller_id === userId);
  },

  async createOrder(orderData: Omit<Order, 'id' | 'status' | 'status_history' | 'created_at' | 'updated_at'>): Promise<Order> {
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      status: 'pending',
      status_history: [
        { status: 'pending', timestamp: new Date().toISOString(), note: 'Order placed by buyer' },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('orders').insert([newOrder]).select().single();
      if (!error && data) return data as Order;
    }

    const db = getLocalDB();
    if (!db.orders) db.orders = [];
    db.orders.unshift(newOrder);
    saveLocalDB(db);

    // Notify seller
    await this.createNotification({
      user_id: newOrder.seller_id,
      actor_id: newOrder.buyer_id,
      type: 'order_request',
      title: 'New Product Order 🛍️',
      message: `${newOrder.buyer?.name || 'A customer'} placed an order for ${newOrder.quantity} item(s) (₹${newOrder.total_amount}).`,
      reference_type: 'order',
      reference_id: newOrder.id,
    });

    return newOrder;
  },

  async updateOrderStatus(orderId: string, status: OrderStatus, note?: string): Promise<Order | null> {
    const db = getLocalDB();
    const order = (db.orders || []).find((o: Order) => o.id === orderId);
    if (!order) return null;

    order.status = status;
    order.updated_at = new Date().toISOString();
    if (!order.status_history) order.status_history = [];
    order.status_history.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Order transitioned to ${status}`,
    });
    saveLocalDB(db);

    if (supabaseClient) {
      await supabaseClient
        .from('orders')
        .update({ status, updated_at: order.updated_at, status_history: order.status_history })
        .eq('id', orderId);
    }

    // Notify buyer
    await this.createNotification({
      user_id: order.buyer_id,
      actor_id: order.seller_id,
      type: 'order_update',
      title: `Order Status: ${status.toUpperCase()} 📦`,
      message: `Your order #${order.id} status was updated to ${status}.`,
      reference_type: 'order',
      reference_id: order.id,
    });

    return order;
  },

  // Donations Hub
  async getDonations(): Promise<Donation[]> {
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Donation[];
    }
    const db = getLocalDB();
    return db.donations || [];
  },

  async createDonation(donation: Omit<Donation, 'id' | 'status' | 'created_at'>): Promise<Donation> {
    const newDonation: Donation = {
      ...donation,
      id: 'don-' + Date.now(),
      status: 'available',
      created_at: new Date().toISOString(),
    };
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('donations')
        .insert([newDonation])
        .select()
        .single();
      if (!error && data) return data as Donation;
    }
    const db = getLocalDB();
    db.donations.unshift(newDonation);
    saveLocalDB(db);

    // Award Eco Points & Record Impact
    await this.awardEcoPoints(donation.donor_id, 'donation_made', 40, newDonation.id, `Listed donation: ${donation.material_name}`);
    await this.recordImpactEvent({
      user_id: donation.donor_id,
      event_type: 'donation_made',
      waste_material: donation.material_type,
      quantity: 1,
      estimated_weight_kg: 5.0,
      estimated_water_saved_liters: 45,
      estimated_co2_saved_kg: 5.2,
      estimated_value_inr: 200,
    });

    return newDonation;
  },

  async requestDonation(donationId: string, requesterId: string, requesterProfile?: Partial<Profile>): Promise<boolean> {
    const db = getLocalDB();
    const donation = db.donations.find((d: Donation) => d.id === donationId);
    if (!donation) return false;

    donation.status = 'requested';
    donation.requester_id = requesterId;
    donation.requester = requesterProfile;
    saveLocalDB(db);

    if (supabaseClient) {
      await supabaseClient
        .from('donations')
        .update({ status: 'requested', requester_id: requesterId })
        .eq('id', donationId);
    }

    await this.createNotification({
      user_id: donation.donor_id,
      actor_id: requesterId,
      type: 'donation_request',
      title: 'Donation Claim Request 🎁',
      message: `${requesterProfile?.name || 'A community member'} requested your donation: ${donation.material_name}.`,
      reference_type: 'donation',
      reference_id: donation.id,
    });

    return true;
  },

  async updateDonationStatus(donationId: string, status: Donation['status']): Promise<boolean> {
    const db = getLocalDB();
    const donation = db.donations.find((d: Donation) => d.id === donationId);
    if (!donation) return false;

    donation.status = status;
    saveLocalDB(db);

    if (supabaseClient) {
      await supabaseClient.from('donations').update({ status }).eq('id', donationId);
    }

    if (donation.requester_id && status === 'accepted') {
      await this.createNotification({
        user_id: donation.requester_id,
        actor_id: donation.donor_id,
        type: 'donation_accepted',
        title: 'Donation Request Accepted! 🎉',
        message: `Your request for ${donation.material_name} has been accepted. Connect with donor to arrange pickup.`,
        reference_type: 'donation',
        reference_id: donation.id,
      });
    }

    return true;
  },

  // Posts & Community
  async getPosts(): Promise<Post[]> {
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Post[];
    }
    const db = getLocalDB();
    return db.posts || [];
  },

  async createPost(post: Omit<Post, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'is_liked_by_user' | 'is_saved_by_user' | 'comments'>): Promise<Post> {
    const newPost: Post = {
      ...post,
      id: 'post-' + Date.now(),
      likes_count: 0,
      comments_count: 0,
      is_liked_by_user: false,
      is_saved_by_user: false,
      comments: [],
      created_at: new Date().toISOString(),
    };
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('posts')
        .insert([newPost])
        .select()
        .single();
      if (!error && data) return data as Post;
    }
    const db = getLocalDB();
    db.posts.unshift(newPost);
    saveLocalDB(db);

    await this.awardEcoPoints(post.user_id, 'post_created', 30, newPost.id, `Shared creation: ${post.product_name || 'DIY transformation'}`);
    return newPost;
  },

  async toggleLikePost(postId: string, userId: string, userName?: string): Promise<{ liked: boolean; newCount: number }> {
    const db = getLocalDB();
    const post = db.posts.find((p: Post) => p.id === postId);
    if (!post) return { liked: false, newCount: 0 };

    post.is_liked_by_user = !post.is_liked_by_user;
    post.likes_count = Math.max(0, (post.likes_count || 0) + (post.is_liked_by_user ? 1 : -1));
    saveLocalDB(db);

    if (post.is_liked_by_user && post.user_id !== userId) {
      await this.createNotification({
        user_id: post.user_id,
        actor_id: userId,
        type: 'like',
        title: 'Post Liked ❤️',
        message: `${userName || 'Someone'} liked your upcycling post.`,
        reference_type: 'post',
        reference_id: postId,
      });
    }

    if (supabaseClient) {
      if (post.is_liked_by_user) {
        await supabaseClient.from('likes').insert([{ post_id: postId, user_id: userId }]);
      } else {
        await supabaseClient.from('likes').delete().match({ post_id: postId, user_id: userId });
      }
    }
    return { liked: post.is_liked_by_user, newCount: post.likes_count };
  },

  async addComment(postId: string, userId: string, commentText: string, authorName: string, authorAvatar?: string): Promise<Comment> {
    const newComment: Comment = {
      id: 'comm-' + Date.now(),
      post_id: postId,
      user_id: userId,
      user: { name: authorName, avatar_url: authorAvatar },
      comment: commentText,
      created_at: new Date().toISOString(),
    };
    const db = getLocalDB();
    const post = db.posts.find((p: Post) => p.id === postId);
    if (post) {
      if (!post.comments) post.comments = [];
      post.comments.push(newComment);
      post.comments_count = (post.comments_count || 0) + 1;
      saveLocalDB(db);

      if (post.user_id !== userId) {
        await this.createNotification({
          user_id: post.user_id,
          actor_id: userId,
          type: 'comment',
          title: 'New Comment 💬',
          message: `${authorName} commented: "${commentText.slice(0, 50)}..."`,
          reference_type: 'post',
          reference_id: postId,
        });
      }
    }

    if (supabaseClient) {
      await supabaseClient.from('comments').insert([{ post_id: postId, user_id: userId, comment: commentText }]);
    }
    return newComment;
  },

  async deletePost(postId: string): Promise<boolean> {
    if (supabaseClient) {
      await supabaseClient.from('posts').delete().eq('id', postId);
    }
    const db = getLocalDB();
    db.posts = db.posts.filter((p: Post) => p.id !== postId);
    saveLocalDB(db);
    return true;
  },

  // Collections (Inspiration Board)
  async getCollections(userId?: string): Promise<Collection[]> {
    const db = getLocalDB();
    if (!userId) return db.collections || [];
    return (db.collections || []).filter((c: Collection) => c.user_id === userId);
  },

  async createCollection(userId: string, name: string, description?: string): Promise<Collection> {
    const newCol: Collection = {
      id: 'col-' + Date.now(),
      user_id: userId,
      name,
      description,
      item_count: 0,
      items: [],
      created_at: new Date().toISOString(),
    };
    const db = getLocalDB();
    if (!db.collections) db.collections = [];
    db.collections.unshift(newCol);
    saveLocalDB(db);
    return newCol;
  },

  async saveItemToCollection(collectionId: string, item: Omit<CollectionItem, 'id' | 'collection_id' | 'created_at'>): Promise<CollectionItem> {
    const db = getLocalDB();
    const col = (db.collections || []).find((c: Collection) => c.id === collectionId);
    const newItem: CollectionItem = {
      ...item,
      id: 'ci-' + Date.now(),
      collection_id: collectionId,
      created_at: new Date().toISOString(),
    };
    if (col) {
      if (!col.items) col.items = [];
      col.items.unshift(newItem);
      col.item_count = col.items.length;
      if (!col.cover_image && item.image_url) col.cover_image = item.image_url;
      saveLocalDB(db);
    }
    return newItem;
  },

  async removeCollectionItem(collectionId: string, itemId: string): Promise<boolean> {
    const db = getLocalDB();
    const col = (db.collections || []).find((c: Collection) => c.id === collectionId);
    if (!col) return false;
    col.items = (col.items || []).filter((i: CollectionItem) => i.id !== itemId);
    col.item_count = col.items.length;
    saveLocalDB(db);
    return true;
  },

  async deleteCollection(collectionId: string): Promise<boolean> {
    const db = getLocalDB();
    db.collections = (db.collections || []).filter((c: Collection) => c.id !== collectionId);
    saveLocalDB(db);
    return true;
  },

  // Challenges
  async getChallenges(): Promise<Challenge[]> {
    const db = getLocalDB();
    return db.challenges || [];
  },

  async createChallenge(challenge: Omit<Challenge, 'id' | 'created_at'>): Promise<Challenge> {
    const newChallenge: Challenge = {
      ...challenge,
      id: 'chal-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const db = getLocalDB();
    if (!db.challenges) db.challenges = [];
    db.challenges.unshift(newChallenge);
    saveLocalDB(db);
    return newChallenge;
  },

  async recordChallengeAttempt(attempt: Omit<ChallengeAttempt, 'id' | 'completed_at'>): Promise<ChallengeAttempt> {
    const newAttempt: ChallengeAttempt = {
      ...attempt,
      id: 'att-' + Date.now(),
      completed_at: new Date().toISOString(),
    };
    const db = getLocalDB();
    if (!db.challenge_attempts) db.challenge_attempts = [];
    db.challenge_attempts.unshift(newAttempt);
    saveLocalDB(db);

    if (attempt.status === 'completed') {
      await this.awardEcoPoints(attempt.user_id, 'challenge_completed', attempt.ai_evaluation.points_awarded || 50, newAttempt.id, 'Completed Upcycling Challenge');
      await this.createNotification({
        user_id: attempt.user_id,
        type: 'challenge_completed',
        title: 'Challenge Verified! 🏆',
        message: `Your challenge submission passed AI verification! +${attempt.ai_evaluation.points_awarded || 50} Eco Points awarded.`,
        reference_type: 'challenge',
        reference_id: attempt.challenge_id,
      });
    }

    return newAttempt;
  },

  // Transformations
  async saveTransformation(story: Omit<TransformationStory, 'id' | 'created_at'>): Promise<TransformationStory> {
    const newStory: TransformationStory = {
      ...story,
      id: 'trans-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const db = getLocalDB();
    if (!db.transformations) db.transformations = [];
    db.transformations.unshift(newStory);
    saveLocalDB(db);
    return newStory;
  },

  // Notifications
  async getNotifications(userId?: string): Promise<Notification[]> {
    const db = getLocalDB();
    if (!userId) return db.notifications || [];
    return (db.notifications || []).filter((n: Notification) => n.user_id === userId);
  },

  async createNotification(notif: Omit<Notification, 'id' | 'is_read' | 'created_at'>): Promise<Notification> {
    const newNotif: Notification = {
      ...notif,
      id: 'notif-' + Date.now(),
      is_read: false,
      created_at: new Date().toISOString(),
    };
    const db = getLocalDB();
    if (!db.notifications) db.notifications = [];
    db.notifications.unshift(newNotif);
    saveLocalDB(db);
    return newNotif;
  },

  async markNotificationRead(id: string): Promise<boolean> {
    const db = getLocalDB();
    const notif = (db.notifications || []).find((n: Notification) => n.id === id);
    if (notif) {
      notif.is_read = true;
      saveLocalDB(db);
      return true;
    }
    return false;
  },

  async markAllNotificationsRead(userId: string): Promise<boolean> {
    const db = getLocalDB();
    (db.notifications || []).forEach((n: Notification) => {
      if (n.user_id === userId) n.is_read = true;
    });
    saveLocalDB(db);
    return true;
  },

  // Gamification & Eco Points
  async awardEcoPoints(userId: string, actionType: EcoPoint['action_type'], points: number, referenceId?: string, description: string = ''): Promise<number> {
    const db = getLocalDB();
    const newPoint: EcoPoint = {
      id: 'ep-' + Date.now(),
      user_id: userId,
      action_type: actionType,
      points,
      reference_id: referenceId,
      description,
      created_at: new Date().toISOString(),
    };
    if (!db.eco_points) db.eco_points = [];
    db.eco_points.unshift(newPoint);

    // Update user profile eco_points
    const profile = (db.profiles || []).find((p: Profile) => p.id === userId);
    if (profile) {
      profile.eco_points = (profile.eco_points || 0) + points;
    }

    // Check for badge unlocks
    const totalPoints = (db.eco_points || [])
      .filter((e: EcoPoint) => e.user_id === userId)
      .reduce((sum: number, e: EcoPoint) => sum + e.points, 0);

    (db.badges || []).forEach((badge: Badge) => {
      if (!badge.unlocked && badge.required_points && totalPoints >= badge.required_points) {
        badge.unlocked = true;
        badge.unlocked_at = new Date().toISOString();
        // Create unlock notification
        this.createNotification({
          user_id: userId,
          type: 'badge_unlocked',
          title: `New Badge Unlocked: ${badge.name} ${badge.icon}`,
          message: `Congratulations! You unlocked the ${badge.tier} tier ${badge.name} badge.`,
          reference_type: 'badge',
          reference_id: badge.key,
        });
      }
    });

    saveLocalDB(db);
    return totalPoints;
  },

  async getBadges(userId?: string): Promise<Badge[]> {
    const db = getLocalDB();
    return db.badges || INITIAL_BADGES;
  },

  // Impact Events Aggregator
  async recordImpactEvent(event: Omit<ImpactEvent, 'id' | 'created_at'>): Promise<ImpactEvent> {
    const newEvent: ImpactEvent = {
      ...event,
      id: 'imp-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const db = getLocalDB();
    if (!db.impact_events) db.impact_events = [];
    db.impact_events.unshift(newEvent);
    saveLocalDB(db);
    return newEvent;
  },

  // Analyses History
  async saveAnalysis(analysis: Omit<WasteAnalysis, 'id' | 'created_at'>): Promise<WasteAnalysis> {
    const item: WasteAnalysis = {
      ...analysis,
      id: 'ana-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    const db = getLocalDB();
    if (!db.analyses) db.analyses = [];
    db.analyses.unshift(item);
    saveLocalDB(db);

    if (analysis.user_id) {
      await this.awardEcoPoints(analysis.user_id, 'waste_analyzed', 20, item.id, `Analyzed ${analysis.detected_material}`);
      await this.recordImpactEvent({
        user_id: analysis.user_id,
        event_type: 'waste_analyzed',
        waste_material: analysis.detected_material,
        quantity: 1,
        estimated_weight_kg: 0.5,
        estimated_water_saved_liters: 12,
        estimated_co2_saved_kg: 1.1,
        estimated_value_inr: 50,
      });
    }

    return item;
  },

  async getAnalyses(userId?: string): Promise<WasteAnalysis[]> {
    const db = getLocalDB();
    if (!userId) return db.analyses || [];
    return (db.analyses || []).filter((a: WasteAnalysis) => a.user_id === userId);
  },

  // Dashboard Aggregation
  async getDashboardStats(userId?: string): Promise<DashboardStats> {
    const db = getLocalDB();
    const userProducts = userId ? (db.products || []).filter((p: Product) => p.seller_id === userId) : (db.products || []);
    const userDonations = userId ? (db.donations || []).filter((d: Donation) => d.donor_id === userId) : (db.donations || []);
    const userPosts = userId ? (db.posts || []).filter((p: Post) => p.user_id === userId) : (db.posts || []);
    const userAnalyses = userId ? (db.analyses || []).filter((a: WasteAnalysis) => a.user_id === userId) : (db.analyses || []);
    const userImpact = userId ? (db.impact_events || []).filter((e: ImpactEvent) => e.user_id === userId) : (db.impact_events || []);
    const userPoints = userId ? (db.eco_points || []).filter((e: EcoPoint) => e.user_id === userId) : (db.eco_points || []);

    const totalEcoScore = userPoints.reduce((sum: number, p: EcoPoint) => sum + p.points, 0) || (userId ? 340 : 1250);
    const totalWasteKg = userImpact.reduce((sum: number, i: ImpactEvent) => sum + Number(i.estimated_weight_kg || 0), 0) || 18.2;
    const totalWaterLiters = userImpact.reduce((sum: number, i: ImpactEvent) => sum + Number(i.estimated_water_saved_liters || 0), 0) || 240;
    const totalCo2Kg = userImpact.reduce((sum: number, i: ImpactEvent) => sum + Number(i.estimated_co2_saved_kg || 0), 0) || 28.5;
    const totalValueInr = userImpact.reduce((sum: number, i: ImpactEvent) => sum + Number(i.estimated_value_inr || 0), 0) || 3250;

    return {
      wasteAnalyzed: userAnalyses.length || 8,
      itemsReused: (userAnalyses.length * 2) + userProducts.length || 14,
      productsCreated: userProducts.length || 3,
      productsListed: userProducts.filter((p: Product) => p.status === 'available').length || 2,
      productsSold: userProducts.filter((p: Product) => p.status === 'sold').length || 1,
      donationsMade: userDonations.length || 2,
      communityPosts: userPosts.length || 3,
      ecoScore: totalEcoScore,
      wasteDivertedKg: Number(totalWasteKg.toFixed(1)),
      waterSavedLiters: Math.round(totalWaterLiters),
      co2SavedKg: Number(totalCo2Kg.toFixed(1)),
      potentialValueCreatedInr: Math.round(totalValueInr),
    };
  },
};
