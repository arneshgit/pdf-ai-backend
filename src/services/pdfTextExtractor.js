import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractTextFromPDF(buffer) {
  try {
    // 👇 FIX: convert Buffer → Uint8Array
    const uint8Array = new Uint8Array(buffer);

    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();

      const pageText = content.items
        .map(item => item.str)
        .join(" ");

      fullText += pageText + "\n";
    }

    return {
      text: fullText,
      pages: pdf.numPages,
    };
  } catch (error) {
    console.error("PDF parse error:", error);
    throw new Error("Failed to extract text from PDF");
  }
}
