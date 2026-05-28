import { AlgorithmDefinition, ArrayElement, DPState, SimulationStep } from '../types';

export const fibonacciDp: AlgorithmDefinition = {
  id: 'dp-fibonacci',
  name: '斐波那契数列 (DP)',
  category: 'DP',
  description: '斐波那契数列的动态规划解法。通过保存已计算过的值，避免递归过程中的重复计算。',
  theory: {
    complexity: `单纯递归 O(2^N) 引发万年死机；改为动态状态递推后，只需单纯从前往后走一遭 O(N)；只要借助2个临时变量取代大数组，它的空间神乎其技地被压到 O(1)！`,
    prosCons: `✅ 优点：状态降维打击的恐怖示范。
❌ 缺点：必须找到严丝合缝的状态推导大公式，找不到这根方程公式就束手无策。`,
    interview: `它不是终点，而是跳板。“爬楼梯题（每次1阶或2阶）”本质也就是脱了马甲的斐波那契数列。如果你还用带数组下标的方式占用 O(N) 空间，必被追问：【能优化到 O(1) 空间吗？】—— 滚动变量技术！`,
      core: "通过记忆化（备忘录）或二维向一维降维的滚动数组优化，将指数级的递归计算转为线性的状态转移计算。",
      analogy: "就像计算工资：不再每次从祖祖辈辈的工资开始重新算，而是拿个小本子记下上个月和上上个月的，直接加起来就是这个月的。",
      scenarios: "适用场景：性能优化、空间状态压缩",
      practical: "分布式缓存架构中避免缓存击穿和计算重复：对已经计算过的数据集进行Memoization缓存，避免全量重新计算。"
},
  coreSteps: [
    '定义 dp 数组，dp[i] 表示第 i 个斐波那契数。',
    '初始化 dp[0] = 0, dp[1] = 1。',
    '从 i = 2 开始遍历，状态转移方程：dp[i] = dp[i-1] + dp[i-2]。'
  ],
  code: {
    "JavaScript": "/**\n * 斐波那契数列 (动态规划)\n * 输入: 10\n * 输出: 55\n */\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  const dp = new Array(n + 1).fill(0);\n  dp[0] = 0;\n  dp[1] = 1;\n  for (let i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}",
    "Python": "/**\n * 斐波那契数列 (动态规划)\n * 输入: 10\n * 输出: 55\n */\ndef fibonacci(n):\n  if (n <= 1) return n\n  dp = Array(n + 1).fill(0)\n  dp[0] = 0\n  dp[1] = 1\n  for (i = 2 i <= n i++) \n    dp[i] = dp[i - 1] + dp[i - 2]\n  \n  return dp[n]\n",
    "C++": "/**\n * 斐波那契数列 (动态规划)\n * 输入: 10\n * 输出: 55\n */\nauto fibonacci(n) {\n  if (n <= 1) return n;\n  auto dp = new Array(n + 1).fill(0);\n  dp[0] = 0;\n  dp[1] = 1;\n  for (auto i = 2; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  return dp[n];\n}",
    "Java": "class Solution {\n    /**\n     * 斐波那契数列 (动态规划)\n     * 输入: 10\n     * 输出: 55\n     */\n    public static var fibonacci(n) {\n      if (n <= 1) return n;\n      var dp = new Array(n + 1).fill(0);\n      dp[0] = 0;\n      dp[1] = 1;\n      for (var i = 2; i <= n; i++) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n      }\n      return dp[n];\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(n)',
  
  generateSteps: (initialArray: ArrayElement[], options): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const n = 15;
    const dp: (number | null)[] = new Array(n + 1).fill(null);
    const cellLogic: Record<string, string> = {};
    
    // Using 1D DP visualization via 2D matrix with 1 row
    const cloneMatrix = () => [ [...dp] ];
    
    const colLabels = Array.from({length: n+1}, (_, i) => `i=${i}`);

    steps.push({
      description: `初始化 dp 数组，计算第 ${n} 个斐波那契数`,
      elements: [],
      dpState: {
        matrix: cloneMatrix(),
        colLabels,
        highlightCells: []
      },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    dp[0] = 0;
    dp[1] = 1;

    steps.push({
      description: `初始状态: dp[0] = 0, dp[1] = 1`,
      elements: [],
      dpState: {
        matrix: cloneMatrix(),
        colLabels,
        highlightCells: [
            {r: 0, c: 0, color: '#10B981'},
            {r: 0, c: 1, color: '#10B981'}
        ]
      },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 2, operations: 2 }
    });

    let operations = 2;
    let arrayAccesses = 2;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1]! + dp[i-2]!;
        arrayAccesses += 3;
        operations++;
        const logicDesc = `计算 dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`;
        cellLogic[`0-${i}`] = logicDesc;
        steps.push({
            description: logicDesc,
            elements: [],
            dpState: {
                matrix: cloneMatrix(),
                colLabels,
                cellLogic: { ...cellLogic },
                highlightCells: [
                    {r: 0, c: i, color: '#3B82F6'},
                    {r: 0, c: i-1, color: '#FCD34D'},
                    {r: 0, c: i-2, color: '#FCD34D'}
                ]
            },
            metrics: { comparisons: 0, swaps: 0, arrayAccesses, operations }
        });
    }

    steps.push({
        description: `计算完成，斐波那契数 fib(${n}) = ${dp[n]}`,
        elements: [],
        dpState: {
            matrix: cloneMatrix(),
            colLabels, highlightCells: [{r: 0, c: n, color: '#EC4899'}]
        },
        metrics: { comparisons: 0, swaps: 0, arrayAccesses, operations }
    });

    return steps;
  }
};
