import AttributeSquare from "./components/AttributeSquare";

export interface AttributeSquareInterface {
    icon?: string;
    text: string;
    shouldShowTextOnHover: boolean;
    color?: string;
}

export interface ChampionAttributes extends AttributeSquareInterface{
    icon: string;
    gender: string;
     
}

