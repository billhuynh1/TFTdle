import { useEffect, useRef } from "react";

const DiscordPopup = () => {
  const discordPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (discordPopupRef.current) {
      discordPopupRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div className="discord-popup" ref={discordPopupRef}>
      <span style={{ color: "white" }}>ID: gorillagripcoochie</span>
    </div>
  );
};

export default DiscordPopup;
