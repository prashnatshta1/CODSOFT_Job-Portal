import Banner from "../components/Banner";
import { useEffect, useState } from "react";
import Jobs from "./Jobs";
import SideBar from "../SideBar/SideBar";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch jobs data
  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load jobs data.");
        }
        return res.json();
      })
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error loading jobs:", error))
      .finally(() => setIsLoading(false)); // Set loading to false after data is fetched
  }, []);

  // Input change handler
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Radio filter handler
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJobs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filter jobs based on search query and selected category
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filter by search query
    if (query) {
      filteredJobs = filteredJobs.filter((job) =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by selected category
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => {
        const lowerSelected = selected.toLowerCase();
        return (
          jobLocation?.toLowerCase() === lowerSelected ||
          salaryType?.toLowerCase() === lowerSelected ||
          employmentType?.toLowerCase() === lowerSelected ||
          experienceLevel?.toLowerCase() === lowerSelected ||
          (parseInt(maxPrice) <= parseInt(selected)) || // Salary filter
          postingDate?.startsWith(selected) // Date filter
        );
      });
    }

    return filteredJobs;
  };

  // Pagination logic
  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  // Get filtered results
  const filteredJobs = filteredData(jobs, selectedCategory, query);
  const result = paginate(filteredJobs);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12 text-navText">
        {/* Sidebar */}
        <div className="bg-white p-4 rounded">
          <SideBar handleChange={handleChange} />
        </div>

        {/* Job results */}
        <div className="col-span-2 bg-white p-4 rounded-sm">
          {isLoading ? (
            <p>Loading...</p>
          ) : result.length > 0 ? (
            <>
              <Jobs result={result} />
              <div className="flex justify-center mt-4 space-x-8">
                <button
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1 ? "bg-gray-300" : "bg-orange-600 text-white"
                  }`}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-300"
                      : "bg-orange-600 text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No jobs found.</p>
          )}
        </div>

        {/* Placeholder for extra content */}
        <div className="bg-white p-10 rounded"><NewsLetter /></div>
      </div>
    </div>
  );
};

export default Home;
