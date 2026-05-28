import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const reverseLinkedList: AlgorithmDefinition = {
  id: 'linkedlist-reverse',
  name: '单链表反转',
  category: 'LinkedList',
  description: '单链表反转是一个常见的算法问题，通过迭代，不断改变当前节点的 next 指针指向前一个节点，完成整条链表的翻转。由于单链表没有指向前一个节点的指针，所以反转时需要用多个指针暂存状态以防止断链。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "在线性遍历单链表的过程中，持续将前驱节点暂存，直接反转指针方向（当前指针指向上一个），最终实现整个数据流的原地逆转。",
      analogy: "像一条顺着风向的单行道指路牌：你一路往前走，每走到一个路牌，不看它指去哪，而是把它直接转过来指向你来的方向。整条路走到最后，整条交通线风向就彻底倒过来了。",
      scenarios: "适用场景：后进先出栈操作模拟、历史记录撤回",
      practical: "在基于内存的重放攻击（Replay Attack）防御日志链回溯分析系统，以及实现大容量撤销/重做（Undo/Redo）管理内存栈中体现基础价值。"
},
  coreSteps: [
    '初始化三个指针：prev 为 null，curr 为 head，next 为 null。',
    '迭代整个链表。在每次循环中：',
    '先进保存 curr.next 到 next 变量，防止断链。',
    '修改 curr.next 指向 prev，完成当前节点的指向反转。',
    '将 prev 和 curr 分别向后移动一位（prev = curr，curr = next）。'
  ],
  code: {
    "JavaScript": "/**\n * 反转单链表\n * 输入: head = [1,2,3,4,5]\n * 输出: [5,4,3,2,1]\n */\nfunction reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr !== null) {\n      let nextTemp = curr.next; // 暂存断开前的下一个节点\n      curr.next = prev;         // 反转指向\n      prev = curr;              // 后移\n      curr = nextTemp;          // 后移\n  }\n  return prev;\n}",
    "Python": "/**\n * 反转单链表\n * 输入: head = [1,2,3,4,5]\n * 输出: [5,4,3,2,1]\n */\ndef reverseList(head):\n  prev = null\n  curr = head\n  while (curr != null) \n      nextTemp = curr.next # 暂存断开前的下一个节点\n      curr.next = prev         # 反转指向\n      prev = curr              # 后移\n      curr = nextTemp          # 后移\n  \n  return prev\n",
    "C++": "/**\n * 反转单链表\n * 输入: head = [1,2,3,4,5]\n * 输出: [5,4,3,2,1]\n */\nauto reverseList(head) {\n  auto prev = null;\n  auto curr = head;\n  while (curr !== null) {\n      auto nextTemp = curr.next; // 暂存断开前的下一个节点\n      curr.next = prev;         // 反转指向\n      prev = curr;              // 后移\n      curr = nextTemp;          // 后移\n  }\n  return prev;\n}",
    "Java": "class Solution {\n    /**\n     * 反转单链表\n     * 输入: head = [1,2,3,4,5]\n     * 输出: [5,4,3,2,1]\n     */\n    public static var reverseList(head) {\n      var prev = null;\n      var curr = head;\n      while (curr !== null) {\n          var nextTemp = curr.next; // 暂存断开前的下一个节点\n          curr.next = prev;         // 反转指向\n          prev = curr;              // 后移\n          curr = nextTemp;          // 后移\n      }\n      return prev;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const values = ['1', '2', '3', '4', '5'];
    
    // Create initial list
    let nodes: GraphNode[] = values.map((val, i) => ({
      id: val, value: val, x: 20 + i * 20, y: 50, state: 'default'
    }));
    
    // Add null nodes
    nodes.push({ id: 'null0', value: 'null', x: 0, y: 50, state: 'default' });
    nodes.push({ id: 'null6', value: 'null', x: 120, y: 50, state: 'default' });
    
    let edges: GraphEdge[] = [];
    for (let i = 0; i < values.length - 1; i++) {
        edges.push({ id: `e${values[i]}-${values[i+1]}`, source: values[i], target: values[i+1], state: 'default' });
    }
    edges.push({ id: `e5-null6`, source: '5', target: 'null6', state: 'default' });

    steps.push({
      description: '初始化链表，准备反转',
      activeLines: [7, 8],
      elements: [],
      graphData: { nodes: [...nodes], edges: [...edges], isDirected: true },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    let prev = 'null0';
    let curr = '1';
    let operations = 0;

    for (let i = 0; i < values.length; i++) {
        const nextNode = i < values.length - 1 ? values[i+1] : 'null6';
        
        operations++;
        // 1. highlight curr
        steps.push({
            description: `当前节点 curr 为 ${curr}，prev 为 ${prev === 'null0' ? 'null' : prev}`,
            activeLines: [9, 10],
            elements: [],
            graphData: {
                nodes: nodes.map(n => ({...n, state: n.id === curr ? 'comparing' : (n.id === prev ? 'pivot' : 'default')})),
                edges: [...edges],
                isDirected: true
            },
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        // 2. break and point
        const oldEdgeIdx = edges.findIndex(e => e.source === curr);
        if (oldEdgeIdx !== -1) {
            edges.splice(oldEdgeIdx, 1);
        }
        
        edges.push({
            id: `e${curr}-${prev}`, source: curr, target: prev, state: 'highlight'
        });

        steps.push({
            description: `反转指针：将节点 ${curr} 的 next 指向 prev (${prev === 'null0' ? 'null' : prev})`,
            activeLines: [11],
            elements: [],
            graphData: {
                nodes: nodes.map(n => ({...n, state: n.id === curr ? 'comparing' : (n.id === prev ? 'pivot' : 'default')})),
                edges: [...edges],
                isDirected: true
            },
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        // 3. shift
        steps.push({
            description: `后移指针：prev 移动到 ${curr}，curr 移动到 ${nextNode}`,
            activeLines: [12, 13],
            elements: [],
            graphData: {
                nodes: nodes.map(n => ({...n, state: n.id === nextNode ? 'comparing' : (n.id === curr ? 'pivot' : 'default')})),
                edges: [...edges].map(e => ({...e, state: 'default'})),
                isDirected: true
            },
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        prev = curr;
        curr = nextNode;
    }

    steps.push({
        description: `遍历结束，curr 指向 null。新的头节点为 prev (${prev})`,
        activeLines: [15],
        elements: [],
        graphData: {
            nodes: nodes.map(n => ({...n, state: 'sorted'})),
            edges: [...edges],
            isDirected: true
        },
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
