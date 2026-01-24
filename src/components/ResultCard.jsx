import React, { useState, useId } from "react";
import { FlagSpan } from "./Flags";

const normalize = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const getHighlightedText = (text, highlight) => {
  if (!highlight) return text;
  const normText = normalize(text);
  const normHighlight = normalize(highlight);
  if (!normHighlight) return text;

  const parts = [];
  let currentIndex = 0;
  let matchIndex = normText.indexOf(normHighlight);

  while (matchIndex !== -1) {
    // text before match
    if (matchIndex > currentIndex) {
      parts.push(text.slice(currentIndex, matchIndex));
    }

    // matched text
    parts.push(
      <span key={matchIndex} className="bg-yellow-200 text-black">
        {text.slice(matchIndex, matchIndex + normHighlight.length)}
      </span>
    );

    currentIndex = matchIndex + normHighlight.length;
    matchIndex = normText.indexOf(normHighlight, currentIndex);
  }

  // remaining text
  if (currentIndex < text.length) {
    parts.push(text.slice(currentIndex));
  }

  return parts.length > 0 ? parts : text;
};

const ResultCard = ({ lang, text, index, searchQuery }) => {
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
          {getHighlightedText(text, searchQuery)}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;