import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppContext = createContext();

const getStoredRecruiter = () => {
  try {
    const stored = localStorage.getItem('recruiterData');
    return stored ? JSON.parse(stored) : '';
  } catch (err) {
    console.error('Invalid recruiterData in localStorage', err);
    localStorage.removeItem('recruiterData');
    return '';
  }
};


export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [cToken, setCToken] = useState(localStorage.getItem('CToken') || '');
  const [user, setUser] = useState(null);
  const [recruiter, setRecruiter] = useState(getStoredRecruiter());
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fatchUserProfile = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/profile',{headers:{Authorization:`${token}`}})
        if(data.success){
          setUser(data.user)
        }else{
          toast.error(data.message);

        }
    } catch (error) {
      toast.error(error.message);
    }
  }

    const fatchJobs = async () => {
      try {
        const {data} = await axios.get(backendUrl + '/api/user/get-jobs')
        if(data.success){
          setJobs(data.jobs)
        }else{
          toast.error(data.message);

        }

      } catch (error) {
        toast.error(error.message);
      }
    }

    useEffect(()=>{
      fatchJobs()
    },[])

  useEffect(() => {
    const path = window.location.pathname;
    if (token && (path === '/login' || path === '/signup')) {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem('CToken', cToken);
  }, [cToken]);

  useEffect(() => {
    if(token) fatchUserProfile()
  }, []);
  useEffect(() => {
    localStorage.setItem('recruiterData', JSON.stringify(recruiter));
  }, [recruiter]);

  const value = {
    backendUrl,
    token, setToken,
    cToken, setCToken,
    user, setUser,
    recruiter, setRecruiter,
    jobs, setJobs,
    navigate,
    loading, setLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
