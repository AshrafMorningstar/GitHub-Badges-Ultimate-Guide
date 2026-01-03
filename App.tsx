/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Understanding from './components/Understanding';
import BadgeGallery from './components/BadgeGallery';
import BadgeDetailView from './components/BadgeDetailView';
import Roadmap from './components/Roadmap';
import Guides from './components/Guides';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { UserStats, Badge } from './types';
import { BADGES } from './constants';

const App: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  
  // Manual Badges State (Persisted)
  const [manualBadges, setManualBadges] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('manualBadges');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  const toggleManualBadge = (id: string) => {
    setManualBadges(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('manualBadges', JSON.stringify(Array.from(next)));
      return next;
    });
  };
  
  // Theme Management
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const fetchUserStats = async (username: string) => {
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('User not found');
      const userData = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const reposData = await reposRes.json();
      
      let totalStars = 0;
      if (Array.isArray(reposData)) {
        totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
      }

      const prRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`);
      const prData = await prRes.json();
      const mergedPRs = prData.total_count || 0;

      setUserStats({
        username: userData.login,
        avatarUrl: userData.avatar_url,
        totalStars,
        mergedPRs,
        followers: userData.followers
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSelectBadge = (badge: Badge) => {
    setSelectedBadgeId(badge.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToGallery = () => {
    setSelectedBadgeId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedBadge = selectedBadgeId ? BADGES.find(b => b.id === selectedBadgeId) : null;

  return (
    <div className="min-h-screen font-sans text-github-text selection:bg-github-accent/30 selection:text-white relative">
      {/* Premium Animated Background Layer */}
      <div className="fixed inset-0 z-[-1] premium-gradient-bg opacity-50 pointer-events-none"></div>
      
      {/* Decorative Orbs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-github-accent/5 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-github-purple/5 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[20%] w-96 h-96 bg-github-success/5 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {!selectedBadge && <Hero onAnalyze={fetchUserStats} userStats={userStats} />}
      
      <Navigation 
        theme={theme} 
        toggleTheme={toggleTheme} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="relative z-10 transition-all duration-500 ease-in-out">
        {selectedBadge ? (
          <BadgeDetailView 
             badge={selectedBadge}
             userStats={userStats}
             isManuallyOwned={manualBadges.has(selectedBadge.id)}
             onToggleManual={toggleManualBadge}
             onBack={handleBackToGallery}
             onSelectRelated={handleSelectBadge}
          />
        ) : (
          <>
            <Understanding />
            <BadgeGallery 
              userStats={userStats} 
              searchQuery={searchQuery}
              manualBadges={manualBadges}
              onToggleManualBadge={toggleManualBadge}
              onSelectBadge={handleSelectBadge}
            />
            <Roadmap userStats={userStats} />
            <Guides />
            <FAQ />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;