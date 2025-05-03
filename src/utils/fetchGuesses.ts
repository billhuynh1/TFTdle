const fetchGuesses = (): string | null => {
  const guesses: string | null = localStorage.getItem("_guesses");
  return guesses;
};

export default fetchGuesses;
