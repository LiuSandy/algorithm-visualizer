import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const trieAlgorithm: AlgorithmDefinition = {
  id: 'trie',
  name: '前缀树/字典树 (Trie)',
  category: 'Tree',
  description: '目标：高效地存储和检索字符串数据集中的键。常用于单词自动补全、拼写检查。\n原理：将字符串共用的前缀复用成一条路径。',
  theory: {
    complexity: `平均依赖高度 H 也就是 O(log N)。但如果这棵树长歪了成了枯竹(单链)，性能便轰塌退化为 O(N)。`,
    prosCons: `✅ 优点：极度契合系统的深幽栈回溯和裂变式思维。
❌ 缺点：对失衡极度恐惧，极其排斥非递归重构下的重叠遍历。`,
    interview: `重灾考题中的皇室：各种遍历手撕极其普遍。必须要对左指针、右指针的判断肌肉记忆如肌肉抽搐般敏锐。`,
      core: "被赋予灵魂的前缀节点串接重用的树状映射体，将无数串共同开头的前字当成了无数共生重叠公用祖宗树干路线点位；直接突破单纯比对耗时并且极限缩减同头公用资源海量字符串存取，极化在短尾序列里查询的神异体验。",
      analogy: "这分明如同超级巨大的快速智能字典查阅器索引树！所有想找或者存放包含“Apple”、“Appstore”的长串只需要沿着巨大树皮从根干起“A”-“p”-“p”这条极度公共唯一必经的大高速上走到底绝对不重合造浪费道路、直到查完后才分道扬镳去它自己不同的果实落脚枝头去寻找存储点所在处。",
      scenarios: "适用场景：超级搜索高频词及IP网址海量路由路径前缀分配查找、大批量字符串字典匹配检查",
      practical: "这是我们在各类互联网搜索网站中每天习以为常并且频繁操作但背后巨强的下拉补词自动“联想搜索（Autocomplete Engine）词汇体系”、以及底层超高速网络设备进行 IPv4或IPv6 各类IP前缀高速转发映射规则里无法超越和不可缺失的引擎盖下的猛兽心脏体系！"
},
  coreSteps: [
    '1. 拥有一个根节点，它不含任何字符信息',
    '2. (Insert): 遍历待插入字符串的每一个字符',
    '3. (Insert): 如果当前节点的子节点集合中没有该字符，就新建子节点',
    '4. (Insert): 遍历完毕时，在此节点打上 isEnd=true 标记',
    '5. (Search): 按照字符顺图索骥，若走不通则返回 false，走到底且 isEnd=true 返回 true'
  ],
  code: {
    "JavaScript": "class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEnd = false;\n  }\n}\nclass Trie {\n  constructor() {\n    this.root = new TrieNode();\n  }\n  insert(word) {\n    let node = this.root;\n    for (const char of word) {\n      if (!node.children[char]) {\n        node.children[char] = new TrieNode();\n      }\n      node = node.children[char];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    let node = this.root;\n    for (const char of word) {\n      if (!node.children[char]) return false;\n      node = node.children[char];\n    }\n    return node.isEnd;\n  }\n}",
    "Python": "class TrieNode \n  constructor() \n    this.children = \n    this.isEnd = false\n  \n\nclass Trie \n  constructor() \n    this.root = TrieNode()\n  \n  insert(word) \n    node = this.root\n    for (char of word) \n      if (!node.children[char]) \n        node.children[char] = TrieNode()\n      \n      node = node.children[char]\n    \n    node.isEnd = true\n  \n  search(word) \n    node = this.root\n    for (char of word) \n      if (!node.children[char]) return false\n      node = node.children[char]\n    \n    return node.isEnd\n  \n",
    "C++": "class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEnd = false;\n  }\n}\nclass Trie {\n  constructor() {\n    this.root = new TrieNode();\n  }\n  insert(word) {\n    auto node = this.root;\n    for (auto char of word) {\n      if (!node.children[char]) {\n        node.children[char] = new TrieNode();\n      }\n      node = node.children[char];\n    }\n    node.isEnd = true;\n  }\n  search(word) {\n    auto node = this.root;\n    for (auto char of word) {\n      if (!node.children[char]) return false;\n      node = node.children[char];\n    }\n    return node.isEnd;\n  }\n}",
    "Java": "class Solution {\n    class TrieNode {\n      constructor() {\n        this.children = {};\n        this.isEnd = false;\n      }\n    }\n    class Trie {\n      constructor() {\n        this.root = new TrieNode();\n      }\n      insert(word) {\n        var node = this.root;\n        for (var char of word) {\n          if (!node.children[char]) {\n            node.children[char] = new TrieNode();\n          }\n          node = node.children[char];\n        }\n        node.isEnd = true;\n      }\n      search(word) {\n        var node = this.root;\n        for (var char of word) {\n          if (!node.children[char]) return false;\n          node = node.children[char];\n        }\n        return node.isEnd;\n      }\n    }\n}"
},
  timeComplexity: {
    best: 'O(L) (L 为待查询字符串长度)',
    average: 'O(L)',
    worst: 'O(L)'
  },
  spaceComplexity: 'O(N * L * |Sigma|) N为单词数量, Sigma为字符集',
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // Hardcode visualization logic for words inserting
    const words = ["car", "cat", "do", "dog"];
    
    let nodes: GraphNode[] = [{ id: 'root', value: 'Root', x: 50, y: 10, state: 'default' }];
    let edges: GraphEdge[] = [];
    
    const getGraphState = (nodeOverrides: Record<string, string> = {}, edgeOverrides: Record<string, string> = {}): GraphData => {
        return {
            nodes: nodes.map(n => ({...n, state: nodeOverrides[n.id] as any || n.state})),
            edges: edges.map(e => ({...e, state: edgeOverrides[e.id] as any || e.state})),
            isDirected: true
        }
    };
    
    steps.push({
        description: `初始化前缀树。根节点为空，不存储实际字符。准备插入单词：["car", "cat", "do", "dog"]`,
        activeLines: [9],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 1 }
    });
    
    interface VirtNode {
       id: string;
       char: string;
       isEnd: boolean;
       children: Record<string, VirtNode>;
       x: number;
       y: number;
    }
    
    let virtRoot: VirtNode = { id: 'root', char: '', isEnd: false, children: {}, x: 50, y: 10 };
    let operations = 0;
    let nodeCount = 1;
    
    for (let word of words) {
        let currentNode = virtRoot;
        let cId = 'root';
        
        steps.push({
            description: `开始插入单词：[${word}]`,
            activeLines: [12],
            elements: [],
            graphData: getGraphState({[cId]: 'highlight'}),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: operations++ }
        });
        
        let pathEdges: string[] = [];
        
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            operations++;
            
            if (!currentNode.children[char]) {
                nodeCount++;
                // Compute rough coordinates. (c-a)*x offset or something simpler?
                // Just use generic layout calculation.
                // It's just a demo visual. Let's make left words spread.
                // Very naive spreading.
                let nx = currentNode.x + (char > 'c' ? 20 : (char < 'c' ? -20 : 0)) + (Math.random() * 10 - 5);
                let ny = currentNode.y + 20;
                
                let newNode: VirtNode = { 
                    id: `n${nodeCount}`, 
                    char, 
                    isEnd: false, 
                    children: {},
                    x: nx,
                    y: ny
                };
                currentNode.children[char] = newNode;
                
                nodes.push({ id: newNode.id, value: char, x: nx, y: ny, state: 'sorted' });
                let eId = `e${currentNode.id}-${newNode.id}`;
                edges.push({ id: eId, source: currentNode.id, target: newNode.id, state: 'highlight', isDirected: true });
                pathEdges.push(eId);
                
                currentNode = newNode;
                cId = newNode.id;
                
                steps.push({
                    description: `不存在字符分支 '${char}'，新建节点。`,
                    activeLines: [14, 15],
                    elements: [],
                    graphData: getGraphState({[cId]: 'highlight'}, {[eId]: 'highlight'}),
                    metrics: { comparisons: 1, swaps: 0, arrayAccesses: 0, operations }
                });
                
            } else {
                currentNode = currentNode.children[char];
                let eId = `e${cId}-${currentNode.id}`;
                cId = currentNode.id;
                pathEdges.push(eId);
                
                steps.push({
                    description: `已存在字符分支 '${char}'，直接复用节点，继续下探。`,
                    activeLines: [17],
                    elements: [],
                    graphData: getGraphState({[cId]: 'highlight'}, {[eId]: 'highlight'}),
                    metrics: { comparisons: 1, swaps: 0, arrayAccesses: 0, operations }
                });
            }
        }
        
        currentNode.isEnd = true;
        // set the visual node to partition to mark it is an end.
        let vNode = nodes.find(n => n.id === cId);
        if (vNode) vNode.state = 'partition';
        
        steps.push({
            description: `单词 ${word} 遍历完毕。在叶节点 '${currentNode.char}' 上打上终止标记（紫色/标记为终点）。`,
            activeLines: [19],
            elements: [],
            graphData: getGraphState(),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
    }

    return steps;
  }
};
