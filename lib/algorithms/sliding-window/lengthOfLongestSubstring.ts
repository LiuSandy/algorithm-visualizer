import { ArrayElement, SimulationStep, AlgorithmDefinition } from '../types';

export const lengthOfLongestSubstring: AlgorithmDefinition = {
  id: 'lengthOfLongestSubstring',
  name: '无重复字符的最长子串',
  category: 'SlidingWindow',
  description: '给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。',
  timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
  spaceComplexity: 'O(min(m, n))',
  theory: {
    complexity: `右指针在最前方开路，左指针在后面打扫。任何一个元素都最多只是进框一次出框一次。彻底杜绝了 O(N^2) 的笨重，实现了轻柔的 O(N) 线扫流淌。辅以存放哈希记录的空间 O(字符集/N)。`,
    prosCons: `✅ 优点：剔除冗余穷举，行云流水一条龙，极限压降时间。
❌ 缺点：它的思维具有高维欺骗性，代码循环内嵌套左界收缩(while)，边界稍微把关不严便会陷入索引越界的灾难。`,
    interview: `力扣无冕之王（题号3）。只要是考滑动窗口，你必须要明白：右指针负责拉起需求，左指针负责破掉需求，哈希负责状态记录。`,
      core: "使用滑动双指针组成的弹性窗口遍历目标序列或数据流。一旦窗口内记录到底层映射结构存在重复元素，便逐步滑移（舍弃）左窗口端点直到打破重复态。",
      analogy: "在满是各种小摊的集市一条街上走，手里有个小袋子。一旦你要装进袋子里的小摊东西在这个口袋你之前已经买过了，你就倒出（丢掉）最早买的那些直到不冲突为止，同时记录下袋子由于各种伸缩装满后最鼓的那一刻。",
      scenarios: "适用场景：连续子数组限流分析、字符串动态特征捕捉",
      practical: "被作为分布式限流组件架构中实现‘滑动窗口机制’（Sliding Window Rate Limiter，类似 Sentinel / Hystrix 机制中）分析一段时间无特征拥堵的平滑调用状态指标的演进理论之一。"
},
  coreSteps: [
    '1. 初始化哈希集合 set 记录窗口内的字符，左右指针 left = 0, right = 0，最长长度 maxLen = 0',
    '2. 右指针不断向右扩展窗口，检查 right 指向的字符是否在 set 中',
    '3. 如果不在：加入 set，更新 maxLen，右指针继续向右进发',
    '4. 如果在：说明存在重复字符，左指针持续向右移动并从 set 中移除字符，直到窗口内没有重复字符为止'
  ],
  code: {
    "JavaScript": "function lengthOfLongestSubstring(s: string): number {\n  let set = new Set();\n  let maxLen = 0;\n  let left = 0;\n  \n  for (let right = 0; right < s.length; right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  \n  return maxLen;\n}",
    "Python": "function lengthOfLongestSubstring(s: string): number \n  set = Set()\n  maxLen = 0\n  left = 0\n  \n  for (right = 0 right < s.__len__() right++) \n    while (set.has(s[right])) \n      set.delete(s[left])\n      left++\n    \n    set.add(s[right])\n    maxLen = max(maxLen, right - left + 1)\n  \n  \n  return maxLen\n",
    "C++": "auto lengthOfLongestSubstring(s: string): number {\n  auto set = new Set();\n  auto maxLen = 0;\n  auto left = 0;\n  \n  for (auto right = 0; right < s.size(); right++) {\n    while (set.has(s[right])) {\n      set.delete(s[left]);\n      left++;\n    }\n    set.add(s[right]);\n    maxLen = std::max(maxLen, right - left + 1);\n  }\n  \n  return maxLen;\n}",
    "Java": "class Solution {\n    public static var lengthOfLongestSubstring(s: string): number {\n      var set = new Set();\n      var maxLen = 0;\n      var left = 0;\n      \n      for (var right = 0; right < s.length; right++) {\n        while (set.has(s[right])) {\n          set.delete(s[left]);\n          left++;\n        }\n        set.add(s[right]);\n        maxLen = Math.max(maxLen, right - left + 1);\n      }\n      \n      return maxLen;\n    }\n}"
},
  generateSteps: (initialArray: ArrayElement[], options: any) => {
    // 如果用户输入了自定义文本作为 array，我们可以尝试将它用于生成
    const elements = initialArray.map((el, index) => {
      let char = el.display;
      if (!char) {
        const fallbacks = "abcabcbb";
        char = index < fallbacks.length ? fallbacks[index] : String.fromCharCode(97 + (Math.abs(el.value) % 26));
      }
      return { 
        id: el.id, 
        value: char.charCodeAt(0), 
        display: char,
        state: 'default' as const 
      };
    });

    const steps: SimulationStep[] = [];

    let metrics = {
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
      operations: 0
    };

    steps.push({
      elements: [...elements],
      description: `目标：给定一个字符串（字符序列），找出一个不含有任何重复字符的【最长连续子串】（即两指针间的滑动窗口）。\n初始化左右指针为0，当前最长滑动窗口长度 maxLen = 0。`,
      metrics: { ...metrics }
    });

    let maxLen = 0;
    let left = 0;
    let bestLeft = -1;
    let bestRight = -1;
    let set = new Set<string>();

    for (let right = 0; right < elements.length; right++) {
      let char = elements[right].display!;
      metrics.arrayAccesses++;
      metrics.operations++;
      
      let frame1 = elements.map(el => ({ ...el, state: 'default' as const }));
      for (let i = left; i <= right; i++) frame1[i].state = 'visited';
      frame1[right].state = 'comparing';
      if (bestLeft !== -1) {
        for (let i = bestLeft; i <= bestRight; i++) {
          if (frame1[i].state === 'default') frame1[i].state = 'path'; // 用某种颜色表示历史最优
        }
      }

      steps.push({
        elements: frame1,
        description: `right = ${right}，检查字符 '${char}'。`,
        activeLines: [6],
        metrics: { ...metrics },
        pointers: { left, right }
      });

      while (set.has(char)) {
        metrics.comparisons++;
        let leftChar = elements[left].display!;
        set.delete(leftChar);
        metrics.operations++;
        left++;
        
        let frameShrink = elements.map(el => ({ ...el, state: 'default' as const }));
        for (let i = left; i <= right; i++) frameShrink[i].state = 'visited';
        frameShrink[right].state = 'comparing';
        frameShrink[left-1].state = 'swapping'; // 被移除的元素

        if (bestLeft !== -1) {
          for (let i = bestLeft; i <= bestRight; i++) {
            if (frameShrink[i].state === 'default') frameShrink[i].state = 'path';
          }
        }

        steps.push({
          elements: frameShrink,
          description: `发现重复字符！移除 left 指针对应的字符 '${leftChar}'，left 右移。`,
          activeLines: [7, 8, 9],
          metrics: { ...metrics },
          pointers: { left, right }
        });
      }

      metrics.comparisons++;
      set.add(char);
      metrics.operations++;
      
      let currentLen = right - left + 1;
      if (currentLen > maxLen) {
        maxLen = currentLen;
        bestLeft = left;
        bestRight = right;
        
        let frameBest = elements.map(el => ({ ...el, state: 'default' as const }));
        for (let i = left; i <= right; i++) frameBest[i].state = 'path'; // 当前是最优解
        frameBest[right].state = 'comparing';

        steps.push({
          elements: frameBest,
          description: `将 '${char}' 加入集合。更新最长长度 maxLen = ${maxLen}。`,
          activeLines: [11, 12],
          metrics: { ...metrics },
          pointers: { left, right }
        });
      } else {
        let frameAdd = elements.map(el => ({ ...el, state: 'default' as const }));
        for (let i = left; i <= right; i++) frameAdd[i].state = 'visited';
        frameAdd[right].state = 'comparing';
        if (bestLeft !== -1) {
          for (let i = bestLeft; i <= bestRight; i++) {
            if (frameAdd[i].state === 'default') frameAdd[i].state = 'path';
          }
        }
        steps.push({
          elements: frameAdd,
          description: `将 '${char}' 加入集合。`,
          activeLines: [11, 12],
          metrics: { ...metrics },
          pointers: { left, right }
        });
      }
    }

    let finalCopy = elements.map(el => ({ ...el, state: 'default' as const }));
    for (let w = bestLeft; w <= bestRight; w++) {
      if (finalCopy[w]) finalCopy[w].state = 'sorted';
    }
    steps.push({
      elements: finalCopy,
      description: `遍历结束。最长不重复子串长度为 ${maxLen}。(区间 [${bestLeft}, ${bestRight}])`,
      activeLines: [15],
      metrics: { ...metrics },
      pointers: { left: bestLeft, right: bestRight }
    });

    return steps;
  }
};
