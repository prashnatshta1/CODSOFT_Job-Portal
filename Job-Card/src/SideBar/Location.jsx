import React, { useState } from "react";
import InputField from "../components/InputField";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Location = ({ handleChange }) => {
  // List of locations in Nepal
  const allLocations = [
    "Kathmandu",
    "Pokhara",
    "Lalitpur",
    "Chitwan",
    "Biratnagar",
    "Bhaktapur",
    "Dharan",
    "Birgunj",
    "Janakpur",
    "Hetauda",
    "Butwal",
    "Nepalgunj",
    "Dhangadhi",
    "Mahendranagar",
  ];

  const [showAll, setShowAll] = useState(false); // Toggle for showing all locations
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  // Function to toggle visibility
  const toggleShowAll = () => setShowAll(!showAll);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter locations based on the search query
  const filteredLocations = allLocations.filter((location) =>
    location.toLowerCase().includes(searchQuery)
  );

  // Determine locations to display
  const locationsToDisplay = showAll
    ? filteredLocations
    : filteredLocations.slice(0, 4);

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        {/* All Locations Option */}
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>

        {/* Render Locations */}
        {locationsToDisplay.map((location, index) => (
          <InputField
            key={index}
            handleChange={handleChange}
            value={location}
            title={location}
            name="test"
          />
        ))}

        {/* Toggle Button */}
        {filteredLocations.length > 4 && (
          <div className="flex justify-center mt-4">
            <button
              className="text-blue-500 flex items-center"
              onClick={toggleShowAll}
            >
              {showAll ? "See Less" : "See More"}
              {showAll ? (
                <FiChevronUp className="ml-2" />
              ) : (
                <FiChevronDown className="ml-2" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;
