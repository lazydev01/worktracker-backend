const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/toDoList', {useNewUrlParser : true, useUnifiedTopology : true}).then(()=>{
    console.log("Database connected to the server")
}).catch((err)=>console.log(err));

module.exports = mongoose;