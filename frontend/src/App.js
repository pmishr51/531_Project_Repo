import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [filterType, setFilterType] = useState("Artist");
  const [dropdownList, setDropdownList] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});

  const fetchDropdownList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6001/api/dropdown/${filterType.toLowerCase()}`
      );
      console.log(response);
      setDropdownList(response.data.data || []);
    } catch (error) {
      console.error(`Error fetching ${filterType.toLowerCase()}s:`, error);
      setDropdownList([]);
    }
  };

  const fetchFilteredList = async () => {
    try {
      const baseUrl = `http://localhost:6001/api/art/${filterType.toLowerCase()}`;
      const params = {
        [`${filterType.toLowerCase()}Name`]: selectedItem,
      };

      const completeUrl = `${baseUrl}?${new URLSearchParams(params)
        .toString()
        .replace(/\+/g, " ")}`;
      console.log("Complete URL to be requested:", completeUrl);

      const response = await axios.get(completeUrl);
      console.log("Actual requested URL:", response.config.url);
      console.log("Response:", response);

      setFilteredList(response.data || []);
      setExpandedCards({});
    } catch (error) {
      console.error(`Error fetching artworks for ${selectedItem}:`, error);
      setFilteredList([]);
    }
  };

  useEffect(() => {
    setDropdownList([]);
    setSelectedItem("");
    setFilteredList([]);
    fetchDropdownList();
  }, [filterType]);

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderCardContent = (item) => {
    return Object.entries(item).map(([key, value]) => (
      <div key={key} className="detail-row">
        <span className="detail-label">{key}:</span>
        <span className="detail-value">
          {value === null || value === "" ? "Not Available" : String(value)}
        </span>
      </div>
    ));
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Search for Artwork Data</h1>
      <div className="search-section">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="dropdown filter-dropdown"
        >
          <option value="Artist">Artist</option>
          <option value="Country">Country</option>
          <option value="Department">Department</option>
          <option value="Medium">Medium</option>
        </select>

        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="dropdown item-dropdown"
          disabled={dropdownList.length === 0}
        >
          <option value="">Select {filterType}</option>
          {dropdownList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={fetchFilteredList}
          disabled={!selectedItem}
          className="search-button"
        >
          Search
        </button>
      </div>

      <div className="results-container">
        {filteredList.map((item, index) => (
          <div
            key={index}
            className={`result-card ${expandedCards[index] ? "expanded" : ""}`}
            onClick={() => toggleCard(index)}
          >
            <div className="card-header">
              <h3 className="card-title">
                {item.title || `Artwork ${index + 1}`}
              </h3>
              <span className="expand-indicator">
                {expandedCards[index] ? "−" : "+"}
              </span>
            </div>
            {expandedCards[index] && (
              <div className="card-details">{renderCardContent(item)}</div>
            )}
          </div>
        ))}
        {filteredList.length === 0 && selectedItem && (
          <div className="no-results">No results found</div>
        )}
      </div>
    </div>
  );
}

export default App;
