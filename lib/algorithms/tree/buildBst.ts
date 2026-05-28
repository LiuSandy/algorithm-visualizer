import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const treeBuildBST: AlgorithmDefinition = {
  id: 'tree-build-bst',
  name: '二叉查找树构建 (Build BST)',
  category: 'Tree',
  description: '给定一个数组，将数组中的元素逐个插入，构建一棵二叉查找树 (BST)。BST 的性质：对于任意节点，左子树的所有节点值小于该节点，右子树的所有节点值大于该节点。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "由一个完全排列严格递增的序列数组开始进行核心二分切分提捏点拨法构造树——每次总捏出中间点作为其最顶父元素，极尽完美缔造出形态优越平衡状态。",
      analogy: "如同拿着一长条极具顺序性的竹节串儿想折成一个对称衣架：从全串最中间毫不犹豫对半折起它，并且对于折出来的两个翅膀再做重复同样的取中折分动作以保证不偏不歪非常平衡！",
      scenarios: "适用场景：冷数据离线初始化静态二叉优化建树",
      practical: "当数据同步中心离线跑完大规模排序流计算清洗以后，对需要装载到内存缓存系统进行初始化全量树形建立、使得系统启动后立马就能具有强悍 O(log N) 级查询。"
},
  coreSteps: [
    '遍历输入数组。',
    '若树为空，将当前元素作为根节点。',
    '若不为空，从根节点开始比较，小于根则走向左侧，大于根则走向右侧，直到找到空位置插入。'
  ],
  code: {
    "JavaScript": "/**\n * 构建二叉查找树\n */\nfunction buildBST(arr) {\n  let root = null;\n  \n  function insert(node, val) {\n    if (!node) return { val, left: null, right: null };\n    if (val < node.val) {\n      node.left = insert(node.left, val);\n    } else {\n      node.right = insert(node.right, val);\n    }\n    return node;\n  }\n\n  for (let i = 0; i < arr.length; i++) {\n    root = insert(root, arr[i]);\n  }\n  return root;\n}",
    "Python": "/**\n * 构建二叉查找树\n */\ndef buildBST(arr):\n  root = null\n  \n  def insert(node, val):\n    if (!node) return  val, left: null, right: null \n    if (val < node.val) \n      node.left = insert(node.left, val)\n     else \n      node.right = insert(node.right, val)\n    \n    return node\n  \n\n  for (i = 0 i < arr.__len__() i++) \n    root = insert(root, arr[i])\n  \n  return root\n",
    "C++": "/**\n * 构建二叉查找树\n */\nauto buildBST(arr) {\n  auto root = null;\n  \n  auto insert(node, val) {\n    if (!node) return { val, left: null, right: null };\n    if (val < node.val) {\n      node.left = insert(node.left, val);\n    } else {\n      node.right = insert(node.right, val);\n    }\n    return node;\n  }\n\n  for (auto i = 0; i < arr.size(); i++) {\n    root = insert(root, arr[i]);\n  }\n  return root;\n}",
    "Java": "class Solution {\n    /**\n     * 构建二叉查找树\n     */\n    public static var buildBST(arr) {\n      var root = null;\n      \n      public static var insert(node, val) {\n        if (!node) return { val, left: null, right: null };\n        if (val < node.val) {\n          node.left = insert(node.left, val);\n        } else {\n          node.right = insert(node.right, val);\n        }\n        return node;\n      }\n    \n      for (var i = 0; i < arr.length; i++) {\n        root = insert(root, arr[i]);\n      }\n      return root;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n^2) - 数组已有序的情况'
  },
  spaceComplexity: 'O(h) - 递归栈开销',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    const arr = [10, 5, 15, 2, 7];
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    const getGraphState = (overrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}, edgeOverrides: Partial<Record<string, 'default'|'visited'|'comparing'>> = {}): GraphData => {
        return {
            nodes: nodes.map(n => ({ ...n, state: (overrides[n.id] as any) || n.state })),
            edges: edges.map(e => ({ ...e, state: (edgeOverrides[e.id] as any) || e.state })),
            isDirected: true
        };
    };

    steps.push({
      description: `准备将数组 [${arr.join(', ')}] 构建为二叉搜索树`,
      activeLines: [17],
      elements: arr.map((val, idx) => ({ id: idx, value: val, state: 'default' })),
      graphData: getGraphState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    let operations = 0;
    
    // Position tracking roughly
    const positions: Record<string, { x: number, y: number, width: number }> = {};
    
    const insert = (val: number, currentId: string | null, parentId: string | null, isLeft: boolean): string => {
        if (!currentId) {
            operations++;
            const newId = String(val);
            let nx = 50, ny = 10;
            let nw = 100;
            if (parentId) {
                const p = positions[parentId];
                ny = p.y + 20;
                nw = p.width / 2;
                nx = isLeft ? p.x - nw/2 : p.x + nw/2;
            }
            positions[newId] = { x: nx, y: ny, width: nw };
            
            nodes.push({ id: newId, value: String(val), x: nx, y: ny, state: 'sorted' });
            if (parentId) {
                edges.push({ id: `e${parentId}-${newId}`, source: parentId, target: newId, state: 'default' });
            }
            
            steps.push({
                description: `【插入】找到空位，插入节点 ${val}`,
                activeLines: [8],
                elements: arr.map((v, i) => ({ id: i, value: v, state: 'default' })),
                graphData: getGraphState(),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            return newId;
        }

        operations++;
        steps.push({
            description: `【比较】当前节点 ${currentId}，待插入值 ${val}`,
            activeLines: [9],
            elements: arr.map((v, i) => ({ id: i, value: v, state: 'default' })),
            graphData: getGraphState({ [currentId]: 'comparing' }),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        const currentVal = parseInt(nodes.find(n => n.id === currentId)!.value);
        if (val < currentVal) {
            steps.push({
                description: `${val} < ${currentVal}，向左子树走`,
                activeLines: [10],
                elements: arr.map((v, i) => ({ id: i, value: v, state: 'default' })),
                graphData: getGraphState({ [currentId]: 'visited' }),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            // We simulate traversing the edge
            // In a real generic graph this would be a real search, here we fake find left child
            const leftEdge = edges.find(e => e.source === currentId && parseInt(e.target) < currentVal);
            insert(val, leftEdge ? leftEdge.target : null, currentId, true);
        } else {
            steps.push({
                description: `${val} >= ${currentVal}，向右子树走`,
                activeLines: [12],
                elements: arr.map((v, i) => ({ id: i, value: v, state: 'default' })),
                graphData: getGraphState({ [currentId]: 'visited' }),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            const rightEdge = edges.find(e => e.source === currentId && parseInt(e.target) >= currentVal);
            insert(val, rightEdge ? rightEdge.target : null, currentId, false);
        }
        return currentId; // returning root
    };

    let rootId: string | null = null;
    for (let i = 0; i < arr.length; i++) {
        steps.push({
            description: `开始插入数组第 ${i+1} 个元素: ${arr[i]}`,
            activeLines: [18],
            elements: arr.map((v, idx) => ({ id: idx, value: v, state: idx === i ? 'comparing' : (idx < i ? 'sorted' : 'default') })),
            graphData: getGraphState(),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        rootId = insert(arr[i], rootId, null, false);
        
        // rest nodes visually to default after an insertion
        nodes.forEach(n => n.state = 'default');
    }

    steps.push({
      description: `二叉查找树构建完成！`,
      activeLines: [20], // return root
      elements: arr.map((v, i) => ({ id: i, value: v, state: 'sorted' })),
      graphData: getGraphState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
