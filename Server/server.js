const express=require('express');
const cors=require('cors');
const app=express();
const PORT=1102;
const fs=require('fs');
const path=require('path');
const filepath=path.join(__dirname,'todos.json');


app.use(cors());
app.use(express.json());


//POST
app.post('/todos',(req,res) => {
       let todos=[];
    const newTodo = req.body;

   

     fs.readFile(filepath,'utf-8',(err,data)=>{
    
       if(  !err && data){
        todos=JSON.parse(data);
       }

       todos.push(newTodo);
       console.log('updated todos:',todos);
        fs.writeFile(filepath,JSON.stringify(todos,null,2),(err)=>{
    if(err){
        console.error("there is some error writing in the file,err");
        return res.status(500).json({message:'failed to save todo'}    )
    }
    console.log('file write successful');
    res.status(201).json({message:"your Todo has been saved successfully"})
  })
 
  })

})


app.get('/todos',(req,res)=>{
    
    
    fs.readFile(filepath,'utf-8',(err,data)=>{
        if (err){
            console.error('error reading todos:',err);
            return res.status(500).json({message:'failed to get todos'})
        }

        let todos=[];
        if(data){
            try{
                todos=JSON.parse(data);
            }catch(error){
                console.error('error passing todos:',error)
            }
        }
        res.send(todos)

    });
});

app.delete('/todos/:id',(req,res)=>{

   

    fs.readFile(filepath,'utf-8',(err,data)=>{
            if(err){
                console.error('error readinf file',err);
                return res.status(500).json({message:"some error in reading file"})
            }
            let todos=[];
            if(data){
            try{
                todos=JSON.parse(data);
                 const idToDelete=req.params.id;
                const updatedList=todos.filter(todo=>todo.id.toString()!==idToDelete);
               
                fs.writeFile(filepath,JSON.stringify(updatedList,null,2),(err)=>{
                    if(err){
                        console.error("error writing file",err);
                       return  res.status(500).json({message:"there is error writing into the file "})
                    }
                    console.log("file written successfully")
                    res.status(200).json({message:'file has been written successfully'});
                })
            }catch(parseErr){
                console.error('eRROR parsing todos:',parseErr);
                return res.status(500).json({ message: "Error parsing todos data" });
            }
        }
            
               
            });
    });


app.put('/todos',(req,res)=>{
   fs.readFile(filepath,'utf-8',(ReadErr,data)=>{
        if (ReadErr){
            console.error('Error Reading File:',ReadErr);
            return res.status(500).json({message:'error reading file'})
        }
        try{

        
        let todos=[];
        todos=JSON.parse(data);
        const updatedTodo=req.body;
        todos.forEach(todo => {
            if(todo.id===updatedTodo.id){
                todo.title=updatedTodo.title;
                todo.dueDate=updatedTodo.dueDate||null
            }
            
        });
        fs.writeFile(filepath,JSON.stringify(todos,null,2),(err)=>{
            if(err){
                console.error("there is error writing in the file for edit");
                return res.status(500).json({message:'error writing file'})
            }
            console.log("file written successfully for edit")
            return res.status(200).json({message:'file has been  updated'})
        })
        }catch(err){
            console.error("error parsing:",err);
        }
        
   })

})




app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
});
