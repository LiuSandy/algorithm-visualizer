import { AlgorithmDefinition } from '../../types';

export const zAlgorithm: AlgorithmDefinition = {
  id: 'z-algorithm',
  name: 'Z-Algorithm',
  category: 'Practical' as const,
  description: 'Z算法在线性时间内查找模式在文本中的所有出现，基于Z数组。',
  theory: {
    introduction: 'Z 算法在线性时间内查找模式在文本中的所有出现。它通过计算 Z 数组 (最长公共前缀) 来避免重复比较。',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(N + M)',
    applications: ['全文检索', '模式匹配'],
      core: "通过同时并构出每个与主模式字首最长公共前缀的计算域边界块 Z 数组并加以极限复用，实现 O(N) 复杂度的超速全文匹配探测。",
      analogy: "像在一大篇文档中对所有带指定标题进行宏定义。由于定义块彼此有传承复写的共性片段特征，你可以像复印机一样发现前面有一段很长是一样的话就直接搬过来看，免除了逐字重读。",
      scenarios: "适用场景：超巨大字典匹配序列分析基元检测系统",
      practical: "大多落地应用于巨型的生信医疗研究平台执行超级大长尾核酸序列基因重组相似片段挖掘的大数据搜寻算法优化结构中。"
},
  coreSteps: ['初始化', '执行核心逻辑', '返回结果'],
  timeComplexity: {
    best: 'O(1)',
    average: 'O(N)',
    worst: 'O(N^2)'
  },
  spaceComplexity: 'O(N)',
  code: `
/**
 * Z-Algorithm
 */
function zAlgorithmSearch(text, pattern) {
  const concat = pattern + "$" + text;
  const l = concat.length;
  const Z = new Array(l).fill(0);
  
  let L = 0, R = 0;
  for (let i = 1; i < l; i++) {
    if (i > R) {
      L = R = i;
      while (R < l && concat[R - L] === concat[R]) R++;
      Z[i] = R - L;
      R--;
    } else {
      const k = i - L;
      if (Z[k] < R - i + 1) {
        Z[i] = Z[k];
      } else {
        L = i;
        while (R < l && concat[R - L] === concat[R]) R++;
        Z[i] = R - L;
        R--;
      }
    }
  }
  
  const res = [];
  for (let i = 0; i < l; i++) {
    if (Z[i] === pattern.length) {
      res.push(i - pattern.length - 1);
    }
  }
  return res;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const concat = 'AAB$AABAAB';
    const tEls = concat.split('').map((c,i)=>({id:'haystack-'+i, value:0, display:c, state:'default'}));
    
    steps.push({ elements: [...tEls], description: '拼接模式串和目标串: P + $ + T，形成合并字符串', activeLines: [2] });
    
    tEls[0].state = 'highlight'; tEls[1].state = 'highlight'; tEls[2].state = 'highlight';
    tEls[4].state = 'comparing'; tEls[5].state = 'comparing'; tEls[6].state = 'comparing';
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls])), description: '构建 Z array，Z[i] 代表以该位置开头的最长公共前缀长度。由于使用了 Z-box [L, R]，这一步快速向右延伸。', activeLines: [10] });
    
    tEls[4].state = 'sorted'; tEls[5].state = 'sorted'; tEls[6].state = 'sorted';
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls])), description: '当 Z[i] 等同于搜索词长度时，此处即为匹配点！', activeLines: [23] });
    
    return steps;
  }
};
