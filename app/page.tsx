import SideBar from "@/components/SideBar/SideBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <SideBar/>

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Dashboard page</h1>
      </main>
    </div>
  );
}
