import { AlgorithmDefinition } from '../../types';

export const fordFulkerson: AlgorithmDefinition = {
  id: 'ford-fulkerson',
  name: 'Ford-Fulkerson 算法',
  category: 'Practical' as const,
  description: 'Ford-Fulkerson 用于计算流网络中的最大流。',
  theory: {
    introduction: 'Ford-Fulkerson 算法用于计算网络中的最大流。通过在残量网络中寻找增广路径，如果存在增广路径就增加流量，直到不存在为止。',
    timeComplexity: 'O(E * |f*|) 其中 f* 是最大流',
    spaceComplexity: 'O(V + E)',
    applications: ['交通网络规划', '二分图匹配', '物资分配'],
      core: "利用残量网络反复寻找从源点到汇点的增广路径并推送反向流，当再也找不到增广路径时，当前流即为最大流。",
      analogy: "就像城市春运调度，有一批批人要从北京到上海。只要还能找到哪怕要绕远路的空余座位链路，就把人塞进去，直到所有铁轨和飞机都满载。",
      scenarios: "适用场景：交通运力分配、物资调配",
      practical: "在流媒体（Video Streaming）CDN节点集群回源服务器的峰值并发容量承载力预估系统中检测带宽瓶颈点。"
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
 * Ford-Fulkerson 算法
 */
function fordFulkerson(graph, source, sink) {
  const V = graph.length;
  // Create residual graph
  const rGraph = new Array(V).fill(0).map(() => new Array(V).fill(0));
  for (let u = 0; u < V; u++) {
    for (let v = 0; v < V; v++) {
      rGraph[u][v] = graph[u][v];
    }
  }
  
  const parent = new Array(V);
  let maxFlow = 0;
  
  // BFS path finder
  function bfs() {
    const visited = new Array(V).fill(false);
    const queue = [source];
    visited[source] = true;
    parent[source] = -1;
    
    while (queue.length > 0) {
      const u = queue.shift();
      for (let v = 0; v < V; v++) {
        if (!visited[v] && rGraph[u][v] > 0) {
          if (v === sink) {
            parent[v] = u;
            return true;
          }
          queue.push(v);
          parent[v] = u;
          visited[v] = true;
        }
      }
    }
    return false;
  }
  
  while (bfs()) {
    let pathFlow = Infinity;
    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      pathFlow = Math.min(pathFlow, rGraph[u][v]);
    }
    
    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      rGraph[u][v] -= pathFlow;
      rGraph[v][u] += pathFlow;
    }
    
    maxFlow += pathFlow;
  }
  return maxFlow;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const nodes = [
       { id: 'S', value: 'S', x: 10, y: 50, state: 'highlight' },
       { id: 'A', value: 'A', x: 40, y: 20, state: 'default' },
       { id: 'B', value: 'B', x: 40, y: 80, state: 'default' },
       { id: 'T', value: 'T', x: 90, y: 50, state: 'sorted' }
    ];
    let edges = [
      { source: 'S', target: 'A', state: 'default', weight: '0/10' },
      { source: 'S', target: 'B', state: 'default', weight: '0/5' },
      { source: 'A', target: 'B', state: 'default', weight: '0/15' },
      { source: 'A', target: 'T', state: 'default', weight: '0/10' },
      { source: 'B', target: 'T', state: 'default', weight: '0/10' }
    ];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '初始化残量网络，寻找增广路径', activeLines: [16] });
    
    // Path 1
    edges[0].state = 'path'; edges[3].state = 'path';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '找到一条增广路径: S -> A -> T，瓶颈容量为 10', activeLines: [35] });
    
    edges[0].weight = '10/10'; edges[3].weight = '10/10';
    edges[0].state = 'default'; edges[3].state = 'default';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '沿路更新残量图，增加反向边。最大流 += 10', activeLines: [43] });
    
    // Path 2
    edges[1].state = 'path'; edges[4].state = 'path';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '找到增广路径: S -> B -> T，瓶颈容量为 5', activeLines: [35] });
    
    edges[1].weight = '5/5'; edges[4].weight = '5/10';
    edges[1].state = 'default'; edges[4].state = 'default';
    for(let n of nodes) n.state = 'sorted';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '更新完成！已无增广路。总最大流 = 10 + 5 = 15', activeLines: [48] });
    
    return steps;
  }
};
