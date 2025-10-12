import React from "react";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
  isActive: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onToggle }) => {
  {
    /*
      SORTING LOGIC:
      We create a copy of tasks using [...tasks] to avoid mutating the original state.
      Then we use sort((a, b) => Number(b.isActive) - Number(a.isActive))

        - isActive = true → 1
        - isActive = false → 0
        - Comparator Rule:
            if result < 0 → keep a before b
            if result > 0 → move a after b

      So:
          a=true(1), b=false(0) → 0 - 1 = -1 → keep a before b
          a=false(0), b=true(1) → 1 - 0 = 1 → move a after b

      Meaning: Active tasks appear first, completed ones at bottom.
    */
  }
  return (
    <ul>
      {[...tasks]
        .sort((a, b) => Number(b.isActive) - Number(a.isActive))
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
    </ul>
  );
};

export default TaskList;
