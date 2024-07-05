import AttributeSquare from "./components/AttributeSquare";

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

export interface Champion {
    imageurl: string;
    name: string;
    gender: string;
    cost: number;
    type: string;
    chibi: string;
    attRange: number;
}

export interface ChampionAnswerProps {
    id: number
    champion: Champion;
}


