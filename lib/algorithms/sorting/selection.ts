import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const selectionSort: AlgorithmDefinition = {
  id: 'selection-sort',
  name: '选择排序 (Selection Sort)',
  category: 'Sorting',
  description: '选择排序是一种简单直观的排序算法。它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置，然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。以此类推，直到所有元素均排序完毕。',
  theory: {
    complexity: `通常被禁锢在 O(N^2) 或极致优化的 O(N log N) 之间。`,
    prosCons: `✅ 优点：逻辑往往具有优美的确定性。
❌ 缺点：排序本身的计算损耗常常成倍于检索计算。`,
    interview: `面试侧重评估常数级别的心智考量，或者是极其刁钻的临界越界检查。排序几乎是代码控制能力检测第一关。`,
      core: "通过 N 轮在线性扫描中暴击寻找那个残卷中最突出的最小者，每轮固定把它摘取抛向目前有序队伍的排头。",
      analogy: "你的衣柜全散作一团，你想挑出一套最有品质的衣服穿。你只能在整个垃圾堆里漫无目的地翻到底找到那一套“最好”的，然后再放到整整齐齐的小衣柜里保存。第二好的，第三好的也一样去翻找。",
      scenarios: "适用场景：少量元素对于非数据拷贝移动敏感场景",
      practical: "同样由于其无论如何都固执地呈现 O(N^2) 极高的遍历开销特征而在现代商业分布式生产体系中几近绝缘，大多存在于早期的理论研究。"
},
  coreSteps: [
    '初始状态：无序区为R[1..n]，有序区为空。',
    '第i趟排序 (i=1,2,3...n-1) 开始时，当前有序区和无序区分别为R[1..i-1]和R(i..n）。',
    '该趟排序从当前无序区中选出关键字最小的记录 R[k]，将它与无序区的第1个记录R[i]交换。',
    '交换后，使R[1..i]和R[i+1..n]分别变为记录个数增加1个的新有序区和记录个数减少1个的新无序区。'
  ],
  code: {
    "JavaScript": "/**\n * 选择排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nfunction selectionSort(arr) {\n  const len = arr.length;\n  let minIndex, temp;\n  for (let i = 0; i < len - 1; i++) {\n    minIndex = i;\n    for (let j = i + 1; j < len; j++) {\n      if (arr[j] < arr[minIndex]) {\n        minIndex = j;\n      }\n    }\n    temp = arr[i];\n    arr[i] = arr[minIndex];\n    arr[minIndex] = temp;\n  }\n  return arr;\n}\n\n// 测试示例:\n// const arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// const sortedArr = selectionSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Python": "/**\n * 选择排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\ndef selectionSort(arr):\n  len = arr.__len__()\n  minIndex, temp\n  for (i = 0 i < len - 1 i++) \n    minIndex = i\n    for (j = i + 1 j < len j++) \n      if (arr[j] < arr[minIndex]) \n        minIndex = j\n      \n    \n    temp = arr[i]\n    arr[i] = arr[minIndex]\n    arr[minIndex] = temp\n  \n  return arr\n\n\n# 测试示例:\n# arr = [5, 3, 8, 4, 1]\n# console.log(\"排序前:\", arr)\n# sortedArr = selectionSort(arr)\n# console.log(\"排序后:\", sortedArr)",
    "C++": "/**\n * 选择排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nauto selectionSort(arr) {\n  auto len = arr.size();\n  auto minIndex, temp;\n  for (auto i = 0; i < len - 1; i++) {\n    minIndex = i;\n    for (auto j = i + 1; j < len; j++) {\n      if (arr[j] < arr[minIndex]) {\n        minIndex = j;\n      }\n    }\n    temp = arr[i];\n    arr[i] = arr[minIndex];\n    arr[minIndex] = temp;\n  }\n  return arr;\n}\n\n// 测试示例:\n// auto arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// auto sortedArr = selectionSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Java": "class Solution {\n    /**\n     * 选择排序算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: [5, 3, 8, 4, 1]\n     * 输出: [1, 3, 4, 5, 8]\n     */\n    public static var selectionSort(arr) {\n      var len = arr.length;\n      var minIndex, temp;\n      for (var i = 0; i < len - 1; i++) {\n        minIndex = i;\n        for (var j = i + 1; j < len; j++) {\n          if (arr[j] < arr[minIndex]) {\n            minIndex = j;\n          }\n        }\n        temp = arr[i];\n        arr[i] = arr[minIndex];\n        arr[minIndex] = temp;\n      }\n      return arr;\n    }\n    \n    // 测试示例:\n    // var arr = [5, 3, 8, 4, 1];\n    // console.log(\"排序前:\", arr);\n    // var sortedArr = selectionSort(arr);\n    // console.log(\"排序后:\", sortedArr);\n}"
},
  timeComplexity: {
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    
    steps.push({
      description: '初始状态',
      activeLines: [10, 11],
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      
      const createStep = (stateMap: Record<number, ElementState>, desc: string, lines: number[] = [], jValue?: number) => {
        steps.push({
          description: desc,
          activeLines: lines,
          variables: { i, j: jValue !== undefined ? jValue : 'N/A', minIndex, minVal: arr[minIndex]?.value },
          elements: arr.map((el, idx) => ({
            ...el,
            state: stateMap[idx] || (idx < i ? 'sorted' : 'default')
          }))
        });
      };

      createStep({ [i]: 'pivot' }, `【选择起点】假设未排序区域首个元素（索引 ${i}，值为 ${arr[i].value}）为当前最小值，向右扫描。`, [12, 13]);
      
      for (let j = i + 1; j < arr.length; j++) {
        createStep({ [minIndex]: 'pivot', [j]: 'comparing' }, `当前正在查看未排序元素 ${arr[j].value}。【逻辑比较】对比当前元素 ${arr[j].value} 与当前记录的最小值 ${arr[minIndex].value}。`, [14, 15], j);
        
        if (arr[j].value < arr[minIndex].value) {
          minIndex = j;
          createStep({ [minIndex]: 'pivot' }, `【逻辑判断】由于发现更小值。\n【状态更新】更新最小值为 ${arr[j].value}。`, [16], j);
        }
      }
      
      if (minIndex !== i) {
        createStep({ [i]: 'swapping', [minIndex]: 'swapping' }, `【逻辑判断】由于真正的最小值 ${arr[minIndex].value} 不在起始位置，本轮需交换。\n【位置交换】由于 ${arr[minIndex].value} < ${arr[i].value}，将其调换。`, [19, 20, 21]);
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        createStep({ [i]: 'swapping', [minIndex]: 'swapping' }, `【状态更新】交换完毕，最小值 ${arr[i].value} 归入已排序区域。`, [19, 20, 21]);
      } else {
        createStep({ [i]: 'sorted' }, `【逻辑判断】由于起始值 ${arr[i].value} 恰好是最小值。\n【跳过交换】无需实质互换，直接就位。`, [19, 20, 21]);
      }
    }
    
    steps.push({
      description: '排序完成✨',
      activeLines: [23],
      elements: arr.map(el => ({ ...el, state: 'sorted' }))
    });
    
    return steps;
  }
};
