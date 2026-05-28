import { AlgorithmDefinition, SimulationStep, GraphData } from '../types';

export const eulerPath: AlgorithmDefinition = {
  id: 'euler-path',
  name: '欧拉路径 (Euler Path)',
  category: 'Graph',
  description: '欧拉路径是指在图上穿过每条边恰好一次的路径。著名的“一笔画”问题其实就是寻找欧拉路径。如果图不仅有欧拉路径，还能回到起点，则称为欧拉回路。判断全连通无向图是否存在欧拉路径条件：度数为奇数的顶点个数为0个或2个。',
  theory: {
    complexity: `通常都受制于 V(顶点数量) 和 E(边数量)，大多流转在 O(V+E) 到 O(V^2) 以上的网状膨胀率之间。`,
    prosCons: `✅ 优点：完美映射大千世界真实的相互关系，降维万物。
❌ 缺点：极高的数据表示成本和空间吞噬，一旦代码编写松散，循环引用图将导致瞬间内存耗尽死机。`,
    interview: `核心常常死抓在「如何防止原路回去的无线死循环」——visited记录集的灵活运用！`,
      core: "通过检查图中各顶点的度数，采用 Hierholzer 算法构建一条只且只走一遍图中所有边的路径。",
      analogy: "经典的一笔画问题：要求笔不离纸，画过每一条线且不重复，能不能画出来取决于奇数线头（奇度数顶点）的数量是否不超过两个。",
      scenarios: "适用场景：邮递员问题、电路板规划",
      practical: "在基因组测序（DNA Sequence Assembly）中使用 de Bruijn 图寻找序列重叠拼装策略，另外也在自动清扫机器人的全局路径无死角规划中运用。"
},
  coreSteps: [
    '检查图中度数为奇数的顶点数，确保恰好为0个或2个（连通图前提）。',
    '从一个奇度顶点（如果有）或任意顶点（如果全是偶度）开始。',
    '可以使用 Hierholzer 算法：进行深度优先搜索遍历边，遍历后将边删除（或标记）。',
    '如果在某节点无未遍历的边，则将该节点加入当前路径序列中。',
    '最后将序列逆序，即可得到一条正确的欧拉路径。'
  ],
  code: {
    "JavaScript": "/**\n * 欧拉回路(Hierholzer)算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: 具有欧拉回路的图对象\n * 输出: 欧拉回路路径数组\n */\nfunction hierholzer(graph, startNode) {\n  const path = [];\n  const edgeCount = {};\n  \n  // Create a copy of adjacency list\n  const adj = new Map();\n  for (const node of graph.nodes) {\n    adj.set(node, [...graph.getNeighbors(node)]);\n  }\n  \n  function dfs(u) {\n    while (adj.get(u).length > 0) {\n      const v = adj.get(u).shift();\n      // Remove back edge for undirected graph\n      adj.set(v, adj.get(v).filter(n => n !== u));\n      dfs(v);\n    }\n    path.push(u);\n  }\n  \n  dfs(startNode);\n  return path.reverse();\n}\n\n// 测试示例:\n// const result = hierholzer具有欧拉回路的图对象;\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 欧拉回路(Hierholzer)算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: 具有欧拉回路的图对象\n * 输出: 欧拉回路路径数组\n */\ndef hierholzer(graph, startNode):\n  path = []\n  edgeCount = \n  \n  # Create a copy of adjacency list\n  adj = Map()\n  for (node of graph.nodes) \n    adj.set(node, [...graph.getNeighbors(node)])\n  \n  \n  def dfs(u):\n    while (adj.get(u).__len__() > 0) \n      v = adj.get(u).shift()\n      # Remove back edge for undirected graph\n      adj.set(v, adj.get(v).filter(n => n != u))\n      dfs(v)\n    \n    path.append(u)\n  \n  \n  dfs(startNode)\n  return path.reverse()\n\n\n# 测试示例:\n# result = hierholzer具有欧拉回路的图对象\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 欧拉回路(Hierholzer)算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: 具有欧拉回路的图对象\n * 输出: 欧拉回路路径数组\n */\nauto hierholzer(graph, startNode) {\n  auto path = [];\n  auto edgeCount = {};\n  \n  // Create a copy of adjacency list\n  auto adj = new Map();\n  for (auto node of graph.nodes) {\n    adj.set(node, [...graph.getNeighbors(node)]);\n  }\n  \n  auto dfs(u) {\n    while (adj.get(u).size() > 0) {\n      auto v = adj.get(u).shift();\n      // Remove back edge for undirected graph\n      adj.set(v, adj.get(v).filter(n => n !== u));\n      dfs(v);\n    }\n    path.push_back(u);\n  }\n  \n  dfs(startNode);\n  return path.reverse();\n}\n\n// 测试示例:\n// auto result = hierholzer具有欧拉回路的图对象;\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 欧拉回路(Hierholzer)算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: 具有欧拉回路的图对象\n     * 输出: 欧拉回路路径数组\n     */\n    public static var hierholzer(graph, startNode) {\n      var path = [];\n      var edgeCount = {};\n      \n      // Create a copy of adjacency list\n      var adj = new Map();\n      for (var node of graph.nodes) {\n        adj.set(node, [...graph.getNeighbors(node)]);\n      }\n      \n      public static var dfs(u) {\n        while (adj.get(u).length > 0) {\n          var v = adj.get(u).shift();\n          // Remove back edge for undirected graph\n          adj.set(v, adj.get(v).filter(n => n !== u));\n          dfs(v);\n        }\n        path.add(u);\n      }\n      \n      dfs(startNode);\n      return path.reverse();\n    }\n    \n    // 测试示例:\n    // var result = hierholzer具有欧拉回路的图对象;\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)'
  },
  spaceComplexity: 'O(V + E)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // A simple shape for Euler Path: a house shape
    const graphData: GraphData = {
       nodes: [
         { id: 'A', x: 20, y: 70, value: 'A', state: 'default' },
         { id: 'B', x: 80, y: 70, value: 'B', state: 'default' },
         { id: 'C', x: 20, y: 35, value: 'C', state: 'default' },
         { id: 'D', x: 80, y: 35, value: 'D', state: 'default' },
         { id: 'E', x: 50, y: 15, value: 'E', state: 'default' },
       ],
       edges: [
         { id: 'A-B', source: 'A', target: 'B', state: 'default' },
         { id: 'A-C', source: 'A', target: 'C', state: 'default' },
         { id: 'B-D', source: 'B', target: 'D', state: 'default' },
         { id: 'B-C', source: 'B', target: 'C', state: 'default' },
         { id: 'C-D', source: 'C', target: 'D', state: 'default' },
         { id: 'C-E', source: 'C', target: 'E', state: 'default' },
         { id: 'D-E', source: 'D', target: 'E', state: 'default' },
       ],
       isDirected: false
    };
    
    const cloneGraph = (g: GraphData): GraphData => ({
      nodes: g.nodes.map(n => ({ ...n })),
      edges: g.edges.map(e => ({ ...e })),
      isDirected: g.isDirected
    });

    const state = cloneGraph(graphData);
    
    steps.push({
      description: '初始化图，准备寻找欧拉路径（一笔画）。这是一个经典的“房子”形状。底部的 A 和 B 有 2 条边(偶)，顶部的 E有 2 条边(偶)，中间的 C 和 D 有 4 条边和 3 条边。等一下，C有4条边(A,B,D,E)。D有3条边(B,C,E)。A有2条边。B有3条边(A,C,D)。奇度顶点为 B 和 D！满足存在欧拉路径条件（恰好2个奇度顶点）。',
      elements: [],
      graphData: cloneGraph(state)
    });

    // Let's hardcode a valid path walk to keep simulation logic simple and visual
    // Valid path: B -> A -> C -> B -> D -> E -> C -> D
    const walk = [
      { edge: 'A-B', from: 'B', to: 'A' },
      { edge: 'A-C', from: 'A', to: 'C' },
      { edge: 'B-C', from: 'C', to: 'B' },
      { edge: 'B-D', from: 'B', to: 'D' },
      { edge: 'D-E', from: 'D', to: 'E' },
      { edge: 'C-E', from: 'E', to: 'C' },
      { edge: 'C-D', from: 'C', to: 'D' },
    ];

    let current = 'B';
    state.nodes.find(n => n.id === current)!.state = 'pivot';
    
    steps.push({
      description: '因为 B 和 D 是唯二的奇度顶点，我们必须从它们其中之一开始笔画。我们在奇度节点 B 开始。',
      elements: [],
      graphData: cloneGraph(state)
    });

    walk.forEach((stepItem, idx) => {
       const node = state.nodes.find(n => n.id === stepItem.from)!;
       const nextNode = state.nodes.find(n => n.id === stepItem.to)!;
       const edge = state.edges.find(e => e.id === stepItem.edge)!;
       
       edge.state = 'comparing';
       
       steps.push({
         description: `从 ${stepItem.from} 出发，经过边前往 ${stepItem.to}。这是一笔画的第 ${idx+1} 步。`,
         elements: [],
         graphData: cloneGraph(state)
       });
       
       node.state = 'default';
       nextNode.state = 'pivot';
       // We mark visited edge as sorted to hide/mark it
       edge.state = 'sorted';
       
       steps.push({
         description: `到达节点 ${stepItem.to}。该边已被划过，记录。继续。`,
         elements: [],
         graphData: cloneGraph(state)
       });
    });

    state.nodes.find(n => n.id === current)!.state = 'default';
    state.nodes.find(n => n.id === 'D')!.state = 'sorted';

    steps.push({
      description: '全部边被恰好走过一次，没有遗漏！一笔画（欧拉路径）成功结束在奇度节点 D。',
      elements: [],
      graphData: cloneGraph(state)
    });

    return steps;
  }
};
