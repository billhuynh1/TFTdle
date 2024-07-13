import { useState } from "react";
import { Champion } from "../type";
import { useChampionContext } from "../App";

interface AttributeSquareProps {
    pos: keyof Champion;
    champion: Champion
}

const AttributeSquare: React.FC<AttributeSquareProps> = ({ pos, champion }) => {

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [squareColor, setSquareColor] = useState<string>("");
    

    const squareCorrect = "attribute-square-correct";
    const squareIncorrect = "attribute-square-incorrect"
    const testChampion = useChampionContext();

    const getSquareColor = () => {
        if (testChampion && champion[pos] === testChampion[pos]) {            
            return squareCorrect;
        } else {
            return squareIncorrect;
        }
    }
    
    const isImage = (url: string | number) => {
        if (typeof url != 'string') {
            return false;
        }
        const regex = /\.(jpg|jpeg|png|gif|bmp|svg)$/;
        return regex.test(url);
    };

    return (
        <>
          {isImage(champion[pos]) ? (
            <div className="icon-container">
              <img
                className="champion-image"
                src={`images/${champion.imageurl}`}
                alt="Champion image"
              />
            </div>
          ) : (
            <div className={getSquareColor()}>
              <div className="square-content">{champion[pos]}</div>
            </div>
          )}
        </>
      );
    };

export default AttributeSquare; 
