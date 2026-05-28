import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const treeInorder: AlgorithmDefinition = {
  id: 'tree-inorder',
  name: '二叉树中序遍历 (In-order)',
  category: 'Tree',
  description: '中序遍历是二叉树遍历的一种，也叫做中根遍历，可记做左根右。首先遍历左子树，然后访问根结点，最后遍历右子树。这种遍历方法在二叉搜索树中可以得到有序序列。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "严苛地遵循“先一网打尽探到左手底渊返回 - 随后访问该父级核心中点值 - 之后才探看右手分支”这般铁律来探寻每个特定的小三角家庭树形区域从而最终走过整树。",
      analogy: "就像读书习惯一定要从小往大读：首先顺着树最左面找到最小的值，然后读中间它老爸，最后顺便看一下右边比它哥俩大的弟兄，按照这样的规矩你的笔记会自然呈现纯从小到大的完美顺溜排列结果（尤其在BST排序二叉树中）。",
      scenarios: "适用场景：具有排序查询与打印恢复属性应用",
      practical: "在大数据查询语法解析器 AST (抽象语法树解析还原输出为标准条件流）中通过按照运算符号中序复原的机制把极复杂条件转换为正常执行规则表达式（Expression Rule Tree Analysis）。"
},
  coreSteps: [
    '对左子树进行中序遍历。',
    '访问根节点。',
    '对右子树进行中序遍历。'
  ],
  code: {
    "JavaScript": "/**\n * 二叉树中序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [1,3,2]\n */\nfunction inorderTraversal(root) {\n  const result = [];\n  function traverse(node) {\n    if (!node) return;\n    traverse(node.left);   // 左子树\n    result.push(node.val); // 访问根\n    traverse(node.right);  // 右子树\n  }\n  traverse(root);\n  return result;\n}",
    "Python": "/**\n * 二叉树中序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [1,3,2]\n */\ndef inorderTraversal(root):\n  result = []\n  def traverse(node):\n    if (!node) return\n    traverse(node.left)   # 左子树\n    result.append(node.val) # 访问根\n    traverse(node.right)  # 右子树\n  \n  traverse(root)\n  return result\n",
    "C++": "/**\n * 二叉树中序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [1,3,2]\n */\nauto inorderTraversal(root) {\n  auto result = [];\n  auto traverse(node) {\n    if (!node) return;\n    traverse(node.left);   // 左子树\n    result.push_back(node.val); // 访问根\n    traverse(node.right);  // 右子树\n  }\n  traverse(root);\n  return result;\n}",
    "Java": "class Solution {\n    /**\n     * 二叉树中序遍历\n     * 输入: root = [1,null,2,3]\n     * 输出: [1,3,2]\n     */\n    public static var inorderTraversal(root) {\n      var result = [];\n      public static var traverse(node) {\n        if (!node) return;\n        traverse(node.left);   // 左子树\n        result.add(node.val); // 访问根\n        traverse(node.right);  // 右子树\n      }\n      traverse(root);\n      return result;\n    }\n}"
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
      description: '初始化二叉树，准备进行中序遍历 (In-order Traversal)',
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
            description: `到达节点 ${nodeId}，根据中序遍历，先递归访问其左子树`,
            activeLines: [11], // traverse(node.left)
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        const children = tree[nodeId as keyof typeof tree];
        if (children && children.left) {
            traverse(children.left, `e${nodeId}-${children.left}`);
        }

        nodeStates[nodeId] = 'visited';
        result.push(nodeId);
        steps.push({
            description: `左子树遍历完成（或为空），访问当前根节点 ${nodeId}。当前结果集: [${result.join(', ')}]`,
            activeLines: [12], // result.push(node.val)
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        if (children && children.right) {
            steps.push({
                description: `节点 ${nodeId} 访问完成，接着递归访问其右子树`,
                activeLines: [13], // traverse(node.right)
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            traverse(children.right, `e${nodeId}-${children.right}`);
        }
        
        steps.push({
            description: `节点 ${nodeId} 的整棵子树遍历完成，回溯到上一层`,
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
    };

    traverse('1');

    steps.push({
      description: `中序遍历完成! 最终结果: [${result.join(', ')}]`,
      activeLines: [16], // return result
      elements: [],
      graphData: getGraphState(nodeStates, edgeStates),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
