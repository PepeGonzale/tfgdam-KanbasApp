import { connect } from "mongoose";
import config from "./config";
const MONGODB_URI = config.MONGODB_URI
async function dbConnect(): Promise<void> {
    await connect(<string>MONGODB_URI)
}

export default dbConnect