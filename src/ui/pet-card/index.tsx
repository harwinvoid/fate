import { useState } from "react";
import { Pet } from "../../components/PetList";

import dark from "../../assets/elements/dark.png";
import fire from "../../assets/elements/fire.png";
import water from "../../assets/elements/water.png";
import nature from "../../assets/elements/nature.png";
import electric from "../../assets/elements/electric.png";
import light from "../../assets/elements/light.png";
import ice from "../../assets/elements/ice.png";

import "./index.less";

const elementIcons = {
  dark,
  fire,
  water,
  nature,
  electric,
  light,
  ice,
};

const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};

export const PetCard = (props: { pet: Pet }) => {
  const { pet } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div key={pet.id} className="pet-card">
      <div className="pet-header">
        <h3 className="pet-name">{pet.name}</h3>
      </div>

      <div
        className={`pet-image-container ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="pet-image-inner">
          <div className="pet-image-front">
            <img src={pet.image} alt={pet.name} className="pet-image" />
            <div className="pet-elements">
              {pet.skills?.map((skill, index) => (
                <div
                  key={index}
                  className={`element-icon ${
                    skill.type === "Aoe" ? "aoe" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${
                      elementIcons[
                        skill.attribute.toLocaleLowerCase() as keyof typeof elementIcons
                      ]
                    })`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="pet-image-back">
            <div className="skills-container">
              <h4>Skills</h4>
              {pet.skills?.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div
                    className="skill-element"
                    style={{
                      backgroundImage: `url(${
                        elementIcons[
                          skill.attribute.toLocaleLowerCase() as keyof typeof elementIcons
                        ]
                      })`,
                    }}
                  />

                  <p className="skill-description">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pet-stats">
        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">HP</span>
            <span className="stat-value">
              {pet.stat?.hp ? formatNumber(pet.stat.hp) : "-"}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">ATK</span>
            <span className="stat-value">{pet.stat?.atk || "-"}</span>
          </div>
        </div>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">DEF</span>
            <span className="stat-value">{pet.stat?.def || "-"}</span>
          </div>
          <div className="stat">
            <span className="stat-label">INT</span>
            <span className="stat-value">{pet.stat?.int || "-"}</span>
          </div>
        </div>
        <div className="stat-row">
          <div className="stat">
            <span className="stat-label">SPD</span>
            <span className="stat-value">{pet.stat?.spd || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
