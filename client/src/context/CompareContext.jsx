import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { normalizePolicy } from "../utils/normalizePolicy";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState([]);

  // 🔑 track previous length to detect ADD vs REMOVE
  const prevLengthRef = useRef(0);

  /* --------------------------------
     Normalize policy (single source)
  ---------------------------------- */
  const preparePolicy = (policy) => {
    if (!policy) return null;

    const normalized = normalizePolicy(policy);

    if (!normalized?.id) {
      console.warn(
        "Compare skipped: policy missing id",
        policy
      );
      return null;
    }

    return normalized;
  };

  /* --------------------------------
     ADD TO COMPARE
  ---------------------------------- */
  const addToCompare = (policy) => {
    const normalized = preparePolicy(policy);
    if (!normalized) return;

    setSelected((prev) => {
      if (prev.some((p) => p.id === normalized.id)) return prev;
      if (prev.length >= 3) return prev;
      return [...prev, normalized];
    });
  };

  /* --------------------------------
     REMOVE FROM COMPARE
  ---------------------------------- */
  const removeFromCompare = (id) => {
    setSelected((prev) => prev.filter((p) => p.id !== id));
  };

  /* --------------------------------
     TOGGLE COMPARE
  ---------------------------------- */
  const toggleCompare = (policy) => {
    const normalized = preparePolicy(policy);
    if (!normalized) return;

    setSelected((prev) => {
      const exists = prev.some((p) => p.id === normalized.id);

      if (exists) {
        return prev.filter((p) => p.id !== normalized.id);
      }

      if (prev.length >= 3) return prev;

      return [...prev, normalized];
    });
  };

  /* --------------------------------
     CLEAR ALL
  ---------------------------------- */
  const clearCompare = () => {
    setSelected([]);
  };

  /* --------------------------------
     GLOBAL AUTO-REDIRECT (FINAL LOGIC)
  ---------------------------------- */
  useEffect(() => {
    const isOnComparePage =
      location.pathname === "/compare";

    // redirect ONLY when an item is ADDED
    if (
      selected.length > prevLengthRef.current &&
      !isOnComparePage
    ) {
      navigate("/compare");
    }

    // update previous length
    prevLengthRef.current = selected.length;
  }, [selected.length, location.pathname, navigate]);

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

/* --------------------------------
   CUSTOM HOOK
---------------------------------- */
export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error(
      "useCompare must be used within CompareProvider"
    );
  }
  return context;
};
