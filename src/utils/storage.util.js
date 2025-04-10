import path from "node:path";
import { fileURLToPath } from 'node:url';
import { STORAGE_CONFIG, RAG_KNOWLEDGE_CONFIG } from "../config/ollama.config.js";

import { storageContextFromDefaults } from "llamaindex";
import { SimpleDirectoryReader } from '@llamaindex/readers/directory'

// 获取存储上下文 - 基于持久化目录
export async function getStorageContext() {
    const persistDir = getStoragePath(STORAGE_CONFIG.PERSIST_DIR);
    return storageContextFromDefaults({ persistDir });
}

// 获取文档 - 基于知识目录路径
export async function getDocuments () {
    const documents = await new SimpleDirectoryReader().loadData({
        directoryPath: getStoragePath(RAG_KNOWLEDGE_CONFIG.KNOWLEDGE_PATH),
    })
    for (const doc of documents) {
        doc.metadata = {
            ...doc.metadata,
            private: "false"
        }
    }
    return documents;
}

// 获取存储路径
export function getStoragePath(pathStr) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.join(__dirname, `../${pathStr}`);
}
