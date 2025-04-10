// queryEngine.js
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Settings, VectorStoreIndex, storageContextFromDefaults } from "llamaindex";
import { Ollama, OllamaEmbedding } from "@llamaindex/ollama";

// 本地 Ollama 服务地址
const ollamaBaseURL = "http://localhost:11434";

// 配置 LLM 模型
Settings.llm = new Ollama({
    model: "deepseek-r1:7b",
    baseURL: ollamaBaseURL,
    requestTimeout: 60000,
});

// ✅ 配置本地嵌入模型（这一步很关键！）
Settings.embedModel = new OllamaEmbedding({
    model: "nomic-embed-text",
    baseURL: ollamaBaseURL,
    embeddingDimensions: 768,
    temperature: 0.5,
    requestTimeout: 30000,
});

export async function queryVectors() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const persistDirInMac = path.join(__dirname, "../storage/index3");

    const storageContext = await storageContextFromDefaults({
        persistDir: persistDirInMac
    });

    const index = await VectorStoreIndex.init({
        storageContext
    });

    const queryEngine = index.asQueryEngine({
        similarityTopK: 3,
    });

    const response = await queryEngine.query({
        query: "violet几岁了？他爱吃什么？",
    });

    console.log("🧠 回答：", response.toString());
}
queryVectors().then(() => {
    console.log("✅ 回答完成！");
});