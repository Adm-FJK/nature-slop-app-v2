import React from 'react';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

interface FeedbackOverlayProps {
  message: string;
  isCorrect: boolean;
  scoreChange: number;
  onNext: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ message, isCorrect, scoreChange, onNext }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center transform transition-all scale-100">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {isCorrect ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          {isCorrect ? 'Correct!' : 'Helaas...'}
        </h3>
        
        <p className="text-slate-600 mb-6 text-lg">
          {message}
        </p>

        <div className={`inline-block px-4 py-2 rounded-full font-bold text-lg mb-8 ${scoreChange >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          {scoreChange > 0 ? '+' : ''}{scoreChange}%
        </div>

        <button
          onClick={onNext}
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          Volgende <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackOverlay;