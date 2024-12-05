import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

const Banner = ({ query, location, handleInputChange, handleLocationChange }) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
        Discover Your <span className="text-orange-600">Dream Job</span> Now
      </h1>
      <p className="text-lg md:text-xl text-black/70 mb-8">
        Thousands of job opportunities across various sectors are waiting for you.
      </p>

      <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {/* Job Search Input */}
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Search for a Job"
            className="block w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-700 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-base"
            onChange={handleInputChange}
            value={query}
          />
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <FiSearch className="h-6 w-6" />
          </span>
        </div>

        {/* Location Input */}
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter Location"
            className="block w-full rounded-full border border-gray-300 bg-white py-3 pl-12 pr-4 text-gray-700 placeholder-gray-500 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-base"
          
          />
          <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
            <FiMapPin className="h-6 w-6" />
          </span>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:text-base"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Banner;
