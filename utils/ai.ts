import { GoogleGenAI, GenerateContentResponse, Content, Type, Modality } from "@google/genai";
import type { Article, Settings, QuizQuestion, ExpertPersona, ChatMessage, TimelineEvent, KeyConcept, CommunityHighlight, HomepageLayout, Comment, InfographicData, AiSearchResult, StreamingContent } from '../types';

const getModelConfig = (settings: Settings, taskComplexity: 'simple' | 'complex' = 'simple') => {
    if (settings.subscriptionTier === 'Premium' && settings.aiModelPreference === 'Quality') {
        return {
            model: 'gemini-2.5-pro',
            config: {} // Pro model manages its own thinking budget well
        };
    }

    // For the speed model, adjust thinking based on task complexity
    const flashConfig = taskComplexity === 'simple' ? { thinkingConfig: { thinkingBudget: 0 } } : {};
    
    return {
        model: 'gemini-2.5-flash',
        config: flashConfig
    };
};

// 1. summarizeArticle
export async function* summarizeArticle(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    const prompt = `Act as a professional news editor. Your task is to provide a high-quality summary of the following article. The summary should be concise yet comprehensive, capturing the main points, key figures, and the overall significance of the news. The desired length is a ${settings.summaryLength} paragraph. Ensure the tone is neutral and informative.
    
    Article Title: ${article.title}
    Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config: config,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 2. explainSimply
export async function* explainSimply(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    const prompt = `Act as a friendly and knowledgeable teacher. Your goal is to explain the core ideas of the following article as if you were talking to a bright high school student. Break down complex jargon, provide simple analogies where helpful, and clarify the essential background context. The explanation should be clear, simple, and engaging.
    
    Article Title: ${article.title}
    Article Content: ${article.content}`;

    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config: config,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 3. translateArticle
export const translateArticle = async (text: string, language: string, settings: Settings): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    const prompt = `Translate the following text into ${language}:\n\n---\n${text}\n---`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: config,
    });
    return response.text;
};


// 4. generateQuiz
export const generateQuiz = async (article: Article, settings: Settings): Promise<QuizQuestion[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `Generate a 3-question multiple-choice quiz based on the following article. The questions should test comprehension of key facts and concepts.
    
    Article Title: ${article.title}
    Article Content: ${article.content}
    
    Return the data in a valid JSON array format. Each object in the array should have three properties: "question" (string), "options" (an array of 4 strings), and "correctAnswer" (a string that exactly matches one of the options).`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswer: { type: Type.STRING }
                    },
                    required: ["question", "options", "correctAnswer"]
                }
            }
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as QuizQuestion[];
    } catch (e) {
        console.error("Failed to parse quiz JSON:", e, "Received text:", response.text);
        throw new Error("Could not generate a valid quiz.");
    }
};

// 5. generateCounterpoint
export async function* generateCounterpoint(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `Analyze the following news article and provide a concise, well-reasoned counterpoint or alternative perspective. Consider potential biases, overlooked factors, or different interpretations of the facts.
    
    Article Title: ${article.title}
    Article Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 6. generateBehindTheNews
export async function* generateBehindTheNews(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `Provide deeper context for the following news article. Structure your response with the following markdown sections:
    ## Historical Context: Briefly explain the background and events leading up to this story.
    ## Key Players: Identify the main individuals, groups, or countries involved and their motivations.
    ## Broader Implications: Discuss the potential future impact of this news.
    
    Article Title: ${article.title}
    Article Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 7. generateExpertAnalysis
export async function* generateExpertAnalysis(article: Article, persona: ExpertPersona, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `You are a world-renowned ${persona}. Analyze the following news article from your specific field of expertise. Provide a deep, insightful analysis, focusing on aspects relevant to your discipline. Structure your response with clear headings.

    Article Title: ${article.title}
    Article Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config,
    });
    
    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 8. generateTags
export const generateTags = async (article: Article, settings: Settings): Promise<string[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    const prompt = `Generate 4-5 relevant SEO-friendly tags for the following news article. Return them as a simple JSON array of strings. Example: ["tag1", "tag2", "tag3"]\n\nArticle: ${article.title}\n${article.excerpt}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
        }
    });

    try {
        return JSON.parse(response.text.trim()) as string[];
    } catch {
        return [];
    }
};

// 9. factCheckArticle
export const factCheckArticle = async (article: Article, settings: Settings): Promise<{ status: string; summary: string }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');

    const prompt = `Fact-check the key claims in this article excerpt using Google Search. Provide a one-sentence summary of your findings and a status of "Verified", "Mixed", or "Unverified".
    
    Excerpt: "${article.excerpt}"`;
    
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            ...config,
            tools: [{ googleSearch: {} }],
        },
    });

    const text = response.text.toLowerCase();
    let status = 'Unverified';
    if (text.includes('verified')) status = 'Verified';
    else if (text.includes('mixed') || text.includes('partially')) status = 'Mixed';
    
    return {
        status: status,
        summary: response.text,
    };
};

// 10. generateKeyTakeaways
export const generateKeyTakeaways = async (article: Article, settings: Settings): Promise<string[]> => {
    if (article.keyTakeaways && article.keyTakeaways.length > 0) {
        return article.keyTakeaways;
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    const prompt = `Extract the 4 most important key takeaways from this article. Return as a JSON array of strings. Example: ["takeaway 1", "takeaway 2"]\n\n${article.content}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
        }
    });
    
    try {
        return JSON.parse(response.text.trim());
    } catch {
        return [];
    }
};

// 11. generateArticleTimeline
export const generateArticleTimeline = async (article: Article, settings: Settings): Promise<TimelineEvent[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `Generate a timeline of key events related to this article. Return a JSON array of objects, each with a "year" (string) and "description" (string).\n\nArticle: ${article.content}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        year: { type: Type.STRING },
                        description: { type: Type.STRING }
                    },
                    required: ["year", "description"]
                }
            }
        }
    });

    try {
        return JSON.parse(response.text.trim()) as TimelineEvent[];
    } catch {
        return [];
    }
};

// 12. findRelatedArticles
export const findRelatedArticles = async (currentArticle: Article, allArticles: Article[], settings: Settings): Promise<number[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const otherArticles = allArticles
        .filter(a => a.id !== currentArticle.id)
        .map(a => ({ id: a.id, title: a.title, category: a.category, excerpt: a.excerpt }));
        
    const prompt = `From the following list of articles, find the 3 most relevant to the current article. Return only a JSON array of their integer IDs.
    Current Article: {id: ${currentArticle.id}, title: "${currentArticle.title}", excerpt: "${currentArticle.excerpt}"}
    
    List of other articles (JSON):
    ${JSON.stringify(otherArticles)}`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.INTEGER } },
        }
    });
    
    try {
        return JSON.parse(response.text.trim()) as number[];
    } catch {
        // Fallback to simple category match if AI fails
        return allArticles
            .filter(a => a.id !== currentArticle.id && a.category === currentArticle.category)
            .slice(0, 3)
            .map(a => a.id);
    }
};

// 13. textToSpeech
export const textToSpeech = async (text: string, voice: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voice }
                },
            },
        },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("No audio data returned from API.");
    }
    return base64Audio;
};

// 14. applyReadingLens
export async function applyReadingLens(content: string, lens: 'Simplify' | 'DefineTerms', settings: Settings): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    let prompt = '';
    if (lens === 'Simplify') {
        prompt = `Rewrite the following article content in simpler, more accessible language. Aim for a 9th-grade reading level. Maintain the original meaning and key information.\n\n---\n${content}`;
    } else if (lens === 'DefineTerms') {
        prompt = `Analyze the following article content. Identify key technical terms, jargon, or important concepts. Rewrite the article, and after the first mention of each key term, add a brief, simple definition in parentheses. For example: "The process of photosynthesis (the way plants use sunlight to create food)..."\n\n---\n${content}`;
    } else {
        return content;
    }
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config
    });

    return response.text;
}

// 15. extractKeyConcepts
export const extractKeyConcepts = async (article: Article, settings: Settings): Promise<KeyConcept[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `You are an advanced information extraction AI. Analyze the provided article content and identify the most critical entities and concepts. For each, provide a concise but informative description that clarifies its role or significance within the context of the article. Classify each as 'Person', 'Location', 'Organization', or 'Concept'.
    
    Return the result as a JSON array. Each object should have "term" (string), "description" (string), and "type" (one of "Person", "Location", "Organization", "Concept").
    
    Article: ${article.content}`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        term: { type: Type.STRING },
                        description: { type: Type.STRING },
                        type: { type: Type.STRING, enum: ["Person", "Location", "Organization", "Concept"] }
                    },
                    required: ["term", "description", "type"]
                }
            }
        }
    });

    try {
        return JSON.parse(response.text.trim()) as KeyConcept[];
    } catch {
        return [];
    }
}

// 16. askAboutArticle
export async function* askAboutArticle(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');

    const systemInstruction = `You are an expert AI research assistant specializing in text analysis. The user is currently reading an article titled "${article.title}". Your primary function is to answer questions based *only* on the provided article content. Be precise and directly reference parts of the article where possible. If the answer is not in the article, you must state clearly that the information is not available in the provided text. Do not invent information or use external knowledge.
    
    Article Content for your reference:
    ---
    ${article.content}
    ---`;
    
    const contents: Content[] = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: question }] });

    const response = await ai.models.generateContentStream({
        model: model,
        contents: contents,
        config: {
            ...config,
            systemInstruction: systemInstruction,
        }
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 17. summarizeComments
export const summarizeComments = async (comments: Comment[], settings: Settings): Promise<CommunityHighlight[]> => {
    if (comments.length < 3) return [];
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    
    const commentsText = comments.map(c => `${c.user.name}: "${c.text}"`).join("\n");
    const prompt = `Analyze the following comment thread. Identify 2-3 distinct viewpoints or themes. For each, provide a one-sentence summary of the viewpoint. Return a JSON array. Each object should have "viewpoint" (string) and "summary" (string).\n\nComments:\n${commentsText}`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        viewpoint: { type: Type.STRING },
                        summary: { type: Type.STRING }
                    },
                    required: ["viewpoint", "summary"]
                }
            }
        }
    });
    
    try {
        return JSON.parse(response.text.trim()) as CommunityHighlight[];
    } catch {
        return [];
    }
};

// 18. generateAuthorResponse
export async function* generateAuthorResponse(article: Article, question: string, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `You are an AI persona of ${article.author}, the author of the article titled "${article.title}". Adopt their likely tone and style based on the article's content. A user has a question for you. Answer it from the author's perspective, drawing upon the information and context within the article.
    
    Article Content:
    ---
    ${article.content}
    ---
    
    User's Question: "${question}"
    
    Your response as ${article.author}:`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 19. generateNewsBriefing
export const generateNewsBriefing = async (articles: Article[], settings: Settings): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');

    const articleSummaries = articles.map(a => `Title: ${a.title}\nExcerpt: ${a.excerpt}`).join('\n\n');

    const prompt = `You are a news anchor for Mahama News Hub. Your task is to write a script for a short audio news briefing. The tone should be ${settings.aiVoicePersonality}. Start with a friendly greeting, then briefly summarize each of the following top stories. End with a warm sign-off. The entire script should be about 200-300 words.
    
    Here are the stories to summarize:
    ---
    ${articleSummaries}
    ---
    
    Generate the full script now.`;
    
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: config,
    });
    
    return response.text;
};

// 20. factCheckPageContent
export const factCheckPageContent = async (content: string, settings: Settings): Promise<{ summary: string; sources: { uri: string, title: string }[] }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');

    const prompt = `Fact-check the key claims in the following content using Google Search. Provide a brief summary of your findings and list the top 3-5 web sources you used.

    Content to check:
    ---
    ${content}
    ---
    `;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            ...config,
            tools: [{ googleSearch: {} }],
        },
    });

    const chunks = (response.candidates?.[0]?.groundingMetadata?.groundingChunks as any[]) || [];
    const sources = chunks.map(chunk => ({
        uri: chunk.web?.uri || '',
        title: chunk.web?.title || '',
    })).filter(source => source.uri);

    const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());

    return {
        summary: response.text,
        sources: uniqueSources,
    };
};

// 21. generateDeepDive
export async function* generateDeepDive(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `You are a senior analyst and researcher. Create a comprehensive "Deep Dive" on the topic of the provided news article. Go far beyond the article's text to provide extensive, well-researched background information. Your analysis must be structured with the following detailed markdown sections:
    
    ## Comprehensive Background
    Explain the broader historical, social, or technological context that this news event fits into. What led up to this moment?
    
    ## Profiles of Key Entities
    Detail the most important individuals, organizations, or nations involved. What are their histories, motivations, and roles in this story?
    
    ## Data & Statistics
    Provide relevant data points, statistics, or quantitative analysis that helps to understand the scale and scope of the issue.
    
    ## Future Outlook & Projections
    Based on the information, discuss the potential long-term consequences, future trends, and expert predictions related to this topic.
    
    Article Title: ${article.title}
    Article Excerpt: ${article.excerpt}`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
        config,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 22. determineOptimalLayout
export const determineOptimalLayout = async (bookmarkedArticles: Article[], settings: Settings): Promise<HomepageLayout | null> => {
    if (bookmarkedArticles.length < 3) return null;
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');

    const bookmarkSummary = bookmarkedArticles.map(a => `- ${a.title} (Category: ${a.category})`).join('\n');

    const prompt = `Based on this user's list of bookmarked articles, should their homepage layout be "Standard" or "Dashboard"?
    - "Standard" is a traditional, comfortable news layout.
    - "Dashboard" is a dense, multi-column layout for power users who follow many diverse topics or data-heavy subjects (like Economy, Technology).
    
    User's Bookmarks:
    ${bookmarkSummary}
    
    Respond with only a single word: "Standard" or "Dashboard".`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config,
    });

    const layout = response.text.trim();
    if (layout === 'Dashboard' || layout === 'Standard') {
        return layout;
    }
    return null;
};

// 23. generateInfographicData
export const generateInfographicData = async (article: Article, settings: Settings): Promise<InfographicData> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');

    const prompt = `Analyze the following article to extract key numerical data or quantifiable concepts that can be represented in a simple bar chart.
    Identify a suitable title for the chart and up to 5 data points with labels and numerical values.
    Return the result as a single JSON object with a "title" (string) and an "items" array. Each object in "items" should have a "label" (string) and a "value" (number).
    If no suitable data is found, return an empty items array.

    Article:
    ---
    ${article.content}
    ---
    `;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    items: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                label: { type: Type.STRING },
                                value: { type: Type.NUMBER }
                            },
                            required: ["label", "value"]
                        }
                    }
                },
                required: ["title", "items"]
            }
        }
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as InfographicData;
    } catch (e) {
        console.error("Failed to parse infographic JSON:", e, "Received text:", response.text);
        throw new Error("Could not generate valid infographic data.");
    }
};

// 24. getThisDayInHistory
export const getThisDayInHistory = async (): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    const prompt = `Using Google Search, tell me about two significant and interesting historical events that happened on this day, ${today}. For each event, provide a title using markdown like '## Year - Event Title' and a one-sentence summary on the next line.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    return response.text;
};

// 25. getAutocompleteSuggestions
export const getAutocompleteSuggestions = async (query: string, settings: Settings): Promise<string[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const prompt = `Based on the user's typing, provide 3-4 likely search query completions. The user has typed: "${query}". Return as a simple JSON array of strings.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            thinkingConfig: { thinkingBudget: 0 },
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
        }
    });

    try {
        return JSON.parse(response.text.trim());
    } catch {
        return [];
    }
};

// 26. performAiSearch
export const performAiSearch = async (query: string, articles: Article[], movies: StreamingContent[], settings: Settings): Promise<AiSearchResult> => {
    const { model, config } = getModelConfig(settings, 'complex');
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const articleList = articles.map(a => ({ id: a.id, title: a.title, excerpt: a.excerpt }));
    const movieList = movies.map(m => ({ id: m.id, title: m.title, description: m.description, genre: m.genre }));

    const prompt = `You are an AI search assistant for a news and entertainment website. The user's query is: "${query}".
    Your task is four-fold:
    1.  Provide a concise, direct summary or answer to the user's query. If the query is broad, summarize the general topic. Use markdown for formatting if needed.
    2.  From the provided list of articles, identify the top 3-5 most relevant articles. Return only their integer IDs in the 'relatedArticleIds' field.
    3.  From the provided list of movies/TV shows, identify the top 3-5 most relevant items. Return only their integer IDs in the 'relatedMovieIds' field.
    4.  Suggest 3 insightful follow-up questions the user might have.

    Here is the list of available articles:
    ${JSON.stringify(articleList)}

    Here is the list of available movies/TV shows:
    ${JSON.stringify(movieList)}

    Return a single, valid JSON object that strictly follows this schema.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING },
                    relatedArticleIds: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                    relatedMovieIds: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                    suggestedQuestions: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["summary", "relatedArticleIds", "relatedMovieIds", "suggestedQuestions"]
            }
        }
    });

    try {
        return JSON.parse(response.text.trim());
    } catch (e) {
        console.error("Failed to parse AI search result", e, "Response text:", response.text);
        throw new Error("AI search returned an invalid format.");
    }
};

// 27. generatePullQuotes
export const generatePullQuotes = async (article: Article, settings: Settings): Promise<string[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    const prompt = `From the following article, extract one or two of the most impactful, representative, or thought-provoking sentences to be used as pull quotes. Return them as a simple JSON array of strings. Maximum of two quotes.
    
    Article Content:
    ---
    ${article.content}
    ---
    `;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
        }
    });

    try {
        const quotes = JSON.parse(response.text.trim()) as string[];
        return quotes.slice(0, 2); // Ensure max of 2
    } catch {
        return [];
    }
};
