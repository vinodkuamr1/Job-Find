import React from 'react';
import { assets } from '../assets/assets'; // Optional: for logo if needed

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-white border-t">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-300 pb-6">
        {/* Left Section */}
        <div className="md:max-w-md">
          <img
            src={assets.logo} // Replace with actual logo path
            alt="Company Logo"
            className="h-10"
          />
          <p className="mt-6 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row sm:gap-20 gap-10 md:items-start">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-gray-700">Home</a></li>
              <li><a href="#" className="hover:text-gray-700">About us</a></li>
              <li><a href="#" className="hover:text-gray-700">Contact us</a></li>
              <li><a href="#" className="hover:text-gray-700">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+1-212-456-7890</p>
              <p>contact@example.com</p>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2024 © Find Job. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
