/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-array-index-key */

const AttributeHeader = () => {
  const attributeContents: string[] = [
    "Champion",
    "Name",
    "Gender",
    "Cost",
    "Type",
    "Traits",
    "Attack Range",
  ];

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
