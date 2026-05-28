import { AlgorithmDefinition, ArrayElement, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const mergeTwoLists: AlgorithmDefinition = {
  id: 'linkedlist-merge',
  name: '链表合并 (Merge Sorted Lists)',
  category: 'LinkedList',
  description: '将两个升序链表合并为一个新的升序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。通常使用双指针法，配合一个虚拟头节点（dummy node）来简化边界条件的处理。',
  theory: {
    complexity: `严丝合缝的树形结构，永远稳如磐石的 O(N log N) 时间复杂度，不受任何极端恶劣数据影响。但在合并阶段必须申请额外数组装载临时数据，空间复杂度高达 O(N)。`,
    prosCons: `✅ 优点：不受数据状态影响，永远保持最高水准速度；属于极其稳定的对象型排序。
❌ 缺点：内存消耗极其奢侈，高达 O(N) 的冗余拷贝成本。`,
    interview: `手撕高频：利用额外数组实现合并逻辑。衍生进阶题【逆序对计算】：直接在 Merge 过程顺手统计左右跨越产生的颠倒状态计数，代码一模一样。`,
      core: "使用双指针技巧或递归法将两组已经独立有序的链表归并在一个具有稳定顺序的增量新链表之上。",
      analogy: "拉链合并：拿两个已经按大小排好的扑克牌堆，每次从两堆最上面挑一张，只要挑数字小（或者大）的放到新牌堆里，最后总能拼成一整副排好序的牌。",
      scenarios: "适用场景：海量数据外部排序归并、有序日志流聚合",
      practical: "在分布式系统流处理（如 Kafka 消费流处理、Flink Window JOIN操作）中对多组时间序列（Timestamps）事件流的数据进行有序合并。"
},
  coreSteps: [
    '初始化一个虚拟头节点 dummy，并用一个指针 curr 指向它。',
    '遍历两个链表 l1 和 l2，只要都不为空：',
    '比较 l1 和 l2 当前节点的值。将 curr.next 指向较小值的节点。',
    '将对应较小值的指针（l1 或 l2）向后移动一位，curr 也向后移动一位。',
    '遍历结束后，将还不为空的那个链表直接接在 curr 之后。'
  ],
  code: {
    "JavaScript": "/**\n * 合并两个有序链表\n * 输入: l1 = [1,2,4], l2 = [1,3,4]\n * 输出: [1,1,2,3,4,4]\n */\nfunction mergeTwoLists(l1, l2) {\n  let dummy = new ListNode(0);\n  let curr = dummy;\n  while (l1 !== null && l2 !== null) {\n    if (l1.val < l2.val) {\n      curr.next = l1;\n      l1 = l1.next;\n    } else {\n      curr.next = l2;\n      l2 = l2.next;\n    }\n    curr = curr.next;\n  }\n  curr.next = l1 !== null ? l1 : l2;\n  return dummy.next;\n}",
    "Python": "/**\n * 合并两个有序链表\n * 输入: l1 = [1,2,4], l2 = [1,3,4]\n * 输出: [1,1,2,3,4,4]\n */\ndef mergeTwoLists(l1, l2):\n  dummy = ListNode(0)\n  curr = dummy\n  while (l1 != null and l2 != null) \n    if (l1.val < l2.val) \n      curr.next = l1\n      l1 = l1.next\n     else \n      curr.next = l2\n      l2 = l2.next\n    \n    curr = curr.next\n  \n  curr.next = l1 != null ? l1 : l2\n  return dummy.next\n",
    "C++": "/**\n * 合并两个有序链表\n * 输入: l1 = [1,2,4], l2 = [1,3,4]\n * 输出: [1,1,2,3,4,4]\n */\nauto mergeTwoLists(l1, l2) {\n  auto dummy = new ListNode(0);\n  auto curr = dummy;\n  while (l1 !== null && l2 !== null) {\n    if (l1.val < l2.val) {\n      curr.next = l1;\n      l1 = l1.next;\n    } else {\n      curr.next = l2;\n      l2 = l2.next;\n    }\n    curr = curr.next;\n  }\n  curr.next = l1 !== null ? l1 : l2;\n  return dummy.next;\n}",
    "Java": "class Solution {\n    /**\n     * 合并两个有序链表\n     * 输入: l1 = [1,2,4], l2 = [1,3,4]\n     * 输出: [1,1,2,3,4,4]\n     */\n    public static var mergeTwoLists(l1, l2) {\n      var dummy = new ListNode(0);\n      var curr = dummy;\n      while (l1 !== null && l2 !== null) {\n        if (l1.val < l2.val) {\n          curr.next = l1;\n          l1 = l1.next;\n        } else {\n          curr.next = l2;\n          l2 = l2.next;\n        }\n        curr = curr.next;\n      }\n      curr.next = l1 !== null ? l1 : l2;\n      return dummy.next;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n + m)',
    average: 'O(n + m)',
    worst: 'O(n + m)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const l1Vals = [1, 3, 5];
    const l2Vals = [2, 4, 6];
    
    let nodes: GraphNode[] = [
      { id: 'dummy', value: 'D', x: 10, y: 50, state: 'default' }
    ];
    
    let edges: GraphEdge[] = [];
    
    // Build l1
    for (let i = 0; i < l1Vals.length; i++) {
        nodes.push({ id: 'l1_' + l1Vals[i], value: String(l1Vals[i]), x: 30 + i * 20, y: 20, state: 'default' });
        if (i > 0) edges.push({ id: 'e_l1_' + l1Vals[i-1] + '_' + l1Vals[i], source: 'l1_' + l1Vals[i-1], target: 'l1_' + l1Vals[i], state: 'default' });
    }
    nodes.push({ id: 'l1_null', value: 'null', x: 30 + l1Vals.length * 20, y: 20, state: 'default' });
    edges.push({ id: 'e_l1_end', source: 'l1_' + l1Vals[l1Vals.length-1], target: 'l1_null', state: 'default' });
    
    // Build l2
    for (let i = 0; i < l2Vals.length; i++) {
        nodes.push({ id: 'l2_' + l2Vals[i], value: String(l2Vals[i]), x: 30 + i * 20, y: 80, state: 'default' });
        if (i > 0) edges.push({ id: 'e_l2_' + l2Vals[i-1] + '_' + l2Vals[i], source: 'l2_' + l2Vals[i-1], target: 'l2_' + l2Vals[i], state: 'default' });
    }
    nodes.push({ id: 'l2_null', value: 'null', x: 30 + l2Vals.length * 20, y: 80, state: 'default' });
    edges.push({ id: 'e_l2_end', source: 'l2_' + l2Vals[l2Vals.length-1], target: 'l2_null', state: 'default' });
    
    steps.push({
      description: '初始化两个有序链表 L1 和 L2，以及一个虚拟头节点 (dummy)',
      activeLines: [7, 8],
      elements: [],
      graphData: { nodes: [...nodes], edges: [...edges], isDirected: true },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    let curr = 'dummy';
    let p1 = 0;
    let p2 = 0;
    let operations = 0;
    let comparisons = 0;
    let finalEdges: GraphEdge[] = [];

    while (p1 < l1Vals.length && p2 < l2Vals.length) {
        comparisons++;
        const node1 = 'l1_' + l1Vals[p1];
        const node2 = 'l2_' + l2Vals[p2];
        
        steps.push({
            description: '比较 L1 的节点 ' + l1Vals[p1] + ' 和 L2 的节点 ' + l2Vals[p2],
            activeLines: [9, 10],
            elements: [],
            graphData: {
                nodes: nodes.map(n => ({...n, state: n.id === node1 || n.id === node2 ? 'comparing' : (n.id === curr ? 'pivot' : 'default')})),
                edges: [...edges, ...finalEdges],
                isDirected: true
            },
            metrics: { comparisons, swaps: 0, arrayAccesses: 0, operations }
        });
        
        operations++;
        if (l1Vals[p1] < l2Vals[p2]) {
            finalEdges.push({ id: 'merged_' + operations, source: curr, target: node1, state: 'highlight' });
            steps.push({
                description: l1Vals[p1] + ' < ' + l2Vals[p2] + '，将 curr 的 next 指向 ' + l1Vals[p1] + '，并移动 L1 指针',
                activeLines: [11, 12, 17],
                elements: [],
                graphData: {
                    nodes: nodes.map(n => ({...n, state: n.id === node1 ? 'sorted' : (n.id === curr ? 'pivot' : 'default')})),
                    edges: [...edges, ...finalEdges],
                    isDirected: true
                },
                metrics: { comparisons, swaps: 0, arrayAccesses: 0, operations }
            });
            curr = node1;
            p1++;
        } else {
            finalEdges.push({ id: 'merged_' + operations, source: curr, target: node2, state: 'highlight' });
            steps.push({
                description: l2Vals[p2] + ' <= ' + l1Vals[p1] + '，将 curr 的 next 指向 ' + l2Vals[p2] + '，并移动 L2 指针',
                activeLines: [14, 15, 17],
                elements: [],
                graphData: {
                    nodes: nodes.map(n => ({...n, state: n.id === node2 ? 'sorted' : (n.id === curr ? 'pivot' : 'default')})),
                    edges: [...edges, ...finalEdges],
                    isDirected: true
                },
                metrics: { comparisons, swaps: 0, arrayAccesses: 0, operations }
            });
            curr = node2;
            p2++;
        }
    }
    
    operations++;
    const remainingNode = p1 < l1Vals.length ? 'l1_' + l1Vals[p1] : (p2 < l2Vals.length ? 'l2_' + l2Vals[p2] : 'l1_null');
    finalEdges.push({ id: 'merged_' + operations, source: curr, target: remainingNode, state: 'highlight' });
    
    steps.push({
        description: '其中一个链表已遍历完，将剩余的部分直接连接到 curr 之后',
        activeLines: [19, 20],
        elements: [],
        graphData: {
            nodes: nodes.map(n => ({...n, state: 'default'})),
            edges: [...edges, ...finalEdges],
            isDirected: true
        },
        metrics: { comparisons, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
