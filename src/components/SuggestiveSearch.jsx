
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "YOUR_SPOONACULAR_API_KEY";
const BASE_URL = "https://api.spoonacular.com";

export default function SuggestiveSearch({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);


  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/recipes/autocomplete`, {
          params: {
            apiKey: API_KEY,
            query,
            number: 5,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleSuggestionClick = (item) => {
    setQuery(item.title);
    setSuggestions([]);
    
    if (onSearch) {
      onSearch(item.title);
    }
  };


  const handleManualSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full p-3 border border-gray-300 rounded focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow z-10">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>


        <button
          onClick={handleManualSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}
