import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Jobs from './pages/Jobs';
import MyJobs from './pages/MyJobs';
import JobDetails from './pages/JobDetails';
import ApplyJob from './pages/ApplyJob';
import Login from './pages/Login';
import RecruiterLogin from './pages/RecruiterLogin';

import RecruiterLayout from './pages/Recruiter/RecruiterLayout';
import Dashboard from './pages/Recruiter/Dashboard';
import RecruiterNavbar from './pages/Recruiter/RecruiterNavbar';
import ListJobs from './pages/Recruiter/ListJobs';
import AddJob from './pages/Recruiter/AddJob';
import Users from './pages/Recruiter/Users';

const App = () => {
  const location = useLocation();
  const isRecruiterRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      <ToastContainer />

      {/* Show recruiter navbar only on /dashboard routes */}
      {isRecruiterRoute ? (
        <>
          <RecruiterNavbar />
          <Routes>
            <Route path="/dashboard/*" element={<RecruiterLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="list-jobs" element={<ListJobs />} />
              <Route path="upload-job" element={<AddJob />} />
              <Route path="users" element={<Users />} />
            </Route>
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/jobs" element={<><Navbar /><Jobs /><Footer /></>} />
            <Route path="/my-jobs" element={<><Navbar /><MyJobs /><Footer /></>} />
            <Route path="/job-details/:id" element={<><Navbar /><JobDetails /><Footer /></>} />
            <Route path="/apply/:id" element={<><Navbar /><ApplyJob /><Footer /></>} />
            <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
            <Route path="/recruiter" element={<><Navbar /><RecruiterLogin /><Footer /></>} />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
