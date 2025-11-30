import React, { useState, useEffect } from 'react';
import GameLevel from './components/GameLevel';
import CharacterSelect from './components/CharacterSelect';
import HowToPlay from './components/HowToPlay';
import { Screen, EntityType } from './types';
import { LEVELS } from './constants';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.MENU);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPortrait, setIsPortrait] = useState(false);
  
  // Check orientation logic
  useEffect(() => {
    const checkOrientation = () => {
      // Simple check: if height > width, it's portrait.
      // We mainly care about mobile/tablet devices.
      const isPortraitMode = window.innerHeight > window.innerWidth;
      setIsPortrait(isPortraitMode);
    };

    window.addEventListener('resize', checkOrientation);
    checkOrientation(); // Initial check

    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  // Handlers
  const startGame = () => {
    setCurrentLevelIndex(0);
    setLives(3); // Reset lives to 3 on new game
    setCurrentScreen(Screen.GAME);
  };

  const goToHowToPlay = () => setCurrentScreen(Screen.HOW_TO_PLAY);
  const goToCharacterSelect = () => setCurrentScreen(Screen.CHARACTER_SELECT);
  const goBackToMenu = () => setCurrentScreen(Screen.MENU);
  
  const handleLevelComplete = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      // Go to next level
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      // All levels done
      setCurrentScreen(Screen.WIN);
    }
  };

  // Logic for when player "dies" in the level
  const handlePlayerDied = () => {
     if (lives > 1) {
         setLives(prev => prev - 1);
         // Decrementing lives will change the key of GameLevel, causing it to remount (reset)
     } else {
         setLives(0);
         setCurrentScreen(Screen.GAME_OVER);
     }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.MENU:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
             <div className="bg-white p-12 rounded-2xl shadow-2xl border-4 border-black max-w-lg w-full text-center">
                
                {/* Super Rabbit Boy Logoish thing - NOW WITH BODY! */}
                <div className="flex flex-col items-center justify-center mb-10 scale-125 mt-8">
                    {/* Head */}
                    <div className="w-20 h-20 border-4 border-black bg-white relative z-10">
                         <div className="absolute -top-8 left-2 w-4 h-10 bg-white border-4 border-black border-b-0"></div>
                         <div className="absolute -top-8 right-2 w-4 h-10 bg-white border-4 border-black border-b-0"></div>
                         <div className="absolute top-6 left-4 w-3 h-6 bg-black"></div>
                         <div className="absolute top-6 right-4 w-3 h-6 bg-black"></div>
                         <div className="absolute bottom-4 left-6 right-6 h-2 bg-black rounded-full"></div>
                    </div>
                    {/* Body */}
                    <div className="w-12 h-12 border-4 border-t-0 border-black bg-white relative -mt-1 z-0">
                        {/* Arms */}
                         <div className="absolute top-2 -left-6 w-8 h-3 bg-black rounded-full rotate-12"></div>
                         <div className="absolute top-2 -right-6 w-8 h-3 bg-black rounded-full -rotate-12"></div>
                    </div>
                    {/* Legs - Straighter and Thinner */}
                    <div className="flex gap-4 -mt-1">
                         <div className="w-2 h-8 bg-black"></div>
                         <div className="w-2 h-8 bg-black"></div>
                    </div>
                </div>

                <h1 className="text-5xl font-extrabold mb-8 tracking-tighter text-gray-900 drop-shadow-sm">
                  SUPER <br/> RABBIT BOY
                </h1>
                
                <div className="space-y-4">
                  <button 
                    onClick={goToCharacterSelect}
                    className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xl rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                  >
                    PLAY
                  </button>
                  <button 
                    onClick={goToHowToPlay}
                    className="w-full py-3 bg-blue-400 hover:bg-blue-300 text-white font-bold text-lg rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                  >
                    HOW TO PLAY
                  </button>
                </div>
             </div>
          </div>
        );

      case Screen.CHARACTER_SELECT:
        return <CharacterSelect onBack={goBackToMenu} onSelect={startGame} />;

      case Screen.HOW_TO_PLAY:
        return <HowToPlay onBack={goBackToMenu} />;

      case Screen.GAME:
        return (
          <GameLevel 
            key={`${currentLevelIndex}-${lives}`} // Force remount when level OR lives change
            levelData={LEVELS[currentLevelIndex]}
            lives={lives}
            onGameOver={handlePlayerDied} 
            onWin={handleLevelComplete}
            onExit={goBackToMenu}
          />
        );

      case Screen.WIN:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-green-400">
            <div className="bg-white p-8 rounded-xl border-4 border-black text-center shadow-2xl max-w-lg w-full">
              <h1 className="text-6xl font-bold mb-4">YOU WIN!</h1>
              <p className="text-xl mb-8">All levels complete!</p>
              <div className="flex justify-center mb-8 gap-4">
                 <div className="text-6xl animate-bounce delay-100">🥕</div>
                 <div className="text-6xl animate-bounce delay-200">🥕</div>
                 <div className="text-6xl animate-bounce delay-300">🥕</div>
              </div>
              <button 
                onClick={goBackToMenu}
                className="w-full px-8 py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 shadow-lg"
              >
                Back to Menu
              </button>
            </div>
          </div>
        );

      case Screen.GAME_OVER:
        return (
           <div className="flex flex-col items-center justify-center min-h-screen bg-red-500">
            <div className="bg-white p-8 rounded-xl border-4 border-black text-center shadow-2xl max-w-lg w-full">
              <h1 className="text-6xl font-bold mb-4 text-red-600">GAME OVER</h1>
              <p className="text-xl mb-8">Try again?</p>
              <button 
                onClick={startGame} // Restart from Level 1
                className="w-full px-8 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 border-b-4 border-green-700 active:border-b-0 active:translate-y-1 mb-4"
              >
                Retry from Level 1
              </button>
               {/* Option to retry current level? For now just full restart or quit */}
              <button 
                onClick={goBackToMenu}
                className="block mt-4 text-gray-500 hover:underline w-full"
              >
                Quit to Menu
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="font-sans text-gray-900 overflow-hidden">
      {/* Landscape Enforcement Overlay */}
      {isPortrait && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center text-white p-8 text-center backdrop-blur-md">
           <div className="text-6xl mb-4 animate-spin-slow">↻</div>
           <h2 className="text-3xl font-bold mb-2">Please Rotate Device</h2>
           <p className="text-gray-300">Super Rabbit Boy works best in landscape mode!</p>
        </div>
      )}
      
      {renderScreen()}
    </div>
  );
};

export default App;