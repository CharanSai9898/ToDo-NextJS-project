"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md mb-6">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
