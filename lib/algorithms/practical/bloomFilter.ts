import { AlgorithmDefinition, SimulationStep } from '../types';

export const bloomFilterAlgorithm: AlgorithmDefinition = {
  id: 'bloomFilter',
  name: '布隆过滤器 (Bloom Filter)',
  category: 'Practical',
  description: '目标：高效、概率性地测试一个元素是否属于一个集合（常用于海量数据过滤）。\n原理：使用一个超长的位数组（Bit array）和多个独立的哈希函数。它可能会出现假阳性（误判存在），但绝不会有假阴性（误判不存在）。',
  theory: {
    complexity: `只需过几个极简哈希函数，O(K)。极其抠门的占用底层最便宜的比特位（Bit），把数亿规模的数据存在感硬生生塞进十几MB超低负担内存中。`,
    prosCons: `✅ 优点：体小轻如鸿毛。阻击无聊数据的超神级门神。
❌ 缺点：会有“无中生有”的误报几率存在，且写入位图后犹如墨水入海，这让它天生不支持干净的删除机制。`,
    interview: `布隆过滤器如果查到【存在】是真的存在吗？（答：不一定，存在哈希碰撞）；查不到那真不存在吗？（答：绝对不存在）。`,
      core: "利用巨大的位掩码数组和若干个独立的哈希函数。当写入数据时将多个哈希映射位设为1；查询时只要有一个哈希位为0必定不存在，全为1则可能存在（有一定的假阳性错误率）。",
      analogy: "就像酒店大堂不记得几千万人的名字全拼，但保安会看人：只要进门的人‘没戴眼镜、穿红衣、背黑包’有一项不符合，那他绝对没来过。但全吻合的可能碰巧是个撞衫的陌生人。",
      scenarios: "适用场景：海量数据排重查重、缓存穿透防御",
      practical: "云原生微服务海量调用下的缓存穿透屏障第一道防线、也是 Apache HBase 等巨型列式数据库、CDN 防止全网扫描穿透请求的标配工业级组件。"
},
  coreSteps: [
    '1. 拥有一个具有 m 个比特的数组，将其全部置为 0',
    '2. 选中 k 个不同的哈希函数',
    '3. (Add): 对于每个新加入的字符串内容，用这 k 个哈希函数计算出 k 个位置，将它们标记为 1',
    '4. (Check): 对于要查找的字符串，计算它的 k 个哈希位置',
    '5. (Check): 若这些比特位置全都是 1，说明元素**可能**存在；只要有一个为 0，则元素**绝对**不存在'
  ],
  code: {
    "JavaScript": "class BloomFilter {\n  constructor(size = 10) {\n    this.bitArray = new Array(size).fill(0);\n    this.size = size;\n  }\n\n  // 模拟哈希函数 1\n  hash1(item) {\n    let sum = 0;\n    for (let char of item) sum += char.charCodeAt(0);\n    return sum % this.size;\n  }\n\n  // 模拟哈希函数 2\n  hash2(item) {\n    let sum = 0;\n    for (let char of item) sum += char.charCodeAt(0) * 3;\n    return sum % this.size;\n  }\n\n  add(item) {\n    this.bitArray[this.hash1(item)] = 1;\n    this.bitArray[this.hash2(item)] = 1;\n  }\n\n  has(item) {\n    return this.bitArray[this.hash1(item)] === 1 && \n           this.bitArray[this.hash2(item)] === 1;\n  }\n}",
    "Python": "class BloomFilter \n  constructor(size = 10) \n    this.bitArray = Array(size).fill(0)\n    this.size = size\n  \n\n  # 模拟哈希函数 1\n  hash1(item) \n    sum = 0\n    for (char of item) sum += char.charCodeAt(0)\n    return sum % this.size\n  \n\n  # 模拟哈希函数 2\n  hash2(item) \n    sum = 0\n    for (char of item) sum += char.charCodeAt(0) * 3\n    return sum % this.size\n  \n\n  add(item) \n    this.bitArray[this.hash1(item)] = 1\n    this.bitArray[this.hash2(item)] = 1\n  \n\n  has(item) \n    return this.bitArray[this.hash1(item)] == 1 and \n           this.bitArray[this.hash2(item)] == 1\n  \n",
    "C++": "class BloomFilter {\n  constructor(size = 10) {\n    this.bitArray = new Array(size).fill(0);\n    this.size = size;\n  }\n\n  // 模拟哈希函数 1\n  hash1(item) {\n    auto sum = 0;\n    for (auto char of item) sum += char.charCodeAt(0);\n    return sum % this.size;\n  }\n\n  // 模拟哈希函数 2\n  hash2(item) {\n    auto sum = 0;\n    for (auto char of item) sum += char.charCodeAt(0) * 3;\n    return sum % this.size;\n  }\n\n  add(item) {\n    this.bitArray[this.hash1(item)] = 1;\n    this.bitArray[this.hash2(item)] = 1;\n  }\n\n  has(item) {\n    return this.bitArray[this.hash1(item)] === 1 && \n           this.bitArray[this.hash2(item)] === 1;\n  }\n}",
    "Java": "class Solution {\n    class BloomFilter {\n      constructor(size = 10) {\n        this.bitArray = new Array(size).fill(0);\n        this.size = size;\n      }\n    \n      // 模拟哈希函数 1\n      hash1(item) {\n        var sum = 0;\n        for (var char of item) sum += char.charCodeAt(0);\n        return sum % this.size;\n      }\n    \n      // 模拟哈希函数 2\n      hash2(item) {\n        var sum = 0;\n        for (var char of item) sum += char.charCodeAt(0) * 3;\n        return sum % this.size;\n      }\n    \n      add(item) {\n        this.bitArray[this.hash1(item)] = 1;\n        this.bitArray[this.hash2(item)] = 1;\n      }\n    \n      has(item) {\n        return this.bitArray[this.hash1(item)] === 1 && \n               this.bitArray[this.hash2(item)] === 1;\n      }\n    }\n}"
},
  timeComplexity: {
    best: 'O(k) k为哈希函数个数',
    average: 'O(k)',
    worst: 'O(k)'
  },
  spaceComplexity: 'O(m) m为位数组长度',
  generateSteps: (initialArray, options) => {
    const steps: SimulationStep[] = [];
    const size = 15; // fixed size for visual layout
    
    // Simulate ops
    const ops = [
      { type: 'add', item: 'apple' },
      { type: 'add', item: 'orange' },
      { type: 'check', item: 'apple' },
      { type: 'check', item: 'grape' }, // will miss
      { type: 'check', item: 'pear' }   // could cause a false positive in simulation sometimes, but likely miss
    ];
    
    const bitArray = new Array(size).fill(0);
    
    // Simplified fake hashing identical to code logic
    const hash1 = (item: string) => {
        let sum = 0;
        for (let i = 0; i < item.length; i++) sum += item.charCodeAt(i);
        return sum % size;
    };
    const hash2 = (item: string) => {
        let sum = 0;
        for (let i = 0; i < item.length; i++) sum += item.charCodeAt(i) * 3;
        return sum % size;
    };
    
    const serializeBits = (hHighlights: number[] = [], hitHighlights: number[] = []) => {
        return bitArray.map((bit, index) => {
             let state = 'default';
             if (hitHighlights.includes(index)) {
                 state = 'sorted';
             } else if (hHighlights.includes(index)) {
                 state = 'comparing';
             } else if (bit === 1) {
                 state = 'visited'; // already filled
             }
             return {
                 id: `bit-${index}`,
                 value: bit,
                 display: `[${index}] = ${bit}`,
                 state: state as any
             }
        });
    }

    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    steps.push({
      elements: serializeBits(),
      description: `初始化了一个长度 m = ${size} 的空白位数组（Bit array）。并准备 2 个简单的哈希函数。布隆过滤器主要节约大量空间。`,
      activeLines: [2, 3],
      metrics: { ...metrics }
    });
    
    for (let op of ops) {
        let h1 = hash1(op.item);
        let h2 = hash2(op.item);
        metrics.operations++;
        
        if (op.type === 'add') {
             steps.push({
                elements: serializeBits(),
                description: `ADD 操作：我们要向过滤器写入 "${op.item}"。`,
                activeLines: [21],
                metrics: { ...metrics }
             });
             
             steps.push({
                elements: serializeBits([h1, h2]),
                description: `计算出 "${op.item}" 对应的两个散列位置（Hash）分别是：${h1} 和 ${h2}。`,
                activeLines: [22, 23],
                metrics: { ...metrics }
             });
             
             metrics.arrayAccesses += 2;
             bitArray[h1] = 1;
             bitArray[h2] = 1;
             
             steps.push({
                elements: serializeBits([], [h1, h2]),
                description: `将比特位 [${h1}] 和 [${h2}] 的值设为 1，此时已记录该元素的存在。`,
                activeLines: [22, 23, 24],
                metrics: { ...metrics }
             });
        }
        
        if (op.type === 'check') {
             steps.push({
                elements: serializeBits(),
                description: `CHECK 操作：检查 "${op.item}" 是否存在。`,
                activeLines: [26],
                metrics: { ...metrics }
             });
             
             steps.push({
                elements: serializeBits([h1, h2]),
                description: `同样计算出散列位置（Hash）应当为：${h1} 和 ${h2}。`,
                activeLines: [27, 28],
                metrics: { ...metrics }
             });
             
             metrics.arrayAccesses += 2;
             let exist = bitArray[h1] === 1 && bitArray[h2] === 1;
             metrics.comparisons++;
             
             if (exist) {
                   steps.push({
                    elements: serializeBits([], [h1, h2]),
                    description: `(测试位) 这两个比特位的值均为 1，所以程序返回 true。元素 【可能】 存在。`,
                    activeLines: [27, 28],
                    metrics: { ...metrics }
                 });
             } else {
                   let failedBit = bitArray[h1] === 0 ? h1 : h2;
                   steps.push({
                    elements: serializeBits([failedBit]), // show failure spot
                    description: `发现位 [${failedBit}] 的值为 0，只要有一个位置是 0，说明此元素 【绝对】 不存在。返回 false。`,
                    activeLines: [27, 28],
                    metrics: { ...metrics }
                 });
             }
        }
    }
    
    steps.push({
      elements: serializeBits(),
      description: `演示结束。这就是布隆过滤器，用于防止缓存击穿或进行大批量无效探测极速否决。虽然有误判率，但省空间。`,
      activeLines: [],
      metrics: { ...metrics }
    });

    return steps;
  }
};
