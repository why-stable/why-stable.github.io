import React from "react";

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
}

export default function LiquidGlass({ children, className = "" }: LiquidGlassProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 动态背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden">
        {/* 流动动画效果 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-bl from-white/15 to-transparent rounded-full blur-lg animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-28 h-28 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>
        
        {/* 边框光效 */}
        <div className="absolute inset-0 rounded-3xl border border-white/40 shadow-inner"></div>
        
        {/* 内容 */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
} 