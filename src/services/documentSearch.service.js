import { getDB } from "../config/db.js";

export async function searchDocuments(queryEmbedding, limit = 2) {
  const db = getDB();
  const collection = db.collection("documents");

  const results = await collection
    .aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 50,
          limit,
        },
      },
      {
        $project: {
          filename: 1,
          pages: 1,
          text: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ])
    .toArray();

  return results;
}