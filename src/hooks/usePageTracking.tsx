import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const GA_TRACKING_ID = "G-EX56T8J0ZS"; // Replace with your GA4 ID

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag?.("config", GA_TRACKING_ID, { page_path: location.pathname });
    }
  }, [location]);
};

export default usePageTracking;
