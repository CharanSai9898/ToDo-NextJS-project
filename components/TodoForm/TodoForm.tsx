"use client";

import { useState,useEffect } from "react";
import { createTodo,updateTodo} from "@/services/todoService";

import type { Todo } from '@/types/todo';
import { toast } from "react-toastify";

type TodoFormProps = {
  onTodoCreated: () => Promise<void>;
  editingTodo: Todo| null;
  onEditComplete:() => void;
};

const TodoForm = ({ onTodoCreated,editingTodo,onEditComplete }: TodoFormProps) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
  });
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    if(editingTodo){
      setForm({
        title:editingTodo.title,
        description:editingTodo.description,
        status:editingTodo.status,
      })
    }
  },[editingTodo])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.warning("Please login first");
      return;
    }

    try {
      let result;
      setLoading(true);
      if(editingTodo){
        result = await updateTodo(editingTodo.id,form);
      }else{
        result = await createTodo(form);
      }

      console.log(result);

      if (result.success) {
        toast.success(editingTodo ? "Todo Updated Successfully!":"Todo Created Successfully");

        setForm({
          title: "",
          description: "",
          status: "Pending",
        });

        await onTodoCreated();
        onEditComplete();
      } else {
        toast.info(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 my-6"
    >
      <h2 className="text-2xl font-bold mb-6 text-black">{editingTodo?"update Todo":"Add Todo"}</h2>

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

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
      >
        {loading?editingTodo?"Updating...":"Adding...":editingTodo?"Update Todo":"Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
