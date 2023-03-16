import { loginUser, registerUser } from "../services/user.service";




const register = async(req, res) => {
    const {email,password} = req.body
    console.log(req.body);
    
    if (!email || !password) {
        throw new Error("Please rewrite the fields with correct data")
    }
    const user = await registerUser(email, password)
    res.send({status: "OK", user: user})
}
const login = async (req, res) => {
    const {email, password } = req.body
    console.log(req.body);
    
    const user = await loginUser(email, password)
    if (user) {
        res.send(user)
    }
    else {
        res.send("Error")
    }
}

export {login ,register}