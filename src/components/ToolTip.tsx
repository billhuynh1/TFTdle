import React from "react";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
};

const Tooltip = ({ children, content }: TooltipProps) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip-content">{content}</span>
    </div>
  );
};

export default Tooltip;
