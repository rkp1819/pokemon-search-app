"use client";

import React from "react";

interface SearchFormProps {
  types: string[];
  selectedType: string;
  searchTerm: string;
  onTypeChange: (type: string) => void;
  onSearchChange: (search: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  types,
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
}) => {
  return (
    <div className="mb-8 bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label
            htmlFor="type-select"
            className="block text-sm font-medium text-white mb-2"
          >
            Pokémon Type
          </label>
          <select
            id="type-select"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="block w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
          >
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label
            htmlFor="search-input"
            className="block text-sm font-medium text-white mb-2"
          >
            Search
          </label>
          <div className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full rounded-md border border-gray-300 shadow-sm py-2 pl-3 pr-10 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
