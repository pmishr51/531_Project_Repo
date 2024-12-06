import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchText, setSearchText] = useState("");
  const [criteriaOptions, setCriteriaOptions] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  // Fetch dropdown options from the backend API
  useEffect(() => {
    const fetchCriteriaOptions = async () => {
      try {
        const response = await axios.get("/api/criteria-options"); // Replace with your backend endpoint
        setCriteriaOptions(response.data);
        setSearchCriteria(response.data[0]); // Set default criteria
      } catch (error) {
        console.error("Error fetching criteria options:", error);
      }
    };

    fetchCriteriaOptions();
  }, []);

  // Handle search and fetch filtered results from the backend API
  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/search", {
        params: { criteria: searchCriteria, text: searchText },
      });
      setFilteredList(response.data);
    } catch (error) {
      console.error("Error fetching filtered list:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="search-container">
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="dropdown"
        >
          {criteriaOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter Search Text"
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
