import "dotenv/config"

const config = {
    PORT: process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION:process.env.AWS_REGION,
    AWS_BUCKET_NAME:process.env.AWS_BUCKET_NAME
}
export default config