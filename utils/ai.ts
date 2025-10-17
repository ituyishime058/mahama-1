import { GoogleGenAI, Type } from "@google/genai";
import type { Article, QuizQuestion, AiSummaryLength, AiTtsVoice } from '../types';

// FIX: Initialize the GoogleGenAI client. Ensure API_KEY is set in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const summarizeArticle = async (article: Article, length: AiSummaryLength = 'Medium'): Promise<string> => {
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
                 prompt = `Summarize the following news article in 3-4 concise bullet points:\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
                break;
        }

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error summarizing article:", error);
        throw new Error("Failed to generate summary. Please try again.");
    }
};

export const explainSimply = async (article: Article): Promise<string> => {
    try {
        const prompt = `Explain the key points of this article as if you were talking to a 10-year-old. Use simple language and analogies.\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "You are a friendly and simple explainer for kids.",
            }
        });
        return response.text;
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
                responseModalities: ['AUDIO'],
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
        return []; // Return empty array on failure
    }
};

export const factCheckArticle = async (article: Article): Promise<{ status: string; summary: string } | null> => {
    try {
        const prompt = `Analyze the claims made in the following article and provide a fact-check summary. Categorize the overall accuracy as 'Verified', 'Mixed', or 'Unverified'.\n\nTitle: ${article.title}\n\nContent: ${article.content}`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro', // Using a more powerful model for reasoning
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        status: {
                            type: Type.STRING,
                            description: "The overall fact-check status: 'Verified', 'Mixed', or 'Unverified'."
                        },
                        summary: {
                            type: Type.STRING,
                            description: "A brief summary of the fact-check findings."
                        }
                    }
                }
            }
        });
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);
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