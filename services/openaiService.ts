// services/openaiService.ts
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateDescription = async (name: string, location: string) => {
  try {
    const prompt = `Generate a compelling description for a travel accommodation named "${name}" located in "${location} with 3 paragraphs, response with html format and line breaks".`;
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    });

    const content = response.choices?.[0]?.message?.content?.trim();
    return content || "No description available.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "No description available.";
  }
};
