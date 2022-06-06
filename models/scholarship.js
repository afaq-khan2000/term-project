var mongoose = require("mongoose");
var Joi = require("@hapi/joi");

var scholarshipSchema = mongoose.Schema({
  title: String,
  description: String,
  program: [{ type: String }],
  amount: Number,
  date: String,
  eligibility: [{ type: String }],
  link: String,
});

var Scholarship = mongoose.model("Scholarship", scholarshipSchema);

function validateScholarship(data) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    program: Joi.array().items(Joi.string()),
    amount: Joi.number().min(0).required(),
    date: Joi.string().required(),
    eligibility: Joi.array().items(Joi.string()),
    link: Joi.string().required(),
  });

  return schema.validate(data);
}

module.exports.Scholarship = Scholarship;
module.exports.validate = validateScholarship;
