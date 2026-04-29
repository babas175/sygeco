export function getToken() {
  if (typeof globalThis === "undefined") return null;
  return localStorage.getItem("token");
}

export function setToken(token: string) {
  if (typeof globalThis === "undefined") return;
  localStorage.setItem("token", token);
}

export function removeToken() {
  if (typeof globalThis === "undefined") return;
  localStorage.removeItem("token");
}

export function getUser() {
  if (typeof globalThis === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setUser(user: any) {
  if (typeof globalThis === "undefined") return;
  localStorage.setItem("user", JSON.stringify(user));
}

export function logout() {
  removeToken();
  localStorage.removeItem("user");
  globalThis.location.href = "/login";
}

export function isAuthenticated() {
  return !!getToken();
}