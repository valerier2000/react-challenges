function ToDoItem({ task, onChange, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        id={task.id}
        name={task.name}
        checked={task.completed}
        onChange={onChange}
      />
      <label
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.name}
      </label>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default ToDoItem;
