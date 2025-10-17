
import type { Article, Podcast, User, Comment, Stock, Innovation, StreamingContent, SubscriptionPlan, AiTtsVoice } from './types';

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
        title: 'Blockbuster Film "Dune: Part Two" Smashes Box Office Records',
        excerpt: 'The sci-fi epic "Dune: Part Two" has taken the world by storm, grossing over $700 million globally, setting a new record for the post-pandemic era.',
        content: '"Dune: Part Two," the highly anticipated sci-fi adventure from director Denis Villeneuve, has exceeded all expectations. The film\'s stunning visuals, compelling storyline, and charismatic cast have resonated with audiences worldwide. Industry analysts are now predicting it could become one of the highest-grossing films of all time. The success of "Dune" is seen as a major win for movie theaters, which have been struggling to attract audiences back. The film follows Paul Atreides as he unites with the Fremen people of the desert planet Arrakis to wage war against House Harkonnen.',
        imageUrl: 'https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8soXRmfddl.jpg',
        author: 'Chloe Kim',
        date: 'March 1, 2024',
        category: 'Movies & TV',
        region: 'North America',
        sentiment: 'Positive',
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
// FIX: Added missing `title` property key.
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
        region: 'North America',
        sentiment: 'Positive',
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
        region: 'Europe',
        sentiment: 'Neutral',
        keyTakeaways: [
            'Film editors are crucial in shaping a movie\'s narrative and emotional impact.',
            'Their choices in cutting and sequencing define the film\'s rhythm and pacing.',
            'Legendary editors have had a profound impact on cinematic history.',
            'The editing process is a fundamental part of the filmmaking art form.'
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
    "English", "Spanish", "French", "German", "Mandarin Chinese", "Japanese", "Russian", "Arabic", "Hindi", "Portuguese", 
    "Kinyarwanda", "Kiswahili", "Lingala", "Italian", "Korean", "Dutch", "Turkish", "Polish", "Swedish", "Norwegian", 
    "Danish", "Finnish", "Greek", "Hebrew", "Thai", "Vietnamese", "Indonesian", "Malay", "Czech", "Hungarian", 
    "Romanian", "Ukrainian", "Slovak", "Croatian", "Serbian", "Bulgarian", "Lithuanian", "Latvian", "Estonian", 
    "Slovenian", "Icelandic", "Irish", "Welsh", "Scottish Gaelic", "Basque", "Catalan", "Galician", "Afrikaans", "Zulu", "Xhosa"
];

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
    { name: 'rw-RW-A (Female, Mock)', value: 'rw-RW-A', label: 'RW' },
    { name: 'rw-RW-B (Male, Mock)', value: 'rw-RW-B', label: 'RW' },
    { name: 'sw-KE-A (Female, Mock)', value: 'sw-KE-A', label: 'KE' },
    { name: 'sw-KE-B (Male, Mock)', value: 'sw-KE-B', label: 'KE' },
    { name: 'ar-XA-A (Female)', value: 'ar-XA-A', label: 'AR' },
    { name: 'ar-XA-B (Male)', value: 'ar-XA-B', label: 'AR' },
    { name: 'it-IT-A (Female)', value: 'it-IT-A', label: 'IT' },
    { name: 'it-IT-B (Male)', value: 'it-IT-B', label: 'IT' },
    { name: 'ko-KR-A (Female)', value: 'ko-KR-A', label: 'KR' },
    { name: 'ko-KR-B (Male)', value: 'ko-KR-B', label: 'KR' },
];


export const categories = ["For You", "All", "World", "Politics", "Economy", "Technology", "Sports", "Health", "History", "Movies & TV", "Culture", "Entertainment", "Science", "Environment", "Art", "Music", "Mahama Investigates"];

export const innovations: Innovation[] = [
    { year: 1989, title: "World Wide Web Invented", description: "Tim Berners-Lee invents the Web, changing how information is shared globally.", icon: 'GlobeIcon' },
    { year: 1998, title: "Google Founded", description: "The launch of the search engine that would go on to organize the world's information.", icon: 'SearchIcon' },
    { year: 2007, title: "First iPhone Released", description: "Apple launches the first iPhone, kicking off the modern smartphone era.", icon: 'UserIcon' },
    { year: 2012, title: "Deep Learning Breakthrough", description: "AlexNet wins the ImageNet competition, showcasing the power of deep neural networks.", icon: 'SparklesIcon' },
    { year: 2022, title: "Generative AI Goes Mainstream", description: "Models like DALL-E 2 and ChatGPT capture public imagination, democratizing AI creation.", icon: 'DataIcon' }
];

export const mockStreamingContent: StreamingContent[] = [
  { id: 1, title: 'Dune: Part Two', posterUrl: 'https://image.tmdb.org/t/p/w400/8b8R8l88Qje9dn9OE8soXRmfddl.jpg', trailerUrl: 'https://www.youtube.com/embed/U2Qp5pL3ovA?autoplay=1', description: 'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.' },
  { id: 2, title: 'Oppenheimer', posterUrl: 'https://image.tmdb.org/t/p/w400/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg', trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg?autoplay=1', description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.' },
  { id: 3, title: 'Blade Runner 2049', posterUrl: 'https://image.tmdb.org/t/p/w400/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg', trailerUrl: 'https://www.youtube.com/embed/gCcx85zbxz4?autoplay=1', description: 'Young Blade Runner K\'s discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who\'s been missing for thirty years.' },
  { id: 4, title: 'Spider-Man: Across the Spider-Verse', posterUrl: 'https://image.tmdb.org/t/p/w400/8Vt6mWEReuy4Of61Lp5CKmWknaV.jpg', trailerUrl: 'https://www.youtube.com/embed/shW9i6k8cB0?autoplay=1', description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.' },
  { id: 5, title: 'The Creator', posterUrl: 'https://image.tmdb.org/t/p/w400/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg', trailerUrl: 'https://www.youtube.com/embed/ex3C1-5Dhb8?autoplay=1', description: 'Against the backdrop of a war between humans and robots with artificial intelligence, a former special forces agent finds the AI has created a mysterious weapon with the power to end the war…and mankind itself.' },
  { id: 6, title: 'Everything Everywhere All at Once', posterUrl: 'https://image.tmdb.org/t/p/w400/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg', trailerUrl: 'https://www.youtube.com/embed/wxN1T1uxQ2g?autoplay=1', description: 'An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.' },
  { id: 7, title: 'Godzilla Minus One', posterUrl: 'https://image.tmdb.org/t/p/w400/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg', trailerUrl: 'https://www.youtube.com/embed/r7DqccP1Q_4?autoplay=1', description: 'In post-war Japan, a new terror rises. Will the devastated people be able to survive... let alone fight back?' },
  { id: 8, title: 'Mad Max: Fury Road', posterUrl: 'https://image.tmdb.org/t/p/w400/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg', trailerUrl: 'https://www.youtube.com/embed/hEJnMQG9ev8?autoplay=1', description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.' },
  { id: 9, title: 'Dune: Prophecy', posterUrl: 'https://image.tmdb.org/t/p/w400/sKAt80i0n3l34iV4iCbHFo5H263.jpg', trailerUrl: 'https://www.youtube.com/embed/t_Bf3xQ4p_8?autoplay=1', description: 'A prequel series set 10,000 years before the birth of Paul Atreides, exploring the origins of the Bene Gesserit.', isNew: true },
  { id: 10, title: 'Blade Runner 2099', posterUrl: 'https://image.tmdb.org/t/p/w400/u3bQo6w5nB5yEw2n4sE2osM6wU.jpg', trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1', description: 'A new chapter in the Blade Runner saga, set fifty years after the events of Blade Runner 2049.', isNew: true },
  { id: 11, title: 'Project Artemis', posterUrl: 'https://image.tmdb.org/t/p/w400/o16s2eEWKY29I3s2mfl229i69a.jpg', trailerUrl: 'https://www.youtube.com/embed/zMo2cTUy_eQ?autoplay=1', description: 'A high-stakes sci-fi thriller about the race to establish a new human colony on the moon.', isNew: true },
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
        price: '$9.99 / month',
        priceYearly: '$99.99 / year',
        features: [
            'Everything in Free, plus:',
            'Ad-free experience',
            'Unlimited advanced AI features',
            'Exclusive "Ask the Author" AI',
            'AI-Generated News Briefings',
            'Option for "Quality" AI model',
            'Enhanced "For You" personalization',
        ],
        isRecommended: true,
    }
];
