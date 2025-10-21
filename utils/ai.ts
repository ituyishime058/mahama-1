import { GoogleGenAI, GenerateContentResponse, Type, Modality } from "@google/genai";
import type { Article, Settings, QuizQuestion, ExpertPersona, InfographicData, FactCheckResult, ChatMessage, Language, TimelineEvent, KeyConcept, CommunityHighlight, NetworkNode, NetworkLink, StreamingContent, AiSearchResult } from '../types';
import { mockArticles } from '../constants';

const getModel = (settings: Settings) => settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Reusable streaming function
async function* streamResponse(prompt: string, model: string): AsyncGenerator<string> {
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* summarizeArticle(article: Article, settings: Settings): AsyncGenerator<string> {
    const model = getModel(settings);
    const prompt = `Summarize the following article in a ${settings.summaryLength}, professional paragraph. Article title: "${article.title}". Content: ${article.content}`;
    yield* streamResponse(prompt, model);
}

export async function* explainSimply(article: Article, settings: Settings): AsyncGenerator<string> {
    const model = getModel(settings);
    const prompt = `Explain the key points of this article as if I'm a complete beginner on the topic. Keep it simple and clear. Article title: "${article.title}". Content: ${article.content}`;
    yield* streamResponse(prompt, model);
}

export async function generateQuiz(article: Article, settings: Settings): Promise<QuizQuestion[]> {
    const model = getModel(settings);
    const response = await ai.models.generateContent({
        model,
        contents: `Create a 3-question multiple-choice quiz based on this article. The questions should test comprehension of key facts. For each question, provide 4 options and indicate the correct answer. Article: ${article.content}`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                        },
                        correctAnswer: { type: Type.STRING },
                    },
                    required: ['question', 'options', 'correctAnswer'],
                },
            },
        },
    });
    return JSON.parse(response.text);
}

export async function* generateCounterpoint(article: Article, settings: Settings): AsyncGenerator<string> {
    const model = getModel(settings);
    const prompt = `Provide a well-reasoned counterpoint or alternative perspective to the main argument of this article. Article: ${article.title}\n\n${article.content}`;
    yield* streamResponse(prompt, model);
}

export async function* generateBehindTheNews(article: Article, settings: Settings): AsyncGenerator<string> {
    const model = getModel(settings);
    const prompt = `Provide historical context, background information, and broader implications related to this news article. Format it with markdown headings. Article: ${article.title}\n\n${article.content}`;
    yield* streamResponse(prompt, model);
}

export async function* generateExpertAnalysis(article: Article, persona: ExpertPersona, settings: Settings): AsyncGenerator<string> {
    const model = getModel(settings);
    const prompt = `Analyze this article from the perspective of a professional ${persona}. Discuss the key implications, underlying trends, and potential future developments. Format with markdown. Article: ${article.title}\n\n${article.content}`;
    yield* streamResponse(prompt, model);
}

export async function* generateAuthorResponse(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string> {
    const model = getModel(settings);
    const prompt = `You are an AI persona of ${article.author}, the author of the article "${article.title}". Based on the article's content and your persona, answer the following question. Previous conversation: ${JSON.stringify(history)}. Question: "${question}"`;
    yield* streamResponse(prompt, model);
}

export async function* generateDeepDive(article: Article, settings: Settings): AsyncGenerator<string> {
    const model = getModel(settings);
    const prompt = `Generate a deep-dive analysis of the article "${article.title}". Explore related topics, technical details, and long-term consequences. Use markdown for structure. Article content: ${article.content}`;
    yield* streamResponse(prompt, model);
}

export async function generateInfographicData(article: Article, settings: Settings): Promise<InfographicData> {
    const model = getModel(settings);
    const response = await ai.models.generateContent({
        model,
        contents: `From the article "${article.title}", extract the most important quantifiable data points suitable for a bar chart. Identify a clear title for the chart and provide between 3 to 6 data items with labels and numerical values. Article: ${article.content}`,
        config: {
            responseMimeType: 'application/json',
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
                            required: ['label', 'value'],
                        },
                    },
                },
                required: ['title', 'items'],
            },
        },
    });
    return JSON.parse(response.text);
}

export async function findRelatedArticles(currentArticle: Article, allArticles: Article[], settings: Settings): Promise<number[]> {
    const model = getModel(settings);
    const articleSummaries = allArticles
        .filter(a => a.id !== currentArticle.id)
        .map(a => ({ id: a.id, title: a.title, excerpt: a.excerpt }));

    const response = await ai.models.generateContent({
        model,
        contents: `From the following list of articles, which 3 are most topically related to the article titled "${currentArticle.title}"? Provide only a JSON array of their integer IDs. Article List: ${JSON.stringify(articleSummaries)}`,
    });
    
    try {
        const ids = JSON.parse(response.text.replace(/`/g, '').replace('json', ''));
        return Array.isArray(ids) ? ids : [];
    } catch (e) {
        console.error("Failed to parse related article IDs:", e);
        return [];
    }
}

export async function determineOptimalLayout(bookmarkedArticles: Article[], settings: Settings): Promise<'Standard' | 'Dashboard'> {
    const model = getModel(settings);
    const titles = bookmarkedArticles.map(a => a.title).join(', ');
    const response = await ai.models.generateContent({
        model,
        contents: `A user frequently bookmarks articles like: "${titles}". Based on these topics, would a "Standard" (content-focused, traditional) or "Dashboard" (dense, data-rich) layout be more suitable? Respond with only "Standard" or "Dashboard".`,
    });
    const layout = response.text.trim();
    return layout === 'Dashboard' ? 'Dashboard' : 'Standard';
}

export const getThisDayInHistory = async (): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `What are 2-3 significant historical events that happened on today's date? For each, provide the year and a one-sentence description. Use markdown "##" for each event title (e.g., "## 1969 - Moon Landing").`,
    });
    return response.text;
};

export async function applyReadingLens(content: string, lens: 'Simplify' | 'DefineTerms', settings: Settings): Promise<string> {
    const model = getModel(settings);
    let prompt = '';
    if (lens === 'Simplify') {
        prompt = `Rewrite the following text in simpler, easier-to-understand language, while retaining the core meaning: ${content}`;
    } else if (lens === 'DefineTerms') {
        prompt = `Analyze the following text. For any complex terms or jargon, add a simple, one-sentence definition in parentheses immediately after the term. Return the full text with these definitions integrated. Text: ${content}`;
    }
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export const translateArticle = async (text: string, language: string, settings: Settings): Promise<string> => {
    const model = getModel(settings);
    const response = await ai.models.generateContent({
        model,
        contents: `Translate the following text to ${language}: "${text}"`,
    });
    return response.text;
};

export const batchTranslate = async (englishStrings: Record<string, string>, language: string, settings: Settings): Promise<Record<string, string>> => {
    const model = getModel(settings);
    const response = await ai.models.generateContent({
        model,
        contents: `Translate the values of this JSON object to ${language}. Return only the translated JSON object. ${JSON.stringify(englishStrings)}`,
        config: { responseMimeType: 'application/json' }
    });
    try {
        return JSON.parse(response.text);
    } catch (e) {
        console.error("Failed to parse translated JSON:", e);
        return englishStrings; // Fallback
    }
}

export const translateArticleContent = async (article: Article, language: Language, settings: Settings): Promise<{ title: string; excerpt: string; content: string; }> => {
    const model = getModel(settings);
    const response = await ai.models.generateContent({
        model,
        contents: `Translate the following JSON object's string values to ${language}. Return only the translated JSON object. ${JSON.stringify({ title: article.title, excerpt: article.excerpt, content: article.content })}`,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text);
};

export const factCheckArticle = async (article: Article, settings: Settings): Promise<FactCheckResult> => {
    const model = 'gemini-2.5-pro';
    const response = await ai.models.generateContent({
        model,
        contents: `Fact-check the key claims in the following article. Provide a summary of your findings and a status: "Verified", "Mixed", or "Unverified". Article: ${article.content}`,
        config: { tools: [{ googleSearch: {} }] }
    });
    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web) || [];
    
    let status: FactCheckResult['status'] = 'Unverified';
    if (text.toLowerCase().includes('verified')) status = 'Verified';
    else if (text.toLowerCase().includes('mixed')) status = 'Mixed';
    
    return { status, summary: text, sources };
};

export const factCheckPageContent = async (content: string, settings: Settings): Promise<{ summary: string; sources: { uri: string, title: string }[] }> => {
    const model = 'gemini-2.5-pro';
    const response = await ai.models.generateContent({
        model,
        contents: `Fact-check the key claims in the provided text. Summarize your findings and list the sources you consulted. Text: ${content}`,
        config: { tools: [{ googleSearch: {} }] }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => chunk.web) || [];
    return { summary: response.text, sources };
}

export const identifyKeyPlayers = async (article: Article, settings: Settings): Promise<{ nodes: NetworkNode[]; links: NetworkLink[]; }> => {
    const model = getModel(settings);
    const response = await ai.models.generateContent({
        model,
        contents: `Identify the key players (companies, countries, people) in this article and their relationships. Return a JSON object with 'nodes' and 'links'. Nodes should have 'id' and 'type'. Links should have 'source' and 'target'. Article: ${article.content}`,
        config: { responseMimeType: 'application/json' }
    });
    return JSON.parse(response.text);
}

export async function* askAboutArticle(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string> {
    const model = getModel(settings);
    const prompt = `Based on the article "${article.title}", answer the following question. Previous conversation: ${JSON.stringify(history)}. Question: "${question}"\n\nArticle Content: ${article.content}`;
    yield* streamResponse(prompt, model);
}

export const generateNewsBriefing = async (articles: Article[], settings: Settings): Promise<string> => {
    const model = getModel(settings);
    const articleSummaries = articles.map(a => `Title: ${a.title}\nExcerpt: ${a.excerpt}`).join('\n\n');
    const response = await ai.models.generateContent({
        model,
        contents: `You are a news anchor with a ${settings.aiVoicePersonality} personality. Create a concise, engaging news briefing script summarizing these articles. The script should be spoken, not written. Articles:\n${articleSummaries}`,
    });
    return response.text;
}

export const textToSpeech = async (text: string, voice: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice as any } } },
        },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("No audio data returned from API.");
    }
    return base64Audio;
};

export const performAiSearch = async (query: string, articles: Article[], movies: StreamingContent[], settings: Settings): Promise<AiSearchResult> => {
    const model = getModel(settings);
    const articleTitles = articles.map(a => ({ id: a.id, title: a.title }));
    const movieTitles = movies.map(m => ({ id: m.id, title: m.title }));
    
    const response = await ai.models.generateContent({
        model,
        contents: `A user is searching for "${query}". 
        1. Provide a direct, concise summary answer to the query.
        2. From this list of articles, identify up to 5 relevant article IDs: ${JSON.stringify(articleTitles)}.
        3. From this list of movies/TV shows, identify up to 5 relevant IDs: ${JSON.stringify(movieTitles)}.
        4. Suggest 3 follow-up questions the user might have.`,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING },
                    relatedArticleIds: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                    relatedMovieIds: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                    suggestedQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ['summary', 'relatedArticleIds', 'relatedMovieIds', 'suggestedQuestions'],
            }
        }
    });

    return JSON.parse(response.text);
};

export async function compareArticles(article1: Article, article2: Article, settings: Settings): Promise<AsyncGenerator<string>> {
  const model = getModel(settings);
  const prompt = `Compare and contrast the following two articles. Analyze their perspectives, key points, and potential biases. Format the output with markdown.
  
  Article 1: "${article1.title}"
  Content: ${article1.excerpt}
  
  Article 2: "${article2.title}"
  Content: ${article2.excerpt}`;
  
  const response = await ai.models.generateContentStream({ model, contents: prompt });
  
  return (async function*() {
    for await (const chunk of response) {
      yield chunk.text;
    }
  })();
}

export const generateAnchorVideo = async (script: string): Promise<string> => {
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-generate-preview',
        prompt: `A photorealistic virtual news anchor presenting this script in a modern news studio: "${script}"`,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9',
        },
    });

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error("Video generation failed to produce a download link.");
    }
    return downloadLink;
};

export const getKireheInfo = async (query: string, location: { latitude: number; longitude: number } | null): Promise<FactCheckResult> => {
    const config: any = {
        tools: [{ googleMaps: {} }],
    };
    if (location) {
        config.toolConfig = {
            retrievalConfig: { latLng: location }
        };
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Answer the following question about Kirehe District, Rwanda: "${query}"`,
        config,
    });
    
    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        uri: chunk.maps?.uri || '#',
        title: chunk.maps?.title || 'Google Maps Result'
    })) || [];

    return { status: 'Verified', summary: text, sources };
};
