// FIX: Import the 'Language' type to resolve type errors.
import type { Article, Podcast, Category, User, StreamingContent, AiTtsVoice, SubscriptionPlan, ServiceItem, Comment, Language } from './types';

// Icons
import AllIcon from './components/icons/AllIcon';
import GlobeIcon from './components/icons/GlobeIcon';
import PoliticsIcon from './components/icons/PoliticsIcon';
import EconomyIcon from './components/icons/EconomyIcon';
import TechnologyIcon from './components/icons/TechnologyIcon';
import SportsIcon from './components/icons/SportsIcon';
import HealthIcon from './components/icons/HealthIcon';
import ForYouIcon from './components/icons/ForYouIcon';
import ScienceIcon from './components/icons/ScienceIcon';
import EnvironmentIcon from './components/icons/EnvironmentIcon';
import CultureIcon from './components/icons/CultureIcon';
import EntertainmentIcon from './components/icons/EntertainmentIcon';
import HistoryIcon from './components/icons/HistoryIcon';
import InvestigatesIcon from './components/icons/InvestigatesIcon';
import ArtIcon from './components/icons/ArtIcon';
import MusicIcon from './components/icons/MusicIcon';
import MoviesTVIcon from './components/icons/MoviesTVIcon';

export const categories: Category[] = [
  { name: 'For You', icon: ForYouIcon },
  { name: 'All', icon: AllIcon },
  { name: 'World', icon: GlobeIcon, subcategories: ['Americas', 'Europe', 'Asia', 'Africa', 'Middle East'] },
  { name: 'Politics', icon: PoliticsIcon, subcategories: ['Elections', 'Policy', 'Global'] },
  { name: 'Economy', icon: EconomyIcon, subcategories: ['Markets', 'Finance', 'Business'] },
  { name: 'Technology', icon: TechnologyIcon, subcategories: ['AI', 'Cybersecurity', 'Gadgets'] },
  { name: 'Sports', icon: SportsIcon, subcategories: ['Football', 'Basketball', 'Gaming'] },
  { name: 'Health', icon: HealthIcon, subcategories: ['Wellness', 'Medical', 'Mental Health'] },
  { name: 'Science', icon: ScienceIcon, subcategories: ['Space', 'Biotech', 'Energy'] },
  { name: 'Environment', icon: EnvironmentIcon },
  { name: 'Culture', icon: CultureIcon, subcategories: ['Food', 'Language', 'Traditions'] },
  { name: 'Entertainment', icon: EntertainmentIcon, subcategories: ['Movies & TV', 'Art', 'Music'] },
  { name: 'History', icon: HistoryIcon, subcategories: ['Ancient History', 'Modern History', 'African History', 'Military History'] },
  { name: 'Mahama Investigates', icon: InvestigatesIcon },
];

export const mockArticles: Article[] = [
  {
    id: 1,
    title: 'Global Summit Tackles Climate Change Amidst Rising Tensions',
    excerpt: 'Leaders from around the world convened today to address the urgent climate crisis, but geopolitical friction threatens to undermine progress.',
    content: 'The much-anticipated Global Climate Summit kicked off in Geneva this morning, with over 100 world leaders in attendance. The opening address by UN Secretary-General António Guterres was a stark reminder of the stakes. "Humanity is on thin ice — and that ice is melting fast," he warned, urging immediate and drastic action to cut greenhouse gas emissions. However, the summit\'s ambitious goals are already facing headwinds. Tensions between major economic powers, particularly the United States and China, over trade and technology have spilled into the climate negotiations. Diplomats are working behind the scenes to find common ground, but sources say a comprehensive agreement is far from certain. The summit is expected to focus on finalizing rules for international carbon markets and scaling up financing for developing nations to adapt to climate impacts.',
    author: 'Elena Petrova',
    date: '2023-10-26',
    category: 'World',
    imageUrl: 'https://picsum.photos/seed/picsum1/800/600',
    live: true,
    sentiment: 'Negative',
    hasTimeline: true,
    coordinates: { lat: 46.2044, lon: 6.1432 }
  },
  { id: 2, title: "Breakthrough in Fusion Energy: A Star in a Jar?", excerpt: "Scientists at the National Ignition Facility have achieved a net energy gain in a fusion reaction for the second time, a major step towards clean energy.", content: "For decades, the dream of harnessing the power of the sun on Earth has been just that—a dream. But today, scientists announced a significant leap forward. At the Lawrence Livermore National Laboratory's National Ignition Facility (NIF) in California, a fusion reaction produced more energy than was used to initiate it, a milestone known as ignition. This marks the second time NIF has achieved this feat, demonstrating the viability of their approach. The experiment involved firing 192 powerful lasers at a tiny capsule of hydrogen fuel, creating temperatures and pressures hotter than the center of the sun. While commercial fusion power plants are still likely decades away, this repeated success provides crucial data and bolsters confidence that fusion energy could one day provide a near-limitless source of clean power.", author: "Dr. Kenji Tanaka", date: "2023-10-25", category: "Science", imageUrl: "https://picsum.photos/seed/picsum2/800/600", sentiment: "Positive" },
  { id: 3, title: "The AI Revolution in Finance: Algorithms Take the Wheel", excerpt: "From high-frequency trading to personalized banking, artificial intelligence is reshaping the financial industry at an unprecedented pace.", content: "The world of finance, once dominated by human traders and analysts in bustling stock exchanges, is undergoing a quiet but profound transformation. Artificial intelligence is now at the heart of many financial operations. Sophisticated algorithms execute trades in microseconds, AI-powered models assess credit risk with greater accuracy than ever before, and chatbots provide 24/7 customer service. This 'quant' revolution promises greater efficiency and democratization of financial services. However, it also raises concerns about market stability, algorithmic bias, and the displacement of human jobs. Regulators are scrambling to keep up, grappling with how to oversee a complex, automated system that few truly understand.", author: "Marcus Vance", date: "2023-10-24", category: "Economy", imageUrl: "https://picsum.photos/seed/picsum3/800/600", sentiment: "Neutral" },
  { id: 4, title: "Geopolitical Chess: The Battle for Africa's Rare Earth Minerals", excerpt: "As the demand for green technology soars, a new global competition is heating up for control of Africa's vast mineral resources, crucial for everything from EVs to wind turbines.", content: "Beneath the soil of several African nations lies a treasure trove of rare earth elements—minerals essential for the modern global economy. As the world transitions to green energy, the demand for these materials has skyrocketed, igniting a new 'Great Game' between global powers. China, which has long dominated the rare earth market, is facing increasing competition from the United States and the European Union, who are seeking to diversify their supply chains and reduce their dependency. This geopolitical contest is bringing both investment and instability to the continent. While some African nations hope to leverage this demand for economic development, others fear exploitation and the environmental consequences of large-scale mining operations. The strategic importance of these minerals ensures that Africa will be a central stage for global power dynamics for years to come.", author: "Amina Diallo", date: "2023-10-23", category: "Politics", imageUrl: "https://picsum.photos/seed/picsum4/800/600", hasTimeline: true, coordinates: { lat: -1.9403, lon: 29.8739 } },
  { id: 5, title: "Mental Health in the Digital Age: A Crisis of Connection?", excerpt: "Experts are increasingly concerned about the impact of social media and constant connectivity on the mental well-being of young people.", content: "While digital platforms promise to connect us, a growing body of research suggests they may be contributing to a crisis of loneliness and anxiety, particularly among adolescents and young adults. A recent study published in 'The Lancet' found a strong correlation between high social media usage and increased rates of depression. Psychologists point to factors like social comparison, cyberbullying, and the fear of missing out (FOMO) as major contributors. 'We've created a culture of curated perfection that is impossible to live up to,' says Dr. Susan Reid, the study's lead author. Tech companies are facing mounting pressure to design healthier platforms, with features like time limits and content moderation, but many argue that a fundamental shift in our relationship with technology is needed.", author: "Chloe Zhang", date: "2023-10-22", category: "Health", imageUrl: "https://picsum.photos/seed/picsum5/800/600", sentiment: "Negative" },
  { id: 6, title: "The Renaissance of Board Games: More Than Just Monopoly", excerpt: "In an era of digital dominance, tabletop gaming is experiencing a massive resurgence, fostering community and creativity.", content: "Forget dusty boxes of Monopoly and Scrabble. The world of board games has exploded in recent years, with thousands of new, innovative games being released annually. From complex strategy games that take hours to play to quick, cooperative party games, there's something for everyone. Crowdfunding platforms like Kickstarter have fueled this boom, allowing independent designers to bring their creative visions to life. Gaming cafes and conventions are popping up in cities worldwide, creating vibrant communities. Enthusiasts say that in an age of screen fatigue, the tangible, social experience of gathering around a table with friends is more appealing than ever.", author: "Javier Rios", date: "2023-10-21", category: "Culture", imageUrl: "https://picsum.photos/seed/picsum6/800/600", sentiment: "Positive" },
  { id: 7, title: "Arsenal's Title Hopes Soar After Dominant Derby Win", excerpt: "A decisive 3-0 victory over their North London rivals puts Arsenal in a commanding position at the top of the Premier League table.", content: "Arsenal delivered a statement performance at the Emirates Stadium on Sunday, dismantling Tottenham Hotspur in a highly anticipated North London Derby. Goals from Bukayo Saka, Gabriel Jesus, and a stunning strike from captain Martin Ødegaard secured a comfortable 3-0 win. The result sends Mikel Arteta's side five points clear at the top of the table, fueling belief among fans that this could finally be their year. 'The energy in the stadium was electric,' Arteta said post-match. 'The players felt it, and they delivered a performance to match. We are happy with where we are, but we know there is a long way to go.'", author: "Liam Gallagher", date: "2023-10-20", category: "Sports", imageUrl: "https://picsum.photos/seed/picsum7/800/600" },
  { id: 8, title: "Ancient Roman Villa Discovered Beneath Supermarket Construction Site", excerpt: "Construction workers in Rome were stunned to unearth a perfectly preserved Roman villa, complete with intricate mosaics and artifacts, dating back to the 2nd century AD.", content: "What began as a routine excavation for a new supermarket in the suburbs of Rome has turned into one of the most significant archaeological finds in recent memory. Workers discovered the remains of a luxurious Roman villa, stunningly preserved under layers of earth. Archaeologists called to the scene have already uncovered vibrant floor mosaics depicting mythological scenes, intact pottery, and even furniture. 'It's a snapshot of life for the Roman elite,' said Dr. Isabella Rossi, head of the excavation. 'To find a villa this large and this well-preserved within the city's modern footprint is simply extraordinary.' The discovery has halted construction indefinitely as archaeologists work to carefully excavate and preserve the site.", author: "Marco Bianchi", date: "2023-10-19", category: "History", imageUrl: "https://picsum.photos/seed/picsum8/800/600", coordinates: { lat: 41.9028, lon: 12.4964 } },
];

export const hiddenArticles: Article[] = [
    { id: 101, title: 'New "Quantum Entanglement" Communication Device Tested', excerpt: 'Researchers have successfully transmitted data over 10km using quantum entanglement, a technology previously thought to be purely theoretical.', content: 'Full content...', author: 'Admin', date: '2023-11-01', category: 'Technology', imageUrl: 'https://picsum.photos/seed/hidden1/800/600' },
    { id: 102, title: 'Deep Sea Exploration Uncovers Hundreds of New Species', excerpt: 'An unmanned submarine expedition in the Pacific Ocean has returned with images and samples of previously unknown marine life.', content: 'Full content...', author: 'Admin', date: '2023-11-02', category: 'Science', imageUrl: 'https://picsum.photos/seed/hidden2/800/600' },
];

export const mockPodcasts: Podcast[] = [
  { id: 1, title: 'The Daily Download: AI and the Future of Work', excerpt: 'An in-depth conversation with tech visionary Dr. Anya Sharma on how AI is reshaping industries and what it means for your career.', author: 'Mahama News Hub', imageUrl: 'https://picsum.photos/seed/podcast1/400/400', audioUrl: 'https://storage.googleapis.com/synthetic-ai-audio/podcast-1.mp3', duration: '28 min', episode: 101 },
  { id: 2, title: 'Geopolitics Unpacked: The New Scramble for Africa', excerpt: 'Amina Diallo breaks down the complex web of international interests competing for influence and resources across the African continent.', author: 'Mahama News Hub', imageUrl: 'https://picsum.photos/seed/podcast2/400/400', audioUrl: 'https://storage.googleapis.com/synthetic-ai-audio/podcast-2.mp3', duration: '35 min', episode: 45 },
  { id: 3, title: 'Mind Matters: Navigating the Anxiety Epidemic', excerpt: 'Psychologist Dr. Susan Reid joins us to discuss the rising rates of anxiety, the role of technology, and practical strategies for mental well-being.', author: 'Mahama News Hub', imageUrl: 'https://picsum.photos/seed/podcast3/400/400', audioUrl: 'https://storage.googleapis.com/synthetic-ai-audio/podcast-3.mp3', duration: '42 min', episode: 23 },
];

export const mockCurrentUser: User = {
  id: 'user-001',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: 'https://i.pravatar.cc/150?u=alexrivera',
  handle: 'alexrivera',
  joinDate: '2023-01-15',
  bio: 'Journalist and tech enthusiast. Following the intersection of AI, culture, and global politics. Reader. Writer. Explorer.',
  isProfilePublic: true,
};

export const stockData = [
    { symbol: 'MNH', price: 175.30, change: '+2.50', changePercent: '1.45%' },
    { symbol: 'TECHAI', price: 2890.10, change: '-15.40', changePercent: '0.53%' },
    { symbol: 'GLBECO', price: 450.75, change: '+5.12', changePercent: '1.15%' },
    { symbol: 'BIOFUT', price: 312.50, change: '+10.80', changePercent: '3.57%' },
];

export const TTS_VOICES: { name: string, value: AiTtsVoice }[] = [
    { name: 'Zephyr (Standard)', value: 'Zephyr' },
    { name: 'Puck', value: 'Puck' },
    { name: 'Charon', value: 'Charon' },
    { name: 'Kore', value: 'Kore' },
    { name: 'Fenrir', value: 'Fenrir' },
];

export const LANGUAGES: Language[] = ['English', 'French', 'Swahili', 'Kinyarwanda', 'Spanish', 'German', 'Portuguese'];

export const LANGUAGE_VOICE_MAP: Record<Language, AiTtsVoice> = {
    English: 'Zephyr',
    French: 'Puck',
    Swahili: 'Kore',
    Kinyarwanda: 'Fenrir',
    Spanish: 'Puck', // Placeholder, Gemini supports Spanish voices
    German: 'Charon', // Placeholder, Gemini supports German voices
    Portuguese: 'Puck', // Placeholder
};

export const innovations = [
    { year: 1991, titleKey: "wwwTitle", descriptionKey: "wwwDesc", icon: "GlobeIcon" },
    { year: 1995, titleKey: "gpsTitle", descriptionKey: "gpsDesc", icon: "GpsIcon" },
    { year: 1998, titleKey: "googleTitle", descriptionKey: "googleDesc", icon: "SearchIcon" },
    { year: 2003, titleKey: "genomeTitle", descriptionKey: "genomeDesc", icon: "DnaIcon" },
    { year: 2004, titleKey: "socialTitle", descriptionKey: "socialDesc", icon: "SocialIcon" },
    { year: 2007, titleKey: "iphoneTitle", descriptionKey: "iphoneDesc", icon: "SmartphoneIcon" },
    { year: 2012, titleKey: "deepLearningTitle", descriptionKey: "deepLearningDesc", icon: "SparklesIcon" },
    { year: 2022, titleKey: "genAiTitle", descriptionKey: "genAiDesc", icon: "UserIcon" },
];

export const mockUsers = [
  { id: 'user-002', name: 'Samantha Lee', avatar: 'https://i.pravatar.cc/150?u=samanthalee' },
  { id: 'user-003', name: 'Ben Carter', avatar: 'https://i.pravatar.cc/150?u=bencarter' },
];

export const mockComments: Comment[] = [
    { id: 'c1', user: mockUsers[0], text: "This is a really insightful take on the situation. I hadn't considered the economic angle before.", timestamp: '2 hours ago', likes: 15, replies: [
        { id: 'c1-1', user: mockCurrentUser, text: "Thanks, Samantha! The economic implications are definitely a huge part of the story.", timestamp: '1 hour ago', likes: 5, replies: [] },
    ]},
    { id: 'c2', user: mockUsers[1], text: "I disagree with the author's conclusion. I think they're overlooking the cultural factors at play.", timestamp: '5 hours ago', likes: 3, replies: [] },
];

export const subscriptionPlans: SubscriptionPlan[] = [
    { name: 'Free', price: '$0', priceYearly: '$0', features: ['subFeatureFree1', 'subFeatureFree2', 'subFeatureFree3'] },
    { name: 'Premium', price: '$9.99', priceYearly: '$99.99', features: ['subFeaturePremium1', 'subFeaturePremium2', 'subFeaturePremium3', 'subFeaturePremium4', 'subFeaturePremium5'], isRecommended: true },
];

export const mockStreamingContent: StreamingContent[] = [
  { id: 1, title: 'Inception', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkWTBFGVEoPYFp1A.jpg', trailerUrl: 'https://www.youtube.com/embed/YoHD9XEInc0', genre: 'Sci-Fi', year: 2010, rating: 'PG-13', duration: '2h 28m', isTrending: true, isAwardWinner: true },
  { id: 2, title: 'The Martian', description: 'An astronaut becomes stranded on Mars after his team presumes him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.', posterUrl: 'https://image.tmdb.org/t/p/w500/5aGhaIHYuQbqlHWvWYqMC3O2W6.jpg', trailerUrl: 'https://www.youtube.com/embed/ej3ioOneTy8', genre: 'Sci-Fi', year: 2015, rating: 'PG-13', duration: '2h 24m', isNew: true },
  { id: 3, title: 'Parasite', description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', posterUrl: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', trailerUrl: 'https://www.youtube.com/embed/5xH0HfJHsaY', genre: 'Drama', year: 2019, rating: 'R', duration: '2h 12m', isAwardWinner: true },
  { id: 4, title: 'Blade Runner 2049', description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.', posterUrl: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', trailerUrl: 'https://www.youtube.com/embed/gCcx85zbxz4', genre: 'Sci-Fi', year: 2017, rating: 'R', duration: '2h 44m', isTrending: true },
  { id: 5, title: 'Dune', description: 'A noble family becomes embroiled in a war for control over the galaxy\'s most valuable asset while its heir becomes troubled by visions of a dark future.', posterUrl: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIY2VFIhhAQLtbVg.jpg', trailerUrl: 'https://www.youtube.com/embed/n9xhJrPXop4', genre: 'Sci-Fi', year: 2021, rating: 'PG-13', duration: '2h 35m', isNew: true, isTrending: true },
  { id: 6, title: 'Mad Max: Fury Road', description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.', posterUrl: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg', trailerUrl: 'https://www.youtube.com/embed/hEJnMQG9ev8', genre: 'Action', year: 2015, rating: 'R', duration: '2h', isAwardWinner: true },
  { id: 7, title: 'Everything Everywhere All at Once', description: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.', posterUrl: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', trailerUrl: 'https://www.youtube.com/embed/wxN1T1uxQ2g', genre: 'Action', year: 2022, rating: 'R', duration: '2h 19m', isNew: true, isAwardWinner: true },
  { id: 8, title: 'The Grand Budapest Hotel', description: 'The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.', posterUrl: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg', trailerUrl: 'https://www.youtube.com/embed/1Fg5iWmQjwk', genre: 'Comedy', year: 2014, rating: 'R', duration: '1h 39m' },
  { id: 9, title: 'Knives Out', description: 'A detective investigates the death of a patriarch of an eccentric, combative family.', posterUrl: 'https://image.tmdb.org/t/p/w500/pThyQovXQrw2m0s9x82twY4ydr.jpg', trailerUrl: 'https://www.youtube.com/embed/qGqiHJTsRkQ', genre: 'Comedy', year: 2019, rating: 'PG-13', duration: '2h 10m' },
  { id: 10, title: 'Spider-Man: Into the Spider-Verse', description: 'Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.', posterUrl: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBvA_wE7CaAA2R2Mza.jpg', trailerUrl: 'https://www.youtube.com/embed/g4Hbz2jLxvQ', genre: 'Animation', year: 2018, rating: 'PG', duration: '1h 57m', isTrending: true, isAwardWinner: true },
  { id: 11, title: 'Arrival', description: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.', posterUrl: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNsBqM_avlN.jpg', trailerUrl: 'https://www.youtube.com/embed/tFMo3UJ4B4g', genre: 'Sci-Fi', year: 2016, rating: 'PG-13', duration: '1h 56m' },
  { id: 12, title: 'Joker', description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.', posterUrl: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', trailerUrl: 'https://www.youtube.com/embed/zAGVQLHvwOY', genre: 'Drama', year: 2019, rating: 'R', duration: '2h 2m', isAwardWinner: true },
  { id: 13, title: 'Tenet', description: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.', posterUrl: 'https://image.tmdb.org/t/p/w500/k68nPLbIST6Ycclockwise.jpg', trailerUrl: 'https://www.youtube.com/embed/LdOM0x0XDMo', genre: 'Action', year: 2020, rating: 'PG-13', duration: '2h 30m' },
  { id: 14, title: 'Oppenheimer', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg', genre: 'Drama', year: 2023, rating: 'R', duration: '3h', isNew: true, isTrending: true, isAwardWinner: true },
  { id: 15, title: 'Poor Things', description: 'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.', posterUrl: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg', trailerUrl: 'https://www.youtube.com/embed/R-_a2soE_kE', genre: 'Comedy', year: 2023, rating: 'R', duration: '2h 21m', isNew: true },
  { id: 16, title: 'The Creator', description: 'Against the backdrop of a war between humans and robots with artificial intelligence, a former soldier finds the secret weapon, a robot in the form of a young child.', posterUrl: 'https://image.tmdb.org/t/p/w500/vBZ0qvaRxqEhZwl6ssurTg3FOf.jpg', trailerUrl: 'https://www.youtube.com/embed/ex3C1-5Dhb8', genre: 'Sci-Fi', year: 2023, rating: 'PG-13', duration: '2h 13m', isNew: true },
  { id: 17, title: 'The Holdovers', description: 'A cranky history teacher at a remote prep school is forced to remain on campus over the holidays with a troubled student who has no place to go.', posterUrl: 'https://image.tmdb.org/t/p/w500/aHSO9yCVOO9p6p5fUhG3E62ZA20.jpg', trailerUrl: 'https://www.youtube.com/embed/AhKLpJmHhIg', genre: 'Comedy', year: 2023, rating: 'R', duration: '2h 13m', isNew: true },
  { id: 18, title: 'Anatomy of a Fall', description: 'A woman is suspected of her husband\'s murder, and their blind son faces a moral dilemma as the sole witness.', posterUrl: 'https://image.tmdb.org/t/p/w500/kCs22dC8AEeTO2SpAl2kK2mSjFc.jpg', trailerUrl: 'https://www.youtube.com/embed/fTrsp5BMloA', genre: 'Drama', year: 2023, rating: 'R', duration: '2h 32m', isNew: true },
  { id: 19, title: 'Rebel Moon: Part One - A Child of Fire', description: 'When a peaceful settlement on the edge of the galaxy finds itself threatened by the armies of the tyrannical Regent Balisarius, they dispatch a young woman with a mysterious past to seek out warriors from neighboring planets to help them take a stand.', posterUrl: 'https://image.tmdb.org/t/p/w500/6PGweuFma9fH72z2363tAGp9gM.jpg', trailerUrl: 'https://www.youtube.com/embed/fhr3-p-qAJs', genre: 'Sci-Fi', year: 2023, rating: 'PG-13', duration: '2h 15m', isNew: true },
];

export const mockSponsors = [
    { name: "QuantumLeap", tagline: "Innovating Tomorrow's Computing", imageUrl: "https://picsum.photos/seed/sponsor1/600/400", logoUrl: "https://i.imgur.com/vHqB9Zw.png", website: "#" },
    { name: "BioSynth", tagline: "Engineering a Healthier Future", imageUrl: "https://picsum.photos/seed/sponsor2/600/400", logoUrl: "https://i.imgur.com/7gqjJpP.png", website: "#" },
    { name: "StellarForge", tagline: "Building the Future of Aerospace", imageUrl: "https://picsum.photos/seed/sponsor3/600/400", logoUrl: "https://i.imgur.com/dK5Zz5K.png", website: "#" },
];

export const mockServiceItems: ServiceItem[] = [
    { name: 'Mahama Hospital', category: 'Health', coords: { x: 50, y: 50 }, description: 'Main health facility in the camp.' },
    { name: 'Primary School Alpha', category: 'Education', coords: { x: 30, y: 40 } },
    { name: 'Central Market', category: 'Markets', coords: { x: 60, y: 65 } },
    { name: 'Bus Terminal', category: 'Transport', coords: { x: 80, y: 80 } },
    { name: 'Vocational Training Center', category: 'Work & Skills', coords: { x: 25, y: 60 } },
    { name: 'Community Center', category: 'Community Groups', coords: { x: 45, y: 25 } },
    { name: 'Camp Admin Office', category: 'Official Services', coords: { x: 70, y: 30 } },
    { name: 'Security Post 1', category: 'Safety & Security', coords: { x: 10, y: 10 } },
];
