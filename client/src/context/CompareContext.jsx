import { createContext, useContext, useState } from "react";
import { normalizePolicy } from "../utils/normalizePolicy";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [selected, setSelected] = useState([]);

  const addToCompare = (policy) => {
    setSelected((prev) => {
      if (prev.find((p) => p.id === policy.id)) return prev;
      if (prev.length >= 3) return prev;

      return [...prev, normalizePolicy(policy)]; // ✅ IMPORTANT
    });
  };

  const removeFromCompare = (id) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleCompare = (policy) => {
    setSelected((prev) => {
      const exists = prev.find((p) => p.id === policy.id);

      if (exists) {
        return prev.filter((p) => p.id !== policy.id);
      }

      if (prev.length >= 3) return prev;

      return [...prev, normalizePolicy(policy)]; // ✅ IMPORTANT
    });
  };

  const clearCompare = () => setSelected([]);

  return (
    <CompareContext.Provider
      value={{
        selected,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
