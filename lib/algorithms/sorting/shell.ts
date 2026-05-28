import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const shellSort: AlgorithmDefinition = {
  id: 'shell-sort',
  name: '希尔排序 (Shell Sort)',
  category: 'Sorting',
  description: '希尔排序，也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。它通过比较相距一定间隔的元素来工作，各趟比较所用的距离随着算法的进行而减小。',
  theory: {
    complexity: `通常被禁锢在 O(N^2) 或极致优化的 O(N log N) 之间。`,
    prosCons: `✅ 优点：逻辑往往具有优美的确定性。
❌ 缺点：排序本身的计算损耗常常成倍于检索计算。`,
    interview: `面试侧重评估常数级别的心智考量，或者是极其刁钻的临界越界检查。排序几乎是代码控制能力检测第一关。`,
      core: "改进版的插入排序。采用了定义初始宏观的“减缩增量”分组序列跳跃，宏观保证部分数据有长程飞跃特性从而打破原本局部挪动的僵化弊病。",
      analogy: "像打乱班级座位的分层小组。一开始让相隔极远的几个同座跳着跨级排位（增量大跨度挪动），大家局部互换大幅度落座后慢慢再精确相邻微调，极大地让慢吞吞的数据快速到位。",
      scenarios: "适用场景：内存嵌入式小设备的低开销替代选择",
      practical: "由于在小体积、极低内存和非稳定要求严苛的物联网 IoT 边缘设备上能提供比快速排序结构占用少、又比慢插入快太多的平衡中庸之选。"
},
  coreSteps: [
    '选择一个增量序列 t1，t2，……，tk，其中 ti > tj, tk = 1。',
    '按增量序列个数 k，对序列进行 k 趟排序。',
    '每趟排序，根据对应的增量 ti，将待排序列分割成若干长度为 m 的子序列，分别对各子表进行直接插入排序。',
    '当增量因子为 1 时，整个序列作为一个表来处理，表长度即为整个序列的长度。'
  ],
  code: {
    "JavaScript": "/**\n * 希尔排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nfunction shellSort(arr) {\n  var len = arr.length, temp, gap = 1;\n  while(gap < len / 3) {\n    gap = gap * 3 + 1;\n  }\n  for (gap; gap > 0; gap = Math.floor(gap / 3)) {\n    for (var i = gap; i < len; i++) {\n        temp = arr[i];\n        for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {\n            arr[j + gap] = arr[j];\n        }\n        arr[j + gap] = temp;\n    }\n  }\n  return arr;\n}\n\n// 测试示例:\n// const arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// const sortedArr = shellSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Python": "/**\n * 希尔排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\ndef shellSort(arr):\n  len = arr.__len__(), temp, gap = 1\n  while(gap < len / 3) \n    gap = gap * 3 + 1\n  \n  for (gap gap > 0 gap = int(gap / 3)) \n    for (i = gap i < len i++) \n        temp = arr[i]\n        for (j = i - gap j >= 0 and arr[j] > temp j -= gap) \n            arr[j + gap] = arr[j]\n        \n        arr[j + gap] = temp\n    \n  \n  return arr\n\n\n# 测试示例:\n# arr = [5, 3, 8, 4, 1]\n# console.log(\"排序前:\", arr)\n# sortedArr = shellSort(arr)\n# console.log(\"排序后:\", sortedArr)",
    "C++": "/**\n * 希尔排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nauto shellSort(arr) {\n  auto len = arr.size(), temp, gap = 1;\n  while(gap < len / 3) {\n    gap = gap * 3 + 1;\n  }\n  for (gap; gap > 0; gap = std::floor(gap / 3)) {\n    for (auto i = gap; i < len; i++) {\n        temp = arr[i];\n        for (auto j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {\n            arr[j + gap] = arr[j];\n        }\n        arr[j + gap] = temp;\n    }\n  }\n  return arr;\n}\n\n// 测试示例:\n// auto arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// auto sortedArr = shellSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Java": "class Solution {\n    /**\n     * 希尔排序算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: [5, 3, 8, 4, 1]\n     * 输出: [1, 3, 4, 5, 8]\n     */\n    public static var shellSort(arr) {\n      var len = arr.length, temp, gap = 1;\n      while(gap < len / 3) {\n        gap = gap * 3 + 1;\n      }\n      for (gap; gap > 0; gap = Math.floor(gap / 3)) {\n        for (var i = gap; i < len; i++) {\n            temp = arr[i];\n            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {\n                arr[j + gap] = arr[j];\n            }\n            arr[j + gap] = temp;\n        }\n      }\n      return arr;\n    }\n    \n    // 测试示例:\n    // var arr = [5, 3, 8, 4, 1];\n    // console.log(\"排序前:\", arr);\n    // var sortedArr = shellSort(arr);\n    // console.log(\"排序后:\", sortedArr);\n}"
},
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log² n)',
    worst: 'O(n²)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    
    steps.push({
      description: '初始状态',
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    let len = arr.length;
    let gap = 1;
    while (gap < len / 3) {
      gap = Math.floor(gap * 3 + 1);
    }
    
    for (gap; gap > 0; gap = Math.floor(gap / 3)) {
      steps.push({
        description: `当前增量（间隔）为: ${gap}`,
        elements: arr.map(el => ({ ...el, state: 'partition' }))
      });
        
      for (let i = gap; i < len; i++) {
        let temp = arr[i];
        let j = i - gap;
        
        steps.push({
          description: `选择待插入元素 ${temp.value}`,
          variables: { gap, i, j, temp: temp.value },
          elements: arr.map((el, idx) => ({
            ...el,
            state: idx === i ? 'pivot' : (idx === j ? 'comparing' : 'default')
          }))
        });

        while (j >= 0 && arr[j].value > temp.value) {
          steps.push({
            description: `【位置交换】${arr[j].value} 大于 ${temp.value}，交换（距离为 ${gap}）`,
            variables: { gap, i, j, temp: temp.value },
            elements: arr.map((el, idx) => ({
              ...el,
              state: idx === j || idx === j + gap ? 'swapping' : 'default'
            }))
          });
          arr[j + gap] = arr[j];
          j -= gap;
          arr[j + gap] = temp; // To persist the swapping state visually on array elements
        }
        arr[j + gap] = temp;
        
        steps.push({
          description: `【状态更新】插入完成`,
          variables: { gap, i, j, temp: temp.value },
          elements: arr.map((el, idx) => ({
             ...el,
             state: idx === j + gap ? 'sorted' : 'default'
          }))
        });
      }
    }
    
    steps.push({
      description: '排序完成✨',
      elements: arr.map(el => ({ ...el, state: 'sorted' }))
    });
    
    return steps;
  }
};
