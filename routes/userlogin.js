// // passport-config.js
// const passportLocalStrategy = require('passport-local');
// const passport=require("passport");
// const User = require('../models/user.js'); // User model
// module.exports = function(passport) {
//     // Define LocalStrategy to handle login with either email or username
//     passport.use('local', new passportLocalStrategy({
//         usernameField: 'identifier',
//         passwordField: 'password'
//     }, (identifier, password, done) => {
//         let query = {};
//         if (identifier.includes('@')) { 
//             query.email = identifier; // Search by email
//         } else {
//             query.username = identifier; // Search by username
//         }

//         User.findOne(query, (err, user) => {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 return done(null, false, { message: 'No user found with this email/username' });
//             }
//             user.verifyPassword(password, (err, isMatch) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 if (!isMatch) {
//                     return done(null, false, { message: 'Incorrect password' });
//                 }
//                 return done(null, user); // Authentication success
//             });
//         });
//     }));

//     // Serialize and Deserialize user for session management
//     passport.serializeUser(User.serializeUser());
//     passport.deserializeUser(User.deserializeUser());
// };

// // code number 3 filename userLogin.js















































// // const express=require("express");
// // const router=express.Router();
// // const passport = require('passport');
// // const User = require('./models/user'); // Aapka User model

// // passport.use('local', new LocalStrategy({
// //     usernameField: 'identifier', // This will handle both email and username field
// //     passwordField: 'password'
// // }, (identifier, password, done) => {
// //     // Check if identifier is email or username
// //     let query = {};
// //     if (identifier.includes('@')) {
// //         // If the identifier is an email (contains '@'), search by email
// //         query.email = identifier;
// //     } else {
// //         // Otherwise, search by username
// //         query.username = identifier;
// //     }

// //     User.findOne(query, (err, user) => {
// //         if (err) {
// //             return done(err);
// //         }
// //         if (!user) {
// //             return done(null, false, { message: 'No user found with this email/username' });
// //         }
// //         user.verifyPassword(password, (err, isMatch) => {
// //             if (err) {
// //                 return done(err);
// //             }
// //             if (!isMatch) {
// //                 return done(null, false, { message: 'Incorrect password' });
// //             }
// //             return done(null, user);
// //         });
// //     });
// // }));

// // router.post('/', passport.authenticate('local', {
// //     successRedirect: '/dashboard', // Successful login
// //     failureRedirect: '/login', // Failed login
// //     failureFlash: true // Optional for flash messages
// // }));


const passportLocalStrategy = require('passport-local').Strategy; // Ensure you import the Strategy
const User = require('../models/user.js'); // User model

module.exports = function(passport) {
    // Define LocalStrategy to handle login with either email or username
    passport.use('local', new passportLocalStrategy({
        usernameField: 'identifier', // Field for email or username
        passwordField: 'password' // Field for password
    }, async (identifier, password, done) => {
        try {
            let query = {};
            if (identifier.includes('@')) { 
                query.email = identifier; // Search by email
            } else {
                query.username = identifier; // Search by username
            }

            const user = await User.findOne(query); // Use async/await for better readability
            if (!user) {
                return done(null, false, { message: 'No user found with this email/username' });
            }

            // Assuming verifyPassword is a method that returns a promise
            const isMatch = await user.verifyPassword(password); 
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password' });
            }

            return done(null, user); // Authentication success
        } catch (err) {
            return done(err); // Handle any errors
        }
    }));

    // Serialize and Deserialize user for session management
    passport.serializeUser ((user, done) => {
        done(null, user.id); // Store user ID in session
    });

    passport.deserializeUser (async (id, done) => {
        try {
            const user = await User.findById(id); // Fetch user from the database
            done(null, user); // Attach user to request object
        } catch (err) {
            done(err); // Handle any errors
        }
    });
};