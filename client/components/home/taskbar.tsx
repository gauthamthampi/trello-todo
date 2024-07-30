import React from 'react';

const tasks = [
  {
    id: 1,
    category: 'To do',
    items: [
      { title: 'Implement User Authentication', description: 'Develop and integrate user authentication using email and password.', priority: 'Urgent', date: '2024-08-15', time: '1 hr ago' }
    ]
  },
  {
    id: 2,
    category: 'In progress',
    items: [
      { title: 'Design Home Page UI', description: 'Develop and integrate user authentication using email and password.', priority: 'Medium', date: '2024-08-15', time: '1 hr ago' },
      { title: 'Conduct User Feedback Survey', description: 'Collect and analyze user feedback to improve app features.', priority: 'Low', date: '2024-08-05', time: '3 hr ago' }
    ]
  },
  {
    id: 3,
    category: 'Under review',
    items: [
      { title: 'Integrate Cloud Storage', description: 'Enable cloud storage for note backup and synchronization.', priority: 'Urgent', date: '2024-08-20', time: '2 days ago' }
    ]
  },
  {
    id: 4,
    category: 'Finished',
    items: [
      { title: 'Test Cross-browser Compatibility', description: 'Ensure the app works seamlessly across different web browsers.', priority: 'Medium', date: '2024-07-30', time: '4 days ago' }
    ]
  }
];

const TaskBoard: React.FC = () => {
  return (
    <div className="p-6 flex-grow bg-gray-100">
      <div className="grid grid-cols-4 gap-4">
        {tasks.map(task => (
          <div key={task.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="font-bold mb-2">{task.category}</h2>
            {task.items.map(item => (
              <div key={item.title} className="mb-4 bg-gray-100 border rounded-md p-3">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <span className={`text-sm ${item.priority === 'Urgent' ? 'text-red-500' : item.priority === 'Medium' ? 'text-orange-500' : 'text-green-500'}`}>{item.priority}</span>
                <div className="text-sm text-gray-500">
                  <p>{item.date}</p>
                  <p>{item.time}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-2 bg-black text-white rounded">Add new</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
