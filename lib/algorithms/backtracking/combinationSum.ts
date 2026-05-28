import { AlgorithmDefinition, SimulationStep, DPState } from '../types';

export const combinationSum: AlgorithmDefinition = {
  id: 'combination-sum',
  name: '组合总和 (Combination Sum)',
  category: 'Backtracking',
  description: '给定一个无重复元素的数组 candidates 和一个目标数 target，找出 candidates 中所有可以使数字和为 target 的组合。candidates 中的数字可以无限制重复被选取。',
  theory: {
    complexity: `最恐怖の噩梦。穷举这浩如烟海的组合树带来了高达 O(候选数^目标值) 指数级黑洞级时间维度。`,
    prosCons: `✅ 优点：不落下一个死角的保证获得所有的全量答案清单。
❌ 缺点：性能极可能遭遇无法逾越的算力天花板（如果没有精湛的剪枝提前劝退悬崖勒马的计算量的话）。`,
    interview: `回溯剪枝三部曲：结束条件、遍历做选择、撤销选择！常问刁钻考点：可以复用元素怎么传参？不能复用元素含有重复值怎么去重防同层爆破？（要先提前排序候选物再遇到并排相同邻居直接跳过）。`,
      core: "回溯搜索，遇到不满足条件的组合立刻剪枝（回头），以此穷尽所有可能的加和途径。",
      analogy: "就像在一个多岔路口找一条总长恰好为特定目标的路线，一旦发现当前路线已经超过了目标长度，就直接掉头尝试下一条，不浪费时间。",
      scenarios: "适用场景：组合优化、预算分配、资源调度",
      practical: "在分布式任务调度中用于穷举和评估容器集群上的资源打包方案，以获得最佳的资源利用率。"
},
  coreSteps: [
    '定义一个回溯函数进行搜索，维护当前收集的数字和其总和。',
    '枚举 candidates，如果将当前元素加入集合不超过 target，则加入并递归继续。',
    '为了防止重复顺序产生相同组合，向下递归时传入一个起始缩影 (start index) 避免向前搜索。',
    '当和恰巧等于 target，记录结果；当和超过 target 获取遍历完毕，回溯返回。'
  ],
  code: {
    "JavaScript": "/**\n * 组合总和\n */\nfunction combinationSum(candidates, target) {\n  const res = [];\n  const path = [];\n  \n  function backtrack(start, sum) {\n    if (sum === target) {\n      res.push([...path]);\n      return;\n    }\n    \n    for (let i = start; i < candidates.length; i++) {\n      if (sum + candidates[i] > target) {\n        continue;\n      }\n      \n      path.push(candidates[i]);\n      backtrack(i, sum + candidates[i]); // i 而不是 i+1，因为可以重复选取\n      path.pop(); // 回溯\n    }\n  }\n  \n  // 对于可能有负数或未排序的情况，通常会先排序，不过这里为了简化直接在内部剪枝\n  candidates.sort((a, b) => a - b);\n  backtrack(0, 0);\n  return res;\n}",
    "Python": "/**\n * 组合总和\n */\ndef combinationSum(candidates, target):\n  res = []\n  path = []\n  \n  def backtrack(start, sum):\n    if (sum == target) \n      res.append([...path])\n      return\n    \n    \n    for (i = start i < candidates.__len__() i++) \n      if (sum + candidates[i] > target) \n        continue\n      \n      \n      path.append(candidates[i])\n      backtrack(i, sum + candidates[i]) # i 而不是 i+1，因为可以重复选取\n      path.pop() # 回溯\n    \n  \n  \n  # 对于可能有负数或未排序的情况，通常会先排序，不过这里为了简化直接在内部剪枝\n  candidates.sort((a, b) => a - b)\n  backtrack(0, 0)\n  return res\n",
    "C++": "/**\n * 组合总和\n */\nauto combinationSum(candidates, target) {\n  auto res = [];\n  auto path = [];\n  \n  auto backtrack(start, sum) {\n    if (sum === target) {\n      res.push_back([...path]);\n      return;\n    }\n    \n    for (auto i = start; i < candidates.size(); i++) {\n      if (sum + candidates[i] > target) {\n        continue;\n      }\n      \n      path.push_back(candidates[i]);\n      backtrack(i, sum + candidates[i]); // i 而不是 i+1，因为可以重复选取\n      path.pop(); // 回溯\n    }\n  }\n  \n  // 对于可能有负数或未排序的情况，通常会先排序，不过这里为了简化直接在内部剪枝\n  candidates.sort((a, b) => a - b);\n  backtrack(0, 0);\n  return res;\n}",
    "Java": "class Solution {\n    /**\n     * 组合总和\n     */\n    public static var combinationSum(candidates, target) {\n      var res = [];\n      var path = [];\n      \n      public static var backtrack(start, sum) {\n        if (sum === target) {\n          res.add([...path]);\n          return;\n        }\n        \n        for (var i = start; i < candidates.length; i++) {\n          if (sum + candidates[i] > target) {\n            continue;\n          }\n          \n          path.add(candidates[i]);\n          backtrack(i, sum + candidates[i]); // i 而不是 i+1，因为可以重复选取\n          path.pop(); // 回溯\n        }\n      }\n      \n      // 对于可能有负数或未排序的情况，通常会先排序，不过这里为了简化直接在内部剪枝\n      candidates.sort((a, b) => a - b);\n      backtrack(0, 0);\n      return res;\n    }\n}"
},
  timeComplexity: {
    best: 'O(S)',
    average: 'O(N^(target/min(candidates)))',
    worst: 'O(N^(target/min(candidates))) - N为候选数个数'
  },
  spaceComplexity: 'O(target/min(candidates)) - 递归的最大深度',

  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let operations = 0;
    const candidates = [2, 3, 6, 7];
    const target = 7;

    const resultPaths: number[][] = [];
    const path: number[] = [];

    const getDPState = (currentSum: number, checkIdx?: number): DPState => {
      const matrix: (number | string | null)[][] = [
        ['目标', target, '', '当前和', currentSum],
        ['候选池', ...candidates],
        ['当前组合路径', ...path, ...new Array(4 - path.length).fill(null)]
      ];
      
      const hCells: { r: number, c: number, color: string }[] = [];
      
      if (checkIdx !== undefined) {
         hCells.push({ r: 1, c: checkIdx + 1, color: 'rgba(34, 211, 238, 0.6)' }); 
      }

      const dispCount = Math.min(resultPaths.length, 4);
      for(let i=0; i<dispCount; i++) {
        matrix.push([`结果集 ${i+1}`, ...resultPaths[i]]);
      }
      
      return {
        matrix,
        highlightCells: hCells
      };
    };

    steps.push({
      description: `准备从候选数组 [${candidates.join(', ')}] 中找出和为 ${target} 的组合。数字可重复选取。`,
      activeLines: [26, 27], // candidates.sort
      elements: [],
      dpState: getDPState(0),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const backtrack = (start: number, sum: number) => {
      operations++;
      steps.push({
        description: `进入回溯，当前 sum = ${sum}。`,
        activeLines: [9],
        elements: [],
        dpState: getDPState(sum),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });

      if (sum === target) {
        resultPaths.push([...path]);
        steps.push({
          description: `【生成结果】当前组合和等于 ${target}，找到一个有效组合！将其加入结果集。`,
          activeLines: [10, 11],
          elements: [],
          dpState: getDPState(sum),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        return;
      }

      for (let i = start; i < candidates.length; i++) {
        operations++;
        steps.push({
          description: `尝试选取候选数字 ${candidates[i]}。`,
          activeLines: [14],
          elements: [],
          dpState: getDPState(sum, i),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        
        if (sum + candidates[i] > target) {
            steps.push({
                description: `选取 ${candidates[i]} 后和为 ${sum + candidates[i]}，超过 target，跳过该分支。`,
                activeLines: [15, 16],
                elements: [],
                dpState: getDPState(sum, i),
                metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
            });
            continue; // since sorted, we could actually break, but stick to code logic
        }

        path.push(candidates[i]);
        steps.push({
          description: `【做选择】将 ${candidates[i]} 加入路径，当前 sum 将变为 ${sum + candidates[i]}。`,
          activeLines: [19],
          elements: [],
          dpState: getDPState(sum + candidates[i]),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });

        steps.push({
          description: `继续向下递归搜索（允许重复拿当前元素，所以起始索引仍为 ${i}）。`,
          activeLines: [20],
          elements: [],
          dpState: getDPState(sum + candidates[i]),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        backtrack(i, sum + candidates[i]);

        path.pop();
        steps.push({
          description: `【回溯】撤销选择 ${candidates[i]}，探索其它可能。`,
          activeLines: [21],
          elements: [],
          dpState: getDPState(sum),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
      }
    };

    backtrack(0, 0);

    steps.push({
      description: `搜索完成，共找到 ${resultPaths.length} 组。`,
      activeLines: [28],
      elements: [],
      dpState: getDPState(0),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
