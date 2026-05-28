import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const treePostorder: AlgorithmDefinition = {
  id: 'tree-postorder',
  name: '二叉树后序遍历 (Post-order)',
  category: 'Tree',
  description: '后序遍历是二叉树遍历的一种，也叫做后根遍历，可记做左右根。首先遍历左子树，然后遍历右子树，最后访问根结点。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "秉承非常冷酷坚决的法则将左右分叉节点悉数扫清完本并从树底退回来最后才执行清理抹杀处理属于该层的长辈级别，即先破枝头残叶最后才连根拔起该干。",
      analogy: "你要在一个游戏里拆解摧毁一株邪恶大树的系统核心大树。你绝对不可能先从劈断巨大的主树根开始导致树砸死你。必定是找手下把两侧的左树干和右树干全部先砍光清干净，最终最后再回到了解主树干的狗命完成终结。",
      scenarios: "适用场景：嵌套销毁组件树节点释放管理以及解析RPN式计算",
      practical: "这是所有底层大型资源管理器系统比如 JVM 垃圾收集（GC标记回收机制），或者React 组件树在虚拟底架被强制大片摧毁/下线析构 (Unmount Element Resource Lifecycle) 回收阶段必定无形中绝对遵从的保平安清除顺序流程基础！"
},
  coreSteps: [
    '对左子树进行后序遍历。',
    '对右子树进行后序遍历。',
    '访问根节点。'
  ],
  code: {
    "JavaScript": "/**\n * 二叉树后序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [3,2,1]\n */\nfunction postorderTraversal(root) {\n  const result = [];\n  function traverse(node) {\n    if (!node) return;\n    traverse(node.left);   // 左子树\n    traverse(node.right);  // 右子树\n    result.push(node.val); // 访问根\n  }\n  traverse(root);\n  return result;\n}",
    "Python": "/**\n * 二叉树后序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [3,2,1]\n */\ndef postorderTraversal(root):\n  result = []\n  def traverse(node):\n    if (!node) return\n    traverse(node.left)   # 左子树\n    traverse(node.right)  # 右子树\n    result.append(node.val) # 访问根\n  \n  traverse(root)\n  return result\n",
    "C++": "/**\n * 二叉树后序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [3,2,1]\n */\nauto postorderTraversal(root) {\n  auto result = [];\n  auto traverse(node) {\n    if (!node) return;\n    traverse(node.left);   // 左子树\n    traverse(node.right);  // 右子树\n    result.push_back(node.val); // 访问根\n  }\n  traverse(root);\n  return result;\n}",
    "Java": "class Solution {\n    /**\n     * 二叉树后序遍历\n     * 输入: root = [1,null,2,3]\n     * 输出: [3,2,1]\n     */\n    public static var postorderTraversal(root) {\n      var result = [];\n      public static var traverse(node) {\n        if (!node) return;\n        traverse(node.left);   // 左子树\n        traverse(node.right);  // 右子树\n        result.add(node.val); // 访问根\n      }\n      traverse(root);\n      return result;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(h)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    const nodes: GraphNode[] = [
      { id: '1', value: '1', x: 50, y: 10, state: 'default' },
      { id: '2', value: '2', x: 30, y: 30, state: 'default' },
      { id: '3', value: '3', x: 70, y: 30, state: 'default' },
      { id: '4', value: '4', x: 20, y: 50, state: 'default' },
      { id: '5', value: '5', x: 40, y: 50, state: 'default' },
      { id: '6', value: '6', x: 60, y: 50, state: 'default' },
      { id: '7', value: '7', x: 80, y: 50, state: 'default' },
    ];
    
    const edges: GraphEdge[] = [
      { id: 'e1-2', source: '1', target: '2', state: 'default' },
      { id: 'e1-3', source: '1', target: '3', state: 'default' },
      { id: 'e2-4', source: '2', target: '4', state: 'default' },
      { id: 'e2-5', source: '2', target: '5', state: 'default' },
      { id: 'e3-6', source: '3', target: '6', state: 'default' },
      { id: 'e3-7', source: '3', target: '7', state: 'default' },
    ];

    const getGraphState = (overrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}, edgeOverrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}): GraphData => {
        return {
            nodes: nodes.map(n => ({ ...n, state: (overrides[n.id] as any) || n.state })),
            edges: edges.map(e => ({ ...e, state: (edgeOverrides[e.id] as any) || e.state })),
            isDirected: true
        };
    };

    steps.push({
      description: '初始化二叉树，准备进行后序遍历 (Post-order Traversal)',
      activeLines: [7], // traverse(root)
      elements: [],
      graphData: getGraphState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const nodeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const edgeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const result: string[] = [];

    let operations = 0;

    const tree = {
        '1': { left: '2', right: '3' },
        '2': { left: '4', right: '5' },
        '3': { left: '6', right: '7' },
        '4': null, '5': null, '6': null, '7': null
    };

    const traverse = (nodeId: string, parentEdgeId?: string) => {
        if (parentEdgeId) {
            edgeStates[parentEdgeId] = 'comparing';
            steps.push({
                description: `沿路径移动到节点 ${nodeId}`,
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            edgeStates[parentEdgeId] = 'visited';
        }

        operations++;
        nodeStates[nodeId] = 'comparing';
        steps.push({
            description: `到达节点 ${nodeId}，根据后序遍历，先递归访问其左子树`,
            activeLines: [11], // traverse(node.left)
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        const children = tree[nodeId as keyof typeof tree];
        if (children && children.left) {
            traverse(children.left, `e${nodeId}-${children.left}`);
        }

        if (children && children.right) {
            steps.push({
                description: `节点 ${nodeId} 左侧子树遍历完成（或为空），接着递归访问其右子树`,
                activeLines: [12], // traverse(node.right)
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            traverse(children.right, `e${nodeId}-${children.right}`);
        }

        nodeStates[nodeId] = 'visited';
        result.push(nodeId);
        steps.push({
            description: `节点 ${nodeId} 的左右子树都已遍历完成，访问当前根节点 ${nodeId}。当前结果集: [${result.join(', ')}]`,
            activeLines: [13], // result.push(node.val)
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        
        steps.push({
            description: `节点 ${nodeId} 的整棵子树遍历完成，回溯到上一层`,
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
    };

    traverse('1');

    steps.push({
      description: `后序遍历完成! 最终结果: [${result.join(', ')}]`,
      activeLines: [16], // return result
      elements: [],
      graphData: getGraphState(nodeStates, edgeStates),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
