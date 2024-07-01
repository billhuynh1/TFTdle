import { useState } from "react";
import { Champion } from "../type";
import { useChampionContext } from "../App";
import { log } from "console";

interface AttributeSquareProps {
    pos: keyof Champion;
    champion: Champion
}

const AttributeSquare: React.FC<AttributeSquareProps> = ({ pos, champion }) => {

    const squareCorrect = "attribute-square-correct";
    const squarePartial = "attribute-square-partial";
    const squareIncorrect = "attribute-square-incorrect"
    const testChampion = useChampionContext();

    const getSquareColor = () => {
        if (testChampion && champion[pos] === testChampion[pos]) {            
            return squareCorrect;
        } else {
            return squareIncorrect;
        }
    }
    
    return (
        <div className={getSquareColor()}>
            <div className="square-content">{champion[pos]}</div>
        </div>
    );
}

export default AttributeSquare; 
