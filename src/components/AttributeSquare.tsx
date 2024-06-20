interface AttributeSquareProps {
    content: number | string | null;
}

// AttributeSquares are going to take in the attributes as props, replace content with queried attributes from database.

const AttributeSquare: React.FC<AttributeSquareProps> = ({ content }) => {
    return (
        <div className="attribute-square">
            <div className="square-content">{content}</div>
        </div>
    );
}

export default AttributeSquare;
