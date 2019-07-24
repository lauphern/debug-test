const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    requierd: true
  }
})

const User = mongoose.model("users", userSchema)

module.exports = User; //accessing this module from outside of this file