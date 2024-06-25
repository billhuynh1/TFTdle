interface AttributeSquareProps {
    content: number | string | null;
}

const AttributeSquare: React.FC<AttributeSquareProps> = ({ content }) => {
    return (
        <div className="attribute-square">
            <div className="square-content">{content}</div>
        </div>
    );
}

export default AttributeSquare;
