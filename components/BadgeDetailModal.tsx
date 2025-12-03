import React from 'react';
import { Badge, Tier, UserStats } from '../types';
import { X, CheckCircle2, Circle, AlertCircle, ShieldCheck } from 'lucide-react';
import { RARITY_STYLES } from './BadgeGallery';

interface BadgeDetailModalProps {
  badge: Badge;
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats | null;
  isManuallyOwned: boolean;
  onToggleManual: (id: string) => void;
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ 
  badge, 
  isOpen, 
  onClose, 
  userStats,
  isManuallyOwned,
  onToggleManual
}) => {
  if (!isOpen) return null;

  // Check auto status
  let isAutoEarned = false;
  if (userStats) {
     if (badge.id === 'starstruck' && userStats.totalStars >= 16) isAutoEarned = true;
     if (badge.id === 'pullshark' && userStats.mergedPRs >= 2) isAutoEarned = true;
  }

  const isOwned = isAutoEarned || isManuallyOwned;
  const rarityClass = RARITY_STYLES[badge.rarity || 'Common'] || RARITY_STYLES['Common'];

  // Stop click propagation to content
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-github-bg border border-github-border rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={handleContentClick}
      >
        {/* Header (Scrollable Content starts below) */}
        <div className="relative shrink-0 h-32 bg-gradient-to-r from-github-subtle to-github-bg border-b border-github-border overflow-hidden">
           <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-github-accent/10 rounded-full blur-3xl"></div>
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 p-2 text-github-muted hover:text-github-text hover:bg-github-border/50 rounded-full transition-colors z-10"
           >
             <X size={20} />
           </button>
           
           <div className="absolute -bottom-8 left-8 flex items-end">
             <div className="w-24 h-24 bg-github-bg border-4 border-github-bg rounded-xl shadow-lg flex items-center justify-center text-5xl">
               {badge.icon}
             </div>
           </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pt-12 px-8 pb-8">
           <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
             <div>
               <h2 className="text-2xl font-bold text-github-header flex items-center gap-3">
                 {badge.name}
                 {isOwned && (
                   <span className="flex items-center gap-1 text-xs font-bold text-github-success bg-github-success/10 px-2 py-1 rounded-full uppercase tracking-wider border border-github-success/20">
                     <ShieldCheck size={12} /> Owned
                   </span>
                 )}
               </h2>
               <div className="flex items-center gap-2 mt-3">
                 {badge.rarity && (
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${rarityClass}`}>
                    {badge.rarity}
                  </span>
                 )}
                 <span className="text-sm font-medium text-github-muted capitalize px-2 py-0.5 bg-github-subtle rounded-md border border-github-border">
                    Category: {badge.category}
                 </span>
               </div>
             </div>
             
             <button
               onClick={() => onToggleManual(badge.id)}
               disabled={isAutoEarned}
               className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                 ${isOwned 
                   ? 'bg-github-success/10 text-github-success border border-github-success/20' 
                   : 'bg-github-subtle text-github-text border border-github-border hover:border-github-accent hover:text-github-accent'}
                 ${isAutoEarned ? 'opacity-50 cursor-not-allowed' : ''}
               `}
             >
               {isOwned ? <CheckCircle2 size={16} /> : <Circle size={16} />}
               {isAutoEarned ? 'Auto Detected' : isManuallyOwned ? 'Manually Added' : 'Add to Collection'}
             </button>
           </div>

           <p className="text-github-text text-lg leading-relaxed mb-8 border-b border-github-border pb-6">
             {badge.description}
           </p>

           <div className="bg-github-subtle/50 rounded-xl p-6 mb-8 border border-github-border">
             <h4 className="text-xs font-bold text-github-muted uppercase tracking-wider mb-3 flex items-center gap-2">
               <AlertCircle size={14} className="text-github-accent" /> Strategy & Requirements
             </h4>
             <p className="text-github-text font-medium leading-relaxed">
               {badge.howToEarn}
             </p>
           </div>

           {/* Tiers / Progress */}
           {badge.tiers && badge.tiers.length > 0 && (
             <div className="space-y-4">
               <h3 className="font-bold text-github-header text-lg">Tier Progression</h3>
               <div className="grid gap-3">
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
                     <div key={idx} className={`p-4 rounded-lg border flex items-center justify-between group transition-colors ${isTierUnlocked ? 'bg-github-bg border-github-success/30 shadow-sm' : 'bg-github-subtle/30 border-github-border opacity-75'}`}>
                        <div className="flex items-center gap-5">
                           <div className="flex space-x-0.5 w-16 opacity-90">
                            {[1, 2, 3, 4].map((bar) => (
                              <div key={bar} className={`h-2.5 w-full rounded-sm ${bar <= tier.filled ? bgClass : 'bg-github-border'}`}></div>
                            ))}
                          </div>
                          <div>
                            <span className={`font-bold text-sm block mb-0.5 ${tier.color}`}>{tier.name}</span>
                            <span className="text-xs text-github-muted font-mono">{tier.requirement}</span>
                          </div>
                        </div>
                        {isTierUnlocked && <CheckCircle2 size={20} className="text-github-success" />}
                     </div>
                   );
                 })}
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default BadgeDetailModal;