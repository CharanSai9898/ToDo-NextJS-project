"use client";

import { useEffect, useState } from "react";
import { createTodo, updateTodo } from "@/services/todoService";
import type { Todo, TodoPayload } from "@/types/todo";
import { toast } from "react-toastify";
import type { TodoFormState, TodoFormProps } from "@/types/todo";

const initialForm: TodoFormState = {
  title: "",
  description: "",
  status: "Pending",
};

const TodoForm = ({
  onTodoCreated,
  onTodoUpdated,
  editingTodo,
  onEditComplete,
}: TodoFormProps) => {
  const [form, setForm] = useState<TodoFormState>(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setForm({
        title: editingTodo.title,
        description: editingTodo.description,
        status: editingTodo.status,
      });
    } else {
      setForm(initialForm);
    }
  }, [editingTodo]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const normalizedForm = {
    title: form.title.trim(),
    description: form.description.trim(),
    status: form.status,
  };

  const hasChanges = editingTodo
    ? normalizedForm.title !== editingTodo.title.trim() ||
      normalizedForm.description !== editingTodo.description.trim() ||
      normalizedForm.status !== editingTodo.status
    : true;

  const handleCreateNewTodo = () => {
    setForm(initialForm);
    onEditComplete();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (!normalizedForm.title) {
      toast.error("Title is required");
      return;
    }

    if (!normalizedForm.description) {
      toast.error("Description is required");
      return;
    }

    if (editingTodo && !hasChanges) {
      toast.info("No changes were made");
      return;
    }

    const payload: TodoPayload = {
      title: normalizedForm.title,
      description: normalizedForm.description,
      status: normalizedForm.status,
    };

    try {
      setLoading(true);

      const result = editingTodo
        ? await updateTodo(editingTodo.id, payload)
        : await createTodo(payload);

      if (!result.success) {
        toast.error(result.message || "Unable to save todo");
        return;
      }

      if (editingTodo) {
        onTodoUpdated(result.data);
        toast.success("Todo Updated Successfully!");
      } else {
        onTodoCreated(result.data);
        toast.success("Todo Created Successfully");
      }

      setForm(initialForm);
      onEditComplete();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 my-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-black">
        {editingTodo ? "update Todo" : "Add Todo"}
      </h2>

      <div className="mb-4">
        <label className="block mb-2 text-black">Title</label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 text-black"
          placeholder="Enter title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-black">Description</label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-lg px-4 py-2 text-black"
          placeholder="Enter description"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-black">Status</label>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 text-black"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-3">
        {editingTodo && (
          <button
            type="button"
            onClick={handleCreateNewTodo}
            disabled={loading}
            className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg"
          >
            Create New Todo
          </button>
        )}

        <button
          type="submit"
          disabled={loading || (Boolean(editingTodo) && !hasChanges)}
          className="bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-lg"
        >
          {loading
            ? editingTodo
              ? "Updating..."
              : "Adding..."
            : editingTodo
              ? "Update Todo"
              : "Add Todo"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
