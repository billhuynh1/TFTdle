import React from "react";

interface ModeButtonHoverProps {
  mode: string;
}

const ModeButtonHover: React.FC<ModeButtonHoverProps> = ({ mode }) => {
  return (
    <div className="mode__hover">
      <span className="mode__hover-text">{mode.toLocaleUpperCase()}</span>
    </div>
  );
};

export default ModeButtonHover;
