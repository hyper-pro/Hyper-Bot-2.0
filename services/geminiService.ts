
import { GoogleGenAI, Type, Chat } from "@google/genai";

const getAI = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const createChat = (): Chat => {
    const ai = getAI();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are Hyper Bot 2.0, a helpful and creative AI assistant.',
        },
    });
};

export const generateImage = async (prompt: string): Promise<string> => {
    const ai = getAI();
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    }
    throw new Error("Image generation failed or returned no images.");
};


export const summarizeText = async (text: string): Promise<string> => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Please summarize the following text:\n\n---\n${text}\n---`,
        config: {
            systemInstruction: "You are an expert summarizer. Your goal is to provide a concise and accurate summary of the given text, capturing the main points and key information.",
            temperature: 0.2,
        },
    });
    return response.text;
};

export const generateRecipes = async (prompt: string) => {
    const ai = getAI();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate 3 recipes based on the following theme or ingredients: "${prompt}". Ensure the output is a valid JSON array.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        recipeName: {
                            type: Type.STRING,
                            description: 'The name of the recipe.',
                        },
                        ingredients: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            },
                            description: 'A list of ingredients for the recipe, including quantities.',
                        },
                        instructions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            },
                            description: 'Step-by-step cooking instructions.'
                        }
                    },
                    required: ["recipeName", "ingredients", "instructions"],
                },
            },
        },
    });

    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse JSON response:", e);
        throw new Error("The API returned an invalid JSON format.");
    }
};