import express from "express";
import { embedText } from "../services/embedding.service.js";
import { searchDocuments } from "../services/documentSearch.service.js";
import { askAI } from "../services/ai.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "question is required" });
    }

    console.log("❓ Question:", question);

    // 1) embed question
    const queryEmbedding = await embedText(question);

    // 2) search documents
    const docs = await searchDocuments(queryEmbedding, 1);

    if (!docs.length) {
      return res.json({
        question,
        answer: "No matching documents found.",
        sources: [],
      });
    }

    // 3) build context
    const contextText = docs
  .map(
    (d, i) =>
      `DOC ${i + 1} (${d.filename}):\n${d.text.substring(0, 12000)}`
  )
  .join("\n\n---\n\n");

    // 4) ask Gemini
    const answer = await askAI({
      question,
      contextText,
    });

    res.json({
      question,
      answer,
      sources: docs.map((d) => ({
        filename: d.filename,
        pages: d.pages,
        score: d.score,
      })),
    });
  } catch (error) {
    console.error("❌ Ask error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
