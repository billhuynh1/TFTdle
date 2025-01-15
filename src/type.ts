export interface AttributeSquareInterface {
  icon?: string;
  text: string;
  shouldShowTextOnHover: boolean;
  color?: string;
}

export interface ChampionAnswerProps extends Champion {
  sessionId: string;
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
  attRange: string;
}

export interface ChampionAnswerProps {
  id: number;
  champion: Champion;
}

export interface SessionModel {
  sessionId: string;
  createdAt: string;
}

export default Champion;
