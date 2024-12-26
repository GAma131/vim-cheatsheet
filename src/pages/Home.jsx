import React from "react";
import useVimCheatsheet from "../hooks/useVimCheatsheet";

const Home = () => {
  const { data, loading, error } = useVimCheatsheet();

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Vim Cheatsheet</h1>
      <ul className="space-y-2">
        {data.map((item, index) => (
          <li
            key={index}
            className="p-4 border rounded shadow hover:bg-gray-100 transition"
          >
            <p className="text-lg font-semibold">{item.command}</p>
            <p className="text-gray-600">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
