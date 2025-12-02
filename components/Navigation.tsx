import React from 'react';
import { BookOpen, Trophy, Map, HelpCircle, Star } from 'lucide-react';

const NavItem: React.FC<{ icon: React.ReactNode; label: string; href: string }> = ({ icon, label, href }) => (
  <a 
    href={href} 
    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-github-text hover:text-github-accent hover:bg-github-subtle transition-colors rounded-md"
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </a>
);

const Navigation: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 bg-github-bg/80 backdrop-blur-md border-b border-github-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-center md:justify-between items-center overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-1">
             <NavItem icon={<Star size={18} />} label="Quick Start" href="#roadmap" />
             <NavItem icon={<BookOpen size={18} />} label="Understanding" href="#understanding" />
             <NavItem icon={<Trophy size={18} />} label="All Badges" href="#gallery" />
             <NavItem icon={<Map size={18} />} label="Guides" href="#guides" />
             <NavItem icon={<HelpCircle size={18} />} label="FAQ" href="#faq" />
          </div>
          <div className="hidden md:flex items-center text-xs text-github-muted font-mono">
            PRESS <kbd className="mx-1 px-1.5 py-0.5 border border-github-border rounded bg-github-subtle">CTRL</kbd> + <kbd className="mx-1 px-1.5 py-0.5 border border-github-border rounded bg-github-subtle">F</kbd> TO SEARCH
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;