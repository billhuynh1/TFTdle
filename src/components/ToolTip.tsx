import React from "react";

type TooltipProps = {
  children: React.ReactNode;
  text: string;
};

const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span className="">{text}</span>
    </div>
  );
};

export default Tooltip;
