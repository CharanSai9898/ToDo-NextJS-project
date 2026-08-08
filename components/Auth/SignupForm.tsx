"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "@/app/services/authservice";
import { toast } from "react-toastify";

const SignupForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signup(form);

      console.log(result);

      if (result.success) {
        toast.success("Signup Successful!");
        router.push("/login");
      } else {
        toast.success(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }

    
  };

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   console.log("Form Submitted");
//   console.log(form);

//   try {
//     const result = await signup(form);

//     console.log("API Response:", result);

//     if (result.success) {
//       alert("Signup Successful!");
//     } else {
//       alert(result.message);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Something went wrong.");
//   }
// };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Signup
        </h1>

        <div className="mb-4">
          <label className="block mb-2 text-black">Name</label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-black">Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-black">Password</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
