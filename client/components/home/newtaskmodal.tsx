import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExpand, faShareAlt, faStar, faCalendarAlt, faPencilAlt, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { localhost } from '@/url';
import getIdFromToken from '@/utils/decode';

interface NewTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  taskToEdit?: any;
  onTaskChange: (message: string, task?: any) => void; // Updated this line
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ isVisible, onClose, taskToEdit, onTaskChange }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const userId = getIdFromToken();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setDeadline(new Date(taskToEdit.deadline).toISOString().substr(0, 10));
      setDescription(taskToEdit.description);
    } else {
      setTitle('');
      setStatus('');
      setPriority('');
      setDeadline('');
      setDescription('');
    }
    setErrors({});
  }, [taskToEdit]);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = 'Title is required';
    if (!status) newErrors.status = 'Status is required';
    if (!priority) newErrors.priority = 'Priority is required';
    if (!deadline) newErrors.deadline = 'Deadline is required';
    if (!description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const taskData = {
        title,
        status,
        priority,
        deadline,
        description,
        userId,
      };

      let response;
      if (taskToEdit) {
        response = await axios.put(`${localhost}/api/tasks/${taskToEdit._id}`, taskData);
        onTaskChange('Task edited successfully', response.data);
      } else {
        response = await axios.post(`${localhost}/api/addTask`, taskData);
        onTaskChange('Task added successfully', response.data); // Updated this line
      }

      onClose();
    } catch (error) {
      console.error('Error adding/editing task:', error);
    }
  };

  return (
    <div className={`fixed top-0 right-0 w-full md:w-1/3 h-full bg-white shadow-lg transition-transform transform ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button className="p-2 bg-gray-100 rounded">
              <FontAwesomeIcon icon={faExpand} />
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 rounded">
              <FontAwesomeIcon icon={faShareAlt} />
            </button>
            <button className="p-2 bg-gray-100 rounded">
              <FontAwesomeIcon icon={faStar} />
            </button>
          </div>
        </div>
        <form onSubmit={handleAddTask}>
          <div className="mb-4">
            <input
              type="text"
              className="w-full text-3xl font-semibold p-2 border rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faSpinner} className="mr-2" />
            <label className="flex-grow text-gray-600">Status</label>
            <select
              className="p-2 border rounded w-2/3"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Not selected</option>
              <option value="To do">To Do</option>
              <option value="In progress">In Progress</option>
              <option value="Under review">Under Review</option>
              <option value="Finished">Finished</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            <label className="flex-grow text-gray-600">Priority</label>
            <select
              className="p-2 border rounded w-2/3"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Not selected</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
            {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority}</p>}
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            <label className="flex-grow text-gray-600">Deadline</label>
            <input
              type="date"
              className="p-2 border rounded w-2/3"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
            <label className="flex-grow text-gray-600">Description</label>
            <textarea
              className="p-2 border rounded w-2/3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <button type="submit" className="p-2 bg-blue-600 text-white rounded">
            {taskToEdit ? 'Edit Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
