import { AlgorithmDefinition, SimulationStep, DPState } from '../types';

export const mazePath: AlgorithmDefinition = {
  id: 'maze-path',
  name: '迷宫路径 (Maze Path)',
  category: 'Backtracking',
  description: '给定一个网格迷宫（0表示可走，1表示墙壁），要求从左上角走到右下角。利用回溯算法，尝试向上下左右4个方向进行深度优先搜索，一旦到达终点即成功，否则回退到上一个分叉口。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "深度优先回溯。在网格中尝试一条路，若遇到死胡同则退回上一个岔路口继续尝试。",
      analogy: "类似于走实体迷宫：一只手一直摸着右边的墙走，走不通就退回来换条路，直到找到出口或者穷尽所有死胡同。",
      scenarios: "适用场景：路径规划、可行性验证",
      practical: "在微小规模的自动导航、以及分布式链路追踪（Trace）的失败调用链还原中用于回溯请求失败节点。"
},
  coreSteps: [
    '定义一个 dfs 函数，从起点 (x, y) 出发。',
    '若越界、遇到墙壁、或已访问过，直接返回 false。',
    '若当前(x, y)等于终点，则记录成功信号。',
    '如果在当前节点周围4个方向尝试 dfs 均失败，则将其恢复，返回 false。'
  ],
  code: {
    "JavaScript": "/**\n * 迷宫搜索 (DFS 回溯)\n * @param grid 二维数组 (0为路, 1为墙)\n * @return 是否存在连通路径\n */\nfunction solveMaze(grid) {\n  const rows = grid.length;\n  const cols = grid[0].length;\n  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));\n  const path = []; // 仅用于记录路径\n  \n  function dfs(r, c) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 1 || visited[r][c]) {\n      return false;\n    }\n    \n    path.push([r, c]);\n    visited[r][c] = true;\n    \n    // 抵达终点\n    if (r === rows - 1 && c === cols - 1) {\n      return true;\n    }\n    \n    // 按 下、右、上、左 尝试\n    if (dfs(r + 1, c) || dfs(r, c + 1) || dfs(r - 1, c) || dfs(r, c - 1)) {\n      return true;\n    }\n    \n    // 如果都不通，则回溯\n    path.pop();\n    return false;\n  }\n  \n  return dfs(0, 0);\n}",
    "Python": "/**\n * 迷宫搜索 (DFS 回溯)\n * @param grid 二维数组 (0为路, 1为墙)\n * @return 是否存在连通路径\n */\ndef solveMaze(grid):\n  rows = grid.__len__()\n  cols = grid[0].__len__()\n  visited = Array.from( length: rows , () => Array(cols).fill(false))\n  path = [] # 仅用于记录路径\n  \n  def dfs(r, c):\n    if (r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 1 or visited[r][c]) \n      return false\n    \n    \n    path.append([r, c])\n    visited[r][c] = true\n    \n    # 抵达终点\n    if (r == rows - 1 and c == cols - 1) \n      return true\n    \n    \n    # 按 下、右、上、左 尝试\n    if (dfs(r + 1, c) or dfs(r, c + 1) or dfs(r - 1, c) or dfs(r, c - 1)) \n      return true\n    \n    \n    # 如果都不通，则回溯\n    path.pop()\n    return false\n  \n  \n  return dfs(0, 0)\n",
    "C++": "/**\n * 迷宫搜索 (DFS 回溯)\n * @param grid 二维数组 (0为路, 1为墙)\n * @return 是否存在连通路径\n */\nauto solveMaze(grid) {\n  auto rows = grid.size();\n  auto cols = grid[0].size();\n  auto visited = Array.from({ length: rows }, () => Array(cols).fill(false));\n  auto path = []; // 仅用于记录路径\n  \n  auto dfs(r, c) {\n    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 1 || visited[r][c]) {\n      return false;\n    }\n    \n    path.push_back([r, c]);\n    visited[r][c] = true;\n    \n    // 抵达终点\n    if (r === rows - 1 && c === cols - 1) {\n      return true;\n    }\n    \n    // 按 下、右、上、左 尝试\n    if (dfs(r + 1, c) || dfs(r, c + 1) || dfs(r - 1, c) || dfs(r, c - 1)) {\n      return true;\n    }\n    \n    // 如果都不通，则回溯\n    path.pop();\n    return false;\n  }\n  \n  return dfs(0, 0);\n}",
    "Java": "class Solution {\n    /**\n     * 迷宫搜索 (DFS 回溯)\n     * @param grid 二维数组 (0为路, 1为墙)\n     * @return 是否存在连通路径\n     */\n    public static var solveMaze(grid) {\n      var rows = grid.length;\n      var cols = grid[0].length;\n      var visited = Array.from({ length: rows }, () => Array(cols).fill(false));\n      var path = []; // 仅用于记录路径\n      \n      public static var dfs(r, c) {\n        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 1 || visited[r][c]) {\n          return false;\n        }\n        \n        path.add([r, c]);\n        visited[r][c] = true;\n        \n        // 抵达终点\n        if (r === rows - 1 && c === cols - 1) {\n          return true;\n        }\n        \n        // 按 下、右、上、左 尝试\n        if (dfs(r + 1, c) || dfs(r, c + 1) || dfs(r - 1, c) || dfs(r, c - 1)) {\n          return true;\n        }\n        \n        // 如果都不通，则回溯\n        path.pop();\n        return false;\n      }\n      \n      return dfs(0, 0);\n    }\n}"
},
  timeComplexity: {
    best: 'O(V + E) - 当路是一条直线',
    average: 'O(4^N) - 在空旷场地最坏会成指数级',
    worst: 'O(3^N) - 但实际上因为有visited数组，最坏只会遍历每个格子 O(R*C)'
  },
  spaceComplexity: 'O(R*C) - visited和栈深度',

  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let operations = 0;
    
    // 0 = road, 1 = wall
    const grid = [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 1, 1, 0]
    ];
    
    const rows = 4;
    const cols = 4;
    
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const path: [number, number][] = [];
    
    const getDPState = (currR: number, currC: number, checkR?: number, checkC?: number): DPState => {
      // Create visual grid using DPState
      const matrix: (string | null)[][] = [];
      const hCells: { r: number, c: number, color: string }[] = [];
      
      for (let r = 0; r < rows; r++) {
         const row: string[] = [];
         for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                row.push('⬛'); // wall
            } else {
                row.push('⬜'); // road
            }
         }
         matrix.push(row);
      }
      
      // highlight path
      for (const [pr, pc] of path) {
         hCells.push({ r: pr, c: pc, color: 'rgba(34, 211, 238, 0.4)' }); // blueish path
         matrix[pr][pc] = '👣';
      }
      
      // highlight visited (dead ends)
      for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
             if (visited[r][c] && !path.some(p => p[0]===r && p[1]===c)) {
                 hCells.push({ r, c, color: 'rgba(156, 163, 175, 0.4)' }); // gray dead end
                 matrix[r][c] = 'X';
             }
          }
      }
      
      // current focus
      if (currR >= 0 && currC >= 0) {
         hCells.push({ r: currR, c: currC, color: 'rgba(52, 211, 153, 0.7)' }); // green current
         matrix[currR][currC] = '📍';
      }
      
      // checking cell
      if (checkR !== undefined && checkC !== undefined) {
         if (checkR >=0 && checkR < rows && checkC >= 0 && checkC < cols) {
             hCells.push({ r: checkR, c: checkC, color: 'rgba(239, 68, 68, 0.7)' }); // red looking
         }
      }

      return {
        matrix,
        highlightCells: hCells
      };
    };

    steps.push({
      description: `初始化 4x4 迷宫，尝试从左上角(0,0)走到右下角(3,3)`,
      activeLines: [34],
      elements: [],
      dpState: getDPState(-1, -1),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const dfs = (r: number, c: number): boolean => {
      operations++;
      steps.push({
        description: `正在探索坐标 (${r}, ${c})`,
        activeLines: [11],
        elements: [],
        dpState: getDPState(r, c),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });

      if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 1 || visited[r][c]) {
        steps.push({
            description: `坐标 (${r}, ${c}) 越界、撞墙或已访问，不可通行，返回 false。`,
            activeLines: [12, 13],
            elements: [],
            dpState: getDPState(-1, -1, r, c),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        return false;
      }
      
      path.push([r, c]);
      visited[r][c] = true;
      
      steps.push({
        description: `【入栈】坐标 (${r}, ${c}) 可通行，加入路径。并标记已访问。`,
        activeLines: [16, 17],
        elements: [],
        dpState: getDPState(r, c),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });

      if (r === rows - 1 && c === cols - 1) {
        steps.push({
            description: `🎉 已到达终点 (右下角)！返回 true`,
            activeLines: [20, 21],
            elements: [],
            dpState: getDPState(r, c),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        return true;
      }
      
      // 尝试四个方向: 下, 右, 上, 左
      const dirs = [
        {dr: 1, dc: 0, name: '下'},
        {dr: 0, dc: 1, name: '右'},
        {dr: -1, dc: 0, name: '上'},
        {dr: 0, dc: -1, name: '左'}
      ];

      steps.push({
        description: `开始从 (${r}, ${c}) 向四周(下,右,上,左)尝试...`,
        activeLines: [25],
        elements: [],
        dpState: getDPState(r, c),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });

      for (const {dr, dc, name} of dirs) {
          steps.push({
            description: `准备向【${name}】探索 (${r+dr}, ${c+dc})`,
            activeLines: [25],
            elements: [],
            dpState: getDPState(r, c, r+dr, c+dc),
            metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
          });
          if (dfs(r + dr, c + dc)) {
              return true;
          }
      }
      
      path.pop();
      steps.push({
        description: `【回溯】以 (${r}, ${c}) 为起点的四周皆不通，是一条死路。回退上一步。`,
        activeLines: [30, 31],
        elements: [],
        dpState: getDPState(-1, -1, r, c), // not the focus anymore
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });
      return false;
    };
    
    const found = dfs(0, 0);

    steps.push({
      description: `迷宫搜寻结束。是否找到路径: ${found}`,
      activeLines: [34],
      elements: [],
      dpState: getDPState(-1, -1),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
