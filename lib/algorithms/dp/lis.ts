import { AlgorithmDefinition, SimulationStep, DPState } from '../types';

export const lis: AlgorithmDefinition = {
  id: 'lis',
  name: '最长递增子序列 (LIS)',
  category: 'DP',
  description: '给定一个无序的整数数组，找到其中最长严格递增子序列的长度。状态转移：dp[i] = max(dp[i], dp[j] + 1) for j in [0, i) if nums[j] < nums[i]。',
  theory: {
    complexity: `通过恐怖的 O(N) 一维或者 O(N*M) 二维制表，以 O(N^2) 内存兑现 O(N^2)极速运算，干爆传统的 O(2^N) 噩梦。`,
    prosCons: `✅ 优点：具有扭转乾坤般的指数降级力量。
❌ 缺点：极度烧脑！如果找不到那个递推数学状态转换公式（状态转移方程），就纯纯望洋兴叹。`,
    interview: `大厂面试压箱底的神级拦路虎。`,
      core: "利用动态规划寻找数字序列中递增的最长子序列，或者使用贪心 + 二分查找将其优化为 O(N log N)。",
      analogy: "就像挑选合唱团队员：从左到右挑人，要求被挑出来的人必须一个比一个高，找出能排出的最长队伍。",
      scenarios: "适用场景：时间序列数据分析、单调性分析",
      practical: "在数据中心温控时间序列监控异常检测、以及流式计算（Flink/Spark Streaming）窗口事件的乱序评估中定位趋势增长链。"
},
  coreSteps: [
    '定义 dp[i] 为以 nums[i] 结尾的最长严格递增子序列的长度。',
    '初始化 dp 数组全为 1（每个字符自己可以是一个长度为1的序列）。',
    '两层循环遍历，固定右边 i，左边 j 扫描。',
    '若 nums[i] > nums[j]，说明 nums[i] 可以接在 nums[j] 后面，更新 dp[i] = max(dp[i], dp[j] + 1)。'
  ],
  code: {
    "JavaScript": "/**\n * 最长严格递增子序列\n */\nfunction lengthOfLIS(nums) {\n  if (nums.length === 0) return 0;\n  \n  const dp = new Array(nums.length).fill(1);\n  let maxLen = 1;\n\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[i] > nums[j]) {\n        dp[i] = Math.max(dp[i], dp[j] + 1);\n      }\n    }\n    maxLen = Math.max(maxLen, dp[i]);\n  }\n  \n  return maxLen;\n}",
    "Python": "/**\n * 最长严格递增子序列\n */\ndef lengthOfLIS(nums):\n  if (nums.__len__() == 0) return 0\n  \n  dp = Array(nums.__len__()).fill(1)\n  maxLen = 1\n\n  for (i = 1 i < nums.__len__() i++) \n    for (j = 0 j < i j++) \n      if (nums[i] > nums[j]) \n        dp[i] = max(dp[i], dp[j] + 1)\n      \n    \n    maxLen = max(maxLen, dp[i])\n  \n  \n  return maxLen\n",
    "C++": "/**\n * 最长严格递增子序列\n */\nauto lengthOfLIS(nums) {\n  if (nums.size() === 0) return 0;\n  \n  auto dp = new Array(nums.size()).fill(1);\n  auto maxLen = 1;\n\n  for (auto i = 1; i < nums.size(); i++) {\n    for (auto j = 0; j < i; j++) {\n      if (nums[i] > nums[j]) {\n        dp[i] = std::max(dp[i], dp[j] + 1);\n      }\n    }\n    maxLen = Math.max(maxLen, dp[i]);\n  }\n  \n  return maxLen;\n}",
    "Java": "class Solution {\n    /**\n     * 最长严格递增子序列\n     */\n    public static var lengthOfLIS(nums) {\n      if (nums.length === 0) return 0;\n      \n      var dp = new Array(nums.length).fill(1);\n      var maxLen = 1;\n    \n      for (var i = 1; i < nums.length; i++) {\n        for (var j = 0; j < i; j++) {\n          if (nums[i] > nums[j]) {\n            dp[i] = Math.max(dp[i], dp[j] + 1);\n          }\n        }\n        maxLen = Math.max(maxLen, dp[i]);\n      }\n      \n      return maxLen;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n^2)',
    average: 'O(n^2)',
    worst: 'O(n^2) - 可用贪心+二分优化至 O(n log n)'
  },
  spaceComplexity: 'O(n) - dp数组占用的空间',
  
  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let operations = 0;
    
    const nums = [10, 9, 2, 5, 3, 7, 101, 18];
    const n = nums.length;
    
    const dp = new Array(n).fill(1);
    let maxLen = 1;
    const cellLogic: Record<string, string> = {};
    for (let k = 0; k < n; k++) cellLogic[`2-${k+1}`] = `初始状态，最少为 1`;
    
    const getDPState = (currI?: number, currJ?: number): DPState => {
      const matrix: (string | number | null)[][] = [
        ['索引', ...Array.from({ length: n }, (_, i) => i)],
        ['数组 nums', ...nums],
        ['dp 数组', ...dp]
      ];
      
      const hCells: { r: number, c: number, color: string }[] = [];
      
      if (currI !== undefined) {
         hCells.push({ r: 1, c: currI + 1, color: 'rgba(239, 68, 68, 0.6)' }); // red nums[i]
         hCells.push({ r: 2, c: currI + 1, color: 'rgba(239, 68, 68, 0.6)' }); // red dp[i] target
      }
      if (currJ !== undefined) {
         hCells.push({ r: 1, c: currJ + 1, color: 'rgba(52, 211, 153, 0.6)' }); // green nums[j]
         hCells.push({ r: 2, c: currJ + 1, color: 'rgba(34, 211, 238, 0.4)' }); // cyan dp[j]
      }
      
      // Calculate dynamic logic string since LIS overrides previous logic in iterative updates
      if (currI !== undefined && currJ !== undefined && nums[currI] > nums[currJ]) {
          const logicDesc = `${nums[currI]} > ${nums[currJ]}，可以接在索引 ${currJ} 后面。\ndp[${currI}] = Math.max(${dp[currI]}, dp[${currJ}] + 1) = ${Math.max(dp[currI], dp[currJ] + 1)}`;
          cellLogic[`2-${currI+1}`] = logicDesc;
      }
      
      return {
        matrix,
        cellLogic: { ...cellLogic },
        highlightCells: hCells
      };
    };

    steps.push({
      description: `初始化 dp 数组全为 1，因为每个元素自身构成长度 1 的递增子序列。`,
      activeLines: [7, 8],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    for (let i = 1; i < n; i++) {
       steps.push({
          description: `考察以 nums[${i}]=${nums[i]} 结尾的最长递增子序列。将内层指针 j 从 0 向右侧移动。`,
          activeLines: [10],
          elements: [],
          dpState: getDPState(i),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*2, operations }
       });
       
       for (let j = 0; j < i; j++) {
           operations++;
           steps.push({
               description: `比较 nums[i](${nums[i]}) 与 nums[j](${nums[j]})`,
               activeLines: [12],
               elements: [],
               dpState: getDPState(i, j),
               metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*2, operations }
           });
           
           if (nums[i] > nums[j]) {
               const prevDP = dp[i];
               dp[i] = Math.max(dp[i], dp[j] + 1);
               steps.push({
                   description: `${nums[i]} > ${nums[j]}，可以接在其后，使得长度变为 ${dp[j]+1}。dp[${i}] = max(${prevDP}, ${dp[j]+1}) = ${dp[i]}`,
                   activeLines: [13],
                   elements: [],
                   dpState: getDPState(i, j),
                   metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*3, operations }
               });
           } else {
               steps.push({
                   description: `${nums[i]} <= ${nums[j]}，无法形成递增，跳过。`,
                   activeLines: [12],
                   elements: [],
                   dpState: getDPState(i, j),
                   metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*2, operations }
               });
           }
       }
       
       maxLen = Math.max(maxLen, dp[i]);
       steps.push({
           description: `更新目前全局最长递增子序列的长度: ${maxLen}`,
           activeLines: [16],
           elements: [],
           dpState: getDPState(i),
           metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*3, operations }
       });
    }

    steps.push({
      description: `完毕！最长递增子序列 (LIS) 长度为 ${maxLen}`,
      activeLines: [19],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: operations*3 + 1, operations }
    });

    return steps;
  }
};
