import { ArrayElement, SimulationStep, AlgorithmDefinition } from '../types';

export const maxSubarraySum: AlgorithmDefinition = {
  id: 'maxSubarraySum',
  name: '最大子数组和 (Kadane\'s)',
  category: 'SlidingWindow',
  description: '使用动态规划（或滑动窗口思想）求解最大连续子数组和。',
  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(1)',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "Kadane 算法原理。用状态保存动态维护在每一步能够获得的最大连本带利。若之前累加的结果连个正数都不是就直接丢弃并从自己重新开始。",
      analogy: "股票投资连胜游戏！如果你连续几层每天都在亏损（累加收益小于0了），那还不如挥泪斩仓，从现在的本金从零重新记起。只要有哪怕一点点正收益积攒（大于0），就可以继续持有去博取更好的战果。",
      scenarios: "适用场景：最大投资收益预估、时间流数据聚合尖峰探测",
      practical: "分布式大数据监控（Observability）平台里用来识别某个服务在任意无规律时间段内所经历的最大累积资源消耗或者流量洪峰极端区间段的数据切片评估。"
},
  coreSteps: [
    '1. 初始化 currentSum 和 maxSum',
    '2. 遍历数组，累加当前元素',
    '3. 如果 currentSum < 0，则放弃之前的累加，从当前元素重新开始',
    '4. 能够使 maxSum 更新的，记录最终的最大值'
  ],
  code: {
    "JavaScript": "function maxSubArray(nums: number[]): number {\n  let maxSum = nums[0];\n  let currentSum = 0;\n  for (let num of nums) {\n    if (currentSum < 0) currentSum = 0;\n    currentSum += num;\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}",
    "Python": "function maxSubArray(nums: number[]): number \n  maxSum = nums[0]\n  currentSum = 0\n  for (num of nums) \n    if (currentSum < 0) currentSum = 0\n    currentSum += num\n    maxSum = max(maxSum, currentSum)\n  \n  return maxSum\n",
    "C++": "auto maxSubArray(nums: number[]): number {\n  auto maxSum = nums[0];\n  auto currentSum = 0;\n  for (auto num of nums) {\n    if (currentSum < 0) currentSum = 0;\n    currentSum += num;\n    maxSum = std::max(maxSum, currentSum);\n  }\n  return maxSum;\n}",
    "Java": "class Solution {\n    public static var maxSubArray(nums: number[]): number {\n      var maxSum = nums[0];\n      var currentSum = 0;\n      for (var num of nums) {\n        if (currentSum < 0) currentSum = 0;\n        currentSum += num;\n        maxSum = Math.max(maxSum, currentSum);\n      }\n      return maxSum;\n    }\n}"
},
  generateSteps: (initialArray: ArrayElement[]) => {
    const steps: SimulationStep[] = [];
    const elements = initialArray.map(el => ({ ...el, state: 'default' as const }));

    let metrics = {
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
      operations: 0
    };

    steps.push({
      elements: [...elements],
      description: `目标：给定一个整型数组，寻找一个具有最大和的连续子数组（滑动窗口），使这部分元素相加的总和最大。\n初始化 maxSum 和当前累计和 currentSum。`,
      metrics: { ...metrics }
    });

    if (elements.length === 0) return steps;

    let maxSum = elements[0].value;
    let currentSum = 0;
    let startIdx = 0;
    let maxStartIdx = 0;
    let maxEndIdx = 0;

    for (let i = 0; i < elements.length; i++) {
      metrics.arrayAccesses++;
      metrics.comparisons++;
      
      let elementsCopy = elements.map(el => ({ ...el, state: 'default' as const }));
      
      // highlight window
      for (let w = startIdx; w <= i; w++) {
        if(elementsCopy[w]) elementsCopy[w].state = 'visited';
      }
      elementsCopy[i].state = 'comparing';

      steps.push({
        elements: elementsCopy,
        description: `当前元素: ${elements[i].value} | 当前累加: ${currentSum} + ${elements[i].value} = ${currentSum + elements[i].value} | 历史最大: ${maxSum}`,
        activeLines: [5],
        metrics: { ...metrics },
        pointers: { left: startIdx, right: i }
      });

      if (currentSum < 0) {
        currentSum = 0;
        startIdx = i;
        metrics.operations++;
        // reflect reset
        let resetCopy = elements.map(el => ({ ...el, state: 'default' as const }));
        resetCopy[i].state = 'comparing';
        steps.push({
          elements: resetCopy,
          description: `前缀和已变为负数，从当前元素 ${elements[i].value} 重新开始计算。当前前缀和重置为 0。`,
          activeLines: [4],
          metrics: { ...metrics },
          pointers: { left: startIdx, right: i }
        });
      }

      currentSum += elements[i].value;
      metrics.operations++;

      if (currentSum > maxSum) {
        maxSum = currentSum;
        maxStartIdx = startIdx;
        maxEndIdx = i;
        metrics.operations++;
        
        let updateCopy = elements.map(el => ({ ...el, state: 'default' as const }));
        for (let w = maxStartIdx; w <= maxEndIdx; w++) {
          if(updateCopy[w]) updateCopy[w].state = 'path';
        }
        steps.push({
          elements: updateCopy,
          description: `发现更大的子数组和: ${maxSum}!，更新区间为 [${maxStartIdx}, ${maxEndIdx}]`,
          activeLines: [6],
          metrics: { ...metrics },
          pointers: { left: startIdx, right: i }
        });
      }
    }

    let finalCopy = elements.map(el => ({ ...el, state: 'default' as const }));
    for (let w = maxStartIdx; w <= maxEndIdx; w++) {
      if (finalCopy[w]) finalCopy[w].state = 'sorted';
    }
    steps.push({
      elements: finalCopy,
      description: `算法结束。最大子数组和为 ${maxSum}。(区间 [${maxStartIdx}, ${maxEndIdx}])`,
      activeLines: [8],
      metrics: { ...metrics },
      pointers: { left: maxStartIdx, right: maxEndIdx }
    });

    return steps;
  }
};
