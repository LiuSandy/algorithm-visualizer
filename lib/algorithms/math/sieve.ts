import { AlgorithmDefinition, SimulationStep } from '../types';

export const sieveOfEratosthenes: AlgorithmDefinition = {
  id: 'sieve',
  name: '素数筛 (Sieve)',
  category: 'Math',
  description: '目标：找出小于等于给定整数 n 的所有素数。\n原理：从2开始，将每个素数的各个倍数标记为合数。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "埃拉托斯特尼筛法（Sieve of Eratosthenes）。通过从最小的且未被标记的素数开始，不断将其倍数标记为合数，以此筛出给定范围内的素数。",
      analogy: "就像在海边筛选特定大小的贝壳，一开始把所有人都当好人，看到第一个‘坏人’，就把他全家长相类似的人都立刻抓出来打上‘坏人’标签，剩下的就是真正的‘好蛋’。",
      scenarios: "适用场景：素数判定预处理、数学因数分解",
      practical: "在大数据分析与密码学场景中进行质数随机分发桶或者应对特殊数学大基数过滤探测（例如大素数判定）的计算资源池初始化中。"
},
  coreSteps: [
    '1. 创建一个长度为 n+1 的布尔数组，初始均标记为 true',
    '2. 遍历从 2 开始到 √n 的每一个数 i',
    '3. 如果 i 没有被标记，则说明它是素数',
    '4. 将 i 的所有倍数（i*i, i*i+i...）标记为 false（合数）',
    '5. 最终仍标记为 true 的数即为素数'
  ],
  code: {
    "JavaScript": "function countPrimes(n) {\n  let isPrime = new Array(n + 1).fill(true);\n  isPrime[0] = isPrime[1] = false;\n  \n  for (let i = 2; i * i <= n; i++) {\n    if (isPrime[i]) {\n      for (let j = i * i; j <= n; j += i) {\n        isPrime[j] = false;\n      }\n    }\n  }\n  return isPrime;\n}",
    "Python": "def countPrimes(n):\n  isPrime = Array(n + 1).fill(true)\n  isPrime[0] = isPrime[1] = false\n  \n  for (i = 2 i * i <= n i++) \n    if (isPrime[i]) \n      for (j = i * i j <= n j += i) \n        isPrime[j] = false\n      \n    \n  \n  return isPrime\n",
    "C++": "auto countPrimes(n) {\n  auto isPrime = new Array(n + 1).fill(true);\n  isPrime[0] = isPrime[1] = false;\n  \n  for (auto i = 2; i * i <= n; i++) {\n    if (isPrime[i]) {\n      for (auto j = i * i; j <= n; j += i) {\n        isPrime[j] = false;\n      }\n    }\n  }\n  return isPrime;\n}",
    "Java": "class Solution {\n    public static var countPrimes(n) {\n      var isPrime = new Array(n + 1).fill(true);\n      isPrime[0] = isPrime[1] = false;\n      \n      for (var i = 2; i * i <= n; i++) {\n        if (isPrime[i]) {\n          for (var j = i * i; j <= n; j += i) {\n            isPrime[j] = false;\n          }\n        }\n      }\n      return isPrime;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n \u00d7 log(log(n)))',
    average: 'O(n \u00d7 log(log(n)))',
    worst: 'O(n \u00d7 log(log(n)))'
  },
  spaceComplexity: 'O(n)',
  generateSteps: (initialArray, options) => {
    const steps: SimulationStep[] = [];
    const n = Math.min(initialArray.length > 0 ? initialArray.length : 30, 50); // limit to a reasonable number visually
    
    let isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    let elements = Array.from({ length: n + 1 }, (_, i) => ({
      id: `num-${i}`,
      value: i,
      display: `${i}`,
      state: i < 2 ? ('visited' as const) : ('default' as const)
    }));

    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    // Removing 0 and 1 from visual as it's cleaner, but let's keep them and mark them 'visited'
    
    steps.push({
      elements: [...elements],
      description: `目标：筛选出从 0 到 ${n} 的所有素数。\n初始化布尔数组，将 0 和 1 标记为非素数。`,
      activeLines: [2, 3],
      metrics: { ...metrics }
    });

    for (let i = 2; i * i <= n; i++) {
      metrics.comparisons++;
      
      let highlightEls = elements.map(e => ({ ...e }));
      highlightEls[i].state = 'highlight' as const;
      
      steps.push({
        elements: highlightEls,
        description: `检查数字 ${i} 是否被标记。状态: ${isPrime[i] ? '未标记，是素数' : '已被标记'}`,
        activeLines: [5, 6],
        metrics: { ...metrics }
      });
      
      if (isPrime[i]) {
        elements[i].state = 'sorted' as const; // Mark as found prime
        for (let j = i * i; j <= n; j += i) {
          metrics.operations++;
          metrics.arrayAccesses++;
          isPrime[j] = false;
          
          let cycleEls = elements.map(e => ({ ...e }));
          cycleEls[j].state = 'comparing' as const;
          
          steps.push({
            elements: cycleEls,
            description: `标记素数 ${i} 的倍数 ${j} 为合数 (非素数)。`,
            activeLines: [7, 8],
            metrics: { ...metrics }
          });
          
          elements[j].state = 'visited' as const; // Mark as composite
        }
      }
    }
    
    // Final check to mark remaining trues as primes
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) elements[i].state = 'sorted' as const;
    }

    steps.push({
      elements: [...elements],
      description: `筛选完成，绿色（或特殊标记）的数字全为素数！`,
      activeLines: [11],
      metrics: { ...metrics }
    });

    return steps;
  }
};
