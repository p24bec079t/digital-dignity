// src/lib/gemini.ts
import { GoogleGenAI } from "@google/genai";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
});

export async function getGeminiResponse(
    messages: ChatMessage[],
    userMessage: string
): Promise<string> {
    if (!GEMINI_API_KEY) {
        console.error("Gemini API key missing");
        return "AI service is not configured properly.";
    }

    // Build conversation context (last 10 messages)
    const conversation = messages
        .slice(-4)
        .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
        .join("\n");

    const systemPrompt = `
You are a calm, empathetic digital safety support assistant.

Guidelines:
- Be supportive, non-judgmental, and reassuring
- Never blame the user
- Give step-by-step safety guidance
- Use **bold** for critical actions
- Keep tone calm and human
- No emojis
- No legal threats or panic language
- Do not store or request personal data
- If danger is implied, suggest trusted help without urgency language

Conversation so far:
${conversation}

USER: ${userMessage}

Respond with clear, short, actionable guidance.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: systemPrompt,
        });

        return response.text || "I’m here with you. Can you tell me a bit more?";
    } catch (error) {
        console.error("Gemini error:", error);
        return "Something went wrong. Please try again in a moment.";
    }
}
