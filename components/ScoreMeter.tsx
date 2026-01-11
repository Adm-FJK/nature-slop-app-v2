import React from 'react';
import { Radar } from 'lucide-react';

interface ScoreMeterProps {
  score: number;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ score }) => {
  let colorClass = 'bg-amber-500';
  let textClass = 'text-amber-600';
  let statusText = 'Status: VERWARRING';
  
  if (score >= 80) {
    colorClass = 'bg-emerald-800';
    textClass = 'text-emerald-900';
    statusText = 'Status: SCHERP';
  } else if (score < 50) {
    colorClass = 'bg-rose-600';
    textClass = 'text-rose-700';
    statusText = 'Status: MISLEID';
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-slate-200 p-2 sm:p-4 relative overflow-hidden shrink-0">
       {/* Background Grid Pattern (Subtle) */}
       <div 
          className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        ></div>

      <div className="relative z-10 flex flex-col gap-1.5 sm:gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xs sm:text-base font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 sm:gap-2">
            <div className="relative flex items-center justify-center">
              <Radar className="w-4 h-4 sm:w-4 sm:h-4 relative z-10" />
              <div className="absolute inset-0 bg-current opacity-20 rounded-full animate-ping scale-150"></div>
            </div>
            <span>MISLEIDINGSMETER</span>
          </h2>
          <span className={`text-lg sm:text-2xl font-mono font-bold ${textClass}`}>
            {score}%
          </span>
        </div>
        
        {/* Clean Bar Container without Ticks */}
        <div className="h-2.5 sm:h-4 w-full bg-slate-100 border border-slate-200 rounded-full overflow-hidden relative shadow-inner">
          {/* The Fill Bar */}
          <div 
            className={`h-full absolute top-0 left-0 transition-all duration-700 ease-out rounded-full ${colorClass}`}
            style={{ width: `${score}%` }}
          >
             {/* Subtle internal glow/shine */}
             <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10"></div>
          </div>
        </div>
        
        {/* Only Status Text, no label below the bar */}
        <div className="flex justify-end items-end">
             <span className={`text-base sm:text-xl font-serif font-bold ${textClass} leading-none tracking-tight mt-0.5 sm:mt-1`}>
               {statusText}
             </span>
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter;