"use client";

import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashBoardLayout({children,}: {children: React.ReactNode;})
 {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    setIsCheckingSession(false);
  }, [router]);

  if (isCheckingSession) {
    return null;
  }
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
