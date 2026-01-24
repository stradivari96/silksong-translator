import React from "react";
import ResultCard from "./ResultCard";

const TextResults = ({ values }) => {
  const cards = values.sort().map(([lang, text], i) => (
    <ResultCard key={lang + text} lang={lang} text={text} index={i} />
  ));
  return <div className="flex flex-row flex-wrap">{cards}</div>;
};

export default TextResults;