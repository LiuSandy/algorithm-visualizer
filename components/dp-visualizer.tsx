import { DPState } from '@/lib/algorithms/types';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export function DPVisualizer({ state }: { state: DPState }) {
  const { matrix, highlightCells, rowLabels, colLabels, cellLogic } = state;
  const [activeTooltip, setActiveTooltip] = useState<{r: number, c: number, x: number, y: number, text: string} | null>(null);
  const [prevMatrix, setPrevMatrix] = useState(matrix);
  const containerRef = useRef<HTMLDivElement>(null);

  if (matrix !== prevMatrix) {
    setPrevMatrix(matrix);
    setActiveTooltip(null);
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-8 overflow-auto custom-scrollbar relative" ref={containerRef}>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-2xl backdrop-blur">
        <div className="flex flex-col relative inline-block min-w-min">
          {/* Column Labels */}
          {colLabels && (
            <div className="flex ml-[48px]">
              {colLabels.map((lbl, c) => (
                <div key={`col-lbl-${c}`} className="w-12 h-8 flex items-center justify-center text-cyan-500 font-mono text-xs font-bold shrink-0">
                  {lbl}
                </div>
              ))}
            </div>
          )}

          {matrix.map((row, r) => (
            <div key={`row-${r}`} className="flex">
              {/* Row Label */}
              {rowLabels && (
                <div className="w-12 h-12 flex items-center justify-center text-rose-400 font-mono text-xs font-bold shrink-0">
                  {rowLabels[r]}
                </div>
              )}
              
              {row.map((cell, c) => {
                const highlight = highlightCells?.find(hc => hc.r === r && hc.c === c);
                const isNull = cell === null || cell === undefined;
                const logicDesc = cellLogic ? cellLogic[`${r}-${c}`] : null;
                
                let bgColor = 'bg-black/40';
                let borderColor = 'border-white/10';
                let textColor = 'text-white/40';
                
                if (!isNull) {
                  bgColor = 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer';
                  borderColor = 'border-blue-500/30';
                  textColor = 'text-blue-100';
                }
                
                let highlightStyle: any = {};
                if (highlight) {
                  bgColor = 'bg-transparent';
                  borderColor = 'border-transparent';
                  textColor = 'text-white';
                  highlightStyle = {
                    borderColor: highlight.color,
                    color: highlight.color,
                    backgroundColor: `color-mix(in srgb, ${highlight.color} 20%, transparent)`,
                    boxShadow: `0 0 15px color-mix(in srgb, ${highlight.color} 40%, transparent), inset 0 0 10px color-mix(in srgb, ${highlight.color} 20%, transparent)`
                  };
                }

                return (
                  <motion.div
                    key={`cell-${r}-${c}`}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.8 }}
                    className={`relative w-12 h-12 flex items-center justify-center border shrink-0 font-mono text-sm transition-colors ${bgColor} ${borderColor} ${textColor}`}
                    style={highlight ? highlightStyle : {}}
                    onClick={(e) => {
                      if (!isNull && logicDesc && containerRef.current) {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        const containerRect = containerRef.current.getBoundingClientRect();
                        setActiveTooltip({
                          r, c, 
                          x: rect.left - containerRect.left + containerRef.current.scrollLeft + rect.width / 2,
                          y: rect.top - containerRect.top + containerRef.current.scrollTop - 10,
                          text: logicDesc
                        });
                      }
                    }}
                  >
                    {!isNull ? cell : ''}
                    {logicDesc && <div className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full m-1 opacity-50" />}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute z-50 bg-slate-900 border border-slate-700 shadow-2xl rounded-lg p-4 max-w-sm"
            style={{ 
              left: activeTooltip.x, 
              top: activeTooltip.y,
              transform: 'translate(-50%, -100%)' 
            }}
          >
            <div className="flex justify-between items-start mb-2 gap-4">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">Cell [{activeTooltip.r}, {activeTooltip.c}]</span>
              <button 
                onClick={() => setActiveTooltip(null)}
                className="text-slate-400 hover:text-white transition-colors"
               >
                 <X size={14} />
               </button>
            </div>
            <p className="text-sm text-slate-300 font-mono leading-relaxed">
              {activeTooltip.text}
            </p>
            {/* Arrow */}
            <div className="absolute left-1/2 bottom-[-6px] -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-slate-700 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
