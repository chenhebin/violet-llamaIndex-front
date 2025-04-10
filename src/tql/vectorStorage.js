import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from 'node:url';
import { VectorStoreIndex, storageContextFromDefaults, Settings } from "llamaindex";
import { OllamaEmbedding } from "@llamaindex/ollama";
import { SimpleDirectoryReader } from '@llamaindex/readers/directory'

// 配置本地Ollama服务地址
const ollamaBaseURL = "http://localhost:11434";

// 配置本地Ollama服务 -【嵌入模型】
Settings.embedModel = new OllamaEmbedding({
    model: "nomic-embed-text",
    baseURL: ollamaBaseURL,
    embeddingDimensions: 768,
    temperature: 0.5,
    requestTimeout: 30000
});
// 从目录中加载文档并设置元数据
export async function getDocuments(path) {
    const documents = await new SimpleDirectoryReader().loadData({
      directoryPath: path,
    });
    // Set private=false to mark the document as public (required for filtering)
    for (const document of documents) {
      document.metadata = {
        ...document.metadata,
        private: "false",
      };
    }
    return documents;
  }
  
export async function storeVectors() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const pathInMac = path.join(__dirname, "../ragKnowledge/");
    const persistDirInMac = path.join(__dirname, "../storage/index3");

    const storageContext = await storageContextFromDefaults({
        persistDir: persistDirInMac
    });

    const documents = await getDocuments(pathInMac);

    await VectorStoreIndex.fromDocuments(documents, {
        serviceContext: {
            embedModel: Settings.embedModel
        },
        storageContext
    });

    console.log('-----索引创建完成-----');
}
storeVectors().then(r => console.log('本地向量储存完成！'))