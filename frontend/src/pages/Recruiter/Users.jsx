import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/context';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const statusOptions = ['Pending', 'Accepted', 'Rejected'];

const Users = () => {
  const { cToken ,backendUrl} = useAppContext()
  const [applicants, setApplicants] = useState([]);

  const fetchUsersData = async () =>{
    try {

      const { data } = await axios.get(backendUrl + '/api/job/users',{headers:{Authorization:`${cToken}`}})
      if(data.success){
        setApplicants(data.applicants)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleStatusChange = async (id, newStatus) => {
  try {
    const { data } = await axios.put(backendUrl + `/api/job/status/${id}`,
      { status: newStatus },
      {
        headers: { Authorization: `${cToken}` },
      }
    );

    if (data.success) {
      toast.success(data.message);
      fetchUsersData();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};
console.log(applicants)
  useEffect(()=>{
    if(cToken) fetchUsersData()
  },[cToken])

  return (
    <div className="p-4 sm:p-6 bg-white rounded-md border border-gray-100 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Job Applicants</h2>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Applicant</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Applied On</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Resume</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map(applicant => (
              <tr key={applicant._id} className="border-t border-gray-200">
                <td className="px-4 py-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={applicant.image || assets.profile_img}
                      alt={applicant.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{applicant.name}</p>
                      <p className="text-gray-600 text-sm">{applicant.jobId?.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{applicant.email}</td>
                <td className="px-4 py-3">{new Date(applicant.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <select
                    value={applicant.status}
                    onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
                    className="px-2 py-1 border rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={applicant.resumeUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600/50 py-2 px-3 rounded-md text-white text-sm"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4">
        {applicants.map(applicant => (
          <div
            key={applicant.id}
            className="p-4 border border-gray-200 rounded-md shadow-sm bg-white"
          >
            <div className="flex gap-4 items-center mb-3">
              <img
                src={applicant.image}
                alt={applicant.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{applicant.name}</p>
                <p className="text-sm text-gray-600">{applicant.jobTitle}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1">{applicant.jobDescription}</p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Email:</strong> {applicant.email}
            </p>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Applied On:</strong> {applicant.appliedOn}
            </p>
            <div className="mb-2">
              <strong>Status: </strong>
              <select
                value={applicant.status}
                onChange={(e) => handleStatusChange(applicant._id, e.target.value)}
                className="mt-1 px-2 py-1 border rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <a
              href={applicant.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 bg-blue-600/50 py-2 px-3 rounded-md text-white text-sm"
            >
              Download Resume
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
