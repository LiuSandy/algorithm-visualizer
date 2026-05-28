import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const detectCycleList: AlgorithmDefinition = {
  id: 'linkedlist-detect-cycle',
  name: '环形链表检测入口 (Detect Cycle II)',
  category: 'LinkedList',
  description: '不仅要判断是否有环，还要找到环的入口节点。先使用快慢指针判断是否有环及相遇点；相遇后，将一个额外的指针 ptr 放回头节点。之后慢指针 slow 和 ptr 每次都只走一步，它们再次相遇的地方一定是环的入口节点。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "使用 Floyd's 快慢双指针在闭环内部相遇后，慢指针回到起点，与快指针同速前进，再次相遇的关键位置即为环入口。",
      analogy: "就像在一个赛道上两个跑步者，一个跑得飞快一个慢，快的人肯定能在圈套了慢的人，当裁判抓住作弊点后，让慢的人回到起跑线用同样步速一起走，他们一定会在内圈入弯处再次迎面碰头。",
      scenarios: "适用场景：死循环排错、内存泄漏检测",
      practical: "在垃圾回收算法（GC）中的引用计数环形内存泄漏诊断，以及微服务网关分布式调用死锁死链分析中至关重要。"
},
  coreSteps: [
    '使用快慢指针机制，找到它们在环内的相遇点。',
    '如果快指针到达了链表末尾，说明无环，返回 null。',
    '相遇后，新建一个指针 ptr 指向头节点。',
    'ptr 和 slow 每次都向后移动一步，直到它们相遇。',
    '它们相遇的节点即为环的入口节点。'
  ],
  code: {
    "JavaScript": "/**\n * 寻找环形链表的入口节点\n * 输入: head = [3,2,0,-4], pos = 1 (尾部连接到索引 1 处)\n * 输出: 返回索引为 1 的链表节点\n */\nfunction detectCycle(head) {\n  if (!head || !head.next) return null;\n  let slow = head;\n  let fast = head;\n  let hasCycle = false;\n\n  while (fast !== null && fast.next !== null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) {\n      hasCycle = true;\n      break;\n    }\n  }\n\n  if (!hasCycle) return null;\n\n  let ptr = head;\n  while (ptr !== slow) {\n    ptr = ptr.next;\n    slow = slow.next;\n  }\n  return ptr;\n}",
    "Python": "/**\n * 寻找环形链表的入口节点\n * 输入: head = [3,2,0,-4], pos = 1 (尾部连接到索引 1 处)\n * 输出: 返回索引为 1 的链表节点\n */\ndef detectCycle(head):\n  if (!head or !head.next) return null\n  slow = head\n  fast = head\n  hasCycle = false\n\n  while (fast != null and fast.next != null) \n    slow = slow.next\n    fast = fast.next.next\n    if (slow == fast) \n      hasCycle = true\n      break\n    \n  \n\n  if (!hasCycle) return null\n\n  ptr = head\n  while (ptr != slow) \n    ptr = ptr.next\n    slow = slow.next\n  \n  return ptr\n",
    "C++": "/**\n * 寻找环形链表的入口节点\n * 输入: head = [3,2,0,-4], pos = 1 (尾部连接到索引 1 处)\n * 输出: 返回索引为 1 的链表节点\n */\nauto detectCycle(head) {\n  if (!head || !head.next) return null;\n  auto slow = head;\n  auto fast = head;\n  auto hasCycle = false;\n\n  while (fast !== null && fast.next !== null) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) {\n      hasCycle = true;\n      break;\n    }\n  }\n\n  if (!hasCycle) return null;\n\n  auto ptr = head;\n  while (ptr !== slow) {\n    ptr = ptr.next;\n    slow = slow.next;\n  }\n  return ptr;\n}",
    "Java": "class Solution {\n    /**\n     * 寻找环形链表的入口节点\n     * 输入: head = [3,2,0,-4], pos = 1 (尾部连接到索引 1 处)\n     * 输出: 返回索引为 1 的链表节点\n     */\n    public static var detectCycle(head) {\n      if (!head || !head.next) return null;\n      var slow = head;\n      var fast = head;\n      var hasCycle = false;\n    \n      while (fast !== null && fast.next !== null) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow === fast) {\n          hasCycle = true;\n          break;\n        }\n      }\n    \n      if (!hasCycle) return null;\n    \n      var ptr = head;\n      while (ptr !== slow) {\n        ptr = ptr.next;\n        slow = slow.next;\n      }\n      return ptr;\n    }\n}"
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
      { id: 'e31', source: '3', target: '1', state: 'highlight' } // cycle to index 1
    ];
    
    const nextNode = (idx: number) => idx === 3 ? 1 : idx + 1;
    
    steps.push({
      description: '开始快慢指针探测...',
      activeLines: [8, 9, 10],
      elements: [],
      graphData: { nodes: [...nodes], edges: [...edges], isDirected: true },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    let slow = 0;
    let fast = 0;
    let operations = 0;
    
    // Phase 1: intersect
    while (true) {
      operations++;
      slow = nextNode(slow);
      fast = nextNode(nextNode(fast));
      
      steps.push({
        description: 'slow -> ' + nodes[slow].value + ', fast -> ' + nodes[fast].value,
        activeLines: [13, 14, 15],
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
         break;
      }
    }
    
    steps.push({
      description: '快慢指针在节点 ' + nodes[slow].value + ' 相遇，证明有环。将指针 ptr 放回头节点，开始第二阶段寻找入口。',
      activeLines: [16, 17, 18, 23],
      elements: [],
      graphData: {
         nodes: nodes.map(n => ({...n, state: n.id === String(slow) ? 'sorted' : 'default'})),
         edges: [...edges],
         isDirected: true
      },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });
    
    // Phase 2: find entry
    let ptr = 0;
    while (ptr !== slow) {
       operations++;
       steps.push({
         description: 'ptr 此时在 ' + nodes[ptr].value + ', slow 此时在 ' + nodes[slow].value + '。它们都各自走一步。',
         activeLines: [24, 25, 26],
         elements: [],
         graphData: {
           nodes: nodes.map(n => {
              // we don't have a distinct highlight color in NodeState, using comparing/pivot
              if (n.id === String(ptr)) return { ...n, state: 'pivot' };
              if (n.id === String(slow)) return { ...n, state: 'comparing' };
              return { ...n, state: 'default' };
           }),
           edges: [...edges],
           isDirected: true
         },
         metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
       });
       
       ptr = nextNode(ptr);
       slow = nextNode(slow);
    }
    
    steps.push({
        description: 'ptr 和 slow 均走到节点 ' + nodes[ptr].value + ' 处并重合。此处必定是环的入口节点！',
        activeLines: [28],
        elements: [],
        graphData: {
            nodes: nodes.map(n => ({...n, state: n.id === String(ptr) ? 'sorted' : 'default'})),
            edges: [...edges],
            isDirected: true
        },
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
