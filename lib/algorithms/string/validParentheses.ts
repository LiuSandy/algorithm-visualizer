import { AlgorithmDefinition, SimulationStep } from '../types';

export const validParentheses: AlgorithmDefinition = {
  id: 'validParentheses',
  name: '括号匹配 (Valid Parentheses)',
  category: 'String',
  description: '目标：判断字符串中的括号符号（圆括号、方括号、花括号）是否闭合匹配。\n原理：使用栈（Stack）应对后进先出（LIFO）的特性。',
  theory: {
    complexity: `通过引入独特的记忆、分治或指针扫描流实现了显著的维度重削弱优化。`,
    prosCons: `✅ 优点：提供精湛卓越的高性能解法思路。
❌ 缺点：逻辑多带有较强的思维跳跃或是重构记忆消耗负担。`,
    interview: `此类泛通用算法在各大高强度笔试中层出不穷，不仅考验逻辑手写，更是考验应对边界反常突破防御。通常会以一种故事形式来作包装伪装考察。`,
      core: "通过借助“栈（LIFO）”的核心特性保存所遇到的左半边嵌套括号，以匹配和弹出来消除合法的嵌套成对属性，遇到不一致立即阻断报错。",
      analogy: "就像俄罗斯套娃。打开外层的洋葱皮之前，中间如果夹杂了一个被封闭的不同洋葱心那肯定套路不兼容；必须先放进去的必须要留到最最后才能完成闭环出山。",
      scenarios: "适用场景：编译器词法词意合规检查、结构有效性判定",
      practical: "构建了现代开发工程中所有常见 IDE 编译器在云端及本地代码合法检测的基石解析理论支撑结构，也是分布式配置管理（XML/JSON树）在系统注入前的天然哨兵防线。"
},
  coreSteps: [
    '1. 遍历字符串中的每一个字符',
    '2. 如果是左括号（(, [, {），则令其入栈',
    '3. 如果是右括号，检查栈顶元素。若栈为空，或者栈顶元素不是对应的左括号，则不匹配',
    '4. 如果对应，则栈顶出栈',
    '5. 字符串遍历完，若栈为空，说明匹配正确，否则不匹配'
  ],
  code: {
    "JavaScript": "function isValid(s) {\n  let stack = [];\n  const map = { ')': '(', ']': '[', '}': '{' };\n  \n  for (let char of s) {\n    if (char === '(' || char === '[' || char === '{') {\n      stack.push(char);\n    } else {\n      if (stack.length === 0 || stack.pop() !== map[char]) {\n        return false;\n      }\n    }\n  }\n  return stack.length === 0;\n}",
    "Python": "def isValid(s):\n  stack = []\n  map =  ')': '(', ']': '[', '': '' \n  \n  for (char of s) \n    if (char == '(' or char == '[' or char == '') \n      stack.append(char)\n     else \n      if (stack.__len__() == 0 or stack.pop() != map[char]) \n        return false\n      \n    \n  \n  return stack.__len__() == 0\n",
    "C++": "auto isValid(s) {\n  auto stack = [];\n  auto map = { ')': '(', ']': '[', '}': '{' };\n  \n  for (auto char of s) {\n    if (char === '(' || char === '[' || char === '{') {\n      stack.push_back(char);\n    } else {\n      if (stack.size() === 0 || stack.pop() !== map[char]) {\n        return false;\n      }\n    }\n  }\n  return stack.size() === 0;\n}",
    "Java": "class Solution {\n    public static var isValid(s) {\n      var stack = [];\n      var map = { ')': '(', ']': '[', '}': '{' };\n      \n      for (var char of s) {\n        if (char === '(' || char === '[' || char === '{') {\n          stack.add(char);\n        } else {\n          if (stack.length === 0 || stack.pop() !== map[char]) {\n            return false;\n          }\n        }\n      }\n      return stack.length === 0;\n    }\n}"
},
  timeComplexity: {
    best: 'O(n)',
    average: 'O(n)',
    worst: 'O(n)'
  },
  spaceComplexity: 'O(n)',
  generateSteps: (initialArray, options) => {
    const steps: SimulationStep[] = [];
    const sourceString = options?.strInput || "({})[]";
    const s = sourceString.split('');
    const map: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
    
    // We can display the string elements and the stack elements
    // We'll put stack elements at the end, visually distinct or just relying on "display" text
    
    let stringElements = s.map((char, i) => ({
      id: `char-${i}`,
      value: i,
      display: char,
      state: 'default' as const
    }));
    
    let stackElements: any[] = [];
    let stack: string[] = [];

    const metrics = { comparisons: 0, swaps: 0, arrayAccesses: 0, operations: 0 };
    
    const serializeElements = (currIndex: number) => {
        const copy = stringElements.map((el, i) => ({
            ...el,
            state: i === currIndex ? ('highlight' as const) : i < currIndex ? ('visited' as const) : ('default' as const)
        }));
        
        stackElements = stack.map((char, i) => ({
             id: `stack-${i}`,
             value: 1000 + i,
             display: `栈[${i}]: ${char}`,
             state: 'partition' as const
        }));
        
        return [...copy, ...stackElements];
    };
    
    steps.push({
      elements: serializeElements(-1),
      description: `目标：判断字符串 "${sourceString}" 中的括号是否匹配。\n准备一个空栈（Stack）来存放左括号。`,
      activeLines: [2, 3],
      metrics: { ...metrics }
    });

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        metrics.comparisons++;
        metrics.operations++;
        
        steps.push({
            elements: serializeElements(i),
            description: `遍历到字符：'${char}'。`,
            activeLines: [5],
            metrics: { ...metrics }
        });
        
        if (char === '(' || char === '[' || char === '{') {
            stack.push(char);
            steps.push({
                elements: serializeElements(i),
                description: `'${char}' 是左括号，放入栈中。`,
                activeLines: [6, 7],
                metrics: { ...metrics }
            });
        } else {
            metrics.comparisons++;
            if (stack.length === 0) {
                steps.push({
                    elements: serializeElements(i),
                    description: `'${char}' 是右括号，但栈为空（没有对应的左括号）。匹配失败！`,
                    activeLines: [9, 10],
                    metrics: { ...metrics }
                });
                return steps;
            }
            
            const top = stack.pop()!;
            metrics.arrayAccesses++;
            
            steps.push({
                elements: serializeElements(i),
                description: `'${char}' 是右括号。弹出栈顶元素 '${top}'。`,
                activeLines: [9],
                metrics: { ...metrics }
            });
            
            metrics.comparisons++;
            if (top !== map[char]) {
                steps.push({
                    elements: serializeElements(i),
                    description: `栈顶元素 '${top}' 与当前的右括号 '${char}' 不匹配！匹配失败。`,
                    activeLines: [9, 10],
                    metrics: { ...metrics }
                });
                return steps;
            } else {
                steps.push({
                   elements: serializeElements(i),
                   description: `'${top}' 与 '${char}' 成功匹配并闭合！继续。`,
                   activeLines: [9, 12],
                   metrics: { ...metrics }
                });
            }
        }
    }
    
    metrics.comparisons++;
    if (stack.length === 0) {
        steps.push({
            elements: serializeElements(s.length),
            description: `遍历完毕。栈已清空，说明所有括号完美闭合，匹配成功！`,
            activeLines: [14],
            metrics: { ...metrics }
        });
    } else {
        steps.push({
            elements: serializeElements(s.length),
            description: `遍历完毕。但栈内还有剩余左括号未闭合，匹配失败。`,
            activeLines: [14],
            metrics: { ...metrics }
        });
    }

    return steps;
  }
};
