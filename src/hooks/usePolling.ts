import { useEffect } from "react";

// Might need to change to UTC time
const usePolling = () => {
  useEffect(() => {
    const checkReset = () => {
      const now = new Date();
      if (now.getUTCHours() === 0 && now.getUTCMinutes() === 0) {
        // localStorage.clear();
        localStorage.removeItem("finisher_guesses");
        localStorage.removeItem("guesses");
        localStorage.removeItem("littlelegend_guesses");
        alert("New daily! Please refresh the page.");
      }
    };

    const interval = setInterval(checkReset, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default usePolling;
