import React from 'react';
import { Screen } from '../types';

interface CharacterSelectProps {
  onBack: () => void;
  onSelect: () => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onBack, onSelect }) => {
  // Mock data based on the grid in the sketch
  const characters = [
    { id: 1, name: 'Super Rabbit Boy', locked: false, isHero: true },
    { id: 2, name: 'Locked', locked: true },
    { id: 3, name: 'Locked', locked: true },
    { id: 4, name: 'Locked', locked: true },
    { id: 5, name: 'Locked', locked: true },
    { id: 6, name: 'Locked', locked: true },
    { id: 7, name: 'Locked', locked: true },
    { id: 8, name: 'Locked', locked: true },
    { id: 9, name: 'Mystery?', locked: true, mystery: true },
    { id: 10, name: 'Mystery?', locked: true, mystery: true },
    { id: 11, name: 'Mystery?', locked: true, mystery: true },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl w-full border-4 border-gray-800 relative">
        
        {/* Sketch: "Characters (Some only appear in different levels)" */}
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 uppercase tracking-wider">Characters</h2>
        <p className="text-center text-gray-500 mb-8 italic">(Some only appear in different levels)</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {characters.map((char) => (
            <div 
              key={char.id}
              onClick={() => !char.locked && onSelect()}
              className={`
                aspect-square border-4 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 overflow-hidden
                ${char.locked ? 'bg-gray-200 border-gray-400 cursor-not-allowed' : 'bg-white border-black hover:bg-yellow-50'}
              `}
            >
              {char.locked ? (
                 char.mystery ? (
                    <span className="text-4xl text-gray-400 font-bold">?</span>
                 ) : (
                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                 )
              ) : (
                <>
                  {/* Super Rabbit Boy Icon with Body */}
                  <div className="relative flex flex-col items-center mt-2">
                      {/* Head */}
                      <div className="w-8 h-8 border-2 border-black bg-white relative z-10">
                        <div className="absolute -top-3 left-0 w-2 h-4 border-2 border-black border-b-0 bg-white"></div>
                        <div className="absolute -top-3 right-0 w-2 h-4 border-2 border-black border-b-0 bg-white"></div>
                        <div className="absolute top-2 left-1 w-1 h-2 bg-black"></div>
                        <div className="absolute top-2 right-1 w-1 h-2 bg-black"></div>
                        <div className="absolute bottom-1 left-2 right-2 h-0.5 bg-black"></div>
                      </div>
                      {/* Body */}
                      <div className="w-6 h-5 border-2 border-t-0 border-black bg-white relative -mt-0.5 z-0">
                          {/* Arms */}
                          <div className="absolute top-1 -left-2 w-3 h-1 bg-black rotate-12"></div>
                          <div className="absolute top-1 -right-2 w-3 h-1 bg-black -rotate-12"></div>
                      </div>
                      {/* Legs - Straighter */}
                      <div className="flex gap-2 -mt-0.5">
                          <div className="w-1 h-2.5 bg-black"></div>
                          <div className="w-1 h-2.5 bg-black"></div>
                      </div>
                  </div>
                  <span className="text-xs font-bold text-center px-1 mt-1 leading-tight">Super Rabbit Boy</span>
                </>
              )}
            </div>
          ))}
        </div>
        
        {/* Decorative "New!!!" burst from sketch */}
        <div className="absolute -top-6 -left-6 bg-yellow-300 text-red-600 font-bold p-4 rounded-full border-4 border-black rotate-[-12deg] shadow-lg animate-pulse">
            New!!!
        </div>

        <button 
          onClick={onBack}
          className="mt-8 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 w-full font-bold"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default CharacterSelect;