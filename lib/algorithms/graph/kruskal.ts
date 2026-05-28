import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, ElementState } from '../types';
import { generateCircleGraph } from './utils';

export const kruskal: AlgorithmDefinition = {
  id: 'kruskal',
  name: 'Kruskal 最小生成树',
  category: 'Graph',
  description: 'Kruskal 算法是一种用于寻找加权无向图的最小生成树的算法。它的核心思想是：将所有边按权重从小到大排序，然后依次考察每条边，如果这条边连接的两个节点不在同一个连通分量（避免形成环），就将其加入最小生成树。',
  theory: {
    complexity: `通常都受制于 V(顶点数量) 和 E(边数量)，大多流转在 O(V+E) 到 O(V^2) 以上的网状膨胀率之间。`,
    prosCons: `✅ 优点：完美映射大千世界真实的相互关系，降维万物。
❌ 缺点：极高的数据表示成本和空间吞噬，一旦代码编写松散，循环引用图将导致瞬间内存耗尽死机。`,
    interview: `核心常常死抓在「如何防止原路回去的无线死循环」——visited记录集的灵活运用！`,
      core: "通过对边权排序并结合并查集（Union-Find），从小到大贪心选取边构建最小生成树，并避免成环。",
      analogy: "你要给几个村子拉网线，你的原则很简单：永远先挑最便宜的线买，不过如果买这根线导致它跟以前拉好的路线成为了重复兜圈子，就直接扔掉换下一根。",
      scenarios: "适用场景：稀疏图最小生成树、网络基础建设",
      practical: "分布式集群内部微服务的高可用拓扑构建与物理断网冗余验证，确保以最低网络延迟代价使得所有服务保持连通。"
},
  coreSteps: [
    '把图中的所有边按权重从小到大进行排序。',
    '将原图的每个节点初始化为单独的连通分量（并查集）。',
    '依次遍历排序好的边，检查它连接的两个顶点是否在同一个连通分量中。',
    '如果不在同一个连通分量，就把这条边加入最小生成树，并合并这两个连通分量；否则丢弃。'
  ],
  code: {
    "JavaScript": "/**\n * 克鲁斯卡尔算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: (包含所有节点和边的图对象)\n * 输出: 最小生成树对应的边集合\n */\nfunction kruskal(graph) {\n  const edges = [];\n  const nodes = new Set();\n  for (let u in graph) {\n    nodes.add(u);\n    for (let edge of graph[u]) {\n      if (typeof edge.weight !== 'undefined') {\n        edges.push({ u, v: edge.target, weight: edge.weight, originInfo: edge });\n      }\n    }\n  }\n  \n  edges.sort((a, b) => a.weight - b.weight);\n  \n  const parent = {};\n  for (let node of nodes) parent[node] = node;\n  \n  function find(i) {\n    if (parent[i] === i) return i;\n    return parent[i] = find(parent[i]);\n  }\n  \n  function union(i, j) {\n    let root_i = find(i);\n    let root_j = find(j);\n    if (root_i !== root_j) parent[root_i] = root_j;\n  }\n  \n  const mst = [];\n  for (let edge of edges) {\n    let uRep = find(edge.u);\n    let vRep = find(edge.v);\n    \n    if (uRep !== vRep) {\n      mst.push(edge);\n      union(uRep, vRep);\n    }\n  }\n  return mst;\n}\n\n// 测试示例:\n// const result = kruskal(包含所有节点和边的图对象);\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 克鲁斯卡尔算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: (包含所有节点和边的图对象)\n * 输出: 最小生成树对应的边集合\n */\ndef kruskal(graph):\n  edges = []\n  nodes = Set()\n  for (u in graph) \n    nodes.add(u)\n    for (edge of graph[u]) \n      if (typeof edge.weight != 'undefined') \n        edges.append( u, v: edge.target, weight: edge.weight, originInfo: edge )\n      \n    \n  \n  \n  edges.sort((a, b) => a.weight - b.weight)\n  \n  parent = \n  for (node of nodes) parent[node] = node\n  \n  def find(i):\n    if (parent[i] == i) return i\n    return parent[i] = find(parent[i])\n  \n  \n  def union(i, j):\n    root_i = find(i)\n    root_j = find(j)\n    if (root_i != root_j) parent[root_i] = root_j\n  \n  \n  mst = []\n  for (edge of edges) \n    uRep = find(edge.u)\n    vRep = find(edge.v)\n    \n    if (uRep != vRep) \n      mst.append(edge)\n      union(uRep, vRep)\n    \n  \n  return mst\n\n\n# 测试示例:\n# result = kruskal(包含所有节点和边的图对象)\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 克鲁斯卡尔算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: (包含所有节点和边的图对象)\n * 输出: 最小生成树对应的边集合\n */\nauto kruskal(graph) {\n  auto edges = [];\n  auto nodes = new Set();\n  for (auto u in graph) {\n    nodes.add(u);\n    for (auto edge of graph[u]) {\n      if (typeof edge.weight !== 'undefined') {\n        edges.push_back({ u, v: edge.target, weight: edge.weight, originInfo: edge });\n      }\n    }\n  }\n  \n  edges.sort((a, b) => a.weight - b.weight);\n  \n  auto parent = {};\n  for (auto node of nodes) parent[node] = node;\n  \n  auto find(i) {\n    if (parent[i] === i) return i;\n    return parent[i] = find(parent[i]);\n  }\n  \n  auto union(i, j) {\n    auto root_i = find(i);\n    auto root_j = find(j);\n    if (root_i !== root_j) parent[root_i] = root_j;\n  }\n  \n  auto mst = [];\n  for (auto edge of edges) {\n    auto uRep = find(edge.u);\n    auto vRep = find(edge.v);\n    \n    if (uRep !== vRep) {\n      mst.push_back(edge);\n      union(uRep, vRep);\n    }\n  }\n  return mst;\n}\n\n// 测试示例:\n// auto result = kruskal(包含所有节点和边的图对象);\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 克鲁斯卡尔算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: (包含所有节点和边的图对象)\n     * 输出: 最小生成树对应的边集合\n     */\n    public static var kruskal(graph) {\n      var edges = [];\n      var nodes = new Set();\n      for (var u in graph) {\n        nodes.add(u);\n        for (var edge of graph[u]) {\n          if (typeof edge.weight !== 'undefined') {\n            edges.add({ u, v: edge.target, weight: edge.weight, originInfo: edge });\n          }\n        }\n      }\n      \n      edges.sort((a, b) => a.weight - b.weight);\n      \n      var parent = {};\n      for (var node of nodes) parent[node] = node;\n      \n      public static var find(i) {\n        if (parent[i] === i) return i;\n        return parent[i] = find(parent[i]);\n      }\n      \n      public static var union(i, j) {\n        var root_i = find(i);\n        var root_j = find(j);\n        if (root_i !== root_j) parent[root_i] = root_j;\n      }\n      \n      var mst = [];\n      for (var edge of edges) {\n        var uRep = find(edge.u);\n        var vRep = find(edge.v);\n        \n        if (uRep !== vRep) {\n          mst.add(edge);\n          union(uRep, vRep);\n        }\n      }\n      return mst;\n    }\n    \n    // 测试示例:\n    // var result = kruskal(包含所有节点和边的图对象);\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(E log E)',
    average: 'O(E log E)',
    worst: 'O(E log E)'
  },
  spaceComplexity: 'O(V)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const numNodes = Math.min(Math.max(initialArray.length, 5), 8);
    const graph = generateCircleGraph(numNodes, false, 0.4, true); 
    const steps: SimulationStep[] = [];
    
    const uniqueEdges: { source: string, target: string, weight: number, edgeId: string }[] = [];
    const edgeSet = new Set<string>();
    
    for (const edge of graph.edges) {
       const key1 = `${edge.source}-${edge.target}`;
       const key2 = `${edge.target}-${edge.source}`;
       if (!edgeSet.has(key1) && !edgeSet.has(key2)) {
          edgeSet.add(key1);
          uniqueEdges.push({ source: edge.source, target: edge.target, weight: edge.weight!, edgeId: key1 });
       }
    }

    uniqueEdges.sort((a, b) => a.weight - b.weight);

    const nodesState: Record<string, ElementState> = {};
    const edgesState: Record<string, ElementState> = {};
    
    const parent: Record<string, string> = {};
    for (const node of graph.nodes) {
       parent[node.id] = node.id;
       nodesState[node.id] = 'default';
    }

    const find = (i: string): string => {
       if (parent[i] === i) return i;
       return parent[i] = find(parent[i]); 
    }

    const union = (i: string, j: string) => {
       const root_i = find(i);
       const root_j = find(j);
       if (root_i !== root_j) {
          parent[root_i] = root_j;
       }
    }

    const copyGraph = (): GraphData => {
        return {
           nodes: graph.nodes.map(n => ({ 
               ...n, 
               state: nodesState[n.id] || 'default'
           })),
           edges: graph.edges.map(e => {
             const key1 = `${e.source}-${e.target}`;
             const key2 = `${e.target}-${e.source}`;
             return { ...e, state: edgesState[key1] || edgesState[key2] || 'default' };
           }),
           isDirected: false
        }
    };

    steps.push({
      description: `准备执行 Kruskal 算法。图中所有的独特边已被取出，并按照权重大小排序妥当。`,
      elements: [],
      graphData: copyGraph()
    });

    for (const edge of uniqueEdges) {
       edgesState[edge.edgeId] = 'comparing';
       const prevStateSrc = nodesState[edge.source];
       const prevStateTgt = nodesState[edge.target];
       
       nodesState[edge.source] = 'comparing';
       nodesState[edge.target] = 'comparing';

       steps.push({
          description: `依次考察尚未被处理的、权重最小的边：从节点 ${edge.source} 到节点 ${edge.target}，权重为 ${edge.weight}。`,
          elements: [],
          graphData: copyGraph()
       });

       const rootU = find(edge.source);
       const rootV = find(edge.target);

       if (rootU !== rootV) {
          union(rootU, rootV);
          edgesState[edge.edgeId] = 'path';
          nodesState[edge.source] = 'sorted';
          nodesState[edge.target] = 'sorted';
          
          steps.push({
             description: `验证通过！节点 ${edge.source} 和 ${edge.target} 不处于同一个连通分量中，连接它们不会构成环。将其加入 MST。`,
             elements: [],
             graphData: copyGraph()
          });
       } else {
          edgesState[edge.edgeId] = 'default';
          nodesState[edge.source] = prevStateSrc === 'sorted' ? 'sorted' : 'default';
          nodesState[edge.target] = prevStateTgt === 'sorted' ? 'sorted' : 'default';

          steps.push({
             description: `舍弃该边！因为节点 ${edge.source} 和 ${edge.target} 已在相同集合(连通分量)。若添加它们将形成环路。`,
             elements: [],
             graphData: copyGraph()
          });
       }
    }

    steps.push({
      description: `【状态更新】Kruskal 算法执行完成！金黄色边代表了该图最终的最小生成树 (MST)。`,
      elements: [],
      graphData: copyGraph()
    });

    return steps;
  }
};
