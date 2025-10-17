import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { Article, QuizQuestion, Settings, TimelineEvent, ExpertPersona, KeyConcept, ChatMessage, ReadingLens } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to select model based on user settings
const getModel = (settings: Settings) => {
    return settings.aiModelPreference === 'Speed' ? 'gemini-2.5-flash' : 'gemini-2.5-pro';
};

// Helper to get config, disabling thinking for the fast model on interactive tasks
const getInteractiveConfig = (settings: Settings) => {
    const model = getModel(settings);
    // Disable thinking only for the 'Speed' model to improve responsiveness.
    return model === 'gemini-2.5-flash' ? { thinkingConfig: { thinkingBudget: 0 } } : {};
}

export async function* summarizeArticle(article: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    try {
        let prompt: string;
        switch(settings.summaryLength) {
            case 'Short':
                prompt = `Summarize the following news article in one single, concise sentence:\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
                break;
            case 'Detailed':
                prompt = `Provide a detailed, multi-paragraph summary of the following news article, covering all the key points and nuances:\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
                break;
            case 'Medium':
            default:
                 prompt = `Summarize the following news article in 3-4 concise bullet points. Use a '-' for each bullet point.:\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
                break;
        }

        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash', // Always use the fast model for summaries
            contents: prompt,
            config: { thinkingConfig: { thinkingBudget: 0 } },
        });

        for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error summarizing article:", error);
        throw new Error("Failed to generate summary. Please try again.");
    }
};

export async function* explainSimply(article: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `Explain the key points of this article as if you were talking to a 10-year-old. Use simple language and analogies.\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash', // Always use the fast model for explanations
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 },
                systemInstruction: "You are a friendly and simple explainer for kids.",
            }
        });
        for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error explaining article:", error);
        throw new Error("Failed to generate simple explanation. Please try again.");
    }
};

export const textToSpeech = async (text: string, voice: Settings['ttsVoice'] = 'Kore'): Promise<string> => {
    try {
        // The API has a list of specific supported voices. We map our large list to the available ones.
        // This is a simplification; a real app would need a more robust mapping.
        const supportedVoices: Settings['ttsVoice'][] = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'];
        const selectedVoice = supportedVoices.includes(voice) ? voice : 'Zephyr';

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: text }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: selectedVoice },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data received from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error generating text-to-speech:", error);
        throw new Error("Failed to generate audio. Please try again.");
    }
};

export const generateTags = async (article: Article, settings: Settings): Promise<string[]> => {
    try {
        const prompt = `Generate 4-5 relevant tags for this news article. The tags should be short, single or two-word concepts.\n\nTitle: ${article.title}\n\nExcerpt: ${article.excerpt}`;
        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: {
                ...getInteractiveConfig(settings),
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tags: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return result.tags || [];
    } catch (error) {
        console.error("Error generating tags:", error);
        return [];
    }
};

export const factCheckArticle = async (article: Article, settings: Settings): Promise<{ status: string; summary: string } | null> => {
    try {
        const prompt = `Analyze the claims made in the following article and provide a fact-check summary. 
First, on a single line, categorize the overall accuracy as 'Verified', 'Mixed', or 'Unverified'.
Then, on a new line, provide a brief summary of your findings.
Your entire response MUST follow this exact format:
STATUS: [Your status]
SUMMARY: [Your summary]

Title: ${article.title}
Content: ${article.content}`;
        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            }
        });
        const text = response.text;
        const statusMatch = text.match(/STATUS:\s*(.*)/);
        const summaryMatch = text.match(/SUMMARY:\s*(.*)/s);

        const status = statusMatch ? statusMatch[1].trim() : 'Unverified';
        const summary = summaryMatch ? summaryMatch[1].trim() : 'Could not determine fact-check summary from the response.';
        
        return { status, summary };
    } catch (error) {
        console.error("Error fact-checking article:", error);
        return null;
    }
};

export const translateArticle = async (text: string, language: string, settings: Settings): Promise<string> => {
    try {
        const prompt = `Translate the following text into ${language}:\n\n${text}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', // Always use fast model for translation
            contents: prompt,
            config: { thinkingConfig: { thinkingBudget: 0 } }
        });
        return response.text;
    } catch (error) {
        console.error(`Error translating to ${language}:`, error);
        throw new Error(`Failed to translate. Please try again.`);
    }
};

export const generateQuiz = async (article: Article, settings: Settings): Promise<QuizQuestion[]> => {
    try {
        const prompt = `Create a 3-question multiple-choice quiz based on the following article. For each question, provide four options and indicate the correct answer.\n\nArticle: ${article.content}`;
        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: {
                ...getInteractiveConfig(settings),
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        quiz: {
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
                    }
                }
            }
        });
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return result.quiz || [];
    } catch (error) {
        console.error("Error generating quiz:", error);
        throw new Error("Failed to generate quiz. Please try again.");
    }
};

export const findRelatedArticles = async (currentArticle: Article, allArticles: Article[], settings: Settings): Promise<number[]> => {
    try {
        const articleList = allArticles
            .filter(a => a.id !== currentArticle.id)
            .map(a => `ID: ${a.id}, Title: ${a.title}`)
            .join('\n');
        
        const prompt = `Based on the following article:\nTitle: ${currentArticle.title}\nExcerpt: ${currentArticle.excerpt}\n\nFrom the list below, find the three most topically related articles. Return only a JSON array of their IDs, like [1, 5, 8].\n\nArticle List:\n${articleList}`;

        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: {
                ...getInteractiveConfig(settings),
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.NUMBER,
                    },
                },
            },
        });
        
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return Array.isArray(result) ? result : [];
    } catch (error) {
        console.error("Error finding related articles:", error);
        return [];
    }
};

export async function* generateCounterpoint(article: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `Analyze the following news article and provide a brief, thoughtful counterpoint or alternative perspective. Consider the other side of the argument, potential unintended consequences, or a different interpretation of the facts. Keep it concise and objective.\n\nTitle: ${article.title}\n\nExcerpt: ${article.excerpt}`;
        const response = await ai.models.generateContentStream({
            model: getModel(settings),
            contents: prompt,
            config: {
                 systemInstruction: "You are a balanced and objective analyst who provides nuanced alternative perspectives.",
            }
        });
         for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error generating counterpoint:", error);
        throw new Error("Failed to generate counterpoint. Please try again.");
    }
};

export const generateKeyTakeaways = async (article: Article, settings: Settings): Promise<string[]> => {
    try {
        const prompt = `Generate 3-4 key takeaways from the following news article. Each takeaway should be a single, concise sentence. Return the result as a JSON object with a single key "takeaways" which is an array of strings.\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: {
                ...getInteractiveConfig(settings),
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        takeaways: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return result.takeaways || [];
    } catch (error) {
        console.error("Error generating key takeaways:", error);
        return [];
    }
};

export const generateArticleTimeline = async (article: Article, settings: Settings): Promise<TimelineEvent[]> => {
    try {
        const prompt = `Analyze the following article and extract key events with their corresponding dates or timeframes. Format the output as a JSON object with a single key "events", which is an array of objects. Each object should have a "year" (as a string, e.g., "2023" or "Bronze Age") and a "description". Only include major events.\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: {
                ...getInteractiveConfig(settings),
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        events: {
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
                }
            }
        });
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return result.events || [];
    } catch (error) {
        console.error("Error generating article timeline:", error);
        return [];
    }
};

export async function* generateBehindTheNews(article: Article, settings: Settings): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `For the following news article, provide a "Behind the News" briefing. The response should be in markdown format. Include the following sections with H2 headers (##):
- ## Historical Context: Briefly explain the background and events leading up to this news.
- ## Key Players: Identify and briefly describe the main individuals, organizations, or countries involved.
- ## Broader Implications: Discuss the potential future impact or significance of this development.

Article Title: ${article.title}
Article Content: ${article.content}`;
        const response = await ai.models.generateContentStream({
            model: getModel(settings), // This is a more complex task, so it respects the user's Quality/Speed choice
            contents: prompt,
            config: {
                systemInstruction: "You are an expert news analyst providing deep, concise context for complex topics.",
            }
        });
        for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error generating 'Behind the News':", error);
        throw new Error("Failed to generate contextual analysis. Please try again.");
    }
};

export async function* generateExpertAnalysis(article: Article, persona: ExpertPersona, settings: Settings): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `You are an expert ${persona}. Analyze the following news article from your specific field of expertise. Provide a concise but insightful analysis in markdown format, focusing on aspects relevant to your role.\n\nArticle Title: ${article.title}\nContent: ${article.content}\n\nYour analysis as an ${persona}:`;
        const response = await ai.models.generateContentStream({
            model: getModel(settings), // Also a complex task, respects user's choice
            contents: prompt,
            config: {
                 systemInstruction: `You are a world-renowned ${persona}. Your analysis is sharp, insightful, and accessible to an intelligent layperson.`,
            }
        });
        for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error generating expert analysis:", error);
        throw new Error("Failed to generate expert analysis. Please try again.");
    }
};

export const generatePersonalizedFeed = async (bookmarkedArticles: Article[], settings: Settings, allArticles: Article[]): Promise<number[]> => {
    try {
        const bookmarkedTitles = bookmarkedArticles.map(a => a.title).join(', ');
        const interestSummary = `The user has bookmarked articles like: "${bookmarkedTitles}". Their preferred categories are: ${settings.contentPreferences.join(', ')}.`;
        
        const articleList = allArticles.map(a => `ID: ${a.id}, Title: ${a.title}, Category: ${a.category}`).join('\n');
        
        const prompt = `Based on the user's interests summarized below, recommend 5 articles from the provided article list that they are most likely to enjoy. The user has already seen their bookmarked articles.
        
User Interests: ${interestSummary}

Article List:
${articleList}

Return only a JSON array of the recommended article IDs, like [1, 5, 8, 12, 15].`;

        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: {
                ...getInteractiveConfig(settings),
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.NUMBER,
                    },
                },
            },
        });
        
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return Array.isArray(result) ? result : [];
    } catch (error) {
        console.error("Error generating personalized feed:", error);
        return [];
    }
};

export async function* askAboutArticle(article: Article, question: string, history: ChatMessage[], settings: Settings): AsyncGenerator<string, void, unknown> {
    try {
        const formattedHistory = history.map(m => `${m.role}: ${m.content}`).join('\n');
        const prompt = `Based on the following article, answer the user's question. Keep your answer concise and directly related to the article's content.\n\n---\n\nARTICLE CONTENT:\n${article.content}\n\n---\n\nCONVERSATION HISTORY:\n${formattedHistory}\n\nUSER QUESTION:\n${question}`;

        const response = await ai.models.generateContentStream({
            model: getModel(settings),
            contents: prompt,
            config: {
                ...getInteractiveConfig(settings),
                systemInstruction: "You are a helpful 'Article Companion' AI. Your task is to answer questions based *only* on the provided article content. If the answer is not in the article, say 'That information is not available in this article.' Do not use external knowledge.",
            }
        });

        for await (const chunk of response) {
            yield chunk.text;
        }

    } catch (error) {
        console.error("Error asking about article:", error);
        throw new Error("Failed to get an answer. Please try again.");
    }
}

export const extractKeyConcepts = async (article: Article, settings: Settings): Promise<KeyConcept[]> => {
    try {
        const prompt = `Analyze the following article and extract the key people, organizations, locations, and concepts. For each, provide a very brief, one-sentence description based on its role in the article.

Article: ${article.content}`;

        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: {
                ...getInteractiveConfig(settings),
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        concepts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    term: { type: Type.STRING },
                                    type: { type: Type.STRING, enum: ['Person', 'Organization', 'Location', 'Concept'] },
                                    description: { type: Type.STRING },
                                },
                                required: ["term", "type", "description"]
                            }
                        }
                    }
                }
            }
        });

        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return result.concepts || [];
    } catch (error) {
        console.error("Error extracting key concepts:", error);
        return [];
    }
};

export const applyReadingLens = async (articleContent: string, lens: ReadingLens, settings: Settings): Promise<string> => {
    let prompt = '';
    switch (lens) {
        case 'Simplify':
            prompt = `Rewrite the following article content using simpler language, shorter sentences, and clearer explanations. The goal is to make it accessible to a reader with a 9th-grade reading level without losing the core information.\n\nORIGINAL CONTENT:\n${articleContent}\n\nSIMPLIFIED CONTENT:`;
            break;
        case 'DefineTerms':
            prompt = `Rewrite the following article content. When you encounter a potentially complex or technical term, define it concisely in parentheses immediately after the term. For example, "The process uses CRISPR (a gene-editing technology)..."\n\nORIGINAL CONTENT:\n${articleContent}\n\nCONTENT WITH DEFINITIONS:`;
            break;
        default:
            return articleContent;
    }

    try {
        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
            config: getInteractiveConfig(settings)
        });
        return response.text;
    } catch (error) {
        console.error("Error applying reading lens:", error);
        throw new Error("Failed to modify article content.");
    }
};

export async function* generateAuthorResponse(article: Article, question: string, settings: Settings): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `You are ${article.author}, the author of the article titled "${article.title}". Based on the content and tone of your article provided below, answer the following user's question in your voice as the author.

ARTICLE CONTENT:
${article.content}

USER QUESTION:
${question}`;

        const response = await ai.models.generateContentStream({
            model: getModel(settings), // This is a premium feature, so it respects Quality/Speed setting
            contents: prompt,
            config: {
                 systemInstruction: `You are role-playing as a journalist. Adopt their persona based on their writing.`,
            }
        });
        for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error generating author response:", error);
        throw new Error("Failed to generate the author's response. Please try again.");
    }
};

export const generateNewsBriefing = async (articles: Article[], settings: Settings): Promise<string> => {
    try {
        const articleSummaries = articles.map(a => `Title: ${a.title}\nExcerpt: ${a.excerpt}`).join('\n\n');

        const prompt = `You are a news anchor for Mahama News Hub. Your task is to create a concise and engaging audio news briefing script based on the following top stories. Start with a friendly welcome, then briefly introduce each story, and end with a warm sign-off. The entire script should be natural-sounding and easy to read aloud.

Here are today's top articles:
${articleSummaries}

Generate the full script now.`;

        const response = await ai.models.generateContent({
            model: getModel(settings),
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating news briefing script:", error);
        throw new Error("Could not generate the news briefing. Please try again.");
    }
};