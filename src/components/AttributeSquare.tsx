/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import { Champion } from "../type";
import { useChampionContext } from "../App";

interface AttributeSquareProps {
	pos: keyof Champion;
	champion: Champion
}

const AttributeSquare: React.FC<AttributeSquareProps> = ({ pos, champion }) => {

	const [squareColor, setSquareColor] = useState<string>("");
	const testChampion = useChampionContext();
	const imagePath = "https://tftdle.s3.us-east-2.amazonaws.com/images/";

	useEffect(() => {
		if (testChampion && champion[pos] === testChampion[pos]) {
			setSquareColor("correct")
		} else if (testChampion?.[pos]?.toString().includes(champion?.[pos]?.toString() ?? '')) {
			setSquareColor("partial")
		} else {
			setSquareColor("incorrect")
		}
	}, [champion[pos]])

	const isImage = (url: string | number) => {
		if (typeof url != 'string') {
			return false;
		}
		const regex = /\.(jpg|jpeg|png|gif|bmp|svg)$/;
		return regex.test(url);
	};

	return (
		<>
			{isImage(champion[pos]) ? (
				<div className="icon-container">
					<img
						className="champion-image"
						src={`${imagePath}${champion.imageurl}`}
						alt="Champion"
					/>
				</div>
			) : (
				<div className={`attribute-square ${squareColor}`}>
					<div className="square-content">{champion[pos]}</div>
				</div>
			)}
		</>
	);
};

export default AttributeSquare; 
