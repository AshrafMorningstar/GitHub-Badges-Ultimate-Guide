import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-github-subtle border-t border-github-border pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Subtle Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-github-accent/20 to-transparent"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        
        <h3 className="text-xl font-bold text-github-header mb-3">GitHub Badge Encyclopedia</h3>
        <p className="text-github-muted max-w-lg mx-auto mb-8 text-sm leading-relaxed">
          The definitive, community-curated guide to unlocking every achievement on GitHub. 
          Crafted with precision for developers, by developers.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-github-header text-github-bg hover:bg-github-text rounded-full font-medium text-sm transition-all hover:scale-105 shadow-lg shadow-github-header/10">
            <Github size={16} />
            Contribute on GitHub
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-github-bg border border-github-border hover:border-github-accent hover:text-github-accent text-github-text rounded-full font-medium text-sm transition-all hover:scale-105">
             <Heart size={16} className="text-pink-500" />
             Support the Project
          </button>
        </div>

        <div className="border-t border-github-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-github-muted font-mono">
          <p>© 2024 Badge Guide. Independent & Open Source.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            Crafted for the Community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;