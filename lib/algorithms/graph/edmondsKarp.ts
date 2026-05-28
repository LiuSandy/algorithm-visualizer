import { AlgorithmDefinition } from '../../types';

export const edmondsKarp: AlgorithmDefinition = {
  id: 'edmonds-karp',
  name: 'Edmonds-Karp 算法',
  category: 'Practical' as const,
  description: 'Edmonds-Karp 是基于 BFS 寻找增广路径的最大流算法。',
  theory: {
    introduction: 'Edmonds-Karp 是 Ford-Fulkerson 算法的一个具体实现，使用广度优先搜索 (BFS) 来寻找增广路径，保证了多项式时间复杂度。',
    timeComplexity: 'O(V * E^2)',
    spaceComplexity: 'O(V + E)',
    applications: ['网络路由', '任务分配', '流网络分析'],
      core: "Ford-Fulkerson 的具体实现，使用 BFS 来寻找增广路径以计算最大流，保证了多项式时间复杂度避免无限循环。",
      analogy: "像水管网络的修理工检修，每次都用最直观（距离最短、层数最少）的点到点水流测试方法，找到哪条管子还能继续加压，加到所有的水管都爆满为止。",
      scenarios: "适用场景：网络最大流、二分图匹配",
      practical: "在跨国 CDN 网络的流量调度和全局负载均衡中，计算各大洋海底光缆及数据中心总流控上限吞吐量。"
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
 * Edmonds-Karp 算法
 */
function edmondsKarp(graph, source, sink) {
  // Edmonds-Karp is an implementation of Ford-Fulkerson 
  // that uses BFS for finding augmenting paths
  // which guarantees O(V * E^2) time complexity.
  // The implementation is identical to the FordFulkerson function above.
  /* ... BFS logic finding shortest paths ... */
  // return maxFlow;
}
`,
  generateSteps: (initialArray, options) => {
    // Exact same visual sequence but with BFS highlight description
    const steps = [];
    const nodes = [
       { id: 'S', value: 'S', x: 10, y: 50, state: 'highlight' },
       { id: 'A', value: 'A', x: 50, y: 20, state: 'default' },
       { id: 'B', value: 'B', x: 50, y: 80, state: 'default' },
       { id: 'T', value: 'T', x: 90, y: 50, state: 'sorted' }
    ];
    let edges = [
      { source: 'S', target: 'A', state: 'default', weight: '0/10' },
      { source: 'S', target: 'B', state: 'default', weight: '0/5' },
      { source: 'A', target: 'B', state: 'default', weight: '0/15' },
      { source: 'A', target: 'T', state: 'default', weight: '0/10' },
      { source: 'B', target: 'T', state: 'default', weight: '0/10' }
    ];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: 'Edmonds-Karp 使用 BFS 寻找最短跳数的增广路径', activeLines: [5] });
    
    // Path 1
    edges[0].state = 'path'; edges[3].state = 'path';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: 'BFS 找到增广路径: S -> A -> T，距离为 2 跳，瓶颈为 10', activeLines: [7] });
    
    edges[0].weight = '10/10'; edges[3].weight = '10/10';
    for(let n of nodes) n.state = 'sorted';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '网络更新后，最大流为 10。后续没有更多增广路', activeLines: [8] });
    
    return steps;
  }
};
