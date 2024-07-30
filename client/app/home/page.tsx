'use client'
import React, { useState } from 'react';
import Sidebar from '@/components/home/sidebar';
import Header from '@/components/home/header';
import TaskBoard from '@/components/home/taskbar';
import NewTaskModal from '@/components/home/newtaskmodal';

const Home: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateNewClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-grow relative">
        <Header onCreateNewClick={handleCreateNewClick} />
        <TaskBoard />
        <NewTaskModal isVisible={isModalVisible} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Home;
