import React, { useState, useId } from "react";
import { FlagSpan } from "./Flags";

const ResultCard = ({ lang, text, index }) => {
  const [showAlert, setShowAlert] = useState(false);
  const uniqueId = useId();
  
  // Preserve the legacy ID for the first item if strictly needed by external CSS/JS, 
  // otherwise fallback to a unique ID.
  const divId = index === 0 ? "fkrc-checkbox" : uniqueId;

  const handleCopy = () => {
    setShowAlert(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => setShowAlert(false), 1000);
  };

  return (
    <div className="flex-grow sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 py-2">
      <div className="bg-gray-100 rounded px-2 py-2 shadow h-full">
        <div
          role="button"
          tabIndex={0}
          id={divId}
          className="focus:outline-none hover:bg-gray-400 hover:text-black text-gray-100 cursor-pointer px-2 rounded flex flex-row"
          onClick={handleCopy}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleCopy();
            }
          }}
        >
          <FlagSpan value={lang} />
          <p className="px-1 whitespace-pre">
            {showAlert ? "Copied!   " : "Copy text"}
          </p>
        </div>
        <p className="px-2 py-2 break-words" style={{ whiteSpace: "pre-line" }}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;