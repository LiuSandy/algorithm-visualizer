import { AlgorithmDefinition } from '../../types';

export const rabinKarp: AlgorithmDefinition = {
  id: 'rabin-karp',
  name: 'Rabin-Karp 算法',
  category: 'Practical' as const,
  description: 'Rabin-Karp算法通过哈希值比较来进行字符串匹配，有效避免逐字符比较。',
  theory: {
    introduction: 'Rabin-Karp 算法使用滚动哈希来查找模式串，可以高效地在文本中查找一个或多个模式字符串的出现。',
    timeComplexity: '平均 O(N + M)，最坏 O(N * M)',
    spaceComplexity: 'O(1)',
    applications: ['抄袭检测', '多模式匹配', '字符串搜索'],
      core: "将连续待测的短文本字符序列组合转化为具有“滑动窗口增减计算”特质的散列（Hash）值，当比对哈希值命中相撞时再去老实检查子串准确度。",
      analogy: "你作为检察官核实一本护照真伪：不必傻乎乎从第一页逐一比对内容，所有文书特征都有个“防伪二维码（Hash）”。先扫一眼二维特征码是不是一样，如果连这不一样直接不查了，大大加快检测效率。",
      scenarios: "适用场景：文本批量防抄袭、网页内容重叠核实",
      practical: "应用在长文档以及云端论文系统的防抄袭检测机制，及分布式文本排查引擎（比如海量恶意相似骚扰短信模板清洗防重排）。多模式匹配时极其高效。"
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
 * Rabin-Karp 算法
 */
function rabinKarp(text, pattern) {
  const d = 256;
  const q = 101; // A prime number
  const M = pattern.length;
  const N = text.length;
  let i, j;
  let p = 0; // hash value for pattern
  let t = 0; // hash value for txt
  let h = 1;
  const res = [];

  for (i = 0; i < M - 1; i++) {
    h = (h * d) % q;
  }

  for (i = 0; i < M; i++) {
    p = (d * p + pattern.charCodeAt(i)) % q;
    t = (d * t + text.charCodeAt(i)) % q;
  }

  for (i = 0; i <= N - M; i++) {
    if (p === t) {
      for (j = 0; j < M; j++) {
        if (text[i + j] !== pattern[j]) break;
      }
      if (j === M) res.push(i);
    }
    
    if (i < N - M) {
      t = (d * (t - text.charCodeAt(i) * h) + text.charCodeAt(i + M)) % q;
      if (t < 0) t = (t + q);
    }
  }
  return res;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const text = 'CCACABBABC';
    const pattern = 'CAB';
    const tEls = text.split('').map((c,i)=>({id:'haystack-'+i, value:0, display:c, state:'default'}));
    const pEls = pattern.split('').map((c,i)=>({id:'needle-'+i, value:0, display:c, state:'default'}));
    
    steps.push({ elements: [...tEls, ...pEls], description: 'Rabin-Karp：先计算模式串 P 的 Hash 值', activeLines: [11] });
    
    pEls.forEach(el => { el.state = 'highlight'; el.display += '→Hash'; });
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls, ...pEls])), description: '模式串 Hash (假设) = 318', activeLines: [15] });
    
    pEls.forEach((el,i) => { el.state = 'default'; el.display = pattern[i]; });
    tEls[0].state = 'comparing'; tEls[1].state = 'comparing'; tEls[2].state = 'comparing';
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls, ...pEls])), description: '滑动窗口大小3，计算当前 T 窗口 Hash = 104 (!= 318)', activeLines: [20] });
    
    tEls[0].state = 'default'; tEls[3].state = 'comparing';
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls, ...pEls])), description: '向右滑动，运用滚动哈希 (O(1) 更新 Hash)', activeLines: [27] });
    
    tEls[1].state = 'sorted'; tEls[2].state = 'sorted'; tEls[3].state = 'sorted';
    pEls[0].state = 'sorted'; pEls[1].state = 'sorted'; pEls[2].state = 'sorted';
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls, ...pEls])), description: '遇到 Hash 相同时才逐字符比较确认，找到 "CAB"', activeLines: [21] });
    
    return steps;
  }
};
