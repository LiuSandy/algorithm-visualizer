import { AlgorithmDefinition, ArrayElement, SimulationStep, ElementState } from '../types';

export const fibonacciSearch: AlgorithmDefinition = {
  id: 'fibonacci-search',
  name: '斐波那契查找 (Fibonacci Search)',
  category: 'Searching',
  description: '斐波那契查找改变了二分查找中的按比例分配策略。利用斐波那契数列进行分割，相比二分查找的除法计算，斐波那契查找只需加减法运算就可以确定分割点，提升了某些环境下的运算效率。',
  theory: {
    complexity: `单纯递归 O(2^N) 引发万年死机；改为动态状态递推后，只需单纯从前往后走一遭 O(N)；只要借助2个临时变量取代大数组，它的空间神乎其技地被压到 O(1)！`,
    prosCons: `✅ 优点：状态降维打击的恐怖示范。
❌ 缺点：必须找到严丝合缝的状态推导大公式，找不到这根方程公式就束手无策。`,
    interview: `它不是终点，而是跳板。“爬楼梯题（每次1阶或2阶）”本质也就是脱了马甲的斐波那契数列。如果你还用带数组下标的方式占用 O(N) 空间，必被追问：【能优化到 O(1) 空间吗？】—— 滚动变量技术！`,
      core: "通过斐波那契数列（黄金分割）的性质，仅用加减法来定位分裂切分点替代普通二分查找所需的除法位移消耗进行区间界定。",
      analogy: "就像在一个巨型的古老天平上寻找黄金落点，你不像切豆腐样切中位，而是像大自然规律树叶生长一样按照最完美的0.618分割比例分配探查精力。",
      scenarios: "适用场景：极端严苛除法损耗的边缘计算系统、存储均匀场景",
      practical: "现代多核 CPU / GPU 等分布式计算密集网络中，某些缺乏高效浮点除法运算或者高并发对特定地址连续命中有要求场景可用于降低内存行抖动损耗。"
},
  coreSteps: [
    '找到大于或等于数组长度的最小斐波那契数 fibM。',
    '将原数组长度通过补齐扩展到 fibM-1 的长度（逻辑扩展）。',
    '利用斐波那契数列公式 fibM = fibM-1 + fibM-2 黄金分割查找区间。',
    '当 target 小于分割点，向前查找长度为 fibM-1；若大于，向后查找长度为 fibM-2。'
  ],
  code: {
    "JavaScript": "/**\n * 斐波那契查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\nfunction fibonacciSearch(arr, target) {\n  let n = arr.length;\n  let fibMMm2 = 0;\n  let fibMMm1 = 1;\n  let fibM = fibMMm2 + fibMMm1;\n  while (fibM < n) {\n    fibMMm2 = fibMMm1;\n    fibMMm1 = fibM;\n    fibM = fibMMm2 + fibMMm1;\n  }\n  \n  let offset = -1;\n  while (fibM > 1) {\n    let i = Math.min(offset + fibMMm2, n - 1);\n    \n    if (arr[i] < target) {\n      fibM = fibMMm1;\n      fibMMm1 = fibMMm2;\n      fibMMm2 = fibM - fibMMm1;\n      offset = i;\n    } else if (arr[i] > target) {\n      fibM = fibMMm2;\n      fibMMm1 = fibMMm1 - fibMMm2;\n      fibMMm2 = fibM - fibMMm1;\n    } else {\n      return i;\n    }\n  }\n  if (fibMMm1 && arr[offset + 1] === target) return offset + 1;\n  return -1;\n}\n\n// 测试示例:\n// const result = fibonacciSearch([1, 3, 4, 5, 8], 4);\n// console.log(\"执行结果:\", result);",
    "Python": "/**\n * 斐波那契查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\ndef fibonacciSearch(arr, target):\n  n = arr.__len__()\n  fibMMm2 = 0\n  fibMMm1 = 1\n  fibM = fibMMm2 + fibMMm1\n  while (fibM < n) \n    fibMMm2 = fibMMm1\n    fibMMm1 = fibM\n    fibM = fibMMm2 + fibMMm1\n  \n  \n  offset = -1\n  while (fibM > 1) \n    i = min(offset + fibMMm2, n - 1)\n    \n    if (arr[i] < target) \n      fibM = fibMMm1\n      fibMMm1 = fibMMm2\n      fibMMm2 = fibM - fibMMm1\n      offset = i\n     else if (arr[i] > target) \n      fibM = fibMMm2\n      fibMMm1 = fibMMm1 - fibMMm2\n      fibMMm2 = fibM - fibMMm1\n     else \n      return i\n    \n  \n  if (fibMMm1 and arr[offset + 1] == target) return offset + 1\n  return -1\n\n\n# 测试示例:\n# result = fibonacciSearch([1, 3, 4, 5, 8], 4)\n# console.log(\"执行结果:\", result)",
    "C++": "/**\n * 斐波那契查找算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: ([1, 3, 4, 5, 8], 4)\n * 输出: 2 (索引值)\n */\nauto fibonacciSearch(arr, target) {\n  auto n = arr.size();\n  auto fibMMm2 = 0;\n  auto fibMMm1 = 1;\n  auto fibM = fibMMm2 + fibMMm1;\n  while (fibM < n) {\n    fibMMm2 = fibMMm1;\n    fibMMm1 = fibM;\n    fibM = fibMMm2 + fibMMm1;\n  }\n  \n  auto offset = -1;\n  while (fibM > 1) {\n    auto i = std::min(offset + fibMMm2, n - 1);\n    \n    if (arr[i] < target) {\n      fibM = fibMMm1;\n      fibMMm1 = fibMMm2;\n      fibMMm2 = fibM - fibMMm1;\n      offset = i;\n    } else if (arr[i] > target) {\n      fibM = fibMMm2;\n      fibMMm1 = fibMMm1 - fibMMm2;\n      fibMMm2 = fibM - fibMMm1;\n    } else {\n      return i;\n    }\n  }\n  if (fibMMm1 && arr[offset + 1] === target) return offset + 1;\n  return -1;\n}\n\n// 测试示例:\n// auto result = fibonacciSearch([1, 3, 4, 5, 8], 4);\n// console.log(\"执行结果:\", result);",
    "Java": "class Solution {\n    /**\n     * 斐波那契查找算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: ([1, 3, 4, 5, 8], 4)\n     * 输出: 2 (索引值)\n     */\n    public static var fibonacciSearch(arr, target) {\n      var n = arr.length;\n      var fibMMm2 = 0;\n      var fibMMm1 = 1;\n      var fibM = fibMMm2 + fibMMm1;\n      while (fibM < n) {\n        fibMMm2 = fibMMm1;\n        fibMMm1 = fibM;\n        fibM = fibMMm2 + fibMMm1;\n      }\n      \n      var offset = -1;\n      while (fibM > 1) {\n        var i = Math.min(offset + fibMMm2, n - 1);\n        \n        if (arr[i] < target) {\n          fibM = fibMMm1;\n          fibMMm1 = fibMMm2;\n          fibMMm2 = fibM - fibMMm1;\n          offset = i;\n        } else if (arr[i] > target) {\n          fibM = fibMMm2;\n          fibMMm1 = fibMMm1 - fibMMm2;\n          fibMMm2 = fibM - fibMMm1;\n        } else {\n          return i;\n        }\n      }\n      if (fibMMm1 && arr[offset + 1] === target) return offset + 1;\n      return -1;\n    }\n    \n    // 测试示例:\n    // var result = fibonacciSearch([1, 3, 4, 5, 8], 4);\n    // console.log(\"执行结果:\", result);\n}"
},
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)'
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
      description: `对数组自动排序。目标值: ${targetValue}`,
      elements: arr.map(el => ({ ...el, state: 'default' }))
    });

    let n = arr.length;
    let fibMMm2 = 0;
    let fibMMm1 = 1;
    let fibM = fibMMm2 + fibMMm1;
    while (fibM < n) {
      fibMMm2 = fibMMm1;
      fibMMm1 = fibM;
      fibM = fibMMm2 + fibMMm1;
    }
    
    steps.push({
      description: `初始化斐波那契数列，找到大于等于数组长度 ${n} 的斐波那契数 fibM = ${fibM}`,
      variables: { targetValue, fibM, fibMMm1, fibMMm2 },
      elements: arr.map((el) => ({ ...el, state: 'default' }))
    });

    let offset = -1;
    let found = false;
    while (fibM > 1) {
      let i = Math.min(offset + fibMMm2, n - 1);
      
      steps.push({
         description: `按斐波那契比例计算分割点 Math.min(${offset} + ${fibMMm2}, ${n-1}) = ${i}`,
         variables: { targetValue, fibM, fibMMm1, fibMMm2, offset, i },
         pointers: { mid: i, left: offset + 1 < n ? offset + 1 : n - 1 },
         elements: arr.map((el, idx) => ({
            ...el,
            state: idx === i ? 'pivot' : (idx > offset && idx < offset + Math.max(fibMMm2, fibMMm1) ? 'partition' : 'default')
         }))
      });

      if (arr[i].value < targetValue) {
        steps.push({
            description: `arr[i] = ${arr[i].value} < ${targetValue}。更新斐波那契参数后退，偏移 offset = ${i}`,
            variables: { targetValue, fibM, fibMMm1, fibMMm2, offset, i },
            pointers: { mid: i, left: offset + 1 < n ? offset + 1 : n - 1 },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === i ? 'comparing' : 'default'
            }))
        });
        fibM = fibMMm1;
        fibMMm1 = fibMMm2;
        fibMMm2 = fibM - fibMMm1;
        offset = i;
      } else if (arr[i].value > targetValue) {
        steps.push({
            description: `【操作寻址】arr[i] = ${arr[i].value} > ${targetValue}。更新斐波那契参数后退，缩小搜索范围`,
            variables: { targetValue, fibM, fibMMm1, fibMMm2, offset, i },
            pointers: { mid: i, left: offset + 1 < n ? offset + 1 : n - 1 },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === i ? 'comparing' : 'default'
            }))
        });
        fibM = fibMMm2;
        fibMMm1 = fibMMm1 - fibMMm2;
        fibMMm2 = fibM - fibMMm1;
      } else {
        steps.push({
            description: `【状态更新】arr[i] == 目标值 ${targetValue}，找查成功！`,
            variables: { targetValue, fibM, fibMMm1, fibMMm2, offset, i },
            pointers: { mid: i, left: offset + 1 < n ? offset + 1 : n - 1 },
            elements: arr.map((el, idx) => ({
                ...el,
                state: idx === i ? 'sorted' : 'default'
            }))
        });
        found = true;
        break;
      }
    }

    if (!found) {
        if (fibMMm1 && offset + 1 < n && arr[offset + 1].value === targetValue) {
           steps.push({
              description: `最后验证边界 offset+1，找到目标值 ${targetValue}`,
              elements: arr.map((el, idx) => ({
                  ...el,
                  state: idx === offset + 1 ? 'sorted' : 'default'
              }))
           });
           found = true;
        } else {
           steps.push({
              description: `查找失败，目标值 ${targetValue} 不存在于数组中。`,
              elements: arr.map(el => ({ ...el, state: 'default' }))
          });
        }
    }
    
    return steps;
  }
};
