// src/components/todos.jsx
import { useState, useEffect } from "react";
import { fetchTodos } from "../api/fetchTodos";
import Card from "./card";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchTodos(1, 10)
      .then((data) => {
        if (!isMounted) return;
        setTodos(data);
        setHasMore(data.length === 10);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    fetchTodos(nextPage, 10)
      .then((data) => {
        setTodos((prev) => [...prev, ...data]);
        setPage(nextPage);
        setHasMore(data.length === 10);
        setLoadingMore(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingMore(false);
      });
  };

  const filtered = todos.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading todos...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos..."
        className="w-full border rounded p-2 dark:bg-gray-800 dark:text-gray-100"
      />

      <div className="space-y-2">
        {filtered.map((todo) => (
          <Card key={todo.id} className="flex justify-between items-center">
            <span className={todo.completed ? "line-through text-gray-400" : ""}>
              {todo.title}
            </span>
            <span className="text-sm text-gray-500">{todo.completed ? "Done" : "Pending"}</span>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          className="px-4 py-2 rounded font-semibold bg-purple-500 text-white hover:bg-purple-600 disabled:opacity-50"
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}
