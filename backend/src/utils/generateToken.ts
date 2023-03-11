import { IUserPayload } from "../interface/jwt.interface";
import jwt from "jsonwebtoken"
import config from "../config/config";
const jwt_secret = config.JWT_SECRET || "probando"

const generateToken = (payload: IUserPayload): string => {
    return jwt.sign(payload, jwt_secret, {
        expiresIn:"1d"
    })
}

export default generateToken