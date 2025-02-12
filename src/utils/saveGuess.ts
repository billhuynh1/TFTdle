// LOCAL STORAGE DEVELOPMENT
const saveGuess = (guesses: string[]) => {
  localStorage.setItem("guesses", JSON.stringify(guesses));
};

export default saveGuess;
