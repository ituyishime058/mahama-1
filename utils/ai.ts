

import { GoogleGenAI, GenerateContentResponse, Type, Modality } from "@google/genai";
// FIX: Added AiSearchResult to the import list from types.
import type { Article, Settings, QuizQuestion, ExpertPersona, InfographicData, ChatMessage, Language, AiTtsVoice, StreamingContent, KeyConcept, TimelineEvent, FactCheckResult, CommunityHighlight, AiSearchResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function getModelForPreference(preference: 'Speed' | 'Quality'): string {
    return preference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
}

async function* streamToGenerator(stream: AsyncGenerator<GenerateContentResponse, any, unknown>): AsyncGenerator<string, any, unknown> {
    for await (const chunk of stream) {
        yield chunk.text;
    }
}

export async function summarizeArticle(article: Article, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Summarize the following article in a ${settings.summaryLength} paragraph. The summary must be in ${settings.preferredLanguage}. Article title: "${article.title}". Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });

    return streamToGenerator(response);
}

export async function explainSimply(article: Article, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Explain the following article in simple terms, as if for a 10-year-old. The explanation must be in ${settings.preferredLanguage}. Article title: "${article.title}". Content: ${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });

    return streamToGenerator(response);
}

export async function generateQuiz(article: Article, settings: Settings): Promise<QuizQuestion[]> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Create a 3-question multiple-choice quiz based on this article. For each question, provide 4 options and indicate the correct answer. The entire quiz (question, options, and correctAnswer fields) must be in ${settings.preferredLanguage}. Article: ${article.content}`;

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
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswer: { type: Type.STRING },
                    },
                    required: ["question", "options", "correctAnswer"],
                },
            },
        },
    });

    return JSON.parse(response.text);
}

export async function generateCounterpoint(article: Article, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Provide a well-reasoned counterpoint or alternative perspective to the main argument of this article. The response must be in ${settings.preferredLanguage}. Article: ${article.content}`;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    return streamToGenerator(response);
}

export async function generateBehindTheNews(article: Article, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Provide historical context, relevant background information, and key players related to this news article. The response must be in ${settings.preferredLanguage}. Format with markdown headings. Article: ${article.content}`;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    return streamToGenerator(response);
}

export async function generateExpertAnalysis(article: Article, persona: ExpertPersona, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Analyze this article from the perspective of a professional ${persona}. What are the key implications, potential consequences, and important details an expert would notice? The analysis must be in ${settings.preferredLanguage}. Format with markdown. Article: ${article.content}`;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    return streamToGenerator(response);
}

export async function generateAuthorResponse(article: Article, question: string, history: ChatMessage[], settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const systemInstruction = `You are an AI persona of ${article.author}, the author of the article titled "${article.title}". You will answer questions from a reader based on your article and your likely knowledge and perspective as the author. Your response must be in ${settings.preferredLanguage}. Do not break character.`;
    
    // Simple history construction for context
    const fullHistory = history.map(m => `${m.role}: ${m.content}`).join('\n');
    const prompt = `Context:\n${fullHistory}\n\nReader's new question: ${question}\n\nYour response as ${article.author}:`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
        config: { systemInstruction },
    });
    return streamToGenerator(response);
}

export async function askAboutArticle(article: Article, question: string, history: ChatMessage[], settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const systemInstruction = `You are a helpful AI assistant knowledgeable about the provided news article titled "${article.title}". Answer the user's questions based on the article's content. Your response must be in ${settings.preferredLanguage}. Be concise and helpful.`;
    
    const fullHistory = history.map(m => `${m.role}: ${m.content}`).join('\n');
    const prompt = `Article Content for Context: ${article.content}\n\nPrevious Conversation:\n${fullHistory}\n\nUser's new question: ${question}\n\nYour response:`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
        config: { systemInstruction },
    });
    return streamToGenerator(response);
}

export async function performAiSearch(query: string, articles: Article[], movies: StreamingContent[], settings: Settings): Promise<AiSearchResult> {
    const model = getModelForPreference(settings.aiModelPreference);
    const context = `
        Available Articles:
        ${articles.map(a => `ID: ${a.id}, Title: ${a.title}, Excerpt: ${a.excerpt}`).join('\n')}

        Available Movies & TV:
        ${movies.map(m => `ID: ${m.id}, Title: ${m.title}, Description: ${m.description}, Genre: ${m.genre}`).join('\n')}
    `;
    const prompt = `Based on the available content below, answer the user's query: "${query}". 
    1. Provide a concise summary answer in ${settings.preferredLanguage}.
    2. List the IDs of the most relevant articles (up to 5).
    3. List the IDs of the most relevant movies/TV shows (up to 5).
    4. Suggest 3 follow-up questions in ${settings.preferredLanguage}.
    ${context}`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING },
                    relatedArticleIds: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                    relatedMovieIds: { type: Type.ARRAY, items: { type: Type.INTEGER } },
                    suggestedQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["summary", "relatedArticleIds", "relatedMovieIds", "suggestedQuestions"],
            },
        },
    });

    return JSON.parse(response.text);
}


export async function translateArticle(text: string, language: string, settings: Settings): Promise<string> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Translate the following text to ${language}:\n\n${text}`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function translateArticleContent(article: Article, language: Language, settings: Settings): Promise<{ title: string; excerpt: string; content: string; }> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Translate the following JSON content fields to ${language}. Preserve the JSON structure.
    {
      "title": "${article.title}",
      "excerpt": "${article.excerpt}",
      "content": "${article.content.replace(/"/g, '\\"')}"
    }`;
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    excerpt: { type: Type.STRING },
                    content: { type: Type.STRING },
                }
            }
        }
    });
    return JSON.parse(response.text);
}


export async function applyReadingLens(content: string, lens: 'Simplify' | 'DefineTerms', settings: Settings): Promise<string> {
    const model = getModelForPreference(settings.aiModelPreference);
    let prompt = '';
    if (lens === 'Simplify') {
        prompt = `Rewrite the following text in simpler, more accessible language, and translate the entire output to ${settings.preferredLanguage}: ${content}`;
    } else if (lens === 'DefineTerms') {
        prompt = `Identify key technical or complex terms in the following text and provide brief definitions in parentheses after each term. Translate the entire output to ${settings.preferredLanguage}. Text: ${content}`;
    }
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function textToSpeech(text: string, voice: AiTtsVoice): Promise<string> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voice },
                },
            },
        },
    });
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
        throw new Error("No audio data returned from API.");
    }
    return base64Audio;
}

export async function findRelatedArticles(currentArticle: Article, allArticles: Article[], settings: Settings): Promise<number[]> {
     const model = getModelForPreference(settings.aiModelPreference);
     const articleSummaries = allArticles
        .filter(a => a.id !== currentArticle.id)
        .map(a => `ID ${a.id}: ${a.title} (${a.category})`)
        .join('\n');
    
    const prompt = `Based on the following article, which of the other articles from the list are most relevant? Return only a JSON array of up to 3 article IDs.
    Current Article: "${currentArticle.title}" - ${currentArticle.excerpt}
    List of other articles:
    ${articleSummaries}
    `;
    
    const response = await ai.models.generateContent({ model, contents: prompt });
    
    try {
        // Extract JSON array from the response text
        const match = response.text.match(/\[(.*?)\]/);
        if (match) {
            return JSON.parse(match[0]);
        }
        return [];
    } catch (e) {
        console.error("Failed to parse related articles response", e);
        return [];
    }
}

export async function generateNewsBriefing(articles: Article[], settings: Settings): Promise<string> {
    const model = getModelForPreference(settings.aiModelPreference);
    const articleSummaries = articles.map(a => `Title: ${a.title}\nExcerpt: ${a.excerpt}`).join('\n\n');
    const prompt = `You are a news anchor for Kirehe TV. Create a concise, engaging news briefing script based on the following articles. The script must be in ${settings.preferredLanguage}. The tone should be ${settings.aiVoicePersonality}. Start with a greeting and end with a sign-off.\n\n${articleSummaries}`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function getThisDayInHistory(settings: Settings): Promise<string> {
    const prompt = `What are 2-3 significant historical events that happened on this day, ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}? Provide the year and a brief description for each. The entire response must be in ${settings.preferredLanguage}. Format each event with '## [Year]' on one line and the description on the next.`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
    return response.text;
}

export async function factCheckPageContent(pageContent: string, settings: Settings): Promise<{ summary: string; sources: { uri: string, title: string }[] }> {
    const model = getModelForPreference(settings.aiModelPreference);
    const response = await ai.models.generateContent({
        model,
        contents: `Fact check the claims in the following text. Provide a summary of your findings in ${settings.preferredLanguage} and list the sources you used. Text: ${pageContent}`,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks.map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title,
    })).filter((v, i, a) => a.findIndex(t => (t.uri === v.uri)) === i); // Deduplicate

    return { summary: response.text, sources };
}


export async function generateDeepDive(article: Article, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Provide a deep dive into the topic of the article "${article.title}". Elaborate on the key concepts, explore related issues, and discuss future implications. The response must be in ${settings.preferredLanguage}. Format with markdown headings. Article content for context: ${article.content}`;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    return streamToGenerator(response);
}

export async function generateInfographicData(article: Article, settings: Settings): Promise<InfographicData> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Extract key statistics or quantifiable data from the article "${article.title}" and present it as data for a bar chart. The 'title' and all 'label' fields in the response must be in ${settings.preferredLanguage}. The data should be relevant to the main topic. Article: ${article.content}`;
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
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
                            }
                        }
                    }
                }
            }
        }
    });
    return JSON.parse(response.text);
}

export async function compareArticles(article1: Article, article2: Article, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Compare and contrast the following two articles. Identify common themes, differing viewpoints, and unique information in each. The response must be in ${settings.preferredLanguage}. Format with markdown.
    Article 1: "${article1.title}" - ${article1.excerpt}
    Article 2: "${article2.title}" - ${article2.excerpt}`;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    return streamToGenerator(response);
}


export async function determineOptimalLayout(bookmarkedArticles: Article[], settings: Settings): Promise<'Standard' | 'Dashboard'> {
    const model = getModelForPreference(settings.aiModelPreference);
    const categories = bookmarkedArticles.map(a => a.category).join(', ');
    const prompt = `A user has bookmarked articles from these categories: ${categories}. Based on these interests, would a "Standard" (magazine-style) or "Dashboard" (grid-style) homepage layout be more effective for them? Respond with only "Standard" or "Dashboard".`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    if (response.text.includes('Dashboard')) {
        return 'Dashboard';
    }
    return 'Standard';
}

export async function batchTranslate(englishStrings: { [key: string]: string }, language: Language, settings: Settings): Promise<{ [key: string]: string }> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Translate the values of this JSON object to ${language}. Return only the translated JSON object.\n\n${JSON.stringify(englishStrings)}`;
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });

    try {
        const jsonString = response.text.match(/\{[\s\S]*\}/)?.[0];
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        throw new Error("No JSON object found in response");
    } catch (e) {
        console.error("Failed to parse translation JSON:", e);
        return englishStrings; // Fallback to English
    }
}

export async function getKireheInfo(query: string, location: { latitude: number; longitude: number } | null, settings: Settings): Promise<string> {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `The user is asking about Kirehe District, Rwanda. Their query is: "${query}". Answer them as a helpful local guide in ${settings.preferredLanguage}.`,
        config: {
            tools: [{ googleMaps: {} }],
            toolConfig: location ? {
                retrievalConfig: {
                    latLng: {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    },
                },
            } : undefined,
        },
    });
    return response.text;
}


export async function generateAnchorVideo(script: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `An AI news anchor presenting this script: "${script}"`,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
        }
    });

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error("Video generation failed, no download link available.");
    }
    return downloadLink;
}