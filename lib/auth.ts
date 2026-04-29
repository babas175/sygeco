export type User = {
  id: string;
  email: string;
  role: "SUPERADMIN" | "ADMIN" | "PROF" | "ELEVE";
  ecole_id?: string | null;
};

const TOKEN_KEY = "token";
const USER_KEY = "user";

/* TOKEN */
export function getToken(): string | null {
  if (typeof globalThis === "undefined") return null;
  return globalThis.localStorage?.getItem(TOKEN_KEY) ?? null;
}

export function setToken(token: string) {
  if (typeof globalThis === "undefined") return;
  globalThis.localStorage?.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  if (typeof globalThis === "undefined") return;
  globalThis.localStorage?.removeItem(TOKEN_KEY);
}

/* USER */
export function getUser(): User | null {
  if (typeof globalThis === "undefined") return null;

  const user = globalThis.localStorage?.getItem(USER_KEY);
  if (!user) return null;

  try {
    return JSON.parse(user) as User;
  } catch {
    return null;
  }
}

export function setUser(user: User) {
  if (typeof globalThis === "undefined") return;
  globalThis.localStorage?.setItem(USER_KEY, JSON.stringify(user));
}

export function removeUser() {
  if (typeof globalThis === "undefined") return;
  globalThis.localStorage?.removeItem(USER_KEY);
}

/* AUTH */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/* ROLE HELPERS */
export function isSuperAdmin() {
  return getUser()?.role === "SUPERADMIN";
}

export function isAdmin() {
  return getUser()?.role === "ADMIN";
}

export function isProf() {
  return getUser()?.role === "PROF";
}

export function isEleve() {
  return getUser()?.role === "ELEVE";
}

export function logout() {
  removeToken();
  removeUser();

  if (typeof globalThis !== "undefined") {
    globalThis.location.href = "/login";
  }
}