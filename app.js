const express=require("express");
const app=express();
const port=8080;
const mongoose = require('mongoose');
const ejs=require("ejs");
const path=require("path");
const methodOverride=require("method-override");
const ejs_mate=require("ejs-mate");
const connectFlash=require("connect-flash"); // For one Time Popup Message
const cookieParser=require("cookie-parser"); // For Store Http Request information  
const session=require("express-session"); // to  helps web applications remember user data and preferences across multiple requests.
const User=require("./models/user.js");
const passport=require("passport"); //  Passport allows us to create and maintain sessions.
const passportLocalStrategy=require("passport-local"); 
const passportlocalmongoose=require("passport-local-mongoose");
const usePassport=require("./routes/userlogin.js");
const ExpressError = require("./utills/ExpressError.js");

const connectpro=require("./routes/connectpro.js");
const authhorizeUser=require("./routes/auth.js");
const userRoute=require("./routes/user.js");

// These  Four point important to use Passport for Authentication

try{
    main().then(()=>{
     console.log("Database is Connected : ");
    })
}catch (err){
  res.status(404).send("Server is Stops Due To Database connection Failed : ");
}
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ProfileManagement');
}
app.use(cookieParser());
app.use(express.json());
app.set("view engine ","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.json({strict:true}));
app.engine("ejs",ejs_mate);

usePassport(passport);

const sessionOption={
 secret:"profilemanager",
 resave:false,
 saveUninitialized:true,
 cookie: {
  expires:Date.now + 7 *24*60*60*1000,
  maxAge:7 *24*60*60*1000,
  httpOnly:true,
  },   
}
app.use(session(sessionOption));
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currentUser=req.user;
  next();
})

app.use("/",connectpro);
app.use("/authenticate",authhorizeUser); 
app.use("/user",userRoute);



app.use("*",(req,res,next)=>{
  next(new ExpressError("Page Not Found",400));
})
app.use((err,req,res,next)=>{
  let { status =500 ,message = "Some Erorr Occurred "}=err;
  return res.status(status).send(message);
});

app.listen(port,()=>{
    console.log(`Server is Running At Port ${port}`);
});

// Main app.js File Code Number 1.