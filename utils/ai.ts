import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";
// FIX: Added AiTtsVoice to the type imports to resolve a missing type error.
import type {
  Article,
  Settings,
  QuizQuestion,
  AiSearchResult,
  ExpertPersona,
  Language,
  InfographicData,
  ChatMessage,
  FactCheckResult,
  StreamingContent,
  AiTtsVoice,
} from '../types';

// FIX: A new instance is created for each request to ensure up-to-date API key,
// especially for features that require user-selected keys.
const getAi = (settings?: Settings) => {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
};

const getModelName = (settings: Settings, task: 'basic' | 'complex' = 'basic') => {
    if (settings.aiModelPreference === 'Quality') {
        return 'gemini-2.5-pro';
    }
    return task === 'complex' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
};

export async function* summarizeArticle(article: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    const prompt = `Summarize the following article in a ${settings.summaryLength} paragraph: "${article.title}"\n\n${article.content}`;
    
    const response = await ai.models.generateContentStream({
        model: model,
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function performAiSearch(query: string, articles: Article[], movies: StreamingContent[], settings: Settings): Promise<AiSearchResult> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    
    const articleCatalog = articles.map(a => `ID: ${a.id}, Title: ${a.title}, Excerpt: ${a.excerpt}`).join('\n');
    const movieCatalog = movies.map(m => `ID: ${m.id}, Title: ${m.title}, Description: ${m.description}, Genre: ${m.genre}`).join('\n');

    const prompt = `You are a powerful search AI for a news platform. A user is searching for: "${query}".
    
    Here is the available content:
    ARTICLES:
    ${articleCatalog}

    MOVIES & TV:
    ${movieCatalog}
    
    Please provide a response in JSON format. The JSON object should have the following structure:
    {
      "summary": "A concise, 1-2 paragraph summary answering the user's query directly based on the provided content. If the query is broad, synthesize information from multiple sources. Format with markdown.",
      "relatedArticleIds": [an array of up to 5 relevant article IDs (numbers)],
      "relatedMovieIds": [an array of up to 5 relevant movie IDs (numbers)],
      "suggestedQuestions": ["a list of 3 follow-up questions the user might have"]
    }
    
    Analyze the user's query and the content catalogs to find the most relevant information. Prioritize direct answers in the summary. If no relevant content is found, the summary should state that and the ID arrays should be empty.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: 'application/json'
        }
    });

    try {
        const json = JSON.parse(response.text);
        return json;
    } catch (e) {
        console.error("Failed to parse AI search response:", e);
        throw new Error("AI search returned an invalid format.");
    }
}

export async function* applyReadingLens(content: string, lens: 'Simplify' | 'DefineTerms', settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    let prompt: string;

    if (lens === 'Simplify') {
        prompt = `Simplify the following text. Make it easier to understand for a general audience without losing the core meaning:\n\n${content}`;
    } else { // DefineTerms
        prompt = `Analyze the following text. Identify key terms, people, and organizations. For each, provide a brief, one-sentence definition or description inline with the text, formatted like this: "The identified term (a brief definition)". Do not alter the original text otherwise.\n\n${content}`;
    }

    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function translateArticleContent(article: Article, language: Language, settings: Settings): Promise<{ title: string; excerpt: string; content: string }> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    const textToTranslate = `TITLE: ${article.title}\nEXCERPT: ${article.excerpt}\nCONTENT: ${article.content}`;
    
    const prompt = `Translate the following news article into ${language}. Keep the structure with "TITLE:", "EXCERPT:", and "CONTENT:" labels.\n\n${textToTranslate}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });

    const translatedText = response.text;
    const titleMatch = translatedText.match(/TITLE: (.*)/);
    const excerptMatch = translatedText.match(/EXCERPT: (.*)/);
    const contentMatch = translatedText.match(/CONTENT: ([\s\S]*)/);
    
    return {
        title: titleMatch ? titleMatch[1] : article.title,
        excerpt: excerptMatch ? excerptMatch[1] : article.excerpt,
        content: contentMatch ? contentMatch[1] : article.content
    };
}

export async function generateDeepDive(article: Article, settings: Settings): Promise<AsyncIterable<string>> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const prompt = `Provide a deep dive analysis of the article "${article.title}". The analysis should include:
    - Historical Context: What led up to these events?
    - Key Players: Who are the main actors and what are their motivations?
    - Broader Implications: What are the potential long-term effects globally or in the relevant sector?
    - Unstated Factors: What important context might be missing from this article?
    
    Format the response in markdown with ## for headings.
    
    Article Content for analysis:
    ${article.content}`;
    
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    
    async function* stream() {
        for await (const chunk of response) {
            yield chunk.text;
        }
    }
    return stream();
}

export async function textToSpeech(text: string, voice: AiTtsVoice): Promise<string> {
    const ai = getAi();
// FIX: Removed redundant voice instruction from the prompt text as it is handled by speechConfig.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
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
        throw new Error("No audio data returned from API.");
    }
    return base64Audio;
}

export async function* explainSimply(article: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    const prompt = `Explain the key points of this article as if you were talking to a 10-year-old. Use simple language and analogies.\n\nArticle: "${article.title}"\n${article.content}`;
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function translateArticle(text: string, language: Language | string, settings: Settings): Promise<string> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    const prompt = `Translate the following text into ${language}:\n\n${text}`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function generateQuiz(article: Article, settings: Settings): Promise<QuizQuestion[]> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const prompt = `Based on the following article, generate 3 multiple-choice quiz questions.
    Return the response as a JSON array of objects. Each object should have keys "question", "options" (an array of 4 strings), and "correctAnswer" (a string that exactly matches one of the options).
    
    Article: "${article.title}"
    ${article.content}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });
    
    try {
        const json = JSON.parse(response.text);
        return json;
    } catch (e) {
        console.error("Failed to parse quiz response:", e);
        throw new Error("AI quiz generator returned an invalid format.");
    }
}

export async function findRelatedArticles(currentArticle: Article, allArticles: Article[], settings: Settings): Promise<number[]> {
    const ai = getAi(settings);
    const model = getModelName(settings);

    const articleCatalog = allArticles
        .filter(a => a.id !== currentArticle.id)
        .map(a => `ID: ${a.id}, Title: ${a.title}, Category: ${a.category}, Excerpt: ${a.excerpt}`)
        .join('\n');

    const prompt = `Given the current article with title "${currentArticle.title}" and content: "${currentArticle.excerpt}", find the 3 most relevant articles from the following list. Return only a JSON array of their IDs (as numbers), like [10, 25, 3].
    
    Available articles:
    ${articleCatalog}`;

    const response = await ai.models.generateContent({ model, contents: prompt });

    try {
        const json = JSON.parse(response.text.trim());
        return Array.isArray(json) ? json.filter(id => typeof id === 'number') : [];
    } catch (e) {
        console.error("Failed to parse related articles response:", e);
        return [];
    }
}

export async function* generateCounterpoint(article: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const prompt = `Read the following article. Then, provide a well-reasoned counterpoint or alternative perspective to its main argument. Be balanced and respectful.
    
    Article: "${article.title}"
    ${article.content}`;
    
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* generateBehindTheNews(article: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const prompt = `Provide "behind the news" context for the article "${article.title}". Explain the history, key players, and significance of the events described. Format in markdown with ## for headings.
    
    Article content:
    ${article.content}`;
    
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* generateExpertAnalysis(article: Article, persona: ExpertPersona, settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const prompt = `Analyze the article "${article.title}" from the perspective of a professional ${persona}. What are the key takeaways, potential impacts, and things to watch for from that specific viewpoint? Format in markdown.
    
    Article content:
    ${article.content}`;
    
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* askAboutArticle(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const chatHistory = history.map(m => `${m.role}: ${m.content}`).join('\n');
    const prompt = `You are an AI assistant helping a user understand a news article.
    
    The article is titled "${article.title}" and its content is:
    "${article.content}"
    
    Chat history:
    ${chatHistory}
    
    The user is now asking: "${question}"
    
    Answer the user's question based *only* on the provided article content and chat history. If the answer isn't in the article, say so.`;

    const response = await ai.models.generateContentStream({ model, contents: prompt });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* generateAuthorResponse(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const chatHistory = history.map(m => `${m.role}: ${m.content}`).join('\n');

    const prompt = `You are an AI simulating ${article.author}, the author of the article "${article.title}". Embody their likely tone and expertise based on the article's content. A reader is asking you a question.
    
    Your Article:
    ${article.content}
    
    Chat History:
    ${chatHistory}
    
    Reader's Question: "${question}"
    
    Respond to the reader in the first person, as ${article.author}.`;

    const response = await ai.models.generateContentStream({ model, contents: prompt });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function generateMovieRecommendations(allMovies: StreamingContent[], settings: Settings): Promise<number[]> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    const movieCatalog = allMovies.map(m => `ID: ${m.id}, Title: ${m.title}, Genre: ${m.genre}, Description: ${m.description}`).join('\n');
    
    const prompt = `Based on a user's general interest in sci-fi, drama, and award-winning films, select the 5 best recommendations from the following list. Return only a JSON array of their IDs (as numbers), like [1, 5, 12, 14, 7].
    
    Available movies:
    ${movieCatalog}`;

    const response = await ai.models.generateContent({ model, contents: prompt });

    try {
        return JSON.parse(response.text.trim());
    } catch (e) {
        console.error("Failed to parse movie recommendations:", e);
        return []; // fallback
    }
}

export async function generateNewsBriefing(articles: Article[], settings: Settings): Promise<string> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const articleSummaries = articles.map(a => `Title: ${a.title}\nExcerpt: ${a.excerpt}`).join('\n\n');

    const prompt = `You are an AI news anchor with a ${settings.aiVoicePersonality} personality. Create a concise news briefing script based on these article summaries. The script should flow like a real news broadcast. Start with a greeting.
    
    Articles for today's briefing:
    ${articleSummaries}`;

    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function factCheckPageContent(content: string, settings: Settings): Promise<FactCheckResult> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');

    const prompt = `Fact-check the following content using Google Search. Identify key claims, verify them, and provide a summary of your findings. List the web sources you used. Respond in JSON format with keys "summary" (string) and "sources" (an array of objects with "uri" and "title" string properties).
    
    Content to check:
    ${content}`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map(c => ({
        uri: c.web?.uri || '',
        title: c.web?.title || ''
    })).filter(s => s.uri) || [];

    return {
        status: 'Verified', // This is a simplified result; a real implementation would parse the text
        summary: response.text,
        sources: sources,
    };
}

export async function generateInfographicData(article: Article, settings: Settings): Promise<InfographicData> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');

    const prompt = `Analyze the following article and extract key numerical data suitable for a bar chart.
    Return a JSON object with a "title" (string) for the chart and an "items" array. Each item in the array should be an object with a "label" (string) and a "value" (number). Find up to 5 data points.
    
    Article: "${article.title}"
    ${article.content}`;
    
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
                                value: { type: Type.NUMBER }
                            }
                        }
                    }
                }
            }
        }
    });
    
    try {
        return JSON.parse(response.text);
    } catch (e) {
        throw new Error("Failed to parse infographic data.");
    }
}

export async function getThisDayInHistory(settings: Settings): Promise<string> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const prompt = `Tell me about two significant historical events that happened on this day, ${date}. For each event, provide a title formatted as '## Year - Event Title' and a one-sentence description. The events should be relevant to a global news audience. Translate the final output to ${settings.preferredLanguage}.`;
    
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function batchTranslate(translations: { [key: string]: string }, language: Language, settings: Settings): Promise<{ [key: string]: string }> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    const jsonString = JSON.stringify(translations);
    const prompt = `Translate the values in the following JSON object to ${language}. Return only the translated JSON object.
    
    ${jsonString}`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: { responseMimeType: 'application/json' }
    });

    try {
        return JSON.parse(response.text);
    } catch (e) {
        console.error("Failed to parse batch translation response", e);
        return translations; // fallback to English
    }
}

export async function* compareArticles(article1: Article, article2: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const prompt = `Compare and contrast the following two articles. Analyze their main arguments, perspectives, and key takeaways. Format the response in markdown with ## for headings.
    
    Article 1: "${article1.title}"
    ${article1.excerpt}
    
    Article 2: "${article2.title}"
    ${article2.excerpt}`;
    
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function generateAnchorVideo(script: string): Promise<string> {
    const ai = getAi();
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Create a news anchor video for this script: ${script}`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
    });

    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error("Video generation failed, no download link found.");
    }
    return downloadLink;
}

export async function getMahamaInfo(query: string, location: {latitude: number, longitude: number} | null, settings: Settings): Promise<string> {
    const ai = getAi(settings);
    const model = getModelName(settings);
    const prompt = `You are an AI assistant for the Mahama refugee camp. Answer the user's query about camp services and information. Be helpful and concise. If you are asked for nearby locations, use the user's current location to provide directions if possible.
    User's query: "${query}"`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{googleMaps: {}}],
        toolConfig: location ? {
          retrievalConfig: {
            latLng: {
              latitude: location.latitude,
              longitude: location.longitude,
            }
          }
        } : undefined,
      },
    });

    return response.text;
}

export async function* generateMovieDeepDive(movie: StreamingContent, settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = getModelName(settings, 'complex');
    const prompt = `Provide a deep dive analysis of the movie "${movie.title}". The analysis should include:
    - Themes & Symbolism: What are the major themes and symbols in the film?
    - Director's Style: How does the director's style influence the movie?
    - Cultural Impact: What was the movie's impact on culture and cinema?
    - Trivia: Interesting facts about the production.
    
    Format the response in markdown with ## for headings.
    
    Movie Description:
    ${movie.description}`;
    
    const response = await ai.models.generateContentStream({ model, contents: prompt });
    
    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* analyzeImage(imageBase64: string, mimeType: string, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string, void, unknown> {
    const ai = getAi(settings);
    const model = 'gemini-2.5-flash';
    
    const imagePart = {
        inlineData: {
            data: imageBase64,
            mimeType: mimeType,
        },
    };
    
    const chatHistory = history.map(m => ` - ${m.role}: ${m.content}`).join('\n');
    
    const textPart = {
        text: `You are an AI assistant helping a user analyze an image from a news article.
        
        Previous conversation:
        ${chatHistory}
        
        The user is now asking: "${question}"
        
        Answer the user's question based on the image provided.`,
    };
    
    const response = await ai.models.generateContentStream({
        model,
        contents: { parts: [imagePart, textPart] },
    });
    
    for await (const chunk of response) {
        yield chunk.text;
    }
}
