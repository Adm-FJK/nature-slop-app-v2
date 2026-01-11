import React, { useState, useCallback, useEffect } from 'react';
import { IMAGES_DATA, INITIAL_SCORE, MAX_ROUNDS } from './constants';
import { GameState, ImageData, FeedbackData } from './types';
import ScoreMeter from './components/ScoreMeter';
import GameCard from './components/GameCard';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';
import HalftimeScreen from './components/HalftimeScreen';
import { Sprout, Loader2 } from 'lucide-react';

function App() {
  const [score, setScore] = useState(INITIAL_SCORE);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [gameState, setGameState] = useState<GameState>('intro');
  
  // De afbeeldingen voor de huidige sessie (12 stuks)
  const [currentGameImages, setCurrentGameImages] = useState<ImageData[]>([]);
  
  // Feedback state object
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackData | null>(null);

  // Helper om te schudden
  const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Initialize game with "Option A" logic: Fixed ratio 8 fakes / 4 reals
  const initializeGame = useCallback(() => {
    setScore(INITIAL_SCORE);
    setCurrentRoundIndex(0);
    setCurrentFeedback(null);

    // Filter alle beschikbare data
    const allReal = IMAGES_DATA.filter(img => !img.is_slop);
    const allFake = IMAGES_DATA.filter(img => img.is_slop);

    // Schud beide lijsten
    const shuffledReal = shuffleArray(allReal);
    const shuffledFake = shuffleArray(allFake);

    // Pak de juiste aantallen voor de verhouding 8 fakes / 4 echt
    // We pakken 8 van de 9 beschikbare fakes en 4 van de 10 echte
    const selectedFake = shuffledFake.slice(0, 8);
    const selectedReal = shuffledReal.slice(0, 4);

    // Combineer en hussel de definitieve set van 12
    const finalSelection = shuffleArray([...selectedFake, ...selectedReal]);

    setCurrentGameImages(finalSelection);
  }, []);

  // OPTIE 3: PRE-SHUFFLE
  // We bereiden de afbeeldingen direct voor bij het laden van de app (terwijl de gebruiker de intro leest)
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleStartGame = () => {
    // We hoeven initializeGame niet opnieuw aan te roepen omdat useEffect dit al heeft gedaan
    setGameState('playing');
  };

  const handleRestart = () => {
    // Voor een nieuwe sessie schudden we de kaarten opnieuw
    initializeGame();
    setGameState('playing');
  };

  const handleGuess = (guessedIsSlop: boolean) => {
    const currentImage = currentGameImages[currentRoundIndex];
    if (!currentImage) return;

    const isActuallySlop = currentImage.is_slop;
    let newScore = score;
    let change = 0;
    let message = '';
    let isCorrect = false;

    if (guessedIsSlop === isActuallySlop) {
      change = 5;
      newScore += change;
      message = "Correct!";
      isCorrect = true;
    } else {
      if (isActuallySlop && !guessedIsSlop) {
        change = -10;
        message = "Dit is gegenereerd door AI.";
      } else {
        change = -15;
        message = "Fout, dit was echt!";
      }
      newScore += change;
      isCorrect = false;
    }

    newScore = Math.max(0, Math.min(100, newScore));
    setScore(newScore);
    
    setCurrentFeedback({
      isCorrect,
      scoreChange: change,
      message
    });
    setGameState('feedback');
  };

  const handleNextRound = () => {
    setCurrentFeedback(null);
    const nextIndex = currentRoundIndex + 1;
    const halfwayPoint = MAX_ROUNDS / 2;

    if (nextIndex === halfwayPoint) {
      setGameState('halftime');
    } else if (nextIndex < MAX_ROUNDS) {
      setCurrentRoundIndex(nextIndex);
      setGameState('playing');
    } else {
      setGameState('finished');
    }
  };

  const handleContinueFromHalftime = () => {
    setCurrentRoundIndex(prev => prev + 1);
    setGameState('playing');
  };

  const currentImage = currentGameImages[currentRoundIndex];

  if (gameState === 'intro') {
    return <StartScreen onStart={handleStartGame} />;
  }

  return (
    <div className="h-[100dvh] w-full flex flex-col overflow-hidden bg-[#f4f5f0]">
      <header className="shrink-0 w-full flex items-center justify-between px-4 py-2 sm:py-3 sm:px-6 border-b border-slate-200/60 bg-[#f4f5f0] z-20">
        <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => {
                initializeGame(); // Reset ook bij teruggaan naar intro
                setGameState('intro');
              }}
              className="flex items-center justify-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-[1px] bg-slate-200/80 text-slate-700 font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.1em] hover:bg-slate-900 hover:text-white transition-all duration-200 active:scale-95 shadow-sm"
              title="Over deze test"
            >
              HOME
            </button>
            <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-900">
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
                <h1 className="text-sm sm:text-lg font-serif font-bold tracking-tight">
                Natuurbeeldentest: Echt of AI?
                </h1>
            </div>
        </div>
        <div className="text-slate-400 font-mono text-[10px] sm:text-xs font-bold bg-slate-100 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
            {Math.min(currentRoundIndex + 1, MAX_ROUNDS)}/{MAX_ROUNDS}
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full max-w-xl mx-auto px-2 sm:px-4 pb-2 sm:pb-4 min-h-0">
        <div className="h-2 sm:h-4 shrink-0"></div>

        {gameState !== 'finished' && gameState !== 'halftime' && (
          <div className="shrink-0 mb-2 sm:mb-4">
             <ScoreMeter score={score} />
          </div>
        )}

        {/* OPTIE 1: DUBBELE CHECK GUARD */}
        {/* We checken expliciet of currentGameImages gevuld is en of currentImage bestaat */}
        {(gameState === 'playing' || gameState === 'feedback') ? (
          currentGameImages.length > 0 && currentImage ? (
            <div className="flex-1 min-h-0 w-full fade-in flex flex-col">
               <GameCard 
                image={currentImage} 
                onGuess={handleGuess}
                feedback={currentFeedback}
                onNext={handleNextRound}
              />
            </div>
          ) : (
            // Fallback voor de "Race Condition" milliseconde
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 font-mono gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              <p className="text-xs uppercase tracking-widest">Sessie voorbereiden...</p>
            </div>
          )
        ) : null}

        {gameState === 'halftime' && (
           <div className="flex-1 flex items-center justify-center overflow-y-auto">
             <HalftimeScreen score={score} onContinue={handleContinueFromHalftime} />
           </div>
        )}

        {gameState === 'finished' && (
          <div className="flex-1 flex items-center justify-center overflow-y-auto">
             <GameOver score={score} onRestart={handleRestart} />
          </div>
        )}
      </main>
      
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none -z-10"></div>
    </div>
  );
}

export default App;
