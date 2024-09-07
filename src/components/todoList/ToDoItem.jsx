function ToDoItem({ task, onChange, onEdit, onDelete, editingTaskId }) {
  return (
    <li>
      {editingTaskId !== task.id ? (
        <>
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
        </>
      ) : (
        <input type="text" />
      )}

      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default ToDoItem;
