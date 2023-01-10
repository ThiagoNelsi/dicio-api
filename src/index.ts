import path from 'path';
import { config } from 'dotenv';
import Server from './Server';
import database from './data/mongodb/mongodb';
import log from './utils/logger';

const server: Server = new Server();

(async () => {
  if (process.env.NODE_ENV === 'dev') {
    config({
      path: path.resolve(__dirname, '..', '.env'),
    });
  }

  await database.connect().catch(log);

  server.start(Number(process.env.PORT) || 3333);
})();
