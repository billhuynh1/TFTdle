
import AttributeSquare from "./AttributeSquare"
import App from "../App";

const CharacterAnswer: React.FC = () => {

    const attributeContents: string[] = ['Img','Champion', 'Gender', 'Cost', 'Type', 'Chibi',];
    const answerContents: string[] = ['item', 'item', 'item', 'item', 'item',];
    
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
