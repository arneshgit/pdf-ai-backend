import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askAI({ question, contextText }) {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash",
  });

  const prompt = `
You are a helpful assistant.

RULES:
- Answer ONLY using the provided document text.
- If the answer is not present, say: "I cannot find that information in the uploaded documents."

DOCUMENT TEXT:
${contextText}

QUESTION:
${question}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
