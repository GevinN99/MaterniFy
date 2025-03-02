import React, { createContext, useState, useContext } from "react";

// 1️⃣ Create Context
const EpdsContext = createContext();

// 2️⃣ Create Provider Component
export const EpdsProvider = ({ children }) => {
  const [epdsScore, setEpdsScore] = useState(0); // Example state for EPDS score
  const [responses, setResponses] = useState([]); // Store user responses

  // Function to update score
  const updateScore = (newScore) => {
    setEpdsScore(newScore);
  };

  // Function to save responses
  const saveResponses = (newResponses) => {
    setResponses(newResponses);
  };

  return (
    <EpdsContext.Provider value={{ epdsScore, updateScore, responses, saveResponses }}>
      {children}
    </EpdsContext.Provider>
  );
};

// 3️⃣ Custom Hook for using EPDS Context
export const useEpds = () => useContext(EpdsContext);