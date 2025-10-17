import type { Article, Podcast, User, Comment, Stock, Innovation } from './types';

export const mockUsers: { currentUser: User; otherUsers: User[] } = {
  currentUser: {
    id: 'user-0',
    name: 'You',
    avatar: 'https://i.pravatar.cc/150?u=currentuser',
  },
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
        // FIX: Changed "Mixed" to "Neutral" to match the Sentiment type. The article describes a mixed reaction, which is best represented as Neutral.
        sentiment: 'Neutral',
        keyTakeaways: [
            'G7 nations announce new AI-driven economic framework.',
            'The policy aims to manage inflation, unemployment, and trade.',
            'Market reaction is mixed, with tech stocks rising.',
            'Concerns about algorithmic bias and lack of human oversight persist.'
        ]
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
        keyTakeaways: [
            'Scientists achieve sustained net energy gain in a fusion reaction.',
            'The breakthrough occurred at the ITER project in France.',
            'This is a critical step towards creating viable fusion power plants.',
            'Fusion energy promises clean, safe, and limitless power.'
        ]
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
        // FIX: Changed "Mixed" to "Neutral" to match the Sentiment type. The article discusses both positive and negative aspects, making Neutral the best fit.
        sentiment: 'Neutral',
        keyTakeaways: [
            'The neuro-wellness industry is a rapidly growing sector in mental health.',
            'Technologies include brain-sensing devices and AI therapy apps.',
            'Experts are cautiously optimistic, citing potential for increased access to care.',
            'Concerns remain about the lack of scientific validation for many products.'
        ]
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
        keyTakeaways: [
          'Deepfake videos pose a significant threat to upcoming elections.',
          'These AI-generated videos can be used to spread misinformation.',
          'Social media platforms and lawmakers are struggling to address the issue.',
          'Voters are advised to be critical of online content and use trusted sources.'
        ]
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
        keyTakeaways: [
          "The 'Digital Dragons' won the World Esports Championship.",
          'They defeated the three-time champions, Quantum Leap.',
          'The final match was decided in the last seconds of the game.',
          "The tournament MVP was the Dragons' young star, 'Pixel'."
        ]
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
        keyTakeaways: [
          'Climate change is altering wildlife migration patterns in Africa.',
          'The great wildebeest migration in the Serengeti is starting earlier due to drought.',
          'This is leading to increased human-wildlife conflict.',
          'Conservationists are using technology to track and study these changes.'
        ]
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

export const LANGUAGES: string[] = [
    "English", "Spanish", "French", "German", "Mandarin Chinese", "Japanese", "Russian", "Arabic", "Hindi", "Portuguese",
];

export const categories = ["All", "World", "Politics", "Economy", "Technology", "Sports", "Health", "History", "Culture", "Entertainment", "Mahama Investigates"];

export const innovations: Innovation[] = [
    { year: 2023, title: "AI Integration", description: "AI-powered summaries, translations, and fact-checking.", icon: 'SparklesIcon' },
    { year: 2024, title: "Hyper-Personalization", description: "Content feed dynamically adjusts to user reading habits.", icon: 'UserIcon' },
    { year: 2025, title: "AR News Stories", description: "Experience news stories in augmented reality.", icon: 'GlobeIcon' },
    { year: 2026, title: "Decentralized News", description: "Verifying news sources on the blockchain.", icon: 'DataIcon' }
];