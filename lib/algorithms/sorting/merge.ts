import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const mergeSort: AlgorithmDefinition = {
  id: 'merge-sort',
  name: '归并排序 (Merge Sort)',
  category: 'Sorting',
  description: '归并排序是建立在归并操作上的一种有效，稳定的排序算法，该算法是采用分治法的一个非常典型的应用。将已有序的子序列合并，得到完全有序的序列。',
  theory: {
    complexity: `严丝合缝的树形结构，永远稳如磐石的 O(N log N) 时间复杂度，不受任何极端恶劣数据影响。但在合并阶段必须申请额外数组装载临时数据，空间复杂度高达 O(N)。`,
    prosCons: `✅ 优点：不受数据状态影响，永远保持最高水准速度；属于极其稳定的对象型排序。
❌ 缺点：内存消耗极其奢侈，高达 O(N) 的冗余拷贝成本。`,
    interview: `手撕高频：利用额外数组实现合并逻辑。衍生进阶题【逆序对计算】：直接在 Merge 过程顺手统计左右跨越产生的颠倒状态计数，代码一模一样。`,
      core: "分治策略集大成经典算法。通过二分把大数组降维切割直至单人，再利用额外空间双指针进行有序的合并回串。",
      analogy: "就像选举省长：你先安排各个地市各自比拼选拔，把他们自己的有序市级名单整理出来。由于市级名单都是井然有序的，省长只要分别指派人把两组名单逐一对照抽出最大者合成即可。",
      scenarios: "适用场景：外部硬盘及海量超大数据量流的稳定结构排序",
      practical: "分布式批处理架构（如 Hadoop MapReduce 以及 Spark RDD算子等流计算系统的底层核心 shuffle 并发聚合层，由于其完美支撑多路并发及外部硬盘无缝并行归并特质而不可撼动。"
},
  coreSteps: [
    '把长度为n的输入序列分成两个长度为n/2的子序列。',
    '对这两个子序列分别采用归并排序。',
    '将两个排序好的子序列合并成一个最终的排序序列。'
  ],
  code: {
    "JavaScript": "/**\n * 归并排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nfunction mergeSort(arr) {\n  if (arr.length < 2) return arr;\n  let middle = Math.floor(arr.length / 2),\n      left = arr.slice(0, middle),\n      right = arr.slice(middle);\n  return merge(mergeSort(left), mergeSort(right));\n}\n\nfunction merge(left, right) {\n  let result = [];\n  while (left.length && right.length) {\n    if (left[0] <= right[0]) {\n      result.push(left.shift());\n    } else {\n      result.push(right.shift());\n    }\n  }\n  while (left.length) result.push(left.shift());\n  while (right.length) result.push(right.shift());\n  return result;\n}\n\n// 测试示例:\n// const arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// const sortedArr = mergeSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Python": "/**\n * 归并排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\ndef mergeSort(arr):\n  if (arr.__len__() < 2) return arr\n  middle = int(arr.__len__() / 2),\n      left = arr.slice(0, middle),\n      right = arr.slice(middle)\n  return merge(mergeSort(left), mergeSort(right))\n\n\ndef merge(left, right):\n  result = []\n  while (left.__len__() and right.__len__()) \n    if (left[0] <= right[0]) \n      result.append(left.shift())\n     else \n      result.append(right.shift())\n    \n  \n  while (left.__len__()) result.append(left.shift())\n  while (right.__len__()) result.append(right.shift())\n  return result\n\n\n# 测试示例:\n# arr = [5, 3, 8, 4, 1]\n# console.log(\"排序前:\", arr)\n# sortedArr = mergeSort(arr)\n# console.log(\"排序后:\", sortedArr)",
    "C++": "/**\n * 归并排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nauto mergeSort(arr) {\n  if (arr.size() < 2) return arr;\n  auto middle = std::floor(arr.size() / 2),\n      left = arr.slice(0, middle),\n      right = arr.slice(middle);\n  return merge(mergeSort(left), mergeSort(right));\n}\n\nauto merge(left, right) {\n  auto result = [];\n  while (left.size() && right.size()) {\n    if (left[0] <= right[0]) {\n      result.push_back(left.shift());\n    } else {\n      result.push_back(right.shift());\n    }\n  }\n  while (left.size()) result.push_back(left.shift());\n  while (right.size()) result.push_back(right.shift());\n  return result;\n}\n\n// 测试示例:\n// auto arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// auto sortedArr = mergeSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Java": "class Solution {\n    /**\n     * 归并排序算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: [5, 3, 8, 4, 1]\n     * 输出: [1, 3, 4, 5, 8]\n     */\n    public static var mergeSort(arr) {\n      if (arr.length < 2) return arr;\n      var middle = Math.floor(arr.length / 2),\n          left = arr.slice(0, middle),\n          right = arr.slice(middle);\n      return merge(mergeSort(left), mergeSort(right));\n    }\n    \n    public static var merge(left, right) {\n      var result = [];\n      while (left.length && right.length) {\n        if (left[0] <= right[0]) {\n          result.add(left.shift());\n        } else {\n          result.add(right.shift());\n        }\n      }\n      while (left.length) result.add(left.shift());\n      while (right.length) result.add(right.shift());\n      return result;\n    }\n    \n    // 测试示例:\n    // var arr = [5, 3, 8, 4, 1];\n    // console.log(\"排序前:\", arr);\n    // var sortedArr = mergeSort(arr);\n    // console.log(\"排序后:\", sortedArr);\n}"
},
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)'
  },
  spaceComplexity: 'O(n)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    
    steps.push({
      description: '初始状态',
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    const merge = (left: number, mid: number, right: number) => {
      let n1 = mid - left + 1;
      let n2 = right - mid;

      let L = new Array(n1);
      let R = new Array(n2);

      for (let i = 0; i < n1; i++) L[i] = arr[left + i];
      for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];

      let i = 0, j = 0;
      let k = left;

      steps.push({
        description: `【合并阶段】当前正在合并左侧子区间 [${left}..${mid}] 与 右侧子区间 [${mid+1}..${right}]。已将这两个子区间分别提取到临时数组 L 和 R 中准备做双指针归并。`,
        variables: { left, mid, right, 'L (Temp Array)': L.map(x=>x.value), 'R (Temp Array)': R.map(x=>x.value) },
        elements: arr.map((el, idx) => ({
          ...el,
          state: (idx >= left && idx <= right) ? 'partition' : 'default'
        }))
      });

      while (i < n1 && j < n2) {
        steps.push({
          description: `【逻辑比较】正在合并两个有序子序列。此时比较左侧子序列的游标元素 ${L[i].value} 与右侧子序列的游标元素 ${R[j].value}，以找出当前最小值。`,
          variables: { i, j, k, 'L (Temp Array)': L.map(x=>x.value), 'R (Temp Array)': R.map(x=>x.value) },
          elements: arr.map((el, idx) => ({
            ...el,
            state: idx === left + i ? 'comparing' : idx === mid + 1 + j ? 'comparing' : (idx >= left && idx <= right ? 'partition' : 'default')
          }))
        });

        if (L[i].value <= R[j].value) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        
        steps.push({
          description: `【逻辑比较】因为 ${arr[k].value} 比较小（或相等），将其从子序列中提取出来，安放到合并结果的有序位置（索引 ${k}）上。`,
          variables: { i, j, k, 'L (Temp Array)': L.map(x=>x.value), 'R (Temp Array)': R.map(x=>x.value) },
          elements: arr.map((el, idx) => ({
            ...el,
            state: idx === k ? 'sorted' : (idx >= left && idx <= right ? 'partition' : 'default')
          }))
        });
        k++;
      }

      while (i < n1) {
        arr[k] = L[i];
        steps.push({
          description: `因为右侧子序列已经全部合并完毕，剩下的左侧元素 ${arr[k].value} 原本就是有序的，直接按顺序平移到合并区域的末尾位置（索引 ${k}）。`,
          variables: { i, j, k, 'L (Temp Array)': L.map(x=>x.value), 'R (Temp Array)': R.map(x=>x.value) },
          elements: arr.map((el, idx) => ({
            ...el,
            state: idx === k ? 'sorted' : (idx >= left && idx <= right ? 'partition' : 'default')
          }))
        });
        i++;
        k++;
      }

      while (j < n2) {
        arr[k] = R[j];
        steps.push({
          description: `因为左侧子序列已经全部合并完毕，剩下的右侧元素 ${arr[k].value} 原本就是有序的，直接按顺序平移到合并区域的末尾位置（索引 ${k}）。`,
          variables: { i, j, k, 'L (Temp Array)': L.map(x=>x.value), 'R (Temp Array)': R.map(x=>x.value) },
          elements: arr.map((el, idx) => ({
            ...el,
            state: idx === k ? 'sorted' : (idx >= left && idx <= right ? 'partition' : 'default')
          }))
        });
        j++;
        k++;
      }
    };

    const mergeSortHelper = (left: number, right: number) => {
      if (left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        
        steps.push({
           description: `根据分治策略，准备将当前的数组片段（从索引 ${left} 到 ${right}）以中间点为界，一分为二，递归到底直到片段长度为1。`,
           variables: { left, mid, right },
          elements: arr.map((el, idx) => ({
            ...el,
            state: (idx >= left && idx <= right) ? 'partition' : 'default'
          }))
        });

        mergeSortHelper(left, mid);
        mergeSortHelper(mid + 1, right);
        merge(left, mid, right);
      }
    };

    mergeSortHelper(0, arr.length - 1);
    
    steps.push({
      description: '排序完成✨',
      elements: arr.map(el => ({ ...el, state: 'sorted' }))
    });
    
    return steps;
  }
};
