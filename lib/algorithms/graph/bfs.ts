import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, ElementState } from '../types';
import { generateCircleGraph } from './utils';

export const bfs: AlgorithmDefinition = {
  id: 'bfs',
  name: '广度优先搜索 (BFS)',
  category: 'Graph',
  description: '广度优先搜索（BFS）是一种用于遍历或搜索树或图的算法。它从给定的起始节点出发，优先访问靠近起点的节点。也就是说，它先访问起点的所有相邻节点，然后再依次访问这些相邻节点的相邻节点，就像水波纹一样一层层向外扩展。',
  theory: {
    complexity: `彻底摸遍所有的城市点(V)与连接路(E)，综合收敛于 O(V + E)。空间由于需要极其贪婪地用列车队列保存同一圈层的所有成员，最肥的情况接近 O(V)。`,
    prosCons: `✅ 优点：自带“最早发现的一定最短”的天然光环。
❌ 缺点：广撒网导致列车队列会十分鼓胀，占用大量的排队空间。`,
    interview: `必考手写【队列迭代法】。常见题：二维网格迷宫的最优解探路、感染腐烂橘子问题、社交网络的二度人脉关联。`,
      core: "图的广度优先遍历。借助队列数据结构，一层一层地向外扩张，直到遍历完所有连通节点。",
      analogy: "就像一颗石子扔进湖面泛起涟漪，波纹一圈一圈地向外围散开，先覆盖身边的人，再去找外围的人。",
      scenarios: "适用场景：无权图的最短路径、层级网络探测",
      practical: "在社交网络中寻找“二度人脉”，在分布式一致性网络中向邻近对等节点(P2P Node)全量广播心跳包（Gossip 协议）。"
},
  coreSteps: [
    '选取一个起始顶点 v，将其入队并标记为已访问。',
    '如果队列不为空，则从队列头部弹出一个顶点。',
    '遍历该顶点的所有未访问过的相邻节点，将它们依次入队，并标记为已访问。',
    '重复第2和第3步，直至队列为空。'
  ],
  code: {
    "JavaScript": "/**\n * 广度优先搜索\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\")\n * 输出: [\"A\", \"B\", \"C\", \"D\"]\n */\nfunction bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  const path = [];\n  \n  visited.add(start);\n  \n  while (queue.length > 0) {\n    const node = queue.shift();\n    path.push(node);\n    \n    for (let neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  return path;\n}\n\n// 测试示例:\n// const result = bfs({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\");\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 广度优先搜索\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: (A: [\"B\", \"C\"], B: [\"D\"], C: [], D: [], \"A\")\n * 输出: [\"A\", \"B\", \"C\", \"D\"]\n */\ndef bfs(graph, start):\n  visited = Set()\n  queue = [start]\n  path = []\n  \n  visited.add(start)\n  \n  while (queue.__len__() > 0) \n    node = queue.shift()\n    path.append(node)\n    \n    for (neighbor of graph[node]) \n      if (!visited.has(neighbor)) \n        visited.add(neighbor)\n        queue.append(neighbor)\n      \n    \n  \n  return path\n\n\n# 测试示例:\n# result = bfs(A: [\"B\", \"C\"], B: [\"D\"], C: [], D: [], \"A\")\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 广度优先搜索\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\")\n * 输出: [\"A\", \"B\", \"C\", \"D\"]\n */\nauto bfs(graph, start) {\n  auto visited = new Set();\n  auto queue = [start];\n  auto path = [];\n  \n  visited.add(start);\n  \n  while (queue.size() > 0) {\n    auto node = queue.shift();\n    path.push_back(node);\n    \n    for (auto neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push_back(neighbor);\n      }\n    }\n  }\n  return path;\n}\n\n// 测试示例:\n// auto result = bfs({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\");\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 广度优先搜索\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\")\n     * 输出: [\"A\", \"B\", \"C\", \"D\"]\n     */\n    public static var bfs(graph, start) {\n      var visited = new Set();\n      var queue = [start];\n      var path = [];\n      \n      visited.add(start);\n      \n      while (queue.length > 0) {\n        var node = queue.shift();\n        path.add(node);\n        \n        for (var neighbor of graph[node]) {\n          if (!visited.has(neighbor)) {\n            visited.add(neighbor);\n            queue.add(neighbor);\n          }\n        }\n      }\n      return path;\n    }\n    \n    // 测试示例:\n    // var result = bfs({A: [\"B\", \"C\"], B: [\"D\"], C: [], D: []}, \"A\");\n    // console.log(\"执行结果:\", result);\n}"
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

    const copyGraph = (nodesState: Record<string, ElementState>, edgesState: Record<string, ElementState>, queueValues: string[]): GraphData => {
        return {
           nodes: graph.nodes.map(n => {
               const idx = queueValues.indexOf(n.id);
               return { 
                 ...n, 
                 state: nodesState[n.id] || 'default',
                 value: idx !== -1 ? `In Q [${idx}]` : n.value
               }
           }),
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
    const queue: string[] = [];

    steps.push({
      description: `【操作寻址】构建无向图，准备从节点 0 开始进行广度优先搜索 (一层层往外扩)。`,
      elements: [],
      graphData: copyGraph(nodesState, edgesState, queue)
    });

    queue.push('0');
    visited.add('0');
    nodesState['0'] = 'highlight';

    steps.push({
      description: `初始化：将起点 0 加入队列中，并标记为已发现。`,
      elements: [],
      graphData: copyGraph(nodesState, edgesState, queue)
    });

    while (queue.length > 0) {
      const current = queue.shift()!;
      nodesState[current] = 'visited';
      
      steps.push({
         description: `从队列中弹出一个节点 ${current}。接下来将遍历并检查 ${current} 所有未被访问的相邻节点。`,
         elements: [],
         graphData: copyGraph(nodesState, edgesState, queue)
      });

      for (const neighbor of adj.get(current)!) {
         const edgeKey = `${current}-${neighbor}`;
         if (!visited.has(neighbor)) {
            visited.add(neighbor);
            queue.push(neighbor);
            edgesState[edgeKey] = 'path';
            nodesState[neighbor] = 'highlight';
            
            steps.push({
               description: `通过节点 ${current} 的连边发现了新节点 ${neighbor}。将其标记为已发现并加入队列等待处理。`,
               elements: [],
               graphData: copyGraph(nodesState, edgesState, queue)
            });
         } else {
            const origState = edgesState[edgeKey] || edgesState[`${neighbor}-${current}`] || 'default';
            if (origState === 'default') {
               edgesState[edgeKey] = 'comparing';
               steps.push({
                  description: `检查节点 ${current} 到 ${neighbor} 的路径，因为节点 ${neighbor} 已经被发现过（或已在队列中），跳过。`,
                  elements: [],
                  graphData: copyGraph(nodesState, edgesState, queue)
               });
               edgesState[edgeKey] = 'default';
            }
         }
      }
    }

    steps.push({
      description: `【操作寻址】广度优先搜索（BFS）完成！图的所有连通部分均已被按层次波纹般地访问完毕。`,
      elements: [],
      graphData: copyGraph(nodesState, edgesState, queue)
    });

    return steps;
  }
};
