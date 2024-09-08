function ToDoItem({
  task,
  onChange,
  onEditClick,
  onDelete,
  editingTaskId,
  onUpdate,
  onEdit,
  editInput,
}) {
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

          <button onClick={onEditClick}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      ) : (
        <>
          <form onSubmit={onUpdate}>
            <input type="text" value={editInput} onChange={onEdit} />
            <button type="submit">Update</button>
          </form>
        </>
      )}
    </li>
  );
}

export default ToDoItem;
