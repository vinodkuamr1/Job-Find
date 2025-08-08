import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/context';
import JobCard from '../components/JobCard';

const categories = ['Development', 'Marketing', 'Design', 'Programming', 'Writing', 'Engineering'];

const Jobs = () => {
  const { jobs } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    setCurrentPage(1);
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setCurrentPage(1); 
    if (category === null) {
      setSelectedCategory(null);
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSelectedCategory(category);
      setSearchParams({ category });
    }
    setShowFilter(false);
  };

  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.category === selectedCategory)
    : jobs;

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-6 sm:px-12 lg:px-24 xl:px-32 py-20 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="mb-7">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Browse Jobs</h2>
        <p className="text-gray-500 mt-2">Explore top job opportunities tailored for you</p>
      </div>

      {/* Filter Toggle (Mobile) */}
      <div className="mb-6 block lg:hidden">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto">
        {/* Sidebar Filter */}
        {(showFilter) && (
          <aside className={`w-full lg:w-64 p-6 ${!showFilter ? 'hidden lg:block' : ''}`}>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`w-full text-left px-4 py-2 rounded-sm font-medium transition duration-200 ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-4 py-2 rounded-sm font-medium transition duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600/50 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Job Cards */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center mt-12">
                No jobs found in this category.
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 space-x-2">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-4 py-2 border rounded text-sm ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded text-sm bg-white hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Jobs;
