const { default: mongoose, model } = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: [6, "The password must have 6 characters"]
    },
    dateSignUp: {
      type: Date,
      default: Date.now()
    }
    
  },{ timestamps: true });
  
  userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



  const User = model("User", userSchema) ;

  module.exports= User