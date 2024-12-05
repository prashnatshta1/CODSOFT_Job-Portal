import React, { useState } from 'react';
import Button from './Button';

const Salary = ({ handleChange, handleClick }) => {
  // State for active salary type
  const [activeType, setActiveType] = useState('Hourly');

  // Salary ranges for each type
  const salaryRanges = {
    Hourly: ['All', '< 30000k', '< 50000k',],
    Monthly: ['All', '< 30000k', '< 50000k',],
    Yearly: ['All', '< 30000k', '< 50000k', ],
  };

  return (
    <div>
      <h4 className="text-lg font-medium mb-4">Salary</h4>

      {/* Salary Type Tabs */}
      <div className="flex space-x-2 mb-4">
        {Object.keys(salaryRanges).map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-4 py-2 border rounded ${
              activeType === type ? 'bg-orange-600 text-white' : 'bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Salary Range Options */}
      <div>
        {salaryRanges[activeType].map((range, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              name="salaryRange"
              id={`salary-${range}`}
              value={range}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor={`salary-${range}`} className="text-sm">
              {range}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Salary;
