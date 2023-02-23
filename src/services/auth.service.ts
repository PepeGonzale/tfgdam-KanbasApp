import UserModel from "../models/auth.models"
import config from "../config/config"
import jwt from "jsonwebtoken"
const tokenSecre = config.JWT_SECRET || "problema"
export const registerUser = async (email: string, password: string) => {
    const saveUser = await UserModel.create({email, password})
    const token = jwt.sign(
        {
          userId: saveUser._id,
          email: saveUser.email,
        },
        tokenSecre,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
    return {user: {email: saveUser.email}, token}
}

