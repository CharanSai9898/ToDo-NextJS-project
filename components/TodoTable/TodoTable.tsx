import type { Todo } from "@/types/todo"; 
import { deleteTodo } from "@/services/todoService";
import { toast } from "react-toastify";

type TodoTableProps = {
  todos: Todo[];
  onEdit: (todo: Todo) => void;
  onDelete: () => Promise<void>;
};
const Todotable =({todos,onEdit,onDelete}: TodoTableProps) =>{
   const handleDelete = async (id: string) => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    toast.warning("Please login first");
    return;
  }

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
  }

    }
    return (
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
            {todos.map((Todo) => (
              <tr key={Todo.id}>
                <td className="border p-3">{Todo.title}</td>
                <td className="border p-3">{Todo.description}</td>
                <td className="border p-3">{Todo.status}</td>

                <td className="border p-3">
                  {new Date(Todo.createdAt).toLocaleString()}
                </td>

                <td className="border p-3">
                  {Todo.updatedAt === "0001-01-01T00:00:00Z"
                    ? "-"
                    : new Date(Todo.updatedAt).toLocaleString()}
                </td>

                <td className="border p-3">{Todo.createdById}</td>

                <td className="border p-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => onEdit(Todo)}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(Todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
export default Todotable;