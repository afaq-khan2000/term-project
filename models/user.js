const mongoose = require("mongoose");
var Joi = require("@hapi/joi");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

function validateRegisterUser(data) {
    const registerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return registerSchema.validate(data);
}

function validateLoginUser(data) {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return loginSchema.validate(data);
}

module.exports.User = User;
module.exports.validateRegister = validateRegisterUser;
module.exports.validateLogin = validateLoginUser;
