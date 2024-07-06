
import AttributeSquare from "./AttributeSquare"
import { Champion } from "../type";
import testChampion from "../App"
import { log } from "console";
import { useContext, useState } from "react";

interface ChampionAnswerProps extends Champion {
    isAnimating: boolean;
}

const ChampionAnswer: React.FC<ChampionAnswerProps> = ({ isAnimating, ...champion }: ChampionAnswerProps) => {

    const answerContents: (number | string | null )[] = Object.keys(champion).map(key => champion[key as keyof Champion])

    return (
        <>
            <div className={`answer-container ${isAnimating && "fade-in"}`}>
                {Object.keys(champion).map((key ) => (
                    <AttributeSquare key={key} champion={champion} pos={key as keyof Champion}/>
                ))}
            </div>
        </>
    )
}
export default ChampionAnswer;