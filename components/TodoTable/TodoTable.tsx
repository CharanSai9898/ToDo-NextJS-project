"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import type { Todo } from "@/types/todo";
import { deleteTodo } from "@/services/todoService";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

type TodoTableProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: () => Promise<void>;
};

const Todotable = ({ todos, onEdit, onDelete }: TodoTableProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteTodo(id);

      if (result.success) {
        toast.success("Todo deleted successfully!");

        await onDelete();
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsDialogOpen(false);
      setSelectedTodoId(null);
    }
  };

  return (
    <>
      <div id="todos-section">
        <table className="w-full border-collapse border border-gray-300 mt-6">
          <thead>
            <tr className="bg-gray-200 text-black">
              <th className="border p-3">Title</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Created At</th>
              <th className="border p-3">Updated At</th>
              <th className="border p-3">Created By</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td className="border p-3">{todo.title}</td>

                <td className="border p-3">{todo.description}</td>

                <td className="border p-3">{todo.status}</td>

                <td className="border p-3">
                  {new Date(todo.createdAt).toLocaleString()}
                </td>

                <td className="border p-3">
                  {todo.updatedAt === "0001-01-01T00:00:00Z"
                    ? "-"
                    : new Date(todo.updatedAt).toLocaleString()}
                </td>

                <td className="border p-3">{todo.createdById}</td>

                <td className="border p-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => onEdit(todo)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setSelectedTodoId(todo.id);
                      setIsDialogOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete Todo"
        message="Are you sure you want to delete this todo?"
        onCancel={() => {
          setIsDialogOpen(false);
          setSelectedTodoId(null);
        }}
        onConfirm={() => {
          if (selectedTodoId) {
            handleDelete(selectedTodoId);
          }
        }}
      />
    </>
  );
};

export default Todotable;
