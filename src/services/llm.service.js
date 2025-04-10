import { Ollama } from "@llamaindex/ollama";
import { OLLAMA_CONFIG } from "../config/ollama.config.js";
// 初始化chat模型
export function initializeLLM() {
    return new Ollama({
        ...OLLAMA_CONFIG.LLM,
        baseURL: OLLAMA_CONFIG.BASE_URL
    });
}