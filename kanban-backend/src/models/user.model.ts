import bcrypt from "bcrypt";
import mongoose, { model } from "mongoose";
import validator from "validator";
import { User } from "../interface/user.interface";

const userSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      minlength: [6, "The password must have at least 6 characters"],
    },
    googleId: {
      type: String,
      sparse: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=default",
    },
    role: {
      type: String,
      default: "guest",
      enum: ["admin", "developer", "maintainer", "guest"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = model("User", userSchema);

export default UserModel;
