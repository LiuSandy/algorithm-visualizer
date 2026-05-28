import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, ElementState } from '../types';
import { generateCircleGraph } from './utils';

export const dfs: AlgorithmDefinition = {
  id: 'dfs',
  name: '深度优先搜索 (DFS)',
  category: 'Graph',
  description: '深度优先搜索（DFS）是一种用于遍历或搜索树或图的算法。该算法沿着树的深度遍历树的节点，尽可能深的搜索树的分支。当节点v的所在边都己被探寻过，搜索将回溯到发现节点v的那条边的起始节点。这一过程一直进行到已发现从源节点可达的所有节点为止。',
  theory: {
    complexity: `需要翻看全要素，时间为无死角的 O(V + E)。靠着系统递归或者栈维持足迹，树深不倒则栈不灭，空间复杂度通常为深度的 O(H)。`,
    prosCons: `✅ 优点：天然契合系统的执行栈结构，代码优雅只需数行。
❌ 缺点：极易暴走冲进死胡同，如果遇不见终点或递归栈深度过高（浏览器常限1万帧栈），会导致调用栈彻底爆栈崩溃。`,
    interview: `和它的孪生兄弟回溯(Backtracking)高度重合。常考坑点：迷宫探路中的 visited 防重复判定、递归到底层要不要“退回足迹”（状态重置）。`,
      core: "图的深度优先遍历。采用栈结构（或递归系统栈），选定一个分支一路走到底，无路可走再回溯。",
      analogy: "就像一个人走迷宫，遇到岔路口随便挑一条走到黑，撞死胡同了才退回来试另一条，非常有撞南墙的精神。",
      scenarios: "适用场景：连通性检查、拓扑排序的基础",
      practical: "在微服务网格（Service Mesh）的调用链（Trace）死循环及死锁分析、以及寻找分布式锁产生的闭环依赖路径时执行连通性环形检测。"
},
  coreSteps: [
    '选取一个起始顶点 v。',
    '访问顶点 v，并将其标记为已访问。',
    '从 v 的未被访问的邻接点出发，对图进行深度优先遍历（递归）；直至图中和 v 有路径相通的顶点都被访问。',
    '如果图是不连通的，且尚有顶点未被访问，则再选一个未被访问的顶点，重复上述过程。'
  ],
  code: {
    "JavaScript": "/**\n * 深度优先搜索\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\")\n * 输出: [\"A\", \"B\", \"D\", \"C\"]\n */\nfunction dfs(graph, start) {\n  const visited = new Set();\n  const path = [];\n  \n  function explore(node) {\n    if (visited.has(node)) return;\n    visited.add(node);\n    path.push(node);\n    \n    for (let neighbor of graph[node]) {\n      explore(neighbor);\n    }\n  }\n  \n  explore(start);\n  return path;\n}\n\n// 测试示例:\n// const result = dfs({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\");\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 深度优先搜索\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: (A: [\"B\", \"C\"], B: [\"D\"], C: [], D: [], \"A\")\n * 输出: [\"A\", \"B\", \"D\", \"C\"]\n */\ndef dfs(graph, start):\n  visited = Set()\n  path = []\n  \n  def explore(node):\n    if (visited.has(node)) return\n    visited.add(node)\n    path.append(node)\n    \n    for (neighbor of graph[node]) \n      explore(neighbor)\n    \n  \n  \n  explore(start)\n  return path\n\n\n# 测试示例:\n# result = dfs(A: [\"B\", \"C\"], B: [\"D\"], C: [], D: [], \"A\")\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 深度优先搜索\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\")\n * 输出: [\"A\", \"B\", \"D\", \"C\"]\n */\nauto dfs(graph, start) {\n  auto visited = new Set();\n  auto path = [];\n  \n  auto explore(node) {\n    if (visited.has(node)) return;\n    visited.add(node);\n    path.push_back(node);\n    \n    for (auto neighbor of graph[node]) {\n      explore(neighbor);\n    }\n  }\n  \n  explore(start);\n  return path;\n}\n\n// 测试示例:\n// auto result = dfs({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\");\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 深度优先搜索\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\")\n     * 输出: [\"A\", \"B\", \"D\", \"C\"]\n     */\n    public static var dfs(graph, start) {\n      var visited = new Set();\n      var path = [];\n      \n      public static var explore(node) {\n        if (visited.has(node)) return;\n        visited.add(node);\n        path.add(node);\n        \n        for (var neighbor of graph[node]) {\n          explore(neighbor);\n        }\n      }\n      \n      explore(start);\n      return path;\n    }\n    \n    // 测试示例:\n    // var result = dfs({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\");\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)'
  },
  spaceComplexity: 'O(V)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const numNodes = Math.min(Math.max(initialArray.length, 6), 10);
    const graph = generateCircleGraph(numNodes, false, 0.25);
    const steps: SimulationStep[] = [];
    
    const adj = new Map<string, string[]>();
    for (const node of graph.nodes) {
      adj.set(node.id, []);
    }
    for (const edge of graph.edges) {
      if (adj.has(edge.source) && adj.has(edge.target)) {
        adj.get(edge.source)!.push(edge.target);
        adj.get(edge.target)!.push(edge.source);
      }
    }
    for (const [key, neighbors] of adj.entries()) {
       neighbors.sort((a,b) => parseInt(a) - parseInt(b));
    }

    const copyGraph = (nodesState: Record<string, ElementState>, edgesState: Record<string, ElementState>): GraphData => {
        return {
           nodes: graph.nodes.map(n => ({ ...n, state: nodesState[n.id] || 'default' })),
           edges: graph.edges.map(e => {
             const key1 = `${e.source}-${e.target}`;
             const key2 = `${e.target}-${e.source}`;
             return { ...e, state: edgesState[key1] || edgesState[key2] || 'default' };
           }),
           isDirected: false
        }
    };

    const nodesState: Record<string, ElementState> = {};
    const edgesState: Record<string, ElementState> = {};
    const visited = new Set<string>();

    steps.push({
      description: `【操作寻址】构建包含 ${numNodes} 个节点的无向图。准备从节点 0 开始进行深度优先搜索。`,
      elements: [],
      graphData: copyGraph(nodesState, edgesState)
    });

    const explore = (node: string, parentEdgeKey: string | null) => {
      visited.add(node);
      nodesState[node] = 'highlight';
      if (parentEdgeKey) {
        edgesState[parentEdgeKey] = 'highlight';
      }
      
      steps.push({
          description: `【操作寻址】访问节点 ${node}，将其标记为已访问，并准备寻找它第一个未被访问的相邻节点。`,
          elements: [],
          graphData: copyGraph(nodesState, edgesState)
      });

      nodesState[node] = 'visited';
      if (parentEdgeKey) {
        edgesState[parentEdgeKey] = 'visited';
      }

      for (let neighbor of adj.get(node)!) {
         const edgeKey = `${node}-${neighbor}`;
         if (!visited.has(neighbor)) {
            explore(neighbor, edgeKey);
            
            nodesState[node] = 'highlight';
            edgesState[edgeKey] = 'visited'; 
            steps.push({
                description: `从深层递归返回。回溯到节点 ${node}，继续检查它是否还有其他未被访问的连通节点。`,
                elements: [],
                graphData: copyGraph(nodesState, edgesState)
            });
            nodesState[node] = 'visited';
         } else {
            const origState = edgesState[edgeKey] || edgesState[`${neighbor}-${node}`] || 'default';
            if (origState === 'default') {
               edgesState[edgeKey] = 'comparing';
               steps.push({
                  description: `检查邻居节点 ${neighbor}。因为它已经被访问过了，形成了一条回路，所以我们忽略此方向。`,
                  elements: [],
                  graphData: copyGraph(nodesState, edgesState)
               });
               edgesState[edgeKey] = 'default';
            }
         }
      }
    };

    explore('0', null);

    steps.push({
      description: `【操作寻址】深度优先搜索（DFS）完成！所有与起点可达的节点均已被访问和点亮。`,
      elements: [],
      graphData: copyGraph(nodesState, edgesState)
    });

    return steps;
  }
};
