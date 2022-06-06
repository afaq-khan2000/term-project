const mongoose = require("mongoose");
var Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
});

userSchema.methods.generateHashedPasswords = async function () {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}

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
