'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-200">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Welcome to <span className="text-purple-600">Workflo</span>!
        </h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Your email"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-6 transform -translate-y-1/2 cursor-pointer text-gray-300"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className='text-black'>
            Don’t have an account?{' '}
            <a href="/signup" className="text-purple-600 hover:underline">Create a new account.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
