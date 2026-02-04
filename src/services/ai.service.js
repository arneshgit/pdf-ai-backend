import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function askAI({ question, contextText }) {
  const model = genAI.getGenerativeModel({
    model: "models/gemini-2.5-flash-lite",
  });

  const prompt = `
You are a helpful assistant.

RULES:
1) Answer ONLY using the provided DOCUMENT text.
2) Match keywords from the QUESTION with the DOCUMENT text.
3) If itmatches answer by including the file name shown at the start of that document section.
4) Do NOT guess or use outside knowledge.
5) If the answer is not present, reply exactly:
I cannot find that information in the uploaded documents.

DOCUMENT TEXT:
${contextText}

QUESTION:
${question}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
