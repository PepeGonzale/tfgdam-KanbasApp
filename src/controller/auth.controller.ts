import { Request, Response } from "express";
import { registerUser } from "../services/auth.service";

export const register = async(req: Request, res: Response) => {
    const {email,password} = req.body
    if (!email || !password) {
        throw new Error("Please rewrite the fields with correct data")
    }
    const user = await registerUser(email, password)
    res.send({status: "OK", user: user})
}
