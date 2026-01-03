/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState } from 'react';
import { HERO_BADGES } from '../constants';
import { UserStats } from '../types';
import { Search, Loader2, Star, GitPullRequest, Users } from 'lucide-react';

interface HeroProps {
  onAnalyze: (username: string) => Promise<boolean>;
  userStats: UserStats | null;
}

const Hero: React.FC<HeroProps> = ({ onAnalyze, userStats }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    setError(false);
    const success = await onAnalyze(username);
    if (!success) setError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative border-b border-github-border bg-gradient-to-b from-github-subtle to-github-bg pt-20 pb-16 overflow-hidden transition-all duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
         <div className="absolute -top-24 -right-24 w-96 h-96 bg-github-accent rounded-full blur-3xl"></div>
         <div className="absolute top-1/2 -left-24 w-72 h-72 bg-github-success rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Ribbon */}
        <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
          {HERO_BADGES.map((badge, idx) => (
            <div key={idx} className="bg-github-bg border border-github-border rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-200 cursor-default" title={badge.name}>
              {badge.icon}
            </div>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-github-header tracking-tight mb-4">
          GitHub Profile Badges <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-github-accent to-purple-400">
            & Achievements
          </span>
        </h1>
        
        <h2 className="text-xl md:text-2xl text-github-muted font-light italic mb-10">
          The Ultimate Visual Guide & Encyclopedia
        </h2>

        {/* Profile Analyzer Input */}
        <div className="max-w-md mx-auto mb-10">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-github-muted group-focus-within:text-github-accent transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Enter GitHub Username to Check Progress..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full bg-github-bg border ${error ? 'border-github-danger' : 'border-github-border'} text-github-text text-sm rounded-full py-3 pl-10 pr-28 focus:outline-none focus:border-github-accent focus:ring-1 focus:ring-github-accent transition-all shadow-sm`}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-1 top-1 bottom-1 bg-github-success hover:bg-green-600 text-white rounded-full px-4 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Analyze'}
            </button>
          </form>
          {error && <p className="text-github-danger text-xs mt-2">User not found or API limit reached.</p>}
        </div>

        {/* User Stats Card */}
        {userStats && (
          <div className="max-w-2xl mx-auto bg-github-subtle/50 backdrop-blur border border-github-border rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row items-center gap-6">
                <img src={userStats.avatarUrl} alt={userStats.username} className="w-20 h-20 rounded-full border-4 border-github-bg shadow-md" />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold text-github-header">@{userStats.username}</h3>
                  <p className="text-sm text-github-muted mb-4">Profile Insights</p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                     <div className="flex items-center gap-2 bg-github-bg border border-github-border px-3 py-1.5 rounded-md">
                       <Star size={14} className="text-yellow-400" />
                       <span className="text-sm font-bold text-github-text">{userStats.totalStars}</span>
                       <span className="text-xs text-github-muted">Stars</span>
                     </div>
                     <div className="flex items-center gap-2 bg-github-bg border border-github-border px-3 py-1.5 rounded-md">
                       <GitPullRequest size={14} className="text-blue-400" />
                       <span className="text-sm font-bold text-github-text">{userStats.mergedPRs}</span>
                       <span className="text-xs text-github-muted">Merged PRs</span>
                     </div>
                     <div className="flex items-center gap-2 bg-github-bg border border-github-border px-3 py-1.5 rounded-md">
                       <Users size={14} className="text-purple-400" />
                       <span className="text-sm font-bold text-github-text">{userStats.followers}</span>
                       <span className="text-xs text-github-muted">Followers</span>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        )}

        <div className="inline-flex items-center px-4 py-2 rounded-full bg-github-border/30 border border-github-border text-sm text-github-text">
          <span className="w-2 h-2 rounded-full bg-github-success mr-2 animate-pulse"></span>
          Last Updated: October 2023
        </div>
      </div>
    </div>
  );
};

export default Hero;