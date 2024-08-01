'use client'
import React, { useEffect, useState } from 'react';
import { FaHome, FaTachometerAlt, FaCog, FaUsers, FaChartBar, FaSun, FaBell } from 'react-icons/fa';
import { HiChevronDoubleRight, HiArrowDownTray } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import getIdFromToken from '@/utils/decode'; // Your custom decode function
import { localhost } from '@/url';
import { BsFillPlusCircleFill } from "react-icons/bs";


interface HeaderProps {
  onCreateNewClick: () => void;
}

const Sidebar: React.FC<HeaderProps> = ({ onCreateNewClick }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = getIdFromToken(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('User ID is not available');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${localhost}/api/getUserDetails`, {
          params: { userId }, 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div role="status" className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <aside className="w-1/4 p-4 h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatarUrl || "https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722211200&semt=ais_hybrid"}
            alt={user?.name || "User"}
            className="w-10 h-10 rounded-full"
          />
          <h1 className="font-bold">{user?.name || 'Loading...'}</h1>
        </div>
        <div className="mt-2 flex items-center space-x-3">
          <FaSun className="text-gray-700" />
          <FaBell className="text-gray-700" />
          <HiChevronDoubleRight className="text-gray-700" />
          <button onClick={handleLogout} className="ml-6 text-gray-700 bg-gray-100 p-2 flex items-center space-x-1">
            <span>Logout</span>
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            <li className="py-2 flex items-center space-x-2 bg-gray-100 border-gray-700">
              <FaHome className="text-gray-700" />
              <a href="#" className="text-gray-700">Home</a>
            </li>
            <li className="py-2 flex items-center space-x-2">
              <FaTachometerAlt className="text-gray-700" />
              <a href="#" className="text-gray-700">Boards</a>
            </li>
            <li className="py-2 flex items-center space-x-2">
              <FaCog className="text-gray-700" />
              <a href="#" className="text-gray-700">Settings</a>
            </li>
            <li className="py-2 flex items-center space-x-2">
              <FaUsers className="text-gray-700" />
              <a href="#" className="text-gray-700">Teams</a>
            </li>
            <li className="py-2 flex items-center space-x-2">
              <FaChartBar className="text-gray-700" />
              <a href="#" className="text-gray-700">Analytics</a>
            </li>
          </ul>
        </nav>
        <button
  type="button"
  onClick={onCreateNewClick}
  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-between items-center gap-2"
>
  <span>Create New</span>
  <BsFillPlusCircleFill />
</button>
        
      </div>
      <button className="mt-4 w-full py-2 bg-gray-200 text-gray-700 rounded flex items-center justify-center space-x-2">
        <HiArrowDownTray className="text-gray-700" />
        <span>Download the app</span>
      </button>
    </aside>
  );
};

export default Sidebar;
