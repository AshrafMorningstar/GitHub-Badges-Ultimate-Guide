import React from 'react';
import { Medal, Star } from 'lucide-react';

const Understanding: React.FC = () => {
  return (
    <section id="understanding" className="py-16 container mx-auto px-6">
      <div className="mb-10 text-center">
         <h2 className="text-3xl font-bold text-github-header mb-2">Understanding the System</h2>
         <div className="w-16 h-1 bg-github-accent mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Achievements Card */}
        <div className="group bg-github-subtle border border-github-border rounded-xl p-8 hover:border-github-accent transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Medal size={120} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-github-purple/20 p-3 rounded-lg text-github-purple">
              <Medal size={24} />
            </div>
            <h3 className="text-xl font-bold text-github-header">Achievements</h3>
          </div>
          <ul className="space-y-4 text-github-text">
            <li className="flex items-start gap-3">
              <span className="text-github-success mt-1">✓</span>
              <span>Automatically earned through activity</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-github-success mt-1">✓</span>
              <span>Have <b>tiered progression</b> (Bronze → Gold)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-github-success mt-1">✓</span>
              <span>Appear in the "Achievements" section</span>
            </li>
          </ul>
        </div>

        {/* Highlights Card */}
        <div className="group bg-github-subtle border border-github-border rounded-xl p-8 hover:border-github-accent transition-colors relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Star size={120} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-400/20 p-3 rounded-lg text-yellow-400">
              <Star size={24} />
            </div>
            <h3 className="text-xl font-bold text-github-header">Highlights</h3>
          </div>
          <ul className="space-y-4 text-github-text">
            <li className="flex items-start gap-3">
              <span className="text-github-success mt-1">✓</span>
              <span>Indicate status or program membership</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-github-success mt-1">✓</span>
              <span>Often require manual verification or payment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-github-success mt-1">✓</span>
              <span>Appear in the "Highlights" sidebar</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Understanding;