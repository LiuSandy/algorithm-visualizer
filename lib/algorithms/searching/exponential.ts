import { AlgorithmDefinition, ArrayElement, SimulationStep, ElementState } from '../types';

export const exponentialSearch: AlgorithmDefinition = {
  id: 'exponential-search',
  name: '指数查找 (Exponential Search)',
  category: 'Searching',
  description: '指数查找也称倍增查找。它用于在无限/未排序（其实还是得排序）的列表中查找元素区间。它的基本思想是寻找第一个比目标值大的元素区间，然后在该区间内进行二分查找。适合目标值靠近数组开头的情况。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "在未知的无限长度或分布极不均匀的数据集中，通过将步长翻倍式增长找到目标可能存在的左右上下界域，之后在该界域内执行一次严密的二分查找。",
      analogy: "在一个你不知道出口有多长的山洞隧道探险：你先走1步，再走2步没看到，再走4步、8步，直到看到有亮光，再细嚼慢咽在这个亮光区间仔细排查...",
      scenarios: "适用场景：无限序列检索、跳表查找前置提速",
      practical: "在大数据计算中针对具有极其庞大分布不均的历史日志进行数据探查（Data Probing），或在分布式存储日志的快照时间点定位时规避在全量有序存储系统中的浪费。"
},
  coreSteps: [
    '首先检查第一个元素是否是目标值。',
    '从 i = 1 开始，每次将 i 乘以 2（即 1, 2, 4, 8...），直到 arr[i] 大于目标值或越界。',
    '这样找到了一个区间 [i/2, Math.min(i, n-1)]，目标值必然包含在这个区间中。',
    '在这个确定的区间上执行标准的二分查找。'
  ],
  code: {
    "JavaScript": "/**\n * 指数查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\nfunction exponentialSearch(arr, target) {\n  let n = arr.length;\n  if (arr[0] === target) return 0;\n  \n  let i = 1;\n  while (i < n && arr[i] <= target) {\n    i = i * 2;\n  }\n  \n  return binarySearch(arr, Math.floor(i / 2), Math.min(i, n - 1), target);\n}\n\nfunction binarySearch(arr, left, right, target) {\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n\n// 测试示例:\n// const result = exponentialSearch([1, 3, 4, 5, 8], 4);\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 指数查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\ndef exponentialSearch(arr, target):\n  n = arr.__len__()\n  if (arr[0] == target) return 0\n  \n  i = 1\n  while (i < n and arr[i] <= target) \n    i = i * 2\n  \n  \n  return binarySearch(arr, int(i / 2), min(i, n - 1), target)\n\n\ndef binarySearch(arr, left, right, target):\n  while (left <= right) \n    mid = int((left + right) / 2)\n    if (arr[mid] == target) return mid\n    else if (arr[mid] < target) left = mid + 1\n    else right = mid - 1\n  \n  return -1\n\n\n# 测试示例:\n# result = exponentialSearch([1, 3, 4, 5, 8], 4)\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 指数查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\nauto exponentialSearch(arr, target) {\n  auto n = arr.size();\n  if (arr[0] === target) return 0;\n  \n  auto i = 1;\n  while (i < n && arr[i] <= target) {\n    i = i * 2;\n  }\n  \n  return binarySearch(arr, std::floor(i / 2), std::min(i, n - 1), target);\n}\n\nauto binarySearch(arr, left, right, target) {\n  while (left <= right) {\n    auto mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    else if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n\n// 测试示例:\n// auto result = exponentialSearch([1, 3, 4, 5, 8], 4);\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 指数查找算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ([1, 3, 4, 5, 8], 4)\n     * 输出: 2 (索引值)\n     */\n    public static var exponentialSearch(arr, target) {\n      var n = arr.length;\n      if (arr[0] === target) return 0;\n      \n      var i = 1;\n      while (i < n && arr[i] <= target) {\n        i = i * 2;\n      }\n      \n      return binarySearch(arr, Math.floor(i / 2), Math.min(i, n - 1), target);\n    }\n    \n    public static var binarySearch(arr, left, right, target) {\n      while (left <= right) {\n        var mid = Math.floor((left + right) / 2);\n        if (arr[mid] === target) return mid;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n      }\n      return -1;\n    }\n    \n    // 测试示例:\n    // var result = exponentialSearch([1, 3, 4, 5, 8], 4);\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log i)', // i is position of target
    worst: 'O(log i)'
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
      description: `对数组进行自动排序。指数查找目标值: ${targetValue}`,
      variables: { targetValue },
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    let found = false;

    if (arr[0].value === targetValue) {
        steps.push({
            description: `【状态更新】首元素等于目标值，查找成功！`,
            variables: { targetValue, pos: 0 },
            pointers: { mid: 0 },
            elements: arr.map((el, idx) => ({ ...el, state: idx === 0 ? 'sorted' : 'default' }))
        });
        return steps;
    }

    steps.push({
        description: `【操作寻址】起点 arr[0] != 目标值，准备通过倍增寻找范围区间。`,
        variables: { targetValue, i: 1 },
        pointers: { right: 1 },
        elements: arr.map((el, idx) => ({ ...el, state: idx === 0 ? 'comparing' : 'default' }))
    });

    let i = 1;
    let n = arr.length;
    while (i < n && arr[i].value <= targetValue) {
        steps.push({
            description: `探测索引 i = ${i}，其值 ${arr[i].value} <= 目标值 ${targetValue}，i 索引倍增（x 2）`,
            variables: { targetValue, i },
            pointers: { right: i },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === i ? 'pivot' : 'default'
            }))
        });
        
        let next = i * 2;
        if(next < n && arr[next].value <= targetValue) {
            i = next;
        } else {
            let originalI = i;
            i = i * 2;
            steps.push({
                description: `探测索引变为 i = ${i}，已经越界或大于目标值，跳出探测循环。区间确定！`,
                variables: { targetValue, i },
                pointers: { right: Math.min(i, n -1), left: Math.floor(originalI) },
                elements: arr.map((el, idx) => ({
                    ...el,
                    state: idx === originalI ? 'comparing' : 'default'
                }))
            });
        }
    }

    let left = Math.floor(i / 2);
    let right = Math.min(i, n - 1);
    
    steps.push({
        description: `在确定的区间 [${left}, ${right}] 执行正常的二分查找`,
        variables: { targetValue, left, right },
        pointers: { left, right },
        elements: arr.map((el, idx) => ({
            ...el,
            state: (idx >= left && idx <= right) ? 'partition' : 'default'
        }))
    });

    // 二分查找部分
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      steps.push({
        description: `【操作寻址】当前搜索区间: [${left}, ${right}]，计算中间节点 mid = ${mid}`,
        variables: { targetValue, left, right, mid },
        pointers: { left, right, mid },
        elements: arr.map((el, idx) => ({
            ...el,
            state: idx === mid ? 'pivot' : (idx >= left && idx <= right ? 'partition' : 'default')
        }))
      });

      if (arr[mid].value === targetValue) {
        steps.push({
            description: `【状态更新】中间值 ${arr[mid].value} == 目标值 ${targetValue}，查找成功！`,
            variables: { targetValue, left, right, mid },
            pointers: { left, right, mid },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === mid ? 'sorted' : 'default'
            }))
        });
        found = true;
        break;
      } else if (arr[mid].value < targetValue) {
        steps.push({
            description: `中间值 ${arr[mid].value} < 目标值 ${targetValue}，缩小至 [${mid + 1}, ${right}]`,
            variables: { targetValue, left, right, mid },
            pointers: { left, right, mid },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === mid ? 'comparing' : (idx >= mid + 1 && idx <= right ? 'partition' : 'default')
            }))
        });
        left = mid + 1;
      } else {
        steps.push({
            description: `中间值 ${arr[mid].value} > 目标值 ${targetValue}，缩小至 [${left}, ${mid - 1}]`,
            variables: { targetValue, left, right, mid },
            pointers: { left, right, mid },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === mid ? 'comparing' : (idx >= left && idx <= mid - 1 ? 'partition' : 'default')
            }))
        });
        right = mid - 1;
      }
    }
    
    if (!found) {
        steps.push({
            description: `查找失败，目标值 ${targetValue} 不在数组中。`,
            elements: arr.map(el => ({ ...el, state: 'default' }))
        });
    }

    return steps;
  }
};
