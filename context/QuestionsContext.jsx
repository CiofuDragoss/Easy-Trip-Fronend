import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { sendShopping } from "@/utils/api";

import { useApiWithRefresh } from "@/hooks/refreshHook";
export const QuestionsContext = createContext();

export default function QuestionsProvider({ children }) {
  const { startWRefresh } = useApiWithRefresh();
  const [MainQuestions, setMainQuestions] = useState({});
  const [HistoryQuestions, setHistoryQuestions] = useState({});
  const [ExperienceQuestions, setExperienceQuestions] = useState({});
  const [FoodQuestions, setFoodQuestions] = useState({});
  const [DrinksQuestions, setDrinksQuestions] = useState({});
  const [NightLifeQuestions, setNightLifeQuestions] = useState({});
  const [ShoppingQuestions, setShoppingQuestions] = useState({});

  console.log(
    "MainQuestions",
    MainQuestions,
    "HistoryQuestions",
    HistoryQuestions,
    "ExperienceQuestions",
    ExperienceQuestions,
    "FoodQuestions",
    FoodQuestions,
    "DrinksQuestions",
    DrinksQuestions,
    "NightLifeQuestions",
    NightLifeQuestions,
    "ShoppingQuestions",
    ShoppingQuestions
  );
  return (
    <QuestionsContext.Provider
      value={{
        setMainQuestions,
        setHistoryQuestions,
        setExperienceQuestions,
        setFoodQuestions,
        setDrinksQuestions,
        DrinksQuestions,
        setNightLifeQuestions,
        setShoppingQuestions,
        MainQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}
