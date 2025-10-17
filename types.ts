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
}

export interface Podcast extends Omit<Article, 'live' | 'author' | 'content'> {
  episode: number;
  duration: string;
}
