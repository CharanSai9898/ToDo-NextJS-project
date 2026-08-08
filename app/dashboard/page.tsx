"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import TodoForm from "@/components/TodoForm/TodoForm";
import Todotable from "@/components/TodoTable/TodoTable";
import Pagination from "@/components/Pagination/Pagination";
import { getTodos, searchTodos } from "@/services/todoService";
import type { Todo } from "@/types/todo";
import Loader from "@/components/Loader/Loader";

export default function DashBoardPage() {
  const LIMIT = 5;

  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const [page, setPage] = useState(1);
  const[loading,setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: LIMIT,
    total: 0,
  });

  // Fetch Todos
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const result =
        debouncedSearch.trim() === ""
          ? await getTodos(page, LIMIT)
          : await searchTodos(debouncedSearch, page, LIMIT);

      if (result.success) {
        setTodos(result.data);
        setPagination(result.pagination);
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  };

  // Debounce only search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch whenever page or debounced search changes
  useEffect(() => {
    fetchTodos();
  }, [page, debouncedSearch]);

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <TodoForm
        onTodoCreated={fetchTodos}
        editingTodo={editingTodo}
        onEditComplete={() => setEditingTodo(null)}
      />

      {loading ? (<Loader />) : (
      <Todotable todos={todos} onEdit={setEditingTodo} onDelete={fetchTodos}/>
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        totalRecords={pagination.total}
        limit={LIMIT}
        onPageChange={setPage}
      />
    </>
  );
}
