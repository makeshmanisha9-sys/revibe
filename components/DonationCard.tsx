'use client';

import React from 'react';
import { Donation } from '@/types/database';
import { HeartHandshake, MapPin, PhoneCall, Layers, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface DonationCardProps {
  donation: Donation;
}

export const DonationCard: React.FC<DonationCardProps> = ({ donation }) => {
  const { showToast } = useToast();

  const handleContact = () => {
    showToast(`Donor Contact Info: ${donation.contact_information}`, 'info');
  };

  return (
    <div className="rounded-2xl bg-emerald-950/60 border border-emerald-800/80 overflow-hidden hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-lg">
      <div>
        <div className="relative aspect-video bg-black/40 overflow-hidden border-b border-emerald-900/60">
          <img src={donation.image_url} alt={donation.material_name} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 border border-emerald-700 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              {donation.material_type}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-emerald-950 text-[10px] font-extrabold uppercase">
              {donation.condition}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="text-base font-bold text-white line-clamp-1">{donation.material_name}</h3>
          <p className="text-xs text-emerald-200/70 line-clamp-2">{donation.description}</p>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="flex items-center gap-1 text-emerald-300 font-semibold">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Qty: {donation.quantity}
            </span>
            <span className="flex items-center gap-1 text-emerald-300/60">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {donation.location}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center justify-between border-t border-emerald-900/40 mt-3">
        <span className="text-xs text-emerald-400/80 font-medium">Status: {donation.status}</span>
        <button
          onClick={handleContact}
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Contact Donor</span>
        </button>
      </div>
    </div>
  );
};
