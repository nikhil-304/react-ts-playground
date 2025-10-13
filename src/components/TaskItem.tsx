import React from "react";

interface Task {
  id: number;
  text: string;
  isActive: boolean;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggle }) => {
  return (
    <div className="flex items-center w-100 p-1.5 hover:bg-gray-100 rounded-md">
      <input
        type="checkbox"
        checked={!task.isActive}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5 mr-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
      />
      <span
        style={{
          textDecoration: task.isActive ? "none" : "line-through",
          color: task.isActive ? "black" : "gray",
        }}
        className="w-80"
      >
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
