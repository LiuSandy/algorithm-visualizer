import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const quickSort: AlgorithmDefinition = {
  id: 'quick-sort',
  name: '快速排序 (Quick Sort)',
  category: 'Sorting',
  description: '快速排序使用分治法策略来把一个串行分为两个子串行。本质上，快速排序是在冒泡排序基础上的递归分治法。',
  theory: {
    complexity: `平均深度 O(log N)，每一层横向推进 O(N)，带来极佳的综合 O(N log N) 时间。如果不采用随机选点，遭遇纯逆序或纯顺序数组时会惨烈退化为单链导致 O(N^2)。递归压栈带来的空间为 O(log N)。`,
    prosCons: `✅ 优点：真正的王者，原址排序（In-place），执行常数极小，常态极其迅猛。
❌ 缺点：属于不稳定排序算法，易遭遇 Pivot 退化惩罚。`,
    interview: `高频手撕重灾区：【双指针分区函数划分】（Partition）。如果遇到全是重复元素的数组快排怎么优化？（答：三路快排，拆分出<, ==, >三个区间跳过重复）。`,
      core: "通过选定特化的枢轴（Pivot）元素在数组原地运用双指针向内压缩交换，一轮便确保特定基准元素其左比其小、右比其大的极速分治法。",
      analogy: "教官挑出一个同学当基准标尺，喊：“比这位同学低的站他左边，比他高的站他右边！”这帮人分两波之后再互相找个人当标尺如法炮制，到最后全体必然整整齐齐。",
      scenarios: "适用场景：内存中大部分无序数组极致提效基准排序",
      practical: "是绝大部分主流现代开发语言运行时在内存排序的标准标配实现（如 V8 JavaScript 引擎 Array.prototype.sort 的混合实现底座等），能充分利用底层CPU指令缓存（Cache Line）。"
},
  coreSteps: [
    '从数列中挑出一个元素，称为 "基准" (pivot)。',
    '重新排序数列，所有元素比基准值小的摆放在基准前面，所有元素比基准值大的摆在基准的后面。',
    '在这个分区退出之后，该基准就处于数列的中间位置。',
    '递归地把小于基准值元素的子数列和大于基准值元素的子数列排序。'
  ],
  code: {
    "JavaScript": "/**\n * 快速排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nfunction quickSort(arr, left = 0, right = arr.length - 1) {\n  if (left < right) {\n    let partitionIndex = partition(arr, left, right);\n    quickSort(arr, left, partitionIndex - 1);\n    quickSort(arr, partitionIndex + 1, right);\n  }\n  return arr;\n}\nfunction partition(arr, left, right) {\n  let pivot = left;\n  let index = pivot + 1;\n  for (let i = index; i <= right; i++) {\n    if (arr[i] < arr[pivot]) {\n      swap(arr, i, index);\n      index++;\n    }\n  }\n  swap(arr, pivot, index - 1);\n  return index - 1;\n}\n\n// 测试示例:\n// const arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// const sortedArr = quickSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Python": "/**\n * 快速排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\ndef quickSort(arr, left = 0, right = arr.__len__() - 1):\n  if (left < right) \n    partitionIndex = partition(arr, left, right)\n    quickSort(arr, left, partitionIndex - 1)\n    quickSort(arr, partitionIndex + 1, right)\n  \n  return arr\n\ndef partition(arr, left, right):\n  pivot = left\n  index = pivot + 1\n  for (i = index i <= right i++) \n    if (arr[i] < arr[pivot]) \n      swap(arr, i, index)\n      index++\n    \n  \n  swap(arr, pivot, index - 1)\n  return index - 1\n\n\n# 测试示例:\n# arr = [5, 3, 8, 4, 1]\n# console.log(\"排序前:\", arr)\n# sortedArr = quickSort(arr)\n# console.log(\"排序后:\", sortedArr)",
    "C++": "/**\n * 快速排序算法\n * \n * 说明：以下是该算法的核心实现代码。\n * \n * 输入: [5, 3, 8, 4, 1]\n * 输出: [1, 3, 4, 5, 8]\n */\nauto quickSort(arr, left = 0, right = arr.size() - 1) {\n  if (left < right) {\n    auto partitionIndex = partition(arr, left, right);\n    quickSort(arr, left, partitionIndex - 1);\n    quickSort(arr, partitionIndex + 1, right);\n  }\n  return arr;\n}\nauto partition(arr, left, right) {\n  auto pivot = left;\n  auto index = pivot + 1;\n  for (auto i = index; i <= right; i++) {\n    if (arr[i] < arr[pivot]) {\n      swap(arr, i, index);\n      index++;\n    }\n  }\n  swap(arr, pivot, index - 1);\n  return index - 1;\n}\n\n// 测试示例:\n// auto arr = [5, 3, 8, 4, 1];\n// console.log(\"排序前:\", arr);\n// auto sortedArr = quickSort(arr);\n// console.log(\"排序后:\", sortedArr);",
    "Java": "class Solution {\n    /**\n     * 快速排序算法\n     * \n     * 说明：以下是该算法的核心实现代码。\n     * \n     * 输入: [5, 3, 8, 4, 1]\n     * 输出: [1, 3, 4, 5, 8]\n     */\n    public static var quickSort(arr, left = 0, right = arr.length - 1) {\n      if (left < right) {\n        var partitionIndex = partition(arr, left, right);\n        quickSort(arr, left, partitionIndex - 1);\n        quickSort(arr, partitionIndex + 1, right);\n      }\n      return arr;\n    }\n    public static var partition(arr, left, right) {\n      var pivot = left;\n      var index = pivot + 1;\n      for (var i = index; i <= right; i++) {\n        if (arr[i] < arr[pivot]) {\n          swap(arr, i, index);\n          index++;\n        }\n      }\n      swap(arr, pivot, index - 1);\n      return index - 1;\n    }\n    \n    // 测试示例:\n    // var arr = [5, 3, 8, 4, 1];\n    // console.log(\"排序前:\", arr);\n    // var sortedArr = quickSort(arr);\n    // console.log(\"排序后:\", sortedArr);\n}"
},
  timeComplexity: {
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)'
  },
  spaceComplexity: 'O(log n)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    const sortedIndices = new Set<number>();
    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    const getBaseState = (): VisualElement[] => {
      return arr.map((el, i) => ({
        ...el,
        state: sortedIndices.has(i) ? 'sorted' : 'default'
      }));
    };

    metrics.operations++;
    steps.push({
      description: '初始状态',
      activeLines: [9],
      metrics: { ...metrics },
      elements: getBaseState()
    });

    const swap = (i: number, j: number, preDesc: string, postDesc: string, pivotIdx?: number, lines: number[] = []) => {
      metrics.swaps++;
      metrics.arrayAccesses += 4;
      metrics.operations += 3;
      
      const state = getBaseState();
      state[i].state = 'swapping';
      state[j].state = 'swapping';
      if (pivotIdx !== undefined) state[pivotIdx].state = 'pivot';
      steps.push({ description: preDesc, activeLines: lines, metrics: { ...metrics }, elements: [...state] });
      
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      
      const afterState = getBaseState();
      afterState[i].state = 'swapping';
      afterState[j].state = 'swapping';
      if (pivotIdx !== undefined) afterState[pivotIdx].state = 'pivot';
      steps.push({ description: postDesc, activeLines: lines, metrics: { ...metrics }, elements: [...afterState] });
    };

    const partition = (left: number, right: number): number => {
      metrics.operations += 2;
      let pivot = left;
      let index = pivot + 1;
      
      const showState = (desc: string, currentI?: number, lines: number[] = []) => {
        const state = getBaseState();
        state[pivot].state = 'pivot';
        for (let k = left; k <= right; k++) {
          if (k !== pivot) state[k].state = 'partition';
        }
        if (currentI !== undefined) state[currentI].state = 'comparing';
        steps.push({ description: desc, activeLines: lines, variables: { left, right, pivot, index, i: currentI !== undefined ? currentI : 'N/A' }, metrics: { ...metrics }, elements: state });
      };

      showState(`针对闭区间 [${left}, ${right}]，选取当前分区的第一个元素 ${arr[pivot].value} 作为基准值 (Pivot)，我们将以此为参考划分左右两侧。`, undefined, [17, 18, 19]);

      for (let i = index; i <= right; i++) {
        metrics.operations++;
        metrics.comparisons++;
        metrics.arrayAccesses += 2;
        showState(`正在对比当前元素 ${arr[i].value} 与基准值 ${arr[pivot].value}。`, i, [20, 21]);
        if (arr[i].value < arr[pivot].value) {
          if (i !== index) {
             swap(
               i, index, 
               `因为元素 ${arr[i].value} 小于基准值 ${arr[pivot].value}，它应该位于左侧聚类集合。\n我们需要将其与“大于或等于基准值区域”的排头元素（索引 ${index} 上的 ${arr[index].value}）进行位置互换。`, 
               `交换完毕。元素 ${arr[i].value} 成功进入左侧区间范围。`,
               pivot,
               [22, 23]
             );
          } else {
             metrics.operations++;
             showState(`发现元素 ${arr[i].value} 小于基准值 ${arr[pivot].value}，但因为处于指针重合处，所以它本身就在合理的左侧有效边界内，无需移动。`, i, [21]);
          }
          index++;
        } else {
           showState(`元素 ${arr[i].value} 大于或等于基准值 ${arr[pivot].value}，它自然属于右侧聚类集合，位置直接保持不变。`, i, [21]);
        }
      }
      
      if (pivot !== index - 1) {
        swap(
          pivot, index - 1, 
          `当前区间所有的元素已经对比分化完毕。\n现在需要将最初的基准值 ${arr[pivot].value} 移动到中间的分割线位置，也就是与左侧有效区间的最后一个元素 ${arr[index - 1].value} 互换。`,
          `基准值归位完成！基准元素 ${arr[index - 1].value} 已经稳稳坐在了序列正确中轴上（左侧绝对小于它，右侧绝不小于它）。`,
          undefined,
          [26, 27]
        );
      } else {
        showState(`当前区间的所有元素遍历分化结束。因为所有扫描过的部分都大于基准值，因此基准值 ${arr[pivot].value} 无需挪动，它已经在正确的分割点上了。`, undefined, [26, 27]);
      }
      return index - 1;
    };

    const qSort = (left: number, right: number) => {
      metrics.operations++;
      steps.push({ description: `进入区间 [${left}, ${right}]。`, activeLines: [9, 10], metrics: { ...metrics }, elements: getBaseState() });
      if (left < right) {
        steps.push({ description: `开始划分区间。`, activeLines: [11], metrics: { ...metrics }, elements: getBaseState() });
        const partitionIndex = partition(left, right);
        sortedIndices.add(partitionIndex);
        
        const state = getBaseState();
        steps.push({ description: `【状态更新】基准值 ${arr[partitionIndex].value} 成功定格，它的最终排序位置已经确定。接下来将递归对其左、右两个子序列继续上述逻辑。`, activeLines: [11], metrics: { ...metrics }, elements: state });
        
        steps.push({ description: `递归左子序列`, activeLines: [12], metrics: { ...metrics }, elements: getBaseState() });
        qSort(left, partitionIndex - 1);
        
        steps.push({ description: `递归右子序列`, activeLines: [13], metrics: { ...metrics }, elements: getBaseState() });
        qSort(partitionIndex + 1, right);
      }
    };

    qSort(0, arr.length - 1);
    
    metrics.operations++;
    steps.push({
      description: '排序完成✨',
      activeLines: [15, 16],
      metrics: { ...metrics },
      elements: arr.map(el => ({ ...el, state: 'sorted' }))
    });
    
    return steps;
  }
};
