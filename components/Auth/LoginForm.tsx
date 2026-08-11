"use client";
import { useEffect, useState } from "react";
import { login } from "@/services/authservice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();

  const [form, setForm] = useState({email: "",password: "",});

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
      return;
    }
    setIsCheckingSession(false);
  }, [router]);

  if (isCheckingSession) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((previousForm) => ({...previousForm, [name]: value,}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = form.email.trim();
    if (!email) {
      toast.error("Email is required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!form.password) {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);
      const result = await login({
        email,
        password: form.password,
      });

      if (result.success) {
        sessionStorage.setItem("token", result.token);
        if (result.user?.id) {
          sessionStorage.setItem("userId", result.user.id);
        }
        toast.success("Login Successful!");
        router.push("/dashboard");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-black"> Login </h1>

      <div className="mb-4">
          <label className="block mb-2 text-black">Email</label>
          <input type="email" name="email" placeholder="Enter Email" value={form.email} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 text-black"/>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-black">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Enter password" className="w-full border rounded-lg px-4 py-2 pr-12 text-black"/>

            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">No account?{" "}<Link href="/signup" className="font-semibold text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
