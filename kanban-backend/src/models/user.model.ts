
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
     default: "https://imgs.search.brave.com/jWyn9gi5EKahMq2igHEESBuW59uePq6GwLXCBz-aCK0/rs:fit:820:860:1/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd2lsY2l0/eS5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDYvMTE1/LTExNTAxNTJfZGVm/YXVsdC1wcm9maWxl/LXBpY3R1cmUtYXZh/dGFyLXBuZy1ncmVl/bi5qcGc_Zml0PTgy/MCUyQzg2MCZzc2w9/MQ"
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
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



  const UserModel = model("User", userSchema) ;

  export default UserModel