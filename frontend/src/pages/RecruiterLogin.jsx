import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaEnvelope, FaLock, FaUserTie, FaMapMarkerAlt,
  FaGlobe, FaBuilding,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/context';

const RecruiterAuth = () => {
  const { navigate, backendUrl, setCToken, setRecruiter, recruiter } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    logo: null,
    location: '',
    website: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setForm({ ...form, logo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { data } = await axios.post(`${backendUrl}/api/auth/recruiter/login`, {
          email: form.email,
          password: form.password,
        });

        if (data.success) {
          localStorage.setItem('CToken', data.Ctoken);
          setCToken(data.Ctoken);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const { data } = await axios.post(`${backendUrl}/api/auth/recruiter/register`, formData);
        if (data.success) {
          localStorage.setItem('CToken', data.Ctoken);
          localStorage.setItem('recruiterData', JSON.stringify(data.company));
          setCToken(data.Ctoken);
          setRecruiter(data.company);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    if (recruiter && recruiter.name && recruiter.email) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl w-full bg-white shadow-md rounded-xl p-8"
        encType="multipart/form-data"
      >
        <div className="flex items-center justify-center mb-6">
          <FaUserTie className="text-indigo-600 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
          {isLogin ? 'Recruiter Login' : 'Recruiter Registration'}
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          {isLogin
            ? 'Please sign in to access your dashboard'
            : 'Create your recruiter account'}
        </p>

        {isLogin ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="recruiter@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 text-sm mb-1">Company Logo</label>
              <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                <FaGlobe className="text-gray-400 mr-2" />
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Company Name</label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaBuilding className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="Company Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Email</label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="company@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Password</label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Location</label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaMapMarkerAlt className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">Website</label>
              <div className="flex items-center border rounded-md px-3 py-2">
                <FaGlobe className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  className="w-full outline-none text-sm text-gray-700"
                  placeholder="https://company.com"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-600 text-sm mb-1">Description</label>
              <textarea
                name="description"
                rows="3"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm text-gray-700"
                placeholder="About your company..."
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default RecruiterAuth;
