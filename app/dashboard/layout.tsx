"use client";
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashBoardLayout({children,}:{children: React.ReactNode;}){
  const router = useRouter();

  useEffect (() =>{
    const token = sessionStorage.getItem("token");
    if(!token){
      router.push("/login");
    }
  },[router])
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