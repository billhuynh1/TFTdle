import { Champion } from "../type";

type colorStatus = 'correct' | 'partial' | 'incorrect';

export const compareChampions = (guessedChampion: Champion, correctChampion: Champion): { [key: string]: colorStatus } => {

    const comparisonResult: { [key: string]: colorStatus } = {};
    
    Object.keys(guessedChampion).forEach((key) => {

    const guessedAttribute = guessedChampion[key as keyof Champion];
    const correctAttribute = correctChampion[key as keyof Champion];

    if (guessedAttribute === correctAttribute) {
        comparisonResult[key] = 'correct';
    } else if (
        typeof guessedAttribute === 'string' &&
        typeof correctAttribute === 'string' &&
        (guessedAttribute.includes(correctAttribute) || correctAttribute.includes(guessedAttribute))
    ) {
        comparisonResult[key] = 'partial';
    } else {
        comparisonResult[key] = 'incorrect';
    }});

    return comparisonResult;
};

  export default compareChampions;