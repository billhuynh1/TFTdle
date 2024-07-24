import { useEffect, useState } from "react";
import { Champion } from "../type";
import { useChampionContext } from "../App";

interface AttributeSquareProps {
    pos: keyof Champion;
    champion: Champion
}

const AttributeSquare: React.FC<AttributeSquareProps> = ({ pos, champion }) => {

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [squareColor, setSquareColor] = useState<string>("");
    const testChampion = useChampionContext();

    useEffect(() => {
      if (testChampion && champion[pos] === testChampion[pos]) {            
          setSquareColor("correct")
      } else if (testChampion?.[pos]?.toString().includes(champion?.[pos]?.toString() ?? '')) {
          setSquareColor("partial")
      } else {
          setSquareColor("incorrect")
      }
    }, [champion[pos]])
    
    const isImage = (url: string | number) => {
        if (typeof url != 'string') {
            return false;
        }
        const regex = /\.(jpg|jpeg|png|gif|bmp|svg)$/;
        return regex.test(url);
    };

    console.log(squareColor);
    
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
            <div className={`attribute-square ${squareColor}`}>
              <div className="square-content">{champion[pos]}</div>
            </div>
          )}
        </>
      );
    };

export default AttributeSquare; 
