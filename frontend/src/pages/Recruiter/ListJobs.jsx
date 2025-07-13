import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/context';

const ListJobs = () => {

  const { backendUrl, cToken } = useAppContext()

  const [jobs, setJobs] = useState([])

  const fatchJobsList = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/job/list', { headers: { Authorization: `${cToken}` } })
      console.log(data)
      if (data.success) {
        setJobs(data.jobs)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteJob = async (jobId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/job/delete/${jobId}`,
        {},
        {
          headers: {
            Authorization: `${cToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        fatchJobsList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (cToken) fatchJobsList()
  }, [cToken])

  return (
    <div className="flex-1 py-5 flex flex-col justify-between">
      {/* Page Title */}
      <div className="px-4 md:px-10 mb-4">
        <h1 className="text-2xl font-bold text-gray-800">All Posted Jobs</h1>
        <p className="text-gray-600 mt-1">Manage or update job postings here.</p>
      </div>

      {/* Job Table */}
      <div className="w-full md:px-10 px-4">
        <h2 className="pb-4 text-lg font-medium">All Jobs</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Job Title</th>
                <th className="px-4 py-3 font-semibold truncate">Location</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">Salary</th>
                <th className="px-4 py-3 font-semibold truncate">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {jobs.map((job, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <span className="truncate w-full">{job.title}</span>
                  </td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3 max-sm:hidden">${job.salary.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => deleteJob(job._id)} className="text-red-500 hover:underline text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListJobs;
