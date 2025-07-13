import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/context';

const Breadcrumb = () => {
  const location = useLocation();
  const { jobs } = useAppContext();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const getDisplayName = (segment, index) => {
    if (pathnames[index - 1] === 'jobs') {
      const job = jobs.find((j) => j._id === segment);
      return job?.title || 'Job';
    }
    return segment;
  };

  return (
    <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex space-x-1">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;
          const label = decodeURIComponent(getDisplayName(name, index));

          return (
            <li key={routeTo} className="flex items-center space-x-1">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500 capitalize">{label}</span>
              ) : (
                <p className="text-blue-600 capitalize cursor-pointer">
                  {label}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
