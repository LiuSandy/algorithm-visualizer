import { AlgorithmDefinition } from '../../types';

export const huffmanCoding: AlgorithmDefinition = {
  id: 'huffman-coding',
  name: '哈夫曼编码 (Huffman Coding)',
  category: 'Practical' as const,
  description: '哈夫曼编码是一种基于字符频率进行最优前缀编码的无损压缩算法。',
  theory: {
    introduction: '哈夫曼编码 (Huffman Coding) 是一种无损数据压缩算法。基于字符出现的频率，构建最优前缀树，频率高的字符编码短。',
    timeComplexity: 'O(N log N) 构建树',
    spaceComplexity: 'O(N)',
    applications: ['文件压缩', '多媒体编码', '数据传输'],
      core: "基于字符出现频率构建最优前缀树，高频字符使用较短编码，低频字符使用较长编码，从而实现无损数据压缩。",
      analogy: "就像快递公司的区域分类：发往北上广的包裹（高频）放在最顺手的前排，发往偏远地区的（低频）放在仓库里面。",
      scenarios: "适用场景：无损数据压缩、文本编码",
      practical: "广泛应用于分布式缓存（如 Redis 内存优化）、RPC框架底层数据序列化压缩（如 gRPC 的首部压缩），以及海量日志在写入对象存储前的体积削减。"
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
 * 哈夫曼编码 (Huffman Coding)
 */
function huffmanCoding(text) {
  // Count frequency
  const freqs = {};
  for (let char of text) {
    freqs[char] = (freqs[char] || 0) + 1;
  }
  
  // Build priority queue/tree
  let forest = Object.keys(freqs).map(char => ({ char, freq: freqs[char] }));
  
  while (forest.length > 1) {
    forest.sort((a, b) => a.freq - b.freq); // Slow but works for demo
    
    const left = forest.shift();
    const right = forest.shift();
    
    forest.push({
      char: null,
      freq: left.freq + right.freq,
      left,
      right
    });
  }
  
  // Generate codes
  const codes = {};
  function traverse(node, path) {
    if (node.char !== null) {
      codes[node.char] = path;
      return;
    }
    if (node.left) traverse(node.left, path + '0');
    if (node.right) traverse(node.right, path + '1');
  }
  
  if (forest.length > 0) {
    traverse(forest[0], '');
  }
  
  return codes;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    let nodes = [
       { id: 'A', value: 'A(5)', x: 10, y: 80, state: 'default' },
       { id: 'B', value: 'B(2)', x: 30, y: 80, state: 'default' },
       { id: 'C', value: 'C(1)', x: 50, y: 80, state: 'default' },
       { id: 'D', value: 'D(1)', x: 70, y: 80, state: 'default' },
       { id: 'E', value: 'E(1)', x: 90, y: 80, state: 'default' }
    ];
    let edges = [];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '统计字符频率并按频率从小到大排序', activeLines: [4] });
    
    nodes.push({ id: 'CD', value: '*(2)', x: 60, y: 60, state: 'highlight' });
    nodes[2].state = 'visited'; nodes[3].state = 'visited';
    edges.push({ source: 'CD', target: 'C', state: 'default', weight: '0' }, { source: 'CD', target: 'D', state: 'default', weight: '1' });
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '取出频率最小的两个 C(1)和D(1)，合并为权重为2的父节点', activeLines: [16] });
    
    nodes.push({ id: 'CDE', value: '*(3)', x: 75, y: 40, state: 'highlight' });
    nodes[4].state = 'visited';
    edges.push({ source: 'CDE', target: 'E', state: 'default', weight: '0' }, { source: 'CDE', target: 'CD', state: 'default', weight: '1' });
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '继续取出频率最小的两个 *(2)和E(1) 合并', activeLines: [18] });
    
    nodes.push({ id: 'BCDE', value: '*(5)', x: 50, y: 20, state: 'highlight' });
    nodes[1].state = 'visited';
    edges.push({ source: 'BCDE', target: 'B', state: 'default', weight: '0' }, { source: 'BCDE', target: 'CDE', state: 'default', weight: '1' });
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '继续合并', activeLines: [18] });
    
    nodes.push({ id: 'ROOT', value: 'ROOT(10)', x: 30, y: 5, state: 'sorted' });
    nodes[0].state = 'visited';
    edges.push({ source: 'ROOT', target: 'A', state: 'path', weight: '0' }, { source: 'ROOT', target: 'BCDE', state: 'path', weight: '1' });
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '建立哈夫曼树完成，左路径编码0，右路径编码1', activeLines: [30] });

    return steps;
  }
};
