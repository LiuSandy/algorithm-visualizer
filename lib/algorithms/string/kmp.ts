import { AlgorithmDefinition } from '../../types';

export const kmp: AlgorithmDefinition = {
  id: 'kmp',
  name: 'KMP算法',
  category: 'Practical' as const,
  description: 'KMP算法通过预处理模式串，在线性时间内完成字符串匹配。',
  theory: {
    introduction: 'KMP (Knuth-Morris-Pratt) 算法是一种高效的字符串匹配算法，通过构建部分匹配表 (LPS) 避免对已匹配的字符进行不必要的重复比较。',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(M)',
    applications: ['文本搜索', 'DNA序列匹配', '数据挖掘'],
      core: "在字符串朴素搜索中加入了被称为最为天才创想的（LPS 回退数组前缀/后缀表），使得遇到字符匹配失误时能够极大跳过重复检测部分而绝不回退原本主探索指针。",
      analogy: "你在对文件校对时，发现读到第10个字才看错，而如果前面的9个字里面本来就有固定的对称偏旁（LPS信息），你不需要从第一字全撤销，你只用眼光一扫从第三个偏旁处继续认就不会错。",
      scenarios: "适用场景：基因文本探测、词法过滤敏感词",
      practical: "分布式日志检索引擎（针对单个纯长时字符串的大规模挖掘清洗），和 WAF 防火墙硬件层面应用协议内容检测进行病毒木马文本攻击过滤规则的高效防漏手段。"
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
 * KMP算法
 */
function kmpSearch(text, pattern) {
  const n = text.length;
  const m = pattern.length;
  
  // Compute LPS array (Longest Proper Prefix which is also Suffix)
  const lps = new Array(m).fill(0);
  let len = 0;
  let i = 1;
  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) len = lps[len - 1];
      else { lps[i] = 0; i++; }
    }
  }
  
  // Search
  i = 0; // index for text
  let j = 0; // index for pattern
  const res = [];
  while (n - i >= m - j) {
    if (pattern[j] === text[i]) {
      j++; i++;
    }
    if (j === m) {
      res.push(i - j); // Found match
      j = lps[j - 1];
    } else if (i < n && pattern[j] !== text[i]) {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }
  return res;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const text = 'ABABDABACDABABCABAB';
    const pattern = 'ABABCABAB';
    const tEls = text.split('').map((c,i)=>({id:'haystack-'+i, value:0, display:c, state:'default'}));
    const pEls = pattern.split('').map((c,i)=>({id:'needle-'+i, value:0, display:c, state:'default'}));
    
    steps.push({ elements: [...tEls, ...pEls], description: '在目标串 T 里面搜索模式串 P。首先构建 Partial Match Table (LPS 数组)', activeLines: [10] });
    
    tEls[0].state = 'comparing'; tEls[1].state = 'comparing'; tEls[2].state = 'comparing'; tEls[3].state = 'comparing';
    pEls[0].state = 'comparing'; pEls[1].state = 'comparing'; pEls[2].state = 'comparing'; pEls[3].state = 'comparing';
    tEls[4].state = 'swapping'; pEls[4].state = 'swapping';
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls, ...pEls])), description: '匹配到第5个字符冲突 D vs C。', activeLines: [22] });
    
    tEls[4].state = 'comparing'; pEls[2].state = 'swapping'; 
    pEls[0].state = 'visited'; pEls[1].state = 'visited';
    pEls[3].state = 'default'; pEls[4].state = 'default';
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls, ...pEls])), description: '由于前面匹配了 "ABAB"，KMP 根据 LPS 直接将模式串右移，不必从头搜索。', activeLines: [26] });
    
    tEls.forEach(el => el.state = 'default');
    pEls.forEach(el => el.state = 'default');
    tEls.slice(10, 19).forEach(el => el.state = 'sorted');
    pEls.forEach(el => el.state = 'sorted');
    steps.push({ elements: JSON.parse(JSON.stringify([...tEls, ...pEls])), description: '跳跃搜索后找到完全匹配的发生位置。', activeLines: [30] });

    return steps;
  }
};
