import express from 'express';
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
  }

  routes() {
    this.server.use(routes);
    this.server.use(deviceRoutes);
  }
}

export default new App().server;
