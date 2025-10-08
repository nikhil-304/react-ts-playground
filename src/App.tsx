import { useEffect, useState } from "react";

/** Define the shape of our task */
interface Task {
  id: number;
  text: string;
  isActive: boolean; // true = pending, false = completed
}

/** Storage key (include version to help migrations later) */
const STORAGE_KEY = "react-ts-playground.todo.v1";

const App = () => {
  /**
   * 'tasks' is an array of objects where each object = a single task.
   * Each task has:
   *  - id: unique identifier
   *  - text: task description
   *  - isActive: true = pending, false = completed
   */
  const [tasks, setTasks] = useState<Task[]>(() => {
    //LOAD from localStorage once
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return []; // No tasks found, return empty array
      return JSON.parse(raw) as Task[]; // Parse the JSON string stored in localStorage, and interpret the resulting data as an array of Task objects.
    } catch (err) {
      console.error("Error loading tasks:", err);
      return []; // Return empty array in case of error
    }
  });

  /**
   * 'input' stores the current text user types in the input box.
   * 'setInput' is used to update its value.
   */
  const [input, setInput] = useState("");

  /* -------------------------
     SAVE to localStorage whenever tasks change
     -------------------------
     - stringify tasks and setItem
     - This is synchronous but OK for small payloads.
  */
  useEffect(() => {
    try {
      const raw = JSON.stringify(tasks);
      localStorage.setItem(STORAGE_KEY, raw);
    } catch (err) {
      console.log("Failed saving tasks to localStorage: ", err);
    }
  }, [tasks]);

  /**
   * handleAddTask():
   * Adds a new task to the list.
   * - Checks for empty input
   * - Creates a new task object
   * - Updates the state immutably
   */
  const handleAddTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, isActive: true }]);
    setInput("");
  };

  /**
   * handleDelete():
   * Removes a task by its ID.
   * Uses filter() to create a new array without that task.
   */
  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  /**
   * handleIsActive():
   * Toggles the isActive field for a specific task.
   * Uses map() to update only the matching task (by ID).
   */
  const handleIsActive = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isActive: !task.isActive } : task
      )
    );
  };

  const clearAll = () => {
    setTasks([]);
    //remove from localStorage too
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div>
      {/* Input field to type new task */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your task"
      ></input>
      {/* Button to add new task */}
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={clearAll}>Clear All</button>

      <ul>
        {/*
          ✅ SORTING LOGIC:
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

          ✅ Meaning: Active tasks appear first, completed ones at bottom.
        */}
        {[...tasks]
          .sort((a, b) => Number(b.isActive) - Number(a.isActive))
          .map((task) => (
            <li key={task.id}>
              {/* Checkbox toggles completion */}
              <input
                type="checkbox"
                checked={!task.isActive}
                onChange={() => handleIsActive(task.id)}
              />
              {/* Conditionally render strikethrough for completed tasks */}
              <span
                style={{
                  textDecoration: task.isActive ? "none" : "line-through",
                }}
              >
                {task.text}
              </span>
              {/* Delete button */}
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
