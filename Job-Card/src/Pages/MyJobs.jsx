import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyJobs = () => {
  const email = "prashantshrestha206@gmail.com";
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Number of jobs to display per page

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/myJobs/${email}`);
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [email]);

  const handleSearch = () => {
    const filtered = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    setFilteredJobs(updatedJobs);
    fetch(`http://localhost:3000/jobs/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => console.log("Job deleted successfully"));
  };

  // Pagination calculations
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container">
        <h1 className="text-center p-4 text-2xl font-bold">All Jobs</h1>
        <div className="search-box p-2 text-center mb-4">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search jobs..."
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 w-full mb-4"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-orange-600 text-white font-semibold px-8 py-2 rounded-sm"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-center text-lg">Loading jobs...</p>
      ) : currentJobs.length > 0 ? (
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      My Jobs
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <Link to="/post-job">
                      <button
                        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none"
                        type="button"
                      >
                        Post a Job
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 text-left">No.</th>
                      <th className="px-6 py-3 text-left">Job Title</th>
                      <th className="px-6 py-3 text-left">Company Name</th>
                      <th className="px-6 py-3 text-left">Salary Range</th>
                      <th className="px-6 py-3 text-left">Edit</th>
                      <th className="px-6 py-3 text-left">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={job.id} className="text-left">
                        <td className="px-6 py-2">
                          {indexOfFirstJob + index + 1}
                        </td>
                        <td className="px-6 py-2">{job.jobTitle}</td>
                        <td className="px-6 py-2">{job.companyName}</td>
                        <td className="px-6 py-2">{job.salaryRange}</td>
                        <td className="px-6 py-2">
                          <Link
                            to={`/edit-job/${job.id}`}
                            className="text-blue-500"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="px-6 py-2">
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center p-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center text-lg text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default MyJobs;
