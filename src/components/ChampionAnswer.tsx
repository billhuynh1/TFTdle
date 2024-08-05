/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */

import AttributeSquare from "./AttributeSquare"
import { Champion } from "../type";
import { useState } from "react";

const ChampionAnswer: React.FC<Champion> = ({ ...champion }) => {

    const [isAnimating, setIsAnimating] = useState<boolean>(true);

    return (
        <>
            <div className={`answer-container ${isAnimating ? "fade-in" : ""}`}>
                {Object.keys(champion).map((key) => (
                    <AttributeSquare
                        key={key}
                        champion={champion}
                        pos={key as keyof Champion}
                    />
                ))}
            </div>
        </>
    )
}
export default ChampionAnswer;