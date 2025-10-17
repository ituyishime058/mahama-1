import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY as string;

export async function generateTagsForArticle(title: string, content: string): Promise<string[]> {
    if (!API_KEY) {
        console.error("API_KEY is not set for AI features.");
        // Return placeholder tags if API key is not available
        return ["News", "Analysis", "World"];
    }

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        const prompt = `Based on the following news article title and content, generate a JSON array of 3 to 5 relevant tags or keywords. The tags should be short, concise, and in title case.

        Title: ${title}

        Content: ${content.substring(0, 1500)}...

        JSON Array of tags:`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tags: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        }
                    }
                },
                temperature: 0.2,
            },
        });
        
        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        
        if (result && Array.isArray(result.tags)) {
            return result.tags;
        }

        return [];

    } catch (error) {
        console.error("Error generating tags with Gemini API:", error);
        // Fallback in case of API error
        return ["Investigation", "Global", "Report"];
    }
}

export async function factCheckArticle(title: string, content: string): Promise<{ status: string; summary: string }> {
     if (!API_KEY) {
        console.error("API_KEY is not set for AI features.");
        return { status: "Unverified", summary: "API key not configured." };
    }

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });

        const prompt = `As a neutral fact-checker, analyze the following news article for verifiable claims. Assess the overall factual accuracy and provide a brief summary of your findings.
        
        Your response must be a JSON object with two keys:
        1. "status": A single word string. Choose one of: "Verified", "Mixed", "Unverified".
           - "Verified": The main claims are well-supported by evidence.
           - "Mixed": Some claims are factual, but others are unsupported, misleading, or lack context.
           - "Unverified": The main claims could not be verified or are likely false.
        2. "summary": A concise, one or two-sentence summary explaining your reasoning for the chosen status.

        Article Title: ${title}
        Article Content: ${content.substring(0, 2000)}...
        
        JSON Response:`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        status: { type: Type.STRING },
                        summary: { type: Type.STRING },
                    }
                },
                temperature: 0.1,
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);

        if (result && result.status && result.summary) {
            return result;
        }

        throw new Error("Invalid response format from API");

    } catch (error) {
        console.error("Error performing fact-check with Gemini API:", error);
        return { status: "Unverified", summary: "Could not perform fact-check at this time." };
    }
}