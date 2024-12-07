import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [filterType, setFilterType] = useState("Title"); // Default to "Title"
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  // Handle search and fetch filtered results
  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/search", {
        params: { filterType, text: searchText },
      });
      setFilteredList(response.data);
    } catch (error) {
      console.error("Error fetching filtered list:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Search for Artwork Data</h1>
      <div className="search-container">
        {/* Static dropdown with predefined options */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="dropdown"
        >
          <option value="Title">Title</option>
          <option value="Nationality">Nationality</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${filterType}`} // Dynamic placeholder
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="filtered-list">
        {filteredList.map((item, index) => (
          <div key={index} className="filtered-item">
            <h3>{item.title || `Item ${index + 1}`}</h3>
            <p>{item.details || "Related Information"}</p>
          </div>
        ))}
        {filteredList.length === 0 && <p>No results found</p>}
      </div>
    </div>
  );
}

export default App;
