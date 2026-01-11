import React, { useState } from 'react';
import { ArrowRight, Leaf, ScanEye, X, ChevronDown, ChevronUp } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [activeSource, setActiveSource] = useState<number | null>(null);
  const [step, setStep] = useState<0 | 1>(0);

  const sources = [
    [
      "Hooykaas, M. J. D., Schilthuizen, M., Aten, C. J., Hemelaar, E. M., Albers, C. J., & Smeets, I. (2019). Identification skills in biodiversity professionals and laypeople: A gap in species literacy. Biological Conservation, 238, 108202.",
      "Hooykaas, M. J. D., Schilthuizen, M., Albers, C. J., & Smeets, I. (2022). Species identification skills predict in-depth knowledge about species. PloS one, 17(4), e0266972."
    ],
    [
      "Campos, D. S., Oliveira, R. F. D., Vieira, L. D. O., Bragança, P. H. N. D., Nunes, J. L. S., Guimarães, E. C., & Ottoni, F. P. (2023). Revisiting the debate: documenting biodiversity in the age of digital and artificially generated images. Web Ecology, 23(2), 135-144."
    ],
    [
      "Guerrero‐Casado, J., Murillo‐Jiménez, T., Carpio, A. J., Tortosa, F. S., & Serrano‐Rodríguez, R. (2025). Threats to conservation from artificial‐intelligence‐generated wildlife images and videos. Conservation Biology, e70138.",
      "Campos, D. S., Oliveira, R. F. D., Vieira, L. D. O., Bragança, P. H. N. D., Nunes, J. L. S., Guimarães, E. C., & Ottoni, F. P. (2023). Revisiting the debate: documenting biodiversity in the age of digital and artificially generated images. Web Ecology, 23(2), 135-144."
    ]
  ];

  const InfoBtn = ({ index }: { index: number }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setActiveSource(index);
      }}
      className="inline-flex items-center justify-center px-1.5 py-0.5 ml-1.5 align-top mt-[4px] rounded-[1px] bg-slate-200/80 text-slate-700 font-mono text-[9px] font-bold tracking-[0.1em] hover:bg-slate-900 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 shadow-sm leading-none"
      aria-label="Toon bron"
    >
      BRON
    </button>
  );

  return (
    <div className="fixed inset-0 h-[100dvh] w-screen bg-[#f4f5f0] text-slate-800 flex items-center justify-center p-4">
       <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
        ></div>

      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 relative overflow-hidden flex flex-col max-h-full transition-all duration-500 ease-in-out">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-slate-400 to-rose-400 opacity-50"></div>

          <div className="flex flex-col h-full p-6 sm:p-8 relative min-h-[420px]">
            
            <div className="shrink-0 flex flex-col items-center mb-4 sm:mb-6">
              <div className="mb-3 sm:mb-5">
                <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 relative shadow-sm">
                  <Leaf className="w-6 h-6 text-emerald-600 absolute ml-[-4px] mt-[-2px]" />
                  <ScanEye className="w-6 h-6 text-slate-600 absolute ml-[6px] mt-[4px] opacity-60" />
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight text-center">
                Echt of AI? Natuurbeeldentest
              </h1>
            </div>

            <div className="flex-1 relative w-full">
              
              <div 
                className={`
                  w-full flex flex-col h-full transition-all duration-700 ease-in-out
                  ${step === 0 
                    ? 'opacity-100 translate-y-0 relative z-10 pointer-events-auto' 
                    : 'opacity-0 -translate-y-4 absolute inset-0 z-0 pointer-events-none'
                  }
                `}
              >
                <div className="flex-1 flex flex-col gap-4 text-sm sm:text-base text-slate-600 font-serif leading-relaxed text-center">
                  <p>
                    Onderzoek toont aan dat de kennis van lokale natuur (<span className="italic">species literacy</span>) bij veel mensen laag is<InfoBtn index={0} />. Door onze betonnen en digitale leefomgeving wordt de natuur een steeds vreemder en abstract begrip.
                  </p>
                  <p>
                    Dit vergroot het risico dat AI-gegenereerde natuurbeelden voor echt worden aangezien<InfoBtn index={1} />. 
                    Tegelijkertijd maken steeds betere AI-modellen het zelfs voor biologen moeilijk om gegenereerde beelden te herkennen.
                  </p>
                </div>
                
                <div className="pt-6 mt-auto flex justify-center pb-2">
                  <button 
                    onClick={() => setStep(1)}
                    className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 hover:text-slate-800 hover:scale-110 transition-all flex items-center justify-center shadow-sm"
                    aria-label="Volgende"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div 
                className={`
                  w-full flex flex-col h-full transition-all duration-700 ease-in-out
                  ${step === 1 
                    ? 'opacity-100 translate-y-0 relative z-10 pointer-events-auto' 
                    : 'opacity-0 translate-y-4 absolute inset-0 z-0 pointer-events-none'
                  }
                `}
              >
                
                <div className="pb-4 flex justify-center">
                  <button 
                    onClick={() => setStep(0)}
                    className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition-all flex items-center justify-center shadow-sm"
                    aria-label="Terug"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col gap-4 text-sm sm:text-base text-slate-600 font-serif leading-relaxed text-center">
                  <p>
                   AI-beelden variëren van zeer realistische afbeeldingen die nauwelijks van echt te onderscheiden zijn, tot beelden die er overtuigend uitzien maar biologisch onmogelijk of onwaarschijnlijk zijn. 
                  </p>
                  <p>
                   Deze nepnatuurbeelden kunnen het beeld van de natuur verder verstoren en het verzamelen van betrouwbare gegevens voor biodiversiteitsonderzoek en natuurbescherming bemoeilijken<InfoBtn index={2} />.
                  </p>
                  <p className="font-bold text-slate-900 pt-2 text-base sm:text-lg leading-tight">
                     Herken jij de AI-gegenereerde natuurbeelden?
                  </p>
                </div>

                <div className="pt-6 mt-auto">
                  <button
                    onClick={onStart}
                    className="w-full group relative flex items-center justify-center px-6 py-3.5 text-base font-mono font-bold text-white transition-all duration-200 bg-slate-900 rounded-xl hover:bg-slate-800 hover:scale-[1.01] shadow-lg active:scale-95"
                  >
                    <span>START DE TEST</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

            </div>

            {activeSource !== null && (
              <div 
                className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm flex items-center justify-center p-6 fade-in"
                onClick={() => setActiveSource(null)}
              >
                <div 
                  className="bg-white border border-slate-200 shadow-xl rounded-xl p-6 max-w-sm relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => setActiveSource(null)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Bronnen
                  </h4>
                  <div className="text-slate-800 font-serif text-sm leading-relaxed flex flex-col gap-3">
                    {sources[activeSource].map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
      </div>
    </div>
  );
};

export default StartScreen;
