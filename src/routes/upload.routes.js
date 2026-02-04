import express from "express";
import { upload } from "../config/multer.js";
import { extractTextFromPDF } from "../services/pdfTextExtractor.js";
import { saveDocument } from "../services/document.service.js";
import { embedText } from "../services/embedding.service.js";

const router = express.Router();

router.post("/pdf", upload.single("pdf"), async (req, res) => {
  try {
    console.log("✅ Request received");

    if (!req.file) {
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    console.log("📄 File:", req.file.originalname, req.file.size);

    console.log("🧠 Extracting PDF text...");
    const { text, pages } = await extractTextFromPDF(req.file.buffer);

    console.log("🧬 Creating embedding for document...");
    const embedding = await embedText(text.substring(0, 8000));

    console.log("💾 Saving document to MongoDB...");
    const documentId = await saveDocument({
      filename: req.file.originalname,
      text,
      pages,
      embedding,
    });

    res.status(201).json({
      message: "PDF stored and embedded successfully",
      documentId,
      pages,
      embeddingLength: embedding.length,
      textPreview: text.substring(0, 400),
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
