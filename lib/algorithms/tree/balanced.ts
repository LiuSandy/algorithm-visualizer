import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const treeCheckBalanced: AlgorithmDefinition = {
  id: 'tree-checkbalanced',
  name: '平衡二叉树检测 (Balanced Binary Tree)',
  category: 'Tree',
  description: '判断一棵二叉树是否是高度平衡的二叉树。一棵高度平衡二叉树定义为：一个二叉树每个节点的左右两个子树的高度差的绝对值不超过 1。该算法常使用后序遍历，自底向上计算高度，一旦发现不平衡即提前返回。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "利用自底向上的后序深度探索访问模式，返回时层层核实每一个枝节点自身的左右分叉高度差距是否合格（<=1），如果违规立刻把警报向上逐层暴击直逼根部。",
      analogy: "国家级别的建筑安检机构查楼房：去最高处的墙砖问一圈查有没有裂痕偏差，每一层的工长负责量一下左右跨度上报。只有当查遍到底发现哪里有个柱子歪了马上上报最高总指挥部拉下黑名单。",
      scenarios: "适用场景：平衡性质结构预检",
      practical: "用在分布式系统图模型中对于热点分裂负载分压均衡性做深度评估反馈（评估物理路由集群中的业务分区部署分布是否极度失衡预警探槽机制）。"
},
  coreSteps: [
    '递归计算每一个节点的左右子树高度。',
    '若子树不平衡或高度差超过1，认为当前子树不平衡。',
    '自底向上向上传递结果。'
  ],
  code: {
    "JavaScript": "/**\n * 平衡二叉树检测\n * 采用“自底向上”的后序遍历策略\n */\nfunction isBalanced(root) {\n  function height(node) {\n    if (!node) return 0;\n    \n    let leftHeight = height(node.left);\n    if (leftHeight === -1) return -1; // 左子树不平衡\n    \n    let rightHeight = height(node.right);\n    if (rightHeight === -1) return -1; // 右子树不平衡\n    \n    if (Math.abs(leftHeight - rightHeight) > 1) {\n      return -1; // 当前节点不平衡\n    }\n    return Math.max(leftHeight, rightHeight) + 1; // 返回当前树的高度\n  }\n  \n  return height(root) !== -1;\n}",
    "Python": "/**\n * 平衡二叉树检测\n * 采用“自底向上”的后序遍历策略\n */\ndef isBalanced(root):\n  def height(node):\n    if (!node) return 0\n    \n    leftHeight = height(node.left)\n    if (leftHeight == -1) return -1 # 左子树不平衡\n    \n    rightHeight = height(node.right)\n    if (rightHeight == -1) return -1 # 右子树不平衡\n    \n    if (abs(leftHeight - rightHeight) > 1) \n      return -1 # 当前节点不平衡\n    \n    return max(leftHeight, rightHeight) + 1 # 返回当前树的高度\n  \n  \n  return height(root) != -1\n",
    "C++": "/**\n * 平衡二叉树检测\n * 采用“自底向上”的后序遍历策略\n */\nauto isBalanced(root) {\n  auto height(node) {\n    if (!node) return 0;\n    \n    auto leftHeight = height(node.left);\n    if (leftHeight === -1) return -1; // 左子树不平衡\n    \n    auto rightHeight = height(node.right);\n    if (rightHeight === -1) return -1; // 右子树不平衡\n    \n    if (std::abs(leftHeight - rightHeight) > 1) {\n      return -1; // 当前节点不平衡\n    }\n    return std::max(leftHeight, rightHeight) + 1; // 返回当前树的高度\n  }\n  \n  return height(root) !== -1;\n}",
    "Java": "class Solution {\n    /**\n     * 平衡二叉树检测\n     * 采用“自底向上”的后序遍历策略\n     */\n    public static var isBalanced(root) {\n      public static var height(node) {\n        if (!node) return 0;\n        \n        var leftHeight = height(node.left);\n        if (leftHeight === -1) return -1; // 左子树不平衡\n        \n        var rightHeight = height(node.right);\n        if (rightHeight === -1) return -1; // 右子树不平衡\n        \n        if (Math.abs(leftHeight - rightHeight) > 1) {\n          return -1; // 当前节点不平衡\n        }\n        return Math.max(leftHeight, rightHeight) + 1; // 返回当前树的高度\n      }\n      \n      return height(root) !== -1;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(h) - h为二叉树的高度',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // We will build an unbalanced tree so it's more interesting
    const nodes: GraphNode[] = [
      { id: '1', value: '1', x: 50, y: 10, state: 'default' },
      { id: '2', value: '2', x: 30, y: 30, state: 'default' },
      { id: '3', value: '3', x: 70, y: 30, state: 'default' },
      { id: '4', value: '4', x: 20, y: 50, state: 'default' },
      { id: '5', value: '5', x: 10, y: 70, state: 'default' }, // Makes left side unbalanced
    ];
    
    const edges: GraphEdge[] = [
      { id: 'e1-2', source: '1', target: '2', state: 'default' },
      { id: 'e1-3', source: '1', target: '3', state: 'default' },
      { id: 'e2-4', source: '2', target: '4', state: 'default' },
      { id: 'e4-5', source: '4', target: '5', state: 'default' },
    ];

    const getGraphState = (overrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}, edgeOverrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}): GraphData => {
        return {
            nodes: nodes.map(n => ({ ...n, state: (overrides[n.id] as any) || n.state })),
            edges: edges.map(e => ({ ...e, state: (edgeOverrides[e.id] as any) || e.state })),
            isDirected: true
        };
    };

    steps.push({
      description: '初始化二叉树，准备检测是否为平衡二叉树',
      activeLines: [22], // return height(root) !== -1
      elements: [],
      graphData: getGraphState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const nodeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const edgeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    let operations = 0;

    const tree = {
        '1': { left: '2', right: '3' },
        '2': { left: '4', right: null },
        '3': { left: null, right: null },
        '4': { left: '5', right: null },
        '5': { left: null, right: null }
    };

    const traverse = (nodeId: string | null): number => {
        if (!nodeId) {
            return 0; // null height
        }

        operations++;
        nodeStates[nodeId] = 'comparing';
        steps.push({
            description: `计算节点 ${nodeId} 的高度，首先递归计算左子树`,
            activeLines: [9], // leftHeight
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        const children = tree[nodeId as keyof typeof tree];
        if (children && children.left) {
            edgeStates[`e${nodeId}-${children.left}`] = 'comparing';
        }
        let leftHeight = traverse(children?.left || null);
        
        if (leftHeight === -1) {
            steps.push({
                description: `发现节点 ${nodeId} 的左子树已经不平衡，直接返回 -1`,
                activeLines: [10],
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            nodeStates[nodeId] = 'visited';
            return -1;
        }

        steps.push({
            description: `节点 ${nodeId} 左子树高度返回 ${leftHeight}，接着递归计算右子树`,
            activeLines: [12], // rightHeight
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        if (children && children.right) {
            edgeStates[`e${nodeId}-${children.right}`] = 'comparing';
        }
        let rightHeight = traverse(children?.right || null);

        if (rightHeight === -1) {
             // simplified for visualization
            return -1;
        }

        steps.push({
            description: `节点 ${nodeId} 左右子树高度分别为 左:${leftHeight}, 右:${rightHeight}`,
            activeLines: [15, 16], // Math.abs
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        let currentHeight = 0;
        if (Math.abs(leftHeight - rightHeight) > 1) {
            steps.push({
                description: `【高度差 > 1】节点 ${nodeId} 失衡！返回 -1`,
                activeLines: [16, 17],
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            nodeStates[nodeId] = 'visited';
            return -1;
        } else {
            currentHeight = Math.max(leftHeight, rightHeight) + 1;
            steps.push({
                description: `节点 ${nodeId} 平衡，向上返回其高度 ${currentHeight}`,
                activeLines: [19],
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            nodeStates[nodeId] = 'visited';
            return currentHeight;
        }
    };

    const finalRes = traverse('1');

    steps.push({
      description: `检测结束，${finalRes !== -1 ? '是平衡二叉树' : '不是平衡二叉树'}`,
      activeLines: [22],
      elements: [],
      graphData: getGraphState(nodeStates, edgeStates),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
