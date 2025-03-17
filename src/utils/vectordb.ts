import { GOOGLE_API_KEY, PINECONE_API_KEY } from "@/config/getEnv";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GOOGLE_API_KEY,
});

export const pinecone = new Pinecone({
  apiKey: PINECONE_API_KEY,
});

export const storeText = async (id: string, text: string) => {
  console.log("starting pinecone");

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50
  });

  const chunks = await splitter.createDocuments([text]);

  const documents = await Promise.all(chunks.map(async(chunk, index) => ({
    id: `${id}-${index}`,
    values: await embeddings.embedQuery(chunk.pageContent),
    metadata: { text: chunk.pageContent, originalId: id}
  })))

  const pineconeIndex = pinecone.Index("brainly");

  await pineconeIndex.upsert(documents);
  console.log(`Stored ${chunks.length} chunks in Pinecone.`);
};

export const retrieveSimilarTexts = async (query: string) => {
  const pineconeIndex = pinecone.index("brainly");
  const vectorstore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  const results = await vectorstore.similaritySearch(query, 5);
  console.log("context", results.map((doc) => doc.pageContent));
  return results.map((doc) => doc.pageContent);
};

const llm = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-pro",
  apiKey: GOOGLE_API_KEY,
});

export const generateResponse = async (query: string) => {
  const contextdocs = await retrieveSimilarTexts(query);
  const context = contextdocs.map((doc) => doc).join("\n");

  const response = await llm.call([
    new SystemMessage(
      "You are an AI assistant that only responds based on the provided retrieved context.If the context fully answers the user's question, provide a direct and concise response.If the context contains partial information related to the query, use it to give the best possible answer without adding external knowledge or making assumptions.If the context does not contain relevant information at all, say I don't know."
    ),
    new HumanMessage(`Context: ${context}\n\nQuestion: ${query}`),
  ]);

  return response;
};
