export enum Screen {
  MENU = 'MENU',
  HOW_TO_PLAY = 'HOW_TO_PLAY',
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  GAME = 'GAME',
  WIN = 'WIN',
  GAME_OVER = 'GAME_OVER'
}

export enum EntityType {
  PLAYER = 'PLAYER',
  PLATFORM = 'PLATFORM',
  ENEMY_ROBOT = 'ENEMY_ROBOT',
  ENEMY_FISH = 'ENEMY_FISH',
  ITEM_CARROT = 'ITEM_CARROT',
  DOOR = 'DOOR',
  WATER = 'WATER'
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Entity extends Rect {
  id: string;
  type: EntityType;
  vx?: number;
  vy?: number;
  color?: string;
  patrolStart?: number;
  patrolEnd?: number;
  direction?: 1 | -1;
  isDead?: boolean;
}

export interface PlayerState extends Rect {
  vx: number;
  vy: number;
  isGrounded: boolean;
  isSwimming: boolean;
  facingRight: boolean;
  carrotsCollected: number;
  hasKey: boolean; // Logic: Eating all carrots or finding key opens door? Sketch says "Exit doors (space key)", "Eat carrots (space key)". Let's make carrots points.
}

export interface LevelData {
  id: number;
  name: string;
  background: string; // Tailwind class for background color
  width: number;
  height: number;
  platforms: Entity[];
  enemies: Entity[];
  items: Entity[];
  door: Entity;
  startPos: { x: number; y: number };
}
