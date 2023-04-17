import jwt from "jsonwebtoken"
import config from "../config/config"
const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, config.JWT_SECRET)
    } catch (error) {
        throw new Error(error)
    }
}
export default verifyToken