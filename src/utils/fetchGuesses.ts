const fetchGuesses = (): string | null => {
  const guesses: string | null = localStorage.getItem("guesses");
  return guesses;
};

export default fetchGuesses;
