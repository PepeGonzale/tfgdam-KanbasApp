import "dotenv/config"

const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    SESSION_SECRET: process.env.SESSION_SECRET || 'kanban-session-dev-secret',
}
export default config