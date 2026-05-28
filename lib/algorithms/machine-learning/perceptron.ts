import { AlgorithmDefinition } from '../../types';

export const perceptron: AlgorithmDefinition = {
  id: 'perceptron',
  name: '感知机 (Perceptron)',
  category: 'Practical' as const,
  description: '感知机是二分类的人工神经网络基础模型。',
  theory: {
    introduction: '感知机 (Perceptron) 是二分类的线性分类模型，也是神经网络的基础。它通过输入与权重的线性组合，并通过激活函数输出类别。',
    timeComplexity: 'O(N * d) 单次迭代',
    spaceComplexity: 'O(d)',
    applications: ['二分类问题', '神经网络基础'],
      core: "最基础的线性二分类神经网络模型，通过对输入的特征向量与其对应的权重进行点积加上偏置，经过激活函数映射来输出类别（通常为步阶激活）。",
      analogy: "就像买车时候你大脑里的计分板，外观5分、动力7分、价格3分，如果综合最后算出来的性价比权重超过你的心里防线数值，你就买单，否则不买。",
      scenarios: "适用场景：多层前馈神经网络（MLP）的基石、支持向量机引言",
      practical: "生产系统中极少直接部署单层感知机，但作为深度学习的根本单元，它演进而来的海量多层感知机构成了今天自动驾驶视觉判断和各种分布式深度图卷积挖掘服务的底座。"
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
 * 感知机 (Perceptron)
 */
function perceptron(inputs, weights, bias) {
  let sum = bias;
  for (let i = 0; i < inputs.length; i++) {
    sum += inputs[i] * weights[i];
  }
  // Step activation function
  return sum >= 0 ? 1 : 0;
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const nodes = [
       { id: 'i1', value: 'x1=1', x: 20, y: 30, state: 'default' },
       { id: 'i2', value: 'x2=0', x: 20, y: 70, state: 'default' },
       { id: 'n', value: 'Σ', x: 50, y: 50, state: 'comparing' },
       { id: 'o', value: 'Output', x: 80, y: 50, state: 'highlight' }
    ];
    let edges = [
      { source: 'i1', target: 'n', state: 'default', weight: 'w1=0.5' },
      { source: 'i2', target: 'n', state: 'default', weight: 'w2=-0.2' },
      { source: 'n', target: 'o', state: 'default' }
    ];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '初始化感知机神经元，权重 w1=0.5, w2=-0.2, bias=0.1', activeLines: [2] });
    
    edges[0].state = 'highlight'; edges[1].state = 'highlight';
    nodes[2].value = 'Σ=0.6'; nodes[2].state = 'swapping';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '输入加权求和: 1*0.5 + 0*-0.2 + 0.1 = 0.6', activeLines: [4] });
    
    edges[2].state = 'path';
    nodes[3].value = '1'; nodes[3].state = 'sorted';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: true }, description: '应用阶跃激活函数 (Step Activation): 0.6 >= 0，输出为 1', activeLines: [7] });
    return steps;
  }
};
