'use client';
import { useState } from 'react';
import { AlgorithmDefinition, SimulationStep } from '@/lib/algorithms/types';
import { Highlight, themes } from 'prism-react-renderer';
import { Maximize2, Minimize2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CodeRenderer = ({ isFull, algorithm, isCopied, handleCopy, isFullScreen, setIsFullScreen, currentStep, breakpoints = [], onToggleBreakpoint }: { 
  isFull: boolean, 
  algorithm: AlgorithmDefinition,
  isCopied: boolean,
  handleCopy: () => void,
  isFullScreen: boolean,
  setIsFullScreen: (val: boolean) => void,
  currentStep?: SimulationStep | null,
  breakpoints?: number[],
  onToggleBreakpoint?: (line: number) => void
}) => {
  // Use the string code directly or fallback if it happens to be an object
  const codeContent = typeof algorithm.code === 'string' ? algorithm.code : Object.values(algorithm.code)[0];
  
  return (
  <div className={`overflow-hidden bg-[#0A0A0A] flex flex-col ${isFull ? 'h-full w-full rounded-2xl border border-white/10 shadow-2xl relative' : 'flex-1 min-h-0 rounded-xl border border-white/5'}`}>
    {isFull && (
      <button onClick={() => setIsFullScreen(false)} className="absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all text-slate-400 hover:text-white shadow-lg" title="Minimize">
        <Minimize2 size={16} />
      </button>
    )}
    <div className="flex-1 overflow-auto custom-scrollbar">
      <Highlight
        theme={themes.nightOwl}
        code={codeContent}
        language="javascript"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} py-5 text-[10px] md:text-[13px] leading-relaxed font-mono`} style={{ ...style, backgroundColor: '#0A0A0A' }}>
            {tokens.map((line, i) => {
              const lineNumber = i + 1;
              const mappedActiveLines = currentStep?.activeLines || [];
              const isActive = mappedActiveLines.includes(lineNumber);
              const isBreakpoint = breakpoints.includes(lineNumber);
              const lineProps = getLineProps({ line });
              // Merge class names for highlighting
              const finalClassName = `${lineProps.className || ''} flex pl-2 pr-5 transition-colors cursor-pointer group ${isActive ? 'bg-cyan-900/60 border-l-[3px]' : 'border-l-[3px] hover:bg-white-[0.02]'} ${isActive ? (isBreakpoint ? 'border-rose-500' : 'border-cyan-400') : (isBreakpoint ? 'border-rose-500 bg-rose-950/20' : 'border-transparent')}`;
              
              return (
              <div 
                 key={i} 
                 {...lineProps} 
                 className={finalClassName} 
                 onClick={() => onToggleBreakpoint?.(lineNumber)}
                 style={{ ...lineProps.style, borderLeftWidth: '3px' }}
              >
                <div className="relative inline-flex items-center justify-end w-6 md:w-10 pr-4 shrink-0">
                  <div className={`absolute left-1/2 -ml-[10px] w-2 h-2 rounded-full ${isBreakpoint ? 'bg-rose-500' : 'bg-rose-500/0 group-hover:bg-rose-500/30'}`} />
                  <span className={`select-none text-[9px] md:text-[11px] font-bold ${isBreakpoint ? 'text-rose-400' : (isActive ? 'text-cyan-400' : 'text-slate-500')}`}>{lineNumber}</span>
                </div>
                <span className={`shrink-0 flex-1 relative z-10 ${isActive ? 'text-white font-bold' : ''}`}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            )})}
          </pre>
        )}
      </Highlight>
    </div>
  </div>
);
};

export function Explanation({ algorithm, currentStep, breakpoints = [], onToggleBreakpoint }: { algorithm: AlgorithmDefinition, currentStep?: SimulationStep | null, breakpoints?: number[], onToggleBreakpoint?: (line: number) => void }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'principle'>('code');

  const handleCopy = () => {
    const codeContent = typeof algorithm.code === 'string' ? algorithm.code : Object.values(algorithm.code)[0];
    navigator.clipboard.writeText(codeContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden custom-scrollbar bg-transparent p-6 relative">
      <div className="flex gap-4 mb-4 shrink-0 border-b border-white/10">
        <button 
          onClick={() => setActiveTab('code')} 
          className={`pb-2 px-2 text-[11px] font-medium border-b-2 transition-colors -mb-[1px] ${activeTab === 'code' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
        >
            代码实现
          </button>
          <button 
            onClick={() => setActiveTab('principle')} 
            className={`pb-2 px-2 text-[11px] font-medium border-b-2 transition-colors -mb-[1px] ${activeTab === 'principle' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
          >
            原理解析
          </button>
        </div>
      
      {activeTab === 'principle' ? (
        <div className="flex-1 overflow-auto custom-scrollbar pr-2 pb-4 space-y-4">
          <p className="text-[12px] text-slate-400 leading-relaxed mb-2">
            {algorithm.description}
          </p>

          {algorithm.theory?.core && (
            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎯</span>
                <h3 className="text-xs text-white font-bold tracking-widest">核心思想</h3>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                {algorithm.theory.core}
              </p>
            </div>
          )}

          {algorithm.theory?.analogy && (
            <div className="bg-gradient-to-br from-[#0A0A0A] to-slate-900/40 p-4 rounded-xl border border-white/5 relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💡</span>
                <h3 className="text-xs text-white font-bold tracking-widest">生活白话</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {algorithm.theory.analogy}
              </p>
            </div>
          )}

          <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎬</span>
              <h3 className="text-xs text-white font-bold tracking-widest">运行逻辑拆解</h3>
            </div>
            <ul className="space-y-3">
              {algorithm.coreSteps.map((step, idx) => (
                <li key={idx} className="flex gap-3 items-start bg-white/[0.02] p-3 rounded-lg border border-white/5">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/10 text-[10px] text-cyan-400 font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] text-slate-300 leading-relaxed flex-1">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {algorithm.theory?.scenarios && (
              <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⚙️</span>
                  <h3 className="text-xs text-white font-bold tracking-widest">适用场景</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {algorithm.theory.scenarios}
                </p>
              </div>
            )}
            {algorithm.theory?.prosCons && (
              <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⚖️</span>
                  <h3 className="text-xs text-white font-bold tracking-widest">优缺点对比</h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {algorithm.theory.prosCons}
                </p>
              </div>
            )}
          </div>

          <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                <h3 className="text-xs text-white font-bold tracking-widest">性能与复杂度</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {algorithm.timeComplexity && (
                <div className="bg-white/[0.02] rounded p-3 border border-white/5">
                  <div className="text-[10px] text-slate-500 mb-2 font-mono uppercase tracking-widest">Time Complexity</div>
                  <div className="text-[11px] text-white flex flex-col gap-1">
                    <span className="flex justify-between w-full truncate"><span className="text-emerald-400 font-mono w-12 shrink-0">Best:</span> <span className="truncate" title={algorithm.timeComplexity.best}>{algorithm.timeComplexity.best}</span></span>
                    <span className="flex justify-between w-full truncate"><span className="text-yellow-400 font-mono w-12 shrink-0">Avg:</span> <span className="truncate" title={algorithm.timeComplexity.average}>{algorithm.timeComplexity.average}</span></span>
                    <span className="flex justify-between w-full truncate"><span className="text-red-400 font-mono w-12 shrink-0">Worst:</span> <span className="truncate" title={algorithm.timeComplexity.worst}>{algorithm.timeComplexity.worst}</span></span>
                  </div>
                </div>
              )}
              {algorithm.spaceComplexity && (
                <div className="bg-white/[0.02] rounded p-3 border border-white/5">
                  <div className="text-[10px] text-slate-500 mb-2 font-mono uppercase tracking-widest">Space</div>
                  <div className="text-[11px] text-cyan-400 font-mono break-words" title={algorithm.spaceComplexity}>{algorithm.spaceComplexity}</div>
                </div>
              )}
            </div>
            {algorithm.theory?.complexity && (
              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-3 mt-3">
                {algorithm.theory.complexity}
              </p>
            )}
          </div>

          {algorithm.theory?.interview && (
            <div className="bg-gradient-to-r from-purple-900/10 to-[#0A0A0A] p-4 rounded-xl border border-purple-500/10 relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎓</span>
                <h3 className="text-xs text-purple-200 font-bold tracking-widest">面试核心考点</h3>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-wrap">
                {algorithm.theory.interview}
              </p>
            </div>
          )}

          {algorithm.theory?.practical && (
            <div className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💼</span>
                <h3 className="text-xs text-white font-bold tracking-widest">工程实践真相</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed whitespace-pre-wrap">
                {algorithm.theory.practical}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex justify-between items-center mb-3 shrink-0">
             <div className="flex items-center gap-2">
               {breakpoints.length > 0 && <span className="text-[9px] px-1.5 py-0.5 bg-rose-500/20 text-rose-400 rounded-sm font-mono">{breakpoints.length} 断点</span>}
             </div>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="w-7 h-7 cursor-pointer flex items-center justify-center hover:bg-white/10 rounded border border-transparent hover:border-white/5 transition-all text-slate-400 hover:text-white" title="Copy code">
                {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <button onClick={() => setIsFullScreen(true)} className="w-7 h-7 cursor-pointer flex items-center justify-center hover:bg-white/10 rounded border border-transparent hover:border-white/5 transition-all text-slate-400 hover:text-white" title="Full Screen">
                <Maximize2 size={14} />
              </button>
            </div>
          </div>
          <CodeRenderer 
            isFull={false} 
            algorithm={algorithm} 
            isCopied={isCopied} 
            handleCopy={handleCopy} 
            isFullScreen={isFullScreen} 
            setIsFullScreen={setIsFullScreen} 
            currentStep={currentStep}
            breakpoints={breakpoints}
            onToggleBreakpoint={onToggleBreakpoint}
          />
        </div>
      )}

      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#050608]/90 backdrop-blur-sm p-4 md:p-12 flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="w-full h-[90vh] md:h-[80vh] max-w-5xl"
            >
               <CodeRenderer 
                 isFull={true} 
                 algorithm={algorithm} 
                 isCopied={isCopied} 
                 handleCopy={handleCopy} 
                 isFullScreen={isFullScreen} 
                 setIsFullScreen={setIsFullScreen} 
                 currentStep={currentStep}
                 breakpoints={breakpoints}
                 onToggleBreakpoint={onToggleBreakpoint}
               />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
