import React, { useState } from 'react';
import { RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ score, onRestart }) => {
  const [showLevels, setShowLevels] = useState(false);

  const getConclusion = (finalScore: number) => {
    if (finalScore >= 80) return "Uitstekend! Je laat je niet snel misleiden";
    if (finalScore >= 50) return "Redelijk. Je laat je soms misleiden.";
    if (finalScore >= 30) return "Je laat je vaak misleiden.";
    return "Je laat je vaak misleiden.";
  };

  const levels = [
    { title: "Authentiek", desc: "Natuurfoto’s met geen of minimale bewerking." },
    { title: "Bewerkt", desc: "Echte natuurfoto’s die sterk zijn bewerkt." },
    { title: "Realistisch AI", desc: "AI-beelden die (bijna) niet van echt te onderscheiden zijn." },
    { title: "Onrealistisch AI", desc: "AI-beelden die biologisch onmogelijk of onwaarschijnlijk zijn." }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-10 shadow-2xl text-center fade-in border border-slate-100 relative overflow-hidden flex flex-col max-h-[85dvh] overflow-y-auto">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-yellow-500 to-rose-500"></div>
      
      <div className="shrink-0">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-800 mb-2">Resultaat</h2>
        
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 flex items-center justify-center mt-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="8"
            />
            <circle
              cx="50%"
              cy="50%"
              r="44%"
              fill="none"
              stroke={score > 50 ? "#10b981" : "#f43f5e"}
              strokeWidth="8"
              strokeDasharray="276"
              style={{ strokeDashoffset: 276 * (1 - score / 100) }}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-mono font-bold text-slate-800">{score}%</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-1">Score</span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">
          <p className="text-base sm:text-lg text-slate-700 font-serif leading-relaxed italic">
              "{getConclusion(score)}"
          </p>
        </div>
      </div>

      {/* De-escalated Accordion Section */}
      <div className="mb-6 text-center pt-2 flex flex-col items-center">
        <p className="text-base text-slate-800 font-serif leading-relaxed px-4">
         Ben je misleid? Dat ligt niet alleen aan jou. AI-gegenereerde beelden worden steeds overtuigender.
          Wat maakt een natuurafbeelding “echt”?
        </p>
        
        <button 
          onClick={() => setShowLevels(!showLevels)}
          className="flex items-center justify-center gap-2 py-3 px-4 text-slate-800 hover:text-emerald-700 transition-all group w-fit"
        >
          <span className="text-sm font-serif italic border-b border-transparent group-hover:border-emerald-200 transition-all">
            Ontdek 4 categorieën van (on)echtheid
          </span>
          {showLevels ? (
            <ChevronUp className="w-5 h-5 shrink-0 text-slate-900" />
          ) : (
            <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform shrink-0 text-slate-900" />
          )}
        </button>

        <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${showLevels ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <div className="space-y-6 px-4 pb-6 max-w-md mx-auto text-left">
            {levels.map((level, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded bg-emerald-50 text-emerald-600 font-mono text-[10px] font-bold border border-emerald-100 shadow-sm">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest">{level.title}</h4>
                  <p className="text-sm text-slate-600 font-serif leading-snug mt-0.5">{level.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0 flex flex-col sm:flex-row gap-4 justify-center mt-auto pb-2">
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-slate-900 text-white rounded-lg font-mono font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
        >
          <RefreshCcw className="w-4 h-4" /> OPNIEUW STARTEN
        </button>
      </div>
    </div>
  );
};

export default GameOver;
