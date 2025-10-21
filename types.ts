import React from 'react';

export type Article = {
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
  imageUrlBase64?: string;
  tags?: string[];
  coordinates?: { lat: number; lon: number };
};

export type Category = {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  subcategories?: string[];
};

export type Podcast = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  duration: string;
  episode: number;
  audioUrl: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  handle: string;
  bio: string;
  joinDate: string;
  isProfilePublic: boolean;
};

export type Comment = {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
};

export type Stock = {
  symbol: string;
  price: number;
  change: string;
  changePercent: string;
};

export type Innovation = {
  year: number;
  title: string;
  description: string;
  icon: string;
};

export type StreamingContent = {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string;
  description: string;
  isNew?: boolean;
  genre: 'Sci-Fi' | 'Drama' | 'Action' | 'Thriller' | 'Animation' | 'Comedy' | 'History';
  rating: string;
  year: number;
  duration: string;
  isTrending?: boolean;
  isAwardWinner?: boolean;
};

export type SubscriptionPlan = {
  name: string;
  price: string;
  priceYearly: string;
  features: string[];
  isRecommended?: boolean;
};

export type AiTtsVoice = 'Zephyr' | 'Puck' | 'Charon' | 'Kore' | 'Fenrir' | 'en-US-A' | 'en-US-B' | 'en-US-C' | 'en-US-D' | 'en-US-E' | 'en-US-F' | 'en-GB-A' | 'en-GB-B' | 'en-GB-C' | 'en-GB-D' | 'en-GB-F' | 'fr-FR-A' | 'fr-FR-B' | 'fr-FR-C' | 'fr-FR-D' | 'fr-FR-E' | 'es-ES-A' | 'es-ES-B' | 'es-ES-C' | 'es-ES-D' | 'de-DE-A' | 'de-DE-B' | 'de-DE-C' | 'de-DE-D' | 'ja-JP-A' | 'ja-JP-B' | 'ja-JP-C' | 'ja-JP-D' | 'ru-RU-A' | 'ru-RU-B' | 'ru-RU-C' | 'ru-RU-D' | 'cmn-CN-A' | 'cmn-CN-B' | 'cmn-CN-C' | 'rw-RW-A' | 'rw-RW-B' | 'sw-KE-A' | 'sw-KE-B' | 'ar-XA-A' | 'ar-XA-B' | 'it-IT-A' | 'it-IT-B' | 'ko-KR-A' | 'ko-KR-B';

export type AiSummaryLength = 'short' | 'medium' | 'long';
export type AiModelPreference = 'Speed' | 'Quality';
export type Theme = 'light' | 'dark' | 'system';
export type FontFamily = 'sans' | 'serif';
export type HomepageLayout = 'Standard' | 'Dashboard';
export type ReadingLens = 'None' | 'Simplify' | 'DefineTerms';
export type SubscriptionTier = 'Free' | 'Premium';
export type AiVoicePersonality = 'Friendly' | 'Professional' | 'Witty';

export interface Settings {
    theme: Theme;
    fontSize: number;
    fontFamily: FontFamily;
    aiModelPreference: AiModelPreference;
    summaryLength: AiSummaryLength;
    contentPreferences: string[];
    autoTranslate: boolean;
    preferredLanguage: string;
    showCounterpoint: boolean;
    showInnovationTimelines: boolean;
    showMahama360: boolean;
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
    informationDensity: 'Comfortable' | 'Compact';
}

export type TimelineEvent = {
    year: string;
    description: string;
};

export type KeyConcept = {
    term: string;
    description: string;
    type: 'Person' | 'Location' | 'Organization' | 'Concept';
};

export type CommunityHighlight = {
    viewpoint: string;
    summary: string;
};

export type ChatMessage = {
    role: 'user' | 'model';
    content: string;
};

export type QuizQuestion = {
    question: string;
    options: string[];
    correctAnswer: string;
};

export type ExpertPersona = 'Economist' | 'Political Analyst' | 'Sociologist' | 'Technologist' | 'Environmental Scientist';

export type AudioPlayerState = {
    article: Article;
    playlist?: Article[];
    voiceOverride?: AiTtsVoice;
};

export type InfographicData = {
  title: string;
  items: { label: string; value: number }[];
};

export type WeatherData = {
    locationName: string;
    temperature: number;
    condition: 'Sunny' | 'Cloudy' | 'Rainy';
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

export type AiSearchResult = {
  summary: string;
  relatedArticleIds: number[];
  suggestedQuestions: string[];
};