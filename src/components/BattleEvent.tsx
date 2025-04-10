import React from "react";
import { getPetImageUrl, getPetNameByPetId } from "../data/pets";



interface Unit {
  id: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  intelligence: number;
  genestrength: number;
  range: number;
  special: number;
}

interface BattleEventProps {
  event: {
    id: string;
    timestamp: string;
    type: string;
    status: "success" | "warning" | "error" | "info";
    transactionHash: string;
    blockNumber: number;
    battleResult?: {
      BattleRythm: number;
      bit: number;
      Won: boolean;
      randret: number;
      attackerUnits: Unit[];
      opponentUnits: Unit[];
    };
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const BattleEvent: React.FC<BattleEventProps> = ({
  event,
  isExpanded,
  onToggleExpand,
}) => {
  if (!event.battleResult) return null;

  const getBattleStatusEmoji = (won: boolean) => {
    return won ? "🎉" : "💔";
  };

  const getBattleStatusText = (won: boolean) => {
    return won ? "Victory" : "Defeat";
  };

  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" checked={isExpanded} onChange={onToggleExpand} />
      <div className="collapse-title flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            event.battleResult.Won 
              ? "bg-success/20 text-success" 
              : "bg-error/20 text-error"
          }`}>
            <span className="text-2xl">
              {getBattleStatusEmoji(event.battleResult.Won)}
            </span>
            <span className="font-bold text-lg">
              {getBattleStatusText(event.battleResult.Won)}
            </span>
          </div>
          {!isExpanded && (
            <div className="battle-pets flex items-center gap-2">
              <div className="attacker-pets flex items-center gap-2">
                {event.battleResult.attackerUnits.map((unit, index) => (
                  <img
                    key={`attacker-${index}`}
                    src={getPetImageUrl(unit.id)}
                    alt={`Pet ${unit.id}`}
                    className="mini-pet-image w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  />
                ))}
              </div>
              <span className="mini-vs text-sm font-bold text-gray-500">VS</span>
              <div className="opponent-pets flex items-center gap-2">
                {event.battleResult.opponentUnits.map((unit, index) => (
                  <img
                    key={`opponent-${index}`}
                    src={getPetImageUrl(unit.id)}
                    alt={`Pet ${unit.id}`}
                    className="mini-pet-image w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="tooltip tooltip-left" data-tip={event.timestamp}>
            <div className="badge badge-outline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.timestamp}
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-content bg-base-300">
        <div className="units-container">
          <div className="units-group">
            <div className="units-group-title attacker">Attacker</div>
            <div className="unit-cards-container">
              {event.battleResult.attackerUnits.map((unit, index) => (
                <div key={`attacker-${index}`} className="unit-card">
                  <div className="relative">
                    <div className="avatar mt-4">
                      <div className="w-24 h-24 rounded-full bg-base-200 ring ring-white ring-offset-base-100 ring-offset-2">
                        <img
                          src={getPetImageUrl(unit.id)}
                          alt={`Pet ${unit.id}`}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-0 right-0 badge badge-primary">
                        Leader
                      </div>
                    )}
                  </div>
                  <div className="unit-info">
                    <div className="unit-id">{getPetNameByPetId(unit.id) || `#${unit.id}`}</div>
                    <div className="unit-stats">
                      <div>hp: {unit.hp.toLocaleString()}</div>
                      <div>atk: {unit.attack.toLocaleString()}</div>
                      <div>def: {unit.defense.toLocaleString()}</div>
                      <div>spd: {unit.speed.toLocaleString()}</div>
                      <div>int: {unit.intelligence.toLocaleString()}</div>
                      <div>gs: {unit.genestrength.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="vs-text">VS</div>

          <div className="units-group">
            <div className="units-group-title opponent">Defender</div>
            <div className="unit-cards-container">
              {event.battleResult.opponentUnits.map((unit, index) => (
                <div key={`opponent-${index}`} className="unit-card">
                  <div className="relative">
                    <div className="avatar mt-4">
                      <div className="w-24 h-24 rounded-full bg-base-200 ring ring-white ring-offset-base-100 ring-offset-2">
                        <img
                          src={getPetImageUrl(unit.id)}
                          alt={`Pet ${unit.id}`}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-0 right-0 badge badge-primary">
                        Leader
                      </div>
                    )}
                  </div>
                  <div className="unit-info">
                    <div className="unit-id">{getPetNameByPetId(unit.id) || `#${unit.id}`}</div>
                    <div className="unit-stats">
                      <div>hp: {unit.hp.toLocaleString()}</div>
                      <div>atk: {unit.attack.toLocaleString()}</div>
                      <div>def: {unit.defense.toLocaleString()}</div>
                      <div>spd: {unit.speed.toLocaleString()}</div>
                      <div>int: {unit.intelligence.toLocaleString()}</div>
                      <div>gs: {unit.genestrength.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleEvent;
