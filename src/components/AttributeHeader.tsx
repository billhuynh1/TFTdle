/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-array-index-key */
import ToolTip from "./ToolTip.tsx";

const AttributeHeader = () => {
  const attributes = {
    Champion: "Rakan, Vex, Akali, etc...",
    Gender: "Male, Female, and Other",
    Cost: "1, 2, 3, 4, 5, 6",
    Type: "Magic Carry, Attack Carry, Bruiser, Tank, etc...",
    Traits: "Bard, Bruiser, Cybernetic, etc...",
    Attack_Range: "1, 2, 3, 4",
  };

  return (
    <div className="attribute-container">
      {Object.entries(attributes).map(([key, value]) => (
        <ToolTip content={value}>
          <div key={key} className="attribute-square">
            <div className="attribute-square-content">
              {key.replaceAll("_", " ")}
            </div>

            <hr />
          </div>
        </ToolTip>
      ))}
    </div>
  );
};

export default AttributeHeader;
