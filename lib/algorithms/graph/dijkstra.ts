import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, ElementState } from '../types';
import { generateCircleGraph } from './utils';

export const dijkstra: AlgorithmDefinition = {
  id: 'dijkstra',
  name: 'Dijkstra 最短路径',
  category: 'Graph',
  description: 'Dijkstra 算法用于在加权图中找到从起始节点到所有其他节点的最短路径。它维护一个当前已知最短距离的集合，并在每一步贪婪地选择距离最小的未处理节点，然后使用这个节点来更新其所有相邻节点的距离。该算法要求图中所有的边权值都为非负数。',
  theory: {
    complexity: `如果是简单遍历挑最小，为 O(V^2)。但在实际工程采用优先权队列(堆)加持后，能迅速缩减至 O((V+E) log V)。`,
    prosCons: `✅ 优点：保证绝对精准求得单一源点到全宇宙的极限短径。
❌ 缺点：它天生恐惧“带有负权重的回撤边”，这会让它的贪心设定直接崩盘失效（需改用 Bellman-Ford）。`,
    interview: `面试高阶局的必修。考点一：优先队列与 Dijkstra 的羁绊（如何做到不用 O(N) 去遍历找最小）。考点二：Dijkstra 为什么处理不了负权边？`,
      core: "利用优先队列（贪心思想）不断松弛起点到所有剩余顶点的距离，找到单源最短路径。只适用于非负权边。",
      analogy: "开车用导航：从家出发，每次只看一下周围哪个路口过去油费最少，到了这路口再去算下一段，逐步确定到全城的最省油路线。",
      scenarios: "适用场景：地图导航路由、基站信号选路",
      practical: "广泛应用于云计算 VPC（虚拟私有云）网络的底层 OSPF 和 IS-IS 动态路由协议，计算数据包跨多个路由器的最优传输路径。"
},
  coreSteps: [
    '将起点距离设为 0，其他所有顶点的距离设为无穷大。',
    '从尚未处理的顶点中，选出一个距离起点最近的顶点 u。',
    '遍历 u 的所有邻接点 v，如果有 `dist[u] + weight(u,v) < dist[v]`，则更新 dist[v]。',
    '将 u 标记为已处理。不断重复上述步骤，直到所有顶点被处理完毕。'
  ],
  code: {
    "JavaScript": "/**\n * 迪杰斯特拉算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: {B: 1, C: 4}, B: {C: 2}, C: {}}, \"A\")\n * 输出: {B: 1, C: 3}\n */\nfunction dijkstra(graph, start) {\n  const dist = {};\n  const visited = new Set();\n  \n  for (let node in graph) dist[node] = Infinity;\n  dist[start] = 0;\n  \n  while (visited.size < Object.keys(graph).length) {\n    let u = null;\n    let minDist = Infinity;\n    \n    for (let node in dist) {\n      if (!visited.has(node) && dist[node] < minDist) {\n        minDist = dist[node];\n        u = node;\n      }\n    }\n    \n    if (u === null) break;\n    visited.add(u);\n    \n    for (let edge of graph[u]) {\n      let v = edge.target;\n      let newDist = dist[u] + edge.weight;\n      if (newDist < dist[v]) {\n        dist[v] = newDist;\n      }\n    }\n  }\n  return dist;\n}\n\n// 测试示例:\n// const result = dijkstra({A: {B: 1, C: 4}, B: {C: 2}, C: {}}, \"A\");\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 迪杰斯特拉算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: (A: B: 1, C: 4, B: C: 2, C: , \"A\")\n * 输出: B: 1, C: 3\n */\ndef dijkstra(graph, start):\n  dist = \n  visited = Set()\n  \n  for (node in graph) dist[node] = Infinity\n  dist[start] = 0\n  \n  while (visited.size < Object.keys(graph).__len__()) \n    u = null\n    minDist = Infinity\n    \n    for (node in dist) \n      if (!visited.has(node) and dist[node] < minDist) \n        minDist = dist[node]\n        u = node\n      \n    \n    \n    if (u == null) break\n    visited.add(u)\n    \n    for (edge of graph[u]) \n      v = edge.target\n      newDist = dist[u] + edge.weight\n      if (newDist < dist[v]) \n        dist[v] = newDist\n      \n    \n  \n  return dist\n\n\n# 测试示例:\n# result = dijkstra(A: B: 1, C: 4, B: C: 2, C: , \"A\")\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 迪杰斯特拉算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: {B: 1, C: 4}, B: {C: 2}, C: {}}, \"A\")\n * 输出: {B: 1, C: 3}\n */\nauto dijkstra(graph, start) {\n  auto dist = {};\n  auto visited = new Set();\n  \n  for (auto node in graph) dist[node] = Infinity;\n  dist[start] = 0;\n  \n  while (visited.size < Object.keys(graph).size()) {\n    auto u = null;\n    auto minDist = Infinity;\n    \n    for (auto node in dist) {\n      if (!visited.has(node) && dist[node] < minDist) {\n        minDist = dist[node];\n        u = node;\n      }\n    }\n    \n    if (u === null) break;\n    visited.add(u);\n    \n    for (auto edge of graph[u]) {\n      auto v = edge.target;\n      auto newDist = dist[u] + edge.weight;\n      if (newDist < dist[v]) {\n        dist[v] = newDist;\n      }\n    }\n  }\n  return dist;\n}\n\n// 测试示例:\n// auto result = dijkstra({A: {B: 1, C: 4}, B: {C: 2}, C: {}}, \"A\");\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 迪杰斯特拉算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ({A: {B: 1, C: 4}, B: {C: 2}, C: {}}, \"A\")\n     * 输出: {B: 1, C: 3}\n     */\n    public static var dijkstra(graph, start) {\n      var dist = {};\n      var visited = new Set();\n      \n      for (var node in graph) dist[node] = Infinity;\n      dist[start] = 0;\n      \n      while (visited.size < Object.keys(graph).length) {\n        var u = null;\n        var minDist = Infinity;\n        \n        for (var node in dist) {\n          if (!visited.has(node) && dist[node] < minDist) {\n            minDist = dist[node];\n            u = node;\n          }\n        }\n        \n        if (u === null) break;\n        visited.add(u);\n        \n        for (var edge of graph[u]) {\n          var v = edge.target;\n          var newDist = dist[u] + edge.weight;\n          if (newDist < dist[v]) {\n            dist[v] = newDist;\n          }\n        }\n      }\n      return dist;\n    }\n    \n    // 测试示例:\n    // var result = dijkstra({A: {B: 1, C: 4}, B: {C: 2}, C: {}}, \"A\");\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O((V+E) log V)',
    average: 'O((V+E) log V)',
    worst: 'O(V²)'
  },
  spaceComplexity: 'O(V)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const numNodes = Math.min(Math.max(initialArray.length, 5), 9);
    const graph = generateCircleGraph(numNodes, false, 0.4, true);
    const steps: SimulationStep[] = [];
    
    const adj = new Map<string, {target: string, weight: number, edgeId: string}[]>();
    for (const node of graph.nodes) {
      adj.set(node.id, []);
    }
    for (const edge of graph.edges) {
      const edgeId = `${edge.source}-${edge.target}`;
      if (adj.has(edge.source) && adj.has(edge.target)) {
        adj.get(edge.source)!.push({target: edge.target, weight: edge.weight!, edgeId});
        adj.get(edge.target)!.push({target: edge.source, weight: edge.weight!, edgeId});
      }
    }

    const dist: Record<string, number> = {};
    const nodesState: Record<string, ElementState> = {};
    const edgesState: Record<string, ElementState> = {};
    const visited = new Set<string>();

    for (const node of graph.nodes) {
       dist[node.id] = Infinity;
       nodesState[node.id] = 'default';
    }

    const copyGraph = (): GraphData => {
        return {
           nodes: graph.nodes.map(n => ({ 
               ...n, 
               state: nodesState[n.id],
               value: dist[n.id] === Infinity ? '∞' : dist[n.id].toString()
           })),
           edges: graph.edges.map(e => {
             const edgeId = `${e.source}-${e.target}`;
             return { ...e, state: edgesState[edgeId] || 'default' };
           }),
           isDirected: false
        }
    };

    steps.push({
      description: `准备执行 Dijkstra 算法。初始化：所有节点的距离设定为无穷大(∞)。`,
      elements: [],
      graphData: copyGraph()
    });

    dist['0'] = 0;
    nodesState['0'] = 'highlight';

    steps.push({
      description: `将起点 0 的最短距离设为 0。数字表示当前到起点的最短路径权值和。`,
      elements: [],
      graphData: copyGraph()
    });

    while (visited.size < numNodes) {
       let u: string | null = null;
       let min = Infinity;
       for (const node of graph.nodes) {
          if (!visited.has(node.id) && dist[node.id] < min) {
             min = dist[node.id];
             u = node.id;
          }
       }

       if (u === null) break;

       visited.add(u);
       nodesState[u] = 'pivot'; 

       steps.push({
          description: `未处理的节点中，选中距离最近的节点 ${u} (距离为 ${dist[u]})。将其作为源向外松弛(Relax)。`,
          elements: [],
          graphData: copyGraph()
       });

       for (const neighbor of adj.get(u)!) {
          if (!visited.has(neighbor.target)) {
             edgesState[neighbor.edgeId] = 'comparing';
             const prevState = nodesState[neighbor.target];
             nodesState[neighbor.target] = 'comparing';
             
             steps.push({
                description: `【逻辑比较】预对比：前往相邻节点 ${neighbor.target}。已有距离(${dist[neighbor.target] === Infinity ? '∞' : dist[neighbor.target]})，当前潜在新距离( ${dist[u]} + ${neighbor.weight} = ${dist[u] + neighbor.weight} )。`,
                elements: [],
                graphData: copyGraph()
             });

             if (dist[u] + neighbor.weight < dist[neighbor.target]) {
                dist[neighbor.target] = dist[u] + neighbor.weight;
                edgesState[neighbor.edgeId] = 'path';
                nodesState[neighbor.target] = 'highlight';

                steps.push({
                   description: `发现更短的路径！更新节点 ${neighbor.target} 最短距离为 ${dist[neighbor.target]}。`,
                   elements: [],
                   graphData: copyGraph()
                });
             } else {
                edgesState[neighbor.edgeId] = 'default';
                nodesState[neighbor.target] = prevState;
             }
          }
       }

       nodesState[u] = 'sorted';

       steps.push({
          description: `【状态更新】节点 ${u} 的最短路径确立定格，它周围连出的边更新完成。`,
          elements: [],
          graphData: copyGraph()
       });
    }

    steps.push({
      description: `Dijkstra 最短路径计算完毕！每个节点呈现的数字即为其距离起点的最小权重成本。`,
      elements: [],
      graphData: copyGraph()
    });

    return steps;
  }
};
