import React from 'react'
import { useAppContext } from '../../context/context'
import { assets } from '../../assets/assets'

const RecruiterNavbar = () => {

  const { recruiter } = useAppContext()
  return (
      <div className="flex items-center justify-between px-4 md:px-6 border-b border-gray-300 py-3 bg-white">
        <a href="/" className="flex items-center">
          <img
            className="h-9"
            src={assets.logo}
            alt="Logo"
          />
        </a>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <p>Hi! {recruiter.name}</p>
          <button
            className="border rounded-full px-4 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
  )
}

export default RecruiterNavbar