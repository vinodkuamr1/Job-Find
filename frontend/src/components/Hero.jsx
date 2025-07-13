import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (keyword) query.append('keyword', keyword);
    if (location) query.append('location', location);
    navigate(`/jobs?${query.toString()}`);
  };

  return (
    <div className="text-sm text-gray-600 border-b">
      {/* Hero Section */}
      <div className="h-[580px] flex flex-col items-center justify-center px-4 text-center">
        {/* Announcement */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 border border-gray-500/30 rounded-full bg-gray-300/15 pl-4 p-1 text-sm text-gray-800 max-w-full">
          <p>New Opportunities Daily</p>
          <div className="flex items-center cursor-pointer gap-2 bg-white border border-gray-500/30 rounded-2xl px-3 py-1 whitespace-nowrap">
            <p>Browse Jobs</p>
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold max-w-4xl text-gray-800">
          Find Your Dream Job. Fast and Easy.
        </h1>
        <p className="max-w-xl text-center mt-6 px-4">
          Explore thousands of job listings from top companies. Whether you're starting out or looking to level up,
          we've got the perfect opportunity for you.
        </p>

        {/* Search Filters */}


        <form onSubmit={handleSearch} className="mt-12 w-full max-w-5xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-stretch gap-4">
            {/* Keyword Field */}
            <div className="relative w-full">
              <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={keyword}
                required
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              />
            </div>

            {/* Location Field */}
            <div className="relative w-full">
              <FaMapMarkerAlt className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                required
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-7 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-200"
            >
              Search
            </button>
          </div>
        </form>


        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button className="group px-7 py-2.5 flex items-center gap-2 font-medium">
            Post a Job
            <svg className="group-hover:translate-x-1 transition pt-0.5" width="12" height="9" viewBox="0 0 12 9"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5" stroke="#6B7280" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
