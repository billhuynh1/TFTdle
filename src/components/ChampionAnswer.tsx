
import AttributeSquare from "./AttributeSquare"
import { Champion } from "../type";

const ChampionAnswer: React.FC<Champion> = ({ name, gender, cost, type, chibi, attRange }) => {

    const attributeContents: string[] = ['Img','Champion', 'Gender', 'Cost', 'Type', 'Chibi',];
    const answerContents: (number | string | null)[] = [name, gender, cost, type, chibi, attRange,];
    
    return (
        <>
            <div className="attribute-container">
                {attributeContents.map((content, index) => (
                    <AttributeSquare key={index} content={content}/>
                ))}
            </div>
            <div className="answer-container">
            {answerContents.map((content, index) => (
                    <AttributeSquare key={index} content={content}/>
                ))}
            </div>
        </>
    )
}


export default ChampionAnswer;
