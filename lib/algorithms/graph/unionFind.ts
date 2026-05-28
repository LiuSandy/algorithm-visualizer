import { AlgorithmDefinition, SimulationStep, GraphData } from '../types';

export const unionFind: AlgorithmDefinition = {
  id: 'union-find',
  name: '并查集 (Union Find)',
  category: 'Graph',
  description: '并查集是一种树型的数据结构，用于处理一些不交集（Disjoint Sets）的合并及查询问题。常用于连通图、最小生成树 Kruskal 算法和求连通分支数等。',
  theory: {
    complexity: `通常都受制于 V(顶点数量) 和 E(边数量)，大多流转在 O(V+E) 到 O(V^2) 以上的网状膨胀率之间。`,
    prosCons: `✅ 优点：完美映射大千世界真实的相互关系，降维万物。
❌ 缺点：极高的数据表示成本和空间吞噬，一旦代码编写松散，循环引用图将导致瞬间内存耗尽死机。`,
    interview: `核心常常死抓在「如何防止原路回去的无线死循环」——visited记录集的灵活运用！`,
      core: "通过按秩合并（按大小挂树）和路径压缩技术，以近乎 O(1) 的平摊时间复杂度快速处理集合的合并与连通性查询。",
      analogy: "武侠小说里的江湖帮派：底层小弟互相打听是不是一家人，顺着上线一层层找到“帮主”，如果帮主是同一个人那就是自家兄弟；两个帮派合并时，直接让小帮派帮主拜大帮派帮主为大哥即可。",
      scenarios: "适用场景：动态连通性查询、网络连接状态组件计算",
      practical: "在分布式图数据库环境（如 Neo4j）的图聚类分析中，以及在微服务架构中的跨区域机器健康探活隔离域（Network Partition）划分与快速判定中应用极广。"
},
  coreSteps: [
    '初始化：把每个元素所在集合初始化为其自身。',
    '查找 (Find)：查找元素所在的集合，即根节点。可以通过路径压缩优化。',
    '合并 (Union)：将两个元素所在的集合合并为一个集合。可以通过按秩(深度)合并优化。',
    '如果两个元素的根节点相同，说明它们处于同一个连通分量中。'
  ],
  code: {
    "JavaScript": "/**\n * 并查集数据结构\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: new UnionFind(5); uf.union(0, 1)\n * 输出: uf.find(1) === uf.find(0)\n */\nclass UnionFind {\n  constructor(size) {\n    this.parent = new Array(size);\n    for (let i = 0; i < size; i++) {\n      this.parent[i] = i;\n    }\n  }\n\n  find(i) {\n    if (this.parent[i] === i) {\n      return i;\n    }\n    // 路径压缩 (Path compression)\n    return this.parent[i] = this.find(this.parent[i]);\n  }\n\n  union(i, j) {\n    let rootI = this.find(i);\n    let rootJ = this.find(j);\n    if (rootI !== rootJ) {\n      this.parent[rootI] = rootJ;\n    }\n  }\n}",
    "Python": "/**\n * 并查集数据结构\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: UnionFind(5) uf.union(0, 1)\n * 输出: uf.find(1) == uf.find(0)\n */\nclass UnionFind \n  constructor(size) \n    this.parent = Array(size)\n    for (i = 0 i < size i++) \n      this.parent[i] = i\n    \n  \n\n  find(i) \n    if (this.parent[i] == i) \n      return i\n    \n    # 路径压缩 (Path compression)\n    return this.parent[i] = this.find(this.parent[i])\n  \n\n  union(i, j) \n    rootI = this.find(i)\n    rootJ = this.find(j)\n    if (rootI != rootJ) \n      this.parent[rootI] = rootJ\n    \n  \n",
    "C++": "/**\n * 并查集数据结构\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: new UnionFind(5); uf.union(0, 1)\n * 输出: uf.find(1) === uf.find(0)\n */\nclass UnionFind {\n  constructor(size) {\n    this.parent = new Array(size);\n    for (auto i = 0; i < size; i++) {\n      this.parent[i] = i;\n    }\n  }\n\n  find(i) {\n    if (this.parent[i] === i) {\n      return i;\n    }\n    // 路径压缩 (Path compression)\n    return this.parent[i] = this.find(this.parent[i]);\n  }\n\n  union(i, j) {\n    auto rootI = this.find(i);\n    auto rootJ = this.find(j);\n    if (rootI !== rootJ) {\n      this.parent[rootI] = rootJ;\n    }\n  }\n}",
    "Java": "class Solution {\n    /**\n     * 并查集数据结构\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: new UnionFind(5); uf.union(0, 1)\n     * 输出: uf.find(1) === uf.find(0)\n     */\n    class UnionFind {\n      constructor(size) {\n        this.parent = new Array(size);\n        for (var i = 0; i < size; i++) {\n          this.parent[i] = i;\n        }\n      }\n    \n      find(i) {\n        if (this.parent[i] === i) {\n          return i;\n        }\n        // 路径压缩 (Path compression)\n        return this.parent[i] = this.find(this.parent[i]);\n      }\n    \n      union(i, j) {\n        var rootI = this.find(i);\n        var rootJ = this.find(j);\n        if (rootI !== rootJ) {\n          this.parent[rootI] = rootJ;\n        }\n      }\n    }\n}"
},
  timeComplexity: {
    best: 'O(α(n))', // Inverse Ackermann
    average: 'O(α(n))',
    worst: 'O(α(n))'
  },
  spaceComplexity: 'O(n)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // We will visualize 5 distinct nodes initially, then gradually union them.
    const graphData: GraphData = {
       nodes: [
         { id: '1', x: 20, y: 50, value: '1', state: 'default' },
         { id: '2', x: 35, y: 50, value: '2', state: 'default' },
         { id: '3', x: 50, y: 50, value: '3', state: 'default' },
         { id: '4', x: 65, y: 50, value: '4', state: 'default' },
         { id: '5', x: 80, y: 50, value: '5', state: 'default' },
       ],
       edges: [],
       isDirected: true // represent parent pointer
    };
    
    const cloneGraph = (g: GraphData): GraphData => ({
      nodes: g.nodes.map(n => ({ ...n })),
      edges: g.edges.map(e => ({ ...e })),
      isDirected: g.isDirected
    });

    const state = cloneGraph(graphData);
    
    steps.push({
      description: '初始化并查集 (MakeSet)：每个节点都是独立的集合，其父节点指向自己（图中不画出）。节点内部包含自己的值。',
      elements: [],
      graphData: cloneGraph(state)
    });

    const parent: Record<string, string> = { '1': '1', '2': '2', '3': '3', '4': '4', '5': '5' };
    
    const updateGraphLayout = () => {
       // A very simple layout arrangement based on parent hierarchy to show trees.
       // Root nodes at y=20, children at y=50, grandchildren at y=80.
       const roots = Object.keys(parent).filter(k => parent[k] === k);
       const cols = roots.length;
       
       roots.forEach((root, idx) => {
          const rootNode = state.nodes.find(n => n.id === root)!;
          rootNode.x = 10 + (80 / Math.max(1, cols - 1)) * idx;
          if (cols === 1) rootNode.x = 50;
          rootNode.y = 20;

          // Find children
          const children = Object.keys(parent).filter(k => parent[k] === root && k !== root);
          children.forEach((child, cIdx) => {
             const cNode = state.nodes.find(n => n.id === child)!;
             let offset = (cIdx - (children.length - 1) / 2) * 15;
             cNode.x = rootNode.x + offset;
             cNode.y = 60;
             
             // Granchildren (path compression usually flattens, but just in case)
             const gChildren = Object.keys(parent).filter(k => parent[k] === child && k !== child);
             gChildren.forEach((gc, gcIdx) => {
                 const gcNode = state.nodes.find(n => n.id === gc)!;
                 let goffset = (gcIdx - (gChildren.length - 1) / 2) * 10;
                 gcNode.x = cNode.x + goffset;
                 gcNode.y = 90;
             });
          });
       });
       
       state.edges = [];
       Object.keys(parent).forEach(k => {
          if (parent[k] !== k) {
             state.edges.push({
                 id: `${k}-${parent[k]}`,
                 source: k,
                 target: parent[k],
                 state: 'default',
                 isDirected: true
             });
          }
       });
    };

    const doUnion = (u: string, v: string) => {
        state.nodes.forEach(n => n.state = 'default');
        state.edges.forEach(e => e.state = 'default');
        
        const sourceNode = state.nodes.find(n => n.id === u)!;
        const targetNode = state.nodes.find(n => n.id === v)!;
        sourceNode.state = 'comparing';
        targetNode.state = 'comparing';

        steps.push({
          description: `请求合并 (Union)：尝试合并节点 ${u} 和 ${v} 所在的集合。`,
          elements: [],
          graphData: cloneGraph(state)
        });

        const rootU = parent[u]; // simple assuming flat structure initially
        const rootV = parent[v]; // ignoring find logic for pure representation here

        if (rootU !== rootV) {
           parent[rootU] = rootV;
           updateGraphLayout();
           state.nodes.find(n => n.id === u)!.state = 'default';
           state.nodes.find(n => n.id === v)!.state = 'default';
           state.nodes.find(n => n.id === rootV)!.state = 'pivot';
           
           steps.push({
              description: `【状态更新】合并成功！将 ${u} 的代表节点(${rootU}) 挂载到 ${v} 的代表节点(${rootV}) 下。`,
              elements: [],
              graphData: cloneGraph(state)
           });
        }
    };

    doUnion('1', '2');
    doUnion('3', '4');
    
    // Complex union
    state.nodes.forEach(n => n.state = 'default');
    state.nodes.find(n => n.id === '1')!.state = 'comparing';
    state.nodes.find(n => n.id === '3')!.state = 'comparing';
    steps.push({
       description: '请求合并 (Union)：尝试合并节点 1 和 3 所在的集合。先寻找它们的根节点',
       elements: [],
       graphData: cloneGraph(state)
    });
    
    state.nodes.find(n => n.id === '2')!.state = 'pivot'; // Root of 1
    state.nodes.find(n => n.id === '4')!.state = 'pivot'; // Root of 3
    steps.push({
       description: 'Find：节点 1 的根是 2，节点 3 的根是 4。',
       elements: [],
       graphData: cloneGraph(state)
    });

    parent['2'] = '4';
    updateGraphLayout();
    state.nodes.forEach(n => n.state = 'default');
    state.nodes.find(n => n.id === '4')!.state = 'sorted';

    steps.push({
       description: '将根节点 2 挂载到根节点 4 之下，两棵树完成合并。',
       elements: [],
       graphData: cloneGraph(state)
    });

    return steps;
  }
};
