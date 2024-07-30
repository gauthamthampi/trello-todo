import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExpand, faShareAlt, faStar, faCalendarAlt, faPencilAlt, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface NewTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const NewTaskModal: React.FC<NewTaskModalProps> = ({ isVisible, onClose }) => {
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
        <form>
          <div className="mb-4">
            <input type="text" className="w-full text-3xl font-semibold p-2 border rounded" placeholder="Title" />
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faSpinner} className="mr-2" />
            <label className="flex-grow text-gray-600">Status</label>
            <select className="p-2 border rounded w-2/3">
              <option value="">Not selected</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="under-review">Under Review</option>
              <option value="finished">Finished</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            <label className="flex-grow text-gray-600">Priority</label>
            <select className="p-2 border rounded w-2/3">
              <option value="">Not selected</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            <label className="flex-grow text-gray-600">Deadline</label>
            <input type="date" className="p-2 border rounded w-2/3" />
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faPencilAlt} className="mr-2" />
            <label className="flex-grow text-gray-600">Description</label>
            <textarea className="p-2 border rounded w-2/3"></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <label className="flex-grow text-gray-600">Add custom property</label>
            
          </div>
          <button type="submit" className="p-2 bg-blue-600 text-white rounded">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
