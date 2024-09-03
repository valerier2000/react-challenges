import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleChange(e) {
    setInputTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (inputTask.trim() === "") return;

    const newTask = {
      id: uuidv4(),
      name: inputTask,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    console.log(tasks);
    setInputTask("");
  }

  function handleRemove(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleToggle(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Enter your task: </label>
        <input
          type="text"
          name="task"
          value={inputTask}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>

      <div>
        <button onClick={() => setTasks([])}>Clear all tasks</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              id={task.id}
              name={task.name}
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />
            <label
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.name}
            </label>
            <button onClick={() => handleRemove(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
