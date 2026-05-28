import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const skipListAlgorithm: AlgorithmDefinition = {
  id: 'skipList',
  name: '跳表 (Skip List)',
  category: 'LinkedList',
  description: '目标：在一个有序链表中实现快速搜索（O(log n)）。\n原理：通过给链表增加“多级快速通道（索引层）”，空间换时间，避免挨个遍历。Redis 等很多重要系统的底层就使用到了该结构。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "在有序单链表的基础上增加多级随机的稀疏索引层，使得查询跳跃幅度变大，用空间换时间达到 O(log N) 的搜索效率。",
      analogy: "类似于高铁站：普通列车（底层链表）每站都停，高铁（一层索引）隔十个站停一次，飞机（顶级索引）直接跨越千里，你找远方目标时先坐飞机再倒高铁最后倒慢车。",
      scenarios: "适用场景：内存数据库、并发有序集合",
      practical: "被 Redis 作为核心组件在 ZSet (有序集合) 底层实现广泛应用，提供极高并发更新及排名查询能力。同样也在 LevelDB 内存组件中被采纳。"
},
  coreSteps: [
    '1. 拥有一个多层的首节点（头指针）',
    '2. (Search): 从最顶层链表开始，寻找小于目标值的最大节点',
    '3. (Search): 一旦发现下一个节点大于目标值，直接向下一层级跳跃（下沉）',
    '4. (Search): 下沉后在更密集的底层继续向右遍历',
    '5. (Search): 重复此过程直到底层（原始链表）。'
  ],
  code: {
    "JavaScript": "class Skiplist {\n  constructor() {\n    this.head = new Node(-1);\n  }\n  search(target) {\n    let curr = this.head;\n    while (curr !== null) {\n      // 只要右边还有节点且值小于等于目标，就继续向右找\n      while (curr.right !== null && curr.right.val <= target) {\n        curr = curr.right;\n      }\n      // 右边找不动了，看看当前层是不是就等于目标\n      if (curr.val === target) return true;\n      // 否则向下一层寻找更精细的位置\n      curr = curr.down;\n    }\n    return false;\n  }\n}",
    "Python": "class Skiplist \n  constructor() \n    this.head = Node(-1)\n  \n  search(target) \n    curr = this.head\n    while (curr != null) \n      # 只要右边还有节点且值小于等于目标，就继续向右找\n      while (curr.right != null and curr.right.val <= target) \n        curr = curr.right\n      \n      # 右边找不动了，看看当前层是不是就等于目标\n      if (curr.val == target) return true\n      # 否则向下一层寻找更精细的位置\n      curr = curr.down\n    \n    return false\n  \n",
    "C++": "class Skiplist {\n  constructor() {\n    this.head = new Node(-1);\n  }\n  search(target) {\n    auto curr = this.head;\n    while (curr !== null) {\n      // 只要右边还有节点且值小于等于目标，就继续向右找\n      while (curr.right !== null && curr.right.val <= target) {\n        curr = curr.right;\n      }\n      // 右边找不动了，看看当前层是不是就等于目标\n      if (curr.val === target) return true;\n      // 否则向下一层寻找更精细的位置\n      curr = curr.down;\n    }\n    return false;\n  }\n}",
    "Java": "class Solution {\n    class Skiplist {\n      constructor() {\n        this.head = new Node(-1);\n      }\n      search(target) {\n        var curr = this.head;\n        while (curr !== null) {\n          // 只要右边还有节点且值小于等于目标，就继续向右找\n          while (curr.right !== null && curr.right.val <= target) {\n            curr = curr.right;\n          }\n          // 右边找不动了，看看当前层是不是就等于目标\n          if (curr.val === target) return true;\n          // 否则向下一层寻找更精细的位置\n          curr = curr.down;\n        }\n        return false;\n      }\n    }\n}"
},
  timeComplexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(n) - 极端情况随机函数全在一层'
  },
  spaceComplexity: 'O(n)',
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // Hardcoded layout for a generic 3-level skip list.
    // Bottom level: 1 -> 3 -> 4 -> 5 -> 7 -> 8 -> 9 -> 10
    // Level 2: 1 --------> 4 --------> 7 --------> 10
    // Level 3: 1 --------------------> 7
    
    let nodes: GraphNode[] = [];
    let edges: GraphEdge[] = [];
    
    const levels = [
        [1, 7],
        [1, 4, 7, 10],
        [1, 3, 4, 5, 7, 8, 9, 10]
    ];
    
    const START_X = 10;
    const END_X = 90;
    const TOTAL_VALS = 10;
    
    for (let l = 0; l < levels.length; l++) {
        let y = 20 + l * 25;
        let lvlNodes = levels[l];
        for (let i = 0; i < lvlNodes.length; i++) {
            let val = lvlNodes[i];
            let x = START_X + ((val - 1) / TOTAL_VALS) * (END_X - START_X);
            nodes.push({
                id: `l${l}-v${val}`,
                value: String(val),
                x, y,
                state: 'default'
            });
            // Add right edges
            if (i < lvlNodes.length - 1) {
                let nextVal = lvlNodes[i+1];
                edges.push({
                    id: `e-right-l${l}-v${val}-v${nextVal}`,
                    source: `l${l}-v${val}`,
                    target: `l${l}-v${nextVal}`,
                    state: 'default',
                    isDirected: true
                });
            }
            // Add down edges
            if (l < levels.length - 1) {
                // Because down is exactly same value, next level MUST have it
                edges.push({
                    id: `e-down-l${l}-v${val}`,
                    source: `l${l}-v${val}`,
                    target: `l${l+1}-v${val}`,
                    state: 'default',
                    isDirected: true
                });
            }
        }
    }

    const getGraphState = (nodeOverrides: Record<string, string> = {}, edgeOverrides: Record<string, string> = {}): GraphData => {
        return {
            nodes: nodes.map(n => ({...n, state: nodeOverrides[n.id] as any || n.state})),
            edges: edges.map(e => ({...e, state: edgeOverrides[e.id] as any || e.state})),
            isDirected: true
        }
    };
    
    steps.push({
        description: `初始化一棵 3 层的跳表（Skip List）。底层包含所有元素，上面的每一层犹如“高速公路”。`,
        activeLines: [3],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });
    
    let target = 8;
    steps.push({
        description: `开始搜索目标值 ${target}。我们将从最高层 (Top Layer) 的首节点出发。`,
        activeLines: [6],
        elements: [],
        graphData: getGraphState({'l0-v1': 'highlight'}),
        metrics: { comparisons: 1, swaps: 0, arrayAccesses: 0, operations: 1 }
    });
    
    let currL = 0;
    let currVal = 1;
    let operations = 1;
    let comparisons = 1;

    while (currL < levels.length) {
        let lvlNodes = levels[currL];
        let currIdx = lvlNodes.indexOf(currVal);
        
        let movedRight = false;
        while (currIdx < lvlNodes.length - 1) {
            let nextVal = lvlNodes[currIdx + 1];
            comparisons++;
            if (nextVal <= target) {
                // move right
                let eId = `e-right-l${currL}-v${currVal}-v${nextVal}`;
                currVal = nextVal;
                currIdx++;
                movedRight = true;
                operations++;
                
                steps.push({
                    description: `在当前层中向右试探：发现右侧节点 ${nextVal} <= 目标 ${target}。进行一次向右跳跃。`,
                    activeLines: [9, 10],
                    elements: [],
                    graphData: getGraphState({[`l${currL}-v${currVal}`]: 'highlight'}, {[eId]: 'highlight'}),
                    metrics: { comparisons, swaps: 0, arrayAccesses: 0, operations }
                });
            } else {
                steps.push({
                    description: `在当前层向右试探失败：右侧节点 ${nextVal} > 目标 ${target}，我们不能越过它。准备下沉找更密的层。`,
                    activeLines: [13],
                    elements: [],
                    graphData: getGraphState({[`l${currL}-v${currVal}`]: 'highlight'}),
                    metrics: { comparisons, swaps: 0, arrayAccesses: 0, operations }
                });
                break;
            }
        }
        
        comparisons++;
        if (currVal === target) {
            steps.push({
                description: `发现当前节点值就是 ${target}！搜索成功。O(log n) 级的高速搜索！`,
                activeLines: [13],
                elements: [],
                graphData: getGraphState({[`l${currL}-v${currVal}`]: 'sorted'}),
                metrics: { comparisons, swaps: 0, arrayAccesses: 0, operations }
            });
            break;
        }
        
        if (currL < levels.length - 1) {
            let eId = `e-down-l${currL}-v${currVal}`;
            currL++;
            operations++;
            steps.push({
                description: `下降到下一层轨道以提供更高精度的搜索。`,
                activeLines: [15],
                elements: [],
                graphData: getGraphState({[`l${currL}-v${currVal}`]: 'highlight'}, {[eId]: 'highlight'}),
                metrics: { comparisons, swaps: 0, arrayAccesses: 0, operations }
            });
        } else {
            break;
        }
    }

    return steps;
  }
};
