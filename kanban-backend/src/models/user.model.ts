
import bcrypt from "bcrypt"
import mongoose, { model, Schema } from "mongoose";
import validator from "validator"
import { User } from "../interface/user.interface";
import { BoardSchema } from "./board.model";


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
    username: {
      type: String,
      requred: true
    },
    mobile: {
      type: String,
      requred: true
    },
    image: {
     type: String,
     default: "https://avatars.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93"
    },
    role:{
      type: String,
      default: "guest",
      enum:['admin', 'developer', 'maintainer', 'guest' ],
    },
    refreshToken: {
      type: String,
    },
    dateSignUp: {
      type: Date,
      default: Date.now()
    }
    
  },{ timestamps: true });
  
  userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



  const UserModel = model("User", userSchema) ;

  export default UserModel