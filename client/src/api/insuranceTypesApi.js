import api from "./axios";

export const getInsuranceTypes = async () => {
  const res = await api.get("/insurance_type/");
  return res.data;
};
