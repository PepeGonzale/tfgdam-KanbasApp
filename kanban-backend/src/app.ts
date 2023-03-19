import config from './config/config';
import dbConnect from './config/mongo';

import { errorHandler, notFound } from './utils/errorHandlers';
import createServer from './utils/server';
const PORT = config.PORT || 3001
const app = createServer()

try {

    dbConnect().then(data => {
        console.log("db conectada con exito")
      })
} catch(err) {
    console.error(err);
    
}
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});