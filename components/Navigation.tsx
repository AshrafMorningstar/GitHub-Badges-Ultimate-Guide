import React from 'react';
import { BookOpen, Trophy, Map, HelpCircle, Star, Sun, Moon, Search } from 'lucide-react';

interface NavigationProps {
  theme: string;
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; href: string }> = ({ icon, label, href }) => (
  <a 
    href={href} 
    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-github-text hover:text-github-accent hover:bg-github-subtle transition-colors rounded-md whitespace-nowrap"
  >
    {icon}
    <span className="hidden md:inline">{label}</span>
  </a>
);

const Navigation: React.FC<NavigationProps> = ({ theme, toggleTheme, searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 bg-github-bg/80 backdrop-blur-md border-b border-github-border transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Overflow Scroll Container */}
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1 flex-1 md:flex-none mr-4">
             <NavItem icon={<Star size={18} />} label="Quick Start" href="#roadmap" />
             <NavItem icon={<Trophy size={18} />} label="Badges" href="#gallery" />
             <NavItem icon={<Map size={18} />} label="Guides" href="#guides" />
             <NavItem icon={<HelpCircle size={18} />} label="FAQ" href="#faq" />
          </div>
          
          <div className="flex items-center gap-3 pl-4 border-l border-github-border ml-auto">
            {/* Search Bar */}
            <div className="hidden md:flex relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-github-muted group-focus-within:text-github-accent">
                <Search size={14} />
              </div>
              <input
                type="text"
                placeholder="Search badges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-github-subtle border border-github-border text-github-text text-xs rounded-md py-1.5 pl-9 pr-4 focus:outline-none focus:border-github-accent focus:ring-1 focus:ring-github-accent transition-all w-48"
              />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-github-text hover:bg-github-subtle hover:text-github-accent transition-colors focus:outline-none focus:ring-2 focus:ring-github-accent"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;