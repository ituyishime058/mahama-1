import { GoogleGenAI, Type } from "@google/genai";
import type { Article } from '../types';

let ai: GoogleGenAI;

const getAI = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            // In a real app, you'd handle this more gracefully.
            // For this project, we assume API_KEY is set.
            console.error("API_KEY environment variable not set");
            throw new Error("API_KEY environment variable not set");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

export const summarizeArticle = async (article: Article, length: 'short' | 'medium' | 'detailed' = 'medium'): Promise<string> => {
    const ai = getAI();
    const model = 'gemini-2.5-flash';

    let prompt = `Summarize the following news article. The article title is "${article.title}". The content is: "${article.content}".`;
    if (length === 'short') {
        prompt += "\n\nProvide a very short, one-sentence summary (a TL;DR).";
    } else if (length === 'medium') {
        prompt += "\n\nProvide a concise summary highlighting the key points in a single paragraph.";
    } else {
        prompt += "\n\nProvide a detailed, multi-paragraph summary covering the main arguments and conclusions.";
    }

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error summarizing article:", error);
        return "Sorry, I couldn't generate a summary at this time.";
    }
};

export const explainSimply = async (article: Article): Promise<string> => {
    const ai = getAI();
    const model = 'gemini-2.5-flash';
    const prompt = `Explain the following news article as if you were talking to a 10-year-old. Use simple words and analogies. The article title is "${article.title}". The content is: "${article.content}".`;
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error explaining article simply:", error);
        return "Sorry, I couldn't generate a simplified explanation at this time.";
    }
};


export const generateTextToSpeech = async (text: string, voice: string): Promise<string | null> => {
    const ai = getAI();
    const model = 'gemini-2.5-flash-preview-tts';
    
    try {
        const response = await ai.models.generateContent({
            model,
            contents: [{ parts: [{ text: text }] }],
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
        return base64Audio || null;
    } catch (error) {
        console.error("Error generating text-to-speech:", error);
        return null;
    }
};

export const generateAITags = async (article: Article): Promise<string[]> => {
    const ai = getAI();
    const model = 'gemini-2.5-flash';
    
    const prompt = `Based on the following article, generate 4-5 relevant tags or keywords. The title is "${article.title}" and the content is "${article.content}". Return the tags as a JSON array of strings, like ["tag1", "tag2"].`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tags: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["tags"],
                }
            }
        });

        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return result.tags || [];
    } catch (error) {
        console.error("Error generating AI tags:", error);
        return [];
    }
};

export const factCheckArticle = async (article: Article): Promise<{ status: string; summary: string } | null> => {
    const ai = getAI();
    const model = 'gemini-2.5-pro'; // Use a more powerful model for reasoning

    const prompt = `Fact-check the key claims in the following news article. Analyze the content for accuracy and potential bias. 
    Article Title: "${article.title}"
    Article Content: "${article.content}"
    
    Return your analysis as a JSON object with two keys:
    1. "status": A single word string. Choose one of: "Verified", "Mixed", "Unverified".
       - "Verified": The main claims are well-supported by evidence.
       - "Mixed": Some claims are accurate, but others are disputed or lack context.
       - "Unverified": The claims could not be verified or are likely false.
    2. "summary": A brief, neutral summary of your findings (2-3 sentences).
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        status: { type: Type.STRING },
                        summary: { type: Type.STRING }
                    },
                    required: ["status", "summary"]
                }
            }
        });
        
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);

        // Basic validation
        const validStatuses = ["Verified", "Mixed", "Unverified"];
        if (result && typeof result.status === 'string' && typeof result.summary === 'string' && validStatuses.includes(result.status)) {
            return result;
        }
        return null;
    } catch (error) {
        console.error("Error fact-checking article:", error);
        return null;
    }
};
