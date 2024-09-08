import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoItem from "./ToDoItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function ToDoList() {
  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [editingTaskId, setEditingTaskId] = useState("");
  const [editInput, setEditInput] = useState("");

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

  function handleEditClick(taskId, taskName) {
    setEditingTaskId((prevTaskId) => (prevTaskId === taskId ? null : taskId));
    setEditInput(taskName);
  }

  function handleEdit(e) {
    setEditInput(e.target.value);
  }

  function handleUpdate(e, taskId) {
    e.preventDefault();

    if (editInput.trim() === "") return;

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, name: editInput } : task
      )
    );

    setEditingTaskId(null);
    setEditInput("");
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
              onEditClick={() => handleEditClick(task.id, task.name)}
              onChange={() => handleToggleCompleted(task.id)}
              onDelete={() => handleDelete(task.id)}
              editingTaskId={editingTaskId}
              onUpdate={(e) => handleUpdate(e, task.id)}
              onEdit={handleEdit}
              editInput={editInput}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ToDoList;
