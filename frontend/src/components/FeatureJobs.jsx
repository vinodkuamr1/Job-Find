import React, { useEffect } from 'react';
import JobCard from './JobCard';
import { useAppContext } from '../context/context';


const FeatureJobs = () => {
  const { jobs,navigate } = useAppContext();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 sm:px-16 lg:px-24 xl:px-32">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Featured Jobs</h1>
        <p className="text-gray-500 mt-2 text-sm">Handpicked roles from top companies</p>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
        {jobs?.length > 0 ? (
          jobs.slice(0, 6).map((job) => (
            <div key={job._id}>
              <JobCard job={job} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3 text-center mt-12">No featured jobs available at the moment.</p>
        )}
      </div>

      {/* Explore All Button */}
      <button
        onClick={() => navigate('/jobs')}
        className="flex items-center justify-center gap-2 mt-12 px-6 py-3 border border-gray-300 hover:bg-gray-100 text-sm rounded-lg shadow-md transition-all duration-300"
      >
        Explore all Jobs
        {/* <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" /> */}
      </button>
    </div>
  );
};

export default FeatureJobs;
