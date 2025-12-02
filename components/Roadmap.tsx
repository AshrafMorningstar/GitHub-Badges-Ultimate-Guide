import React, { useState } from 'react';
import { ROADMAP } from '../constants';
import { CheckCircle2, Circle } from 'lucide-react';

const Roadmap: React.FC = () => {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

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
    <section id="roadmap" className="py-16 bg-github-subtle border-y border-github-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Header & Stats */}
          <div className="md:col-span-1">
             <div className="sticky top-24">
                <h2 className="text-3xl font-bold text-github-header mb-6">Your Achievement<br/>Roadmap</h2>
                <p className="text-github-muted mb-8 text-sm leading-relaxed">
                  A strategic path to earning your first set of badges. Follow this guide to jumpstart your profile presence.
                </p>

                <div className="bg-github-bg border border-github-border rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-semibold text-github-text">Overall Progress</span>
                    <span className="text-2xl font-mono font-bold text-github-accent">{progress}%</span>
                  </div>
                  <div className="w-full bg-github-border rounded-full h-2.5 mb-2">
                    <div className="bg-github-success h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="text-xs text-github-muted text-right">
                    {completedCount} of {totalBadges} Completed
                  </div>
                </div>
             </div>
          </div>

          {/* Timeline */}
          <div className="md:col-span-2 space-y-10">
            {ROADMAP.map((phase) => (
              <div key={phase.id} className="relative pl-8 border-l-2 border-github-border">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-github-bg border-2 border-github-accent"></span>
                
                <h3 className="text-xl font-bold text-github-header mb-6">{phase.title}</h3>
                
                <div className="grid gap-4">
                  {phase.badges.map((badge) => {
                    const isCompleted = completed.has(badge.id);
                    return (
                      <div 
                        key={badge.id} 
                        onClick={() => toggleBadge(badge.id)}
                        className={`group cursor-pointer p-4 rounded-lg border transition-all duration-200 flex items-center gap-4
                          ${isCompleted 
                            ? 'bg-github-success/10 border-github-success/30' 
                            : 'bg-github-bg border-github-border hover:border-github-muted'}`}
                      >
                        <div className={`transition-colors ${isCompleted ? 'text-github-success' : 'text-github-muted group-hover:text-github-text'}`}>
                          {isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </div>
                        <div>
                          <h4 className={`font-bold ${isCompleted ? 'text-github-success' : 'text-github-text'}`}>
                            {badge.name}
                          </h4>
                          <p className="text-sm text-github-muted">{badge.description}</p>
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