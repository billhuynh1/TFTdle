import React from "react";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
  position?: "top" | "bottom";
};

const Tooltip = ({ children, content, position }: TooltipProps) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className={`tooltip-content ${position === "top" ? "top" : ""}`}>
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
