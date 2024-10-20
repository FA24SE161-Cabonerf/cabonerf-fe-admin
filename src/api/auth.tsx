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

  const data = await response.json();

  if (!response.ok) {
    if (data.data) {
      if (data.data.email) {
        throw new Error(data.data.email);
      } else if (data.data.password) {
        throw new Error(data.data.password);
      }
    }
    if (data.message) {
      throw new Error(data.message);
    }
    throw new Error("Login failed");
  }

  return data.data;
};