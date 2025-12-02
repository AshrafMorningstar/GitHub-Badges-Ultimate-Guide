import React from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Understanding from './components/Understanding';
import BadgeGallery from './components/BadgeGallery';
import Roadmap from './components/Roadmap';
import Guides from './components/Guides';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans text-github-text selection:bg-github-accent/30 selection:text-white">
      <Hero />
      <Navigation />
      <main>
        <Understanding />
        <BadgeGallery />
        <Roadmap />
        <Guides />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;