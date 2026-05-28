import { AlgorithmDefinition, ArrayElement, DPState, SimulationStep } from '../types';

export const lcs: AlgorithmDefinition = {
  id: 'dp-lcs',
  name: '最长公共子序列 (LCS)',
  category: 'DP',
  description: '最长公共子序列（LCS）问题是寻找两个序列中最长的公共子序列（可以不连续）。通过动态规划构造一个二维表，dp[i][j] 表示 text1[0..i-1] 和 text2[0..j-1] 的最长公共子序列长度。',
  theory: {
    complexity: `通过恐怖的 O(N) 一维或者 O(N*M) 二维制表，以 O(N^2) 内存兑现 O(N^2)极速运算，干爆传统的 O(2^N) 噩梦。`,
    prosCons: `✅ 优点：具有扭转乾坤般的指数降级力量。
❌ 缺点：极度烧脑！如果找不到那个递推数学状态转换公式（状态转移方程），就纯纯望洋兴叹。`,
    interview: `大厂面试压箱底的神级拦路虎。`,
      core: "二维动态规划求解最长公共子序列，建立一个状态矩阵比较两序列前缀，相等则对角线+1，否则取左和上的最大值。",
      analogy: "比较两个人的日记，虽然每天发生的事不一样，找到那些偶尔重合的部分，按时间顺序把它们挑出来，连成的最长故事轴就是LCS。",
      scenarios: "适用场景：Git Diff 代码比对、版本控制",
      practical: "全方位应用于分布式系统的研发协同工具链中（例如 Git Diff、Github PR 以及实时协作文档中的文本冲突差异对比算法底层）。"
},
  coreSteps: [
    '创建二维数组 dp，行数为字符串 A 长度 + 1，列数为字符串 B 长度 + 1。',
    '初始化第一行和第一列为 0。',
    '比较 A[i-1] 和 B[j-1]，如果相等：dp[i][j] = dp[i-1][j-1] + 1。',
    '如果不等：dp[i][j] = max(dp[i-1][j], dp[i][j-1])。'
  ],
  code: {
    "JavaScript": "/**\n * 最长公共子序列\n * 输入: text1 = \"abcde\", text2 = \"ace\" \n * 输出: 3 \n */\nfunction longestCommonSubsequence(text1, text2) {\n  const m = text1.length;\n  const n = text2.length;\n  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));\n\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1;\n      } else {\n        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n  return dp[m][n];\n}",
    "Python": "/**\n * 最长公共子序列\n * 输入: text1 = \"abcde\", text2 = \"ace\" \n * 输出: 3 \n */\ndef longestCommonSubsequence(text1, text2):\n  m = text1.__len__()\n  n = text2.__len__()\n  dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0))\n\n  for (i = 1 i <= m i++) \n    for (j = 1 j <= n j++) \n      if (text1[i - 1] == text2[j - 1]) \n        dp[i][j] = dp[i - 1][j - 1] + 1\n       else \n        dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n      \n    \n  \n  return dp[m][n]\n",
    "C++": "/**\n * 最长公共子序列\n * 输入: text1 = \"abcde\", text2 = \"ace\" \n * 输出: 3 \n */\nauto longestCommonSubsequence(text1, text2) {\n  auto m = text1.size();\n  auto n = text2.size();\n  auto dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));\n\n  for (auto i = 1; i <= m; i++) {\n    for (auto j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1;\n      } else {\n        dp[i][j] = std::max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n  return dp[m][n];\n}",
    "Java": "class Solution {\n    /**\n     * 最长公共子序列\n     * 输入: text1 = \"abcde\", text2 = \"ace\" \n     * 输出: 3 \n     */\n    public static var longestCommonSubsequence(text1, text2) {\n      var m = text1.length;\n      var n = text2.length;\n      var dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));\n    \n      for (var i = 1; i <= m; i++) {\n        for (var j = 1; j <= n; j++) {\n          if (text1[i - 1] === text2[j - 1]) {\n            dp[i][j] = dp[i - 1][j - 1] + 1;\n          } else {\n            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n          }\n        }\n      }\n      return dp[m][n];\n    }\n}"
},
  timeComplexity: {
    best: 'O(m*n)',
    average: 'O(m*n)',
    worst: 'O(m*n)'
  },
  spaceComplexity: 'O(m*n)',
  
  generateSteps: (initialArray: ArrayElement[], options): SimulationStep[] => {
    let strA = options?.stringA || "abcde";
    let strB = options?.stringB || "ace";

    // For random generation if not provided string options but array provided
    if (!options?.stringA) {
        strA = "ABCBDAB";
        strB = "BDCABA";
    }

    const steps: SimulationStep[] = [];
    const m = strA.length;
    const n = strB.length;
    const dp: (number | null)[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(null));
    const cellLogic: Record<string, string> = {};

    const cloneMatrix = () => dp.map(row => [...row]);

    const rowLabels = ['∅', ...strA.split('')];
    const colLabels = ['∅', ...strB.split('')];

    steps.push({
      description: '初始化 DP 矩阵',
      elements: [],
      dpState: {
        matrix: cloneMatrix(),
        rowLabels, colLabels,
        highlightCells: []
      },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    let comparisons = 0;
    let arrayAccesses = 0;
    let operations = 0;

    // init 0
    for (let i = 0; i <= m; i++) {
        dp[i][0] = 0;
        arrayAccesses++;
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = 0;
        arrayAccesses++;
    }

    steps.push({
        description: '初始化第一行和第一列为 0，因为空字符串与任何字符串的最长公共子序列长度为 0',
        elements: [],
        dpState: {
          matrix: cloneMatrix(),
          rowLabels, colLabels,
          highlightCells: []
        },
        metrics: { comparisons, swaps: 0, arrayAccesses, operations }
    });

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            comparisons++;
            if (strA[i-1] === strB[j-1]) {
                dp[i][j] = dp[i-1][j-1]! + 1;
                arrayAccesses += 2;
                operations++;
                const desc = `观察 ${strA[i-1]} 和 ${strB[j-1]}，两者相等。dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${dp[i][j]}`;
                cellLogic[`${i}-${j}`] = desc;
                steps.push({
                    description: desc,
                    elements: [],
                    dpState: {
                      matrix: cloneMatrix(),
                      rowLabels, colLabels,
                      cellLogic: { ...cellLogic },
                      highlightCells: [
                          {r: i, c: j, color: '#10B981'},
                          {r: i-1, c: j-1, color: '#FCD34D'}
                      ]
                    },
                    metrics: { comparisons, swaps: 0, arrayAccesses, operations }
                });
            } else {
                operations++;
                arrayAccesses += 3;
                dp[i][j] = Math.max(dp[i-1][j]!, dp[i][j-1]!);
                const desc = `观察 ${strA[i-1]} 和 ${strB[j-1]}，两者不相等。dp[${i}][${j}] 取左侧和上方元素的最大值: max(${dp[i][j-1]}, ${dp[i-1][j]}) = ${dp[i][j]}`;
                cellLogic[`${i}-${j}`] = desc;
                steps.push({
                    description: desc,
                    elements: [],
                    dpState: {
                      matrix: cloneMatrix(),
                      rowLabels, colLabels,
                      cellLogic: { ...cellLogic },
                      highlightCells: [
                          {r: i, c: j, color: '#3B82F6'},
                          {r: i-1, c: j, color: '#FCD34D'},
                          {r: i, c: j-1, color: '#FCD34D'}
                      ]
                    },
                    metrics: { comparisons, swaps: 0, arrayAccesses, operations }
                });
            }
        }
    }

    steps.push({
        description: `计算完成，最长公共子序列长度为 ${dp[m][n]}`,
        elements: [],
        dpState: {
            matrix: cloneMatrix(),
            rowLabels, colLabels,
            cellLogic: { ...cellLogic },
            highlightCells: [{r: m, c: n, color: '#EC4899'}]
        },
        metrics: { comparisons, swaps: 0, arrayAccesses, operations }
    });

    return steps;
  }
};
