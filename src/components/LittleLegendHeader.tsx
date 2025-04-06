import React from "react";
import { useLittleLegendContext } from "../context/LittleLegendContext.tsx";

const LittleLegendHeader: React.FC = () => {
  const { littleLegendAnswer } = useLittleLegendContext();

  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}little_legends/${littleLegendAnswer?.imageUrl}`;

  return (
    <main className="little-legend__header">
      <span className="little-legend__header__text">
        Which Little legend is this?
      </span>
      <img
        className="little-legend__image"
        src={imagePath}
        alt=""
        width={250}
        height={250}
      />
      <span className="little-legend__footer__text">Each guess zooms out</span>
    </main>
  );
};

export default LittleLegendHeader;
