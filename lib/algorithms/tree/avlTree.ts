import { AlgorithmDefinition } from '../../types';

export const avlTree: AlgorithmDefinition = {
  id: 'avl-tree',
  name: 'AVL 树',
  category: 'Practical' as const,
  description: 'AVL树是一种高度自平衡的二叉搜索树，保证操作的最坏情况也是O(log N)。',
  theory: {
    introduction: 'AVL 树是一种自平衡二叉查找树。任何节点的两个子树的高度最大差别为 1。通过旋转操作来保持平衡。',
    timeComplexity: '搜索、插入、删除均 O(log N)',
    spaceComplexity: 'O(N)',
    applications: ['数据库索引', '内存管理', '字典系统'],
      core: "严苛引入每个节点的左右子树绝对高度差距必然 <= 1 的自旋控制法则约束机制，保证了永远严格控制在此深度的查找绝对耗时达到非常稳定的 O(log N)。",
      analogy: "一个强迫症级别的家庭天平：哪怕左边托盘上的金子只比右边重一点点（超过1格的差值），立刻触动报警开关，疯狂开始互相倾注置换金块使得天平永远几乎齐平稳妥。",
      scenarios: "适用场景：重查询且高度需要无差别稳定性的字典系统",
      practical: "在分布式底层路由或者核心配置检索，例如早期内核数据库索引、极度不容忍偶尔恶化搜寻耗时的基础微服务路由字典里作为内存树保障极其稳定的响应。"
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
 * AVL 树
 */
class AVLNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  getHeight(node) {
    return node ? node.height : 0;
  }
  
  getBalance(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }
  
  rightRotate(y) {
    let x = y.left;
    let T2 = x.right;
    x.right = y;
    y.left = T2;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    return x;
  }
  
  leftRotate(x) {
    let y = x.right;
    let T2 = y.left;
    y.left = x;
    x.right = T2;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    return y;
  }
  
  // Implementation of insert omitting for brevity 
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    let nodes = [
       { id: '30', value: '30', x: 50, y: 10, state: 'default' },
       { id: '20', value: '20', x: 25, y: 40, state: 'default' },
       { id: '40', value: '40', x: 75, y: 40, state: 'default' },
       { id: '10', value: '10', x: 12.5, y: 70, state: 'visited' }
    ];
    let edges = [
      { source: '30', target: '20', state: 'default' },
      { source: '30', target: '40', state: 'default' },
      { source: '20', target: '10', state: 'default' }
    ];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '在 AVL 树中插入新节点 5...', activeLines: [28] });
    
    nodes.push({ id: '5', value: '5', x: 5, y: 95, state: 'highlight' });
    edges.push({ source: '10', target: '5', state: 'highlight' });
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '插入完成。开始回溯更新节点的高度，并检查平衡因子 (Balance Factor)', activeLines: [12] });
    
    nodes.find(n=>n.id==='20').state = 'comparing';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '节点 20 检测到失衡 (左子树高 2，右子树高 0。差值为 2)。LL 型不平衡。', activeLines: [14] });
    
    // Rotate Right
    nodes.find(n=>n.id==='30').x = 75; nodes.find(n=>n.id==='30').y = 40;
    nodes.find(n=>n.id==='40').x = 90; nodes.find(n=>n.id==='40').y = 70;
    nodes.find(n=>n.id==='20').x = 50; nodes.find(n=>n.id==='20').y = 10;
    nodes.find(n=>n.id==='10').x = 25; nodes.find(n=>n.id==='10').y = 40;
    nodes.find(n=>n.id==='5').x = 12.5; nodes.find(n=>n.id==='5').y = 70;
    
    nodes.find(n=>n.id==='20').state = 'sorted';
    edges = [
      { source: '20', target: '10', state: 'path' },
      { source: '20', target: '30', state: 'path' },
      { source: '10', target: '5', state: 'path' },
      { source: '30', target: '40', state: 'path' }
    ];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '执行 Right Rotate(20)，保持 BST 特性的同时恢复完美平衡 O(log N)。', activeLines: [17] });
    
    return steps;
  }
};
