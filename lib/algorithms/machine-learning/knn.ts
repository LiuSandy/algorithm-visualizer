import { AlgorithmDefinition } from '../../types';

export const knn: AlgorithmDefinition = {
  id: 'knn',
  name: 'KNN (K-近邻算法)',
  category: 'Practical' as const,
  description: 'K最近邻 (KNN) 算法通过最近邻样本进行分类和回归。',
  theory: {
    introduction: 'K最近邻 (K-Nearest Neighbors, KNN) 是一种基本分类与回归方法。它的工作原理是找到距离查询点最近的 K 个样本，通过多数表决或求平均来进行预测。',
    timeComplexity: 'O(N * d) 预测时',
    spaceComplexity: 'O(N * d)',
    applications: ['推荐系统', '图像识别', '模式识别'],
      core: "利用距离度量找出特征空间中距离目标预测点最近的 K 个邻居，根据这 K 个邻居的共性（投票或平均）决定目标分类或回归值。",
      analogy: "“近朱者赤，近墨者黑”。遇到一个陌生人，你不了解他，就看看他身边最亲近的几个朋友是什么人，多数是警察那估计他也是公检法系统里的人。",
      scenarios: "适用场景：初级推荐系统、文本/图像简单识别",
      practical: "尽管由于其预测阶段复杂度高而不适合超大规模实时系统，但基于其核心思想演生出的近似最近邻 (ANN, 如 HNSW) 机制是目前大型向量数据库（如 Milvus, Pinecone）用于大模型 RAG (Retrieval-Augmented Generation) 检索的核心引擎。"
},
  coreSteps: ['初始化', '执行核心逻辑', '返回结果'],
  timeComplexity: {
    best: 'O(1)',
    average: 'O(N)',
    worst: 'O(N^2)'
  },
  spaceComplexity: 'O(N)',
  code: `
/**
 * KNN (K-近邻算法)
 */
function knn(data, targetPoint, k) {
  // Calculate distance from target to all points
  const distances = data.map(point => ({
    point,
    distance: Math.sqrt(
      Math.pow(point.x - targetPoint.x, 2) + 
      Math.pow(point.y - targetPoint.y, 2)
    )
  }));
  
  // Sort by distance
  distances.sort((a, b) => a.distance - b.distance);
  
  // Get top K nearest neighbors
  const nearest = distances.slice(0, k);
  
  // Predict class based on majority vote
  const classVotes = {};
  for (const item of nearest) {
    classVotes[item.point.label] = (classVotes[item.point.label] || 0) + 1;
  }
  
  let predictedClass = null;
  let maxVotes = 0;
  for (const label in classVotes) {
    if (classVotes[label] > maxVotes) {
      maxVotes = classVotes[label];
      predictedClass = label;
    }
  }
  
  return predictedClass;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const nodes = [
       { id: 'p1', value: 'G1', x: 20, y: 20, state: 'visited' },
       { id: 'p2', value: 'G1', x: 30, y: 20, state: 'visited' },
       { id: 'p3', value: 'G2', x: 80, y: 80, state: 'comparing' },
       { id: 'p4', value: 'G2', x: 70, y: 80, state: 'comparing' },
       { id: 'target', value: '?', x: 40, y: 40, state: 'highlight' }
    ];
    let edges = [];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges, isDirected: false }, description: '已知红色(G1) 和紫色(G2) 类别，我们要预测目标点 (?) 的类别 (K=3)', activeLines: [2] });
    
    edges = [
      { source: 'target', target: 'p1', state: 'path', weight: '28.2' },
      { source: 'target', target: 'p2', state: 'path', weight: '22.3' },
      { source: 'target', target: 'p3', state: 'default', weight: '56.5' },
      { source: 'target', target: 'p4', state: 'default', weight: '50.0' }
    ];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '计算目标点与所有已知样本的欧氏距离', activeLines: [5] });
    
    nodes[0].state = 'sorted'; nodes[1].state = 'sorted'; nodes[3].state = 'highlight';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '选出距离最近的 K=3 个邻居 (G1, G1, G2)', activeLines: [14] });
    
    nodes[4].value = 'G1'; nodes[4].state = 'sorted';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '按照多数表决 (Majority Voting)，目标点属于 G1', activeLines: [24] });
    
    return steps;
  }
};
