import { getDB } from "../config/db.js";

export async function saveDocument({ filename, text, pages, embedding }) {
  const db = getDB();
  const collection = db.collection("documents");

  const result = await collection.insertOne({
    filename,
    text,
    pages,
    embedding,
    createdAt: new Date(),
  });

  return result.insertedId;
}
export async function getLatestDocument() {
  const db = getDB();
  const collection = db.collection("documents");

  const doc = await collection.findOne({}, { sort: { createdAt: -1 } });

  return doc;
}

