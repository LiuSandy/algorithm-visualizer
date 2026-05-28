import { AlgorithmDefinition, VisualElement, SimulationStep } from '../types';

export const lruCacheAlgorithm: AlgorithmDefinition = {
  id: 'lruCache',
  name: 'LRU 缓存 (LRU Cache)',
  category: 'Practical',
  description: '目标：模拟一个大小有限的最近最少使用（LRU）缓存机制。\n原理：为了在使用频率的基础上利用有限空间，核心是双向链表+哈希表结构：将最近使用的移到链表头，淘汰最久未使用的链表尾部元素。',
  theory: {
    complexity: `通过 Hash 寻找链表节点为 O(1)，拿到节点后直接在双向链表中断开它并搬运到头节点为局部指针修改也是 O(1)。总耗时极简 O(1)。`,
    prosCons: `✅ 优点：操作达到理论极限速度 O(1)。
❌ 缺点：每个值都要捆绑 prev/next 等多余的指针结构，内部极度挥霍内存空间。`,
    interview: `必考顶级应用题。为什么一定要用【双向】链表不能用【单向】？（结合哈希表能找到节点本身，如果在单向链表里，你找不到它的前驱节点，就无法执行 O(1) 的删除截断操作！必须双向才能前后缝合）。`,
      core: "利用哈希表保证 O(1) 的查询能力，结合双向链表记录数据的访问时序，当缓存满载时只需在队尾剔除最久未被使用的陈旧冷数据。",
      analogy: "桌子上你放书的习惯。每次你看一本书都会把它抽出来放在手边最显著（最先的位置），一旦桌子放不下了，你就把推到最远角落、积满灰尘的书扔进垃圾桶。",
      scenarios: "适用场景：限制容量的高频热数据缓冲、CDN边缘节点",
      practical: "现代底层操作系统层页表置换的基础算法、以及作为 Redis / Memcached 中内存驱逐策略机制的最标志性应用之一，在应对热点事件流量洪峰时保住核心系统不被击穿。"
},
  coreSteps: [
    '1. Get(key)：若 key 不存在则返回 -1；若存在，则返回其值，并把该节点移到最前方（最近使用）',
    '2. Put(key, val)：若 key 存在，更新其值，并移到最前方',
    '3. Put(key, val)：若 key 不存在，往最前方插入新节点',
    '4. (续) 如果缓存空间 (Capacity) 超过上限，移除最后方的节点（最久未使用）'
  ],
  code: {
    "JavaScript": "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    let val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n\n  put(key, value) {\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    } else if (this.cache.size >= this.capacity) {\n      // keys().next().value gets the first map entry (least recently used)\n      this.cache.delete(this.cache.keys().next().value);\n    }\n    this.cache.set(key, value);\n  }\n}",
    "Python": "class LRUCache \n  constructor(capacity) \n    this.capacity = capacity\n    this.cache = Map()\n  \n\n  get(key) \n    if (!this.cache.has(key)) return -1\n    val = this.cache.get(key)\n    this.cache.delete(key)\n    this.cache.set(key, val)\n    return val\n  \n\n  put(key, value) \n    if (this.cache.has(key)) \n      this.cache.delete(key)\n     else if (this.cache.size >= this.capacity) \n      # keys().next().value gets the first map entry (least recently used)\n      this.cache.delete(this.cache.keys().next().value)\n    \n    this.cache.set(key, value)\n  \n",
    "C++": "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    auto val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n\n  put(key, value) {\n    if (this.cache.has(key)) {\n      this.cache.delete(key);\n    } else if (this.cache.size >= this.capacity) {\n      // keys().next().value gets the first map entry (least recently used)\n      this.cache.delete(this.cache.keys().next().value);\n    }\n    this.cache.set(key, value);\n  }\n}",
    "Java": "class Solution {\n    class LRUCache {\n      constructor(capacity) {\n        this.capacity = capacity;\n        this.cache = new Map();\n      }\n    \n      get(key) {\n        if (!this.cache.has(key)) return -1;\n        var val = this.cache.get(key);\n        this.cache.delete(key);\n        this.cache.set(key, val);\n        return val;\n      }\n    \n      put(key, value) {\n        if (this.cache.has(key)) {\n          this.cache.delete(key);\n        } else if (this.cache.size >= this.capacity) {\n          // keys().next().value gets the first map entry (least recently used)\n          this.cache.delete(this.cache.keys().next().value);\n        }\n        this.cache.set(key, value);\n      }\n    }\n}"
},
  timeComplexity: {
    best: 'O(1) Get 和 Put',
    average: 'O(1)',
    worst: 'O(1)'
  },
  spaceComplexity: 'O(capacity)',
  generateSteps: (initialArray, options) => {
    const steps: SimulationStep[] = [];
    const capacity = options?.capacity || 4;
    
    // Simulate a sequence of ops
    const ops = [
      { type: 'put', key: 'A', val: 1 },
      { type: 'put', key: 'B', val: 2 },
      { type: 'put', key: 'C', val: 3 },
      { type: 'get', key: 'A', val: null }, 
      { type: 'put', key: 'D', val: 4 },
      { type: 'put', key: 'E', val: 5 }, // this will evict B
      { type: 'get', key: 'C', val: null } 
    ];
    
    let map = new Map<string, number>();
    
    const serializeCache = (hKey?: string, highlightMode: 'read' | 'write' | 'evict' = 'read') => {
        let els: any[] = [];
        let i = 0;
        for (let [k, v] of map.entries()) {
            let state = 'default';
            if (k === hKey) {
                state = highlightMode === 'read' ? 'highlight' : highlightMode === 'write' ? 'sorted' : 'swapping';
            }
            els.push({
                id: `${k}`,
                value: v,
                display: `${k}:${v}`,
                state: state as any
            });
            i++;
        }
        // Fill empty capacity explicitly
        for (let j = i; j < capacity; j++) {
            els.push({
                id: `empty-${j}`,
                value: 0,
                display: `[ 空 slot ]`,
                state: 'visited' as any
            });
        }
        // We might want to make them ordered by LRU. Map iterates in insertion order (LRU to MRU).
        // Let's reverse it so MRU is on the left.
        els.reverse();
        return els;
    };

    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    steps.push({
      elements: serializeCache(),
      description: `LRU 缓存初始化，容量 Capacity = ${capacity}。左侧为最近使用 (MRU)，右侧为最久未使用 (LRU)。`,
      activeLines: [2, 3, 4],
      metrics: { ...metrics }
    });

    for (let op of ops) {
        if (op.type === 'put') {
            steps.push({
              elements: serializeCache(),
              description: `操作指令: Tries to PUT(key: ${op.key}, val: ${op.val})`,
              activeLines: [15],
              metrics: { ...metrics }
            });
            metrics.operations++;
            
            if (map.has(op.key)) {
                map.delete(op.key);
                map.set(op.key, op.val);
                steps.push({
                  elements: serializeCache(op.key, 'write'),
                  description: `缓存中已存在 ${op.key}，更新其值，并移至头部（最新使用状态）。`,
                  activeLines: [16, 17, 22],
                  metrics: { ...metrics }
                });
            } else {
                if (map.size >= capacity) {
                    const lruKey = map.keys().next().value!;
                    let tempEls = serializeCache();
                    tempEls[tempEls.length - 1].state = 'swapping';
                    steps.push({
                      elements: tempEls,
                      description: `缓存已满！需要淘汰最久未使用的记录 key='${lruKey}'（队列最末尾）。`,
                      activeLines: [18, 20],
                      metrics: { ...metrics }
                    });
                    map.delete(lruKey);
                }
                map.set(op.key, op.val);
                steps.push({
                  elements: serializeCache(op.key, 'write'),
                  description: `将新数据 key='${op.key}' 插入队列前部。`,
                  activeLines: [22],
                  metrics: { ...metrics }
                });
            }
        } else if (op.type === 'get') {
            steps.push({
              elements: serializeCache(),
              description: `操作指令: Tries to GET(key: ${op.key})`,
              activeLines: [7],
              metrics: { ...metrics }
            });
            metrics.operations++;
            
            if (!map.has(op.key)) {
                steps.push({
                  elements: serializeCache(),
                  description: `缓存中找不到 ${op.key}，发生了 Cache Miss 缓存未命中。`,
                  activeLines: [8],
                  metrics: { ...metrics }
                });
            } else {
                let val = map.get(op.key)!;
                steps.push({
                  elements: serializeCache(op.key, 'read'),
                  description: `找到 ${op.key}，值为 ${val}！此时因为重新访问，因此它将移动到最新鲜的位置（最左侧）。`,
                  activeLines: [9, 10, 11, 12],
                  metrics: { ...metrics }
                });
                map.delete(op.key);
                map.set(op.key, val);
                steps.push({
                  elements: serializeCache(op.key, 'write'),
                  description: `移动完毕，${op.key} 现在是最近被使用的缓存。`,
                  activeLines: [12, 13],
                  metrics: { ...metrics }
                });
            }
        }
    }
    
    steps.push({
      elements: serializeCache(),
      description: `演示完成。我们演示了一个模拟的工作流！LRU 是后端开发和系统设计非常核心的基础知识。`,
      activeLines: [],
      metrics: { ...metrics }
    });

    return steps;
  }
};
