import React, { useState } from "react";
import { ElementType, elementMatrix, reactionEffects } from "../types/elements";
import "./ElementMatrix.css";

const ElementMatrix: React.FC = () => {
  const [hoveredReaction, setHoveredReaction] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  const elements = Object.values(ElementType);

  const getReaction = (element1: string, element2: string): string => {
    if (element1 === element2) return "–";
    return (
      elementMatrix[element1]?.[element2] ||
      elementMatrix[element2]?.[element1] ||
      "–"
    );
  };

  const handleCellHover = (
    reaction: string,
    index: number,
    index2: number
  ) => {
    if (reaction !== "–") {
      setHoveredReaction(reaction);
      setHoveredIndex(index + "-" + index2);
    }
  };

  const handleCellLeave = () => {
    setHoveredReaction(null);
  };

  return (
    <div className="element-matrix-container">
      <h1>元素反应矩阵</h1>
      <div className="matrix-wrapper">
        <table className="element-matrix">
          <thead>
            <tr>
              <th>序号</th>
              <th>反应</th>
              {elements.map((element) => (
                <th key={element}>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {elements.map((element1, index) => (
              <tr key={element1}>
                <td>{index + 1}</td>
                <td>{element1}</td>
                {elements.map((element2, index2) => {
                  const reaction = getReaction(element1, element2);
                  return (
                    <td
                      key={`${element1}-${element2}`}
                      onMouseEnter={() =>
                        handleCellHover(reaction, index, index2)
                      }
                      onMouseLeave={handleCellLeave}
                      className={reaction !== "–" ? "reaction-cell" : ""}
                    >
                      {reaction}
                      {hoveredReaction &&
                        reactionEffects[hoveredReaction] &&
                        hoveredIndex === index + "-" + index2 && (
                          <div
                            className="reaction-popover"
                            style={{
                              top: 0,
                              left: "50",
                            }}
                          >
                            <h3>{hoveredReaction}</h3>
                            <p>{reactionEffects[hoveredReaction]}</p>
                          </div>
                        )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ElementMatrix;
