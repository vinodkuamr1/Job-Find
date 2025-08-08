import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/context';
import { FaBars, FaRocket, FaUserTie } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigate, token, setToken, user, setUser,cToken, setCToken, recruiter, setRecruiter } = useAppContext();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const logoutHandler = () => {
    if (token || cToken) {
      toast.success("Logout Successful");
      setToken('');
      setCToken('');
      setUser('');
      setRecruiter('');
      localStorage.removeItem('token');
      localStorage.removeItem('CToken');
    }
  };

  return (
    <div className="text-sm text-white w-full">
      {/* Main Navbar */}
      <nav className="relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-white text-gray-900 transition-all shadow-sm">
        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 md:pl-28">
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to={'/jobs'}>Jobs</Link></li>
          <li><Link to={'/my-jobs'}>My Jobs</Link></li>
        </ul>

        {/* Desktop Button */}
        <div className='flex items-center gap-3'>
          {cToken ? (
            <button
              onClick={() => { toggleMobileMenu(), navigate('/dashboard') }}
              className="hidden md:flex items-center gap-1 bg-white hover:bg-gray-50 border border-gray-300 ml-20 px-6 py-2 rounded-full active:scale-95 transition-all"
            >
              <FaUserTie className="text-indigo-500" />
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => {
                toggleMobileMenu();
                token ? navigate('/jobs') : navigate('/login');
              }}
              className="hidden md:inline bg-white hover:bg-gray-50 border border-gray-300 ml-20 px-9 py-2 rounded-full active:scale-95 transition-all"
            >
              Apply Now
            </button>
          )}

          {/* User Dropdown */}
          {(token || cToken) ? (
            <div className="relative z-50" ref={dropdownRef}>
              <div className="cursor-pointer flex items-center gap-2" onClick={() => setOpen(!open)}>
                <img
                  src={recruiter.logo || assets.profile_img}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500 object-cover"
                />
                <span className="text-gray-700 font-medium hidden sm:block">Walcome! {user?.name || recruiter.name}</span>
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50 border">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative z-50" ref={dropdownRef}>
              <button onClick={() => setOpen(!open)} className="bg-blue-50 hover:bg-blue-100 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all">
                Login
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50 border overflow-hidden">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/recruiter"
                    className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Recruiter
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button type="button" className="menu-btn inline-block md:hidden active:scale-90 transition" onClick={toggleMobileMenu}>
            <FaBars className='text-gray-500 text-2xl' />
          </button>

          {/* Mobile Dropdown */}
          {mobileMenuOpen && (
            <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white shadow-sm p-6 md:hidden">
              <ul className="flex flex-col space-y-4 text-lg text-gray-800">
                <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
                <li><Link to="/jobs" onClick={toggleMobileMenu}>Jobs</Link></li>
                <li><Link to="/my-jobs" onClick={toggleMobileMenu}>My Jobs</Link></li>
              </ul>


              {cToken ? (
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    navigate('/dashboard');
                  }}
                  className="flex items-center mt-4 gap-2 bg-white text-indigo-600 hover:bg-gray-100 border border-gray-300 px-6 py-2 rounded-full font-medium shadow-sm transition-all duration-200"
                >
                  <FaUserTie className="text-indigo-500" />
                  Dashboard
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    toggleMobileMenu();
                    token ? navigate('/jobs') : navigate('/login');
                  }}
                  className="flex items-center mt-4 gap-2 bg-white text-blue-600 hover:bg-gray-100 border border-gray-300 px-6 py-2 rounded-full font-medium shadow-sm transition-all duration-200"
                >
                  <FaRocket className="text-blue-500" />
                  Apply Now
                </button>
              )}


            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
