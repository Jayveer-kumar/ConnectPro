const Joi = require('joi');

module.exports.userSchema = Joi.object({
    user: Joi.object({
        name: Joi.string()
            .pattern(/^[a-zA-Z\s]*$/) // Only letters and spaces
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.pattern.base": "Name can only contain letters and spaces.",
                "string.min": "Name must be at least 3 characters.",
                "string.max": "Name cannot exceed 30 characters."
            }),
        username: Joi.string()
            .pattern(/^[a-zA-Z0-9_.-]*$/) // Alphanumeric and specific special characters (_ . -), no spaces
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.pattern.base": "Username can include letters, numbers, _, ., -, but no spaces.",
                "string.min": "Username must be at least 3 characters.",
                "string.max": "Username cannot exceed 30 characters."
            }),
        password: Joi.string()
            .min(4)
            .max(80)
            .required()
            .messages({
                "string.min": "Password must be at least 4 characters.",
                "string.max": "Password cannot exceed 50 characters."
            }),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required()
            .messages({
                "string.email": "Invalid email format."
            }),
        age: Joi.number()
            .min(10)
            .max(90)
            .required()
            .messages({
                "number.min": "Age must be at least 10.",
                "number.max": "Age cannot exceed 90."
            }),
        bio: Joi.string()
            .min(5)
            .max(500)
            .required()
            .messages({
                "string.min": "Bio must be at least 5 characters.",
                "string.max": "Bio cannot exceed 200 characters."
            }),
        image: Joi.string()
            .allow(null, "")
            .messages({
                "string.base": "Image must be a string."
            })
    }).required()
});





// User Schema with Joi Code Number 4






// const Joi=require('joi');
// module.exports.userSchema=Joi.object({
//     user:Joi.object({
//         name:Joi.string().pattern(/^[a-zA-Z\s]*$/).min(3).max(30).required(),
//         username: Joi.string().alphanum().min(3).max(30).required(),
//         password:Joi.string().min(4).max(50).required(),
//         email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//         age:Joi.number().min(10).max(90).required(),
//         bio:Joi.string().min(5).max(200).required(),
//         image:Joi.string().allow(null,"")
//     }).required()
// });