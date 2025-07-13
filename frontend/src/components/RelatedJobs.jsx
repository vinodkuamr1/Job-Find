import React from 'react';
import JobCard from './JobCard';
import { useAppContext } from '../context/context';

const RelatedJobs = ({ currentJobId, category }) => {

    const { jobs } = useAppContext()
  const related = jobs.filter((job) => job.category === category && job._id !== currentJobId).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Jobs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {related.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default RelatedJobs;
