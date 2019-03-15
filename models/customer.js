const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {type: String, required: true, maxlength: 255},
  phone: {type: String, required: true},
  isGold: {type: Boolean, default: false, required: true}
})

const Customer = new mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
  const schema = {
    name: Joi.string().max(255).required(),
    phone: Joi.string().max(255).required(),
    isGold: Joi.boolean()
  }
  return Joi.validate(customer, schema);
}

module.exports.customerSchema = customerSchema;
module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
