
import React,{useState} from "react";

const TodoItem=({task,onToggle,onDelete,onEdit})=>{

 const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && editedTitle.trim()) {
      onEdit(task.id, editedTitle.trim()); 
      setIsEditing(false); 
    }
  };


return(

   
    <div style={{marginBottom:"8px"}}>
        <input type="checkbox"  checked={task.completed} onChange={()=>onToggle(task.id)}/>

          {isEditing ? (
        <input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onKeyDown={handleKeyDown} 
          autoFocus
          style={{ marginRight: "8px" }}
        />
      ) : (
        <>
        
        <span style={{textDecoration:task.completed?"line-through":"none", margin:"0 10px",}}>{task.title}</span>

        <button
            onClick={() => setIsEditing(true)} 
            style={{ marginRight: "2px" }}
          >
            Edit
          </button>
        </>
      )}

        <span style={{ fontStyle: "italic", marginRight: "5px" }}>
  {task.dueDate
    ? `(Due: ${new Date(task.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })})`
    : ""}
</span>


        <button onClick = {()=>onDelete(task.id)}>Delete</button>
    </div>
);
};

export default TodoItem;