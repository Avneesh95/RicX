import api from "./axios";

export const getAnalytics = async () => {
  return await api.get("/admin/analytics");
};