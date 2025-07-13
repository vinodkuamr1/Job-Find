import React from 'react';
import { useAppContext } from '../context/context';

const JobCard = ({ job }) => {
  const { navigate } = useAppContext();

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md text-sm w-full max-w-sm h-[320px] flex flex-col justify-between hover:shadow-lg transition">
      {/* Job Info */}
      <div>
        <div className="flex items-start gap-3">
          <img
            src={job?.companyId?.logo}
            className="w-10 h-10 object-cover"
            alt={`${job.companyId.name} Logo`}
          />
          <div>
            <h3 className="text-gray-900 text-lg font-semibold">{job.title}</h3>
            <p className="text-gray-600">
              {job.companyId.name} · {job.location}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {job.level} · ${job.salary.toLocaleString()} / yr
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-4 text-sm line-clamp-3 h-[60px] overflow-hidden">
          {job.shortdescription}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => {
            navigate(`/job-details/${job._id}`);
            scrollTo(0, 0);
          }}
          className="px-3 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-100 transition w-full"
        >
          Apply Now
        </button>
        <button
          onClick={() => {
            navigate(`/job-details/${job._id}`);
            scrollTo(0, 0);
          }}
          className="px-3 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition w-full"
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCard;
