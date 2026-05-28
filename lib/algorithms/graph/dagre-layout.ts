import dagre from 'dagre';
import { GraphData } from '@/lib/algorithms/types';

/**
 * 概念验证: 使用 dagre 将一个通用的有向无环图转化为 x, y 坐标，
 * 以便交给现有的 DOM 或 Canvas 渲染。
 */
export function layoutGraphWithDagre(graphData: GraphData) {
    const g = new dagre.graphlib.Graph();
    
    // Set an object for the graph label
    g.setGraph({ rankdir: 'TB', marginx: 20, marginy: 20, nodesep: 40, ranksep: 60 });
    
    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function() { return {}; });

    // 添加节点
    const nodes = graphData.nodes || [];
    nodes.forEach(node => {
        g.setNode(node.id, { label: node.label, width: 40, height: 40 });
    });

    // 添加边
    const edges = graphData.edges || [];
    edges.forEach(edge => {
        g.setEdge(edge.source, edge.target);
    });

    // 计算布局
    dagre.layout(g);

    // 将坐标映射回来
    const layoutNodes = nodes.map(node => {
        const layoutNode = g.node(node.id);
        return {
            ...node,
            x: layoutNode.x,
            y: layoutNode.y
        };
    });

    // (可选) 还可以拿到绘制样条曲线的 edge points
    const layoutEdges = edges.map(edge => {
        const layoutEdge = g.edge(edge.source, edge.target);
        return {
            ...edge,
            points: layoutEdge.points
        };
    });

    return { nodes: layoutNodes, edges: layoutEdges };
}
