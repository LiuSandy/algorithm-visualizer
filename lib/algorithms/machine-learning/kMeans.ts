import { AlgorithmDefinition } from '../../types';

export const kMeans: AlgorithmDefinition = {
  id: 'k-means',
  name: 'K-Means 聚类',
  category: 'Practical' as const,
  description: 'K-Means 是一种聚类算法，用于将数据点分组为K个簇。',
  theory: {
    introduction: 'K-Means (K均值) 聚类算法是一种无监督学习方法，通过迭代过程将数据集划分为 K 个不重叠的子集（簇）。',
    timeComplexity: 'O(I * K * N * d) 其中 I 为迭代次数，N为样本数，d为维度',
    spaceComplexity: 'O(N * d + K * d)',
    applications: ['客户细分', '图像压缩', '异常检测'],
      core: "无监督聚类。随机初始化K个质心，然后反复迭代：将每个样本分配给最近的质心，随后重新计算簇内均值以更新质心，直到质心位置收敛。",
      analogy: "就像在公司食堂分发多份同样好吃的免费外卖大餐，人群一开始乱套，然后大家自发按距离最近的分发点聚集，聚集后分发点再挪到这群人的正中心，一顿操作后就形成了稳定的几个小团体。",
      scenarios: "适用场景：用户分层画像、图片像素压缩",
      practical: "大数据智能平台（如 Spark MLlib）被广泛用于分布式处理以分析海量电商日志，进行消费者的 RFM 行为自动化聚类划分和智能推荐群组打包。"
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
 * K-Means 聚类
 */
function kMeans(data, k, maxIterations = 100) {
  // Initialize centroids randomly
  let centroids = data.slice(0, k);
  let clusters = new Array(k).fill(0).map(() => []);

  for (let iter = 0; iter < maxIterations; iter++) {
    clusters = new Array(k).fill(0).map(() => []);
    
    // Assign points to nearest centroid
    for (let point of data) {
      let minDist = Infinity;
      let clusterIdx = 0;
      for (let i = 0; i < k; i++) {
        const dist = Math.sqrt(Math.pow(point.x - centroids[i].x, 2) + Math.pow(point.y - centroids[i].y, 2));
        if (dist < minDist) {
          minDist = dist;
          clusterIdx = i;
        }
      }
      clusters[clusterIdx].push(point);
    }
    
    // Update centroids
    let changed = false;
    for (let i = 0; i < k; i++) {
      if (clusters[i].length === 0) continue;
      
      const newX = clusters[i].reduce((sum, p) => sum + p.x, 0) / clusters[i].length;
      const newY = clusters[i].reduce((sum, p) => sum + p.y, 0) / clusters[i].length;
      
      if (centroids[i].x !== newX || centroids[i].y !== newY) {
        centroids[i] = { x: newX, y: newY };
        changed = true;
      }
    }
    
    if (!changed) break;
  }
  return clusters;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    // Mock 2D graph data for ML
    const nodes = [
       { id: 'p1', value: 'A', x: 20, y: 30, state: 'default' },
       { id: 'p2', value: 'B', x: 25, y: 35, state: 'default' },
       { id: 'p3', value: 'C', x: 80, y: 70, state: 'default' },
       { id: 'p4', value: 'D', x: 85, y: 75, state: 'default' },
       { id: 'c1', value: 'K1', x: 20, y: 80, state: 'pivot' },
       { id: 'c2', value: 'K2', x: 80, y: 20, state: 'highlight' }
    ];
    let edges = [];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges, isDirected: false }, description: '随机初始化 K 个质心 (K1, K2)', activeLines: [2] });
    
    // Assign
    nodes[0].state = 'comparing'; nodes[1].state = 'comparing';
    edges.push({ source: 'p1', target: 'c1', state: 'default' }, { source: 'p2', target: 'c1', state: 'default' });
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '计算各点到质心的距离，将A、B归属于K1', activeLines: [10] });

    nodes[2].state = 'visited'; nodes[3].state = 'visited';
    edges.push({ source: 'p3', target: 'c2', state: 'default' }, { source: 'p4', target: 'c2', state: 'default' });
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '将C、D归属于K2', activeLines: [11] });
    
    // Update
    nodes[4].x = 22.5; nodes[4].y = 32.5;
    nodes[5].x = 82.5; nodes[5].y = 72.5;
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '更新质心位置，使其移动到分配点簇的中心', activeLines: [22] });
    
    // Finish
    nodes.forEach(n => n.state = n.id.startsWith('c') ? 'sorted' : 'path');
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '质心位置不再变化，K-Means 聚类收敛', activeLines: [35] });
    
    return steps;
  }
};
