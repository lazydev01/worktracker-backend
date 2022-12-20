const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title : {
            type :String,
            minLength : 3,
            trim : true
        },
        _listId : {
            type: mongoose.Types.ObjectId,
            required : true
        },
        completed:{
            type : Boolean,
            default : false
        },
        userId : {
            type : String,
            required : true,
            unique : true
        }
    }
)

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;