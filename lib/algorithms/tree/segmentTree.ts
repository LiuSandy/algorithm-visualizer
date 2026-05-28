import { AlgorithmDefinition } from '../../types';

export const segmentTree: AlgorithmDefinition = {
  id: 'segment-tree',
  name: '线段树 (Segment Tree)',
  category: 'Practical' as const,
  description: '线段树是一种提供区间查询和更新操作的高效数据结构。',
  theory: {
    introduction: '线段树 (Segment Tree) 是一种数据结构，用于高效地处理区间查询和区间更新操作。每个节点表示数组的一段区间。',
    timeComplexity: '查询和更新 O(log N)',
    spaceComplexity: 'O(N)',
    applications: ['计算几何', '动态区间查询', 'RMQ问题'],
      core: "把超级连续长的一维大序列粗暴且巧妙的撕裂重构成无数基于大包小的小块父子区间管辖段的合并数据统领节点网络。任何涉及某大段的巨量反复的运算由于均分节点块统管能惊呆旁人达到令人艳羡绝对高效超神的 O(logN) 速度！",
      analogy: "管理巨大公司最恐怖人数时发工资时不用从第一排排长查到上千号最后一个人累成狗；而是只需调用：找十区长，三区长，他区长手下自然有各个小段的金额统领账目！你要查 12区 到 78区直接拍一连串相关连小领导的总合报数瞬间就能报出绝对全金额巨大之和。",
      scenarios: "适用场景：处理千变万化频繁且杂乱无章区范围数值重算与改查的竞赛业务场景计算系统",
      practical: "作为大厂风控防御系统统计（大量不同时期的不规律频次攻击频率数据流）、在云安全监控平台下用来随时执行针对极大网络大区段和高压峰值异响频次快速监控检测警报汇总反馈的后台大数据合并算法中绝佳出镜。"
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
 * 线段树 (Segment Tree)
 */
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(2 * this.n);
    // Build tree
    for (let i = 0; i < this.n; i++) {
      this.tree[this.n + i] = arr[i];
    }
    for (let i = this.n - 1; i > 0; --i) {
      this.tree[i] = this.tree[i * 2] + this.tree[i * 2 + 1];
    }
  }
  
  update(pos, value) {
    for (this.tree[pos += this.n] = value; pos > 1; pos >>= 1) {
      this.tree[pos >> 1] = this.tree[pos] + this.tree[pos ^ 1];
    }
  }
  
  query(left, right) {
    let res = 0;
    for (left += this.n, right += this.n; left < right; left >>= 1, right >>= 1) {
      if ((left & 1) > 0) res += this.tree[left++];
      if ((right & 1) > 0) res += this.tree[--right];
    }
    return res;
  }
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const nodes = [
       { id: '1', value: 'sum: 15\n[0,3]', x: 50, y: 10, state: 'highlight' },
       { id: '2', value: 'sum: 6\n[0,1]', x: 25, y: 40, state: 'visited' },
       { id: '3', value: 'sum: 9\n[2,3]', x: 75, y: 40, state: 'visited' },
       { id: '4', value: '1\n[0,0]', x: 12.5, y: 70, state: 'default' },
       { id: '5', value: '5\n[1,1]', x: 37.5, y: 70, state: 'default' },
       { id: '6', value: '2\n[2,2]', x: 62.5, y: 70, state: 'default' },
       { id: '7', value: '7\n[3,3]', x: 87.5, y: 70, state: 'default' }
    ];
    let edges = [
      { source: '1', target: '2', state: 'default' },
      { source: '1', target: '3', state: 'default' },
      { source: '2', target: '4', state: 'default' },
      { source: '2', target: '5', state: 'default' },
      { source: '3', target: '6', state: 'default' },
      { source: '3', target: '7', state: 'default' }
    ];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '递归构建线段树 (Segment Tree)，每个叶子节点是数组元素，父节点是子区间之和 (或最值)', activeLines: [6] });
    
    nodes[0].state = 'comparing'; nodes[2].state = 'path'; edges[1].state = 'path';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '区间查询 Range Query [2, 3]，向下遍历，发现右子树整体落入查询范围直接返回 9', activeLines: [22] });
    
    nodes.forEach(n=>n.state='default'); edges.forEach(e=>e.state='default');
    nodes[4].value = '8\n[1,1]'; nodes[4].state = 'sorted';
    nodes[1].value = '9\n[0,1]'; nodes[1].state = 'highlight'; edges[3].state = 'highlight';
    nodes[0].value = '18\n[0,3]'; nodes[0].state = 'highlight'; edges[0].state = 'highlight';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '单点修改 Update：更新索引 1 为 8，沿着树向上逐层 O(log N) 修改所有的受影响的区间段', activeLines: [14] });
    
    return steps;
  }
};
