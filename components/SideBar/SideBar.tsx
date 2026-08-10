"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  ClipboardList,
  LogOut,
  UserRound,
} from "lucide-react";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    router.push("/login");
  };

  return (
    <aside
      className={`relative min-h-screen bg-gray-800 text-white p-5 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <button onClick={() => setCollapsed(!collapsed)} className="mb-8">
        <Menu size={28} />
      </button>

      {!collapsed && <h1 className="text-2xl font-bold mb-8">Todo App</h1>}

      <nav className="flex flex-col gap-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <LayoutDashboard />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <a
          href="#todos-section"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <ClipboardList />
          {!collapsed && <span>Todos</span>}
        </a>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:text-red-400"
        >
          <LogOut />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>

      <div
        className="absolute bottom-5 left-5 flex items-center gap-3"
        title="Admin User"
      >
        <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-600 flex items-center justify-center text-white">
          <UserRound size={18} />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Admin User</span>
            <span className="text-xs text-gray-400">Admin</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
