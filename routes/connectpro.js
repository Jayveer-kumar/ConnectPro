const express=require("express");
const router=express.Router();
const User=require("../models/user.js");

router.get("/connectpro",async (req,res,next)=>{
    try{
        let allUser= await User.find({});
        res.render("listings/index.ejs",{allUser});
    } catch(err){
        next(err);
    }
});

module.exports=router;

// code number 5 filename connectpro.js