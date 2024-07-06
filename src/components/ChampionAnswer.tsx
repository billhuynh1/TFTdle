
import AttributeSquare from "./AttributeSquare"
import { Champion } from "../type";
import testChampion from "../App"
import { useContext, useEffect, useState } from "react";


const ChampionAnswer: React.FC<Champion> = ({ ...champion }) => {

    const [isAnimate, setIsAnimate] = useState(false);
    
    useEffect(() => {
        setIsAnimate(true);
      }, []);
      
    return (
        <>
            <div className={`answer-container ${isAnimate && "fade-in"}`}>
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