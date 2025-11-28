import { LevelData, EntityType } from './types';

export const GRAVITY = 0.6;
export const JUMP_FORCE = -12;
export const SWIM_FORCE = -5;
export const SPEED = 5;
export const GROUND_FRICTION = 0.8;
export const AIR_FRICTION = 0.96; // Lower drag in air to jump further
export const WATER_GRAVITY = 0.2;
export const WATER_FRICTION = 0.9;
export const CARROT_JUMP_BONUS = 1.2; // Extra height per carrot
export const RUN_JUMP_BONUS = 1.5; // Extra height if running fast

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

export const LEVEL_1: LevelData = {
  id: 1,
  name: "Animal Town",
  background: "bg-green-100",
  width: 800,
  height: 600,
  startPos: { x: 50, y: 450 },
  platforms: [
    // Ground
    { id: 'floor', type: EntityType.PLATFORM, x: 0, y: 550, w: 800, h: 50, color: 'bg-green-600' },
    
    // House 1
    { id: 'h1', type: EntityType.PLATFORM, x: 200, y: 470, w: 60, h: 80, color: 'bg-orange-300 border-2 border-orange-500' },
    { id: 'h1_roof', type: EntityType.PLATFORM, x: 190, y: 450, w: 80, h: 20, color: 'bg-red-400' },

    // House 2 (Lowered slightly to be reachable)
    { id: 'h2', type: EntityType.PLATFORM, x: 450, y: 410, w: 60, h: 140, color: 'bg-orange-300 border-2 border-orange-500' },
    { id: 'h2_roof', type: EntityType.PLATFORM, x: 440, y: 390, w: 80, h: 20, color: 'bg-red-400' },

    // Floating platforms (Adjusted for playability)
    { id: 'p1', type: EntityType.PLATFORM, x: 600, y: 290, w: 80, h: 20, color: 'bg-green-500' }, // Lowered from 250
    { id: 'p2', type: EntityType.PLATFORM, x: 350, y: 220, w: 80, h: 20, color: 'bg-green-500' }, // Lowered from 200

    // Goal Platform
    { id: 'goal', type: EntityType.PLATFORM, x: 50, y: 150, w: 120, h: 20, color: 'bg-green-700' },
  ],
  enemies: [
    { id: 'e1', type: EntityType.ENEMY_ROBOT, x: 250, y: 510, w: 40, h: 40, patrolStart: 250, patrolEnd: 400, direction: 1, vx: 2 },
    { id: 'e2', type: EntityType.ENEMY_ROBOT, x: 450, y: 350, w: 40, h: 40, patrolStart: 440, patrolEnd: 520, direction: 1, vx: 1.5 },
  ],
  items: [
    { id: 'c1', type: EntityType.ITEM_CARROT, x: 240, y: 390, w: 20, h: 40 },
    { id: 'c2', type: EntityType.ITEM_CARROT, x: 470, y: 340, w: 20, h: 40 },
    { id: 'c3', type: EntityType.ITEM_CARROT, x: 650, y: 240, w: 20, h: 40 },
  ],
  door: { id: 'exit', type: EntityType.DOOR, x: 100, y: 70, w: 40, h: 80 }
};

export const LEVEL_2: LevelData = {
  id: 2,
  name: "Splish Splash Sea",
  background: "bg-blue-200",
  width: 800,
  height: 600,
  startPos: { x: 50, y: 150 }, // Start high left
  platforms: [
    // Starting Cliff
    { id: 'start', type: EntityType.PLATFORM, x: 0, y: 200, w: 120, h: 400, color: 'bg-yellow-200' },
    
    // Islands
    { id: 'isl1', type: EntityType.PLATFORM, x: 250, y: 450, w: 60, h: 20, color: 'bg-yellow-200' },
    { id: 'isl2', type: EntityType.PLATFORM, x: 450, y: 400, w: 60, h: 20, color: 'bg-yellow-200' },
    { id: 'isl3', type: EntityType.PLATFORM, x: 650, y: 350, w: 120, h: 250, color: 'bg-yellow-200' }, // End island

    // Water Body
    { id: 'water', type: EntityType.WATER, x: 150, y: 500, w: 500, h: 100, color: 'bg-blue-500 opacity-60' },

    // Underwater platforms
    { id: 'sub1', type: EntityType.PLATFORM, x: 300, y: 550, w: 50, h: 20, color: 'bg-stone-500' },
  ],
  enemies: [
    { id: 'f1', type: EntityType.ENEMY_FISH, x: 200, y: 520, w: 30, h: 20, patrolStart: 150, patrolEnd: 350, direction: 1, vx: 2 },
    { id: 'f2', type: EntityType.ENEMY_FISH, x: 400, y: 550, w: 30, h: 20, patrolStart: 350, patrolEnd: 600, direction: 1, vx: 2.5 },
    { id: 'e1', type: EntityType.ENEMY_ROBOT, x: 650, y: 310, w: 40, h: 40, patrolStart: 650, patrolEnd: 750, direction: 1, vx: 1 },
  ],
  items: [
    { id: 'c1', type: EntityType.ITEM_CARROT, x: 320, y: 510, w: 20, h: 40 }, // Underwater
    { id: 'c2', type: EntityType.ITEM_CARROT, x: 480, y: 360, w: 20, h: 40 },
    { id: 'c3', type: EntityType.ITEM_CARROT, x: 280, y: 410, w: 20, h: 40 },
  ],
  door: { id: 'exit', type: EntityType.DOOR, x: 700, y: 270, w: 40, h: 80 }
};

export const LEVEL_3: LevelData = {
  id: 3,
  name: "Sandstorm Desert",
  background: "bg-amber-100",
  width: 800,
  height: 600,
  startPos: { x: 50, y: 500 },
  platforms: [
    // Ground segments (Gaps to fall)
    { id: 'g1', type: EntityType.PLATFORM, x: 0, y: 550, w: 180, h: 50, color: 'bg-amber-600' },
    // Helper platform
    { id: 'h_low', type: EntityType.PLATFORM, x: 200, y: 500, w: 80, h: 20, color: 'bg-amber-500' },
    
    { id: 'g2', type: EntityType.PLATFORM, x: 300, y: 550, w: 180, h: 50, color: 'bg-amber-600' },
    // Helper platform
    { id: 'h_low2', type: EntityType.PLATFORM, x: 500, y: 500, w: 80, h: 20, color: 'bg-amber-500' },

    { id: 'g3', type: EntityType.PLATFORM, x: 600, y: 550, w: 180, h: 50, color: 'bg-amber-600' },

    // Pyramids / Steps
    { id: 'p1', type: EntityType.PLATFORM, x: 220, y: 430, w: 50, h: 20, color: 'bg-amber-500' },
    { id: 'p2', type: EntityType.PLATFORM, x: 520, y: 430, w: 50, h: 20, color: 'bg-amber-500' },
    
    // High Platforms
    { id: 'h1', type: EntityType.PLATFORM, x: 100, y: 350, w: 80, h: 20, color: 'bg-amber-400' },
    { id: 'h2', type: EntityType.PLATFORM, x: 350, y: 250, w: 80, h: 20, color: 'bg-amber-400' },
    { id: 'h3', type: EntityType.PLATFORM, x: 600, y: 350, w: 80, h: 20, color: 'bg-amber-400' },

    // Goal
    { id: 'goal', type: EntityType.PLATFORM, x: 700, y: 150, w: 80, h: 20, color: 'bg-amber-700' },
  ],
  enemies: [
    { id: 'e1', type: EntityType.ENEMY_ROBOT, x: 350, y: 510, w: 40, h: 40, patrolStart: 300, patrolEnd: 480, direction: 1, vx: 3 },
    { id: 'e2', type: EntityType.ENEMY_ROBOT, x: 650, y: 310, w: 40, h: 40, patrolStart: 600, patrolEnd: 680, direction: -1, vx: 2 },
  ],
  items: [
    { id: 'c1', type: EntityType.ITEM_CARROT, x: 140, y: 310, w: 20, h: 40 },
    { id: 'c2', type: EntityType.ITEM_CARROT, x: 380, y: 210, w: 20, h: 40 },
    { id: 'c3', type: EntityType.ITEM_CARROT, x: 650, y: 510, w: 20, h: 40 },
  ],
  door: { id: 'exit', type: EntityType.DOOR, x: 730, y: 70, w: 40, h: 80 }
};

export const LEVEL_4: LevelData = {
  id: 4,
  name: "Cloudy Hills",
  background: "bg-sky-300",
  width: 800,
  height: 600,
  startPos: { x: 400, y: 500 }, // Start bottom middle
  platforms: [
    // Base
    { id: 'base', type: EntityType.PLATFORM, x: 300, y: 550, w: 200, h: 50, color: 'bg-white/80 border-2 border-sky-100' },

    // Cloud Steps going UP
    { id: 'c1', type: EntityType.PLATFORM, x: 150, y: 450, w: 100, h: 30, color: 'bg-white rounded-full' },
    { id: 'c2', type: EntityType.PLATFORM, x: 50, y: 300, w: 100, h: 30, color: 'bg-white rounded-full' },
    
    { id: 'c3', type: EntityType.PLATFORM, x: 250, y: 200, w: 100, h: 30, color: 'bg-white rounded-full' },
    
    { id: 'c4', type: EntityType.PLATFORM, x: 500, y: 320, w: 100, h: 30, color: 'bg-white rounded-full' },
    { id: 'c5', type: EntityType.PLATFORM, x: 650, y: 430, w: 100, h: 30, color: 'bg-white rounded-full' },
    
    { id: 'c6', type: EntityType.PLATFORM, x: 600, y: 150, w: 120, h: 30, color: 'bg-white rounded-full' }, // Goal cloud

    { id: 'badcloud', type: EntityType.PLATFORM, x: 400, y: 100, w: 80, h: 20, color: 'bg-gray-400 rounded-full' },
  ],
  enemies: [
    { id: 'e1', type: EntityType.ENEMY_ROBOT, x: 170, y: 410, w: 40, h: 40, patrolStart: 150, patrolEnd: 250, direction: 1, vx: 2 },
    { id: 'e2', type: EntityType.ENEMY_ROBOT, x: 520, y: 280, w: 40, h: 40, patrolStart: 500, patrolEnd: 600, direction: -1, vx: 2 },
  ],
  items: [
    { id: 'c1', type: EntityType.ITEM_CARROT, x: 80, y: 260, w: 20, h: 40 },
    { id: 'c2', type: EntityType.ITEM_CARROT, x: 700, y: 390, w: 20, h: 40 },
    { id: 'c3', type: EntityType.ITEM_CARROT, x: 440, y: 60, w: 20, h: 40 },
  ],
  door: { id: 'exit', type: EntityType.DOOR, x: 650, y: 70, w: 40, h: 80 }
};

export const LEVEL_5: LevelData = {
  id: 5,
  name: "Boom Boom Factory",
  background: "bg-gray-800",
  width: 800,
  height: 600,
  startPos: { x: 50, y: 500 },
  platforms: [
    // Factory Floor
    { id: 'floor', type: EntityType.PLATFORM, x: 0, y: 550, w: 800, h: 50, color: 'bg-gray-600 border-t-4 border-yellow-500' },
    
    // Conveyor belts
    { id: 'cb1', type: EntityType.PLATFORM, x: 200, y: 450, w: 160, h: 20, color: 'bg-black border-2 border-gray-500' },
    { id: 'cb2', type: EntityType.PLATFORM, x: 500, y: 350, w: 160, h: 20, color: 'bg-black border-2 border-gray-500' },
    { id: 'cb3', type: EntityType.PLATFORM, x: 200, y: 250, w: 160, h: 20, color: 'bg-black border-2 border-gray-500' },

    // Toxic Vats (Water)
    { id: 'tox1', type: EntityType.WATER, x: 450, y: 560, w: 200, h: 40, color: 'bg-green-500 opacity-80' },
    
    // Top walkway
    { id: 'top', type: EntityType.PLATFORM, x: 50, y: 150, w: 600, h: 20, color: 'bg-red-900 border-2 border-red-500' },
  ],
  enemies: [
    { id: 'e1', type: EntityType.ENEMY_ROBOT, x: 250, y: 410, w: 40, h: 40, patrolStart: 200, patrolEnd: 360, direction: 1, vx: 2.5 },
    { id: 'e2', type: EntityType.ENEMY_ROBOT, x: 550, y: 310, w: 40, h: 40, patrolStart: 500, patrolEnd: 660, direction: -1, vx: 3 },
    { id: 'e3', type: EntityType.ENEMY_ROBOT, x: 250, y: 210, w: 40, h: 40, patrolStart: 200, patrolEnd: 360, direction: 1, vx: 3.5 },
    { id: 'e4', type: EntityType.ENEMY_ROBOT, x: 100, y: 110, w: 40, h: 40, patrolStart: 50, patrolEnd: 200, direction: 1, vx: 4 },
  ],
  items: [
    { id: 'c1', type: EntityType.ITEM_CARROT, x: 300, y: 410, w: 20, h: 40 },
    { id: 'c2', type: EntityType.ITEM_CARROT, x: 600, y: 310, w: 20, h: 40 },
    { id: 'c3', type: EntityType.ITEM_CARROT, x: 300, y: 210, w: 20, h: 40 },
    { id: 'c4', type: EntityType.ITEM_CARROT, x: 700, y: 110, w: 20, h: 40 },
  ],
  door: { id: 'exit', type: EntityType.DOOR, x: 50, y: 70, w: 40, h: 80 }
};

export const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5];