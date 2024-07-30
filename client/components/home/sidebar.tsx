// components/Sidebar.tsx
import React from 'react';
import { FaHome, FaTachometerAlt, FaCog, FaUsers, FaChartBar } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-1/4  p-4 h-screen">
      <div className="flex items-center space-x-3">
        <img src="https://img.freepik.com/premium-vector/cute-boy-smiling-cartoon-kawaii-boy-illustration-boy-avatar-happy-kid_1001605-3445.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722211200&semt=ais_hybrid" alt="Joe Gardner" className="w-10 h-10 rounded-full" />
        <h1 className="font-bold">Joe Gardner</h1>
      </div>
      <nav className="mt-6">
        <ul>
          <li className="py-2 flex items-center space-x-2">
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
      <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create New</button>
      <button className="mt-4 w-full py-2 bg-gray-200 text-gray-700 rounded">Download the app</button>
    </aside>
  );
};

export default Sidebar;
