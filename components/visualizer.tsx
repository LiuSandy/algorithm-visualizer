'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Square, RotateCcw, SkipForward, SkipBack } from 'lucide-react';
import { ArrayElement, SimulationStep, VisualElement } from '@/lib/algorithms/types';

import { GraphVisualizer } from './graph-visualizer';
import { DPVisualizer } from './dp-visualizer';

interface VisualizerProps {
  steps: SimulationStep[];
  speed: number; // delay in ms
  isGenerating?: boolean;
  onStepChange?: (step: SimulationStep, index: number) => void;
  category?: string;
  algorithmId?: string;
  breakpoints?: number[];
}

import { SimulationStep, VisualElement } from '@/lib/algorithms/types';
import { StringMatchingVisualizer, ValidParenthesesVisualizer, LRUCacheVisualizer, BloomFilterVisualizer, getColor, NQueensVisualizer, HanoiVisualizer, MazeVisualizer, TreeVisualizer } from './custom-visualizers';

function CanvasVisualizer({ elements, maxValue, viewMode }: { elements: VisualElement[], maxValue: number, viewMode: 'bar' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    const getColorStr = (state: string) => {
      switch (state) {
        case 'comparing': return '#d946ef'; // fuchsia-500
        case 'swapping': return '#f97316'; // orange-500
        case 'sorted': return '#2dd4bf'; // teal-400
        case 'pivot': return '#6366f1'; // indigo-500
        case 'partition': return '#06b6d4'; // cyan-500
        default: return 'rgba(59, 130, 246, 0.4)'; // blue-500/40
      }
    };

    const applyStyle = (ctx: CanvasRenderingContext2D, state: string) => {
      const color = getColorStr(state);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      if (state !== 'default') {
        ctx.shadowBlur = Math.min(20, rect.width / elements.length); // Dynamic glow based on density
        ctx.shadowColor = color;
      } else {
        ctx.shadowBlur = 0;
      }
    };

    const total = elements.length;
    
    if (viewMode === 'bar') {
      const barWidth = rect.width / total;
      elements.forEach((el, i) => {
        let heightPercent = (el.value / maxValue);
        if (heightPercent < 0.05) heightPercent = 0.05;
        const h = heightPercent * rect.height;
        const x = i * barWidth;
        const y = rect.height - h;
        
        applyStyle(ctx, el.state);
        // Slightly reduce width to show gaps unless barWidth is very tiny
        const w = barWidth > 2 ? barWidth - 1 : barWidth;
        ctx.fillRect(x, y, w, h);
      });
    }
  }, [elements, maxValue, viewMode]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function SlidingWindowVisualizer({ step, speed, isSearch }: { step: SimulationStep; speed: number; isSearch?: boolean }) {
  const elements = step.elements;
  const pointers = step.pointers || {};
  
  // Need to make sure layout is scrollable if lots of elements
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-8 overflow-x-auto overflow-y-hidden">
      <div className="relative flex items-center gap-2 px-8 min-w-max">
        {pointers && pointers.left !== undefined && pointers.right !== undefined && pointers.right >= pointers.left && (
          <motion.div
            layout
            initial={false}
            animate={{
              left: `${pointers.left * 3.5 + 2}rem`, // Each block is 3rem + 0.5rem gap = 3.5rem (56px) + offset
              width: `${(pointers.right - pointers.left + 1) * 3 + (pointers.right - pointers.left) * 0.5}rem`
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className={`absolute top-[-0.75rem] bottom-[-0.75rem] bg-cyan-500/20 border-2 border-cyan-400 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.3)] z-0 ${isSearch ? 'border-fuchsia-400 bg-fuchsia-500/10 shadow-[0_0_15px_rgba(217,70,239,0.2)]' : ''}`}
          >
             {/* Arrow Indicator */}
             <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className={`text-black text-[10px] font-bold px-3 py-1 rounded shadow-lg whitespace-nowrap flex items-center gap-2 ${isSearch ? 'bg-fuchsia-400 shadow-fuchsia-500/50' : 'bg-cyan-500 shadow-cyan-500/50'}`}>
                  {isSearch ? '搜索区间' : '当前窗口'} <span className="text-black font-black text-xs">→</span>
                </div>
                <div className={`absolute -bottom-1 w-2 h-2 rotate-45 ${isSearch ? 'bg-fuchsia-400' : 'bg-cyan-500'}`}></div>
             </div>
          </motion.div>
        )}
        
        {elements.map((el, i) => {
          let bgColor = 'bg-slate-800 border-slate-700 text-slate-300';
          if (el.state === 'path' || el.state === 'sorted') bgColor = 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-[0_0_10px_rgba(45,212,191,0.2)]';
          if (el.state === 'swapping' || el.state === 'comparing') bgColor = 'bg-fuchsia-500/80 border-fuchsia-400 text-white shadow-[0_0_10px_rgba(217,70,239,0.5)]';
          if (el.state === 'pivot') bgColor = 'bg-orange-500/80 border-orange-400 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]';
          
          return (
            <motion.div
              layout
              key={el.id}
              className={`relative z-10 w-12 h-12 shrink-0 flex items-center justify-center rounded border transition-colors duration-200 ${bgColor}`}
            >
              <span className="text-sm font-mono font-bold tracking-wider">
                {el.display !== undefined ? el.display : el.value}
              </span>
              
              {/* Optional Pointer labels underneath */}
              {pointers && Object.entries(pointers).map(([key, val]) => {
                const nameMap: Record<string, string> = { left: 'Left', right: 'Right', start: 'Start', end: 'End', mid: 'Mid' };
                const displayName = nameMap[key] || key;
                // Determine vertical offset for overlapping pointers
                let offset = '-bottom-6';
                if (key === 'right') offset = '-bottom-10';
                if (key === 'mid') offset = '-top-6';

                if (val === i) {
                  return (
                    <motion.div 
                       key={key}
                       layoutId={`pointer-${key}`}
                       className={`absolute ${offset} text-[10px] uppercase font-bold whitespace-nowrap ${key === 'mid' ? 'text-orange-400' : 'text-slate-400'}`}
                    >
                      {displayName}
                    </motion.div>
                  )
                }
                return null;
              })}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function Visualizer({ steps, speed, isGenerating, onStepChange, category, algorithmId, breakpoints = [] }: VisualizerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [prevSteps, setPrevSteps] = useState(steps);
  if (prevSteps !== steps) {
    setPrevSteps(steps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }

  if (isPlaying && currentStepIndex >= steps.length - 1) {
    setIsPlaying(false);
  }

  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timerRef.current = setTimeout(() => {
        const nextIdx = currentStepIndex + 1;
        const nextStep = steps[nextIdx];
        
        // Breakpoint evaluation
        if (breakpoints.length > 0 && nextStep?.activeLines) {
           if (nextStep.activeLines.some(line => breakpoints.includes(line))) {
             setIsPlaying(false); // Pause when hitting a breakpoint
             return setCurrentStepIndex(nextIdx);
           }
        }
        
        setCurrentStepIndex(nextIdx);
      }, speed);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed, breakpoints, steps]);

  useEffect(() => {
    const onGlobalPlay = () => {
      if (currentStepIndex >= steps.length - 1) setCurrentStepIndex(0);
      setIsPlaying(true);
    };
    const onGlobalPause = () => setIsPlaying(false);
    const onGlobalReset = () => { setIsPlaying(false); setCurrentStepIndex(0); };

    window.addEventListener('global-play', onGlobalPlay);
    window.addEventListener('global-pause', onGlobalPause);
    window.addEventListener('global-reset', onGlobalReset);

    return () => {
      window.removeEventListener('global-play', onGlobalPlay);
      window.removeEventListener('global-pause', onGlobalPause);
      window.removeEventListener('global-reset', onGlobalReset);
    };
  }, [currentStepIndex, steps.length, steps]);

  const currentStep = steps[currentStepIndex] || steps[0];
  
  useEffect(() => {
    if (currentStep && onStepChange) {
      onStepChange(currentStep, currentStepIndex);
    }
  }, [currentStep, currentStepIndex, onStepChange]);

  if (!currentStep) return null; // Avoid render before steps are ready

  const togglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const nextStep = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) setCurrentStepIndex(prev => prev + 1);
  };

  const prevStep = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const getColor = (state: string) => {
    switch (state) {
      case 'comparing': return 'bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.8)] border-transparent text-white';
      case 'swapping': return 'bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] border-transparent text-white';
      case 'sorted': return 'bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.8)] border-transparent text-slate-900';
      case 'pivot': return 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.8)] border-transparent text-white';
      case 'partition': return 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)] border-transparent text-white';
      case 'active': return 'bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.8)] border-transparent text-white';
      case 'visited': return 'bg-slate-700/80 border border-slate-600 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] text-slate-300';
      case 'path': return 'bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.8)] border-transparent text-slate-900';
      default: return 'bg-blue-500/20 border border-blue-500/30 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] text-blue-200';
    }
  };
  
  // Find max value and adjust scale
  const maxValue = Math.max(...currentStep.elements.map(el => el.value), 10);

  return (
    <div className="flex flex-col h-full bg-black relative">
      {/* Grid Background Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22D3EE 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      
      {/* Real-time Metrics Dashboard */}
      {currentStep.metrics && (
        <div className="absolute top-16 left-4 md:top-20 md:left-6 flex flex-col gap-2 z-20 pointer-events-none mt-4">
          <h3 className="text-[10px] font-mono text-slate-500 tracking-[0.2em] mb-1">实时指标</h3>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur shadow-xl text-left">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs font-mono">
              <div className="flex flex-col">
                <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1">比较次数</span>
                <span className="text-cyan-400 font-bold text-sm">{currentStep.metrics.comparisons}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1">交换/修改</span>
                <span className="text-emerald-400 font-bold text-sm">{currentStep.metrics.swaps}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1">数组访问</span>
                <span className="text-purple-400 font-bold text-sm">{currentStep.metrics.arrayAccesses}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-[9px] uppercase tracking-wider mb-1">总操作数</span>
                <span className="text-rose-400 font-bold text-sm">{currentStep.metrics.operations}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Info Panel */}
      <div className="h-16 p-6 flex flex-col items-center justify-center text-center relative z-10 w-full pointer-events-none mt-4">
        <h1 className="text-xs font-medium text-slate-500 tracking-[0.2em] mb-3 flex items-center gap-3">
           执行过程 <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20 shadow-[0_0_10px_rgba(34,211,238,0.2)]">步骤 {currentStepIndex + 1}/{steps.length}</span>
        </h1>
      </div>
      
      {/* Visualization Canvas */}
      <div className="flex-1 flex items-center justify-center w-full px-12 pb-[120px] relative z-10 overflow-hidden">
        {algorithmId === 'backtracking-nqueens' ? (
           <NQueensVisualizer step={currentStep} />
        ) : algorithmId === 'hanoi' ? (
           <HanoiVisualizer step={currentStep} />
        ) : algorithmId === 'maze' ? (
           <MazeVisualizer step={currentStep} />
        ) : algorithmId === 'permutations' || algorithmId === 'combinations' || algorithmId === 'combination-sum' ? (
           <TreeVisualizer step={currentStep} />
        ) : currentStep.graphData ? (
          <GraphVisualizer data={currentStep.graphData} />
        ) : currentStep.dpState ? (
          <DPVisualizer state={currentStep.dpState} />
        ) : category === 'SlidingWindow' ? (
          <div className="w-full h-full relative">
            <SlidingWindowVisualizer step={currentStep} speed={speed} />
          </div>
        ) : category === 'Searching' ? (
          <div className="w-full h-full relative">
            <SlidingWindowVisualizer step={currentStep} speed={speed} isSearch={true} />
          </div>
        ) : algorithmId === 'stringMatching' || algorithmId === 'kmp' || algorithmId === 'rabin-karp' || algorithmId === 'z-algorithm' ? (
          <StringMatchingVisualizer step={currentStep} />
        ) : algorithmId === 'validParentheses' ? (
          <ValidParenthesesVisualizer step={currentStep} />
        ) : algorithmId === 'bloomFilter' ? (
          <BloomFilterVisualizer step={currentStep} />
        ) : algorithmId === 'lruCache' ? (
          <LRUCacheVisualizer step={currentStep} />
        ) : category === 'Sorting' ? (
          <div className="w-full h-full flex flex-col justify-end gap-8 pb-12 max-w-5xl mx-auto overflow-hidden">
            <div className="flex-1 flex items-end justify-center px-4">
              {(() => {
                const total = steps[0]?.elements.length || 1;
                const disableLayout = total > 25 || speed < 100;
                const springConfig = { type: 'spring', damping: 15, stiffness: 200, mass: 0.8 };
                
                if (total > 100) {
                   return <CanvasVisualizer elements={currentStep.elements} maxValue={maxValue} viewMode="bar" />;
                }

                return (
                  <AnimatePresence mode="wait">
                  {currentStep.elements.map((el, i) => {
                     let heightPercent = (el.value / maxValue) * 100;
                     if (heightPercent < 5) heightPercent = 5;
                     
                     return (
                       <motion.div
                         layout={!disableLayout}
                         initial={disableLayout ? false : { opacity: 0, scaleY: 0 }}
                         animate={{ height: `${heightPercent}%`, opacity: 1, scaleY: 1 }}
                         exit={disableLayout ? false : { opacity: 0, scaleY: 0 }}
                         key={`bar-${el.id}`}
                         className={`relative flex-1 mx-[1px] md:mx-[2px] max-w-[48px] min-w-[3px] rounded-t flex flex-col justify-end items-center transition-colors duration-150 ${getColor(el.state)}`}
                         style={{ transformOrigin: 'bottom' }}
                         transition={disableLayout ? { duration: 0 } : springConfig}
                       />
                     );
                  })}
                  </AnimatePresence>
                );
              })()}
            </div>
            
            {/* Array View Add-on for Sorting */}
            {steps[0]?.elements.length <= 25 && (
            <div className="flex-none flex items-center justify-center flex-wrap gap-1 md:gap-2 px-4 pt-4 border-t border-white/5">
              <AnimatePresence mode="wait">
                {currentStep.elements.map((el, i) => {
                   const disableLayout = speed < 100;
                   const springConfig = { type: 'spring', damping: 15, stiffness: 200, mass: 0.8 };
                   return (
                     <motion.div
                       key={`row-${el.id}`}
                       layout={!disableLayout}
                       initial={disableLayout ? false : { opacity: 0, scale: 0.8 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={disableLayout ? false : { opacity: 0, scale: 0.8 }}
                       className={`relative h-10 md:h-12 shrink-0 px-2 md:px-3 min-w-[2.5rem] flex items-center justify-center rounded border transition-colors duration-150 shadow-lg ${getColor(el.state)}`}
                       transition={disableLayout ? { duration: 0 } : springConfig}
                     >
                       <span className="text-[10px] md:text-xs font-mono font-bold whitespace-nowrap">
                         {el.display !== undefined ? el.display : el.value}
                       </span>
                     </motion.div>
                   );
                })}
              </AnimatePresence>
            </div>
            )}
          </div>
        ) : (
          <div className={`w-[90%] h-[80%] max-w-5xl mx-auto relative flex items-center justify-center flex-wrap gap-1 md:gap-2 content-center overflow-auto`}>
            {(() => {
              const disableLayout = speed < 100;
              const springConfig = { type: 'spring', damping: 15, stiffness: 200, mass: 0.8 };
              
              if (currentStep.elements.length > 0) {
                return (
                  <AnimatePresence mode="wait">
                  {currentStep.elements.map((el) => {
                     return (
                       <motion.div
                         key={`row-${el.id}`}
                         layout={!disableLayout}
                         initial={disableLayout ? false : { opacity: 0, scale: 0.8 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={disableLayout ? false : { opacity: 0, scale: 0.8 }}
                         className={`relative h-10 md:h-14 shrink-0 px-3 md:px-4 min-w-[2.5rem] md:min-w-[3.5rem] flex items-center justify-center rounded border transition-colors duration-150 shadow-lg ${getColor(el.state)}`}
                         transition={disableLayout ? { duration: 0 } : springConfig}
                       >
                         <span className="text-[10px] sm:text-xs md:text-sm font-mono font-bold whitespace-nowrap">
                           {el.display !== undefined ? el.display : el.value}
                         </span>
                       </motion.div>
                     );
                  })}
                  </AnimatePresence>
                );
              } else {
                 return <div className="text-white/30 text-sm font-mono tracking-widest uppercase">No elements to visualize</div>;
              }
            })()}
          </div>
        )}
      </div>

      {/* Controls Panel Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl z-20 h-16">
        <button onClick={togglePlay} className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-cyan-400 transition-all">
          {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current translate-x-[1px]" />}
        </button>
        <div className="flex gap-1 ml-4 mr-2">
          <button onClick={prevStep} className="px-3 py-2 cursor-pointer text-[11px] font-bold text-slate-300 uppercase hover:text-cyan-400 transition-colors">上一步</button>
          <button onClick={nextStep} className="px-3 py-2 cursor-pointer text-[11px] font-bold text-slate-300 uppercase hover:text-cyan-400 transition-colors">下一步</button>
        </div>
        <div className="w-[1px] h-6 my-auto bg-white/20 mx-2"></div>
        <button onClick={reset} className="px-6 cursor-pointer text-[11px] font-bold text-slate-300 uppercase hover:text-white transition-colors">重置</button>
      </div>
    </div>
  );
}
