import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/context';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaGlobe, FaFilePdf, FaStickyNote
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
const ApplyJob = () => {
  const { id } = useParams();
  const { jobs, backendUrl, token, user } = useAppContext();
  const job = jobs.find((job) => job._id === id);

  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    phone: '',
    location: '',
    website: '',
    expectedSalary: '',
    coverLetter: '',
    resume: null,
  });

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('jobId', id);
    form.append('userId', user?._id);
    form.append('name', formData.name);
    form.append('email', formData.email); // from context
    form.append('phone', formData.phone);
    form.append('location', formData.location);
    form.append('website', formData.website);
    form.append('expectedSalary', formData.expectedSalary);
    form.append('coverLetter', formData.coverLetter);
    form.append('resume', formData.resume);

    try {
      const { data } = await axios.post(`${backendUrl}/api/job/apply`, form, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message);
        setSubmitted(true);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  if (!job) return <div className="p-8 text-gray-600">Job not found.</div>;

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Job Info */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-100 w-full lg:w-1/2 p-8">
            <img src={job.companyId?.logo} alt={job.companyId?.name} className="w-20 h-20 object-cover mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-gray-600">{job.companyId?.name}</p>
            <div className="mt-4 text-sm space-y-1 text-gray-600">
              <p>Location: {job.location}</p>
              <p>Category: {job.category}</p>
              <p>Level: {job.level}</p>
            </div>
          </div>

          {/* Application Form */}
          <div className="w-full lg:w-1/2 p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Apply for this job</h3>

            {submitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded-md">
                Your application has been submitted successfully!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2">
                  <FaUser className="text-gray-500" />
                  <input name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-gray-500" />
                  <input type="email" name="email" value={formData.email} disabled className="w-full border px-3 py-2 rounded-md bg-gray-100 text-gray-600" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-gray-500" />
                    <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-gray-500" />
                    <input name="location" placeholder="Location (City, Country)" value={formData.location} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaGlobe className="text-gray-500" />
                  <input name="website" placeholder="LinkedIn or Website (optional)" value={formData.website} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="flex items-center gap-2">
                  <FaFilePdf className="text-gray-500" />
                  <label className="w-full relative">
                    <input type="file" name="resume" accept=".pdf" required onChange={handleChange} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                    <div className="border px-4 py-2 rounded-md bg-white text-gray-700 text-sm flex justify-between items-center">
                      {formData.resume ? formData.resume.name : 'Choose PDF file'}
                      <span className="ml-2 bg-indigo-600 text-white px-3 py-1 rounded text-xs font-medium">Upload</span>
                    </div>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  💵
                  <input name="expectedSalary" placeholder="Expected Salary (optional)" value={formData.expectedSalary} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div>
                  <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                    <FaStickyNote className="text-gray-500" />
                    Cover Letter (optional)
                  </label>
                  <textarea name="coverLetter" rows={4} placeholder="Write something customized for this role..." value={formData.coverLetter} onChange={handleChange} className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-indigo-500" />
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
