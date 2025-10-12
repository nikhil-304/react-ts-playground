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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add Task</button>
      <button onClick={clearAll}>Clear All</button>
    </form>
  );
};

export default TaskInput;
