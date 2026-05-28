'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import { Visualizer } from './visualizer';
import { Explanation } from './explanation';
import { VariableWatcher } from './variable-watcher';
import { GraphEditor } from './graph-editor';
import { algorithms, getAlgorithm } from '@/lib/algorithms';
import { ArrayElement, SimulationStep } from '@/lib/algorithms/types';
import { Settings, BarChart2, Hash, Zap, ChevronLeft, ChevronRight, RotateCcw, Play, Pause } from 'lucide-react';

const generateRandomArray = (size: number) => {
  const arr: ArrayElement[] = [];
  for (let i = 0; i < size; i++) {
      arr.push({
          id: `id-${Math.random().toString(36).substr(2, 9)}`,
          value: Math.floor(Math.random() * 90) + 10 // 10 to 99
      });
  }
  return arr;
};

export function MainApp() {
  const CATEGORIES = [
    { id: 'Sorting', name: '排序算法' },
    { id: 'Searching', name: '查找算法' },
    { id: 'Graph', name: '图算法' },
    { id: 'LinkedList', name: '链表算法' },
    { id: 'Tree', name: '树结构算法' },
    { id: 'Backtracking', name: '递归与回溯' },
    { id: 'DP', name: '动态规划' },
    { id: 'SlidingWindow', name: '滑动窗口' },
    { id: 'Math', name: '数学算法' },
    { id: 'String', name: '字符串算法' },
    { id: 'Practical', name: '实用/工作算法' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('Sorting');
  const [algoId, setAlgoId] = useState(algorithms[0].id);
  const [arraySize, setArraySize] = useState(15);
  const [playbackSpeed, setPlaybackSpeed] = useState(300);
  
  const [isEditingSize, setIsEditingSize] = useState(false);
  const [sizeInputValue, setSizeInputValue] = useState(arraySize.toString());
  
  const [isMounted, setIsMounted] = useState(false);
  const [arrayData, setArrayData] = useState<ArrayElement[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    setArrayData(generateRandomArray(15));
  }, []);

  // Custom input support
  const [customInput, setCustomInput] = useState('');
  const [targetInput, setTargetInput] = useState('');
  const [strInput, setStrInput] = useState('');
  const [strMatchInput, setStrMatchInput] = useState('');
  const [capacityInput, setCapacityInput] = useState('');
  
  // Graph input support (for future edges customisation)
  const [graphEdgesInput, setGraphEdgesInput] = useState('');

  const [isSplitMode, setIsSplitMode] = useState(false);
  const [secondaryAlgoId, setSecondaryAlgoId] = useState(algorithms[0].id);
  const secondaryAlgorithm = getAlgorithm(secondaryAlgoId) || algorithms[0];
  const [secondarySteps, setSecondarySteps] = useState<SimulationStep[]>([]);
  const [isGeneratingSecondary, setIsGeneratingSecondary] = useState(false);

  const algorithm = getAlgorithm(algoId) || algorithms[0];
  const filteredAlgorithms = algorithms.filter(a => a.category === selectedCategory);

  const handleApplyCustom = () => {
    try {
      let parsed = customInput
        .split(',')
        .map(v => parseInt(v.trim()))
        .filter(v => !isNaN(v));
      
      let dataToSet: ArrayElement[] = [];

      if (parsed.length > 0) {
        dataToSet = parsed.map(val => ({
          id: `id-${Math.random().toString(36).substr(2, 9)}`,
          value: val
        }));
      } else if (customInput.trim().length > 0) {
        // If not comma separated numbers, treat as string
        dataToSet = customInput.split('').map(char => ({
          id: `id-${Math.random().toString(36).substr(2, 9)}`,
          value: char.charCodeAt(0),
          display: char
        }));
      }
      
      if (dataToSet.length > 0) {
        setArrayData(dataToSet);
        setArraySize(dataToSet.length);
        setSizeInputValue(dataToSet.length.toString());
      }
    } catch(e) {
      // Ignored
    }
  };

  const handleSizeChange = (newSize: number) => {
    const max = selectedCategory === 'Graph' ? 50 : 500;
    const finalSize = Math.max(5, Math.min(newSize, max));
    setArraySize(finalSize);
    setSizeInputValue(finalSize.toString());
    setArrayData(generateRandomArray(finalSize));
  };

  const handleSizeSubmit = () => {
    setIsEditingSize(false);
    let val = parseInt(sizeInputValue);
    if (!isNaN(val)) {
      handleSizeChange(val);
    } else {
      setSizeInputValue(arraySize.toString());
    }
  };

  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState<SimulationStep | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [breakpoints, setBreakpoints] = useState<number[]>([]);
  
  const handleToggleBreakpoint = (line: number) => {
    setBreakpoints(prev => 
      prev.includes(line) 
        ? prev.filter(b => b !== line)
        : [...prev, line]
    );
  };
  
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [rightWidth, setRightWidth] = useState(320);

  const rightPanelRef = useRef<HTMLElement>(null);

  const handleResizeRight = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = rightWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const diff = startX - moveEvent.clientX; // moving left increases width
      const maxW = Math.min(window.innerWidth - 300, 800); // Set absolute max width to 800
      const w = Math.min(maxW, Math.max(250, startWidth + diff));
      if (rightPanelRef.current) {
         rightPanelRef.current.style.width = `${w}px`;
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (rightPanelRef.current) {
        setRightWidth(parseInt(rightPanelRef.current.style.width) || rightWidth);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    let isActive = true;
    const runGeneration = async () => {
      setIsGenerating(true);
      
      if (algorithm.id === 'custom-json') {
          if (isActive) {
             setIsGenerating(false);
          }
          return;
      }
      
      if (arrayData.length === 0) {
        if (isActive) {
          setSteps([]);
          setIsGenerating(false);
        }
        return;
      }
      
      let target: number | undefined;
      if ((selectedCategory === 'Searching' || algorithm.id === 'minSubArrayLen') && targetInput.trim() !== '') {
         const parsedTarget = parseInt(targetInput.trim());
         if (!isNaN(parsedTarget)) target = parsedTarget;
      }
      
      let capacity: number | undefined;
      if (capacityInput.trim() !== '') {
         const parsedCap = parseInt(capacityInput.trim());
         if (!isNaN(parsedCap)) capacity = parsedCap;
      }

      const worker = new Worker(new URL('../lib/worker/algorithm.worker.ts', import.meta.url));
      
      worker.onmessage = (e) => {
        if (!isActive) return;
        if (e.data.error) {
           setSteps([]);
           console.error(e.data.error);
        } else {
           setSteps(e.data.steps || []);
        }
        setIsGenerating(false);
        worker.terminate();
      };

      worker.onerror = (err) => {
        if (!isActive) return;
        console.error('Worker error:', err, 'message:', err.message, 'filename:', err.filename, 'lineno:', err.lineno);
        setSteps([]);
        setIsGenerating(false);
        worker.terminate();
      };

      worker.postMessage({
        algoId: algorithm.id,
        arrayData,
        options: { target, strInput, strMatch: strMatchInput, capacity, graphEdges: graphEdgesInput }
      });

      return worker;
    };
    
    let w: Worker | undefined;
    runGeneration().then(worker => { w = worker; });

    return () => {
      isActive = false;
      if (w) w.terminate();
    };
  }, [algorithm, arrayData, targetInput, strInput, strMatchInput, capacityInput, selectedCategory, graphEdgesInput]);

  useEffect(() => {
    let isActive = true;
    const runGenerationSecondary = async () => {
      if (!isSplitMode) return;
      setIsGeneratingSecondary(true);
      
      if (arrayData.length === 0) {
        if (isActive) {
          setSecondarySteps([]);
          setIsGeneratingSecondary(false);
        }
        return;
      }
    
      let target: number | undefined;
      if ((selectedCategory === 'Searching' || secondaryAlgorithm.id === 'minSubArrayLen') && targetInput.trim() !== '') {
         const parsedTarget = parseInt(targetInput.trim());
         if (!isNaN(parsedTarget)) target = parsedTarget;
      }
      
      let capacity: number | undefined;
      if (capacityInput.trim() !== '') {
         const parsedCap = parseInt(capacityInput.trim());
         if (!isNaN(parsedCap)) capacity = parsedCap;
      }

      const worker = new Worker(new URL('../lib/worker/algorithm.worker.ts', import.meta.url));
      
      worker.onmessage = (e) => {
        if (!isActive) return;
        if (e.data.error) {
           setSecondarySteps([]);
        } else {
           setSecondarySteps(e.data.steps || []);
        }
        setIsGeneratingSecondary(false);
        worker.terminate();
      };

      worker.postMessage({
        algoId: secondaryAlgorithm.id,
        arrayData,
        options: { target, strInput, strMatch: strMatchInput, capacity, graphEdges: graphEdgesInput }
      });

      return worker;
    };

    let w: Worker | undefined;
    runGenerationSecondary().then(worker => { w = worker; });

    return () => {
      isActive = false;
      if (w) w.terminate();
    };
  }, [secondaryAlgorithm, arrayData, targetInput, strInput, strMatchInput, capacityInput, selectedCategory, isSplitMode, graphEdgesInput]);

  if (!isMounted) {
    return <div className="h-full w-full bg-[#050608]" />;
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden select-none bg-[#050608] text-slate-300 font-sans relative">
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-white/10 flex flex-none items-center justify-between px-6 bg-[#0A0C12] relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
          <span className="font-mono tracking-widest text-xs font-bold text-white uppercase flex gap-2">
            算法实验室 <span className="text-white/30">{'//'}</span> <span className="text-cyan-400">虚拟执行内核</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar pr-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1.5 rounded-lg flex-shrink-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const firstAlgo = algorithms.find(a => a.category === cat.id);
                  if (firstAlgo) setAlgoId(firstAlgo.id);
                }}
                className={`px-3 py-1 cursor-pointer rounded text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                  cat.id === selectedCategory 
                    ? 'bg-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-cyan-400 font-mono uppercase">处理器: 42%</span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-emerald-400 font-mono uppercase">状态: 稳定</span>
          </div>
          <div className="h-4 w-[1px] bg-white/20"></div>
          <span className="text-[11px] font-mono text-slate-500 uppercase">当前会话: 0x8F2A01</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden relative z-10">
        {/* Left Side: Setup Panel */}
        {leftOpen && (
        <div className="w-[320px] flex-none flex flex-col border-r border-white/10 bg-[#080A0F] z-20">
          <div className="p-6 pb-2 border-b border-white/5 relative flex-1 flex flex-col min-h-0">
             <button onClick={() => setLeftOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white cursor-pointer z-50">
               <ChevronLeft size={16} />
             </button>
             <h3 className="text-[10px] flex-none font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">{CATEGORIES.find(c => c.id === selectedCategory)?.name || '核心算法'}</h3>
             <ul className="space-y-1 flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2 pb-2">
               {filteredAlgorithms.length > 0 ? (
                 filteredAlgorithms.map((algo) => (
                   <li 

                      key={algo.id}
                      onClick={() => setAlgoId(algo.id)}
                      className={`flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors ${algo.id === algoId ? 'bg-cyan-500/10 border-l-2 border-cyan-500 text-cyan-500' : 'text-slate-400 hover:bg-white/5'}`}
                   >
                     <div className={`w-1 h-1 rounded-full ${algo.id === algoId ? 'bg-cyan-500' : 'bg-slate-700'}`}></div>
                     <span className="text-xs font-medium font-sans">{algo.name}</span>
                   </li>
                 ))
               ) : (
                 <li className="text-xs text-slate-500 px-3 py-2 flex items-center justify-center border border-white/5 bg-white/5 rounded-md h-12">
                    正在开发中...
                 </li>
               )}
             </ul>

             <div className="flex-none flex justify-between items-center px-3 py-3 border-t border-white/5 mt-2">
                <span className="text-xs text-slate-400 font-mono tracking-wider">双核运行</span>
                <button 
                  onClick={() => setIsSplitMode(!isSplitMode)} 
                  className={`w-8 h-4 rounded-full relative transition-colors cursor-pointer ${isSplitMode ? 'bg-cyan-500' : 'bg-slate-700'}`}
                >
                   <div className={`w-3 h-3 bg-white rounded-full absolute top-[2px] transition-all shadow ${isSplitMode ? 'left-[18px]' : 'left-[2px]'}`} />
                </button>
             </div>
             
             {isSplitMode && (
               <div className="flex-none pt-3 border-t border-white/5 space-y-2 mt-2">
                 <div className="flex items-center text-[10px] font-mono text-emerald-400 uppercase tracking-widest pl-2">
                   <span>{'// 对比算法 (Algo 2)'}</span>
                 </div>
                 <select 
                   value={secondaryAlgoId} 
                   onChange={e => setSecondaryAlgoId(e.target.value)}
                   className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors font-sans appearance-none cursor-pointer"
                 >
                   {filteredAlgorithms.map(algo => (
                     <option key={`sec-${algo.id}`} value={algo.id}>{algo.name}</option>
                   ))}
                 </select>
               </div>
             )}
          </div>
          <div className="p-6 border-b border-white/5 flex-none overflow-y-auto custom-scrollbar max-h-[50vh]">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">参数调优</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                  <span>{selectedCategory === 'Graph' ? '图节点数量' : '数据量大小'}</span>
                  {isEditingSize ? (
                    <input 
                      type="number" 
                      autoFocus 
                      className="w-12 bg-transparent text-cyan-400 text-right outline-none border-b border-cyan-500/50" 
                      value={sizeInputValue}
                      onChange={(e) => setSizeInputValue(e.target.value)}
                      onBlur={handleSizeSubmit}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSizeSubmit();
                      }}
                    />
                  ) : (
                    <span 
                      className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors tooltip-trigger"
                      title="点击输入大小" 
                      onClick={() => setIsEditingSize(true)}
                    >
                      {arraySize}
                    </span>
                  )}
                </div>
                  <input 
                    type="range" 
                    min="5" max={selectedCategory === 'Graph' ? "50" : "500"} 
                    value={arraySize}
                    onChange={(e) => handleSizeChange(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                  <span>动画速度</span>
                  <span className="text-emerald-400">{playbackSpeed}ms</span>
                </div>
                <input 
                  type="range" 
                  min="20" max="1000" 
                  step="20"
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {selectedCategory === 'Graph' && (
                <div className="pt-4 space-y-2 flex flex-col items-center">
                   <div className="w-full flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase mb-2">
                     <span>自定义图表编辑</span>
                     {graphEdgesInput && <span className="text-cyan-400">已应用</span>}
                   </div>
                   <GraphEditor onEdgesChange={setGraphEdgesInput} />
                </div>
              )}

              {selectedCategory !== 'Graph' && (
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase">
                    <span>自定义数据数组 (逗号分隔)</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="例如: 12, 5, 87, 24"
                      className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                    />
                    
                    {(selectedCategory === 'Searching' || algorithm.id === 'minSubArrayLen' || secondaryAlgorithm.id === 'minSubArrayLen') && (
                      <div className="pt-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase mb-2">
                          <span>查找目标值/Target (可选)</span>
                        </div>
                        <input 
                          type="number"
                          value={targetInput}
                          onChange={(e) => setTargetInput(e.target.value)}
                          placeholder="例如: 87"
                          className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                        />
                      </div>
                    )}
                    
                    {selectedCategory === 'String' && (
                      <div className="pt-2 space-y-2">
                        <div>
                          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase mb-2">
                            <span>输入字符串 (可选)</span>
                          </div>
                          <input 
                            type="text"
                            value={strInput}
                            onChange={(e) => setStrInput(e.target.value)}
                            placeholder="例如: hello world"
                            className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                          />
                        </div>
                        {(algorithm.id === 'stringMatching' || secondaryAlgorithm.id === 'stringMatching') && (
                          <div>
                            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase mb-2">
                              <span>匹配模式 (需查找的字符)</span>
                            </div>
                            <input 
                              type="text"
                              value={strMatchInput}
                              onChange={(e) => setStrMatchInput(e.target.value)}
                              placeholder="例如: world"
                              className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    
                    {(algorithm.id === 'lruCache' || secondaryAlgorithm.id === 'lruCache') && (
                      <div className="pt-2">
                        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase mb-2">
                          <span>缓存容量 / Capacity</span>
                        </div>
                        <input 
                          type="number"
                          value={capacityInput}
                          onChange={(e) => setCapacityInput(e.target.value)}
                          placeholder="例如: 4"
                          className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors font-mono"
                        />
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={handleApplyCustom}
                        className="flex-1 cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded text-[10px] font-mono uppercase transition"
                      >
                        应用配置
                      </button>
                      <button 
                        onClick={() => handleSizeChange(arraySize)}
                        className="flex-1 cursor-pointer px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded text-[10px] font-mono uppercase transition"
                      >
                        随机生成
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        )}

        {/* Center: Visualization Stage */}
        <div className={`flex-1 min-w-0 bg-black relative border-r border-white/10 flex flex-col justify-center ${isSplitMode ? 'xl:flex-row' : ''}`}>
          {!leftOpen && (
            <button onClick={() => setLeftOpen(true)} className="absolute top-4 left-4 z-50 p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors shadow-lg">
              <ChevronRight size={16} />
            </button>
          )}
          
          {!rightOpen && (
            <button onClick={() => setRightOpen(true)} className="absolute top-4 right-4 z-50 p-2 bg-white/5 hover:bg-white/10 rounded border border-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors shadow-lg mt-12 xl:mt-0">
              <ChevronLeft size={16} />
            </button>
          )}

          {/* Sync Controls */}
          {isSplitMode && (
             <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#0A0C12]/80 backdrop-blur border border-white/10 p-1.5 rounded text-slate-300">
               <button onClick={() => window.dispatchEvent(new CustomEvent('global-reset'))} className="p-1 px-3 hover:text-white hover:bg-white/10 rounded cursor-pointer transition-colors flex items-center gap-2 text-xs font-mono tracking-widest"><RotateCcw size={14}/> 重新同步</button>
               <div className="w-[1px] h-4 bg-white/20"></div>
               <button onClick={() => window.dispatchEvent(new CustomEvent('global-play'))} className="p-1 px-3 text-cyan-400 hover:text-cyan-300 hover:bg-white/10 rounded cursor-pointer transition-colors flex items-center gap-2 text-xs font-mono"><Play size={14} className="fill-current"/> 双核运行</button>
               <button onClick={() => window.dispatchEvent(new CustomEvent('global-pause'))} className="p-1 px-3 text-yellow-500 hover:text-yellow-400 hover:bg-white/10 rounded cursor-pointer transition-colors flex items-center gap-2 text-xs font-mono"><Pause size={14} className="fill-current"/> 暂停</button>
             </div>
          )}

          <div className={`relative w-full h-full ${isSplitMode ? 'flex-1 border-b xl:border-b-0 xl:border-r border-white/10' : ''}`}>
            {isSplitMode && <div className="absolute top-4 left-4 z-40 bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest backdrop-blur uppercase mt-12 sm:mt-0">Core A: {algorithm.name}</div>}
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-cyan-500 animate-spin mb-4" />
                <p className="text-sm font-mono text-cyan-500 tracking-widest uppercase mb-2">Web Worker 线程激活</p>
                <p className="text-xs text-slate-500 font-mono">预计算千级动画帧中...</p>
              </div>
            ) : (
              <Visualizer steps={steps} speed={playbackSpeed} isGenerating={isGenerating} onStepChange={(step, index) => { setCurrentStep(step); setCurrentStepIndex(index); }} category={algorithm.category} algorithmId={algorithm.id} breakpoints={breakpoints} />
            )}
          </div>

          {isSplitMode && (
          <div className="relative w-full h-full flex-1">
            <div className="absolute top-4 left-4 z-40 bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest backdrop-blur uppercase">Core B: {secondaryAlgorithm.name}</div>
            {isGeneratingSecondary ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-t-emerald-500 animate-spin mb-4" />
                <p className="text-sm font-mono text-emerald-500 tracking-widest uppercase mb-2">Web Worker 并行加速</p>
                <p className="text-xs text-slate-500 font-mono">并行推演帧动画流中...</p>
              </div>
            ) : (
              <Visualizer steps={secondarySteps} speed={playbackSpeed} isGenerating={isGeneratingSecondary} category={secondaryAlgorithm.category} algorithmId={secondaryAlgorithm.id} breakpoints={breakpoints} />
            )}
          </div>
          )}
        </div>
        
        {/* Right Side: Documentation */}
        {rightOpen && (
          <aside 
            ref={rightPanelRef}
            className="flex-none bg-[#080A0F] flex flex-col z-20 relative"
            style={{ width: rightWidth }}
          >
             {/* Resizer Handle */}
             <div 
                className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-cyan-500/20 active:bg-cyan-500/40 z-50 flex items-center justify-center -translate-x-1/2 group"
                onMouseDown={handleResizeRight}
             >
                <div className="h-8 w-1 rounded-full bg-white/10 group-hover:bg-cyan-500/50" />
             </div>

             <div className="absolute top-4 right-4 z-50">
               <button onClick={() => setRightOpen(false)} className="text-slate-500 hover:text-white cursor-pointer">
                 <ChevronRight size={16} />
               </button>
             </div>
             
             <div className="flex-1 overflow-hidden flex flex-col min-h-0 w-full h-full">
               <div className="flex-1 overflow-hidden flex flex-col min-h-[50%]">
                 <Explanation algorithm={algorithm} currentStep={currentStep} breakpoints={breakpoints} onToggleBreakpoint={handleToggleBreakpoint} />
               </div>
               <VariableWatcher currentStep={currentStep} steps={steps} currentStepIndex={currentStepIndex} />
             </div>
          </aside>
        )}
      </main>

      {/* Bottom Status Bar */}
      <footer className="flex-none h-10 bg-[#0A0C12] border-t border-white/10 px-6 flex items-center justify-between text-[10px] font-mono relative z-20">
        <div className="flex gap-4">
          <span className="text-slate-500">等待输入</span>
          <span className="text-cyan-500 animate-pulse">█</span>
        </div>
        <div className="text-slate-500 uppercase">
          延迟: 4ms <span className="text-white/20 mx-2">{'//'}</span> 线程: 08 <span className="text-white/20 mx-2">{'//'}</span> 频率: 2.4GHZ
        </div>
      </footer>
    </div>
  );
}
