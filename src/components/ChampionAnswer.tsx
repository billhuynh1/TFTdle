import React, { useState } from "react";
import AttributeSquare from "./AttributeSquare";
import { Champion } from "../type";

const ChampionAnswer: React.FC<Champion> = ({ ...champion }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(true);

  return (
    <div className="answer-container">
      {Object.keys(champion).map((key) => (
        <AttributeSquare
          key={champion.name}
          champion={champion}
          pos={key as keyof Champion}
        />
      ))}
    </div>
  );
};
export default ChampionAnswer;
