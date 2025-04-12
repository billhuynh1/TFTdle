import React, { useEffect } from "react";

interface AnswersItemProps<T> {
  item: T;
  pathOfImages: string;
  itemColor: string;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnswersItem = <
  T extends { name: string; baseType?: string; imageUrl: string },
>({
  item,
  pathOfImages,
  itemColor,
  setIsGameOver,
}: AnswersItemProps<T>) => {
  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}${pathOfImages}/`;

  // If item color is correct, set game over to true
  useEffect(() => {
    if (itemColor === "correct") {
      setIsGameOver(true);
    }
  }, []);

  return (
    <div className={`answers__item ${itemColor}`}>
      <div className="answers__content">
        <img
          src={`${imagePath}${item.imageUrl}`}
          alt={item.name}
          width={40}
          height={40}
          className="answers__item__image"
        />
        <span className="answers__item__text">
          {item.name.replaceAll("_", " ")}
        </span>
      </div>
    </div>
  );
};

export default AnswersItem;
