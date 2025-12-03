import { Badge, RoadmapItem, Guide } from './types';
import { Trophy, Star, Zap, GitPullRequest, Users, Shield, Heart, Radio, Box } from 'lucide-react';

export const HERO_BADGES = [
  { icon: <Zap size={32} className="text-yellow-600 dark:text-yellow-400" />, name: "Quickdraw" },
  { icon: <Star size={32} className="text-yellow-500 dark:text-yellow-200" />, name: "Starstruck" },
  { icon: <GitPullRequest size={32} className="text-blue-600 dark:text-blue-400" />, name: "Pull Shark" },
  { icon: <Heart size={32} className="text-pink-600 dark:text-pink-400" />, name: "Sponsor" },
  { icon: <Radio size={32} className="text-red-600 dark:text-red-500" />, name: "Mars 2020" },
];

export const BADGES: Badge[] = [
  {
    id: 'starstruck',
    icon: '⭐',
    name: 'Starstruck',
    description: 'Your repository gains traction',
    category: 'achievement',
    rarity: 'Common',
    howToEarn: 'Receive stars on a repository you own',
    tiers: [
      { name: 'Base', requirement: '16 Stars', color: 'text-github-muted', filled: 1 },
      { name: 'Bronze', requirement: '128 Stars', color: 'text-orange-600 dark:text-orange-300', filled: 2 },
      { name: 'Silver', requirement: '512 Stars', color: 'text-slate-500 dark:text-gray-300', filled: 3 },
      { name: 'Gold', requirement: '4096 Stars', color: 'text-yellow-600 dark:text-yellow-400', filled: 4 },
    ]
  },
  {
    id: 'quickdraw',
    icon: '⚡',
    name: 'Quickdraw',
    description: 'Lightning-fast responses',
    category: 'achievement',
    rarity: 'Rare',
    howToEarn: 'Close an issue or PR within 5 minutes of opening',
    tiers: [
      { name: 'One-time', requirement: 'Close within 5m', color: 'text-yellow-600 dark:text-yellow-400', filled: 4 },
    ]
  },
  {
    id: 'pullshark',
    icon: '🦈',
    name: 'Pull Shark',
    description: 'Merging pull requests',
    category: 'achievement',
    rarity: 'Common',
    howToEarn: 'Have your Pull Requests merged into repositories',
    tiers: [
      { name: 'Base', requirement: '2 PRs', color: 'text-github-muted', filled: 1 },
      { name: 'Bronze', requirement: '16 PRs', color: 'text-orange-600 dark:text-orange-300', filled: 2 },
      { name: 'Silver', requirement: '128 PRs', color: 'text-slate-500 dark:text-gray-300', filled: 3 },
      { name: 'Gold', requirement: '1024 PRs', color: 'text-yellow-600 dark:text-yellow-400', filled: 4 },
    ]
  },
  {
    id: 'galaxybrain',
    icon: '🧠',
    name: 'Galaxy Brain',
    description: 'Answering discussions',
    category: 'achievement',
    rarity: 'Rare',
    howToEarn: 'Have your answers accepted in GitHub Discussions',
    tiers: [
      { name: 'Base', requirement: '2 Answers', color: 'text-github-muted', filled: 1 },
      { name: 'Bronze', requirement: '8 Answers', color: 'text-orange-600 dark:text-orange-300', filled: 2 },
      { name: 'Silver', requirement: '16 Answers', color: 'text-slate-500 dark:text-gray-300', filled: 3 },
      { name: 'Gold', requirement: '32 Answers', color: 'text-yellow-600 dark:text-yellow-400', filled: 4 },
    ]
  },
  {
    id: 'yolo',
    icon: '🚀',
    name: 'YOLO',
    description: 'Living dangerously',
    category: 'achievement',
    rarity: 'Epic',
    howToEarn: 'Merge a Pull Request without code review (admin override)',
    tiers: [
        { name: 'One-time', requirement: 'Merge without review', color: 'text-green-600 dark:text-green-400', filled: 4 },
    ]
  },
  {
    id: 'publicsponsor',
    icon: '💖',
    name: 'GitHub Sponsor',
    description: 'Supporting open source',
    category: 'highlight',
    rarity: 'Epic',
    howToEarn: 'Sponsor an open source developer or organization via GitHub Sponsors',
  },
  {
    id: 'pro',
    icon: '🌟',
    name: 'GitHub Pro',
    description: 'Premium member',
    category: 'highlight',
    rarity: 'Common',
    howToEarn: 'Subscribe to GitHub Pro plan',
  },
  {
    id: 'arctic',
    icon: '❄️',
    name: 'Arctic Code Vault',
    description: 'Code preserved for eternity',
    category: 'retired',
    rarity: 'Legendary',
    howToEarn: 'Contributed code to a repository included in the 2020 Snapshot',
  }
];

export const ROADMAP: RoadmapItem[] = [
  {
    id: 'week1',
    title: 'Beginner Quest (First Week)',
    badges: [
      { id: 'starstruck_base', name: 'Starstruck', description: 'Get 16 stars on a repo', autoCheckKey: 'stars', autoCheckThreshold: 16 },
      { id: 'quickdraw', name: 'Quickdraw', description: 'Close issue in 5 min' },
      { id: 'pair', name: 'Pair Extraordinaire', description: 'Co-author a commit' },
    ]
  },
  {
    id: 'month1',
    title: 'Community Builder (First Month)',
    badges: [
      { id: 'pullshark_base', name: 'Pull Shark', description: 'Get 2 PRs merged', autoCheckKey: 'prs', autoCheckThreshold: 2 },
      { id: 'galaxy_base', name: 'Galaxy Brain', description: 'Answer a discussion' },
      { id: 'yolo', name: 'YOLO', description: 'Merge without review' },
    ]
  },
   {
    id: 'expert',
    title: 'Expert Tier',
    badges: [
      { id: 'starstruck_bronze', name: 'Starstruck Bronze', description: 'Get 128 stars', autoCheckKey: 'stars', autoCheckThreshold: 128 },
      { id: 'pullshark_bronze', name: 'Pull Shark Bronze', description: 'Get 16 PRs merged', autoCheckKey: 'prs', autoCheckThreshold: 16 },
    ]
  }
];

export const GUIDES: Guide[] = [
  {
    badgeId: 'quickdraw',
    badgeName: 'Quickdraw',
    difficulty: 1,
    timeEstimate: '10 minutes',
    steps: [
      { text: 'Find a simple issue or create one in your own test repository.' },
      { text: 'Prepare your fix or comment locally/mentally before taking action.' },
      { text: 'Submit your PR/Issue and immediately close it within 5 minutes.' },
      { text: 'Badge unlocked!', bold: true }
    ],
    proTip: 'You can earn this in your own private repository by opening an issue and closing it instantly.'
  },
  {
    badgeId: 'pair',
    badgeName: 'Pair Extraordinaire',
    difficulty: 2,
    timeEstimate: '15 minutes',
    steps: [
      { text: 'Collaborate with a friend on a commit.' },
      { text: 'Add "Co-authored-by: Name <email>" to the bottom of the commit message.' },
      { text: 'Push the commit to GitHub.' },
      { text: 'Badge unlocked!', bold: true }
    ],
    proTip: 'The email address must match the one associated with their GitHub account.'
  }
];

export const FAQS = [
  {
    q: "Can I hide achievements from my profile?",
    a: "Yes! Go to your profile settings → 'Achievements' section → toggle visibility settings to hide specific badges or the entire section."
  },
  {
    q: "Do private repository contributions count?",
    a: "It depends on the badge. 'Quickdraw' and 'YOLO' can be earned in private repos, while 'Starstruck' obviously needs public visibility to gain stars."
  },
  {
    q: "How often are badges updated?",
    a: "Achievements are typically awarded within minutes of the action, but sometimes can take up to 24 hours to appear on your profile."
  }
];