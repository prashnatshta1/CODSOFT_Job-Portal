import React, { useState } from "react";
import Header from "../components/Header";

// Example job data
const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    salary: "Average Salary NPR 60,000 - 70,000 per month",
    skills: "Programming, problem-solving, software development lifecycle",
  },
  {
    id: 2,
    title: "Web Developer",
    salary: "Average Salary NPR 50,000 - 65,000 per month",
    skills: "HTML, CSS, JavaScript, front-end frameworks",
  },
  {
    id: 3,
    title: "Data Scientist",
    salary: "Average Salary NPR 60,000 - 70,000 per month",
    skills: "Data analysis, Python, machine learning, data visualization",
  },
  {
    id: 4,
    title: "UI/UX Designer",
    salary: "Average Salary NPR 45,000 - 60,000 per month",
    skills: "Wireframing, prototyping, Figma, Adobe XD",
  },
  {
    id: 5,
    title: "Frontend Developer",
    salary: "Average Salary NPR 50,000 - 65,000 per month",
    skills: "React, Angular, responsive design, debugging",
  },
];

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs); // Initialize with full list

  const handleSearch = () => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <Header title={"Estimated Salary"} path={"Salary"} />

      <div className="mt-5">
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search jobs..."
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-orange-600 text-white font-semibold px-8 py-2 rounded-sm mb-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="results">
        {filteredJobs.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <ul className="space-y-4">
              {filteredJobs.map((job) => (
                <li
                  key={job.id}
                  className="p-4 border rounded-md shadow-sm bg-white"
                >
                  <h3 className="text-lg font-bold">{job.title}</h3>
                  <p className="text-gray-600">{job.salary}</p>
                  <p className="text-gray-500">{job.skills}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-6">
            {searchText ? "No jobs found." : "Search for jobs to see results."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SalaryPage;
