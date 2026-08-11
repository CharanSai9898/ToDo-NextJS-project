"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import TodoForm from "@/components/TodoForm/TodoForm";
import Todotable from "@/components/TodoTable/TodoTable";
import Pagination from "@/components/Pagination/Pagination";
import { getTodos, searchTodos } from "@/services/todoService";
import type { Todo } from "@/types/todo";

export default function DashBoardPage() {
  const LIMIT = 5;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({page: 1,limit: LIMIT,total: 0,});

  const fetchTodos = async () => {
    try {
      const trimmedSearch = debouncedSearch.trim();
      const result = trimmedSearch === "" ? await getTodos(page, LIMIT): await searchTodos(trimmedSearch, page, LIMIT);

      if (!result.success) {
        setTodos([]);
        return;
      }

      const data = result.data ?? [];
      const nextPagination = result.pagination ?? {page,limit: LIMIT,total: data.length,};
      setTodos(data);
      setPagination(nextPagination);
      const nextTotalPages = Math.ceil(nextPagination.total / nextPagination.limit,);

      if (nextTotalPages === 0 && page !== 1) {
        setPage(1);
      } else if (nextTotalPages > 0 && page > nextTotalPages) {
        setPage(nextTotalPages);
      }
    } catch {
      setTodos([]);
    }
  };

  useEffect(() => {
    const trimmedSearch = search.trim();
    if (trimmedSearch === "") {
      setDebouncedSearch("");
      setPage(1);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedSearch(trimmedSearch);
      setPage(1);
    }, 500);
     return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchTodos();
  }, [page, debouncedSearch]);

  const handleTodoCreated = (newTodo: Todo) => {
    setPagination((previousPagination) => ({...previousPagination,total: previousPagination.total + 1,}));

    if (page === 1 && debouncedSearch === "")
      {
      setTodos((currentTodos) => [newTodo, ...currentTodos].slice(0, LIMIT),);
    }
  };

  const handleTodoUpdated = (updatedTodo: Todo) => 
    {
    setTodos((currentTodos) => currentTodos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo,),);
  };

  const handleTodoDeleted = (id: string) => {
    setTodos((currentTodos) => { const updatedTodos = currentTodos.filter((todo) => todo.id !== id,);

      if (updatedTodos.length === 0 && page > 1) { setPage((previousPage) => previousPage - 1);}
      return updatedTodos;
    });

    setPagination((previousPagination) => ({ ...previousPagination,total: Math.max(0, previousPagination.total - 1),}));
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit,);

  const handlePageChange = (nextPage: number) => {
if (todos.length === 0) {
      return;
    }

    if (nextPage < 1 || nextPage > totalPages) {
      return;
    }

    setPage(nextPage);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

      <TodoForm onTodoCreated={handleTodoCreated} onTodoUpdated={handleTodoUpdated} editingTodo={editingTodo} onEditComplete={() => setEditingTodo(null)}/>

      <SearchBar search={search} setSearch={setSearch} />

      <Todotable todos={todos} onEdit={setEditingTodo} onDelete={handleTodoDeleted}/>

      <Pagination page={page} totalPages={totalPages} totalRecords={pagination.total} limit={LIMIT} onPageChange={handlePageChange}/>
    </>
  );
}
