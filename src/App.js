import { useEffect, useState } from "react";
import TodoInput from "./Components/todoInput";
import TodoList from "./Components/todoList";
import "./mode.css";

const App=()=>{
  const[tasks,setTasks]=useState(()=>
{
  const savedTasks=localStorage.getItem("tasks");
  return savedTasks? JSON.parse(savedTasks):[];
  })



  const[filter,setFilter]=useState("all");  



  const filteredTasks=tasks.filter(tasks=>{
    if(filter==="Active") return !tasks.completed;
    if(filter==="Completed") return tasks.completed;
    return true;
  });

useEffect(()=>{
  localStorage.setItem("tasks",JSON.stringify(tasks))
},[tasks]);




  const filteredsortedTasks=[...filteredTasks].sort((a,b)=>{
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate)-new Date(b.dueDate);
  }

  );

  const addTask=(title,dueDate)=>{
    const newTask={
      id:Date.now(),
      title:title,
      completed:false,
      dueDate,
    };
    setTasks([...tasks,newTask]);
  }

  const toggleTask = (id) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
};

const deleteTask=(id)=>{
  const filteredTasks=tasks.filter((tasks)=>tasks.id !==id );
  setTasks(filteredTasks);
};

const editTask=(id,newTitle)=>{
  setTasks(tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    ));
  };



const [mode,setMode]=useState("light");

const changeMode=()=>{
  setMode((prevMode)=>(prevMode==="light"?"dark":"light"));
};




return(
 
   <div className="Box">
 <div className={mode === "light" ? "lightMode" : "darkMode"}>
   
    
  <h2>My Todo List</h2>
  <button onClick={changeMode} style={{marginRight:"20px"}}>
     {mode === "light" ? "Dark" : "Light"} Mode
  </button>

  <select value={filter} onChange={e=>setFilter(e.target.value)} style={{marginBottom:"16px"}}>

   <option value="All">All</option>
   <option value="Completed">Completed</option>
   <option value="Active">Active</option>


  </select>

   
    <TodoInput onAdd={addTask}/>
     
   
    <TodoList tasks={filteredsortedTasks}
     onToggle={toggleTask} 
     onDelete={deleteTask}
     onEdit={editTask}
     />
      
  </div>
  </div>
)


}


export default App;
