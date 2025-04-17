import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";

export const QuestionsContext = createContext();

export default function LocationProvider({ children }) {
  const [mainQuestions, setMainQuestions] = useState({});
  useEffect(() => {}, [mainQuestions]);
  const [budget, setBudget] = useState(0);

  return (
    <QuestionsContext.Provider value={{ mainQuestions, setMainQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
}
