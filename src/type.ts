export interface AttributeSquareInterface {
  icon?: string;
  text: string;
  shouldShowTextOnHover: boolean;
  color?: string;
}

export interface ChampionAttributes extends AttributeSquareInterface {
  icon: string;
  gender: string;
}

export interface ChampionGuess {
  champ: string;
  isCorrect: boolean;
  sessionId: string;
  createdAt: string;
}

export interface Champion {
  imageurl: string;
  name: string;
  gender: string;
  cost: number;
  type: string;
  traits: string;
  attRange: number;
}

export interface ChampionAnswerProps {
  id: number;
  champion: Champion;
}

export default Champion;
