import TodoItem from "./todoItem";


const TodoList = ({ tasks, onToggle, onDelete,onEdit }) => {
  if (tasks.length === 0) {
    return <p>No tasks added yet.</p>;
  } else {
    return (
      <div >
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    );
  }
};

export default TodoList;
