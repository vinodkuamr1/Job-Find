import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import this
import { FaCode, FaBullhorn, FaPalette, FaDatabase, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const categories = [
  { label: 'Development', icon: <FaCode />, value: 'Development' },
  { label: 'Marketing', icon: <FaBullhorn />, value: 'Marketing' },
  { label: 'Design', icon: <FaPalette />, value: 'Design' },
  { label: 'Data', icon: <FaDatabase />, value: 'Data' },
  { label: 'Security', icon: <FaShieldAlt />, value: 'Security' },
  { label: 'Business', icon: <FaChartLine />, value: 'Business' },
];

const JobCategories = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleCategoryClick = (category) => {
    navigate(`/jobs?category=${category}`);
  };

  return (
    <div className="py-16 px-6 sm:px-16 lg:px-24 xl:px-32">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Browse by Category</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-center max-w-6xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
            className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md text-gray-700 border hover:bg-indigo-50 transition border-gray-300`}
          >
            <div className="text-3xl text-indigo-600 mb-2">{cat.icon}</div>
            <p className="text-sm font-medium">{cat.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobCategories;
