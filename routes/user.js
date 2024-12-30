const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const { session } = require("passport");
const {validatedRegisterUser , validateObjectId} = require("../middleware.js");
const bcrypt = require('bcrypt');
const passport = require("passport");
const ExpressError = require("../utills/ExpressError.js");
const { default: mongoose } = require("mongoose");
const connectFLash=require("connect-flash");

// Show Specific User in Detail  
router.get("/:id",validateObjectId, async(req,res,next)=>{
    try{
     let {id}=req.params;
     let user=await User.findById(id);
     if(!user){
        req.flash("success","User Not Founded  :");
      return next(new ExpressError("User Not Founded :",404));
     }
     req.flash("success","Welcome User Profile Page : ");
     console.log(req.flash().success);
     res.render("listings/show.ejs",{user});
    }catch(err){
        next(err);
    }
});
// Render Form for Edit User Profile
router.get("/:id/edit",async (req,res,next)=>{
    try{
        let {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(new ExpressError("Id is Invalid ",400));
        }
        let user=await User.findById(id);
        if(!user){
            return next(new ExpressError("User Not Exist : ",400));
        }
        req.flash("success", "We are now on User Profile Edit Page");
        res.render("listings/edit.ejs",{user});
    }catch(err){
        next(err);
    }
});
// Update Data 
router.put("/:id",validatedRegisterUser,async (req,res,next)=>{
   let {id}=req.params;
   let updatedData=req.body.user;
   const {password}=updatedData;
   try{
     if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ExpressError("Id is Invalid ",400));
     }
     let user=await User.findById(id);
     if(!user){
        return res.status(500).send("User Not Exist : ");
     }
     user.name= updatedData.name || user.name;
     user.email=updatedData.email || user.email;
     user.username=updatedData.username || user.username;
     user.bio=updatedData.bio || user.bio;
     user.image=updatedData.image || user.image;
     user.age=updatedData.age || user.age;
     user.password=updatedData.password || user.password;

     if(password && password.trim() !==""){
        const salt= await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
     }
     let result = await user.save();
     req.flash("success", "Profile Updated SuccessFully : ");
     res.redirect(`/user/${id}`);
   } catch(err){
    next(err);
   } 
     
});  

router.get("/",(req,res)=>{
    console.log("We visit Root Route : ");
    res.send("Root : Route : ");
})

router.post("/",async (req,res)=>{
   try{
    let someData=req.body;
    console.log(someData);
   }
   catch(err){
    return next(new ExpressError("Message not Sended : "),400);
   }
})

module.exports=router;

// code number 4 file name user.js














// const express=require("express");
// const router=express.Router();
// const User=require("../models/user.js");
// const validatedRegisterUser=require("../middleware.js");
// const ExpressError = require("../utills/ExpressError.js");

// // Render Sign Form
// router.get("/",(req,res)=>{
//     try{
//       res.render("listings/register.ejs");
//     }catch(err){
//        next(new ExpressError("Some Error Geting Sign Up Route",400));
//     }
// });

// router.get("/welcome",(req,res)=>{
//   console.log("We are now Welcome ROute : ");
//   res.send("Welcome In Welcome Route : ");
// })
// // Post Route
// router.post("/",async(req,res)=>{
//   try{
//    let {name,username,email,image,age,bio,password}=req.body.user;
//    const registerUser={name,username,email,image,age,bio,password};
//    let result = await User.register(registerUser,password); 
//    console.log(result);
//    res.redirect("/connectpro");
//   }catch(err){
//     console.error(err);
//     return res.status(400).send("Failure to signup : Please try again : ");
//   }
// });
// module.exports=router; 



// // //  Router For Registration Code Number 2.































// // const express = require("express");
// // const router = express.Router();
// // const User = require("../models/user.js");
// // const validatedRegisterUser = require("../middleware.js");
// // const ExpressError = require("../utills/ExpressError.js");

// // // Render Sign Form
// // router.get("/signup", (req, res, next) => {
// //     try {
// //         res.render("listings/register.ejs");
// //     } catch (err) {
// //         next(new ExpressError("Some Error Getting Sign Up Route", 400));
// //     }
// // });

// // // Post Route
// // router.post("/signup", validatedRegisterUser, async (req, res) => {
// //     try {
// //         const { name, username, email, image, age, bio, password } = req.body;
// //         const newUser = new User({ name, username, email, image, age, bio });
// //         console.log(newUser);
// //         const registeredUser = await User.register(newUser, password);
// //         console.log(registeredUser);
        
// //         // Automatically log in the user after registration
// //         req.login(registeredUser, (err) => {
// //             if (err) {
// //                 return next(err);
// //             }
// //             req.flash("success", "Welcome to WanderLust! You registered successfully");
// //             res.redirect('/listings');
// //         });
// //     } catch (err) {
// //         req.flash("error", err.message);
// //         res.redirect('/signup');
// //     }
// // });

// // module.exports = router;