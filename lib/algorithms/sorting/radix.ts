import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const radixSort: AlgorithmDefinition = {
  id: 'radix-sort',
  name: '基数排序 (Radix Sort)',
  category: 'Sorting',
  description: '基数排序是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。由于整数也可以表达字符串和特定格式的浮点数，所以基数排序也不是只能用于整数。',
  theory: {
    complexity: `通常被禁锢在 O(N^2) 或极致优化的 O(N log N) 之间。`,
    prosCons: `✅ 优点：逻辑往往具有优美的确定性。
❌ 缺点：排序本身的计算损耗常常成倍于检索计算。`,
    interview: `面试侧重评估常数级别的心智考量，或者是极其刁钻的临界越界检查。排序几乎是代码控制能力检测第一关。`,
      core: "利用数字不同位的高低权重的计数排序扩展思维：先排个位，再排十位、最后排到最高百位完成整体的线性整理。",
      analogy: "就像整理图书馆的海量藏书编码图书区：不要想着一次整理好全书号，先全部分堆按尾号字母粗略排序入桶，再按个字母、再按区字母，最终就会发现惊人地完成了全局归整。",
      scenarios: "适用场景：有极多相同特征位数多结构字典的大规模序列",
      practical: "用来快速整理由分布式系统产生的带时间戳、地域、固定哈希位等具备长段数字字符串组成混合规则的超级海量 ID 序列归类的极致引擎。"
},
  coreSteps: [
    '取得数组中的最大数，并取得位数。',
    'arr 为原始数组，从最低位开始取每个位组成 radix 数组。',
    '对 radix 进行计数排序（利用微调的计数排序）。'
  ],
  code: {
    "JavaScript": "/**\n * 基数排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nfunction radixSort(arr) {\n  let max = Math.max(...arr);\n  let maxDigit = 0;\n  while(max > 0) { maxDigit++; max = Math.floor(max/10); }\n  \n  let mod = 10, dev = 1;\n  for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {\n    let counter = [];\n    for(let j = 0; j < arr.length; j++) {\n      let bucket = parseInt((arr[j] % mod) / dev);\n      if(counter[bucket] == null) counter[bucket] = [];\n      counter[bucket].push(arr[j]);\n    }\n    let pos = 0;\n    for(let j = 0; j < counter.length; j++) {\n      if(counter[j] != null) {\n        while(counter[j].length > 0) {\n          arr[pos++] = counter[j].shift();\n        }\n      }\n    }\n  }\n  return arr;\n}\n\n// 测试示例:\n// const arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// const sortedArr = radixSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Python": "/**\n * 基数排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\ndef radixSort(arr):\n  max = max(...arr)\n  maxDigit = 0\n  while(max > 0)  maxDigit++ max = int(max/10) \n  \n  mod = 10, dev = 1\n  for (i = 0 i < maxDigit i++, dev *= 10, mod *= 10) \n    counter = []\n    for(j = 0 j < arr.__len__() j++) \n      bucket = parseInt((arr[j] % mod) / dev)\n      if(counter[bucket] == null) counter[bucket] = []\n      counter[bucket].append(arr[j])\n    \n    pos = 0\n    for(j = 0 j < counter.__len__() j++) \n      if(counter[j] != null) \n        while(counter[j].__len__() > 0) \n          arr[pos++] = counter[j].shift()\n        \n      \n    \n  \n  return arr\n\n\n# 测试示例:\n# arr = [5, 3, 8, 4, 1]\n# console.log(\"排序前:\", arr)\n# sortedArr = radixSort(arr)\n# console.log(\"排序后:\", sortedArr)",
    "C++": "/**\n * 基数排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nauto radixSort(arr) {\n  auto max = std::max(...arr);\n  auto maxDigit = 0;\n  while(max > 0) { maxDigit++; max = std::floor(max/10); }\n  \n  auto mod = 10, dev = 1;\n  for (auto i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {\n    auto counter = [];\n    for(auto j = 0; j < arr.size(); j++) {\n      auto bucket = parseInt((arr[j] % mod) / dev);\n      if(counter[bucket] == null) counter[bucket] = [];\n      counter[bucket].push_back(arr[j]);\n    }\n    auto pos = 0;\n    for(auto j = 0; j < counter.size(); j++) {\n      if(counter[j] != null) {\n        while(counter[j].size() > 0) {\n          arr[pos++] = counter[j].shift();\n        }\n      }\n    }\n  }\n  return arr;\n}\n\n// 测试示例:\n// auto arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// auto sortedArr = radixSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Java": "class Solution {\n    /**\n     * 基数排序算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: [5, 3, 8, 4, 1]\n     * 输出: [1, 3, 4, 5, 8]\n     */\n    public static var radixSort(arr) {\n      var max = Math.max(...arr);\n      var maxDigit = 0;\n      while(max > 0) { maxDigit++; max = Math.floor(max/10); }\n      \n      var mod = 10, dev = 1;\n      for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {\n        var counter = [];\n        for(var j = 0; j < arr.length; j++) {\n          var bucket = parseInt((arr[j] % mod) / dev);\n          if(counter[bucket] == null) counter[bucket] = [];\n          counter[bucket].add(arr[j]);\n        }\n        var pos = 0;\n        for(var j = 0; j < counter.length; j++) {\n          if(counter[j] != null) {\n            while(counter[j].length > 0) {\n              arr[pos++] = counter[j].shift();\n            }\n          }\n        }\n      }\n      return arr;\n    }\n    \n    // 测试示例:\n    // var arr = [5, 3, 8, 4, 1];\n    // console.log(\"排序前:\", arr);\n    // var sortedArr = radixSort(arr);\n    // console.log(\"排序后:\", sortedArr);\n}"
},
  timeComplexity: {
    best: 'O(n * k)',
    average: 'O(n * k)',
    worst: 'O(n * k)'
  },
  spaceComplexity: 'O(n + k)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    
    steps.push({
      description: '初始状态',
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    let max = Math.max(...arr.map(x => x.value));
    let maxDigit = 0;
    let tempMax = max;
    while (tempMax > 0) {
        maxDigit++;
        tempMax = Math.floor(tempMax / 10);
    }

    steps.push({
      description: `最大值为 ${max}，最高位数为 ${maxDigit}，需要进行 ${maxDigit} 次分配和收集`,
      elements: arr.map(el => ({ ...el, state: 'partition' }))
    });

    let mod = 10;
    let dev = 1;
    for (let i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        steps.push({
            description: `开始处理第 ${i + 1} 位（从低到高）`,
            elements: arr.map(el => ({ ...el, state: 'default' }))
        });

        const counter: ArrayElement[][] = [];
        
        for (let j = 0; j < arr.length; j++) {
            let bucket = Math.floor((arr[j].value % mod) / dev);
            if (!counter[bucket]) {
                counter[bucket] = [];
            }
            counter[bucket].push(arr[j]);
            
            steps.push({
                description: `将 ${arr[j].value} 按当前位（${bucket}）放入桶中`,
                elements: arr.map((el, idx) => ({ ...el, state: idx === j ? 'comparing' : 'default' }))
            });
        }

        let pos = 0;
        for (let j = 0; j < counter.length; j++) {
            if (counter[j]) {
                while (counter[j].length > 0) {
                    const el = counter[j].shift()!;
                    arr[pos] = el;
                    
                    steps.push({
                        description: `从桶中依次收集元素，当前：${el.value}`,
                        // Preserve original elements and apply visual updates to simulate movement
                        elements: arr.map((e, idx) => {
                            if (e.id === el.id) return { ...e, state: 'swapping' };
                            return { ...e, state: idx < pos ? 'sorted' : 'default' };
                        })
                    });
                    pos++;
                }
            }
        }
    }
    
    steps.push({
      description: '排序完成✨',
      elements: arr.map(el => ({ ...el, state: 'sorted' }))
    });
    
    return steps;
  }
};
