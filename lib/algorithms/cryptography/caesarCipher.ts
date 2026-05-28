import { AlgorithmDefinition } from '../../types';

export const caesarCipher: AlgorithmDefinition = {
  id: 'caesar-cipher',
  name: '凯撒密码 (Caesar Cipher)',
  category: 'Practical' as const,
  description: '凯撒密码是一种简单的替换加密技术，通过位移字符实现。',
  theory: {
    introduction: '凯撒密码 (Caesar Cipher) 是一种最简单的替换加密技术。它通过将字母表中的每个字母移动固定数目的位置来进行加密。',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    applications: ['基础教学', '简单混淆'],
      core: "单表替换加密，通过将字母表按固定的位数平移来实现字符的混淆。",
      analogy: "像两个小学生约定每句话把字母往后延3个写（A变成D），只有知道秘密是“延3个”的人才能看懂。",
      scenarios: "适用场景：基础密码学启蒙、简单数据混淆",
      practical: "现实生产中已不作为安全加密手段，但其思想常被变种用于分布式系统的脱敏日志中对简单非敏感业务ID进行轻量级可逆混淆。"
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
 * 凯撒密码 (Caesar Cipher)
 */
function caesarCipher(text, shift) {
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(((code - 65 + shift) % 26) + 65);
    } else if (code >= 97 && code <= 122) {
      return String.fromCharCode(((code - 97 + shift) % 26) + 97);
    }
    return char;
  }).join('');
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const text = "ALGORITHM";
    const shift = 3;
    const chars = text.split('');
    let elements = chars.map((c, i) => ({ id: `c${i}`, value: c.charCodeAt(0), display: c, state: 'default' }));
    
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: '初始化凯撒密码，位移 (Shift) = 3', activeLines: [1] });
    
    for (let i = 0; i < chars.length; i++) {
       elements[i].state = 'comparing';
       steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: `处理字符 '${chars[i]}'`, activeLines: [2] });
       
       const code = chars[i].charCodeAt(0);
       const newChar = String.fromCharCode(((code - 65 + shift) % 26) + 65);
       
       elements[i].display = newChar;
       elements[i].state = 'sorted';
       steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: `字符 '${chars[i]}' 右移 3 位变为 '${newChar}'`, activeLines: [4] });
    }
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: '凯撒密码加密完成', activeLines: [10] });
    return steps;
  }
};
