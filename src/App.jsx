import React, { useState, useEffect } from "react";
import queryString from "query-string";

import Layout from "./components/Layout";
import TextResults from "./components/TextResults";
import Flags from "./components/Flags";
import Form from "./components/Form";

import AllText from "./all_text.json";

const normalize = (str) => {
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  return str.toLowerCase()
}

const App = () => {
  const [inputText, setInputText] = useState("");
  const [selectedVariable, setSelectedVariable] = useState("");
  const [variables, setVariables] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(
    new Set()
  );
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    const inputText = params.search;
    const lang = params.lang;

    const selectedLanguages = new Set();
    if (lang)
      lang
        .split(",")
        .filter((x) => x.length > 0)
        .forEach((x) => selectedLanguages.add(x));
    if (inputText) {
      setInputText(inputText);
      setSelectedLanguages(selectedLanguages);
    }
  }, []);

  // Get text ids
  useEffect(() => {
    if (inputText === "") {
      setVariables([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const searchStr = normalize(inputText);
      const variables = [];
      Object.entries(AllText).forEach(([lang, data]) => {
        Object.entries(data).forEach(([k, v]) => {
          if (variables.includes(k)) return;
          if (!v) return;
          if (
            normalize(v).includes(searchStr) ||
            normalize(k).includes(searchStr)
          ) {
            variables.push(k);
          }
        });
      });
      variables.sort();
      setVariables(variables);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedLanguages, inputText]);

  // Get results
  useEffect(() => {
    let variable = selectedVariable || variables[0];

    let results = [];
    if (variables.length === 0) {
      setResults(results);
    } else {
      results = Object.entries(AllText)
        .filter(
          ([lang, data]) =>
            (selectedLanguages.size === 0 || selectedLanguages.has(lang)) &&
            data.hasOwnProperty(variable) &&
            data[variable]
        )
        .map(([lang, data]) => [lang, data[variable]]);
      setResults(results);
    }
  }, [variables, selectedLanguages, selectedVariable]);

  const onSelect = (value) => {
    setIsLoading(true);
    if (value === "All") selectedLanguages.clear();
    else {
      if (selectedLanguages.has(value)) {
        selectedLanguages.delete(value);
      } else {
        selectedLanguages.add(value);
      }
    }
    setSelectedLanguages(new Set(selectedLanguages));
  };

  return (
    <Layout>
      <div>
        <Form
          inputText={inputText}
          setInputText={(val) => {
            setInputText(val);
            if (val === "") setIsLoading(false);
            else setIsLoading(true);
          }}
          selectedLanguages={Array.from(selectedLanguages).sort()}
        />
        <Flags onSelect={onSelect} selectedLanguages={selectedLanguages} />
        <div className="px-2">
          <select
            className="block w-full border text-gray-700 py-2 my-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            value={selectedVariable}
            required
            onChange={(event) => {
              setSelectedVariable(event.target.value);
            }}
          >
            {variables.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <TextResults values={results} />
        )}
      </div>
    </Layout>
  );
};

export default App;