import { useEffect, useState } from "react";
import TodoInput from "./Components/todoInput";
import TodoList from "./Components/todoList";
import "./mode.css";

const App=()=>{
  const[tasks,setTasks]=useState([])

  const[filter,setFilter]=useState("all");  

  useEffect(()=>{
    async function fetchTodos(){
      try{
        const response=await fetch("http://localhost:1102/todos")
        if (!response.ok){
          throw new Error("failed to fetch todos from backend");
        }
        const todos=await response.json();
        setTasks(todos);
      } catch (error){
        console.error('error fetching todos:',error);
      }
    }

    fetchTodos();
  },[]);



  const filteredTasks=tasks.filter(tasks=>{
    if(filter==="Active") return !tasks.completed;
    if(filter==="Completed") return tasks.completed;
    return true;
  });






  const filteredsortedTasks=[...filteredTasks].sort((a,b)=>{
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate)-new Date(b.dueDate);
  }

  );

  const addTask=async(title,dueDate)=>{
    const newTask={
      id:Date.now(),
      title:title,
      completed:false,
      dueDate,
    };

try{
  const response=await fetch('http://localhost:1102/todos',{
    method:'POST',
    headers:{'content-type':'application/json'},
    body:JSON.stringify(newTask)
  });

  if(!response.ok){
    throw new Error('failed to save in backend')
  }

  console.log("your todo is saved in the backend");
}catch (err){
  console.error("BAckend Error:",err);
}





    setTasks([...tasks,newTask]);
  }

  const toggleTask = (id) => {
  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
};

const deleteTask=async(id)=>{
  

try{
  const response= await fetch(`http://localhost:1102/todos/${id}`,{
    method:'DELETE'
  });
  if(!response.ok){
    throw new Error("Failed to delete task")
  }
  console.log("your todo has been deleted")
  const filteredTasks=tasks.filter((tasks)=>tasks.id !==id );
  setTasks(filteredTasks);


}catch(err){
  console.error("Backend error:",err);

}
};

const editTask=async(id,newTitle)=>{
  
  
  try{
  const response= await fetch(`http://localhost:1102/todos/`,{
    method:'PUT',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({
      id:id,
      title:newTitle
    }) ,

  });
  if(!response.ok){
    throw new Error("Failed to edit task")
  }
  console.log("your todo has been edited")
  setTasks(tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle } : task
    ));
  


}catch(err){
  console.error("Backend error:",err);

}
};




const [mode,setMode]=useState("light");

const changeMode=()=>{
  setMode((prevMode)=>(prevMode==="light"?"dark":"light"));
};




return(
 
  
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
     
   <div className="Box">
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
