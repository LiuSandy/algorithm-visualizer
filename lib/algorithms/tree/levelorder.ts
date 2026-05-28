import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const treeLevelOrder: AlgorithmDefinition = {
  id: 'tree-levelorder',
  name: '二叉树层序遍历 (Level-order)',
  category: 'Tree',
  description: '层序遍历也就是广度优先遍历 (BFS)。从根节点出发，按层次从上到下、从左到右逐层访问每个节点。常借助队列来实现。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "不深入任何具体树状坑底，仅把横置广度的分叉口全量压入线性缓存型序列队列来强制执行分层次由浅及深逐层处理推进。一层剥除清空的同时即将其下方所有的连线目标抛送进去待检。",
      analogy: "如同高级大企业领导去走访下面的厂房，必定不是一开始就走到小车间主任家，而是按照规矩在一天内先把各省公司级首脑见完了，转天才去见各市级的区长，再一层楼的向下深耕探索！",
      scenarios: "适用场景：多层次同伴广播预处理，及无权网络最浅深度获取搜查系统",
      practical: "大量在消息路由通信基站信号按扩散圈覆盖强度层层蔓延探求计算场景中使用；也可直接用做网页渲染层次结构的自下而上层级解析策略的基础控制循环处理引擎（HTML DOM Tree解析中）。"
},
  coreSteps: [
    '将根节点入队。',
    '若队列非空，从队列取出一个节点并访问。',
    '将该节点的左、右子节点依次入队。重复此过程直至队列为空。'
  ],
  code: {
    "JavaScript": "/**\n * 二叉树层序遍历\n * 输入: root = [3,9,20,null,null,15,7]\n * 输出: [[3],[9,20],[15,7]] (或是展平的一维数组)\n */\nfunction levelOrderTraversal(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  \n  while (queue.length > 0) {\n    const node = queue.shift(); // 出队\n    result.push(node.val);      // 访问\n    if (node.left) queue.push(node.left);   // 左子树入队\n    if (node.right) queue.push(node.right); // 右子树入队\n  }\n  \n  return result;\n}",
    "Python": "/**\n * 二叉树层序遍历\n * 输入: root = [3,9,20,null,null,15,7]\n * 输出: [[3],[9,20],[15,7]] (或是展平的一维数组)\n */\ndef levelOrderTraversal(root):\n  if (!root) return []\n  result = []\n  queue = [root]\n  \n  while (queue.__len__() > 0) \n    node = queue.shift() # 出队\n    result.append(node.val)      # 访问\n    if (node.left) queue.append(node.left)   # 左子树入队\n    if (node.right) queue.append(node.right) # 右子树入队\n  \n  \n  return result\n",
    "C++": "/**\n * 二叉树层序遍历\n * 输入: root = [3,9,20,null,null,15,7]\n * 输出: [[3],[9,20],[15,7]] (或是展平的一维数组)\n */\nauto levelOrderTraversal(root) {\n  if (!root) return [];\n  auto result = [];\n  auto queue = [root];\n  \n  while (queue.size() > 0) {\n    auto node = queue.shift(); // 出队\n    result.push_back(node.val);      // 访问\n    if (node.left) queue.push_back(node.left);   // 左子树入队\n    if (node.right) queue.push_back(node.right); // 右子树入队\n  }\n  \n  return result;\n}",
    "Java": "class Solution {\n    /**\n     * 二叉树层序遍历\n     * 输入: root = [3,9,20,null,null,15,7]\n     * 输出: [[3],[9,20],[15,7]] (或是展平的一维数组)\n     */\n    public static var levelOrderTraversal(root) {\n      if (!root) return [];\n      var result = [];\n      var queue = [root];\n      \n      while (queue.length > 0) {\n        var node = queue.shift(); // 出队\n        result.add(node.val);      // 访问\n        if (node.left) queue.add(node.left);   // 左子树入队\n        if (node.right) queue.add(node.right); // 右子树入队\n      }\n      \n      return result;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(n) - 队列中最多存放一层的节点',
  
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
      description: '初始化二叉树，准备进行层序遍历 (Level-order Traversal)',
      activeLines: [7, 8],
      elements: [],
      graphData: getGraphState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const nodeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const edgeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const result: string[] = [];
    const queue: string[] = ['1'];

    let operations = 0;

    const tree = {
        '1': { left: '2', right: '3' },
        '2': { left: '4', right: '5' },
        '3': { left: '6', right: '7' },
        '4': null, '5': null, '6': null, '7': null
    };

    steps.push({
        description: `将根节点入队。当前队列: [${queue.join(', ')}]`,
        activeLines: [10],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    while (queue.length > 0) {
        operations++;
        steps.push({
            description: `队列非空 (长度 ${queue.length})，准备出队`,
            activeLines: [12],
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        const curr = queue.shift()!;
        nodeStates[curr] = 'comparing';
        steps.push({
            description: `节点 ${curr} 出队`,
            activeLines: [13], // queue.shift()
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        result.push(curr);
        nodeStates[curr] = 'visited';
        steps.push({
            description: `访问出队节点 ${curr}，加入结果集。当前结果集: [${result.join(', ')}]`,
            activeLines: [14], // result.push
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        const children = tree[curr as keyof typeof tree];
        if (children) {
            if (children.left) {
                queue.push(children.left);
                edgeStates[`e${curr}-${children.left}`] = 'visited';
                steps.push({
                    description: `节点 ${curr} 的左子节点 ${children.left} 入队。当前队列: [${queue.join(', ')}]`,
                    activeLines: [15],
                    elements: [],
                    graphData: getGraphState(nodeStates, edgeStates),
                    metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
                });
            }
            if (children.right) {
                queue.push(children.right);
                edgeStates[`e${curr}-${children.right}`] = 'visited';
                steps.push({
                    description: `节点 ${curr} 的右子节点 ${children.right} 入队。当前队列: [${queue.join(', ')}]`,
                    activeLines: [16],
                    elements: [],
                    graphData: getGraphState(nodeStates, edgeStates),
                    metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
                });
            }
        }
    }

    steps.push({
      description: `队列已空，层序遍历完成! 最终结果: [${result.join(', ')}]`,
      activeLines: [19], // return result
      elements: [],
      graphData: getGraphState(nodeStates, edgeStates),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
