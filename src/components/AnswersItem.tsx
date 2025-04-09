import { useGame } from "../context/GameContext.tsx";

interface AnswersItemProps<T> {
  item: T;
  pathOfImages: string;
  itemColor: string;
}

const AnswersItem = <
  T extends { name: string; baseType?: string; imageUrl: string },
>({
  item,
  pathOfImages,
  itemColor,
}: AnswersItemProps<T>) => {
  // const [itemColor, setItemColor] = useState<string>("");
  const imagePath = `${process.env.REACT_APP_AWS_S3_URL}${pathOfImages}/`;
  const { setIsFinisherGameOver } = useGame();

  // If item color is correct, set game over to true

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
