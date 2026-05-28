import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const redBlackTreeAlgorithm: AlgorithmDefinition = {
  id: 'redBlackTree',
  name: '红黑树 (Red-Black Tree)',
  category: 'Tree',
  description: '目标：维持二叉查找树的平衡，确保最坏情况下的查询时间仍为 O(log N)。\n原理：通过自平衡（由于节点带颜色属性，并且限定了红黑交替、黑高一致等五大性质结构），插入和删除时会触发自动调整（变色和旋转）。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "摒弃了严格的死高度平衡枷锁结构换取高度染色的抽象标记法则。其在插入删除时绝不仅仅只注重疯狂旋转以平衡层级导致高损，而更着重通过翻色改黑红的动作达成 O(log N) 可容忍度极强的大量变动极速平衡系统。",
      analogy: "这就是一家成熟公司和死板企业的区别：有紧急突发人员变动删减招新时不用死板去改各种大行政级别调岗重组导致整个大换血大楼全旋转大动干戈而是仅仅给个别人改换个名片“帽子（红变黑等色彩标注规则）”，小幅调节就能保持整体高效。",
      scenarios: "适用场景：插入且查找经常高度混合变化非常不稳定的系统核心基础库构建",
      practical: "这是你在所有基于各种服务端高级语言里各种数据存储池子的老大哥、不论是 C++ STL 的 std::map 定海神针还是 JDK 层面无数 HashMap 在巨量大红黑下升级变身演变以及诸多 epoll 内核调度池的最基础性能保底无敌大将！"
},
  coreSteps: [
    '1. 节点是红色或黑色。根是黑色。叶子(NIL)是黑色。',
    '2. 红色节点不能连续（红节点的子节点必须是黑的）。',
    '3. 从任一节点到其每个叶子的所有简单路径都包含相同数目的黑色节点。',
    '4. (Insert): 新插入的节点默认为【红色】（为了不破坏规则3）',
    '5. (Rebalance): 如果发现由于插入出现了双红冲突（违反规则2），根据叔叔节点的颜色，进行变色或 左旋/右旋 进行自我平衡。'
  ],
  code: {
    "JavaScript": "// C++ / Java / JS 伪代码\nclass Node {\n  constructor(val) {\n    this.val = val;\n    this.color = 'RED'; // 新插入节点必为红色\n    this.left = null;\n    this.right = null;\n    this.parent = null;\n  }\n}\n\nfunction insertAndBalance(root, node) {\n  // 1. 标准 BST 插入\n  bstInsert(root, node);\n  \n  // 2. 自下而上修复（双红属性）\n  while (node.parent && node.parent.color === 'RED') {\n    let uncle = getUncle(node);\n    if (uncle && uncle.color === 'RED') {\n       // 情况 1: 叔叔也是红的 -> 父亲叔叔变黑，爷爷变红，向上推进\n       node.parent.color = 'BLACK';\n       uncle.color = 'BLACK';\n       node.parent.parent.color = 'RED';\n       node = node.parent.parent;\n    } else {\n       // 情况 2/3: 叔叔是黑的 -> 进行变色和旋转 (左旋 / 右旋)\n       rotateFix(node); \n       break;\n    }\n  }\n  root.color = 'BLACK'; // 根永远是黑的\n}",
    "Python": "# C++ / Java / JS 伪代码\nclass Node \n  constructor(val) \n    this.val = val\n    this.color = 'RED' # 新插入节点必为红色\n    this.left = null\n    this.right = null\n    this.parent = null\n  \n\n\ndef insertAndBalance(root, node):\n  # 1. 标准 BST 插入\n  bstInsert(root, node)\n  \n  # 2. 自下而上修复（双红属性）\n  while (node.parent and node.parent.color == 'RED') \n    uncle = getUncle(node)\n    if (uncle and uncle.color == 'RED') \n       # 情况 1: 叔叔也是红的 -> 父亲叔叔变黑，爷爷变红，向上推进\n       node.parent.color = 'BLACK'\n       uncle.color = 'BLACK'\n       node.parent.parent.color = 'RED'\n       node = node.parent.parent\n     else \n       # 情况 2/3: 叔叔是黑的 -> 进行变色和旋转 (左旋 / 右旋)\n       rotateFix(node) \n       break\n    \n  \n  root.color = 'BLACK' # 根永远是黑的\n",
    "C++": "// C++ / Java / JS 伪代码\nclass Node {\n  constructor(val) {\n    this.val = val;\n    this.color = 'RED'; // 新插入节点必为红色\n    this.left = null;\n    this.right = null;\n    this.parent = null;\n  }\n}\n\nauto insertAndBalance(root, node) {\n  // 1. 标准 BST 插入\n  bstInsert(root, node);\n  \n  // 2. 自下而上修复（双红属性）\n  while (node.parent && node.parent.color === 'RED') {\n    auto uncle = getUncle(node);\n    if (uncle && uncle.color === 'RED') {\n       // 情况 1: 叔叔也是红的 -> 父亲叔叔变黑，爷爷变红，向上推进\n       node.parent.color = 'BLACK';\n       uncle.color = 'BLACK';\n       node.parent.parent.color = 'RED';\n       node = node.parent.parent;\n    } else {\n       // 情况 2/3: 叔叔是黑的 -> 进行变色和旋转 (左旋 / 右旋)\n       rotateFix(node); \n       break;\n    }\n  }\n  root.color = 'BLACK'; // 根永远是黑的\n}",
    "Java": "class Solution {\n    // C++ / Java / JS 伪代码\n    class Node {\n      constructor(val) {\n        this.val = val;\n        this.color = 'RED'; // 新插入节点必为红色\n        this.left = null;\n        this.right = null;\n        this.parent = null;\n      }\n    }\n    \n    public static var insertAndBalance(root, node) {\n      // 1. 标准 BST 插入\n      bstInsert(root, node);\n      \n      // 2. 自下而上修复（双红属性）\n      while (node.parent && node.parent.color === 'RED') {\n        var uncle = getUncle(node);\n        if (uncle && uncle.color === 'RED') {\n           // 情况 1: 叔叔也是红的 -> 父亲叔叔变黑，爷爷变红，向上推进\n           node.parent.color = 'BLACK';\n           uncle.color = 'BLACK';\n           node.parent.parent.color = 'RED';\n           node = node.parent.parent;\n        } else {\n           // 情况 2/3: 叔叔是黑的 -> 进行变色和旋转 (左旋 / 右旋)\n           rotateFix(node); \n           break;\n        }\n      }\n      root.color = 'BLACK'; // 根永远是黑的\n    }\n}"
},
  timeComplexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(log n)'
  },
  spaceComplexity: 'O(n)',
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // We will hardcode a specific insertion case that causes a rotation and color swap.
    // Insert: 10, then 20, then 30 (causing a straight line right, prompting left-rotate)
    
    let rootX = 50, rootY = 20;
    
    let baseNodes: GraphNode[] = [];
    let baseEdges: GraphEdge[] = [];
    
    const getGraphState = (nodeOverrides: Record<string, string>|null = null): GraphData => {
        return {
            nodes: baseNodes.map(n => {
                let s = n.state;
                if (nodeOverrides && nodeOverrides[n.id]) {
                     // For red black tree, we will abuse state colors.
                     // sorted -> Black (greenish, we can consider default is Black but let's use standard states)
                     // visited -> Black
                     // swapping -> Red
                     s = nodeOverrides[n.id] as any;
                }
                return {...n, state: s};
            }),
            edges: baseEdges.map(e => ({...e})),
            isDirected: true
        }
    };
    
    // RED will be 'swapping', BLACK will be 'visited'
    steps.push({
        description: `初始化空红黑树。准备插入第一个节点 10。默认新节点必须为红色，但放入后由于它是根节点，被硬性变为黑色。`,
        activeLines: [15],
        elements: [],
        graphData: { nodes: [], edges: [], isDirected: true },
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 1 }
    });
    
    baseNodes.push({ id: '10', value: '10', x: rootX, y: rootY, state: 'visited' }); // visited = black roughly visually or we can use another color. Let's use 'visited' as Black, 'swapping' as Red.
    steps.push({
        description: `【插入 10】根节点。颜色标记为黑色 (在此演示中，暗灰色代表黑色，紫色代表红色)。`,
        activeLines: [32],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 2 }
    });

    baseNodes.push({ id: '20', value: '20', x: rootX + 15, y: rootY + 20, state: 'swapping' }); // swapping = red
    baseEdges.push({ id: 'e10-20', source: '10', target: '20', state: 'default', isDirected: true });
    
    steps.push({
        description: `【插入 20】它大于 10，所以挂在其右侧。新插入节点规定均为红色。此时：红色的父亲是黑色，没有违规，不需要调整。`,
        activeLines: [14],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 1, swaps: 0, arrayAccesses: 0, operations: 3 }
    });
    
    baseNodes.push({ id: '30', value: '30', x: rootX + 30, y: rootY + 40, state: 'swapping' }); 
    baseEdges.push({ id: 'e20-30', source: '20', target: '30', state: 'default', isDirected: true });
    
    steps.push({
        description: `【插入 30】挂在 20 的右侧。30 也是红色。\n【警告】出现违规 (Double Red)！20 和 30 都是红色的！触发红黑树自平衡。`,
        activeLines: [18],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 2, swaps: 0, arrayAccesses: 0, operations: 4 }
    });
    
    steps.push({
        description: `检查 30 的叔叔节点 (10 的左子节点)，叔叔为空，按黑色处理。\n触发情况2/3：发生旋转！将会以 10 和 20 的轴进行左旋 (Left Rotate)。`,
        activeLines: [26, 27],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 3, swaps: 1, arrayAccesses: 0, operations: 5 }
    });
    
    // Perform rotation visual
    baseNodes = [
        { id: '20', value: '20', x: rootX, y: rootY, state: 'visited' },
        { id: '10', value: '10', x: rootX - 15, y: rootY + 20, state: 'swapping' },
        { id: '30', value: '30', x: rootX + 15, y: rootY + 20, state: 'swapping' }
    ];
    baseEdges = [
        { id: 'e20-10', source: '20', target: '10', state: 'default', isDirected: true },
        { id: 'e20-30', source: '20', target: '30', state: 'default', isDirected: true }
    ];
    
    steps.push({
        description: `左旋并调整颜色完成！\n20 成为新根节点（变为黑），10 变为 20 的左孩子（保留/变为红），30 继续做右孩子（红）。红黑树重归极致平衡！`,
        activeLines: [32],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 3, swaps: 2, arrayAccesses: 0, operations: 8 }
    });

    return steps;
  }
};
