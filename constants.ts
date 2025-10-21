import type { Article, Podcast, User, Comment, Stock, Innovation, StreamingContent, SubscriptionPlan, AiTtsVoice, Category, Notification } from './types';

// Icon imports for categories
import ForYouIcon from './components/icons/ForYouIcon';
import AllIcon from './components/icons/AllIcon';
import GlobeIcon from './components/icons/GlobeIcon';
import PoliticsIcon from './components/icons/PoliticsIcon';
import EconomyIcon from './components/icons/EconomyIcon';
import TechnologyIcon from './components/icons/TechnologyIcon';
import SportsIcon from './components/icons/SportsIcon';
import HealthIcon from './components/icons/HealthIcon';
import HistoryIcon from './components/icons/HistoryIcon';
import MoviesTVIcon from './components/icons/MoviesTVIcon';
import CultureIcon from './components/icons/CultureIcon';
import EntertainmentIcon from './components/icons/EntertainmentIcon';
import ScienceIcon from './components/icons/ScienceIcon';
import EnvironmentIcon from './components/icons/EnvironmentIcon';
import ArtIcon from './components/icons/ArtIcon';
import MusicIcon from './components/icons/MusicIcon';
import InvestigatesIcon from './components/icons/InvestigatesIcon';

export const mockCurrentUser: User = {
  id: 'user-0',
  name: 'Eleanor Vance',
  email: 'eleanor.v@example.com',
  avatar: 'https://i.pravatar.cc/150?u=currentuser',
  handle: 'evance',
  bio: 'Lead political correspondent and AI enthusiast. Following the intersection of technology and global policy.',
  joinDate: '2023-01-15',
  isProfilePublic: true,
};

export const mockUsers: { otherUsers: { id: string; name: string; avatar: string }[] } = {
  otherUsers: [
    { id: 'user-1', name: 'Alex Doe', avatar: 'https://i.pravatar.cc/150?u=alexdoe' },
    { id: 'user-2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=janesmith' },
    { id: 'user-3', name: 'Sam Wilson', avatar: 'https://i.pravatar.cc/150?u=samwilson' },
  ],
};

export const mockComments: Comment[] = [
  {
    id: 'c1',
    user: mockUsers.otherUsers[0],
    text: 'This is a fascinating read. The implications for the global economy are huge. Really makes you think about the supply chain vulnerabilities.',
    timestamp: '2 hours ago',
    likes: 15,
    replies: [
        {
            id: 'c1-r1',
            user: mockUsers.otherUsers[1],
            text: "I agree, Alex. The ripple effects could be felt for years. I'm curious to see how governments will react to this.",
            timestamp: '1 hour ago',
            likes: 7,
            replies: [],
        }
    ],
  },
  {
    id: 'c2',
    user: mockUsers.otherUsers[2],
    text: 'Great analysis, but I think the author overlooks the role of emerging markets in this scenario. Their resilience might be underestimated.',
    timestamp: '5 hours ago',
    likes: 8,
    replies: [],
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'briefing',
    message: 'Your personalized AI news briefing is ready to listen to.',
    timestamp: '5m ago',
    read: false,
  },
  {
    id: 2,
    type: 'comment',
    message: 'Jane Smith replied to your comment on "Global Markets React..."',
    timestamp: '2h ago',
    read: false,
  },
  {
    id: 3,
    type: 'news',
    message: 'New article in Technology: "Breakthrough in Fusion Energy..."',
    timestamp: '4h ago',
    read: true,
  },
  {
    id: 4,
    type: 'mention',
    message: 'Alex Doe mentioned you in the community poll.',
    timestamp: '1d ago',
    read: true,
  },
];

export const mockArticles: Article[] = [
    {
        id: 1,
        title: 'Global Markets React to New AI-Driven Economic Policies',
        excerpt: 'Leaders from G7 nations have announced a groundbreaking framework for economic policies heavily influenced by artificial intelligence, causing ripples across global stock markets.',
        content: 'In a move that has been both lauded and criticized, leaders from the G7 nations convened this week to unveil a new economic framework. This framework, developed in collaboration with leading AI researchers, aims to use predictive algorithms to manage inflation, unemployment, and trade deficits. Proponents argue that this data-driven approach will lead to more stable and prosperous economies, while critics raise concerns about the potential for algorithmic bias and the lack of human oversight. The immediate reaction from Wall Street and other global markets has been mixed, with tech stocks surging while more traditional sectors have seen a slight downturn. The long-term effects of this policy shift remain to be seen, but it undoubtedly marks a significant moment in the intersection of technology and governance.',
        imageUrl: 'https://picsum.photos/seed/picsum1/1200/800',
        author: 'Eleanor Vance',
        date: 'October 26, 2023',
        category: 'Economy',
        live: true,
        region: 'North America',
        sentiment: 'Neutral',
        coordinates: { lat: 40.7128, lon: -74.0060 },
        keyTakeaways: [
            'G7 nations announce new AI-driven economic framework.',
            'The policy aims to manage inflation, unemployment, and trade.',
            'Market reaction is mixed, with tech stocks rising.',
            'Concerns about algorithmic bias and lack of human oversight persist.'
        ],
        tags: ['AI', 'Finance']
    },
    {
        id: 2,
        title: 'Breakthrough in Fusion Energy Could Power Cities by 2040',
        excerpt: 'A consortium of scientists in Europe has achieved a net energy gain in a fusion reaction for a sustained period, a milestone that could pave the way for clean, limitless energy.',
        content: "Scientists at the ITER project in France have announced a historic breakthrough in the quest for fusion energy. For the first time, they have sustained a fusion reaction that produced more energy than it consumed for over five minutes. This achievement, known as 'ignition,' is a critical step towards creating a viable fusion power plant. The successful experiment utilized a new configuration of powerful magnets to contain the superheated plasma. While commercial fusion power plants are still likely decades away, this development is a monumental leap forward. Experts predict that if this technology can be scaled, it could provide a source of clean, safe, and virtually limitless energy, revolutionizing the global energy landscape and playing a key role in combating climate change.",
        imageUrl: 'https://picsum.photos/seed/picsum2/1200/800',
        author: 'Dr. Aris Thorne',
        date: 'October 25, 2023',
        category: 'Technology',
        region: 'Europe',
        sentiment: 'Positive',
        coordinates: { lat: 43.7031, lon: 5.7667 },
        keyTakeaways: [
            'Scientists achieve sustained net energy gain in a fusion reaction.',
            'The breakthrough occurred at the ITER project in France.',
            'This is a critical step towards creating viable fusion power plants.',
            'Fusion energy promises clean, safe, and limitless power.'
        ],
        tags: ['Energy', 'Sci-Fi']
    },
    {
        id: 3,
        title: 'Ancient Underwater City Discovered Off the Coast of Greece',
        excerpt: 'Marine archaeologists have uncovered the ruins of a sprawling Bronze Age city, complete with roads, buildings, and elaborate tombs, submerged in the Aegean Sea.',
        content: "A team of international marine archaeologists has made a stunning discovery off the coast of the Greek island of Kasos: a remarkably well-preserved underwater city dating back to the Bronze Age. The submerged ruins, spanning over 12 acres, include multi-story buildings, paved roads, and a large number of intricate burial sites. Researchers believe the city was a major maritime trading hub before it was consumed by the sea, likely due to a tsunami or earthquake around 1600 BCE. The discovery offers an unprecedented glimpse into the life and culture of this ancient civilization and could rewrite our understanding of trade networks in the prehistoric Aegean. Advanced sonar and underwater drones were used to map the site, and further excavations are planned for the coming year.",
        imageUrl: 'https://picsum.photos/seed/picsum3/1200/800',
        author: 'Sofia Petrova',
        date: 'October 24, 2023',
        category: 'History',
        region: 'Europe',
        sentiment: 'Neutral',
        coordinates: { lat: 35.3999, lon: 26.9324 },
        hasTimeline: true,
        keyTakeaways: [
            'A Bronze Age underwater city was discovered near Kasos, Greece.',
            'The ruins are well-preserved and include buildings, roads, and tombs.',
            'The city was likely a major maritime trading hub.',
            'The discovery could provide new insights into prehistoric Aegean life.'
        ]
    },
    {
        id: 4,
        title: "The Amazon's Unseen Crisis: Deforestation Reaches Record Highs",
        excerpt: 'Despite global pledges, satellite data reveals that deforestation in the Amazon rainforest has accelerated, reaching the highest rate in over a decade.',
        content: 'New satellite data released by Brazil\'s National Institute for Space Research (INPE) paints a grim picture for the Amazon rainforest. Deforestation rates have surged by 22% over the last year, reaching a level not seen since 2006. The primary drivers of this destruction continue to be illegal logging, agricultural expansion for cattle ranching and soy cultivation, and mining operations. Environmental groups are calling for immediate international intervention and stricter enforcement of existing laws. The loss of the Amazon has dire consequences not only for biodiversity but also for global climate patterns, as the rainforest plays a crucial role in absorbing carbon dioxide from the atmosphere. The report comes just weeks before the next major climate summit, putting immense pressure on world leaders to take decisive action.',
        imageUrl: 'https://picsum.photos/seed/picsum4/1200/800',
        author: 'Carlos Mendes',
        date: 'October 23, 2023',
        category: 'World',
        region: 'South America',
        sentiment: 'Negative',
        coordinates: { lat: -3.4653, lon: -62.2159 },
        keyTakeaways: [
            'Amazon deforestation has increased by 22% in the last year.',
            'This is the highest rate of deforestation in over a decade.',
            'Illegal logging, agriculture, and mining are the main causes.',
            'The loss of the rainforest impacts biodiversity and global climate.'
        ]
    },
    {
        id: 5,
        title: "The Rise of 'Neuro-Wellness': A New Frontier in Mental Health?",
        excerpt: 'From wearable brain-sensing headbands to AI-powered therapy apps, the neuro-wellness industry is booming. But do these new technologies actually work?',
        content: "The mental health landscape is being transformed by a wave of new technologies collectively known as 'neuro-wellness'. This burgeoning industry includes everything from EEG headbands that claim to enhance focus through neurofeedback, to smartphone apps that use AI to provide cognitive behavioral therapy. VCs are pouring billions into these startups, and consumers are eager to try these futuristic solutions. However, mental health professionals are cautiously optimistic. While these tools can increase access to care and help individuals track their mental state, experts warn that many products lack rigorous scientific validation. They stress the importance of using these technologies as a supplement to, not a replacement for, traditional therapy and professional medical advice. As the industry grows, the debate over regulation and efficacy is set to intensify.",
        imageUrl: 'https://picsum.photos/seed/picsum5/1200/800',
        author: 'Dr. Evelyn Reed',
        date: 'October 22, 2023',
        category: 'Health',
        region: 'Asia',
        sentiment: 'Neutral',
        coordinates: { lat: 35.6895, lon: 139.6917 },
        keyTakeaways: [
            'The neuro-wellness industry is a rapidly growing sector in mental health.',
            'Technologies include brain-sensing devices and AI therapy apps.',
            'Experts are cautiously optimistic, citing potential for increased access to care.',
            'Concerns remain about the lack of scientific validation for many products.'
        ],
        tags: ['AI', 'Wellness']
    },
    {
        id: 6,
        title: "Politics of a New Age: How Deepfakes Are Shaping the Next Election Cycle",
        excerpt: "As elections approach, a new threat looms large: the use of highly realistic deepfake videos to spread misinformation and influence voters. Experts are scrambling for solutions.",
        content: "With another major election cycle on the horizon, cybersecurity experts are sounding the alarm about the growing threat of deepfakes. These AI-generated videos can realistically depict politicians saying or doing things they never did, making them a potent tool for spreading disinformation. Recent examples have shown how convincing these fakes can be, and social media platforms are struggling to keep up. Lawmakers are debating legislation to criminalize malicious deepfakes, but progress is slow. Meanwhile, tech companies are developing detection algorithms, but it's a constant cat-and-mouse game as the generation technology improves. Voters are being urged to be more critical of the content they see online and to rely on trusted news sources for information. The upcoming election may be the first major test of our society's ability to combat this new form of digital deception.",
        imageUrl: 'https://picsum.photos/seed/picsum6/1200/800',
        author: 'Jenna Ortiz',
        date: 'October 21, 2023',
        category: 'Politics',
        region: 'North America',
        sentiment: 'Negative',
        coordinates: { lat: 38.9072, lon: -77.0369 },
        hasTimeline: true,
        keyTakeaways: [
          'Deepfake videos pose a significant threat to upcoming elections.',
          'These AI-generated videos can be used to spread misinformation.',
          'Social media platforms and lawmakers are struggling to address the issue.',
          'Voters are advised to be critical of online content and use trusted sources.'
        ],
        tags: ['AI', 'Cybersecurity', 'Elections']
    },
    {
        id: 7,
        title: "World Championship Decided in Last-Second Thriller",
        excerpt: "The final match of the World Esports Championship came down to a nail-biting finish, with the underdogs clinching victory in the final seconds of the game.",
        content: "In an electrifying conclusion to the World Esports Championship, the 'Digital Dragons' have defeated the three-time reigning champions, 'Quantum Leap', in a match that will be remembered for years to come. The best-of-five series was tied 2-2, and the final game was a back-and-forth battle of strategy and skill. With only seconds left on the clock, the Dragons executed a daring, high-risk play that caught Quantum Leap completely off guard, securing them the win and the championship title. The arena erupted as fans who had traveled from all over the world stormed the stage to celebrate with the new champions. The victory is seen as a major upset and a testament to the growing talent pool in the competitive gaming scene. The MVP of the tournament was the Dragons' 19-year-old prodigy, known only by his handle, 'Pixel'.",
        imageUrl: 'https://picsum.photos/seed/picsum7/1200/800',
        author: 'Kevin Lee',
        date: 'October 20, 2023',
        category: 'Sports',
        region: 'Asia',
        sentiment: 'Positive',
        coordinates: { lat: 37.5665, lon: 126.9780 },
        keyTakeaways: [
          "The 'Digital Dragons' won the World Esports Championship.",
          'They defeated the three-time champions, Quantum Leap.',
          'The final match was decided in the last seconds of the game.',
          "The tournament MVP was the Dragons' young star, 'Pixel'."
        ],
        tags: ['Gaming']
    },
    {
        id: 8,
        title: "The Great Migration: How Climate Change is Reshaping African Wildlife",
        excerpt: "Unprecedented droughts and shifting weather patterns are forcing iconic African wildlife to alter their ancient migration routes, creating new challenges for conservation.",
        content: "Conservationists in the Serengeti are observing a dramatic shift in the great wildebeest migration, one of nature's most spectacular events. Due to prolonged droughts in the southern plains, the herds are moving north earlier than ever before, seeking greener pastures. This change is putting immense pressure on the ecosystem and creating new human-wildlife conflicts as the animals venture into areas they haven't inhabited for generations. Researchers are using GPS collars and satellite imagery to track these new routes and understand the long-term impacts. The phenomenon is not limited to wildebeest; elephants in Botswana and zebras in Kenya are also exhibiting similar changes in behavior. This is a stark reminder of how climate change is actively reshaping the natural world, and it presents a complex challenge for conservation efforts across the continent.",
        imageUrl: 'https://picsum.photos/seed/picsum8/1200/800',
        author: 'Dr. Aisha N\'Diaye',
        date: 'October 19, 2023',
        category: 'World',
        region: 'Africa',
        sentiment: 'Negative',
        coordinates: { lat: -2.3333, lon: 34.8333 },
        keyTakeaways: [
          'Climate change is altering wildlife migration patterns in Africa.',
          'The great wildebeest migration in the Serengeti is starting earlier due to drought.',
          'This is leading to increased human-wildlife conflict.',
          'Conservationists are using technology to track and study these changes.'
        ]
    },
    {
        id: 9,
        title: 'Blockbuster Film "Dune: Part Two" Smashes Box Office Records',
        excerpt: 'The sci-fi epic "Dune: Part Two" has taken the world by storm, grossing over $700 million globally, setting a new record for the post-pandemic era.',
        content: '"Dune: Part Two," the highly anticipated sci-fi adventure from director Denis Villeneuve, has exceeded all expectations. The film\'s stunning visuals, compelling storyline, and charismatic cast have resonated with audiences worldwide. Industry analysts are now predicting it could become one of the highest-grossing films of all time. The success of "Dune" is seen as a major win for movie theaters, which have been struggling to attract audiences back. The film follows Paul Atreides as he unites with the Fremen people of the desert planet Arrakis to wage war against House Harkonnen.',
        imageUrl: 'https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8soXRmfddl.jpg',
        author: 'Chloe Kim',
        date: 'March 1, 2024',
        category: 'Movies & TV',
        region: 'North America',
        sentiment: 'Positive',
        coordinates: { lat: 34.0522, lon: -118.2437 },
        keyTakeaways: [
            '"Dune: Part Two" grossed over $700 million worldwide.',
            'The film has set a new post-pandemic box office record.',
            'Its success is a significant boost for the movie theater industry.',
            'The film is praised for its visuals, story, and cast performance.'
        ]
    },
    {
        id: 10,
        title: 'The Lost Symphony: Rediscovered Manuscript of a Classical Masterpiece',
        excerpt: 'A previously unknown symphony by 18th-century composer Amadeus Richter has been discovered in a dusty attic in Vienna, stunning the classical music world.',
        content: 'Musicologists are in a state of euphoria after the discovery of a complete, handwritten manuscript for a symphony by Amadeus Richter, a contemporary of Mozart whose work was thought to be largely lost. The manuscript, found by a family while renovating their ancestral home, has been authenticated by experts and is being hailed as a monumental find. The "Vienna" symphony, as it is being called, is a powerful four-movement work that showcases Richter\'s genius for melody and orchestration. The discovery sheds new light on the musical landscape of the classical period and adds a major new work to the orchestral repertoire. A world premiere performance is already being planned by the Vienna Philharmonic for later this year.',
        imageUrl: 'https://picsum.photos/seed/picsum10/1200/800',
        author: 'Klaus Mueller',
        date: 'October 28, 2023',
        category: 'Culture',
        region: 'Europe',
        sentiment: 'Positive',
        coordinates: { lat: 48.2082, lon: 16.3738 },
        keyTakeaways: [
            'A lost symphony by 18th-century composer Amadeus Richter has been found.',
            'The manuscript was discovered in an attic in Vienna.',
            'The work is considered a major addition to the classical repertoire.',
            'The Vienna Philharmonic is planning a world premiere performance.'
        ],
        tags: ['Music', 'Classical']
    },
    {
        id: 11,
        title: 'Virtual Reality Concerts: The Future of Live Entertainment?',
        excerpt: 'Pop superstar Aura held a groundbreaking concert entirely within a virtual reality metaverse, drawing millions of fans from around the globe. Is this the new normal for live music?',
        content: 'Last night, pop sensation Aura made history by hosting a full-length concert in the "Oasis" metaverse. Fans, represented by their custom avatars, were able to fly through fantastical landscapes, interact with each other, and experience the music in a way that would be impossible in a physical venue. The event was a massive technical undertaking, featuring real-time motion capture of Aura and her dancers, and stunning, interactive visual effects that were synchronized with the music. While some critics argue that it can never replace the energy of a live, in-person show, the concert\'s massive success and positive fan reception suggest that virtual reality is poised to become a major platform for entertainment. Promoters are already looking at this as a new, highly lucrative revenue stream.',
        imageUrl: 'https://picsum.photos/seed/picsum11/1200/800',
        author: 'Madison Chen',
        date: 'October 29, 2023',
        category: 'Entertainment',
        region: 'Asia',
        sentiment: 'Neutral',
        coordinates: { lat: 22.3193, lon: 114.1694 },
        keyTakeaways: [
            'Pop star Aura held a successful concert in a VR metaverse.',
            'Millions of fans attended the event as virtual avatars.',
            'The concert featured advanced motion capture and interactive visuals.',
            'The event highlights the growing potential of VR in the entertainment industry.'
        ],
        tags: ['VR', 'Virtual Reality', 'Music']
    },
    {
        id: 12,
        title: 'CRISPR Gene Editing Shows Promise in Curing Genetic Blindness',
        excerpt: 'A landmark clinical trial has successfully used CRISPR-Cas9 technology to restore vision in patients with a rare form of hereditary blindness.',
        content: 'In a significant step forward for genetic medicine, researchers have reported positive results from the first human trial using CRISPR gene editing to treat a genetic disorder directly inside the body. The trial focused on Leber congenital amaurosis, a rare disease that causes blindness in childhood. Patients who received the treatment showed marked improvements in their ability to perceive light and navigate obstacles. The therapy works by delivering the CRISPR tool via a harmless virus to edit a faulty gene in the retina. While the long-term effects are still being studied, this breakthrough opens the door for in-vivo gene editing to treat a wide range of other genetic diseases.',
        imageUrl: 'https://picsum.photos/seed/picsum12/1200/800',
        author: 'Dr. Kenji Tanaka',
        date: 'November 1, 2023',
        category: 'Science',
        region: 'North America',
        sentiment: 'Positive',
        coordinates: { lat: 42.3601, lon: -71.0589 },
        keyTakeaways: [
            'CRISPR gene editing successfully used to treat hereditary blindness in a human trial.',
            'Patients showed significant improvement in vision.',
            'This marks a milestone for in-vivo (inside the body) gene editing.',
            'The technology holds promise for treating other genetic disorders.'
        ],
        tags: ['Biotech', 'CRISPR']
    },
    {
        id: 13,
        title: '"Ocean Sanctuaries": New Global Pact to Protect 30% of Oceans by 2030',
        excerpt: 'After years of negotiations, United Nations members have agreed on a historic treaty to protect international waters, a crucial step for marine biodiversity.',
        content: 'In a landmark decision, nations across the globe have finalized the High Seas Treaty, an agreement aimed at placing 30% of the world\'s oceans into protected areas by 2030. These "ocean sanctuaries" will restrict fishing, shipping routes, and deep-sea mining to allow marine ecosystems to recover. The treaty provides a legal framework for conservation efforts in international waters, which were previously largely unregulated. Environmental groups have hailed the agreement as a victory for ocean life, but stress that its success will depend on rapid ratification and effective enforcement by member states. The pact is seen as essential for mitigating the impacts of climate change, overfishing, and pollution on the world\'s oceans.',
        imageUrl: 'https://picsum.photos/seed/picsum13/1200/800',
        author: 'Maria Santos',
        date: 'November 2, 2023',
        category: 'Environment',
        region: 'Europe',
        sentiment: 'Positive',
        coordinates: { lat: 46.2044, lon: 6.1432 },
        keyTakeaways: [
            'A historic High Seas Treaty has been agreed upon at the UN.',
            'The goal is to protect 30% of the world\'s oceans by 2030.',
            'The treaty establishes a framework for creating "ocean sanctuaries" in international waters.',
            'Success depends on rapid ratification and enforcement.'
        ]
    },
    {
        id: 20,
        title: 'James Webb Telescope Discovers Exoplanet with Water Vapor',
        excerpt: 'Astronomers are ecstatic after the JWST detected significant water vapor in the atmosphere of a rocky exoplanet within its star\'s habitable zone.',
        content: 'The James Webb Space Telescope has delivered another groundbreaking discovery: a rocky planet, GJ 486b, just 26 light-years away, shows signs of a water-rich atmosphere. While the planet is too hot to host liquid water on its surface, the presence of atmospheric water vapor is a tantalizing clue in the search for life beyond Earth. Scientists theorize the water could be sustained by volcanic activity. This is the first time water has been detected on a rocky exoplanet of this size and temperature, showcasing the incredible capabilities of the JWST.',
        imageUrl: 'https://picsum.photos/seed/jwst2023/1200/800',
        author: 'Dr. Lena Petrova',
        date: 'November 9, 2023',
        category: 'Science',
        region: 'North America',
        sentiment: 'Positive',
        coordinates: { lat: 39.0997, lon: -94.5786 },
        keyTakeaways: [
            'JWST detected water vapor on a rocky exoplanet, GJ 486b.',
            'The planet is 26 light-years away and is too hot for surface liquid water.',
            'This discovery is a major step in the search for habitable worlds.',
            'Volcanic activity might be replenishing the atmospheric water.'
        ],
        tags: ['Space', 'Astronomy']
    },
    {
        id: 21,
        title: 'Formula 1 Unveils Radical New Car Designs for 2026',
        excerpt: 'The FIA has revealed the next generation of Formula 1 cars, focusing on sustainability, closer racing, and lighter, more agile machinery.',
        content: 'Formula 1 is set for a major shake-up in 2026 with the introduction of new technical regulations. The new cars will feature smaller, lighter chassis and rely on 100% sustainable fuels. A key feature is the introduction of "active aerodynamics," with movable wings to reduce drag on straights and increase downforce in corners, designed to allow cars to follow each other more closely and promote overtaking. The power units will also be revamped, with a greater emphasis on electrical power. Teams are already hard at work in their simulators trying to understand and exploit these new rules.',
        imageUrl: 'https://picsum.photos/seed/f12026/1200/800',
        author: 'Marco Rossi',
        date: 'November 10, 2023',
        category: 'Sports',
        region: 'Europe',
        sentiment: 'Neutral',
        coordinates: { lat: 43.7348, lon: 7.4246 },
        keyTakeaways: [
            'F1 introduces new car regulations for the 2026 season.',
            'New cars will be smaller, lighter, and use 100% sustainable fuels.',
            'Active aerodynamics are being introduced to improve racing.',
            'Power units will have an increased electrical component.'
        ],
        tags: ['Formula 1', 'Motorsport']
    },
    {
        id: 22,
        title: 'The Future of Urban Farming: Vertical Farms Take Root in Megacities',
        excerpt: 'Vast indoor vertical farms are being built in cities like Singapore and New York, promising fresher produce with a fraction of the water and land usage.',
        content: 'As urban populations swell, a new kind of agriculture is rising: vertical farming. These high-tech facilities stack crops in vertically layered systems under LED lights, using hydroponics or aeroponics. This method uses up to 95% less water than traditional farming and eliminates the need for pesticides. By growing food directly in cities, it drastically reduces transportation costs and carbon emissions, delivering produce from "farm" to table in hours. While initial setup costs are high, proponents argue the long-term benefits for food security and sustainability are immense.',
        imageUrl: 'https://picsum.photos/seed/verticalfarm/1200/800',
        author: 'Chloe Tan',
        date: 'November 11, 2023',
        category: 'Technology',
        region: 'Asia',
        sentiment: 'Positive',
        coordinates: { lat: 1.3521, lon: 103.8198 },
        keyTakeaways: [
            'Vertical farms are becoming a key part of urban agriculture.',
            'They use significantly less water and land than traditional farming.',
            'Growing food in cities reduces transportation costs and emissions.',
            'High setup costs are a barrier, but the sustainability benefits are large.'
        ],
        tags: ['Agriculture', 'Sustainability', 'Food']
    },
    {
        id: 23,
        title: 'Stolen Van Gogh Masterpiece Recovered in Daring Undercover Operation',
        excerpt: 'After being stolen from a Dutch museum three years ago, Van Gogh\'s "The Parsonage Garden at Nuenen in Spring" has been found and returned.',
        content: 'In a story worthy of a spy thriller, Dutch art detective Arthur Brand has successfully recovered a stolen Vincent van Gogh painting. "The Parsonage Garden at Nuenen in Spring" (1884) was taken in a smash-and-grab raid in 2020. Brand, working with Dutch police, negotiated its return through a series of clandestine meetings with intermediaries linked to the criminal underworld. The painting was delivered to him in an IKEA bag. The artwork is now being examined for damage but appears to be in good condition. The recovery is a major victory for the art world in the fight against cultural heritage crime.',
        imageUrl: 'https://picsum.photos/seed/vangogh/1200/800',
        author: 'Juliette Dubois',
        date: 'November 12, 2023',
        category: 'Art',
        region: 'Europe',
        sentiment: 'Positive',
        coordinates: { lat: 52.3676, lon: 4.9041 },
        keyTakeaways: [
            'A stolen Van Gogh painting has been recovered after three years.',
            'The recovery was led by art detective Arthur Brand.',
            'The artwork was returned via a clandestine operation.',
            'The painting appears to be in good condition.'
        ],
        tags: ['Art Crime']
    },
     {
        id: 24,
        title: 'The K-Pop Phenomenon: How South Korea Built a Global Music Empire',
        excerpt: 'From BTS to BLACKPINK, K-Pop has become a dominant force in global entertainment. We explore the strategy, training, and cultural impact behind the Hallyu wave.',
        content: 'K-Pop is more than just music; it\'s a multi-billion dollar industry meticulously crafted by South Korean entertainment agencies. The formula involves years of rigorous training for young "idols," high-production music videos, savvy social media marketing, and a deep connection with a global fanbase. This cultural export has not only boosted the South Korean economy but has also become a powerful tool of soft power. This article delves into the intense training academies, the business models of companies like HYBE and YG Entertainment, and how K-Pop has managed to break barriers in the Western music market.',
        imageUrl: 'https://picsum.photos/seed/kpop2023/1200/800',
        author: 'Chloe Kim',
        date: 'November 13, 2023',
        category: 'Music',
        region: 'Asia',
        sentiment: 'Neutral',
        coordinates: { lat: 37.5665, lon: 126.9780 },
        keyTakeaways: [
            'K-Pop has grown into a global, multi-billion dollar industry.',
            'The system relies on intense training, high production value, and strong fan engagement.',
            'It serves as a significant cultural export and tool of soft power for South Korea.',
            'The business models of major agencies are key to its success.'
        ],
        tags: ['K-Pop', 'Entertainment', 'Culture']
    },
    {
        id: 25,
        title: 'Breakthrough in Alzheimer\'s Research Offers New Hope for Treatment',
        excerpt: 'A new drug, lecanemab, has shown in clinical trials to significantly slow cognitive decline in early-stage Alzheimer\'s patients, a major milestone in a field with few successes.',
        content: 'The fight against Alzheimer\'s disease has a new beacon of hope. A groundbreaking clinical trial for the drug lecanemab has shown it can slow the progression of memory and thinking problems by 27% over 18 months. The drug works by clearing amyloid plaques, a sticky protein that builds up in the brains of Alzheimer\'s patients. While not a cure, it is the first drug to convincingly demonstrate a slowing of the disease\'s progression. Neurologists are hailing it as a historic moment, offering the first real tool to modify the course of the disease, though they caution that it comes with risks of side effects like brain swelling.',
        imageUrl: 'https://picsum.photos/seed/alzheimers/1200/800',
        author: 'Dr. Evelyn Reed',
        date: 'November 14, 2023',
        category: 'Health',
        region: 'North America',
        sentiment: 'Positive',
        coordinates: { lat: 42.3601, lon: -71.0589 },
        keyTakeaways: [
            'New drug lecanemab slows cognitive decline in early Alzheimer\'s by 27%.',
            'The drug targets and clears amyloid plaques from the brain.',
            'It is considered a historic breakthrough, though not a cure.',
            'Potential side effects like brain swelling require careful monitoring.'
        ],
        tags: ['Medical', 'Biotech', 'Neurology']
    },
    {
        id: 26,
        title: 'Central Banks Grapple with Persistent Inflation Amid Global Uncertainty',
        excerpt: 'The Federal Reserve and European Central Bank face a difficult balancing act as they attempt to curb inflation without triggering a deep recession.',
        content: 'Despite aggressive interest rate hikes over the past year, inflation remains stubbornly high in many Western economies. Central bankers are now at a crossroads. Raising rates further could stifle economic growth and lead to widespread job losses, but failing to control inflation could erode consumer purchasing power for years to come. Geopolitical conflicts, supply chain disruptions, and a tight labor market are all contributing to the complex economic picture. This article analyzes the tools at the central banks\' disposal, the differing opinions among economists, and the potential impact on everyday citizens.',
        imageUrl: 'https://picsum.photos/seed/inflation23/1200/800',
        author: 'Eleanor Vance',
        date: 'November 15, 2023',
        category: 'Economy',
        region: 'Europe',
        sentiment: 'Negative',
        coordinates: { lat: 50.8503, lon: 4.3517 },
        keyTakeaways: [
            'Inflation remains high despite central bank interest rate hikes.',
            'Central banks must balance fighting inflation with avoiding a recession.',
            'Geopolitical issues and supply chain problems are complicating factors.',
            'The economic outlook remains uncertain.'
        ],
        tags: ['Finance', 'Markets', 'Business']
    },
    {
        id: 27,
        title: 'New Data Privacy Laws Passed in EU, Setting Global Precedent',
        excerpt: 'The European Union has approved the Digital Services Act (DSA) and Digital Markets Act (DMA), a sweeping package of regulations aimed at curbing the power of Big Tech.',
        content: 'In a landmark move, the EU has passed two new pieces of legislation that will fundamentally change the digital landscape. The DSA focuses on content moderation, forcing platforms to be more transparent about their algorithms and to act faster to remove illegal content. The DMA targets "gatekeeper" companies like Google, Apple, and Amazon, imposing strict rules to prevent anti-competitive behavior and promote a fairer digital market. These laws are expected to have a ripple effect globally, as tech companies may adopt these higher standards worldwide to simplify their operations. Critics, however, worry about the impact on innovation and potential for stifling free speech.',
        imageUrl: 'https://picsum.photos/seed/dma2023/1200/800',
        author: 'Jenna Ortiz',
        date: 'November 16, 2023',
        category: 'Politics',
        region: 'Europe',
        sentiment: 'Neutral',
        coordinates: { lat: 48.8566, lon: 2.3522 },
        keyTakeaways: [
            'The EU has passed the DSA and DMA to regulate Big Tech.',
            'The laws address content moderation, algorithms, and anti-competitive practices.',
            'They are expected to set a new global standard for tech regulation.',
            'Concerns exist about potential impacts on innovation and free speech.'
        ],
        tags: ['Policy', 'Technology']
    },
    {
        id: 28,
        title: 'Declassified Documents Reveal Cold War Nuclear Close Call',
        excerpt: 'Newly released government archives detail a 1983 incident where a Soviet officer averted a potential nuclear war by disobeying orders.',
        content: 'A trove of declassified documents has shed new light on the "Able Archer 83" incident, a NATO military exercise that the Soviet Union misinterpreted as a prelude to a nuclear strike. The documents reveal the story of Stanislav Petrov, a Soviet Air Defence Forces officer who, faced with satellite warnings of incoming US missiles, judged them to be a false alarm and refused to report them up the chain of command. His decision likely prevented a retaliatory Soviet launch and a full-scale nuclear war. This story serves as a chilling reminder of how close the world came to catastrophe during the Cold War.',
        imageUrl: 'https://picsum.photos/seed/coldwar/1200/800',
        author: 'Dr. Aris Thorne',
        date: 'November 17, 2023',
        category: 'History',
        region: 'Europe',
        sentiment: 'Neutral',
        coordinates: { lat: 55.7558, lon: 37.6173 },
        hasTimeline: true,
        keyTakeaways: [
            'Declassified files reveal a 1983 nuclear close call.',
            'Soviet officer Stanislav Petrov correctly identified a false alarm for a US missile strike.',
            'His decision to disobey protocol likely prevented a nuclear war.',
            'The incident highlights the intense dangers of the Cold War era.'
        ],
        tags: ['Cold War', 'Geopolitics']
    },
     {
        id: 29,
        title: 'Report: Coral Reefs Facing Unprecedented Global Bleaching Event',
        excerpt: 'Record-breaking ocean temperatures are triggering the fourth global mass coral bleaching event, threatening vital marine ecosystems from Australia to Florida.',
        content: 'Scientists at NOAA have confirmed the world is in the midst of its fourth global mass coral bleaching event. Unusually warm ocean waters, driven by climate change and an El Niño pattern, are causing corals to expel the algae living in their tissues, turning them white. This is not just an aesthetic issue; bleached coral is stressed and more susceptible to disease and death. The Great Barrier Reef, as well as reefs in the Caribbean and Pacific, are being hit hard. The loss of these reefs has devastating consequences for marine biodiversity and the millions of people who depend on them for food and coastal protection.',
        imageUrl: 'https://picsum.photos/seed/coralreef/1200/800',
        author: 'Maria Santos',
        date: 'November 18, 2023',
        category: 'Environment',
        region: 'Oceania',
        sentiment: 'Negative',
        coordinates: { lat: -18.2871, lon: 147.6992 },
        keyTakeaways: [
            'A fourth global mass coral bleaching event is underway due to record ocean heat.',
            'Coral bleaching stresses and can kill coral, devastating ecosystems.',
            'Major reefs like the Great Barrier Reef are severely impacted.',
            'The event threatens marine life and coastal communities.'
        ],
        tags: ['Climate Change', 'Oceans']
    },
     {
        id: 30,
        title: 'The Rise of Immersive Theater: Audiences Step Into the Story',
        excerpt: 'From "Sleep No More" to new VR experiences, immersive theater is breaking the fourth wall and putting audiences at the center of the action.',
        content: 'A new wave of theatrical productions is ditching traditional seating and stages for sprawling, interactive environments. In these shows, audiences are free to roam through detailed sets, follow different characters, and piece together the narrative for themselves. This form of storytelling creates a uniquely personal and engaging experience, making the audience member an active participant rather than a passive observer. This article explores the pioneers of the genre, the logistical challenges of creating these complex worlds, and how technology like virtual and augmented reality is pushing the boundaries of what a "play" can be.',
        imageUrl: 'https://picsum.photos/seed/theater2023/1200/800',
        author: 'Madison Chen',
        date: 'November 19, 2023',
        category: 'Entertainment',
        region: 'North America',
        sentiment: 'Positive',
        coordinates: { lat: 40.7128, lon: -74.0060 },
        keyTakeaways: [
            'Immersive theater is a growing trend in live entertainment.',
            'It allows audiences to move freely and interact with the performance space.',
            'The genre creates a personal and active viewing experience.',
            'New technologies like VR are expanding the possibilities of immersive storytelling.'
        ],
        tags: ['Theater', 'VR']
    },
    {
        id: 35,
        title: "Echoes of a Monarchy: The Enduring Legacy of the Kingdom of Rwanda",
        excerpt: "Before colonial lines were drawn, the Kingdom of Rwanda stood as a highly centralized state in the Great Rift Valley. This article explores its complex social structure, the divine authority of the Mwami (king), and the traditions that shaped a nation.",
        content: "For centuries before European colonization, the Kingdom of Rwanda existed as one of the most organized and powerful states in the Great Lakes region of Africa. At its apex was the Mwami, a divine king from the Tutsi lineage, who ruled over a society comprised of Tutsi, Hutu, and Twa groups. The socio-economic fabric was woven through the 'ubuhake' system, a complex patronage relationship where Tutsi lords provided cattle—a symbol of wealth and status—to clients in exchange for service and loyalty. This intricate social hierarchy, while functional for a time, would later be dangerously simplified and exploited by colonial powers, laying the groundwork for future conflicts.",
        imageUrl: "https://picsum.photos/seed/rwanda-kingdom/1200/800",
        author: "Dr. Imani Gasana",
        date: 'November 24, 2023',
        category: 'History',
        region: 'Africa',
        sentiment: 'Neutral',
        coordinates: { lat: -1.9403, lon: 29.8739 },
        hasTimeline: true,
        keyTakeaways: [
            'The Kingdom of Rwanda was a highly centralized pre-colonial state.',
            'Society was structured around Tutsi, Hutu, and Twa groups with the Mwami at its apex.',
            'The Ubuhake patronage system was central to its socio-economic fabric.',
            'The kingdom\'s history provides crucial context for understanding modern Rwanda.'
        ]
    },
    {
        id: 36,
        title: "100 Days of Horror: Remembering the 1994 Genocide Against the Tutsi in Rwanda",
        excerpt: "In one of history's darkest chapters, an estimated 800,000 people were systematically murdered over 100 days. This solemn report revisits the context, the triggers, and the devastating human cost of the 1994 Genocide Against the Tutsi.",
        content: "The 1994 Genocide Against the Tutsi in Rwanda stands as a catastrophic failure of the international community and a chilling testament to the speed and brutality of organized violence. Fueled by decades of ethnic tension, exacerbated by colonial policies, and ignited by the assassination of President Juvénal Habyarimana, the genocide was meticulously planned by Hutu extremists. Militias like the Interahamwe, armed with machetes and fueled by hate radio, carried out the majority of the killings. For 100 days, the world watched as neighbor turned against neighbor in a frenzy of violence. The genocide's end only came when the Rwandan Patriotic Front (RPF), a Tutsi-led rebel army, captured Kigali and overthrew the extremist government.",
        imageUrl: "https://picsum.photos/seed/rwanda-genocide/1200/800",
        author: "Dr. Imani Gasana",
        date: 'November 25, 2023',
        category: 'History',
        region: 'Africa',
        sentiment: 'Negative',
        coordinates: { lat: -1.9441, lon: 30.0619 },
        hasTimeline: true,
        keyTakeaways: [
            'The 1994 Genocide Against the Tutsi resulted in the mass murder of approximately 800,000 people.',
            'It was fueled by extremist Hutu Power ideology and decades of ethnic tension.',
            'The international community was widely criticized for its failure to prevent or stop the killings.',
            'The genocide\'s memory is a central part of Rwanda\'s national identity and path to reconciliation.'
        ]
    },
    {
        id: 37,
        title: "Rwanda Reborn: The Path from Devastation to Africa's 'Economic Miracle'",
        excerpt: "In the decades since 1994, Rwanda has undergone a remarkable transformation. From a nation shattered by violence, it has emerged as a model of stability, economic growth, and technological innovation in Africa. This analysis explores the policies behind the recovery.",
        content: "Rwanda's post-genocide story is one of astonishing resilience and determined nation-building. Under the leadership of President Paul Kagame and the RPF, the country embarked on a radical path of reconstruction. A key focus was replacing ethnic identity with a unified national identity. Justice was pursued through both a UN tribunal and community-based Gacaca courts, which processed over a million cases. The government has aggressively pursued a vision of turning Rwanda into a knowledge-based, middle-income country, investing heavily in technology, infrastructure, and business-friendly policies. While the 'Singapore of Africa' model has drawn praise for its economic success and low corruption, it has also faced criticism regarding human rights and political freedoms.",
        imageUrl: "https://picsum.photos/seed/rwanda-reborn/1200/800",
        author: "Dr. Imani Gasana",
        date: 'November 26, 2023',
        category: 'History',
        region: 'Africa',
        sentiment: 'Positive',
        coordinates: { lat: -1.9535, lon: 30.0913 },
        hasTimeline: true,
        keyTakeaways: [
            'Rwanda has experienced significant economic growth and social stability since 1994.',
            'Key strategies include national unity programs and transitional justice systems like Gacaca courts.',
            'The country has heavily invested in technology, aiming to become a knowledge-based economy.',
            'The economic success is sometimes contrasted with concerns about political freedoms.'
        ]
    }
];

export const hiddenArticles: Article[] = [
    {
        id: 14,
        title: 'Digital Da Vinci: AI Artist Sells Masterpiece for Record Sum',
        excerpt: 'An artwork created entirely by an artificial intelligence known as "Aether" has been sold at auction for over $10 million, raising questions about the future of creativity.',
        content: 'The art world is buzzing after "Electric Dreams," a mesmerizing digital painting generated by the AI Aether, fetched a staggering $10.2 million at a prestigious London auction house. The piece, which dynamically shifts and evolves on its high-resolution display, was "trained" on the entire history of Western art but developed a style described by critics as entirely unique. The sale has ignited a fierce debate about the nature of art and authorship. While some celebrate it as a new frontier of human-machine collaboration, others fear it devalues human creativity. The anonymous collective behind Aether states their goal is not to replace artists but to create a new tool for artistic expression.',
        imageUrl: 'https://picsum.photos/seed/art2023/1200/800',
        author: 'Juliette Dubois',
        date: 'November 3, 2023',
        category: 'Art',
        region: 'Europe',
        sentiment: 'Neutral',
        coordinates: { lat: 51.5072, lon: -0.1276 },
        keyTakeaways: [
            'An AI-generated artwork sold for over $10 million at auction.',
            'The AI, "Aether," created a unique style after being trained on art history.',
            'The sale has sparked a debate on AI\'s role in art and creativity.',
            'The creators view the AI as a new tool for artists.'
        ],
        tags: ['AI']
    },
    {
        id: 15,
        title: 'The Unheard Sound: How AI is Resurrecting Lost Musical Traditions',
        excerpt: 'Researchers are using machine learning to reconstruct and perform music from ancient cultures, offering a glimpse into soundscapes lost to time.',
        content: 'A team of ethnomusicologists and computer scientists has developed an AI model that can interpret ancient, fragmented musical notations and even predict how instruments that no longer exist might have sounded. By feeding the AI data from archaeological findings, historical texts, and the physics of materials, the system can generate full musical performances. Their latest project, a reconstruction of a Hittite ceremonial hymn, has been released online to critical acclaim. "We are not just hearing notes; we are hearing a culture," said the project lead. The technology offers a revolutionary way to engage with history and preserve intangible cultural heritage that would otherwise be permanently silent.',
        imageUrl: 'https://picsum.photos/seed/music2023/1200/800',
        author: 'Dr. Samuel Chen',
        date: 'November 4, 2023',
        category: 'Music',
        region: 'Asia',
        sentiment: 'Positive',
        coordinates: { lat: 39.9042, lon: 116.4074 },
        keyTakeaways: [
            'AI is being used to reconstruct music from ancient cultures.',
            'The system can interpret fragmented notations and simulate lost instruments.',
            'A recent project successfully reconstructed a Hittite ceremonial hymn.',
            'The technology is a new tool for preserving cultural heritage.'
        ],
        tags: ['AI']
    },
    {
        id: 16,
        title: 'Global Language Revival: Indigenous Tongues Go Digital',
        excerpt: 'A new initiative is using AI and community-driven platforms to document and teach endangered indigenous languages, creating a digital lifeline for cultural heritage.',
        content: 'The "Native Tongues" project is a global collaboration that pairs linguists with indigenous communities to preserve languages at risk of disappearing. Using mobile apps, community members can record spoken words, stories, and songs, which an AI then analyzes to build a comprehensive linguistic model. This model powers interactive lessons, dictionaries, and translation tools. The project has already seen success in revitalizing languages like Ainu in Japan and Quechua in Peru. "This isn\'t just about saving words; it\'s about saving worlds," explained the project director. By creating a living digital archive, they hope to ensure these vital parts of human culture are accessible for generations to come.',
        imageUrl: 'https://picsum.photos/seed/culture2023a/1200/800',
        author: 'Isabella Rossi',
        date: 'November 5, 2023',
        category: 'Culture',
        region: 'Oceania',
        sentiment: 'Positive',
        coordinates: { lat: -33.8688, lon: 151.2093 },
        keyTakeaways: [
          'A new project uses AI to document and teach endangered languages.',
          'Community members use apps to record their native tongues.',
          'The AI builds interactive lessons and dictionaries from the data.',
          'The initiative aims to create a digital archive for cultural preservation.'
        ],
        tags: ['AI', 'Language']
    },
    {
        id: 17,
        title: 'The Culinary Comeback: How Ancient Grains Are Reshaping Modern Cuisine',
        excerpt: 'Chefs and food scientists are looking to the past to innovate, bringing ancient grains like fonio, amaranth, and teff back to the forefront of gastronomy.',
        content: 'A culinary renaissance is underway, centered on grains that have been cultivated for millennia but were largely forgotten by industrial agriculture. These "ancient grains" are prized not only for their unique, nutty flavors but also for their nutritional benefits and resilience to climate change. Top restaurants are featuring them in everything from artisanal breads to gourmet porridges, and they are rapidly gaining popularity among home cooks. Food scientists are also studying their genetic makeup, hoping to learn lessons that can be applied to modern crops. This trend represents a delicious intersection of history, culture, and sustainability, proving that sometimes the most innovative ideas are the ones that have been with us all along.',
        imageUrl: 'https://picsum.photos/seed/culture2023b/1200/800',
        author: 'Kenjiro Sato',
        date: 'November 6, 2023',
        category: 'Culture',
        region: 'Africa',
        sentiment: 'Positive',
        coordinates: { lat: 9.0765, lon: 7.3986 },
        keyTakeaways: [
          'Ancient grains like fonio and amaranth are becoming popular in modern cuisine.',
          'These grains are valued for their flavor, nutritional benefits, and climate resilience.',
          'Top chefs are incorporating them into their menus.',
          'The trend combines history, culture, and sustainability.'
        ],
        tags: ['Food']
    },
    {
        id: 18,
        title: 'Inside the Matrix: How "Bullet Time" Changed Cinema Forever',
        excerpt: 'A deep dive into the revolutionary visual effects of "The Matrix," exploring the complex techniques and lasting impact of its iconic "bullet time" sequences.',
        content: 'When "The Matrix" hit theaters in 1999, it didn\'t just tell a story; it redefined how stories could be told on screen. At the heart of its visual innovation was "bullet time," a stunning effect that appeared to stop time, allowing the camera to move around a character frozen in mid-air. This was not simple slow-motion. The technique, developed by visual effects supervisor John Gaeta and his team at Manex Visual Effects, involved a complex array of still cameras arranged around the subject. By firing these cameras sequentially in rapid succession, they created a series of still images that, when stitched together, simulated a fluid camera movement through a frozen moment. This "virtual camera" technique has since influenced countless action films, music videos, and video games, cementing its place as one of the most significant cinematic innovations of its time.',
        imageUrl: 'https://picsum.photos/seed/matrix1999/1200/800',
        author: 'Lexi Stratford',
        date: 'November 7, 2023',
        category: 'Movies & TV',
        region: 'Oceania',
        sentiment: 'Positive',
        coordinates: { lat: -33.865143, lon: 151.209900 },
        keyTakeaways: [
            '"Bullet time" was a revolutionary visual effect pioneered in "The Matrix".',
            'It used an array of still cameras to create a virtual camera movement through a frozen moment.',
            'The technique was developed by John Gaeta and Manex Visual Effects.',
            'It has had a lasting impact on action filmmaking and other media.'
        ]
    },
    {
        id: 19,
        title: 'The Unseen Hand: A Critical Look at the Power of the Film Editor',
        excerpt: 'Often overlooked, the film editor plays a crucial role in shaping a movie\'s narrative, pacing, and emotional impact. We explore the art and craft of this vital cinematic role.',
        content: 'While directors and actors often receive the spotlight, the film editor works in the quiet darkness of the editing bay, assembling the raw footage into a cohesive and compelling story. The editor\'s choices—when to cut, how long to hold a shot, how to sequence scenes—are fundamental to the final film. A great editor can save a troubled production or elevate a good one to greatness. Through rhythmic cutting, they create tension in an action sequence or intimacy in a quiet conversation. Walter Murch, Thelma Schoonmaker, and Dody Dorn are just a few of the legendary editors whose invisible art has shaped some of cinema\'s most iconic moments. Their work is a testament to the idea that a film is not just shot, but made—and much of that making happens in the edit.',
        imageUrl: 'https://picsum.photos/seed/filmedit/1200/800',
        author: 'David Chen',
        date: 'November 8, 2023',
        category: 'Movies & TV',
        region: 'North America',
        sentiment: 'Neutral',
        coordinates: { lat: 34.0928, lon: -118.3287 },
        keyTakeaways: [
            'Film editors are crucial in shaping a movie\'s narrative and emotional impact.',
            'Their choices in cutting and sequencing define the film\'s rhythm and pacing.',
            'Legendary editors have had a profound impact on cinematic history.',
            'The editing process is a fundamental part of the filmmaking art form.'
        ]
    },
    {
        id: 31,
        title: 'Geopolitical Tensions Rise in the South China Sea',
        excerpt: 'A standoff between naval vessels from two major powers has escalated tensions in the highly contested waters of the South China Sea.',
        content: 'The South China Sea became a flashpoint this week as a Chinese coast guard vessel and a Philippine supply ship were involved in a tense encounter near the Second Thomas Shoal. The incident, which involved water cannons, has drawn international condemnation and calls for de-escalation. The United States has reaffirmed its defense commitments to the Philippines. This event is the latest in a series of confrontations in a region claimed by multiple countries, highlighting the fragile security situation and the risk of miscalculation that could lead to a wider conflict.',
        imageUrl: 'https://picsum.photos/seed/southchinasea/1200/800',
        author: 'Jenna Ortiz',
        date: 'November 20, 2023',
        category: 'World',
        region: 'Asia',
        sentiment: 'Negative',
        coordinates: { lat: 14.5995, lon: 120.9842 },
        keyTakeaways: [
            'Naval standoff occurs between China and the Philippines.',
            'The incident involved water cannons near the Second Thomas Shoal.',
            'The US has reiterated its defense treaty with the Philippines.',
            'The event increases the risk of miscalculation in the region.'
        ],
        tags: ['Geopolitics', 'Asia']
    },
    {
        id: 32,
        title: 'Quantum Computing Milestone Achieved, Breaks Modern Encryption in Test',
        excerpt: 'A research lab has announced a significant breakthrough in quantum computing, successfully using a new quantum algorithm to factor a large number, posing a threat to current encryption standards.',
        content: 'In a paper that has sent shockwaves through the cybersecurity community, researchers at a university lab have demonstrated a quantum computer successfully breaking a common form of public-key encryption. Using a novel algorithm on a 300-qubit processor, they were able to factor a number far larger than any previously achieved. While the technology is still in its infancy and not yet a practical threat, the experiment proves the theoretical danger that quantum computers pose to our digital infrastructure. Governments and corporations are now racing to develop and implement "quantum-resistant" cryptography to secure data for the future.',
        imageUrl: 'https://picsum.photos/seed/quantum2023/1200/800',
        author: 'Dr. Aris Thorne',
        date: 'November 21, 2023',
        category: 'Technology',
        region: 'North America',
        sentiment: 'Neutral',
        coordinates: { lat: 34.0522, lon: -118.2437 },
        keyTakeaways: [
            'Researchers have used a quantum computer to break modern encryption in a lab setting.',
            'The breakthrough highlights the future threat quantum computing poses to cybersecurity.',
            'The race is on to develop "quantum-resistant" encryption methods.',
            'The technology is not yet a practical, widespread threat.'
        ],
        tags: ['Quantum Computing', 'Cybersecurity', 'AI']
    },
    {
        id: 33,
        title: 'Global Chip Shortage Eases as New Fabs Come Online',
        excerpt: 'After years of disruption, the global semiconductor shortage is beginning to abate as major new fabrication plants in the US and Taiwan ramp up production.',
        content: 'Consumers and manufacturers can breathe a sigh of relief as the crippling global chip shortage shows signs of easing. New multi-billion dollar fabrication plants, or "fabs," have started to come online, increasing the global supply of semiconductors. This is expected to lower prices and increase availability for everything from cars to gaming consoles. The shortage, which was exacerbated by the pandemic, highlighted critical vulnerabilities in the global supply chain, prompting governments to invest heavily in domestic chip production to ensure future resilience.',
        imageUrl: 'https://picsum.photos/seed/chips2023/1200/800',
        author: 'Kenjiro Sato',
        date: 'November 22, 2023',
        category: 'Economy',
        region: 'Asia',
        sentiment: 'Positive',
        coordinates: { lat: 23.5, lon: 121 },
        keyTakeaways: [
            'The global semiconductor shortage is starting to ease.',
            'New fabrication plants are increasing the supply of chips.',
            'This should lead to better availability and lower prices for electronics and cars.',
            'The shortage has spurred investment in domestic chip manufacturing.'
        ],
        tags: ['Business', 'Supply Chain']
    },
    {
        id: 34,
        title: 'The Future of Meat: Lab-Grown Chicken Gets FDA Approval',
        excerpt: 'In a landmark decision, the FDA has approved the sale of cultivated, lab-grown chicken meat in the United States, opening the door for a new era of food production.',
        content: 'Two companies have received full FDA approval to sell chicken grown from animal cells in a laboratory. This "cultivated meat" is grown in large bioreactors and does not require the slaughter of any animals. The process is pitched as a more sustainable and ethical alternative to traditional livestock farming, with the potential to dramatically reduce land use, water consumption, and greenhouse gas emissions. While the initial product will be expensive and available only in select high-end restaurants, this regulatory approval is a crucial step toward bringing cultivated meat to the mainstream market.',
        imageUrl: 'https://picsum.photos/seed/labmeat/1200/800',
        author: 'Dr. Evelyn Reed',
        date: 'November 23, 2023',
        category: 'Science',
        region: 'North America',
        sentiment: 'Positive',
        coordinates: { lat: 38.9072, lon: -77.0369 },
        keyTakeaways: [
            'The FDA has approved lab-grown chicken for sale in the US.',
            'Cultivated meat is grown from animal cells without slaughtering animals.',
            'It is seen as a more sustainable and ethical alternative to traditional meat.',
            'Initial availability will be limited and expensive.'
        ],
        tags: ['Food', 'Biotech', 'Sustainability']
    }
];

export const mockPodcasts: Podcast[] = [
    {
        id: 1,
        title: "The AI Economy: Hype vs. Reality",
        excerpt: "We sit down with economist Dr. Evelyn Reed to discuss the real-world implications of AI on jobs, markets, and global trade. Is this a revolution or just an evolution?",
        imageUrl: "https://picsum.photos/seed/podcast1/400/400",
        author: "Mahama News Hub",
        duration: "45 min",
        episode: 101,
        audioUrl: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    },
    {
        id: 2,
        title: "Deep Dive: The Future of Fusion Energy",
        excerpt: "Following the recent breakthrough at ITER, we speak with physicist Dr. Aris Thorne about what this means for our energy future and the challenges that still lie ahead.",
        imageUrl: "https://picsum.photos/seed/podcast2/400/400",
        author: "Mahama News Hub",
        duration: "38 min",
        episode: 102,
        audioUrl: "https://storage.googleapis.com/media-session/sintel/sintel-audio.mp3",
    },
    {
        id: 3,
        title: "Uncovering Atlantis: The Tech Behind Underwater Archaeology",
        excerpt: "Join us as we talk to marine archaeologist Sofia Petrova about the incredible technologies used to discover and explore the submerged Bronze Age city in the Aegean.",
        imageUrl: "https://picsum.photos/seed/podcast3/400/400",
        author: "Mahama News Hub",
        duration: "52 min",
        episode: 103,
        audioUrl: "https://storage.googleapis.com/media-session/big-buck-bunny/big-buck-bunny-sintel-audio.mp3",
    },
    {
        id: 4,
        title: "Decoding Deepfakes: The Fight for Truth in the Digital Age",
        excerpt: "Cybersecurity expert Jenna Ortiz breaks down the threat of deepfakes in politics and beyond, and what's being done to combat them. A must-listen before the next election.",
        imageUrl: "https://picsum.photos/seed/podcast4/400/400",
        author: "Mahama News Hub",
        duration: "48 min",
        episode: 104,
        audioUrl: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    },
    {
        id: 5,
        title: "The Art of Sound: Composing for Film & Television",
        excerpt: "Award-winning composer Hans Zimmer discusses his creative process, the power of a good score, and how technology has changed the landscape of film music.",
        imageUrl: "https://picsum.photos/seed/podcast5/400/400",
        author: "Mahama News Hub",
        duration: "62 min",
        episode: 105,
        audioUrl: "https://storage.googleapis.com/media-session/sintel/sintel-audio.mp3",
    },
    {
        id: 6,
        title: "Planet Rising: The Battle for Our Oceans",
        excerpt: "Environmental journalist Maria Santos on the new High Seas Treaty and what it will take to protect 30% of our oceans by 2030.",
        imageUrl: "https://picsum.photos/seed/podcast6/400/400",
        author: "Mahama News Hub",
        duration: "41 min",
        episode: 106,
        audioUrl: "https://storage.googleapis.com/media-session/big-buck-bunny/big-buck-bunny-sintel-audio.mp3",
    },
    {
        id: 7,
        title: "The Quantum Threat: Cybersecurity in a New Era",
        excerpt: "Is our digital world safe? Dr. Aris Thorne returns to explain the recent quantum computing breakthrough and the race for quantum-resistant encryption.",
        imageUrl: "https://picsum.photos/seed/podcast7/400/400",
        author: "Mahama News Hub",
        duration: "55 min",
        episode: 107,
        audioUrl: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    },
    {
        id: 8,
        title: "Market Movers: Inflation and the Fed's Next Move",
        excerpt: "Eleanor Vance analyzes the latest inflation data and discusses the tough choices facing central banks around the world.",
        imageUrl: "https://picsum.photos/seed/podcast8/400/400",
        author: "Mahama News Hub",
        duration: "35 min",
        episode: 108,
        audioUrl: "https://storage.googleapis.com/media-session/sintel/sintel-audio.mp3",
    },
    {
        id: 9,
        title: "Healthspan: The Science of Longevity",
        excerpt: "Can we slow down aging? Dr. Evelyn Reed explores the latest research in longevity, from new drugs to lifestyle interventions.",
        imageUrl: "https://picsum.photos/seed/podcast9/400/400",
        author: "Mahama News Hub",
        duration: "49 min",
        episode: 109,
        audioUrl: "https://storage.googleapis.com/media-session/big-buck-bunny/big-buck-bunny-sintel-audio.mp3",
    },
    {
        id: 10,
        title: "Culture Corner: The K-Pop Machine",
        excerpt: "Chloe Kim gives us an inside look into the global phenomenon of K-Pop, from the intense training to the massive fan culture.",
        imageUrl: "https://picsum.photos/seed/podcast10/400/400",
        author: "Mahama News Hub",
        duration: "58 min",
        episode: 110,
        audioUrl: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    },
    {
        id: 11,
        title: "The Final Whistle: A Look at Modern Sports",
        excerpt: "Kevin Lee discusses the rise of esports, the money in modern football, and the future of sports broadcasting.",
        imageUrl: "https://picsum.photos/seed/podcast11/400/400",
        author: "Mahama News Hub",
        duration: "43 min",
        episode: 111,
        audioUrl: "https://storage.googleapis.com/media-session/sintel/sintel-audio.mp3",
    },
    {
        id: 12,
        title: "Echoes of History: The Cold War's Shadow",
        excerpt: "We talk to historians about the newly declassified documents from the Able Archer 83 incident and its relevance in today's geopolitical climate.",
        imageUrl: "https://picsum.photos/seed/podcast12/400/400",
        author: "Mahama News Hub",
        duration: "51 min",
        episode: 112,
        audioUrl: "https://storage.googleapis.com/media-session/big-buck-bunny/big-buck-bunny-sintel-audio.mp3",
    },
    {
        id: 13,
        title: "Frame by Frame: The Art of Editing",
        excerpt: "Film critic David Chen and a special guest editor discuss the unseen art of film editing and how it shapes the movies we love.",
        imageUrl: "https://picsum.photos/seed/podcast13/400/400",
        author: "Mahama News Hub",
        duration: "65 min",
        episode: 113,
        audioUrl: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    },
    {
        id: 14,
        title: "The Plate Tectonic: Future of Food",
        excerpt: "From lab-grown meat to vertical farming, we explore the technological revolution happening in our food systems with author Kenjiro Sato.",
        imageUrl: "https://picsum.photos/seed/podcast14/400/400",
        author: "Mahama News Hub",
        duration: "47 min",
        episode: 114,
        audioUrl: "https://storage.googleapis.com/media-session/sintel/sintel-audio.mp3",
    },
    {
        id: 15,
        title: "Art & Algorithm: The Rise of the AI Artist",
        excerpt: "Can an AI be creative? Juliette Dubois discusses the record-breaking sale of an AI-generated artwork and what it means for the future of art.",
        imageUrl: "https://picsum.photos/seed/podcast15/400/400",
        author: "Mahama News Hub",
        duration: "42 min",
        episode: 115,
        audioUrl: "https://storage.googleapis.com/media-session/big-buck-bunny/big-buck-bunny-sintel-audio.mp3",
    },
    {
        id: 16,
        title: "Cosmic Queries: Exploring New Worlds with JWST",
        excerpt: "Dr. Lena Petrova joins us to talk about the discovery of water on an exoplanet and what the James Webb Space Telescope might find next.",
        imageUrl: "https://picsum.photos/seed/podcast16/400/400",
        author: "Mahama News Hub",
        duration: "39 min",
        episode: 116,
        audioUrl: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    },
    {
        id: 17,
        title: "Political Pulse: Decoding the DSA and DMA",
        excerpt: "How will the EU's new tech laws change the internet? Jenna Ortiz breaks down the complex regulations and their global impact.",
        imageUrl: "https://picsum.photos/seed/podcast17/400/400",
        author: "Mahama News Hub",
        duration: "53 min",
        episode: 117,
        audioUrl: "https://storage.googleapis.com/media-session/sintel/sintel-audio.mp3",
    },
    {
        id: 18,
        title: "The Innovators: A History of Big Ideas",
        excerpt: "A special episode looking back at the key moments from our Innovation Timeline, from the invention of the web to the rise of generative AI.",
        imageUrl: "https://picsum.photos/seed/podcast18/400/400",
        author: "Mahama News Hub",
        duration: "70 min",
        episode: 118,
        audioUrl: "https://storage.googleapis.com/media-session/big-buck-bunny/big-buck-bunny-sintel-audio.mp3",
    },
    {
        id: 19,
        title: "Wild Africa: Conservation in a Changing Climate",
        excerpt: "Dr. Aisha N'Diaye provides an update on the shifting migration patterns in the Serengeti and the new conservation strategies being employed.",
        imageUrl: "https://picsum.photos/seed/podcast19/400/400",
        author: "Mahama News Hub",
        duration: "46 min",
        episode: 119,
        audioUrl: "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
    },
    {
        id: 20,
        title: "Mahama Investigates: The South China Sea Flashpoint",
        excerpt: "Our investigative team provides a deep dive into the geopolitical complexities and military build-up in the South China Sea.",
        imageUrl: "https://picsum.photos/seed/podcast20/400/400",
        author: "Mahama News Hub",
        duration: "59 min",
        episode: 120,
        audioUrl: "https://storage.googleapis.com/media-session/sintel/sintel-audio.mp3",
    }
];

export const stockData: Stock[] = [
    { symbol: 'AAPL', price: 172.50, change: '+1.75', changePercent: '+1.02%' },
    { symbol: 'GOOGL', price: 139.80, change: '-0.25', changePercent: '-0.18%' },
    { symbol: 'MSFT', price: 330.11, change: '+3.14', changePercent: '+0.96%' },
    { symbol: 'AMZN', price: 130.45, change: '-2.10', changePercent: '-1.58%' },
    { symbol: 'TSLA', price: 220.15, change: '+5.60', changePercent: '+2.61%' },
    { symbol: 'NVDA', price: 450.70, change: '-4.30', changePercent: '-0.95%' },
];

export const mockSponsors = [
  {
    name: 'QuantumLeap AI',
    logoUrl: 'https://i.imgur.com/gxsV3fW.png',
    imageUrl: 'https://picsum.photos/seed/qai-bg/600/400',
    tagline: 'Pioneering the next generation of artificial intelligence.',
    website: 'https://example.com/quantumleap',
  },
  {
    name: 'BioSynth Futures',
    logoUrl: 'https://i.imgur.com/gxsV3fW.png',
    imageUrl: 'https://picsum.photos/seed/bsf-bg/600/400',
    tagline: 'Engineering biology for a sustainable tomorrow.',
    website: 'https://example.com/biosynth',
  },
  {
    name: 'Stellar Navigators',
    logoUrl: 'https://i.imgur.com/gxsV3fW.png',
    imageUrl: 'https://picsum.photos/seed/sn-bg/600/400',
    tagline: 'Your partners in interplanetary exploration.',
    website: 'https://example.com/stellar',
  },
];

export const LANGUAGES: string[] = [
    "English", "Spanish", "French", "German", "Mandarin Chinese", "Japanese", "Russian", "Arabic", "Hindi", "Portuguese", 
    "Kinyarwanda", "Swahili", "Italian", "Korean", "Dutch", "Turkish", "Polish", "Swedish", "Norwegian", 
    "Danish", "Finnish", "Greek", "Hebrew", "Thai", "Vietnamese", "Indonesian", "Malay", "Czech", "Hungarian", 
    "Romanian", "Ukrainian", "Slovak", "Croatian", "Serbian", "Bulgarian", "Lithuanian", "Latvian", "Estonian", 
    "Slovenian", "Icelandic", "Irish", "Welsh", "Scottish Gaelic", "Basque", "Catalan", "Galician", "Afrikaans", "Zulu", "Xhosa"
];

export const LANGUAGE_VOICE_MAP: { [key: string]: AiTtsVoice } = {
    "English": "en-US-A",
    "Spanish": "es-ES-B",
    "French": "fr-FR-B",
    "German": "de-DE-B",
    "Japanese": "ja-JP-C",
    "Russian": "ru-RU-B",
    "Italian": "it-IT-B",
    "Korean": "ko-KR-B",
    "Kinyarwanda": "rw-RW-A",
    "Swahili": "sw-KE-A",
};


export const TTS_VOICES: { name: string; value: AiTtsVoice, label: string }[] = [
    { name: 'Zephyr (Male, Default)', value: 'Zephyr', label: 'Default' },
    { name: 'Puck (Male, Calm)', value: 'Puck', label: 'Calm' },
    { name: 'Charon (Male, Deep)', value: 'Charon', label: 'Deep' },
    { name: 'Kore (Female, Warm)', value: 'Kore', label: 'Warm' },
    { name: 'Fenrir (Female, Crisp)', value: 'Fenrir', label: 'Crisp' },
    { name: 'en-US-A (Male)', value: 'en-US-A', label: 'US' },
    { name: 'en-US-B (Male)', value: 'en-US-B', label: 'US' },
    { name: 'en-US-C (Female)', value: 'en-US-C', label: 'US' },
    { name: 'en-US-D (Male)', value: 'en-US-D', label: 'US' },
    { name: 'en-US-E (Female)', value: 'en-US-E', label: 'US' },
    { name: 'en-US-F (Female)', value: 'en-US-F', label: 'US' },
    { name: 'en-GB-A (Female)', value: 'en-GB-A', label: 'UK' },
    { name: 'en-GB-B (Male)', value: 'en-GB-B', label: 'UK' },
    { name: 'en-GB-C (Female)', value: 'en-GB-C', label: 'UK' },
    { name: 'en-GB-D (Male)', value: 'en-GB-D', label: 'UK' },
    { name: 'en-GB-F (Female)', value: 'en-GB-F', label: 'UK' },
    { name: 'fr-FR-A (Female)', value: 'fr-FR-A', label: 'FR' },
    { name: 'fr-FR-B (Male)', value: 'fr-FR-B', label: 'FR' },
    { name: 'fr-FR-C (Female)', value: 'fr-FR-C', label: 'FR' },
    { name: 'fr-FR-D (Male)', value: 'fr-FR-D', label: 'FR' },
    { name: 'fr-FR-E (Female)', value: 'fr-FR-E', label: 'FR' },
    { name: 'es-ES-A (Female)', value: 'es-ES-A', label: 'ES' },
    { name: 'es-ES-B (Male)', value: 'es-ES-B', label: 'ES' },
    { name: 'es-ES-C (Female)', value: 'es-ES-C', label: 'ES' },
    { name: 'es-ES-D (Male)', value: 'es-ES-D', label: 'ES' },
    { name: 'de-DE-A (Female)', value: 'de-DE-A', label: 'DE' },
    { name: 'de-DE-B (Male)', value: 'de-DE-B', label: 'DE' },
    { name: 'de-DE-C (Female)', value: 'de-DE-C', label: 'DE' },
    { name: 'de-DE-D (Male)', value: 'de-DE-D', label: 'DE' },
    { name: 'ja-JP-A (Female)', value: 'ja-JP-A', label: 'JP' },
    { name: 'ja-JP-B (Female)', value: 'ja-JP-B', label: 'JP' },
    { name: 'ja-JP-C (Male)', value: 'ja-JP-C', label: 'JP' },
    { name: 'ja-JP-D (Male)', value: 'ja-JP-D', label: 'JP' },
    { name: 'ru-RU-A (Female)', value: 'ru-RU-A', label: 'RU' },
    { name: 'ru-RU-B (Male)', value: 'ru-RU-B', label: 'RU' },
    { name: 'ru-RU-C (Female)', value: 'ru-RU-C', label: 'RU' },
    { name: 'ru-RU-D (Male)', value: 'ru-RU-D', label: 'RU' },
    { name: 'cmn-CN-A (Female)', value: 'cmn-CN-A', label: 'CN' },
    { name: 'cmn-CN-B (Male)', value: 'cmn-CN-B', label: 'CN' },
    { name: 'cmn-CN-C (Male)', value: 'cmn-CN-C', label: 'CN' },
    { name: 'rw-RW-A (Female)', value: 'rw-RW-A', label: 'RW' },
    { name: 'rw-RW-B (Male)', value: 'rw-RW-B', label: 'RW' },
    { name: 'sw-KE-A (Female)', value: 'sw-KE-A', label: 'KE' },
    { name: 'sw-KE-B (Male)', value: 'sw-KE-B', label: 'KE' },
    { name: 'ar-XA-A (Female)', value: 'ar-XA-A', label: 'AR' },
    { name: 'ar-XA-B (Male)', value: 'ar-XA-B', label: 'AR' },
    { name: 'it-IT-A (Female)', value: 'it-IT-A', label: 'IT' },
    { name: 'it-IT-B (Male)', value: 'it-IT-B', label: 'IT' },
    { name: 'ko-KR-A (Female)', value: 'ko-KR-A', label: 'KR' },
    { name: 'ko-KR-B (Male)', value: 'ko-KR-B', label: 'KR' },
];


export const categories: Category[] = [
    { name: "For You", icon: ForYouIcon },
    { name: "All", icon: AllIcon },
    { name: "World", icon: GlobeIcon, subcategories: ["Americas", "Europe", "Asia", "Africa", "Middle East"] },
    { name: "Politics", icon: PoliticsIcon, subcategories: ["Elections", "Policy", "Global"] },
    { name: "Economy", icon: EconomyIcon, subcategories: ["Markets", "Finance", "Business"] },
    { name: "Technology", icon: TechnologyIcon, subcategories: ["AI", "Cybersecurity", "Gadgets", "Energy", "Sci-Fi"] },
    { name: "Sports", icon: SportsIcon, subcategories: ["Football", "Basketball", "Gaming"] },
    { name: "Health", icon: HealthIcon, subcategories: ["Wellness", "Medical", "Mental Health"] },
    { name: "Science", icon: ScienceIcon, subcategories: ["Space", "Biotech"] },
    { name: "Environment", icon: EnvironmentIcon },
    { name: "Culture", icon: CultureIcon, subcategories: ["Food", "Language", "Traditions"] },
    { name: "Entertainment", icon: EntertainmentIcon },
    { name: "Movies & TV", icon: MoviesTVIcon },
    { name: "Art", icon: ArtIcon },
    { name: "Music", icon: MusicIcon },
    { name: "History", icon: HistoryIcon, subcategories: ["Ancient History", "Modern History", "African History", "Military History"] },
    { name: "Mahama Investigates", icon: InvestigatesIcon },
];

export const innovations: Innovation[] = [
    { year: 1989, title: "World Wide Web Invented", description: "Tim Berners-Lee invents the Web, changing how information is shared globally.", icon: 'GlobeIcon' },
    { year: 1995, title: "GPS Becomes Fully Operational", description: "The Global Positioning System constellation of 24 satellites becomes fully active, revolutionizing navigation.", icon: 'GpsIcon' },
    { year: 1998, title: "Google Founded", description: "The launch of the search engine that would go on to organize the world's information.", icon: 'SearchIcon' },
    { year: 2001, title: "Human Genome Project", description: "The first draft of the human genome is published, opening new doors for genetic medicine.", icon: 'DnaIcon' },
    { year: 2004, title: "Social Media Emerges", description: "Facebook is launched, marking the beginning of the social networking era that reshaped communication.", icon: 'SocialIcon' },
    { year: 2007, title: "First iPhone Released", description: "Apple launches the first iPhone, kicking off the modern smartphone era.", icon: 'SmartphoneIcon' },
    { year: 2012, title: "Deep Learning Breakthrough", description: "AlexNet wins the ImageNet competition, showcasing the power of deep neural networks.", icon: 'SparklesIcon' },
    { year: 2022, title: "Generative AI Goes Mainstream", description: "Models like DALL-E 2 and ChatGPT capture public imagination, democratizing AI creation.", icon: 'DataIcon' }
];

export const mockStreamingContent: StreamingContent[] = [
  { id: 1, title: 'Dune: Part Two', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/8b8R8l88Qje9dn9OE8soXRmfddl.jpg', trailerUrl: 'https://www.youtube.com/embed/U2Qp5pL3ovA?autoplay=1', description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.', rating: 'PG-13', year: 2024, duration: '2h 46m', isTrending: true, isAwardWinner: true },
  { id: 2, title: 'Oppenheimer', genre: 'History', posterUrl: 'https://image.tmdb.org/t/p/w400/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg?autoplay=1', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', rating: 'R', year: 2023, duration: '3h 0m', isAwardWinner: true },
  { id: 3, title: 'Blade Runner 2049', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', trailerUrl: 'https://www.youtube.com/embed/gCcx85zbxz4?autoplay=1', description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.', rating: 'R', year: 2017, duration: '2h 44m', isAwardWinner: true },
  { id: 4, title: 'Spider-Man: Across the Spider-Verse', genre: 'Animation', posterUrl: 'https://image.tmdb.org/t/p/w400/8Vt6mWEReuy4Of61Lp5CKmWknaV.jpg', trailerUrl: 'https://www.youtube.com/embed/shW9i6k8cB0?autoplay=1', description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.', rating: 'PG', year: 2023, duration: '2h 20m', isTrending: true },
  { id: 5, title: 'The Creator', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg', trailerUrl: 'https://www.youtube.com/embed/ex3C1-5Dhb8?autoplay=1', description: 'Against the backdrop of a war between humans and robots with artificial intelligence, a former special forces agent finds the AI has created a mysterious weapon with the power to end the war…and mankind itself.', rating: 'PG-13', year: 2023, duration: '2h 13m' },
  { id: 6, title: 'Everything Everywhere All at Once', genre: 'Action', posterUrl: 'https://image.tmdb.org/t/p/w400/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', trailerUrl: 'https://www.youtube.com/embed/wxN1T1uxQ2g?autoplay=1', description: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.', rating: 'R', year: 2022, duration: '2h 19m', isAwardWinner: true },
  { id: 7, title: 'Godzilla Minus One', genre: 'Action', posterUrl: 'https://image.tmdb.org/t/p/w400/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg', trailerUrl: 'https://www.youtube.com/embed/r7DqccP1Q_4?autoplay=1', description: 'In post-war Japan, a new terror rises. Will the devastated people be able to survive... let alone fight back?', rating: 'PG-13', year: 2023, duration: '2h 5m', isTrending: true, isAwardWinner: true },
  { id: 8, title: 'Mad Max: Fury Road', genre: 'Action', posterUrl: 'https://image.tmdb.org/t/p/w400/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg', trailerUrl: 'https://www.youtube.com/embed/hEJnMQG9ev8?autoplay=1', description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.', rating: 'R', year: 2015, duration: '2h 0m', isAwardWinner: true },
  { id: 9, title: 'Dune: Prophecy', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/sKAt80i0n3l34iV4iCbHFo5H263.jpg', trailerUrl: 'https://www.youtube.com/embed/t_Bf3xQ4p_8?autoplay=1', description: 'A prequel series set 10,000 years before the birth of Paul Atreides, exploring the origins of the Bene Gesserit.', isNew: true, rating: 'TV-MA', year: 2024, duration: 'TBA' },
  { id: 10, title: 'Blade Runner 2099', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/u3bQo6w5nB5yEw2n4sE2osM6wU.jpg', trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', description: 'A new chapter in the Blade Runner saga, set fifty years after the events of Blade Runner 2049.', isNew: true, rating: 'TV-MA', year: 2025, duration: 'TBA' },
  { id: 11, title: 'Project Artemis', genre: 'Comedy', posterUrl: 'https://image.tmdb.org/t/p/w400/o16s2eEWKY29I3s2mfl229i69a.jpg', trailerUrl: 'https://www.youtube.com/embed/zMo2cTUy_eQ?autoplay=1', description: 'A high-stakes sci-fi thriller about the race to establish a new human colony on the moon.', isNew: true, rating: 'R', year: 2024, duration: 'TBA' },
  { id: 12, title: 'Arrival', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/x2FJsf1ElAgr63Y3PNs7GkKzJrZ.jpg', trailerUrl: 'https://www.youtube.com/embed/tFMo3UJ4B4g?autoplay=1', description: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.', rating: 'PG-13', year: 2016, duration: '1h 56m' },
  { id: 13, title: 'Parasite', genre: 'Thriller', posterUrl: 'https://image.tmdb.org/t/p/w400/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg', trailerUrl: 'https://www.youtube.com/embed/5xH0HfJHsaY?autoplay=1', description: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', rating: 'R', year: 2019, duration: '2h 12m', isAwardWinner: true },
  { id: 14, title: 'Interstellar', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E?autoplay=1', description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', rating: 'PG-13', year: 2014, duration: '2h 49m' },
  { id: 15, title: 'Civil War', genre: 'Action', posterUrl: 'https://image.tmdb.org/t/p/w400/sh7Rg8Er3tFcN9AuqSrJYDALpVS.jpg', trailerUrl: 'https://www.youtube.com/embed/aDyQxtg0V2w?autoplay=1', description: 'A journey across a dystopian future America, following a team of military-embedded journalists as they race against time to reach DC before rebel factions descend upon the White House.', isNew: true, rating: 'R', year: 2024, duration: '1h 49m' },
  { id: 16, title: 'The Holdovers', genre: 'Comedy', posterUrl: 'https://image.tmdb.org/t/p/w400/5L3c5l2MqqY3U3jIBwM3M6C2Ojl.jpg', trailerUrl: 'https://www.youtube.com/embed/AhKLpJmHhIg?autoplay=1', description: 'A cranky history teacher at a remote prep school is forced to remain on campus over the holidays with a troubled student who has no place to go.', rating: 'R', year: 2023, duration: '2h 13m', isAwardWinner: true },
  { id: 17, title: 'Anatomy of a Fall', genre: 'Thriller', posterUrl: 'https://image.tmdb.org/t/p/w400/kCs22dC8AEeTOxA24uVmYv9IMe.jpg', trailerUrl: 'https://www.youtube.com/embed/fTrsp5BMloA?autoplay=1', description: 'A woman is suspected of her husband\'s murder, and their blind son faces a moral dilemma as the sole witness.', rating: 'R', year: 2023, duration: '2h 31m', isAwardWinner: true },
  { id: 18, title: 'Poor Things', genre: 'Comedy', posterUrl: 'https://image.tmdb.org/t/p/w400/kCGlIMrg8iVj2V4uBawZ4WhvQ2B.jpg', trailerUrl: 'https://www.youtube.com/embed/R-_a2AMlIjs?autoplay=1', description: 'Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.', rating: 'R', year: 2023, duration: '2h 21m', isAwardWinner: true },
  { id: 19, title: 'Furiosa: A Mad Max Saga', genre: 'Action', posterUrl: 'https://image.tmdb.org/t/p/w400/iADOJ8Zymht2JPMoy3R7xceZprc.jpg', trailerUrl: 'https://www.youtube.com/embed/XJMuhwVlca4?autoplay=1', description: 'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus.', isNew: true, rating: 'R', year: 2024, duration: '2h 28m', isTrending: true },
  { id: 20, title: 'Kingdom of the Planet of the Apes', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/gKkl37BQuKTanygYQG1pyYgLVgf.jpg', trailerUrl: 'https://www.youtube.com/embed/Kdr5oedn7q8?autoplay=1', description: 'Several generations in the future following Caesar\'s reign, apes are now the dominant species and live harmoniously together. Humans have been reduced to a feral, shadow-like existence.', isNew: true, rating: 'PG-13', year: 2024, duration: '2h 25m', isTrending: true },
  { id: 21, title: 'The Last of Us', genre: 'Drama', posterUrl: 'https://image.tmdb.org/t/p/w400/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg', trailerUrl: 'https://www.youtube.com/embed/uLtkt8BonwM?autoplay=1', description: 'Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone.', rating: 'TV-MA', year: 2023, duration: '~50m / Ep', isTrending: true },
  { id: 22, title: 'Severance', genre: 'Thriller', posterUrl: 'https://image.tmdb.org/t/p/w400/lFf6LLr96dH043q3x2i3e5f2gBF.jpg', trailerUrl: 'https://www.youtube.com/embed/xEQP4VVuyrY?autoplay=1', description: 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, he begins a journey to discover the truth about their jobs.', rating: 'TV-MA', year: 2022, duration: '~45m / Ep' },
  { id: 23, title: 'The Bear', genre: 'Comedy', posterUrl: 'https://image.tmdb.org/t/p/w400/6e2oCt0BUT4BMLIuM2A1w2T1I3D.jpg', trailerUrl: 'https://www.youtube.com/embed/gBEEe6A_k3A?autoplay=1', description: 'A young chef from the fine dining world returns to Chicago to run his family sandwich shop.', rating: 'TV-MA', year: 2022, duration: '~30m / Ep', isAwardWinner: true },
  { id: 24, title: 'Succession', genre: 'Drama', posterUrl: 'https://image.tmdb.org/t/p/w400/jIKs02wZYn53e2z3I2Q8N2S4F4s.jpg', trailerUrl: 'https://www.youtube.com/embed/tSg-6pI44cI?autoplay=1', description: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.', rating: 'TV-MA', year: 2018, duration: '~1h / Ep', isAwardWinner: true },
  { id: 25, title: 'Past Lives', genre: 'Drama', posterUrl: 'https://image.tmdb.org/t/p/w400/k3waq02AhJCLeEmnLpB14a2I5wA.jpg', trailerUrl: 'https://www.youtube.com/embed/kA244xewjcI?autoplay=1', description: 'Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora\'s family emigrates from South Korea. Twenty years later, they are reunited for one fateful week as they confront notions of love and destiny.', rating: 'PG-13', year: 2023, duration: '1h 45m' },
  { id: 26, title: 'Killers of the Flower Moon', genre: 'History', posterUrl: 'https://image.tmdb.org/t/p/w400/9i1nI32n268yGhkd2pD9gI2sJt.jpg', trailerUrl: 'https://www.youtube.com/embed/7cx9nCHsemc?autoplay=1', description: 'When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.', rating: 'R', year: 2023, duration: '3h 26m' },
  { id: 27, title: 'John Wick: Chapter 4', genre: 'Action', posterUrl: 'https://image.tmdb.org/t/p/w400/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg', trailerUrl: 'https://www.youtube.com/embed/qEVUtrk8_B4?autoplay=1', description: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.', rating: 'R', year: 2023, duration: '2h 49m' },
  { id: 28, title: 'The Boy and the Heron', genre: 'Animation', posterUrl: 'https://image.tmdb.org/t/p/w400/f4o4c45aEa1j8pB2SPy2pE0O9p.jpg', trailerUrl: 'https://www.youtube.com/embed/f4o4c45aEa1j8pB2SPy2pE0O9p?autoplay=1', description: 'A young boy named Mahito yearning for his mother ventures into a world shared by the living and the dead. There, death comes to an end, and life finds a new beginning.', rating: 'PG-13', year: 2023, duration: '2h 4m', isAwardWinner: true },
  { id: 29, title: 'Fallout', genre: 'Sci-Fi', posterUrl: 'https://image.tmdb.org/t/p/w400/gO9k7t9JpZ1L1fPMxMsbKxwI21a.jpg', trailerUrl: 'https://www.youtube.com/embed/V-5H3I1_2dM?autoplay=1', description: 'Based on one of the greatest video game series of all time, Fallout is the story of haves and have-nots in a world in which there’s almost nothing left to have. 200 years after the apocalypse, the gentle denizens of luxury fallout shelters are forced to return to the irradiated hellscape their ancestors left behind.', isNew: true, rating: 'TV-MA', year: 2024, duration: '~1h / Ep', isTrending: true },
  { id: 30, title: 'Shōgun', genre: 'History', posterUrl: 'https://image.tmdb.org/t/p/w400/7O4iVfOMQmdCS2MHE2hV3iF4Sg.jpg', trailerUrl: 'https://www.youtube.com/embed/H5W74a242DA?autoplay=1', description: 'In Japan in the year 1600, at the dawn of a century-defining civil war, Lord Yoshii Toranaga is fighting for his life as his enemies on the Council of Regents unite against him, when a mysterious European ship is found marooned in a nearby fishing village.', rating: 'TV-MA', year: 2024, duration: '~1h / Ep', isTrending: true }
];

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        name: 'Free',
        price: 'Free',
        priceYearly: 'Free',
        features: [
            'Access to all news articles',
            'Standard AI features (Summarize, Explain)',
            'Speed AI Model',
            'Limited "For You" recommendations',
        ],
    },
    {
        name: 'Premium',
        price: '$9.99',
        priceYearly: '$99.99',
        features: [
            'Everything in Free, plus:',
            'Ad-free experience',
            'Unlimited advanced AI features',
            'Exclusive "Ask the Author" & "Deep Dive" AI',
            'AI-Generated News Briefings',
            'Option for "Quality" AI model',
            'Enhanced "For You" personalization',
            'AI-Optimized Homepage Layout',
        ],
        isRecommended: true,
    }
];