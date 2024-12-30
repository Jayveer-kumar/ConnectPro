const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const {validatedRegisterUser} = require("../middleware.js");
const ExpressError = require("../utills/ExpressError.js");
const passportLocalStrategy = require('passport-local');
const passport = require("passport");
const loginWithEmailAndUsername=require("./userlogin.js");


// render Signup Form
router.get("/signup", (req, res, next) => {
    try {
        res.render("listings/register.ejs");
    } catch (err) {
        next(new ExpressError("Some Error Getting Sign Up Form", 400));
    }
});

// Post Route
router.post("/signup", validatedRegisterUser, async (req, res) => {
    try {
        const { name, username, email, image, age, bio, password } = req.body;
        const newUser = new User({ name, username, email, image, age, bio });
        console.log(newUser);
        const registeredUser = await User.register(newUser, password);
        console.log("registeredUser",registeredUser);        
        // Automatically log in the user after registration
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to connectpro! You registered successfully");
            console.log("User after signup than Login : ");
            res.redirect('/connectpro');
        });
    } catch (err) {
        req.flash("error", "Some Issue To SignIn Please Try Again ");
        res.redirect('/connectpro/authenticate/signup');
    }
});

router.get("/login",(req,res)=>{
    res.render("listings/login.ejs");
});

// router.post("/login", passport.authenticate("local",{ successRedirect:"/userinfo" ,failureRedirect:"/authenticate/login",failureFlash:true}), async (req,res)=>{
    
// })

router.post("/login", async (req, res, next) => {
    const { identifier, password } = req.body; // Assuming you are sending identifier and password in the request body

    // Attempt to authenticate the user
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            req.flash("success","Some Error to login  A : ");
            return next(err); // Handle any errors that occurred during authentication
        }
        if (!user) {
            // If user is not found, you can throw a custom error
            req.flash("success","User Not Exist");
            return res.status(401).json({ message: info.message || 'Login failed' });
        }

        // Log the user in
        req.logIn(user, (err) => {
            if (err) {
                req.flash("success","Some Error to login  B : ");
                return next(err); // Handle any errors that occurred during login
            }
            // Successful login, redirect or send a response
            let Username=req.user.name;
            res.locals.currentUser=req.user;
            req.flash("success",`  Welcome  ${Username} regard connectpro Team`);
            return res.redirect("/connectpro"); // Redirect to user info page
        });
    })(req, res, next); // Call the authenticate function with the request, response, and next
});

module.exports=router;

// code number 2 file name auth.js 