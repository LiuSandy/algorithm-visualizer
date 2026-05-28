import { AlgorithmDefinition, ArrayElement, VisualElement, SimulationStep, ElementState } from '../types';

export const bubbleSort: AlgorithmDefinition = {
  id: 'bubble-sort',
  name: '冒泡排序 (Bubble Sort)',
  category: 'Sorting',
  description: '冒泡排序是一种简单的排序算法。它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。这个算法的名字由来是因为越小的元素会经由交换慢慢"浮"到数列的顶端。',
  theory: {
    complexity: `嵌套的双层遍历导致其计算量呈现绝对的 O(N^2) 增长。任何细微的数据起伏都需要用 O(1) 的常数级别空间进行指针置换计算。`,
    prosCons: `✅ 优点：原生代码极其简单，属于稳定的排序架构。
❌ 缺点：性能极度低下，无法应对任何规模化的工业场景。`,
    interview: `【提前终止优化考点】可以追问：如果某次内圈循环完全没有发生任何互换，我们还需要继续排吗？（答：说明已经完全有序，新增一个 boolean swapped 标志位直接 break 跳出）。`,
      core: "暴力穷举比较相邻元素，逆序即交换。每一轮将未排序部分最大/最小值稳步由于气泡般浮现到一侧序列边界。",
      analogy: "类似于学校操场按身高排队，老师让每个人和右边的人比身高，如果是你比他高你就和他换位置。一直比下去，班里最高的那个人一定会像泡泡一样走到队伍最后面。",
      scenarios: "适用场景：学术教学演示、极度近乎有序的数据微调",
      practical: "由于在最坏情况下时间复杂度极高(O(N^2))，其几近绝迹于高并发分布式生产计算环境的核心逻辑中，仅在少数固化极小的硬件嵌入式板级通信状态同步排序中偶遇。"
},
  coreSteps: [
    '比较相邻的元素。如果第一个比第二个大，就交换它们两个。',
    '对每一对相邻元素作同样的工作，从开始第一对到结尾的最后一对。这步做完后，最后的元素会是最大的数。',
    '针对所有的元素重复以上的步骤，除了最后一个。',
    '持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。'
  ],
  code: {
    "JavaScript": `/**
 * 冒泡排序算法 (JavaScript)
 */
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j+1]) {       
        let temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
      }
    }
  }
  return arr;
}`,
    "Python": `def bubble_sort(arr):
    n = len(arr)
    # 遍历所有数组元素
    for i in range(n):
        # Last i elements are already in place
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                # 交换
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    "C++": `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Last i elements are already in place
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
    "Java": `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // 交换
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`
  },
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)'
  },
  spaceComplexity: 'O(1)',
  
  generateSteps: (initialArray: ArrayElement[]): SimulationStep[] => {
    const steps: SimulationStep[] = [];
    const arr = [...initialArray];
    
    let i = 0;
    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    // Helper to create a snapshot
    const createStep = (stateMap: Record<number, ElementState>, desc: string, activeLines: number[] = [], jValue?: number) => {
      steps.push({
        description: desc,
        activeLines,
        variables: { i, j: jValue !== undefined ? jValue : 'N/A', len: arr.length },
        metrics: { ...metrics },
        elements: arr.map((el, idx) => ({
          ...el,
          state: stateMap[idx] || (idx >= arr.length - i ? 'sorted' : 'default')
        }))
      });
    };

    // Initial state
    metrics.operations++;
    createStep({}, '初始状态', [9, 10]);

    for (i = 0; i < arr.length - 1; i++) {
        let hasM = false;
        metrics.operations++;
      for (let j = 0; j < arr.length - 1 - i; j++) {
        hasM = true;
        metrics.comparisons++;
        metrics.arrayAccesses += 2;
        metrics.operations++;
        createStep({ [j]: 'comparing', [j + 1]: 'comparing' }, `【逻辑比较】对比当前元素 ${arr[j].value} 与右侧相邻元素 ${arr[j+1].value}。`, [12, 13], j);
        
        if (arr[j].value > arr[j + 1].value) {
          metrics.swaps++;
          metrics.arrayAccesses += 4;
          metrics.operations += 3;
          createStep({ [j]: 'swapping', [j + 1]: 'swapping' }, `【逻辑判断】由于 ${arr[j].value} > ${arr[j+1].value}，不满足升序要求。\n【位置交换】触发交换操作，将较大值 ${arr[j].value} 向右侧推。`, [14, 15, 16], j);
          
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          createStep({ [j]: 'swapping', [j + 1]: 'swapping' }, `【状态更新】交换完成！较大的元素 ${arr[j].value} 已经移动到右侧。`, [17], j);
        } else {
          createStep({ [j]: 'comparing', [j + 1]: 'comparing' }, `【逻辑判断】由于 ${arr[j].value} <= ${arr[j+1].value}，已处于正确顺序。\n【跳过交换】未触发交换，跳过。`, [13], j);
        }
      }
    }
    
    // Final sorted state
    i = arr.length; // Ensure all are marked as sorted
    metrics.operations++;
    createStep({}, '排序完成✨', [20, 21]);
    
    return steps;
  }
};
