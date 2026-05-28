import { AlgorithmDefinition, SimulationStep, GraphData, GraphNode, GraphEdge } from '../types';

export const consistentHashing: AlgorithmDefinition = {
  id: 'consistentHashing',
  name: '一致性哈希 (Consistent Hashing)',
  category: 'Practical',
  description: '目标：在分布式系统中平滑地分配数据到不同的服务器缓存。当增删节点时，尽可能少地影响已有分配。\n原理：将节点和数据键全部经过同一个哈希函数映射到一个圆环（如 2^32 空间）上。数据总会顺时针寻找圆环上的下一个服务器。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "通过引入 0~2^32-1 的闭环哈希空间将机器节点与数据键映射到同一环上，顺时针寻找离数据最近的节点存储。极大降低了当节点增删时所导致的数据大规模全网迁移。",
      analogy: "大家围成一个圈坐着，服务员送来一个新快递编号1024，只要大家沿顺时针转圈，递给看到的第一个在座的人负责接收，谁走谁加人，也只会影响转圈附近的一个人而已。",
      scenarios: "适用场景：分布式数据库切片、负载均衡分发",
      practical: "Redis Cluster集群数据分区策略、Memcached集群弹性伸缩的核心基座方案，更是大型微服务RPC中无状态网关流量路由平滑扩缩的核心心法。"
},
  coreSteps: [
    '1. 拥有一个虚拟或物理服务器池，将它们的 ID / IP 进行 Hash',
    '2. 将计算得出的位置分布在一个 [0, 2^32-1] 的哈希环上',
    '3. (分配数据): 将数据的 Key 同样进行 Hash 映射至环上',
    '4. (分配数据): 从数据位置开始顺时针查找，遇到的第一台服务器即为该数据驻留的节点',
    '5. (节点宕机/扩容): 仅影响宕机节点到达上一个节点之间的缓存片段迁移'
  ],
  code: {
    "JavaScript": "class ConsistentHashRing {\n  constructor(replicas = 3) {\n    this.ring = []; // [ {hash, server} ]\n    this.replicas = replicas;\n  }\n\n  // 伪哈希计算\n  getHash(key) {\n    let sum = 0;\n    for (let char of key) sum += char.charCodeAt(0);\n    return sum % 360; \n  }\n\n  addNode(server) {\n    for (let i = 0; i < this.replicas; i++) {\n        let hash = this.getHash(server + \"#\" + i);\n        this.ring.push({ hash, server });\n    }\n    this.ring.sort((a, b) => a.hash - b.hash);\n  }\n\n  getNode(key) {\n    if (this.ring.length === 0) return null;\n    let hash = this.getHash(key);\n    for (let node of this.ring) {\n        if (node.hash >= hash) return node.server;\n    }\n    return this.ring[0].server;\n  }\n}",
    "Python": "class ConsistentHashRing \n  constructor(replicas = 3) \n    this.ring = [] # [ hash, server ]\n    this.replicas = replicas\n  \n\n  # 伪哈希计算\n  getHash(key) \n    sum = 0\n    for (char of key) sum += char.charCodeAt(0)\n    return sum % 360 \n  \n\n  addNode(server) \n    for (i = 0 i < this.replicas i++) \n        hash = this.getHash(server + \"#\" + i)\n        this.ring.append( hash, server )\n    \n    this.ring.sort((a, b) => a.hash - b.hash)\n  \n\n  getNode(key) \n    if (this.ring.__len__() == 0) return null\n    hash = this.getHash(key)\n    for (node of this.ring) \n        if (node.hash >= hash) return node.server\n    \n    return this.ring[0].server\n  \n",
    "C++": "class ConsistentHashRing {\n  constructor(replicas = 3) {\n    this.ring = []; // [ {hash, server} ]\n    this.replicas = replicas;\n  }\n\n  // 伪哈希计算\n  getHash(key) {\n    auto sum = 0;\n    for (auto char of key) sum += char.charCodeAt(0);\n    return sum % 360; \n  }\n\n  addNode(server) {\n    for (auto i = 0; i < this.replicas; i++) {\n        auto hash = this.getHash(server + \"#\" + i);\n        this.ring.push_back({ hash, server });\n    }\n    this.ring.sort((a, b) => a.hash - b.hash);\n  }\n\n  getNode(key) {\n    if (this.ring.size() === 0) return null;\n    auto hash = this.getHash(key);\n    for (auto node of this.ring) {\n        if (node.hash >= hash) return node.server;\n    }\n    return this.ring[0].server;\n  }\n}",
    "Java": "class Solution {\n    class ConsistentHashRing {\n      constructor(replicas = 3) {\n        this.ring = []; // [ {hash, server} ]\n        this.replicas = replicas;\n      }\n    \n      // 伪哈希计算\n      getHash(key) {\n        var sum = 0;\n        for (var char of key) sum += char.charCodeAt(0);\n        return sum % 360; \n      }\n    \n      addNode(server) {\n        for (var i = 0; i < this.replicas; i++) {\n            var hash = this.getHash(server + \"#\" + i);\n            this.ring.add({ hash, server });\n        }\n        this.ring.sort((a, b) => a.hash - b.hash);\n      }\n    \n      getNode(key) {\n        if (this.ring.length === 0) return null;\n        var hash = this.getHash(key);\n        for (var node of this.ring) {\n            if (node.hash >= hash) return node.server;\n        }\n        return this.ring[0].server;\n      }\n    }\n}"
},
  timeComplexity: {
    best: 'O(log N)',
    average: 'O(log N)',
    worst: 'O(N)'
  },
  spaceComplexity: 'O(N * V) (N 为物理节点数，V 为虚拟节点数)',
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    
    // We visually represent hashing in a 360-degree circle (0 to 360).
    const centerX = 50;
    const centerY = 50;
    const R = 40; 
    // Just to fit inside a hypothetical 100x100 coord system which graph visualizer auto-scales.
    
    let ringNodes: any[] = [];
    let edges: GraphEdge[] = [];
    
    let nodes: GraphNode[] = [];
    const getGraphState = (overrides: Record<string, string> = {}): GraphData => {
        return {
            nodes: nodes.map(n => ({...n, state: overrides[n.id] as any || n.state})),
            edges: edges.map(e => ({...e})),
            isDirected: true
        }
    };
    
    const getCoords = (degree: number, radius = R) => {
        let rad = (degree - 90) * Math.PI / 180;
        return {
            x: centerX + radius * Math.cos(rad),
            y: centerY + radius * Math.sin(rad)
        };
    };
    
    const addServer = (name: string, degree: number, isVirtual = false) => {
        let coords = getCoords(degree);
        nodes.push({
            id: name,
            value: isVirtual ? `V-${name}` : `S-${name}`,
            x: coords.x,
            y: coords.y,
            state: 'pivot' // Servers are pivots
        });
        ringNodes.push({id: name, degree});
    };
    
    nodes.push({ id: 'center', value: 'Hash Ring', x: centerX, y: centerY, state: 'visited' });

    steps.push({
        description: `初始化一致性哈希环。我们将散列空间表示为 0 到 360 度。`,
        activeLines: [4],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 1 }
    });
    
    // Add real servers
    addServer("A", 45);
    addServer("B", 160);
    addServer("C", 270);
    
    // Sort array by degree to connect them into a ring
    ringNodes.sort((a, b) => a.degree - b.degree);
    for(let i=0; i<ringNodes.length; i++) {
        let next = ringNodes[(i + 1) % ringNodes.length];
        edges.push({
            id: `edge-${ringNodes[i].id}-${next.id}`,
            source: ringNodes[i].id,
            target: next.id,
            state: 'default'
        });
    }

    steps.push({
        description: `添加物理服务器 S-A, S-B, S-C。通过哈希函数将它们映射到环上的随机位置。`,
        activeLines: [15, 17],
        elements: [],
        graphData: getGraphState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 4 }
    });
    
    const allocateData = (dataId: string, dataKey: string, degree: number) => {
        let coords = getCoords(degree, R - 10); // inner orbit
        nodes.push({
            id: dataId,
            value: dataKey,
            x: coords.x,
            y: coords.y,
            state: 'default'
        });
        
        steps.push({
            description: `存入新数据 [${dataKey}]。首先计算哈希并将其投射在换内的内侧轨道位置 (${degree} 度)。`,
            activeLines: [24],
            elements: [],
            graphData: getGraphState({[dataId]: 'highlight'}),
            metrics: { comparisons: 1, swaps: 0, arrayAccesses: 0, operations: 5 }
        });
        
        // Find owner: first server clockwise
        let owner = ringNodes[0].id;
        for (let n of ringNodes) {
             if (n.degree >= degree) {
                 owner = n.id;
                 break;
             }
        }
        
        edges.push({
            id: `assign-${dataId}-${owner}`,
            source: dataId,
            target: owner,
            state: 'highlight'
        });
        
        steps.push({
            description: `顺时针寻找发现第一台服务器是 S-${owner}。数据分配完成。`,
            activeLines: [26, 27],
            elements: [],
            graphData: getGraphState({[dataId]: 'sorted', [owner]: 'highlight'}),
            metrics: { comparisons: 2, swaps: 0, arrayAccesses: 0, operations: 6 }
        });
    };
    
    allocateData("d1", "user:1", 60);
    allocateData("d2", "user:2", 200);
    allocateData("d3", "config:A", 10);
    allocateData("d4", "img:99", 300);
    
    steps.push({
        description: `演示节点宕机现象，如果 S-A 宕机：原本其负责的区间（从 S-C 结束处 到 S-A 处）会顺延交给顺时针的下一台服务器 S-B 计算。这也就是一致性 Hash 优秀所在：不会全盘洗牌！`,
        activeLines: [],
        elements: [],
        graphData: getGraphState({'A': 'swapping', 'd1': 'visited', 'd3': 'visited'}),
        metrics: { comparisons: 4, swaps: 0, arrayAccesses: 0, operations: 6 }
    });

    return steps;
  }
};
