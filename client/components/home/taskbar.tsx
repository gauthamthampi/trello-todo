import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { localhost } from '@/url';
import getIdFromToken from '@/utils/decode';
import NewTaskModal from './newtaskmodal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  const handleTaskChange = (message: string) => {
    fetchTasks();
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newTasks = Array.from(tasks);
    const [movedTask] = newTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId;
    newTasks.splice(destination.index, 0, movedTask);

    setTasks(newTasks);

    try {
      await axios.post(`${localhost}/api/updateTaskStatus`, { taskId: movedTask._id, status: movedTask.status });
    } catch (err) {
      console.error('Failed to update task status', err);
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {['To do', 'In progress', 'Under review', 'Finished'].map((category) => (
            <Droppable droppableId={category} key={category}>
              {(provided) => (
                <div
                  className="bg-white p-4 rounded shadow-md"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="font-bold mb-2">{category}</h2>
                  {tasks
                    .filter((task) => task.status === category)
                    .map((task, index) => (
                      <Draggable draggableId={task._id.toString()} index={index} key={task._id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-4 bg-gray-100 border rounded-md p-3 relative"
                          >
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
                            <button className="absolute top-2 right-2" onClick={() => handleEditClick(task)}>
                              <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                  <button
                    className="w-full py-2 bg-black text-white rounded"
                    onClick={() => setModalVisible(true)}
                  >
                    Add new
                  </button>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {isModalVisible && (
        <NewTaskModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          taskToEdit={taskToEdit}
          onTaskChange={handleTaskChange}
        />
      )}
    </div>
  );
};

export default TaskBoard;
