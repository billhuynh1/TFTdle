import React, { useState } from "react";
import AttributeSquare from "./AttributeSquare.tsx";
import { Champion } from "../type.ts";

const ChampionAnswer: React.FC<Champion> = ({ ...champion }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  return (
    <div className={`answer-container ${isAnimating ? "fade-in" : ""}`}>
      {Object.keys(champion).map((key) => (
        <AttributeSquare
          key={`${champion.name}-${key}`}
          champion={champion}
          pos={key as keyof Champion}
        />
      ))}
    </div>
  );
};
export default ChampionAnswer;
