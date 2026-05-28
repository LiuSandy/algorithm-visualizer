import { GraphNode, GraphEdge, ElementState } from '../types';

export function generateCircleGraph(numNodes: number, directed: boolean, density: number = 0.3, weighted: boolean = false) {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  const centerX = 50;
  const centerY = 50;
  const radiusX = 40;
  const radiusY = 35; // slightly squashed for 16:9 screens

  for (let i = 0; i < numNodes; i++) {
    const angle = (i * 2 * Math.PI) / numNodes - Math.PI / 2; // start from top
    nodes.push({
      id: i.toString(),
      value: i.toString(),
      x: centerX + radiusX * Math.cos(angle),
      y: centerY + radiusY * Math.sin(angle),
      state: 'default'
    });
  }

  // Generate a connected graph by first creating a spanning tree
  for (let i = 1; i < numNodes; i++) {
    edges.push({
      id: `${Math.floor(Math.random() * i)}-${i}`,
      source: Math.floor(Math.random() * i).toString(),
      target: i.toString(),
      weight: weighted ? Math.floor(Math.random() * 20) + 1 : undefined,
      state: 'default',
      isDirected: directed
    });
  }

  // Add random edges based on density
  const maxEdges = (numNodes * (numNodes - 1)) / (directed ? 1 : 2);
  const targetEdges = Math.max(numNodes - 1, Math.floor(maxEdges * density));
  
  let attempts = 0;
  while (edges.length < targetEdges && attempts < 100) {
    attempts++;
    const src = Math.floor(Math.random() * numNodes);
    const tgt = Math.floor(Math.random() * numNodes);
    
    if (src !== tgt) {
      const exists = edges.some(e => 
        (e.source === src.toString() && e.target === tgt.toString()) || 
        (!directed && e.source === tgt.toString() && e.target === src.toString())
      );
      if (!exists) {
        edges.push({
          id: `${src}-${tgt}`,
          source: src.toString(),
          target: tgt.toString(),
          weight: weighted ? Math.floor(Math.random() * 20) + 1 : undefined,
          state: 'default',
          isDirected: directed
        });
      }
    }
  }

  return { nodes, edges, isDirected: directed };
}
