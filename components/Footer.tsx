import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-github-subtle border-t border-github-border pt-16 pb-8">
      <div className="container mx-auto px-6 text-center">
        
        {/* Fake Github Stats Row */}
        <div className="flex justify-center gap-2 mb-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="Maintained" />
           <img src="https://img.shields.io/badge/Built%20With-React-blue.svg" alt="Built with React" />
           <img src="https://img.shields.io/badge/Style-Premium-purple.svg" alt="Premium Style" />
        </div>

        <h3 className="text-lg font-bold text-github-header mb-2">Contributing to This Living Guide</h3>
        <p className="text-github-muted max-w-md mx-auto mb-8 text-sm">
          We're building the most beautiful badge resource together. Share your strategies, design improvements, or language translations.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-github-success hover:bg-green-700 text-white rounded-md font-medium text-sm transition-colors">
            <Github size={16} />
            Contribute on GitHub
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-github-border hover:bg-gray-700 text-github-text rounded-md font-medium text-sm transition-colors">
             <Heart size={16} className="text-pink-400" />
             Sponsor Project
          </button>
        </div>

        <div className="border-t border-github-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-github-muted">
          <p>© 2023 GitHub Badge Guide. Not affiliated with GitHub.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Designed with <span className="text-red-500">♥</span> by the Community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;