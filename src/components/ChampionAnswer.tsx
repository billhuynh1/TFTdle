
import AttributeSquare from "./AttributeSquare"
import { Champion } from "../type";
import testChampion from "../App"
import { useContext, useEffect, useState } from "react";


const ChampionAnswer: React.FC<Champion> = ({ ...champion }) => {

    const [isAnimating, setIsAnimating] = useState<boolean>(true);

    console.log("Rendering",  champion.name);
      
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