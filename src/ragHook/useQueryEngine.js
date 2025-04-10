// 生成回答引擎js文件
import { Settings, VectorStoreIndex } from "llamaindex";
import { getStorageContext } from "../utils/storage.util.js"; // 导入存储上下文
import { initializeLLM } from "../services/llm.service.js"; // 初始化LLM模型
import { initializeEmbedding } from "../services/embedding.service.js"; // 初始化嵌入模型

// 初始化全局设置 - llamaindex底层会自动使用Settings.llm和Settings.embedModel的配置，不用手动注入
Settings.llm = initializeLLM();
Settings.embedModel = initializeEmbedding();

/**
 * 从本地向量库中查询并生成回答
 * 注意：这里的queryEngine是一个异步函数，需要等待返回结果后才能继续执行后续代码
 * 可以使用async/await或者.then()来处理返回的Promise对象
 * @param {*} question 
 * @returns 
 */
export async function queryVectors(question) {
    // 基于已经完成持久化的目录，创建向量存储索引-【storageContextFromDefaults方法】
    const storageContext = await getStorageContext();
    // 基于向量存储索引，初始化创建查询引擎
    const index = await VectorStoreIndex.init({ storageContext });
    // 创建查询引擎
    const queryEngine = index.asQueryEngine();

    console.log("🧠 回答生成中...");
    // 发起查询，可以使用流式处理【stram: true】，但是需要额外处理流式数据
    const response = await queryEngine.query({ query: question });
    console.log("🧠 回答：", response.toString());
    return response;
}
