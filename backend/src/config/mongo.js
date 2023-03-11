const {mongoose} = require('mongoose')
const config = require('./config')
const dbConnect = (a) => {
    try{
    const connection = mongoose.connect(config.MONGODB_URI)
    .then(console.log("Db connected succesfully"))

    } catch(err) {
console.error(err);
    }
}
module.exports = dbConnect