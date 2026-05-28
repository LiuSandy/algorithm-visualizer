import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const insertionSort: AlgorithmDefinition = {
  id: 'insertion-sort',
  name: '插入排序 (Insertion Sort)',
  category: 'Sorting',
  description: '插入排序的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。',
  theory: {
    complexity: `通常被禁锢在 O(N^2) 或极致优化的 O(N log N) 之间。`,
    prosCons: `✅ 优点：逻辑往往具有优美的确定性。
❌ 缺点：排序本身的计算损耗常常成倍于检索计算。`,
    interview: `面试侧重评估常数级别的心智考量，或者是极其刁钻的临界越界检查。排序几乎是代码控制能力检测第一关。`,
      core: "通过把未被排序的元素逐个取出，稳定地比较插入到之前那部分已经建立好的有序小群体合适的位置中。",
      analogy: "你在打斗地主起手摸牌阶段，右手摸上来一张新牌，你通常会把它插进你左手里边那几张已经按照点数由小到大排好的整齐扑克堆里特定的地方。",
      scenarios: "适用场景：近乎有序数据、微型少量数据集预处理",
      practical: "当超大规模分库分表的中间结果排序切分至极限单机微小数组量级进行合并收尾（例如 Java 内部 Arrays.sort 优化阈值下降为微小规模时降级的兜底）时充当尖兵。"
},
  coreSteps: [
    '把第一个元素看做一个有序序列，第二个元素到最后一个元素当成是未排序序列。',
    '从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。',
    '如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。'
  ],
  code: {
    "JavaScript": "/**\n * 插入排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nfunction insertionSort(arr) {\n  const len = arr.length;\n  for (let i = 1; i < len; i++) {\n    let current = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > current) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = current;\n  }\n  return arr;\n}\n\n// 测试示例:\n// const arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// const sortedArr = insertionSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Python": "/**\n * 插入排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\ndef insertionSort(arr):\n  len = arr.__len__()\n  for (i = 1 i < len i++) \n    current = arr[i]\n    j = i - 1\n    while (j >= 0 and arr[j] > current) \n      arr[j + 1] = arr[j]\n      j--\n    \n    arr[j + 1] = current\n  \n  return arr\n\n\n# 测试示例:\n# arr = [5, 3, 8, 4, 1]\n# console.log(\"排序前:\", arr)\n# sortedArr = insertionSort(arr)\n# console.log(\"排序后:\", sortedArr)",
    "C++": "/**\n * 插入排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nauto insertionSort(arr) {\n  auto len = arr.size();\n  for (auto i = 1; i < len; i++) {\n    auto current = arr[i];\n    auto j = i - 1;\n    while (j >= 0 && arr[j] > current) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = current;\n  }\n  return arr;\n}\n\n// 测试示例:\n// auto arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// auto sortedArr = insertionSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Java": "class Solution {\n    /**\n     * 插入排序算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: [5, 3, 8, 4, 1]\n     * 输出: [1, 3, 4, 5, 8]\n     */\n    public static var insertionSort(arr) {\n      var len = arr.length;\n      for (var i = 1; i < len; i++) {\n        var current = arr[i];\n        var j = i - 1;\n        while (j >= 0 && arr[j] > current) {\n          arr[j + 1] = arr[j];\n          j--;\n        }\n        arr[j + 1] = current;\n      }\n      return arr;\n    }\n    \n    // 测试示例:\n    // var arr = [5, 3, 8, 4, 1];\n    // console.log(\"排序前:\", arr);\n    // var sortedArr = insertionSort(arr);\n    // console.log(\"排序后:\", sortedArr);\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    
    steps.push({
      description: '初始状态',
      activeLines: [],
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    for (let i = 1; i < arr.length; i++) {
      let current = arr[i];
      let j = i - 1;
      
      const createStep = (stateMap: Record<number, ElementState>, desc: string, activeLines: number[] = []) => {
        steps.push({
          description: desc,
          activeLines,
          variables: { i, j, current: current.value },
          elements: arr.map((el, idx) => ({
            ...el,
            state: stateMap[idx] || (idx <= i ? 'sorted' : 'default')
          }))
        });
      };
      
      createStep({ [i]: 'pivot' }, `【锚定目标】当前处理元素 ${current.value} 作为“待插入元素”，准备向左寻找合适的位置。`, [11, 12]);

      while (j >= 0) {
        createStep({ [j]: 'comparing', [j+1]: 'pivot' }, `【逻辑比较】对比已排序元素 ${arr[j].value} 与待插入元素 ${current.value}。`, [14, 15]);
        
        if (arr[j].value > current.value) {
          createStep({ [j]: 'comparing', [j+1]: 'pivot' }, `【逻辑判断】由于 ${arr[j].value} > ${current.value}。\n【位置下沉】将 ${arr[j].value} 向右移动一位，腾出空间。`, [16, 17, 18, 19]);
          arr[j + 1] = arr[j];
          j--;
          // Update current element position in our array reference to preserve id
          arr[j + 1] = current; 
          createStep({ [j+1]: 'pivot' }, `【状态更新】元素右移完成，继续向更左侧寻找插入位置。`, [19, 20]);
        } else {
          createStep({ [j]: 'comparing', [j+1]: 'pivot' }, `【逻辑判断】由于 ${arr[j].value} <= ${current.value}。\n【跳过交换】已满足升序，找到正确的插入点。`, [22, 23]);
          break;
        }
      }
      
      createStep({ [j+1]: 'sorted' }, `【状态更新】将待插入元素 ${current.value} 放置就位。本轮结束。`, [25]);
      
    }
    
    steps.push({
      description: '排序完成✨',
      activeLines: [27],
      elements: arr.map(el => ({ ...el, state: 'sorted' }))
    });
    
    return steps;
  }
};
