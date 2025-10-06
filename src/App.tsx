import { useState } from "react";

const App = () => {
  const [tasks, setTasks] = useState<
    { id: number; text: string; isActive: boolean }[]
  >([]);
  const [input, setInput] = useState("");

  const handleAddTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, isActive: true }]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleIsActive = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isActive: !task.isActive } : task
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your task"
      ></input>
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={!task.isActive}
              onChange={() => handleIsActive(task.id)}
            />
            <span
              style={{
                textDecoration: task.isActive ? "none" : "line-through",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
