import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { localhost } from '@/url';
import getIdFromToken from '@/utils/decode';
import NewTaskModal from './newtaskmodal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<any | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const userId = getIdFromToken();

  const fetchTasks = async () => {
    try {
      const response = await axios.post(`${localhost}/api/getTasks`, { userId });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditClick = (task: any) => {
    setTaskToEdit(task);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setTaskToEdit(null);
    setModalVisible(false);
  };

  const handleTaskChange = (message: string, task?: any) => {
    if (task) {
      setTasks((prevTasks) => {
        const existingTaskIndex = prevTasks.findIndex((t) => t._id === task._id);
        if (existingTaskIndex !== -1) {
          // Update existing task
          const updatedTasks = [...prevTasks];
          updatedTasks[existingTaskIndex] = task;
          return updatedTasks;
        } else {
          // Add new task
          return [...prevTasks, task];
        }
      });
      fetchTasks()
    } else {
      fetchTasks();
    }
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleDeleteClick = async (taskId: string) => {
    try {
      await axios.delete(`${localhost}/api/deleteTasks/${taskId}`);
      fetchTasks(); // Refresh the task list
      setAlertMessage('Task deleted successfully');
      setTimeout(() => setAlertMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting task:', error);
      setAlertMessage('Failed to delete task');
      setTimeout(() => setAlertMessage(null), 3000);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 flex-grow bg-gray-100">
      {alertMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {alertMessage}
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {['To do', 'In progress', 'Under review', 'Finished'].map((category) => (
          <div key={category} className="bg-white p-4 rounded shadow-md">
            <h2 className="font-bold mb-2">{category}</h2>
            {tasks
              .filter((task) => task.status === category)
              .map((task) => (
                <div key={task._id} className="mb-4 bg-gray-100 border rounded-md p-3 relative">
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <span
                    className={`text-sm ${
                      task.priority === 'Urgent'
                        ? 'text-red-500'
                        : task.priority === 'Medium'
                        ? 'text-orange-500'
                        : 'text-green-500'
                    }`}
                  >
                    {task.priority}
                  </span>
                  <div className="text-sm text-gray-500">
                    <p>{new Date(task.deadline).toLocaleDateString()}</p>
                  </div>
                  <button className="absolute top-2 right-10" onClick={() => handleDeleteClick(task._id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                  <button className="absolute top-2 right-2" onClick={() => handleEditClick(task)}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </button>
                </div>
              ))}
            <button
              className="w-full py-2 bg-black text-white rounded"
              onClick={() => setModalVisible(true)}
            >
              Add new
            </button>
          </div>
        ))}
      </div>
      {isModalVisible && (
        <NewTaskModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          taskToEdit={taskToEdit}
          onTaskChange={handleTaskChange} // Pass the callback prop
        />
      )}
    </div>
  );
};

export default TaskBoard;
