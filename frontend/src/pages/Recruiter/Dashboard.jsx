import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { FiBriefcase, FiUsers, FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/context';



const Dashboard = () => {
  const [dashboardData, setDashBoardData] = useState([])
  const { backendUrl , cToken} = useAppContext()
  const fetchDashboardData = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/job/dashboard', { headers: { Authorization: `${cToken}` } })
      if (data.success) {
        setDashBoardData(data.dashboard)
      } else {
        toast.error(data.message);

      }
    } catch (error) {
      toast.error(err.message);
    }
  }
  const dummyStats = [
    { title: 'Total Jobs', value: dashboardData.totalJobs, icon: <FiBriefcase size={24} /> },
    { title: 'Applicants', value: dashboardData.applyJobs, icon: <FiUsers size={24} /> },
    { title: 'Approved', value: dashboardData.totalUsers, icon: <FiCheckCircle size={24} /> },
  ];

  useEffect(()=>{
    if(cToken) fetchDashboardData()
  },[cToken])

  return (
    <div className="space-y-6">
      {/* Title & Description */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Recruiter Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Get a quick overview of your job postings, applicants, and platform activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {dummyStats.map((stat, index) => (
          <div key={index} className="p-4 bg-white shadow rounded-lg flex items-center gap-4">
            <div className="text-indigo-600">{stat.icon}</div>
            <div>
              <h4 className="text-gray-500 text-sm">{stat.title}</h4>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
