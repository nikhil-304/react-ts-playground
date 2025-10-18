import React from "react";
import { CalendarDays } from "lucide-react";
import { Clock2 } from "lucide-react";
import { Check } from "lucide-react";

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
  // Format the date in 'DD MMMM YYYY' format
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(task.id);

  return (
    <div className="flex flex-col sm:flex-row items-center px-3 sm:px-5 py-4 sm:py-6 rounded-3xl bg-white">
      {/* Checkbox */}
      <div className="relative mb-2 sm:mb-0 sm:mr-4">
        <input
          type="checkbox"
          checked={!task.isActive}
          onChange={() => onToggle(task.id)}
          className="appearance-none h-6 w-6 sm:h-8 sm:w-8 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-[#C00A32] checked:bg-[#C00A32] checked:border-[#C00A32] transition-all"
        />
        {!task.isActive && (
          <Check
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-3/5 text-white pointer-events-none"
            size={22}
          />
        )}
      </div>

      {/* Task Text */}
      <div className="flex flex-col flex-1">
        <span
          style={{
            textDecoration: task.isActive ? "none" : "line-through",
            color: task.isActive ? "black" : "gray",
          }}
          className="text-sm sm:text-base md:text-lg"
        >
          {task.text}
        </span>
        <div className="flex items-center text-xs sm:text-sm">
          <CalendarDays size={16} className="sm:w-5 sm:h-5" />
          {formattedDate}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 mt-2 sm:mt-0 sm:ml-4 md:ml-8 lg:ml-16">
        <button className="bg-blue-700 rounded-3xl text-white px-2 py-1 text-xs sm:text-sm sm:px-3 sm:py-1">
          #general
        </button>
        <div className="flex items-center bg-[#C00A32] rounded-3xl text-white px-2 py-1 gap-1 text-xs sm:text-sm sm:px-3 sm:py-1">
          <Clock2 size={16} className="sm:w-5 sm:h-5" />
          <button>Let's Go</button>
        </div>
      </div>

      {/* Task Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="px-2 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 text-xs sm:text-sm mt-2 sm:mt-0 sm:ml-4"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
