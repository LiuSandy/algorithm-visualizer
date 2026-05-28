import { AlgorithmDefinition, SimulationStep, DPState } from '../types';

export const editDistance: AlgorithmDefinition = {
  id: 'edit-distance',
  name: '编辑距离 (Edit Distance)',
  category: 'DP',
  description: '给定两个单词 word1 和 word2，计算出将 word1 转换成 word2 所使用的最少操作数。可以进行插入、删除或替换操作。这是自然语言处理中经典的最小编辑距离算法。',
  theory: {
    complexity: `通过恐怖的 O(N) 一维或者 O(N*M) 二维制表，以 O(N^2) 内存兑现 O(N^2)极速运算，干爆传统的 O(2^N) 噩梦。`,
    prosCons: `✅ 优点：具有扭转乾坤般的指数降级力量。
❌ 缺点：极度烧脑！如果找不到那个递推数学状态转换公式（状态转移方程），就纯纯望洋兴叹。`,
    interview: `大厂面试压箱底的神级拦路虎。`,
      core: "使用二维矩阵比较两个字符串，每个网格记录到达该前缀子串所需的最小插入、删除、替换操作次数。",
      analogy: "就像老师批改你的作文错别字，用红笔划掉（删除）、补上字（插入）或者改掉错字（替换）。编辑距离就是红笔痕迹最少的改法。",
      scenarios: "适用场景：拼写纠错、DNA序列对比",
      practical: "在搜索引擎的“你是不是要找”拼写纠错系统、以及 Elasticsearch (Lucene) 的模糊匹配查询（Fuzzy Query）核心底层原理中被高频使用。"
},
  coreSteps: [
    '定义 dp[i][j] 表示 word1 的前 i 个字符转换成 word2 的前 j 个字符所需要的最少操作数。',
    '当新加入的字符匹配时，操作数不增加：dp[i][j] = dp[i-1][j-1]。',
    '否则，必须进行插入、删除或替换中的一种。dp[i][j] = 1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])。'
  ],
  code: {
    "JavaScript": "/**\n * 最少编辑距离\n */\nfunction minDistance(word1, word2) {\n  const m = word1.length;\n  const n = word2.length;\n  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  \n  // 边界状态初始化\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  \n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i - 1] === word2[j - 1]) {\n        // 字符相等，不额外增加操作\n        dp[i][j] = dp[i - 1][j - 1];\n      } else {\n        // 取插入、删除、替换操作中的最小者 + 1\n        dp[i][j] = 1 + Math.min(\n          dp[i][j - 1],    // 插入\n          dp[i - 1][j],    // 删除\n          dp[i - 1][j - 1] // 替换\n        );\n      }\n    }\n  }\n  \n  return dp[m][n];\n}",
    "Python": "/**\n * 最少编辑距离\n */\ndef minDistance(word1, word2):\n  m = word1.__len__()\n  n = word2.__len__()\n  dp = Array.from( length: m + 1 , () => Array(n + 1).fill(0))\n  \n  # 边界状态初始化\n  for (i = 0 i <= m i++) dp[i][0] = i\n  for (j = 0 j <= n j++) dp[0][j] = j\n  \n  for (i = 1 i <= m i++) \n    for (j = 1 j <= n j++) \n      if (word1[i - 1] == word2[j - 1]) \n        # 字符相等，不额外增加操作\n        dp[i][j] = dp[i - 1][j - 1]\n       else \n        # 取插入、删除、替换操作中的最小者 + 1\n        dp[i][j] = 1 + min(\n          dp[i][j - 1],    # 插入\n          dp[i - 1][j],    # 删除\n          dp[i - 1][j - 1] # 替换\n        )\n      \n    \n  \n  \n  return dp[m][n]\n",
    "C++": "/**\n * 最少编辑距离\n */\nauto minDistance(word1, word2) {\n  auto m = word1.size();\n  auto n = word2.size();\n  auto dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  \n  // 边界状态初始化\n  for (auto i = 0; i <= m; i++) dp[i][0] = i;\n  for (auto j = 0; j <= n; j++) dp[0][j] = j;\n  \n  for (auto i = 1; i <= m; i++) {\n    for (auto j = 1; j <= n; j++) {\n      if (word1[i - 1] === word2[j - 1]) {\n        // 字符相等，不额外增加操作\n        dp[i][j] = dp[i - 1][j - 1];\n      } else {\n        // 取插入、删除、替换操作中的最小者 + 1\n        dp[i][j] = 1 + std::min(\n          dp[i][j - 1],    // 插入\n          dp[i - 1][j],    // 删除\n          dp[i - 1][j - 1] // 替换\n        );\n      }\n    }\n  }\n  \n  return dp[m][n];\n}",
    "Java": "class Solution {\n    /**\n     * 最少编辑距离\n     */\n    public static var minDistance(word1, word2) {\n      var m = word1.length;\n      var n = word2.length;\n      var dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n      \n      // 边界状态初始化\n      for (var i = 0; i <= m; i++) dp[i][0] = i;\n      for (var j = 0; j <= n; j++) dp[0][j] = j;\n      \n      for (var i = 1; i <= m; i++) {\n        for (var j = 1; j <= n; j++) {\n          if (word1[i - 1] === word2[j - 1]) {\n            // 字符相等，不额外增加操作\n            dp[i][j] = dp[i - 1][j - 1];\n          } else {\n            // 取插入、删除、替换操作中的最小者 + 1\n            dp[i][j] = 1 + Math.min(\n              dp[i][j - 1],    // 插入\n              dp[i - 1][j],    // 删除\n              dp[i - 1][j - 1] // 替换\n            );\n          }\n        }\n      }\n      \n      return dp[m][n];\n    }\n}"
},
  timeComplexity: {
    best: 'O(m * n)',
    average: 'O(m * n)',
    worst: 'O(m * n)'
  },
  spaceComplexity: 'O(m * n) - 可优化至 O(min(m, n))',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let operations = 0;
    
    const word1 = "ros";
    const word2 = "horse";
    const m = word1.length;
    const n = word2.length;
    
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const cellLogic: Record<string, string> = {};
    
    const getDPState = (currI?: number, currJ?: number, reads: [number, number][] = []): DPState => {
      const matrix: (string | number | null)[][] = [];
      const hCells: { r: number, c: number, color: string }[] = [];
       
      const headerRow = ['w1\\w2', '""', ...word2.split('')];
      matrix.push(headerRow);
      
      const w1Labels = ['""', ...word1.split('')];
      for (let i = 0; i <= m; i++) {
        const row = [w1Labels[i]];
        for (let j = 0; j <= n; j++) {
           row.push(dp[i][j]);
        }
        matrix.push(row);
      }
      
      if (currI !== undefined && currJ !== undefined) {
         hCells.push({ r: currI + 1, c: currJ + 1, color: 'rgba(239, 68, 68, 0.6)' });
      }
      reads.forEach(([r, c]) => {
         hCells.push({ r: r + 1, c: c + 1, color: 'rgba(52, 211, 153, 0.4)' });
      });
      
      return {
        matrix,
        highlightCells: hCells,
        cellLogic: { ...cellLogic }
      };
    };

    // 初始化边界
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    steps.push({
      description: `初始化，word1="ros"(空字符串+ros)，word2="horse"(空+horse)。边界条件表示空字符串转换到任意长度字符串只能全部插入或删除。`,
      activeLines: [10, 11],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
         operations++;
         steps.push({
             description: `比较 word1[${i-1}]('${word1[i-1]}') 和 word2[${j-1}]('${word2[j-1]}')`,
             activeLines: [15],
             elements: [],
             dpState: getDPState(i, j),
             metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*2, operations }
         });
         
         if (word1[i - 1] === word2[j - 1]) {
             dp[i][j] = dp[i - 1][j - 1];
             const logicDesc = `字符相同！继承左上角的距离 dp[${i-1}][${j-1}] = ${dp[i-1][j-1]}。`;
             cellLogic[`${i+1}-${j+1}`] = logicDesc;
             steps.push({
                 description: logicDesc,
                 activeLines: [17],
                 elements: [],
                 dpState: getDPState(i, j, [[i-1, j-1]]),
                 metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*3, operations }
             });
         } else {
             const insertOp = dp[i][j - 1];
             const deleteOp = dp[i - 1][j];
             const replaceOp = dp[i - 1][j - 1];
             const minOp = Math.min(insertOp, deleteOp, replaceOp);
             dp[i][j] = 1 + minOp;
             
             const logicDesc = `字符不同。插入(左:${insertOp}), 删除(上:${deleteOp}), 替换(左上:${replaceOp})。\n取最小值 + 1 = 1 + ${minOp} = ${dp[i][j]}`;
             cellLogic[`${i+1}-${j+1}`] = logicDesc;
             steps.push({
                 description: logicDesc,
                 activeLines: [20, 21, 22, 23],
                 elements: [],
                 dpState: getDPState(i, j, [[i, j-1], [i-1, j], [i-1, j-1]]),
                 metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*3, operations }
             });
         }
      }
    }

    steps.push({
      description: `计算完成！将 '${word1}' 转换为 '${word2}' 的最少编辑距离为 ${dp[m][n]}`,
      activeLines: [29],
      elements: [],
      dpState: getDPState(m, n),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*3 + 1, operations }
    });

    return steps;
  }
};
