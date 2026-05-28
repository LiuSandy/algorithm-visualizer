import { AlgorithmDefinition, SimulationStep } from '../types';

export const fisherYatesShuffle: AlgorithmDefinition = {
  id: 'fisherYates',
  name: '洗牌算法 (Fisher-Yates)',
  category: 'Practical',
  description: '目标：将一个数组打乱，保证每个排列出现的概率均等。\n原理：从右向左遍历数组（或从左向右），每次在未处理的部分中随机选一个元素与当前处理位交换。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "通过在线性数组上一边向后推进一边与前面位置任意元素随机交换（或从后往前反向置换），实现在仅一次遍历前提下构建出真正的完美的离散随机排列。",
      analogy: "像抓阄：抓出来一个放一个，不再放回去，然后用剩下的去填那个坑，直到每个人都有一个随机拿到的不同物品，保证绝对不用抓到空气、不用等。",
      scenarios: "适用场景：音乐播放器乱序播放、游戏随机地图",
      practical: "在推荐系统（Recommendation Systems）下发千人千面个性化广告流和Feed流混合打散（Merge & Shuffle）时，防止数据出现固定顺序聚集从而引发疲劳的工业级标配。"
},
  coreSteps: [
    '1. 设未洗牌部分的长度初始为原数组长度 n',
    '2. 从未洗牌序列的右侧向左遍历（令 i = n - 1 至 1）',
    '3. 在 0 到 i 之间随机选择一个整数 j（即未洗牌部分的任意一个位置）',
    '4. 交换位置 i 和位置 j 的这两个元素',
    '5. i 减 1（即排除出未洗牌序列，已固化的部分在右侧），继续直至 i = 0'
  ],
  code: {
    "JavaScript": "function shuffle(array) {\n  for (let i = array.length - 1; i > 0; i--) {\n    let j = Math.floor(Math.random() * (i + 1));\n    [array[i], array[j]] = [array[j], array[i]];\n  }\n  return array;\n}",
    "Python": "def shuffle(array):\n  for (i = array.__len__() - 1 i > 0 i--) \n    j = int(Math.random() * (i + 1))\n    [array[i], array[j]] = [array[j], array[i]]\n  \n  return array\n",
    "C++": "auto shuffle(array) {\n  for (auto i = array.size() - 1; i > 0; i--) {\n    auto j = std::floor(Math.random() * (i + 1));\n    [array[i], array[j]] = [array[j], array[i]];\n  }\n  return array;\n}",
    "Java": "class Solution {\n    public static var shuffle(array) {\n      for (var i = array.length - 1; i > 0; i--) {\n        var j = Math.floor(Math.random() * (i + 1));\n        [array[i], array[j]] = [array[j], array[i]];\n      }\n      return array;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(1)',
  generateSteps: (initialArray) => {
    const steps: SimulationStep[] = [];
    const elements = initialArray.map(el => ({ ...el, state: 'default' as const }));
    
    // Using a predictable pseudo-random generator, or let's just make it visually interesting
    // A Math.random logic is fine for generating the steps since it runs once synchronously.
    
    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    steps.push({
      elements: [...elements],
      description: `初始化序列。准备使用 Fisher-Yates (也称 Knuth) 洗牌法打乱数组。\n核心在以完美的等概率随机打乱每一项。`,
      activeLines: [1],
      metrics: { ...metrics }
    });

    for (let i = elements.length - 1; i > 0; i--) {
        metrics.operations++;
        // randomly pick j from 0 to i
        // let's use a seeded random or just Math.random. In context of steps generation Math.random is fine.
        let j = Math.floor(Math.random() * (i + 1));
        
        // highlight i and j
        let step1Els = elements.map(el => ({ ...el }));
        step1Els[i].state = 'highlight';
        step1Els[j].state = 'partition';
        
        steps.push({
            elements: step1Els,
            description: `在 [0, ${i}] 的区间中，随机选中了索引 ${j}。准备将索引用 ${i} 和 ${j} 的元素交换。`,
            activeLines: [2, 3],
            metrics: { ...metrics }
        });
        
        metrics.swaps++;
        metrics.arrayAccesses += 4;
        
        // swap values
        [elements[i], elements[j]] = [elements[j], elements[i]];
        
        let step2Els = elements.map(el => ({ ...el }));
        step2Els[i].state = 'swapping';
        step2Els[j].state = 'swapping';
        
        steps.push({
            elements: step2Els,
            description: `交换位置 ${i} (${elements[i].value}) 与 位置 ${j} (${elements[j].value})。`,
            activeLines: [4],
            metrics: { ...metrics }
        });
        
        elements[i].state = 'sorted';
        
        steps.push({
            elements: elements.map(el => ({ ...el })),
            description: `索引 ${i} 处的元素就位（已洗牌完毕，在灰色/绿色区域），接下来处理前一部分区间。`,
            activeLines: [2],
            metrics: { ...metrics }
        });
    }
    
    elements[0].state = 'sorted';

    steps.push({
      elements: [...elements],
      description: `全部交换完毕，洗牌完成！这就是最标准、最公平的打乱数组算法。`,
      activeLines: [6],
      metrics: { ...metrics }
    });

    return steps;
  }
};
