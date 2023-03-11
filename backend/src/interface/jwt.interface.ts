import { JwtPayload } from "jsonwebtoken";

export interface IUserPayload extends JwtPayload {
    _id:string
}