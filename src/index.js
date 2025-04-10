import { storeVectors } from './ragHook/useVectorIndex.js'
import { queryVectors } from './ragHook/useQueryEngine.js'

await storeVectors()
await queryVectors('violet几岁了？他爱吃什么？')