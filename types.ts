
export interface Settings {
  theme: 'light' | 'dark';
  accentColor: 'gold' | 'deep-red';
  fontFamily: 'sans' | 'serif';
  fontSize: 'sm' | 'md' | 'lg';
  reduceMotion: boolean;
  notifications: {
    breakingNews: boolean;
    newsletter: boolean;
  };
  ai: {
    enabled: boolean;
    summaryLength: 'short' | 'medium' | 'detailed';
    ttsVoice: string;
  };
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

export interface FactCheckResult {
    status: 'Verified' | 'Mixed' | 'Unverified' | string;
    summary: string;
}

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  imageUrl: string;
  imageUrlBase64?: string; // For offline storage
  author: string;
  date: string;
  live?: boolean;
  region?: 'North America' | 'South America' | 'Europe' | 'Africa' | 'Asia' | 'Oceania' | string;
  readingTime: number;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  keyTakeaways?: string[];
  comments?: Comment[];
  factCheck?: FactCheckResult;
}

export interface Podcast extends Omit<Article, 'content' | 'live' | 'region' | 'sentiment' | 'keyTakeaways' | 'comments'> {
  episode: number;
  duration: string;
}
