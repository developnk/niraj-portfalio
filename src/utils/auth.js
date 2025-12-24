const API_BASE = process.env.REACT_APP_API_URL || "";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = { message: text }; }

  if (!res.ok) {
    const errorMsg = (data && (data.message || data.error)) || text || res.statusText;
    throw new Error(errorMsg);
  }

  // Expecting { token: '...', user: { ... } }
  if (data && data.token) {
    localStorage.setItem("auth_token", data.token);
  }
  return data;
}

export function logout() {
  localStorage.removeItem("auth_token");
}

export function getToken() {
  return localStorage.getItem("auth_token");
}

export function isAuthenticated() {
  return !!getToken();
}

export function getAuthHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default { login, logout, getToken, isAuthenticated, getAuthHeader };
