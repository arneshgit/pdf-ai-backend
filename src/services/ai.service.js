import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askAI({ question, contextText }) {
  const model = genAI.getGenerativeModel({
    model: "models/gemma-3-1b-it",
  });

  const prompt = `
You are a chat assistant.

You will be given:
- DOCUMENT text (with file names)
- A QUESTION

RULES:
1) Use ONLY the provided DOCUMENT text.
2) Understand the requirment from question
3) while answering from the document use the below format

FILE: <filename>
Answer: <copy only the matching line/part from document>

4) Do NOT paste the full document text.
5) Maximum 50 words.

DOCUMENT TEXT:
${contextText}

QUESTION:
${question}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
