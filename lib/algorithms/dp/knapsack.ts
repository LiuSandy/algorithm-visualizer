import { AlgorithmDefinition, SimulationStep, DPState } from '../types';

export const knapsack: AlgorithmDefinition = {
  id: 'knapsack-01',
  name: '0-1 背包问题 (0-1 Knapsack)',
  category: 'DP',
  description: '有 N 件物品和一个容量为 W 的背包。第 i 件物品的重量是 wt[i]，价值是 val[i]。求解将哪些物品装入背包可使价值总和最大。0-1 意味着每件物品只能选择装入(1)或不装入(0)。\n状态转移方程：dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i-1]] + v[i-1])',
  theory: {
    complexity: `通过恐怖的 O(N) 一维或者 O(N*M) 二维制表，以 O(N^2) 内存兑现 O(N^2)极速运算，干爆传统的 O(2^N) 噩梦。`,
    prosCons: `✅ 优点：具有扭转乾坤般的指数降级力量。
❌ 缺点：极度烧脑！如果找不到那个递推数学状态转换公式（状态转移方程），就纯纯望洋兴叹。`,
    interview: `大厂面试压箱底的神级拦路虎。`,
      core: "二维动态规划。对每件物品，权衡“装”与“不装”对容量和价值的影响，决策出全局最优子结构。",
      analogy: "你背着个小书包去超市免费随便拿。为了总价最贵，你得盯着每样东西算计：这个虽然贵但太占地方了，那个便宜但是小巧可以多塞几件...",
      scenarios: "适用场景：资源调度、预算最优化",
      practical: "在现代云原生架构下的 Kubernetes 调度器（Kube-Scheduler）中，用于决定将多个限制了CPU和内存资源大小的 Pod 装箱分配到特定的物理 Node 节点上以达到最严密的资源堆叠。"
},
  coreSteps: [
    '定义 dp[i][j] 表示前 i 个物品，背包容量为 j 时的最大价值。',
    '若不装第 i 个物品，dp[i][j] = dp[i-1][j]。',
    '若装第 i 个物品，dp[i][j] = dp[i-1][j-wt] + val。',
    '取两者最大值：dp[i][j] = max(dp[i-1][j], dp[i-1][j-wt] + val)。'
  ],
  code: {
    "JavaScript": "/**\n * 0-1 背包问题\n * @param W 背包最大容量\n * @param wt 物品重量数组\n * @param val 物品价值数组\n */\nfunction knapsack(W, wt, val) {\n  const n = wt.length;\n  // dp[n+1][W+1]\n  const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));\n  \n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= W; w++) {\n      if (wt[i - 1] <= w) {\n        // 可以装下，比较装与不装的价值\n        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt[i - 1]] + val[i - 1]);\n      } else {\n        // 装不下，沿用前 i-1 个物品的最优解\n        dp[i][w] = dp[i - 1][w];\n      }\n    }\n  }\n  \n  return dp[n][W];\n}",
    "Python": "/**\n * 0-1 背包问题\n * @param W 背包最大容量\n * @param wt 物品重量数组\n * @param val 物品价值数组\n */\ndef knapsack(W, wt, val):\n  n = wt.__len__()\n  # dp[n+1][W+1]\n  dp = Array.from( length: n + 1 , () => Array(W + 1).fill(0))\n  \n  for (i = 1 i <= n i++) \n    for (w = 0 w <= W w++) \n      if (wt[i - 1] <= w) \n        # 可以装下，比较装与不装的价值\n        dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - wt[i - 1]] + val[i - 1])\n       else \n        # 装不下，沿用前 i-1 个物品的最优解\n        dp[i][w] = dp[i - 1][w]\n      \n    \n  \n  \n  return dp[n][W]\n",
    "C++": "/**\n * 0-1 背包问题\n * @param W 背包最大容量\n * @param wt 物品重量数组\n * @param val 物品价值数组\n */\nauto knapsack(W, wt, val) {\n  auto n = wt.size();\n  // dp[n+1][W+1]\n  auto dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));\n  \n  for (auto i = 1; i <= n; i++) {\n    for (auto w = 0; w <= W; w++) {\n      if (wt[i - 1] <= w) {\n        // 可以装下，比较装与不装的价值\n        dp[i][w] = std::max(dp[i - 1][w], dp[i - 1][w - wt[i - 1]] + val[i - 1]);\n      } else {\n        // 装不下，沿用前 i-1 个物品的最优解\n        dp[i][w] = dp[i - 1][w];\n      }\n    }\n  }\n  \n  return dp[n][W];\n}",
    "Java": "class Solution {\n    /**\n     * 0-1 背包问题\n     * @param W 背包最大容量\n     * @param wt 物品重量数组\n     * @param val 物品价值数组\n     */\n    public static var knapsack(W, wt, val) {\n      var n = wt.length;\n      // dp[n+1][W+1]\n      var dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));\n      \n      for (var i = 1; i <= n; i++) {\n        for (var w = 0; w <= W; w++) {\n          if (wt[i - 1] <= w) {\n            // 可以装下，比较装与不装的价值\n            dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - wt[i - 1]] + val[i - 1]);\n          } else {\n            // 装不下，沿用前 i-1 个物品的最优解\n            dp[i][w] = dp[i - 1][w];\n          }\n        }\n      }\n      \n      return dp[n][W];\n    }\n}"
},
  timeComplexity: {
    best: 'O(n * W)',
    average: 'O(n * W)',
    worst: 'O(n * W)'
  },
  spaceComplexity: 'O(n * W) - 可优化至 O(W) (使用一维数组滚动)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let operations = 0;
    
    // items
    const wt = [2, 1, 3];
    const val = [4, 2, 3];
    const W = 4;
    const n = wt.length;
    
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
    const cellLogic: Record<string, string> = {};
    
    // Build initial matrix for visualization
    const getDPState = (currI?: number, currW?: number, readR1?: number, readC1?: number, readR2?: number, readC2?: number): DPState => {
      const matrix: (number | string | null)[][] = [];
      const hCells: { r: number, c: number, color: string }[] = [];
      
      const headerRow = ['物品 i \\ 容量 w'];
      for (let w = 0; w <= W; w++) headerRow.push(w.toString());
      matrix.push(headerRow);
      
      for (let i = 0; i <= n; i++) {
        let label = `i=${i}`;
        if (i > 0) label += ` (w=${wt[i-1]}, v=${val[i-1]})`;
        const row: (string | number)[] = [label];
        for (let w = 0; w <= W; w++) {
           row.push(dp[i][w]);
        }
        matrix.push(row);
      }
      
      if (currI !== undefined && currW !== undefined) {
          hCells.push({ r: currI + 1, c: currW + 1, color: 'rgba(239, 68, 68, 0.6)' }); // active write
      }
      if (readR1 !== undefined && readC1 !== undefined) {
          hCells.push({ r: readR1 + 1, c: readC1 + 1, color: 'rgba(52, 211, 153, 0.4)' }); // read 1
      }
      if (readR2 !== undefined && readC2 !== undefined) {
          hCells.push({ r: readR2 + 1, c: readC2 + 1, color: 'rgba(34, 211, 238, 0.4)' }); // read 2
      }

      return {
        matrix,
        cellLogic: { ...cellLogic },
        highlightCells: hCells
      };
    };

    steps.push({
      description: `初始化背包容量 W = ${W}，${n} 个物品。第一行和第一列默认 0。`,
      activeLines: [10],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= W; w++) {
        operations++;
        const currWt = wt[i - 1];
        const currVal = val[i - 1];
        
        steps.push({
          description: `考虑前 ${i} 个物品，当前背包容量 ${w}。第 ${i} 个物品重 ${currWt}，价值 ${currVal}。`,
          activeLines: [14],
          elements: [],
          dpState: getDPState(i, w), 
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations * 2, operations }
        });
        
        if (currWt <= w) {
          const valWithout = dp[i - 1][w];
          const valWith = dp[i - 1][w - currWt] + currVal;
          const logicDesc = `可装下！比较不装(最优值 ${valWithout}) 与 装入(前置最优 ${dp[i-1][w-currWt]} + 价值 ${currVal} = ${valWith})。取较大值。`;
          cellLogic[`${i+1}-${w+1}`] = logicDesc;
          
          steps.push({
             description: logicDesc,
             activeLines: [16],
             elements: [],
             dpState: getDPState(i, w, i-1, w, i-1, w - currWt),
             metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations * 3, operations }
          });
          dp[i][w] = Math.max(valWithout, valWith);
        } else {
          const logicDesc = `容量不够 (${currWt} > ${w})，无法装入，继承前 ${i-1} 物品在该容量的最优解 ${dp[i-1][w]}。`;
          cellLogic[`${i+1}-${w+1}`] = logicDesc;
          steps.push({
             description: logicDesc,
             activeLines: [19],
             elements: [],
             dpState: getDPState(i, w, i-1, w),
             metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations * 2 + 1, operations }
          });
          dp[i][w] = dp[i - 1][w];
        }
        
        steps.push({
            description: `更新 dp[${i}][${w}] = ${dp[i][w]}`,
            activeLines: [16, 19],
            elements: [],
            dpState: getDPState(i, w),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations * 3 + 1, operations }
        });
      }
    }

    steps.push({
      description: `完毕！背包最大可装价值为 ${dp[n][W]}。`,
      activeLines: [24],
      elements: [],
      dpState: getDPState(n, W),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations * 3 + 2, operations }
    });

    return steps;
  }
};
