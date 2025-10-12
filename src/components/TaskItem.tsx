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
    <li>
      <input
        type="checkbox"
        checked={!task.isActive}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          textDecoration: task.isActive ? "none" : "line-through",
          color: task.isActive ? "black" : "gray",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
