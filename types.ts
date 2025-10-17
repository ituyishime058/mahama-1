
// FIX: Removed circular import that was causing a conflict.
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

export type AiTtsVoice = 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';

export type AiVoicePersonality = 'Professional' | 'Friendly' | 'Witty';

export type ReadingLens = 'None' | 'Simplify' | 'DefineTerms';

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
    interactiveGlossary: boolean;
}

export interface StreamingContent {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string; // e.g., YouTube embed URL
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