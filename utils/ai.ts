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
