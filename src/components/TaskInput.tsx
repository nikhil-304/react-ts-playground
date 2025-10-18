import React, { useState } from "react";

interface TaskInputProps {
  onAddTask: (text: string) => void;
  onClearAllTask: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask, onClearAllTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTask(inputValue);
    setInputValue(""); // clear input
  };

  const clearAll = () => {
    onClearAllTask();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white justify-center px-3 py-5 rounded-2xl"
    >
      <input
        type="text"
        placeholder="Enter your task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="px-4 py-2 w-full sm:w-96 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition duration-200"
      />
      <button
        type="submit"
        className="px-4 py-2 sm:px-6 sm:py-2 bg-green-700 text-white rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 w-full sm:w-auto"
      >
        Add Task
      </button>
      <button
        type="button"
        onClick={clearAll}
        className="px-4 py-2 sm:px-6 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200 w-full sm:w-auto"
      >
        Clear All
      </button>
    </form>
  );
};

export default TaskInput;
