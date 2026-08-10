import type { LoginPayLoad, SignupPayload } from "@/types/todo";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const signup = async (data: SignupPayload) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const login = async (data: LoginPayLoad) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
