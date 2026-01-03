/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

export type BadgeCategory = 'achievement' | 'highlight' | 'retired';
export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Tier {
  name: string;
  requirement: string;
  color: string; // Hex or tailwind class text
  filled: number; // 1-4 representation for bars
}

export interface Badge {
  id: string;
  icon: string; // Emoji or Icon component name
  name: string;
  description: string;
  category: BadgeCategory;
  howToEarn: string;
  tiers?: Tier[];
  rarity?: Rarity;
  tags?: string[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  badges: {
    id: string;
    name: string;
    description: string;
    completed?: boolean;
    autoCheckKey?: 'stars' | 'prs'; // Key for auto-checking
    autoCheckThreshold?: number;
  }[];
}

export interface GuideStep {
  text: string;
  bold?: boolean;
}

export interface Guide {
  badgeId: string;
  badgeName: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  timeEstimate: string;
  steps: GuideStep[];
  proTip: string;
}

export interface UserStats {
  username: string;
  avatarUrl: string;
  totalStars: number;
  mergedPRs: number;
  followers: number;
  isPro?: boolean; // Hard to detect, but we can placeholder
}