// 储存本地知识库js文件
import { Settings, VectorStoreIndex } from 'llamaindex'

import { getDocuments, getStorageContext, } from '../utils/storage.util.js'
import { initializeEmbedding } from '../services/embedding.service.js'


// 先初始化全局设置
Settings.embedModel = initializeEmbedding()

/**
 * 从本地目录中加载文档并创建向量索引储存在特定的位置
 * 注意：这里的queryEngine是一个异步函数，需要等待返回结果后才能继续执行后续代码
 * 可以使用async/await或者.then()来处理返回的Promise对象
 */
export async function storeVectors() {
    // 创建向量存储索引
    const storageContext = await getStorageContext()
    // 从目录中加载文档并设置元数据
    const documents = await getDocuments()

    // 从文档中创建向量索引
    await VectorStoreIndex.fromDocuments(documents, {
        serviceContext: {
            embedModel: Settings.embedModel // 使用全局设置的嵌入模型（本地ollama模型）
        },
        storageContext
    })
    console.log('-----索引创建完成-----');
}