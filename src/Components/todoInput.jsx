import React,{useState} from "react";

const TodoInput =({onAdd})=>{
    const [task,setTask]=useState("");
    const[dueDate,setDueDate]=useState("");

    function handleAdd() {
        if (task.trim()) {
            onAdd(task.trim(),dueDate||null);
            setTask("");
            setDueDate("");
        }
    }
return(
    <div>
        <input type= "text" placeholder="enter you task.." value={task} onChange={(e)=>setTask(e.target.value)}
        style={{marginRight:"10px"}}/>

        <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)}
        style={{marginRight:"8px"}} />

        <button onClick={handleAdd}>Add</button>
    </div>
)

}

export default TodoInput;