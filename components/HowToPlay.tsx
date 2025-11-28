import React from 'react';

interface HowToPlayProps {
  onBack: () => void;
}

const HowToPlay: React.FC<HowToPlayProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-4xl w-full border-4 border-black">
        <h1 className="text-4xl font-bold text-center mb-8 font-mono">How To Play Game</h1>
        
        {/* The 4-panel grid from the sketch */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black mb-8">
          
          {/* Panel 1: Exit doors */}
          <div className="border-b-4 md:border-b-0 md:border-r-4 border-black p-6 flex flex-col items-center text-center bg-gray-50 min-h-[200px]">
            <h3 className="text-xl font-bold mb-2">Exit doors!</h3>
            <p className="text-gray-600 mb-4">(space key)</p>
            <div className="flex items-end gap-4 mt-auto">
               {/* Rabbit with Body */}
               <div className="flex flex-col items-center">
                   <div className="w-8 h-8 border-2 border-black relative z-10 bg-white">
                      <div className="absolute -top-3 left-1 w-2 h-4 border border-black bg-white"></div>
                      <div className="absolute -top-3 right-1 w-2 h-4 border border-black bg-white"></div>
                   </div>
                   <div className="w-6 h-5 border-2 border-t-0 border-black bg-white relative z-0">
                       <div className="absolute top-1 -left-2 w-3 h-1 bg-black"></div>
                       <div className="absolute top-1 -right-2 w-3 h-1 bg-black"></div>
                   </div>
                   <div className="flex gap-2">
                       <div className="w-1 h-3 bg-black"></div>
                       <div className="w-1 h-3 bg-black"></div>
                   </div>
               </div>
               {/* Door */}
               <div className="w-12 h-20 bg-amber-800 border-2 border-black rounded-t-lg relative">
                 <div className="absolute right-2 top-10 w-2 h-2 bg-yellow-400 rounded-full"></div>
               </div>
            </div>
          </div>

          {/* Panel 2: Eat Carrots */}
          <div className="border-b-4 border-black p-6 flex flex-col items-center text-center bg-gray-50 min-h-[200px]">
            <h3 className="text-xl font-bold mb-2">Eat carrots!</h3>
            <p className="text-gray-600 mb-4">(space key)</p>
            <div className="flex items-center gap-4 mt-auto">
                {/* Rabbit eating */}
               <div className="flex flex-col items-center">
                   <div className="w-8 h-8 border-2 border-black relative z-10 bg-white">
                      <div className="absolute -top-3 left-1 w-2 h-4 border border-black bg-white"></div>
                      <div className="absolute -top-3 right-1 w-2 h-4 border border-black bg-white"></div>
                      <div className="absolute top-4 -right-4 text-orange-500 font-bold animate-bounce text-2xl">crunch</div>
                   </div>
                   <div className="w-6 h-5 border-2 border-t-0 border-black bg-white relative z-0">
                        <div className="absolute top-1 -left-1 w-3 h-1 bg-black rotate-45"></div>
                   </div>
                   <div className="flex gap-2">
                       <div className="w-1 h-3 bg-black"></div>
                       <div className="w-1 h-3 bg-black"></div>
                   </div>
               </div>
            </div>
          </div>

          {/* Panel 3: Defeat Robots */}
          <div className="border-b-4 md:border-b-0 md:border-r-4 border-black p-6 flex flex-col items-center text-center bg-gray-50 min-h-[200px]">
            <h3 className="text-xl font-bold mb-2">Defeat robots!</h3>
            <p className="text-gray-600 mb-4">(Up arrow key - Jump)</p>
            <div className="flex flex-col items-center mt-auto">
                {/* Rabbit Jumping */}
               <div className="flex flex-col items-center mb-2">
                   <div className="w-8 h-8 border-2 border-black relative z-10 bg-white">
                      <div className="absolute -top-3 left-1 w-2 h-4 border border-black bg-white"></div>
                      <div className="absolute -top-3 right-1 w-2 h-4 border border-black bg-white"></div>
                   </div>
                   <div className="w-6 h-5 border-2 border-t-0 border-black bg-white relative z-0"></div>
                   <div className="flex gap-2">
                       <div className="w-1 h-3 bg-black"></div>
                       <div className="w-1 h-3 bg-black"></div>
                   </div>
               </div>
               {/* Robot */}
               <div className="w-10 h-10 bg-red-500 border-2 border-black flex items-center justify-center">
                  <div className="w-6 h-2 bg-black"></div>
               </div>
            </div>
          </div>

          {/* Panel 4: Swim and Bop Fish */}
          <div className="p-6 flex flex-col items-center text-center bg-gray-50 min-h-[200px]">
            <h3 className="text-xl font-bold mb-2">Swim and bop fish!</h3>
            <p className="text-gray-600 mb-4">(Both space key)</p>
            <div className="relative w-full h-24 bg-blue-100 border border-blue-300 mt-auto flex items-center justify-center">
               <div className="absolute top-2 left-1/4">
                    {/* Swimming Rabbit (Horizontal-ish) */}
                    <div className="flex items-center rotate-[-15deg]">
                         <div className="w-6 h-6 border-2 border-black relative bg-white">
                            <div className="absolute -top-2 left-1 w-1 h-3 border border-black bg-white"></div>
                         </div>
                         <div className="w-4 h-4 border-2 border-l-0 border-black bg-white"></div>
                    </div>
               </div>
               <span className="font-bold text-blue-800 ml-12">BOP!</span>
            </div>
          </div>

        </div>

        {/* Controls Diagram from Sketch */}
        <div className="border-t-4 border-gray-300 pt-6">
            <h3 className="text-2xl font-bold text-gray-500 mb-4">Controls Schema</h3>
            <div className="flex justify-center items-center gap-2">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-2 border-black rounded flex items-center justify-center font-bold mb-1">↑</div>
                    <span className="text-xs">Jump/Swim Up</span>
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 mb-4">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-2 border-black rounded flex items-center justify-center font-bold mb-1">←</div>
                    <span className="text-xs">Left</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-2 border-black rounded flex items-center justify-center font-bold mb-1">↓</div>
                    <span className="text-xs">Down</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-2 border-black rounded flex items-center justify-center font-bold mb-1">→</div>
                    <span className="text-xs">Right</span>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-48 h-12 border-2 border-black rounded flex items-center justify-center font-bold">SPACE (Action)</div>
            </div>
        </div>

        <button 
          onClick={onBack}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 w-full font-bold text-xl shadow-lg border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HowToPlay;