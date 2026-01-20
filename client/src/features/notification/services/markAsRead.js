// client/src/features/notifications/services/markAsRead.js

import axios from "../../authentication/services/axiosInstance";

export const markAsRead = async (notificationId) => {
  await axios.post(`/notifications/${notificationId}/read`);
};
