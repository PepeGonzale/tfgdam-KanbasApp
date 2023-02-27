import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async(req: Request, res: Response) => {
    const {email,password} = req.body
    console.log(req.body);
    
    if (!email || !password) {
        throw new Error("Please rewrite the fields with correct data")
    }
    const user = await registerUser(email, password)
    res.send({status: "OK", user: user})
}
export const login = async (req: Request, res: Response) => {
    const {email, password } = req.body
    const user = await loginUser(email, password)
    if (user) {
        res.send(user)
    }
    else {
        res.send("Error")
    }
}