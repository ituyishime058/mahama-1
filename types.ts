
export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  imageUrl: string;
  imageUrlBase64?: string;
  author: string;
  date: string;
  live?: boolean;
  region?: 'North America' | 'South America' | 'Europe' | 'Africa' | 'Asia' | 'Oceania';
  readingTime: number; // in minutes
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  keyTakeaways?: string[];
}

export interface Podcast extends Omit<Article, 'live' | 'author' | 'content'> {
  episode: number;
  duration: string;
}

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
