import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Entity, EntityType, PlayerState, LevelData } from '../types';
import { 
  GRAVITY, JUMP_FORCE, SPEED, GROUND_FRICTION, AIR_FRICTION, 
  WATER_GRAVITY, WATER_FRICTION, SWIM_FORCE, CANVAS_WIDTH, CANVAS_HEIGHT,
  CARROT_JUMP_BONUS, RUN_JUMP_BONUS
} from '../constants';

interface GameLevelProps {
  levelData: LevelData;
  onGameOver: () => void;
  onWin: () => void;
  onExit: () => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ levelData, onGameOver, onWin, onExit }) => {
  // Game State Refs (for physics loop)
  const playerRef = useRef<PlayerState>({
    x: levelData.startPos.x,
    y: levelData.startPos.y,
    w: 40, 
    h: 64, 
    vx: 0,
    vy: 0,
    isGrounded: false,
    isSwimming: false,
    facingRight: true,
    carrotsCollected: 0,
    hasKey: false
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const enemiesRef = useRef<Entity[]>(JSON.parse(JSON.stringify(levelData.enemies)));
  const itemsRef = useRef<Entity[]>(JSON.parse(JSON.stringify(levelData.items)));
  const requestRef = useRef<number>();
  const frameRef = useRef<number>(0);
  
  // React State for rendering
  const [renderPlayer, setRenderPlayer] = useState<PlayerState>(playerRef.current);
  const [renderEnemies, setRenderEnemies] = useState<Entity[]>(enemiesRef.current);
  const [renderItems, setRenderItems] = useState<Entity[]>(itemsRef.current);

  // AABB Collision Detection
  const checkCollision = (r1: {x: number, y: number, w: number, h: number}, r2: {x: number, y: number, w: number, h: number}) => {
    return (
      r1.x < r2.x + r2.w &&
      r1.x + r1.w > r2.x &&
      r1.y < r2.y + r2.h &&
      r1.y + r1.h > r2.y
    );
  };

  const update = useCallback(() => {
    const player = playerRef.current;
    const enemies = enemiesRef.current;
    const items = itemsRef.current;
    const keys = keysRef.current;
    
    frameRef.current++;

    // --- Player Movement ---
    if (keys['ArrowLeft']) {
      player.vx -= 1;
      player.facingRight = false;
    }
    if (keys['ArrowRight']) {
      player.vx += 1;
      player.facingRight = true;
    }
    
    // Check if swimming
    let inWater = false;
    for (const plat of levelData.platforms) {
       if (plat.type === EntityType.WATER) {
          if (checkCollision(player, plat)) {
             inWater = true;
          }
       }
    }
    player.isSwimming = inWater;

    // Jumping / Swimming
    if (keys['ArrowUp']) {
      if (player.isSwimming) {
         player.vy = SWIM_FORCE;
      } else if (player.isGrounded) {
         // Calculate dynamic jump force
         // Base Jump
         let totalJumpForce = JUMP_FORCE;
         
         // Bonus from Carrots (Eat carrots = Jump Higher)
         totalJumpForce -= (player.carrotsCollected * CARROT_JUMP_BONUS);

         // Bonus from Running (Momentum jump)
         if (Math.abs(player.vx) > SPEED * 0.8) {
             totalJumpForce -= RUN_JUMP_BONUS;
         }

         player.vy = totalJumpForce;
         player.isGrounded = false;
      }
    } else {
       // Variable Jump Height: Cut velocity if key released while moving up
       if (player.vy < -1 && !player.isSwimming) {
           player.vy *= 0.85; 
       }
    }

    // Apply Physics
    if (player.isSwimming) {
       player.vx *= WATER_FRICTION;
       player.vy += WATER_GRAVITY;
       // Cap Swim Speed
       if (player.vy > 3) player.vy = 3; 
    } else {
       // Use Air Friction if not grounded to preserve momentum longer (jump further)
       const friction = player.isGrounded ? GROUND_FRICTION : AIR_FRICTION;
       player.vx *= friction;
       player.vy += GRAVITY;
    }

    // Cap horizontal speed
    if (player.vx > SPEED) player.vx = SPEED;
    if (player.vx < -SPEED) player.vx = -SPEED;

    // --- Update Position X ---
    player.x += player.vx;
    
    // Wall Collisions
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > CANVAS_WIDTH) player.x = CANVAS_WIDTH - player.w;

    // Platform X Collisions
    levelData.platforms.forEach(plat => {
       if (plat.type !== EntityType.WATER && checkCollision(player, plat)) {
          // Determine side
          if (player.vx > 0) { // Moving right
             player.x = plat.x - player.w;
             player.vx = 0;
          } else if (player.vx < 0) { // Moving left
             player.x = plat.x + plat.w;
             player.vx = 0;
          }
       }
    });

    // --- Update Position Y ---
    player.y += player.vy;

    // Ground/Ceiling Collisions
    player.isGrounded = false;
    levelData.platforms.forEach(plat => {
      if (plat.type !== EntityType.WATER && checkCollision(player, plat)) {
         if (player.vy > 0) { // Falling down
            player.y = plat.y - player.h;
            player.vy = 0;
            player.isGrounded = true;
         } else if (player.vy < 0) { // Jumping up
            player.y = plat.y + plat.h;
            player.vy = 0;
         }
      }
    });
    
    // Bottom of screen death
    if (player.y > CANVAS_HEIGHT) {
       onGameOver();
       return; 
    }

    // --- Enemies AI & Interaction ---
    enemies.forEach(enemy => {
      if (enemy.isDead) return;

      // Patrol Logic
      if (enemy.vx && enemy.patrolStart && enemy.patrolEnd) {
         enemy.x += enemy.vx * (enemy.direction || 1);
         if (enemy.x > enemy.patrolEnd) enemy.direction = -1;
         if (enemy.x < enemy.patrolStart) enemy.direction = 1;
      }

      // Collision with Player
      if (checkCollision(player, enemy)) {
         const isStomping = player.vy > 0 && (player.y + player.h) < (enemy.y + enemy.h * 0.8);
         
         if (isStomping) {
            enemy.isDead = true;
            player.vy = JUMP_FORCE / 1.5; // Bounce off
         } else {
            onGameOver();
            return;
         }
      }
    });

    // --- Items Interaction ---
    items.forEach(item => {
       if (!item.isDead && checkCollision(player, item)) {
          // Space to eat logic
          if (keys[' '] || keys['Space']) {
             item.isDead = true;
             player.carrotsCollected++;
          }
       }
    });

    // --- Door Interaction ---
    if (checkCollision(player, levelData.door)) {
       if (keys[' '] || keys['Space']) {
          onWin();
          return;
       }
    }

    // --- Update React State ---
    setRenderPlayer({...player});
    setRenderEnemies([...enemies]);
    setRenderItems([...items]);

    requestRef.current = requestAnimationFrame(update);
  }, [levelData, onGameOver, onWin]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keysRef.current[e.key] = true; };
    const handleKeyUp = (e: KeyboardEvent) => { keysRef.current[e.key] = false; };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [update]);

  // Animation helpers
  const isMoving = Math.abs(renderPlayer.vx) > 0.1;
  const legRot = isMoving && renderPlayer.isGrounded 
      ? Math.sin(frameRef.current * 0.2) * 30 
      : 0;

  return (
    <div className="relative bg-gray-900 flex items-center justify-center h-screen overflow-hidden">
        
        {/* HUD */}
        <div className="absolute top-4 left-4 z-20 bg-white border-2 border-black p-2 rounded flex flex-col gap-1 shadow-lg">
            <div className="font-bold text-sm uppercase tracking-wider text-purple-700">{levelData.name}</div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="font-bold">{renderPlayer.carrotsCollected} / {levelData.items.length}</span>
            </div>
            <div className="text-[10px] text-gray-600 mt-1">
               Jump Boost: +{(renderPlayer.carrotsCollected * CARROT_JUMP_BONUS).toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">
                SPACE to Eat/Exit
            </div>
            <button onClick={onExit} className="mt-2 text-xs bg-red-500 text-white px-2 py-1 rounded font-bold hover:bg-red-400">
                QUIT
            </button>
        </div>

        {/* Game Canvas Container */}
        <div 
          className={`relative border-4 border-gray-800 shadow-2xl overflow-hidden ${levelData.background}`}
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
            {/* Platforms */}
            {levelData.platforms.map(plat => (
                <div 
                    key={plat.id}
                    className={`absolute ${plat.color} border-t-4 border-black/20`}
                    style={{ left: plat.x, top: plat.y, width: plat.w, height: plat.h }}
                >
                  {plat.type === EntityType.WATER && (
                      <div className="w-full h-full flex flex-wrap gap-4 p-2 opacity-30">
                          <span className="text-white text-xs">~~</span>
                          <span className="text-white text-xs">~~</span>
                      </div>
                  )}
                </div>
            ))}

            {/* Door */}
            <div 
                className="absolute bg-amber-700 border-4 border-black rounded-t-lg flex justify-center items-center"
                style={{ 
                    left: levelData.door.x, top: levelData.door.y, 
                    width: levelData.door.w, height: levelData.door.h 
                }}
            >
                <div className="absolute right-2 top-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-sm"></div>
                {checkCollision(renderPlayer, levelData.door) && (
                    <div className="absolute -top-10 bg-white border border-black px-2 py-1 text-xs animate-bounce z-30">
                        Press SPACE!
                    </div>
                )}
            </div>

            {/* Items (Carrots) */}
            {renderItems.map(item => !item.isDead && (
                <div 
                    key={item.id}
                    className="absolute flex flex-col items-center justify-center animate-bounce"
                    style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
                >
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[30px] border-t-orange-500 relative">
                        <div className="absolute -top-[40px] -left-[10px] flex justify-center w-full gap-1">
                            <div className="w-1 h-3 bg-green-500 rotate-[-15deg]"></div>
                            <div className="w-1 h-4 bg-green-500"></div>
                            <div className="w-1 h-3 bg-green-500 rotate-[15deg]"></div>
                        </div>
                    </div>
                     {checkCollision(renderPlayer, item) && (
                        <div className="absolute -top-12 bg-white/80 px-1 text-[10px] whitespace-nowrap z-30">
                            Space to Eat!
                        </div>
                    )}
                </div>
            ))}

            {/* Enemies */}
            {renderEnemies.map(enemy => !enemy.isDead && (
                <div 
                    key={enemy.id}
                    className={`absolute border-2 border-black transition-transform ${enemy.type === EntityType.ENEMY_FISH ? 'bg-cyan-400' : 'bg-red-500'}`}
                    style={{ 
                        left: enemy.x, top: enemy.y, width: enemy.w, height: enemy.h,
                        transform: `scaleX(${enemy.direction})` 
                    }}
                >
                    {enemy.type === EntityType.ENEMY_ROBOT && (
                         <>
                            <div className="absolute top-1 left-2 w-2 h-2 bg-white"></div>
                            <div className="absolute top-1 right-2 w-2 h-2 bg-white"></div>
                            <div className="absolute bottom-2 left-2 right-2 h-1 bg-black"></div>
                            <div className="absolute -top-3 left-1/2 w-1 h-3 bg-black"></div>
                         </>
                    )}
                    {enemy.type === EntityType.ENEMY_FISH && (
                         <>
                            <div className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full"><div className="w-1 h-1 bg-black rounded-full ml-1"></div></div>
                            <div className="absolute left-[-5px] top-1/2 w-0 h-0 border-t-[5px] border-t-transparent border-r-[10px] border-r-cyan-600 border-b-[5px] border-b-transparent"></div>
                         </>
                    )}
                </div>
            ))}

            {/* Player (Super Rabbit Boy) with Body */}
            <div 
                className="absolute"
                style={{ 
                    left: renderPlayer.x, top: renderPlayer.y, width: renderPlayer.w, height: renderPlayer.h,
                    transform: `scaleX(${renderPlayer.facingRight ? 1 : -1})` 
                }}
            >
                {/* Head Group (Top ~32px) */}
                <div className="absolute top-0 left-0 w-full h-[32px] border-2 border-black bg-white z-10">
                    <div className="absolute -top-4 left-1 w-3 h-5 bg-white border-2 border-black border-b-0"></div>
                    <div className="absolute -top-4 right-1 w-3 h-5 bg-white border-2 border-black border-b-0"></div>
                    
                    <div className="absolute top-3 left-2 w-2 h-3 bg-black rounded-full"></div>
                    <div className="absolute top-3 right-2 w-2 h-3 bg-black rounded-full"></div>
                    <div className="absolute bottom-2 left-3 right-3 h-1 bg-pink-300 rounded-full mx-auto w-3"></div>
                </div>

                {/* Body Group (Middle ~20px) */}
                <div className="absolute top-[30px] left-[6px] w-[28px] h-[20px] border-2 border-black border-t-0 bg-white z-0">
                     <div className="absolute top-2 -left-3 w-4 h-1.5 bg-black rounded-full origin-right rotate-[-10deg]"></div>
                     <div className="absolute top-2 -right-3 w-4 h-1.5 bg-black rounded-full origin-left rotate-[10deg]"></div>
                </div>

                {/* Legs (Bottom ~14px) - Animated! */}
                <div className="absolute top-[48px] left-[6px] w-[28px] flex justify-center gap-2">
                    {/* Left Leg */}
                    <div 
                        className="w-2 h-4 bg-black origin-top"
                        style={{ transform: `rotate(${legRot}deg)` }}
                    ></div>
                    {/* Right Leg */}
                    <div 
                        className="w-2 h-4 bg-black origin-top"
                        style={{ transform: `rotate(${-legRot}deg)` }}
                    ></div>
                </div>
                
                {renderPlayer.isSwimming && (
                     <div className="absolute -bottom-2 w-full flex justify-center">
                        <div className="w-4 h-4 bg-white/50 rounded-full animate-ping"></div>
                     </div>
                )}
            </div>
            
            {/* Visual Instructions Overlay (Fades out) */}
            <div className="absolute bottom-4 right-4 pointer-events-none opacity-50">
                 <div className="bg-black/10 p-2 rounded text-xs text-white/80">
                    Arrows: Move/Jump <br/> Space: Action
                 </div>
            </div>

        </div>
    </div>
  );
};

export default GameLevel;