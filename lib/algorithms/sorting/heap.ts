import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const heapSort: AlgorithmDefinition = {
  id: 'heap-sort',
  name: '堆排序 (Heap Sort)',
  category: 'Sorting',
  description: '堆排序是指利用堆这种数据结构所设计的一种排序算法。堆是一个近似完全二叉树的结构，并同时满足堆积的性质：即子结点的键值或索引总是小于（或者大于）它的父节点。',
  theory: {
    complexity: `通常被禁锢在 O(N^2) 或极致优化的 O(N log N) 之间。`,
    prosCons: `✅ 优点：逻辑往往具有优美的确定性。
❌ 缺点：排序本身的计算损耗常常成倍于检索计算。`,
    interview: `面试侧重评估常数级别的心智考量，或者是极其刁钻的临界越界检查。排序几乎是代码控制能力检测第一关。`,
      core: "通过模拟二叉树结构来维护大顶堆（或小顶堆），以 O(N log N) 的平滑可控时间和仅仅 O(1) 的超小原地空间把所有最大元素提取至数组后端。",
      analogy: "像残酷赛制选拔冠军竞技场：所有人像金字塔一样分层站立并持续向上发起挑战把弱者淘汰，处于尖尖塔顶的最强王者必定被挑选出去剥离，剩下的人再次决出金字塔尖...",
      scenarios: "适用场景：需要稳定的可控额外空间进行高可用排序",
      practical: "Linux/Unix的底层内核任务优先队列，及各类微服务框架用于流式的分布式海量定时任务分发器（Timer Wheels 底层堆实现）的顶级性能优化方案。"
},
  coreSteps: [
    '将初始待排序关键字序列(R1,R2....Rn)构建成大顶堆，此堆为初始的无序区。',
    '将堆顶元素R[1]与最后一个元素R[n]交换，此时得到新的无序区(R1,R2,......Rn-1)和新的有序区(Rn)。',
    '由于交换后新的堆顶R[1]可能违反堆的性质，因此需要对当前无序区(R1,R2,......Rn-1)调整为新堆。',
    '不断重复此过程直到有序区的元素个数为n-1，则整个排序过程完成。'
  ],
  code: {
    "JavaScript": "/**\n * buildMaxHeap 算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: 根据算法输入\n * 输出: 根据算法输出\n */\nvar len;\nfunction buildMaxHeap(arr) {\n  len = arr.length;\n  for (var i = Math.floor(len/2); i >= 0; i--) {\n    heapify(arr, i);\n  }\n}\nfunction heapify(arr, i) {\n  var left = 2 * i + 1, right = 2 * i + 2, largest = i;\n  if (left < len && arr[left] > arr[largest]) largest = left;\n  if (right < len && arr[right] > arr[largest]) largest = right;\n  if (largest != i) {\n    swap(arr, i, largest);\n    heapify(arr, largest);\n  }\n}\nfunction heapSort(arr) {\n  buildMaxHeap(arr);\n  for (var i = arr.length - 1; i > 0; i--) {\n    swap(arr, 0, i);\n    len--;\n    heapify(arr, 0);\n  }\n  return arr;\n}\n\n// 测试示例:\n// const result = buildMaxHeap根据算法输入;\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * buildMaxHeap 算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: 根据算法输入\n * 输出: 根据算法输出\n */\nlen\ndef buildMaxHeap(arr):\n  len = arr.__len__()\n  for (i = int(len/2) i >= 0 i--) \n    heapify(arr, i)\n  \n\ndef heapify(arr, i):\n  left = 2 * i + 1, right = 2 * i + 2, largest = i\n  if (left < len and arr[left] > arr[largest]) largest = left\n  if (right < len and arr[right] > arr[largest]) largest = right\n  if (largest != i) \n    swap(arr, i, largest)\n    heapify(arr, largest)\n  \n\ndef heapSort(arr):\n  buildMaxHeap(arr)\n  for (i = arr.__len__() - 1 i > 0 i--) \n    swap(arr, 0, i)\n    len--\n    heapify(arr, 0)\n  \n  return arr\n\n\n# 测试示例:\n# result = buildMaxHeap根据算法输入\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * buildMaxHeap 算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: 根据算法输入\n * 输出: 根据算法输出\n */\nauto len;\nauto buildMaxHeap(arr) {\n  len = arr.size();\n  for (auto i = std::floor(len/2); i >= 0; i--) {\n    heapify(arr, i);\n  }\n}\nauto heapify(arr, i) {\n  auto left = 2 * i + 1, right = 2 * i + 2, largest = i;\n  if (left < len && arr[left] > arr[largest]) largest = left;\n  if (right < len && arr[right] > arr[largest]) largest = right;\n  if (largest != i) {\n    swap(arr, i, largest);\n    heapify(arr, largest);\n  }\n}\nauto heapSort(arr) {\n  buildMaxHeap(arr);\n  for (auto i = arr.size() - 1; i > 0; i--) {\n    swap(arr, 0, i);\n    len--;\n    heapify(arr, 0);\n  }\n  return arr;\n}\n\n// 测试示例:\n// auto result = buildMaxHeap根据算法输入;\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * buildMaxHeap 算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: 根据算法输入\n     * 输出: 根据算法输出\n     */\n    var len;\n    public static var buildMaxHeap(arr) {\n      len = arr.length;\n      for (var i = Math.floor(len/2); i >= 0; i--) {\n        heapify(arr, i);\n      }\n    }\n    public static var heapify(arr, i) {\n      var left = 2 * i + 1, right = 2 * i + 2, largest = i;\n      if (left < len && arr[left] > arr[largest]) largest = left;\n      if (right < len && arr[right] > arr[largest]) largest = right;\n      if (largest != i) {\n        swap(arr, i, largest);\n        heapify(arr, largest);\n      }\n    }\n    public static var heapSort(arr) {\n      buildMaxHeap(arr);\n      for (var i = arr.length - 1; i > 0; i--) {\n        swap(arr, 0, i);\n        len--;\n        heapify(arr, 0);\n      }\n      return arr;\n    }\n    \n    // 测试示例:\n    // var result = buildMaxHeap根据算法输入;\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    
    steps.push({
      description: '初始状态',
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    const swap = (i: number, j: number, desc: string, sortedBound: number) => {
      steps.push({
        description: desc,
        elements: arr.map((el, idx) => ({
          ...el,
          state: idx >= sortedBound ? 'sorted' : (idx === i || idx === j ? 'swapping' : 'default')
        }))
      });
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      steps.push({
        description: '交换完成',
        elements: arr.map((el, idx) => ({
          ...el,
          state: idx >= sortedBound ? 'sorted' : (idx === i || idx === j ? 'swapping' : 'default')
        }))
      });
    };

    let len = arr.length;

    const heapify = (i: number, sortedBound: number) => {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let largest = i;

      steps.push({
        description: `调整堆 (Heapify): 检查节点 ${arr[i].value}`,
        elements: arr.map((el, idx) => ({
          ...el,
          state: idx >= sortedBound ? 'sorted' : (idx === i ? 'pivot' : (idx === left || idx === right ? 'comparing' : 'default'))
        }))
      });

      if (left < len && arr[left].value > arr[largest].value) {
        largest = left;
      }
      if (right < len && arr[right].value > arr[largest].value) {
        largest = right;
      }

      if (largest !== i) {
        swap(i, largest, `节点小于子节点，与最大子节点 ${arr[largest].value} 交换`, sortedBound);
        heapify(largest, sortedBound);
      }
    };

    // Build max heap
    for (let i = Math.floor(len / 2); i >= 0; i--) {
      heapify(i, len);
    }
    
    steps.push({
      description: '最大堆构建完成，开始排序',
      elements: arr.map(el => ({ ...el, state: 'partition' }))
    });

    for (let i = arr.length - 1; i > 0; i--) {
      swap(0, i, `将堆顶最大值 ${arr[0].value} 与末尾元素 ${arr[i].value} 交换`, i + 1);
      len--;
      heapify(0, i);
    }
    
    steps.push({
      description: '排序完成✨',
      elements: arr.map(el => ({ ...el, state: 'sorted' }))
    });
    
    return steps;
  }
};
