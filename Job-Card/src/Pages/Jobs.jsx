import React from 'react';
import Card from '../components/Card';

const Jobs = ({ result }) => {
  return (
    <div>
      {result.length > 0 ? (
        result.map((job, index) => <Card key={index} data={job} />)
      ) : (
        <p className="text-center text-gray-500">No jobs found.</p>
      )}
    </div>
  );
};

export default Jobs;
