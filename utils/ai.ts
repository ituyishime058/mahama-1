
import { GoogleGenAI, GenerateContentResponse, Content, Type, Modality } from "@google/genai";
import type { Article, Settings, QuizQuestion, ExpertPersona, ChatMessage, TimelineEvent, KeyConcept, CommunityHighlight, StreamingContent, HomepageLayout } from '../types';

// Helper function to get config for fast, interactive tasks
const getInteractiveConfig = (settings: Settings) => {
    // For 'Speed' preference, use the faster model and disable "thinking" time
    if (settings.aiModelPreference === 'Speed') {
        return {
            thinkingConfig: { thinkingBudget: 0 }
        };
    }
    // For 'Quality', no special config is needed, let the model use its default process
    return {};
};

// 1. summarizeArticle
export async function* summarizeArticle(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = 'gemini-2.5-flash'; // Always use flash for speed
    const prompt = `Summarize the following news article in a ${settings.summaryLength} paragraph: \n\nTitle: ${article.title}\nContent: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config: getInteractiveConfig(settings),
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 2. explainSimply
export async function* explainSimply(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = 'gemini-2.5-flash'; // Always use flash for speed
    // FIX: Removed reference to non-existent 'readerProfile' and simplified the prompt.
    const prompt = `Explain the key concepts and context of the following article in simple, easy-to-understand terms. \n\nArticle Title: ${article.title}\nArticle Content: ${article.content}`;

    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
        config: getInteractiveConfig(settings),
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 3. translateArticle
export const translateArticle = async (text: string, language: string, settings: Settings): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = 'gemini-2.5-flash'; // Always use flash for speed
    const prompt = `Translate the following text into ${language}:\n\n---\n${text}\n---`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: getInteractiveConfig(settings),
    });
    return response.text;
};


// 4. generateQuiz
export const generateQuiz = async (article: Article, settings: Settings): Promise<QuizQuestion[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
    const prompt = `Generate a 3-question multiple-choice quiz based on the following article. The questions should test comprehension of key facts and concepts.
    
    Article Title: ${article.title}
    Article Content: ${article.content}
    
    Return the data in a valid JSON array format. Each object in the array should have three properties: "question" (string), "options" (an array of 4 strings), and "correctAnswer" (a string that exactly matches one of the options).`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
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
    const model = settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
    const prompt = `Analyze the following news article and provide a concise, well-reasoned counterpoint or alternative perspective. Consider potential biases, overlooked factors, or different interpretations of the facts.
    
    Article Title: ${article.title}
    Article Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 6. generateBehindTheNews
export async function* generateBehindTheNews(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
    const prompt = `Provide deeper context for the following news article. Structure your response with the following markdown sections:
    ## Historical Context: Briefly explain the background and events leading up to this story.
    ## Key Players: Identify the main individuals, groups, or countries involved and their motivations.
    ## Broader Implications: Discuss the potential future impact of this news.
    
    Article Title: ${article.title}
    Article Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 7. generateExpertAnalysis
export async function* generateExpertAnalysis(article: Article, persona: ExpertPersona, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
    const prompt = `You are a world-renowned ${persona}. Analyze the following news article from your specific field of expertise. Provide a deep, insightful analysis, focusing on aspects relevant to your discipline. Structure your response with clear headings.

    Article Title: ${article.title}
    Article Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
    });
    
    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 8. generateTags
export const generateTags = async (article: Article, settings: Settings): Promise<string[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = 'gemini-2.5-flash';
    const prompt = `Generate 4-5 relevant SEO-friendly tags for the following news article. Return them as a simple JSON array of strings. Example: ["tag1", "tag2", "tag3"]\n\nArticle: ${article.title}\n${article.excerpt}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
            ...getInteractiveConfig(settings),
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
    const model = settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

    const prompt = `Fact-check the key claims in this article excerpt using Google Search. Provide a one-sentence summary of your findings and a status of "Verified", "Mixed", or "Unverified".
    
    Excerpt: "${article.excerpt}"`;
    
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
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
    const model = 'gemini-2.5-flash';
    const prompt = `Extract the 4 most important key takeaways from this article. Return as a JSON array of strings. Example: ["takeaway 1", "takeaway 2"]\n\n${article.content}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } },
            ...getInteractiveConfig(settings),
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
    const model = settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
    const prompt = `Generate a timeline of key events related to this article. Return a JSON array of objects, each with a "year" (string) and "description" (string).\n\nArticle: ${article.content}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
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
    const model = 'gemini-2.5-flash';
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
            responseMimeType: "application/json",
            responseSchema: { type: Type.ARRAY, items: { type: Type.INTEGER } },
            ...getInteractiveConfig(settings),
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
    const model = 'gemini-2.5-flash';
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
        config: getInteractiveConfig(settings)
    });

    return response.text;
}

// 15. extractKeyConcepts
export async function extractKeyConcepts(article: Article, settings: Settings): Promise<KeyConcept[]> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
    const prompt = `Identify the key people, locations, organizations, and concepts from the following article. For each, provide a brief, one-sentence description. Return the result as a JSON array. Each object should have "term" (string), "description" (string), and "type" (one of "Person", "Location", "Organization", "Concept").\n\nArticle: ${article.content}`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
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
    const model = settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';

    const systemInstruction = `You are a helpful assistant embedded in a news website. The user is currently reading an article titled "${article.title}". Your task is to answer questions *specifically about this article*.
    Article content for your reference:
    ---
    ${article.content}
    ---
    Keep your answers concise and directly related to the article's content. If a question cannot be answered from the article, politely say so.`;
    
    const contents: Content[] = history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: question }] });

    const response = await ai.models.generateContentStream({
        model: model,
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
            ...getInteractiveConfig(settings)
        }
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 17. summarizeComments
export const summarizeComments = async (comments: any[], settings: Settings): Promise<CommunityHighlight[]> => {
    if (comments.length < 3) return [];
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
    
    const commentsText = comments.map(c => `${c.user.name}: "${c.text}"`).join("\n");
    const prompt = `Analyze the following comment thread. Identify 2-3 distinct viewpoints or themes. For each, provide a one-sentence summary of the viewpoint and a representative quote summary. Return a JSON array. Each object should have "viewpoint" (string) and "summary" (string).\n\nComments:\n${commentsText}`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
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
    const model = settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
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
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 19. generateNewsBriefing
export const generateNewsBriefing = async (articles: Article[], settings: Settings): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = 'gemini-2.5-pro'; // Use quality model for this task

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
    });
    
    return response.text;
};

// 20. factCheckPageContent
export const factCheckPageContent = async (content: string, settings: Settings): Promise<{ summary: string; sources: { uri: string, title: string }[] }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const model = settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

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
            tools: [{ googleSearch: {} }],
        },
    });

    // FIX: Cast groundingChunks to any[] to resolve typing issue with `unknown[]`.
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

// 21. determineOptimalLayout
export const determineOptimalLayout = async (bookmarkedArticles: Article[], settings: Settings): Promise<HomepageLayout> => {
    const hasDiverseBookmarks = new Set(bookmarkedArticles.map(a => a.category)).size > 3;
    const prefersDataHeavyTopics = bookmarkedArticles.some(a => ['Economy', 'Technology', 'Science'].includes(a.category));
    
    if (hasDiverseBookmarks && prefersDataHeavyTopics) {
        return 'Dashboard';
    }
    return 'Standard';
};
