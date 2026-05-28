import { AlgorithmDefinition, ArrayElement, DPState, SimulationStep } from '../types';

export const nQueens: AlgorithmDefinition = {
  id: 'backtracking-nqueens',
  name: 'N 皇后 (N-Queens)',
  category: 'Backtracking',
  description: 'N 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击（即任意两个皇后不能处于同一行、同一列或同一斜线上）。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "约束满足问题的经典回溯。在棋盘逐行放置皇后，并对列和对角线进行冲突检测（剪枝）。",
      analogy: "就像安排多个相互看不顺眼的主管由于业务需要必须在同一个大平层办公，你必须尝试不同的座位排布，一旦发现两个人互相能看到了就重新安排。",
      scenarios: "适用场景：棋盘游戏AI、冲突检测",
      practical: "应用于云原生时代的多区域容灾部署：确保没有任何两个关键副本部署在同一可用区（AZ）或共享同一故障域（对角线）。"
},
  coreSteps: [
    '从第一行开始，逐行放置皇后。',
    '在每一行中，逐列尝试放置皇后，检查该位置是否合法。',
    '如果不冲突，将皇后放置在当前位置，继续递归放置下一行。',
    '如果发现后续无法放置，则回溯（撤销当前放置），尝试下一个位置。'
  ],
  code: {
    "JavaScript": "/**\n * N 皇后问题\n * 输入: 4\n * 输出: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n */\nfunction solveNQueens(n) {\n  const result = [];\n  const board = Array(n).fill('.').map(() => Array(n).fill('.'));\n\n  function isValid(row, col) {\n    for (let i = 0; i < row; i++) if (board[i][col] === 'Q') return false;\n    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;\n    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) if (board[i][j] === 'Q') return false;\n    return true;\n  }\n\n  function backtrack(row) {\n    if (row === n) {\n      result.push(board.map(r => r.join('')));\n      return;\n    }\n    for (let col = 0; col < n; col++) {\n      if (isValid(row, col)) {\n        board[row][col] = 'Q';\n        backtrack(row + 1);\n        board[row][col] = '.'; // 回溯\n      }\n    }\n  }\n\n  backtrack(0);\n  return result;\n}",
    "Python": "/**\n * N 皇后问题\n * 输入: 4\n * 输出: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n */\ndef solveNQueens(n):\n  result = []\n  board = Array(n).fill('.').map(() => Array(n).fill('.'))\n\n  def isValid(row, col):\n    for (i = 0 i < row i++) if (board[i][col] == 'Q') return false\n    for (i = row - 1, j = col - 1 i >= 0 and j >= 0 i--, j--) if (board[i][j] == 'Q') return false\n    for (i = row - 1, j = col + 1 i >= 0 and j < n i--, j++) if (board[i][j] == 'Q') return false\n    return true\n  \n\n  def backtrack(row):\n    if (row == n) \n      result.append(board.map(r => r.join('')))\n      return\n    \n    for (col = 0 col < n col++) \n      if (isValid(row, col)) \n        board[row][col] = 'Q'\n        backtrack(row + 1)\n        board[row][col] = '.' # 回溯\n      \n    \n  \n\n  backtrack(0)\n  return result\n",
    "C++": "/**\n * N 皇后问题\n * 输入: 4\n * 输出: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n */\nauto solveNQueens(n) {\n  auto result = [];\n  auto board = Array(n).fill('.').map(() => Array(n).fill('.'));\n\n  auto isValid(row, col) {\n    for (auto i = 0; i < row; i++) if (board[i][col] === 'Q') return false;\n    for (auto i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;\n    for (auto i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) if (board[i][j] === 'Q') return false;\n    return true;\n  }\n\n  auto backtrack(row) {\n    if (row === n) {\n      result.push_back(board.map(r => r.join('')));\n      return;\n    }\n    for (auto col = 0; col < n; col++) {\n      if (isValid(row, col)) {\n        board[row][col] = 'Q';\n        backtrack(row + 1);\n        board[row][col] = '.'; // 回溯\n      }\n    }\n  }\n\n  backtrack(0);\n  return result;\n}",
    "Java": "class Solution {\n    /**\n     * N 皇后问题\n     * 输入: 4\n     * 输出: [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\"..Q.\",\"Q...\",\"...Q\",\".Q..\"]]\n     */\n    public static var solveNQueens(n) {\n      var result = [];\n      var board = Array(n).fill('.').map(() => Array(n).fill('.'));\n    \n      public static var isValid(row, col) {\n        for (var i = 0; i < row; i++) if (board[i][col] === 'Q') return false;\n        for (var i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;\n        for (var i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) if (board[i][j] === 'Q') return false;\n        return true;\n      }\n    \n      public static var backtrack(row) {\n        if (row === n) {\n          result.add(board.map(r => r.join('')));\n          return;\n        }\n        for (var col = 0; col < n; col++) {\n          if (isValid(row, col)) {\n            board[row][col] = 'Q';\n            backtrack(row + 1);\n            board[row][col] = '.'; // 回溯\n          }\n        }\n      }\n    \n      backtrack(0);\n      return result;\n    }\n}"
},
  timeComplexity: {
    best: 'O(N!)',
    average: 'O(N!)',
    worst: 'O(N!)'
  },
  spaceComplexity: 'O(N)',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const n = 4;
    const board: string[][] = Array(n).fill(null).map(() => Array(n).fill(''));

    const cloneMatrix = () => board.map(row => [...row]);
    
    // Maintain a simulated call stack
    const currentStack: string[] = ['solveNQueens(4)'];
    
    steps.push({
      description: `初始化 ${n}x${n} 棋盘，准备放置皇后`,
      elements: [],
      activeLines: [20, 21],
      variables: { n, result: [], board: 'Empty 4x4 matrix' },
      callStack: [...currentStack],
      dpState: {
        matrix: cloneMatrix(),
        highlightCells: []
      },
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    let operations = 0;
    let solutionsCount = 0;

    const isValid = (r: number, c: number) => {
        // check col
        for (let i = 0; i < r; i++) {
            if (board[i][c] === '♕') return false;
        }
        // check diag TL
        for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === '♕') return false;
        }
        // check diag TR
        for (let i = r - 1, j = c + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === '♕') return false;
        }
        return true;
    }

    const backtrack = (row: number) => {
        currentStack.push(`backtrack(row=${row})`);
        
        if (row === n) {
            solutionsCount++;
            steps.push({
                description: `成功找到第 ${solutionsCount} 个可行解！`,
                elements: [],
                activeLines: [31, 32, 33],
                variables: { row, n, isValid: 'N/A', solutionsCount },
                callStack: [...currentStack],
                dpState: {
                    matrix: cloneMatrix(),
                    highlightCells: [] // all queens placed successfully
                },
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            currentStack.pop();
            return;
        }

        for (let col = 0; col < n; col++) {
            operations++;
            steps.push({
                description: `尝试在第 ${row + 1} 行，第 ${col + 1} 列放置皇后`,
                elements: [],
                activeLines: [35, 36],
                variables: { row, col, n },
                callStack: [...currentStack],
                dpState: {
                    matrix: cloneMatrix(),
                    highlightCells: [{ r: row, c: col, color: '#3B82F6' }]
                },
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });

            if (isValid(row, col)) {
                board[row][col] = '♕';
                steps.push({
                    description: `位置合法，放置皇后。进入下一行探测。`,
                    elements: [],
                    activeLines: [37, 38],
                    variables: { row, col, n, status: 'Placing Queen' },
                    callStack: [...currentStack],
                    dpState: {
                        matrix: cloneMatrix(),
                        highlightCells: [{ r: row, c: col, color: '#10B981' }]
                    },
                    metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
                });
                
                backtrack(row + 1);
                
                board[row][col] = '';
                steps.push({
                    description: `回溯：撤销第 ${row + 1} 行，第 ${col + 1} 列的皇后，尝试下一个可能位置`,
                    elements: [],
                    activeLines: [39],
                    variables: { row, col, n, status: 'Backtracking' },
                    callStack: [...currentStack],
                    dpState: {
                        matrix: cloneMatrix(),
                        highlightCells: [{ r: row, c: col, color: '#EF4444' }]
                    },
                    metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
                });
            } else {
                steps.push({
                    description: `冲突！该位置被原有皇后攻击。跳过`,
                    elements: [],
                    activeLines: [27, 36],
                    variables: { row, col, n, status: 'Conflict Detected' },
                    callStack: [...currentStack],
                    dpState: {
                        matrix: cloneMatrix(),
                        highlightCells: [{ r: row, c: col, color: '#EF4444' }]
                    },
                    metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
                });
            }
        }
        currentStack.pop();
    };

    backtrack(0);

    steps.push({
        description: `搜索完成，共找到 ${solutionsCount} 种解法`,
        elements: [],
        activeLines: [45],
        variables: { solutionsCount, result: 'Array of solutions' },
        callStack: [...currentStack],
        dpState: {
            matrix: cloneMatrix(),
            highlightCells: []
        },
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
