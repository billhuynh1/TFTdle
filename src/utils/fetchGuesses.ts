const fetchGuesses = (): string => {
  const guesses: string = localStorage.getItem("guesses") || "";
  return guesses;
};

export default fetchGuesses;
