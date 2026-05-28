import { AlgorithmDefinition, ArrayElement, SimulationStep, ElementState } from '../types';

export const interpolationSearch: AlgorithmDefinition = {
  id: 'interpolation-search',
  name: '插值查找 (Interpolation Search)',
  category: 'Searching',
  description: '插值查找是根据给定值 target 来寻找预估可能存在的位置，基于二分查找算法优化。将查找点的选择改进为自适应选择，可以提高查找效率。对于表长较大，而关键字分布又比较均匀的查找表来说，插值查找算法的平均性能要好得多。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "带预测性质的插值预测改进版二分搜索，通过探测首尾元素的值的插值比例直接跳到理论预估的位置去缩小范围，对于均匀分布序列极其迅速。",
      analogy: "就像查电话黄页找姓“张(Z)”的人。常识告诉你千万别从中间（M）翻，因为姓张在字母序的最后，你会直接凭感觉翻到书的最后面几页。",
      scenarios: "适用场景：数值均匀递增的大规模记录字典查询",
      practical: "在金融时序数据库或部分监控物联网采集数据库底层（例如连续写入的传感器的有序高频日志）中，能够实现接近于 O(1) 的超级热查询体验。"
},
  coreSteps: [
    '在有序数组中，基于二分查找思路。',
    '将中间位置的计算公式从 mid = (low + high) / 2 改为按值比例预估查找点。',
    '公式：pos = low + ((target - arr[low]) * (high - low) / (arr[high] - arr[low]))。',
    '注意防止越界，需判断 target 是否在 arr[low] 和 arr[high] 之间。'
  ],
  code: {
    "JavaScript": "/**\n * 插值查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\nfunction interpolationSearch(arr, target) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high && target >= arr[low] && target <= arr[high]) {\n    if (low === high) {\n      if (arr[low] === target) return low;\n      return -1;\n    }\n    let pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));\n    if (arr[pos] === target) return pos;\n    if (arr[pos] < target) low = pos + 1;\n    else high = pos - 1;\n  }\n  return -1;\n}\n\n// 测试示例:\n// const result = interpolationSearch([1, 3, 4, 5, 8], 4);\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 插值查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\ndef interpolationSearch(arr, target):\n  low = 0\n  high = arr.__len__() - 1\n  while (low <= high and target >= arr[low] and target <= arr[high]) \n    if (low == high) \n      if (arr[low] == target) return low\n      return -1\n    \n    pos = low + int(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]))\n    if (arr[pos] == target) return pos\n    if (arr[pos] < target) low = pos + 1\n    else high = pos - 1\n  \n  return -1\n\n\n# 测试示例:\n# result = interpolationSearch([1, 3, 4, 5, 8], 4)\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 插值查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\nauto interpolationSearch(arr, target) {\n  auto low = 0;\n  auto high = arr.size() - 1;\n  while (low <= high && target >= arr[low] && target <= arr[high]) {\n    if (low === high) {\n      if (arr[low] === target) return low;\n      return -1;\n    }\n    auto pos = low + std::floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));\n    if (arr[pos] === target) return pos;\n    if (arr[pos] < target) low = pos + 1;\n    else high = pos - 1;\n  }\n  return -1;\n}\n\n// 测试示例:\n// auto result = interpolationSearch([1, 3, 4, 5, 8], 4);\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 插值查找算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ([1, 3, 4, 5, 8], 4)\n     * 输出: 2 (索引值)\n     */\n    public static var interpolationSearch(arr, target) {\n      var low = 0;\n      var high = arr.length - 1;\n      while (low <= high && target >= arr[low] && target <= arr[high]) {\n        if (low === high) {\n          if (arr[low] === target) return low;\n          return -1;\n        }\n        var pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));\n        if (arr[pos] === target) return pos;\n        if (arr[pos] < target) low = pos + 1;\n        else high = pos - 1;\n      }\n      return -1;\n    }\n    \n    // 测试示例:\n    // var result = interpolationSearch([1, 3, 4, 5, 8], 4);\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log(log n))',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (initialArray: ArrayElement[], options?: any): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    steps.push({
      description: '初始状态（可能无序）',
      elements: initialArray.map(el => ({ ...el, state: 'default' }))
    });

    const arr = [...initialArray].sort((a, b) => a.value - b.value);
    const targetValue = options?.target !== undefined ? options.target : arr[Math.floor(Math.random() * arr.length)].value;

    steps.push({
      description: `对数组进行自动排序。插值查找目标值: ${targetValue}`,
      variables: { targetValue, low: 0, high: arr.length - 1 },
      pointers: { left: 0, right: arr.length - 1 },
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    let low = 0;
    let high = arr.length - 1;
    let found = false;

    while (low <= high && targetValue >= arr[low].value && targetValue <= arr[high].value) {
      if (low === high) {
        if (arr[low].value === targetValue) {
          steps.push({
             description: `【状态更新】low == high 且等于目标值，查找成功！`,
             variables: { targetValue, low, high, pos: low },
             pointers: { left: low, right: high, mid: low },
             elements: arr.map((el, idx) => ({ ...el, state: idx === low ? 'sorted' : 'default' }))
          });
          found = true;
        }
        break;
      }
      
      let pos = low + Math.floor(((targetValue - arr[low].value) * (high - low)) / (arr[high].value - arr[low].value));
      
      steps.push({
        description: `【操作寻址】利用插值公式计算位置 pos = ${pos}。搜索区间: [${low}, ${high}]`,
        variables: { targetValue, low, high, pos },
        pointers: { left: low, right: high, mid: pos },
        elements: arr.map((el, idx) => ({
            ...el,
            state: idx === pos ? 'pivot' : (idx >= low && idx <= high ? 'partition' : 'default')
        }))
      });

      if (arr[pos].value === targetValue) {
        steps.push({
            description: `【状态更新】插值点 ${arr[pos].value} == 目标值 ${targetValue}，查找成功！`,
            variables: { targetValue, low, high, pos },
            pointers: { left: low, right: high, mid: pos },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === pos ? 'sorted' : 'default'
            }))
        });
        found = true;
        break;
      } else if (arr[pos].value < targetValue) {
        steps.push({
            description: `插值点 ${arr[pos].value} < 目标值 ${targetValue}，区间更新至 [${pos + 1}, ${high}]`,
            variables: { targetValue, low, high, pos },
            pointers: { left: low, right: high, mid: pos },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === pos ? 'comparing' : (idx >= pos + 1 && idx <= high ? 'partition' : 'default')
            }))
        });
        low = pos + 1;
      } else {
        steps.push({
            description: `插值点 ${arr[pos].value} > 目标值 ${targetValue}，区间更新至 [${low}, ${pos - 1}]`,
            variables: { targetValue, low, high, pos },
            pointers: { left: low, right: high, mid: pos },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === pos ? 'comparing' : (idx >= low && idx <= pos - 1 ? 'partition' : 'default')
            }))
        });
        high = pos - 1;
      }
    }

    if (!found) {
        steps.push({
            description: `根据公式计算和边界判断查找失败，目标值不在数组中。`,
            elements: arr.map(el => ({ ...el, state: 'default' }))
        });
    }

    return steps;
  }
};
