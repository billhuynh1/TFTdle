import { useState } from "react";
import { Champion } from "../type";
import { useChampionContext } from "../App";
import { log } from "console";

interface AttributeSquareProps {
    boxColor?: string; 
    pos: keyof Champion;
    champion: Champion
}

const AttributeSquare: React.FC<AttributeSquareProps> = ({ pos, champion }) => {

    const boxColorCorrect = "attribute-square-correct";
    const boxColorPartial = "attribute-square-partial";
    const boxColorIncorrect = "attribute-square-incorrect"
    const testChampion = useChampionContext();
    const typeOfTestChamp = testChampion?.type

    const getSquareColor = () => {
        if (testChampion && champion[pos] === testChampion[pos]) {            
            return boxColorCorrect;
        } else {
            return boxColorIncorrect;
        }
    }
    
    return (
        <div className={getSquareColor()}>
            <div className="square-content">{champion[pos]}</div>
        </div>
    );
}

export default AttributeSquare; 
