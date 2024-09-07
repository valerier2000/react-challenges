import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoItem from "./ToDoItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function ToDoList() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [editingTaskId, setEditingTaskId] = useState("");

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

  function handleEdit(taskId) {
    setEditingTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
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
              onEdit={() => handleEdit(task.id)}
              onChange={() => handleToggleCompleted(task.id)}
              onDelete={() => handleDelete(task.id)}
              editingTaskId={editingTaskId}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
