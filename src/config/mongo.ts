import { connect } from "mongoose";
import config from "./config";
const dbURI = config.MONGODB_URI

async function dbConnect(): Promise<void> {
    await connect(<string>dbURI)
}

export default dbConnect