// src/api/fetchTodos.js
export async function fetchTodos(page = 1, limit = 10) {
  try {
    const url = `https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch todos");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
