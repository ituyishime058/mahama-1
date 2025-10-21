import { GoogleGenAI, Type } from "@google/genai";
// FIX: Add AiTtsVoice to the import list.
import type { Article, Settings, Language, QuizQuestion, ExpertPersona, FactCheckResult, KeyConcept, TimelineEvent, CommunityHighlight, AiSearchResult, InfographicData, StreamingContent, ChatMessage, NetworkNode, NetworkLink, AiTtsVoice } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// --- Text Generation & Summarization ---

export async function* summarizeArticle(article: Article, settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const prompt = `Summarize the following article in a ${settings.summaryLength} paragraph: "${article.title}" - ${article.content.substring(0, 2000)}`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* explainSimply(article: Article, settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const prompt = `Explain the key points of this article as if I'm a complete beginner on the topic. Article: "${article.title}" - ${article.content.substring(0, 2000)}`;

    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });
    
    for await (const chunk of response) {
        yield chunk.text;
    }
}

// --- Translation ---

export const batchTranslate = async (
  sourceStrings: { [key: string]: string },
  targetLanguage: Language,
  settings: Settings
): Promise<{ [key: string]: string }> => {
  const model = 'gemini-2.5-flash';
  const prompt = `Translate the following JSON object of English strings into ${targetLanguage}. Do not translate the keys. Return only the translated JSON object.\n\n${JSON.stringify(sourceStrings, null, 2)}`;
  
  const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
          responseMimeType: "application/json",
      }
  });

  try {
    const translatedJsonText = response.text.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(translatedJsonText);
  } catch (e) {
    console.error("Failed to parse translated JSON:", response.text, e);
    return sourceStrings; // Fallback to source
  }
};

export const translateArticle = async (text: string, language: string, settings: Settings): Promise<string> => {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
        model,
        contents: `Translate the following text to ${language}: "${text}"`,
    });
    return response.text;
};

export const translateArticleContent = async (article: Article, language: Language, settings: Settings): Promise<{ title: string, excerpt: string, content: string }> => {
    const model = 'gemini-2.5-flash';
    const schema = {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
        }
    };

    const response = await ai.models.generateContent({
        model,
        contents: `Translate the title, excerpt, and content of the following article to ${language}. Article Title: "${article.title}", Excerpt: "${article.excerpt}", Content: "${article.content.substring(0, 2000)}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        }
    });

    return JSON.parse(response.text);
}


// --- Interactive AI Features ---

export async function generateQuiz(article: Article, settings: Settings): Promise<QuizQuestion[]> {
    const model = 'gemini-2.5-flash';
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING },
            },
            required: ['question', 'options', 'correctAnswer'],
        }
    };
    const response = await ai.models.generateContent({
        model,
        contents: `Generate a 3-question multiple-choice quiz based on this article. Each question should have 4 options. Article: "${article.title}" - ${article.content.substring(0, 2000)}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        }
    });
    return JSON.parse(response.text);
}

export async function* generateCounterpoint(article: Article, settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const prompt = `Provide a well-reasoned counterpoint or alternative perspective to the main argument of this article. Article: "${article.title}" - ${article.content.substring(0, 2000)}`;

    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* generateBehindTheNews(article: Article, settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const prompt = `Provide historical context, background information, and broader implications related to this news article. Format the response with markdown headings. Article: "${article.title}" - ${article.content.substring(0, 2000)}`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* generateExpertAnalysis(article: Article, persona: ExpertPersona, settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = 'gemini-2.5-pro'; // Always use Pro for this feature
    const prompt = `Analyze this article from the perspective of a professional ${persona}. Provide a detailed analysis covering key aspects relevant to that field. Format with markdown. Article: "${article.title}" - ${article.content.substring(0, 3000)}`;

    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

export async function* generateAuthorResponse(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = 'gemini-2.5-pro';
    const systemInstruction = `You are an AI persona of ${article.author}. Your task is to answer questions about the article "${article.title}" as if you were the author. Maintain the author's likely tone and perspective based on the article's content. Do not break character.`;
    const chatHistory = history.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
    
    const chat = ai.chats.create({
        model,
        config: { systemInstruction },
        history: chatHistory,
    });

    const response = await chat.sendMessageStream({ message: question });

    for await (const chunk of response) {
        yield chunk.text;
    }
}

// --- Page-level AI Analysis ---

export async function factCheckPageContent(content: string, settings: Settings): Promise<{ summary: string; sources: { uri: string, title: string }[] }> {
    const model = 'gemini-2.5-pro';
    const response = await ai.models.generateContent({
        model,
        contents: `Fact-check the key claims in the following text using your knowledge and search capabilities. Provide a summary of your findings and list any sources you used. Text: "${content.substring(0, 4000)}"`,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
        .map(chunk => chunk.web)
        .filter(web => web?.uri && web.title)
        .map(web => ({ uri: web!.uri!, title: web!.title! }));

    return { summary: response.text, sources };
}

export async function getThisDayInHistory(): Promise<string> {
    const model = 'gemini-2.5-flash';
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const response = await ai.models.generateContent({
        model,
        contents: `What are 2-3 significant historical events that happened on ${today}? For each, provide a title with the year using "##" markdown and a one-sentence description.`,
    });
    return response.text;
}

export async function generateNewsBriefing(articles: Article[], settings: Settings): Promise<string> {
    const model = settings.aiModelPreference === 'Quality' ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
    const articleSummaries = articles.map(a => `Title: ${a.title}\nExcerpt: ${a.excerpt}`).join('\n\n');
    const response = await ai.models.generateContent({
        model,
        contents: `You are a news anchor for Kirehe TV. Your persona is ${settings.aiVoicePersonality}. Create a concise, engaging news briefing script summarizing the following articles. Start with a greeting. End with a sign-off. The script should be around 250 words.\n\nArticles:\n${articleSummaries}`,
    });
    return response.text;
}

export async function generateInfographicData(article: Article, settings: Settings): Promise<InfographicData> {
    const model = 'gemini-2.5-flash';
    const schema = {
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
                }
            }
        },
        required: ['title', 'items']
    };

    const response = await ai.models.generateContent({
        model,
        contents: `Extract key numerical data from this article suitable for a bar chart. Identify a title for the chart and up to 5 data points with labels and values. Article: "${article.content.substring(0, 2000)}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        }
    });

    return JSON.parse(response.text);
}

// --- Text-to-Speech ---

export async function textToSpeech(text: string, voice: AiTtsVoice): Promise<string> {
    const model = 'gemini-2.5-flash-preview-tts';
    const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: text }] }],
        config: {
            responseModalities: [ 'AUDIO' ],
            speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } }
            }
        }
    });

    const audioPart = response.candidates?.[0]?.content?.parts?.[0];
    if (audioPart && audioPart.inlineData) {
        return audioPart.inlineData.data;
    }
    throw new Error("No audio data returned from TTS API.");
}

// --- Search ---

export async function performAiSearch(query: string, articles: Article[], movies: StreamingContent[], settings: Settings): Promise<AiSearchResult> {
    const model = 'gemini-2.5-pro';
    const articleData = articles.map(a => `ID: ${a.id}, Title: ${a.title}, Category: ${a.category}`).join('\n');
    const movieData = movies.map(m => `ID: ${m.id}, Title: ${m.title}, Genre: ${m.genre}, Description: ${m.description.substring(0,100)}`).join('\n');
    const schema = {
        type: Type.OBJECT,
        properties: {
            summary: { type: Type.STRING, description: "A conversational, helpful summary answering the user's query based on the provided content and your general knowledge. Use markdown for formatting." },
            relatedArticleIds: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: "List of relevant article IDs from the provided article list." },
            relatedMovieIds: { type: Type.ARRAY, items: { type: Type.NUMBER }, description: "List of relevant movie IDs from the provided movie list." },
            suggestedQuestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Three follow-up questions the user might have." },
        },
        required: ['summary', 'relatedArticleIds', 'relatedMovieIds', 'suggestedQuestions']
    };
    
    const response = await ai.models.generateContent({
        model,
        contents: `You are a helpful search assistant for a news and entertainment platform. Answer the user's query based on the provided article and movie lists, and your general knowledge.
        User Query: "${query}"
        
        Available Articles:
        ${articleData}
        
        Available Movies & TV:
        ${movieData}`,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        }
    });
    
    return JSON.parse(response.text);
}

// --- Content Enhancement & Personalization ---

export async function findRelatedArticles(currentArticle: Article, allArticles: Article[], settings: Settings): Promise<number[]> {
    const model = 'gemini-2.5-flash';
    const articleList = allArticles
        .filter(a => a.id !== currentArticle.id)
        .map(a => `ID ${a.id}: ${a.title} (${a.category})`)
        .join('\n');
    const response = await ai.models.generateContent({
        model,
        contents: `Given the article "${currentArticle.title}", which 3 of the following articles are most relevant? Return only a comma-separated list of their IDs (e.g., "1, 2, 3").\n\n${articleList}`,
    });
    return response.text.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
}

export async function determineOptimalLayout(bookmarkedArticles: Article[], settings: Settings): Promise<Settings['homepageLayout']> {
    const model = 'gemini-2.5-flash';
    const bookmarkTitles = bookmarkedArticles.map(a => a.title).join(', ');
    const response = await ai.models.generateContent({
        model,
        contents: `Based on these bookmarked article titles, would a "Standard" (magazine-style) or "Dashboard" (dense, grid-style) layout be better for this user? Titles: "${bookmarkTitles}". Respond with only "Standard" or "Dashboard".`,
    });
    const layout = response.text.trim();
    if (layout === 'Standard' || layout === 'Dashboard') {
        return layout;
    }
    return settings.homepageLayout; // Fallback
}

export async function applyReadingLens(content: string, lens: 'Simplify' | 'DefineTerms', settings: Settings): Promise<string> {
    const model = 'gemini-2.5-flash';
    let prompt = '';
    if (lens === 'Simplify') {
        prompt = `Rewrite the following text in simpler, easier-to-understand language without losing the core meaning. Text: "${content}"`;
    } else { // DefineTerms
        prompt = `Analyze the following text. For any complex terms, names, or acronyms, add a brief, inline definition in parentheses after the term. Text: "${content}"`;
    }

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
    });
    return response.text;
}

// ... more functions to be added ...

export async function* askAboutArticle(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = 'gemini-2.5-pro';
    const systemInstruction = `You are a helpful AI assistant residing in the sidebar of a news article. Your purpose is to answer questions specifically about the article's content. Be concise and stick to the information provided in the article. The article is titled "${article.title}".`;
    const chatHistory = history.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
    
    const chat = ai.chats.create({
        model,
        config: { systemInstruction },
        history: chatHistory,
    });
    
    const fullPrompt = `Based on the article content below, answer the user's question.
    Article Content: """
    ${article.content.substring(0, 4000)}
    """
    User Question: "${question}"`;

    const response = await chat.sendMessageStream({ message: fullPrompt });

    for await (const chunk of response) {
        yield chunk.text;
    }
}


export async function* compareArticles(article1: Article, article2: Article, settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = 'gemini-2.5-pro';
    const prompt = `Compare and contrast the following two articles. Identify their main themes, points of agreement, and points of divergence. Format the output with markdown.
    
    ## Article 1: ${article1.title}
    ${article1.excerpt}
    
    ## Article 2: ${article2.title}
    ${article2.excerpt}`;
    
    const response = await ai.models.generateContentStream({
        model,
        contents: prompt,
    });

    for await (const chunk of response) {
        yield chunk.text;
    }
}


export async function generateAnchorVideo(script: string): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A news anchor presenting the following script: "${script}"`,
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
        throw new Error("Video generation failed, no download link found.");
    }
    return downloadLink;
}

export async function* generateDeepDive(article: Article, settings: Settings): AsyncGenerator<string, void, undefined> {
    const model = 'gemini-2.5-pro';
    const prompt = `Provide a deep dive into the topic of the article "${article.title}". Expand on the key concepts, explore related issues, and discuss future implications. Use markdown for formatting with ## headings for sections. Article excerpt: ${article.content.substring(0, 1000)}`;

    const response = await ai.models.generateContentStream({ model, contents: prompt });
    for await (const chunk of response) {
        yield chunk.text;
    }
}

// ---- Article Page AI Functions ----

export async function getFactCheck(article: Article, settings: Settings): Promise<FactCheckResult> {
    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
        model,
        contents: `Fact-check the main claims in this article excerpt using Google Search. Categorize the findings as 'Verified', 'Mixed', or 'Unverified'. Provide a brief summary of your findings. Excerpt: "${article.content.substring(0, 1500)}"`,
        config: {
            tools: [{ googleSearch: {} }],
        }
    });

    const text = response.text;
    let status: FactCheckResult['status'] = 'Unverified';
    if (text.toLowerCase().includes('verified')) status = 'Verified';
    else if (text.toLowerCase().includes('mixed')) status = 'Mixed';
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
        .map(chunk => chunk.web)
        .filter((web): web is { uri: string; title: string } => !!web?.uri)
        .map(web => ({ uri: web.uri, title: web.title || web.uri }));


    return { status, summary: text, sources };
}


export async function getKeyConcepts(article: Article, settings: Settings): Promise<KeyConcept[]> {
    const model = 'gemini-2.5-flash';
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                term: { type: Type.STRING },
                description: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['Person', 'Location', 'Organization', 'Concept'] }
            },
            required: ['term', 'description', 'type']
        }
    };
    const response = await ai.models.generateContent({
        model,
        contents: `Identify the top 5-7 key concepts (people, places, organizations, or ideas) from the article. For each, provide a brief, one-sentence definition. Article: "${article.content.substring(0, 2000)}"`,
        config: { responseMimeType: "application/json", responseSchema: schema }
    });
    return JSON.parse(response.text);
}

export async function getTimeline(article: Article, settings: Settings): Promise<TimelineEvent[]> {
    const model = 'gemini-2.5-flash';
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                year: { type: Type.STRING },
                description: { type: Type.STRING }
            },
            required: ['year', 'description']
        }
    };
    const response = await ai.models.generateContent({
        model,
        contents: `Create a timeline of the 3-5 most important events mentioned or relevant to this article. Article: "${article.content.substring(0, 2000)}"`,
        config: { responseMimeType: "application/json", responseSchema: schema }
    });
    return JSON.parse(response.text);
}


export async function getPullQuotes(article: Article, settings: Settings): Promise<string[]> {
    const model = 'gemini-2.5-flash';
    const schema = {
        type: Type.ARRAY,
        items: { type: Type.STRING }
    };
    const response = await ai.models.generateContent({
        model,
        contents: `Extract two impactful, representative pull quotes from the article. Each should be a complete sentence or two. Article: "${article.content.substring(0, 3000)}"`,
        config: { responseMimeType: "application/json", responseSchema: schema }
    });
    return JSON.parse(response.text);
}


export async function getAiTags(article: Article, settings: Settings): Promise<string[]> {
    const model = 'gemini-2.5-flash';
    const schema = {
        type: Type.ARRAY,
        items: { type: Type.STRING }
    };
    const response = await ai.models.generateContent({
        model,
        contents: `Generate 4-5 relevant tags for this article. Examples: "AI Ethics", "Geopolitics", "Climate Tech". Article: "${article.title} ${article.excerpt}"`,
        config: { responseMimeType: "application/json", responseSchema: schema }
    });
    return JSON.parse(response.text);
}

export async function getCommunityHighlights(article: Article, settings: Settings, type: 'takeaways' | 'highlights'): Promise<CommunityHighlight[]> {
    const model = 'gemini-2.5-flash';
    const promptType = type === 'takeaways' ? "key takeaways" : "diverse community viewpoints and opinions";
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                viewpoint: { type: Type.STRING },
                summary: { type: Type.STRING }
            },
            required: ['viewpoint', 'summary']
        }
    };
    const response = await ai.models.generateContent({
        model,
        contents: `Based on the article, generate 3 hypothetical but plausible ${promptType}. Each should have a 'viewpoint' title and a 'summary' sentence. Article: "${article.content.substring(0, 2000)}"`,
        config: { responseMimeType: "application/json", responseSchema: schema }
    });
    return JSON.parse(response.text);
}

export async function identifyKeyPlayers(articleContent: string): Promise<{ nodes: NetworkNode[], links: NetworkLink[] }> {
    const model = 'gemini-2.5-flash';
    const schema = {
        type: Type.OBJECT,
        properties: {
            nodes: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        type: { type: Type.STRING, enum: ['company', 'country', 'person'] }
                    },
                    required: ['id', 'type']
                }
            },
            links: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        source: { type: Type.STRING },
                        target: { type: Type.STRING }
                    },
                    required: ['source', 'target']
                }
            }
        },
        required: ['nodes', 'links']
    };

    const response = await ai.models.generateContent({
        model,
        contents: `Analyze the following text and identify the key entities (companies, countries, people) and their relationships. Format the output for a network graph. Text: "${articleContent.substring(0, 3000)}"`,
        config: { responseMimeType: "application/json", responseSchema: schema }
    });
    return JSON.parse(response.text);
}

export async function getKireheInfo(query: string, location: { latitude: number, longitude: number } | null): Promise<string> {
  const model = 'gemini-2.5-flash';
  
  let toolConfig = {};
  if (location) {
    toolConfig = {
      toolConfig: {
        retrievalConfig: {
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude
          }
        }
      }
    };
  }

  const response = await ai.models.generateContent({
    model,
    contents: `The user is asking a question about Kirehe District in Rwanda. Answer the question using Google Maps grounding. Question: "${query}"`,
    config: {
      tools: [{ googleMaps: {} }],
      ...toolConfig
    },
  });

  return response.text;
}