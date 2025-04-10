export interface UnitStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  intelligence: number;
}

export interface Unit {
  id: string;
  name: string;
  elements: string[];
  stats: UnitStats;
  currentElement?: string;
  statusEffects: {
    attackMod: number;
    defenseMod: number;
    speedMod: number;
    intelligenceMod: number;
    hpMod: number;
    skipTurn: boolean;
  };
}

export interface Team {
  units: Unit[];
  score: number;
}

export const createDefaultUnit = (name: string, elements: string[]): Unit => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  elements: elements.slice(0, 2),
  stats: {
    hp: 1000,
    attack: 100,
    defense: 100,
    speed: 100,
    intelligence: 100
  },
  statusEffects: {
    attackMod: 0,
    defenseMod: 0,
    speedMod: 0,
    intelligenceMod: 0,
    hpMod: 0,
    skipTurn: false
  }
}); 