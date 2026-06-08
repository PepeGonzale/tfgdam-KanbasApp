import config from './config/config';
import logger from './config/logger';
import dbConnect from './config/mongo';
import { errorHandler, notFound } from './utils/errorHandlers';
import createServer from './utils/server';

const PORT = config.PORT || 3001;
const app = createServer();

app.use(notFound);
app.use(errorHandler);

dbConnect()
    .then(() => logger.info("DB connected successfully"))
    .catch((err) => {
        logger.error("DB connection failed", err);
        process.exit(1);
    });

app.listen(PORT, () => {
    logger.info(`Express is listening at http://localhost:${PORT}`);
});
