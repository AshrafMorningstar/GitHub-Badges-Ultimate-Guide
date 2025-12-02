import React, { useState } from 'react';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Understanding from './components/Understanding';
import BadgeGallery from './components/BadgeGallery';
import Roadmap from './components/Roadmap';
import Guides from './components/Guides';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { UserStats } from './types';

const App: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);

  const fetchUserStats = async (username: string) => {
    try {
      // 1. Fetch User Profile
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error('User not found');
      const userData = await userRes.json();

      // 2. Fetch Repos (to count stars)
      // Note: This only fetches the first 100 public repos. For more accurate stats, we'd need pagination.
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      const reposData = await reposRes.json();
      
      let totalStars = 0;
      if (Array.isArray(reposData)) {
        totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
      }

      // 3. Fetch Merged PRs (Search API)
      const prRes = await fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr+is:merged`);
      const prData = await prRes.json();
      const mergedPRs = prData.total_count || 0;

      setUserStats({
        username: userData.login,
        avatarUrl: userData.avatar_url,
        totalStars,
        mergedPRs,
        followers: userData.followers
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div className="min-h-screen font-sans text-github-text selection:bg-github-accent/30 selection:text-white">
      <Hero onAnalyze={fetchUserStats} userStats={userStats} />
      <Navigation />
      <main>
        <Understanding />
        <BadgeGallery userStats={userStats} />
        <Roadmap userStats={userStats} />
        <Guides />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;