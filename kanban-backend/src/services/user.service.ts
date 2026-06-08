import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import { createJwt, createRefreshTOken } from "../utils/createJwt";
import Board from "../models/board.model";

const registerUser = async (data: {
  email: string;
  password: string;
  role?: string;
  username: string;
  mobile?: string;
}) => {
  const existing = await UserModel.findOne({ email: data.email.toLowerCase() });
  if (existing) throw new Error("An account with this email already exists");

  const user = await UserModel.create({
    email: data.email,
    password: data.password,
    role: data.role,
    username: data.username,
    mobile: data.mobile,
  });

  const token = await createJwt(user);
  return { user: { email: user.email, username: user.username, _id: user._id }, token };
};

const loginUser = async (email: string, password: string) => {
  if (!email || !password) throw new Error("Email and password are required");

  const user = await UserModel.findOne({ email: email.toLowerCase() });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const refreshToken = await createRefreshTOken(user);
  const updateuser = await UserModel.findByIdAndUpdate(
    user._id,
    { refreshToken },
    { new: true }
  );

  const token = await createJwt(user);
  return { updateuser, token };
};

const logoutUser = async (userId: string) => {
  await UserModel.findByIdAndUpdate(userId, { $unset: { refreshToken: "" } });
};

const getUsers = async () => {
  return UserModel.find({}).select("-password -refreshToken");
};

const changeUserPassword = async (
  data: { curr_password: string; new_password: string; confirm_password: string },
  userId: string
) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(data.curr_password, user.password);
  if (!valid) throw new Error("Current password is incorrect");

  if (data.new_password !== data.confirm_password) {
    throw new Error("New passwords do not match");
  }
  if (data.new_password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(data.new_password, salt);
  return UserModel.findByIdAndUpdate(userId, { password: hashed }, { new: true }).select("-password -refreshToken");
};

const updateUser = async (id: string, data: { username?: string; email?: string }) => {
  return UserModel.findByIdAndUpdate(
    id,
    {
      ...(data.username && { username: data.username }),
      ...(data.email && { email: data.email.toLowerCase() }),
    },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");
};

const searchUserEmail = async (email: string) => {
  return UserModel.findOne({ email }).select("-password -refreshToken");
};

const searchByBoardId = async (userId: string, boardId: string) => {
  return Board.findOne({ _id: boardId, usersWithAccess: userId });
};

const saveImage = async (id: string, location: string) => {
  return UserModel.findByIdAndUpdate(
    id,
    { $set: { image: location } },
    { new: true }
  ).select("-password -refreshToken");
};

const getIUser = async (email: RegExp) => {
  return UserModel.find({ email }).select("-password -refreshToken");
};

const deleteUserId = async (id: string) => {
    return UserModel.findByIdAndDelete(id);
};

const findOrCreateGoogleUser = async (profile: any) => {
    const email = profile.emails?.[0]?.value;
    const googleId = profile.id;
    const username = profile.displayName || email?.split("@")[0] || "user";
    const image = profile.photos?.[0]?.value;

    let user = await UserModel.findOne({ googleId });
    if (user) return user;

    user = await UserModel.findOne({ email });
    if (user) {
        user.googleId = googleId;
        if (image) user.image = image;
        await user.save();
        return user;
    }

    user = await UserModel.create({
        email,
        googleId,
        username,
        image: image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    });
    return user;
};

export {
    loginUser,
    logoutUser,
    registerUser,
    getUsers,
    changeUserPassword,
    getIUser,
    deleteUserId,
    updateUser,
    searchByBoardId,
    searchUserEmail,
    saveImage,
    findOrCreateGoogleUser,
};
