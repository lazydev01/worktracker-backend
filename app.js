const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());


const List = require("./database/models/list");
const Task = require("./database/models/task");
const User = require("./database/models/user");

const PORT = 3000;

const mongoose = require("./database/mongoose");

// app.get("/lists", (req, res) => {
//   List.find({userId : req.params.userId}).then(list=>res.send(list))
//   .catch((err)=>console.log(err));
// });
app.get("/users/:userId/lists", (req, res) => {
  List.find({userId : req.params.userId}).then(list=>res.send(list))
  .catch((err)=>console.log(err));
});

app.post('/users/:userId/lists', (req, res)=>{
    new List({'title' : req.body.title, userId : req.params.userId}).save().then((list)=>res.send(list)).catch((err)=> console.log(err))
})

app.get('/users/:userId/lists/:listid', (req, res)=> {
    List.findOne({_id : req.params.listid, userId : req.params.userId}).then((list)=> res.send(list)).catch((err)=> console.log(err));
})

app.patch('/users/:userId/lists/:listid', (req, res)=>{
    List.findOneAndUpdate({_id : req.params.listid}, { $set : req.body}).then((list)=>res.send(list)).catch((err)=> console.log(err))
})

app.delete('/users/:userId/lists/:listid', (req, res)=>{
    const deleteTasks = (list) => {
        Task.deleteMany({_listId: list._id, userId : req.params.userId}).then(()=>list).catch((err)=>console.log(err));
    }

    List.findByIdAndDelete(req.params.listid).then((list)=>deleteTasks(list)).catch((err)=>console.log(err))

    res.status(200).send({deleted: true})
})

app.get('/users/:userId/lists/:listId/tasks', (req, res)=> {
    Task.find({_listId : req.params.listId, userId : req.params.userId}).then((task)=>res.send(task)).catch((err)=>console.log(err))
})

app.post('/users/:userId/lists/:listId/tasks', (req, res)=>{
    new Task({title : req.body.title, _listId: req.params.listId, userId : req.params.userId}).save().then((task)=> res.send(task)).catch((err)=>console.log(err))
})

app.get('/users/:userId/lists/:listId/tasks/:taskId', (req, res)=>{
    Task.findOne({_listId: req.params.listId,_id : req.params.taskId, userId : req.params.userId}).then((task)=>res.send(task)).catch((err)=>console.log(err))
})

app.patch('/users/:userId/lists/:listId/tasks/:taskId', (req, res)=>{
    Task.findOneAndUpdate({_listId: req.params.listId, _id: req.params.taskId, userId: req.params.userId}, {$set : req.body}).then((task)=>res.send(task)).catch((err)=>console.log(err));
})

app.delete('/users/:userId/lists/:listId/tasks/:taskId', (req, res)=>{
    Task.findOneAndDelete({_id : req.params.taskId, _listId : req.params.listId, userId : req.params.userId}).then((task)=>res.send(task)).catch((err)=>console.log(err));
})

app.post('/register', (req, res)=>{
    new User({name : req.body.name, email : req.body.email, req, password : req.body.password}).save().then((user)=>res.send(user)).catch((err)=> console.log(err));
});

app.get('/users', async(req, res)=> {
    await User.find().then((users)=> {
        console.log(users);
        res.send(users)
    }).catch((err)=> console.log(err));
})

app.get('/users/:userId', (req, res)=> {
    User.findById(req.params.userId).then((user)=> res.send(user)).catch((err)=> console.log(err));
})

app.post('/login',async (req, res)=> {
    const currentUser = await User.findOne(req.body);
    if(currentUser){
        User.findOne(req.body).then((user)=>res.send(user)).catch((err)=> console.log(err));
    }
    else{
        res.status(401).send("Please enter Valid Parameters")
    }
})

app.listen(PORT, () => {
  console.log(`Server connected on ${PORT}`);
});
