import { Request, Response } from "express";
import service from "../services/user.service";



const register = async(req:Request, res:Response) => {
    const {email,password} = req.body
    console.log(req.body);
    
    if (!email || !password) {
        throw new Error("Please rewrite the fields with correct data")
    }
    const user = await service.registerUser(email, password)
    res.send({status: "OK", user: user})
}
const login = async (req:Request, res:Response) => {
    const {email, password } = req.body
    console.log(req.body);
    
    const user = await service.loginUser(email, password)
    if (user) {
        console.log(user);
        
        res.send(user)
    }
    else {
        res.send("Error")
    }
}

const authController = {
    register,
    login
}
export default authController