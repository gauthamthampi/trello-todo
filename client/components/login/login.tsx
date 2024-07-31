// components/Login.tsx
'use client'
import React, { useState,useEffect } from 'react';
import { useAppDispatch } from '../../Redux/Store/store';
import { login } from '@/Redux/slices/authSlice'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { localhost } from '@/url';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${localhost}/api/login`, { email, password });
      dispatch(login());
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        console.log("Token Stored");
        router.push("/home")
        
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-purple-200">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Welcome to <span className="text-purple-600">Workflo</span>!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-6 transform -translate-y-1/2 cursor-pointer text-gray-300"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
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
