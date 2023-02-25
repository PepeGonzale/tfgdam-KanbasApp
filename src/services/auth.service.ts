import UserModel from "../models/auth.models"
import config from "../config/config"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const tokenSecre = config.JWT_SECRET || "problema"
const maxAge = 3 * 24 * 60 * 60
export const registerUser = async (email: string, password: string) => {
    const saveUser = await UserModel.create({email, password})
    const token = jwt.sign(
        {
          userId: saveUser._id,
          email: saveUser.email,
        },
        tokenSecre,
        {
          expiresIn: maxAge,
        }
      );
    return {user: {email: saveUser.email}, token}
}

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    
    if (auth) {
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        tokenSecre,
        {
          expiresIn: maxAge,
        }
      );
    return {user: {email: user.email}, token}
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};


