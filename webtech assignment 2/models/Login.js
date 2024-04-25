const mongoose = require('mongoose');
const LoginSchema = new mongoose.Schema({
    username: String,
    password: String
    
  });
  module.exports = mongoose.model('Login', LoginSchema);