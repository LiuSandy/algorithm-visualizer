import { AlgorithmDefinition } from '../../types';

export const linearRegression: AlgorithmDefinition = {
  id: 'linear-regression',
  name: '线性回归 (Linear Regression)',
  category: 'Practical' as const,
  description: '线性回归通过拟合最佳直线关系来进行数值预测。',
  theory: {
    introduction: '线性回归 (Linear Regression) 通过拟合因变量和一个或多个自变量之间的线性关系来进行预测。',
    timeComplexity: 'O(d^2 * N + d^3)',
    spaceComplexity: 'O(d^2)',
    applications: ['金融预测', '趋势分析', '风险评估'],
      core: "寻找自变量与因变量间呈现线性相关关系的最优超平面或拟合直线，通过最小二乘法降低真实值和预测值间的残差或平方误差。",
      analogy: "画散点图并在里面拉一条尽可能穿过每一对点的直线。这就是在历史的大数据经验里总结出的一套房价均价走势的经验公式。",
      scenarios: "适用场景：趋势拟合预测、风险评估回归",
      practical: "广泛部署在华尔街金融机构或电商大促的高频统计监控与数据挖掘预估模块中，用于预估在特定广告投放成本下的转化交易流水（GMV）。"
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
 * 线性回归 (Linear Regression)
 */
function linearRegression(points) {
  const n = points.length;
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  
  for (let i = 0; i < n; i++) {
    sumX += points[i].x;
    sumY += points[i].y;
    sumXY += points[i].x * points[i].y;
    sumX2 += points[i].x * points[i].x;
  }
  
  // Calculate slope (m) and intercept (b)
  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;
  
  return { slope: m, intercept: b };
}
`,
  generateSteps: (initialArray, options) => {
    const steps = [];
    const nodes = [
       { id: 'p1', value: 'p1', x: 10, y: 20, state: 'visited' },
       { id: 'p2', value: 'p2', x: 30, y: 40, state: 'visited' },
       { id: 'p3', value: 'p3', x: 70, y: 60, state: 'visited' },
       { id: 'p4', value: 'p4', x: 90, y: 80, state: 'visited' }
    ];
    let edges = [];
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges, isDirected: false }, description: '收集数据散点，我们要拟合一条直线 y = mx + b', activeLines: [3] });
    
    nodes.push({ id: 'l1', value: '', x: 10, y: 10, state: 'default' }, { id: 'l2', value: '', x: 90, y: 90, state: 'default' });
    edges.push({ source: 'l1', target: 'l2', state: 'highlight' });
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '通过最小二乘法计算 Sum(X), Sum(Y), Sum(X^2), Sum(XY)', activeLines: [7] });
    
    nodes[4].y = 20; nodes[5].y = 75;
    edges[0].state = 'path';
    steps.push({ elements: [], graphData: { nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), isDirected: false }, description: '计算出斜率 m = 0.72 和截距 b = 8.5，绘制回归曲线', activeLines: [15] });
    
    return steps;
  }
};
