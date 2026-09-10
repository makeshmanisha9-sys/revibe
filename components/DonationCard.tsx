'use client';

import React, { useState } from 'react';
import { Donation } from '@/types/database';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { dataStore } from '@/lib/supabase/client';
import { Gift, MapPin, Tag, Box, Check, MessageCircle, ArrowRight } from 'lucide-react';

interface DonationCardProps {
  donation: Donation;
  onUpdate?: () => void;
}

export function DonationCard({ donation, onUpdate }: DonationCardProps) {
  const { user, profile, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = async () => {
    if (!isAuthenticated || !user) {
      showToast('Please log in to request this donation batch', 'error');
      return;
    }

    setIsClaiming(true);
    try {
      await dataStore.requestDonation(donation.id, user.id, profile || undefined);
      showToast('Claim request sent to donor! They will be notified.', 'success');
      if (onUpdate) onUpdate();
    } catch (e) {
      showToast('Failed to request donation', 'error');
    } finally {
      setIsClaiming(false);
    }
  };

  const getConditionColor = (cond: Donation['condition']) => {
    switch (cond) {
      case 'Washed / Sterilized':
      case 'Brand New':
        return 'bg-emerald-100 text-emerald-800';
      case 'Clean Scrap':
      case 'Gently Used':
        return 'bg-sky-100 text-sky-800';
      default:
        return 'bg-charcoal-100 text-charcoal-800';
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-charcoal-200 overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Donation Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-charcoal-100">
          <img
            src={donation.image_url}
            alt={donation.material_name}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[10px] font-bold text-charcoal-800 shadow-sm">
              {donation.material_type}
            </span>
            <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-sm ${getConditionColor(donation.condition)}`}>
              {donation.condition}
            </span>
          </div>

          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold shadow-sm ${
              donation.status === 'available'
                ? 'bg-emerald-700 text-white'
                : 'bg-amber-600 text-white'
            }`}>
              {donation.status === 'available' ? 'Available' : 'Requested'}
            </span>
          </div>
        </div>

        {/* Donation Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-charcoal-500">
            <span className="flex items-center gap-1">
              <Box className="w-3.5 h-3.5 text-charcoal-400" />
              <span className="font-semibold text-charcoal-700">{donation.quantity}</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-charcoal-400" />
              <span>{donation.location}</span>
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-black text-charcoal-900 line-clamp-1">
            {donation.material_name}
          </h3>

          <p className="text-xs text-charcoal-600 line-clamp-2 leading-relaxed">
            {donation.description}
          </p>

          <div className="p-2.5 rounded-xl bg-charcoal-50 border border-charcoal-100 text-[11px] text-charcoal-600 flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{donation.contact_information}</span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="p-4 bg-charcoal-50/60 border-t border-charcoal-100 flex items-center justify-between gap-2">
        <span className="text-xs text-charcoal-500">
          Donor: <strong className="text-charcoal-800">{donation.donor?.name || 'Community Member'}</strong>
        </span>

        {donation.status === 'available' ? (
          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className="py-2 px-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 btn-press shadow-soft"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>{isClaiming ? 'Requesting...' : 'Claim / Request'}</span>
          </button>
        ) : (
          <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
            Pending Handover
          </span>
        )}
      </div>
    </div>
  );
}
