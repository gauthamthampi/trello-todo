import React from 'react';
import Sidebar from '@/components/home/sidebar';
import Header from '@/components/home/header';
import TaskBoard from '@/components/home/taskbar';

const Home: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <TaskBoard />
      </div>
    </div>
  );
};

export default Home;
