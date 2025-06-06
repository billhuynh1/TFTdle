import React, { useEffect, useState } from "react";
import { useLittleLegendContext } from "../context/LittleLegendContext";
import getDayOfYear from "../utils/getDayOfYear";

type LittleLegendHeaderProps = {
  isGameOver: boolean;
};

const LittleLegendHeader: React.FC<LittleLegendHeaderProps> = ({
  isGameOver,
}) => {
  const { littleLegendAnswer, guessedLittleLegends } = useLittleLegendContext();
  const [backgroundPosition, setBackgroundPosition] = useState<string>("");
  const [zoom, setZoom] = useState<string>("350%");
  const imagePath: string = `${process.env.REACT_APP_AWS_S3_URL}little_legends/${littleLegendAnswer?.imageUrl}`;

  useEffect(() => {
    const positions = [
      "left",
      "center",
      "bottom right",
      "top right",
      "right",
      "bottom",
      "top",
    ];
    if (littleLegendAnswer) {
      // Get the current day of the year and use it to set the background position
      // This will change the background position every day
      setBackgroundPosition(
        positions[getDayOfYear(new Date()) % positions.length],
      );
    }
  }, [littleLegendAnswer]);

  // Set the zoom level based on the number of guessed little legends
  useEffect(() => {
    if (isGameOver) {
      setZoom("100%");
      return;
    }
    if (guessedLittleLegends.length > 0 && zoom !== "100%") {
      setZoom(`${350 - guessedLittleLegends.length * 13}%`);
    }
  }, [guessedLittleLegends, isGameOver]);

  return (
    <main className="little-legend__header">
      <span className="little-legend__header__text">
        Which little legend is this?
      </span>
      <div
        className="little-legend__image"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundPosition: `${backgroundPosition}`,
          backgroundSize: `${zoom}`,
        }}
      />
      <span className="little-legend__footer__text">Each guess zooms out</span>
    </main>
  );
};

export default LittleLegendHeader;
