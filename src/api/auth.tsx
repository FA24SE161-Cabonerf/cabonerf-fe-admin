// api/auth.ts

import { User } from "@/types/user";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const login = async (credentials: {
  email: string;
  password: string;
}): Promise<{
  access_token: string;
  refresh_token: string;
  user: User;
}> => {
  const response = await fetch(`${VITE_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await response.json();
  return data.data;
};
