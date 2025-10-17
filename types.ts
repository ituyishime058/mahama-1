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
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  keyTakeaways: string[];
}

export interface Podcast {
  id: number;
  title: string;
  author: string;
  excerpt: string;
  imageUrl: string;
  episode: number;
  duration: string;
  audioUrl: string;
}

export interface User {
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

export interface Stock {
  symbol: string;
  price: number;
  change: string;
  changePercent: string;
}

export type Theme = 'light' | 'dark' | 'system';
export type FontFamily = 'sans' | 'serif';
export type AiSummaryLength = 'Short' | 'Medium' | 'Detailed';
export type AiTtsVoice = 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';


export interface Settings {
    theme: Theme;
    fontSize: number;
    fontFamily: FontFamily;
    enableNotifications: boolean;
    dataSaverMode: boolean;
    language: string;
    hiddenCategories: string[];
    aiSummaryLength: AiSummaryLength;
    aiTtsVoice: AiTtsVoice;
}

export type QuizQuestion = {
    question: string;
    options: string[];
    correctAnswer: string;
};