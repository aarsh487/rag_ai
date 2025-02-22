import { timeout } from "@/config/pinecone";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {  TaskType } from "@google/generative-ai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from 'langchain/document'

export const createPineconeIndex = async (
  client : any,
  indexName : any,
  vectorDimension: any
) => {
  console.log(`Checking ${indexName}`);
  const existingIndexes = await client.listIndexes();
  if (!existingIndexes.include(indexName)) {
    console.log(`creating ${indexName}`);
    await client.createIndex({
      createRequest: {
        name: indexName,
        dimension: vectorDimension,
        metric: "cosine",
      },
    });
    console.log(`Creating index.... please wait for it to finidh intializing`);
    await new Promise((resolve) => setTimeout(resolve, timeout));
  } else {
    console.log(`"${indexName}" already exists.`);
  }
};

export const updatePinecone = async (client: any, indexName: any, docs: any) => {
  console.log("retrieving pinecone index");
  const index = client.index(indexName);
  console.log(`pinecone index retrieved ${index}`);

  for (const doc of docs) {
    console.log(`processing document ${doc.metadata.source}`);
    const txtpath = doc.metadata.source;
    const text = doc.pageContent;
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    });
    console.log(`Splitting text into chunks...`);

    const chunks = await textSplitter.createDocuments([text]);
    console.log(`Text split into ${chunks.length} chunks`);

    const embeddingsArrays = await new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "brainly",
    }).embedDocuments(
      chunks.map((chunk) => chunk.pageContent.replace(/\n/g, " "))
    );

    console.log("Finished embedding documents");

    const batchSize = 100;
    let batch: any = [];
    for (let idx = 0; idx < chunks.length; idx++) {
      const chunk = chunks[idx];
      const vector = {
        id: `${txtpath}_${idx}`,
        values: embeddingsArrays[idx],
        metadata: {
          ...chunk.metadata,
          loc: JSON.stringify(chunk.metadata.loc),
          pageContent: chunk.pageContent,
          txtpath: txtpath,
        },
      };
      batch = [...batch, vector];
      if (batch.length === batchSize || idx === chunks.length - 1) {
        await index.upsert({
          upsertRequest: {
            vectors: batch,
          },
        });
        batch = [];
      }
    }
    console.log(`Pinecone index updated with ${chunks.length} vectors`);
  }
};

export const queryPineconeVectorStoreAndQueryLLM = async (
  client : any,
  indexName: any,
  question: any
) => {
    console.log('Querying Pinecone vector store...');
    const index = client.index(indexName);
    const queryEmbedding = await new GoogleGenerativeAIEmbeddings().embedQuery(question)

    let queryResponse = await index.query({
        queryRequest: {
            topK: 10,
            vector: queryEmbedding,
            includeMetadata: true,
            includeValues: true
        }
    })

    console.log(`Found ${queryResponse.matches.length} matches...`);

    if(queryResponse.matches.length){
        const llm = new ChatGoogleGenerativeAI({
            modelName: "gemini-pro",
            maxOutputTokens: 2048
        }); 
        const chain = loadQAStuffChain(llm);

        const concatenatedPageContent  = queryResponse.matches.map((match: any) => match.metadata.pageContent).join(" ");
        const result = await chain.call({
            input_documents: [new Document({ pageContent: concatenatedPageContent })],
            question: question
        })

        console.log(`Answer: ${result.text}`);
        return result.text
    }else {
        console.log('Since there are no matches, LLM will not be queried.');
      }
};
