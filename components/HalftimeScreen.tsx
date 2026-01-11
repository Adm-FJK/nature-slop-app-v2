import React from 'react';
import { ArrowRight, Coffee } from 'lucide-react';

interface HalftimeScreenProps {
  score: number;
  onContinue: () => void;
}

const HalftimeScreen: React.FC<HalftimeScreenProps> = ({ score, onContinue }) => {
  const getMessage = (currentScore: number) => {
    if (currentScore >= 75) return "Wow! Je gaat als een speer. Je laat je niet snel misleiden.";
    if (currentScore >= 50) return "Je bent goed op weg, maar wordt soms misleid. Blijf scherp!";
    if (currentScore >= 30) return "Je wordt vaak misleid. Het is lastig, hè?";
    return "Je wordt vaak misleid. Het is lastig, hè?";
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl text-center fade-in border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200"></div>
      
      <div className="mb-6 p-4 bg-slate-50 rounded-full border border-slate-100">
        <Coffee className="w-8 h-8 text-slate-600" />
      </div>

      <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">
        Halverwege
      </h2>

      <div className="flex flex-col items-center mb-6">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">
          Jouw tussentijdse score
        </span>
        <div className="text-4xl font-mono font-bold text-slate-900">
          {score}%
        </div>
      </div>
      
      <p className="text-lg text-slate-600 font-serif leading-relaxed mb-8 max-w-xs mx-auto">
        {getMessage(score)}
      </p>

      <button
        onClick={onContinue}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-mono font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group shadow-lg"
      >
        VOLGENDE 6 AFBEELDINGEN <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      <div className="mt-6 text-xs text-slate-400 font-mono uppercase tracking-widest">
        Nog 6 te gaan
      </div>
    </div>
  );
};

export default HalftimeScreen;