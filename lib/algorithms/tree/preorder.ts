import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const treePreorder: AlgorithmDefinition = {
  id: 'tree-preorder',
  name: '二叉树前序遍历 (Pre-order)',
  category: 'Tree',
  description: '前序遍历是二叉树遍历的一种，也叫做先根遍历、先序遍历，可记做根左右。首先访问根结点然后遍历左子树，最后遍历右子树。在遍历左、右子树时，仍然先访问根节点，然后遍历左子树，最后遍历右子树。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "奉行了见缝插针地直接执行核心父级别点动作并极度优先打通一切沿途发现向左探索偏好的分支深入推进法则，无果或碰墙后再返回继续解决另外的分散偏支任务处理。",
      analogy: "你作为巡查官接手查封各个分部库房任务的时候最具有激情：走到任何一座新房子第一刻先冲进去查封大门拿下了印记（父操作），紧接着不管其他的一路往它左侧最角落所有偏房通透冲去，等实在走不通了才回身管其余角落右室。",
      scenarios: "适用场景：进行系统绝对拓扑序列反序列化复制镜像和树文件扫描复构",
      practical: "在分布式网关与各种文件打包系统备份快照底层里。比如把整套巨大的文件索引关系直接压制成一套全通扁平的恢复日志（Binary Log Serialize / Backup 还原复制重建等任务进程中被重用以保障精准复现！）。"
},
  coreSteps: [
    '访问根节点。',
    '对左子树进行前序遍历。',
    '对右子树进行前序遍历。'
  ],
  code: {
    "JavaScript": "/**\n * 二叉树前序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [1,2,3]\n */\nfunction preorderTraversal(root) {\n  const result = [];\n  function traverse(node) {\n    if (!node) return;\n    result.push(node.val); // 访问根\n    traverse(node.left);   // 左子树\n    traverse(node.right);  // 右子树\n  }\n  traverse(root);\n  return result;\n}",
    "Python": "/**\n * 二叉树前序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [1,2,3]\n */\ndef preorderTraversal(root):\n  result = []\n  def traverse(node):\n    if (!node) return\n    result.append(node.val) # 访问根\n    traverse(node.left)   # 左子树\n    traverse(node.right)  # 右子树\n  \n  traverse(root)\n  return result\n",
    "C++": "/**\n * 二叉树前序遍历\n * 输入: root = [1,null,2,3]\n * 输出: [1,2,3]\n */\nauto preorderTraversal(root) {\n  auto result = [];\n  auto traverse(node) {\n    if (!node) return;\n    result.push_back(node.val); // 访问根\n    traverse(node.left);   // 左子树\n    traverse(node.right);  // 右子树\n  }\n  traverse(root);\n  return result;\n}",
    "Java": "class Solution {\n    /**\n     * 二叉树前序遍历\n     * 输入: root = [1,null,2,3]\n     * 输出: [1,2,3]\n     */\n    public static var preorderTraversal(root) {\n      var result = [];\n      public static var traverse(node) {\n        if (!node) return;\n        result.add(node.val); // 访问根\n        traverse(node.left);   // 左子树\n        traverse(node.right);  // 右子树\n      }\n      traverse(root);\n      return result;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(h)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // Create a complete binary tree for visualization
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
      description: '初始化二叉树，准备进行前序遍历 (Pre-order Traversal)',
      activeLines: [14],
      elements: [],
      graphData: getGraphState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const nodeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const edgeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const result: string[] = [];

    let operations = 0;

    // tree definitions
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
                activeLines: [],
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            edgeStates[parentEdgeId] = 'visited';
        }

        operations++;
        nodeStates[nodeId] = 'comparing';
        steps.push({
            description: `访问当前根节点 ${nodeId}`,
            activeLines: [9, 10],
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        nodeStates[nodeId] = 'visited';
        result.push(nodeId);
        steps.push({
            description: `已提取节点 ${nodeId}，当前结果集: [${result.join(', ')}]`,
            activeLines: [10],
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        const children = tree[nodeId as keyof typeof tree];
        if (children) {
            if (children.left) {
                steps.push({
                    description: `递归访问节点 ${nodeId} 的左子树`,
                    activeLines: [11],
                    elements: [],
                    graphData: getGraphState(nodeStates, edgeStates),
                    metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
                });
                traverse(children.left, `e${nodeId}-${children.left}`);
            }
            if (children.right) {
                steps.push({
                    description: `递归访问节点 ${nodeId} 的右子树`,
                    activeLines: [12],
                    elements: [],
                    graphData: getGraphState(nodeStates, edgeStates),
                    metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
                });
                traverse(children.right, `e${nodeId}-${children.right}`);
            }
        }
        
        steps.push({
            description: `节点 ${nodeId} 的子树遍历完成，回溯`,
            activeLines: [],
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
    };

    traverse('1');

    steps.push({
      description: `前序遍历完成! 最终结果: [${result.join(', ')}]`,
      activeLines: [15],
      elements: [],
      graphData: getGraphState(nodeStates, edgeStates),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
