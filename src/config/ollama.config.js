// ollama的配置信息
export const OLLAMA_CONFIG = {
    BASE_URL: "http://localhost:11434", // 本地Ollama服务地址
    // 本地Ollama服务 -【LLM模型】
    LLM: {
        model: "deepseek-r1:7b",
        temperature: 0.5, // 可选参数控制生成随机性
        requestTimeout: 30000 // 超时设置（毫秒）
    },
    // 本地Ollama服务 -【嵌入模型】
    EMBEDDING: {
        model: "nomic-embed-text",
        embeddingDimensions: 768 // 必须与模型实际维度匹配
    }
};

// 本地向量存储的配置信息
export const STORAGE_CONFIG = {
    PERSIST_DIR: "storage/ragTest"
};

// RAG知识库的配置信息
export const RAG_KNOWLEDGE_CONFIG = {
    KNOWLEDGE_PATH: "ragKnowledge"
}