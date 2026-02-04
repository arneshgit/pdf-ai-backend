export function chunkText(text, chunkSize = 1200, overlap = 200) {
  const chunks = [];

  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);

    const chunk = text.substring(start, end).trim();
    if (chunk.length > 50) chunks.push(chunk);

    start += chunkSize - overlap;
  }

  return chunks;
}
