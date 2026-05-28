import { AlgorithmDefinition, SimulationStep } from '../types';

export const euclideanAlgorithm: AlgorithmDefinition = {
  id: 'euclidean',
  name: '欧几里得算法 (GCD)',
  category: 'Math',
  description: '目标：计算两个非负整数 a 和 b 的最大公约数 (Greatest Common Divisor)。\n原理：a 和 b 的最大公约数等于 b 与 a % b 的最大公约数，直到余数为 0。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "辗转相除法。求最大公约数（GCD）的核心在于两数的公约数与其中较小数以及两数之差的公约数是相同的，通过 a = b, b = a % b 的循环实现对数级的快速降级。",
      analogy: "你想把一块10乘4的长方形木板切城完全相同的正方形且不浪费。你先切出两个4x4的，剩下2x4，这再怎么切取决于剩下的碎片，最后只能切到最大公约数2x2的，再也切不下去了。",
      scenarios: "适用场景：分数化简、密码学核心基石",
      practical: "在分布式计算领域的密码学协议（如 RSA 公钥生成，见扩展欧几里得）或大数据系统的基础数学库进行大规模数据分区对齐中非常基础。"
},
  coreSteps: [
    '1. 初始状态：给定两个整数 a 和 b',
    '2. 如果 b 为 0，最大公约数为 a，算法结束',
    '3. 否则，计算余数 r = a % b',
    '4. 将 b 的值更新为 a，将 r 的值更新为 b，重复步骤2'
  ],
  code: {
    "JavaScript": "function gcd(a, b) {\n  while (b !== 0) {\n    let r = a % b;\n    a = b;\n    b = r;\n  }\n  return a;\n}",
    "Python": "def gcd(a, b):\n  while (b != 0) \n    r = a % b\n    a = b\n    b = r\n  \n  return a\n",
    "C++": "auto gcd(a, b) {\n  while (b !== 0) {\n    auto r = a % b;\n    a = b;\n    b = r;\n  }\n  return a;\n}",
    "Java": "class Solution {\n    public static var gcd(a, b) {\n      while (b !== 0) {\n        var r = a % b;\n        a = b;\n        b = r;\n      }\n      return a;\n    }\n}"
},
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log(min(a, b)))',
    worst: 'O(log(min(a, b)))'
  },
  spaceComplexity: 'O(1)',
  generateSteps: (initialArray) => {
    const steps: SimulationStep[] = [];
    // We only need two numbers, let's take the first two values from initialArray or fallback to some values
    let a = initialArray.length > 0 ? initialArray[0].value : 48;
    let b = initialArray.length > 1 ? initialArray[1].value : 18;
    
    let aEl = { id: 'a', value: a, display: `a: ${a}`, state: 'default' as const };
    let bEl = { id: 'b', value: b, display: `b: ${b}`, state: 'default' as const };
    
    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    steps.push({
      elements: [{...aEl}, {...bEl}],
      description: `目标：计算这两个数 a=${a} 和 b=${b} 的最大公约数。`,
      activeLines: [1],
      metrics: { ...metrics }
    });

    while (b !== 0) {
      metrics.comparisons++;
      let r = a % b;
      metrics.operations++;
      
      let rEl = { id: 'r', value: r, display: `r: ${r}`, state: 'highlight' as const };
      
      steps.push({
        elements: [{...aEl}, {...bEl}, rEl],
        description: `当前 b \u2260 0。计算余数 r = a % b = ${a} % ${b} = ${r}。`,
        activeLines: [2, 3],
        metrics: { ...metrics }
      });
      
      metrics.swaps++;
      a = b;
      b = r;
      
      aEl = { id: 'a', value: a, display: `a: ${a}`, state: 'comparing' as const };
      bEl = { id: 'b', value: b, display: `b: ${b}`, state: 'comparing' as const };
      
      steps.push({
        elements: [{...aEl}, {...bEl}],
        description: `更新变量：下一步循环，新的 a = ${a}, b = ${b}。`,
        activeLines: [4, 5],
        metrics: { ...metrics }
      });
    }
    
    metrics.comparisons++;
    aEl.state = 'sorted' as const;
    steps.push({
      elements: [{...aEl}],
      description: `b 为 0，循环结束。最大公约数为 ${a}。`,
      activeLines: [2, 7],
      metrics: { ...metrics }
    });
    
    return steps;
  }
};
