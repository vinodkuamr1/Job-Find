import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppContext } from '../../context/context';

const AddJob = () => {
  const { backendUrl, cToken } = useAppContext();

  const [description, setDescription] = useState('');
  const [shortdescription, setShortdescription] = useState('');
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write the job description here...',
      });

      quillRef.current.on('text-change', () => {
        const html = editorRef.current.querySelector('.ql-editor').innerHTML;
        setDescription(html);
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const jobData = {
      title: form.elements['title'].value,
      salary: form.elements['salary'].value,
      location: form.elements['location'].value,
      category: form.elements['category'].value,
      level: form.elements['level'].value,
      jobtype: form.elements['jobtype'].value,
      deadline: form.elements['deadline'].value,
      description,
      shortdescription,
    };

    try {
      const { data } = await axios.post(`${backendUrl}/api/job/add`, jobData, {
        headers: {
          Authorization: cToken,
        },
      });

      if (data.success) {
        toast.success('Job added successfully!');
        form.reset();
        setDescription('');
        setShortdescription('');
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="bg-white p-4 sm:p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Add New Job</h1>
        <p className="text-gray-600 mt-1">Fill in the details below to post a new job opportunity.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
        {/* Job Title */}
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="font-medium">Job Title</label>
          <input id="title" name="title" type="text" required placeholder="e.g., Software Engineer" className="py-2.5 px-3 border rounded" />
        </div>

        {/* Salary & Location */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="salary" className="font-medium">Salary</label>
            <input id="salary" name="salary" type="text" required placeholder="e.g., 60000" className="py-2.5 px-3 border rounded" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="location" className="font-medium">Location</label>
            <select id="location" name="location" required className="py-2.5 px-3 border rounded">
              <option value="">Select Location</option>
              {['Remote', 'On-site', 'Hybrid'].map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="font-medium">Category</label>
          <input id="category" name="category" type="text" required placeholder="e.g., Development" className="py-2.5 px-3 border rounded" />
        </div>

        {/* Level & Job Type */}
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="level" className="font-medium">Level</label>
            <select id="level" name="level" required className="py-2.5 px-3 border rounded">
              <option value="">Select Level</option>
              {['Entry Level', 'Junior Level', 'Mid Level', 'Senior Level'].map((lvl, idx) => (
                <option key={idx} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="jobtype" className="font-medium">Job Type</label>
            <select id="jobtype" name="jobtype" required className="py-2.5 px-3 border rounded">
              <option value="">Select Type</option>
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map((typ, idx) => (
                <option key={idx} value={typ}>{typ}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex flex-col gap-1">
          <label htmlFor="deadline" className="font-medium">Deadline</label>
          <input type="date" id="deadline" name="deadline" required className="py-2.5 px-3 border rounded" />
        </div>

        {/* Short Description */}
        <div className="flex flex-col gap-1">
          <label htmlFor="shortdescription" className="font-medium">Short Description</label>
          <textarea
            id="shortdescription"
            name="shortdescription"
            required
            rows="3"
            maxLength={200}
            placeholder="Brief summary of the job (1-2 sentences)..."
            className="py-2.5 px-3 border rounded"
            value={shortdescription}
            onChange={(e) => setShortdescription(e.target.value)}
          />
        </div>

        {/* Rich Text Editor */}
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="font-medium">Job Description</label>
          <div ref={editorRef} className="bg-white border rounded min-h-[150px]" />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
