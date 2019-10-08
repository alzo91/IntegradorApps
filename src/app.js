import 'dotenv/config';
import express from 'express';
import { resolve } from 'path';
import routes from './routes';
import deviceRoutes from './deviceRoutes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(deviceRoutes);
  }
}

export default new App().server;
