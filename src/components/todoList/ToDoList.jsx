import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoItem from "./ToDoItem";

function ToDoList() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem("tasks", JSON.stringify(tasks));
    else localStorage.removeItem("tasks");
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();

    if (inputTask.trim() === "") return;

    const newTask = {
      id: uuidv4(),
      name: inputTask,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setInputTask("");
  }

  function handleChange(e) {
    setInputTask(e.target.value);
  }

  function handleDeleteAllTasks() {
    setTasks([]);
  }

  function handleDelete(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  function handleToggleCompleted(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="taskInput">Enter task: </label>
        <input
          type="text"
          name="taskInput"
          value={inputTask}
          onChange={handleChange}
        />
        <button type="submit">Add task</button>
      </form>

      <button onClick={handleDeleteAllTasks}>Delete all tasks</button>

      <ul>
        {tasks.map((task) => {
          return (
            <ToDoItem
              task={task}
              key={task.id}
              onChange={() => handleToggleCompleted(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
