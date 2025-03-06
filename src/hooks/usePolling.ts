import { useEffect } from "react";

const usePolling = () => {
  useEffect(() => {
    const checkReset = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        localStorage.clear();
        alert("New daily! Please refresh the page.");
      }
    };

    const interval = setInterval(checkReset, 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default usePolling;
