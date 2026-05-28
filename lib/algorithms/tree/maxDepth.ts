import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const treeMaxDepth: AlgorithmDefinition = {
  id: 'tree-maxdepth',
  name: '二叉树深度 (Maximum Depth)',
  category: 'Tree',
  description: '给定一个二叉树，找出其最大深度。二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。常通过递归（后序遍历思想）求得：max(左子树深度, 右子树深度) + 1。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "在下钻遍历途中执行绝对比较反馈。每个自节点被拜访后再以本身高度结果通过 + 1 的反馈返回给长辈；只要上级树杈接收两边分叉高度后挑选最大的记录也就是当前长树之最。",
      analogy: "你要测量一口巨粗且分了无穷多小洞井的地下溶洞有多深，你只需要派无数个无人机顺洞飞进去，每一个岔路口分别飞一架并上报谁飞得久；最终从总口那儿汇总到的最常数据加一就是到底极深距。",
      scenarios: "适用场景：评估架构嵌套极限异常深度判定限制",
      practical: "在高并发云数据库（诸如 Redis JSON或ElasticSearch中检测）用以识别由多阶级复杂的冗余死循环生成请求导致文档被注入了可怕无限超长巨大子节点结构的预筛选熔断机制护航。"
},
  coreSteps: [
    '递归计算左子树深度。',
    '递归计算右子树深度。',
    '当前树的深度 = max(左深度, 右深度) + 1。'
  ],
  code: {
    "JavaScript": "/**\n * 二叉树最大深度\n * 输入: root = [3,9,20,null,null,15,7]\n * 输出: 3\n */\nfunction maxDepth(root) {\n  if (!root) {\n    return 0;\n  }\n  \n  const leftDepth = maxDepth(root.left);\n  const rightDepth = maxDepth(root.right);\n  \n  return Math.max(leftDepth, rightDepth) + 1;\n}",
    "Python": "/**\n * 二叉树最大深度\n * 输入: root = [3,9,20,null,null,15,7]\n * 输出: 3\n */\ndef maxDepth(root):\n  if (!root) \n    return 0\n  \n  \n  leftDepth = maxDepth(root.left)\n  rightDepth = maxDepth(root.right)\n  \n  return max(leftDepth, rightDepth) + 1\n",
    "C++": "/**\n * 二叉树最大深度\n * 输入: root = [3,9,20,null,null,15,7]\n * 输出: 3\n */\nauto maxDepth(root) {\n  if (!root) {\n    return 0;\n  }\n  \n  auto leftDepth = maxDepth(root.left);\n  auto rightDepth = maxDepth(root.right);\n  \n  return std::max(leftDepth, rightDepth) + 1;\n}",
    "Java": "class Solution {\n    /**\n     * 二叉树最大深度\n     * 输入: root = [3,9,20,null,null,15,7]\n     * 输出: 3\n     */\n    public static var maxDepth(root) {\n      if (!root) {\n        return 0;\n      }\n      \n      var leftDepth = maxDepth(root.left);\n      var rightDepth = maxDepth(root.right);\n      \n      return Math.max(leftDepth, rightDepth) + 1;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(h) - 递归栈最大深度',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    const nodes: GraphNode[] = [
      { id: '1', value: '1', x: 50, y: 10, state: 'default' },
      { id: '2', value: '2', x: 30, y: 30, state: 'default' },
      { id: '3', value: '3', x: 70, y: 30, state: 'default' },
      { id: '4', value: '4', x: 60, y: 50, state: 'default' },
      { id: '5', value: '5', x: 80, y: 50, state: 'default' },
      { id: '6', value: '6', x: 55, y: 70, state: 'default' },
    ];
    
    const edges: GraphEdge[] = [
      { id: 'e1-2', source: '1', target: '2', state: 'default' },
      { id: 'e1-3', source: '1', target: '3', state: 'default' },
      { id: 'e3-4', source: '3', target: '4', state: 'default' },
      { id: 'e3-5', source: '3', target: '5', state: 'default' },
      { id: 'e4-6', source: '4', target: '6', state: 'default' },
    ];

    const getGraphState = (overrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}, edgeOverrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}): GraphData => {
        return {
            nodes: nodes.map(n => ({ ...n, state: (overrides[n.id] as any) || n.state })),
            edges: edges.map(e => ({ ...e, state: (edgeOverrides[e.id] as any) || e.state })),
            isDirected: true
        };
    };

    steps.push({
      description: '初始化二叉树，准备计算最大深度',
      activeLines: [],
      elements: [],
      graphData: getGraphState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const nodeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const edgeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    let operations = 0;

    const tree = {
        '1': { left: '2', right: '3' },
        '2': { left: null, right: null },
        '3': { left: '4', right: '5' },
        '4': { left: '6', right: null },
        '5': { left: null, right: null },
        '6': { left: null, right: null }
    };

    const traverse = (nodeId: string | null): number => {
        if (!nodeId) {
            return 0; // null height
        }

        operations++;
        nodeStates[nodeId] = 'comparing';
        steps.push({
            description: `访问节点 ${nodeId}，递归获取左子树深度`,
            activeLines: [11], // leftDepth
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        const children = tree[nodeId as keyof typeof tree];
        if (children && children.left) edgeStates[`e${nodeId}-${children.left}`] = 'comparing';
        let leftDepth = traverse(children?.left || null);

        steps.push({
            description: `节点 ${nodeId} 左子树深度为 ${leftDepth}，接着递归获取右子树深度`,
            activeLines: [12], // rightDepth
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        if (children && children.right) edgeStates[`e${nodeId}-${children.right}`] = 'comparing';
        let rightDepth = traverse(children?.right || null);

        let currentDepth = Math.max(leftDepth, rightDepth) + 1;
        steps.push({
            description: `节点 ${nodeId} 左深度 ${leftDepth}，右深度 ${rightDepth}，向上一层返回 max(${leftDepth},${rightDepth}) + 1 = ${currentDepth}`,
            activeLines: [14], // Math.max
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        nodeStates[nodeId] = 'visited';
        return currentDepth;
    };

    const depth = traverse('1');

    steps.push({
      description: `计算完成，该二叉树的最大深度为 ${depth}`,
      activeLines: [],
      elements: [],
      graphData: getGraphState(nodeStates, edgeStates),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
