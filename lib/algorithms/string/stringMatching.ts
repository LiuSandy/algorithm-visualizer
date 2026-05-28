import { AlgorithmDefinition, SimulationStep } from '../types';

export const stringMatching: AlgorithmDefinition = {
  id: 'stringMatching',
  name: '字符串匹配 (Naive)',
  category: 'String',
  description: '目标：在一个文本字符串 T 中，寻找是否存在模式字符串 P。\n原理：双指针。遍历文本 T 的每个起点，对于每个起点与模式 P 逐一比对字符。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "暴力的将待检测模式字符串头部对齐到源字符串主序列所有的起始位置点并向后逐一字母校对的方式，无缘错过则右移一位从零再来。",
      analogy: "寻找遗失名片的纯人力查找：就是一张一张纸扫过去，哪怕前面错了几个字，也就是死规定重新移到下一行行首，绝对的耿直毫不取巧。",
      scenarios: "适用场景：字符极为短小单调的临时极度简明操作",
      practical: "其由于极其糟糕的最坏回退耗时（O(N*M)），极少作为正式工业算法的核心部分落地大型计算，大多使用于一些完全缺乏高级编译器底层指令集的老劣计算环境中。"
},
  coreSteps: [
    '1. 设 i 为文本 T 的指针，j 为模式 P 的指针',
    '2. 将 T 的当前起点 [i] 与 P 的起点 [0] 对齐比对',
    '3. 如果字符相同，i 和 j 均后移一位，匹配下一个字符',
    '4. 如果不同，说明当前起点失败，i 回溯到起点的下一个位置，j 重置为 0',
    '5. 若 j 走完了模式 P，则匹配成功。若 i 走完了 T，则匹配失败'
  ],
  code: {
    "JavaScript": "function strStr(haystack, needle) {\n  let m = haystack.length;\n  let n = needle.length;\n\n  for (let i = 0; i <= m - n; i++) {\n    let j = 0;\n    while (j < n && haystack[i + j] === needle[j]) {\n      j++;\n    }\n    if (j === n) {\n      return i; // 找到匹配的起始索引\n    }\n  }\n  return -1; // 未找到\n}",
    "Python": "def strStr(haystack, needle):\n  m = haystack.__len__()\n  n = needle.__len__()\n\n  for (i = 0 i <= m - n i++) \n    j = 0\n    while (j < n and haystack[i + j] == needle[j]) \n      j++\n    \n    if (j == n) \n      return i # 找到匹配的起始索引\n    \n  \n  return -1 # 未找到\n",
    "C++": "auto strStr(haystack, needle) {\n  auto m = haystack.size();\n  auto n = needle.size();\n\n  for (auto i = 0; i <= m - n; i++) {\n    auto j = 0;\n    while (j < n && haystack[i + j] === needle[j]) {\n      j++;\n    }\n    if (j === n) {\n      return i; // 找到匹配的起始索引\n    }\n  }\n  return -1; // 未找到\n}",
    "Java": "class Solution {\n    public static var strStr(haystack, needle) {\n      var m = haystack.length;\n      var n = needle.length;\n    \n      for (var i = 0; i <= m - n; i++) {\n        var j = 0;\n        while (j < n && haystack[i + j] === needle[j]) {\n          j++;\n        }\n        if (j === n) {\n          return i; // 找到匹配的起始索引\n        }\n      }\n      return -1; // 未找到\n    }\n}"
},
  timeComplexity: {
    best: 'O(m)',
    average: 'O(m \u00d7 n)',
    worst: 'O(m \u00d7 n)'
  },
  spaceComplexity: 'O(1)',
  generateSteps: (initialArray, options) => {
    const steps: SimulationStep[] = [];
    const haystack = options?.strInput || "hello world";
    const needle = options?.strMatch || "world";
    
    let haystackEls = haystack.split('').map((char, index) => ({
        id: `haystack-${index}`,
        value: index,
        display: char,
        state: 'default' as const
    }));
    
    let needleEls = needle.split('').map((char, index) => ({
        id: `needle-${index}`,
        value: 1000 + index, 
        display: char,
        state: 'partition' as const
    }));

    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    const assembleEls = () => [...haystackEls.map(e=>({...e})), ...needleEls.map(e=>({...e}))];
    
    steps.push({
      elements: assembleEls(),
      description: `目标：在目标字符串 "${haystack}" 中寻找 "${needle}"。红色/紫色图块代表目标模式。开始比对！`,
      activeLines: [5],
      metrics: { ...metrics }
    });

    const m = haystack.length;
    const n = needle.length;

    for (let i = 0; i <= m - n; i++) {
        let j = 0;
        
        let startMatchEls = assembleEls();
        startMatchEls[i].state = 'highlight';
        startMatchEls[haystack.length].state = 'highlight'; // highlight the first char of needle
        
        steps.push({
            elements: startMatchEls,
            description: `尝试从文本索引 [${i}] 处作为起点，开始比对字符。`,
            activeLines: [6],
            metrics: { ...metrics }
        });
        
        while (j < n) {
            metrics.comparisons++;
            metrics.arrayAccesses += 2;
            
            let compareEls = assembleEls();
            compareEls[i + j].state = 'comparing';
            compareEls[haystack.length + j].state = 'comparing';
            
            steps.push({
               elements: compareEls,
               description: `比对文本字符 '${haystack[i+j]}' 和 模式字符 '${needle[j]}'`,
               activeLines: [7],
               metrics: { ...metrics }
            });
            
            if (haystack[i + j] === needle[j]) {
                metrics.operations++;
                j++;
                let matchEls = assembleEls();
                matchEls[i + j - 1].state = 'sorted';
                matchEls[haystack.length + j - 1].state = 'sorted';
                steps.push({
                   elements: matchEls,
                   description: `匹配成功，指针向前推进，继续比对下一个字符。`,
                   activeLines: [8],
                   metrics: { ...metrics }
                });
            } else {
                let failEls = assembleEls();
                failEls[i + j].state = 'swapping';
                failEls[haystack.length + j].state = 'swapping';
                steps.push({
                   elements: failEls,
                   description: `当前字符不匹配！因此该起点匹配失败。准备移动到下一个起点。`,
                   activeLines: [7],
                   metrics: { ...metrics }
                });
                break;
            }
        }
        
        if (j === n) {
            let finalEls = assembleEls();
            for(let k = 0; k < n; k++) {
                finalEls[i + k].state = 'sorted';
                finalEls[haystack.length + k].state = 'sorted';
            }
            steps.push({
               elements: finalEls,
               description: `发现完整匹配！起始索引为 ${i}。搜索结束。`,
               activeLines: [11, 12],
               metrics: { ...metrics }
            });
            return steps;
        }
    }
    
    steps.push({
       elements: assembleEls(),
       description: `所有起点都已尝试，且没有找到完全匹配的模式。退出。`,
       activeLines: [15],
       metrics: { ...metrics }
    });

    return steps;
  }
};
