import React from 'react';
import { FaQuoteRight } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Donald Jackman',
    role: 'Content Creator',
    image: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png',
    feedback:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud  aliquip”',
  },
  {
    name: 'Richard Nelson',
    role: 'Content Writer',
    image: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage2.png',
    feedback:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud  aliquip”',
  },
  {
    name: 'James Washington',
    role: 'Content Marketing',
    image: 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage3.png',
    feedback:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud  aliquip”',
  },
];

const Testimonials = () => {
  return (
    <div className="flex flex-col items-center text-center py-20 px-4">
      <p className="text-4xl font-bold max-w-3xl mb-16">
        Trusted by <span className="text-blue-600">30k+</span> world-class companies & design teams
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white px-4 py-8 rounded-lg border border-gray-300/80 max-w-[272px] text-sm text-gray-500 shadow-md"
          >
            <div className="relative mb-4">
              <img className="h-16 w-16 rounded-full" src={item.image} alt={item.name} />
              <FaQuoteRight className="absolute top-0 -right-2 text-blue-600 text-lg bg-white rounded-full p-0.5" />
            </div>
            <p>{item.feedback}</p>
            <p className="text-lg text-gray-800 font-medium mt-5">{item.name}</p>
            <p className="text-xs">{item.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
