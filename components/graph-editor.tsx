import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface Point {
  x: number;
  y: number;
}

interface Node extends Point {
  id: string;
  name: string;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

export function GraphEditor({ onEdgesChange }: { onEdgesChange: (edgesStr: string) => void }) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [drawingEdgeFrom, setDrawingEdgeFrom] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  
  const svgRef = useRef<SVGSVGElement>(null);
  
  const getMouseCoords = (e: React.MouseEvent | MouseEvent): Point => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return {
      x: (e.clientX - CTM.e) / CTM.a,
      y: (e.clientY - CTM.f) / CTM.d
    };
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
     if (drawingEdgeFrom) return;
     const newId = `n${nodes.length + 1}`;
     const name = String.fromCharCode(64 + (nodes.length + 1)); // A, B, C...
     
     setNodes([...nodes, { ...getMouseCoords(e), id: newId, name }]);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, id: string) => {
     e.stopPropagation();
     if (e.shiftKey) {
        setDrawingEdgeFrom(id);
     } else {
        setDraggedNode(id);
     }
  };

  const handleNodeMouseUp = (e: React.MouseEvent, id: string) => {
     if (drawingEdgeFrom && drawingEdgeFrom !== id) {
        // Create an edge
        if (!edges.some(e => (e.source === drawingEdgeFrom && e.target === id) || (e.source === id && e.target === drawingEdgeFrom))) {
           const edgeWeight = (edges.length % 9) + 1; // 1-9 based on count
           setEdges([...edges, { source: drawingEdgeFrom, target: id, weight: edgeWeight }]);
        }
     }
     setDrawingEdgeFrom(null);
     setDraggedNode(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
     const p = getMouseCoords(e);
     setMousePos(p);
     
     if (draggedNode) {
        setNodes(nodes.map(n => n.id === draggedNode ? { ...n, ...p } : n));
     }
  };

  const handleMouseUp = () => {
     setDraggedNode(null);
     setDrawingEdgeFrom(null);
  };
  
  useEffect(() => {
     // Serialize edges to string like "A-B:5, B-C:3"
     const edgesStr = edges.map(e => {
        const s = nodes.find(n => n.id === e.source)?.name || e.source;
        const t = nodes.find(n => n.id === e.target)?.name || e.target;
        return `${s}-${t}:${e.weight}`;
     }).join(', ');
     onEdgesChange(edgesStr);
  }, [edges, nodes, onEdgesChange]);

  const clearAll = () => {
     setNodes([]);
     setEdges([]);
  };

  return (
    <div className="flex flex-col w-full h-[300px] border border-white/10 rounded-lg overflow-hidden bg-[#0A0C12] relative">
       <div className="absolute top-2 left-2 z-10 flex gap-2 pointer-events-auto">
          <div className="bg-black/50 backdrop-blur px-3 py-1.5 rounded text-[10px] text-slate-400 font-mono border border-white/10 uppercase tracking-widest shadow-lg">
             <span className="text-cyan-400">双击</span> 添加节点 <span className="text-white/20 mx-1">|</span> <span className="text-cyan-400">Shift+拖拽</span> 连线
          </div>
          <button onClick={clearAll} className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded text-[10px] uppercase font-mono transition-colors">清空画布</button>
       </div>
       
       <svg 
         ref={svgRef}
         className="w-full h-full cursor-crosshair"
         onDoubleClick={handleDoubleClick}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseUp}
       >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgba(148, 163, 184, 0.4)" />
            </marker>
          </defs>

          {/* Grid background */}
          <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.05)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#graph-grid)" />

          {/* Render real edges */}
          {edges.map((e, i) => {
             const sn = nodes.find(n => n.id === e.source);
             const tn = nodes.find(n => n.id === e.target);
             if (!sn || !tn) return null;
             
             // Calculate text position
             const midX = (sn.x + tn.x) / 2;
             const midY = (sn.y + tn.y) / 2;

             return (
               <g key={i}>
                 <line x1={sn.x} y1={sn.y} x2={tn.x} y2={tn.y} stroke="rgba(148, 163, 184, 0.4)" strokeWidth="2" />
                 <text x={midX} y={midY - 8} fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold" stroke="black" strokeWidth="3" paintOrder="stroke">{e.weight}</text>
               </g>
             );
          })}

          {/* Render active dragging edge */}
          {drawingEdgeFrom && (() => {
             const sn = nodes.find(n => n.id === drawingEdgeFrom);
             if (!sn) return null;
             return <line x1={sn.x} y1={sn.y} x2={mousePos.x} y2={mousePos.y} stroke="#22d3ee" strokeWidth="2" strokeDasharray="5,5" />;
          })()}

          {/* Render nodes */}
          {nodes.map(n => (
             <g 
               key={n.id} 
               className={drawingEdgeFrom === n.id ? "cursor-grabbing" : "cursor-grab"}
               onMouseDown={(e) => handleNodeMouseDown(e, n.id)}
               onMouseUp={(e) => handleNodeMouseUp(e, n.id)}
             >
               <motion.circle 
                 cx={n.x} cy={n.y} r={18} fill="#0A0C12" stroke="#22d3ee" strokeWidth="2"
                 animate={{ scale: draggedNode === n.id ? 1.2 : 1 }}
               />
               <text x={n.x} y={n.y} fill="#fff" fontSize="12" textAnchor="middle" dy=".3em" fontWeight="bold" pointerEvents="none">{n.name}</text>
             </g>
          ))}
       </svg>
    </div>
  );
}
