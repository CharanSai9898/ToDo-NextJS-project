import apiFetch from "@/services/api";

const BASE_URL = "https://go-assignment-7-production.up.railway.app/todos";

export type TodoPayload = {
  title: string;
  description: string;
  status: string;
};


export const createTodo = async (data: TodoPayload) => {
  return apiFetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const getTodos = async (page: number = 1, limit: number = 5) => {
  return apiFetch(`${BASE_URL}?page=${page}&limit=${limit}`);
};

export const updateTodo = async (id: string, data: TodoPayload) => {
  return apiFetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};


export const deleteTodo = async (id: string) => {
  return apiFetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};


export const searchTodos = async (
  title: string,
  page: number = 1,
  limit: number = 5,
) => {
  return apiFetch(
    `${BASE_URL}/search?title=${encodeURIComponent(
      title,
    )}&page=${page}&limit=${limit}`,
  );
};
