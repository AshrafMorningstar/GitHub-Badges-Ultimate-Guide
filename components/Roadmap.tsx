/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState, useEffect } from 'react';
import { ROADMAP } from '../constants';
import { UserStats } from '../types';
import { CheckCircle2, Circle, Lock } from 'lucide-react';

interface RoadmapProps {
  userStats: UserStats | null;
}

const Roadmap: React.FC<RoadmapProps> = ({ userStats }) => {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  // Auto-check badges based on userStats
  useEffect(() => {
    if (userStats) {
      const newSet = new Set(completed);
      ROADMAP.forEach(phase => {
        phase.badges.forEach(badge => {
          if (badge.autoCheckKey === 'stars' && badge.autoCheckThreshold) {
            if (userStats.totalStars >= badge.autoCheckThreshold) {
              newSet.add(badge.id);
            }
          }
          if (badge.autoCheckKey === 'prs' && badge.autoCheckThreshold) {
            if (userStats.mergedPRs >= badge.autoCheckThreshold) {
              newSet.add(badge.id);
            }
          }
        });
      });
      setCompleted(newSet);
    }
  }, [userStats]);

  const toggleBadge = (id: string) => {
    const newSet = new Set(completed);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setCompleted(newSet);
  };

  const totalBadges = ROADMAP.reduce((acc, curr) => acc + curr.badges.length, 0);
  const completedCount = completed.size;
  const progress = Math.round((completedCount / totalBadges) * 100);

  return (
    <section id="roadmap" className="py-20 bg-github-subtle/50 border-y border-github-border backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Header & Stats */}
          <div className="md:col-span-1">
             <div className="sticky top-24">
                <h2 className="text-3xl font-bold text-github-header mb-6">Your Achievement<br/>Roadmap</h2>
                <p className="text-github-muted mb-8 text-sm leading-relaxed">
                  A strategic path to earning your first set of badges. 
                  {userStats && <span className="text-github-success block mt-2 font-medium">✨ Synced with @{userStats.username}</span>}
                </p>

                <div className="bg-github-bg border border-github-border rounded-xl p-6 shadow-xl shadow-black/5">
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-sm font-semibold text-github-text">Overall Progress</span>
                    <span className="text-2xl font-mono font-bold text-github-accent">{progress}%</span>
                  </div>
                  <div className="w-full bg-github-border/30 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-github-success to-emerald-400 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="text-xs text-github-muted text-right">
                    {completedCount} of {totalBadges} Completed
                  </div>
                </div>
             </div>
          </div>

          {/* Timeline */}
          <div className="md:col-span-2 space-y-12">
            {ROADMAP.map((phase) => (
              <div key={phase.id} className="relative pl-8 border-l-2 border-github-border/60">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-github-bg border-2 border-github-accent shadow-[0_0_10px_rgba(9,105,218,0.3)]"></span>
                
                <h3 className="text-xl font-bold text-github-header mb-6">{phase.title}</h3>
                
                <div className="grid gap-4">
                  {phase.badges.map((badge) => {
                    const isCompleted = completed.has(badge.id);
                    const isAutoChecked = userStats && (
                      (badge.autoCheckKey === 'stars' && userStats.totalStars >= (badge.autoCheckThreshold || 0)) ||
                      (badge.autoCheckKey === 'prs' && userStats.mergedPRs >= (badge.autoCheckThreshold || 0))
                    );

                    return (
                      <div 
                        key={badge.id} 
                        onClick={() => toggleBadge(badge.id)}
                        className={`group cursor-pointer p-5 rounded-xl border transition-all duration-300 flex items-center gap-5
                          ${isCompleted 
                            ? 'bg-github-success/5 border-github-success/20' 
                            : 'bg-github-bg border-github-border hover:border-github-accent/40 hover:shadow-lg hover:shadow-github-accent/5 hover:scale-[1.01] hover:-translate-y-0.5'}`}
                      >
                        <div className={`transition-colors duration-300 ${isCompleted ? 'text-github-success' : 'text-github-muted group-hover:text-github-text'}`}>
                          {isCompleted ? <CheckCircle2 size={24} className="drop-shadow-sm" /> : <Circle size={24} />}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold flex items-center gap-2 text-base transition-colors ${isCompleted ? 'text-github-success' : 'text-github-text group-hover:text-github-accent'}`}>
                            {badge.name}
                            {isAutoChecked && <span className="text-[10px] bg-github-success text-white px-2 py-0.5 rounded-full uppercase tracking-wide font-bold shadow-sm">Verified</span>}
                          </h4>
                          <p className="text-sm text-github-muted mt-1">{badge.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;