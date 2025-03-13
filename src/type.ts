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
  imageurl: string;
  name: string;
  gender: string;
  cost: number;
  type: string;
  traits: string;
  attRange: string;
}

export interface Chibi {
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
