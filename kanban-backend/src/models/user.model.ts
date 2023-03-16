
import bcrypt from "bcrypt"
import mongoose, { model } from "mongoose";
import validator from "validator"
import { User } from "../interface/user.interface";

const userSchema = new mongoose.Schema<User>({
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



  const UserModel = model("User", userSchema) ;

  export default UserModel