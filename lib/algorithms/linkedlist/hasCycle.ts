import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const hasCycleList: AlgorithmDefinition = {
  id: 'linkedlist-has-cycle',
  name: '链表是否有环 (Has Cycle)',
  category: 'LinkedList',
  description: '使用快慢指针（也称龟兔赛跑算法）检测链表中是否存在环。慢指针每次移动一步，快指针每次移动两步。如果链表中存在环，快指针最终一定会追上慢指针；如果没有环，快指针会最先到达链表尾部（null）。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "同样使用快慢双指针遍历链表：如果存在环形结构，速度不同的指针迟早会在环内相遇；如果在追逐阶段提前遇到空指针则表示无环。",
      analogy: "在圆形操场上，博尔特迟早会从后背超过正在散步的你。如果你俩一直没能相遇但跑出了校门外，那就说明跑道是直的。",
      scenarios: "适用场景：资源连通性判断、异常结构检测",
      practical: "在现代浏览器DOM节点树或React Fiber树在处理异常状态（可能引发死循环）导致引用成环时的底层防崩溃防御机制中。"
},
  coreSteps: [
    '初始化慢指针 slow 和快指针 fast，初始都指向链表头节点。',
    '开始循环，当 fast 和 fast.next 不为空时执行：',
    '慢指针 slow 向后移动一步（slow = slow.next）。',
    '快指针 fast 向后移动两步（fast = fast.next.next）。',
    '判断 slow 和 fast 是否相遇（指向同一个节点），如果相遇说明有环。',
    '如果循环结束未相遇，则说明无环。'
  ],
  code: {
    "JavaScript": "/**\n * 检测链表是否有环\n * 输入: head = [3,2,0,-4], pos = 1 (尾部连接到索引 1 处)\n * 输出: true\n */\nfunction hasCycle(head) {\n  if (!head || !head.next) return false;\n  let slow = head;\n  let fast = head;\n  while (fast !== null && fast.next !== null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) {\n      return true;\n    }\n  }\n  return false;\n}",
    "Python": "/**\n * 检测链表是否有环\n * 输入: head = [3,2,0,-4], pos = 1 (尾部连接到索引 1 处)\n * 输出: true\n */\ndef hasCycle(head):\n  if (!head or !head.next) return false\n  slow = head\n  fast = head\n  while (fast != null and fast.next != null) \n    slow = slow.next\n    fast = fast.next.next\n    if (slow == fast) \n      return true\n    \n  \n  return false\n",
    "C++": "/**\n * 检测链表是否有环\n * 输入: head = [3,2,0,-4], pos = 1 (尾部连接到索引 1 处)\n * 输出: true\n */\nauto hasCycle(head) {\n  if (!head || !head.next) return false;\n  auto slow = head;\n  auto fast = head;\n  while (fast !== null && fast.next !== null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) {\n      return true;\n    }\n  }\n  return false;\n}",
    "Java": "class Solution {\n    /**\n     * 检测链表是否有环\n     * 输入: head = [3,2,0,-4], pos = 1 (尾部连接到索引 1 处)\n     * 输出: true\n     */\n    public static var hasCycle(head) {\n      if (!head || !head.next) return false;\n      var slow = head;\n      var fast = head;\n      while (fast !== null && fast.next !== null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow === fast) {\n          return true;\n        }\n      }\n      return false;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    let nodes: GraphNode[] = [
      { id: '0', value: '3', x: 20, y: 50, state: 'default' },
      { id: '1', value: '2', x: 40, y: 30, state: 'default' },
      { id: '2', value: '0', x: 60, y: 50, state: 'default' },
      { id: '3', value: '-4', x: 40, y: 70, state: 'default' }
    ];
    
    let edges: GraphEdge[] = [
      { id: 'e01', source: '0', target: '1', state: 'default' },
      { id: 'e12', source: '1', target: '2', state: 'default' },
      { id: 'e23', source: '2', target: '3', state: 'default' },
      { id: 'e31', source: '3', target: '1', state: 'highlight' } // return to 2
    ];
    
    steps.push({
      description: '初始化环形链表。慢指针 slow 和快指针 fast 都指向头节点 (值为 3)。',
      activeLines: [8, 9],
      elements: [],
      graphData: { nodes: [...nodes], edges: [...edges], isDirected: true },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    let slow = 0;
    let fast = 0;
    let operations = 0;
    // index mappings for visual cycle: 0 -> 1 -> 2 -> 3 -> 1
    const nextNode = (idx: number) => idx === 3 ? 1 : idx + 1;
    
    while (true) {
      operations++;
      
      steps.push({
        description: '移动指针前：slow 在节点 ' + nodes[slow].value + '，fast 在节点 ' + nodes[fast].value,
        activeLines: [10],
        elements: [],
        graphData: {
          nodes: nodes.map(n => {
            if (n.id === String(slow) && n.id === String(fast)) return { ...n, state: 'sorted' };
            if (n.id === String(slow)) return { ...n, state: 'comparing' }; // slow color
            if (n.id === String(fast)) return { ...n, state: 'pivot' }; // fast color
            return { ...n, state: 'default' };
          }),
          edges: [...edges],
          isDirected: true
        },
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });
      
      slow = nextNode(slow);
      fast = nextNode(nextNode(fast));
      
      steps.push({
        description: 'slow 走 1 步到 ' + nodes[slow].value + '，fast 走 2 步到 ' + nodes[fast].value,
        activeLines: [11, 12],
        elements: [],
        graphData: {
          nodes: nodes.map(n => {
            if (n.id === String(slow) && n.id === String(fast)) return { ...n, state: 'sorted' };
            if (n.id === String(slow)) return { ...n, state: 'comparing' };
            if (n.id === String(fast)) return { ...n, state: 'pivot' };
            return { ...n, state: 'default' };
          }),
          edges: [...edges],
          isDirected: true
        },
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });
      
      if (slow === fast) {
        steps.push({
          description: 'slow 和 fast 在节点 ' + nodes[slow].value + ' 相遇！证明存在环。',
          activeLines: [13, 14],
          elements: [],
          graphData: {
            nodes: nodes.map(n => ({...n, state: n.id === String(slow) ? 'sorted' : 'default'})),
            edges: [...edges],
            isDirected: true
          },
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        break;
      }
    }
    
    return steps;
  }
};
