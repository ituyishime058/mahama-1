export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

export interface TimelineEvent {
  year: string;
  description: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageUrlBase64?: string; // For offline storage
  author: string;
  date: string;
  category: string;
  live?: boolean;
  region?: 'North America' | 'South America' | 'Europe' | 'Africa' | 'Asia' | 'Oceania';
  keyTakeaways: string[];
  sentiment?: Sentiment;
  hasTimeline?: boolean;
}

export interface AudioPlayerState {
    article: Article;
    playlist: Article[];
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

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

export type AiSummaryLength = 'Short' | 'Medium' | 'Detailed';

export type AiTtsVoice = 
  // Pre-built Google Voices
  | 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr'
  // English (US)
  | 'en-US-A' | 'en-US-B' | 'en-US-C' | 'en-US-D' | 'en-US-E' | 'en-US-F'
  // English (UK)
  | 'en-GB-A' | 'en-GB-B' | 'en-GB-C' | 'en-GB-D' | 'en-GB-F'
  // French
  | 'fr-FR-A' | 'fr-FR-B' | 'fr-FR-C' | 'fr-FR-D' | 'fr-FR-E'
  // Spanish
  | 'es-ES-A' | 'es-ES-B' | 'es-ES-C' | 'es-ES-D' | 'es-ES-E'
  // German
  | 'de-DE-A' | 'de-DE-B' | 'de-DE-C' | 'de-DE-D' | 'de-DE-E'
  // Japanese
  | 'ja-JP-A' | 'ja-JP-B' | 'ja-JP-C' | 'ja-JP-D'
  // Russian
  | 'ru-RU-A' | 'ru-RU-B' | 'ru-RU-C' | 'ru-RU-D' | 'ru-RU-E'
  // Mandarin Chinese
  | 'cmn-CN-A' | 'cmn-CN-B' | 'cmn-CN-C' | 'cmn-CN-D'
  // Kinyarwanda (mock)
  | 'rw-RW-A' | 'rw-RW-B'
  // Swahili (mock)
  | 'sw-KE-A' | 'sw-KE-B'
  // Other diverse voices
  | 'ar-XA-A' | 'ar-XA-B' | 'it-IT-A' | 'it-IT-B' | 'ko-KR-A' | 'ko-KR-B';


export type AiVoicePersonality = 'Professional' | 'Friendly' | 'Witty';

export type ReadingLens = 'None' | 'Simplify' | 'DefineTerms';

export type AIModelPreference = 'Speed' | 'Quality';

export type SubscriptionTier = 'Free' | 'Premium';

export interface SubscriptionPlan {
  name: SubscriptionTier;
  price: string;
  priceYearly: string;
  features: string[];
  isCurrent?: boolean;
  isRecommended?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
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

export interface Settings {
    theme: 'light' | 'dark' | 'system';
    fontFamily: 'sans' | 'serif';
    fontSize: number;
    showInnovationTimelines: boolean;
    showNowStreaming: boolean;
    homepageLayout: 'Standard' | 'Dashboard';
    summaryLength: AiSummaryLength;
    ttsVoice: AiTtsVoice;
    contentPreferences: string[];
    preferredLanguage: string;
    showCounterpoint: boolean;
    autoTranslate: boolean;
    aiVoicePersonality: AiVoicePersonality;
    notificationPreferences: {
        breakingNews: boolean;
        dailyDigest: boolean;
        aiRecommendations: boolean;
    };
    aiReadingLens: ReadingLens;
    aiModelPreference: AIModelPreference;
    interactiveGlossary: boolean;
    subscriptionTier: SubscriptionTier;
}

export interface StreamingContent {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string; // e.g., YouTube embed URL
  description: string;
  isNew?: boolean;
}

export type ExpertPersona = 'Economist' | 'Political Analyst' | 'Sociologist' | 'Technologist' | 'Environmental Scientist';

export interface KeyConcept {
  term: string;
  type: 'Person' | 'Organization' | 'Location' | 'Concept';
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}