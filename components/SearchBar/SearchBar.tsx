"use client";

import { Search } from "lucide-react";
import type { SearchBarProps } from "@/types/todo";

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  const handleClear = () => {
    setSearch("");
  };

  return (
    <div className="flex items-center gap-3 w-full max-w-xl">
      <div className="relative flex-1">
        <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>

        <input type="text" placeholder="Search todos..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <button type="button" onClick={handleClear} disabled={!search}
        className="rounded-lg border border-gray-500 px-5 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40">Clear
      </button>
    </div>
  );
};

export default SearchBar;
