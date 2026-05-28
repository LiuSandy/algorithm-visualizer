import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { SimulationStep } from '@/lib/algorithms/types';

export function CanvasVisualizer({ step }: { step: SimulationStep }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  
  useEffect(() => {
    // 异步初始化 PIXI Application，用于规避部分服务端渲染或 hook 约束
    let isMounted = true;
    
    const initPixi = async () => {
        if (!containerRef.current) return;
        
        const app = new PIXI.Application();
        await app.init({
            width: containerRef.current.clientWidth,
            height: 300,
            backgroundColor: 0x0A0C12,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        if (!isMounted) {
            app.destroy(true);
            return;
        }

        containerRef.current.appendChild(app.canvas);
        appRef.current = app;
    };
    
    initPixi();

    return () => {
      isMounted = false;
      if (appRef.current) {
        appRef.current.destroy(true); // cleanup
        appRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // 渲染或更新数据
    if (!appRef.current) return;
    
    const app = appRef.current;
    
    // Clear previous
    // PIXI 8.x: app.stage.removeChildren()
    if (app.stage.children.length > 0) {
        app.stage.removeChildren();
    }
    
    // 我们这里仅做一个 2D 矩形绘制的 POC 演示
    const elements = step.elements || [];
    const containerWidth = app.canvas.width / app.renderer.resolution;
    const containerHeight = app.canvas.height / app.renderer.resolution;
    
    const barWidth = Math.max(1, (containerWidth - 40) / Math.max(10, elements.length) - 2);
    const maxVal = Math.max(...elements.map(e => e.value), 1);
    
    elements.forEach((el, index) => {
        const h = (el.value / maxVal) * (containerHeight - 50);
        const x = 20 + index * (barWidth + 2);
        const y = containerHeight - h - 20;
        
        const graphics = new PIXI.Graphics();
        
        // 颜色映射
        let color = 0x1E293B; // default slate-800
        if (el.state === 'comparing') color = 0xF59E0B; // amber-500
        else if (el.state === 'swapping') color = 0xEC4899; // pink-500
        else if (el.state === 'sorted') color = 0x10B981; // emerald-500
        else if (el.state === 'pivot') color = 0x8B5CF6; // violet-500
        
        graphics.rect(x, y, barWidth, h);
        graphics.fill({ color });
        
        app.stage.addChild(graphics);
    });
    
  }, [step]);

  return (
    <div className="w-full h-[300px] border border-white/5 rounded relative bg-[#0A0C12] overflow-hidden" ref={containerRef}>
      <div className="absolute top-2 left-2 px-2 py-1 bg-cyan-900/50 text-cyan-400 border border-cyan-500/30 text-[9px] font-mono rounded">硬件加速渲染节点 (WebGL) Active</div>
    </div>
  );
}
