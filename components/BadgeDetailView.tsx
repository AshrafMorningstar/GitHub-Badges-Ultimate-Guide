/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { Badge, UserStats } from '../types';
import { BADGES } from '../constants';
import { ArrowLeft, CheckCircle2, Circle, ShieldCheck, AlertCircle, Share2, Calendar } from 'lucide-react';
import { RARITY_STYLES } from './BadgeGallery';

interface BadgeDetailViewProps {
  badge: Badge;
  userStats: UserStats | null;
  isManuallyOwned: boolean;
  onToggleManual: (id: string) => void;
  onBack: () => void;
  onSelectRelated: (badge: Badge) => void;
}

const BadgeDetailView: React.FC<BadgeDetailViewProps> = ({ 
  badge, 
  userStats, 
  isManuallyOwned, 
  onToggleManual, 
  onBack,
  onSelectRelated
}) => {
  // Determine if owned
  let isAutoEarned = false;
  if (userStats) {
      if (badge.id === 'starstruck' && userStats.totalStars >= 16) isAutoEarned = true;
      if (badge.id === 'pullshark' && userStats.mergedPRs >= 2) isAutoEarned = true;
  }
  const isOwned = isAutoEarned || isManuallyOwned;
  
  // Rarity Styling
  const rarityClass = RARITY_STYLES[badge.rarity || 'Common'] || RARITY_STYLES['Common'];

  // Find related badges (same category, excluding current)
  const relatedBadges = BADGES.filter(b => b.category === badge.category && b.id !== badge.id).slice(0, 3);

  return (
    <div className="container mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-screen">
      
      {/* Back Navigation */}
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-github-muted hover:text-github-accent mb-8 transition-colors"
      >
        <div className="p-2 rounded-full bg-github-subtle group-hover:bg-github-accent/10 transition-colors">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="font-semibold text-sm">Back to Gallery</span>
      </button>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* Left Column: Icon & Primary Actions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-github-subtle to-github-bg border border-github-border rounded-3xl shadow-2xl overflow-hidden group">
             {/* Dynamic Glow Background */}
             <div className={`absolute inset-0 opacity-20 bg-gradient-to-tr ${isOwned ? 'from-github-success/40 to-transparent' : 'from-github-accent/20 to-transparent'} blur-3xl`}></div>
             
             <div className="relative z-10 text-9xl transform group-hover:scale-110 transition-transform duration-500 drop-shadow-xl">
               {badge.icon}
             </div>

             {isOwned && (
               <div className="absolute top-6 right-6 bg-github-success text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-in zoom-in duration-300">
                 <ShieldCheck size={16} /> Earned
               </div>
             )}
          </div>

          <div className="bg-github-bg border border-github-border rounded-xl p-6 shadow-sm">
            <h3 className="text-github-muted text-xs font-bold uppercase tracking-wider mb-4">Ownership Status</h3>
            
            <div className="flex items-center justify-between mb-6">
              <span className={`font-semibold ${isOwned ? 'text-github-success' : 'text-github-muted'}`}>
                {isOwned ? 'Collected' : 'Not yet earned'}
              </span>
              <div className={`w-3 h-3 rounded-full ${isOwned ? 'bg-github-success shadow-[0_0_10px_currentColor]' : 'bg-github-border'}`}></div>
            </div>

            <button
               onClick={() => onToggleManual(badge.id)}
               disabled={isAutoEarned}
               className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg text-sm font-bold transition-all
                 ${isOwned 
                   ? 'bg-github-subtle text-github-text border border-github-border hover:border-github-danger hover:text-github-danger' 
                   : 'bg-github-header text-github-bg hover:opacity-90 shadow-lg'}
                 ${isAutoEarned ? 'opacity-50 cursor-not-allowed' : ''}
               `}
             >
               {isOwned 
                 ? <>{isAutoEarned ? 'Auto-Detected (Locked)' : 'Remove from Collection'}</> 
                 : <>Mark as Earned Manually</>}
             </button>
             {isAutoEarned && <p className="text-xs text-center mt-3 text-github-muted">Verified by GitHub public data</p>}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Header Info */}
          <div className="border-b border-github-border pb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${rarityClass}`}>
                {badge.rarity}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-github-border bg-github-subtle text-github-muted">
                {badge.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-github-header mb-4">{badge.name}</h1>
            <p className="text-xl text-github-muted leading-relaxed max-w-2xl">
              {badge.description}
            </p>
          </div>

          {/* How to Earn */}
          <div className="bg-github-subtle/30 rounded-2xl p-8 border border-github-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <AlertCircle size={100} />
            </div>
            <h3 className="text-lg font-bold text-github-header mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-github-accent" />
              How to Earn
            </h3>
            <p className="text-github-text text-lg font-medium leading-relaxed">
              {badge.howToEarn}
            </p>
          </div>

          {/* Tiers */}
          {badge.tiers && badge.tiers.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-github-header mb-6">Progression Tiers</h3>
              <div className="grid gap-4">
                {badge.tiers.map((tier, idx) => {
                   let isTierUnlocked = false;
                   if (isManuallyOwned) isTierUnlocked = true; 
                   if (userStats) {
                     if (badge.id === 'starstruck') {
                        const req = parseInt(tier.requirement.split(' ')[0]);
                        if (userStats.totalStars >= req) isTierUnlocked = true;
                     } else if (badge.id === 'pullshark') {
                        const req = parseInt(tier.requirement.split(' ')[0]);
                        if (userStats.mergedPRs >= req) isTierUnlocked = true;
                     }
                   }

                   const bgClass = tier.color.replace(/text-/g, 'bg-');
                   
                   return (
                     <div 
                       key={idx} 
                       className={`relative p-5 rounded-xl border transition-all duration-300 flex items-center justify-between
                         ${isTierUnlocked 
                           ? 'bg-github-bg border-github-success/40 shadow-sm' 
                           : 'bg-github-subtle/20 border-github-border/60 opacity-60 grayscale-[0.5]'}
                       `}
                     >
                       <div className="flex items-center gap-6">
                          {/* Visual Bars */}
                          <div className="flex flex-col gap-1 w-1.5 h-12">
                             {[4,3,2,1].map(b => (
                               <div key={b} className={`w-full flex-1 rounded-full ${b <= tier.filled ? bgClass : 'bg-github-border'}`}></div>
                             ))}
                          </div>
                          <div>
                             <h4 className={`text-lg font-bold ${isTierUnlocked ? tier.color : 'text-github-muted'}`}>{tier.name}</h4>
                             <p className="text-sm text-github-muted font-mono">{tier.requirement}</p>
                          </div>
                       </div>
                       {isTierUnlocked && (
                         <div className="bg-github-success/10 p-2 rounded-full text-github-success">
                           <CheckCircle2 size={24} />
                         </div>
                       )}
                     </div>
                   );
                })}
              </div>
            </div>
          )}

          {/* Related Badges */}
          {relatedBadges.length > 0 && (
            <div className="pt-8 border-t border-github-border">
              <h3 className="text-lg font-bold text-github-header mb-6">Similar Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedBadges.map(related => (
                  <div 
                    key={related.id}
                    onClick={() => onSelectRelated(related)}
                    className="group cursor-pointer p-4 rounded-xl border border-github-border hover:border-github-accent/50 hover:bg-github-bg hover:shadow-lg transition-all"
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{related.icon}</div>
                    <h4 className="font-bold text-github-text group-hover:text-github-accent transition-colors">{related.name}</h4>
                    <p className="text-xs text-github-muted mt-1 line-clamp-2">{related.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default BadgeDetailView;