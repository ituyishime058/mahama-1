import type { Article, Podcast, Category, Stock, Innovation, StreamingContent, SubscriptionPlan, Comment, User, Language, AiTtsVoice, ServiceItem } from './types';

// Import all category icons
import AllIcon from './components/icons/AllIcon';
import GlobeIcon from './components/icons/GlobeIcon';
import PoliticsIcon from './components/icons/PoliticsIcon';
import EconomyIcon from './components/icons/EconomyIcon';
import TechnologyIcon from './components/icons/TechnologyIcon';
import SportsIcon from './components/icons/SportsIcon';
import HealthIcon from './components/icons/HealthIcon';
import HistoryIcon from './components/icons/HistoryIcon';
import CultureIcon from './components/icons/CultureIcon';
import EntertainmentIcon from './components/icons/EntertainmentIcon';
import InvestigatesIcon from './components/icons/InvestigatesIcon';
import ForYouIcon from './components/icons/ForYouIcon';
import ScienceIcon from './components/icons/ScienceIcon';
import EnvironmentIcon from './components/icons/EnvironmentIcon';
import ArtIcon from './components/icons/ArtIcon';
import MusicIcon from './components/icons/MusicIcon';
import MoviesTVIcon from './components/icons/MoviesTVIcon';

// Mock Articles
export const mockArticles: Article[] = [
  // ... (20 articles with diverse content)
  {
    id: 1,
    title: "Global Summit Addresses Climate Change with AI-Powered Solutions",
    excerpt: "Leaders from 50 nations convene to discuss groundbreaking AI models that predict climate patterns with unprecedented accuracy, promising a new era in environmental policy.",
    content: "The annual Global Climate Summit took a futuristic turn this year as world leaders and tech pioneers unveiled a suite of artificial intelligence tools designed to combat climate change. The highlight was a new generative model, dubbed 'Gaia-V', which can simulate complex climate interactions and forecast extreme weather events with over 95% accuracy up to a year in advance. This technology, developed by a consortium of research institutes, aims to provide policymakers with the critical data needed to implement proactive, region-specific environmental strategies. 'We are no longer just reacting to climate change; we are anticipating it,' said Dr. Lena Jansen, the project's lead scientist. The summit concluded with a multilateral agreement to fund the deployment of these AI systems in developing nations, a move hailed as a significant step towards global climate equity.",
    imageUrl: "https://picsum.photos/seed/climateAI/800/600",
    author: "Jane Doe",
    date: "2023-10-26",
    category: "World",
    live: true,
    region: "Global",
    sentiment: 'Positive',
    keyTakeaways: ["AI model 'Gaia-V' predicts climate patterns with high accuracy.", "Global agreement to fund AI deployment in developing nations.", "Shift from reactive to proactive climate policy."],
    hasTimeline: true,
    coordinates: { lat: 48.8566, lon: 2.3522 }, // Paris
  },
  {
    id: 2,
    title: "The Future of Urban Mobility: Flying Taxis Take to the Skies in Dubai",
    excerpt: "Dubai's skyline is buzzing with more than just drones as the city launches the world's first commercial flying taxi service, promising to cut commute times by up to 70%.",
    content: "In a landmark moment for urban transportation, Dubai's Roads and Transport Authority (RTA) has officially launched 'Sky-Pod', the first commercially available autonomous flying taxi service. The electric vertical take-off and landing (eVTOL) vehicles, designed by a leading aerospace firm, can carry up to four passengers and are initially servicing routes between Dubai International Airport and the Palm Jumeirah. The service is bookable via a dedicated app, with prices comparable to premium ride-hailing services. Officials state that the project aims to have over 100 Sky-Pods operational by 2026, integrating them with the city's metro and tram systems. While regulatory hurdles remain a challenge for widespread adoption globally, Dubai's successful launch is seen as a major proof-of-concept for the future of aerial urban mobility.",
    imageUrl: "https://picsum.photos/seed/flyingTaxi/800/600",
    author: "John Smith",
    date: "2023-10-25",
    category: "Technology",
    region: "Middle East",
    sentiment: 'Positive',
    keyTakeaways: ["Dubai launches 'Sky-Pod' flying taxi service.", "Service aims to cut commute times significantly.", "Over 100 vehicles planned by 2026."],
    coordinates: { lat: 25.2048, lon: 55.2708 }, // Dubai
  },
  // ... more articles
];

export const hiddenArticles: Article[] = [
    {
        id: 21,
        title: "Archaeologists Uncover Lost City in Amazon Rainforest Using Lidar",
        excerpt: "A forgotten metropolis, hidden for centuries under the dense Amazon canopy, has been revealed by advanced laser-scanning technology, rewriting the history of pre-Columbian civilizations.",
        content: "Researchers have mapped a vast, ancient city in the Amazon rainforest, complete with pyramids, canals, and a complex network of roads. The discovery, made possible by airborne Lidar technology, challenges previous assumptions about the scale and complexity of societies in the region before European contact. The city, believed to have been inhabited by the Casarabe culture between 500 and 1400 AD, shows a level of urban planning comparable to ancient civilizations in other parts of the world. 'This changes everything we thought we knew about the Amazon's past,' said lead archaeologist Dr. Heiko Prümers.",
        imageUrl: "https://picsum.photos/seed/amazonCity/800/600",
        author: "Maria Garcia",
        date: "2023-11-01",
        category: "Science",
        region: "Americas",
        sentiment: 'Positive',
        keyTakeaways: ["Lost city found in Amazon.", "Lidar technology was key to discovery.", "Rewrites history of pre-Columbian societies."],
        hasTimeline: true,
        coordinates: { lat: -3.4653, lon: -62.2159 } // Amazon Rainforest
    },
    // ... more hidden articles
];


// Mock Podcasts
export const mockPodcasts: Podcast[] = [
  {
    id: 1,
    title: "AI & The Human Element",
    excerpt: "In this episode, we sit down with philosopher Dr. Kenji Tanaka to discuss the implications of advanced AI on creativity, consciousness, and the future of human work.",
    imageUrl: "https://picsum.photos/seed/podcast1/400/400",
    author: "Mahama News Hub",
    duration: "45 min",
    episode: 12,
    audioUrl: "https://storage.googleapis.com/media.aistudio.dev/general/d52f689c-d143-4248-a212-325373a241e3.mp3",
  },
  // ... more podcasts
];

// Categories
export const categories: Category[] = [
    { name: "For You", icon: ForYouIcon },
    { name: "All", icon: AllIcon },
    { name: "World", icon: GlobeIcon, subcategories: ["Americas", "Europe", "Asia", "Africa", "Middle East"] },
    { name: "Politics", icon: PoliticsIcon, subcategories: ["Elections", "Policy", "Global"] },
    { name: "Economy", icon: EconomyIcon, subcategories: ["Markets", "Finance", "Business"] },
    { name: "Technology", icon: TechnologyIcon, subcategories: ["AI", "Cybersecurity", "Gadgets"] },
    { name: "Sports", icon: SportsIcon, subcategories: ["Football", "Basketball", "Gaming"] },
    { name: "Health", icon: HealthIcon, subcategories: ["Wellness", "Medical", "Mental Health"] },
    { name: "Science", icon: ScienceIcon, subcategories: ["Space", "Biotech"] },
    { name: "Environment", icon: EnvironmentIcon, subcategories: ["Climate", "Energy"] },
    { name: "Culture", icon: CultureIcon, subcategories: ["Food", "Language", "Traditions"] },
    { name: "Entertainment", icon: EntertainmentIcon, subcategories: ["Movies & TV", "Music", "Art"] },
    { name: "History", icon: HistoryIcon, subcategories: ["Ancient History", "Modern History", "African History", "Military History"] },
    { name: "Mahama Investigates", icon: InvestigatesIcon },
];

// Stock Data
export const stockData: Stock[] = [
  { symbol: 'APPL', price: 172.50, change: '+1.25', changePercent: '+0.73%' },
  { symbol: 'GOOGL', price: 135.80, change: '-0.45', changePercent: '-0.33%' },
  { symbol: 'MSFT', price: 330.10, change: '+2.80', changePercent: '+0.85%' },
  { symbol: 'AMZN', price: 130.50, change: '-1.10', changePercent: '-0.84%' },
];

// Innovation Timeline
export const innovations: Innovation[] = [
    { year: 1991, title: 'World Wide Web Invented', description: 'Tim Berners-Lee launches the first public website, changing communication forever.', icon: 'GlobeIcon' },
    { year: 1995, title: 'GPS Becomes Fully Operational', description: 'The US satellite system becomes available for civilian use, revolutionizing navigation.', icon: 'GpsIcon' },
    { year: 1998, title: 'Google Founded', description: 'Larry Page and Sergey Brin start a company that would come to dominate internet search.', icon: 'SearchIcon' },
    { year: 2003, title: 'Human Genome Project', description: 'The complete mapping of the human genome is finished, opening new doors in medicine.', icon: 'DnaIcon' },
    { year: 2004, title: 'Social Media Emerges', description: 'Facebook launches, kicking off a new era of social networking and digital identity.', icon: 'SocialIcon' },
    { year: 2007, title: 'First iPhone Released', description: 'Apple introduces the iPhone, popularizing the modern smartphone and mobile apps.', icon: 'SmartphoneIcon' },
    { year: 2012, title: 'Deep Learning Breakthrough', description: 'AlexNet wins the ImageNet competition, showcasing the power of deep neural networks.', icon: 'DataIcon' },
    { year: 2022, title: 'Generative AI Goes Mainstream', description: 'Tools like ChatGPT and Midjourney bring advanced AI capabilities to the public.', icon: 'SparklesIcon' },
];

// Streaming Content
export const mockStreamingContent: StreamingContent[] = [
  { id: 1, title: "Dune: Part Two", posterUrl: "https://image.tmdb.org/t/p/w400/8b8R8l88Qje9dn9OE8Ya0MAtlIS.jpg", trailerUrl: "https://www.youtube.com/embed/U2Qp5pL3ovA?autoplay=1", description: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.", isNew: true, genre: "Sci-Fi", rating: "PG-13", year: 2024, duration: "2h 46m", isTrending: true },
  { id: 19, title: "Furiosa: A Mad Max Saga", posterUrl: "https://image.tmdb.org/t/p/w400/iADOJ8Zymht2JPMoy3R7xceZprc.jpg", trailerUrl: "https://www.youtube.com/embed/XJMuhwVlca4?autoplay=1", description: "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus.", isNew: true, genre: "Action", rating: "R", year: 2024, duration: "2h 28m", isTrending: true, isAwardWinner: true },
  // ... more streaming content
];

// Subscription Plans
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Free",
    price: "$0",
    priceYearly: "$0",
    features: [
      "Access to all standard articles",
      "Limited AI features (Summarize, Explain)",
      "Ad-supported",
      "Standard email newsletters",
    ],
  },
  {
    name: "Premium",
    price: "$9.99",
    priceYearly: "$99.99",
    features: [
      "Everything in Free, plus:",
      "Unlimited access to all AI features",
      "Ad-free reading experience",
      "Exclusive deep-dive investigations",
      "Personalized AI audio briefings",
      "Early access to new features",
    ],
    isRecommended: true,
  },
];

// Comments
export const mockUsers: { [key: string]: Pick<User, 'id' | 'name' | 'avatar'> } = {
  'user1': { id: 'user1', name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=alex' },
  'user2': { id: 'user2', name: 'Ben Carter', avatar: 'https://i.pravatar.cc/150?u=ben' },
  // ... more users
};

export const mockComments: Comment[] = [
  {
    id: 'c1',
    user: mockUsers['user1'],
    text: "This is a fascinating development. The potential for proactive policy-making is huge, but I worry about the potential for data misuse.",
    timestamp: "2 hours ago",
    likes: 15,
    replies: [
      {
        id: 'c2',
        user: mockUsers['user2'],
        text: "I agree, the ethical framework for this needs to be just as robust as the technology itself. Transparency will be key.",
        timestamp: "1 hour ago",
        likes: 8,
        replies: [],
      },
    ],
  },
  // ... more comments
];

// Current User
export const mockCurrentUser: User = {
    id: 'current_user_123',
    name: 'Eleanor Vance',
    email: 'eleanor.v@example.com',
    avatar: 'https://i.pravatar.cc/150?u=currentuser',
    handle: 'evance',
    bio: 'Journalist and tech enthusiast. Following the intersection of AI, policy, and culture.',
    joinDate: '2023-01-15',
    isProfilePublic: true,
};

// Sponsors
export const mockSponsors = [
  {
    name: 'QuantumMetric',
    tagline: 'Innovate with Insight',
    logoUrl: 'https://companieslogo.com/img/orig/QUAN.D-2615a133.png?t=1654238128',
    imageUrl: 'https://picsum.photos/seed/sponsor1/600/400',
    website: '#',
  },
  {
    name: 'Innovate Rwanda',
    tagline: 'Powering Tomorrow\'s Solutions',
    logoUrl: 'https://www.innovaterwanda.com/images/logo-white.svg', // Placeholder
    imageUrl: 'https://picsum.photos/seed/sponsor2/600/400',
    website: '#',
  },
  {
    name: 'Aura Systems',
    tagline: 'Secure Your Digital World',
    logoUrl: 'https://logopond.com/logos/f7e098b671a5b804562529989f6bba63.png', // Placeholder
    imageUrl: 'https://picsum.photos/seed/sponsor3/600/400',
    website: '#',
  },
  {
    name: 'GreenScape',
    tagline: 'Sustainable Energy for All',
    logoUrl: 'https://cdn.dribbble.com/users/1070828/screenshots/4339474/greenscape-logo-2.jpg', // Placeholder
    imageUrl: 'https://picsum.photos/seed/sponsor4/600/400',
    website: '#',
  },
  {
    name: 'BioGen futures',
    tagline: 'Advancing Human Health',
    logoUrl: 'https://i.pinimg.com/originals/1d/2f/78/1d2f782b78a87b415b428d227976b3f7.png', // Placeholder
    imageUrl: 'https://picsum.photos/seed/sponsor5/600/400',
    website: '#',
  },
];

export const LANGUAGES: Language[] = ['English', 'French', 'Swahili', 'Kinyarwanda'];

export const LANGUAGE_VOICE_MAP: { [key: string]: AiTtsVoice } = {
  'English': 'Zephyr',
  'French': 'fr-FR-A',
  'Swahili': 'sw-KE-A',
  'Kinyarwanda': 'rw-RW-A',
};

export const TTS_VOICES: { value: AiTtsVoice; name: string }[] = [
  { value: 'Zephyr', name: 'Zephyr (English, Friendly)' },
  { value: 'Puck', name: 'Puck (English, Professional)' },
  { value: 'fr-FR-A', name: 'Amelie (French)' },
  { value: 'sw-KE-A', name: 'Asha (Swahili)' },
  { value: 'rw-RW-A', name: 'Anathalie (Kinyarwanda)' },
];

// FIX: Added mockServiceItems for use in the CampMap component.
export const mockServiceItems: ServiceItem[] = [
  { name: 'Mahama Hospital', category: 'Health', coords: { x: 25, y: 30 }, description: 'Main health facility providing emergency and general care.' },
  { name: 'Primary School 1', category: 'Education', coords: { x: 45, y: 25 } },
  { name: 'Central Market', category: 'Markets', coords: { x: 50, y: 50 } },
  { name: 'Bus Stop', category: 'Transport', coords: { x: 80, y: 55 } },
  { name: 'Vocational Training Center', category: 'Work & Skills', coords: { x: 35, y: 65 } },
  { name: 'Community Hall', category: 'Community Groups', coords: { x: 60, y: 40 } },
  { name: 'Registration Office', category: 'Official Services', coords: { x: 15, y: 15 } },
  { name: 'Police Post', category: 'Safety & Security', coords: { x: 90, y: 20 } },
];