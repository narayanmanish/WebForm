const mongoose = require('mongoose');


// Create a schema for user data
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    validationCode: { type: String, required: true },
    emailValidated: { type: Boolean, default: false }
  });
  module.exports= mongoose.model('details',userSchema);