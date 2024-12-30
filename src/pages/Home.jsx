import CommandSection from "../Components/CommandSection";
import ErrorMessage from "../Components/ErrorMessage";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useVimCheatsheet } from "../hooks/useVimCheatsheet";
import React, { useState } from "react";

const Home = () => {
  const { data, loading, error } = useVimCheatsheet();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = Array.isArray(data)
    ? data
        .map((section) => ({
          ...section,
          commands: section.commands.filter((command) =>
            [command.command, command.description].some((field) =>
              field.toLowerCase().includes(searchTerm)
            )
          ),
        }))
        .filter((section) => section.commands.length > 0)
    : [];

  if (loading) return <LoadingSpinner message="Loading Vim commands..." />;
  if (error)
    return (
      <ErrorMessage error={error} onRetry={() => window.location.reload()} />
    );

  return (
    <div className="m-0 p-0 w-full absolute">
      <div
        className={`bg-gray-800 w-full py-8 px-32 transition-all duration-500 ${
          isSearching ? "pt-4" : "pt-16"
        }`}
      >
        <header
          className={`text-center mb-8 transition-all duration-400 ${
            isSearching ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
          }`}
        >
          <h1
            className="text-5xl font-bold text-green-400 mb-4"
            style={{ fontFamily: '"Fira Code", monospace' }}
          >
            Vim Cheatsheet
          </h1>
          <div className="h-1 w-32 bg-green-500 mx-auto rounded-full" />
        </header>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full p-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />
        </div>

        {filteredData.length > 0 ? (
          filteredData.map((section, index) => (
            <CommandSection
              key={index}
              section={section}
              searchTerm={searchTerm}
            />
          ))
        ) : (
          <div className="text-center text-white py-12 rounded-lg shadow-sm">
            <p className="text-xl">No commands match your search</p>
            <p className="mt-2 text-sm">Try using different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
