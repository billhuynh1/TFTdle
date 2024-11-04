const checkPartialGuess = (guessedChampion: string, testChampion: string) => {
  const guessedChampionSet = new Set(
    guessedChampion.split(", ").map((word) => word.trim()),
  );
  const testChampionSet = new Set(
    testChampion.split(", ").map((word) => word.trim()),
  );
  return [...guessedChampionSet].some((word) => testChampionSet.has(word));
};

export default checkPartialGuess;
