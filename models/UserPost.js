const { required, types } = require("joi");
const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const PostSchema=new Schema({
    message:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date.now(),
    },
    postAuthor:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

module.exports=mongoose.model("Postdata",PostSchema);