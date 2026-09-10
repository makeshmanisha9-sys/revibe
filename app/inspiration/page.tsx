'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { dataStore } from '@/lib/supabase/client';
import { Collection, CollectionItem } from '@/types/database';
import { EmptyState } from '@/components/EmptyState';
import {
  Compass,
  Bookmark,
  FolderPlus,
  Trash2,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Tag,
  Plus,
  Folder,
} from 'lucide-react';
import Link from 'next/link';

interface InspirationPin {
  id: string;
  title: string;
  category: string;
  wasteMaterial: string;
  imageUrl: string;
  heightClass: string;
  difficulty: string;
  estimatedCost: number;
}

const DISCOVER_PINS: InspirationPin[] = [
  {
    id: 'pin-1',
    title: 'Minimalist Amber Glass Bottle Hanging Planters',
    category: 'Home Decor',
    wasteMaterial: 'Glass Bottle',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    heightClass: 'aspect-[3/4]',
    difficulty: 'Easy',
    estimatedCost: 40,
  },
  {
    id: 'pin-2',
    title: 'Recycled Plastic Bottle Ambient LED Desk Lamp',
    category: 'Home Decor',
    wasteMaterial: 'Plastic Bottle',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    heightClass: 'aspect-[4/5]',
    difficulty: 'Medium',
    estimatedCost: 75,
  },
  {
    id: 'pin-3',
    title: 'Reinforced Corrugated Cardboard Desktop Organizer',
    category: 'College Projects',
    wasteMaterial: 'Cardboard',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    heightClass: 'aspect-[1/1]',
    difficulty: 'Easy',
    estimatedCost: 30,
  },
  {
    id: 'pin-4',
    title: 'Denim Jean Pocket Wall Organizer for Tools',
    category: 'Fashion',
    wasteMaterial: 'Waste Cloth',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    heightClass: 'aspect-[3/4]',
    difficulty: 'Medium',
    estimatedCost: 60,
  },
  {
    id: 'pin-5',
    title: 'Natural Coconut Shell Succulent Planter Pair',
    category: 'Home Decor',
    wasteMaterial: 'Coconut Shell',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80',
    heightClass: 'aspect-[4/5]',
    difficulty: 'Easy',
    estimatedCost: 50,
  },
  {
    id: 'pin-6',
    title: 'Bottle Cap Mosaic Ocean Wave Wall Plaque',
    category: 'Business',
    wasteMaterial: 'Plastic Caps',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
    heightClass: 'aspect-[1/1]',
    difficulty: 'Medium',
    estimatedCost: 45,
  },
];

const CATEGORIES = ['All', 'Discover', 'Trending', 'Plastic', 'Cardboard', 'Glass', 'Home Decor', 'Business', 'College Projects'];

export default function InspirationPage() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'discover' | 'saved' | 'collections'>('discover');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const loadCollections = async () => {
    if (!user) return;
    const data = await dataStore.getCollections(user.id);
    setCollections(data);
  };

  useEffect(() => {
    loadCollections();
    const handleUpdate = () => loadCollections();
    window.addEventListener('revibe_db_updated', handleUpdate);
    return () => window.removeEventListener('revibe_db_updated', handleUpdate);
  }, [user]);

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim() || !user) return;

    try {
      await dataStore.createCollection(user.id, newCollectionName.trim());
      showToast(`Collection "${newCollectionName}" created! 📁`, 'success');
      setNewCollectionName('');
      setShowCreateFolder(false);
      loadCollections();
    } catch (e) {
      showToast('Failed to create collection', 'error');
    }
  };

  const handleSavePin = async (pin: InspirationPin) => {
    if (!isAuthenticated || !user) {
      showToast('Please log in to save inspiration ideas', 'error');
      return;
    }

    try {
      let targetColId = collections[0]?.id;
      if (!targetColId) {
        const newCol = await dataStore.createCollection(user.id, 'My Upcycle Ideas');
        targetColId = newCol.id;
      }

      await dataStore.saveItemToCollection(targetColId, {
        item_type: 'idea',
        reference_id: pin.id,
        title: pin.title,
        image_url: pin.imageUrl,
        waste_material: pin.wasteMaterial,
      });

      showToast(`Saved "${pin.title}" to collection! 🔖`, 'success');
      loadCollections();
    } catch (e) {
      showToast('Failed to save idea', 'error');
    }
  };

  const filteredPins = DISCOVER_PINS.filter((p) => {
    if (selectedCategory === 'All' || selectedCategory === 'Discover') return true;
    if (selectedCategory === 'Trending') return true;
    if (selectedCategory === 'Plastic') return p.wasteMaterial.toLowerCase().includes('plastic');
    if (selectedCategory === 'Cardboard') return p.wasteMaterial.toLowerCase().includes('cardboard');
    if (selectedCategory === 'Glass') return p.wasteMaterial.toLowerCase().includes('glass');
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-rose-600" />
            <span>Pinterest-Style Maker Moodboard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-charcoal-900">Inspiration Board</h1>
          <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
            Explore curated upcycling blueprints, bookmark ideas into organized folders, and recreate them with AI step guidance.
          </p>
        </div>

        {/* Top Level Nav Tabs */}
        <div className="p-1 rounded-2xl bg-charcoal-100 flex gap-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'discover' ? 'bg-white text-charcoal-900 shadow-xs' : 'text-charcoal-600'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => setActiveTab('collections')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'collections' ? 'bg-white text-charcoal-900 shadow-xs' : 'text-charcoal-600'
            }`}
          >
            My Collections ({collections.length})
          </button>
        </div>
      </div>

      {activeTab === 'discover' && (
        <div className="space-y-6">
          {/* Category Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all btn-press ${
                  selectedCategory === cat
                    ? 'bg-charcoal-900 text-white shadow-xs'
                    : 'bg-white border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pinterest-Style Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPins.map((pin) => (
              <div
                key={pin.id}
                className="group relative break-inside-avoid rounded-3xl bg-white border border-charcoal-200 overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between"
              >
                <div className="relative w-full overflow-hidden bg-charcoal-100">
                  <img
                    src={pin.imageUrl}
                    alt={pin.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-black text-charcoal-900 shadow-sm">
                      ♻️ {pin.wasteMaterial}
                    </span>
                  </div>

                  {/* Save to Collection Hover Overlay Button */}
                  <button
                    onClick={() => handleSavePin(pin)}
                    className="absolute top-3 right-3 py-1.5 px-3 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-bold shadow-soft flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity btn-press"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                    {pin.category} • {pin.difficulty} (Est. ₹{pin.estimatedCost})
                  </span>
                  <h3 className="text-sm font-black text-charcoal-900 leading-snug">
                    {pin.title}
                  </h3>

                  <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between">
                    <Link
                      href={`/upload?prefill=${encodeURIComponent(pin.wasteMaterial)}`}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Recreate with AI</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'collections' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-charcoal-900">
              Saved Idea Folders & Collections
            </h3>
            <button
              onClick={() => setShowCreateFolder(!showCreateFolder)}
              className="px-4 py-2 rounded-xl bg-charcoal-900 text-white text-xs font-bold flex items-center gap-1.5 btn-press"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Create Collection</span>
            </button>
          </div>

          {showCreateFolder && (
            <form onSubmit={handleCreateCollection} className="p-4 rounded-2xl bg-charcoal-50 border border-charcoal-200 flex gap-2">
              <input
                type="text"
                placeholder="Collection name (e.g. 📁 Plastic Bottle Decor)..."
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-charcoal-200 text-xs text-charcoal-900"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
              >
                Create
              </button>
            </form>
          )}

          {collections.length === 0 ? (
            <EmptyState
              icon={Folder}
              title="Your collection is empty"
              description="Discover something worth recreating and save ideas directly from the feed or AI generator."
              actionText="Discover Ideas"
              onAction={() => setActiveTab('discover')}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((col) => (
                <div
                  key={col.id}
                  className="p-6 rounded-3xl bg-white border border-charcoal-200 shadow-soft space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
                      <Folder className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-charcoal-400 font-bold">
                      {col.items?.length || col.item_count || 0} saved
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-charcoal-900">{col.name}</h4>
                    {col.description && <p className="text-xs text-charcoal-500 mt-0.5">{col.description}</p>}
                  </div>

                  {/* Preview Items */}
                  <div className="space-y-2 pt-2 border-t border-charcoal-100">
                    {col.items && col.items.length > 0 ? (
                      col.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-charcoal-50 text-xs">
                          <span className="font-bold text-charcoal-800 truncate">{item.title}</span>
                          <Link
                            href="/upload"
                            className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-0.5"
                          >
                            <span>Recreate</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] text-charcoal-400 italic">No items saved in this folder yet.</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
