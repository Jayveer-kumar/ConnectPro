const { default: mongoose } = require("mongoose");
const {userSchema}=require("./joiSchema.js");
const  ExpressError=require("./utills/ExpressError.js");
module.exports.validatedRegisterUser = async (req,res,next)=>{
    try{
      const {error,value}=userSchema.validate(req.body);
      if(error){
        return res.status(400).send(error.details[0].message);
      }
      next();
    }catch(err){
        next(err);
    }
}

module.exports.validateObjectId=  (req,res,next)=>{
  let {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return next(new ExpressError("Invalid Id Format :",400));
  }
  next();
}

// Middleware for User Registration  Code Number 5.