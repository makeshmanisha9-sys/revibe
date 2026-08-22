import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { Product, Donation, Post, Comment, Like, Profile, WasteAnalysis, Idea, DashboardStats } from '@/types/database';

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

// Persistent Local Database Store for seamless operation out-of-the-box
const DB_STORAGE_KEY = 'revibe_local_db_v1';

const INITIAL_DEMO_DATA = {
  profiles: [
    {
      id: 'demo-user-1',
      name: 'Eco Pioneer',
      email: 'eco@revibe.org',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      location: 'Green City, CA',
      bio: 'Upcycling enthusiast transforming plastic waste into home decor!',
      role: 'user' as const,
      created_at: new Date().toISOString(),
    },
    {
      id: 'admin-user-1',
      name: 'ReVIBE Admin',
      email: 'admin@revibe.org',
      avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80',
      location: 'Global HQ',
      bio: 'Platform Moderator & Sustainability Lead',
      role: 'admin' as const,
      created_at: new Date().toISOString(),
    }
  ],
  products: [
    {
      id: 'prod-1',
      seller_id: 'demo-user-1',
      seller: { name: 'Eco Pioneer', location: 'Green City, CA', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
      product_name: 'Geometric Recycled Plastic Desk Lamp',
      description: 'Handcrafted table lamp made from 100% recycled HDPE bottle caps with warm LED ambient lighting.',
      category: 'Home Decor',
      waste_material: 'Plastic Bottles',
      image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
      cost: 150,
      selling_price: 650,
      quantity: 4,
      location: 'Green City, CA',
      contact_information: 'eco@revibe.org | +1 555-0192',
      status: 'available' as const,
      created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 'prod-2',
      seller_id: 'demo-user-1',
      seller: { name: 'Eco Pioneer', location: 'Seattle, WA', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
      product_name: 'Upcycled Denim Tote Bag',
      description: 'Durable, stylish multi-pocket tote bag crafted from repurposed denim jeans with organic cotton handles.',
      category: 'Fashion',
      waste_material: 'Fabric Waste',
      image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      cost: 90,
      selling_price: 450,
      quantity: 8,
      location: 'Seattle, WA',
      contact_information: 'denim.craft@revibe.org',
      status: 'available' as const,
      created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    {
      id: 'prod-3',
      seller_id: 'admin-user-1',
      seller: { name: 'ReVIBE Admin', location: 'Austin, TX', avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80' },
      product_name: 'Coconut Shell Hanging Planters (Pair)',
      description: 'Polished natural coconut shell planters with durable hemp rope suspension hooks, perfect for succulents.',
      category: 'Home Decor',
      waste_material: 'Coconut Shells',
      image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
      cost: 60,
      selling_price: 320,
      quantity: 12,
      location: 'Austin, TX',
      contact_information: 'planters@revibe.org',
      status: 'available' as const,
      created_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    }
  ],
  donations: [
    {
      id: 'don-1',
      donor_id: 'demo-user-1',
      donor: { name: 'Eco Pioneer', location: 'Portland, OR' },
      material_name: 'Clean Cardboard Boxes & Packing Sheets',
      material_type: 'Cardboard',
      quantity: '25 kg batch',
      condition: 'Clean / Flattened',
      description: 'Surplus double-wall corrugated cardboard boxes suitable for DIY packaging, shipping, or craft modeling.',
      image_url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      location: 'Portland, OR',
      contact_information: 'donations@revibe.org | Pickup daily 10am-4pm',
      status: 'available' as const,
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
      id: 'don-2',
      donor_id: 'admin-user-1',
      donor: { name: 'ReVIBE Admin', location: 'Denver, CO' },
      material_name: 'Assorted Glass Bottles & Jars',
      material_type: 'Glass bottles',
      quantity: '40 pcs',
      condition: 'Washed / Sterilized',
      description: 'Assorted glass beverage bottles and mason jars suitable for candle making or vase crafting.',
      image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
      location: 'Denver, CO',
      contact_information: 'denver.recycle@revibe.org',
      status: 'available' as const,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    }
  ],
  posts: [
    {
      id: 'post-1',
      user_id: 'demo-user-1',
      user: { name: 'Eco Pioneer', avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80' },
      product_name: 'Recycled Bottle Cap Mosaic Wall Art',
      description: 'Turned 300+ discarded plastic bottle caps collected from local park cleanups into an eco ocean mosaic art piece! 🌊♻️',
      image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      waste_material: 'Plastic Bottles',
      likes_count: 24,
      comments_count: 3,
      is_liked_by_user: false,
      comments: [
        {
          id: 'comm-1',
          post_id: 'post-1',
          user_id: 'admin-user-1',
          user: { name: 'ReVIBE Admin', avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=250&q=80' },
          comment: 'Incredible creativity! The color gradients look stunning.',
          created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
        }
      ],
      created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    }
  ],
  analyses: [] as WasteAnalysis[],
  ideas: [] as Idea[],
};

function getLocalDB() {
  if (typeof window === 'undefined') return INITIAL_DEMO_DATA;
  try {
    const raw = localStorage.getItem(DB_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_DATA));
      return INITIAL_DEMO_DATA;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_DEMO_DATA;
  }
}

function saveLocalDB(data: typeof INITIAL_DEMO_DATA) {
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
      const { data, error } = await supabaseClient.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Product[];
    }
    const db = getLocalDB();
    return db.products || [];
  },

  async getProductById(id: string): Promise<Product | null> {
    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('products').select('*').eq('id', id).single();
      if (!error && data) return data as Product;
    }
    const db = getLocalDB();
    return db.products.find((p: Product) => p.id === id) || null;
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: 'prod-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('products').insert([newProduct]).select().single();
      if (!error && data) return data as Product;
    }
    const db = getLocalDB();
    db.products.unshift(newProduct);
    saveLocalDB(db);
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

  // Donations
  async getDonations(): Promise<Donation[]> {
    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('donations').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Donation[];
    }
    const db = getLocalDB();
    return db.donations || [];
  },

  async createDonation(donation: Omit<Donation, 'id' | 'created_at'>): Promise<Donation> {
    const newDonation: Donation = {
      ...donation,
      id: 'don-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('donations').insert([newDonation]).select().single();
      if (!error && data) return data as Donation;
    }
    const db = getLocalDB();
    db.donations.unshift(newDonation);
    saveLocalDB(db);
    return newDonation;
  },

  async deleteDonation(id: string): Promise<boolean> {
    if (supabaseClient) {
      await supabaseClient.from('donations').delete().eq('id', id);
    }
    const db = getLocalDB();
    db.donations = db.donations.filter((d: Donation) => d.id !== id);
    saveLocalDB(db);
    return true;
  },

  // Posts & Community
  async getPosts(): Promise<Post[]> {
    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('posts').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Post[];
    }
    const db = getLocalDB();
    return db.posts || [];
  },

  async createPost(post: Omit<Post, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'is_liked_by_user' | 'comments'>): Promise<Post> {
    const newPost: Post = {
      ...post,
      id: 'post-' + Date.now(),
      likes_count: 0,
      comments_count: 0,
      is_liked_by_user: false,
      comments: [],
      created_at: new Date().toISOString(),
    };
    if (supabaseClient) {
      const { data, error } = await supabaseClient.from('posts').insert([newPost]).select().single();
      if (!error && data) return data as Post;
    }
    const db = getLocalDB();
    db.posts.unshift(newPost);
    saveLocalDB(db);
    return newPost;
  },

  async toggleLikePost(postId: string, userId: string): Promise<{ liked: boolean; newCount: number }> {
    const db = getLocalDB();
    const post = db.posts.find((p: Post) => p.id === postId);
    if (!post) return { liked: false, newCount: 0 };

    post.is_liked_by_user = !post.is_liked_by_user;
    post.likes_count = (post.likes_count || 0) + (post.is_liked_by_user ? 1 : -1);
    saveLocalDB(db);

    if (supabaseClient) {
      if (post.is_liked_by_user) {
        await supabaseClient.from('likes').insert([{ post_id: postId, user_id: userId }]);
      } else {
        await supabaseClient.from('likes').delete().match({ post_id: postId, user_id: userId });
      }
    }
    return { liked: post.is_liked_by_user, newCount: post.likes_count };
  },

  async addComment(postId: string, userId: string, commentText: string, authorName: string): Promise<Comment> {
    const newComment: Comment = {
      id: 'comm-' + Date.now(),
      post_id: postId,
      user_id: userId,
      user: { name: authorName },
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

  // Analyses
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
    return item;
  },

  async getAnalyses(userId?: string): Promise<WasteAnalysis[]> {
    const db = getLocalDB();
    if (!userId) return db.analyses || [];
    return (db.analyses || []).filter((a: WasteAnalysis) => a.user_id === userId);
  },

  // Dashboard Statistics
  async getDashboardStats(userId?: string): Promise<DashboardStats> {
    const db = getLocalDB();
    const userProducts = userId ? db.products.filter((p: Product) => p.seller_id === userId) : db.products;
    const userDonations = userId ? db.donations.filter((d: Donation) => d.donor_id === userId) : db.donations;
    const userPosts = userId ? db.posts.filter((p: Post) => p.user_id === userId) : db.posts;
    const userAnalyses = userId ? (db.analyses || []).filter((a: WasteAnalysis) => a.user_id === userId) : (db.analyses || []);

    const estimatedRevenue = userProducts.reduce((sum: number, p: Product) => sum + (p.selling_price * p.quantity), 0);

    return {
      wasteAnalyzed: userAnalyses.length || 8,
      productsCreated: userProducts.length || 5,
      productsListed: userProducts.filter((p: Product) => p.status === 'available').length || 3,
      donationsMade: userDonations.length || 2,
      communityPosts: userPosts.length || 4,
      estimatedRevenue: estimatedRevenue || 1420,
      wasteReusedKg: (userAnalyses.length * 1.5) + (userProducts.length * 2.2) || 18.5,
    };
  }
};
