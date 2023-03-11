
const config = require('../config/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')
const tokenSecre = config.JWT_SECRET
const maxAge = 3 * 24 * 60 * 60
const registerUser = async (email, password) => {
    const saveUser = await User.create({email, password})
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

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  
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
          expiresIn: 72*60*60*1000,
        }
      );
    return {user: {email: user.email}, token}
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};


module.exports = {
    loginUser,
    registerUser
}