import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const treeLCA: AlgorithmDefinition = {
  id: 'tree-lca',
  name: '最小公共祖先 (LCA)',
  category: 'Tree',
  description: '给定一个二叉树, 找到该树中两个指定节点的最近公共祖先 (Lowest Common Ancestor)。如果是二叉搜索树，可根据值大小快速检索；对于普通二叉树，通过后序遍历，若左右子树各找到一个节点，则当前节点即为LCA。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "深度探索分路。利用后序从底端搜寻特定标的在树中的位置汇报：若在一个树支节点其左面能找着 A 兄弟报告、右边能找着 B 兄弟发觉，则此支点必作为两者命中核心第一宗长。",
      analogy: "在偌大的宗族家谱上找寻你和小明之间最重要的近亲老太爷：大家一直向家谱图底层找你俩，小明出现在隔壁表姨那一脉、你出现在这一支流！那么你们在上面顺着线相交的第一个族长也就是这最近的始祖节点（LCA）。",
      scenarios: "适用场景：网络层级从属结构最速追踪、家装组建图表求交集追踪",
      practical: "核心被微服务中超大规模分布式的链路拓扑拓扑关系排查组件运用来快速抓取定位到底两个相互调用微服务的最初发起系统源控制根进程到底从哪一个相同的服务开始分流出的病症重灾点。"
},
  coreSteps: [
    '若当前节点为空，或等于p、q，则返回当前节点。',
    '递归在左子树中找p或q。',
    '递归在右子树中找p或q。',
    '若左右子树都有返回值，说明p和q分居当前节点两侧，当前节点即为LCA。'
  ],
  code: {
    "JavaScript": "/**\n * 二叉树最小公共祖先\n */\nfunction lowestCommonAncestor(root, p, q) {\n  // 1. 如果当前节点为空，或者是目标节点之一，直接返回\n  if (!root || root.val === p.val || root.val === q.val) {\n    return root;\n  }\n  \n  // 2. 在左子树和右子树中深度优先搜索\n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  \n  // 3. 如果左右都找到了，说明当前节点是分隔点，也就是 LCA\n  if (left && right) return root;\n  \n  // 4. 否则，哪边找到了就返回哪边\n  return left ? left : right;\n}",
    "Python": "/**\n * 二叉树最小公共祖先\n */\ndef lowestCommonAncestor(root, p, q):\n  # 1. 如果当前节点为空，或者是目标节点之一，直接返回\n  if (!root or root.val == p.val or root.val == q.val) \n    return root\n  \n  \n  # 2. 在左子树和右子树中深度优先搜索\n  left = lowestCommonAncestor(root.left, p, q)\n  right = lowestCommonAncestor(root.right, p, q)\n  \n  # 3. 如果左右都找到了，说明当前节点是分隔点，也就是 LCA\n  if (left and right) return root\n  \n  # 4. 否则，哪边找到了就返回哪边\n  return left ? left : right\n",
    "C++": "/**\n * 二叉树最小公共祖先\n */\nauto lowestCommonAncestor(root, p, q) {\n  // 1. 如果当前节点为空，或者是目标节点之一，直接返回\n  if (!root || root.val === p.val || root.val === q.val) {\n    return root;\n  }\n  \n  // 2. 在左子树和右子树中深度优先搜索\n  auto left = lowestCommonAncestor(root.left, p, q);\n  auto right = lowestCommonAncestor(root.right, p, q);\n  \n  // 3. 如果左右都找到了，说明当前节点是分隔点，也就是 LCA\n  if (left && right) return root;\n  \n  // 4. 否则，哪边找到了就返回哪边\n  return left ? left : right;\n}",
    "Java": "class Solution {\n    /**\n     * 二叉树最小公共祖先\n     */\n    public static var lowestCommonAncestor(root, p, q) {\n      // 1. 如果当前节点为空，或者是目标节点之一，直接返回\n      if (!root || root.val === p.val || root.val === q.val) {\n        return root;\n      }\n      \n      // 2. 在左子树和右子树中深度优先搜索\n      var left = lowestCommonAncestor(root.left, p, q);\n      var right = lowestCommonAncestor(root.right, p, q);\n      \n      // 3. 如果左右都找到了，说明当前节点是分隔点，也就是 LCA\n      if (left && right) return root;\n      \n      // 4. 否则，哪边找到了就返回哪边\n      return left ? left : right;\n    }\n}"
},
  timeComplexity: {
    best: 'O(1)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(h) - 递归深度',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // We will look for LCA of 5 and 1
    const p = '5';
    const q = '1';

    const nodes: GraphNode[] = [
      { id: '3', value: '3', x: 50, y: 10, state: 'default' },
      { id: '5', value: '5', x: 30, y: 30, state: 'default' },
      { id: '1', value: '1', x: 70, y: 30, state: 'default' },
      { id: '6', value: '6', x: 20, y: 50, state: 'default' },
      { id: '2', value: '2', x: 40, y: 50, state: 'default' },
      { id: '0', value: '0', x: 60, y: 50, state: 'default' },
      { id: '8', value: '8', x: 80, y: 50, state: 'default' },
    ];
    
    const edges: GraphEdge[] = [
      { id: 'e3-5', source: '3', target: '5', state: 'default' },
      { id: 'e3-1', source: '3', target: '1', state: 'default' },
      { id: 'e5-6', source: '5', target: '6', state: 'default' },
      { id: 'e5-2', source: '5', target: '2', state: 'default' },
      { id: 'e1-0', source: '1', target: '0', state: 'default' },
      { id: 'e1-8', source: '1', target: '8', state: 'default' },
    ];

    const getGraphState = (overrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}, edgeOverrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}): GraphData => {
        return {
            nodes: nodes.map(n => {
                let st = overrides[n.id] as any || n.state;
                if (n.id === p || n.id === q) {
                    if (st === 'default' || st === 'visited') st = 'comparing'; // highlight targets initially slightly different or keep them comparing
                }
                return { ...n, state: st };
            }),
            edges: edges.map(e => ({ ...e, state: (edgeOverrides[e.id] as any) || e.state })),
            isDirected: true
        };
    };

    steps.push({
      description: `初始化树，准备寻找节点 ${p} 和节点 ${q} 的 LCA`,
      activeLines: [4],
      elements: [],
      graphData: getGraphState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const nodeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    const edgeStates: Record<string, 'default'|'visited'|'comparing'> = {};
    let operations = 0;

    const tree = {
        '3': { left: '5', right: '1' },
        '5': { left: '6', right: '2' },
        '1': { left: '0', right: '8' },
        '6': null, '2': null, '0': null, '8': null
    };

    // p=5, q=1
    // LCA is 3
    const traverse = (nodeId: string | null): string | null => {
        if (!nodeId) return null;

        operations++;
        nodeStates[nodeId] = 'comparing'; // current visiting node
        
        steps.push({
            description: `访问当前节点 ${nodeId}`,
            activeLines: [6], // if (!root || ...)
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        if (nodeId === p || nodeId === q) {
            steps.push({
                description: `找到目标节点之一 ${nodeId}，直接返回该节点`,
                activeLines: [7], // return root
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            nodeStates[nodeId] = 'visited';
            return nodeId;
        }

        const children = tree[nodeId as keyof typeof tree];
        
        steps.push({
            description: `在 ${nodeId} 的左子树中递归查找`,
            activeLines: [11], // left = ...
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        
        if (children && children.left) edgeStates[`e${nodeId}-${children.left}`] = 'comparing';
        const leftRef = traverse(children?.left || null);
        
        steps.push({
            description: `在 ${nodeId} 的右子树中递归查找`,
            activeLines: [12], // right = ...
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        if (children && children.right) edgeStates[`e${nodeId}-${children.right}`] = 'comparing';
        const rightRef = traverse(children?.right || null);

        steps.push({
            description: `汇总节点 ${nodeId} 的查找结果：左边返回了 ${leftRef}，右边返回了 ${rightRef}`,
            activeLines: [15], // if (left && right)
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        if (leftRef && rightRef) {
            steps.push({
                description: `左右子树分别找到了目标节点，因此当前节点 ${nodeId} 就是它们的最小公共祖先！`,
                activeLines: [15],
                elements: [],
                graphData: getGraphState(nodeStates, edgeStates),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            nodeStates[nodeId] = 'visited';
            return nodeId;
        }

        const res = leftRef ? leftRef : rightRef;
        steps.push({
            description: `只有一侧找到了目标 (或都没找到)。向上返回找到的节点 ${res}`,
            activeLines: [18],
            elements: [],
            graphData: getGraphState(nodeStates, edgeStates),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        
        nodeStates[nodeId] = 'visited';
        return res;
    };

    const lca = traverse('3');

    steps.push({
      description: `计算完成，节点 ${p} 和 ${q} 的最小公共祖先是: ${lca}`,
      activeLines: [],
      elements: [],
      graphData: getGraphState(nodeStates, edgeStates),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
