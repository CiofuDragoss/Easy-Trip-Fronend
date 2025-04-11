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
  return (
    <QuestionsContext.Provider value={{ setMainQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
}
