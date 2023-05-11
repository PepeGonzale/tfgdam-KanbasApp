import config from "../config/config";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { createJwt, createRefreshTOken } from "../utils/createJwt";
import Board from "../models/board.model";
const registerUser = async (data) => {
  try {
    const saveUser = await UserModel.create({ email: data.email, password: data.password, role: data.role, username: data.username, mobile: data.mobile });
    const token = await createJwt(saveUser);
    return { user: { email: saveUser.email }, token };
  } catch (err) {
    throw new Error("No ha sido posible crear la cuenta, intentelo de nuevo mas tarde");
  }
};

const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth)
    if (auth) {
      const refreshToken = await createRefreshTOken(user);
      const updateuser = await UserModel.findByIdAndUpdate(
        user.id,
        { refreshToken: refreshToken },
        { new: true }
      );
      const token = await createJwt(user);
      return { updateuser, token };
    }
    throw new Error("Error al verificar los credenciales (contraseña)");
  }
  throw new Error("Error al verificar los credenciales (email)");
};
const getUsers = async () => {
  const users = UserModel.find({});
  return users;
};
const changeUserPassword = async (data, userId: string) => {
  console.log(data);
  
  const user = await UserModel.findById({
    _id: userId
  })
  if(!user) throw new Error("User not found")
  const password = await bcrypt.compare(data.curr_password, user.password)
  if (!password) throw new Error("Incorrect password")
  if (data.new_password === data.confirm_password) {
    
    console.log('c',user.password)
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(data.new_password, salt)
    const updatePassword = await UserModel.findByIdAndUpdate(userId, {
      $set: {
        password: newHash
      }
    }, {
      new: true
    }
      )
    
    return updatePassword
  } else{
    throw new Error("Passwords do not match")
  }

  
}
const updateUser = async (id: string, data: any) => {
  try {
    const update = await UserModel.findByIdAndUpdate(
      id,
      { 
        username: data.username, 
        email: data.email
       },
      { new: true }
    );
    return update;
  } catch (err) {
    throw new Error(err);
  }
};
const searchUserEmail = async (email) => {
  const userEmail = await UserModel.findOne({
    email
  })
  return userEmail;
}

const searchByBoardId = async (userId, boardId) => {
  const searchByBoard = await UserModel.findById(userId).then((boarde) => {
    return Board.findById(boardId)
  })
  return searchByBoard
};

const saveImage = async (id: string, location: string) => {
  const saveImage = await UserModel.findByIdAndUpdate(id, {
    $set: {
      image: location
    }
  }, {
    new:true
  })
  console.log(saveImage)
  return saveImage
}
const getIUser = async (email: any) => {
  
  const search = await UserModel.find({
    email
  }).exec()
  console.log(search)
  return search;
};
const deleteUserId = async (id: string) => {
  try {
    const deleteUser = await UserModel.findByIdAndRemove(id);
    return deleteUser;
  } catch (err) {
    throw new Error(err);
  }
};

export {
  loginUser,
  registerUser,
  getUsers,
  changeUserPassword,
  getIUser,
  deleteUserId,
  updateUser,
  searchByBoardId,
  searchUserEmail,
  saveImage
};
