const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
    {
        title : {
            type :String,
            minLength : 3,
            trim : true
        },
        userId : {
            type : String,
            required : true,
            unique : true
        }
    }
)

const List = mongoose.model('List', ListSchema);

module.exports = List;