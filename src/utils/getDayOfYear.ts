const getDayOfYear = (date: Date): number => {
  const startOfYear = Date.UTC(date.getUTCFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear; // Milliseconds since Jan 1st
  return Math.floor(diff / (1000 * 60 * 60 * 24)); // Convert to days
};

export default getDayOfYear;
