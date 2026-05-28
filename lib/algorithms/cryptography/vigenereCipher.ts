import { AlgorithmDefinition } from '../../types';

export const vigenereCipher: AlgorithmDefinition = {
  id: 'vigenere-cipher',
  name: '维吉尼亚密码 (Vigenère cipher)',
  category: 'Practical' as const,
  description: '维吉尼亚密码是一种使用一系列凯撒密码的多表密码算法。',
  theory: {
    introduction: '维吉尼亚密码 (Vigenère Cipher) 是一种多表密码，通过使用一系列交错的凯撒密码代替来进行加密，基于一个关键字。',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    applications: ['历史密码学', '简单加密'],
      core: "多表密码，使用一系列交错的凯撒密码代替来进行加密，基于一个关键字来改变每个字符的平移量。",
      analogy: "像是一个密码本，每次加密一个字，不仅要平移，还要根据当前的密语来决定平移几位，大幅增加了破解难度。",
      scenarios: "适用场景：历史密码学教学",
      practical: "其变动密钥的思想启发了现代流密码系统的设计，在一些对安全性要求极低但需掩人耳目的边缘遗留系统中偶尔会见到伪随机序列变形的影子。"
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
 * 维吉尼亚密码 (Vigenère cipher)
 */
function vigenereCipher(text, key) {
  let result = '';
  let j = 0;
  key = key.toUpperCase();
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const shift = key.charCodeAt(j % key.length) - 65;
      result += String.fromCharCode(((code - 65 + shift) % 26) + 65);
      j++;
    } else if (code >= 97 && code <= 122) {
      const shift = key.charCodeAt(j % key.length) - 65;
      result += String.fromCharCode(((code - 97 + shift) % 26) + 97);
      j++;
    } else {
      result += char;
    }
  }
  return result;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const text = "MESSAGE";
    const key = "KEY";
    const chars = text.split('');
    let elements = chars.map((c, i) => ({ id: `c${i}`, value: c.charCodeAt(0), display: c, state: 'default' }));
    
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: `初始化维吉尼亚密码，密钥 (Key) = "${key}"`, activeLines: [1] });
    
    let j = 0;
    for (let i = 0; i < chars.length; i++) {
       elements[i].state = 'comparing';
       const shiftChar = key[j % key.length];
       const shift = shiftChar.charCodeAt(0) - 65;
       steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: `处理字符 '${chars[i]}', 当前密钥字符='${shiftChar}' (位移 ${shift})`, activeLines: [5] });
       
       const code = chars[i].charCodeAt(0);
       const newChar = String.fromCharCode(((code - 65 + shift) % 26) + 65);
       
       elements[i].display = newChar;
       elements[i].state = 'sorted';
       steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: `字符 '${chars[i]}' 经过位移 ${shift} 变为 '${newChar}'`, activeLines: [7] });
       j++;
    }
    steps.push({ elements: JSON.parse(JSON.stringify(elements)), description: '维吉尼亚密码加密完成', activeLines: [15] });
    return steps;
  }
};
