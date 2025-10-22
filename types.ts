import React from 'react';

export type Language = 'English' | 'French' | 'Swahili' | 'Kinyarwanda' | 'Spanish' | 'German' | 'Portuguese';
export type Theme = 'light' | 'dark' | 'system';
export type SubscriptionTier = 'Free' | 'Premium';
export type AiTtsVoice = 'Zephyr' | 'Puck' | 'Charon' | 'Kore' | 'Fenrir';
export type ReadingLens = 'None' | 'Simplify' | 'DefineTerms';
export type ExpertPersona = 'Economist' | 'Political Analyst' | 'Sociologist' | 'Technologist' | 'Environmental Scientist';

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  imageUrl: string;
  imageUrlBase64?: string; // For offline storage
  live?: boolean;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  keyTakeaways?: string[];
  region?: string;
  coordinates?: { lat: number; lon: number };
  hasTimeline?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  handle: string;
  joinDate: string;
  bio: string;
  isProfilePublic: boolean;
}

export interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'news' | 'briefing' | 'comment' | 'mention';
}

export interface Settings {
  theme: Theme;
  fontSize: number;
  fontFamily: 'sans' | 'serif';
  aiModelPreference: 'Speed' | 'Quality';
  summaryLength: 'short' | 'medium' | 'long';
  contentPreferences: string[];
  autoTranslate: boolean;
  preferredLanguage: Language;
  showCounterpoint: boolean;
  showInnovationTimelines: boolean;
  showMahama360: boolean;
  showNewsMap: boolean;
  showDataInsights: boolean;
  showNowStreaming: boolean;
  interactiveGlossary: boolean;
  aiReadingLens: ReadingLens;
  ttsVoice: AiTtsVoice;
  aiVoicePersonality: 'Friendly' | 'Professional' | 'Witty';
  homepageLayout: 'Standard' | 'Dashboard';
  notificationPreferences: {
    breakingNews: boolean;
    dailyDigest: boolean;
    aiRecommendations: boolean;
  };
  subscriptionTier: SubscriptionTier;
  informationDensity: 'Comfortable' | 'Compact';
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
}

export interface Podcast {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  audioUrl: string;
  duration: string;
  episode: number;
}

export interface Category {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  subcategories?: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface InfographicData {
    title: string;
    items: {
        label: string;
        value: number;
    }[];
}

export interface ChatMessage {
    id: number;
    role: 'user' | 'model';
    content: string;
}

export interface AiSearchResult {
    summary: string;
    relatedArticleIds: number[];
    relatedMovieIds: number[];
    suggestedQuestions: string[];
}

export interface StreamingContent {
    id: number;
    title: string;
    description: string;
    posterUrl: string;
    trailerUrl: string;
    genre: string;
    year: number;
    rating: string;
    duration: string;
    isNew?: boolean;
    isTrending?: boolean;
    isAwardWinner?: boolean;
}

export interface AudioPlayerState {
  article: Article;
  playlist?: Article[];
  voiceOverride?: AiTtsVoice;
}

export interface WeatherData {
  locationName: string;
  temperature: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy';
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface KeyConcept {
  term: string;
  description: string;
  type: 'Person' | 'Organization' | 'Location' | 'Concept';
}

export interface TimelineEvent {
  year: string;
  description: string;
}

export interface FactCheckResult {
  status: 'Verified' | 'Mixed' | 'Unverified';
  summary: string;
  sources?: { uri: string; title: string }[];
}

export interface CommunityHighlight {
  viewpoint: string;
  summary: string;
}

export interface Comment {
  id: string;
  user: { id: string, name: string; avatar: string };
  text: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export interface SubscriptionPlan {
  name: string;
  price: string;
  priceYearly: string;
  features: string[];
  isRecommended?: boolean;
}

export interface NetworkNode {
    id: string;
    type: 'company' | 'person' | 'country';
}

export interface NetworkLink {
    source: string;
    target: string;
}

export interface ServiceItem {
  name: string;
  category: 'Health' | 'Education' | 'Markets' | 'Transport' | 'Work & Skills' | 'Community Groups' | 'Official Services' | 'Safety & Security';
  description?: string;
  coords: { x: number; y: number };
}