// lib/api.ts

export const API_URL = "http://localhost:3001";

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erreur de connexion");
  }

  return data;
}