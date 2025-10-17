import type { Article, Podcast, Stock, User, Comment } from './types';

export const categories: string[] = [
    "World",
    "Politics",
    "Economy",
    "Technology",
    "Sports",
    "Health",
    "Culture",
    "Entertainment",
    "Movies & TV",
    "Mahama Investigates",
];

export const LANGUAGES: string[] = [
    "English", "Spanish", "French", "German", "Mandarin", "Hindi", 
    "Arabic", "Portuguese", "Bengali", "Russian", "Japanese", "Kinyarwanda",
    "Kiswahili", "Lingala", "Urdu", "Indonesian", "Dutch", "Turkish", 
    "Korean", "Vietnamese", "Italian", "Polish", "Romanian", "Greek",
    "Hungarian", "Czech", "Swedish", "Finnish", "Danish", "Norwegian",
    "Thai", "Hebrew",
];


export const mockArticles: Article[] = [
    {
        id: 1,
        title: "Global Summit Addresses Climate Change with New Bold Policies",
        excerpt: "World leaders convene to sign a landmark agreement aimed at drastically reducing carbon emissions over the next decade.",
        content: "In a historic gathering, leaders from over 100 nations have committed to a new set of aggressive policies to combat climate change. The agreement, dubbed the 'Global Climate Pact 2.0', focuses on phasing out fossil fuels, investing heavily in renewable energy, and providing financial aid to developing nations to support their green transition. The summit's host stated, 'This is a pivotal moment for humanity. We are united in our resolve to protect our planet for future generations.' Key provisions include a global carbon tax and a ban on single-use plastics by 2030. Critics, however, argue that the measures don't go far enough and lack robust enforcement mechanisms.",
        imageUrl: "https://picsum.photos/seed/picsum1/1200/800",
        author: "Jane Doe",
        date: "October 26, 2023",
        category: "World",
        live: true,
        region: 'Europe',
        sentiment: 'Positive',
        keyTakeaways: [
            "Over 100 nations signed the 'Global Climate Pact 2.0'.",
            "The pact aims to phase out fossil fuels and ban single-use plastics by 2030.",
            "A global carbon tax is a key feature of the new agreement.",
            "Developing nations will receive financial aid for green transitions."
        ]
    },
    // ... more articles
];

export const mockTrendingArticles: Article[] = mockArticles.slice(0, 5);

export const mockPodcasts: Podcast[] = [
    {
        id: 1,
        title: "The Future of AI in Journalism",
        author: "AI Insights Team",
        excerpt: "Exploring how artificial intelligence is reshaping the news industry, from automated reporting to fighting misinformation.",
        imageUrl: "https://picsum.photos/seed/podcast1/400/400",
        episode: 42,
        duration: "38 min",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    // ... more podcasts
];

export const stockData: Stock[] = [
  { symbol: 'AAPL', price: 172.50, change: '+1.25', changePercent: '+0.73%' },
  { symbol: 'GOOGL', price: 139.80, change: '-0.50', changePercent: '-0.36%' },
  { symbol: 'MSFT', price: 340.10, change: '+2.80', changePercent: '+0.83%' },
  { symbol: 'AMZN', price: 135.20, change: '-1.10', changePercent: '-0.81%' },
];

export const mockUsers = {
    currentUser: { name: "Current User", avatar: "https://i.pravatar.cc/150?u=currentUser" },
    user1: { name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?u=alex" },
    user2: { name: "Maria Garcia", avatar: "https://i.pravatar.cc/150?u=maria" },
};

export const mockComments: Comment[] = [
    {
        id: 'c1',
        user: mockUsers.user1,
        text: "This is a fantastic development! It's about time world leaders took decisive action.",
        timestamp: "2 hours ago",
        likes: 15,
        replies: [
            {
                id: 'c1_1',
                user: mockUsers.user2,
                text: "I agree, but I'm skeptical about the enforcement. We've seen promises like this before.",
                timestamp: "1 hour ago",
                likes: 8,
                replies: []
            }
        ]
    },
    // ... more comments
];

// Add more mock data as needed
// FIX: Explicitly type the array being pushed to avoid type widening issues with properties like `region`.
const moreArticles: Article[] = [
    {
        id: 2, title: "Tech Giants Announce Breakthrough in Quantum Computing", excerpt: "A new quantum processor is said to be millions of times faster than current supercomputers, promising to revolutionize fields from medicine to finance.", content: "...", imageUrl: "https://picsum.photos/seed/picsum2/1200/800", author: "John Smith", date: "October 25, 2023", category: "Technology", region: "North America", sentiment: 'Positive', keyTakeaways: []
    },
    {
        id: 3, title: "Economic Outlook: Central Banks Grapple with Inflation", excerpt: "Inflation remains a key concern for global economies, with central banks signaling further interest rate hikes.", content: "...", imageUrl: "https://picsum.photos/seed/picsum3/1200/800", author: "Emily White", date: "October 26, 2023", category: "Economy", region: "Europe", sentiment: 'Negative', keyTakeaways: []
    },
    {
        id: 4, title: "Mahama Investigates: The Hidden World of Deep-Sea Mining", excerpt: "Our special report uncovers the environmental risks and ethical dilemmas of the race to mine the ocean floor for precious metals.", content: "...", imageUrl: "https://picsum.photos/seed/picsum4/1200/800", author: "David Chen", date: "October 24, 2023", category: "Mahama Investigates", region: 'Oceania', sentiment: 'Neutral', keyTakeaways: []
    },
    {
        id: 5, title: "The Rise of 'Quiet Thriving': A New Approach to Work-Life Balance", excerpt: "Beyond 'quiet quitting,' a new movement sees employees focusing on sustainable productivity and personal well-being without sacrificing their careers.", content: "...", imageUrl: "https://picsum.photos/seed/picsum5/1200/800", author: "Sarah Adams", date: "October 23, 2023", category: "Culture", region: 'North America', sentiment: 'Positive', keyTakeaways: []
    },
];
mockArticles.push(...moreArticles);