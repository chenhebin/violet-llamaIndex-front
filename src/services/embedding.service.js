import { OllamaEmbedding } from "@llamaindex/ollama";
import { OLLAMA_CONFIG } from "../config/ollama.config.js";
// 初始化嵌入模型
export function initializeEmbedding() {
    return new OllamaEmbedding({
        ...OLLAMA_CONFIG.EMBEDDING,
        baseURL: OLLAMA_CONFIG.BASE_URL
    });
}