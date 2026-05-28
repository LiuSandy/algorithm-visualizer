import { AlgorithmDefinition, SimulationStep, DPState } from '../types';

export const permutations: AlgorithmDefinition = {
  id: 'permutations',
  name: '全排列 (Permutations)',
  category: 'Backtracking',
  description: '全排列问题要求找出给定集合的所有可能排列方式。常使用回溯法，通过交换元素或者维护一个 visited 数组，生成所有排列。当排列长度等于原数组长度时，加入结果集。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "通过交换元素或维护一个可用状态集，递归地生成一个集合的所有可能排列。",
      analogy: "像排队买票，5个人有多少种排队方式？第一个位置有5种选择，第二个位置有4种... 穷尽所有位置的组合。",
      scenarios: "适用场景：暴力破解、旅行商问题（TSP）枚举",
      practical: "在API网关和负载均衡器的自动化故障注入工程（Chaos Engineering）中，用于生成所有可能的服务器请求重试和服务降级排列组合。"
},
  coreSteps: [
    '定义一个回溯函数进行搜索。',
    '在每一步循环考察所有未选过的元素。',
    '做出选择，加入当前路径，继续递归向下搜索。',
    '撤销选择，将元素从当前路径移除，以便回溯探索其他可能。'
  ],
  code: {
    "JavaScript": "/**\n * 全排列\n * @param nums 不含重复数字的数组\n * @return 所有可能的全排列\n */\nfunction permute(nums) {\n  const res = [];\n  const path = [];\n  const used = new Array(nums.length).fill(false);\n\n  function backtrack() {\n    // 终止条件：路径长度等于数组长度\n    if (path.length === nums.length) {\n      res.push([...path]);\n      return;\n    }\n\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      \n      // 做选择\n      path.push(nums[i]);\n      used[i] = true;\n      \n      // 递归进入下一层\n      backtrack();\n      \n      // 撤销选择（回溯）\n      path.pop();\n      used[i] = false;\n    }\n  }\n\n  backtrack();\n  return res;\n}",
    "Python": "/**\n * 全排列\n * @param nums 不含重复数字的数组\n * @return 所有可能的全排列\n */\ndef permute(nums):\n  res = []\n  path = []\n  used = Array(nums.__len__()).fill(false)\n\n  def backtrack():\n    # 终止条件：路径长度等于数组长度\n    if (path.__len__() == nums.__len__()) \n      res.append([...path])\n      return\n    \n\n    for (i = 0 i < nums.__len__() i++) \n      if (used[i]) continue\n      \n      # 做选择\n      path.append(nums[i])\n      used[i] = true\n      \n      # 递归进入下一层\n      backtrack()\n      \n      # 撤销选择（回溯）\n      path.pop()\n      used[i] = false\n    \n  \n\n  backtrack()\n  return res\n",
    "C++": "/**\n * 全排列\n * @param nums 不含重复数字的数组\n * @return 所有可能的全排列\n */\nauto permute(nums) {\n  auto res = [];\n  auto path = [];\n  auto used = new Array(nums.size()).fill(false);\n\n  auto backtrack() {\n    // 终止条件：路径长度等于数组长度\n    if (path.size() === nums.size()) {\n      res.push_back([...path]);\n      return;\n    }\n\n    for (auto i = 0; i < nums.size(); i++) {\n      if (used[i]) continue;\n      \n      // 做选择\n      path.push_back(nums[i]);\n      used[i] = true;\n      \n      // 递归进入下一层\n      backtrack();\n      \n      // 撤销选择（回溯）\n      path.pop();\n      used[i] = false;\n    }\n  }\n\n  backtrack();\n  return res;\n}",
    "Java": "class Solution {\n    /**\n     * 全排列\n     * @param nums 不含重复数字的数组\n     * @return 所有可能的全排列\n     */\n    public static var permute(nums) {\n      var res = [];\n      var path = [];\n      var used = new Array(nums.length).fill(false);\n    \n      public static var backtrack() {\n        // 终止条件：路径长度等于数组长度\n        if (path.length === nums.length) {\n          res.add([...path]);\n          return;\n        }\n    \n        for (var i = 0; i < nums.length; i++) {\n          if (used[i]) continue;\n          \n          // 做选择\n          path.add(nums[i]);\n          used[i] = true;\n          \n          // 递归进入下一层\n          backtrack();\n          \n          // 撤销选择（回溯）\n          path.pop();\n          used[i] = false;\n        }\n      }\n    \n      backtrack();\n      return res;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n × n!)',
    average: 'O(n × n!)',
    worst: 'O(n × n!)'
  },
  spaceComplexity: 'O(n) - 递归深度及 used 数组和临时路径',

  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let operations = 0;
    const nums = [1, 2, 3]; 

    const resultPaths: number[][] = [];
    const path: number[] = [];
    const used: boolean[] = [false, false, false];

    const getDPState = (highlightIdx?: number): DPState => {
      // Create a matrix representation.
      // Top row: nums array, highlighted if used
      // Middle row: current path
      // Bottom row: collected result arrays layout
      const matrix: (number | string | null)[][] = [
        ['当前可用元素', ...nums],
        ['当前排列路径', ...path, ...new Array(3 - path.length).fill(null)]
      ];
      
      const hCells: { r: number, c: number, color: string }[] = [];
      
      // highlighting used elements
      for (let i = 0; i < used.length; i++) {
        if (used[i]) {
          hCells.push({ r: 0, c: i + 1, color: 'rgba(239, 68, 68, 0.4)' }); // Red-ish for used
        } else {
           if (highlightIdx === i) hCells.push({ r: 0, c: i + 1, color: 'rgba(34, 211, 238, 0.6)' });
        }
      }

      // Add a few result paths for visualization
      const dispCount = Math.min(resultPaths.length, 4);
      for(let i=0; i<dispCount; i++) {
        matrix.push([`结果集 ${i+1}`, ...resultPaths[i]]);
      }
      if (resultPaths.length > 4) {
          matrix.push(['...', '...', '...', '...']);
      }
      
      return {
        matrix,
        highlightCells: hCells
      };
    };

    steps.push({
      description: `准备对数组 [${nums.join(', ')}] 生成全排列。`,
      activeLines: [8, 9],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const backtrack = () => {
      operations++;
      steps.push({
        description: `进入回溯检查，当前路径长度为 ${path.length}，需满 ${nums.length} 才算一个完整排列。`,
        activeLines: [13],
        elements: [],
        dpState: getDPState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });

      if (path.length === nums.length) {
        resultPaths.push([...path]);
        steps.push({
          description: `【生成结果】当前路径长度等于原数组，说明找到了一个完整排列：[${path.join(', ')}]。将其加入结果集并返回上一层。`,
          activeLines: [14, 15],
          elements: [],
          dpState: getDPState(),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        return;
      }

      for (let i = 0; i < nums.length; i++) {
        operations++;
        steps.push({
          description: `检查元素 ${nums[i]} 是否在当前路径被使用。`,
          activeLines: [19],
          elements: [],
          dpState: getDPState(i),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        
        if (used[i]) {
            steps.push({
                description: `元素 ${nums[i]} 已被使用，跳过。`,
                activeLines: [20],
                elements: [],
                dpState: getDPState(i),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            continue;
        }

        path.push(nums[i]);
        used[i] = true;
        steps.push({
          description: `【做选择】元素 ${nums[i]} 未被使用，加入当前排列路径并标记为已使用。`,
          activeLines: [23, 24],
          elements: [],
          dpState: getDPState(),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        steps.push({
          description: `基于当前选择，递归进入下一层，继续寻找下一个元素。`,
          activeLines: [27],
          elements: [],
          dpState: getDPState(),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        backtrack();

        path.pop();
        used[i] = false;
        steps.push({
          description: `【回溯】撤销之前的选择，移除路径末尾的 ${nums[i]} 并恢复为未被使用状态，探索其他分支。`,
          activeLines: [30, 31],
          elements: [],
          dpState: getDPState(),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
      }
    };

    backtrack();

    steps.push({
      description: `全排列搜索完成，共找到 ${resultPaths.length} 个排列结果！`,
      activeLines: [36],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
