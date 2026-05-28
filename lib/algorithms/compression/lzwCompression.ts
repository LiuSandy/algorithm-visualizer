import { AlgorithmDefinition } from '../../types';

export const lzwCompression: AlgorithmDefinition = {
  id: 'lzw-compression',
  name: 'LZW 压缩',
  category: 'Practical' as const,
  description: 'LZW压缩是一种基于字典的无损数据压缩算法。',
  theory: {
    introduction: 'LZW 压缩通过建立字典，用简短的代码替换一串字符或模式，从而实现无损压缩。',
    timeComplexity: 'O(N)',
    spaceComplexity: '随字典大小增加而增加',
    applications: ['GIF图像', 'TIFF图像', 'PDF文档'],
      core: "基于字典的自适应无损压缩算法。它通过动态建立字符串模式与短代码的映射字典来替换重复出现的长模式。",
      analogy: "就像读书笔记里的缩写：遇到‘阿卜杜勒·拉赫曼’这个长名字，第一次写全名并在旁边标注（简称A），之后全部用A代替。",
      scenarios: "适用场景：图像压缩（GIF）、文档压缩（PDF）",
      practical: "在大数据计算引擎（如 Hadoop/Spark）中处理存在大量重复文本段落、IP地址和固定模式的长串日志时的底层列式存储压缩（如 Parquet 字典编码）。"
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
 * LZW 压缩
 */
function lzwCompress(uncompressed) {
  const dictionary = {};
  for (let i = 0; i < 256; i++) {
    dictionary[String.fromCharCode(i)] = i;
  }
  
  let w = '';
  const result = [];
  let dictSize = 256;
  
  for (let i = 0; i < uncompressed.length; i++) {
    const c = uncompressed[i];
    const wc = w + c;
    if (dictionary.hasOwnProperty(wc)) {
      w = wc;
    } else {
      result.push(dictionary[w]);
      dictionary[wc] = dictSize++;
      w = String(c);
    }
  }
  if (w !== '') {
    result.push(dictionary[w]);
  }
  return result;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const elements = [
      { id: '1', value: 0, display: 'A -> 65', state: 'default' },
      { id: '2', value: 0, display: 'B -> 66', state: 'default' },
      { id: '3', value: 0, display: 'AB -> 256', state: 'highlight' },
      { id: '4', value: 0, display: 'BA -> 257', state: 'highlight' },
      { id: '5', value: 0, display: 'ABA -> 258', state: 'comparing' }
    ];
    steps.push({ elements: JSON.parse(JSON.stringify(elements.slice(0, 2))), description: '初始化，将 ASCII 的 0-255 载入字典', activeLines: [2] });
    steps.push({ elements: JSON.parse(JSON.stringify(elements.slice(0, 4))), description: '处理输入 "ABA" 时发现新模式 "AB" 和 "BA"，动态扩展字典', activeLines: [12] });
    const finalElements = JSON.parse(JSON.stringify(elements));
    finalElements.forEach(e => e.state = 'sorted');
    steps.push({ elements: finalElements, description: '使用扩展词典的指针替换长字符串', activeLines: [20] });
    return steps;
  }
};
