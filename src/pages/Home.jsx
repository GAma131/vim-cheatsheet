import { useVimCheatsheet } from "../hooks/useVimCheatsheet";
import React, { useState } from "react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400 border-opacity-75" />
  </div>
);

const Home = () => {
  const { data, loading, error } = useVimCheatsheet();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-green-300 font-semibold mt-4 text-lg">
            Loading Vim commands...
          </p>
          <p className="text-gray-400 mt-2 text-sm">
            Please wait while we fetch the data.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
        <div className="text-center max-w-lg p-6 rounded-lg bg-gray-800 shadow-lg">
          <h3 className="text-red-400 font-bold text-xl mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-300 mb-4">
            We encountered an error while loading the data.
          </p>
          <p className="text-red-500 italic text-sm mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredData = Array.isArray(data)
    ? data
        .map((section) => ({
          ...section,
          commands: section.commands.filter(
            (command) =>
              command.command.toLowerCase().includes(searchTerm) ||
              command.description.toLowerCase().includes(searchTerm)
          ),
        }))
        .filter((section) => section.commands.length > 0)
    : [];

  return (
    <div className="m-0 p-0 w-full absolute">
      <div className="bg-gray-800 w-full py-8 px-32">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-3xl font-bold text-green-400 mb-4">
            Vim Cheatsheet
          </h1>
          <div className="h-1 w-32 bg-green-500 mx-auto rounded-full" />
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search commands..."
            className="w-full p-3 rounded-lg shadow-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {filteredData.length > 0 ? (
          filteredData.map((section, sectionIndex) => (
            <section key={sectionIndex} className="mb-5">
              <div className="relative mb-8">
                <h2 className="text-3xl md:text-3xl font-semibold text-white p-2">
                  {section.sectionTitle}
                </h2>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500" />
              </div>

              <div className="text-base grid grid-cols-1 lg:grid-cols-2 gap-2 items-stretch">
                {section.commands.map((command, commandIndex) => (
                  <div
                    key={commandIndex}
                    className="group rounded-lg shadow-md flex flex-col h-full"
                  >
                    <div className="flex flex-col sm:flex-row items-stretch h-full">
                      <div className="sm:w-2/5 p-3 bg-gray-700 font-normal flex items-center justify-center border-l-2 border-l-green-500">
                        <code className="text-green-400 font-bold">
                          {command.command}
                        </code>
                      </div>
                      <div className="sm:w-3/5 p-3 bg-gray-600 flex items-center">
                        <p className="text-white font-bold text-left">
                          {command.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12 bg-white rounded-lg shadow-sm">
            <p className="text-xl">No commands match your search</p>
            <p className="mt-2 text-sm">Try using different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
