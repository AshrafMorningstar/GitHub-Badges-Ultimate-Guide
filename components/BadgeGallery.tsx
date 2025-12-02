import React, { useState } from 'react';
import { BADGES } from '../constants';
import { BadgeCategory, UserStats } from '../types';

interface BadgeGalleryProps {
  userStats: UserStats | null;
}

const BadgeRow: React.FC<{ badge: typeof BADGES[0]; userStats: UserStats | null }> = ({ badge, userStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 border-b border-github-border hover:bg-github-subtle/50 transition-colors group">
      {/* Icon & Name */}
      <div className="md:col-span-4 flex items-start gap-4">
        <div className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
          {badge.icon}
        </div>
        <div>
          <h4 className="font-bold text-github-header text-lg flex items-center gap-2">
            {badge.name}
            {badge.rarity && (
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border 
                ${badge.rarity === 'Common' ? 'border-gray-600 text-gray-400' : 
                  badge.rarity === 'Rare' ? 'border-blue-500/50 text-blue-400' :
                  badge.rarity === 'Epic' ? 'border-purple-500/50 text-purple-400' : 
                  'border-yellow-500/50 text-yellow-400'}`}>
                {badge.rarity}
              </span>
            )}
          </h4>
          <p className="text-sm text-github-muted mt-1">{badge.description}</p>
        </div>
      </div>

      {/* How to Earn */}
      <div className="md:col-span-4 flex items-center">
        <p className="text-sm text-github-text leading-relaxed">
          {badge.howToEarn}
        </p>
      </div>

      {/* Tiers */}
      <div className="md:col-span-4 flex flex-col justify-center space-y-2">
        {badge.tiers ? (
          badge.tiers.map((tier, idx) => {
            // Logic to verify tier if possible
            let isEarned = false;
            if (userStats) {
               if (badge.id === 'starstruck') {
                 // Requirement format usually "16 Stars", "128 Stars"
                 const required = parseInt(tier.requirement.split(' ')[0]);
                 if (userStats.totalStars >= required) isEarned = true;
               }
               if (badge.id === 'pullshark') {
                 const required = parseInt(tier.requirement.split(' ')[0]);
                 if (userStats.mergedPRs >= required) isEarned = true;
               }
            }

            return (
            <div key={idx} className={`flex items-center text-xs font-mono p-1 rounded ${isEarned ? 'bg-github-success/10' : ''}`}>
               <div className="flex space-x-0.5 mr-3 w-16">
                 {[1, 2, 3, 4].map((bar) => (
                   <div 
                    key={bar} 
                    className={`h-2 w-full rounded-sm ${bar <= tier.filled ? tier.color.replace('text-', 'bg-') : 'bg-github-border'}`}
                   ></div>
                 ))}
               </div>
               <span className={`${tier.color} font-bold mr-2 w-12`}>{tier.name}</span>
               <span className="text-github-muted truncate flex-1">{tier.requirement}</span>
               {isEarned && <span className="text-github-success ml-2">✓</span>}
            </div>
          )})
        ) : (
           <span className="text-xs text-github-muted italic">No distinct tiers</span>
        )}
      </div>
    </div>
  );
};

const BadgeGallery: React.FC<BadgeGalleryProps> = ({ userStats }) => {
  const [activeTab, setActiveTab] = useState<BadgeCategory>('achievement');

  const filteredBadges = BADGES.filter(b => b.category === activeTab);

  return (
    <section id="gallery" className="py-16 container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-github-border pb-4">
        <div>
          <h2 className="text-3xl font-bold text-github-header mb-2">The Badge Gallery</h2>
          <p className="text-github-muted">
            Explore the complete collection of known badges. 
            {userStats && <span className="text-github-success ml-2">(Syncing with @{userStats.username})</span>}
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          {(['achievement', 'highlight', 'retired'] as BadgeCategory[]).map(cat => (
             <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize
                ${activeTab === cat 
                  ? 'bg-github-accent text-white' 
                  : 'text-github-text hover:bg-github-subtle'}`}
             >
               {cat}s
             </button>
          ))}
        </div>
      </div>

      <div className="bg-github-bg border border-github-border rounded-xl overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-12 gap-6 p-4 bg-github-subtle border-b border-github-border text-xs font-bold text-github-muted uppercase tracking-wider">
          <div className="col-span-4">Badge Detail</div>
          <div className="col-span-4">Earning Strategy</div>
          <div className="col-span-4">Progression Tiers</div>
        </div>
        
        <div className="divide-y divide-github-border">
          {filteredBadges.map(badge => (
            <BadgeRow key={badge.id} badge={badge} userStats={userStats} />
          ))}
          {filteredBadges.length === 0 && (
            <div className="p-12 text-center text-github-muted">
              No badges found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BadgeGallery;