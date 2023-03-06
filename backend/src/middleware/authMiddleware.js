const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        try{
            if (token) {
                const decoded = jwt.verify(token,"mysign")
                console.log(decoded);
                const user = await User.findById(decoded.id)
                req.user = user;
                next()
            }
        } catch(err) {
            throw new Error('Not Authorized token expired, please login again')
        }
    } else {
        throw new Error('There is no token atached to the header')
    }
 }
 module.exports = {authMiddleware}