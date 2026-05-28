import { AlgorithmDefinition, ArrayElement, SimulationStep, ElementState } from '../types';

export const binarySearch: AlgorithmDefinition = {
  id: 'binary-search',
  name: '二分查找 (Binary Search)',
  category: 'Searching',
  description: '二分查找也称折半查找，它是一种效率较高的查找方法。要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。',
  theory: {
    complexity: `由于每次都能削减一半的错误答案，即使是40亿的数据海洋，最多只需要试错32次。时间复杂度是霸道的 O(log N)，纯指针运算使其空间只需 O(1)。`,
    prosCons: `✅ 优点：查找速度逆天，消耗忽略不计。
❌ 缺点：极度挑食。数据不仅必须全局有序，还必须支持直接用下标访问（不能是链表）。`,
    interview: `二分查找是边界死循环的无尽深渊！重点考点：while 里面到底带不带等于号 (left <= right 还是 left < right)？计算中点为什么用 left + (right - left) / 2（防溢出）？如果在重复元素里找左边界呢？`,
      core: "在有序的数据空间内，每次通过比对中间点数据直接将可能的问题域大小缩小一半。折半思路将 O(N) 降低到极速的 O(log N)。",
      analogy: "像在字典里面找一个词，没必要从头翻，直接劈成两半翻开，如果看到的是M，而你要找的单词以C开头，那直接把字典后半截全扔了从前半本重找即可。",
      scenarios: "适用场景：有序数组静态查询、查找边界极值",
      practical: "在 MySQL B+树索引定位核心叶子节点链路环节、以及在 Apache Kafka 大规模日志分片和索引文件中寻找对应时间戳消息的具体 offset 位置起到决定性加速作用。"
},
  coreSteps: [
    '假设表中元素排好序。',
    '将表中间位置记录的关键字与查找关键字比较，如果两者相等，则查找成功。',
    '否则利用中间位置记录将表分成前、后两个子表，如果中间位置记录的关键字大于查找关键字，则查找前一子表，否则查找后一子表。',
    '重复以上过程，直到找到满足条件的记录，使查找成功，或直到子表不存在为止，此时查找不成功。'
  ],
  code: {
    "JavaScript": "/**\n * 二分查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\nfunction binarySearch(arr, target) {\n  let left = 0;\n  let right = arr.length - 1;\n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n      metrics.operations++;\n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  return -1;\n}\n\n// 测试示例:\n// const result = binarySearch([1, 3, 4, 5, 8], 4);\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 二分查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\ndef binarySearch(arr, target):\n  left = 0\n  right = arr.__len__() - 1\n  while (left <= right) \n    mid = int((left + right) / 2)\n      metrics.operations++\n    if (arr[mid] == target) \n      return mid\n     else if (arr[mid] < target) \n      left = mid + 1\n     else \n      right = mid - 1\n    \n  \n  return -1\n\n\n# 测试示例:\n# result = binarySearch([1, 3, 4, 5, 8], 4)\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 二分查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\nauto binarySearch(arr, target) {\n  auto left = 0;\n  auto right = arr.size() - 1;\n  while (left <= right) {\n    auto mid = std::floor((left + right) / 2);\n      metrics.operations++;\n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  return -1;\n}\n\n// 测试示例:\n// auto result = binarySearch([1, 3, 4, 5, 8], 4);\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 二分查找算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ([1, 3, 4, 5, 8], 4)\n     * 输出: 2 (索引值)\n     */\n    public static var binarySearch(arr, target) {\n      var left = 0;\n      var right = arr.length - 1;\n      while (left <= right) {\n        var mid = Math.floor((left + right) / 2);\n          metrics.operations++;\n        if (arr[mid] === target) {\n          return mid;\n        } else if (arr[mid] < target) {\n          left = mid + 1;\n        } else {\n          right = mid - 1;\n        }\n      }\n      return -1;\n    }\n    \n    // 测试示例:\n    // var result = binarySearch([1, 3, 4, 5, 8], 4);\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (initialArray: ArrayElement[], options?: any): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    steps.push({
      description: '初始状态（可能无序）',
      elements: initialArray.map(el => ({ ...el, state: 'default' })),
      metrics: { ...metrics }
    });

    const arr = [...initialArray].sort((a, b) => a.value - b.value);
    // 随机选择一个目标值，如果指定了target，则使用指定的
    const targetValue = options?.target !== undefined ? options.target : arr[Math.floor(Math.random() * arr.length)].value;

    steps.push({
      description: `【初始筛选】二分查找要求数组有序，已自动排序。目标值: ${targetValue}`,
      variables: { targetValue, left: 0, right: arr.length - 1 },
      pointers: { left: 0, right: arr.length - 1 },
      elements: arr.map(el => ({ ...el, state: 'default' })),
      metrics: { ...metrics }
    });

    let left = 0;
    let right = arr.length - 1;
    let found = false;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      steps.push({
        description: `【锁定区间】当前锁定的搜索区间为: 索引 [${left}, ${right}]，计算出中间位置 mid = ${mid}。准备将其值与目标物进行比对。`,
        variables: { targetValue, left, right, mid },
        pointers: { left, right, mid },
        elements: arr.map((el, idx) => ({
            ...el,
            state: idx === mid ? 'pivot' : (idx >= left && idx <= right ? 'partition' : 'default')
        })),
        metrics: { ...metrics }
      });

      metrics.comparisons++;
      metrics.arrayAccesses++;
      if (arr[mid].value === targetValue) {
        steps.push({
            description: `【匹配目标】因为 ${arr[mid].value} === ${targetValue}，\n【返回结果】比对发现中间值 ${arr[mid].value} 完全等于目标值 ${targetValue}，找查成功，完美命中！`,
            variables: { targetValue, left, right, mid },
            pointers: { left, right, mid },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === mid ? 'sorted' : 'default'
            })),
        metrics: { ...metrics }
        });
        found = true;
        break;
      } else if (arr[mid].value < targetValue) {
        metrics.comparisons++;
        metrics.arrayAccesses++;
        steps.push({
            description: `【逻辑判断】由于 ${arr[mid].value} < ${targetValue}，目标必然在右侧。\n【区间折半】将左边界向右推进，搜索区间缩小至右半部 [${mid + 1}, ${right}]。`,
            variables: { targetValue, left, right, mid },
            pointers: { left, right, mid },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === mid ? 'comparing' : (idx >= mid + 1 && idx <= right ? 'partition' : 'default')
            })),
        metrics: { ...metrics }
        });
        left = mid + 1;
      } else {
        steps.push({
            description: `【逻辑判断】由于 ${arr[mid].value} > ${targetValue}，目标必然在左侧。\n【区间折半】将右边界向左收缩，搜索区间缩小至左半部 [${left}, ${mid - 1}]。`,
            variables: { targetValue, left, right, mid },
            pointers: { left, right, mid },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === mid ? 'comparing' : (idx >= left && idx <= mid - 1 ? 'partition' : 'default')
            })),
        metrics: { ...metrics }
        });
        right = mid - 1;
      }
    }

    if (!found) {
        steps.push({
            description: `【操作寻址】左右边界已经相交错，搜索区间不复存在。这清楚地说明目标值 ${targetValue} 并不存在于此数组中。`,
            elements: arr.map(el => ({ ...el, state: 'default' })),
      metrics: { ...metrics }
        });
    }

    return steps;
  }
};
