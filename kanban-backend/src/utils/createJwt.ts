import jwt from "jsonwebtoken"
import config from "../config/config";

const tokenSecre = config.JWT_SECRET;
const maxAge = 3 * 24 * 60 * 60;
const createJwt = async (user) => {
    return await jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        tokenSecre,
        {
          expiresIn: '1d',
        }
      );
}
const createRefreshTOken = async (user) => {
    return await jwt.sign({
      userId: user._id,
      email: user.email,
    }, tokenSecre, {expiresIn: "3d"})
}
export {createJwt, createRefreshTOken}