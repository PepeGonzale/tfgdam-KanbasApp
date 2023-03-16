import jwt from "jsonwebtoken"
import config from "../config/config"
const verifyToken = (token: string) => {
    return jwt.verify(token, config.JWT_SECRET)
}
export default verifyToken