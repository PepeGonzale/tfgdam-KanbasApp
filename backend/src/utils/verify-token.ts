import { IUserPayload } from "../interface/jwt.interface";
import jwt from 'jsonwebtoken'
import config from "../config/config";

const jwt_secret = config.JWT_SECRET || "probando"

const verifyToken = (token: string): IUserPayload | undefined => {
    try {
        return jwt.verify(token, jwt_secret) as IUserPayload;
    } catch(err) {
        console.log(err);
        
    }
}
export default verifyToken 