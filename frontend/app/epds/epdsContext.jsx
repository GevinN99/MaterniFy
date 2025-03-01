import { createContext, useState, useContext } from "react";

const EpdsContext = createContext();

export const useEpds = () => useContext(EpdsContext);

export const EpdsProvider = ({ children }) => {
    const [responses, setResponses] = useState(Array(10).fill(null))
    const [score, setScore] = useState(0);


    const updateResponse = (index, value) => {
        const updateResponse = [...responses];
        updateResponse[index] = value;
        setResponses(updateResponse);
    };

    const calculateScore = () => {
        const total = responses.reduce((acc, val) => acc + (val || 0), 0);
        setScore(total);
    };

    return (
        <EpdsContext.Provider value={{ responses, updateResponse, score, calculateScore }}>
            {children}
        </EpdsContext.Provider>
    );
};