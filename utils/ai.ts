import { GoogleGenAI, GenerateContentResponse, Content, Type, Modality } from "@google/genai";
// FIX: Add NetworkNode and NetworkLink to the type imports.
import type { Article, Settings, QuizQuestion, ExpertPersona, ChatMessage, TimelineEvent, KeyConcept, CommunityHighlight, HomepageLayout, Comment, InfographicData, AiSearchResult, StreamingContent, Language, FactCheckResult, NetworkNode, NetworkLink } from '../types';

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
export const factCheckArticle = async (article: Article, settings: Settings): Promise<FactCheckResult | null> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');

    const prompt = `Fact-check the key claims in this article excerpt using Google Search. Provide a one-sentence summary of your findings and a status of "Verified", "Mixed", or "Unverified".
    
    Article Title: ${article.title}
    Excerpt: "${article.excerpt}"`;
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                ...config,
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text.toLowerCase();
        let status: 'Verified' | 'Mixed' | 'Unverified' = 'Unverified';
        if (text.includes('verified')) status = 'Verified';
        else if (text.includes('mixed') || text.includes('partially')) status = 'Mixed';
        
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
            ?.map(chunk => chunk.web)
            .filter((web): web is { uri: string; title: string } => !!web && !!web.uri)
            .reduce((acc: { uri: string; title: string }[], current) => { // Remove duplicates
                if (!acc.some(item => item.uri === current.uri)) {
                    acc.push(current);
                }
                return acc;
            }, []) ?? [];

        return {
            status: status,
            summary: response.text,
            sources: sources,
        };
    } catch (e) {
        console.error("Fact check failed", e);
        return null;
    }
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
        role: msg.role,
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
export async function* generateAuthorResponse(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const systemInstruction = `You are an AI persona of ${article.author}, the author of the article titled "${article.title}". Adopt their likely tone and style based on the article's content. A user is asking you questions. Answer them from the author's perspective, drawing upon the information and context within the article and the previous conversation.
    
    Article Content for your reference:
    ---
    ${article.content}
    ---`;

    const contents: Content[] = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
    }));
    contents.push({ role: 'user', parts: [{ text: question }] });

    const response = await ai.models.generateContentStream({
        model,
        contents,
        config: {
            ...config,
            systemInstruction,
        },
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 19. generateNewsBriefing
export const generateNewsBriefing = async (articles: Article[], settings: Settings): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');

    const articlesSummary = articles.map(a => `Title: ${a.title}\nExcerpt: ${a.excerpt}`).join('\n\n');

    const prompt = `You are an AI news anchor for Mahama News Hub. Your personality is ${settings.aiVoicePersonality}. Create a concise, engaging news briefing script summarizing the following articles. Start with a friendly greeting, then smoothly transition between each story. End with a warm sign-off.
    
    Articles:
    ${articlesSummary}`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config
    });

    return response.text;
};

// 20. determineOptimalLayout
export const determineOptimalLayout = async (bookmarkedArticles: Article[], settings: Settings): Promise<HomepageLayout | null> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    
    const articleTitles = bookmarkedArticles.map(a => `- ${a.title} (Category: ${a.category})`).join("\n");
    const prompt = `Based on this user's bookmarked articles, determine the optimal homepage layout: "Standard" (for broad interests) or "Dashboard" (for focused, data-heavy topics). Return only the word "Standard" or "Dashboard".

    Bookmarks:
    ${articleTitles}`;

    const response = await ai.models.generateContent({ model, contents: prompt, config });
    const layout = response.text.trim();

    if (layout === 'Standard' || layout === 'Dashboard') {
        return layout;
    }
    return null;
};

// 21. generatePullQuotes
export const generatePullQuotes = async (article: Article, settings: Settings): Promise<string[]> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    const prompt = `Extract two impactful and representative "pull quotes" from the following article content. The quotes should be concise and compelling. Return a JSON array of two strings.
    
    Content:
    ${article.content}`;

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
        return quotes.slice(0, 2);
    } catch {
        return [];
    }
};

// 22. generateDeepDive
export async function* generateDeepDive(article: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `Provide a "deep dive" analysis of the following article. Go beyond the surface-level facts and explore the nuances, complexities, and interconnected themes. Structure your response with markdown headings.
    
    Article: ${article.title}\n\n${article.content}`;
    
    const response = await ai.models.generateContentStream({ model, contents: prompt, config });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 23. generateInfographicData
export const generateInfographicData = async (article: Article, settings: Settings): Promise<InfographicData> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `Analyze this article to find quantifiable data suitable for a simple bar chart. Identify a clear theme and extract 3-5 data points with labels and numerical values. Return a single JSON object with a "title" (string) for the chart and an "items" array, where each object has a "label" (string) and a "value" (number).
    
    Article: ${article.content}`;
    
    const response = await ai.models.generateContent({
        model,
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
                                value: { type: Type.NUMBER },
                            },
                            required: ["label", "value"],
                        }
                    }
                },
                required: ["title", "items"]
            }
        }
    });

    try {
        return JSON.parse(response.text.trim()) as InfographicData;
    } catch (e) {
        console.error("Failed to parse infographic JSON:", e);
        throw new Error("Could not generate infographic data.");
    }
};

// 24. performAiSearch
export const performAiSearch = async (query: string, articles: Article[], movies: StreamingContent[], settings: Settings): Promise<AiSearchResult> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    
    const articleData = articles.map(a => `ID: ${a.id}, Title: ${a.title}, Type: Article, Excerpt: ${a.excerpt}`).join("\n");
    const movieData = movies.map(m => `ID: ${m.id}, Title: ${m.title}, Type: Movie, Description: ${m.description}`).join("\n");
    
    const prompt = `You are a powerful search AI. Analyze the user's query and the provided data.
    1. Provide a concise, direct answer to the query in a short paragraph.
    2. Identify the most relevant article IDs and movie IDs from the data.
    3. Suggest 3 follow-up questions.
    
    Return a single JSON object with "summary" (string), "relatedArticleIds" (array of numbers), "relatedMovieIds" (array of numbers), and "suggestedQuestions" (array of strings).

    User Query: "${query}"

    Data:
    ---
    ${articleData}
    ---
    ${movieData}
    ---`;

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
        return JSON.parse(response.text.trim()) as AiSearchResult;
    } catch(e) {
        console.error("AI Search failed:", e);
        throw new Error("AI search failed to produce a valid result.");
    }
};

// 25. translateArticleContent (for full article)
export const translateArticleContent = async (article: Article, language: Language, settings: Settings): Promise<{ title: string; excerpt: string; content: string }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');

    const contentToTranslate = {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content
    };

    const prompt = `Translate the following JSON object's string values into ${language}. Return a valid JSON object with the same structure.
    
    Input:
    ${JSON.stringify(contentToTranslate, null, 2)}`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    excerpt: { type: Type.STRING },
                    content: { type: Type.STRING },
                },
                required: ["title", "excerpt", "content"]
            }
        }
    });

    try {
        return JSON.parse(response.text.trim());
    } catch (e) {
        console.error("Full article translation failed:", e);
        throw new Error("Could not translate the article.");
    }
};

// 26. batchTranslate (for UI strings)
export const batchTranslate = async (translations: { [key: string]: string }, language: Language, settings: Settings): Promise<{ [key: string]: string }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'simple');
    
    const prompt = `Translate the values of the following JSON object into ${language}. Maintain the original keys. Return a valid JSON object.
    
    Input:
    ${JSON.stringify(translations, null, 2)}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { ...config, responseMimeType: "application/json" }
    });

    try {
        const jsonString = response.text.trim().replace(/```json\n?|\n?```/g, '');
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Batch translation failed:", e);
        throw new Error("Could not translate UI elements.");
    }
};

// 27. factCheckPageContent
export const factCheckPageContent = async (pageContent: string, settings: Settings): Promise<{ summary: string; sources: { uri: string; title: string }[] }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');

    const prompt = `You are a meticulous fact-checker. Analyze the full text of this article using Google Search to verify its key claims and data points. Provide a comprehensive summary of your findings, highlighting any inconsistencies or confirmations.
    
    Article Text:
    ---
    ${pageContent.substring(0, 8000)}
    ---`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            tools: [{ googleSearch: {} }],
        },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map(chunk => chunk.web)
        .filter((web): web is { uri: string; title: string } => !!web && !!web.uri)
        .reduce((acc: { uri: string; title: string }[], current) => {
            if (!acc.some(item => item.uri === current.uri)) {
                acc.push(current);
            }
            return acc;
        }, []) ?? [];
    
    return {
        summary: response.text,
        sources: sources,
    };
};


// 28. compareArticles
export async function* compareArticles(article1: Article, article2: Article, settings: Settings): AsyncGenerator<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `You are an expert news analyst. Compare and contrast the following two articles. Identify common themes, differing perspectives, and unique information in each. Structure your response with markdown headings for "Common Ground", "Article 1 Unique Points", and "Article 2 Unique Points".
    
    Article 1: "${article1.title}"
    Excerpt: ${article1.excerpt}
    
    Article 2: "${article2.title}"
    Excerpt: ${article2.excerpt}`;
    
    const response = await ai.models.generateContentStream({ model, contents: prompt, config });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// 29. getThisDayInHistory
export const getThisDayInHistory = async (): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const prompt = `Provide 2-3 significant historical events that happened on this day, ${today}. For each event, provide a title using markdown H2 format (##) and a one-sentence description.`;
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
};

// 30. identifyKeyPlayers (for Mahama Investigates)
// FIX: Update return type to use NetworkNode and NetworkLink from types.ts, resolving "Cannot find name 'Link'" error.
export const identifyKeyPlayers = async (topic: string, settings: Settings): Promise<{ nodes: NetworkNode[], links: NetworkLink[] }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');

    const prompt = `For the topic "${topic}", identify 5-7 key players (companies, countries, people) and their relationships. Return a JSON object with "nodes" (array of objects with "id" and "type") and "links" (array of objects with "source" and "target" id strings showing influence or relationship).
    
    Node types can be 'company', 'country', or 'person'.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    nodes: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING },
                                type: { type: Type.STRING, enum: ['company', 'country', 'person'] },
                            },
                            required: ['id', 'type'],
                        }
                    },
                    links: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                source: { type: Type.STRING },
                                target: { type: Type.STRING },
                            },
                            required: ['source', 'target'],
                        }
                    }
                },
                required: ['nodes', 'links']
            }
        }
    });

    try {
        return JSON.parse(response.text.trim());
    } catch (e) {
        console.error("Failed to parse key players:", e);
        throw new Error("Could not identify key players.");
    }
};

// 31. generateInvestigationSummary
export const generateInvestigationSummary = async (topic: string, settings: Settings): Promise<{ overview: string, status: string }> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    const { model, config } = getModelConfig(settings, 'complex');
    const prompt = `Provide a summary for an investigative report on "${topic}". Return a JSON object with "overview" (a 2-3 sentence summary) and "status" (a 1-sentence update on the current situation).`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            ...config,
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    overview: { type: Type.STRING },
                    status: { type: Type.STRING },
                },
                required: ['overview', 'status'],
            }
        }
    });
    try {
        return JSON.parse(response.text.trim());
    } catch(e) {
        throw new Error("Could not generate investigation summary.");
    }
};