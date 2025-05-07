const resetDailyData = () => {
  localStorage.removeItem("classic_guesses");
  localStorage.removeItem("finisher_guesses");
  localStorage.removeItem("littlelegend_guesses");
  localStorage.removeItem("littleLegendBonusAnswer");
  localStorage.removeItem("trait_guesses");
  localStorage.removeItem("traitBonusAnswer");
  localStorage.removeItem("finishedModes");
};

export default resetDailyData;
