import React, { useState } from 'react';
import { useVimCheatsheet } from '../hooks/useVimCheatsheet';

const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"/>
);

const Home = () => {
  const { data, loading, error } = useVimCheatsheet();
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar la búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-[#d8f3dc] font-medium">Loading Vim commands...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
        <div className="p-6 max-w-xl mx-4">
          <h3 className="text-red-400 font-semibold mb-2">Error Loading Data</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Filtrar datos por término de búsqueda
  const filteredData = Array.isArray(data)
    ? data.map((section) => ({
        ...section,
        commands: section.commands.filter((command) =>
          command.command.toLowerCase().includes(searchTerm) ||
          command.description.toLowerCase().includes(searchTerm)
        ),
      })).filter((section) => section.commands.length > 0)
    : [];

  return (
    <div className="m-0 p-0 w-full absolute">
      <div className="bg-gray-800 w-full py-8 px-32">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-3xl font-bold text-green-400 mb-4">
            Vim Cheatsheet
          </h1>
          <div className="h-1 w-32 bg-green-500 mx-auto rounded-full" />
        </div>

        {/* Search Bar */}
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
              {/* Section Title */}
              <div className="relative mb-8">
                <h2 className="text-3xl md:text-3xl font-semibold text-white p-2">
                  {section.sectionTitle}
                </h2>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"/>
              </div>

              {/* Commands Grid */}
              <div className="text-base grid grid-cols-1 lg:grid-cols-2 gap-1">
                {section.commands.map((command, commandIndex) => (
                  <div
                    key={commandIndex}
                    className="group rounded-lg shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row items-stretch border-l-2 border-l-green-500">
                      {/* Command */}
                      <div className="sm:w-2/5 p-3 bg-gray-700 font-normal">
                        <div className="flex items-center justify-center h-full">
                          <code className="text-green-400 font-bold">
                            {command.command}
                          </code>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="sm:w-3/5 p-3 bg-gray-600">
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