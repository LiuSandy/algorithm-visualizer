import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SimulationStep } from '../lib/algorithms/types';

export function getColor(state: string) {

  switch (state) {
    case 'comparing': return 'bg-yellow-500/80 border-yellow-400 text-yellow-950 shadow-[0_0_15px_rgba(234,179,8,0.5)]';
    case 'swapping': return 'bg-fuchsia-500/80 border-fuchsia-400 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]';
    case 'sorted': return 'bg-emerald-500/80 border-emerald-400 text-emerald-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
    case 'partition': return 'bg-purple-500/80 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]';
    case 'visited': return 'bg-slate-700 border-slate-600 text-slate-400';
    case 'highlight': return 'bg-cyan-500/80 border-cyan-400 text-cyan-950 shadow-[0_0_15px_rgba(34,211,238,0.5)]';
    default: return 'bg-blue-500/20 border border-blue-500/30 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] text-blue-200';
  }
}

export function StringMatchingVisualizer({ step }: { step: SimulationStep }) {
  const haystack = step.elements.filter(el => el.id.startsWith('haystack'));
  const needle = step.elements.filter(el => el.id.startsWith('needle'));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12 overflow-auto py-8">
      <div className="flex flex-col gap-4">
        <span className="text-xs font-mono text-slate-500 uppercase">Target String (T)</span>
        <div className="flex flex-wrap gap-2 justify-center">
          {haystack.map(el => (
            <motion.div key={el.id} layout className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded border transition-colors shadow-lg ${getColor(el.state)}`}>
              <span className="text-lg font-mono font-bold">{el.display}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-xs font-mono text-slate-500 uppercase">Pattern String (P)</span>
        <div className="flex flex-wrap gap-2 justify-center">
          {needle.map(el => (
            <motion.div key={el.id} layout className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded border transition-colors shadow-lg ${getColor(el.state)}`}>
              <span className="text-lg font-mono font-bold">{el.display}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ValidParenthesesVisualizer({ step }: { step: SimulationStep }) {
  const chars = step.elements.filter(el => el.id.startsWith('char'));
  const stack = step.elements.filter(el => el.id.startsWith('stack'));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-12 overflow-auto py-8">
      <div className="flex flex-col gap-4 items-center">
        <span className="text-xs font-mono text-slate-500 uppercase">Input String</span>
        <div className="flex flex-wrap gap-2 justify-center">
          {chars.map(el => (
            <motion.div key={el.id} layout className={`w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded border transition-colors shadow-lg ${getColor(el.state)}`}>
              <span className="text-lg font-mono font-bold">{el.display}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col gap-4 items-center w-full max-w-sm">
        <span className="text-xs font-mono text-slate-500 uppercase">Stack (LIFO)</span>
        <div className="flex flex-col gap-1 w-48 border-x-2 border-b-2 border-slate-700 rounded-b p-2 min-h-[160px] justify-end bg-slate-900/50">
          {stack.map((el, i) => (
            <motion.div 
              key={el.id} 
              layout 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full py-2 flex items-center justify-center rounded border transition-colors shadow-lg ${getColor(el.state)}`}
            >
              <span className="text-lg font-mono font-bold">{el.display && el.display.split(': ')[1] ? el.display.split(': ')[1] : el.display}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LRUCacheVisualizer({ step }: { step: SimulationStep }) {
  return (
    <div className="w-full h-full flex flex-col items-center pt-12 gap-8 overflow-auto">
       <span className="text-xs font-mono text-slate-500 uppercase tracking-widest text-center w-full block">LRU Cache State<br/><span className="text-[10px]">MRU (最近使用) --------------------------- LRU (最久未使用)</span></span>
       <div className="flex flex-col gap-3 w-full max-w-sm pb-16">
          <AnimatePresence mode="popLayout">
          {step.elements.map((el, i) => (
            <motion.div 
              key={el.id} 
              layout 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`w-full py-4 px-6 flex items-center justify-between rounded border transition-colors shadow-lg ${getColor(el.state)}`}
            >
              <span className="font-mono text-lg font-bold">{el.display}</span>
              <span className="text-[10px] uppercase opacity-60 font-mono font-bold">
                 {i === 0 ? 'MRU' : i === step.elements.length - 1 ? 'LRU' : ''}
              </span>
            </motion.div>
          ))}
          </AnimatePresence>
       </div>
    </div>
  );
}

export function BloomFilterVisualizer({ step }: { step: SimulationStep }) {
  return (
    <div className="w-full h-full flex flex-col items-center pt-12 gap-8 overflow-auto px-4 pb-16">
       <span className="text-xs font-mono text-slate-500 uppercase tracking-widest text-center">Bloom Filter Bit Array</span>
       <div className="flex flex-wrap gap-1 md:gap-2 justify-center max-w-4xl">
          {step.elements.map(el => (
            <motion.div 
              key={el.id} 
              layout 
              className={`w-8 h-8 md:w-12 md:h-12 flex flex-col items-center justify-center rounded border transition-colors shadow-lg ${getColor(el.state)}`}
            >
              <span className="text-[10px] opacity-60 mb-0.5">{el.display && el.display.split(' = ')[0] ? el.display.split(' = ')[0].replace('[','').replace(']','') : ''}</span>
              <span className="text-sm md:text-base font-mono font-bold">{el.display && el.display.split(' = ')[1] ? el.display.split(' = ')[1] : el.value}</span>
            </motion.div>
          ))}
       </div>
    </div>
  );
}

// ==========================================
// BACKTRACKING VISUALIZERS
// ==========================================

export function NQueensVisualizer({ step }: { step: SimulationStep }) {
  const matrix = step.dpState?.matrix || [];
  const highlightCells = step.dpState?.highlightCells || [];
  const callStack = step.callStack || [];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 overflow-auto">
      <div className="flex flex-col md:flex-row gap-12 items-start justify-center">
        
        {/* Board View */}
        <div className="flex flex-col gap-2 items-center">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">N-Queens Board</span>
          <div className="bg-slate-800 p-2 rounded shadow-2xl border border-slate-700">
            {matrix.map((row, r) => (
              <div key={`r-${r}`} className="flex">
                {row.map((cell, c) => {
                  const isBlack = (r + c) % 2 === 1;
                  const highlight = highlightCells.find(h => h.r === r && h.c === c);
                  
                  let bg = isBlack ? 'bg-slate-700' : 'bg-slate-600';
                  let border = 'border-transparent';
                  
                  if (highlight) {
                    if (highlight.color === '#10B981') bg = 'bg-emerald-500/50';
                    else if (highlight.color === '#EF4444') bg = 'bg-rose-500/50';
                    else bg = 'bg-blue-500/50';
                    border = `border-[1px] border-[${highlight.color}]`;
                  }
                  
                  return (
                    <motion.div 
                       layout
                       key={`c-${c}`}
                       className={`w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-3xl transition-colors duration-300 ${bg} ${border}`}
                    >
                      {cell === '♕' ? (
                        <motion.span initial={{scale:0}} animate={{scale:1}} className="drop-shadow-lg">♕</motion.span>
                      ) : ''}
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Stack Tree / DFS View */}
        <div className="flex flex-col gap-2 min-w-[250px]">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Call Stack (DFS Tree)</span>
          <div className="flex flex-col gap-1 w-full max-w-sm rounded p-4 h-64 bg-slate-900 border border-slate-800 overflow-y-auto">
             <AnimatePresence>
               {callStack.map((call, i) => (
                 <motion.div
                   key={`${call}-${i}`}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className={`text-xs font-mono py-1 border-l-2 pl-2 ${i === callStack.length - 1 ? 'border-cyan-400 text-cyan-300 bg-cyan-500/10' : 'border-slate-600 text-slate-400'}`}
                   style={{ marginLeft: `${Math.min(i * 12, 100)}px` }}
                 >
                   {call}
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

export function HanoiVisualizer({ step }: { step: SimulationStep }) {
  const matrix = step.dpState?.matrix || [];
  const callStack = step.callStack || [];
  
  // Matrix rows represent slots from top to bottom, columns represent pegs
  const numDisks = matrix.length;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 overflow-auto">
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        
         {/* Towers View */}
         <div className="flex flex-col gap-8 items-center bg-slate-900/50 p-8 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Towers</span>
            
            <div className="flex items-end gap-16 relative mt-16 px-8">
               {/* Base Floor */}
               <div className="absolute bottom-0 left-0 right-0 h-4 bg-slate-700 border-t border-slate-600 rounded-sm z-0"></div>

               {/* Pegs */}
               {['A', 'B', 'C'].map((pegName, c) => (
                 <div key={pegName} className="flex flex-col items-center relative z-10 w-24">
                   {/* Pole */}
                   <div className="absolute bottom-0 w-3 bg-slate-600 rounded-t-lg" style={{ height: `${numDisks * 28 + 40}px` }}></div>
                   
                   {/* Disks */}
                   <div className="flex flex-col justify-end w-full" style={{ height: `${numDisks * 28}px` }}>
                     {matrix.map((row, r) => {
                       const disk = row[c] as number | null;
                       if (!disk) return <div key={r} className="w-full h-[28px]"></div>;
                       
                       const widthPercent = 30 + (disk / numDisks) * 70;
                       
                       let bg = 'bg-emerald-500';
                       if (disk % 3 === 1) bg = 'bg-cyan-500';
                       if (disk % 3 === 2) bg = 'bg-rose-500';

                       // Highlight logic
                       const highlight = step.dpState?.highlightCells?.find(h => h.r === r && h.c === c);
                       if (highlight) {
                          bg = 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]';
                       }

                       return (
                         <div key={r} className="w-full h-[28px] flex justify-center items-end py-[1px]">
                           <motion.div 
                              layoutId={`disk-${disk}`}
                              className={`h-full rounded-full border border-black/20 flex items-center justify-center text-[10px] font-bold text-white/80 ${bg}`}
                              style={{ width: `${widthPercent}%` }}
                           >
                             {disk}
                           </motion.div>
                         </div>
                       );
                     })}
                   </div>
                   
                   <span className="mt-6 text-sm font-bold text-slate-400 font-mono">{pegName}</span>
                 </div>
               ))}
            </div>
         </div>

         {/* Call Stack */}
         <div className="flex flex-col gap-2 min-w-[300px]">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Call Stack</span>
          <div className="flex flex-col gap-1 w-full max-w-sm rounded p-4 h-64 bg-slate-900 border border-slate-800 overflow-y-auto">
             <AnimatePresence>
               {callStack.map((call, i) => (
                 <motion.div
                   key={`${call}-${i}`}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className={`text-[10px] font-mono py-1 px-2 rounded-sm mb-1 ${i === callStack.length - 1 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800/50 text-slate-400'}`}
                 >
                   {call}
                 </motion.div>
               ))}
             </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

export function MazeVisualizer({ step }: { step: SimulationStep }) {
  const matrix = step.dpState?.matrix || [];
  const highlightCells = step.dpState?.highlightCells || [];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 overflow-auto">
       <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Maze Pathfinding</span>
       
       <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 shadow-2xl">
          {matrix.map((row, r) => (
             <div key={r} className="flex">
               {row.map((cell, c) => {
                 let bg = 'bg-slate-800'; 
                 let text = '';
                 
                 if (cell === 'S') { bg = 'bg-emerald-500/20 text-emerald-400'; text = 'S'; }
                 if (cell === 'E') { bg = 'bg-rose-500/20 text-rose-400'; text = 'E'; }
                 if (cell === '1') { bg = 'bg-slate-700 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]'; text = ''; }
                 if (cell === '·') { bg = 'bg-cyan-500/20 text-cyan-400'; text = '•'; }

                 const highlight = highlightCells.find(h => h.r === r && h.c === c);
                 if (highlight) {
                    if (highlight.color === '#10B981') bg = 'bg-emerald-500/50 text-white';
                    else if (highlight.color === '#EF4444') bg = 'bg-rose-500/50 text-white';
                    else if (highlight.color === '#3B82F6') bg = 'bg-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]';
                 }

                 return (
                   <motion.div
                     key={c}
                     layout
                     className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center border border-black/20 m-[1px] rounded-sm text-lg font-bold font-mono transition-colors duration-300 ${bg}`}
                   >
                     {text}
                     {highlight && highlight.color === '#3B82F6' && (
                       <motion.div layoutId="maze-explorer" className="w-1/2 h-1/2 rounded bg-white relative z-10 shadow-lg"></motion.div>
                     )}
                   </motion.div>
                 );
               })}
             </div>
          ))}
       </div>
    </div>
  );
}

export function TreeVisualizer({ step }: { step: SimulationStep }) {
  const matrix = step.dpState?.matrix || [];
  const highlightCells = step.dpState?.highlightCells || [];
  const callStack = step.callStack || [];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 overflow-auto">
      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest text-center">Combinations & Permutations State Tree</span>
      
      <div className="flex flex-col gap-6 w-full max-w-4xl px-4">
        {/* Active Path Array */}
        {matrix.length > 1 && (
          <div className="flex flex-col items-center gap-2 mb-6">
            <span className="text-[10px] font-mono text-slate-400">{matrix[1][0]}</span>
            <div className="flex gap-2 p-3 bg-slate-900 border border-slate-700 shadow-xl rounded-lg">
              {matrix[1].slice(1).map((val, i) => (
                <div key={i} className={`w-10 h-10 flex items-center justify-center rounded border font-mono font-bold ${val ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-600'}`}>
                   {val}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start w-full justify-center">
          {/* Array Selection State */}
          {matrix.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400">{matrix[0][0]}</span>
              <div className="flex flex-col gap-2 p-4 bg-slate-900 border border-slate-700 rounded-lg">
                {matrix[0].slice(1).map((val, i) => {
                  const isUsed = highlightCells.find(h => h.c === i + 1 && h.r === 0);
                  return (
                    <div key={i} className={`min-w-[4rem] px-4 py-2 flex items-center justify-center rounded border font-mono font-bold transition-all ${isUsed ? 'bg-slate-800 border-slate-700 text-slate-500 line-through opacity-50' : 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)] scale-105'}`}>
                       {val}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Call Stack / Recursion Tree Approximation */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-2">
             <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Recursion Tree (DFS Trace)</span>
             <div className="overflow-hidden bg-slate-900 border border-slate-800 rounded-lg p-6 relative flex flex-col items-start min-h-[300px]">
                <AnimatePresence>
                  {callStack.map((call, i) => (
                    <motion.div
                      key={`${call}-${i}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className={`relative font-mono text-xs py-2 px-3 mb-2 rounded border ${i === callStack.length - 1 ? 'bg-fuchsia-500/10 border-fuchsia-500 text-fuchsia-300' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                      style={{ marginLeft: `${Math.min(i * 24, 160)}px` }}
                    >
                      {/* Tree branch line */}
                      {i > 0 && (
                        <div className="absolute w-4 h-full border-l border-b border-slate-600 rounded-bl" style={{
                           left: '-16px', top: '-50%'
                        }}></div>
                      )}
                      {call}
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
