import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/context';

const MyJobs = () => {
  const { backendUrl, token } = useAppContext();
  const [jobs, setJobs] = useState([]);

  const fetchAllApplyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/apply-jobs`, {
        headers: { Authorization: `${token}` },
      });

      if (data.success) {
        const formattedJobs = data.applications.map((app) => ({
          ...app.jobId,
          company: app.jobId.companyId,
          status: app.status,
          resumeUrl: app.resumeUrl,
        }));
        setJobs(formattedJobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token){
      fetchAllApplyJobs();
    }else{
      setJobs('')
    }
  }, [token]);

  const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Reviewed: 'bg-blue-100 text-blue-700',
    Accepted: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="px-6 sm:px-12 lg:px-24 xl:px-32 py-20 bg-gray-50 min-h-screen">
      <div className="mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">My Applications</h2>
        <p className="text-gray-500 mt-2">Here are the jobs you've applied to.</p>
      </div>

      {jobs ? <div className="space-y-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col md:flex-row items-start gap-6 shadow-sm hover:shadow-md transition"
          >
            {/* Company Logo */}
            <img
              src={job.company?.logo}
              alt={job.company?.name}
              className="w-16 h-16 rounded object-cover border"
            />

            {/* Job Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusStyles[job.status]}`}>
                  {job.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-2">{job.company?.name}</p>

              <div className="flex flex-wrap text-sm text-gray-600 gap-4">
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Level:</strong> {job.level}</p>
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Salary:</strong> ${job.salary?.toLocaleString()}</p>
              </div>

              <p
                className="text-sm text-gray-700 mt-2 line-clamp-2"
                
              >{job.shortdescription }</p>
            </div>

            {/* Resume Download */}
            <div className="pt-4 md:pt-0">
              {job.resumeUrl?.startsWith('http') && (
                <a
                  href={job.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline text-sm font-medium"
                >
                  Review My Resume
                </a>
              )}
            </div>
          </div>
        ))}
      </div> : <span className='text-center text-gray-400'>Not found jobs</span>}
    </div>
  );
};

export default MyJobs;
