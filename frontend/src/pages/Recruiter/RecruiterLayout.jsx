import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './RecruiterNavbar';

const RecruiterLayout = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
        <main className="flex-1 py-6 px-1 sm:px-6">
          <Outlet />
        </main>
      </div>
  );
};

export default RecruiterLayout;
