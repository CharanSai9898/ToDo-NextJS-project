"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, LayoutDashboard, ClipboardList, LogOut } from "lucide-react";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside
      className={`min-h-screen bg-gray-800 text-white p-5 transition-all duration-300 ${
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
    </aside>
  );
};

export default SideBar;
