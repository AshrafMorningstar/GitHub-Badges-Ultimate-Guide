/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { GUIDES } from '../constants';
import { Clock, BarChart, Lightbulb } from 'lucide-react';

const GuideCard: React.FC<{ guide: typeof GUIDES[0] }> = ({ guide }) => {
  return (
    <div className="bg-github-bg border border-github-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-github-accent/5 transition-shadow duration-300">
      {/* Header */}
      <div className="p-6 border-b border-github-border bg-gradient-to-r from-github-subtle to-transparent">
        <h3 className="text-xl font-bold text-github-header mb-1">Earning: {guide.badgeName}</h3>
        <div className="flex gap-4 mt-3 text-xs text-github-muted font-mono uppercase tracking-wide">
          <div className="flex items-center gap-1">
             <BarChart size={14} className={guide.difficulty < 3 ? 'text-green-400' : 'text-orange-400'} />
             Diff: {guide.difficulty}/5
          </div>
          <div className="flex items-center gap-1">
             <Clock size={14} />
             {guide.timeEstimate}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="p-6">
        <h4 className="text-sm font-bold text-github-muted uppercase mb-4 tracking-wider">Strategy Execution</h4>
        <ol className="space-y-4 relative border-l border-github-border ml-2">
          {guide.steps.map((step, idx) => (
            <li key={idx} className="ml-6 relative">
              <span className="absolute -left-[31px] top-0 flex items-center justify-center w-6 h-6 rounded-full bg-github-subtle border border-github-border text-xs font-mono text-github-muted">
                {idx + 1}
              </span>
              <p className={`text-sm ${step.bold ? 'font-bold text-github-accent' : 'text-github-text'}`}>
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        {/* Pro Tip */}
        <div className="mt-8 bg-blue-900/20 border border-blue-500/20 rounded-lg p-4 flex gap-3">
          <Lightbulb className="text-blue-400 shrink-0" size={20} />
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase mb-1">Pro Tip</p>
            <p className="text-sm text-blue-100/80">{guide.proTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Guides: React.FC = () => {
  return (
    <section id="guides" className="py-16 container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-github-header mb-2">Earning Made Beautiful</h2>
        <p className="text-github-muted">Step-by-step recipes to unlock specific achievements.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {GUIDES.map((guide, idx) => (
          <GuideCard key={idx} guide={guide} />
        ))}
      </div>
    </section>
  );
};

export default Guides;