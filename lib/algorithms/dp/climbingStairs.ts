import { AlgorithmDefinition, SimulationStep, DPState } from '../types';

export const climbingStairs: AlgorithmDefinition = {
  id: 'climbing-stairs',
  name: '爬楼梯 (Climbing Stairs)',
  category: 'DP',
  description: '假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？这是一个典型的动态规划问题，状态转移方程为 dp[i] = dp[i-1] + dp[i-2]。',
  theory: {
    complexity: `通过恐怖的 O(N) 一维或者 O(N*M) 二维制表，以 O(N^2) 内存兑现 O(N^2)极速运算，干爆传统的 O(2^N) 噩梦。`,
    prosCons: `✅ 优点：具有扭转乾坤般的指数降级力量。
❌ 缺点：极度烧脑！如果找不到那个递推数学状态转换公式（状态转移方程），就纯纯望洋兴叹。`,
    interview: `大厂面试压箱底的神级拦路虎。`,
      core: "利用一维数组记录到达每一阶的方法数。当前状态等于前两个状态之和，典型的自底向上的状态递推。",
      analogy: "你想爬到第10层楼，每次只能走1步或2步。那到第10层的走法，必然是等于到第8层的走法加上到第9层的走法之和。",
      scenarios: "适用场景：状态机演进、基础动规",
      practical: "在复杂的业务流转状态机（State Machine）中，计算用户从任意初始态能够触发到终端节点的所有可能链路组合量级。"
},
  coreSteps: [
    '定义 dp 数组，dp[i] 表示到达第 i 阶楼梯的方法数。',
    '初始化 dp[1] = 1, dp[2] = 2。',
    '从 i = 3 开始遍历到 n，计算 dp[i] = dp[i-1] + dp[i-2]。',
    '返回 dp[n]。'
  ],
  code: {
    "JavaScript": "/**\n * 爬楼梯\n */\nfunction climbStairs(n) {\n  if (n <= 1) return 1;\n  if (n === 2) return 2;\n  \n  const dp = new Array(n + 1).fill(0);\n  dp[1] = 1;\n  dp[2] = 2;\n  \n  for (let i = 3; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  \n  return dp[n];\n}",
    "Python": "/**\n * 爬楼梯\n */\ndef climbStairs(n):\n  if (n <= 1) return 1\n  if (n == 2) return 2\n  \n  dp = Array(n + 1).fill(0)\n  dp[1] = 1\n  dp[2] = 2\n  \n  for (i = 3 i <= n i++) \n    dp[i] = dp[i - 1] + dp[i - 2]\n  \n  \n  return dp[n]\n",
    "C++": "/**\n * 爬楼梯\n */\nauto climbStairs(n) {\n  if (n <= 1) return 1;\n  if (n === 2) return 2;\n  \n  auto dp = new Array(n + 1).fill(0);\n  dp[1] = 1;\n  dp[2] = 2;\n  \n  for (auto i = 3; i <= n; i++) {\n    dp[i] = dp[i - 1] + dp[i - 2];\n  }\n  \n  return dp[n];\n}",
    "Java": "class Solution {\n    /**\n     * 爬楼梯\n     */\n    public static var climbStairs(n) {\n      if (n <= 1) return 1;\n      if (n === 2) return 2;\n      \n      var dp = new Array(n + 1).fill(0);\n      dp[1] = 1;\n      dp[2] = 2;\n      \n      for (var i = 3; i <= n; i++) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n      }\n      \n      return dp[n];\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(n) - 可以优化至 O(1)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let operations = 0;
    const n = 6;
    
    const dp = new Array(n + 1).fill(0);
    
    const cellLogic: Record<string, string> = {};
    const getDPState = (activeIndices: number[] = [], i?: number): DPState => {
      const matrix: (number | string | null)[][] = [
        ['阶数 i', ...Array.from({ length: n + 1 }, (_, idx) => idx)],
        ['dp[i]', ...dp]
      ];
      
      const hCells: { r: number, c: number, color: string }[] = [];
      
      activeIndices.forEach(idx => {
         hCells.push({ r: 1, c: idx + 1, color: 'rgba(52, 211, 153, 0.4)' }); // reading value
      });
      
      if (i !== undefined) {
         hCells.push({ r: 1, c: i + 1, color: 'rgba(239, 68, 68, 0.6)' }); // updating value
      }

      // calculate history cellLogic dynamically
      for(let k = 1; k <= n; k++) {
         if (dp[k] > 0) {
            if (k === 1) cellLogic[`1-${k+1}`] = `爬到第 1 阶只有一种方法 (走1步)`;
            else if (k === 2) cellLogic[`1-${k+1}`] = `爬到第 2 阶有两种方法 (走两个1步，或走一个2步)`;
            else cellLogic[`1-${k+1}`] = `dp[${k}] = dp[${k-1}] + dp[${k-2}]\n= ${dp[k-1]} + ${dp[k-2]} = ${dp[k]}`;
         }
      }
      
      return {
        matrix,
        highlightCells: hCells,
        cellLogic: { ...cellLogic }
      };
    };

    steps.push({
      description: `初始化，准备计算爬到第 ${n} 阶的方法数。`,
      activeLines: [8],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    dp[1] = 1;
    steps.push({
      description: `爬到第 1 阶只有一种方法 (走1步)`,
      activeLines: [9],
      elements: [],
      dpState: getDPState([], 1),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 1, operations: ++operations }
    });

    dp[2] = 2;
    steps.push({
      description: `爬到第 2 阶有两种方法 (走两个1步，或走一个2步)`,
      activeLines: [10],
      elements: [],
      dpState: getDPState([], 2),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 2, operations: ++operations }
    });

    for (let i = 3; i <= n; i++) {
       steps.push({
          description: `计算到第 ${i} 阶的方法数：可以从第 ${i-1} 阶走一步上来，或者从第 ${i-2} 阶走两步上来。`,
          activeLines: [13],
          elements: [],
          dpState: getDPState([i-1, i-2], i), // preview
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 2 * (i-2), operations: ++operations }
       });
       
       dp[i] = dp[i - 1] + dp[i - 2];
       
       steps.push({
          description: `更新 dp[${i}] = dp[${i-1}] + dp[${i-2}] = ${dp[i-1]} + ${dp[i-2]} = ${dp[i]}`,
          activeLines: [13],
          elements: [],
          dpState: getDPState([i-1, i-2], i), // finalized
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 2 * (i-2) + 1, operations: ++operations }
       });
    }

    steps.push({
      description: `计算完成！爬到第 ${n} 阶共有 ${dp[n]} 种不同的方法。`,
      activeLines: [16],
      elements: [],
      dpState: getDPState([n]),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 2 * (n-2) + 2, operations }
    });

    return steps;
  }
};
