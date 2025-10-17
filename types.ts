export type Sentiment = 'Positive' | 'Neutral' | 'Negative';

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
    // Add other settings as needed
}

export interface StreamingContent {
  id: number;
  title: string;
  posterUrl: string;
  trailerUrl: string; // e.g., YouTube embed URL
}