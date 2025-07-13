import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../context/context';
import RelatedJobs from '../components/RelatedJobs';
import NewsLetter from '../components/NewsLetter';
import Breadcrumb from '../components/Breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';

const JobDetails = () => {
  const { jobs, backendUrl, token, cToken } = useAppContext();
  const { id } = useParams();
  const job = jobs.find((job) => job._id === id);

  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/apply-jobs`, {
          headers: { Authorization: token }
        });
        if (data.success) {
          const appliedJobIds = data.applications.map(app => app.jobId._id || app.jobId);
          setAppliedJobs(appliedJobIds);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    if (token) {
      fetchAppliedJobs();
    }
  }, [token, backendUrl]);

  if (!job) return <div className="text-center py-20">Job not found</div>;

  const alreadyApplied = appliedJobs.includes(job._id);
  const isRecruiter = !!cToken;
  const shouldDisableApply = alreadyApplied || isRecruiter;
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12">
      <Breadcrumb />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start gap-6 mb-10">
        <img
          src={job.companyId.logo}
          alt="Company Logo"
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{job.title}</h1>
          <p className="text-gray-500">{job.companyId.name} · {job.location}</p>
          <p className="text-sm mt-1 text-gray-400">{job.level} · {job.category}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {/* Left (Job Description) */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Description</h2>
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        </div>

        {/* Sticky Right Sidebar */}
        <div className="sticky top-24 self-start h-fit">
          <div className="p-6 bg-white border rounded-lg shadow-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Summary</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><strong>Location:</strong> {job.location}</li>
              <li><strong>Employment Type:</strong> {job.jobtype}</li>
              <li><strong>Salary:</strong> {job.salary ? `$${job.salary.toLocaleString()}` : 'N/A'}</li>
              <li><strong>Category:</strong> {job.category}</li>
              <li><strong>Level:</strong> {job.level}</li>
              <li><strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}</li>
            </ul>
            <Link to={shouldDisableApply ? '#' : `/apply/${job._id}`}>
              <button
                className={`mt-6 w-full py-3 font-medium rounded transition ${shouldDisableApply
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                disabled={shouldDisableApply}
              >
                {alreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <RelatedJobs currentJobId={job._id} category={job.category} />
      <NewsLetter />
    </div>
  );
};

export default JobDetails;
