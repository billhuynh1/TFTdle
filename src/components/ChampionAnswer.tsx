
import AttributeSquare from "./AttributeSquare"
import { Champion } from "../type";

interface ChampionAnswerProps extends Champion {
    isAnimating: boolean;
}

const ChampionAnswer: React.FC<ChampionAnswerProps> = ({isAnimating, name, gender, cost, type, chibi, attRange}: ChampionAnswerProps) => {
    const answerContents: (number | string | null)[] = [name, gender, cost, type, chibi, attRange,];
    
    return (
        <>
            <div className={`answer-container ${isAnimating && "fade-in"} `}>
            {answerContents.map((content, index) => (
                    <AttributeSquare key={index} content={content}/>
                ))}
            </div>
        </>
    )
}


export default ChampionAnswer;
