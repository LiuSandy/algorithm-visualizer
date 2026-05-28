import { AlgorithmDefinition, SimulationStep, GraphData } from '../types';

export const topologicalSort: AlgorithmDefinition = {
  id: 'topological-sort',
  name: '拓扑排序 (Topological Sort)',
  category: 'Graph',
  description: '拓扑排序是对有向无环图 (DAG) 的顶点进行的一种线性排序。使得对于从顶点 u 到顶点 v 的每个有向边 uv，u 在排序中都在 v 之前。主要用于安排具有依赖关系的任务序列。',
  theory: {
    complexity: `通常都受制于 V(顶点数量) 和 E(边数量)，大多流转在 O(V+E) 到 O(V^2) 以上的网状膨胀率之间。`,
    prosCons: `✅ 优点：完美映射大千世界真实的相互关系，降维万物。
❌ 缺点：极高的数据表示成本和空间吞噬，一旦代码编写松散，循环引用图将导致瞬间内存耗尽死机。`,
    interview: `核心常常死抓在「如何防止原路回去的无线死循环」——visited记录集的灵活运用！`,
      core: "在有向无环图（DAG）中基于顶点的入度寻找一种满足所有前驱依赖关系的线性节点排序。",
      analogy: "大学选课系统：你没修完《高数一》就不让选《微积分二》，通过把没有依赖的“软柿子”课先排满，排完一门就解锁下一门。",
      scenarios: "适用场景：任务调度系统、包管理依赖分析",
      practical: "在现代前端构建工具（Webpack/Vite）、CI/CD Pipeline流水线（如 GitHub Actions 任务依赖）、微服务系统启动阶段服务拉起的顺序管控中无处不在。"
},
  coreSteps: [
    '计算图中所有节点的入度 (Indegree)。',
    '将所有入度为 0 的节点放入队列中。',
    '不断从队列中取出入度为 0 的节点 u，并将其加入排序结果。',
    '将 u 的所有相邻节点 v 的入度减 1。如果 v 的入度变为 0，将其放入队列。',
    '重复直到队列为空。如果输出的节点数少于总图节点数，说明图中存在环。'
  ],
  code: {
    "JavaScript": "/**\n * 拓扑排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [\"D\"], D: []})\n * 输出: [\"A\", \"B\", \"C\", \"D\"] (排序结果可能不唯一)\n */\nfunction topologicalSort(graph) {\n  const inDegree = {};\n  for (const node of graph.nodes) inDegree[node] = 0;\n  \n  for (const edge of graph.edges) {\n    inDegree[edge.target]++;\n  }\n  \n  const queue = [];\n  for (const node in inDegree) {\n    if (inDegree[node] === 0) queue.push(node);\n  }\n  \n  const result = [];\n  while (queue.length > 0) {\n    const u = queue.shift();\n    result.push(u);\n    \n    for (const neighbor of graph.getNeighbors(u)) {\n      inDegree[neighbor.target]--;\n      if (inDegree[neighbor.target] === 0) {\n        queue.push(neighbor.target);\n      }\n    }\n  }\n  return result;\n}\n\n// 测试示例:\n// const arr = ({A: [\"B\", \"C\"], B: [\"D\"], C: [\"D\"], D: []});\n// console.log(\"排序前:\", arr);\n// const sortedArr = topologicalSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Python": "/**\n * 拓扑排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: (A: [\"B\", \"C\"], B: [\"D\"], C: [\"D\"], D: [])\n * 输出: [\"A\", \"B\", \"C\", \"D\"] (排序结果可能不唯一)\n */\ndef topologicalSort(graph):\n  inDegree = \n  for (node of graph.nodes) inDegree[node] = 0\n  \n  for (edge of graph.edges) \n    inDegree[edge.target]++\n  \n  \n  queue = []\n  for (node in inDegree) \n    if (inDegree[node] == 0) queue.append(node)\n  \n  \n  result = []\n  while (queue.__len__() > 0) \n    u = queue.shift()\n    result.append(u)\n    \n    for (neighbor of graph.getNeighbors(u)) \n      inDegree[neighbor.target]--\n      if (inDegree[neighbor.target] == 0) \n        queue.append(neighbor.target)\n      \n    \n  \n  return result\n\n\n# 测试示例:\n# arr = (A: [\"B\", \"C\"], B: [\"D\"], C: [\"D\"], D: [])\n# console.log(\"排序前:\", arr)\n# sortedArr = topologicalSort(arr)\n# console.log(\"排序后:\", sortedArr)",
    "C++": "/**\n * 拓扑排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [\"D\"], D: []})\n * 输出: [\"A\", \"B\", \"C\", \"D\"] (排序结果可能不唯一)\n */\nauto topologicalSort(graph) {\n  auto inDegree = {};\n  for (auto node of graph.nodes) inDegree[node] = 0;\n  \n  for (auto edge of graph.edges) {\n    inDegree[edge.target]++;\n  }\n  \n  auto queue = [];\n  for (auto node in inDegree) {\n    if (inDegree[node] === 0) queue.push_back(node);\n  }\n  \n  auto result = [];\n  while (queue.size() > 0) {\n    auto u = queue.shift();\n    result.push_back(u);\n    \n    for (auto neighbor of graph.getNeighbors(u)) {\n      inDegree[neighbor.target]--;\n      if (inDegree[neighbor.target] === 0) {\n        queue.push_back(neighbor.target);\n      }\n    }\n  }\n  return result;\n}\n\n// 测试示例:\n// auto arr = ({A: [\"B\", \"C\"], B: [\"D\"], C: [\"D\"], D: []});\n// console.log(\"排序前:\", arr);\n// auto sortedArr = topologicalSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Java": "class Solution {\n    /**\n     * 拓扑排序算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ({A: [\"B\", \"C\"], B: [\"D\"], C: [\"D\"], D: []})\n     * 输出: [\"A\", \"B\", \"C\", \"D\"] (排序结果可能不唯一)\n     */\n    public static var topologicalSort(graph) {\n      var inDegree = {};\n      for (var node of graph.nodes) inDegree[node] = 0;\n      \n      for (var edge of graph.edges) {\n        inDegree[edge.target]++;\n      }\n      \n      var queue = [];\n      for (var node in inDegree) {\n        if (inDegree[node] === 0) queue.add(node);\n      }\n      \n      var result = [];\n      while (queue.length > 0) {\n        var u = queue.shift();\n        result.add(u);\n        \n        for (var neighbor of graph.getNeighbors(u)) {\n          inDegree[neighbor.target]--;\n          if (inDegree[neighbor.target] === 0) {\n            queue.add(neighbor.target);\n          }\n        }\n      }\n      return result;\n    }\n    \n    // 测试示例:\n    // var arr = ({A: [\"B\", \"C\"], B: [\"D\"], C: [\"D\"], D: []});\n    // console.log(\"排序前:\", arr);\n    // var sortedArr = topologicalSort(arr);\n    // console.log(\"排序后:\", sortedArr);\n}"
},
  timeComplexity: {
    best: 'O(V + E)',
    average: 'O(V + E)',
    worst: 'O(V + E)'
  },
  spaceComplexity: 'O(V)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // Custom DAG
    const graphData: GraphData = {
       nodes: [
         { id: '1', x: 20, y: 30, value: '1', state: 'default' },
         { id: '2', x: 20, y: 70, value: '2', state: 'default' },
         { id: '3', x: 50, y: 30, value: '3', state: 'default' },
         { id: '4', x: 50, y: 70, value: '4', state: 'default' },
         { id: '5', x: 80, y: 50, value: '5', state: 'default' },
       ],
       edges: [
         { id: '1-3', source: '1', target: '3', state: 'default', isDirected: true },
         { id: '2-4', source: '2', target: '4', state: 'default', isDirected: true },
         { id: '3-4', source: '3', target: '4', state: 'default', isDirected: true },
         { id: '3-5', source: '3', target: '5', state: 'default', isDirected: true },
         { id: '4-5', source: '4', target: '5', state: 'default', isDirected: true },
       ],
       isDirected: true
    };
    
    const cloneGraph = (g: GraphData): GraphData => ({
      nodes: g.nodes.map(n => ({ ...n })),
      edges: g.edges.map(e => ({ ...e })),
      isDirected: g.isDirected
    });

    const state = cloneGraph(graphData);
    const inDegree: Record<string, number> = {};
    state.nodes.forEach(n => inDegree[n.id] = 0);
    state.edges.forEach(e => inDegree[e.target]++);

    const updateNodeValues = () => {
       state.nodes.forEach(n => {
          n.value = `${n.id}\\n(${inDegree[n.id]})`;
       });
    };
    
    updateNodeValues();

    steps.push({
      description: '初始化拓扑排序，计算所有顶点的入度 (In-degree)。节点下方的数字即为各自的入度。',
      elements: [],
      graphData: cloneGraph(state)
    });

    const queue: string[] = [];
    state.nodes.forEach(n => {
       if (inDegree[n.id] === 0) {
          queue.push(n.id);
          n.state = 'pivot';
       }
    });

    steps.push({
      description: '将所有入度为 0 的节点 (没有前置依赖的节点) 放入候选队列。这里标记为青色。',
      elements: [],
      graphData: cloneGraph(state)
    });

    let order = 1;

    while (queue.length > 0) {
       const u = queue.shift()!;
       const node = state.nodes.find(n => n.id === u)!;
       
       node.state = 'sorted';
       node.value = `${order++}。`;
       
       // outgoing edges
       const edges = state.edges.filter(e => e.source === u);
       edges.forEach(e => e.state = 'comparing');

       steps.push({
          description: `从队列中取出节点 ${u}。它被安排在最终序列中。现在消除它发射出的所有依赖边 (入度减1)。`,
          elements: [],
          graphData: cloneGraph(state)
       });

       edges.forEach(e => {
          inDegree[e.target]--;
          e.state = 'default';
          // visually remove edge
          e.state = 'sorted'; 
       });
       
       updateNodeValues();
       
       const newZeroes: string[] = [];
       edges.forEach(e => {
          if (inDegree[e.target] === 0) {
             const tData = state.nodes.find(n => n.id === e.target)!;
             tData.state = 'pivot';
             queue.push(e.target);
             newZeroes.push(e.target);
          }
       });

       steps.push({
          description: `入度更新后，节点 ${newZeroes.length > 0 ? newZeroes.join(', ') : '无'} 入度变为 0，加入队列中。`,
          elements: [],
          graphData: cloneGraph(state)
       });
    }

    steps.push({
      description: '队列为空，所有节点按照依赖限制依次成功排序完成。',
      elements: [],
      graphData: cloneGraph(state)
    });

    return steps;
  }
};
