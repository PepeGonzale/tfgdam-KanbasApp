import User from "../interface/auth.interface"
import validator from "validator"
import jwt from "jsonwebtoken"
import mongoose, { model, Model } from "mongoose";
import bcrypt from "bcryptjs"
import config from "../config/config";
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
  interface UserModel extends Model<User> {
    login(email: string, password: string): Promise<User>;
  }
  
  userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



  const UserModel = model<User, UserModel>("Users", userSchema) as UserModel;

export default UserModel;

