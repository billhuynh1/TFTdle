import React from "react";

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

export interface GameContextType {
  isGameOver?: boolean;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  isFinisherGameOver?: boolean;
  setIsFinisherGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  randomIndex: number;
  setRandomIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface SearchLockContextType {
  isSearchLock?: boolean;
  setIsSearchLock: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChampionGuess {
  champ: string;
  isCorrect: boolean;
  sessionId: string;
  createdAt: string;
}
export interface Champion {
  imageUrl: string;
  name: string;
  gender: string;
  cost: number;
  type: string;
  traits: string;
  attRange: string;
}

export interface Chibi {
  id: number;
  name: string;
  imageUrl: string;
  gifUrl: string;
}

export interface ChampionAnswerProps {
  id: number;
  champion: Champion;
}

export interface SessionModel {
  sessionId: string;
  createdAt: string;
}

export interface LayoutProps {
  handleToggleAbout: () => void;
  handleToggleDiscordPopup: () => void;
  renderAbout: boolean;
  renderDiscordPopup: boolean;
  renderHints: boolean;
}

export interface ClassicPageProps {
  testChampion?: Champion;
  attempts: number;
  isGameOver: boolean;
  isSearchLock: boolean;
  championList: Array<{ name: string; imageurl: string }>;
  sessionId: string;
  setGuessedChampions: React.Dispatch<React.SetStateAction<Champion[]>>;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
  setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  renderLoading: () => React.JSX.Element;
}

export interface ChampionContextType {
  testChampion: Champion | null;
  championList: Champion[];
  guessedChampions: Champion[];
  setGuessedChampions: React.Dispatch<React.SetStateAction<Champion[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export interface AttemptsContextType {
  attempts: number;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
}

export interface ChibiContextType {
  chibiFinisherAnswer: Chibi | undefined;
  chibiList: Chibi[];
  guessedChibis: Chibi[];
  setGuessedChibis: React.Dispatch<React.SetStateAction<Chibi[]>>;
  setChibiFinisherAnswer: React.Dispatch<
    React.SetStateAction<Chibi | undefined>
  >;
}

export interface DateContextType {
  today: string;
  lastVisit: string | null;
  setLastVisit: React.Dispatch<React.SetStateAction<string | null>>;
}

export type LittleLegend = {
  id: number;
  name: string;
  baseType: string;
  imageUrl: string;
};

export type LittleLegendContextType = {
  littleLegendList: LittleLegend[];
  guessedLittleLegends: LittleLegend[];
  setGuessedLittleLegends: React.Dispatch<React.SetStateAction<LittleLegend[]>>;
  littleLegendAnswer: LittleLegend | undefined;
  setLittleLegendAnswer: React.Dispatch<
    React.SetStateAction<LittleLegend | undefined>
  >;
  isLittleLegendGameOver: boolean;
  setIsLittleLegendGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Trait = {
  id: number;
  name: string;
  description: string;
  champs: string;
  imageUrl: string;
  set: number;
};

export type TraitContextType = {
  traitList: Trait[];
  guessedTraits: Trait[];
  setGuessedTraits: React.Dispatch<React.SetStateAction<Trait[]>>;
  traitAnswer: Trait | undefined;
  setTraitAnswer: React.Dispatch<React.SetStateAction<Trait | undefined>>;
  isTraitGameOver: boolean;
  setIsTraitGameOver: React.Dispatch<React.SetStateAction<boolean>>;
};
