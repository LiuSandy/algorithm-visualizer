import { ArrayElement, SimulationStep, AlgorithmDefinition } from '../types';

export const minSubArrayLen: AlgorithmDefinition = {
  id: 'minSubArrayLen',
  name: '长度最小的子数组',
  category: 'SlidingWindow',
  description: '给定一个含有 n 个正整数的数组和一个正整数 target。找出该数组中满足其和 ≥ target 的长度最小的连续子数组，并返回其长度。',
  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(1)',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "同向滑窗伸缩策略。使用左右指针寻找和边界 >= 特定值时立刻收缩探测其可能的最窄连续长度。",
      analogy: "弹簧挤压测力计：一直拼命往里面塞重物直到弹簧刚被压到触发极限，就尝试卸载掉最老的重物看能保持这种压迫力的最极限长度有多轻快，在弹簧保持触发期间去记下那个最瘦削的身影。",
      scenarios: "适用场景：极值区间探测",
      practical: "在流计算处理或报警阈值系统中，寻找促使系统 CPU 、磁盘 I/O 等压力累计突破警告阈值线（Target Constraint）内持续时间最短的高危异常事件窗口切片。"
},
  coreSteps: [
    '1. 初始化左右指针 left = 0, right = 0 和 minLen',
    '2. 右指针 right 不断向右移动，并累加当前元素到 sum',
    '3. 当 sum ≥ target 时，尝试更新 minLen，并将左指针 left 右移（缩小窗口），同时减去左边界元素的值',
    '4. 重复上述步骤直到 right 遍历完数组'
  ],
  code: {
    "JavaScript": "function minSubArrayLen(target: number, nums: number[]): number {\n  let minLen = Infinity;\n  let left = 0;\n  let sum = 0;\n  \n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    \n    while (sum >= target) {\n      minLen = Math.min(minLen, right - left + 1);\n      sum -= nums[left];\n      left++;\n    }\n  }\n  \n  return minLen === Infinity ? 0 : minLen;\n}",
    "Python": "function minSubArrayLen(target: number, nums: number[]): number \n  minLen = Infinity\n  left = 0\n  sum = 0\n  \n  for (right = 0 right < nums.__len__() right++) \n    sum += nums[right]\n    \n    while (sum >= target) \n      minLen = min(minLen, right - left + 1)\n      sum -= nums[left]\n      left++\n    \n  \n  \n  return minLen == Infinity ? 0 : minLen\n",
    "C++": "auto minSubArrayLen(target: number, nums: number[]): number {\n  auto minLen = Infinity;\n  auto left = 0;\n  auto sum = 0;\n  \n  for (auto right = 0; right < nums.size(); right++) {\n    sum += nums[right];\n    \n    while (sum >= target) {\n      minLen = std::min(minLen, right - left + 1);\n      sum -= nums[left];\n      left++;\n    }\n  }\n  \n  return minLen === Infinity ? 0 : minLen;\n}",
    "Java": "class Solution {\n    public static var minSubArrayLen(target: number, nums: number[]): number {\n      var minLen = Infinity;\n      var left = 0;\n      var sum = 0;\n      \n      for (var right = 0; right < nums.length; right++) {\n        sum += nums[right];\n        \n        while (sum >= target) {\n          minLen = Math.min(minLen, right - left + 1);\n          sum -= nums[left];\n          left++;\n        }\n      }\n      \n      return minLen === Infinity ? 0 : minLen;\n    }\n}"
},
  generateSteps: (initialArray: ArrayElement[], options: any) => {
    // 强制把元素变成正数，因为这个算法针对正整数
    const elements = initialArray.map((el) => ({ ...el, value: Math.max(1, Math.abs(el.value)), state: 'default' as const }));
    const steps: SimulationStep[] = [];
    
    let target = options?.target;
    if (!target) {
      // 随机生成一个合适的 target
      const total = elements.slice(0, Math.min(5, elements.length)).reduce((a, b) => a + b.value, 0);
      target = total || 15;
    }

    let metrics = {
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
      operations: 0
    };

    steps.push({
      elements: [...elements],
      description: `目标：给定一个正整数的数组和一个目标值 target = ${target}，找出该数组中满足其所有元素总和 ≥ target 的【长度最小的连续滑动窗口】。\n初始化左右指针 left = 0, right = 0。`,
      metrics: { ...metrics }
    });

    let minLen = Infinity;
    let bestLeft = -1;
    let bestRight = -1;
    let left = 0;
    let sum = 0;

    for (let right = 0; right < elements.length; right++) {
      metrics.arrayAccesses++;
      metrics.operations++;
      sum += elements[right].value;

      let frame1 = elements.map(el => ({ ...el, state: 'default' as const }));
      for (let i = left; i <= right; i++) frame1[i].state = 'visited';
      frame1[right].state = 'comparing';
      if (bestLeft !== -1) {
        for (let i = bestLeft; i <= bestRight; i++) {
          if (frame1[i].state === 'default') frame1[i].state = 'path';
        }
      }

      steps.push({
        elements: frame1,
        description: `right 移动到 ${right}。当前窗口总和为 ${sum}。`,
        activeLines: [6, 7],
        metrics: { ...metrics },
        pointers: { left, right }
      });

      while (sum >= target) {
        metrics.comparisons++;
        metrics.operations++;
        const currentLen = right - left + 1;
        if (currentLen < minLen) {
          minLen = currentLen;
          bestLeft = left;
          bestRight = right;
          
          let frameBest = elements.map(el => ({ ...el, state: 'default' as const }));
          for (let i = left; i <= right; i++) frameBest[i].state = 'path'; // mark new best
          frameBest[right].state = 'comparing';
          frameBest[left].state = 'comparing';

          steps.push({
            elements: frameBest,
            description: `窗口和 ${sum} ≥ ${target}！发现更短的子数组，长度更新为 ${minLen}。`,
            activeLines: [9, 10],
            metrics: { ...metrics },
            pointers: { left, right }
          });
        } else {
          let frameShrink = elements.map(el => ({ ...el, state: 'default' as const }));
          for (let i = left; i <= right; i++) frameShrink[i].state = 'visited';
          if (bestLeft !== -1) {
            for (let i = bestLeft; i <= bestRight; i++) {
              if (frameShrink[i].state === 'default') frameShrink[i].state = 'path';
            }
          }
          steps.push({
            elements: frameShrink,
            description: `窗口和 ${sum} ≥ ${target}，开始缩小窗口左边界。`,
            activeLines: [9],
            metrics: { ...metrics },
            pointers: { left, right }
          });
        }

        sum -= elements[left].value;
        metrics.arrayAccesses++;
        metrics.operations++;
        left++;

        let frameAfterShrink = elements.map(el => ({ ...el, state: 'default' as const }));
        for (let i = left; i <= right; i++) frameAfterShrink[i].state = 'visited';
        if (bestLeft !== -1) {
          for (let i = bestLeft; i <= bestRight; i++) {
            if (frameAfterShrink[i].state === 'default') frameAfterShrink[i].state = 'path';
          }
        }
        steps.push({
          elements: frameAfterShrink,
          description: `左边界右移至 ${left}。移除后窗口总和变为 ${sum}。`,
          activeLines: [11, 12],
          metrics: { ...metrics },
          pointers: { left, right }
        });
      }
    }

    let finalCopy = elements.map(el => ({ ...el, state: 'default' as const }));
    if (minLen === Infinity) {
      steps.push({
        elements: finalCopy,
        description: `遍历结束。没有找到和 ≥ ${target} 的子数组，返回 0。`,
        activeLines: [16],
        metrics: { ...metrics }
      });
    } else {
      for (let w = bestLeft; w <= bestRight; w++) {
        if (finalCopy[w]) finalCopy[w].state = 'sorted';
      }
      steps.push({
        elements: finalCopy,
        description: `算法结束。长度最小的子数组为 ${minLen}。(区间 [${bestLeft}, ${bestRight}])`,
        activeLines: [16],
        metrics: { ...metrics },
        pointers: { left: bestLeft, right: bestRight }
      });
    }

    return steps;
  }
};
