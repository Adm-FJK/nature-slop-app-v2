import React from 'react';
import { ImageData, FeedbackData } from '../types';
import { Bot, TreeDeciduous, ArrowRight, Fingerprint, X } from 'lucide-react';

interface GameCardProps {
  image: ImageData;
  onGuess: (isSlop: boolean) => void;
  isLoading?: boolean;
  feedback?: FeedbackData | null;
  onNext?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ 
  image, 
  onGuess, 
  isLoading = false,
  feedback,
  onNext
}) => {
  const isFeedbackState = !!feedback;

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      {/* Unified Card Container */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 group relative min-h-0">
        
        {/* IMAGE SECTION - The "Clean Museum" Wall */}
        <div className="flex-1 relative w-full bg-slate-50 overflow-hidden min-h-0 flex flex-col items-center justify-center p-4 sm:p-8">
          
          {/* Subtle Background Texture (Clinical/Scientific feel) */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          ></div>

          {/* THE ARTIFACT (Image Wrapper) */}
          <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-500 ease-out">
            
            {/* The Physical Photo Container - flex-shrink allowed */}
            <div className={`relative flex items-center justify-center max-w-full max-h-full transition-all duration-500 ${isFeedbackState ? 'scale-95' : 'group-hover:scale-[1.01]'}`}>
              <img 
                src={image.path} 
                alt="Specimen" 
                className={`
                  max-w-full max-h-full object-contain 
                  shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] 
                  border-[6px] sm:border-[8px] border-white
                  bg-white
                  rounded-sm
                  transition-all duration-500
                  ${isFeedbackState ? 'blur-[1px] opacity-90' : ''}
                `}
              />

              {/* AI Scanline Effect (Overlay strictly on the photo) */}
              {isFeedbackState && image.is_slop && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden m-[6px] sm:m-[8px] z-20">
                   <div className="absolute inset-0 bg-red-500/10"></div>
                   <div className="w-full h-[2px] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] scanline"></div>
                </div>
              )}
            </div>
          </div>

          {/* FEEDBACK GLASS OVERLAY (Slides Up) */}
          <div className={`absolute bottom-0 left-0 right-0 z-30 glass-panel border-t border-white/50 transition-transform duration-500 ease-out flex flex-col items-center justify-center p-4 sm:p-6 text-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]
            ${isFeedbackState ? 'translate-y-0' : 'translate-y-full'}`}>
            
            {feedback && (
              <>
                <div className={`mb-1 sm:mb-2 p-1.5 sm:p-2 rounded-full ${feedback.isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {feedback.isCorrect ? <Fingerprint className="w-5 h-5 sm:w-6 sm:h-6" /> : <X className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                
                <h3 className={`text-lg sm:text-xl font-bold font-serif mb-0.5 sm:mb-1 ${feedback.isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                  {feedback.isCorrect ? 'Goed!' : 'Helaas'}
                </h3>
                
                <p className="text-slate-700 font-medium mb-3 sm:mb-4 max-w-xs leading-tight text-xs sm:text-sm">
                  {feedback.message}
                </p>

                <div className="flex items-center gap-2 sm:gap-3 w-full">
                  <div className={`font-mono font-bold text-xs sm:text-base px-2 sm:px-3 py-1.5 sm:py-2 rounded border ${feedback.scoreChange > 0 ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
                    {feedback.scoreChange > 0 ? '+' : ''}{feedback.scoreChange}%
                  </div>
                  <button
                    onClick={onNext}
                    className="flex-1 bg-slate-900 text-white py-2 sm:py-2.5 rounded-lg font-mono font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    VOLGENDE <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* SPLIT CONTROLS (Bottom Bar) */}
        <div className="h-14 sm:h-16 shrink-0 flex border-t border-slate-100 relative z-40 bg-white shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
          {/* Nature Button */}
          <button
            onClick={() => onGuess(false)}
            disabled={isFeedbackState}
            className="flex-1 relative overflow-hidden group/nature hover:bg-emerald-50 transition-colors duration-300 disabled:opacity-50"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-10">
              <TreeDeciduous className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover/nature:text-emerald-600 transition-colors" />
              <span className="font-mono text-[10px] sm:text-sm font-bold text-slate-500 group-hover/nature:text-emerald-800 tracking-wider">Echt</span>
            </div>
            {/* Hover Decor */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover/nature:scale-x-100 transition-transform duration-300"></div>
          </button>

          {/* Vertical Divider */}
          <div className="w-px bg-slate-200"></div>

          {/* AI Button */}
          <button
            onClick={() => onGuess(true)}
            disabled={isFeedbackState}
            className="flex-1 relative overflow-hidden group/ai hover:bg-rose-50 transition-colors duration-300 disabled:opacity-50"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 sm:gap-1 z-10">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover/ai:text-rose-600 transition-colors" />
              <span className="font-mono text-[10px] sm:text-sm font-bold text-slate-500 group-hover/ai:text-rose-800 tracking-wider">AI</span>
            </div>
            {/* Hover Decor */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-rose-500 scale-x-0 group-hover/ai:scale-x-100 transition-transform duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;