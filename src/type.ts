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
    name: string | null;
    gender: string | null;
    cost: number | null;
    type: string | null;
    chibi: string | null;
    attRange: number | null;
}

export interface ChampionAnswerProps {
    id: number
    champion: Champion;
}


