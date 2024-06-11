
const mongoose = require('mongoose');

const user_usSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User_us', user_usSchema);
