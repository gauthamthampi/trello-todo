import React from 'react';

interface HeaderProps {
  onCreateNewClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateNewClick }) => {
  return (
    <div className="p-6 bg-white shadow-md">
      <h1 className="text-4xl font-bold mb-2">Good morning, Joe!</h1>
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
          <p className="text-sm text-gray-600">Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="p-2 border rounded flex-grow" />
        <button className="p-2 bg-gray-100 rounded">Calendar view</button>
        <button className="p-2 bg-gray-100 rounded">Automation</button>
        <button className="p-2 bg-gray-100 rounded">Filter</button>
        <button 
          type="button" 
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={onCreateNewClick}
        >
          Create New
        </button>
      </div>
    </div>
  );
};

export default Header;
