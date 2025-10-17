import type { Article, Podcast, User, Comment, Stock, Innovation, StreamingContent } from './types';

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

const newArticles: Article[] = [
    {
        id: 9,
        title: 'Blockbuster Film "Galaxy Runners" Smashes Box Office Records',
        excerpt: 'The sci-fi epic "Galaxy Runners" has taken the world by storm, grossing over $500 million globally in its opening weekend, setting a new record for the post-pandemic era.',
        content: '"Galaxy Runners," the highly anticipated sci-fi adventure from director Lena Petrova, has exceeded all expectations. The film\'s stunning visuals, compelling storyline, and charismatic cast have resonated with audiences worldwide. Industry analysts are now predicting it could become one of the highest-grossing films of all time. The success of "Galaxy Runners" is seen as a major win for movie theaters, which have been struggling to attract audiences back since the pandemic. The film follows a group of renegade pilots on a mission to save the galaxy from an ancient threat, and its blend of action, humor, and heart has proven to be a winning formula.',
        imageUrl: 'https://picsum.photos/seed/picsum9/1200/800',
        author: 'Chloe Kim',
        date: 'October 27, 2023',
        category: 'Movies & TV',
        region: 'North America',
        sentiment: 'Positive',
        keyTakeaways: [
            '"Galaxy Runners" grossed over $500 million in its opening weekend.',
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
        keyTakeaways: [
            'A lost symphony by 18th-century composer Amadeus Richter has been found.',
            'The manuscript was discovered in an attic in Vienna.',
            'The work is considered a major addition to the classical repertoire.',
            'The Vienna Philharmonic is planning a world premiere performance.'
        ]
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
        keyTakeaways: [
            'Pop star Aura held a successful concert in a VR metaverse.',
            'Millions of fans attended the event as virtual avatars.',
            'The concert featured advanced motion capture and interactive visuals.',
            'The event highlights the growing potential of VR in the entertainment industry.'
        ]
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
        keyTakeaways: [
            'CRISPR gene editing successfully used to treat hereditary blindness in a human trial.',
            'Patients showed significant improvement in vision.',
            'This marks a milestone for in-vivo (inside the body) gene editing.',
            'The technology holds promise for treating other genetic disorders.'
        ]
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
        keyTakeaways: [
            'A historic High Seas Treaty has been agreed upon at the UN.',
            'The goal is to protect 30% of the world\'s oceans by 2030.',
            'The treaty establishes a framework for creating "ocean sanctuaries" in international waters.',
            'Success depends on rapid ratification and enforcement.'
        ]
    },
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
        keyTakeaways: [
            'An AI-generated artwork sold for over $10 million at auction.',
            'The AI, "Aether," created a unique style after being trained on art history.',
            'The sale has sparked a debate on AI\'s role in art and creativity.',
            'The creators view the AI as a new tool for artists.'
        ]
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
        keyTakeaways: [
            'AI is being used to reconstruct music from ancient cultures.',
            'The system can interpret fragmented notations and simulate lost instruments.',
            'A recent project successfully reconstructed a Hittite ceremonial hymn.',
            'The technology is a new tool for preserving cultural heritage.'
        ]
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
        keyTakeaways: [
          'A new project uses AI to document and teach endangered languages.',
          'Community members use apps to record their native tongues.',
          'The AI builds interactive lessons and dictionaries from the data.',
          'The initiative aims to create a digital archive for cultural preservation.'
        ]
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
        keyTakeaways: [
          'Ancient grains like fonio and amaranth are becoming popular in modern cuisine.',
          'These grains are valued for their flavor, nutritional benefits, and climate resilience.',
          'Top chefs are incorporating them into their menus.',
          'The trend combines history, culture, and sustainability.'
        ]
    }
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
    },
    ...newArticles
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
    "English", "Spanish", "French", "German", "Mandarin Chinese", "Japanese", "Russian", "Arabic", "Hindi", "Portuguese", "Kinyarwanda", "Kiswahili", "Lingala"
];

export const categories = ["All", "World", "Politics", "Economy", "Technology", "Sports", "Health", "History", "Movies & TV", "Culture", "Entertainment", "Science", "Environment", "Art", "Music", "Mahama Investigates"];

export const innovations: Innovation[] = [
    { year: 1989, title: "World Wide Web Invented", description: "Tim Berners-Lee invents the Web, changing how information is shared globally.", icon: 'GlobeIcon' },
    { year: 1998, title: "Google Founded", description: "The launch of the search engine that would go on to organize the world's information.", icon: 'SearchIcon' },
    { year: 2007, title: "First iPhone Released", description: "Apple launches the first iPhone, kicking off the modern smartphone era.", icon: 'UserIcon' },
    { year: 2012, title: "Deep Learning Breakthrough", description: "AlexNet wins the ImageNet competition, showcasing the power of deep neural networks.", icon: 'SparklesIcon' },
    { year: 2022, title: "Generative AI Goes Mainstream", description: "Models like DALL-E 2 and ChatGPT capture public imagination, democratizing AI creation.", icon: 'DataIcon' }
];

export const mockStreamingContent: StreamingContent[] = [
  { id: 1, title: 'Cosmic Wanderers', posterUrl: 'https://picsum.photos/seed/movie1/400/600', trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 2, title: 'The Last Kingdom: Echoes', posterUrl: 'https://picsum.photos/seed/movie2/400/600', trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 3, title: 'Cyber City Blues', posterUrl: 'https://picsum.photos/seed/movie3/400/600', trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 4, title: 'Ocean\'s Whisper', posterUrl: 'https://picsum.photos/seed/movie4/400/600', trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 5, title: 'Mountain of Secrets', posterUrl: 'https://picsum.photos/seed/movie5/400/600', trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];