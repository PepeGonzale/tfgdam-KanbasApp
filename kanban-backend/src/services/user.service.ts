import config from "../config/config";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { createJwt, createRefreshTOken } from "../utils/createJwt";
import Board from "../models/board.model";
const registerUser = async (email, password) => {
  try {
    const saveUser = await UserModel.create({ email, password });
    const token = await createJwt(saveUser);
    return { user: { email: saveUser.email }, token };
  } catch (err) {
    throw new Error(err);
  }
};

const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

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
    throw new Error("incorrect password");
  }
  throw new Error("incorrect email");
};
const getUsers = async () => {
  const users = UserModel.find({});
  return users;
};

const updateUser = async (id: string, data: Object) => {
  try {
    const update = await UserModel.findByIdAndUpdate(
      {id},
      { data },
      { new: true }
    );
    return update;
  } catch (err) {
    throw new Error(err);
  }
};
const searchByBoardId = async (userId, boardId) => {
  const searchByBoard = await UserModel.findById(userId).then((boarde) => {
    return Board.findById(boardId)
  })
  return searchByBoard
}
const getIUser = async (id: string) => {
  const search = await UserModel.findById(id);
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
  getIUser,
  deleteUserId,
  updateUser,
  searchByBoardId
};
