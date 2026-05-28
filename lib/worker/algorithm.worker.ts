import { algorithms } from '@/lib/algorithms';
import { SimulationStep } from '@/lib/algorithms/types';

self.onmessage = async (e: MessageEvent) => {
  const { algoId, arrayData, options } = e.data;
  
  const algorithm = algorithms.find(a => a.id === algoId);
  if (!algorithm) {
     self.postMessage({ error: 'Algorithm not found' });
     return;
  }
  
  try {
     const steps = algorithm.generateSteps(arrayData, options);

     // Artificial delay to allow user to see the worker computation indicator,
     // demonstrating the async Web Worker architecture and preventing UI blocking
     // in heavy calculations.
     let delay = 0;
     if (algorithm.category === 'Backtracking' || algorithm.category === 'Tree' || steps.length > 100) {
         delay = 800; // 800ms
     } else {
         delay = 300; // Minimum 300ms 
     }

     setTimeout(() => {
        // To optimize memory and transfer, we could do delta compression here
        self.postMessage({ steps });
     }, delay);
  } catch (error: any) {
     self.postMessage({ error: error?.message || 'Unknown error in worker' });
  }
};

export {};
