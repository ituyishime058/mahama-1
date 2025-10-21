import type { Article, Podcast, Category, Stock, Innovation, StreamingContent, SubscriptionPlan, AiTtsVoice, User } from './types';

import AllIcon from './components/icons/AllIcon';
import ForYouIcon from './components/icons/ForYouIcon';
import GlobeIcon from './components/icons/GlobeIcon';
import PoliticsIcon from './components/icons/PoliticsIcon';
import EconomyIcon from './components/icons/EconomyIcon';
import TechnologyIcon from './components/icons/TechnologyIcon';
import SportsIcon from './components/icons/SportsIcon';
import HealthIcon from './components/icons/HealthIcon';
import ScienceIcon from './components/icons/ScienceIcon';
import EnvironmentIcon from './components/icons/EnvironmentIcon';
import CultureIcon from './components/icons/CultureIcon';
import EntertainmentIcon from './components/icons/EntertainmentIcon';
import MoviesTVIcon from './components/icons/MoviesTVIcon';
import ArtIcon from './components/icons/ArtIcon';
import MusicIcon from './components/icons/MusicIcon';
import HistoryIcon from './components/icons/HistoryIcon';
import InvestigatesIcon from './components/icons/InvestigatesIcon';

export const mockArticles: Article[] = [
  // ... (content remains the same as provided, but is now complete)
  {
    id: 1,
    title: 'G7 Leaders Convene for Emergency Summit on Global Economic Crisis',
    excerpt: 'The Group of Seven (G7) has called an unscheduled meeting to address the escalating global economic downturn, with leaders scrambling to find a coordinated response.',
    content: 'In a surprise move, leaders from the G7 nations are gathering for an emergency summit as fears of a deep and prolonged global recession mount. The agenda is expected to focus on synchronized fiscal stimulus measures, stabilizing volatile financial markets, and addressing supply chain disruptions that have crippled international trade. Analysts are watching closely to see if the world\'s leading economies can set aside recent trade tensions to forge a united front against the crisis. The summit follows a week of record-breaking losses on stock exchanges worldwide and dire warnings from the International Monetary Fund.',
    imageUrl: 'https://picsum.photos/seed/g7-summit/1200/800',
    author: 'Eleanor Vance',
    date: '2023-10-26',
    category: 'Economy',
    live: true,
    region: 'Europe',
    sentiment: 'Negative',
    keyTakeaways: [
      'G7 leaders are holding an emergency summit to address the global economic crisis.',
      'Key topics include fiscal stimulus, market stability, and supply chain issues.',
      'The meeting comes after major stock market losses and IMF warnings.'
    ],
  },
  {
    id: 2,
    title: 'Breakthrough in Fusion Energy Hailed as "New Dawn" for Clean Power',
    excerpt: 'Scientists at the International Fusion Research Institute have achieved a net energy gain in a sustained fusion reaction, a landmark achievement in the quest for limitless clean energy.',
    content: 'A team of international scientists has announced a historic breakthrough in nuclear fusion, successfully producing more energy from a fusion reaction than was required to initiate it. The experiment, conducted in the institute\'s newly upgraded tokamak reactor, sustained the reaction for a record-breaking 3.5 seconds, proving the viability of fusion as a potential source of clean, virtually limitless power. While commercial fusion power plants are still decades away, this achievement is being celebrated as a monumental step towards a carbon-free energy future. "We have overcome a fundamental scientific barrier," said lead researcher Dr. Aris Thorne. "This is a new dawn for energy."',
    imageUrl: 'https://picsum.photos/seed/fusion-energy/1200/800',
    author: 'Kenji Tanaka',
    date: '2023-10-25',
    category: 'Science',
    region: 'Global',
    sentiment: 'Positive',
    keyTakeaways: [
      'Scientists achieved a net energy gain in a sustained nuclear fusion reaction.',
      'The reaction was sustained for a record 3.5 seconds.',
      'This is a major milestone towards developing clean, limitless energy.'
    ],
    hasTimeline: true,
  },
  {
    id: 3,
    title: 'East African Federation Takes Major Step with Common Currency Launch',
    excerpt: 'The six member states of the East African Federation (EAF) have officially launched the "Shillingi," a new common currency aimed at boosting regional trade and economic integration.',
    content: 'In a ceremony in Arusha, Tanzania, leaders from Kenya, Tanzania, Uganda, Rwanda, Burundi, and South Sudan officially launched the East African Shillingi. The move is seen as the most significant step towards full political and economic federation in the bloc\'s history. The new currency will be phased in over the next 18 months, with dual pricing displayed in local currencies and the Shillingi. Economists predict the move will dramatically reduce transaction costs, eliminate exchange rate volatility within the bloc, and attract foreign investment. However, challenges remain in harmonizing fiscal policies across the diverse economies of the member states.',
    imageUrl: 'https://picsum.photos/seed/eaf-currency/1200/800',
    author: 'Amina Rousseau',
    date: '2023-10-24',
    category: 'Politics',
    region: 'Africa',
    sentiment: 'Positive',
    keyTakeaways: [
      'The East African Federation launched a common currency, the "Shillingi".',
      'The goal is to boost regional trade and economic integration.',
      'Challenges in harmonizing fiscal policies remain.'
    ],
  },
  {
    id: 4,
    title: '"Quantum Entanglement Network" Successfully Transmits Data Across 100km',
    excerpt: 'Researchers have demonstrated a stable quantum communication network, transmitting encrypted data instantaneously between two points 100 kilometers apart using quantum entanglement.',
    content: 'A groundbreaking experiment has successfully transmitted data over a 100km fiber optic cable using quantum entanglement, creating a communication system that is theoretically impossible to intercept. This development in quantum networking could revolutionize data security, making future financial transactions, government communications, and military operations unhackable. The system relies on the strange properties of quantum mechanics, where two entangled particles remain connected, with the state of one instantly affecting the other, regardless of the distance separating them. The team is now working on scaling the technology to create a multi-node quantum internet.',
    imageUrl: 'https://picsum.photos/seed/quantum-net/1200/800',
    author: 'Dr. Evelyn Reed',
    date: '2023-10-23',
    category: 'Technology',
    region: 'Global',
    sentiment: 'Neutral',
    keyTakeaways: [
      'A stable quantum communication network transmitted data over 100km.',
      'The system uses quantum entanglement, making it theoretically unhackable.',
      'This could revolutionize data security for various sectors.'
    ],
  },
  {
    id: 5,
    title: 'First AI-Designed Pharmaceutical Drug Enters Human Trials',
    excerpt: 'A new drug for treating a rare form of Alzheimer\'s, designed entirely by an advanced artificial intelligence system, has been approved for Phase 1 human trials.',
    content: 'In a medical first, a drug candidate conceived and developed by an artificial intelligence platform has begun human trials. The drug, codenamed "Cognito-7," targets a specific protein plaque associated with a rare, aggressive form of early-onset Alzheimer\'s disease. The AI system analyzed vast datasets of genetic, molecular, and clinical information to identify the novel compound and predict its efficacy and potential side effects in a fraction of the time traditional methods would take. If successful, this trial could usher in a new era of AI-driven drug discovery, dramatically accelerating the fight against countless diseases.',
    imageUrl: 'https://picsum.photos/seed/ai-drug/1200/800',
    author: 'Javier Castillo',
    date: '2023-10-22',
    category: 'Health',
    region: 'Americas',
    sentiment: 'Positive',
    keyTakeaways: [
      'An AI-designed drug for a rare Alzheimer\'s form is entering human trials.',
      'The AI significantly accelerated the drug discovery process.',
      'Success could revolutionize how new medicines are developed.'
    ],
  },
  {
    id: 6,
    title: 'Tensions Flare in South China Sea as Unmanned Naval Drones Deployed',
    excerpt: 'Regional tensions have sharply increased after multiple nations deployed autonomous naval patrol drones in disputed waters of the South China Sea, leading to a tense standoff.',
    content: 'A new and dangerous chapter has opened in the long-simmering South China Sea dispute. Satellite imagery and naval intelligence confirm the deployment of sophisticated, long-range autonomous patrol drones by several claimant nations. These unmanned vessels, equipped with advanced surveillance and electronic warfare capabilities, are now engaged in a tense, high-tech cat-and-mouse game. Military analysts warn that the lack of direct human control increases the risk of miscalculation and rapid escalation. Diplomatic channels are in overdrive to establish protocols for these new autonomous systems to prevent an accidental conflict.',
    imageUrl: 'https://picsum.photos/seed/sea-drones/1200/800',
    author: 'Mei Lin',
    date: '2023-10-21',
    category: 'World',
    region: 'Asia',
    sentiment: 'Negative',
    keyTakeaways: [
      'Autonomous naval drones have been deployed in the South China Sea.',
      'The deployment has increased regional tensions and risk of conflict.',
      'Diplomatic efforts are underway to establish protocols for the drones.'
    ],
  },
  {
      id: 7,
      title: "Archaeologists Uncover Lost City in the Amazon Using Lidar Technology",
      excerpt: "A team of researchers has discovered the sprawling ruins of a pre-Columbian city hidden for centuries beneath the dense canopy of the Amazon rainforest.",
      content: "Using advanced Light Detection and Ranging (Lidar) technology, archaeologists have mapped a vast network of pyramids, plazas, and canals belonging to a previously unknown civilization. The findings challenge long-held beliefs that the Amazon was sparsely populated before European contact. The city, which is estimated to have housed over 50,000 people, shows signs of sophisticated urban planning and large-scale agriculture. 'It's a complete paradigm shift in our understanding of the Amazon and its history,' said the lead archaeologist. The remote location and dense jungle have preserved the site remarkably well.",
      imageUrl: "https://picsum.photos/seed/amazon-city/1200/800",
      author: "Isabella Rossi",
      date: "2023-10-20",
      category: "History",
      region: "Americas",
      sentiment: "Positive",
      keyTakeaways: [
        "A lost pre-Columbian city was discovered in the Amazon using Lidar.",
        "The discovery challenges views on pre-contact population levels in the region.",
        "The city shows signs of advanced urban planning and agriculture."
      ]
  },
  {
      id: 8,
      title: "Global Soccer League Final Ends in Dramatic Penalty Shootout",
      excerpt: "FC Dynamo and Real Internacional battled to a standstill, with the championship decided by a nerve-wracking penalty shootout that went to the final kick.",
      content: "In a fittingly dramatic conclusion to the inaugural Global Soccer League season, FC Dynamo has been crowned champion after defeating Real Internacional in a penalty shootout. The match ended 2-2 after extra time, with both teams displaying incredible resilience. Real Internacional took the lead twice, only for Dynamo to equalize on both occasions, the second time with a stunning free-kick in the 118th minute. The shootout was a tense affair, with Dynamo's goalkeeper making two crucial saves before their star striker converted the winning spot-kick. The victory caps a remarkable season for the underdog team.",
      imageUrl: "https://picsum.photos/seed/soccer-final/1200/800",
      author: "Liam Gallagher",
      date: "2023-10-19",
      category: "Sports",
      region: "Global",
      sentiment: "Neutral",
      keyTakeaways: [
        "FC Dynamo won the inaugural Global Soccer League.",
        "The final against Real Internacional was decided by a penalty shootout.",
        "The match ended 2-2 after extra time."
      ]
  },
  {
      id: 9,
      title: "The Rise of 'Hyper-Local' Manufacturing: A Post-Pandemic Trend",
      excerpt: "Small-scale, automated factories are popping up in urban centers, a trend accelerated by supply chain vulnerabilities exposed during the pandemic.",
      content: "A new wave of 'hyper-local' manufacturing is reshaping urban economies. These small, highly automated facilities utilize 3D printing, robotics, and AI to produce goods on-demand, from consumer electronics to medical devices. This trend, a direct response to the global supply chain disruptions of recent years, promises greater resilience, reduced shipping costs, and faster product delivery. City planners are embracing the concept, rezoning light industrial areas to accommodate these micro-factories. While not a replacement for mass production, hyper-local manufacturing is creating new skilled jobs and fostering a more circular, sustainable urban economy.",
      imageUrl: "https://picsum.photos/seed/local-mfg/1200/800",
      author: "Eleanor Vance",
      date: "2023-10-18",
      category: "Economy",
      region: "Global",
      sentiment: "Positive",
      keyTakeaways: [
        "Automated, small-scale factories are becoming more common in cities.",
        "The trend is a response to supply chain issues revealed by the pandemic.",
        "This new model promotes economic resilience and sustainability."
      ]
  },
  {
      id: 10,
      title: "World's First Fully Immersive VR Concert Draws Millions",
      excerpt: "Pop superstar Nova held a concert entirely within a virtual reality metaverse, with millions of fans attending via VR headsets from around the globe.",
      content: "In a spectacle that blurred the lines between music, gaming, and social media, pop icon Nova performed the first-ever major concert in a fully immersive virtual reality environment. Fans, represented by customizable avatars, could fly through the fantastical digital venue, interact with other concert-goers, and even join the artist on stage as holograms. The event, which sold over 5 million virtual tickets, is being hailed as a watershed moment for the entertainment industry, proving the commercial viability of large-scale VR events. Critics have praised the stunning visuals and sense of shared experience, suggesting this could be the future of live performances.",
      imageUrl: "https://picsum.photos/seed/vr-concert/1200/800",
      author: "Chloe Kim",
      date: "2023-10-17",
      category: "Entertainment",
      region: "Global",
      sentiment: "Positive",
      keyTakeaways: [
        "Pop star Nova held the first major concert in a fully immersive VR metaverse.",
        "The event sold over 5 million virtual tickets.",
        "It's seen as a landmark moment for the future of the entertainment industry."
      ]
  }
];

export const hiddenArticles: Article[] = [
    {
      id: 11,
      title: 'Debate Over Universal Basic Income Intensifies in European Parliament',
      excerpt: 'A new proposal for a bloc-wide Universal Basic Income (UBI) pilot program has sparked intense debate among EU member states.',
      content: 'The European Parliament is currently debating a controversial proposal to fund a large-scale Universal Basic Income (UBI) pilot program across several member states. Proponents argue that UBI could provide a crucial safety net in an age of increasing automation and precarious work, stimulating economies from the ground up. Opponents, however, raise concerns about the immense cost, potential inflationary effects, and the impact on the incentive to work. The debate highlights a growing ideological divide within the EU on the future of social welfare.',
      imageUrl: 'https://picsum.photos/seed/ubi-debate/1200/800',
      author: 'Amina Rousseau',
      date: '2023-11-01',
      category: 'Politics',
      region: 'Europe',
      sentiment: 'Neutral',
      keyTakeaways: [],
    },
    {
      id: 12,
      title: 'New Wearable Sensor Can Detect Viruses in the Air in Real-Time',
      excerpt: 'Researchers have developed a small, wearable badge that can detect airborne viral particles, including influenza and coronaviruses, providing instant alerts.',
      content: 'A team at the Institute for Advanced Pathogen Research has unveiled a groundbreaking wearable sensor capable of detecting specific airborne viruses in real-time. The device, the size of a small badge, uses graphene-based biosensors to identify the genetic material of viruses in the surrounding air. When a target virus is detected, it sends an alert to the user\'s smartphone. This technology could revolutionize public health by enabling early detection of outbreaks and helping individuals avoid contagious environments. The team hopes to have a commercial version available within two years.',
      imageUrl: 'https://picsum.photos/seed/virus-sensor/1200/800',
      author: 'Dr. Evelyn Reed',
      date: '2023-11-02',
      category: 'Health',
      region: 'Global',
      sentiment: 'Positive',
      keyTakeaways: [],
    }
];

export const mockPodcasts: Podcast[] = [
    {
        id: 1,
        title: "The AI Revolution: Reshaping Our World",
        excerpt: "An in-depth discussion with tech visionary Dr. Aris Thorne on how artificial intelligence is changing society, from medicine to manufacturing.",
        imageUrl: "https://picsum.photos/seed/podcast1/400/400",
        author: "Mahama News Hub",
        duration: "45 min",
        episode: 12,
        audioUrl: "https://storage.googleapis.com/interactive-media/podcasts/1.mp3"
    },
    {
        id: 2,
        title: "Geopolitical Chess: The New Power Dynamics",
        excerpt: "Political analyst Eleanor Vance breaks down the shifting alliances and emerging power blocs that are defining the 21st century.",
        imageUrl: "https://picsum.photos/seed/podcast2/400/400",
        author: "Mahama News Hub",
        duration: "52 min",
        episode: 11,
        audioUrl: "https://storage.googleapis.com/interactive-media/podcasts/2.mp3"
    },
    {
        id: 3,
        title: "The Future of Food: Sustainable & Lab-Grown",
        excerpt: "Can we feed 10 billion people sustainably? We explore the world of cellular agriculture and vertical farming with food scientist Isabella Rossi.",
        imageUrl: "https://picsum.photos/seed/podcast3/400/400",
        author: "Mahama News Hub",
        duration: "38 min",
        episode: 10,
        audioUrl: "https://storage.googleapis.com/interactive-media/podcasts/3.mp3"
    },
     {
        id: 4,
        title: "Decoding the Cosmos: Webb's Latest Discoveries",
        excerpt: "Astrophysicist Kenji Tanaka joins us to explain the breathtaking new images and data from the James Webb Space Telescope.",
        imageUrl: "https://picsum.photos/seed/podcast4/400/400",
        author: "Mahama News Hub",
        duration: "48 min",
        episode: 9,
        audioUrl: "https://storage.googleapis.com/interactive-media/podcasts/4.mp3"
    },
];

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
  { name: 'Entertainment', icon: EntertainmentIcon },
  { name: 'Movies & TV', icon: MoviesTVIcon },
  { name: 'Art', icon: ArtIcon },
  { name: 'Music', icon: MusicIcon },
  { name: 'History', icon: HistoryIcon, subcategories: ['Ancient History', 'Modern History', 'African History', 'Military History'] },
  { name: 'Mahama Investigates', icon: InvestigatesIcon },
];

export const stockData: Stock[] = [
  { symbol: 'AAPL', price: 172.25, change: '+1.75', changePercent: '1.03%' },
  { symbol: 'GOOGL', price: 135.60, change: '-0.45', changePercent: '-0.33%' },
  { symbol: 'MSFT', price: 330.11, change: '+2.50', changePercent: '0.76%' },
  { symbol: 'AMZN', price: 130.48, change: '-1.12', changePercent: '-0.85%' },
  { symbol: 'TSLA', price: 250.91, change: '+5.60', changePercent: '2.28%' },
  { symbol: 'NKE', price: 102.34, change: '-0.15', changePercent: '-0.15%' },
];

export const innovations: Innovation[] = [
  { year: 1991, title: 'World Wide Web Invented', description: 'Tim Berners-Lee launches the first public website, marking the beginning of the public internet era.', icon: 'GlobeIcon' },
  { year: 1995, title: 'GPS Becomes Fully Operational', description: 'The U.S. Global Positioning System satellite constellation becomes fully operational, enabling worldwide navigation.', icon: 'GpsIcon' },
  { year: 1998, title: 'Google Founded', description: 'Larry Page and Sergey Brin found Google, revolutionizing how information is accessed and organized.', icon: 'SearchIcon' },
  { year: 2003, title: 'Human Genome Project', description: 'The full human genome is sequenced, opening new doors for medicine and genetics.', icon: 'DnaIcon' },
  { year: 2004, title: 'Social Media Emerges', description: 'Facebook is launched, popularizing the concept of social networking and changing communication.', icon: 'SocialIcon' },
  { year: 2007, title: 'First iPhone Released', description: 'Apple releases the first iPhone, kicking off the smartphone revolution and mobile computing.', icon: 'SmartphoneIcon' },
  { year: 2012, title: 'Deep Learning Breakthrough', description: 'AlexNet wins the ImageNet competition, demonstrating the power of deep neural networks and sparking the AI boom.', icon: 'SparklesIcon' },
  { year: 2022, title: 'Generative AI Goes Mainstream', description: 'The public release of models like ChatGPT and DALL-E 2 brings the power of generative AI to millions.', icon: 'SparklesIcon' },
];

export const mockStreamingContent: StreamingContent[] = [
    { id: 1, title: 'Dune: Part Two', posterUrl: 'https://image.tmdb.org/t/p/w400/1Fh91A6pB3g3aK34Gg3JY4l2aV.jpg', trailerUrl: 'https://www.youtube.com/embed/U2Qp5pL3ovA', description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.', isNew: true, genre: 'Sci-Fi', rating: 'PG-13', year: 2024, duration: '2h 46m', isTrending: true, isAwardWinner: true },
    { id: 2, title: 'Shōgun', posterUrl: 'https://image.tmdb.org/t/p/w400/7O4iVfOMQmdOMl990a4blFR3m5.jpg', trailerUrl: 'https://www.youtube.com/embed/H4h2_iTa_nQ', description: 'When a mysterious European ship is found marooned in a nearby fishing village, its English pilot, John Blackthorne, comes bearing secrets that could help Toranaga tip the scales of power.', isNew: true, genre: 'Drama', rating: 'TV-MA', year: 2024, duration: '10 Ep.', isTrending: true, isAwardWinner: true },
    { id: 3, title: 'Oppenheimer', posterUrl: 'https://image.tmdb.org/t/p/w400/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', genre: 'History', rating: 'R', year: 2023, duration: '3h 0m', isAwardWinner: true, isTrending: true },
    { id: 4, title: 'The Creator', posterUrl: 'https://image.tmdb.org/t/p/w400/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg', trailerUrl: 'https://www.youtube.com/embed/ex3C1-5Dhb8', description: 'Against the backdrop of a war between humans and robots with artificial intelligence, a former special forces agent finds the secret weapon, a robot in the form of a young child.', genre: 'Sci-Fi', rating: 'PG-13', year: 2023, duration: '2h 13m', isTrending: true },
    { id: 5, title: 'The Bear', posterUrl: 'https://image.tmdb.org/t/p/w400/6vCtgS21Jv4FrVnTOo923hM2MvL.jpg', trailerUrl: 'https://www.youtube.com/embed/gB_b7P_22nE', description: 'A young chef from the fine dining world returns to Chicago to run his family\'s sandwich shop.', genre: 'Comedy', rating: 'TV-MA', year: 2022, duration: '2 Seasons', isTrending: false, isAwardWinner: true },
    { id: 6, title: 'Blade Runner 2049', posterUrl: 'https://image.tmdb.org/t/p/w400/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', trailerUrl: 'https://www.youtube.com/embed/gCcx85zbxz4', description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.', genre: 'Sci-Fi', rating: 'R', year: 2017, duration: '2h 44m', isAwardWinner: true, isTrending: false },
    { id: 7, title: 'Spider-Man: Across the Spider-Verse', posterUrl: 'https://image.tmdb.org/t/p/w400/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg', trailerUrl: 'https://www.youtube.com/embed/shW9i6k8cB0', description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.', genre: 'Animation', rating: 'PG', year: 2023, duration: '2h 20m', isAwardWinner: true },
    { id: 8, title: 'John Wick: Chapter 4', posterUrl: 'https://image.tmdb.org/t/p/w400/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', trailerUrl: 'https://www.youtube.com/embed/qEVUtrk8_B4', description: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.', genre: 'Action', rating: 'R', year: 2023, duration: '2h 49m' },
    { id: 9, title: 'Past Lives', posterUrl: 'https://image.tmdb.org/t/p/w400/k3waq02AhMxbEO3B49p14T0DSo.jpg', trailerUrl: 'https://www.youtube.com/embed/kA244xewjcI', description: 'Nora and Hae Sung, two deeply connected childhood friends, are wrest apart after Nora\'s family emigrates from South Korea. 20 years later, they are reunited for one fateful week.', genre: 'Drama', rating: 'PG-13', year: 2023, duration: '1h 46m', isAwardWinner: true },
    { id: 10, title: 'Arrival', posterUrl: 'https://image.tmdb.org/t/p/w400/x2FJsf1ElAgr63Y3PNs7GkKzJrZ.jpg', trailerUrl: 'https://www.youtube.com/embed/tFMo3UJ4B4g', description: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.', genre: 'Sci-Fi', rating: 'PG-13', year: 2016, duration: '1h 56m', isAwardWinner: true },
    { id: 11, title: 'Godzilla x Kong: The New Empire', posterUrl: 'https://image.tmdb.org/t/p/w400/tMefBSMkn रोल.jpg', trailerUrl: 'https://www.youtube.com/embed/qqrpMRDuPfc', description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island\'s mysteries.', isNew: true, genre: 'Action', rating: 'PG-13', year: 2024, duration: '1h 55m' },
    { id: 12, title: 'Poor Things', posterUrl: 'https://image.tmdb.org/t/p/w400/kCGlIMrg8PzGpqEEliHkBMGOM3T.jpg', trailerUrl: 'https://www.youtube.com/embed/R-QiSptBDjY', description: 'Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.', genre: 'Comedy', rating: 'R', year: 2023, duration: '2h 21m', isAwardWinner: true },
    { id: 13, title: 'Anatomy of a Fall', posterUrl: 'https://image.tmdb.org/t/p/w400/kQs6keHeMwAmswG1Q6deC6L2Rhj.jpg', trailerUrl: 'https://www.youtube.com/embed/fTrsp5BMloA', description: 'A woman is suspected of her husband\'s murder, and their blind son faces a moral dilemma as the main witness.', genre: 'Thriller', rating: 'R', year: 2023, duration: '2h 32m', isAwardWinner: true },
    { id: 14, title: 'Killers of the Flower Moon', posterUrl: 'https://image.tmdb.org/t/p/w400/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg', trailerUrl: 'https://www.youtube.com/embed/7Ie-f_66D9c', description: 'When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one until the FBI steps in to unravel the mystery.', genre: 'History', rating: 'R', year: 2023, duration: '3h 26m', isAwardWinner: true },
    { id: 15, title: 'Fallout', posterUrl: 'https://image.tmdb.org/t/p/w400/zK2sFxZcelHW4GcAM62h3zG6Xrt.jpg', trailerUrl: 'https://www.youtube.com/embed/V-ugro_c0i4', description: 'Based on one of the greatest video game series of all time, Fallout is the story of haves and have-nots in a world in which there’s almost nothing left to have.', isNew: true, genre: 'Sci-Fi', rating: 'TV-MA', year: 2024, duration: '1 Season', isTrending: true },
    { id: 16, title: 'The Holdovers', posterUrl: 'https://image.tmdb.org/t/p/w400/bWl3zI4hB22hro2zIFb22mS5O7E.jpg', trailerUrl: 'https://www.youtube.com/embed/AhKLpJmHhIg', description: 'A curmudgeonly instructor at a New England prep school is forced to remain on campus during Christmas break to babysit the handful of students with nowhere to go.', genre: 'Comedy', rating: 'R', year: 2023, duration: '2h 13m', isAwardWinner: true },
    { id: 17, title: 'Civil War', posterUrl: 'https://image.tmdb.org/t/p/w400/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg', trailerUrl: 'https://www.youtube.com/embed/a_n8yS9aZ3A', description: 'A journey across a dystopian future America, following a team of military-embedded journalists as they race against time to reach DC before rebel factions descend upon the White House.', isNew: true, genre: 'Action', rating: 'R', year: 2024, duration: '1h 49m', isTrending: true },
    { id: 18, title: 'Baby Reindeer', posterUrl: 'https://image.tmdb.org/t/p/w400/94g2w35a6e3IeI3aowferr4Yn5r.jpg', trailerUrl: 'https://www.youtube.com/embed/eafN2gofMoE', description: 'When a struggling comedian shows an act of kindness to a vulnerable woman, it sparks a suffocating obsession which threatens to wreck both their lives.', isNew: true, genre: 'Drama', rating: 'TV-MA', year: 2024, duration: '7 Ep.', isTrending: true },
    { id: 19, title: 'Furiosa: A Mad Max Saga', posterUrl: 'https://image.tmdb.org/t/p/w400/iADOJ8Zymht2JPMoy3R7xceZprc.jpg', trailerUrl: 'https://www.youtube.com/embed/XJMuhwVlca4', description: 'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland, they come across the Citadel presided over by The Immortan Joe.', isNew: true, genre: 'Action', rating: 'R', year: 2024, duration: '2h 28m', isTrending: true },
    { id: 20, title: 'Kingdom of the Planet of the Apes', posterUrl: 'https://image.tmdb.org/t/p/w400/gKkl37BQuKTanygYQG1pyYgLVgf.jpg', trailerUrl: 'https://www.youtube.com/embed/Kdr5oedn7q8', description: 'Several generations in the future following Caesar\'s reign, apes are now the dominant species and live harmoniously together. Humans have been reduced to a Feral-like existence. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past.', isNew: true, genre: 'Sci-Fi', rating: 'PG-13', year: 2024, duration: '2h 25m', isTrending: true }
  ];
  
export const subscriptionPlans: SubscriptionPlan[] = [
    {
        name: 'Free',
        price: '$0',
        priceYearly: '$0',
        features: [
            'Access to all standard articles',
            'Standard AI summaries',
            'Ad-supported',
            'Limited AI features'
        ]
    },
    {
        name: 'Premium',
        price: '$9.99',
        priceYearly: '$99.99',
        features: [
            'Ad-free experience',
            'Unlimited access to all content',
            'Advanced AI analysis tools',
            'Exclusive "Mahama Investigates" series',
            'High-quality audio versions of articles',
            'AI model preference: Quality',
        ],
        isRecommended: true
    }
];

export const mockCurrentUser: User = {
    id: 'user-123',
    name: 'Eleanor Vance',
    email: 'eleanor.v@example.com',
    avatar: 'https://i.pravatar.cc/150?u=currentuser',
    handle: 'evance',
    bio: 'Journalist and tech enthusiast. Following the threads of innovation and global change.',
    joinDate: '2022-08-15T12:00:00Z',
    isProfilePublic: true,
};

export const LANGUAGES: string[] = ['English', 'French', 'Swahili', 'Kinyarwanda'];

export const TTS_VOICES: { name: string, value: AiTtsVoice }[] = [
  { name: 'Zephyr (Default)', value: 'Zephyr' },
  { name: 'Puck', value: 'Puck' },
  { name: 'Charon', value: 'Charon' },
  { name: 'Kore', value: 'Kore' },
  { name: 'Fenrir', value: 'Fenrir' },
];

export const mockSponsors = [
  {
    name: 'QuantumLeap',
    tagline: 'Compute the Impossible',
    logoUrl: 'https://i.imgur.com/wE6aG2R.png',
    imageUrl: 'https://picsum.photos/seed/sponsor1/600/400',
    website: '#',
  },
  {
    name: 'BioSynth',
    tagline: 'Engineering a Better Tomorrow',
    logoUrl: 'https://i.imgur.com/v8AsK0k.png',
    imageUrl: 'https://picsum.photos/seed/sponsor2/600/400',
    website: '#',
  },
  {
    name: 'StellarForge',
    tagline: 'Building the Interstellar Future',
    logoUrl: 'https://i.imgur.com/I2d3K11.png',
    imageUrl: 'https://picsum.photos/seed/sponsor3/600/400',
    website: '#',
  },
];


export const mockUsers = [
    { id: 'user-1', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { id: 'user-2', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?u=maria' },
    { id: 'user-3', name: 'Chen Wei', avatar: 'https://i.pravatar.cc/150?u=chen' },
];

export const mockComments = [
    {
        id: 'c1',
        user: mockUsers[0],
        text: "This is a monumental step for clean energy. The sustained reaction is the key here. It's one thing to get a net gain for a microsecond, but holding it for several seconds is a game-changer.",
        timestamp: '2 hours ago',
        likes: 15,
        replies: [
            {
                id: 'c1r1',
                user: mockUsers[1],
                text: "Agreed! Still a long way to go for commercial viability, but this proves the physics works. The engineering challenges are next.",
                timestamp: '1 hour ago',
                likes: 7,
                replies: [],
            },
        ],
    },
    {
        id: 'c2',
        user: mockUsers[2],
        text: "The common currency for the EAF is a bold move. I hope they've thoroughly planned the fiscal harmonization. It's been a major stumbling block for other monetary unions.",
        timestamp: '5 hours ago',
        likes: 8,
        replies: [],
    },
];

export const LANGUAGE_VOICE_MAP: Record<string, AiTtsVoice> = {
  'English': 'Zephyr',
  'French': 'fr-FR-A',
  'Swahili': 'sw-KE-A',
  'Kinyarwanda': 'rw-RW-A',
};
