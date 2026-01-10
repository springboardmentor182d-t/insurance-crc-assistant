import axios from "./axios";

/* ============================
   GET COMPARISON RULES (OPTIONAL)
   (Useful for admin / debugging)
============================ */
export const getComparisonRules = async () => {
  const res = await axios.get("/comparison/rules");
  return res.data;
};

/* ============================
   EVALUATE COMPARISON (MAIN)
============================ */
export const evaluateComparison = async (policies) => {
  const res = await axios.post("/comparison/evaluate", policies);
  return res.data;
};
