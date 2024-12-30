const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const bcrypt=require("bcrypt");
const passportlocalmongoose=require("passport-local-mongoose");
const userSchema=new Schema({
    name:{
        type:String,
        require:true
    },
    username: {
        type: String,
        required: true, // Username must be provided
        unique: true,   // Ensure no duplicate usernames
        match: /^[a-zA-Z0-9_.-]+$/, // Regex to allow characters, numbers, _ , . , and -
        minlength: 3,  // Minimum length of the username
        maxlength: 30  // Maximum length of the username
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    image:{
      type:String,
      require:true,
    },
    password:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        require:true,
    },
    bio:{
        type:String,
        require:true,
    }
});

userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.plugin(passportlocalmongoose);

module.exports=mongoose.model("User",userSchema);

// user Model Code Number 3.