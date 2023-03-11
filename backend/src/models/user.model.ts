import { Schema, model } from "mongoose";
import { IUserSchema, IUserType } from "../interface/user.interface";
const bcrypt = require('bcryptjs')
const userSchema = new Schema<IUserType>(
  {
    email: {
        type: String,
        required: [true, "Please enter a valid email"],
        unique: true,
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
    

const UserModel = model<IUserSchema>("User", userSchema);

export default UserModel;