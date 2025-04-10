import React, { useState } from 'react';
import { Pet } from '../types/pets';
import './PetList.css';

interface PetListProps {
  pets: Pet[];
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
  const [sortBy, setSortBy] = useState<{
    field: 'hp' | 'str' | 'def' | 'spd' | 'int';
    direction: 'asc' | 'desc';
  }>({
    field: 'hp',
    direction: 'desc'
  });

  const handleSort = (field: 'hp' | 'str' | 'def' | 'spd' | 'int') => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedPets = [...pets].sort((a, b) => {
    const aValue = a[sortBy.field];
    const bValue = b[sortBy.field];
    return sortBy.direction === 'asc' ? aValue - bValue : bValue - aValue;
  });

  return (
    <div className="pet-list">
      <div className="section-header">
        <h1>宠物图鉴</h1>
      </div>
      <div className="pet-stats-header">
        <div className="stat" onClick={() => handleSort('hp')}>
          <span>HP</span>
          {sortBy.field === 'hp' && (
            <span className="sort-indicator">
              {sortBy.direction === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
        <div className="stat" onClick={() => handleSort('str')}>
          <span>ATK</span>
          {sortBy.field === 'str' && (
            <span className="sort-indicator">
              {sortBy.direction === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
        <div className="stat" onClick={() => handleSort('def')}>
          <span>DEF</span>
          {sortBy.field === 'def' && (
            <span className="sort-indicator">
              {sortBy.direction === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
        <div className="stat" onClick={() => handleSort('spd')}>
          <span>SPD</span>
          {sortBy.field === 'spd' && (
            <span className="sort-indicator">
              {sortBy.direction === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
        <div className="stat" onClick={() => handleSort('int')}>
          <span>INT</span>
          {sortBy.field === 'int' && (
            <span className="sort-indicator">
              {sortBy.direction === 'asc' ? '↑' : '↓'}
            </span>
          )}
        </div>
      </div>
      <div className="pet-grid">
        {sortedPets.map(pet => (
          <div key={pet.id} className="pet-card">
            <div className="pet-image-container">
              <img src={pet.imageUrl} alt={pet.name} className="pet-image" />
            </div>
            <div className="pet-info">
              <h3>{pet.name}</h3>
              <div className="pet-stats">
                <div className="stat">
                  <span>HP</span>
                  <span className="stat-value">{pet.hp}</span>
                </div>
                <div className="stat">
                  <span>ATK</span>
                  <span className="stat-value">{pet.str}</span>
                </div>
                <div className="stat">
                  <span>DEF</span>
                  <span className="stat-value">{pet.def}</span>
                </div>
                <div className="stat">
                  <span>SPD</span>
                  <span className="stat-value">{pet.spd}</span>
                </div>
                <div className="stat">
                  <span>INT</span>
                  <span className="stat-value">{pet.int}</span>
                </div>
              </div>
              <div className="pet-skills">
                {pet.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-type">{skill.type}</span>
                      <span className={`element-tag ${skill.attribute.toLowerCase()}`}>
                        {skill.attribute}
                      </span>
                    </div>
                    <div className="skill-description">{skill.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetList; 