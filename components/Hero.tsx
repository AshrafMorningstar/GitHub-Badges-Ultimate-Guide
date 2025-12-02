import React from 'react';
import { HERO_BADGES } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="relative border-b border-github-border bg-gradient-to-b from-github-subtle to-github-bg pt-20 pb-16 overflow-hidden">
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
        
        <h2 className="text-xl md:text-2xl text-github-muted font-light italic mb-8">
          The Ultimate Visual Guide & Encyclopedia
        </h2>

        <div className="inline-flex items-center px-4 py-2 rounded-full bg-github-border/30 border border-github-border text-sm text-github-text">
          <span className="w-2 h-2 rounded-full bg-github-success mr-2 animate-pulse"></span>
          Last Updated: October 2023
        </div>
      </div>
    </div>
  );
};

export default Hero;