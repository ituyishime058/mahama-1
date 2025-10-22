
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

// FIX: This function was broken/incomplete. It has been fully implemented.
export async function generateAuthorResponse(article: Article, question: string, history: ChatMessage[], settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const systemInstruction = `You are an AI persona of ${article.author}, the author of the article "${article.title}". Respond to user questions as if you are ${article.author}, based on the article's content and your general knowledge. Be informative and maintain the author's likely tone. The response must be in ${settings.preferredLanguage}. Article content for context: ${article.content}`;

    const historyString = history.map(msg => `${msg.role === 'user' ? 'User' : 'Author Persona'}: ${msg.content}`).join('\n');
    const fullPrompt = `Here is the conversation so far:\n${historyString}\n\nContinue the conversation. The user's latest message is: ${question}`;

    const response = await ai.models.generateContentStream({
        model,
        contents: fullPrompt,
        config: {
            systemInstruction
        }
    });

    return streamToGenerator(response);
}


export async function performAiSearch(searchTerm: string, articles: Article[], movies: StreamingContent[], settings: Settings): Promise<AiSearchResult> {
    const model = getModelForPreference(settings.aiModelPreference);
    const articlesString = articles.map(a => `ID: ${a.id}, Title: ${a.title}, Excerpt: ${a.excerpt}`).join('\n');
    const moviesString = movies.map(m => `ID: ${m.id}, Title: ${m.title}, Description: ${m.description}, Genre: ${m.genre}, Year: ${m.year}`).join('\n');

    const prompt = `Perform a smart search for "${searchTerm}".
    1.  Provide a concise summary answer to the query.
    2.  From the following list of articles, identify up to 5 relevant article IDs.
    3.  From the following list of movies, identify up to 5 relevant movie IDs.
    4.  Suggest 3 follow-up questions.
    
    ARTICLES:
    ${articlesString}

    MOVIES:
    ${moviesString}
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING, description: 'A concise summary answer to the search query.' },
                    relatedArticleIds: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: 'An array of up to 5 relevant article IDs.' },
                    relatedMovieIds: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: 'An array of up to 5 relevant movie IDs.' },
                    suggestedQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: 'An array of 3 suggested follow-up questions.' }
                },
                required: ['summary', 'relatedArticleIds', 'relatedMovieIds', 'suggestedQuestions']
            }
        }
    });

    return JSON.parse(response.text);
}

export async function applyReadingLens(content: string, lens: 'Simplify' | 'DefineTerms', settings: Settings): Promise<string> {
    const model = getModelForPreference(settings.aiModelPreference);
    let prompt = '';
    if (lens === 'Simplify') {
        prompt = `Rewrite the following text in simpler, easier-to-understand language, as if explaining it to a young adult. Preserve the core meaning. Text: ${content}`;
    } else if (lens === 'DefineTerms') {
        prompt = `Identify key terms, people, and concepts in the following text and provide brief, inline definitions in parentheses after each term. Text: ${content}`;
    } else {
        return content;
    }

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text;
}

export async function translateArticleContent(article: Article, language: Language, settings: Settings): Promise<{ title: string; excerpt: string; content: string }> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Translate the following article components to ${language}. Return a JSON object with "title", "excerpt", and "content" keys.
    Original Title: ${article.title}
    Original Excerpt: ${article.excerpt}
    Original Content: ${article.content}
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    excerpt: { type: Type.STRING },
                    content: { type: Type.STRING },
                },
                required: ['title', 'excerpt', 'content']
            }
        }
    });

    return JSON.parse(response.text);
}

export async function generateDeepDive(article: Article, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Generate a "deep dive" analysis of the following article. Include sections on background context, key players, potential future implications, and related topics. Use markdown for formatting. The response must be in ${settings.preferredLanguage}. Article: ${article.content}`;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    return streamToGenerator(response);
}

export async function textToSpeech(text: string, voice: AiTtsVoice): Promise<string> {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-tts',
        contents: [{ parts: [{ text: text }] }],
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
        throw new Error('No audio data received from API.');
    }
    return base64Audio;
}

export async function translateArticle(text: string, language: Language, settings: Settings): Promise<string> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Translate the following text to ${language}. Text: "${text}"`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function findRelatedArticles(currentArticle: Article, allArticles: Article[], settings: Settings): Promise<number[]> {
    const model = getModelForPreference(settings.aiModelPreference);
    const articlesList = allArticles
        .filter(a => a.id !== currentArticle.id)
        .map(a => `ID: ${a.id}, Title: ${a.title}, Category: ${a.category}, Excerpt: ${a.excerpt}`)
        .join('\n');
    
    const prompt = `From the list of articles below, identify the top 3 most relevant articles related to the following main article. Return only a JSON array of their IDs (as numbers).

    Main Article:
    Title: ${currentArticle.title}
    Content: ${currentArticle.excerpt}

    List of Articles:
    ${articlesList}
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.NUMBER },
            },
        }
    });

    try {
        const ids = JSON.parse(response.text);
        return Array.isArray(ids) ? ids.filter(id => typeof id === 'number') : [];
    } catch (e) {
        console.error("Failed to parse related article IDs:", e);
        return [];
    }
}

export async function askAboutArticle(article: Article, question: string, history: ChatMessage[], settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const systemInstruction = `You are a helpful AI assistant knowledgeable about the provided article. Answer the user's question based *only* on the article's content. If the answer is not in the article, say so. The response must be in ${settings.preferredLanguage}. Article content: ${article.content}`;
    
    const historyString = history.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n');
    const fullPrompt = `Here is the conversation so far:\n${historyString}\n\nUser's new question: ${question}`;

    const response = await ai.models.generateContentStream({
        model,
        contents: fullPrompt,
        config: { systemInstruction }
    });
    return streamToGenerator(response);
}

export async function generateMovieRecommendations(allMovies: StreamingContent[], settings: Settings): Promise<number[]> {
    const model = getModelForPreference(settings.aiModelPreference);
    const moviesList = allMovies.map(m => `ID: ${m.id}, Title: ${m.title}, Genre: ${m.genre}, Description: ${m.description}`).join('\n');
    const prompt = `Based on a user who enjoys thought-provoking sci-fi and award-winning dramas, recommend 5 movies from the following list. Return only a JSON array of the movie IDs.
    
    Movies:
    ${moviesList}
    `;
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.NUMBER },
            },
        }
    });
    return JSON.parse(response.text);
}

export async function generateNewsBriefing(articles: Article[], settings: Settings): Promise<string> {
    const model = getModelForPreference(settings.aiModelPreference);
    const articlesString = articles.map(a => `Title: ${a.title}\nContent: ${a.excerpt}`).join('\n\n');
    const prompt = `Create a concise news briefing script based on the following articles. The tone should be ${settings.aiVoicePersonality}. The language must be ${settings.preferredLanguage}. Start with a friendly greeting and then summarize each story.
    
    Articles:
    ${articlesString}
    `;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function factCheckPageContent(content: string, settings: Settings): Promise<{ summary: string; sources: { uri: string, title: string }[] }> {
    const model = "gemini-2.5-flash"; // Use model with grounding
    const prompt = `Fact-check the key claims in the following text. Provide a summary of your findings and list the web sources you used.
    
    Text:
    ${content}`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title,
    })) || [];

    return {
        summary: response.text,
        sources: sources,
    };
}

export async function generateInfographicData(article: Article, settings: Settings): Promise<InfographicData> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Analyze the following article and extract key numerical data suitable for a bar chart. Identify a title for the chart and up to 5 data points, each with a label and a value. The language must be ${settings.preferredLanguage}.
    Article: ${article.content}
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
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
                                value: { type: Type.NUMBER }
                            },
                            required: ['label', 'value']
                        }
                    }
                },
                required: ['title', 'items']
            }
        }
    });
    return JSON.parse(response.text);
}

export async function getThisDayInHistory(settings: Settings): Promise<string> {
    const model = "gemini-2.5-flash";
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const prompt = `List three interesting historical events that happened on ${date}. For each event, provide the year and a one-sentence description. Format each event with a markdown heading like "## Year - Event Title". The response must be in ${settings.preferredLanguage}.`;

    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}


export async function batchTranslate(source: { [key: string]: string }, language: Language, settings: Settings): Promise<{ [key: string]: string }> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Translate the values of the following JSON object to ${language}. Return the result as a valid JSON object with the same keys.
    
    JSON to translate:
    ${JSON.stringify(source, null, 2)}
    `;
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        }
    });
    
    try {
        let jsonStr = response.text.trim();
        if (jsonStr.startsWith('```json')) {
            jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        }
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Failed to parse batch translation response:", response.text, e);
        return source;
    }
}

export async function compareArticles(article1: Article, article2: Article, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Compare and contrast the following two articles. Identify common themes, differing perspectives, and key takeaways from both. Format the response with markdown. The response must be in ${settings.preferredLanguage}.

    Article 1: "${article1.title}"
    ${article1.content}

    Article 2: "${article2.title}"
    ${article2.content}
    `;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    return streamToGenerator(response);
}

export async function generateAnchorVideo(script: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: script,
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
        throw new Error("Video generation failed or did not return a URL.");
    }
    return downloadLink;
}

export async function getMahamaInfo(question: string, location: { latitude: number; longitude: number } | null, settings: Settings): Promise<string> {
    const model = "gemini-2.5-flash";
    const response = await ai.models.generateContent({
        model,
        contents: question,
        config: {
            tools: [{ googleMaps: {} }],
            toolConfig: location ? {
                retrievalConfig: {
                    latLng: location
                }
            } : undefined
        },
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    let responseText = response.text;

    if (chunks && chunks.length > 0) {
        responseText += '\n\n**Sources:**\n';
        chunks.forEach((chunk: any) => {
            if (chunk.maps) {
                responseText += `* [${chunk.maps.title || 'View on Google Maps'}](${chunk.maps.uri})\n`;
            }
        });
    }

    return responseText;
}

export async function generateMovieDeepDive(movie: StreamingContent, settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = getModelForPreference(settings.aiModelPreference);
    const prompt = `Generate a "deep dive" analysis for the movie "${movie.title}" (${movie.year}). Include sections for: Themes, Symbolism, Director's Style, and Critical Reception. Use markdown for formatting. Movie description for context: ${movie.description}`;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    return streamToGenerator(response);
}

export async function analyzeImage(imageBase64: string, mimeType: string, question: string, history: ChatMessage[], settings: Settings): Promise<AsyncGenerator<string, any, unknown>> {
    const model = 'gemini-2.5-flash-image';
    const imagePart = {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
    };
    
    // For simplicity in a stateless function, we'll just use the latest question with the image.
    // A more complex implementation could format `history` into the prompt.
    const response = await ai.models.generateContentStream({
        model,
        contents: {
            parts: [imagePart, { text: question }]
        }
    });

    return streamToGenerator(response);
}


export async function determineOptimalLayout(articles: Article[], settings: Settings): Promise<'default' | 'grid'> {
    const model = 'gemini-2.5-flash';
    const articleTitles = articles.map(a => a.title).join(', ');
    const prompt = `Based on this list of article titles, would a 'default' (one featured, others smaller) or 'grid' (all same size) layout be more appropriate for a homepage? Titles: ${articleTitles}. Respond with only 'default' or 'grid'.`;

    const response = await ai.models.generateContent({ model, contents: prompt });

    const layout = response.text.trim().toLowerCase();
    if (layout === 'grid') {
      return 'grid';
    }
    return 'default';
}
