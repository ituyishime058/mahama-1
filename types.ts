
import React from 'react';

export type Language = 'English' | 'French' | 'Swahili' | 'Kinyarwanda';

export type AiTtsVoice = 'Zephyr' | 'Puck' | 'fr-FR-A' | 'sw-KE-A' | 'rw-RW-A' | string;

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
  live?: boolean;
  region: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  keyTakeaways: string[];
  hasTimeline?: boolean;
  coordinates?: { lat: number; lon: number };
  imageUrlBase64?: string; // For offline storage
}

export interface Podcast {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  duration: string;
  episode: number;
  audioUrl: string;
}

export interface Category {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  subcategories?: string[];
}

export interface Stock {
  symbol: string;
  price: number;
  change: string;
  changePercent: string;
}

export interface Innovation {
  year: number;
  title: string;
  description: string;
  icon: string;
}

export interface StreamingContent {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string;
  description: string;
  isNew: boolean;
  genre: string;
  rating: string;
  year: number;
  duration: string;
  isTrending: boolean;
  isAwardWinner?: boolean;
}

export interface SubscriptionPlan {
  name: string;
  price: string;
  priceYearly: string;
  features: string[];
  isRecommended?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  handle: string;
  bio: string;
  joinDate: string;
  isProfilePublic: boolean;
}

export interface Comment {
  id: string;
  user: Pick<User, 'id' | 'name' | 'avatar'>;
  text: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'news' | 'briefing' | 'comment' | 'mention';
}

export type SubscriptionTier = 'Free' | 'Premium';

export type Theme = 'light' | 'dark' | 'system';
export type FontFamily = 'sans' | 'serif';
export type AiModelPreference = 'Speed' | 'Quality';
export type SummaryLength = 'short' | 'medium' | 'long';
export type ReadingLens = 'None' | 'Simplify' | 'DefineTerms';
export type AiVoicePersonality = 'Friendly' | 'Professional' | 'Witty';
export type HomepageLayout = 'Standard' | 'Dashboard';
export type InformationDensity = 'Comfortable' | 'Compact';

export interface Settings {
    theme: Theme;
    fontSize: number;
    fontFamily: FontFamily;
    aiModelPreference: AiModelPreference;
    summaryLength: SummaryLength;
    contentPreferences: string[];
    autoTranslate: boolean;
    preferredLanguage: Language;
    showCounterpoint: boolean;
    showInnovationTimelines: boolean;
    showKirehe360: boolean;
    showNewsMap: boolean;
    showDataInsights: boolean;
    showNowStreaming: boolean;
    interactiveGlossary: boolean;
    aiReadingLens: ReadingLens;
    ttsVoice: AiTtsVoice;
    aiVoicePersonality: AiVoicePersonality;
    homepageLayout: HomepageLayout;
    notificationPreferences: {
        breakingNews: boolean;
        dailyDigest: boolean;
        aiRecommendations: boolean;
    };
    subscriptionTier: SubscriptionTier;
    informationDensity: InformationDensity;
    highContrast?: boolean;
    reduceMotion?: boolean;
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

export interface AiSearchResult {
    summary?: string;
    relatedArticleIds?: number[];
    relatedMovieIds?: number[];
    suggestedQuestions: string[];
}

export interface FactCheckResult {
  status: 'Verified' | 'Mixed' | 'Unverified';
  summary: string;
  sources?: { uri: string; title: string }[];
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'model';
  content: string;
}

export type ExpertPersona = 'Economist' | 'Political Analyst' | 'Sociologist' | 'Technologist' | 'Environmental Scientist';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface InfographicData {
  title: string;
  items: { label: string; value: number }[];
}

export interface NetworkNode {
    id: string;
    type: 'company' | 'person' | 'country';
}

export interface NetworkLink {
    source: string;
    target: string;
}

export interface AudioPlayerState {
    article: Article;
    playlist?: Article[];
    voiceOverride?: AiTtsVoice;
}

export interface CommunityHighlight {
  viewpoint: string;
  summary: string;
}