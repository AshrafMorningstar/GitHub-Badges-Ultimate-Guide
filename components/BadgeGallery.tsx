/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState, useMemo } from 'react';
import { BADGES } from '../constants';
import { Badge, BadgeCategory, UserStats } from '../types';
import { Filter, ArrowUpDown, Check, SlidersHorizontal, Info, Plus, Trophy } from 'lucide-react';

interface BadgeGalleryProps {
  userStats: UserStats | null;
  searchQuery: string;
  manualBadges: Set<string>;
  onToggleManualBadge: (id: string) => void;
  onSelectBadge: (badge: Badge) => void;
}

// Rarity Weight for Sorting
const RARITY_WEIGHT: Record<string, number> = {
  'Common': 1,
  'Rare': 2,
  'Epic': 3,
  'Legendary': 4
};

// Rarity Styles
export const RARITY_STYLES: Record<string, string> = {
  'Common': 'border-slate-500/50 text-slate-500 dark:text-slate-400 bg-slate-500/10',
  'Rare': 'border-blue-500/50 text-blue-500 dark:text-blue-400 bg-blue-500/10',
  'Epic': 'border-purple-500/50 text-purple-500 dark:text-purple-400 bg-purple-500/10',
  'Legendary': 'border-amber-500/50 text-amber-500 dark:text-amber-400 bg-amber-500/10',
};

const BadgeRow: React.FC<{ 
  badge: Badge; 
  userStats: UserStats | null; 
  isManuallyOwned: boolean; 
  onClick: () => void 
}> = ({ badge, userStats, isManuallyOwned, onClick }) => {
  
  // Determine if owned
  let isAutoOwned = false;
  if (userStats) {
      if (badge.id === 'starstruck' && userStats.totalStars >= 16) isAutoOwned = true;
      if (badge.id === 'pullshark' && userStats.mergedPRs >= 2) isAutoOwned = true;
  }

  const isOwned = isAutoOwned || isManuallyOwned;
  const rarityClass = RARITY_STYLES[badge.rarity || 'Common'] || RARITY_STYLES['Common'];

  return (
    <div 
      onClick={onClick}
      className={`group relative grid grid-cols-1 md:grid-cols-12 gap-6 p-6 border-b border-github-border transition-all duration-300 ease-out cursor-pointer
        ${isOwned ? 'bg-github-subtle/40' : 'bg-github-bg'}
        hover:z-10 hover:scale-[1.01] hover:shadow-xl hover:shadow-github-accent/5 hover:border-github-accent/30 hover:bg-github-bg
      `}
    >
      {/* Selection/Status Indicator Line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${isOwned ? 'bg-github-success' : 'bg-transparent group-hover:bg-github-border'}`}></div>

      {/* 1. Badge Identity (Icon, Name, Rarity) */}
      <div className="md:col-span-5 flex items-start gap-5">
        <div className="relative shrink-0">
          <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 group-hover:drop-shadow-md transition-all duration-300">
            {badge.icon}
          </div>
          {isOwned && (
            <div className="absolute -bottom-2 -right-2 bg-github-bg rounded-full p-0.5 border border-github-success shadow-sm">
              <Check size={14} className="text-github-success" strokeWidth={3} />
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`font-bold text-lg transition-colors ${isOwned ? 'text-github-success' : 'text-github-header group-hover:text-github-accent'}`}>
              {badge.name}
            </h4>
            {badge.rarity && (
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${rarityClass}`}>
                {badge.rarity}
              </span>
            )}
          </div>
          <p className="text-sm text-github-muted leading-snug">{badge.description}</p>
        </div>
      </div>

      {/* 2. Requirements (with Tooltip) */}
      <div className="md:col-span-4 flex items-center relative group/tooltip">
        <div className="flex items-start gap-2">
            <Info size={16} className="text-github-muted shrink-0 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />
            <p className="text-sm text-github-text leading-relaxed line-clamp-2">
            {badge.howToEarn}
            </p>
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-0 mb-3 w-72 p-4 bg-github-header/95 backdrop-blur-md text-github-bg text-xs rounded-lg shadow-2xl opacity-0 translate-y-2 group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 transition-all pointer-events-none z-30 ring-1 ring-white/10">
            <div className="font-bold mb-1 text-github-accent uppercase tracking-wide">Strategy</div>
            <p className="leading-relaxed">{badge.howToEarn}</p>
            <div className="absolute -bottom-1 left-6 w-3 h-3 bg-github-header/95 rotate-45"></div>
        </div>
      </div>

      {/* 3. Tiers & Status */}
      <div className="md:col-span-3 flex flex-col justify-center space-y-3">
        {badge.tiers ? (
          <div className="space-y-1.5">
             {badge.tiers.slice(0, 2).map((tier, i) => {
               const bgClass = tier.color.replace(/text-/g, 'bg-');
               return (
                 <div key={i} className="flex items-center text-xs gap-2">
                    <div className="flex space-x-0.5 w-12">
                      {[1,2,3,4].map(b => (
                        <div key={b} className={`h-1.5 w-full rounded-full transition-all ${b <= tier.filled ? bgClass : 'bg-github-border'}`}></div>
                      ))}
                    </div>
                    <span className="text-github-muted truncate font-mono">{tier.name}</span>
                 </div>
               )
             })}
             {badge.tiers.length > 2 && <span className="text-[10px] text-github-muted italic pl-1">+ {badge.tiers.length - 2} higher tiers</span>}
          </div>
        ) : (
           <div className="text-xs text-github-muted italic flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-github-accent"></span>
             Single Tier
           </div>
        )}
        
        {/* Mobile/Hover explicit action */}
        <div className="md:hidden group-hover:md:flex items-center gap-2 mt-2 pt-2 border-t border-github-border/50 animate-in fade-in slide-in-from-left-2 duration-300">
           <span className="text-xs font-bold text-github-accent uppercase tracking-wider flex items-center gap-1">
             <Plus size={12} /> View Details
           </span>
        </div>
      </div>
    </div>
  );
};

const BadgeGallery: React.FC<BadgeGalleryProps> = ({ userStats, searchQuery, manualBadges, onToggleManualBadge, onSelectBadge }) => {
  const [activeTab, setActiveTab] = useState<BadgeCategory>('achievement');
  const [filter, setFilter] = useState<'all' | 'owned' | 'unowned'>('all');
  const [sort, setSort] = useState<'default' | 'name' | 'rarity_asc' | 'rarity_desc' | 'category'>('default');

  const filteredBadges = useMemo(() => {
    return BADGES.filter(badge => {
      // 1. Tab Filter (Primary Category)
      if (badge.category !== activeTab) return false;

      // 2. Search Filter (Prop specific)
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches = badge.name.toLowerCase().includes(q) || 
                        badge.description.toLowerCase().includes(q) ||
                        badge.howToEarn.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 3. Status Filter (Owned/Unowned)
      if (filter !== 'all') {
        let isOwned = manualBadges.has(badge.id);
        if (userStats) {
            if (badge.id === 'starstruck' && userStats.totalStars >= 16) isOwned = true;
            if (badge.id === 'pullshark' && userStats.mergedPRs >= 2) isOwned = true;
        }
        if (filter === 'owned' && !isOwned) return false;
        if (filter === 'unowned' && isOwned) return false;
      }

      return true;
    }).sort((a, b) => {
      // 4. Sorting
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'category') return a.category.localeCompare(b.category);
      if (sort === 'rarity_asc') {
        const wA = RARITY_WEIGHT[a.rarity || 'Common'] || 0;
        const wB = RARITY_WEIGHT[b.rarity || 'Common'] || 0;
        return wA - wB;
      }
      if (sort === 'rarity_desc') {
        const wA = RARITY_WEIGHT[a.rarity || 'Common'] || 0;
        const wB = RARITY_WEIGHT[b.rarity || 'Common'] || 0;
        return wB - wA;
      }
      return 0; // Default order in constants
    });
  }, [activeTab, searchQuery, filter, sort, userStats, manualBadges]);

  return (
    <section id="gallery" className="py-16 container mx-auto px-6">
      
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row justify-between items-end mb-8 border-b border-github-border pb-6 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-github-header mb-2 flex items-center gap-3">
            <Trophy className="text-github-accent" /> 
            Badge Gallery
          </h2>
          <p className="text-github-muted">
            The complete encyclopedia of GitHub achievements.
            {userStats && <span className="text-github-success ml-2 font-mono text-xs bg-github-success/10 px-2 py-0.5 rounded-full border border-github-success/20">Synced with @{userStats.username}</span>}
          </p>
        </div>
        
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Tab Switcher */}
          <div className="flex p-1 bg-github-subtle border border-github-border rounded-lg mr-auto lg:mr-0">
            {(['achievement', 'highlight', 'retired'] as BadgeCategory[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all capitalize
                  ${activeTab === cat 
                    ? 'bg-github-bg text-github-header shadow-sm ring-1 ring-github-border' 
                    : 'text-github-muted hover:text-github-text'}`}
              >
                {cat}s
              </button>
            ))}
          </div>

           {/* Filter Dropdown */}
           <div className="relative group">
             <div className="flex items-center gap-2 px-3 py-2 bg-github-bg border border-github-border rounded-md text-sm text-github-text cursor-pointer hover:border-github-accent transition-colors">
               <Filter size={16} />
               <span className="capitalize">{filter}</span>
             </div>
             <div className="absolute top-full right-0 mt-1 w-32 bg-github-bg border border-github-border rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
               {['all', 'owned', 'unowned'].map(f => (
                 <div 
                   key={f}
                   onClick={() => setFilter(f as any)} 
                   className={`px-4 py-2 hover:bg-github-subtle text-sm cursor-pointer capitalize ${filter === f ? 'font-bold text-github-accent' : ''}`}
                 >
                   {f}
                 </div>
               ))}
             </div>
           </div>

           {/* Sort Dropdown */}
           <div className="relative group">
             <div className="flex items-center gap-2 px-3 py-2 bg-github-bg border border-github-border rounded-md text-sm text-github-text cursor-pointer hover:border-github-accent transition-colors">
               <ArrowUpDown size={16} />
               <span>Sort</span>
             </div>
             <div className="absolute top-full right-0 mt-1 w-48 bg-github-bg border border-github-border rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
               {[
                 {k: 'default', l: 'Default'},
                 {k: 'name', l: 'Name (A-Z)'},
                 {k: 'rarity_asc', l: 'Rarity (Common → Leg)'},
                 {k: 'rarity_desc', l: 'Rarity (Leg → Common)'},
                 {k: 'category', l: 'Category'}
                ].map(opt => (
                  <div 
                    key={opt.k}
                    onClick={() => setSort(opt.k as any)} 
                    className={`px-4 py-2 hover:bg-github-subtle text-sm cursor-pointer ${sort === opt.k ? 'font-bold text-github-accent' : ''}`}
                  >
                    {opt.l}
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-github-bg/50 backdrop-blur border border-github-border rounded-xl overflow-hidden shadow-sm transition-all duration-300">
        <div className="hidden md:grid grid-cols-12 gap-6 px-6 py-4 bg-github-subtle/50 border-b border-github-border text-xs font-bold text-github-muted uppercase tracking-wider">
          <div className="col-span-5">Badge Identity</div>
          <div className="col-span-4">Requirements & Strategy</div>
          <div className="col-span-3">Progress / Tiers</div>
        </div>
        
        <div className="divide-y divide-github-border">
          {filteredBadges.map(badge => (
            <BadgeRow 
              key={badge.id} 
              badge={badge} 
              userStats={userStats}
              isManuallyOwned={manualBadges.has(badge.id)}
              onClick={() => onSelectBadge(badge)}
            />
          ))}
          {filteredBadges.length === 0 && (
            <div className="p-16 text-center text-github-muted flex flex-col items-center gap-4">
              <div className="bg-github-subtle p-6 rounded-full">
                <SlidersHorizontal size={32} className="opacity-20" />
              </div>
              <h3 className="text-lg font-bold text-github-header">No badges found</h3>
              <p className="max-w-xs mx-auto">Try adjusting your search terms or changing the sort/filter options above.</p>
              <button 
                onClick={() => {setFilter('all'); setSort('default');}}
                className="text-github-accent hover:underline text-sm font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="text-right mt-4 text-xs text-github-muted font-mono">
         Showing {filteredBadges.length} Badge{filteredBadges.length !== 1 ? 's' : ''}
      </div>

    </section>
  );
};

export default BadgeGallery;