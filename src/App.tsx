import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { Inbox } from "lucide-react";

/** Define the shape of our task */
interface Task {
  id: number;
  text: string;
  isActive: boolean; // true = pending, false = completed
}

/** Storage key */
const STORAGE_KEY = "todo_tasks";

function App() {
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
   * addTask():
   * Adds a new task to the list.
   * - Checks for empty input
   * - Creates a new task object
   * - Updates the state immutably
   */
  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, isActive: true };
    setTasks((prev) => [...prev, newTask]);
  };

  /**
   * deleteTask():
   * Removes a task by its ID.
   * Uses filter() to create a new array without that task.
   */
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  /**
   * toggleTask():
   * Toggles the isActive field for a specific task.
   * Uses map() to update only the matching task (by ID).
   */
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isActive: !task.isActive } : task
      )
    );
  };

  const deleteAllTasks = () => {
    setTasks([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="bg-[#f7f7f7] px-15 py-10">
      <h1 className="text-3xl font-bold mb-3">React + TypeScript Todo App</h1>
      <TaskInput onAddTask={addTask} onClearAllTask={deleteAllTasks} />
      <h1 className="text-3xl font-bold mt-3 flex items-center gap-2">
        <Inbox />
        Inbox
      </h1>
      <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
    </div>
  );
}

export default App;
