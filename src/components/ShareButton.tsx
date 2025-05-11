import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useState } from "react";

type ShareButtonProps = {
  content: string;
};

const ShareButton = ({ content }: ShareButtonProps): ReactElement => {
  const [copied, setCopied] = useState<boolean>(false);
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };
  return (
    <div className="share-button-container">
      <button
        type="button"
        aria-label="share button"
        onClick={handleCopy}
        className="share-button"
      >
        <FontAwesomeIcon icon={faCopy} />
        {copied ? "Copied!" : "Copy"}
      </button>
      <button
        className="share-button share-button-twitter"
        type="button"
        aria-label="twitter share button"
      >
        <FontAwesomeIcon icon={faXTwitter} />
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
          Share
        </a>
      </button>
    </div>
  );
};

export default ShareButton;
