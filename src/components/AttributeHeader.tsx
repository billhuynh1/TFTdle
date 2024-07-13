import guessedChampions from "../App";
import { Champion } from "../type";

const AttributeHeader = () => {
    const attributeContents: string[] = ['Champion', 'Name', 'Gender', 'Cost', 'Type', 'Chibi', 'Attack Range'];

    return (
        <div className="attribute-container">
            {attributeContents.map((content, index) => (
                <div key={index} className="attribute-square">
                    <div className="square-content">{content}</div>
                    <hr /> 
                </div>
            ))}
        </div>
    );
};

export default AttributeHeader;
