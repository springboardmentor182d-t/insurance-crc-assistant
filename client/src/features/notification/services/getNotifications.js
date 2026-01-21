// client/src/features/notifications/services/getNotifications.js

import axios from "../../authentication/services/axiosInstance";

export const getNotifications = async () => {
  const response = await axios.get("/notifications/");
  return response.data;
};