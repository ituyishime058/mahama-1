import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { Article, QuizQuestion, AiSummaryLength, AiTtsVoice, TimelineEvent, ExpertPersona } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function* summarizeArticle(article: Article, length: AiSummaryLength = 'Medium'): AsyncGenerator<string, void, unknown> {
    try {
        let prompt: string;
        switch(length) {
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
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        for await (const chunk of response) {
            yield chunk.text;
        }
    } catch (error) {
        console.error("Error summarizing article:", error);
        throw new Error("Failed to generate summary. Please try again.");
    }
};

export async function* explainSimply(article: Article): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `Explain the key points of this article as if you were talking to a 10-year-old. Use simple language and analogies.\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
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

export const textToSpeech = async (article: Article, voice: AiTtsVoice = 'Kore'): Promise<string> => {
    try {
        const textToRead = `Article title: ${article.title}. By ${article.author}. ${article.excerpt}`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: textToRead }] }],
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
            throw new Error("No audio data received from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error generating text-to-speech:", error);
        throw new Error("Failed to generate audio. Please try again.");
    }
};

export const generateTags = async (article: Article): Promise<string[]> => {
    try {
        const prompt = `Generate 4-5 relevant tags for this news article. The tags should be short, single or two-word concepts.\n\nTitle: ${article.title}\n\nExcerpt: ${article.excerpt}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
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

export const factCheckArticle = async (article: Article): Promise<{ status: string; summary: string } | null> => {
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
            model: 'gemini-2.5-pro',
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

export const translateArticle = async (text: string, language: string): Promise<string> => {
    try {
        const prompt = `Translate the following text into ${language}:\n\n${text}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error(`Error translating to ${language}:`, error);
        throw new Error(`Failed to translate. Please try again.`);
    }
};

export const generateQuiz = async (article: Article): Promise<QuizQuestion[]> => {
    try {
        const prompt = `Create a 3-question multiple-choice quiz based on the following article. For each question, provide four options and indicate the correct answer.\n\nArticle: ${article.content}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
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

export const findRelatedArticles = async (currentArticle: Article, allArticles: Article[]): Promise<number[]> => {
    try {
        const articleList = allArticles
            .filter(a => a.id !== currentArticle.id)
            .map(a => `ID: ${a.id}, Title: ${a.title}`)
            .join('\n');
        
        const prompt = `Based on the following article:\nTitle: ${currentArticle.title}\nExcerpt: ${currentArticle.excerpt}\n\nFrom the list below, find the three most topically related articles. Return only a JSON array of their IDs, like [1, 5, 8].\n\nArticle List:\n${articleList}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
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

export async function* generateCounterpoint(article: Article): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `Analyze the following news article and provide a brief, thoughtful counterpoint or alternative perspective. Consider the other side of the argument, potential unintended consequences, or a different interpretation of the facts. Keep it concise and objective.\n\nTitle: ${article.title}\n\nExcerpt: ${article.excerpt}`;
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-pro',
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

export const generateKeyTakeaways = async (article: Article): Promise<string[]> => {
    try {
        const prompt = `Generate 3-4 key takeaways from the following news article. Each takeaway should be a single, concise sentence. Return the result as a JSON object with a single key "takeaways" which is an array of strings.\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
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

export const generateArticleTimeline = async (article: Article): Promise<TimelineEvent[]> => {
    try {
        const prompt = `Analyze the following article and extract key events with their corresponding dates or timeframes. Format the output as a JSON object with a single key "events", which is an array of objects. Each object should have a "year" (as a string, e.g., "2023" or "Bronze Age") and a "description". Only include major events.\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config: {
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

export async function* generateBehindTheNews(article: Article): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `For the following news article, provide a "Behind the News" briefing. The response should be in markdown format. Include the following sections with H2 headers (##):
- ## Historical Context: Briefly explain the background and events leading up to this news.
- ## Key Players: Identify and briefly describe the main individuals, organizations, or countries involved.
- ## Broader Implications: Discuss the potential future impact or significance of this development.

Article Title: ${article.title}
Article Content: ${article.content}`;
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-pro',
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

export async function* generateExpertAnalysis(article: Article, persona: ExpertPersona): AsyncGenerator<string, void, unknown> {
    try {
        const prompt = `You are an expert ${persona}. Analyze the following news article from your specific field of expertise. Provide a concise but insightful analysis in markdown format, focusing on aspects relevant to your role.\n\nArticle Title: ${article.title}\nContent: ${article.content}\n\nYour analysis as an ${persona}:`;
        const response = await ai.models.generateContentStream({
            model: 'gemini-2.5-pro',
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
