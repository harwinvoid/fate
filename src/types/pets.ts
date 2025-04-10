export type ElementType = 'Electric' | 'Fire' | 'Ice' | 'Water' | 'Dark' | 'Light' | 'Nature';

export type SkillType = 'Single' | 'Aoe' | 'AllyAoe';

export interface Pet {
  id: number;
  name: string;
  hp: number;
  str: number;
  def: number;
  spd: number;
  int: number;
  gs: number;
  element: ElementType;
  skills: Skill[];
  imageUrl: string;
}

export interface Skill {
  attribute: string;
  type: SkillType;
  description: string;
} 