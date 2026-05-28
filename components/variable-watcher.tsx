import { SimulationStep } from '@/lib/algorithms/types';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

export function VariableWatcher({ currentStep, steps = [], currentStepIndex = 0 }: { currentStep?: SimulationStep | null, steps?: SimulationStep[], currentStepIndex?: number }) {
  const [activeTab, setActiveTab] = useState<'variables' | 'callstack' | 'logs'>('logs');
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'logs' && logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStepIndex, activeTab]);
  
  if (!currentStep && steps.length === 0) {
    return null; 
  }
  
  return (
    <div className="flex flex-col flex-1 min-h-0 bg-[#080A0F] mt-2 border-t border-white/10">
      <div className="flex bg-black/40 px-2 py-1 gap-1 shrink-0 overflow-x-auto custom-scrollbar">
        <button 
          onClick={() => setActiveTab('logs')}
          className={`flex-1 min-w-max px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-colors rounded ${activeTab === 'logs' ? 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'}`}
        >
          Logs
        </button>
        <button 
          onClick={() => setActiveTab('variables')}
          className={`flex-1 min-w-max px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-colors rounded ${activeTab === 'variables' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'}`}
        >
          Variables ({currentStep?.variables ? Object.keys(currentStep.variables).length : 0})
        </button>
        <button 
          onClick={() => setActiveTab('callstack')}
          className={`flex-1 min-w-max px-3 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-colors rounded ${activeTab === 'callstack' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'}`}
        >
          Call Stack ({currentStep?.callStack?.length || 0})
        </button>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar p-0">
        <AnimatePresence mode="wait">
          {activeTab === 'logs' && (
            <motion.div 
               key="logs"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="w-full font-mono text-[11px] p-2 space-y-1"
            >
              {steps.slice(0, currentStepIndex + 1).map((step, idx) => (
                <div key={idx} className={`p-2 rounded border transition-colors ${idx === currentStepIndex ? 'bg-fuchsia-900/20 text-fuchsia-400 border-fuchsia-500/20 shadow-[0_0_10px_rgba(217,70,239,0.1)]' : 'bg-white/5 text-slate-400 border-white/5'}`}>
                  <span className={`opacity-50 mr-2 ${idx === currentStepIndex ? 'text-fuchsia-500' : ''}`}>[{idx + 1}]</span> {step.description}
                </div>
              ))}
              <div ref={logsEndRef} />
            </motion.div>
          )}

          {activeTab === 'variables' && (
            <motion.div 
               key="vars"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="w-full flex-col font-mono text-[11px]"
            >
              {currentStep?.variables && Object.keys(currentStep.variables).length > 0 ? (
                <table className="w-full text-left border-collapse">
                   <tbody>
                     {Object.entries(currentStep.variables).map(([key, val], idx) => (
                       <tr key={key} className="border-b border-white/5 last:border-b-0 hover:bg-white-[0.02]">
                         <td className="py-2 px-4 text-cyan-400 border-r border-white/5 w-1/3 break-all">{key}</td>
                         <td className="py-2 px-4 text-slate-300 break-all">{JSON.stringify(val)}</td>
                       </tr>
                     ))}
                   </tbody>
                </table>
              ) : (
                <div className="flex items-center justify-center p-6 text-slate-500 text-[10px]">No variables allocated</div>
              )}
            </motion.div>
          )}

          {activeTab === 'callstack' && (
            <motion.div 
               key="stack"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="w-full font-mono text-[11px] p-2 space-y-1"
            >
              {currentStep?.callStack && currentStep.callStack.length > 0 ? (
                // Reverse to show top of stack first
                [...currentStep.callStack].reverse().map((frame, idx) => (
                  <div key={idx} className={`p-2 rounded border ${idx === 0 ? 'bg-emerald-900/20 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-slate-400 border-white/5'}`}>
                    <span className="opacity-50 mr-2">{currentStep.callStack!.length - idx - 1}</span> {frame}
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center p-6 text-slate-500 text-[10px]">Main Thread (Idle)</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
