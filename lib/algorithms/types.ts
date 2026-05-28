export type ElementState = 
  | 'default' 
  | 'comparing' 
  | 'swapping' 
  | 'sorted' 
  | 'pivot' 
  | 'partition'
  | 'temp'
  | 'visited'
  | 'highlight'
  | 'path';

export interface ArrayElement {
  id: string;
  value: number;
  display?: string;
}

export interface VisualElement extends ArrayElement {
  state: ElementState;
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
  value: string;
  state: ElementState;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight?: number;
  state: ElementState;
  isDirected?: boolean;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  isDirected?: boolean;
}

export interface DPState {
  matrix: (number | string | null)[][];
  highlightCells?: { r: number, c: number, color: string }[];
  rowLabels?: string[];
  colLabels?: string[];
  cellLogic?: Record<string, string>;
}

export interface SimulationStep {
  elements: VisualElement[];
  description: string;
  graphData?: GraphData;
  dpState?: DPState;
  activeLines?: number[];
  variables?: Record<string, any>;
  callStack?: string[];
  metrics?: {
    comparisons: number;
    swaps: number;
    arrayAccesses: number;
    operations: number;
  };
  pointers?: { [key: string]: number };
}

export interface AlgorithmOptions {
  target?: number;
  graphEdges?: string;
  stringA?: string;
  stringB?: string;
  strInput?: string;
  strMatch?: string;
  capacity?: number;
}

export interface AlgorithmDefinition {
  id: string;
  name: string;
  category: 'Sorting' | 'Searching' | 'Graph' | 'LinkedList' | 'Tree' | 'Backtracking' | 'DP' | 'SlidingWindow' | 'Math' | 'String' | 'Practical';
  generateSteps: (initialArray: ArrayElement[], options?: AlgorithmOptions) => SimulationStep[];
  description: string;
  theory?: {
    core?: string;         // 1. 核心思想
    analogy?: string;      // 2. 生活白话
    scenarios?: string;    // 4. 适用场景
    complexity?: string;   // 5. 复杂度剖析
    prosCons?: string;     // 6. 优缺点对比
    interview?: string;    // 7. 面试剖析
    practical?: string;    // 8. 实际工作应用
  };
  coreSteps: string[];
  code: string | Record<string, string>;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
}

