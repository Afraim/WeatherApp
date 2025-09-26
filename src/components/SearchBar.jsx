import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex items-center gap-3">
      <input
  value={q}
  onChange={(e) => setQ(e.target.value)}
  placeholder="Search for a place..."
  className="flex-1 bg-white/6 placeholder-gray-500 text-black rounded-lg py-3 px-4 focus:outline-none"
/>

      <button className="bg-blue-500 hover:bg-blue-600 px-4 py-3 rounded-lg shadow">Search</button>
    </form>
  );
}
