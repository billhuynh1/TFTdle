import guessedChampions from "../App";
import { Champion } from "../type";

const AttributeHeader = () => {
    const attributeContents: string[] = ['Img', 'Champion', 'Gender', 'Cost', 'Type', 'Chibi', 'Attack Range'];

    return (
        <div className="attribute-container">
            <div className="attribute-square">
            {attributeContents.map((content, index) => (
                <div key={index} className="square-content">
                    {content}
                </div>
            ))}
            </div>
        </div>
    );
};

export default AttributeHeader;
