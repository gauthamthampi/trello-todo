'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {localhost} from '../../url'
import { useRouter } from 'next/navigation';


const Signup: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.post(`${localhost}/api/createUser`, {
        name,
        email,
        password,
      });
      setSuccess('User registered successfully! Redirecting to Login...');
      setName('');
      setEmail('');
      setPassword('');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      console.log(error);
      
      setError(error.response?.data?.error || 'An error occurred');
    }
  };
   
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-200">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Welcome to <span className="text-purple-600">Workflo</span>!
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          {success && <div className="mb-4 text-green-500">{success}</div>}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className='text-black'>
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:underline">Log in.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
