
import { Url } from "url";
import AttributeSquare from "./AttributeSquare"

const CharacterAnswer: React.FC = () => {

    const attributeContents: string[] = ['Champion', 'Gender', 'Cost', 'Type', 'item', 'item'];
    const answerContents: string[] = ['item', 'item', 'item', 'item', 'item', 'item'];

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


export default CharacterAnswer;
