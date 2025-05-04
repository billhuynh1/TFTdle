import { useEffect } from "react";
import resetDailyData from "../utils/resetDailyData.ts";

// Might need to change to UTC time
const usePolling = () => {
  useEffect(() => {
    const checkReset = () => {
      const now = new Date();
      if (now.getUTCHours() === 0 && now.getUTCMinutes() === 0) {
        resetDailyData();
        alert("New daily! Please refresh the page.");
      }
    };

    const interval = setInterval(checkReset, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default usePolling;
