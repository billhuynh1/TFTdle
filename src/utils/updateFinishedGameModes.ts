export const updateFinishedGameModes = (mode: string) => {
  const finishedModes = JSON.parse(
    localStorage.getItem("finishedModes") || "[]",
  );
  if (!finishedModes.includes(mode)) {
    finishedModes.push(mode);
    localStorage.setItem("finishedModes", JSON.stringify(finishedModes));
  }
};

export const getFinishedModes = (): string[] => {
  return JSON.parse(localStorage.getItem("finishedModes") || "[]");
};
