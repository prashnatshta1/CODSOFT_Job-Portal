import React, { useState } from "react";

const Data = ({ handleDateChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  // Format dates as `YYYY-MM-DD`
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const sevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
  const thirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);

  // Handle filter change
  const onFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilter(value);
    handleDateChange(value); // Pass the selected value to the parent component
  };

  return (
    <div>
      <h4 className="text-lg font-medium mb-4">Date of Posting</h4>

      <div>
        {/* Last 24 Hours Filter */}
        <label className="flex items-center mb-2 cursor-pointer">
          <input
            type="radio"
            name="dateFilter"
            value={twentyFourHoursAgoDate}
            checked={selectedFilter === twentyFourHoursAgoDate}
            onChange={onFilterChange}
            className="hidden"
          />
          <span
            className={`w-4 h-4 border rounded-full flex items-center justify-center mr-2 ${
              selectedFilter === twentyFourHoursAgoDate
                ? "bg-orange-600 border-orange-600"
                : "border-gray-400"
            }`}
          >
            {selectedFilter === twentyFourHoursAgoDate && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </span>
          Last 24 Hours
        </label>

        {/* Last 7 Days Filter */}
        <label className="flex items-center mb-2 cursor-pointer">
          <input
            type="radio"
            name="dateFilter"
            value={sevenDaysAgoDate}
            checked={selectedFilter === sevenDaysAgoDate}
            onChange={onFilterChange}
            className="hidden"
          />
          <span
            className={`w-4 h-4 border rounded-full flex items-center justify-center mr-2 ${
              selectedFilter === sevenDaysAgoDate
                ? "bg-orange-600 border-orange-600"
                : "border-gray-400"
            }`}
          >
            {selectedFilter === sevenDaysAgoDate && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </span>
          Last 7 Days
        </label>

        {/* Last Month Filter */}
        <label className="flex items-center mb-2 cursor-pointer">
          <input
            type="radio"
            name="dateFilter"
            value={thirtyDaysAgoDate}
            checked={selectedFilter === thirtyDaysAgoDate}
            onChange={onFilterChange}
            className="hidden"
          />
          <span
            className={`w-4 h-4 border rounded-full flex items-center justify-center mr-2 ${
              selectedFilter === thirtyDaysAgoDate
                ? "bg-orange-600 border-orange-600"
                : "border-gray-400"
            }`}
          >
            {selectedFilter === thirtyDaysAgoDate && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </span>
          Last Month
        </label>

        {/* All Time Filter */}
        <label className="flex items-center mb-2 cursor-pointer">
          <input
            type="radio"
            name="dateFilter"
            value=""
            checked={selectedFilter === ""}
            onChange={onFilterChange}
            className="hidden"
          />
          <span
            className={`w-4 h-4 border rounded-full flex items-center justify-center mr-2 ${
              selectedFilter === ""
                ? "bg-orange-600 border-orange-600"
                : "border-gray-400"
            }`}
          >
            {selectedFilter === "" && (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            )}
          </span>
          All Time
        </label>
      </div>
    </div>
  );
};

export default Data;
