import { AlgorithmDefinition, SimulationStep, DPState } from '../types';

export const hanoi: AlgorithmDefinition = {
  id: 'hanoi',
  name: '汉诺塔 (Tower of Hanoi)',
  category: 'Backtracking',
  description: '汉诺塔问题是一个经典的递归问题。有三根杆子A，B，C。A杆上有N个(N>0)穿孔圆盘，盘的尺寸由下到上依次变小。要求按下列规则将所有圆盘移至C杆：每次只能移动一个圆盘；大盘不能叠在小盘上面。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "通过递归分解问题，将N层塔的移动分解为N-1层塔的移动，展示了分治思想和函数调用栈的状态推演。",
      analogy: "就像大象放进冰箱分三步：先把上面的N-1张盘子借助目标柱移到缓冲柱，把最底下的盘子移到目标柱，最后把缓冲柱上的盘子移到目标柱。",
      scenarios: "适用场景：递归教学、状态机状态转移推演",
      practical: "在微服务拆分和分布式数据迁移中，用于模拟具有依赖关系的数据存储分阶段平滑演进的过程。"
},
  coreSteps: [
    '将上面的 n-1 个盘子从源柱移动到辅助柱。',
    '将最底下的第 n 个盘子从源柱移动到目标柱。',
    '将 n-1 个盘子从辅助柱移动到目标柱。'
  ],
  code: {
    "JavaScript": "/**\n * 汉诺塔\n * @param n 盘子数量\n * @param src 源柱\n * @param aux 辅助柱\n * @param dst 目标柱\n */\nfunction hanoi(n, src, aux, dst) {\n  if (n === 1) {\n    move(src, dst);\n    return;\n  }\n  \n  hanoi(n - 1, src, dst, aux); // 第一步：把n-1个盘子移动到aux\n  move(src, dst);              // 第二步：把最底下的盘子移动到dst\n  hanoi(n - 1, aux, src, dst); // 第三步：把n-1个盘子从aux移动到dst\n}",
    "Python": "/**\n * 汉诺塔\n * @param n 盘子数量\n * @param src 源柱\n * @param aux 辅助柱\n * @param dst 目标柱\n */\ndef hanoi(n, src, aux, dst):\n  if (n == 1) \n    move(src, dst)\n    return\n  \n  \n  hanoi(n - 1, src, dst, aux) # 第一步：把n-1个盘子移动到aux\n  move(src, dst)              # 第二步：把最底下的盘子移动到dst\n  hanoi(n - 1, aux, src, dst) # 第三步：把n-1个盘子从aux移动到dst\n",
    "C++": "/**\n * 汉诺塔\n * @param n 盘子数量\n * @param src 源柱\n * @param aux 辅助柱\n * @param dst 目标柱\n */\nauto hanoi(n, src, aux, dst) {\n  if (n === 1) {\n    move(src, dst);\n    return;\n  }\n  \n  hanoi(n - 1, src, dst, aux); // 第一步：把n-1个盘子移动到aux\n  move(src, dst);              // 第二步：把最底下的盘子移动到dst\n  hanoi(n - 1, aux, src, dst); // 第三步：把n-1个盘子从aux移动到dst\n}",
    "Java": "class Solution {\n    /**\n     * 汉诺塔\n     * @param n 盘子数量\n     * @param src 源柱\n     * @param aux 辅助柱\n     * @param dst 目标柱\n     */\n    public static var hanoi(n, src, aux, dst) {\n      if (n === 1) {\n        move(src, dst);\n        return;\n      }\n      \n      hanoi(n - 1, src, dst, aux); // 第一步：把n-1个盘子移动到aux\n      move(src, dst);              // 第二步：把最底下的盘子移动到dst\n      hanoi(n - 1, aux, src, dst); // 第三步：把n-1个盘子从aux移动到dst\n    }\n}"
},
  timeComplexity: {
    best: 'O(2^n)',
    average: 'O(2^n)',
    worst: 'O(2^n)'
  },
  spaceComplexity: 'O(n) - 递归调用栈的深度',

  generateSteps: (): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    let operations = 0;
    const n = 3; 

    // state of rods
    const rods = {
      'A': [3, 2, 1], // top is end of array
      'B': [] as number[],
      'C': [] as number[]
    };

    const getDPState = (highlightAction?: { src: string, dst: string, val: number }): DPState => {
      const matrix: (number | string | null)[][] = [];
      const hCells: { r: number, c: number, color: string }[] = [];
      const colMap: Record<string, number> = { 'A': 0, 'B': 1, 'C': 2 };

      for (let r = 0; r < n; r++) {
        matrix.push([null, null, null]);
      }

      ['A', 'B', 'C'].forEach(col => {
        const arr = rods[col as keyof typeof rods];
        const c = colMap[col];
        for (let i = 0; i < arr.length; i++) {
          const r = (n - 1) - i; // bottom is at max index
          matrix[r][c] = arr[i];
          
          if (highlightAction && highlightAction.val === arr[i]) {
            hCells.push({ r, c, color: 'rgba(34, 211, 238, 0.6)' }); // Highlight moved piece
          }
        }
      });

      return {
        matrix,
        colLabels: ['柱子 A', '柱子 B', '柱子 C'],
        highlightCells: hCells
      };
    };

    steps.push({
      description: `初始状态，共 ${n} 个盘子在柱子 A 上，准备全部移动到柱子 C。盘子大小1代表最小，3代表最大。`,
      activeLines: [],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 }
    });

    const solve = (num: number, source: string, auxiliary: string, destination: string) => {
      if (num === 1) {
        operations++;
        steps.push({
          description: `【终止条件】准备将最后一个盘子直接从 ${source} 移动到 ${destination}`,
          activeLines: [10],
          elements: [],
          dpState: getDPState(),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        
        const val = rods[source as keyof typeof rods].pop()!;
        rods[destination as keyof typeof rods].push(val);
        
        steps.push({
          description: `【移动】将盘子 ${val} 从 ${source} 移到 ${destination}`,
          activeLines: [11],
          elements: [],
          dpState: getDPState({ src: source, dst: destination, val }),
          metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
        });
        return;
      }

      operations++;
      steps.push({
        description: `为了将底层的盘子移动到 ${destination}，先将上面的 ${num-1} 个盘子从 ${source} 移动到辅助柱 ${auxiliary}`,
        activeLines: [15],
        elements: [],
        dpState: getDPState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });
      solve(num - 1, source, destination, auxiliary);

      operations++;
      steps.push({
        description: `上方盘子已移开，准备把最底下的盘子从 ${source} 移动到 ${destination}`,
        activeLines: [16],
        elements: [],
        dpState: getDPState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });
      const val = rods[source as keyof typeof rods].pop()!;
      rods[destination as keyof typeof rods].push(val);
      steps.push({
        description: `【移动】将盘子 ${val} 从 ${source} 移到 ${destination}`,
        activeLines: [16],
        elements: [],
        dpState: getDPState({ src: source, dst: destination, val }),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });

      operations++;
      steps.push({
        description: `最底下的盘子已到达目标位置。接着把之前暂放在辅助柱 ${auxiliary} 的 ${num-1} 个盘子移动到目标柱 ${destination}`,
        activeLines: [17],
        elements: [],
        dpState: getDPState(),
        metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
      });
      solve(num - 1, auxiliary, source, destination);
    };

    solve(n, 'A', 'B', 'C');

    steps.push({
      description: `汉诺塔任务完成！全部 ${n} 个盘子成功从 A 柱移动到 C 柱。`,
      activeLines: [],
      elements: [],
      dpState: getDPState(),
      metrics: { comparisons: 0, swaps: 0, arrayAccesses: 0, operations }
    });

    return steps;
  }
};
