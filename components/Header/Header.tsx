import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const HandleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <header className="flex items-center justify-between border-b p-4 bg-white">
      <h1 className="text-2xl font-bold text-black ">Todo Dashboard</h1>
      <button onClick={HandleLogout} className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"> Logout </button>
    </header>
  );
};

export default Header;
