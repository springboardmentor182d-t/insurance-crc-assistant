import { createContext, useContext, useState } from "react";

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (policy) => {
    if (compareList.length < 3 && !compareList.find(p => p.id === policy.id)) {
      setCompareList([...compareList, policy]);
    }
  };

  const removeFromCompare = (id) => {
    setCompareList(compareList.filter(p => p.id !== id));
  };

  return (
    <AnalyticsContext.Provider value={{ compareList, addToCompare, removeFromCompare }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
