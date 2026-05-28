import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const bPlusTreeAlgorithm: AlgorithmDefinition = {
  id: 'bPlusTree',
  name: 'B+ 树 (B+ Tree)',
  category: 'Tree',
  description: '目标：实现对磁盘/外存友好的高速查询结构。关系型数据库 (如 MySQL InnoDB) 索引结构的标准配置。\n原理：所有数据都保存在叶子节点，并在叶子节点之间挂载链表，方便极速区间查询（例如 id BETWEEN 1 AND 100）。非叶子节点充当纯粹的路由枢纽。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "所有极具意义的实际数据载体仅只生存在被链表强串联起来最底层的叶子结点上，内部的纯分支只作为指路灯塔，打造出矮化到让人不可思议的多叉平衡巨树体系。",
      analogy: "大型超市库房体系地图：一楼前台（根节点）绝对只放着各个超级仓库（内部节点）的主门牌大号索引；不论查哪件商品都必然最后落实走到具体的长长的货架排（最底端带轮子链表的叶子排）去拿货。",
      scenarios: "适用场景：HDD传统硬盘及SDD现代快存储海量索引数据库",
      practical: "毫不夸张地说，它几乎撑起了全球金融体系业务及互联网的命脉架构。其天然适配现代系统磁盘扇区读写与缓存极少访问块大小的性质使得它成为 MySQL (InnoDB) 关系型大数据库核心默认存储架构的无上王者标准。"
},
  coreSteps: [
    '1. 拥有一个阶数 m（每个内部节点最多包含 m 个子节点，m-1 个键值）。',
    '2. 数据仅存储在最底层的叶子节点中。非叶子节点只存储边界 Key 作为路由索引。',
    '3. (Insert): 首先找个合适的叶子节点放入，如果该叶节点满了（容量超标），进行分裂。',
    '4. (Split): 分裂时，将中间键推到父节点。如果父满了，继续向上层递归分裂，直至增加树高。',
    '5. (Range Query): 查询起始值找到特定叶子节点后，顺着叶子节点之间的横向指针（双向链表）直接读出区间。'
  ],
  code: {
    "JavaScript": "// B+树的高度往往只有 3~4层，却能装载几千万条数据\nclass BPlusTreeNode {\n  constructor(isLeaf = false) {\n    this.isLeaf = isLeaf;\n    this.keys = [];     // 存放路由键或真实键\n    this.children = []; // 若内部节点存放儿子指针，若叶节点可能放 values\n    this.next = null;   // 叶子节点专用的横向单向/双向链针\n  }\n}\n// 搜索伪代码\nfunction search(root, target) {\n  let curr = root;\n  // 1. 从顶部沿着路由下降到底部叶子\n  while (!curr.isLeaf) {\n    let i = 0;\n    while (i < curr.keys.length && target > curr.keys[i]) {\n      i++;\n    }\n    curr = curr.children[i];\n  }\n  // 2. 到了叶子之后返回精准查找结果\n  for (let i = 0; i < curr.keys.length; i++) {\n    if (curr.keys[i] === target) return true; // (带出数据)\n  }\n  return false;\n}",
    "Python": "# B+树的高度往往只有 3~4层，却能装载几千万条数据\nclass BPlusTreeNode \n  constructor(isLeaf = false) \n    this.isLeaf = isLeaf\n    this.keys = []     # 存放路由键或真实键\n    this.children = [] # 若内部节点存放儿子指针，若叶节点可能放 values\n    this.next = null   # 叶子节点专用的横向单向/双向链针\n  \n\n# 搜索伪代码\ndef search(root, target):\n  curr = root\n  # 1. 从顶部沿着路由下降到底部叶子\n  while (!curr.isLeaf) \n    i = 0\n    while (i < curr.keys.__len__() and target > curr.keys[i]) \n      i++\n    \n    curr = curr.children[i]\n  \n  # 2. 到了叶子之后返回精准查找结果\n  for (i = 0 i < curr.keys.__len__() i++) \n    if (curr.keys[i] == target) return true # (带出数据)\n  \n  return false\n",
    "C++": "// B+树的高度往往只有 3~4层，却能装载几千万条数据\nclass BPlusTreeNode {\n  constructor(isLeaf = false) {\n    this.isLeaf = isLeaf;\n    this.keys = [];     // 存放路由键或真实键\n    this.children = []; // 若内部节点存放儿子指针，若叶节点可能放 values\n    this.next = null;   // 叶子节点专用的横向单向/双向链针\n  }\n}\n// 搜索伪代码\nauto search(root, target) {\n  auto curr = root;\n  // 1. 从顶部沿着路由下降到底部叶子\n  while (!curr.isLeaf) {\n    auto i = 0;\n    while (i < curr.keys.size() && target > curr.keys[i]) {\n      i++;\n    }\n    curr = curr.children[i];\n  }\n  // 2. 到了叶子之后返回精准查找结果\n  for (auto i = 0; i < curr.keys.size(); i++) {\n    if (curr.keys[i] === target) return true; // (带出数据)\n  }\n  return false;\n}",
    "Java": "class Solution {\n    // B+树的高度往往只有 3~4层，却能装载几千万条数据\n    class BPlusTreeNode {\n      constructor(isLeaf = false) {\n        this.isLeaf = isLeaf;\n        this.keys = [];     // 存放路由键或真实键\n        this.children = []; // 若内部节点存放儿子指针，若叶节点可能放 values\n        this.next = null;   // 叶子节点专用的横向单向/双向链针\n      }\n    }\n    // 搜索伪代码\n    public static var search(root, target) {\n      var curr = root;\n      // 1. 从顶部沿着路由下降到底部叶子\n      while (!curr.isLeaf) {\n        var i = 0;\n        while (i < curr.keys.length && target > curr.keys[i]) {\n          i++;\n        }\n        curr = curr.children[i];\n      }\n      // 2. 到了叶子之后返回精准查找结果\n      for (var i = 0; i < curr.keys.length; i++) {\n        if (curr.keys[i] === target) return true; // (带出数据)\n      }\n      return false;\n    }\n}"
},
  timeComplexity: {
    best: 'O(log_m(n))',
    average: 'O(log_m(n))',
    worst: 'O(log_m(n))'
  },
  spaceComplexity: 'O(n) - 极高的数据密度',
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // Abstract static layout of a B+ tree
    // Root: [20]
    // Level 1: [10], [30]
    // Leaf Level: [1, 5, 8], [15, 18], [25, 29], [32, 40]
    // Leaves are connected to each other
    
    let nodes: GraphNode[] = [];
    let edges: GraphEdge[] = [];
    
    // Create UI graph
    nodes.push({ id: 'r1', value: '[ 20 ]', x: 50, y: 10, state: 'default' });
    
    nodes.push({ id: 'i1', value: '[ 10 ]', x: 30, y: 40, state: 'default' });
    nodes.push({ id: 'i2', value: '[ 30 ]', x: 70, y: 40, state: 'default' });
    
    nodes.push({ id: 'l1', value: '[1, 5, 8]', x: 10, y: 80, state: 'default' });
    nodes.push({ id: 'l2', value: '[15, 18]', x: 35, y: 80, state: 'default' });
    nodes.push({ id: 'l3', value: '[25, 29]', x: 65, y: 80, state: 'default' });
    nodes.push({ id: 'l4', value: '[32, 40]', x: 90, y: 80, state: 'default' });
    
    // Tree Edges
    edges.push({ id: 'e-r1-i1', source: 'r1', target: 'i1', state: 'default', isDirected: true });
    edges.push({ id: 'e-r1-i2', source: 'r1', target: 'i2', state: 'default', isDirected: true });
    
    edges.push({ id: 'e-i1-l1', source: 'i1', target: 'l1', state: 'default', isDirected: true });
    edges.push({ id: 'e-i1-l2', source: 'i1', target: 'l2', state: 'default', isDirected: true });
    
    edges.push({ id: 'e-i2-l3', source: 'i2', target: 'l3', state: 'default', isDirected: true });
    edges.push({ id: 'e-i2-l4', source: 'i2', target: 'l4', state: 'default', isDirected: true });
    
    // Leaf Edges (Linked List)
    edges.push({ id: 'e-l1-l2', source: 'l1', target: 'l2', state: 'visited', isDirected: true }); // Use alternate color
    edges.push({ id: 'e-l2-l3', source: 'l2', target: 'l3', state: 'visited', isDirected: true });
    edges.push({ id: 'e-l3-l4', source: 'l3', target: 'l4', state: 'visited', isDirected: true });

    const getGraphState = (nodeOverrides: Record<string, string>|null = null): GraphData => {
        return {
            nodes: nodes.map(n => ({...n, state: (nodeOverrides && nodeOverrides[n.id] as any) || n.state})),
            edges: edges.map(e => ({...e})),
            isDirected: true
        }
    };
    
    steps.push({
        description: `这是一棵极度精简的 MySQL B+ 树索引结构（方块代表节点，内含不同的 Key）。\n最显眼的特点在于：底层叶子节点首尾相连成链表（灰色箭头）。`,
        activeLines: [2,3,4,5,6],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });
    
    steps.push({
        description: `【演示范围查询】：SELECT * WHERE id >= 15 AND id <= 35;\n开始从根部路由寻找起跑点 15。`,
        activeLines: [9,10,11],
        elements: [],
        graphData: getGraphState({'r1': 'highlight'}),
        metrics: { comparisons: 1, swaps: 0, arrayAccesses: 0, operations: 1 }
    });
    
    steps.push({
        description: `在根节点，15 小于 20，因此向左走。`,
        activeLines: [15,16,17],
        elements: [],
        graphData: getGraphState({'r1': 'visited', 'i1': 'highlight'}),
        metrics: { comparisons: 2, swaps: 0, arrayAccesses: 0, operations: 2 }
    });
    
    steps.push({
        description: `在中间层，15 大于内部路由边界 10，所以走向其右侧指针，落向正确的子叶子块。`,
        activeLines: [15,16,17],
        elements: [],
        graphData: getGraphState({'r1': 'default', 'i1': 'visited', 'l2': 'highlight'}),
        metrics: { comparisons: 3, swaps: 0, arrayAccesses: 0, operations: 3 }
    });
    
    steps.push({
        description: `【范围扫表开始！】成功落在底层页 \`l2 [15, 18]\`。命中左端点 15，接下来我们已经【不需要回到顶层】查找 35 了。`,
        activeLines: [20,21],
        elements: [],
        graphData: getGraphState({'l2': 'sorted'}),
        metrics: { comparisons: 3, swaps: 0, arrayAccesses: 0, operations: 4 }
    });
    
    steps.push({
        description: `得益于底层链表结构，我们顺着底层指针光速横向向右扫描，直接收集相邻数据...\n扫描经过 \`[25, 29]\`。`,
        activeLines: [22],
        elements: [],
        graphData: getGraphState({'l2': 'sorted', 'l3': 'sorted'}),
        metrics: { comparisons: 4, swaps: 0, arrayAccesses: 0, operations: 5 }
    });
    
    steps.push({
        description: `继续横扫，最终来到 \`[32, 40]\`。遇到大于 35 的 40 数据点，即刻停止！提取 [15...32] 全部数据。\n这就是 MySQL InnoDB 引擎极速应对 BETWEEN/范围查询 的核心武器！`,
        activeLines: [24],
        elements: [],
        graphData: getGraphState({'l2': 'sorted', 'l3': 'sorted', 'l4': 'sorted'}),
        metrics: { comparisons: 5, swaps: 0, arrayAccesses: 0, operations: 6 }
    });

    return steps;
  }
};
