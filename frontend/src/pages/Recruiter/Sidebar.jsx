import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/context';
import { FiHome, FiUsers, FiList, FiUpload } from 'react-icons/fi';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const { recruiter } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: '/dashboard', icon: <FiHome size={18} />, title: 'Dashboard' },
    { path: '/dashboard/upload-job', icon: <FiUpload size={18} />, title: 'Upload Job' },
    { path: '/dashboard/list-jobs', icon: <FiList size={18} />, title: 'Job Listings' },
    { path: '/dashboard/users', icon: <FiUsers size={18} />, title: 'Users' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white border-r border-gray-200 md:w-64 w-20">
      {/* Top Profile Section */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
        <img
          src={recruiter?.logo || assets.microsoft_logo}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-semibold hidden md:inline text-gray-800">
          {recruiter?.name || 'Microsoft'}
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 pt-4">
        {links.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center py-3 px-4 gap-3 w-full text-left transition 
                ${isActive
                  ? 'bg-indigo-100 border-r-4 border-indigo-500 text-indigo-600 font-semibold'
                  : 'hover:bg-gray-50 text-gray-700'
                }`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
