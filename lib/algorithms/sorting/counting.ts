import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const countingSort: AlgorithmDefinition = {
  id: 'counting-sort',
  name: '计数排序 (Counting Sort)',
  category: 'Sorting',
  description: '计数排序是一个非基于比较的排序算法，该算法于1954年由 Harold H. Seward 提出。它的优势在于在对一定范围内的整数排序时，它的复杂度为Ο(n+k)（其中k是整数的范围），快于任何比较排序算法。当然这是一种牺牲空间换取时间的做法。',
  theory: {
    complexity: `通常被禁锢在 O(N^2) 或极致优化的 O(N log N) 之间。`,
    prosCons: `✅ 优点：逻辑往往具有优美的确定性。
❌ 缺点：排序本身的计算损耗常常成倍于检索计算。`,
    interview: `面试侧重评估常数级别的心智考量，或者是极其刁钻的临界越界检查。排序几乎是代码控制能力检测第一关。`,
      core: "非比较型的利用额外线性内存记录元素频率统计索引的方法进行排序，极大超越了 O(N log N) 的比较界限，具有 O(N+K) 的极限性能。",
      analogy: "你要给全校1000个考生的成绩（满分100）排名，你不用互相两两比对，而是弄了100个空箱子（分数），遇到谁考50分就把谁扔进50号箱子。最后按1箱到100箱的顺序把所有人依次提留出来。",
      scenarios: "适用场景：基数有限极值差距不大的大量密集整数排序",
      practical: "对于大型分布式数据分片分析（如 Hive / Spark 中用户年龄特征分箱分布），由于值域有限可完美发挥该非比较排序的高效数据组装功能。"
},
  coreSteps: [
    '花O(n)的时间扫描一下整个序列A，获取最小值 min 和最大值 max。',
    '开辟一块新的空间创建新的数组B，长度为 max - min + 1。',
    '数组B中 index 的元素记录的值是A中某元素出现的次数。',
    '最后输出目标整数序列。'
  ],
  code: {
    "JavaScript": "/**\n * 计数排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nfunction countingSort(arr) {\n  var maxValue = arr[0];\n  for(let i=1; i<arr.length; i++) {\n    if(arr[i] > maxValue) maxValue = arr[i];\n  }\n  var bucket = new Array(maxValue + 1);\n  var sortedIndex = 0;\n  var arrLen = arr.length;\n  var bucketLen = maxValue + 1;\n  for (var i = 0; i < arrLen; i++) {\n    if (!bucket[arr[i]]) bucket[arr[i]] = 0;\n    bucket[arr[i]]++;\n  }\n  for (var j = 0; j < bucketLen; j++) {\n    while(bucket[j] > 0) {\n      arr[sortedIndex++] = j;\n      bucket[j]--;\n    }\n  }\n  return arr;\n}\n\n// 测试示例:\n// const arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// const sortedArr = countingSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Python": "/**\n * 计数排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\ndef countingSort(arr):\n  maxValue = arr[0]\n  for(i=1 i<arr.__len__() i++) \n    if(arr[i] > maxValue) maxValue = arr[i]\n  \n  bucket = Array(maxValue + 1)\n  sortedIndex = 0\n  arrLen = arr.__len__()\n  bucketLen = maxValue + 1\n  for (i = 0 i < arrLen i++) \n    if (!bucket[arr[i]]) bucket[arr[i]] = 0\n    bucket[arr[i]]++\n  \n  for (j = 0 j < bucketLen j++) \n    while(bucket[j] > 0) \n      arr[sortedIndex++] = j\n      bucket[j]--\n    \n  \n  return arr\n\n\n# 测试示例:\n# arr = [5, 3, 8, 4, 1]\n# console.log(\"排序前:\", arr)\n# sortedArr = countingSort(arr)\n# console.log(\"排序后:\", sortedArr)",
    "C++": "/**\n * 计数排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nauto countingSort(arr) {\n  auto maxValue = arr[0];\n  for(auto i=1; i<arr.size(); i++) {\n    if(arr[i] > maxValue) maxValue = arr[i];\n  }\n  auto bucket = new Array(maxValue + 1);\n  auto sortedIndex = 0;\n  auto arrLen = arr.size();\n  auto bucketLen = maxValue + 1;\n  for (auto i = 0; i < arrLen; i++) {\n    if (!bucket[arr[i]]) bucket[arr[i]] = 0;\n    bucket[arr[i]]++;\n  }\n  for (auto j = 0; j < bucketLen; j++) {\n    while(bucket[j] > 0) {\n      arr[sortedIndex++] = j;\n      bucket[j]--;\n    }\n  }\n  return arr;\n}\n\n// 测试示例:\n// auto arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// auto sortedArr = countingSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Java": "class Solution {\n    /**\n     * 计数排序算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: [5, 3, 8, 4, 1]\n     * 输出: [1, 3, 4, 5, 8]\n     */\n    public static var countingSort(arr) {\n      var maxValue = arr[0];\n      for(var i=1; i<arr.length; i++) {\n        if(arr[i] > maxValue) maxValue = arr[i];\n      }\n      var bucket = new Array(maxValue + 1);\n      var sortedIndex = 0;\n      var arrLen = arr.length;\n      var bucketLen = maxValue + 1;\n      for (var i = 0; i < arrLen; i++) {\n        if (!bucket[arr[i]]) bucket[arr[i]] = 0;\n        bucket[arr[i]]++;\n      }\n      for (var j = 0; j < bucketLen; j++) {\n        while(bucket[j] > 0) {\n          arr[sortedIndex++] = j;\n          bucket[j]--;\n        }\n      }\n      return arr;\n    }\n    \n    // 测试示例:\n    // var arr = [5, 3, 8, 4, 1];\n    // console.log(\"排序前:\", arr);\n    // var sortedArr = countingSort(arr);\n    // console.log(\"排序后:\", sortedArr);\n}"
},
  timeComplexity: {
    best: 'O(n + k)',
    average: 'O(n + k)',
    worst: 'O(n + k)'
  },
  spaceComplexity: 'O(k)', // where k is max value
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    
    steps.push({
      description: '初始状态',
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    let maxValue = arr[0].value;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].value > maxValue) maxValue = arr[i].value;
    }

    steps.push({
      description: `找到最大值 ${maxValue}，创建计数数组`,
      elements: arr.map((el) => ({ ...el, state: 'partition' }))
    });

    const bucket: number[] = new Array(maxValue + 1).fill(0);

    for (let i = 0; i < arr.length; i++) {
      bucket[arr[i].value]++;
      steps.push({
        description: `统计元素 ${arr[i].value} 的出现次数`,
        elements: arr.map((el, idx) => ({
          ...el,
          state: idx === i ? 'comparing' : 'default'
        }))
      });
    }

    let sortedIndex = 0;
    for (let j = 0; j <= maxValue; j++) {
      while (bucket[j] > 0) {
        // Need to create new identical structure for the values
        arr[sortedIndex] = { id: `new_${j}_${bucket[j]}`, value: j };
        
        steps.push({
          description: `基于计数还原数字 ${j}`,
          elements: arr.map((el, idx) => ({
            ...el,
            state: idx === sortedIndex ? 'sorted' : (idx < sortedIndex ? 'sorted' : 'default')
          }))
        });
        
        sortedIndex++;
        bucket[j]--;
      }
    }
    
    steps.push({
      description: '排序完成✨',
      elements: arr.map(el => ({ ...el, state: 'sorted' }))
    });
    
    return steps;
  }
};
