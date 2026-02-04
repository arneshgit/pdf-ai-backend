import { getDB } from "../config/db.js";

export async function saveChunks({ docId, filename, chunks, embeddings }) {
  const db = getDB();
  const collection = db.collection("chunks");

  const docs = chunks.map((chunkText, i) => ({
    docId,
    filename,
    chunkIndex: i,
    text: chunkText,
    embedding: embeddings[i],
    createdAt: new Date(),
  }));

  const result = await collection.insertMany(docs);
  return result.insertedCount;
}
