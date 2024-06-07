import AttributeSquare from "./components/AttributeSquare";

export interface AttributeSquareInterface {
    imageURL?: string;
    text: string;
    shouldShowTextOnHover: boolean;
    color?: string;
}

export interface ChampionAttributes extends AttributeSquareInterface{
    imageURL: string;
    gender: string;
    
}

