import { motion } from 'motion/react';
import { GraphData, ElementState } from '@/lib/algorithms/types';

export function GraphVisualizer({ data }: { data: GraphData }) {
  const getNodeColor = (state: ElementState) => {
    switch (state) {
      case 'comparing': return 'bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.8)] text-white';
      case 'swapping': return 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] text-white';
      case 'sorted':
      case 'visited': return 'bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.8)] text-slate-900 border-transparent';
      case 'pivot':
      case 'highlight': return 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] text-slate-900 animate-pulse border-transparent';
      case 'path': return 'bg-teal-300 shadow-[0_0_25px_rgba(94,234,212,0.9)] text-slate-900 border-transparent';
      default: return 'bg-blue-500/20 border border-blue-500/30 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] text-blue-200';
    }
  };

  const getEdgeColor = (state: ElementState) => {
    switch (state) {
      case 'comparing': return '#d946ef'; // fuchsia-500
      case 'swapping': return '#f97316';  // orange-500
      case 'visited': return '#2dd4bf';   // teal-400
      case 'highlight': return '#22d3ee'; // cyan-400
      case 'path': return '#5eead4';      // teal-300
      default: return 'rgba(59, 130, 246, 0.4)'; // blue-500/40
    }
  };

  return (
    <div className="w-full h-full relative" style={{ minHeight: '300px' }}>
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        {data.isDirected && (
          <defs>
            <marker id="arrow-default" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(59, 130, 246, 0.4)" />
            </marker>
            <marker id="arrow-highlight" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
            </marker>
            <marker id="arrow-visited" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#2dd4bf" />
            </marker>
            <marker id="arrow-path" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#5eead4" />
            </marker>
          </defs>
        )}
        {data.edges.map((edge, i) => {
          const source = data.nodes.find(n => n.id === edge.source);
          const target = data.nodes.find(n => n.id === edge.target);
          if (!source || !target) return null;
          
          const strokeColor = getEdgeColor(edge.state);
          let markerEnd = '';
          if (data.isDirected) {
             if (edge.state === 'highlight') markerEnd = 'url(#arrow-highlight)';
             else if (edge.state === 'visited') markerEnd = 'url(#arrow-visited)';
             else if (edge.state === 'path') markerEnd = 'url(#arrow-path)';
             else markerEnd = 'url(#arrow-default)';
          }

          return (
             <g key={i}>
                <motion.line 
                  initial={{ x1: `${source.x}%`, y1: `${source.y}%`, x2: `${target.x}%`, y2: `${target.y}%` }}
                  animate={{ 
                    x1: `${source.x}%`, 
                    y1: `${source.y}%`, 
                    x2: `${target.x}%`, 
                    y2: `${target.y}%`,
                    stroke: strokeColor,
                    strokeWidth: edge.state !== 'default' ? 2 : 1,
                    opacity: edge.state !== 'default' ? 1 : 0.5
                  }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.8 }}
                  markerEnd={markerEnd}
                />
                {edge.weight !== undefined && (
                  <motion.text 
                     initial={{ x: `${(source.x + target.x) / 2}%`, y: `${(source.y + target.y) / 2 - 2}%` }}
                     animate={{ x: `${(source.x + target.x) / 2}%`, y: `${(source.y + target.y) / 2 - 2}%` }}
                     transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.8 }}
                     fill="#94a3b8" 
                     fontSize="10"
                     textAnchor="middle"
                     className="font-mono bg-[#0A0C12]"
                  >
                    {edge.weight}
                  </motion.text>
                )}
             </g>
          );
        })}
      </svg>
      {data.nodes.map(node => (
        <motion.div
           key={node.id}
           className={`absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full text-[12px] font-bold z-10 whitespace-pre text-center ${getNodeColor(node.state)}`}
           initial={{ left: `${node.x}%`, top: `${node.y}%` }}
           animate={{ left: `${node.x}%`, top: `${node.y}%` }}
           transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.8 }}
        >
           {node.value}
        </motion.div>
      ))}
    </div>
  );
}
