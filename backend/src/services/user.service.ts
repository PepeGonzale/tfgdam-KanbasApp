
import config from "../config/config"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import UserModel from "../models/user.model"
import generateToken from "../utils/generateToken"

const tokenSecre = config.JWT_SECRET || "probando"
const maxAge = 3 * 24 * 60 * 60
const registerUser = async (email:string, password:string) => {
    const saveUser = await UserModel.create({email, password})
    return {
      _id: saveUser._id,
      token: generateToken({_id: saveUser._id})
    }
}

const loginUser = async (email:string, password:string) => {
  const user = await UserModel.findOne({ email });
  
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    
    if (auth) {

    return {
      _id: user._id,
      email: user.email,
      token: generateToken({_id: user._id})
    }
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const service = {
    loginUser,
    registerUser

}

export default service