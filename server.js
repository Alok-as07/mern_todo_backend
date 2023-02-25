const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const app = express();
const Todo = require('./models/Todo');
const port = process.env.PORT;
const mc = process.env.API_KEY;

app.use(express.json());
app.use(cors());

console.log("server started");

mongoose.connect( mc,
{
  useNewUrlParser:true,
  useUnifiedTopology:true
} 
).then(()=>{console.log("connecting to mongoDb");})
.catch(console.error);
app.get('/help' ,(req,res)=>{
  console.log("backend is fine");
  res.send("YOUR APPLICATION IS RUNNING ");
  
})

app.get('/todos', async(req,res)=>{
    const todo = await Todo.find();
    res.json(todo);
})

app.post('/todo/new',(req,res)=>{
  const todo = new Todo({
    text:req.body.text
  });
  todo.save();
  res.json(todo);
});

app.delete('/todo/delete/:id',async(req,res)=>{
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

app.get('/todo/complete/:id',async (req,res)=>{
   var checkcomplete = Boolean(req.params.complete);
   if(checkcomplete == true){
    res.json(await Todo.findByIdAndUpdate(req.params.id,{complete:false})); 
   }
   else if(checkcomplete == false){
    res.json(await Todo.findByIdAndUpdate(req.params.id,{complete:true})); 
   }
   
});

app.listen(process.env.PORT,()=>{console.log("listening to "+port)});