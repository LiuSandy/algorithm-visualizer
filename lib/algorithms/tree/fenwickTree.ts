import { AlgorithmDefinition } from '../../types';

export const fenwickTree: AlgorithmDefinition = {
  id: 'fenwick-tree',
  name: '树状数组 (Fenwick Tree)',
  category: 'Practical' as const,
  description: '树状数组提供了高效的前缀和查询与点更新。',
  theory: {
    introduction: '树状数组 (Fenwick Tree / Binary Indexed Tree) 用于高效更新数组元素并计算前缀和。比起线段树，它的空间利用更优，代码也更简洁。',
    timeComplexity: '查询和更新 O(log N)',
    spaceComplexity: 'O(N)',
    applications: ['前缀和计算', '逆序对统计', '数据频次分析'],
      core: "依靠计算机底层的二进制进位思想法则与超精简的 lowbit(x) 跳转运算对线上的大片前缀连续区间实现极强的数据统计提炼保存，以 O(N) 的绝对压缩空间完败线段树的臃肿特权。",
      analogy: "像是每个不同职责的财务管理员。班长手里握着全班账，第一排小组长握着两排账；你要算班里一共50个人花了多少钱，压根不用挨个人问，直接敲开几个特定的组长脑门汇总这3、4个值就是大全集了。",
      scenarios: "适用场景：海量连续点源数据快速更新和前缀和频次快速查询分析计算系统",
      practical: "在大数据分析领域的业务日志监控看板系统以及用于记录大规模流量用户点击率排行榜进行高速倒排或反常异动频繁增加值的海量大并发统计看板模块。"
},
  coreSteps: ['初始化', '执行核心逻辑', '返回结果'],
  timeComplexity: {
    best: 'O(1)',
    average: 'O(N)',
    worst: 'O(N^2)'
  },
  spaceComplexity: 'O(N)',
  code: `
/**
 * 树状数组 (Fenwick Tree)
 */
class FenwickTree {
  constructor(size) {
    this.tree = new Array(size + 1).fill(0);
  }
  
  update(i, delta) {
    while (i < this.tree.length) {
      this.tree[i] += delta;
      i += i & (-i);
    }
  }
  
  query(i) {
    let sum = 0;
    while (i > 0) {
      sum += this.tree[i];
      i -= i & (-i);
    }
    return sum;
  }
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const nodes = [
       { id: '1', value: 'C[1]=1', x: 20, y: 70, state: 'default' },
       { id: '2', value: 'C[2]=6\n(1,2)', x: 40, y: 50, state: 'highlight' },
       { id: '3', value: 'C[3]=2', x: 60, y: 70, state: 'default' },
       { id: '4', value: 'C[4]=15\n(1..4)', x: 80, y: 30, state: 'sorted' }
    ];
    let edges = [
      { source: '4', target: '2', state: 'path' },
      { source: '2', target: '1', state: 'path' },
      { source: '4', target: '3', state: 'path' }
    ];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '树状数组 (Binary Indexed Tree): C[i] 负责存储一段长度为 lowbit(i) 的子数组之和。', activeLines: [2] });
    
    nodes[0].state = 'comparing'; nodes[1].state = 'comparing'; nodes[3].state = 'comparing';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: 'Update(1, +5): 修改索引 1 的值，会通过 x += lowbit(x) 一直向上更新所有包含 1 的区间 (1 -> 2 -> 4)。', activeLines: [7] });
    
    nodes.forEach(n=>n.state='default');
    nodes[1].state = 'highlight'; nodes[2].state = 'highlight';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: 'Query(3): 计算前缀和时，通过 x -= lowbit(x) 累加 C[3] + C[2] 的值，高效 O(log N) 计算得出。', activeLines: [15] });
    
    return steps;
  }
};
