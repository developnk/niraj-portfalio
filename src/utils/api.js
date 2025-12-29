import { getAuthHeader } from "./auth";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const api = async (url, options = {}) => {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};
