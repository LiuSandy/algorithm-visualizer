import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, ElementState } from '../types';
import { generateCircleGraph } from './utils';

export const prim: AlgorithmDefinition = {
  id: 'prim',
  name: 'Prim 最小生成树',
  category: 'Graph',
  description: 'Prim 算法是一种用于寻找加权无向图的最小生成树的贪心算法。它从一个任意节点开始，将其加入到生成树集合中。然后在所有连接已在生成树中的节点和不在生成树中的节点的边里，挑选权重最小的一条边，将其和它连接的未访问节点加入树中。不断重复此过程，直到所有节点都被包含进生成树中。',
  theory: {
    complexity: `通常都受制于 V(顶点数量) 和 E(边数量)，大多流转在 O(V+E) 到 O(V^2) 以上的网状膨胀率之间。`,
    prosCons: `✅ 优点：完美映射大千世界真实的相互关系，降维万物。
❌ 缺点：极高的数据表示成本和空间吞噬，一旦代码编写松散，循环引用图将导致瞬间内存耗尽死机。`,
    interview: `核心常常死抓在「如何防止原路回去的无线死循环」——visited记录集的灵活运用！`,
      core: "使用访问状态数组，从单一顶点出发，像滚雪球一样不断纳入距离当前连通网最近的新顶点到最小生成树中。",
      analogy: "你在玩即时战略游戏，从你的主基地中心开始，先把周围最近的金矿占了，然后把视野扩张，接着再挑离你帝国边境最近的金矿占领，稳扎稳打铺满全图。",
      scenarios: "适用场景：稠密图最小生成树、芯片布线",
      practical: "在大规模数据中心的物理机房跳线网络（Spine-Leaf 网络拓扑）规划中，用于节约数以万计的昂贵光纤电缆成本。"
},
  coreSteps: [
    '选取任意一个节点作为起始点，将其加入最小生成树（MST）集合。',
    '在所有连接 “MST集合内的节点” 和 “集合外的节点” 的边中，找到权重最小的边。',
    '将这条边以及它所连接的新节点加入到 MST 集合中。',
    '重复步骤2和3，直到所有的节点都被包含在 MST 中。'
  ],
  code: {
    "JavaScript": "/**\n * 普林算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: {B: 1, C: 4}, B: {A: 1, C: 2}, C: {A: 4, B: 2}})\n * 输出: 最小生成树对应的边集合\n */\nfunction prim(graph) {\n  const mst = [];\n  const visited = new Set();\n  const nodes = Object.keys(graph);\n  if (nodes.length === 0) return mst;\n  \n  visited.add(nodes[0]);\n  \n  while (visited.size < nodes.length) {\n    let minEdge = null;\n    \n    for (let u of visited) {\n      for (let edge of graph[u]) {\n        let v = edge.target;\n        if (!visited.has(v)) {\n          if (!minEdge || edge.weight < minEdge.weight) {\n            minEdge = { u, v, weight: edge.weight, originInfo: edge };\n          }\n        }\n      }\n    }\n    \n    if (!minEdge) break;\n    \n    visited.add(minEdge.v);\n    mst.push(minEdge);\n  }\n  return mst;\n}\n\n// 测试示例:\n// const result = prim({A: {B: 1, C: 4}, B: {A: 1, C: 2}, C: {A: 4, B: 2}});\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 普林算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: (A: B: 1, C: 4, B: A: 1, C: 2, C: A: 4, B: 2)\n * 输出: 最小生成树对应的边集合\n */\ndef prim(graph):\n  mst = []\n  visited = Set()\n  nodes = Object.keys(graph)\n  if (nodes.__len__() == 0) return mst\n  \n  visited.add(nodes[0])\n  \n  while (visited.size < nodes.__len__()) \n    minEdge = null\n    \n    for (u of visited) \n      for (edge of graph[u]) \n        v = edge.target\n        if (!visited.has(v)) \n          if (!minEdge or edge.weight < minEdge.weight) \n            minEdge =  u, v, weight: edge.weight, originInfo: edge \n          \n        \n      \n    \n    \n    if (!minEdge) break\n    \n    visited.add(minEdge.v)\n    mst.append(minEdge)\n  \n  return mst\n\n\n# 测试示例:\n# result = prim(A: B: 1, C: 4, B: A: 1, C: 2, C: A: 4, B: 2)\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 普林算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: {B: 1, C: 4}, B: {A: 1, C: 2}, C: {A: 4, B: 2}})\n * 输出: 最小生成树对应的边集合\n */\nauto prim(graph) {\n  auto mst = [];\n  auto visited = new Set();\n  auto nodes = Object.keys(graph);\n  if (nodes.size() === 0) return mst;\n  \n  visited.add(nodes[0]);\n  \n  while (visited.size < nodes.size()) {\n    auto minEdge = null;\n    \n    for (auto u of visited) {\n      for (auto edge of graph[u]) {\n        auto v = edge.target;\n        if (!visited.has(v)) {\n          if (!minEdge || edge.weight < minEdge.weight) {\n            minEdge = { u, v, weight: edge.weight, originInfo: edge };\n          }\n        }\n      }\n    }\n    \n    if (!minEdge) break;\n    \n    visited.add(minEdge.v);\n    mst.push_back(minEdge);\n  }\n  return mst;\n}\n\n// 测试示例:\n// auto result = prim({A: {B: 1, C: 4}, B: {A: 1, C: 2}, C: {A: 4, B: 2}});\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 普林算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ({A: {B: 1, C: 4}, B: {A: 1, C: 2}, C: {A: 4, B: 2}})\n     * 输出: 最小生成树对应的边集合\n     */\n    public static var prim(graph) {\n      var mst = [];\n      var visited = new Set();\n      var nodes = Object.keys(graph);\n      if (nodes.length === 0) return mst;\n      \n      visited.add(nodes[0]);\n      \n      while (visited.size < nodes.length) {\n        var minEdge = null;\n        \n        for (var u of visited) {\n          for (var edge of graph[u]) {\n            var v = edge.target;\n            if (!visited.has(v)) {\n              if (!minEdge || edge.weight < minEdge.weight) {\n                minEdge = { u, v, weight: edge.weight, originInfo: edge };\n              }\n            }\n          }\n        }\n        \n        if (!minEdge) break;\n        \n        visited.add(minEdge.v);\n        mst.add(minEdge);\n      }\n      return mst;\n    }\n    \n    // 测试示例:\n    // var result = prim({A: {B: 1, C: 4}, B: {A: 1, C: 2}, C: {A: 4, B: 2}});\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(E log V)',
    average: 'O(E log V)',
    worst: 'O(V²)'
  },
  spaceComplexity: 'O(V)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const numNodes = Math.min(Math.max(initialArray.length, 5), 8);
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

    const nodesState: Record<string, ElementState> = {};
    const edgesState: Record<string, ElementState> = {};
    const visited = new Set<string>();

    const copyGraph = (): GraphData => {
        return {
           nodes: graph.nodes.map(n => ({ 
               ...n, 
               state: nodesState[n.id] || 'default'
           })),
           edges: graph.edges.map(e => {
             const edgeId = `${e.source}-${e.target}`;
             return { ...e, state: edgesState[edgeId] || 'default' };
           }),
           isDirected: false
        }
    };

    steps.push({
      description: `【操作寻址】准备执行 Prim 算法寻找无向图的最小生成树(MST)。目标是用总权重最小的一组边把所有节点连通。`,
      elements: [],
      graphData: copyGraph()
    });

    const startNode = '0';
    visited.add(startNode);
    nodesState[startNode] = 'sorted';

    steps.push({
      description: `初始化：将节点 0 作为集合中的第一颗种子，加入最小生成树(MST)。`,
      elements: [],
      graphData: copyGraph()
    });

    while (visited.size < numNodes) {
       let minWeight = Infinity;
       let bestEdge: { u: string, v: string, edgeId: string } | null = null;
       
       for (const u of Array.from(visited)) {
          for (const neighbor of adj.get(u)!) {
             if (!visited.has(neighbor.target)) {
                if (neighbor.weight < minWeight) {
                   minWeight = neighbor.weight;
                   bestEdge = { u, v: neighbor.target, edgeId: neighbor.edgeId };
                }
             }
          }
       }

       if (!bestEdge) break;

       edgesState[bestEdge.edgeId] = 'comparing';
       nodesState[bestEdge.v] = 'comparing';

       steps.push({
          description: `在连通“已有集合”与“其余节点”的边中，找到了权重最小的边：连接节点 ${bestEdge.u} 和 ${bestEdge.v}，其权重为 ${minWeight}。`,
          elements: [],
          graphData: copyGraph()
       });

       visited.add(bestEdge.v);
       edgesState[bestEdge.edgeId] = 'path';
       nodesState[bestEdge.v] = 'sorted';

       steps.push({
          description: `确定收纳边！节点 ${bestEdge.v} 被安全地加入到了最小生成树(MST)集合中。继续向外扩展。`,
          elements: [],
          graphData: copyGraph()
       });
    }

    steps.push({
      description: `【状态更新】所有节点均已被连接，Prim 算法圆满结束。金黄色的边构成了该图的最小生成树。`,
      elements: [],
      graphData: copyGraph()
    });

    return steps;
  }
};
