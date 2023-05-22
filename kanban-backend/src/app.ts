import config from './config/config';
import logger from './config/logger';
import dbConnect from './config/mongo';

import { errorHandler, notFound } from './utils/errorHandlers';
import createServer from './utils/server';
const PORT = config.PORT || 3001
const app = createServer()

try {

    dbConnect().then(data => {
        logger.info("Db conectada con exito")
      })
app.use(notFound)
app.use(errorHandler)
} catch(err) {
    console.error(err);
    
}

app.listen(PORT, () => {
  return logger.info(`Express is listening at http://localhost:${PORT}`);
});