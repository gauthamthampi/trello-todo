import React, { useEffect, useState } from 'react';
import getIdFromToken from '@/utils/decode';
import axios from 'axios';
import { localhost } from '@/url';
import { BsFillPlusCircleFill,BsStars } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { CiFilter } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";


interface HeaderProps {
  onCreateNewClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateNewClick }) => {
  const userId = getIdFromToken();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${localhost}/api/getUserDetails`, {
          params: { userId },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserData();
  }, [userId]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };

  return (
    <div className="p-6 bg-white shadow-md">
      <h1 className="text-4xl font-bold mb-2">
        {user ? `${getGreeting()}, ${getFirstName(user.name)}!` : 'Loading...'}
      </h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Introducing tags</h2>
          <p className="text-sm text-gray-600">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Share Notes Instantly</h2>
          <p className="text-sm text-gray-600">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
        </div>
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold">Access Anywhere</h2>
          <p className="text-sm text-gray-600">Sync your notes across all devices. Stay productive whether you&apos;re on your phone, tablet, or computer.</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="p-2 border rounded flex-grow" />
        <button className="p-2 bg-gray-100 rounded flex justify-between items-center gap-2">
        <span>Calendar view</span>
        <SlCalender />
        </button>                
        <button className="p-2 bg-gray-100 rounded flex justify-between items-center gap-2">
        <span>Automation</span>
        <BsStars />
        </button>             
        <button className="p-2 bg-gray-100 rounded flex justify-between items-center gap-2">
        <span>Filter</span>
        <CiFilter />
        </button> 
        <button className="p-2 bg-gray-100 rounded flex justify-between items-center gap-2">
        <span>Share</span>
        <IoShareSocialOutline />
        </button>                         
        <button
          type="button"
          onClick={onCreateNewClick}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-between items-center gap-2"
        >
          <span>Create New</span>
          <BsFillPlusCircleFill />
        </button>
      </div>
    </div>
  );
};

export default Header;
